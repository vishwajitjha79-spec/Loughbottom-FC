const player = {
  slug:        "arthur-penhaligon",
  name:        "Arthur Penhaligon",
  number:      13,
  role:        "Centre Back",
  dob:         "21/01/2004",
  hometown:    "Cornwall",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2023,
  isCaptain:   false,

  bio: "The squad's most quietly dependable player. Penhaligon never makes the highlight reel because he rarely needs to — he's already in the right position.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2023–24", apps: 13, goals: 0, assists: 0, rating: 7.1 },
    { season: "2024–25", apps: 16, goals: 1, assists: 0, rating: 7.4 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
