const player = {
  slug:        "leo-sterling",
  name:        "Leo Sterling",
  number:      2,
  role:        "Right Back",
  dob:         "22/08/2003",
  hometown:    "Manchester",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         23,
  debut:       2022,
  isCaptain:   false,

  bio: "Overlapping full-back with an engine that never seems to stop. Sterling's crosses from the right have set up more goals than the stats suggest.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2022–23", apps: 14, goals: 0, assists: 3, rating: 7.2 },
    { season: "2023–24", apps: 17, goals: 1, assists: 4, rating: 7.4 },
    { season: "2024–25", apps: 19, goals: 0, assists: 5, rating: 7.6 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
