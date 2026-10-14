import { useCallback, useEffect, useState } from "react";
import BootScreen from "./components/BootScreen.jsx";
import Cursor from "./components/Cursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import GameModal from "./components/GameModal.jsx";
import Home from "./pages/Home.jsx";
import { useReveal } from "./hooks/useReveal.js";
import { sfx } from "./utils/sfx.js";

export default function App() {
  const [gameOpen, setGameOpen] = useState(false);
  const openGame = useCallback(() => {
    sfx.start();
    setGameOpen(true);
  }, []);
  const closeGame = useCallback(() => setGameOpen(false), []);

  useReveal("home");

  // `/#play-now` is a shareable link that opens the game straight away.
  useEffect(() => {
    const check = () => window.location.hash === "#play-now" && setGameOpen(true);
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

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
      <Home onPlay={openGame} />
      <Footer />
      <GameModal open={gameOpen} onClose={closeGame} />
    </>
  );
}
