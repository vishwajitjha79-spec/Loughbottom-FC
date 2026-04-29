// src/screens/PlayerProfile.jsx
// Full-screen dedicated player profile — opened when tapping a player card

import { useState } from "react";
import { getPlayerPhoto } from "../dataLoader.js";

const POS_COLOR = {
  Goalkeeper: "#e87b6a",
  Defender:   "#6ab4e8",
  Midfielder: "#c9a84c",
  Forward:    "#5ada5a",
};

function posColor(role = "") {
  const r = role.toLowerCase();
  if (r.includes("goalkeeper"))                                        return POS_COLOR.Goalkeeper;
  if (r.includes("back") || r.includes("defend") || r.includes("cb")) return POS_COLOR.Defender;
  if (r.includes("striker") || r.includes("forward"))                  return POS_COLOR.Forward;
  return POS_COLOR.Midfielder;
}

function allTimeStats(career) {
  return career?.reduce((acc, s) => ({
    apps:    acc.apps    + (s.apps    || 0),
    goals:   acc.goals   + (s.goals   || 0),
    assists: acc.assists + (s.assists || 0),
    seasons: acc.seasons + 1,
  }), { apps: 0, goals: 0, assists: 0, seasons: 0 }) || { apps:0, goals:0, assists:0, seasons:0 };
}

export default function PlayerProfile({ player, jerseyNumber, onBack, onGo }) {
  const [imgOk,  setImgOk]  = useState(true);
  const [tab,    setTab]    = useState("bio"); // "bio" | "stats" | "career"
  const photo = getPlayerPhoto(player);
  const color = posColor(player.role);
  const isGK  = player.role.toLowerCase().includes("goalkeeper");
  const allTime = allTimeStats(player.career);

  const parts     = player.name.trim().split(" ");
  const firstName = parts.slice(0, -1).join(" ");
  const lastName  = parts[parts.length - 1].toUpperCase();

  return (
    <div style={{
      minHeight:  "100vh",
      background: "#060e06",
      display:    "flex",
      flexDirection: "column",
      position:   "relative",
      overflow:   "hidden",
      animation:  "pageFade 0.35s ease",
    }}>

      {/* ══════════════════════════════════════════════
          TOP HALF — photo + identity
      ══════════════════════════════════════════════ */}
      <div style={{
        position:   "relative",
        minHeight:  "52vh",
        overflow:   "hidden",
        flexShrink: 0,
      }}>
        {/* Background colour wash */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 30% 0%,   ${color}22 0%, transparent 55%),
            radial-gradient(ellipse at 100% 100%, ${color}10 0%, transparent 50%),
            linear-gradient(160deg, #0d1f0d 0%, #060e06 100%)
          `,
        }} />

        {/* Fine grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg,  transparent, transparent 48px, ${color}08 48px, ${color}08 49px),
            repeating-linear-gradient(90deg, transparent, transparent 48px, ${color}08 48px, ${color}08 49px)
          `,
        }} />

        {/* ── Back button ── */}
        <button onClick={onBack} style={{
          position:   "absolute", top: 16, left: 16,
          zIndex:     20,
          background: "rgba(0,0,0,0.55)",
          border:     "1px solid rgba(255,255,255,0.12)",
          color:      "rgba(255,255,255,0.8)",
          width:      38, height: 38,
          display:    "flex", alignItems: "center", justifyContent: "center",
          fontSize:   "1.1rem", cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}>‹</button>

        {/* ── Menu button ── */}
        <button onClick={() => onGo("menu")} style={{
          position:   "absolute", top: 16, right: 16,
          zIndex:     20,
          background: "rgba(0,0,0,0.55)",
          border:     "1px solid rgba(255,255,255,0.12)",
          color:      "rgba(255,255,255,0.5)",
          padding:    "8px 14px",
          fontSize:   "0.65rem", letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "'Crimson Pro', serif", fontWeight: 600,
          cursor:     "pointer",
          backdropFilter: "blur(6px)",
        }}>≡ Menu</button>

        {/* ── LAYOUT: photo left, identity right ── */}
        <div style={{
          display:        "flex",
          alignItems:     "flex-end",
          height:         "100%",
          minHeight:      "52vh",
          position:       "relative",
          zIndex:         5,
        }}>

          {/* Player photo — left, large, bottom-anchored */}
          <div style={{
            width:    "48%",
            height:   "100%",
            minHeight:"52vh",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
          }}>
            {imgOk ? (
              <img
                src={photo} alt={player.name}
                style={{
                  position:       "absolute",
                  bottom:         0, left: 0,
                  width:          "100%",
                  height:         "115%",
                  objectFit:      "cover",
                  objectPosition: "top center",
                  filter:         "brightness(0.92) contrast(1.05)",
                }}
                onError={() => setImgOk(false)}
              />
            ) : (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}10`,
              }}>
                <span style={{ fontSize: "5rem", opacity: 0.25 }}>👤</span>
              </div>
            )}
            {/* Right-side fade */}
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "40%",
              background: "linear-gradient(90deg, transparent, #060e06)",
            }} />
            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
              background: "linear-gradient(0deg, #060e06, transparent)",
            }} />
          </div>

          {/* Identity block — right side */}
          <div style={{
            flex:    1,
            padding: "0 18px 20px 8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 6,
          }}>
            {/* Jersey number — huge */}
            <div style={{
              fontFamily:   "'Bebas Neue', sans-serif",
              fontSize:     "clamp(4rem, 14vw, 7rem)",
              lineHeight:   0.85,
              color:        `${color}35`,
              letterSpacing:2,
              userSelect:   "none",
            }}>{jerseyNumber}</div>

            {/* Position badge */}
            <div style={{
              display:    "inline-flex", alignSelf: "flex-start",
              background: `${color}22`,
              border:     `1px solid ${color}66`,
              color,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize:   "0.62rem", letterSpacing: 3,
              padding:    "3px 10px",
            }}>{player.role}</div>

            {/* Name */}
            <div>
              {firstName && (
                <div style={{
                  fontFamily:    "'Crimson Pro', serif",
                  fontStyle:     "italic",
                  fontSize:      "0.95rem",
                  color:         "rgba(255,255,255,0.55)",
                  letterSpacing: 1,
                  lineHeight:    1.2,
                }}>{firstName}</div>
              )}
              <div style={{
                fontFamily:    "'Bebas Neue', sans-serif",
                fontSize:      "clamp(1.8rem, 6vw, 2.8rem)",
                letterSpacing: 2,
                lineHeight:    1,
                color:         "#ffffff",
              }}>{lastName}</div>
            </div>

            {player.isCaptain && (
              <div style={{
                display:    "inline-flex", alignSelf: "flex-start",
                background: "var(--gold)", color: "#060e06",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize:   "0.6rem", letterSpacing: 2,
                padding:    "3px 10px",
              }}>⭐ Club Captain</div>
            )}

            {/* Quick meta */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              {[player.nationality, `Age ${player.age}`, player.hometown].filter(Boolean).map(m => (
                <span key={m} style={{
                  fontSize:   "0.65rem", color: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.04)",
                  border:     "1px solid rgba(255,255,255,0.07)",
                  padding:    "2px 8px",
                }}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Colour bottom rule */}
        <div style={{
          position:   "absolute", bottom: 0, left: 0, right: 0,
          height:     2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity:    0.6,
          zIndex:     10,
        }} />
      </div>

      {/* ══════════════════════════════════════════════
          BOTTOM HALF — tabs + detail
      ══════════════════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Tab bar */}
        <div style={{
          display:      "flex",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          background:   "#070f07",
        }}>
          {[
            { key: "bio",    label: "Profile"     },
            { key: "stats",  label: "Stats"       },
            { key: "career", label: "Career"      },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex:          1,
              background:    "none",
              border:        "none",
              borderBottom:  `2px solid ${tab === key ? color : "transparent"}`,
              color:         tab === key ? color : "rgba(201,168,76,0.3)",
              fontFamily:    "'Bebas Neue', sans-serif",
              fontSize:      "0.75rem",
              letterSpacing: 3,
              padding:       "13px 8px",
              cursor:        "pointer",
              transition:    "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 48px" }}>

          {/* ── BIO TAB ── */}
          {tab === "bio" && (
            <div style={{ animation: "pageFade 0.3s ease" }}>
              <p style={{
                fontSize: "1rem", lineHeight: 1.82,
                color: "#c8bfa8", fontStyle: "italic",
                borderLeft: `3px solid ${color}`,
                paddingLeft: 14,
                marginBottom: 24,
              }}>{player.bio || "No biography available."}</p>

              {/* Player details table */}
              <DetailTable color={color} rows={[
                { label: "Date of Birth", value: player.dob        || "—" },
                { label: "Hometown",      value: player.hometown    || "—" },
                { label: "Nationality",   value: player.nationality || "—" },
                { label: "Jersey No.",    value: `#${jerseyNumber}`        },
                { label: "Lboro Debut",   value: player.debut ? String(player.debut) : "—" },
                { label: "Seasons",       value: String(player.career?.length || 0)        },
              ]} />
            </div>
          )}

          {/* ── STATS TAB ── */}
          {tab === "stats" && (
            <div style={{ animation: "pageFade 0.3s ease" }}>

              {/* Current season */}
              <SectionHead color={color}>2025–26 Season</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
                <BigStat num={player.stats?.appearances ?? 0} label="Apps"    color={color} />
                <BigStat num={player.stats?.goals       ?? 0} label="Goals"   color={color} />
                <BigStat num={player.stats?.assists     ?? 0} label="Assists" color={color} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 6 }}>
                {isGK ? (
                  <>
                    <BigStat num={player.stats?.cleanSheets  ?? 0}      label="Clean Sh."  color={color} />
                    <BigStat num={`${player.stats?.savePercent ?? 0}%`} label="Save %"     color={color} />
                  </>
                ) : (
                  <>
                    <BigStat num={`${player.stats?.passAccuracy ?? 0}%`} label="Pass Acc." color={color} />
                    <BigStat num={player.stats?.tackles ?? 0}            label="Tackles"   color={color} />
                  </>
                )}
                <BigStat num={player.stats?.rating || "—"} label="Rating" color={color} />
              </div>
              <p style={{ fontSize: "0.7rem", color: "rgba(201,168,76,0.3)", fontStyle: "italic", textAlign: "center", marginBottom: 28 }}>
                Season underway — no matches played yet
              </p>

              {/* All-time totals */}
              <SectionHead color={color}>All-Time Totals</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
                <BigStat num={allTime.seasons} label="Seasons"      color={color} large />
                <BigStat num={allTime.apps}    label="Appearances"  color={color} large />
                <BigStat num={allTime.goals}   label="Goals"        color={color} large />
                <BigStat num={allTime.assists} label="Assists"      color={color} large />
              </div>
            </div>
          )}

          {/* ── CAREER TAB ── */}
          {tab === "career" && (
            <div style={{ animation: "pageFade 0.3s ease" }}>
              <SectionHead color={color}>Season by Season</SectionHead>

              {player.career && player.career.length > 0 ? (
                <>
                  {player.career.map((s, idx) => {
                    const isLatest  = idx === player.career.length - 1;
                    const isCurrent = s.season.includes("2025");
                    return (
                      <div key={s.season} style={{
                        background:   isCurrent ? `${color}0d` : "rgba(255,255,255,0.02)",
                        border:       `1px solid ${isCurrent ? color+"33" : "rgba(255,255,255,0.05)"}`,
                        padding:      "14px 16px",
                        marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize:   "0.9rem", letterSpacing: 2,
                            color:      isCurrent ? color : "rgba(201,168,76,0.6)",
                          }}>{s.season}</div>
                          {isCurrent && (
                            <div style={{
                              background: color, color: "#060e06",
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize:   "0.55rem", letterSpacing: 2,
                              padding:    "2px 8px",
                            }}>Current</div>
                          )}
                          {s.rating > 0 && !isCurrent && (
                            <div style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "1.1rem",
                              color: s.rating >= 8.5 ? "#e8c96a" : s.rating >= 7.5 ? "#c0b898" : "var(--fade)",
                            }}>★ {s.rating}</div>
                          )}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                          {[
                            { v: s.apps,    l: "Apps"    },
                            { v: s.goals,   l: "Goals"   },
                            { v: s.assists, l: "Assists"  },
                            { v: s.rating || "—", l: "Rating" },
                          ].map(({ v, l }) => (
                            <div key={l} style={{ textAlign: "center" }}>
                              <div style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize:   "1.4rem", lineHeight: 1,
                                color:      isCurrent ? color : "var(--cream)",
                              }}>{v}</div>
                              <div style={{ fontSize: "0.58rem", letterSpacing: 2, color: "var(--fade)", textTransform: "uppercase", marginTop: 3 }}>{l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* All-time totals row */}
                  <div style={{
                    background: "rgba(201,168,76,0.05)",
                    border:     "1px solid rgba(201,168,76,0.2)",
                    padding:    "14px 16px",
                    marginTop:  4,
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize:   "0.7rem", letterSpacing: 3,
                      color:      "var(--gold)", marginBottom: 10,
                    }}>All-Time Totals</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                      {[
                        { v: allTime.apps,    l: "Appearances" },
                        { v: allTime.goals,   l: "Goals"       },
                        { v: allTime.assists, l: "Assists"      },
                      ].map(({ v, l }) => (
                        <div key={l} style={{ textAlign: "center" }}>
                          <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.8rem", lineHeight:1, color:"var(--gold)" }}>{v}</div>
                          <div style={{ fontSize:"0.58rem", letterSpacing:2, color:"var(--fade)", textTransform:"uppercase", marginTop:3 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ color: "var(--fade)", fontStyle: "italic" }}>No career data yet.</p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────
function SectionHead({ children, color }) {
  return (
    <div style={{
      fontSize:      "0.62rem", letterSpacing: 4,
      textTransform: "uppercase", color,
      padding:       "0 0 10px",
      borderBottom:  `1px solid ${color}33`,
      marginBottom:  14,
    }}>{children}</div>
  );
}

function BigStat({ num, label, color, large }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border:     "1px solid rgba(255,255,255,0.06)",
      padding:    large ? "16px 12px" : "12px 8px",
      textAlign:  "center",
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize:   large ? "2.4rem" : "1.9rem",
        lineHeight: 1, color,
        display:    "block",
      }}>{num}</div>
      <div style={{
        fontSize:      "0.6rem", letterSpacing: 2,
        textTransform: "uppercase", color: "var(--fade)",
        marginTop:     4, display: "block",
      }}>{label}</div>
    </div>
  );
}

function DetailTable({ rows, color }) {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
      {rows.map(({ label, value }, i) => (
        <div key={label} style={{
          display:       "flex",
          borderBottom:  i < rows.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          fontSize:      "0.85rem",
        }}>
          <div style={{
            padding:    "11px 14px",
            width:      "40%",
            flexShrink: 0,
            background: "rgba(255,255,255,0.02)",
            color:      "rgba(201,168,76,0.45)",
            fontSize:   "0.7rem",
            letterSpacing: 1,
            textTransform: "uppercase",
            borderRight:   "1px solid rgba(255,255,255,0.04)",
          }}>{label}</div>
          <div style={{ padding: "11px 14px", color: "var(--cream)", flex: 1 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}
