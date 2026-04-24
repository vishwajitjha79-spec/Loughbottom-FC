const player = {
  slug:        "harrison-fox",
  name:        "Harrison Fox",
  number:      7,
  role:        "Right Winger",
  dob:         "30/06/2004",
  hometown:    "Leeds",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2023,
  isCaptain:   false,

  bio: "Direct, quick, and loves a one-on-one. Fox burns down the right flank and has the awareness to find the cutback when the cross is on. Inconsistent but dangerous.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2023–24", apps: 14, goals: 4, assists: 5, rating: 7.3 },
    { season: "2024–25", apps: 17, goals: 6, assists: 7, rating: 7.6 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
