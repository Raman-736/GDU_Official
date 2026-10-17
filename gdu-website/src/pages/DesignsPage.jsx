import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { DESIGNS } from "../data/designs.js";
import "./DesignsPage.css";

const ARTISTS = [...new Set(DESIGNS.flatMap((d) => d.developers))].sort();

function Card({ design, index, onOpen }) {
  const videoRef = useRef(null);
  const cover = design.media[0];
  const isVideo = cover.type === "video";

  // Videos preview on hover; touch devices just show the poster until opened.
  const hover = (on) => {
    const v = videoRef.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <button
      type="button"
      className="design hud"
      style={{ "--d": `${Math.min(index, 10) * 0.035}s`, "--ar": `${cover.w} / ${cover.h}` }}
      onClick={() => onOpen(design)}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      aria-label={`${design.title} by ${design.developers.join(", ")}`}
    >
      <span className="design-media">
        {isVideo ? (
          <video ref={videoRef} src={cover.src} poster={cover.poster} muted loop playsInline preload="none" />
        ) : (
          <img src={cover.src} alt="" loading="lazy" width={cover.w} height={cover.h} />
        )}
        {isVideo && (
          <span className="design-badge">
            <Play size={11} strokeWidth={0} fill="currentColor" aria-hidden="true" /> Video
          </span>
        )}
        {design.media.length > 1 && <span className="design-count">{design.media.length} files</span>}
      </span>
      <span className="design-info">
        <b>{design.title}</b>
        <em>{design.developers.join(", ")}</em>
      </span>
    </button>
  );
}

function Lightbox({ design, onClose, onStep }) {
  const [i, setI] = useState(0);
  const closeRef = useRef(null);
  const item = design.media[i];

  useEffect(() => {
    document.body.classList.add("no-scroll");
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={design.title} onClick={onClose}>
      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        <div className="lb-stage">
          {item.type === "video" ? (
            <video key={item.src} src={item.src} poster={item.poster} controls autoPlay loop playsInline />
          ) : (
            <img key={item.src} src={item.src} alt={design.title} />
          )}
        </div>

        <aside className="lb-side">
          <h2 className="display lb-title">{design.title}</h2>
          <p className="lb-by">by {design.developers.join(", ")}</p>
          {design.description && <p className="lb-desc">{design.description}</p>}
          {design.media.length > 1 && (
            <div className="lb-thumbs" role="group" aria-label="Files in this design">
              {design.media.map((m, n) => (
                <button
                  key={m.src}
                  type="button"
                  className={n === i ? "is-on" : ""}
                  onClick={() => setI(n)}
                  aria-label={`File ${n + 1}`}
                  aria-pressed={n === i}
                >
                  <img src={m.type === "video" ? m.poster : m.src} alt="" loading="lazy" />
                  {m.type === "video" && <Play size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </aside>

        <button ref={closeRef} type="button" className="lb-btn lb-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <button type="button" className="lb-btn lb-prev" onClick={() => onStep(-1)} aria-label="Previous design">
          <ChevronLeft size={22} />
        </button>
        <button type="button" className="lb-btn lb-next" onClick={() => onStep(1)} aria-label="Next design">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

export default function DesignsPage() {
  const [artist, setArtist] = useState("All");
  const [openId, setOpenId] = useState(null);

  const shown = useMemo(
    () => DESIGNS.filter((d) => artist === "All" || d.developers.includes(artist)),
    [artist]
  );
  const open = shown.find((d) => d.id === openId) || null;

  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback(
    (dir) => {
      setOpenId((id) => {
        const at = shown.findIndex((d) => d.id === id);
        return at < 0 ? id : shown[(at + dir + shown.length) % shown.length].id;
      });
    },
    [shown]
  );

  const videos = DESIGNS.filter((d) => d.media.some((m) => m.type === "video")).length;

  return (
    <main className="designs-page gridbg">
      <div className="wrap">
        <header className="designs-head" data-reveal>
          <p className="designs-tag">
            <span>The studio</span>
          </p>
          <h1 className="display extrude designs-title">
            The <span className="gold">designs</span>
          </h1>
          <p className="designs-sub">
            {DESIGNS.length} pieces of 3D, 2D and animation work by GDU members, {videos} of them with motion. Hover a
            video to preview it, click anything to see it full size.
          </p>
        </header>

        <div className="designs-filters" role="group" aria-label="Filter by artist">
          {["All", ...ARTISTS].map((a) => (
            <button key={a} type="button" className={artist === a ? "is-on" : ""} aria-pressed={artist === a} onClick={() => setArtist(a)}>
              {a}
            </button>
          ))}
        </div>

        <div className="designs-grid">
          {shown.map((d, i) => (
            <Card key={d.id} design={d} index={i} onOpen={(x) => setOpenId(x.id)} />
          ))}
        </div>
      </div>

      {open && <Lightbox key={open.id} design={open} onClose={close} onStep={step} />}
    </main>
  );
}
