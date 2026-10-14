import Hero from "../components/Hero.jsx";
import Tape from "../components/Tape.jsx";
import About from "../components/About.jsx";
import Chapters from "../components/Chapters.jsx";
import Arcade from "../components/Arcade.jsx";
import Events from "../components/Events.jsx";
import Achievements from "../components/Achievements.jsx";
import Allies from "../components/Allies.jsx";
import InsertCoin from "../components/InsertCoin.jsx";

export default function Home({ onPlay }) {
  return (
    <main>
      <Hero onPlay={onPlay} />
      <Tape />
      <About />
      <Chapters />
      <Arcade onPlay={onPlay} />
      <Events />
      <Achievements />
      <Allies />
      <InsertCoin onPlay={onPlay} />
    </main>
  );
}
