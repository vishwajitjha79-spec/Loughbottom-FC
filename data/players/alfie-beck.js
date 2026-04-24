const player = {
  slug:        "alfie-beck",
  name:        "Alfie Beck",
  number:      3,
  role:        "Left Back",
  dob:         "19/07/2004",
  hometown:    "Sheffield",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2023,
  isCaptain:   false,

  bio: "Disciplined and positionally sharp. Beck rarely ventures forward without purpose and rarely loses his man. Russell's idea of a model full-back.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2023–24", apps: 15, goals: 0, assists: 2, rating: 7.2 },
    { season: "2024–25", apps: 18, goals: 0, assists: 3, rating: 7.5 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
