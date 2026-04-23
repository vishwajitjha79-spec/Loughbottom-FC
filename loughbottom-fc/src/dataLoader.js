// ═══════════════════════════════════════════════════════════════
// src/dataLoader.js
//
// AUTO-LOADER — this is the heart of the system.
//
// HOW TO ADD A PLAYER:
//   1. Create  data/players/ryan-santos.js   (see template below)
//   2. Drop    public/players/ryan-santos.png  (same slug)
//   Done. App picks it up automatically.
//
// HOW TO ADD A CHAPTER:
//   1. Create  data/chapters/chapter-5.js
//   Done. It appears in chapter select automatically.
//
// HOW TO ADD A FIXTURE / RESULT:
//   1. Create  data/fixtures/2026-03-14-vs-durham.js
//   Done. Sorted by date automatically.
//
// ═══════════════════════════════════════════════════════════════

// Vite's import.meta.glob scans the file system at build time.
// Adding a new file to the folder = it's in the app next deploy.

const playerModules  = import.meta.glob('../data/players/*.js',   { eager: true });
const chapterModules = import.meta.glob('../data/chapters/*.js',  { eager: true });
const fixtureModules = import.meta.glob('../data/fixtures/*.js',  { eager: true });

export const PLAYERS = Object.values(playerModules)
  .map(m => m.default)
  .sort((a, b) => a.number - b.number);

export const CHAPTERS = Object.values(chapterModules)
  .map(m => m.default)
  .sort((a, b) => a.id - b.id);

export const FIXTURES = Object.values(fixtureModules)
  .map(m => m.default)
  .sort((a, b) => new Date(a.date) - new Date(b.date));

// Coach is a single file, imported directly
export { default as COACH } from '../data/coach.js';

// ── PHOTO RESOLVER ─────────────────────────────────────────────
// Resolves  public/players/{slug}.png
// slug is auto-derived from player name unless set manually in the data file.
export function getPlayerPhoto(player) {
  const slug = player.slug
    || player.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `/players/${slug}.png`;
}
