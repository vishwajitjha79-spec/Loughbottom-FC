// src/screens/Roster.jsx
import { useState, useMemo } from "react";
import { PLAYERS, COACH, getPlayerPhoto } from "../dataLoader.js";
import { Page, Header, SectionLabel } from "../components/UI.jsx";
import { PlayerModal, CoachModal, StaffModal } from "../components/PlayerModal.jsx";

// ── Position helpers ─────────────────────────────────────────
const POS_META = {
  Goalkeeper: { color: "#e87b6a", short: "GK" },
  Defender:   { color: "#6ab4e8", short: "DF" },
  Midfielder: { color: "#c9a84c", short: "MF" },
  Forward:    { color: "#5ada5a", short: "FW" },
};

function categorise(role = "") {
  const r = role.toLowerCase();
  if (r.includes("goalkeeper"))                                   return "Goalkeeper";
  if (r.includes("back") || r.includes("defend") || r === "cb")  return "Defender";
  if (r.includes("striker") || r.includes("forward") || r === "st") return "Forward";
  return "Midfielder";
}

// ── Generate a stable random jersey number per player ────────
// Uses player slug as seed so it never changes between renders
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return ((h >>> 0) % 95) + 1; // 1–95
}

function useJerseyNumbers(players) {
  return useMemo(() => {
    const used = new Set();
    // Captain always gets 10
    const map = {};
    players.forEach(p => {
      if (p.isCaptain) { map[p.slug || p.name] = 10; used.add(10); }
    });
    players.forEach(p => {
      const key = p.slug || p.name;
      if (map[key]) return;
      let n = seededRandom(key);
      while (used.has(n)) { n = n >= 95 ? 1 : n + 1; }
      map[key] = n;
      used.add(n);
    });
    return map;
  }, [players]);
}

// ── Position order for display ───────────────────────────────
const POS_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

export default function Roster({ onGo }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedStaff,  setSelectedStaff]  = useState(null);
  const [showCoach,      setShowCoach]      = useState(false);
  const [posFilter,      setPosFilter]      = useState("All");
  const [viewMode,       setViewMode]       = useState("grid");

  const jerseyMap = useJerseyNumbers(PLAYERS);

  const filtered = posFilter === "All"
    ? PLAYERS
    : PLAYERS.filter(p => categorise(p.role) === posFilter);

  const grouped = POS_ORDER.reduce((acc, cat) => {
    const g = filtered.filter(p => categorise(p.role) === cat);
    if (g.length) acc[cat] = g;
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
            style={{ background:"none", border:"1px solid var(--border)", color:"var(--gold)", padding:"7px 12px", fontSize:"1rem", cursor:"pointer" }}
          >{viewMode === "grid" ? "☰" : "⊞"}</button>
        }
      />

      {/* Modals */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          jerseyNumber={jerseyMap[selectedPlayer.slug || selectedPlayer.name]}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
      {showCoach && <CoachModal coach={COACH} onClose={() => setShowCoach(false)} />}
      {selectedStaff && <StaffModal member={selectedStaff} onClose={() => setSelectedStaff(null)} />}

      {/* ── STAFF SECTION ──────────────────────────── */}
      <StaffSection
        coach={COACH}
        onCoachClick={() => setShowCoach(true)}
        onStaffClick={m => setSelectedStaff(m)}
      />

      {/* ── PLAYERS SECTION ────────────────────────── */}
      <div style={{ padding:"14px 16px 4px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:"0.62rem", letterSpacing:4, textTransform:"uppercase", color:"var(--gold)" }}>Players</span>
        <span style={{ fontSize:"0.72rem", color:"var(--fade)" }}>{PLAYERS.length} registered</span>
      </div>

      {/* Position filter */}
      <div style={{ display:"flex", gap:6, padding:"6px 16px 10px", overflowX:"auto" }}>
        {["All", ...POS_ORDER].map(pos => {
          const active = posFilter === pos;
          const col = POS_META[pos]?.color || "var(--gold)";
          return (
            <button key={pos} onClick={() => setPosFilter(pos)} style={{
              background:   active ? col : "rgba(255,255,255,0.03)",
              border:       `1px solid ${active ? col : "rgba(201,168,76,0.12)"}`,
              color:        active ? "#060e06" : "var(--fade)",
              fontFamily:   "'Crimson Pro', serif",
              fontWeight:   700,
              fontSize:     "0.7rem",
              letterSpacing:2,
              textTransform:"uppercase",
              padding:      "5px 14px",
              cursor:       "pointer",
              whiteSpace:   "nowrap",
              transition:   "all 0.2s",
              flexShrink:   0,
            }}>{pos === "All" ? "All" : POS_META[pos].short + " · " + pos}</button>
          );
        })}
      </div>

      {/* Player list/grid */}
      {viewMode === "grid"
        ? <GridView grouped={grouped} jerseyMap={jerseyMap} onSelect={setSelectedPlayer} />
        : <ListView players={filtered} jerseyMap={jerseyMap} onSelect={setSelectedPlayer} />
      }
    </Page>
  );
}

// ── Staff section ─────────────────────────────────────────────
function StaffSection({ coach, onCoachClick, onStaffClick }) {
  return (
    <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(201,168,76,0.08)" }}>
      <div style={{ fontSize:"0.62rem", letterSpacing:4, textTransform:"uppercase", color:"var(--gold)", marginBottom:10 }}>
        Coaching Staff
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {/* Head coach */}
        <StaffRow
          name={coach.name}
          role="Head Coach"
          detail={`${coach.yearsAtClub} years at Loughborough`}
          badge="HC"
          badgeColor="var(--gold)"
          onClick={onCoachClick}
        />
        {/* Assistant(s) */}
        {coach.staff?.map(m => (
          <StaffRow
            key={m.name}
            name={m.name}
            role={m.role}
            detail={`Age ${m.age}`}
            badge="AC"
            badgeColor="#6ab4e8"
            onClick={() => onStaffClick(m)}
          />
        ))}
      </div>
    </div>
  );
}

function StaffRow({ name, role, detail, badge, badgeColor, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display:"flex", alignItems:"center", gap:12,
      padding:"12px 14px",
      background: h ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)",
      border:`1px solid ${h ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.1)"}`,
      cursor:"pointer", transition:"all 0.2s",
    }}>
      {/* Badge circle */}
      <div style={{
        width:42, height:42, borderRadius:"50%",
        background:`${badgeColor}18`,
        border:`2px solid ${badgeColor}55`,
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
        fontFamily:"'Bebas Neue', sans-serif",
        fontSize:"0.75rem", letterSpacing:1,
        color: badgeColor,
      }}>{badge}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:"0.95rem" }}>{name}</div>
        <div style={{ fontSize:"0.72rem", color:badgeColor, fontStyle:"italic", marginTop:2 }}>{role}</div>
        <div style={{ fontSize:"0.68rem", color:"var(--fade)", marginTop:1 }}>{detail}</div>
      </div>
      <span style={{ color: h ? "var(--gold)" : "rgba(201,168,76,0.2)", transition:"all 0.2s" }}>›</span>
    </div>
  );
}

// ── Grid view ─────────────────────────────────────────────────
function GridView({ grouped, jerseyMap, onSelect }) {
  return (
    <div style={{ padding:"8px 12px 56px" }}>
      {Object.entries(grouped).map(([cat, players]) => {
        const meta = POS_META[cat];
        return (
          <div key={cat} style={{ marginBottom:22 }}>
            {/* Category header */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 4px 8px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:meta.color, flexShrink:0 }} />
              <span style={{ fontSize:"0.6rem", letterSpacing:4, textTransform:"uppercase", color:meta.color }}>
                {cat}s · {players.length}
              </span>
              <div style={{ flex:1, height:1, background:`${meta.color}20` }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}>
              {players.map((p, i) => (
                <PlayerGridCard
                  key={p.slug||p.name}
                  player={p}
                  jerseyNum={jerseyMap[p.slug||p.name]}
                  color={meta.color}
                  index={i}
                  onClick={() => onSelect(p)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlayerGridCard({ player, jerseyNum, color, index, onClick }) {
  const [h, setH]       = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const photo = getPlayerPhoto(player);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border:     `1px solid ${h ? color+"66" : "rgba(201,168,76,0.1)"}`,
        background: h ? `${color}0d` : "rgba(255,255,255,0.02)",
        padding:    "14px 12px 12px",
        cursor:     "pointer",
        transition: "all 0.22s",
        transform:  h ? "translateY(-2px)" : "none",
        position:   "relative",
        overflow:   "hidden",
        animation:  `pageFade 0.4s ease ${index*0.04}s both`,
      }}
    >
      {/* Jersey watermark */}
      <div style={{
        position:"absolute", right:4, bottom:-2,
        fontFamily:"'Bebas Neue', sans-serif",
        fontSize:"5rem", lineHeight:1,
        color:`${color}${h ? "20" : "0e"}`,
        pointerEvents:"none", userSelect:"none",
        transition:"color 0.22s",
      }}>{jerseyNum}</div>

      {/* Top row: photo + number badge */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        {/* Photo — white background circle */}
        <div style={{
          width:48, height:48, borderRadius:"50%",
          background:"#ffffff",
          border:`2px solid ${color}66`,
          overflow:"hidden", flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow: h ? `0 0 12px ${color}33` : "none",
          transition:"box-shadow 0.22s",
        }}>
          {imgOk ? (
            <img
              src={photo} alt={player.name}
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <span style={{ fontSize:"1.4rem", filter:"grayscale(1)" }}>👤</span>
          )}
        </div>

        {/* Jersey number badge */}
        <div style={{
          background:   color,
          color:        "#060e06",
          fontFamily:   "'Bebas Neue', sans-serif",
          fontSize:     "1.2rem",
          fontWeight:   900,
          width:        34, height:34,
          display:      "flex", alignItems:"center", justifyContent:"center",
          flexShrink:   0,
          letterSpacing:1,
        }}>{jerseyNum}</div>

        {player.isCaptain && (
          <div style={{
            background:"var(--gold)", color:"#060e06",
            fontFamily:"'Bebas Neue', sans-serif",
            fontSize:"0.55rem", letterSpacing:1,
            padding:"2px 6px", textTransform:"uppercase",
          }}>Captain</div>
        )}
      </div>

      {/* Name */}
      <div style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:"0.93rem", lineHeight:1.2, color:h?"#fff":"var(--cream)" }}>
        {player.name}
      </div>
      {/* Role */}
      <div style={{ fontSize:"0.7rem", color, fontStyle:"italic", marginTop:3 }}>{player.role}</div>
      {/* Hometown · DOB year */}
      <div style={{ fontSize:"0.65rem", color:"var(--fade)", marginTop:4 }}>
        {player.hometown}{player.dob ? ` · b. ${player.dob}` : ""}
      </div>
    </div>
  );
}

// ── List view ─────────────────────────────────────────────────
function ListView({ players, jerseyMap, onSelect }) {
  return (
    <div style={{ padding:"8px 12px 56px", display:"flex", flexDirection:"column", gap:6 }}>
      {players.map((p, i) => (
        <PlayerListRow
          key={p.slug||p.name}
          player={p}
          jerseyNum={jerseyMap[p.slug||p.name]}
          index={i}
          onClick={() => onSelect(p)}
        />
      ))}
    </div>
  );
}

function PlayerListRow({ player, jerseyNum, index, onClick }) {
  const [h, setH]         = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const photo = getPlayerPhoto(player);
  const color = POS_META[categorise(player.role)]?.color || "var(--gold)";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border:     `1px solid ${h ? color+"44" : "rgba(201,168,76,0.1)"}`,
        background: h ? `${color}09` : "rgba(255,255,255,0.02)",
        padding:    "11px 14px",
        cursor:     "pointer",
        display:    "flex", alignItems:"center", gap:12,
        transition: "all 0.2s",
        transform:  h ? "translateX(4px)" : "none",
        animation:  `pageFade 0.4s ease ${index*0.03}s both`,
      }}
    >
      {/* Jersey number */}
      <div style={{
        fontFamily:"'Bebas Neue', sans-serif",
        fontSize:"1.7rem", color,
        width:36, textAlign:"center", lineHeight:1, flexShrink:0,
      }}>{jerseyNum}</div>

      {/* Photo — white bg */}
      <div style={{
        width:38, height:38, borderRadius:"50%",
        background:"#ffffff",
        border:`1px solid ${color}55`,
        overflow:"hidden", flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {imgOk ? (
          <img src={photo} alt={player.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}
            onError={() => setImgOk(false)}
          />
        ) : <span style={{ fontSize:"1rem" }}>👤</span>}
      </div>

      {/* Info */}
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:"0.95rem" }}>{player.name}</span>
          {player.isCaptain && (
            <span style={{ background:"var(--gold)", color:"#060e06", fontSize:"0.5rem", fontWeight:700, padding:"1px 5px", letterSpacing:1, textTransform:"uppercase" }}>C</span>
          )}
        </div>
        <div style={{ fontSize:"0.7rem", color, fontStyle:"italic", marginTop:2 }}>{player.role}</div>
      </div>

      {/* Right */}
      <div style={{ textAlign:"right", fontSize:"0.68rem", color:"var(--fade)" }}>
        <div>{player.hometown}</div>
        {player.dob && <div style={{ marginTop:2 }}>b. {player.dob}</div>}
      </div>
      <span style={{ color: h ? color : "rgba(201,168,76,0.2)", fontSize:"1rem", transition:"all 0.2s" }}>›</span>
    </div>
  );
}
