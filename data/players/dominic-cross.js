const player = {
  slug:        "dominic-cross",
  name:        "Dominic Cross",
  number:      9,
  role:        "Striker",
  dob:         "25/05/2003",
  hometown:    "Newcastle",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         23,
  debut:       2022,
  isCaptain:   false,

  bio: "Hold-up striker who brings others into play as much as he finishes. Cross has the physicality to lead the line and the touch to bring it down in tight spaces.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2022–23", apps: 14, goals: 6,  assists: 3, rating: 7.2 },
    { season: "2023–24", apps: 17, goals: 9,  assists: 4, rating: 7.5 },
    { season: "2024–25", apps: 19, goals: 11, assists: 5, rating: 7.7 },
    { season: "2025–26", apps: 0,  goals: 0,  assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
