import { Github, Linkedin, Mail } from "lucide-react";
import LevelHeader from "../components/LevelHeader.jsx";
import { BOARD, COUNCIL_YEAR, IIITK_COUNCIL, PICT_COUNCIL } from "../data/team.js";
import "./TeamPage.css";

function MemberCard({ member, index }) {
  const { role, short, color, name, photo, linkedin, github, email } = member;
  const links = [
    { label: "LinkedIn", href: linkedin, Icon: Linkedin },
    { label: "GitHub", href: github, Icon: Github },
    { label: "Email", href: email && `mailto:${email}`, Icon: Mail, title: email },
  ];
  return (
    <article className={`member hud c-${color}`} data-reveal style={{ "--d": `${(index % 5) * 0.07}s` }}>
      <div className="member-photo">
        {photo ? (
          <img src={photo} alt={name || role} loading="lazy" />
        ) : (
          <div className="member-empty" aria-hidden="true">
            <img src="/images/gdu_logo.png" alt="" />
            <span>{short}</span>
          </div>
        )}
      </div>
      <div className="member-info">
        <h3 className={name ? "" : "is-tba"}>{name || "To be announced"}</h3>
        <p className="member-role">{role}</p>
      </div>
      <div className="member-socials">
        {links.map(({ label, href, Icon, title }) =>
          href ? (
            <a
              key={label}
              href={href}
              title={title}
              {...(label !== "Email" && { target: "_blank", rel: "noreferrer" })}
              aria-label={`${name || role} - ${label}`}
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ) : (
            <span key={label} aria-hidden="true">
              <Icon size={16} strokeWidth={1.75} />
            </span>
          )
        )}
      </div>
    </article>
  );
}

function Group({ id, level, kicker, title, people, emptyText }) {
  return (
    <section className="team-section" id={id}>
      <LevelHeader level={level} kicker={kicker}>
        {title}
      </LevelHeader>
      {people.length ? (
        <div className="team-grid">
          {people.map((m, i) => (
            <MemberCard key={m.name || m.role} member={m} index={i} />
          ))}
        </div>
      ) : (
        <div className="team-empty" data-reveal>
          <img src="/images/gdu_logo.png" alt="" width="56" height="56" />
          <p>{emptyText}</p>
        </div>
      )}
    </section>
  );
}

export default function TeamPage() {
  return (
    <main className="team-page gridbg">
      <div className="wrap">
        <header className="team-head">
          <p className="team-tag">
            <span>Meet the crew</span>
          </p>
          <h1 className="display extrude team-title">
            The <span className="gold">team</span>
          </h1>
          <nav className="team-jump" aria-label="Jump to a group">
            <a href="#board">Board</a>
            <a href="#pict-council">GDU PICT</a>
            <a href="#iiitk-council">GDU IIITK</a>
          </nav>
        </header>

        <Group
          id="board"
          level="01"
          kicker={`${BOARD.length} members`}
          title={<>Board <span className="gold">members.</span></>}
          people={BOARD}
        />
        <Group
          id="pict-council"
          level="02"
          kicker={`Pune · ${PICT_COUNCIL.length} players`}
          title={<>GDU PICT <span className="gold">council</span> {COUNCIL_YEAR}</>}
          people={PICT_COUNCIL}
        />
        <Group
          id="iiitk-council"
          level="03"
          kicker="Kottayam · coming soon"
          title={<>GDU IIITK <span className="gold">council</span> {COUNCIL_YEAR}</>}
          people={IIITK_COUNCIL}
          emptyText="The GDU IIIT Kottayam council will be announced soon."
        />
      </div>
    </main>
  );
}
