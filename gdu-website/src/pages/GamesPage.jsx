import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GAMES } from "../data/games.js";
import "./GamesPage.css";

const STATUS = [
  { id: "all", label: "All" },
  { id: "play", label: "Play here" },
  { id: "itch", label: "On itch.io" },
];

function GameCard({ game, index, onPlay }) {
  const [open, setOpen] = useState(false);
  const playable = Boolean(game.play);
  const color = playable ? "c-green" : "c-pink";
  const long = game.description.length > 150;

  const thumb = (
    <>
      <img src={game.thumb} alt="" loading="lazy" width="960" height="540" />
      <span className="game-badge">{playable ? "Play here" : game.itch ? "itch.io" : "Soon"}</span>
      {playable && (
        <span className="game-play" aria-hidden="true">
          <span className="btn-tri" />
        </span>
      )}
    </>
  );

  return (
    <article className={`game hud ${color}`} style={{ "--d": `${Math.min(index, 8) * 0.04}s` }}>
      {playable ? (
        <button type="button" className="game-thumb" onClick={() => onPlay(game)} aria-label={`Play ${game.title}`}>
          {thumb}
        </button>
      ) : (
        <a
          className="game-thumb"
          href={game.itch || undefined}
          target="_blank"
          rel="noreferrer"
          aria-label={`${game.title} on itch.io`}
        >
          {thumb}
        </a>
      )}

      <div className="game-body">
        <h3>{game.title}</h3>
        <p className="game-devs">by {game.developers.join(", ")}</p>

        <div className="game-tags">
          {game.genres.slice(0, 3).map((g) => (
            <span key={g}>{g}</span>
          ))}
          {game.dimension && <span>{game.dimension}</span>}
        </div>

        <p className={`game-desc ${open ? "is-open" : ""}`}>{game.description}</p>
        {long && (
          <button type="button" className="game-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Show less" : "Read more"}
          </button>
        )}

        <div className="game-actions">
          {playable ? (
            <button type="button" className="btn game-cta" onClick={() => onPlay(game)}>
              <span className="btn-tri" aria-hidden="true" /> Play now
            </button>
          ) : (
            game.itch && (
              <a className="btn btn-ghost game-cta" href={game.itch} target="_blank" rel="noreferrer">
                Play on itch.io <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            )
          )}
          {playable && game.itch && (
            <a className="game-alt" href={game.itch} target="_blank" rel="noreferrer">
              itch.io <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function GamesPage({ onPlayGame }) {
  const [status, setStatus] = useState("all");
  const [genre, setGenre] = useState("All");

  const genres = useMemo(() => ["All", ...[...new Set(GAMES.flatMap((g) => g.genres))].sort()], []);
  const playableCount = GAMES.filter((g) => g.play).length;

  const shown = GAMES.filter((g) => {
    if (status === "play" && !g.play) return false;
    if (status === "itch" && (g.play || !g.itch)) return false;
    if (genre !== "All" && !g.genres.includes(genre)) return false;
    return true;
  });

  return (
    <main className="games-page gridbg">
      <div className="wrap">
        <header className="games-head" data-reveal>
          <p className="games-tag">
            <span>The arcade</span>
          </p>
          <h1 className="display extrude games-title">
            All <span className="gold">games</span>
          </h1>
          <p className="games-sub">
            {GAMES.length} games built by GDU members. {playableCount} run right here in your browser, the rest open on
            itch.io. Most use the keyboard, so they play best on a laptop or desktop.
          </p>
        </header>

        <div className="games-filters" role="group" aria-label="Filter games">
          <div className="games-chips">
            {STATUS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={status === s.id ? "is-on" : ""}
                aria-pressed={status === s.id}
                onClick={() => setStatus(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <label className="games-genre">
            <span>Genre</span>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>

        {shown.length ? (
          <div className="games-grid">
            {shown.map((g, i) => (
              <GameCard key={g.id} game={g} index={i} onPlay={onPlayGame} />
            ))}
          </div>
        ) : (
          <p className="games-none">No games match those filters.</p>
        )}
      </div>
    </main>
  );
}
