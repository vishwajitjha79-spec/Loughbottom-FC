// src/components/PlayerModal.jsx
import { Sheet, StatCell } from "./UI.jsx";
import { getPlayerPhoto } from "../dataLoader.js";

const ROLE_COLOR = {
  Goalkeeper: "#e87b6a",
  Defender:   "#6ab4e8",
  Midfielder: "#c9a84c",
  Forward:    "#5ada5a",
};

function getColor(role) {
  const r = role.toLowerCase();
  if (r.includes("goalkeeper")) return ROLE_COLOR.Goalkeeper;
  if (r.includes("back") || r.includes("cb") || r.includes("defender")) return ROLE_COLOR.Defender;
  if (r.includes("striker") || r.includes("forward") || r.includes("st")) return ROLE_COLOR.Forward;
  return ROLE_COLOR.Midfielder;
}

export function PlayerModal({ player, onClose }) {
  const photo  = getPlayerPhoto(player);
  const isGK   = player.role.toLowerCase().includes("goalkeeper");
  const color  = getColor(player.role);

  return (
    <Sheet onClose={onClose}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${color}18 0%, #0c1d0c 60%)`,
        padding: "20px 24px 28px",
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${color}33`,
      }}>
        {/* Big number watermark */}
        <div style={{
          position: "absolute", right: -8, top: -12,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "9rem", color: `${color}0e`,
          lineHeight: 1, pointerEvents: "none",
          userSelect: "none",
        }}>{player.number}</div>

        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)",
          color: "var(--fade)", width: 30, height: 30,
          borderRadius: "50%", fontSize: "0.85rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>✕</button>

        {/* Photo + jersey badge row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 76, height: 76, borderRadius: "50%",
            border: `2px solid ${color}`,
            overflow: "hidden", flexShrink: 0,
            background: "rgba(255,255,255,0.04)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={photo} alt={player.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.innerHTML = "<span style='font-size:2rem'>👤</span>"; }}
            />
          </div>

          {/* Jersey number badge */}
          <div style={{
            background: color, color: "#0b140b",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.8rem", fontWeight: 900,
            width: 48, height: 48,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>{player.number}</div>
        </div>

        {/* Name */}
        {player.isCaptain && (
          <div style={{
            display: "inline-block",
            background: "var(--gold)", color: "var(--ink)",
            fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: 1, padding: "2px 8px", marginBottom: 6,
            textTransform: "uppercase",
          }}>Captain</div>
        )}
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", fontWeight: 900, lineHeight: 1.1 }}>
          {player.name}
        </div>
        <div style={{ color, fontStyle: "italic", fontSize: "0.92rem", marginTop: 4 }}>{player.role}</div>

        {/* Meta pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {[
            { label: player.nationality },
            { label: `Age ${player.age}` },
            { label: `Born ${player.dob || "—"}` },
            { label: `From ${player.hometown || "—"}` },
            { label: `Debut ${player.debut || "—"}` },
          ].map(({ label }) => (
            <span key={label} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "0.72rem", color: "var(--fade)",
              padding: "3px 10px",
            }}>{label}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "0 24px 48px" }}>
        <SectionHead color={color}>Profile</SectionHead>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#c0b898", fontStyle: "italic" }}>{player.bio}</p>

        <SectionHead color={color}>Season Stats</SectionHead>
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
              <StatCell num={`${player.stats.passAccuracy ?? 0}%`} label="Pass Acc." />
              <StatCell num={player.stats.tackles ?? 0}            label="Tackles" />
            </>
          )}
          <StatCell num={player.stats.rating || "—"} label="Avg Rating" />
        </div>

        <SectionHead color={color}>Career at Loughborough</SectionHead>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
          <thead>
            <tr>
              {["Season","Apps","Goals","Assists","Rating"].map(h => (
                <th key={h} style={{
                  textAlign: "left", padding: "8px 10px",
                  fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase",
                  color, borderBottom: `1px solid ${color}33`,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {player.career.map(s => (
              <tr key={s.season}>
                {[s.season, s.apps, s.goals, s.assists].map((v, i) => (
                  <td key={i} style={{ padding: "10px 10px", color: "#c0b898", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{v}</td>
                ))}
                <td style={{
                  padding: "10px 10px",
                  color: s.rating >= 8.5 ? "#e8c96a" : s.rating >= 7.5 ? "#c0b898" : "var(--fade)",
                  fontWeight: s.rating >= 8.5 ? 600 : 400,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>{s.rating || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {player.matchLog && player.matchLog.length > 0 && (
          <>
            <SectionHead color={color}>Match Log</SectionHead>
            {player.matchLog.map((m, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                fontSize: "0.83rem", gap: 8,
              }}>
                <span style={{ color: "var(--fade)", minWidth: 86, fontSize: "0.75rem" }}>{m.date}</span>
                <span style={{ color: "var(--cream)", flex: 1 }}>{m.opponent}</span>
                <span style={{
                  color: m.result?.startsWith("W") ? "#5ada5a" : m.result?.startsWith("L") ? "#e05a5a" : "#d4c050",
                  fontWeight: 700, minWidth: 40, textAlign: "center",
                }}>{m.result}</span>
                <span style={{ color, minWidth: 28, textAlign: "right", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>
                  {m.rating}
                </span>
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
        background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, #0c1d0c 60%)",
        padding: "20px 24px 28px", position: "relative",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)",
          color: "var(--fade)", width: 30, height: 30,
          borderRadius: "50%", fontSize: "0.85rem",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>✕</button>

        <div style={{ fontSize: "0.62rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Head Coach</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", fontWeight: 900, lineHeight: 1.1 }}>{coach.name}</div>
        <div style={{ color: "var(--gold)", fontStyle: "italic", marginTop: 4 }}>{coach.philosophy}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {[coach.nationality, `Age ${coach.age}`, `${coach.yearsAtClub} years at club`].map(m => (
            <span key={m} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "0.72rem", color: "var(--fade)", padding: "3px 10px",
            }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 24px 48px" }}>
        <SectionHead color="var(--gold)">Profile</SectionHead>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#c0b898", fontStyle: "italic" }}>{coach.bio}</p>

        <SectionHead color="var(--gold)">All-Time Record</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
          <StatCell num={coach.record.wins}   label="Wins" />
          <StatCell num={coach.record.draws}  label="Draws" />
          <StatCell num={coach.record.losses} label="Losses" />
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--fade)", fontStyle: "italic", marginBottom: 20 }}>
          Tournament best: {coach.record.tournamentBest}
        </p>

        <SectionHead color="var(--gold)">Tournament Seasons</SectionHead>
        {coach.seasons.map(s => (
          <div key={s.year} style={{
            display: "flex", justifyContent: "space-between",
            padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
            fontSize: "0.86rem",
          }}>
            <span style={{ color: "var(--fade)" }}>{s.year}</span>
            <span style={{
              color: s.result === "TBD" ? "var(--gold)" : "var(--cream)",
              fontStyle: s.result === "TBD" ? "italic" : "normal", fontWeight: 600,
            }}>{s.result}</span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

function SectionHead({ children, color = "var(--gold)" }) {
  return (
    <div style={{
      fontSize: "0.62rem", letterSpacing: 4, textTransform: "uppercase",
      color, padding: "20px 0 10px",
      borderBottom: `1px solid ${color}33`, marginBottom: 14,
    }}>{children}</div>
  );
}
