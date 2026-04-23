// src/App.jsx
import { useState } from "react";
import MainMenu    from "./screens/MainMenu.jsx";
import Chapters    from "./screens/Chapters.jsx";
import Reader      from "./screens/Reader.jsx";
import Roster      from "./screens/Roster.jsx";
import Fixtures    from "./screens/Fixtures.jsx";
import Kits        from "./screens/Kits.jsx";
import About       from "./screens/About.jsx";

export default function App() {
  const [screen, setScreen]   = useState("menu");
  const [chapter, setChapter] = useState(null);
  const [fixture, setFixture] = useState(null);

  const go = (dest, payload = null) => {
    if (dest === "reader")  setChapter(payload);
    if (dest === "fixture") setFixture(payload);
    setScreen(dest);
  };

  return (
    <>
      {screen === "menu"     && <MainMenu onGo={go} />}
      {screen === "chapters" && <Chapters onGo={go} />}
      {screen === "reader"   && <Reader   onGo={go} chapter={chapter} />}
      {screen === "roster"   && <Roster   onGo={go} />}
      {screen === "fixtures" && <Fixtures onGo={go} activeFixture={fixture} />}
      {screen === "kits"     && <Kits     onGo={go} />}
      {screen === "about"    && <About    onGo={go} />}
    </>
  );
}
