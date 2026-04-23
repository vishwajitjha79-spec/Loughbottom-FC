// src/components/UI.jsx
// Shared micro-components used across all screens

import { useEffect } from "react";

// ── Page wrapper with fade-in ─────────────────────────────────
export function Page({ children, style = {} }) {
  return (
    <div className="page-enter" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--ink)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Top header bar ────────────────────────────────────────────
export function Header({ title, sub, onBack, right }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 20px",
      borderBottom: "1px solid var(--border)",
      background: "rgba(11,20,11,0.85)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 20,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "none",
          border: "1px solid var(--border)",
          color: "var(--gold)",
          width: 38, height: 38,
          fontSize: "1.2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--glass-gold)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >‹</button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.5rem",
          letterSpacing: 3,
          color: "var(--gold)",
          lineHeight: 1,
        }}>{title}</div>
        {sub && <div style={{ fontSize: "0.72rem", color: "var(--fade)", letterSpacing: 1, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: "0.68rem",
      letterSpacing: 4,
      textTransform: "uppercase",
      color: "var(--gold)",
      padding: "18px 20px 10px",
      borderBottom: "1px solid var(--border)",
    }}>{children}</div>
  );
}

// ── Gold divider line ─────────────────────────────────────────
export function Divider() {
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
      margin: "32px 0",
      opacity: 0.35,
    }} />
  );
}

// ── Primary (gold) button ─────────────────────────────────────
export function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "rgba(201,168,76,0.3)" : "var(--gold)",
      color: "var(--ink)",
      border: "none",
      padding: "15px 24px",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "1.15rem",
      letterSpacing: 3,
      width: "100%",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "var(--gold-light)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "var(--gold)"; }}
    >{children}</button>
  );
}

// ── Secondary (ghost) button ──────────────────────────────────
export function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none",
      color: "var(--cream)",
      border: "1px solid var(--border)",
      padding: "13px 24px",
      fontFamily: "'Crimson Pro', serif",
      fontSize: "0.88rem",
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 600,
      width: "100%",
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--cream)"; }}
    >{children}</button>
  );
}

// ── Stat cell ─────────────────────────────────────────────────
export function StatCell({ num, label }) {
  return (
    <div style={{
      background: "var(--glass)",
      border: "1px solid var(--border)",
      padding: "14px 10px",
      textAlign: "center",
    }}>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "2rem",
        color: "var(--gold)",
        lineHeight: 1,
        display: "block",
      }}>{num}</span>
      <span style={{
        fontSize: "0.62rem",
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "var(--fade)",
        display: "block",
        marginTop: 4,
      }}>{label}</span>
    </div>
  );
}

// ── Slide-up modal sheet ──────────────────────────────────────
export function Sheet({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(5,10,5,0.93)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0c1d0c",
          border: "1px solid var(--border)",
          borderBottom: "none",
          borderRadius: "16px 16px 0 0",
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "sheetUp 0.38s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{
          width: 40, height: 4,
          background: "rgba(201,168,76,0.3)",
          borderRadius: 2,
          margin: "12px auto",
        }} />
        {children}
      </div>
    </div>
  );
}

// ── New player notification ───────────────────────────────────
export function Notification({ player, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed",
      top: 20,
      left: "50%",
      zIndex: 200,
      background: "linear-gradient(135deg, var(--green) 0%, #0f2a0f 100%)",
      border: "1px solid var(--gold)",
      borderRadius: 6,
      padding: "16px 20px 16px 16px",
      minWidth: 270,
      maxWidth: 340,
      boxShadow: "0 12px 48px rgba(0,0,0,0.7)",
      animation: "notifDrop 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
    }}>
      <div style={{
        width: 36, height: 36,
        background: "var(--gold)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem",
        flexShrink: 0,
      }}>⚡</div>
      <div>
        <div style={{ fontSize: "0.62rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
          New Signing
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--cream)" }}>
          {player.name}
        </div>
        <div style={{ fontSize: "0.82rem", color: "var(--fade)", fontStyle: "italic", marginTop: 2 }}>
          {player.role} · #{player.number}
        </div>
      </div>
    </div>
  );
}

// ── Result badge ──────────────────────────────────────────────
export function ResultBadge({ result }) {
  const colors = {
    W: { bg: "rgba(45,120,45,0.2)", border: "rgba(45,180,45,0.4)", text: "#5ada5a" },
    L: { bg: "rgba(140,30,30,0.2)", border: "rgba(200,50,50,0.4)", text: "#e05a5a" },
    D: { bg: "rgba(140,120,30,0.2)", border: "rgba(200,180,50,0.4)", text: "#d4c050" },
  };
  const c = colors[result] || { bg: "var(--glass)", border: "var(--border)", text: "var(--fade)" };
  return (
    <span style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "0.9rem",
      letterSpacing: 2,
      padding: "3px 10px",
      borderRadius: 2,
    }}>
      {result || "TBD"}
    </span>
  );
}
