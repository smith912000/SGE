// House labels and areas, with prose from the symbolic record layer.
// See docs/VOICE.md.

import { getHouseSymbolism } from '../symbolism/houseSymbolism.js';
import { terse } from '../symbolism/terse.js';

const HOUSE_LABEL = [
  { n: 1,  name: "1st House — Self",           emoji: "👤" },
  { n: 2,  name: "2nd House — Resources",      emoji: "💰" },
  { n: 3,  name: "3rd House — Mind",           emoji: "🗣️" },
  { n: 4,  name: "4th House — Home",           emoji: "🏠" },
  { n: 5,  name: "5th House — Creativity",     emoji: "🎨" },
  { n: 6,  name: "6th House — Service",        emoji: "⚕️" },
  { n: 7,  name: "7th House — Partnership",    emoji: "🤝" },
  { n: 8,  name: "8th House — Transformation", emoji: "🔄" },
  { n: 9,  name: "9th House — Philosophy",     emoji: "🌍" },
  { n: 10, name: "10th House — Career",        emoji: "🏆" },
  { n: 11, name: "11th House — Community",     emoji: "👥" },
  { n: 12, name: "12th House — Hidden",        emoji: "🌌" },
];

export const HOUSE_INFO = HOUSE_LABEL.map((h) => {
  const rec = getHouseSymbolism(h.n);
  return {
    ...h,
    plain: rec ? terse(rec) : "",
    detail: rec ? rec.reading : "",
    principle: rec ? rec.principle : "",
    record: rec || null,
  };
});

export const HOUSE_AREA = [
  "Self","Money & Worth","Communication","Home & Roots","Creativity & Joy","Health & Routine",
  "Partnerships","Transformation","Beliefs & Travel","Career & Legacy","Friends & Hopes","Inner Life & Solitude",
];
