// Legacy shape over the symbolic record layer.
// PLANET_IN_HOUSE[planet][house] is the depth-0 line; the full record is
// available from ../symbolism/planetInHouse.js. See docs/VOICE.md.

import { PLANET_IN_HOUSE as RECORDS, getPlanetInHouse } from '../symbolism/planetInHouse.js';
import { terse } from '../symbolism/terse.js';

export const PLANET_IN_HOUSE = Object.fromEntries(
  Object.entries(RECORDS).map(([body, houses]) => [
    body,
    Object.fromEntries(Object.entries(houses).map(([h, rec]) => [h, terse(rec)])),
  ])
);

export { getPlanetInHouse };
