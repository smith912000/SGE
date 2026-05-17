// Spot-check SGE's astronomy engine against a known birth chart.
// Birth: 9 January 2000, 03:00 UTC, Peterborough UK (52.5695N, 0.2405W)
//
// Run: node scripts/test-chart.mjs

import { julianDay, allPlanets, calcAsc, calcMC, calcHouses, houseOf, ayanamsa } from '../src/engines/astronomy.js';

const Y = 2000, M = 1, D = 9, H = 3;       // UTC hours (Jan = no DST in UK)
const LAT = 52.5695, LON = -0.2405;        // Peterborough

const jd = julianDay(Y, M, D, H);
const planets = allPlanets(jd);
const asc = calcAsc(jd, LAT, LON);
const mc  = calcMC(jd, LON);
const houses = calcHouses(jd, LAT, LON);
const ay  = ayanamsa(jd);

const SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const sign = lon => {
  const n = ((lon % 360) + 360) % 360;
  const idx = Math.floor(n / 30);
  const deg = n - idx * 30;
  return `${SIGNS[idx]} ${deg.toFixed(2)}°  (${n.toFixed(2)}°)`;
};

console.log(`SGE chart engine spot-check`);
console.log(`Birth: ${Y}-${String(M).padStart(2,'0')}-${String(D).padStart(2,'0')} ${H}:00 UTC, lat ${LAT}, lon ${LON}`);
console.log(`JD: ${jd.toFixed(6)}`);
console.log(`Ayanamsa (Lahiri-ish): ${ay.toFixed(4)}°`);
console.log('');
console.log('=== Planets (tropical, geocentric ecliptic longitude) ===');
for (const [name, lon] of Object.entries(planets)) {
  const h = houseOf(lon, houses);
  console.log(`  ${name.padEnd(8)} ${sign(lon).padEnd(36)} House ${h}`);
}
console.log('');
console.log('=== Angles ===');
console.log(`  ASC  ${sign(asc)}`);
console.log(`  MC   ${sign(mc)}`);
console.log(`  DSC  ${sign(houses.DSC)}`);
console.log(`  IC   ${sign(houses.IC)}`);
console.log('');
console.log('=== House cusps (Porphyry) ===');
for (let i = 1; i <= 12; i++) {
  console.log(`  H${String(i).padStart(2,'0')}  ${sign(houses[i])}`);
}
