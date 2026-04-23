// src/components/PlayerModal.jsx
import { Sheet, StatCell } from "./UI.jsx";
import { getPlayerPhoto } from "../dataLoader.js";

export function PlayerModal({ player, onClose }) {
  const photo = getPlayerPhoto(player);
  const isGK  = player.role === "Goalkeeper";

  return (
    <Sheet onClose={onClose}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, var(--green-mid) 0%, #0c1d0c 100%)",
        padding: "20px 24px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Number watermark */}
        <div style={{
          position: "absolute", right: 12, top: -8,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "7rem", color: "rgba(201,168,76,0.1)",
          lineHeight: 1, pointerEvents: "none",
        }}>#{player.number}</div>

        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(0,0,0,0.35)", border: "1px solid var(--border)",
          color: "var(--fade)", width: 30, height: 30,
          borderRadius: "50%", fontSize: "0.9rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--cream)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--fade)"; }}
        >✕</button>

        {/* Photo */}
        <div style={{
          width: 80, height: 80,
          borderRadius: "50%",
          border: "2px solid var(--gold)",
          overflow: "hidden",
          marginBottom: 14,
          background: "rgba(201,168,76,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src={photo} alt={player.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.innerHTML = `<span style="font-size:2rem">👤</span>`;
            }}
          />
        </div>

        {player.isCaptain && (
          <div style={{
            display: "inline-block",
            background: "var(--gold)", color: "var(--ink)",
            fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: 1, padding: "2px 8px",
            marginBottom: 6, textTransform: "uppercase",
          }}>Captain</div>
        )}

        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 900, lineHeight: 1.1 }}>
          {player.name}
        </div>
        <div style={{ color: "var(--gold)", fontStyle: "italic", fontSize: "0.95rem", marginTop: 4 }}>
          {player.role}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
          {[player.nationality, `Age ${player.age}`, `#${player.number}`].map(m => (
            <span key={m} style={{ fontSize: "0.8rem", color: "var(--fade)" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "0 24px 48px" }}>

        <SectionHead>Profile</SectionHead>
        <p style={{ fontSize: "1.02rem", lineHeight: 1.72, color: "#c0b898", fontStyle: "italic" }}>
          {player.bio}
        </p>

        <SectionHead>Season Stats</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 24 }}>
          <StatCell num={player.stats.appearances} label="Apps" />
          <StatCell num={player.stats.goals}       label="Goals" />
          <StatCell num={player.stats.assists}     label="Assists" />
          {isGK ? (
            <>
              <StatCell num={player.stats.cleanSheets ?? 0} label="Clean Sheets" />
              <StatCell num={`${player.stats.savePercent ?? 0}%`} label="Save %" />
            </>
          ) : (
            <>
              <StatCell num={`${player.stats.passAccuracy}%`} label="Pass Acc." />
              <StatCell num={player.stats.tackles ?? 0}       label="Tackles" />
            </>
          )}
          <StatCell num={player.stats.rating} label="Avg Rating" />
        </div>

        <SectionHead>Career at Loughborough</SectionHead>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <thead>
            <tr>
              {["Season","Apps","Goals","Assists","Rating"].map(h => (
                <th key={h} style={{
                  textAlign: "left", padding: "8px 10px",
                  fontSize: "0.62rem", letterSpacing: 2,
                  textTransform: "uppercase", color: "var(--gold)",
                  borderBottom: "1px solid var(--border)",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {player.career.map(s => (
              <tr key={s.season}>
                {[s.season, s.apps, s.goals, s.assists].map((v, i) => (
                  <td key={i} style={{ padding: "10px 10px", color: "#c0b898", borderBottom: "1px solid rgba(201,168,76,0.05)" }}>{v}</td>
                ))}
                <td style={{
                  padding: "10px 10px",
                  color: s.rating >= 8.5 ? "#e8c96a" : s.rating >= 7.5 ? "#c0b898" : "var(--fade)",
                  fontWeight: s.rating >= 8.5 ? 600 : 400,
                  borderBottom: "1px solid rgba(201,168,76,0.05)",
                }}>{s.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {player.matchLog && player.matchLog.length > 0 && (
          <>
            <SectionHead>Match Log</SectionHead>
            {player.matchLog.map((m, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 0", borderBottom: "1px solid rgba(201,168,76,0.06)",
                fontSize: "0.85rem",
              }}>
                <span style={{ color: "var(--fade)", minWidth: 90 }}>{m.date}</span>
                <span style={{ color: "var(--cream)", flex: 1, paddingLeft: 8 }}>{m.opponent}</span>
                <span style={{
                  color: m.result.startsWith("W") ? "#5ada5a" : m.result.startsWith("L") ? "#e05a5a" : "#d4c050",
                  fontWeight: 600, minWidth: 44, textAlign: "center",
                }}>{m.result}</span>
                <span style={{ color: "var(--gold)", minWidth: 30, textAlign: "right" }}>{m.rating}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </Sheet>
  );
}

export function CoachModal({ coach, onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div style={{
        background: "linear-gradient(180deg, var(--green-mid) 0%, #0c1d0c 100%)",
        padding: "20px 24px 28px", position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(0,0,0,0.35)", border: "1px solid var(--border)",
          color: "var(--fade)", width: 30, height: 30,
          borderRadius: "50%", fontSize: "0.9rem",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>✕</button>

        <div style={{ fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Head Coach</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 900, lineHeight: 1.1 }}>{coach.name}</div>
        <div style={{ color: "var(--gold)", fontStyle: "italic", marginTop: 4 }}>{coach.philosophy}</div>
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          {[coach.nationality, `Age ${coach.age}`, `${coach.yearsAtClub} years at club`].map(m => (
            <span key={m} style={{ fontSize: "0.8rem", color: "var(--fade)" }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 24px 48px" }}>
        <SectionHead>Profile</SectionHead>
        <p style={{ fontSize: "1.02rem", lineHeight: 1.72, color: "#c0b898", fontStyle: "italic" }}>{coach.bio}</p>

        <SectionHead>All-Time Record</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
          <StatCell num={coach.record.wins}   label="Wins" />
          <StatCell num={coach.record.draws}  label="Draws" />
          <StatCell num={coach.record.losses} label="Losses" />
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--fade)", fontStyle: "italic", marginBottom: 20 }}>
          Tournament best: {coach.record.tournamentBest}
        </p>

        <SectionHead>Tournament Seasons</SectionHead>
        {coach.seasons.map(s => (
          <div key={s.year} style={{
            display: "flex", justifyContent: "space-between",
            padding: "9px 0", borderBottom: "1px solid rgba(201,168,76,0.06)",
            fontSize: "0.88rem",
          }}>
            <span style={{ color: "var(--fade)" }}>{s.year}</span>
            <span style={{
              color: s.result === "TBD" ? "var(--gold)" : "var(--cream)",
              fontStyle: s.result === "TBD" ? "italic" : "normal",
              fontWeight: 600,
            }}>{s.result}</span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

function SectionHead({ children }) {
  return (
    <div style={{
      fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase",
      color: "var(--gold)", padding: "20px 0 10px",
      borderBottom: "1px solid var(--border)", marginBottom: 14,
    }}>{children}</div>
  );
}
