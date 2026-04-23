// src/screens/Roster.jsx
import { useState } from "react";
import { PLAYERS, COACH, getPlayerPhoto } from "../dataLoader.js";
import { Page, Header, SectionLabel, Notification } from "../components/UI.jsx";
import { PlayerModal, CoachModal } from "../components/PlayerModal.jsx";

export default function Roster({ onGo }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showCoach,      setShowCoach]      = useState(false);
  const [kitFilter,      setKitFilter]      = useState("all");
  const [notification,   setNotification]   = useState(null);

  const filtered = kitFilter === "all" ? PLAYERS : PLAYERS.filter(p => p.kit === kitFilter);

  return (
    <Page>
      <Header
        title="Squad & Staff"
        sub={`${PLAYERS.length} players · Season 2025–26`}
        onBack={() => onGo("menu")}
      />

      {notification && (
        <Notification player={notification} onDone={() => setNotification(null)} />
      )}
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
      {showCoach && (
        <CoachModal coach={COACH} onClose={() => setShowCoach(false)} />
      )}

      {/* Coach card */}
      <SectionLabel>Coaching Staff</SectionLabel>
      <div
        onClick={() => setShowCoach(true)}
        style={{
          margin: "12px 16px 0",
          border: "1px solid rgba(201,168,76,0.25)",
          background: "rgba(201,168,76,0.04)",
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex", gap: 16, alignItems: "center",
          transition: "all 0.22s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.09)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(201,168,76,0.04)"}
      >
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "var(--green-mid)",
          border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem", flexShrink: 0,
        }}>📋</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700 }}>{COACH.name}</div>
          <div style={{ fontSize: "0.82rem", color: "var(--gold)", fontStyle: "italic", marginTop: 2 }}>{COACH.role}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--fade)", marginTop: 2 }}>{COACH.yearsAtClub} years at Loughborough</div>
        </div>
        <span style={{ color: "var(--gold)", opacity: 0.5 }}>›</span>
      </div>

      {/* Players section */}
      <SectionLabel>Players</SectionLabel>

      {/* Kit filter tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 16px" }}>
        {["all", "home", "away"].map(t => (
          <button
            key={t}
            onClick={() => setKitFilter(t)}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2px solid ${kitFilter === t ? "var(--gold)" : "transparent"}`,
              color: kitFilter === t ? "var(--gold)" : "var(--fade)",
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 600,
              fontSize: "0.82rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "12px 14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t === "all" ? "All" : t === "home" ? "Home" : "Away"}
          </button>
        ))}
      </div>

      {/* Player grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
        padding: "12px 12px 48px",
      }}>
        {filtered.map((player, i) => (
          <PlayerCard
            key={player.slug || player.name}
            player={player}
            index={i}
            onClick={() => setSelectedPlayer(player)}
          />
        ))}
      </div>
    </Page>
  );
}

function PlayerCard({ player, index, onClick }) {
  const photo = getPlayerPhoto(player);
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid var(--border)",
        background: "var(--glass)",
        padding: "14px",
        cursor: "pointer",
        transition: "all 0.22s ease",
        position: "relative",
        overflow: "hidden",
        animation: `pageFade 0.4s ease ${index * 0.04}s both`,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--glass-gold)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--glass)"; e.currentTarget.style.transform = "none"; }}
    >
      {/* Number watermark */}
      <div style={{
        position: "absolute", right: 8, bottom: 4,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "3.5rem", color: "rgba(201,168,76,0.06)",
        lineHeight: 1, pointerEvents: "none",
      }}>{player.number}</div>

      {/* Photo */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "rgba(201,168,76,0.08)",
        marginBottom: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {imgOk ? (
          <img
            src={photo} alt={player.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setImgOk(false)}
          />
        ) : (
          <span style={{ fontSize: "1.3rem" }}>👤</span>
        )}
      </div>

      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.98rem", fontWeight: 700, lineHeight: 1.2 }}>
        {player.name}
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--fade)", fontStyle: "italic", marginTop: 3 }}>
        {player.role}
      </div>
      <div style={{ fontSize: "0.75rem", marginTop: 5 }}>{player.nationality}</div>

      {player.isCaptain && (
        <div style={{
          display: "inline-block", background: "var(--gold)", color: "var(--ink)",
          fontSize: "0.55rem", fontWeight: 700, letterSpacing: 1,
          padding: "2px 6px", marginTop: 6, textTransform: "uppercase",
        }}>Captain</div>
      )}
    </div>
  );
}
