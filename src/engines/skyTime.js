// Sky time: the clock behind the time scroller, the zodiac ages and the ghost
// streams. Pure functions only (no React), so scripts/test-skytime.mjs can prove them.
import { allPlanets, ayanamsa } from './astronomy.js';
import { SIGNS } from '../data/astrology/signs.js';

const RATE = 0.01397;                         // precession, degrees a year (Lahiri, as ayanamsa())
const J2000 = 2451545;
const YEAR = 365.25;

export const PRECESSION_YEARS = 360 / RATE;   // one full cycle of the equinoxes, ~25,770 years
export const AGE_YEARS = 30 / RATE;           // one age: 30 degrees of it, ~2,147 years
export const TRAIL_BODIES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
// Outside this many years of today the planet places are approximate (engine note, astronomy.js).
export const FIT_YEARS = 3000;

export const nowJd = () => 2440587.5 + Date.now() / 86400000;

// ── calendar (proleptic Gregorian, any year, astronomical numbering: 1 BC = 0) ──
const fl = Math.floor;
function daysFromCivil(y, m, d) {
  y -= m <= 2 ? 1 : 0;
  const era = fl(y / 400), yoe = y - era * 400;
  const doy = fl((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + fl(yoe / 4) - fl(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}
function civilFromDays(z) {
  z += 719468;
  const era = fl(z / 146097), doe = z - era * 146097;
  const yoe = fl((doe - fl(doe / 1460) + fl(doe / 36524) - fl(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + fl(yoe / 4) - fl(yoe / 100));
  const mp = fl((5 * doy + 2) / 153);
  const d = doy - fl((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  return [yoe + era * 400 + (m <= 2 ? 1 : 0), m, d];
}
export const jdFromDate = (y, m, d) => daysFromCivil(y, m, d) + 2440587.5 + 0.5;   // noon UT
export const dateFromJd = jd => civilFromDays(fl(jd - 2440587.5));            // [y, m, d]

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function yearLabel(y) {
  if (y <= 0) return `${(1 - y).toLocaleString('en-GB')} BC`;
  return y < 1000 ? `${y} AD` : String(y);
}
export function formatJd(jd) {
  const [y, m, d] = dateFromJd(jd);
  return `${d} ${MON[m - 1]} ${yearLabel(y)}`;
}
export const isoJd = jd => {
  const [y, m, d] = dateFromJd(jd);
  const yy = y < 0 ? `-${String(-y).padStart(4, '0')}` : String(y).padStart(4, '0');
  return `${yy}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};
// "2026-11-11", "-12000-03-21", "12000 BC", "3 Mar 500 BC", "1500". Returns a JD or null.
export function parseDate(text) {
  const t = String(text || '').trim();
  let m = t.match(/^(-?\d{1,6})-(\d{1,2})-(\d{1,2})$/);
  if (m) return validDate(+m[1], +m[2], +m[3]);
  m = t.match(/^(?:(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+)?(\d{1,6})\s*(BC|BCE|AD|CE)?$/i);
  if (m) {
    let y = +m[3];
    if (/^BC/i.test(m[4] || '')) y = 1 - y;
    const mi = m[2] ? MON.findIndex(n => n.toLowerCase() === m[2].toLowerCase()) : 0;
    if (m[2] && mi < 0) return null;
    return validDate(y, mi + 1, m[1] ? +m[1] : 1);
  }
  m = t.match(/^(-\d{1,6})$/);
  return m ? validDate(+m[1], 1, 1) : null;
}
function validDate(y, mo, d) {
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return jdFromDate(y, mo, d);
}

// ── the cycle and the ages ──
export const yearsFromNow = (jd, now = nowJd()) => (jd - now) / YEAR;
export const ayAtJd = jd => ayanamsa(jd);
const jdForAy = ay => J2000 + ((ay - 23.8531) / RATE) * YEAR;

// The vernal point's sidereal longitude is minus the ayanamsa; the sign it stands in names the age.
export function ageAt(jd) {
  const ay = ayanamsa(jd);
  const k = fl(ay / 30);
  const idx = (((11 - k) % 12) + 12) % 12;
  const start = jdForAy(k * 30), end = jdForAy(k * 30 + 30);
  return { sign: SIGNS[idx], idx, k, start, end, progress: (jd - start) / (end - start) };
}
// The ages that fill [jd0, jd1], clipped, for the bands on the track.
export function agesBetween(jd0, jd1) {
  const out = [];
  for (let k = fl(ayanamsa(jd0) / 30); jdForAy(k * 30) < jd1; k++) {
    const a = ageAt(jdForAy(k * 30 + 15));
    out.push({ ...a, from: Math.max(jd0, a.start), to: Math.min(jd1, a.end) });
  }
  return out;
}
export const ageYearsLabel = a => {
  const y = n => { const v = Math.round((n - J2000) / YEAR + 2000); return v <= 0 ? `${(1 - v).toLocaleString('en-GB')} BC` : `${v} AD`; };
  return `${y(a.start)} to ${y(a.end)}`;
};

export const STEP_UNITS = [
  { id: 'day', label: 'Day', days: 1 },
  { id: 'week', label: 'Week', days: 7 },
  { id: 'month', label: 'Month', days: 30.4375 },
  { id: 'year', label: 'Year', days: YEAR },
  { id: 'decade', label: '10 years', days: YEAR * 10 },
  { id: 'century', label: '100 years', days: YEAR * 100 },
  { id: 'millennium', label: '1,000 years', days: YEAR * 1000 },
  { id: 'age', label: 'One age', days: AGE_YEARS * YEAR },
];
export const unitDays = id => (STEP_UNITS.find(u => u.id === id) || STEP_UNITS[3]).days;

export const deepTimeNote = jd => Math.abs(yearsFromNow(jd)) > FIT_YEARS
  ? 'Beyond about 3,000 years either side of today the planet places are approximate: the orbits are held at their 3,000-year shape while the mean motion carries on. Read the geometry, not the degree.'
  : '';

// ── ghost streams ──
// Samples of every body at jd, jd - step, jd - 2 step ... Longitudes are tropical
// (the seasons' frame); `ay` is the offset of the stars' frame at that moment.
let cache = { key: '', value: null };
export function skySamples(jd, stepDays, n = 36) {
  const key = `${jd}|${stepDays}|${n}`;
  if (cache.key === key) return cache.value;
  const samples = [];
  for (let i = 0; i <= n; i++) {
    const j = jd - i * stepDays;
    const pos = allPlanets(j);
    samples.push({ jd: j, ay: ayanamsa(j), pos });
  }
  cache = { key, value: samples };
  return samples;
}
// A fade ladder: the newest ghost faintest-first is wrong, so newest is strongest.
export const ghostOpacity = (i, n) => 0.46 * Math.pow(1 - i / (n + 1), 1.6);
