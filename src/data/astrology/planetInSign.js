// Legacy shape over the symbolic record layer.
// PLANET_IN_SIGN[planet][sign] is the depth-0 line; the full record is
// available from ../symbolism/planetInSign.js. See docs/VOICE.md.

import { PLANET_IN_SIGN as RECORDS, getPlanetInSign } from '../symbolism/planetInSign.js';
import { terse } from '../symbolism/terse.js';

export const PLANET_IN_SIGN = Object.fromEntries(
  Object.entries(RECORDS).map(([body, signs]) => [
    body,
    Object.fromEntries(Object.entries(signs).map(([sign, rec]) => [sign, terse(rec)])),
  ])
);

export { getPlanetInSign };
