// PAIR_INSIGHT is keyed by the pair of P_ROLE labels, e.g. "greater light+lesser light".
// The line comes from the pair record for the two bodies. See docs/VOICE.md.

import { P_ROLE } from '../astrology/planets.js';
import { getPairSymbolism } from '../symbolism/pairSymbolism.js';
import { terse } from '../symbolism/terse.js';

const BODIES = Object.keys(P_ROLE);

const entries = [];
for (let i = 0; i < BODIES.length; i++) {
  for (let j = i + 1; j < BODIES.length; j++) {
    const a = BODIES[i];
    const b = BODIES[j];
    const rec = getPairSymbolism(a, b);
    if (!rec) continue;
    entries.push([`${P_ROLE[a]}+${P_ROLE[b]}`, terse(rec)]);
    entries.push([`${P_ROLE[b]}+${P_ROLE[a]}`, terse(rec)]);
  }
}

export const PAIR_INSIGHT = Object.fromEntries(entries);
