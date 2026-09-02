// SGE smoke test.
//
// Computes a chart, renders every tab, and asserts two things:
//   1. each tab renders without throwing and produces visible text
//   2. no second-person address survives anywhere on the rendered surface
//
// The second check is the rule guard. The voice rule in docs/VOICE.md is kept
// by this test rather than by grep discipline: a tab that starts telling the
// reader who they are fails the build.

import { build } from 'esbuild';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// ── the rule guard ───────────────────────────────────────────────────────────
const SECOND_PERSON =
  /\b(you are|you're|you were born|your (chart|sun|moon|rising|identity|core|shadow|greatest|life|path|birth)|you may feel|you tend to|you will|you feel|your placement|your reading)\b/i;

const FORECAST =
  /\b(this will bring|a good day to|this year brings|expect to|you should)\b/i;

const TABS = [
  'WheelTab', 'AspectsTab', 'TodayTab', 'ProgressionsTab', 'SynastryTab',
  'ChineseTab', 'NatalTab', 'EducationTab', 'HarmonicsTab', 'NumerologyTab',
  'GrammatologyTab', 'DeepTab', 'CalendarTab', 'TarotTab', 'VedicTab',
];

// ── bundle the app for node ──────────────────────────────────────────────────
// Build inside the project so the bundle resolves react from node_modules.
const tmp = fs.mkdtempSync(path.join(process.cwd(), 'node_modules', '.sge-smoke-'));
const entry = path.join(tmp, 'entry.jsx');
const outfile = path.join(tmp, 'bundle.mjs');

fs.writeFileSync(entry, `
${TABS.map((t) => `export { default as ${t} } from '${process.cwd().replace(/\\/g, '/')}/src/tabs/${t}.jsx';`).join('\n')}
export { default as Card } from '${process.cwd().replace(/\\/g, '/')}/src/components/ui/Card.jsx';
export * from '${process.cwd().replace(/\\/g, '/')}/src/engines/index.js';
export * from '${process.cwd().replace(/\\/g, '/')}/src/data/index.js';
export { M3 } from '${process.cwd().replace(/\\/g, '/')}/src/theme/m3.js';
`);

await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  logLevel: 'error',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  // Vite-only globals the app reads at module scope.
  define: { 'import.meta.env': '{"VITE_BACKEND_URL":""}' },
});

// Minimal DOM shim: the tabs size charts from window.innerWidth and the depth
// store reads localStorage. Neither is available under renderToStaticMarkup.
const store = new Map();
globalThis.window = globalThis.window || {
  innerWidth: 1280, innerHeight: 900,
  scrollTo() {}, addEventListener() {}, removeEventListener() {},
  dispatchEvent() {}, matchMedia: () => ({ matches: false, addListener() {}, removeListener() {} }),
};
globalThis.document = globalThis.document || {
  querySelector: () => null, querySelectorAll: () => [],
  addEventListener() {}, removeEventListener() {},
  createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
  body: { appendChild() {} },
};
globalThis.localStorage = globalThis.localStorage || {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};
if (!globalThis.navigator) {
  Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node' }, configurable: true });
}

const app = await import(pathToFileURL(outfile).href);

// ── compute a chart ──────────────────────────────────────────────────────────
const BIRTH = { year: 1990, month: 6, day: 15, hour: 14, minute: 30, lat: 51.5074, lon: -0.1278 };
const NOW = { year: 2026, month: 9, day: 1, hour: 12, minute: 0 };

const jd = app.julianDay(BIRTH.year, BIRTH.month, BIRTH.day, BIRTH.hour + BIRTH.minute / 60);
const nowJd = app.julianDay(NOW.year, NOW.month, NOW.day, NOW.hour);
const norm = (x) => ((x % 360) + 360) % 360;

const trop = app.allPlanets(jd);
const ay = app.ayanamsa(jd);
const sid = Object.fromEntries(Object.entries(trop).map(([k, v]) => [k, norm(v - ay)]));
const asc = app.calcAsc(jd, BIRTH.lat, BIRTH.lon);
const mc = app.calcMC(jd, BIRTH.lon);
const houses = app.calcHouses(jd, BIRTH.lat, BIRTH.lon);
const sidHouses = Object.fromEntries(Object.entries(houses).map(([k, v]) => [k, norm(v - ay)]));
const age = 36;
const trPos = app.allPlanets(nowJd);
const srJd = app.findSolarReturn(trop.Sun, BIRTH.year + age);

const res = {
  jd,
  trop,
  sid,
  houses,
  sidHouses,
  Sun: trop.Sun,
  Moon: trop.Moon,
  aspects: app.calcAspects(trop) || [],
  prog: app.progChart(jd, age),
  sr: srJd ? app.allPlanets(srJd) : trop,
  srPos: srJd ? app.allPlanets(srJd) : trop,
  trPos,
  trAsp: app.calcAspects({ ...trop, ...trPos }) || [],
  cn: app.chineseCycle(BIRTH.year, BIRTH.month, BIRTH.day),
  el: app.elemMod(trop).el,
  mod: app.elemMod(trop).mod,
  synR: null,
  mathematical_resonance: null,
};

// ── ctx: a superset; each tab destructures what it needs ─────────────────────
const Stub = () => null;
const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 };

const ctx = {
  // Everything src/data and src/engines export, so tabs that pull constants
  // straight from ctx (LETTER_DB, CHINESE_*, KANGXI_*, ...) resolve.
  ...app,
  M3: app.M3, res, age, norm, RAD: Math.PI / 180, grid2,
  Card: app.Card,
  A: BIRTH, birthParts: BIRTH,
  ayanamsa: app.ayanamsa, calcAspects: app.calcAspects, harmonic: app.harmonic,
  moonPhase: app.moonPhase,
  zodSign: (d) => app.SIGNS[Math.floor(norm(d) / 30)],
  zodDeg: (d) => norm(d) % 30,
  SIGNS: app.SIGNS, SIGN_INFO: app.SIGN_INFO, SIGN_COL: app.SIGN_COL, SIGN_SYM: app.SIGN_SYM,
  HOUSE_AREA: app.HOUSE_AREA, HOUSE_INFO: app.HOUSE_INFO,
  P_COL: app.P_COL, P_SYM: app.P_SYM, P_ROLE: app.P_ROLE,
  ASPECTS: app.ASPECTS, ASP_EXPLAIN: app.ASP_EXPLAIN,
  EL_COL: { Fire: '#ff6b6b', Earth: '#8bc34a', Air: '#fdd835', Water: '#64b5f6' },
  MOD_COL: { Cardinal: '#cbb4ff', Fixed: '#f6c840', Mutable: '#4dd0e1' },
  ANIMAL_INFO: app.ANIMAL_INFO, CN_EL_INFO: app.CN_EL_INFO, POLARITY_INFO: app.POLARITY_INFO,
  SOLAR_DEEP: app.SOLAR_DEEP, LUNAR_DEEP: app.LUNAR_DEEP,
  RISING_SHADOW: app.RISING_SHADOW, VENUS_SHADOW: app.VENUS_SHADOW,
  MARS_SHADOW: app.MARS_SHADOW, MERCURY_SHADOW: app.MERCURY_SHADOW,
  JUPITER_DEEP: app.JUPITER_DEEP, SATURN_DEEP: app.SATURN_DEEP,
  URANUS_DEEP: app.URANUS_DEEP, NEPTUNE_DEEP: app.NEPTUNE_DEEP, PLUTO_DEEP: app.PLUTO_DEEP,
  PAIR_INSIGHT: app.PAIR_INSIGHT,
  wheelMode: 'tropical', setWheelMode: () => {},
  calDate: { y: 2026, m: 9, d: 1 }, setCalDate: () => {},
  calHolFilter: 'all', setCalHolFilter: () => {},
  calShowMonth: true, setCalShowMonth: () => {},
  PlanetTable: Stub, WheelWithTooltip: Stub, ChineseWheelWithTooltip: Stub,
  AspectTable: Stub, ProfilePanel: Stub,
  // Interactive state the tabs own in App.jsx.
  gramTab: 'letters', setGramTab: () => {},
  gramScriptFilter: 'all', setGramScriptFilter: () => {},
  expandedLetter: null, setExpandedLetter: () => {},
  cwInput: '', setCwInput: () => {}, cwResult: null, setCwResult: () => {},
  analyzeWord: () => null,
  planetToLetter: () => null, planetToLetter2: () => null,
  PROG_SIGN_ARC: {},
};

// ── render and check ─────────────────────────────────────────────────────────
const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

let failures = 0;
let checked = 0;

for (const name of TABS) {
  const Tab = app[name];
  if (typeof Tab !== 'function') {
    console.error(`✗ ${name}: not exported`);
    failures++;
    continue;
  }

  let html;
  try {
    html = renderToStaticMarkup(React.createElement(Tab, { ctx }));
  } catch (e) {
    console.error(`✗ ${name}: threw while rendering — ${e.message}`);
    if (process.env.SMOKE_STACK) console.error(String(e.stack).split(String.fromCharCode(10)).slice(0, 7).join(String.fromCharCode(10)));
    failures++;
    continue;
  }

  const text = stripTags(html);
  if (text.length < 40) {
    console.error(`✗ ${name}: rendered almost no text (${text.length} chars)`);
    failures++;
    continue;
  }

  // The rule guard, sentence by sentence so the report names the phrase.
  const offenders = [];
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    const m = sentence.match(SECOND_PERSON) || sentence.match(FORECAST);
    if (m) offenders.push({ phrase: m[0], sentence: sentence.slice(0, 150) });
  }

  if (offenders.length) {
    console.error(`✗ ${name}: ${offenders.length} second-person/forecast phrase(s) on the rendered surface`);
    for (const o of offenders.slice(0, 5)) {
      console.error(`    "${o.phrase}" in: ${o.sentence}`);
    }
    if (offenders.length > 5) console.error(`    …and ${offenders.length - 5} more`);
    failures++;
    continue;
  }

  if (process.env.SMOKE_DUMP === name) console.log(String.fromCharCode(10) + "===== " + name + " =====" + String.fromCharCode(10) + text);
  checked++;
  console.log(`✓ ${name.padEnd(18)} ${String(text.length).padStart(6)} chars rendered, voice clean`);
}

fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n${checked}/${TABS.length} tabs rendered and passed the rule guard`);
if (failures) {
  console.error(`\nFAIL — ${failures} tab(s) failed`);
  process.exit(1);
}
console.log('PASS — all tabs render, no second-person address on any rendered surface');
