"""Turn the club's LÖVE (Lua) desktop builds into web games that open inside the website.

    python scripts/web-games/convert.py [path/to/Games] [slug ...]

For each game in games.json it:
  1. pulls the game's .love archive out of the Windows .exe (a LÖVE .exe is the engine with the game zip appended),
     dropping editor files and .git history that the browser never needs
  2. applies the fixes in patches.py (plain-Lua / WebGL compatibility)
  3. converts it with love.js (compatibility build, no SharedArrayBuffer headers needed)
  4. writes public/arcade/<slug>/{index.html,game.js,game.data}; the shared engine goes in public/arcade/_runtime/

Needs: Python 3.9+ and `npm install` run once in gdu-website (love.js is a dev dependency). Your original files are never modified.
"""
import json, os, re, shutil, subprocess, sys, tempfile, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(SITE, 'public', 'arcade')
LOVEJS = os.path.join(SITE, 'node_modules', 'love.js', 'index.js')

SKIP_DIR = re.compile(r'(^|/)(\.git|\.svn|\.idea|\.vscode|__MACOSX)(/|$)')
SKIP_EXT = {'.psd', '.xcf', '.kra', '.ase', '.aseprite', '.sample', '.md', '.rst', '.blend'}

sys.path.insert(0, HERE)
from patches import PATCHES  # noqa: E402


def extract_love(exe, dest, slug):
    fixes = PATCHES.get(slug, {})
    with zipfile.ZipFile(exe) as zin, zipfile.ZipFile(dest, 'w', zipfile.ZIP_DEFLATED) as zout:
        for info in zin.infolist():
            name = info.filename
            if info.is_dir() or SKIP_DIR.search(name) or os.path.splitext(name)[1].lower() in SKIP_EXT:
                continue
            data = zin.read(name)
            if name in fixes:
                crlf = b'\r\n' in data
                text = fixes[name](data.decode('utf-8').replace('\r\n', '\n'))
                data = (text.replace('\n', '\r\n') if crlf else text).encode('utf-8')
                print(f'  patched {name}')
            zout.writestr(name, data)


def main():
    args = sys.argv[1:]
    games_dir = os.path.abspath(args[0]) if args and os.path.isdir(args[0]) else os.path.abspath(os.path.join(SITE, '..', 'Games'))
    only = [a for a in args if not os.path.isdir(a)]
    games = json.load(open(os.path.join(HERE, 'games.json'), encoding='utf-8'))
    template = open(os.path.join(HERE, 'player.template.html'), encoding='utf-8').read()
    node = shutil.which('node')
    if not node or not os.path.exists(LOVEJS):
        sys.exit('Run `npm install` in gdu-website first (needs Node.js; love.js is a dev dependency).')

    os.makedirs(os.path.join(OUT, '_runtime'), exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for slug, meta in games.items():
            if only and slug not in only:
                continue
            exe = os.path.join(games_dir, meta['exe'])
            if not os.path.exists(exe):
                print(f'{slug}: SKIPPED, {exe} not found')
                continue
            print(slug)
            love = os.path.join(tmp, slug + '.love')
            built = os.path.join(tmp, slug)
            extract_love(exe, love, slug)
            # wasm heap: at least what the game needs, never less than 1.5x its assets
            mem_mb = max(meta['mem'], int(os.path.getsize(love) * 1.5 / 1048576) + 1)
            subprocess.run([node, LOVEJS, '-c', '-t', meta['title'], '-m', str(mem_mb * 1048576), love, built],
                           check=True)
            for f in ('love.js', 'love.wasm'):  # the engine is identical for every game: ship it once
                shutil.copy(os.path.join(built, f), os.path.join(OUT, '_runtime', f))
            dest = os.path.join(OUT, slug)
            shutil.rmtree(dest, ignore_errors=True)
            os.makedirs(dest)
            for f in ('game.js', 'game.data'):
                shutil.copy(os.path.join(built, f), os.path.join(dest, f))
            html = template.replace('__TITLE__', meta['title']).replace('__MEMORY__', str(mem_mb * 1048576))
            with open(os.path.join(dest, 'index.html'), 'w', encoding='utf-8', newline='\n') as fh:
                fh.write(html)
            print(f'  -> public/arcade/{slug}/ ({os.path.getsize(os.path.join(dest, "game.data")) / 1e6:.1f} MB)')


if __name__ == '__main__':
    main()
