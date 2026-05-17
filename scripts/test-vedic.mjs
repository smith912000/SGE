// Vedic / sidereal sanity check for the same chart: 9 Jan 2000 03:00 UTC, Peterborough.
// SGE computes sidereal as tropical − ayanamsa (Lahiri-style).
// Reference: Lahiri ayanamsa at J2000 = 23°51'11" = 23.8531°.
//   Lahiri rate ≈ 50.29 arcsec/year = 0.01397°/year = 1.397°/century.

import { julianDay, allPlanets, ayanamsa, nodeLon } from '../src/engines/astronomy.js';

const Y = 2000, M = 1, D = 9, H = 3;
const jd = julianDay(Y, M, D, H);
const planets = allPlanets(jd);
const node = nodeLon(jd);
const ay = ayanamsa(jd);

const norm = x => ((x % 360) + 360) % 360;

// Vedic uses 12 RASHIS named (mostly) the same as Western signs
const RASHI = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

// 27 NAKSHATRAS — 13°20' each (800 arcmin) from 0° Aries sidereal
const NAKSHATRA = [
  "Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha",
  "Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha",
  "Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha",
  "Purva Bhadrapada","Uttara Bhadrapada","Revati"
];

function rashi(lonSidereal) {
  const n = norm(lonSidereal);
  const idx = Math.floor(n / 30);
  const deg = n - idx * 30;
  return `${RASHI[idx].padEnd(11)} ${deg.toFixed(2).padStart(5)}°`;
}
function nakshatra(lonSidereal) {
  const n = norm(lonSidereal);
  const idx = Math.floor(n / (360/27));        // 13.333° per nakshatra
  const within = n - idx * (360/27);
  const pada = Math.floor(within / (360/108)) + 1;   // 4 padas per nakshatra
  return `${NAKSHATRA[idx].padEnd(20)} pada ${pada}`;
}

console.log(`SGE Vedic spot-check`);
console.log(`Birth: ${Y}-${String(M).padStart(2,'0')}-${String(D).padStart(2,'0')} ${H}:00 UTC, Peterborough`);
console.log(`JD: ${jd.toFixed(4)}`);
console.log(`SGE ayanamsa: ${ay.toFixed(4)}°`);
console.log(`Reference Lahiri (J2000=23.8531°, +0.01397°/yr): ${(23.8531 + 0.01397*(jd-2451545)/365.25).toFixed(4)}°`);
console.log(`Difference: ${(ay - (23.8531 + 0.01397*(jd-2451545)/365.25)).toFixed(4)}°`);
console.log('');
console.log('Body         Tropical                Sidereal (Lahiri)          Nakshatra');
console.log('────────  ─────────────────────  ─────────────────────────  ────────────────────────');

const allBodies = { ...planets, Rahu: node, Ketu: norm(node + 180) };
for (const [name, lon] of Object.entries(allBodies)) {
  const sid = norm(lon - ay);
  const trop = norm(lon);
  const tropStr = rashi(trop);
  const sidStr  = rashi(sid);
  const nakStr  = nakshatra(sid);
  console.log(`  ${name.padEnd(7)} ${tropStr.padEnd(20)}  ${sidStr.padEnd(20)}  ${nakStr}`);
}
console.log('');
console.log('Standard Vedic reference for 9 Jan 2000 03:00 UTC, Peterborough (Lahiri):');
console.log('  Sun       Sagittarius ~24° sid    (Purva Ashadha)');
console.log('  Moon      Capricorn   ~20° sid    (Shravana)');
console.log('  Mars      Aquarius    ~10° sid    (Shatabhisha)');
console.log('  Mercury   Sagittarius ~20° sid    (Purva Ashadha)');
console.log('  Jupiter   Aries       ~1-2° sid   (Ashwini)');
console.log('  Venus     Scorpio     ~17° sid    (Anuradha)');
console.log('  Saturn    Aries       ~16° sid    (Bharani)');
console.log('  Rahu      Cancer      ~10° sid    (Pushya)');
console.log('  Ketu      Capricorn   ~10° sid    (Uttara Ashadha)');
