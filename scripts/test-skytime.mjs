// Proof for the sky-time engine: the cycle, the ages, dates, and deep-time sanity.
import { PRECESSION_YEARS, AGE_YEARS, ageAt, agesBetween, jdFromDate, dateFromJd, parseDate, formatJd, skySamples, nowJd, yearsFromNow, TRAIL_BODIES } from '../src/engines/skyTime.js';
import { allPlanets } from '../src/engines/astronomy.js';
let fails = 0;
const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };

ok(Math.abs(PRECESSION_YEARS - 25770) < 10, `cycle ${PRECESSION_YEARS.toFixed(0)} years`);
ok(Math.abs(AGE_YEARS - 2147) < 2, `age ${AGE_YEARS.toFixed(0)} years`);

// calendar round trips, including deep BC
for (const [y, m, d] of [[2026, 11, 11], [1, 1, 1], [0, 3, 1], [-12000, 3, 21], [-23750, 12, 31], [1582, 10, 15], [4200, 2, 29 - 1]]) {
  const back = dateFromJd(jdFromDate(y, m, d));
  ok(back[0] === y && back[1] === m && back[2] === d, `round trip ${y}-${m}-${d} -> ${back.join('-')}`);
}
ok(Math.abs(jdFromDate(2000, 1, 1) - 2451545) < 1e-9, 'J2000 noon');
ok(parseDate('12000 BC') === jdFromDate(-11999, 1, 1), 'parse 12000 BC (astronomical -11999)');
ok(parseDate('-12000-03-21') === jdFromDate(-12000, 3, 21), 'parse -12000-03-21');
ok(parseDate('3 Mar 500 BC') === jdFromDate(-499, 3, 3), 'parse 3 Mar 500 BC');
ok(parseDate('nonsense') === null && parseDate('2020-13-01') === null, 'rejects nonsense');
ok(formatJd(jdFromDate(-11999, 6, 1)).endsWith('12,000 BC'), 'BC label');

// the ages
const now = nowJd();
const a = ageAt(now);
ok(a.sign === 'Pisces', `now is the age of ${a.sign}`);
const next = ageAt(a.end + 10);
ok(next.sign === 'Aquarius', `after it comes ${next.sign}`);
ok(Math.abs(dateFromJd(a.end)[0] - 2440) < 3, `Aquarius arrives ${dateFromJd(a.end)[0]} (30 degrees of Lahiri precession)`);
ok(ageAt(a.start - 10).sign === 'Aries', 'before Pisces: Aries');
const span = agesBetween(now - PRECESSION_YEARS * 365.25, now + AGE_YEARS * 365.25);
ok(span.length >= 13 && span.length <= 14, `${span.length} bands cover a full cycle plus one age`);
const signs = new Set(span.slice(0, 12).map(s => s.sign));
ok(signs.size === 12, 'twelve different signs across one cycle');
ok(span.every((s, i) => i === 0 || Math.abs(s.from - span[i - 1].to) < 1e-6), 'bands touch end to end');

// one full cycle back: the equinox is where it is now (same age sign, same progress)
const back = ageAt(now - PRECESSION_YEARS * 365.25);
ok(back.sign === a.sign && Math.abs(back.progress - a.progress) < 1e-6, 'a full cycle back is the same age, same progress');

// deep time stays sane: every longitude is finite and in range, the Sun moves about 1 degree a day,
// the Moon about 13, and Venus returns to the same pattern (8 years: 5 synodic cycles)
for (const yr of [-23750, -12000, -3000, 1500, 2026, 4200]) {
  const jd = jdFromDate(yr, 6, 1);
  const p = allPlanets(jd);
  ok(TRAIL_BODIES.every(b => Number.isFinite(p[b]) && p[b] >= 0 && p[b] < 360), `year ${yr}: all ten longitudes finite`);
  const q = allPlanets(jd + 1);
  const dd = (b) => ((q[b] - p[b] + 540) % 360) - 180;
  ok(dd('Sun') > 0.9 && dd('Sun') < 1.1, `year ${yr}: Sun moves ${dd('Sun').toFixed(3)} deg/day`);
  ok(dd('Moon') > 10 && dd('Moon') < 15.5, `year ${yr}: Moon moves ${dd('Moon').toFixed(2)} deg/day`);
}
// Venus: 8 years later it stands within a few degrees of the same place (the pentagram)
{
  const jd = jdFromDate(-12000, 3, 21);
  const v0 = allPlanets(jd).Venus, v8 = allPlanets(jd + 8 * 365.25).Venus;
  const dv = Math.abs(((v8 - v0 + 540) % 360) - 180);
  ok(dv < 6, `Venus repeats after 8 years, even at 12000 BC (off by ${dv.toFixed(1)} deg)`);
}
// the samples
const s = skySamples(now, 30, 10);
ok(s.length === 11 && s[0].jd === now && Math.abs(s[10].jd - (now - 300)) < 1e-9, 'sample ladder');
ok(Math.abs(yearsFromNow(now)) < 1e-6, 'yearsFromNow(now) = 0');
console.log(fails ? `\n${fails} FAILED` : '\nall passed');
process.exit(fails ? 1 : 0);
