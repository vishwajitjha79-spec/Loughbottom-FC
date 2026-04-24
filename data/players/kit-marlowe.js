const player = {
  slug:        "kit-marlowe",
  name:        "Kit Marlowe",
  number:      20,
  role:        "Centre Back",
  dob:         "30/07/2003",
  hometown:    "Canterbury",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         23,
  debut:       2022,
  isCaptain:   false,

  bio: "A composed reader of the game who rarely needs to make the dramatic tackle because he's already killed the danger. Marlowe is the quiet spine of the defence.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2022–23", apps: 12, goals: 0, assists: 0, rating: 7.0 },
    { season: "2023–24", apps: 16, goals: 1, assists: 0, rating: 7.3 },
    { season: "2024–25", apps: 17, goals: 0, assists: 1, rating: 7.4 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
