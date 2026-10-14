# GameDevUtopia - Official Website (all chapters)

Website for **GameDevUtopia (GDU)** as a whole: GDU PICT (Pune) and GDU IIIT Kottayam.
Same design as the GDU PICT site, but general: no council page, and every section covers both chapters.
React 19 + Vite, plain CSS, no backend, a single page (no router).

## Run

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

## Sections (top to bottom)

Hero, tools strip, then:

| Level | Section   | What's there                                                                  |
| ----- | --------- | ----------------------------------------------------------------------------- |
| 01    | About     | Mission intel, dossier (founders, board, lineage, faculty, partners), classes |
| 02    | Chapters  | GDU PICT (2020) and GDU IIIT Kottayam (2021), side by side                    |
| 03    | Arcade    | GDU Island (playable game) and the member showreel                            |
| 04    | Events    | Glitched (PICT), GameVita (IIITK), quest log of workshops and jams            |
| 05    | Wins      | Competition results, one tab per chapter, with winning team names             |
| 06    | Mentors   | Industry connections and what members walk away with                          |

`/#play-now` opens the game straight away.

## Editing content

All copy is in `src/data/site.js`. Components only lay it out.

- Chapter details: `CHAPTERS`
- Founders, board, faculty, partners: `ABOUT.dossier` (a value can be a string or a list of lines)
- Festivals: `FESTIVALS`
- Results: `WINS.pict` and `WINS.iiitk`
- Social links: `SOCIALS`

## The game and media

`public/play/` is a built copy of GDU Island (source: `../gdu-sip-game-main`, built with its
`build:embed` script, which currently writes into `../gdu-pict-website/public/play`; copy that folder here after
rebuilding). `public/media/` holds the hero loop and showreel from the member's Blender video.

## Deploying

Build command `npm install && npm run build`, publish directory `dist`, root directory `gdu-website`.
There are no client-side routes, so no rewrite rule is needed.

## Before going live

- Add the video creator's name to `SHOWCASE.credit`.
- The footer's Instagram link is still the GDU PICT account. Add the main or IIITK account if there is one.
- The **Join GDU** button scrolls to the footer. Point it at a sign-up form when you have one
  (`src/components/InsertCoin.jsx`).
- Check the IIIT Kottayam address in `src/components/Footer.jsx`.
