import LevelHeader from "./LevelHeader.jsx";
import { FESTIVALS, QUESTS } from "../data/site.js";
import "./Events.css";

export default function Events() {
  return (
    <section className="section events gridbg" id="events">
      <div className="wrap">
        <LevelHeader
          level="04"
          kicker="Flagship events"
          sub="Each chapter runs its own annual flagship, and both are designed, organized and run by students."
        >
          Where the club <span className="gold">comes alive.</span>
        </LevelHeader>

        <div className="fest-grid">
          {FESTIVALS.map((f, i) => (
            <article
              key={f.id}
              className={`fest hud c-${f.color}`}
              data-reveal
              style={{ "--d": `${i * 0.12}s` }}
            >
              <div className="fest-top">
                <span className="fest-chapter">{f.chapter}</span>
                <span className="fest-ed">
                  <b>{f.editions}</b> editions
                </span>
              </div>
              <h3 className="fest-word" data-text={f.word}>
                {f.word}
              </h3>
              <p className="fest-text">{f.text}</p>
              <ul className="fest-acts">
                {f.activities.map((a, n) => (
                  <li key={a}>
                    <span>{String(n + 1).padStart(2, "0")}</span>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="fest-guests">
                <span>Note</span> {f.guests}
              </p>
            </article>
          ))}
        </div>

        <div className="quests" data-reveal>
          <div className="quests-head">
            <h3 className="display">Quest log</h3>
            <p>Workshops, jams & outreach beyond our own campuses</p>
          </div>
          <ol className="quest-list">
            {QUESTS.map((q, i) => (
              <li key={q.title}>
                <span className="quest-num">Q{String(i + 1).padStart(2, "0")}</span>
                <span className="quest-title">{q.title}</span>
                <span className="quest-meta">{q.meta}</span>
                <span className="quest-status">Complete</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
