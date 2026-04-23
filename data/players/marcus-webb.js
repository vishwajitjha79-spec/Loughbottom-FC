// data/players/marcus-webb.js

const player = {
  slug:        "marcus-webb",
  name:        "Marcus Webb",
  number:      1,
  role:        "Goalkeeper",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         23,
  isCaptain:   false,
  kit:         "away",

  bio: "Steady, commanding, the wall behind the chaos. Has saved two penalty shoot-outs — though the Stags never made it far enough for either to matter until now.",

  stats: {
    appearances:  15,
    goals:         0,
    assists:       0,
    cleanSheets:   6,
    savePercent:  76,
    rating:       7.9,
  },

  career: [
    { season: "2022–23", apps: 16, goals: 0, assists: 0, rating: 7.2 },
    { season: "2023–24", apps: 18, goals: 0, assists: 0, rating: 7.5 },
    { season: "2024–25", apps: 19, goals: 0, assists: 1, rating: 7.8 },
    { season: "2025–26", apps: 15, goals: 0, assists: 0, rating: 7.9 },
  ],

  matchLog: [
    { date: "2025-10-04", opponent: "Sheffield Hallam",  result: "W 2-1", saves: 4, cleanSheet: false, rating: 7.8 },
    { date: "2025-10-11", opponent: "Leeds Beckett",     result: "D 1-1", saves: 5, cleanSheet: false, rating: 7.6 },
    { date: "2025-10-18", opponent: "Nottingham Trent",  result: "W 3-0", saves: 2, cleanSheet: true,  rating: 8.2 },
  ],
};

export default player;
