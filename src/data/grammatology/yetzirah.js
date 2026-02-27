import { LETTER_DB } from './letterDb.js';

const byHebrew = Object.fromEntries(LETTER_DB.map(l => [l.hebrew, l]));

// ── Zodiac sign → letter (shared by both traditions) ──────────────
export const YETZIRAH_SIGN = Object.fromEntries(
  LETTER_DB.filter(l => l.yetzirah.sign).map(l => [l.yetzirah.sign, l])
);
export const signToLetter = sign => YETZIRAH_SIGN[sign] || null;

// ── Elements (shared by both traditions) ──────────────────────────
export const YETZIRAH_ELEMENT = Object.fromEntries(
  LETTER_DB.filter(l => l.yetzirah.element).map(l => [l.yetzirah.element, l])
);

// ── Tradition 1: The Hermetic Tradition (PRIMARY) ─────────────────
// Aligns with Tarot major arcana planetary attributions
export const HERMETIC_PLANET = {
  Saturn:  byHebrew["ת"],  // Tav
  Jupiter: byHebrew["כ"],  // Kaph
  Mars:    byHebrew["פ"],  // Pe
  Sun:     byHebrew["ר"],  // Resh
  Venus:   byHebrew["ד"],  // Dalet
  Mercury: byHebrew["ב"],  // Bet
  Moon:    byHebrew["ג"],  // Gimel
};
export const hermeticPlanetToLetter = planet => HERMETIC_PLANET[planet] || null;

// ── Tradition 2: Sefer Yetzirah (SECONDARY) ───────────────────────
export const YETZIRAH_PLANET = Object.fromEntries(
  LETTER_DB.filter(l => l.yetzirah.planet).map(l => [l.yetzirah.planet, l])
);
export const planetToLetter = planet => YETZIRAH_PLANET[planet] || null;

// ── Latin → Letter lookup (for numerology) ────────────────────────
export const LATIN_TO_LETTER = {};
LETTER_DB.forEach(l => l.latin.split(" ").forEach(c => { LATIN_TO_LETTER[c] = l; }));
