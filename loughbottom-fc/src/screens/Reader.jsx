// src/screens/Reader.jsx
import { CHAPTERS } from "../dataLoader.js";
import { PrimaryBtn, GhostBtn, Divider } from "../components/UI.jsx";

export default function Reader({ onGo, chapter }) {
  if (!chapter) { onGo("chapters"); return null; }

  const paragraphs   = chapter.content.split("\n\n").filter(Boolean);
  const allUnlocked  = CHAPTERS.filter(c => !c.locked);
  const nextIndex    = allUnlocked.findIndex(c => c.id === chapter.id) + 1;
  const nextChapter  = allUnlocked[nextIndex] || null;
  const lockedNext   = CHAPTERS.find(c => c.id === chapter.id + 1 && c.locked);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)", display: "flex", flexDirection: "column" }}>

      {/* Sticky header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 18px",
        background: "rgba(11,20,11,0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 20,
      }}>
        <button
          onClick={() => onGo("chapters")}
          style={{
            background: "none", border: "1px solid var(--border)",
            color: "var(--gold)", width: 36, height: 36,
            fontSize: "1.1rem", display: "flex",
            alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--glass-gold)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >‹</button>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.62rem", letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase" }}>Chapter {chapter.id}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, lineHeight: 1.2 }}>{chapter.title}</div>
        </div>

        <button
          onClick={() => onGo("menu")}
          style={{
            background: "none", border: "1px solid var(--border)",
            color: "var(--fade)", padding: "7px 13px",
            fontSize: "0.68rem", letterSpacing: 2,
            textTransform: "uppercase", fontFamily: "'Crimson Pro', serif",
            fontWeight: 600, transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--fade)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >≡ Menu</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "36px 24px 24px", maxWidth: 680, margin: "0 auto", width: "100%" }}>

        {/* Title block */}
        <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 7vw, 3rem)",
            fontWeight: 900, lineHeight: 1.1, color: "var(--cream)",
          }}>{chapter.title}</h1>
          <p style={{ fontStyle: "italic", color: "var(--fade)", fontSize: "1rem", marginTop: 8 }}>{chapter.subtitle}</p>
        </div>

        {/* Body */}
        <div>
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              fontSize: "1.12rem",
              lineHeight: 1.88,
              color: "#d8d0c0",
              marginBottom: "1.6em",
              fontWeight: 300,
              // Drop cap on first paragraph
              ...(i === 0 ? { textIndent: 0 } : {}),
            }}>
              {i === 0
                ? <><span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "4.8em",
                    fontWeight: 900,
                    float: "left",
                    lineHeight: 0.78,
                    marginRight: 10,
                    marginTop: 8,
                    color: "var(--gold)",
                  }}>{p[0]}</span>{p.slice(1)}</>
                : p}
            </p>
          ))}
        </div>

        <Divider />

        {/* End of chapter nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--fade)", marginBottom: 4 }}>
            End of Chapter {chapter.id}
          </div>

          {nextChapter ? (
            <PrimaryBtn onClick={() => onGo("reader", nextChapter)}>
              Next: {nextChapter.title} →
            </PrimaryBtn>
          ) : lockedNext ? (
            <PrimaryBtn disabled>Chapter {lockedNext.id} Coming Soon</PrimaryBtn>
          ) : null}

          <GhostBtn onClick={() => onGo("chapters")}>Back to Chapters</GhostBtn>
          <GhostBtn onClick={() => onGo("menu")}>Main Menu</GhostBtn>
        </div>
      </div>
    </div>
  );
}
