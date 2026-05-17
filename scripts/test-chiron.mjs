// Chiron-specific sanity check across decades.
// Reference positions from Swiss Ephemeris (geocentric tropical, 0h UT).

import { chironLon, julianDay } from '../src/engines/astronomy.js';

const SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const sign = lon => {
  const n = ((lon % 360) + 360) % 360;
  const idx = Math.floor(n / 30);
  const deg = n - idx * 30;
  return `${SIGNS[idx]} ${deg.toFixed(1)}°`;
};

// Reference values: Chiron's geocentric tropical ecliptic longitude at 0h UT.
// Source: Swiss Ephemeris values, well-established astrological reference.
const tests = [
  { date: '1980-01-01', jd: julianDay(1980, 1, 1, 0), expected: 55,  expectedSign: 'Taurus 25°' },
  { date: '1990-01-01', jd: julianDay(1990, 1, 1, 0), expected: 104, expectedSign: 'Cancer 14°' },
  { date: '1995-01-01', jd: julianDay(1995, 1, 1, 0), expected: 159, expectedSign: 'Virgo 9°' },
  { date: '2000-01-09', jd: julianDay(2000, 1, 9, 3), expected: 253, expectedSign: 'Sagittarius 13°' },
  { date: '2005-01-01', jd: julianDay(2005, 1, 1, 0), expected: 295, expectedSign: 'Capricorn 25°' },
  { date: '2010-01-01', jd: julianDay(2010, 1, 1, 0), expected: 325, expectedSign: 'Aquarius 25°' },
  { date: '2015-01-01', jd: julianDay(2015, 1, 1, 0), expected: 348, expectedSign: 'Pisces 18°' },
  { date: '2020-01-01', jd: julianDay(2020, 1, 1, 0), expected: 2,   expectedSign: 'Aries 2°' },
  { date: '2026-05-17', jd: julianDay(2026, 5, 17, 0), expected: 51, expectedSign: 'Taurus 21°' },
];

console.log('Chiron geocentric tropical longitude — SGE vs reference');
console.log('');
let okCount = 0, badCount = 0;
for (const t of tests) {
  const got = chironLon(t.jd);
  const gotN = ((got % 360) + 360) % 360;
  let diff = gotN - t.expected;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  const absDiff = Math.abs(diff);
  const tag = absDiff < 5 ? '✓' : absDiff < 10 ? '~' : '✗';
  const status = absDiff < 5 ? 'OK' : absDiff < 10 ? 'close' : 'OFF';
  if (absDiff < 10) okCount++; else badCount++;
  console.log(`  ${tag} ${t.date}: SGE = ${sign(got).padEnd(18)} | ref ≈ ${t.expectedSign.padEnd(18)} | Δ = ${diff > 0 ? '+' : ''}${diff.toFixed(2)}° (${status})`);
}
console.log('');
console.log(`Within 10° of reference: ${okCount}/${tests.length}`);
process.exit(badCount === 0 ? 0 : 1);
