// src/screens/Chapters.jsx
import { CHAPTERS } from "../dataLoader.js";
import { Page, Header } from "../components/UI.jsx";

export default function Chapters({ onGo }) {
  return (
    <Page>
      <Header title="The Story" sub="124 Years · One Last Chance" onBack={() => onGo("menu")} />

      <div style={{ padding: "16px 16px 48px", display: "flex", flexDirection: "column", gap: 10 }}>
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            onClick={() => !ch.locked && onGo("reader", ch)}
            style={{
              border: "1px solid var(--border)",
              background: ch.locked ? "rgba(255,255,255,0.02)" : "var(--glass)",
              padding: "20px 20px",
              cursor: ch.locked ? "not-allowed" : "pointer",
              opacity: ch.locked ? 0.4 : 1,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.22s ease",
              animation: `pageFade 0.4s ease ${i * 0.06}s both`,
            }}
            onMouseEnter={e => { if (!ch.locked) { e.currentTarget.style.background = "var(--glass-gold)"; e.currentTarget.style.transform = "translateX(4px)"; }}}
            onMouseLeave={e => { if (!ch.locked) { e.currentTarget.style.background = "var(--glass)"; e.currentTarget.style.transform = "none"; }}}
          >
            {/* Chapter number watermark */}
            <div style={{
              position: "absolute", right: 16, top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "4rem",
              color: "rgba(201,168,76,0.07)",
              lineHeight: 1,
              pointerEvents: "none",
            }}>{String(ch.id).padStart(2, "0")}</div>

            <div style={{ fontSize: "0.65rem", letterSpacing: 4, color: "var(--gold)", marginBottom: 5, textTransform: "uppercase" }}>
              Chapter {ch.id}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.2, color: "var(--cream)" }}>
              {ch.title}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--fade)", fontStyle: "italic", marginTop: 5 }}>
              {ch.subtitle}
            </div>

            {ch.locked && (
              <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: "1rem", opacity: 0.5 }}>🔒</div>
            )}
          </div>
        ))}
      </div>
    </Page>
  );
}
