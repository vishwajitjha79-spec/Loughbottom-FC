const player = {
  slug:        "ewan-mcgregor",
  name:        "Ewan McGregor",
  number:      6,
  role:        "Defensive Midfielder",
  dob:         "28/02/2005",
  hometown:    "Glasgow",
  nationality: "Scottish 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  age:         21,
  debut:       2024,
  isCaptain:   false,

  bio: "Combative and relentless in the press. McGregor wins the ball and moves it simply — Russell loves players who don't overcomplicate things. Still raw but improving rapidly.",

  stats: {
    appearances:  0,
    goals:        0,
    assists:      0,
    passAccuracy: 0,
    tackles:      0,
    rating:       0,
  },

  career: [
    { season: "2024–25", apps: 12, goals: 0, assists: 2, rating: 7.1 },
    { season: "2025–26", apps: 0,  goals: 0, assists: 0, rating: 0   },
  ],

  matchLog: [],
};

export default player;
