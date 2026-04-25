// src/components/PlayerModal.jsx
import { Sheet, StatCell } from "./UI.jsx";
import { getPlayerPhoto } from "../dataLoader.js";

const POS_COLOR = {
  Goalkeeper: "#e87b6a",
  Defender:   "#6ab4e8",
  Midfielder: "#c9a84c",
  Forward:    "#5ada5a",
};

function posColor(role = "") {
  const r = role.toLowerCase();
  if (r.includes("goalkeeper"))                                     return POS_COLOR.Goalkeeper;
  if (r.includes("back") || r.includes("defend") || r === "cb")    return POS_COLOR.Defender;
  if (r.includes("striker") || r.includes("forward") || r === "st") return POS_COLOR.Forward;
  return POS_COLOR.Midfielder;
}

// ── Player modal ──────────────────────────────────────────────
export function PlayerModal({ player, jerseyNumber, onClose }) {
  const photo  = getPlayerPhoto(player);
  const color  = posColor(player.role);
  const isGK   = player.role.toLowerCase().includes("goalkeeper");
  const num    = jerseyNumber ?? player.number ?? "—";

  return (
    <Sheet onClose={onClose}>

      {/* ── HERO ─────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(140deg, ${color}1a 0%, #0a180a 65%)`,
        borderBottom: `1px solid ${color}33`,
        padding: "22px 22px 26px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Giant number watermark */}
        <div style={{
          position:"absolute", right:-10, top:-16,
          fontFamily:"'Bebas Neue', sans-serif",
          fontSize:"9rem", lineHeight:1,
          color:`${color}0d`,
          pointerEvents:"none", userSelect:"none",
        }}>{num}</div>

        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:14, right:14,
          background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)",
          color:"rgba(255,255,255,0.5)", width:30, height:30,
          borderRadius:"50%", fontSize:"0.85rem",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer",
        }}>✕</button>

        {/* Photo + number row */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:14, marginBottom:16 }}>
          {/* Photo — white bg circle */}
          <div style={{
            width:80, height:80, borderRadius:"50%",
            background:"#ffffff",
            border:`3px solid ${color}`,
            overflow:"hidden", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 0 24px ${color}33`,
          }}>
            <img
              src={photo} alt={player.name}
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}
              onError={e => { e.currentTarget.style.display="none"; e.currentTarget.parentElement.innerHTML="<span style='font-size:2.2rem'>👤</span>"; }}
            />
          </div>

          {/* Jersey badge */}
          <div style={{
            background:color, color:"#060e06",
            fontFamily:"'Bebas Neue', sans-serif",
            fontSize:"2rem", fontWeight:900,
            width:52, height:52,
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
            boxShadow:`0 4px 16px ${color}44`,
          }}>{num}</div>
        </div>

        {/* Captain */}
        {player.isCaptain && (
          <div style={{
            display:"inline-block",
            background:"var(--gold)", color:"#060e06",
            fontFamily:"'Bebas Neue', sans-serif",
            fontSize:"0.6rem", letterSpacing:2,
            padding:"2px 10px", marginBottom:8,
          }}>⭐ Captain</div>
        )}

        {/* Name */}
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.9rem", fontWeight:900, lineHeight:1.05 }}>
          {player.name}
        </div>
        <div style={{ color, fontStyle:"italic", fontSize:"0.9rem", marginTop:5 }}>{player.role}</div>

        {/* Meta pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:12 }}>
          {[
            player.nationality,
            `Age ${player.age}`,
            player.dob && `Born ${player.dob}`,
            player.hometown && `From ${player.hometown}`,
            player.debut && `Debut ${player.debut}`,
          ].filter(Boolean).map(t => (
            <span key={t} style={{
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              fontSize:"0.7rem", color:"var(--fade)",
              padding:"3px 10px", borderRadius:2,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────── */}
      <div style={{ padding:"0 22px 52px" }}>

        {/* Bio */}
        <ModalSection color={color}>Profile</ModalSection>
        <p style={{ fontSize:"0.98rem", lineHeight:1.78, color:"#c0b898", fontStyle:"italic" }}>{player.bio}</p>

        {/* Current season stats */}
        <ModalSection color={color}>Season Stats — 2025–26</ModalSection>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:8 }}>
          <StatCell num={player.stats?.appearances ?? 0} label="Apps" />
          <StatCell num={player.stats?.goals       ?? 0} label="Goals" />
          <StatCell num={player.stats?.assists     ?? 0} label="Assists" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {isGK ? (
            <>
              <StatCell num={player.stats?.cleanSheets  ?? 0}     label="Clean Sheets" />
              <StatCell num={`${player.stats?.savePercent ?? 0}%`} label="Save %" />
            </>
          ) : (
            <>
              <StatCell num={`${player.stats?.passAccuracy ?? 0}%`} label="Pass Acc." />
              <StatCell num={player.stats?.tackles ?? 0}            label="Tackles" />
            </>
          )}
          <StatCell num={player.stats?.rating || "—"} label="Rating" />
        </div>

        {/* No matches played note */}
        <p style={{ fontSize:"0.72rem", color:"rgba(201,168,76,0.35)", fontStyle:"italic", marginTop:10, textAlign:"center" }}>
          Season underway — no matches played yet
        </p>

        {/* ── Career record ── */}
        <ModalSection color={color}>Career at Loughborough</ModalSection>

        {player.career && player.career.length > 0 ? (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.85rem", minWidth:300 }}>
              <thead>
                <tr>
                  {(isGK
                    ? ["Season","Apps","Clean Sh.","Rating"]
                    : ["Season","Apps","Goals","Assists","Rating"]
                  ).map(h => (
                    <th key={h} style={{
                      textAlign:"left", padding:"8px 10px",
                      fontSize:"0.6rem", letterSpacing:2, textTransform:"uppercase",
                      color, borderBottom:`1px solid ${color}33`,
                      whiteSpace:"nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {player.career.map((s, idx) => {
                  const isLatest = idx === player.career.length - 1;
                  return (
                    <tr key={s.season} style={{ background: isLatest ? `${color}08` : "transparent" }}>
                      <td style={tdStyle(isLatest, color)}>{s.season}</td>
                      <td style={tdStyle(isLatest, color)}>{s.apps}</td>
                      {isGK ? (
                        <td style={tdStyle(isLatest, color)}>{s.cleanSheets ?? "—"}</td>
                      ) : (
                        <>
                          <td style={tdStyle(isLatest, color)}>{s.goals}</td>
                          <td style={tdStyle(isLatest, color)}>{s.assists}</td>
                        </>
                      )}
                      <td style={{
                        ...tdStyle(isLatest, color),
                        color: !s.rating ? "var(--fade)" : s.rating >= 8.5 ? "#e8c96a" : s.rating >= 7.5 ? "#c0b898" : "var(--fade)",
                        fontWeight: s.rating >= 8 ? 600 : 400,
                      }}>{s.rating || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color:"var(--fade)", fontStyle:"italic", fontSize:"0.85rem" }}>No career data available yet.</p>
        )}

        {/* ── Match log ── */}
        {player.matchLog && player.matchLog.length > 0 && (
          <>
            <ModalSection color={color}>Match Log</ModalSection>
            {player.matchLog.map((m, i) => (
              <div key={i} style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.04)",
                fontSize:"0.82rem", gap:8,
              }}>
                <span style={{ color:"var(--fade)", minWidth:86, fontSize:"0.72rem" }}>{m.date}</span>
                <span style={{ color:"var(--cream)", flex:1 }}>{m.opponent}</span>
                <span style={{
                  color: m.result?.startsWith("W") ? "#5ada5a" : m.result?.startsWith("L") ? "#e05a5a" : "#d4c050",
                  fontWeight:700, minWidth:36, textAlign:"center",
                }}>{m.result}</span>
                <span style={{ color, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1rem", minWidth:28, textAlign:"right" }}>
                  {m.rating || "—"}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </Sheet>
  );
}

// ── Coach modal ───────────────────────────────────────────────
export function CoachModal({ coach, onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div style={{
        background:"linear-gradient(140deg, rgba(201,168,76,0.14) 0%, #0a180a 65%)",
        borderBottom:"1px solid rgba(201,168,76,0.2)",
        padding:"22px 22px 26px", position:"relative",
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:14, right:14,
          background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)",
          color:"rgba(255,255,255,0.5)", width:30, height:30,
          borderRadius:"50%", fontSize:"0.85rem",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
        }}>✕</button>

        <div style={{ fontSize:"0.6rem", letterSpacing:4, textTransform:"uppercase", color:"var(--gold)", marginBottom:10 }}>Head Coach</div>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.85rem", fontWeight:900, lineHeight:1.05 }}>{coach.name}</div>
        <div style={{ color:"rgba(201,168,76,0.7)", fontStyle:"italic", marginTop:5, fontSize:"0.9rem" }}>{coach.philosophy}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:12 }}>
          {[coach.nationality, `Age ${coach.age}`, `${coach.yearsAtClub} years at club`].map(m => (
            <span key={m} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", fontSize:"0.7rem", color:"var(--fade)", padding:"3px 10px" }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ padding:"0 22px 52px" }}>
        <ModalSection color="var(--gold)">Profile</ModalSection>
        <p style={{ fontSize:"0.98rem", lineHeight:1.78, color:"#c0b898", fontStyle:"italic" }}>{coach.bio}</p>

        <ModalSection color="var(--gold)">All-Time Record</ModalSection>
        {/* Record grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:12 }}>
          <div style={{ background:"rgba(90,218,90,0.07)", border:"1px solid rgba(90,218,90,0.2)", padding:"14px 10px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"2.2rem", color:"#5ada5a", lineHeight:1 }}>{coach.record.wins}</div>
            <div style={{ fontSize:"0.6rem", letterSpacing:2, color:"var(--fade)", marginTop:4, textTransform:"uppercase" }}>Wins</div>
          </div>
          <div style={{ background:"rgba(212,192,80,0.07)", border:"1px solid rgba(212,192,80,0.2)", padding:"14px 10px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"2.2rem", color:"#d4c050", lineHeight:1 }}>{coach.record.draws}</div>
            <div style={{ fontSize:"0.6rem", letterSpacing:2, color:"var(--fade)", marginTop:4, textTransform:"uppercase" }}>Draws</div>
          </div>
          <div style={{ background:"rgba(224,90,90,0.07)", border:"1px solid rgba(224,90,90,0.2)", padding:"14px 10px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"2.2rem", color:"#e05a5a", lineHeight:1 }}>{coach.record.losses}</div>
            <div style={{ fontSize:"0.6rem", letterSpacing:2, color:"var(--fade)", marginTop:4, textTransform:"uppercase" }}>Losses</div>
          </div>
        </div>
        <p style={{ fontSize:"0.78rem", color:"var(--fade)", fontStyle:"italic", marginBottom:20 }}>
          Win rate: {Math.round(coach.record.wins / (coach.record.wins + coach.record.draws + coach.record.losses) * 100)}% · Tournament best: {coach.record.tournamentBest}
        </p>

        <ModalSection color="var(--gold)">Tournament Seasons</ModalSection>
        {coach.seasons.map(s => (
          <div key={s.year} style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.04)",
            fontSize:"0.85rem",
          }}>
            <span style={{ color:"var(--fade)" }}>{s.year}</span>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              {s.W !== undefined && (
                <span style={{ fontSize:"0.72rem", color:"var(--fade)" }}>
                  <span style={{ color:"#5ada5a" }}>{s.W}W</span>
                  {" "}<span style={{ color:"#d4c050" }}>{s.D}D</span>
                  {" "}<span style={{ color:"#e05a5a" }}>{s.L}L</span>
                </span>
              )}
              <span style={{
                color: s.result === "TBD" ? "var(--gold)" : "var(--cream)",
                fontStyle: s.result === "TBD" ? "italic" : "normal",
                fontWeight:600,
              }}>{s.result}</span>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

// ── Staff modal (Samuel Collins etc.) ────────────────────────
export function StaffModal({ member, onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div style={{
        background:"linear-gradient(140deg, rgba(106,180,232,0.12) 0%, #0a180a 65%)",
        borderBottom:"1px solid rgba(106,180,232,0.2)",
        padding:"22px 22px 26px", position:"relative",
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:14, right:14,
          background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)",
          color:"rgba(255,255,255,0.5)", width:30, height:30,
          borderRadius:"50%", fontSize:"0.85rem",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
        }}>✕</button>

        <div style={{ fontSize:"0.6rem", letterSpacing:4, textTransform:"uppercase", color:"#6ab4e8", marginBottom:10 }}>{member.role}</div>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.85rem", fontWeight:900, lineHeight:1.05 }}>{member.name}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:12 }}>
          {[`Age ${member.age}`, member.nationality || "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿"].map(m => (
            <span key={m} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", fontSize:"0.7rem", color:"var(--fade)", padding:"3px 10px" }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ padding:"0 22px 52px" }}>
        <ModalSection color="#6ab4e8">Profile</ModalSection>
        <p style={{ fontSize:"0.98rem", lineHeight:1.78, color:"#c0b898", fontStyle:"italic" }}>
          {member.bio || `${member.name} joined the Loughborough coaching staff as ${member.role}. At ${member.age}, he is one of the younger coaches in the inter-college circuit — methodical in his approach, quietly influential in the analysis room.`}
        </p>
        <ModalSection color="#6ab4e8">Role at Club</ModalSection>
        <p style={{ fontSize:"0.95rem", lineHeight:1.75, color:"#c0b898" }}>
          Works directly under Darren Russell, responsible for opposition analysis, set piece preparation, and managing the development of younger squad members. Russell calls him "the only person in this building who watches as much footage as I do."
        </p>
      </div>
    </Sheet>
  );
}

// ── Helpers ───────────────────────────────────────────────────
function ModalSection({ children, color = "var(--gold)" }) {
  return (
    <div style={{
      fontSize:"0.62rem", letterSpacing:4, textTransform:"uppercase",
      color, padding:"20px 0 10px",
      borderBottom:`1px solid ${color}33`, marginBottom:14,
    }}>{children}</div>
  );
}

function tdStyle(highlight, color) {
  return {
    padding:"10px 10px",
    color: highlight ? "var(--cream)" : "#c0b898",
    borderBottom:"1px solid rgba(255,255,255,0.04)",
    fontWeight: highlight ? 600 : 400,
  };
}
