const player = {
  slug:        "mason-wilde",
  name:        "Mason Wilde",
  number:      17,
  role:        "Winger",
  dob:         "02/02/2004",
  hometown:    "York",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2023,
  isCaptain:   false,

  bio: "Two-footed and unpredictable. Wilde can play either flank and tends to drift inside, which causes problems for defenders who've been tracking him wide.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2023–24", apps: 13, goals: 3, assists: 4, rating: 7.1 },
    { season: "2024–25", apps: 16, goals: 5, assists: 6, rating: 7.4 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
