// Sanity-check chineseCycle. For 9 Jan 2000 (before CNY 2000 = Feb 5),
// the Chinese year is still 1999 = 己卯 = Earth (Yin) Rabbit.

import { chineseCycle } from '../src/engines/chinese.js';

const cases = [
  { date: '2000-01-09', y: 2000, m: 1,  d: 9,  expect: { animal: 'Rabbit',  element: 'Earth', polarity: 'Yin',  effectiveYear: 1999 } },
  { date: '2000-02-05', y: 2000, m: 2,  d: 5,  expect: { animal: 'Dragon',  element: 'Metal', polarity: 'Yang', effectiveYear: 2000 } },
  { date: '2024-12-31', y: 2024, m: 12, d: 31, expect: { animal: 'Dragon',  element: 'Wood',  polarity: 'Yang', effectiveYear: 2024 } },
  { date: '2025-01-15', y: 2025, m: 1,  d: 15, expect: { animal: 'Dragon',  element: 'Wood',  polarity: 'Yang', effectiveYear: 2024 } },
  { date: '1990-06-15', y: 1990, m: 6,  d: 15, expect: { animal: 'Horse',   element: 'Metal', polarity: 'Yang', effectiveYear: 1990 } },
];

let pass = 0, fail = 0;
for (const c of cases) {
  const r = chineseCycle(c.y, c.m, c.d);
  const ok = r.animal === c.expect.animal && r.element === c.expect.element && r.polarity === c.expect.polarity && r.effectiveYear === c.expect.effectiveYear;
  const tag = ok ? '✓' : '✗';
  if (ok) pass++; else fail++;
  console.log(`  ${tag} ${c.date}  got: ${r.polarity} ${r.element} ${r.animal} (yr ${r.effectiveYear})  expected: ${c.expect.polarity} ${c.expect.element} ${c.expect.animal} (yr ${c.expect.effectiveYear})`);
}
console.log(`\n${pass}/${cases.length} pass`);
process.exit(fail ? 1 : 0);
