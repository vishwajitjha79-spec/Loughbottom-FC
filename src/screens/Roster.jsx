// src/screens/Roster.jsx
import { useState } from "react";
import { PLAYERS, COACH, getPlayerPhoto } from "../dataLoader.js";
import { Page, Header, SectionLabel, Notification } from "../components/UI.jsx";
import { PlayerModal, CoachModal } from "../components/PlayerModal.jsx";

// Group players by position category
const POSITION_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

function categorise(role) {
  const r = role.toLowerCase();
  if (r.includes("goalkeeper") || r === "gk") return "Goalkeeper";
  if (r.includes("back") || r.includes("cb") || r.includes("centre back") || r.includes("defender")) return "Defender";
  if (r.includes("mid") || r.includes("winger") || r.includes("wing")) return "Midfielder";
  if (r.includes("striker") || r.includes("forward") || r.includes("st") || r.includes("am")) return "Forward";
  return "Midfielder";
}

const ROLE_COLOR = {
  Goalkeeper: "#e87b6a",
  Defender:   "#6ab4e8",
  Midfielder: "#c9a84c",
  Forward:    "#5ada5a",
};

export default function Roster({ onGo }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showCoach,      setShowCoach]      = useState(false);
  const [viewMode,       setViewMode]       = useState("grid");   // "grid" | "list"
  const [posFilter,      setPosFilter]      = useState("All");
  const [notification,   setNotification]   = useState(null);

  const posOptions = ["All", ...POSITION_ORDER];

  const filtered = posFilter === "All"
    ? PLAYERS
    : PLAYERS.filter(p => categorise(p.role) === posFilter);

  // Group by position for grid view
  const grouped = POSITION_ORDER.reduce((acc, cat) => {
    const group = filtered.filter(p => categorise(p.role) === cat);
    if (group.length) acc[cat] = group;
    return acc;
  }, {});

  return (
    <Page>
      <Header
        title="Squad & Staff"
        sub={`${PLAYERS.length} players · Season 2025–26`}
        onBack={() => onGo("menu")}
        right={
          <button
            onClick={() => setViewMode(v => v === "grid" ? "list" : "grid")}
            style={{
              background: "none", border: "1px solid var(--border)",
              color: "var(--gold)", padding: "7px 12px",
              fontSize: "0.9rem", cursor: "pointer",
            }}
            title="Toggle view"
          >
            {viewMode === "grid" ? "☰" : "⊞"}
          </button>
        }
      />

      {notification && <Notification player={notification} onDone={() => setNotification(null)} />}
      {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      {showCoach && <CoachModal coach={COACH} onClose={() => setShowCoach(false)} />}

      {/* Coach card */}
      <SectionLabel>Coaching Staff</SectionLabel>
      <CoachCard coach={COACH} onClick={() => setShowCoach(true)} />

      {/* Players */}
      <SectionLabel>Players</SectionLabel>

      {/* Position filter pills */}
      <div style={{ display: "flex", gap: 6, padding: "10px 16px 4px", overflowX: "auto" }}>
        {posOptions.map(pos => (
          <button
            key={pos}
            onClick={() => setPosFilter(pos)}
            style={{
              background: posFilter === pos
                ? (ROLE_COLOR[pos] || "var(--gold)")
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${posFilter === pos
                ? (ROLE_COLOR[pos] || "var(--gold)")
                : "var(--border)"}`,
              color: posFilter === pos ? "var(--ink)" : "var(--fade)",
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "6px 14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >{pos}</button>
        ))}
      </div>

      {/* Player listing */}
      {viewMode === "grid" ? (
        <GridView grouped={grouped} onSelect={setSelectedPlayer} />
      ) : (
        <ListView players={filtered} onSelect={setSelectedPlayer} />
      )}
    </Page>
  );
}

/* ── GRID VIEW ─────────────────────────────────────────────── */
function GridView({ grouped, onSelect }) {
  return (
    <div style={{ padding: "8px 12px 48px" }}>
      {Object.entries(grouped).map(([cat, players]) => (
        <div key={cat} style={{ marginBottom: 20 }}>
          {/* Category header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 4px 8px",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: ROLE_COLOR[cat], flexShrink: 0 }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: ROLE_COLOR[cat] }}>
              {cat}s
            </span>
            <div style={{ flex: 1, height: 1, background: `${ROLE_COLOR[cat]}22` }} />
            <span style={{ fontSize: "0.65rem", color: "var(--fade)" }}>{players.length}</span>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {players.map((p, i) => (
              <PlayerGridCard key={p.slug || p.name} player={p} index={i} color={ROLE_COLOR[cat]} onClick={() => onSelect(p)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlayerGridCard({ player, index, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgOk,   setImgOk]   = useState(true);
  const photo = getPlayerPhoto(player);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? color + "55" : "var(--border)"}`,
        background: hovered ? `rgba(${hexToRgb(color)},0.07)` : "rgba(255,255,255,0.03)",
        padding: "14px 12px",
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        position: "relative",
        overflow: "hidden",
        animation: `pageFade 0.4s ease ${index * 0.04}s both`,
      }}
    >
      {/* Jersey number — large watermark */}
      <div style={{
        position: "absolute", right: 6, top: 2,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "4.5rem",
        color: `${color}12`,
        lineHeight: 1,
        pointerEvents: "none",
        transition: "color 0.22s",
        ...(hovered ? { color: `${color}22` } : {}),
      }}>{player.number}</div>

      {/* Top row: photo + number badge */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
        {/* Photo circle */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          border: `2px solid ${color}55`,
          overflow: "hidden", flexShrink: 0,
          background: "rgba(255,255,255,0.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {imgOk ? (
            <img
              src={photo} alt={player.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <span style={{ fontSize: "1.2rem" }}>👤</span>
          )}
        </div>

        {/* Jersey number badge */}
        <div style={{
          background: color,
          color: "#0b140b",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.1rem",
          letterSpacing: 1,
          width: 32, height: 32,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontWeight: 900,
        }}>{player.number}</div>
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "0.95rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "var(--cream)",
      }}>{player.name}</div>

      {/* Role */}
      <div style={{ fontSize: "0.72rem", color, fontStyle: "italic", marginTop: 3 }}>
        {player.role}
      </div>

      {/* DOB + hometown */}
      <div style={{ fontSize: "0.68rem", color: "var(--fade)", marginTop: 4 }}>
        {player.hometown} · {player.dob ? player.dob.split("/")[2] : ""}
      </div>

      {/* Captain badge */}
      {player.isCaptain && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          background: "var(--gold)", color: "var(--ink)",
          fontSize: "0.55rem", fontWeight: 700,
          letterSpacing: 1, padding: "2px 7px",
          marginTop: 6, textTransform: "uppercase",
        }}>© Captain</div>
      )}
    </div>
  );
}

/* ── LIST VIEW ─────────────────────────────────────────────── */
function ListView({ players, onSelect }) {
  return (
    <div style={{ padding: "8px 12px 48px", display: "flex", flexDirection: "column", gap: 6 }}>
      {players.map((p, i) => (
        <PlayerListRow key={p.slug || p.name} player={p} index={i} onClick={() => onSelect(p)} />
      ))}
    </div>
  );
}

function PlayerListRow({ player, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgOk,   setImgOk]   = useState(true);
  const photo = getPlayerPhoto(player);
  const color = ROLE_COLOR[categorise(player.role)];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? color + "44" : "var(--border)"}`,
        background: hovered ? `rgba(${hexToRgb(color)},0.06)` : "rgba(255,255,255,0.02)",
        padding: "12px 14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "all 0.2s",
        transform: hovered ? "translateX(4px)" : "none",
        animation: `pageFade 0.4s ease ${index * 0.03}s both`,
      }}
    >
      {/* Jersey number */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "1.6rem",
        color,
        width: 36,
        textAlign: "center",
        lineHeight: 1,
        flexShrink: 0,
      }}>{player.number}</div>

      {/* Photo */}
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        border: `1px solid ${color}44`,
        overflow: "hidden", flexShrink: 0,
        background: "rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {imgOk ? (
          <img src={photo} alt={player.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setImgOk(false)}
          />
        ) : <span style={{ fontSize: "1rem" }}>👤</span>}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, fontSize: "0.98rem",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {player.name}
          {player.isCaptain && (
            <span style={{
              background: "var(--gold)", color: "var(--ink)",
              fontSize: "0.5rem", fontWeight: 700, padding: "1px 5px",
              textTransform: "uppercase", letterSpacing: 1,
            }}>C</span>
          )}
        </div>
        <div style={{ fontSize: "0.73rem", color, fontStyle: "italic", marginTop: 2 }}>{player.role}</div>
      </div>

      {/* Hometown + DOB year */}
      <div style={{ textAlign: "right", fontSize: "0.72rem", color: "var(--fade)" }}>
        <div>{player.hometown}</div>
        <div style={{ marginTop: 2 }}>b. {player.dob}</div>
      </div>

      <span style={{ color, opacity: 0.5, fontSize: "1rem" }}>›</span>
    </div>
  );
}

/* ── COACH CARD ────────────────────────────────────────────── */
function CoachCard({ coach, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        margin: "10px 12px 0",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.18)"}`,
        background: hovered ? "rgba(201,168,76,0.09)" : "rgba(201,168,76,0.03)",
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex", alignItems: "center", gap: 14,
        transition: "all 0.22s",
      }}
    >
      <div style={{
        width: 48, height: 48,
        background: "rgba(201,168,76,0.1)",
        border: "1px solid rgba(201,168,76,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.4rem", flexShrink: 0,
      }}>📋</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700 }}>{coach.name}</div>
        <div style={{ fontSize: "0.78rem", color: "var(--gold)", fontStyle: "italic", marginTop: 2 }}>{coach.role}</div>
        <div style={{ fontSize: "0.7rem", color: "var(--fade)", marginTop: 2 }}>{coach.yearsAtClub} years at Loughborough · Tap to view</div>
      </div>
      <span style={{ color: "var(--gold)", opacity: 0.5 }}>›</span>
    </div>
  );
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0,2), 16),
    parseInt(h.substring(2,4), 16),
    parseInt(h.substring(4,6), 16),
  ].join(",");
}
