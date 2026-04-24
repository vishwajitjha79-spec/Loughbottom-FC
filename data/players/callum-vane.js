const player = {
  slug:        "callum-vane",
  name:        "Callum Vane",
  number:      5,
  role:        "Centre Back",
  dob:         "10/11/2002",
  hometown:    "London",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         24,
  debut:       2021,
  isCaptain:   false,

  bio: "Vice-captain and the senior voice in defence. Vane has seen every kind of Loughborough collapse and refuses to accept another. Aerial dominance, aggressive on the ball.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2021–22", apps: 16, goals: 1, assists: 0, rating: 7.3 },
    { season: "2022–23", apps: 18, goals: 2, assists: 1, rating: 7.6 },
    { season: "2023–24", apps: 19, goals: 1, assists: 0, rating: 7.8 },
    { season: "2024–25", apps: 20, goals: 2, assists: 1, rating: 8.0 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
