// data/players/ryan-santos.js

const player = {
  slug:        "ryan-santos",
  name:        "Ryan Santos",
  number:      9,
  role:        "Centre Forward",
  nationality: "Brazilian 🇧🇷",
  age:         22,
  isCaptain:   false,
  kit:         "home",

  bio: "Imported talent. Explosive, instinctive, occasionally infuriating. Russell calls him 'the most gifted striker I've coached in twenty years — and the most maddening.' Top scorer for two consecutive seasons.",

  stats: {
    appearances:  21,
    goals:        20,
    assists:       5,
    passAccuracy: 71,
    tackles:       4,
    rating:       8.9,
  },

  career: [
    { season: "2024–25", apps: 20, goals: 18, assists: 4, rating: 8.5 },
    { season: "2025–26", apps: 21, goals: 20, assists: 5, rating: 8.9 },
  ],

  matchLog: [
    { date: "2025-10-04", opponent: "Sheffield Hallam",  result: "W 2-1", goals: 1, assists: 0, rating: 8.5 },
    { date: "2025-10-11", opponent: "Leeds Beckett",     result: "D 1-1", goals: 1, assists: 0, rating: 8.1 },
    { date: "2025-10-18", opponent: "Nottingham Trent",  result: "W 3-0", goals: 2, assists: 1, rating: 9.4 },
  ],
};

export default player;
