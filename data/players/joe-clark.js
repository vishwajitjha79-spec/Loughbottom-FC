// data/players/joe-clark.js
// TEMPLATE — copy this file, rename it, fill in the fields.
// Filename slug MUST match public/players/{slug}.png

const player = {
  // ── Identity ──────────────────────────────────────────────
  slug:        "joe-clark",           // must match PNG filename
  name:        "Joe Clark",
  number:      10,
  role:        "Central Midfielder",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         24,
  isCaptain:   true,
  kit:         "home",               // "home" | "away"

  // ── Bio ───────────────────────────────────────────────────
  bio: "Four-year captain. The engine of the midfield and the soul of this club. Reads the game like a man twice his age — Russell's words. In his final year at Loughborough with everything still to prove.",

  // ── Season stats (current season) ────────────────────────
  stats: {
    appearances:  15,
    goals:         3,
    assists:       6,
    passAccuracy: 87,
    tackles:      44,
    rating:       8.6,
  },

  // ── Career history ────────────────────────────────────────
  // Add a new row each season.
  career: [
    { season: "2022–23", apps: 16, goals: 2, assists:  6, rating: 7.4 },
    { season: "2023–24", apps: 18, goals: 4, assists:  9, rating: 8.0 },
    { season: "2024–25", apps: 19, goals: 5, assists: 10, rating: 8.3 },
    { season: "2025–26", apps: 15, goals: 3, assists:  6, rating: 8.6 },
  ],

  // ── Match log (updated after each game) ──────────────────
  // Add a new object after each match. Leave empty array if none yet.
  matchLog: [
    { date: "2025-10-04", opponent: "Sheffield Hallam",  result: "W 2-1", goals: 1, assists: 1, rating: 8.8 },
    { date: "2025-10-11", opponent: "Leeds Beckett",     result: "D 1-1", goals: 0, assists: 0, rating: 7.9 },
    { date: "2025-10-18", opponent: "Nottingham Trent",  result: "W 3-0", goals: 1, assists: 2, rating: 9.1 },
  ],
};

export default player;
