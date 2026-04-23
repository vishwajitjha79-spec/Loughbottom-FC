// src/screens/MainMenu.jsx
import { useState, useEffect } from "react";
import { FIXTURES } from "../dataLoader.js";

const LOGO     = "/logo.png";
const HOME_KIT = "/home-kit.png";

// Derive quick season stats from fixture data
function getSeasonRecord(fixtures) {
  const played = fixtures.filter(f => f.result);
  return {
    W: played.filter(f => f.result === "W").length,
    D: played.filter(f => f.result === "D").length,
    L: played.filter(f => f.result === "L").length,
    played: played.length,
  };
}

export default function MainMenu({ onGo }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  const rec = getSeasonRecord(FIXTURES);
  const nextMatch = FIXTURES.find(f => !f.result);

  const nav = [
    { icon: "📖", label: "Read the Story",    sub: "Chapters 1–4 available",  screen: "chapters" },
    { icon: "📅", label: "Fixtures & Results", sub: `${rec.played} played this season`, screen: "fixtures" },
    { icon: "👥", label: "Squad & Staff",      sub: "Players · Coach",          screen: "roster"   },
    { icon: "👕", label: "Kit Room",           sub: "Home & Away",              screen: "kits"     },
    { icon: "📋", label: "Club Info",          sub: "History · 124 years",      screen: "about"    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `
        radial-gradient(ellipse at 15% 55%, rgba(45,90,45,0.35) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 20%, rgba(201,168,76,0.07) 0%, transparent 45%),
        var(--ink)
      `,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          repeating-linear-gradient(0deg,   transparent, transparent 58px, rgba(201,168,76,0.028) 58px, rgba(201,168,76,0.028) 59px),
          repeating-linear-gradient(90deg,  transparent, transparent 58px, rgba(201,168,76,0.028) 58px, rgba(201,168,76,0.028) 59px)
        `,
      }} />

      {/* Hero */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "52px 24px 28px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <img
          src={LOGO} alt="Stags Crest"
          style={{
            width: 148, height: 148,
            objectFit: "contain",
            animation: "logoGlow 3s ease-in-out infinite alternate",
          }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />

        {/* Title block */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.6rem, 9vw, 4rem)",
            letterSpacing: 5,
            color: "var(--gold)",
            lineHeight: 1,
          }}>Loughbottom FC</div>

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
            color: "var(--fade)",
            letterSpacing: 3,
            marginTop: 7,
          }}>The Last Leap</div>
        </div>

        {/* Gold rule */}
        <div style={{
          width: 72, height: 1,
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          margin: "22px auto",
        }} />

        {/* Season record pill */}
        <div style={{
          display: "flex", gap: 0,
          border: "1px solid var(--border)",
          overflow: "hidden",
          fontSize: "0.78rem",
        }}>
          {[
            { label: "W", val: rec.W, color: "#5ada5a" },
            { label: "D", val: rec.D, color: "#d4c050" },
            { label: "L", val: rec.L, color: "#e05a5a" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{
              padding: "8px 18px",
              textAlign: "center",
              borderRight: label !== "L" ? "1px solid var(--border)" : "none",
              background: "var(--glass)",
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: 2, color: "var(--fade)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Next match */}
        {nextMatch && (
          <div style={{
            marginTop: 14,
            fontSize: "0.78rem",
            color: "var(--fade)",
            letterSpacing: 1,
            textAlign: "center",
          }}>
            Next · <span style={{ color: "var(--cream)" }}>{nextMatch.opponent}</span>
            {" · "}
            <span style={{ color: "var(--gold)" }}>{nextMatch.venue}</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{
        display: "flex", flexDirection: "column",
        gap: 8, padding: "0 20px 12px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease 0.2s",
      }}>
        {nav.map((item, i) => (
          <button
            key={item.screen}
            onClick={() => onGo(item.screen)}
            style={{
              background: "var(--glass)",
              border: "1px solid var(--border)",
              color: "var(--cream)",
              padding: "15px 18px",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 14,
              transition: "all 0.22s ease",
              animation: `pageFade 0.4s ease ${0.1 + i * 0.07}s both`,
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--glass-gold)";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.45)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--glass)";
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "none";
            }}
          >
            {/* Left accent */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 3, background: "var(--gold)", opacity: 0,
              transition: "opacity 0.2s",
            }} />
            <span style={{ fontSize: "1.3rem", width: 26 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 600,
                fontSize: "1.05rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}>{item.label}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--fade)", marginTop: 1 }}>{item.sub}</div>
            </div>
            <span style={{ color: "var(--gold)", opacity: 0.5, fontSize: "1.1rem" }}>›</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "14px 20px 28px",
        fontSize: "0.68rem",
        letterSpacing: 3,
        textTransform: "uppercase",
        color: "var(--fade)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        marginTop: "auto",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
      }}>
        Loughborough University Stags · Est. 1901 · Season 2025–26
      </div>
    </div>
  );
}
