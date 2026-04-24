const player = {
  slug:        "marcus-thorne",
  name:        "Marcus Thorne",
  number:      1,
  role:        "Goalkeeper",
  dob:         "14/05/2004",
  hometown:    "Bristol",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2022,
  isCaptain:   false,

  bio: "Commanding and vocal between the sticks. Thorne arrived from Bristol's youth setup with a reputation for penalty saves. First choice since Webb graduated.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    cleanSheets:  0,
    savePercent:  0,
    rating:       0,
  },

  career: [
    { season: "2022–23", apps: 8,  goals: 0, assists: 0, rating: 7.1 },
    { season: "2023–24", apps: 12, goals: 0, assists: 0, rating: 7.3 },
    { season: "2024–25", apps: 15, goals: 0, assists: 0, rating: 7.5 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
