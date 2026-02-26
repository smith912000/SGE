import { LETTER_DB } from './letterDb.js';

export const YETZIRAH_SIGN = Object.fromEntries(LETTER_DB.filter(l=>l.yetzirah.sign).map(l=>[l.yetzirah.sign, l]));
export const YETZIRAH_PLANET = Object.fromEntries(LETTER_DB.filter(l=>l.yetzirah.planet).map(l=>[l.yetzirah.planet, l]));
export const YETZIRAH_ELEMENT = Object.fromEntries(LETTER_DB.filter(l=>l.yetzirah.element).map(l=>[l.yetzirah.element, l]));
export const signToLetter = sign => YETZIRAH_SIGN[sign] || null;
export const planetToLetter = planet => YETZIRAH_PLANET[planet] || null;

export const LATIN_TO_LETTER = {};
LETTER_DB.forEach(l => l.latin.split(" ").forEach(c => { LATIN_TO_LETTER[c] = l; }));
