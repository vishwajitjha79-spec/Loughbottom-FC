const player = {
  slug:        "dexter-flint",
  name:        "Dexter Flint",
  number:      8,
  role:        "Central Midfielder",
  dob:         "12/09/2003",
  hometown:    "Birmingham",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         23,
  debut:       2022,
  isCaptain:   false,

  bio: "Box-to-box energy. Flint covers ground obsessively and arrives late in the box with an underrated eye for goal. The player opponents forget to track until it's too late.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2022–23", apps: 15, goals: 3, assists: 4, rating: 7.2 },
    { season: "2023–24", apps: 18, goals: 4, assists: 5, rating: 7.5 },
    { season: "2024–25", apps: 20, goals: 5, assists: 6, rating: 7.7 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
