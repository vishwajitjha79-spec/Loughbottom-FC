// src/screens/About.jsx
import { Page, Header, StatCell, Divider } from "../components/UI.jsx";
import { FIXTURES } from "../dataLoader.js";

const LOGO = "/logo.png";

export default function About({ onGo }) {
  const results = FIXTURES.filter(f => f.result);
  const goalsFor = results.reduce((s, f) => s + (f.scoreUs ?? 0), 0);

  return (
    <Page>
      <Header title="Club Info" sub="Loughborough University Stags" onBack={() => onGo("menu")} />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, var(--green) 0%, transparent 100%)",
        padding: "40px 24px 48px",
        textAlign: "center",
      }}>
        <img src={LOGO} alt="Stags Crest" style={{ width: 100, height: 100, objectFit: "contain", margin: "0 auto 16px" }}
          onError={e => { e.currentTarget.style.display = "none"; }} />
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: 4, color: "var(--gold)" }}>
          The Loughborough Stags
        </div>
        <div style={{ fontStyle: "italic", color: "var(--fade)", marginTop: 6, fontSize: "0.95rem" }}>
          Proud · Noble · Forever
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        {[
          { val: "124", lbl: "Years of Tournament" },
          { val: "31",  lbl: "Since Semi-Finals" },
          { val: "0",   lbl: "Championships" },
        ].map(({ val, lbl }) => (
          <div key={lbl} style={{ padding: "20px 8px", textAlign: "center", borderRight: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: "var(--gold)", lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase", color: "var(--fade)", marginTop: 4 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "0 24px 48px" }}>
        <Divider />
        {[
          "Founded in 1901, the Loughborough Stags have competed in the English Inter-College Annual Football Tournament since its inception. They have never won it. The closest they came was a semi-final appearance 31 years ago — before Joe Clark was born.",
          "Across campuses and rival stands, the team is known by another name: Loughbottom FC. The moniker was not chosen by anyone in particular. It emerged, the way all accurate nicknames do, from a collective recognition of a pattern too consistent to be coincidence.",
          "Season 2025–26 is Captain Joe Clark's final year. Coach Darren Russell has been here nine seasons. The pitch has new nets. The goal posts have been repainted. The badge still shows a stag mid-leap — caught forever in the moment before it lands.",
        ].map((p, i) => (
          <p key={i} style={{ color: "#c0b898", lineHeight: 1.82, marginBottom: "1.3em", fontSize: "1.05rem" }}>{p}</p>
        ))}

        <Divider />

        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.3rem",
          fontStyle: "italic",
          color: "var(--gold-pale)",
          textAlign: "center",
          padding: "8px 0",
        }}>"Proud. Noble. Forever."</div>
      </div>
    </Page>
  );
}
