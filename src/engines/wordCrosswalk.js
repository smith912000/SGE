import { LETTER_DB } from '../data/grammatology/letterDb.js';
import { LATIN_TO_LETTER } from '../data/grammatology/yetzirah.js';
import { calcGematria } from './gematria.js';
import { PYTHAGOREAN, CHALDEAN } from '../data/numerology/tables.js';

function reduceToSingle(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33)
    n = String(n).split('').reduce((s, d) => s + Number(d), 0);
  return n;
}

const ELEMENT_KEYWORDS = { Air: 'thought', Water: 'feeling', Fire: 'transformation' };
const PLANET_KEYWORDS = {
  Saturn: 'structure', Jupiter: 'expansion', Mars: 'action',
  Sun: 'identity', Moon: 'intuition', Mercury: 'communication', Venus: 'beauty',
};

export function analyzeWord(text) {
  if (!text || !text.trim()) return null;
  const clean = text.toUpperCase().replace(/[^A-Z]/g, '');
  if (!clean) return null;

  const gematria = calcGematria(text);

  const letters = [];
  for (const ch of clean) {
    const entry = LATIN_TO_LETTER[ch];
    if (!entry) {
      letters.push({ latin: ch, found: false });
      continue;
    }
    const db = LETTER_DB.find(l => l.hebrew === entry.hebrew);
    letters.push({
      latin: ch, found: true,
      hebrew: entry.hebrew, hebrewName: entry.hebrewName,
      phoenician: db?.phoenician || '', greek: db?.greek || '', greekName: db?.greekName || '',
      hiero: db?.hiero || '', hieroName: db?.hieroName || '',
      runic: db?.runic || '', runicName: db?.runicName || '',
      gematria: db?.gematria || 0,
      acrophony: db?.acrophony || '',
      pictographic: db?.pictographic || '',
      yetzirah: db?.yetzirah || {},
      tarotName: db?.tarotName || null, tarot: db?.tarot ?? null,
      oghamName: db?.oghamName || null, oghamTree: db?.oghamTree || null,
    });
  }

  let pythTotal = 0, chaldTotal = 0;
  for (const ch of clean) {
    pythTotal += PYTHAGOREAN[ch] || 0;
    chaldTotal += CHALDEAN[ch] || 0;
  }
  const numerology = {
    pythagorean: pythTotal, pythReduced: reduceToSingle(pythTotal),
    chaldean: chaldTotal, chaldReduced: reduceToSingle(chaldTotal),
  };

  const elements = { Air: 0, Water: 0, Fire: 0 };
  const yetzirahTypes = { mother: 0, double: 0, simple: 0 };
  const planets = [];
  const signs = [];
  const tarot = [];
  const ogham = [];

  for (const l of letters) {
    if (!l.found) continue;
    const y = l.yetzirah;
    if (y.type) yetzirahTypes[y.type] = (yetzirahTypes[y.type] || 0) + 1;
    if (y.element && elements[y.element] !== undefined) elements[y.element]++;
    if (y.planet && !planets.includes(y.planet)) planets.push(y.planet);
    if (y.sign && !signs.includes(y.sign)) signs.push(y.sign);
    if (l.tarotName) tarot.push({ name: l.tarotName, number: l.tarot, letter: l.latin });
    if (l.oghamName) ogham.push({ name: l.oghamName, tree: l.oghamTree, letter: l.latin });
  }

  const foundLetters = letters.filter(l => l.found);
  const pictoChain = foundLetters.map(l => l.acrophony?.split('/')[0]?.trim() || '').filter(Boolean);

  const dominantElement = Object.entries(elements).sort(([, a], [, b]) => b - a)[0];
  const dominantType = Object.entries(yetzirahTypes).sort(([, a], [, b]) => b - a)[0];

  let narrative = `"${text.toUpperCase()}" traces a path through `;
  if (pictoChain.length > 0) {
    narrative += pictoChain.map(p => `the ${p.toLowerCase()}`).join(', then ') + '. ';
  }
  if (dominantElement && dominantElement[1] > 0) {
    narrative += `Its letters carry ${dominantElement[0]} energy (${ELEMENT_KEYWORDS[dominantElement[0]] || dominantElement[0].toLowerCase()}). `;
  }
  if (planets.length > 0) {
    narrative += `Planetary resonance: ${planets.map(p => `${p} (${PLANET_KEYWORDS[p] || ''})`).join(', ')}. `;
  }
  if (signs.length > 0) {
    narrative += `Zodiac thread: ${signs.join(', ')}. `;
  }
  if (gematria.total) {
    narrative += `Gematria ${gematria.total} reduces to ${gematria.reduced}`;
    if (gematria.planetRes) narrative += ` — the number of ${gematria.planetRes}`;
    narrative += '.';
  }

  return {
    input: text, clean,
    letters, gematria, numerology,
    elements, yetzirahTypes,
    planets, signs, tarot, ogham,
    synthesis: { dominantElement, dominantType, pictoChain, narrative },
  };
}
