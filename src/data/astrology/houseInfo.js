// Kept apart from houses.js so the symbolism records load with the views
// that show them, not with the first screen.
import { getHouseSymbolism } from '../symbolism/houseSymbolism.js';
import { terse } from '../symbolism/terse.js';
import { HOUSE_LABEL } from './houses.js';

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
