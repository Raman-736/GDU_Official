import LevelHeader from "./LevelHeader.jsx";
import { CHAPTERS } from "../data/site.js";
import "./Chapters.css";

export default function Chapters() {
  return (
    <section className="section chapters" id="chapters">
      <div className="wrap">
        <LevelHeader level="02" kicker="Two campuses" sub={CHAPTERS.lead}>
          Pick your <span className="gold">chapter.</span>
        </LevelHeader>

        <div className="chapter-grid">
          {CHAPTERS.list.map((c, i) => (
            <article
              key={c.id}
              className={`chapter hud c-${c.color}`}
              data-reveal
              style={{ "--d": `${i * 0.12}s` }}
            >
              <div className="chapter-top">
                <span className="chapter-short">{c.short}</span>
                <span className="chapter-est">EST.</span>
              </div>
              <p className="chapter-year" aria-label={`Founded ${c.year}`}>
                {c.year}
              </p>
              <h3 className="chapter-name">{c.name}</h3>
              <p className="chapter-place">{c.place}</p>
              <p className="chapter-tagline">{c.tagline}</p>

              <dl className="chapter-facts">
                {c.facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>

              <ul className="chapter-tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="together" data-reveal>
          <p className="together-label">
            <span>×</span> Built together
          </p>
          <ul>
            {CHAPTERS.together.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
