// Verify the symbolic record layer.
//
// Checks that every module loads, exposes the getters the app imports, and
// that every record carries plain / reading / principle. Then walks every
// string in every record and enforces the voice rule from docs/VOICE.md.

import { pathToFileURL } from 'node:url';
import path from 'node:path';

const DIR = path.resolve('src/data/symbolism');

// Second-person address about the person, forecasts, verdicts, instructions.
const BANNED = [
  [/\byou'?re\b/i, "you're"],
  [/\byou\b/i, 'you'],
  [/\byour\b/i, 'your'],
  [/\byours\b/i, 'yours'],
  [/\bexpect\b/i, 'expect'],
  [/\bwill bring\b/i, 'will bring'],
  [/\bgood day to\b/i, 'good day to'],
  [/\bthis year brings\b/i, 'this year brings'],
  [/\blean into\b/i, 'lean into'],
  [/\bhighly compatible\b/i, 'highly compatible'],
];

const PLACEHOLDER = [/\bTODO\b/, /\bFIXME\b/, /\.\.\./, /\[USER:/i];

const EXPECTED = {
  'signSymbolism.js':          ['getSignSymbolism'],
  'houseSymbolism.js':         ['getHouseSymbolism'],
  'planetSymbolism.js':        ['getPlanetSymbolism'],
  'planetInSign.js':           ['getPlanetInSign'],
  'planetInHouse.js':          ['getPlanetInHouse'],
  'aspectSymbolism.js':        ['getAspectSymbolism', 'getAxisSymbolism'],
  'pairSymbolism.js':          ['getPairSymbolism'],
  'difficultySymbolism.js':    ['getDifficulty'],
  'numerologySymbolism.js':    ['getNumerologySymbolism'],
  'chineseSymbolism.js':       ['getAnimalSymbolism', 'getChineseElementSymbolism'],
  'vedicSymbolism.js':         ['getNakshatraSymbolism', 'getDashaSymbolism'],
  'tarotSymbolism.js':         ['getTarotSymbolism'],
  'mansionSymbolism.js':       ['getMansionSymbolism'],
  'grammatologySymbolism.js':  ['getLetterSymbolism'],
  'cycleSymbolism.js':         ['getCycleSymbolism'],
};

const isRecord = (v) =>
  v && typeof v === 'object' && !Array.isArray(v) &&
  (typeof v.plain === 'string' || typeof v.reading === 'string' || typeof v.principle === 'string');

// Walk any exported structure and yield [path, record].
function* records(node, trail = []) {
  if (!node || typeof node !== 'object') return;
  if (isRecord(node)) {
    yield [trail.join('.'), node];
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object') yield* records(v, [...trail, k]);
  }
}

// Every string reachable inside a record.
function* strings(rec, trail = []) {
  for (const [k, v] of Object.entries(rec)) {
    if (typeof v === 'string') yield [[...trail, k].join('.'), v];
    else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === 'string') { /* yielded below */ }
      });
      for (let i = 0; i < v.length; i++) {
        const item = v[i];
        if (typeof item === 'string') yield [[...trail, `${k}[${i}]`].join('.'), item];
        else if (item && typeof item === 'object') {
          for (const [ik, iv] of Object.entries(item)) {
            if (typeof iv === 'string') yield [[...trail, `${k}[${i}].${ik}`].join('.'), iv];
          }
        }
      }
    }
  }
}

let failures = 0;
let totalRecords = 0;
const summary = [];

for (const [file, getters] of Object.entries(EXPECTED)) {
  const url = pathToFileURL(path.join(DIR, file)).href;
  let mod;
  try {
    mod = await import(url);
  } catch (e) {
    console.error(`✗ ${file}: FAILED TO LOAD — ${e.message}`);
    failures++;
    continue;
  }

  const missing = getters.filter((g) => typeof mod[g] !== 'function');
  if (missing.length) {
    console.error(`✗ ${file}: missing getter(s) ${missing.join(', ')} — has ${Object.keys(mod).join(', ')}`);
    failures++;
    continue;
  }

  let count = 0;
  let incomplete = 0;
  let voice = 0;
  let placeholder = 0;

  for (const [, exported] of Object.entries(mod)) {
    if (typeof exported === 'function') continue;
    for (const [where, rec] of records(exported)) {
      count++;
      for (const f of ['plain', 'reading', 'principle']) {
        if (typeof rec[f] !== 'string' || !rec[f].trim()) {
          if (incomplete < 3) console.error(`  ✗ ${file} ${where}: missing ${f}`);
          incomplete++;
        }
      }
      for (const [key, str] of strings(rec)) {
        for (const [re, name] of BANNED) {
          if (re.test(str)) {
            if (voice < 4) console.error(`  ✗ ${file} ${where}.${key}: BANNED "${name}" — ${str.slice(0, 110)}`);
            voice++;
            break;
          }
        }
        for (const re of PLACEHOLDER) {
          if (re.test(str)) {
            if (placeholder < 3) console.error(`  ✗ ${file} ${where}.${key}: placeholder — ${str.slice(0, 90)}`);
            placeholder++;
            break;
          }
        }
      }
    }
  }

  totalRecords += count;
  const bad = incomplete + voice + placeholder;
  if (bad) failures++;
  summary.push({ file, count, incomplete, voice, placeholder });
  console.log(
    `${bad ? '✗' : '✓'} ${file.padEnd(28)} ${String(count).padStart(4)} records` +
    (bad ? `  incomplete:${incomplete} voice:${voice} placeholder:${placeholder}` : '')
  );
}

console.log(`\n${totalRecords} records across ${Object.keys(EXPECTED).length} files`);
if (failures) {
  console.error(`\nFAIL — ${failures} file(s) with problems`);
  process.exit(1);
}
console.log('PASS — record layer clean');
