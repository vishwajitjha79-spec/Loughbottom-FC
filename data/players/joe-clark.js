const player = {
  slug:        "joe-clark",
  name:        "Joe Clark",
  number:      10,
  role:        "Attacking Midfielder",
  dob:         "15/03/2002",
  hometown:    "London",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         24,
  debut:       2021,
  isCaptain:   true,

  bio: "Four-year captain. The engine and soul of this club. Reads the game like a man twice his age — Russell's words, not his. In his final year at Loughborough with everything still to prove.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2021–22", apps: 14, goals: 2, assists: 5,  rating: 7.2 },
    { season: "2022–23", apps: 16, goals: 2, assists: 6,  rating: 7.4 },
    { season: "2023–24", apps: 18, goals: 4, assists: 9,  rating: 8.0 },
    { season: "2024–25", apps: 19, goals: 5, assists: 10, rating: 8.3 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0,  rating: 0   },
  ],

  matchLog: [],
};

export default player;
