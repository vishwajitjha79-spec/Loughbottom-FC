const player = {
  slug:        "bastian-grey",
  name:        "Bastian Grey",
  number:      21,
  role:        "Left Winger",
  dob:         "22/09/2004",
  hometown:    "Durham",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         22,
  debut:       2024,
  isCaptain:   false,

  bio: "Quick, creative, and occasionally infuriating in equal measure. Grey has moments of real brilliance on the left that make Russell forgive the passages where he disappears from games.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2024–25", apps: 13, goals: 3, assists: 5, rating: 7.2 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
