import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BootScreen from "./components/BootScreen.jsx";
import Cursor from "./components/Cursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import GameModal from "./components/GameModal.jsx";
import Home from "./pages/Home.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import GamesPage from "./pages/GamesPage.jsx";
import DesignsPage from "./pages/DesignsPage.jsx";
import { GAME } from "./data/site.js";
import { GAMES } from "./data/games.js";
import { useReveal } from "./hooks/useReveal.js";
import { sfx } from "./utils/sfx.js";

// The sip game built into /public/play, the club's flagship playable.
const ISLAND = { id: "gdu-island", title: GAME.title, play: "/play/index.html" };

const asPlayer = (g) => ({ id: g.id, title: g.title, play: g.play, itch: g.itch, byline: `by ${g.developers.join(", ")}` });

export default function App() {
  const location = useLocation();
  const [activeGame, setActiveGame] = useState(null);
  const gameOpen = activeGame !== null;
  const openGame = useCallback(() => {
    sfx.start();
    setActiveGame(ISLAND);
  }, []);
  const playGame = useCallback((g) => {
    sfx.start();
    setActiveGame(asPlayer(g));
  }, []);
  const closeGame = useCallback(() => setActiveGame(null), []);

  useReveal(location.pathname);

  // Hash links (/#about) scroll to the section; route changes start at the top.
  // `/#play-now` is a shareable link that opens the island game straight away,
  // and `/games#play-<id>` opens any web-playable game from the library.
  useEffect(() => {
    if (location.hash === "#play-now") {
      setActiveGame(ISLAND);
      return;
    }
    const shared = location.hash.startsWith("#play-") && GAMES.find((g) => g.play && `#play-${g.id}` === location.hash);
    if (shared) {
      setActiveGame(asPlayer(shared));
      return;
    }
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [location.key, location.hash]);

  // Optional 8-bit UI sounds on hover/click (toggled in the navbar).
  useEffect(() => {
    let last = null;
    const over = (e) => {
      const el = e.target.closest("a, button");
      if (el && el !== last) sfx.hover();
      last = el;
    };
    const click = (e) => {
      if (e.target.closest("a, button")) sfx.click();
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click);
    };
  }, []);

  return (
    <>
      <BootScreen />
      <Cursor hidden={gameOpen} />
      <Navbar onPlay={openGame} />
      <Routes>
        <Route path="/" element={<Home onPlay={openGame} />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/games" element={<GamesPage onPlayGame={playGame} />} />
        <Route path="/designs" element={<DesignsPage />} />
        <Route path="*" element={<Home onPlay={openGame} />} />
      </Routes>
      <Footer />
      <GameModal game={activeGame} onClose={closeGame} />
    </>
  );
}
