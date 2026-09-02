// Chart-frame points, with prose from the symbolic record layer.
// See docs/VOICE.md.

import { getAxisSymbolism } from '../symbolism/aspectSymbolism.js';
import { terse } from '../symbolism/terse.js';

const AXIS_LABEL = {
  AC: { title: "Ascendant (Rising Degree)", emoji: "🌅" },
  DC: { title: "Descendant (Setting Degree)", emoji: "🌇" },
  MC: { title: "Midheaven (Culminating Degree)", emoji: "🏔️" },
  IC: { title: "Imum Coeli (Lower Meridian)", emoji: "🌱" },
};

export const AXIS_INFO = Object.fromEntries(
  Object.entries(AXIS_LABEL).map(([k, meta]) => {
    const rec = getAxisSymbolism(k);
    return [k, {
      ...meta,
      plain: rec ? terse(rec) : "",
      detail: rec ? rec.reading : "",
      principle: rec ? rec.principle : "",
      record: rec || null,
    }];
  })
);
