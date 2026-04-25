// data/coach.js

const COACH = {
  name:        "Darren Russell",
  role:        "Head Coach",
  age:         51,
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  yearsAtClub: 9,
  philosophy:  "Press high. Think faster. Never be comfortable.",
  bio: "Considered by rivals to be either a genius or a lunatic — the balance sitting firmly on the second. Turned down three marginally better jobs to remain at Loughborough, a decision his peers have never quite understood. Has a whiteboard that never holds fewer than four formations simultaneously. His wife has reported falling asleep to the sound of him muttering about defensive lines. He has been sacked in his head by three different athletic directors, none of whom followed through.",

  record: {
    wins:           61,
    draws:          48,
    losses:         97,
    tournamentBest: "Quarter-Final (×2)",
  },

  seasons: [
    { year: "2017–18", result: "Group Stage",   W: 4, D: 3, L: 9  },
    { year: "2018–19", result: "Last 16",        W: 6, D: 5, L: 7  },
    { year: "2019–20", result: "Group Stage",   W: 3, D: 4, L: 11 },
    { year: "2020–21", result: "Last 16",        W: 7, D: 6, L: 7  },
    { year: "2021–22", result: "Last 16",        W: 8, D: 5, L: 9  },
    { year: "2022–23", result: "Last 16",        W: 8, D: 7, L: 9  },
    { year: "2023–24", result: "Quarter-Final", W: 9, D: 9, L: 8  },
    { year: "2024–25", result: "Quarter-Final", W: 9, D: 9, L: 8  },
    { year: "2025–26", result: "TBD",            W: 0, D: 0, L: 0  },
  ],

  staff: [
    { name: "Samuel Collins", role: "Assistant Coach", age: 32 },
  ],
};

export default COACH;
