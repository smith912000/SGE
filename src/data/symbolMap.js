// Symbol map: every body, sign, constellation, mansion, branch and phase the
// app knows, with the correspondences the traditions themselves draw between
// them. Essences are hints in the traditions' own words, not explanations.
// Links carry a relation label so the focus view can say why two things meet.
import { SIGNS, SIGN_SYM, SIGN_COL, ELEMENT_HUE, SIGN_INFO } from './astrology/signs.js';
import { P_SYM, P_COL } from './astrology/planets.js';
import { NAKSHATRA_INFO, RASHI_INFO, BHAVA_INFO } from './astrology/nakshatras.js';
import { ANIMALS, BRANCHES, BRANCH_PINYIN, ANIMAL_INFO, CN_EL_INFO } from './astrology/chinese.js';
import { ASPECTS } from './astrology/aspects.js';

const T = '︎';
const ord = (n) => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');

// ── Overlays: the rings drawn round the ecliptic ─────────────────────────
export const OVERLAYS = [
  { id: 'const', label: 'Constellations', note: 'The star figures on the ecliptic, at their IAU spans. Unequal, and thirteen with Ophiuchus.' },
  { id: 'sign', label: 'Tropical signs', note: 'Twelve equal 30° signs measured from the vernal equinox.' },
  { id: 'nak', label: 'Nakshatras', note: 'The 27 lunar mansions of 13°20′, measured in the sidereal zodiac (Lahiri).' },
  { id: 'branch', label: 'Chinese months', note: 'The twelve earthly branches as solar months, each opening on a jié solar term.' },
];

// ── Planets ──────────────────────────────────────────────────────────────
const PLANETS = {
  Sun:     { essence: 'Light, life, sovereignty, the heart.', day: 'Sunday', metal: 'Gold', vedic: 'Surya', chinese: '太陽 Tàiyáng', gods: 'Helios, Apollo, Shamash', dom: ['Leo'], exalt: 'Aries', detr: ['Aquarius'], fall: 'Libra', joy: 9 },
  Moon:    { essence: 'Reflection, growth and waning, the body, the mother.', day: 'Monday', metal: 'Silver', vedic: 'Chandra', chinese: '太陰 Tàiyīn', gods: 'Selene, Artemis, Sin', dom: ['Cancer'], exalt: 'Taurus', detr: ['Capricorn'], fall: 'Scorpio', joy: 3 },
  Mercury: { essence: 'Word, number, exchange, the go-between.', day: 'Wednesday', metal: 'Quicksilver', vedic: 'Budha', chinese: '水星 Shuǐxīng, the water star', phase: 'Water', gods: 'Hermes, Thoth, Nabu', dom: ['Gemini', 'Virgo'], exalt: 'Virgo', detr: ['Sagittarius', 'Pisces'], fall: 'Pisces', joy: 1 },
  Venus:   { essence: 'Attraction, beauty, harmony, delight.', day: 'Friday', metal: 'Copper', vedic: 'Shukra', chinese: '金星 Jīnxīng, the metal star', phase: 'Metal', gods: 'Aphrodite, Ishtar, Frigg', dom: ['Taurus', 'Libra'], exalt: 'Pisces', detr: ['Scorpio', 'Aries'], fall: 'Virgo', joy: 5 },
  Mars:    { essence: 'Heat, the cut, courage, strife.', day: 'Tuesday', metal: 'Iron', vedic: 'Mangala', chinese: '火星 Huǒxīng, the fire star', phase: 'Fire', gods: 'Ares, Nergal, Tiw', dom: ['Aries', 'Scorpio'], exalt: 'Capricorn', detr: ['Libra', 'Taurus'], fall: 'Cancer', joy: 6 },
  Jupiter: { essence: 'Increase, law, faith, magnanimity.', day: 'Thursday', metal: 'Tin', vedic: 'Guru, Brihaspati', chinese: '木星 Mùxīng, the wood star (Suìxīng, the year star)', phase: 'Wood', gods: 'Zeus, Marduk, Thor', dom: ['Sagittarius', 'Pisces'], exalt: 'Cancer', detr: ['Gemini', 'Virgo'], fall: 'Capricorn', joy: 11 },
  Saturn:  { essence: 'Limit, time, weight, endurance.', day: 'Saturday', metal: 'Lead', vedic: 'Shani', chinese: '土星 Tǔxīng, the earth star', phase: 'Earth', gods: 'Kronos, Ninurta', dom: ['Capricorn', 'Aquarius'], exalt: 'Libra', detr: ['Cancer', 'Leo'], fall: 'Aries', joy: 12 },
  Uranus:  { essence: 'Rupture, the sudden, the sky unbound.', gods: 'Ouranos', found: 'Found 1781', dom: ['Aquarius'], modern: true },
  Neptune: { essence: 'Dissolution, the boundless, the dream.', gods: 'Poseidon', found: 'Found 1846', dom: ['Pisces'], modern: true },
  Pluto:   { essence: 'Depth, the underworld, what returns changed.', gods: 'Hades', found: 'Found 1930', dom: ['Scorpio'], modern: true },
  Rahu:    { essence: 'Hunger, the head without a body, eclipse.', vedic: 'Rahu, north node', chinese: '羅睺 Luóhóu', exalt: 'Taurus', node: 'Ketu' },
  Ketu:    { essence: 'Release, the body without a head, the past.', vedic: 'Ketu, south node', chinese: '計都 Jìdū', exalt: 'Scorpio', node: 'Rahu' },
};
const PLANET_GLYPH = { ...P_SYM, Rahu: '☊' + T, Ketu: '☋' + T };
const PLANET_COLOUR = { ...P_COL, Rahu: P_COL.Node, Ketu: P_COL.Node };

// ── Signs ────────────────────────────────────────────────────────────────
const SIGN_ESSENCE = {
  Aries: 'The ram. Impulse, the first fire, the head.',
  Taurus: 'The bull. Fertile ground, holding, the throat.',
  Gemini: 'The twins. Pairing, speech, the hands.',
  Cancer: 'The crab. The shell, nurture, the tide.',
  Leo: 'The lion. Heat at its height, the heart, rule.',
  Virgo: 'The maiden with the ear of wheat. Harvest, sorting, care.',
  Libra: 'The scales. Balance, the equal night, judgement.',
  Scorpio: 'The scorpion. The sting, the hidden, decay into seed.',
  Sagittarius: 'The archer. The aim, the far road, the thighs.',
  Capricorn: 'The sea-goat. The climb from the deep, the long night turning.',
  Aquarius: 'The water-bearer. The pouring out, the many.',
  Pisces: 'The two fishes. The tie between, the ocean, the feet.',
};
const ELEMENTS = {
  Fire:  { essence: 'Hot and dry. Spirit, will, kindling.', triplicity: ['Sun', 'Jupiter', 'Saturn'] },
  Earth: { essence: 'Cold and dry. Body, form, what bears weight.', triplicity: ['Venus', 'Moon', 'Mars'] },
  Air:   { essence: 'Hot and wet. Breath, thought, what connects.', triplicity: ['Saturn', 'Mercury', 'Jupiter'] },
  Water: { essence: 'Cold and wet. Feeling, binding, what flows.', triplicity: ['Venus', 'Mars', 'Moon'] },
};
const MODES = {
  Cardinal: { essence: 'The opening of a season. Begins.', glyph: '▲' },
  Fixed:    { essence: 'The height of a season. Holds.', glyph: '■' },
  Mutable:  { essence: 'The waning of a season. Turns.', glyph: '◆' },
};

// ── Constellations: IAU ecliptic spans (J2000 longitudes) and a schematic
// figure from the brightest stars, as [longitude, latitude] in degrees.
const CONSTELLATIONS = [
  { id: 'Pisces', latin: 'Pisces', from: 351.6, to: 28.7, sign: 'Pisces', star: 'Alrescha, "the cord"', essence: 'Two fishes tied at the tail by a cord.',
    stars: [[29.4,-9.1],[25,-4],[20,-1],[14,1],[8,2],[2,4],[357,6],[352,7],[349,9],[351,4],[355,4],[26.8,5.4],[24,11]], lines: [[0,1,2,3,4,5,6,7,8,9,10,7],[0,11,12]] },
  { id: 'Aries', latin: 'Aries', from: 28.7, to: 53.4, sign: 'Aries', star: 'Hamal, "the lamb"', essence: 'The golden ram whose fleece Jason sought.',
    stars: [[33.2,7.2],[34.0,8.5],[37.7,10.0],[41.9,10.4]], lines: [[0,1,2,3]] },
  { id: 'Taurus', latin: 'Taurus', from: 53.4, to: 90.1, sign: 'Taurus', star: 'Aldebaran, "the follower"', essence: 'The bull, with the Pleiades on its shoulder and the Hyades at its face.',
    stars: [[60.0,4.1],[65.7,-5.7],[66.9,-3.9],[68.5,2.6],[69.8,-5.5],[82.6,5.4],[84.8,-2.2]], lines: [[1,4,6],[1,2,3,5]] },
  { id: 'Gemini', latin: 'Gemini', from: 90.1, to: 118.0, sign: 'Gemini', star: 'Castor and Pollux', essence: 'The twins, one mortal and one divine.',
    stars: [[110.2,10.1],[113.2,6.7],[108.5,-0.2],[99.9,2.1],[95.3,-0.8],[93.3,-0.9],[99.1,-6.7]], lines: [[0,3,4,5],[1,2,6],[0,1]] },
  { id: 'Cancer', latin: 'Cancer', from: 118.0, to: 138.0, sign: 'Cancer', star: 'Praesepe, "the manger"', essence: 'The crab sent against Heracles; the dimmest of the twelve.',
    stars: [[127.5,3.2],[128.7,0.1],[133.6,-5.1],[124.3,-10.2],[127.2,1.5]], lines: [[0,1,2],[1,3]] },
  { id: 'Leo', latin: 'Leo', from: 138.0, to: 173.9, sign: 'Leo', star: 'Regulus, "the little king"', essence: 'The Nemean lion, its hide proof against any blade.',
    stars: [[149.8,0.5],[147.6,4.9],[149.6,8.8],[147.6,11.8],[141.5,12.4],[140.7,9.7],[161.3,14.3],[163.4,9.7],[171.6,12.3]], lines: [[0,1,2,3,4,5],[2,6,8,7,0]] },
  { id: 'Virgo', latin: 'Virgo', from: 173.9, to: 218.0, sign: 'Virgo', star: 'Spica, "the ear of wheat"', essence: 'The maiden holding the ear of wheat: Astraea, Demeter, Ishtar.',
    stars: [[176.9,0.7],[184.7,1.4],[190.1,2.8],[191.4,8.6],[189.9,16.2],[203.8,-2.1],[201.3,8.7],[214.0,2.9]], lines: [[0,1,2,5],[2,3,4],[3,6,7]] },
  { id: 'Libra', latin: 'Libra', from: 218.0, to: 241.0, sign: 'Libra', star: 'Zubenelgenubi, "the southern claw"', essence: 'The scales, once the scorpion\'s claws.',
    stars: [[225.1,0.3],[229.4,8.5],[235.2,4.4],[220.5,-8.5]], lines: [[3,0,1,2,0]] },
  { id: 'Scorpius', latin: 'Scorpius', from: 241.0, to: 247.7, sign: 'Scorpio', star: 'Antares, "rival of Mars"', essence: 'The scorpion that killed Orion; they never share the sky.',
    stars: [[243.2,1.0],[242.6,-2.0],[242.2,-5.5],[249.8,-4.6],[251.7,-6.1],[255.2,-15.0],[256.5,-18.5],[265.6,-19.7],[264.6,-13.8]], lines: [[0,1,2],[1,3,4,5,6,7,8]] },
  { id: 'Ophiuchus', latin: 'Ophiuchus', from: 247.7, to: 266.3, sign: null, star: 'Rasalhague, "head of the serpent-bearer"', essence: 'The serpent-bearer, Asclepius the healer. On the ecliptic but in no zodiac of signs.',
    stars: [[262.4,35.8],[265.8,27.9],[257.9,7.2],[249.6,11.4],[242.2,17.3],[253.4,32.5]], lines: [[0,1,2,3,4,5,0]] },
  { id: 'Sagittarius', latin: 'Sagittarius', from: 266.3, to: 299.7, sign: 'Sagittarius', star: 'Kaus Australis, "southern bow"', essence: 'The archer, a centaur drawing on the heart of the scorpion.',
    stars: [[271.3,-7.0],[274.6,-6.5],[275.1,-11.1],[276.3,-2.1],[278.6,-3.9],[282.4,-3.4],[285.0,-4.8],[283.6,-7.2]], lines: [[0,1,2,7],[1,3,4,5,6,7],[1,4],[4,7]] },
  { id: 'Capricornus', latin: 'Capricornus', from: 299.7, to: 327.5, sign: 'Capricorn', star: 'Deneb Algedi, "tail of the goat"', essence: 'The goat-fish: Enki\'s creature, Pan leaping into the Nile.',
    stars: [[303.8,6.9],[304.1,4.6],[306.0,-5.0],[308.5,-9.0],[318.4,-6.5],[323.5,-2.6],[321.7,-2.3],[313.4,0.6]], lines: [[0,1,2,3,4,5,6,7,0]] },
  { id: 'Aquarius', latin: 'Aquarius', from: 327.5, to: 351.6, sign: 'Aquarius', star: 'Sadalsuud, "luck of lucks"', essence: 'The water-bearer pouring a stream into the mouth of the southern fish.',
    stars: [[311.6,8.1],[323.4,8.4],[333.4,10.7],[336.8,8.0],[338.6,8.9],[341.6,-0.4],[339.0,-8.2]], lines: [[0,1,2,3,4],[2,5,6]] },
];

// ── Chinese phases (Wuxing) ─────────────────────────────────────────────
const PHASES = {
  Wood:  { hanzi: '木', essence: 'Spring, the east, green. Growth and reach.', season: 'Spring', direction: 'East', colour: 'Green-blue', planet: 'Jupiter', generates: 'Fire', controls: 'Earth' },
  Fire:  { hanzi: '火', essence: 'Summer, the south, red. Heat and rising.', season: 'Summer', direction: 'South', colour: 'Red', planet: 'Mars', generates: 'Earth', controls: 'Metal' },
  Earth: { hanzi: '土', essence: 'The centre, the turn of seasons, yellow. Holding and feeding.', season: 'Late summer', direction: 'Centre', colour: 'Yellow', planet: 'Saturn', generates: 'Metal', controls: 'Water' },
  Metal: { hanzi: '金', essence: 'Autumn, the west, white. Contraction and the cut.', season: 'Autumn', direction: 'West', colour: 'White', planet: 'Venus', generates: 'Water', controls: 'Wood' },
  Water: { hanzi: '水', essence: 'Winter, the north, black. Descent and storage.', season: 'Winter', direction: 'North', colour: 'Black', planet: 'Mercury', generates: 'Wood', controls: 'Fire' },
};
// Fixed phase of each branch, in branch order from 子 Rat.
const BRANCH_PHASE = ['Water', 'Earth', 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Earth', 'Water'];
const SIX_HARMONY = { Rat: 'Ox', Ox: 'Rat', Tiger: 'Pig', Pig: 'Tiger', Rabbit: 'Dog', Dog: 'Rabbit', Dragon: 'Rooster', Rooster: 'Dragon', Snake: 'Monkey', Monkey: 'Snake', Horse: 'Goat', Goat: 'Horse' };
const TRINES = [['Rat', 'Dragon', 'Monkey'], ['Ox', 'Snake', 'Rooster'], ['Tiger', 'Horse', 'Dog'], ['Rabbit', 'Goat', 'Pig']];
const BRANCH_ESSENCE = {
  Rat: 'Quickness, resource, the first.', Ox: 'Patience, burden, the long furrow.', Tiger: 'Courage, command, the force of spring.',
  Rabbit: 'Grace, caution, the moon\'s elixir.', Dragon: 'Power, rain, the one mythical beast.', Snake: 'Insight, reserve, the little dragon.',
  Horse: 'Movement, ardour, the height of yang.', Goat: 'Gentleness, art, care.', Monkey: 'Ingenuity, wit, the trickster king.',
  Rooster: 'Vigilance, exactness, the morning call.', Dog: 'Loyalty, guarding, the watch at dusk.', Pig: 'Generosity, ease, the last to arrive.',
};

// ── Houses ───────────────────────────────────────────────────────────────
const HOUSE_LATIN = ['Vita', 'Lucrum', 'Fratres', 'Genitor', 'Nati', 'Valetudo', 'Uxor', 'Mors', 'Pietas', 'Regnum', 'Benefacta', 'Carcer'];
const HOUSE_ESSENCE = [
  'Life, the body, the rising.', 'Livelihood, what is held.', 'Siblings, the near road, the goddess.', 'The father, the ground, the end of things.',
  'Children, pleasure, good fortune.', 'Illness, labour, servants.', 'The partner, the other, open enemies.', 'Death, what is inherited.',
  'Religion, the far road, the god.', 'Rule, action, the midheaven.', 'Friends, hopes, the good spirit.', 'Confinement, hidden enemies, the bad spirit.',
];
const HOUSE_KIND = (n) => [1, 4, 7, 10].includes(n) ? 'Angular' : [2, 5, 8, 11].includes(n) ? 'Succedent' : 'Cadent';

const ASPECT_ESSENCE = {
  Conjunction: 'Fusion. Two as one degree.', Opposition: 'The axis. Each faces the other.', Trine: 'Ease. The same element.',
  Square: 'Friction. The same mode, another element.', Sextile: 'Opening. Kindred elements.', Quincunx: 'Unease. Nothing in common.',
  Semisquare: 'Half a square. A lesser friction.', Sesquiquadrate: 'A square and a half. A lesser friction.',
};

// ── Build the entity graph ───────────────────────────────────────────────
export const NAK_SPAN = 360 / 27;
// Each branch's month opens on a jié term: 寅 at the Sun's 315°.
export const branchStart = (i) => (315 + (i - 2) * 30 + 360) % 360;

const E = {};
const add = (id, ent) => { E[id] = { id, links: [], attrs: [], ...ent }; };
const link = (a, b, rel, back) => {
  if (!E[a] || !E[b]) return;
  if (!E[a].links.some(l => l.to === b && l.rel === rel)) E[a].links.push({ to: b, rel });
  if (back && !E[b].links.some(l => l.to === a && l.rel === back)) E[b].links.push({ to: a, rel: back });
};

for (const [name, p] of Object.entries(PLANETS)) {
  const attrs = [];
  if (p.day) attrs.push(['Day', p.day]);
  if (p.metal) attrs.push(['Metal', p.metal]);
  if (p.vedic) attrs.push(['Vedic', p.vedic]);
  if (p.chinese) attrs.push(['Chinese', p.chinese]);
  if (p.gods) attrs.push(['Gods', p.gods]);
  if (p.found) attrs.push(['Discovery', p.found]);
  add(`planet:${name}`, { kind: 'planet', kindLabel: p.modern ? 'Modern planet' : (p.node ? 'Lunar node' : 'Classical planet'), name, glyph: PLANET_GLYPH[name], colour: PLANET_COLOUR[name] || '#EADFC4', essence: p.essence, attrs });
}
SIGNS.forEach((s, i) => {
  const si = SIGN_INFO[s];
  add(`sign:${s}`, { kind: 'sign', kindLabel: 'Tropical sign', name: s, glyph: SIGN_SYM[i], colour: SIGN_COL[s], essence: SIGN_ESSENCE[s], start: i * 30, end: i * 30 + 30,
    attrs: [['Span', `${i * 30}° to ${i * 30 + 30}°`], ['Vedic', RASHI_INFO[i].name], ['Body', RASHI_INFO[i].body], ['Hebrew letter', `${si.letterName} ${si.hebrew}`]] });
});
for (const [el, e] of Object.entries(ELEMENTS)) add(`el:${el}`, { kind: 'element', kindLabel: 'Element', name: el, glyph: { Fire: '△', Earth: '▽\u0336', Air: '△\u0336', Water: '▽' }[el], colour: ELEMENT_HUE[el], essence: e.essence, attrs: [] });
for (const [m, e] of Object.entries(MODES)) add(`mode:${m}`, { kind: 'mode', kindLabel: 'Mode', name: m, glyph: e.glyph, colour: '#C9C4D4', essence: e.essence, attrs: [] });
for (const c of CONSTELLATIONS) add(`const:${c.id}`, { kind: 'const', kindLabel: 'Constellation', name: c.latin, glyph: '✦', colour: '#EADFC4', essence: c.essence, start: c.from, end: c.to, stars: c.stars, lines: c.lines,
  attrs: [['Ecliptic span', `${c.from}° to ${c.to}° (${Math.round((c.to - c.from + 360) % 360)}°)`], ['Brightest', c.star]] });
NAKSHATRA_INFO.forEach((n, i) => {
  const lord = n.lord;
  add(`nak:${n.name}`, { kind: 'nak', kindLabel: `Nakshatra ${i + 1}`, name: n.name, glyph: String(i + 1), colour: PLANET_COLOUR[lord] || '#EADFC4', essence: n.nature.split('.')[0] + '.', start: i * NAK_SPAN, end: (i + 1) * NAK_SPAN, sidereal: true,
    attrs: [['Deity', n.deity], ['Symbol', n.symbol], ['Gana', n.gana], ['Yoni', n.yoni]] });
});
ANIMALS.forEach((a, i) => {
  const ai = ANIMAL_INFO[a];
  const s = branchStart(i);
  add(`branch:${a}`, { kind: 'branch', kindLabel: 'Earthly branch', name: a, glyph: BRANCHES[i], colour: CN_EL_INFO[BRANCH_PHASE[i]].color, essence: BRANCH_ESSENCE[a], start: s, end: (s + 30) % 360,
    attrs: [['Branch', `${BRANCHES[i]} ${BRANCH_PINYIN[i]}`], ['Double hour', `${String((23 + i * 2) % 24).padStart(2, '0')}:00 to ${String((1 + i * 2) % 24).padStart(2, '0')}:00`], ['Character', `${ai.emoji}`]] });
});
for (const [ph, p] of Object.entries(PHASES)) add(`phase:${ph}`, { kind: 'phase', kindLabel: 'Chinese phase', name: ph, glyph: p.hanzi, colour: CN_EL_INFO[ph].color, essence: p.essence, attrs: [['Season', p.season], ['Direction', p.direction], ['Colour', p.colour]] });
for (let h = 1; h <= 12; h++) add(`house:${h}`, { kind: 'house', kindLabel: `${HOUSE_KIND(h)} house`, name: `${ord(h)} house`, glyph: String(h), colour: '#C9C4D4', essence: HOUSE_ESSENCE[h - 1], attrs: [['Latin', HOUSE_LATIN[h - 1]], ['Vedic', `${BHAVA_INFO[h - 1].name}, ${BHAVA_INFO[h - 1].theme}`]] });
for (const a of ASPECTS) add(`asp:${a.name}`, { kind: 'asp', kindLabel: 'Aspect', name: a.name, glyph: a.sym, colour: a.col, essence: ASPECT_ESSENCE[a.name], attrs: [['Angle', `${a.angle}°`], ['Orb used', `${a.orb}°`]] });

// Planet links
for (const [name, p] of Object.entries(PLANETS)) {
  const id = `planet:${name}`;
  (p.dom || []).forEach(s => link(id, `sign:${s}`, p.modern ? 'Modern rulership' : 'Domicile', `Ruled by ${name}`));
  if (p.exalt) link(id, `sign:${p.exalt}`, 'Exaltation', `Exaltation of ${name}`);
  (p.detr || []).forEach(s => link(id, `sign:${s}`, 'Detriment'));
  if (p.fall) link(id, `sign:${p.fall}`, 'Fall');
  if (p.joy) link(id, `house:${p.joy}`, 'Its joy', `Joy of ${name}`);
  if (p.phase) link(id, `phase:${p.phase}`, 'Its Chinese phase', 'Its planet');
  if (p.node) link(id, `planet:${p.node}`, 'The other node');
}
// Signs: element, mode, opposite, constellation, natural house
SIGNS.forEach((s, i) => {
  const si = SIGN_INFO[s];
  link(`sign:${s}`, `el:${si.element}`, 'Element', 'Sign of the element');
  link(`sign:${s}`, `mode:${si.mode}`, 'Mode', 'Sign of the mode');
  link(`sign:${s}`, `sign:${SIGNS[(i + 6) % 12]}`, 'Opposite sign');
  link(`sign:${s}`, `house:${i + 1}`, 'Natural house', 'Natural sign');
});
for (const [el, e] of Object.entries(ELEMENTS)) e.triplicity.forEach((p, k) => link(`el:${el}`, `planet:${p}`, ['Triplicity ruler by day', 'Triplicity ruler by night', 'Participating ruler'][k]));
for (const c of CONSTELLATIONS) if (c.sign) link(`const:${c.id}`, `sign:${c.sign}`, 'The sign named for it', 'Its constellation');
// Nakshatras: lord, the sidereal sign(s) they fall in, the constellation they sit in
const AYAN_J2000 = 23.86;
const overlap = (a0, a1, b0, b1) => {
  const seg = (s, e) => (e > s ? [[s, e]] : [[s, 360], [0, e]]);
  return seg(a0, a1).some(([x0, x1]) => seg(b0, b1).some(([y0, y1]) => Math.min(x1, y1) - Math.max(x0, y0) > 1));
};
NAKSHATRA_INFO.forEach((n, i) => {
  const id = `nak:${n.name}`;
  link(id, `planet:${n.lord}`, 'Lord', 'Lord of the mansion');
  const s0 = i * NAK_SPAN, s1 = (i + 1) * NAK_SPAN;
  SIGNS.forEach((s, k) => { if (overlap(s0, s1, k * 30, k * 30 + 30)) link(id, `sign:${s}`, `In sidereal ${RASHI_INFO[k].name}`, 'Mansion in the sidereal sign'); });
  const t0 = (s0 + AYAN_J2000) % 360, t1 = (s1 + AYAN_J2000) % 360;
  CONSTELLATIONS.forEach(c => { if (overlap(t0, t1, c.from, c.to)) link(id, `const:${c.id}`, 'Among the stars of', 'Mansion in its stars'); });
});
// Branches
ANIMALS.forEach((a, i) => {
  const id = `branch:${a}`;
  link(id, `phase:${BRANCH_PHASE[i]}`, 'Fixed phase', 'Branch of the phase');
  link(id, `branch:${ANIMALS[(i + 6) % 12]}`, 'Clash (opposite)');
  link(id, `branch:${SIX_HARMONY[a]}`, 'Six harmony');
  TRINES.find(t => t.includes(a)).filter(b => b !== a).forEach(b => link(id, `branch:${b}`, 'Trine of three'));
  // The month's middle term (zhōngqì) falls as the Sun enters this sign.
  link(id, `sign:${SIGNS[(9 + i) % 12]}`, 'Its middle term opens', 'Chinese month across its opening');
});
for (const [ph, p] of Object.entries(PHASES)) {
  link(`phase:${ph}`, `phase:${p.generates}`, 'Generates', 'Generated by');
  link(`phase:${ph}`, `phase:${p.controls}`, 'Controls', 'Controlled by');
}
for (let h = 1; h <= 12; h++) link(`house:${h}`, `house:${((h + 5) % 12) + 1}`, 'Opposite house');
// Aspects by the sign relation they rest on
link('asp:Opposition', 'asp:Conjunction', 'Its counterpart', 'Its counterpart');
link('asp:Square', 'asp:Semisquare', 'Halved', 'Doubled'); link('asp:Square', 'asp:Sesquiquadrate', 'Half again', 'Two thirds');
link('asp:Trine', 'asp:Sextile', 'Halved', 'Doubled');

export const ENTITIES = E;
export const KIND_ORDER = [
  ['planet', 'Planets and nodes'], ['sign', 'Tropical signs'], ['const', 'Constellations'], ['nak', 'Nakshatras'],
  ['branch', 'Earthly branches'], ['phase', 'Chinese phases'], ['el', 'Elements'], ['mode', 'Modes'], ['house', 'Houses'], ['asp', 'Aspects'],
].map(([k, label]) => ({ kind: k === 'el' ? 'element' : k === 'mode' ? 'mode' : k, label }));
export const AYANAMSA_J2000 = AYAN_J2000;
