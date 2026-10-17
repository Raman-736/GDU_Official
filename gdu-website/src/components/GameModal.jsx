import { useEffect, useRef, useState } from "react";
import "./GameModal.css";

/** Full-screen player. `game` is { id, title, play, byline?, itch? }; null keeps it closed.
 *  `play` is the URL of a web build served from /public (the sip game, or one of /arcade/<id>/). */
export default function GameModal({ game, onClose }) {
  const frameRef = useRef(null);
  const closeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const open = Boolean(game);

  useEffect(() => {
    if (!open) {
      setLoaded(false);
      return;
    }
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!game) return null;

  const onLoad = () => {
    setLoaded(true);
    // Hand keyboard focus to the game so WASD works straight away.
    frameRef.current?.focus();
  };

  return (
    <div className="gm" role="dialog" aria-modal="true" aria-label={game.title}>
      <div className="gm-bar">
        <p className="gm-title">
          <span className="gm-dot" /> {game.title} <em>· {game.byline || "made by GDU"}</em>
        </p>
        <div className="gm-actions">
          <button
            type="button"
            className="gm-btn"
            onClick={() => frameRef.current?.requestFullscreen?.().catch(() => {})}
          >
            Fullscreen
          </button>
          {game.itch && (
            <a href={game.itch} target="_blank" rel="noreferrer" className="gm-btn">
              itch.io ↗
            </a>
          )}
          <a href={game.play} target="_blank" rel="noreferrer" className="gm-btn">
            New tab ↗
          </a>
          <button ref={closeRef} type="button" className="gm-btn gm-exit" onClick={onClose}>
            ✕ Exit
          </button>
        </div>
      </div>

      <div className="gm-stage">
        {!loaded && (
          <div className="gm-loading">
            <p>Loading {game.title}</p>
            <div className="gm-loading-bar">
              <span />
            </div>
          </div>
        )}
        <iframe
          key={game.id}
          ref={frameRef}
          src={game.play}
          title={game.title}
          allow="fullscreen; gamepad; autoplay"
          allowFullScreen
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
