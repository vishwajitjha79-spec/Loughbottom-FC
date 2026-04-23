// src/screens/Fixtures.jsx
import { useState } from "react";
import { FIXTURES } from "../dataLoader.js";
import { Page, Header, SectionLabel, ResultBadge, StatCell } from "../components/UI.jsx";

function getSeasonTotals(fixtures) {
  const played = fixtures.filter(f => f.result);
  return {
    played: played.length,
    W: played.filter(f => f.result === "W").length,
    D: played.filter(f => f.result === "D").length,
    L: played.filter(f => f.result === "L").length,
    goalsFor:     played.reduce((s, f) => s + (f.scoreUs    ?? 0), 0),
    goalsAgainst: played.reduce((s, f) => s + (f.scoreThem  ?? 0), 0),
    avgPossession: played.length
      ? Math.round(played.reduce((s, f) => s + (f.stats?.possession ?? 0), 0) / played.length)
      : 0,
  };
}

export default function Fixtures({ onGo, activeFixture }) {
  const [selected, setSelected] = useState(activeFixture || null);
  const [tab, setTab]           = useState("all"); // "all" | "results" | "upcoming"

  const totals   = getSeasonTotals(FIXTURES);
  const results  = FIXTURES.filter(f => f.result);
  const upcoming = FIXTURES.filter(f => !f.result);

  const shown =
    tab === "results"  ? results  :
    tab === "upcoming" ? upcoming :
    FIXTURES;

  return (
    <Page>
      <Header title="Fixtures & Results" sub="Season 2025–26" onBack={() => onGo("menu")} />

      {selected ? (
        <FixtureDetail fixture={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          {/* Season summary bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            borderBottom: "1px solid var(--border)",
          }}>
            {[
              { val: totals.played,       lbl: "Played" },
              { val: `${totals.W}W ${totals.D}D ${totals.L}L`, lbl: "Record" },
              { val: totals.goalsFor,     lbl: "Goals For" },
              { val: totals.goalsAgainst, lbl: "Against" },
            ].map(({ val, lbl }) => (
              <div key={lbl} style={{ padding: "16px 8px", textAlign: "center", borderRight: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "var(--gold)", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase", color: "var(--fade)", marginTop: 3 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 16px" }}>
            {[["all","All"], ["results","Results"], ["upcoming","Upcoming"]].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{
                background: "none", border: "none",
                borderBottom: `2px solid ${tab === key ? "var(--gold)" : "transparent"}`,
                color: tab === key ? "var(--gold)" : "var(--fade)",
                fontFamily: "'Crimson Pro', serif", fontWeight: 600,
                fontSize: "0.82rem", letterSpacing: 2,
                textTransform: "uppercase",
                padding: "12px 14px", cursor: "pointer", transition: "all 0.2s",
              }}>{label}</button>
            ))}
          </div>

          {/* Fixture list */}
          <div style={{ padding: "8px 16px 48px", display: "flex", flexDirection: "column", gap: 8 }}>
            {shown.length === 0 && (
              <p style={{ color: "var(--fade)", fontStyle: "italic", padding: "24px 0", textAlign: "center" }}>
                No fixtures in this category yet.
              </p>
            )}
            {shown.map((f, i) => (
              <FixtureRow key={f.id} fixture={f} index={i} onClick={() => setSelected(f)} />
            ))}
          </div>
        </>
      )}
    </Page>
  );
}

function FixtureRow({ fixture: f, index, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid var(--border)",
        background: "var(--glass)",
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex", alignItems: "center", gap: 14,
        transition: "all 0.22s",
        animation: `pageFade 0.4s ease ${index * 0.05}s both`,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--glass-gold)"; e.currentTarget.style.transform = "translateX(4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--glass)"; e.currentTarget.style.transform = "none"; }}
    >
      {/* Date */}
      <div style={{ textAlign: "center", minWidth: 44 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "var(--gold)", lineHeight: 1 }}>
          {new Date(f.date).getDate()}
        </div>
        <div style={{ fontSize: "0.6rem", letterSpacing: 1, color: "var(--fade)", textTransform: "uppercase" }}>
          {new Date(f.date).toLocaleString("en-GB", { month: "short" })}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem" }}>{f.opponent}</div>
        <div style={{ fontSize: "0.75rem", color: "var(--fade)", marginTop: 3 }}>
          {f.venue} · {f.round}
        </div>
      </div>

      {/* Score or TBD */}
      <div style={{ textAlign: "center", minWidth: 60 }}>
        {f.result ? (
          <>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem", lineHeight: 1,
              color: f.result === "W" ? "#5ada5a" : f.result === "L" ? "#e05a5a" : "#d4c050",
            }}>{f.scoreUs}–{f.scoreThem}</div>
            <ResultBadge result={f.result} />
          </>
        ) : (
          <div style={{ color: "var(--fade)", fontSize: "0.78rem", fontStyle: "italic" }}>TBD</div>
        )}
      </div>

      <span style={{ color: "var(--gold)", opacity: 0.4 }}>›</span>
    </div>
  );
}

function FixtureDetail({ fixture: f, onBack }) {
  const hasStats = f.stats && Object.keys(f.stats).length > 0;

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      {/* Back */}
      <button onClick={onBack} style={{
        background: "none", border: "none",
        color: "var(--gold)", padding: "14px 20px",
        fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase",
        fontFamily: "'Crimson Pro', serif", fontWeight: 600,
        cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
      }}>‹ All Fixtures</button>

      {/* Match header */}
      <div style={{
        background: "linear-gradient(180deg, var(--green) 0%, transparent 100%)",
        padding: "20px 24px 32px",
        textAlign: "center",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
          {f.competition}
        </div>
        <div style={{ fontSize: "0.82rem", color: "var(--fade)", marginBottom: 16 }}>
          {new Date(f.date).toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
          {" · "}{f.venue}
        </div>

        {/* Score display */}
        {f.result ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <div style={{ textAlign: "right", flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem" }}>Loughborough</div>
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "3.5rem", lineHeight: 1,
              color: f.result === "W" ? "#5ada5a" : f.result === "L" ? "#e05a5a" : "#d4c050",
            }}>
              {f.scoreUs} – {f.scoreThem}
            </div>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem" }}>{f.opponent}</div>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700 }}>
            Loughborough vs {f.opponent}
          </div>
        )}

        {f.result && (
          <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
            <ResultBadge result={f.result} />
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px 48px" }}>

        {/* Match report */}
        {f.report && (
          <>
            <SectionLabel>Match Report</SectionLabel>
            <p style={{
              fontSize: "1.05rem", lineHeight: 1.8,
              color: "#c0b898", fontStyle: "italic",
              borderLeft: "3px solid var(--gold)",
              paddingLeft: 16, marginTop: 4,
            }}>{f.report}</p>
          </>
        )}

        {/* Scorers */}
        {f.scorers && f.scorers.length > 0 && (
          <>
            <SectionLabel>Goalscorers</SectionLabel>
            {f.scorers.map((s, i) => {
              const assist = f.assists?.find((_,ai) => ai === i);
              return (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderBottom: "1px solid rgba(201,168,76,0.07)",
                  fontSize: "0.92rem",
                }}>
                  <div>
                    <span style={{ fontWeight: 600, color: "var(--cream)" }}>{s.name}</span>
                    {assist && <span style={{ color: "var(--fade)", fontSize: "0.8rem" }}> (assist: {assist.name})</span>}
                  </div>
                  <span style={{ color: "var(--gold)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>{s.minute}'</span>
                </div>
              );
            })}
          </>
        )}

        {/* Match stats */}
        {hasStats && (
          <>
            <SectionLabel>Match Stats</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
              <StatCell num={`${f.stats.possession}%`} label="Possession" />
              <StatCell num={f.stats.shots}             label="Shots" />
              <StatCell num={f.stats.shotsOnTarget}     label="On Target" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              <StatCell num={f.stats.corners}       label="Corners" />
              <StatCell num={f.stats.fouls}         label="Fouls" />
              <StatCell num={`${f.stats.passAccuracy}%`} label="Pass Acc." />
            </div>

            {/* Possession bar */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.75rem", color: "var(--fade)" }}>
                <span>Loughborough {f.stats.possession}%</span>
                <span>{100 - f.stats.possession}% {f.opponent}</span>
              </div>
              <div style={{ height: 6, background: "var(--glass)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${f.stats.possession}%`,
                  background: "linear-gradient(90deg, var(--green-mid), var(--gold))",
                  borderRadius: 3,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}>
                <div style={{ width: 14, height: 18, background: "#d4c050", borderRadius: 2 }} />
                <span style={{ color: "var(--fade)" }}>{f.stats.yellowCards} Yellow</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}>
                <div style={{ width: 14, height: 18, background: "#e05a5a", borderRadius: 2 }} />
                <span style={{ color: "var(--fade)" }}>{f.stats.redCards} Red</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
