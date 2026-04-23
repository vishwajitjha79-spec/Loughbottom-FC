# Loughbottom FC — The Last Leap

A serialised football story app for the Loughborough Stags.

---

## Quick Start (first time)

```bash
# 1. Install Node.js from https://nodejs.org (LTS version)

# 2. Clone and install
git clone https://github.com/YOUR_USERNAME/loughbottom-fc.git
cd loughbottom-fc
npm install

# 3. Run locally
npm run dev
# → open http://localhost:5173
```

---

## How to add content (no code knowledge needed)

### ➕ Add a new player

1. Create `data/players/first-last.js` (copy the template below)
2. Drop `public/players/first-last.png` (player photo, square crop, ~400×400px)
3. Push to GitHub → auto-deploys

**Player file template:**
```js
const player = {
  slug:        "first-last",        // must match PNG filename
  name:        "Full Name",
  number:      99,
  role:        "Position",
  nationality: "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  age:         21,
  isCaptain:   false,
  kit:         "home",              // "home" or "away"
  bio:         "One paragraph about the player.",
  stats: {
    appearances: 0,
    goals:       0,
    assists:     0,
    passAccuracy:80,
    tackles:     0,
    rating:      7.0,
  },
  career: [
    { season: "2025–26", apps: 0, goals: 0, assists: 0, rating: 7.0 },
  ],
  matchLog: [],
};
export default player;
```

---

### 📖 Add a new chapter

Create `data/chapters/chapter-05.js`:
```js
const chapter = {
  id:       5,
  title:    "The Draw",
  subtitle: "October — The Bracket",
  locked:   false,            // true = shown as locked in chapter select
  content: `Your chapter text here.

Blank line = new paragraph.`,
};
export default chapter;
```

---

### 📅 Add a fixture / result

Create `data/fixtures/YYYY-MM-DD-opponent.js`:
```js
const fixture = {
  id:         "2025-11-01-durham",
  date:       "2025-11-01",
  opponent:   "Durham University",
  venue:      "Home",           // "Home" or "Away"
  competition:"Inter-College Tournament — Quarter-Final",
  round:      "Quarter-Final",

  // Leave result: null for upcoming matches
  result:     null,             // "W" | "L" | "D" | null
  scoreUs:    null,
  scoreThem:  null,

  stats:   null,
  scorers: [],
  assists: [],
  report:  "",
};
export default fixture;
```

**After the match, update result:**
```js
result:    "W",
scoreUs:   2,
scoreThem: 0,
stats: {
  possession: 61, shots: 14, shotsOnTarget: 8,
  corners: 5, fouls: 8, yellowCards: 1, redCards: 0,
  passAccuracy: 86,
},
scorers: [
  { name: "Ryan Santos", minute: 23 },
  { name: "Joe Clark",   minute: 67 },
],
assists: [
  { name: "Theo Okafor", minute: 23 },
  { name: "Luca Ferrari",minute: 67 },
],
report: "Match report text here.",
```

---

### 🖼️ Where do images go?

| Image          | Folder              | Filename               |
|----------------|---------------------|------------------------|
| Club logo      | `public/`           | `logo.png`             |
| Home kit       | `public/`           | `home-kit.png`         |
| Away kit       | `public/`           | `away-kit.png`         |
| Player photo   | `public/players/`   | `first-last.png`       |

Player photos: square crop, face centred, ~400×400px PNG recommended.

---

### 🔔 New player notification

When you push a new player file, the notification popup shows on next visit.  
To trigger it manually during dev, call `setNotification(player)` in Roster.jsx.

---

## Deploying to Vercel (free hosting)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: **Vite** (auto-detected)
4. Click Deploy

Every `git push` after that auto-redeploys in ~30 seconds.

---

## Project structure

```
loughbottom-fc/
├── public/
│   ├── logo.png              ← club badge
│   ├── home-kit.png
│   ├── away-kit.png
│   └── players/
│       ├── joe-clark.png     ← one PNG per player (slug must match data file)
│       └── ryan-santos.png
│
├── data/
│   ├── coach.js              ← single coach file
│   ├── players/
│   │   ├── joe-clark.js      ← one JS per player
│   │   └── ryan-santos.js
│   ├── chapters/
│   │   ├── chapter-01.js
│   │   └── chapter-02.js
│   └── fixtures/
│       └── 2025-10-04-sheffield-hallam.js
│
└── src/
    ├── dataLoader.js         ← auto-imports everything (do not edit)
    ├── App.jsx               ← router
    ├── index.css
    ├── components/
    │   ├── UI.jsx            ← shared buttons, modals, etc.
    │   └── PlayerModal.jsx
    └── screens/
        ├── MainMenu.jsx
        ├── Chapters.jsx
        ├── Reader.jsx
        ├── Roster.jsx
        ├── Fixtures.jsx
        ├── Kits.jsx
        └── About.jsx
```
