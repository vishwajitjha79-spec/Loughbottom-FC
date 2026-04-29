// src/screens/Roster.jsx
import { useState, useMemo } from "react";
import { PLAYERS, COACH, getPlayerPhoto } from "../dataLoader.js";
import { Page, Header } from "../components/UI.jsx";
import PlayerProfile from "./PlayerProfile.jsx";
import { CoachModal, StaffModal } from "../components/PlayerModal.jsx";

// ── Position helpers ──────────────────────────────────────────
const POS_META = {
  Goalkeeper: { color: "#e87b6a", short: "GK", label: "Goalkeepers" },
  Defender:   { color: "#6ab4e8", short: "DF", label: "Defenders"   },
  Midfielder: { color: "#c9a84c", short: "MF", label: "Midfielders" },
  Forward:    { color: "#5ada5a", short: "FW", label: "Forwards"    },
};
const POS_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

function categorise(role = "") {
  const r = role.toLowerCase();
  if (r.includes("goalkeeper"))                                        return "Goalkeeper";
  if (r.includes("back") || r.includes("defend") || r.includes("cb")) return "Defender";
  if (r.includes("striker") || r.includes("forward") || r.includes("st") && !r.includes("assist")) return "Forward";
  return "Midfielder";
}

// Stable random jersey numbers (seeded by slug)
function seededNum(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return ((h >>> 0) % 90) + 2; // 2–91
}

function useJerseyNums(players) {
  return useMemo(() => {
    const used = new Set([10]);
    const map  = {};
    // Captain = 10
    players.forEach(p => { if (p.isCaptain) map[p.slug || p.name] = 10; });
    players.forEach(p => {
      const key = p.slug || p.name;
      if (map[key]) return;
      let n = seededNum(key);
      while (used.has(n)) n = n >= 91 ? 2 : n + 1;
      map[key] = n; used.add(n);
    });
    return map;
  }, [players]);
}

export default function Roster({ onGo }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showCoach,      setShowCoach]      = useState(false);
  const [selectedStaff,  setSelectedStaff]  = useState(null);
  const [posFilter,      setPosFilter]      = useState("All");

  const jerseyMap = useJerseyNums(PLAYERS);

  const filtered = posFilter === "All"
    ? PLAYERS
    : PLAYERS.filter(p => categorise(p.role) === posFilter);

  const grouped = POS_ORDER.reduce((acc, cat) => {
    const g = filtered.filter(p => categorise(p.role) === cat);
    if (g.length) acc[cat] = g;
    return acc;
  }, {});

  // Full-screen player profile
  if (selectedPlayer) {
    return (
      <PlayerProfile
        player={selectedPlayer}
        jerseyNumber={jerseyMap[selectedPlayer.slug || selectedPlayer.name]}
        onBack={() => setSelectedPlayer(null)}
        onGo={onGo}
      />
    );
  }

  return (
    <Page>
      <Header
        title="Squad & Staff"
        sub={`${PLAYERS.length} players · Season 2025–26`}
        onBack={() => onGo("menu")}
      />

      {/* Coach modals */}
      {showCoach    && <CoachModal  coach={COACH}         onClose={() => setShowCoach(false)} />}
      {selectedStaff && <StaffModal member={selectedStaff} onClose={() => setSelectedStaff(null)} />}

      {/* ── STAFF ROW ─────────────────────────────────── */}
      <StaffStrip
        coach={COACH}
        onCoachClick={() => setShowCoach(true)}
        onStaffClick={m => setSelectedStaff(m)}
      />

      {/* ── POSITION FILTER ───────────────────────────── */}
      <div style={{
        display: "flex", overflowX: "auto",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        padding: "0 16px",
        gap: 0,
        WebkitOverflowScrolling: "touch",
      }}>
        {["All", ...POS_ORDER].map(pos => {
          const active = posFilter === pos;
          const color  = POS_META[pos]?.color || "var(--gold)";
          return (
            <button key={pos} onClick={() => setPosFilter(pos)} style={{
              background:    "none",
              border:        "none",
              borderBottom:  `2px solid ${active ? color : "transparent"}`,
              color:         active ? color : "rgba(201,168,76,0.3)",
              fontFamily:    "'Bebas Neue', sans-serif",
              fontSize:      "0.75rem",
              letterSpacing: 3,
              padding:       "12px 14px",
              cursor:        "pointer",
              whiteSpace:    "nowrap",
              transition:    "all 0.2s",
              flexShrink:    0,
            }}>
              {pos === "All" ? "All Players" : POS_META[pos].short + " · " + pos}
            </button>
          );
        })}
      </div>

      {/* ── PLAYER CARDS GRID ─────────────────────────── */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {Object.entries(grouped).map(([cat, players]) => (
          <PositionGroup
            key={cat}
            category={cat}
            players={players}
            jerseyMap={jerseyMap}
            onSelect={setSelectedPlayer}
          />
        ))}
        <div style={{ height: 40 }} />
      </div>
    </Page>
  );
}

// ── Position group ────────────────────────────────────────────
function PositionGroup({ category, players, jerseyMap, onSelect }) {
  const meta = POS_META[category];
  return (
    <div style={{ padding: "16px 14px 4px" }}>
      {/* Group header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "6px 0 12px",
      }}>
        <div style={{ width: 3, height: 18, background: meta.color, flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "0.8rem", letterSpacing: 4,
          color: meta.color, textTransform: "uppercase",
        }}>{meta.label}</span>
        <div style={{ flex: 1, height: "1px", background: `${meta.color}22` }} />
        <span style={{ fontSize: "0.65rem", color: "rgba(201,168,76,0.3)" }}>{players.length}</span>
      </div>

      {/* 3-column grid like Barca */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
      }}>
        {players.map((p, i) => (
          <PlayerCard
            key={p.slug || p.name}
            player={p}
            jerseyNum={jerseyMap[p.slug || p.name]}
            color={meta.color}
            index={i}
            onClick={() => onSelect(p)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Barca-style player card ───────────────────────────────────
function PlayerCard({ player, jerseyNum, color, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgOk,   setImgOk]   = useState(true);
  const photo = getPlayerPhoto(player);

  // Split name into first + last for Barca-style display
  const parts     = player.name.trim().split(" ");
  const firstName = parts.slice(0, -1).join(" ");
  const lastName  = parts[parts.length - 1].toUpperCase();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   "relative",
        overflow:   "hidden",
        cursor:     "pointer",
        background: "#0a160a",
        border:     `1px solid ${hovered ? color + "55" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.28s ease",
        transform:  hovered ? "translateY(-3px)" : "none",
        boxShadow:  hovered ? `0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px ${color}44` : "none",
        animation:  `pageFade 0.4s ease ${index * 0.05}s both`,
        aspectRatio:"3/4.2",
        display:    "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Gradient background ── */}
      <div style={{
        position:   "absolute", inset: 0,
        background: `
          linear-gradient(160deg, ${color}18 0%, #060e06 55%),
          radial-gradient(ellipse at 50% 30%, ${color}12 0%, transparent 65%)
        `,
        transition: "opacity 0.28s",
        opacity:    hovered ? 1 : 0.6,
        zIndex:     0,
      }} />

      {/* ── Jersey number — large watermark ── */}
      <div style={{
        position:   "absolute",
        bottom:     24,
        left:       "50%",
        transform:  "translateX(-50%)",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize:   "clamp(3.5rem, 12vw, 6rem)",
        lineHeight: 1,
        color:      `${color}${hovered ? "35" : "20"}`,
        zIndex:     1,
        transition: "color 0.28s",
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: 2,
      }}>{jerseyNum}</div>

      {/* ── Player photo ── */}
      <div style={{
        position:  "absolute",
        bottom:    36,
        left:      "50%",
        transform: "translateX(-50%)",
        width:     "90%",
        height:    "78%",
        zIndex:    2,
        display:   "flex",
        alignItems:"flex-end",
        justifyContent: "center",
      }}>
        {imgOk ? (
          <img
            src={photo}
            alt={player.name}
            style={{
              width:      "100%",
              height:     "100%",
              objectFit: "cover",
              objectPosition: "top center",
              filter:    hovered ? "brightness(1.08)" : "brightness(0.95)",
              transition:"filter 0.28s",
            }}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div style={{
            width: "80%", height: "80%",
            background: "rgba(255,255,255,0.04)",
            border: `1px dashed ${color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 4,
          }}>
            <span style={{ fontSize: "2.5rem", opacity: 0.4 }}>👤</span>
          </div>
        )}
      </div>

      {/* ── Captain badge ── */}
      {player.isCaptain && (
        <div style={{
          position:   "absolute",
          top:        8, left: 8,
          background: "var(--gold)", color: "#060e06",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize:   "0.55rem", letterSpacing: 2,
          padding:    "2px 7px",
          zIndex:     5,
        }}>© Captain</div>
      )}

      {/* ── Position badge ── */}
      <div style={{
        position:   "absolute",
        top:        8, right: 8,
        background: `${color}22`,
        border:     `1px solid ${color}55`,
        color:      color,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize:   "0.55rem", letterSpacing: 2,
        padding:    "2px 7px",
        zIndex:     5,
      }}>
        {player.role.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,3)}
      </div>

      {/* ── Name bar at bottom ── */}
      <div style={{
        position:   "absolute",
        bottom:     0, left: 0, right: 0,
        background: `linear-gradient(0deg, rgba(6,14,6,0.97) 0%, rgba(6,14,6,0.85) 60%, transparent 100%)`,
        padding:    "20px 8px 8px",
        zIndex:     4,
        transition: "background 0.28s",
      }}>
        {/* First name */}
        {firstName && (
          <div style={{
            fontFamily:    "'Crimson Pro', serif",
            fontStyle:     "italic",
            fontSize:      "0.65rem",
            color:         "rgba(255,255,255,0.55)",
            letterSpacing: 1,
            lineHeight:    1.2,
            textAlign:     "center",
          }}>{firstName}</div>
        )}
        {/* Last name — bold large */}
        <div style={{
          fontFamily:    "'Bebas Neue', sans-serif",
          fontSize:      "clamp(0.9rem, 3vw, 1.15rem)",
          letterSpacing: 1.5,
          color:         hovered ? "#fff" : "rgba(240,232,210,0.92)",
          lineHeight:    1.1,
          textAlign:     "center",
          transition:    "color 0.28s",
        }}>{lastName}</div>
        {/* Role */}
        <div style={{
          fontFamily: "'Crimson Pro', serif",
          fontStyle:  "italic",
          fontSize:   "0.62rem",
          color:      color,
          textAlign:  "center",
          marginTop:  2,
          opacity:    0.85,
        }}>{player.role}</div>
      </div>

      {/* Hover shimmer overlay */}
      <div style={{
        position:   "absolute", inset: 0, zIndex: 3,
        background: `linear-gradient(135deg, ${color}08 0%, transparent 50%)`,
        opacity:    hovered ? 1 : 0,
        transition: "opacity 0.28s",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Staff strip ───────────────────────────────────────────────
function StaffStrip({ coach, onCoachClick, onStaffClick }) {
  return (
    <div style={{
      borderBottom: "1px solid rgba(201,168,76,0.1)",
      padding: "12px 14px",
    }}>
      <div style={{
        fontSize: "0.6rem", letterSpacing: 4,
        textTransform: "uppercase", color: "var(--gold)",
        marginBottom: 10,
      }}>Coaching Staff</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { name: coach.name, role: "Head Coach", badge: "HC", color: "var(--gold)", onClick: onCoachClick },
          ...(coach.staff || []).map(m => ({
            name: m.name, role: m.role, badge: "AC", color: "#6ab4e8",
            onClick: () => onStaffClick(m),
          })),
        ].map(s => (
          <StaffPill key={s.name} {...s} />
        ))}
      </div>
    </div>
  );
}

function StaffPill({ name, role, badge, color, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px", flex: 1,
      background: h ? `${color}10` : "rgba(255,255,255,0.02)",
      border: `1px solid ${h ? color+"44" : "rgba(201,168,76,0.1)"}`,
      cursor: "pointer", transition: "all 0.2s",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `${color}18`, border: `2px solid ${color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.7rem",
        letterSpacing: 1, color, flexShrink: 0,
      }}>{badge}</div>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.88rem" }}>{name}</div>
        <div style={{ fontSize: "0.68rem", color, fontStyle: "italic", marginTop: 1 }}>{role}</div>
      </div>
      <span style={{ marginLeft: "auto", color: h ? color : "rgba(201,168,76,0.2)", fontSize: "1rem" }}>›</span>
    </div>
  );
}
