// data/fixtures/2025-10-04-sheffield-hallam.js
// One file per match. Filename format: YYYY-MM-DD-opponent-slug.js
// result: "W" | "L" | "D" | null (null = upcoming)

const fixture = {
  // ── Match info ────────────────────────────────────────────
  id:         "2025-10-04-sheffield-hallam",
  date:       "2025-10-04",
  opponent:   "Sheffield Hallam",
  venue:      "Home",
  competition:"Inter-College Tournament — Group Stage",
  round:      "Matchday 1",

  // ── Result (set after match) ──────────────────────────────
  result:     "W",          // "W" | "L" | "D" | null
  scoreUs:    2,
  scoreThem:  1,

  // ── Match stats ──────────────────────────────────────────
  stats: {
    possession:    58,       // %
    shots:         14,
    shotsOnTarget:  7,
    corners:        6,
    fouls:          9,
    yellowCards:    1,
    redCards:       0,
    passAccuracy:  84,
  },

  // ── Scorers ───────────────────────────────────────────────
  scorers: [
    { name: "Ryan Santos",  minute: 34 },
    { name: "Joe Clark",    minute: 71 },
  ],

  // ── Assists ───────────────────────────────────────────────
  assists: [
    { name: "Joe Clark",    minute: 34 },
    { name: "Luca Ferrari", minute: 71 },
  ],

  // ── Match report (optional, shown in fixture detail) ──────
  report: "A hard-fought opener. Santos opened the scoring with a clinical finish before Clark sealed it with a driven effort from the edge of the box. Webb pulled off a fine late save to preserve the win.",
};

export default fixture;
