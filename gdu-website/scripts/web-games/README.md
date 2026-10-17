# Adding a game to the site

The games page (`/games`) is driven by [`src/data/games.js`](../../src/data/games.js). Each entry either

- has a `play` path, so it opens in the on-site player (the **Play here** badge), or
- only has an `itch` link, so the card opens the itch.io page.

## Which games can run in the browser

A browser can't run a Windows `.exe`, so a game needs a **web build**:

| Engine | What to do |
| --- | --- |
| **LÖVE (Lua)** | `convert.py` below turns the `.exe` into a web build. No source needed. |
| **Unity** | Rebuild the project with *File > Build Settings > WebGL*, copy the output folder to `public/arcade/<slug>/` (it must contain an `index.html`). |
| **Defold** | *Project > Bundle > HTML5 Application*, copy the output to `public/arcade/<slug>/`. |
| **Godot / Pygame / others** | Export to HTML5 / WebAssembly, copy to `public/arcade/<slug>/`. |

A Windows build of a Unity or Defold game can't be converted; it has to be rebuilt from the project.

## Converting a LÖVE game

1. Add an entry to [`games.json`](games.json): `slug` (lowercase, hyphens), `title`, the `.exe` path relative to the
   `Games` folder, and an initial memory size in MB (64 is fine for small games, 128-192 for big ones).
2. Run it from the `gdu-website` folder:

   ```bash
   python scripts/web-games/convert.py ../Games            # every game
   python scripts/web-games/convert.py ../Games sunken     # just one
   ```

3. In `src/data/games.js`, set that game's `play` to `"/arcade/<slug>/index.html"`.
4. `npm run dev`, open `/games`, play it through. Check the browser console if it doesn't start.

If a game shows a Lua error in the player, it probably uses LuaJIT-only syntax (`goto`); a shader error means desktop
GLSL. Add a rewrite for that file in [`patches.py`](patches.py), the existing REWIND and Rusty Chamber entries show how.
The original files are never edited, the fixes are applied to the copy that goes on the site.

## Adding a game that only has an itch.io page

Add an entry to `src/data/games.js` with `play: null` and the `itch` URL, plus a thumbnail in
`public/images/games/<slug>.webp` (about 960px wide).

## Size

Everything under `public/arcade/` is served to visitors and committed to git. Keep each game under ~50 MB (GitHub
rejects files over 100 MB) and don't copy `.exe` builds into `public/`.

## Designs gallery

The `/designs` page reads `src/data/designs.js`, generated from the club API by
`python scripts/import-designs/import.py` (needs Pillow and ffmpeg on PATH, or set `FFMPEG`). It downloads each piece,
shrinks images to WebP and re-encodes videos to H.264 into `public/design-media/` (~29 MB total). Re-running it
overwrites that folder and `designs.js`. `--posters` redoes only the video thumbnails.
