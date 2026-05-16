// Sanity tests for the Porphyry calcHouses() in src/engines/astronomy.js.
// Run: node scripts/test-houses.mjs
//
// Invariants:
//   - h[1]  === h.ASC   (house 1 cusp = Ascendant)
//   - h[4]  === h.IC    (house 4 cusp = Imum Coeli)
//   - h[7]  === h.DSC   (house 7 cusp = Descendant)
//   - h[10] === h.MC    (house 10 cusp = Medium Coeli)
//   - All cusps in [0, 360)
//   - 12 cusps cover the full circle (no overlap, no gap)
//   - houseOf(asc) === 1, houseOf(mc) === 10, etc.
//   - At extreme latitudes the houses are still well-formed (no NaN, no negative arcs)

import { calcHouses, calcAsc, calcMC, houseOf, julianDay } from '../src/engines/astronomy.js';

const norm = x => ((x % 360) + 360) % 360;
const close = (a, b, tol = 1e-6) => Math.abs(norm(a - b)) < tol || Math.abs(norm(a - b) - 360) < tol;

let pass = 0, fail = 0;
function check(label, cond, detail = '') {
  if (cond) { pass++; console.log(`  ✓ ${label}`); }
  else { fail++; console.log(`  ✗ ${label}${detail ? ' — ' + detail : ''}`); }
}

function arcBetween(a, b) {
  return norm(b - a);
}

function testCase(name, year, month, day, hour, lat, lon) {
  console.log(`\n── ${name} (${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')} ${hour}h UTC · lat ${lat} lon ${lon}) ──`);
  const jd = julianDay(year, month, day, hour);
  const h  = calcHouses(jd, lat, lon);

  // 1. Cardinal alignment
  check('h[1]  === ASC', close(h[1],  h.ASC), `h[1]=${h[1].toFixed(4)} ASC=${h.ASC.toFixed(4)}`);
  check('h[4]  === IC',  close(h[4],  h.IC),  `h[4]=${h[4].toFixed(4)} IC=${h.IC.toFixed(4)}`);
  check('h[7]  === DSC', close(h[7],  h.DSC), `h[7]=${h[7].toFixed(4)} DSC=${h.DSC.toFixed(4)}`);
  check('h[10] === MC',  close(h[10], h.MC),  `h[10]=${h[10].toFixed(4)} MC=${h.MC.toFixed(4)}`);

  // 2. Opposites
  check('DSC === ASC + 180', close(h.DSC, h.ASC + 180));
  check('IC  === MC  + 180', close(h.IC,  h.MC  + 180));

  // 3. All cusps in [0, 360)
  let inRange = true;
  for (let i = 1; i <= 12; i++) if (!(h[i] >= 0 && h[i] < 360) || !Number.isFinite(h[i])) inRange = false;
  check('all cusps in [0,360) and finite', inRange);

  // 4. Cusps cover full circle without gap or overlap
  let totalArc = 0;
  for (let i = 1; i <= 12; i++) {
    const next = h[(i % 12) + 1];
    totalArc += arcBetween(h[i], next);
  }
  check('arcs sum to 360°', Math.abs(totalArc - 360) < 1e-6, `total=${totalArc.toFixed(6)}`);

  // 5. houseOf cardinal points
  check('houseOf(ASC) === 1', houseOf(h.ASC,         h) === 1);
  check('houseOf(IC)  === 4', houseOf(h.IC,          h) === 4);
  check('houseOf(DSC) === 7', houseOf(h.DSC,         h) === 7);
  check('houseOf(MC)  === 10', houseOf(h.MC,          h) === 10);

  // 6. houseOf with a longitude just past each cusp (should return that house)
  for (let i = 1; i <= 12; i++) {
    const slightlyPast = norm(h[i] + 0.001);
    check(`houseOf(cusp${i} + 0.001°) === ${i}`, houseOf(slightlyPast, h) === i);
  }
}

console.log('SGE house-system invariant tests (Porphyry)\n');

// London, normal northern latitude (UK)
testCase('London',     2026, 5, 15, 12, 51.5074, -0.1278);
// Reykjavik, extreme north (Porphyry diverges sharply from Equal House here)
testCase('Reykjavík',  2026, 5, 15, 12, 64.1466, -21.9426);
// Quito, equator (all systems converge near here)
testCase('Quito',      2026, 5, 15, 12,  -0.1807, -78.4678);
// Sydney, southern hemisphere
testCase('Sydney',     2026, 5, 15, 12, -33.8688, 151.2093);
// Midnight wrap-around case: longitude near 0/360 boundary
testCase('Wrap edge',  2026, 12, 31, 23.99, 51.5074, -0.1278);

console.log(`\nResult: ${pass} pass, ${fail} fail`);
process.exit(fail === 0 ? 0 : 1);
