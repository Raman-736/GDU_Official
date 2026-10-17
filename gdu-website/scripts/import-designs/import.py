"""Import the Designs gallery from the club's API into the site.

    python scripts/import-designs/import.py [designs.json]

Downloads every design file, shrinks it for the web and writes:
  public/design-media/<id>-<n>.webp          images (max 1600px wide)
  public/design-media/<id>-<n>.mp4 + .jpg    videos re-encoded to H.264 (max 1280px wide) + a poster frame
  src/data/designs.js                   the gallery data the /designs page reads

Needs Pillow (`pip install pillow`) and ffmpeg (on PATH, or set the FFMPEG environment variable).
Pass a saved copy of https://gdu-club-website-be.onrender.com/api/design/getdesigns to skip the download.
"""
import json, os, re, shutil, subprocess, sys, tempfile, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(SITE, 'public', 'design-media')
API = 'https://gdu-club-website-be.onrender.com/api/design/getdesigns'
FFMPEG = os.environ.get('FFMPEG') or shutil.which('ffmpeg')
VIDEO_EXT = {'mp4', 'mov', 'mkv', 'webm'}

# spelling slips in the original titles
TITLE_FIXES = {
    'Amoung us character': 'Among Us character',
    'Realistic Enviornment': 'Realistic Environment',
    'Astronaught Model': 'Astronaut Model',
    'So It Wasnt Real?????????': "So It Wasn't Real?",
}


def clean(text):
    """Repair UTF-8 text that was decoded as Windows-1252 (e.g. 'ð“‚€' for a hieroglyph)."""
    try:
        return text.encode('cp1252').decode('utf-8')
    except (UnicodeEncodeError, UnicodeDecodeError):
        return text


def slugify(t):
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-') or 'design'


def fetch(url, dest):
    quoted = urllib.parse.quote(url, safe=":/%")
    req = urllib.request.Request(quoted, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, 'wb') as f:
        shutil.copyfileobj(r, f)


def do_image(src, dest):
    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(dest + '.webp', 'WEBP', quality=80, method=6)
    return {'type': 'image', 'src': f'/design-media/{os.path.basename(dest)}.webp', 'w': im.width, 'h': im.height}


def make_poster(mp4, poster):
    """Grab a frame that isn't a black fade-in: try a few offsets and keep the first bright one."""
    from PIL import ImageStat
    best, best_lum = None, -1
    for t in ('1', '3', '6', '10', '16', '24', '36', '0'):
        tmp = poster + '.try.jpg'
        if os.path.exists(tmp):
            os.remove(tmp)
        subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-ss', t, '-i', mp4, '-frames:v', '1', '-q:v', '4', tmp], check=True)
        if not os.path.exists(tmp) or os.path.getsize(tmp) == 0:  # clip shorter than this offset
            continue
        lum = ImageStat.Stat(Image.open(tmp).convert('L')).mean[0]
        if lum > best_lum:
            best_lum = lum
            shutil.copy(tmp, poster)
        if lum > 35:
            break
    if os.path.exists(poster + '.try.jpg'):
        os.remove(poster + '.try.jpg')


def do_video(src, dest):
    mp4 = dest + '.mp4'
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', src,
                    '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264', '-crf', '28', '-preset', 'veryfast',
                    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', mp4], check=True)
    poster = dest + '.jpg'
    make_poster(mp4, poster)
    w, h = Image.open(poster).size
    return {'type': 'video', 'src': f'/design-media/{os.path.basename(dest)}.mp4', 'poster': f'/design-media/{os.path.basename(dest)}.jpg', 'w': w, 'h': h}


def main():
    if not FFMPEG:
        sys.exit('ffmpeg not found: install it or set the FFMPEG environment variable')
    if '--posters' in sys.argv:  # redo just the poster frames from the mp4s already in public/design-media
        for f in sorted(os.listdir(OUT)):
            if f.endswith('.mp4'):
                make_poster(os.path.join(OUT, f), os.path.join(OUT, f[:-4] + '.jpg'))
                print('  poster', f)
        return
    if len(sys.argv) > 1:
        designs = json.load(open(sys.argv[1], encoding='utf-8'))
    else:
        with urllib.request.urlopen(urllib.request.Request(API, headers={'User-Agent': 'Mozilla/5.0'}), timeout=120) as r:
            designs = json.loads(r.read().decode('utf-8'))

    os.makedirs(OUT, exist_ok=True)
    jobs, entries, seen = [], [], {}
    for d in designs:
        title = clean(d['title']).strip()
        title = TITLE_FIXES.get(title, title)
        base = slugify(title)
        seen[base] = seen.get(base, 0) + 1
        did = base if seen[base] == 1 else f'{base}-{seen[base]}'
        entry = {
            'id': did,
            'title': title,
            'description': clean(d.get('description') or '').strip(),
            'developers': [x['name'] for x in d.get('developer_ids', [])],
            'media': [None] * len(d['designs']),
        }
        entries.append(entry)
        for i, url in enumerate(d['designs']):
            jobs.append((entry, i, url, f'{did}-{i + 1}'))

    def work(job):
        entry, i, url, name = job
        ext = url.rsplit('.', 1)[-1].lower()
        with tempfile.TemporaryDirectory() as tmp:
            src = os.path.join(tmp, 'src.' + ext)
            fetch(url, src)
            dest = os.path.join(OUT, name)
            entry['media'][i] = do_video(src, dest) if ext in VIDEO_EXT else do_image(src, dest)
        print(f'  {name}', flush=True)

    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(work, jobs))

    header = ('// The Designs gallery (3D, 2D and animation work by GDU members).\n'
              '// Generated by scripts/import-designs/import.py from the club API; media lives in public/design-media/.\n\n'
              'export const DESIGNS = ')
    path = os.path.join(SITE, 'src', 'data', 'designs.js')
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(header + json.dumps(entries, indent=2, ensure_ascii=False) + ';\n')
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f'{len(entries)} designs, {len(jobs)} files, {total / 1e6:.0f} MB in public/design-media')


if __name__ == '__main__':
    main()
