// Kept apart from planets.js so the symbolism records load with the views
// that show them, not with the first screen.
import { getPlanetSymbolism } from '../symbolism/planetSymbolism.js';
import { terse } from '../symbolism/terse.js';
import { PLANET_LETTER } from './planets.js';

// PLANET_INFO keeps the shape older components expect, but every line of prose
// now comes from the symbolic record layer. See docs/VOICE.md.
export const PLANET_INFO = Object.fromEntries(
  Object.entries(PLANET_LETTER).map(([body, meta]) => {
    const rec = getPlanetSymbolism(body);
    return [body, {
      ...meta,
      plain: rec ? terse(rec) : "",
      detail: rec ? rec.reading : "",
      principle: rec ? rec.principle : "",
      record: rec || null,
    }];
  })
);
