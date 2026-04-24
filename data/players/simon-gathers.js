const player = {
  slug:        "simon-gathers",
  name:        "Simon Gathers",
  number:      15,
  role:        "Defensive Midfielder",
  dob:         "05/06/2004",
  hometown:    "Leicester",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2023,
  isCaptain:   false,

  bio: "Covers ground quietly and effectively. Gathers does the unglamorous work that makes everyone else look better — interceptions, clearances, simple passes forward.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2023–24", apps: 12, goals: 0, assists: 1, rating: 7.0 },
    { season: "2024–25", apps: 15, goals: 1, assists: 2, rating: 7.2 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
