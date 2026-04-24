// src/screens/MainMenu.jsx
import { useState, useEffect } from "react";
import { FIXTURES, PLAYERS } from "../dataLoader.js";

const LOGO    = "/logo.png";
const MENU_BG = "/menu-bg.jpg";   // ← drop your AI-generated image here

function getRecord(fixtures) {
  const played = fixtures.filter(f => f.result);
  return {
    W:      played.filter(f => f.result === "W").length,
    D:      played.filter(f => f.result === "D").length,
    L:      played.filter(f => f.result === "L").length,
    played: played.length,
  };
}

const NAV = [
  { icon: "📖", label: "Read the Story",     sub: "Chapters 1–4 available",   screen: "chapters", accent: "#c9a84c" },
  { icon: "📅", label: "Fixtures & Results",  sub: "Season 2025–26",           screen: "fixtures", accent: "#5ada5a" },
  { icon: "👥", label: "Squad & Staff",       sub: `${22} players · 1 coach`,  screen: "roster",   accent: "#6ab4e8" },
  { icon: "👕", label: "Kit Room",            sub: "Home & Away",              screen: "kits",     accent: "#e87b6a" },
  { icon: "📋", label: "Club Info",           sub: "124 years of history",     screen: "about",    accent: "#b46ae8" },
];

export default function MainMenu({ onGo }) {
  const [mounted, setMounted]   = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 40); }, []);

  // Preload bg image
  useEffect(() => {
    const img = new Image();
    img.src = MENU_BG;
    img.onload  = () => setBgLoaded(true);
    img.onerror = () => setBgLoaded(false);
  }, []);

  const rec       = getRecord(FIXTURES);
  const nextMatch = FIXTURES.find(f => !f.result);
  const squad     = PLAYERS.length;

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* ── BACKGROUND LAYERS ─────────────────────────────── */}

      {/* Stadium photo */}
      {bgLoaded && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${MENU_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.22,
          transition: "opacity 1s ease",
          zIndex: 0,
        }} />
      )}

      {/* Gradient overlays */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `
          linear-gradient(180deg,
            rgba(11,20,11,0.85)   0%,
            rgba(11,20,11,0.4)   35%,
            rgba(11,20,11,0.55)  65%,
            rgba(11,20,11,0.96) 100%
          ),
          radial-gradient(ellipse at 20% 50%, rgba(45,90,45,0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%)
        `,
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: `
          repeating-linear-gradient(0deg,  transparent, transparent 64px, rgba(201,168,76,0.025) 64px, rgba(201,168,76,0.025) 65px),
          repeating-linear-gradient(90deg, transparent, transparent 64px, rgba(201,168,76,0.025) 64px, rgba(201,168,76,0.025) 65px)
        `,
      }} />

      {/* Noise grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Season badge — top bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <span style={{ fontSize: "0.62rem", letterSpacing: 4, textTransform: "uppercase", color: "var(--fade)" }}>
            Season 2025–26
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { val: rec.W, lbl: "W", color: "#5ada5a" },
              { val: rec.D, lbl: "D", color: "#d4c050" },
              { val: rec.L, lbl: "L", color: "#e05a5a" },
            ].map(({ val, lbl, color }) => (
              <span key={lbl} style={{ fontSize: "0.75rem", color }}>
                <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>{val}</strong>
                <span style={{ color: "var(--fade)", marginLeft: 2 }}>{lbl}</span>
              </span>
            ))}
          </div>
          <span style={{ fontSize: "0.62rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--fade)" }}>
            Est. 1901
          </span>
        </div>

        {/* ── HERO ─────────────────────────────────────── */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "40px 24px 32px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>

          {/* Logo with glow ring */}
          <div style={{ position: "relative", marginBottom: 22 }}>
            <div style={{
              position: "absolute", inset: -12,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
              animation: "logoGlow 3s ease-in-out infinite alternate",
            }} />
            <img
              src={LOGO} alt="Loughborough Stags"
              style={{ width: 130, height: 130, objectFit: "contain", position: "relative", zIndex: 1 }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
          </div>

          {/* Main title */}
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 4.8rem)",
            letterSpacing: 6,
            lineHeight: 0.92,
            textAlign: "center",
            background: "linear-gradient(180deg, #e8c96a 0%, #c9a84c 50%, #8b6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Loughbottom FC
          </div>

          {/* Subtitle — italic serif */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
            color: "var(--fade)",
            letterSpacing: 3,
            marginTop: 10,
            textAlign: "center",
          }}>
            The Last Leap
          </div>

          {/* Thin gold rule with diamond */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <div style={{ color: "var(--gold)", fontSize: "0.5rem" }}>◆</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </div>

          {/* Next match pill */}
          {nextMatch ? (
            <div
              onClick={() => onGo("fixtures")}
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
                padding: "10px 20px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(201,168,76,0.08)"}
            >
              <div style={{ fontSize: "0.6rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>
                Next Match
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem" }}>
                vs {nextMatch.opponent}
                <span style={{ color: "var(--fade)", fontWeight: 400, fontStyle: "italic", marginLeft: 8 }}>
                  · {nextMatch.venue} · {nextMatch.round}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "0.75rem", color: "var(--fade)", letterSpacing: 2 }}>
              {rec.played} matches played this season
            </div>
          )}
        </div>

        {/* ── NAV BUTTONS ──────────────────────────────── */}
        <nav style={{
          display: "flex", flexDirection: "column",
          gap: 6, padding: "0 16px",
          flex: 1,
        }}>
          {NAV.map((item, i) => (
            <NavBtn
              key={item.screen}
              item={item}
              index={i}
              mounted={mounted}
              onGo={onGo}
            />
          ))}
        </nav>

        {/* ── FOOTER ───────────────────────────────────── */}
        <div style={{
          textAlign: "center",
          padding: "16px 20px 24px",
          borderTop: "1px solid rgba(201,168,76,0.07)",
          marginTop: 12,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.9s ease 0.6s",
        }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: 4, textTransform: "uppercase", color: "rgba(107,122,90,0.5)" }}>
            Proud · Noble · Forever
          </div>
        </div>

      </div>
    </div>
  );
}

function NavBtn({ item, index, mounted, onGo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onGo(item.screen)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${hexToRgb(item.accent)},0.08)` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? item.accent + "55" : "rgba(201,168,76,0.12)"}`,
        color: "var(--cream)",
        padding: "13px 16px",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateX(5px)" : "none",
        opacity: mounted ? 1 : 0,
        animation: mounted ? `pageFade 0.45s ease ${0.15 + index * 0.07}s both` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 3,
        background: item.accent,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.2s",
      }} />

      {/* Icon box */}
      <div style={{
        width: 38, height: 38,
        background: hovered ? `rgba(${hexToRgb(item.accent)},0.15)` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? item.accent + "40" : "rgba(255,255,255,0.06)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.15rem",
        flexShrink: 0,
        transition: "all 0.22s",
      }}>
        {item.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Crimson Pro', serif",
          fontWeight: 600,
          fontSize: "1rem",
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: hovered ? item.accent : "var(--cream)",
          transition: "color 0.2s",
          lineHeight: 1.2,
        }}>{item.label}</div>
        <div style={{
          fontSize: "0.72rem",
          color: "var(--fade)",
          marginTop: 2,
          fontStyle: "italic",
        }}>{item.sub}</div>
      </div>

      {/* Arrow */}
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "1.2rem",
        color: hovered ? item.accent : "var(--fade)",
        opacity: hovered ? 1 : 0.4,
        transition: "all 0.2s",
        transform: hovered ? "translateX(3px)" : "none",
      }}>›</span>
    </button>
  );
}

// Helper — convert hex to rgb string for rgba()
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0,2), 16);
  const g = parseInt(h.substring(2,4), 16);
  const b = parseInt(h.substring(4,6), 16);
  return `${r},${g},${b}`;
}
