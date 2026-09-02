// Helpers building the legacy deep-analysis shapes over the record layer.
// The old shape was { [sign]: { shadow, growth } }. The fields are kept so
// existing components keep working, but the content is now the record's
// reading and principle prose. See docs/VOICE.md.

import { SIGNS } from '../astrology/signs.js';
import { getPlanetInSign } from '../symbolism/planetInSign.js';
import { getSignSymbolism } from '../symbolism/signSymbolism.js';
import { terse } from '../symbolism/terse.js';

function pack(rec) {
  return {
    shadow: rec ? terse(rec) : "",
    growth: rec ? "" : "",
    plain: rec ? terse(rec) : "",
    record: rec || null,
  };
}

// One entry per sign for a given body.
export function bySign(body) {
  return Object.fromEntries(
    SIGNS.map((sign) => [sign, pack(getPlanetInSign(body, sign) || getSignSymbolism(sign))])
  );
}

// One entry per sign from the sign's own record.
export function signOnly() {
  return Object.fromEntries(SIGNS.map((sign) => [sign, pack(getSignSymbolism(sign))]));
}
