// Symbol map: every body, sign, constellation, mansion, branch and phase the
// app knows, with the correspondences the traditions themselves draw between
// them. Essences are hints in the traditions' own words, not explanations.
// Links carry a relation label so the focus view can say why two things meet.
import { SIGNS, SIGN_SYM, SIGN_COL, ELEMENT_HUE, SIGN_INFO } from './astrology/signs.js';
import { P_SYM, P_COL } from './astrology/planets.js';
import { NAKSHATRA_INFO, RASHI_INFO, BHAVA_INFO } from './astrology/nakshatras.js';
import { ANIMALS, BRANCHES, BRANCH_PINYIN, CN_EL_INFO } from './astrology/chinese.js';
import { ASPECTS } from './astrology/aspects.js';
import { FIGURE_NOTE, ASTERISMS } from './sky/figureArt.js';

const T = '︎';
const ord = (n) => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');

// ── Overlays: the rings drawn round the ecliptic ─────────────────────────
export const OVERLAYS = [
  { id: 'const', label: 'Greek figures', note: 'The 88 IAU constellations; the thirteen on the ecliptic stand out.' },
  { id: 'sign', label: 'Tropical zodiac', note: 'The ecliptic and the zodiac belt, cut into twelve equal signs from the vernal equinox.' },
  { id: 'sid', label: 'Sidereal zodiac', note: 'The twelve rashis of the Vedic zodiac (Lahiri), set back from the tropical signs by the ayanamsa.' },
  { id: 'nak', label: 'Nakshatras', note: 'The 27 lunar mansions of 13°20′ in the sidereal zodiac (Lahiri), with the junction star of each.' },
  { id: 'xiu', label: 'Chinese mansions', note: 'The 28 xiù, the lunar lodges of Chinese astronomy, drawn as their own asterisms.' },
];

// ── Planets ──────────────────────────────────────────────────────────────
const PLANETS = {
  Sun:     { essence: 'Sovereignty. Light, life, the heart.', day: 'Sunday', metal: 'Gold', vedic: 'Surya', chinese: '太陽 Tàiyáng', gods: 'Helios, Apollo, Shamash', dom: ['Leo'], exalt: 'Aries', detr: ['Aquarius'], fall: 'Libra', joy: 9 },
  Moon:    { essence: 'The mother. Change, the tide, growth and waning.', day: 'Monday', metal: 'Silver', vedic: 'Chandra', chinese: '太陰 Tàiyīn', gods: 'Selene, Artemis, Sin', dom: ['Cancer'], exalt: 'Taurus', detr: ['Capricorn'], fall: 'Scorpio', joy: 3 },
  Mercury: { essence: 'The messenger. Word, number, exchange.', day: 'Wednesday', metal: 'Quicksilver', vedic: 'Budha', chinese: '水星 Shuǐxīng, the water star', phase: 'Water', gods: 'Hermes, Thoth, Nabu', dom: ['Gemini', 'Virgo'], exalt: 'Virgo', detr: ['Sagittarius', 'Pisces'], fall: 'Pisces', joy: 1 },
  Venus:   { essence: 'Love. Beauty, desire, harmony.', day: 'Friday', metal: 'Copper', vedic: 'Shukra', chinese: '金星 Jīnxīng, the metal star', phase: 'Metal', gods: 'Aphrodite, Ishtar, Frigg', dom: ['Taurus', 'Libra'], exalt: 'Pisces', detr: ['Scorpio', 'Aries'], fall: 'Virgo', joy: 5 },
  Mars:    { essence: 'War. Blood, iron, courage, the blade.', day: 'Tuesday', metal: 'Iron', vedic: 'Mangala', chinese: '火星 Huǒxīng, the fire star', phase: 'Fire', gods: 'Ares, Nergal, Tiw', dom: ['Aries', 'Scorpio'], exalt: 'Capricorn', detr: ['Libra', 'Taurus'], fall: 'Cancer', joy: 6 },
  Jupiter: { essence: 'Abundance. Law, faith, fortune.', day: 'Thursday', metal: 'Tin', vedic: 'Guru, Brihaspati', chinese: '木星 Mùxīng, the wood star (Suìxīng, the year star)', phase: 'Wood', gods: 'Zeus, Marduk, Thor', dom: ['Sagittarius', 'Pisces'], exalt: 'Cancer', detr: ['Gemini', 'Virgo'], fall: 'Capricorn', joy: 11 },
  Saturn:  { essence: 'Time. Limit, death, the harvest.', day: 'Saturday', metal: 'Lead', vedic: 'Shani', chinese: '土星 Tǔxīng, the earth star', phase: 'Earth', gods: 'Kronos, Ninurta', dom: ['Capricorn', 'Aquarius'], exalt: 'Libra', detr: ['Cancer', 'Leo'], fall: 'Aries', joy: 12 },
  Uranus:  { essence: 'Revolution. The sudden, the sky unbound.', gods: 'Ouranos', found: 'Found 1781', dom: ['Aquarius'], modern: true },
  Neptune: { essence: 'Dissolution, the boundless, the dream.', gods: 'Poseidon', found: 'Found 1846', dom: ['Pisces'], modern: true },
  Pluto:   { essence: 'Depth, the underworld, what returns changed.', gods: 'Hades', found: 'Found 1930', dom: ['Scorpio'], modern: true },
  Chiron:  { essence: 'The wounded healer. The teacher of heroes, the wound that does not close.', gods: 'Chiron the centaur', found: 'Found 1977', claimed: ['Virgo', 'Sagittarius'], modern: true, kindLabel: 'Modern body (centaur)' },
  Lilith:  { essence: 'The dark moon. The empty far point of the Moon\'s orbit.', gods: 'Lilith of Hebrew legend', found: 'A calculated point, not a body', of: 'Moon', kindLabel: 'Lunar apogee' },
  Rahu:    { essence: 'Hunger, the head without a body, eclipse.', vedic: 'Rahu, north node', chinese: '羅睺 Luóhóu', exalt: 'Taurus', node: 'Ketu' },
  Ketu:    { essence: 'Release, the body without a head, the past.', vedic: 'Ketu, south node', chinese: '計都 Jìdū', exalt: 'Scorpio', node: 'Rahu' },
};
const PLANET_GLYPH = { ...P_SYM, Rahu: '☊' + T, Ketu: '☋' + T };
const PLANET_COLOUR = { ...P_COL, Rahu: P_COL.Node, Ketu: P_COL.Node };

// ── Angles: where the horizon and meridian cross the ecliptic. Placed only
// when there is a chart, since they need a moment and a place.
export const ANGLES = {
  Ascendant:  { glyph: 'AC', key: 'ASC', house: 1, essence: 'The rising degree. The horoscopos, the hour-marker, the body.', latin: 'Horoscopus' },
  Midheaven:  { glyph: 'MC', key: 'MC', house: 10, essence: 'The culminating degree. The height of the sky, action, rule.', latin: 'Medium Coeli' },
  Descendant: { glyph: 'DC', key: 'DSC', house: 7, essence: 'The setting degree. The other across the horizon.', latin: 'Occasus' },
  'Imum Coeli': { glyph: 'IC', key: 'IC', house: 4, essence: 'The lowest point of the sky. The root, the ground, the end of things.', latin: 'Imum Coeli' },
};

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

// ── Constellations on the ecliptic: IAU spans (J2000 longitudes); the figures
// themselves come from the star catalogue in data/sky.
const CONSTELLATIONS = [
  { id: 'Pisces', fig: 'Psc', latin: 'Pisces', from: 351.6, to: 28.7, sign: 'Pisces', star: 'Alrescha, "the cord"', essence: 'Two fishes tied at the tail by a cord.' },
  { id: 'Aries', fig: 'Ari', latin: 'Aries', from: 28.7, to: 53.4, sign: 'Aries', star: 'Hamal, "the lamb"', essence: 'The golden ram whose fleece Jason sought.' },
  { id: 'Taurus', fig: 'Tau', latin: 'Taurus', from: 53.4, to: 90.1, sign: 'Taurus', star: 'Aldebaran, "the follower"', essence: 'The bull, with the Pleiades on its shoulder and the Hyades at its face.' },
  { id: 'Gemini', fig: 'Gem', latin: 'Gemini', from: 90.1, to: 118.0, sign: 'Gemini', star: 'Castor and Pollux', essence: 'The twins, one mortal and one divine.' },
  { id: 'Cancer', fig: 'Cnc', latin: 'Cancer', from: 118.0, to: 138.0, sign: 'Cancer', star: 'Praesepe, "the manger"', essence: 'The crab sent against Heracles; the dimmest of the twelve.' },
  { id: 'Leo', fig: 'Leo', latin: 'Leo', from: 138.0, to: 173.9, sign: 'Leo', star: 'Regulus, "the little king"', essence: 'The Nemean lion, its hide proof against any blade.' },
  { id: 'Virgo', fig: 'Vir', latin: 'Virgo', from: 173.9, to: 218.0, sign: 'Virgo', star: 'Spica, "the ear of wheat"', essence: 'The maiden holding the ear of wheat: Astraea, Demeter, Ishtar.' },
  { id: 'Libra', fig: 'Lib', latin: 'Libra', from: 218.0, to: 241.0, sign: 'Libra', star: 'Zubenelgenubi, "the southern claw"', essence: 'The scales, once the scorpion\'s claws.' },
  { id: 'Scorpius', fig: 'Sco', latin: 'Scorpius', from: 241.0, to: 247.7, sign: 'Scorpio', star: 'Antares, "rival of Mars"', essence: 'The scorpion that killed Orion; they never share the sky.' },
  { id: 'Ophiuchus', fig: 'Oph', latin: 'Ophiuchus', from: 247.7, to: 266.3, sign: null, star: 'Rasalhague, "head of the serpent-bearer"', essence: 'The serpent-bearer, Asclepius the healer. On the ecliptic but in no zodiac of signs.' },
  { id: 'Sagittarius', fig: 'Sgr', latin: 'Sagittarius', from: 266.3, to: 299.7, sign: 'Sagittarius', star: 'Kaus Australis, "southern bow"', essence: 'The archer, a centaur drawing on the heart of the scorpion.' },
  { id: 'Capricornus', fig: 'Cap', latin: 'Capricornus', from: 299.7, to: 327.5, sign: 'Capricorn', star: 'Deneb Algedi, "tail of the goat"', essence: 'The goat-fish: Enki\'s creature, Pan leaping into the Nile.' },
  { id: 'Aquarius', fig: 'Aqr', latin: 'Aquarius', from: 327.5, to: 351.6, sign: 'Aquarius', star: 'Sadalsuud, "luck of lucks"', essence: 'The water-bearer pouring a stream into the mouth of the southern fish.' },
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
  add(`planet:${name}`, { kind: 'planet', kindLabel: p.kindLabel || (p.modern ? 'Modern planet' : (p.node ? 'Lunar node' : 'Classical planet')), name, glyph: PLANET_GLYPH[name], colour: PLANET_COLOUR[name] || '#EADFC4', essence: p.essence, attrs });
}
SIGNS.forEach((s, i) => {
  const si = SIGN_INFO[s];
  add(`sign:${s}`, { kind: 'sign', kindLabel: 'Tropical sign', name: s, glyph: SIGN_SYM[i], colour: SIGN_COL[s], essence: SIGN_ESSENCE[s], start: i * 30, end: i * 30 + 30,
    attrs: [['Span', `${i * 30}° to ${i * 30 + 30}°`], ['Vedic', RASHI_INFO[i].name], ['Body', RASHI_INFO[i].body], ['Hebrew letter', `${si.letterName} ${si.hebrew}`]] });
});
for (const [el, e] of Object.entries(ELEMENTS)) add(`el:${el}`, { kind: 'element', kindLabel: 'Element', name: el, glyph: { Fire: '△', Earth: '▽\u0336', Air: '△\u0336', Water: '▽' }[el], colour: ELEMENT_HUE[el], essence: e.essence, attrs: [] });
for (const [m, e] of Object.entries(MODES)) add(`mode:${m}`, { kind: 'mode', kindLabel: 'Mode', name: m, glyph: e.glyph, colour: '#C9C4D4', essence: e.essence, attrs: [] });
for (const c of CONSTELLATIONS) add(`const:${c.id}`, { kind: 'const', kindLabel: 'Constellation', name: c.latin, glyph: '✦', colour: '#EADFC4', essence: c.essence, start: c.from, end: c.to, fig: c.fig,
  attrs: [['Ecliptic span', `${c.from}° to ${c.to}° (${Math.round((c.to - c.from + 360) % 360)}°)`], ['Brightest', c.star]] });
NAKSHATRA_INFO.forEach((n, i) => {
  const lord = n.lord;
  add(`nak:${n.name}`, { kind: 'nak', kindLabel: `Nakshatra ${i + 1}`, name: n.name, glyph: String(i + 1), colour: PLANET_COLOUR[lord] || '#EADFC4', essence: n.nature.split('.')[0] + '.', start: i * NAK_SPAN, end: (i + 1) * NAK_SPAN, sidereal: true,
    attrs: [['Deity', n.deity], ['Symbol', n.symbol], ['Gana', n.gana], ['Yoni', n.yoni]] });
});
ANIMALS.forEach((a, i) => {
  const s = branchStart(i);
  add(`branch:${a}`, { kind: 'branch', kindLabel: 'Earthly branch', name: a, glyph: BRANCHES[i], colour: CN_EL_INFO[BRANCH_PHASE[i]].color, essence: BRANCH_ESSENCE[a], start: s, end: (s + 30) % 360,
    attrs: [['Branch', `${BRANCHES[i]} ${BRANCH_PINYIN[i]}`], ['Double hour', `${String((23 + i * 2) % 24).padStart(2, '0')}:00 to ${String((1 + i * 2) % 24).padStart(2, '0')}:00`]] });
});
for (const [ph, p] of Object.entries(PHASES)) add(`phase:${ph}`, { kind: 'phase', kindLabel: 'Chinese phase', name: ph, glyph: p.hanzi, colour: CN_EL_INFO[ph].color, essence: p.essence, attrs: [['Season', p.season], ['Direction', p.direction], ['Colour', p.colour]] });
for (const [name, a] of Object.entries(ANGLES)) add(`angle:${name}`, { kind: 'angle', kindLabel: 'Angle', name, glyph: a.glyph, colour: '#E9C766', essence: a.essence, key: a.key, attrs: [['Latin', a.latin], ['Cusp of', `the ${ord(a.house)} house`]] });
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
  (p.claimed || []).forEach(s => link(id, `sign:${s}`, 'Rulership claimed by some modern authors'));
  if (p.of) link(id, `planet:${p.of}`, 'A point of its orbit', `Its apogee, ${name}`);
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
for (const [name, a] of Object.entries(ANGLES)) {
  link(`angle:${name}`, `house:${a.house}`, 'Opens the house', 'Its angle');
  link(`angle:${name}`, `angle:${Object.keys(ANGLES).find(n => ANGLES[n].house === ((a.house + 5) % 12) + 1)}`, 'The opposite angle');
}
// Aspects by the sign relation they rest on
link('asp:Opposition', 'asp:Conjunction', 'Its counterpart', 'Its counterpart');
link('asp:Square', 'asp:Semisquare', 'Halved', 'Doubled'); link('asp:Square', 'asp:Sesquiquadrate', 'Half again', 'Two thirds');
link('asp:Trine', 'asp:Sextile', 'Halved', 'Doubled');

// ── The 28 Chinese mansions (xiù) and the four symbols that hold them ────
export const FOUR_SYMBOLS = {
  'Azure Dragon':   { hanzi: '青龍', direction: 'East', season: 'Spring', phase: 'Wood', essence: 'The dragon of the east, rising with spring.', colour: '#93B89A' },
  'Black Tortoise': { hanzi: '玄武', direction: 'North', season: 'Winter', phase: 'Water', essence: 'The tortoise and serpent of the north, the winter dark.', colour: '#7FA8C9' },
  'White Tiger':    { hanzi: '白虎', direction: 'West', season: 'Autumn', phase: 'Metal', essence: 'The tiger of the west, the autumn cut.', colour: '#C9C4D4' },
  'Vermilion Bird': { hanzi: '朱雀', direction: 'South', season: 'Summer', phase: 'Fire', essence: 'The bird of the south, summer heat on the wing.', colour: '#D07262' },
};
export const XIU = [
  ['角宿', '角', 'Jiǎo', 'Horn', 'Azure Dragon', 'The dragon\'s horn; the opening of the eastern sky.'],
  ['亢宿', '亢', 'Kàng', 'Neck', 'Azure Dragon', 'The dragon\'s neck; the stiff and upright.'],
  ['氐宿', '氐', 'Dǐ', 'Root', 'Azure Dragon', 'The root on which the dragon stands.'],
  ['房宿', '房', 'Fáng', 'Room', 'Azure Dragon', 'The chamber; the four horses of the sky.'],
  ['心宿', '心', 'Xīn', 'Heart', 'Azure Dragon', 'The heart, with Antares, the Great Fire.'],
  ['尾宿', '尾', 'Wěi', 'Tail', 'Azure Dragon', 'The dragon\'s tail; the nine sons.'],
  ['箕宿', '箕', 'Jī', 'Winnowing Basket', 'Azure Dragon', 'The basket that stirs the wind.'],
  ['斗宿', '斗', 'Dǒu', 'Dipper', 'Black Tortoise', 'The southern dipper, keeper of the span of life.'],
  ['牛宿', '牛', 'Niú', 'Ox', 'Black Tortoise', 'The ox led by the herd boy.'],
  ['女宿', '女', 'Nǚ', 'Girl', 'Black Tortoise', 'The girl; the weaver\'s attendants.'],
  ['虚宿', '虛', 'Xū', 'Emptiness', 'Black Tortoise', 'The void at the heart of winter.'],
  ['危宿', '危', 'Wēi', 'Rooftop', 'Black Tortoise', 'The rooftop; height and peril.'],
  ['室宿', '室', 'Shì', 'Encampment', 'Black Tortoise', 'The dwelling raised before winter.'],
  ['壁宿', '壁', 'Bì', 'Wall', 'Black Tortoise', 'The wall; the library of heaven.'],
  ['奎宿', '奎', 'Kuí', 'Legs', 'White Tiger', 'The striding legs; patron of letters.'],
  ['娄宿', '婁', 'Lóu', 'Bond', 'White Tiger', 'The tether of the herds.'],
  ['胃宿', '胃', 'Wèi', 'Stomach', 'White Tiger', 'The granary of heaven.'],
  ['昴宿', '昴', 'Mǎo', 'Hairy Head', 'White Tiger', 'The Pleiades; the tiger\'s mane.'],
  ['毕宿', '畢', 'Bì', 'Net', 'White Tiger', 'The hunting net, the Hyades; rain.'],
  ['觜宿', '觜', 'Zī', 'Turtle Beak', 'White Tiger', 'The beak; the smallest of the lodges.'],
  ['参宿', '參', 'Shēn', 'Three Stars', 'White Tiger', 'Orion\'s belt; the warrior, the tiger\'s body.'],
  ['井宿', '井', 'Jǐng', 'Well', 'Vermilion Bird', 'The well; water and law.'],
  ['鬼宿', '鬼', 'Guǐ', 'Ghost', 'Vermilion Bird', 'The ghosts, round the hazy cluster of the dead.'],
  ['柳宿', '柳', 'Liǔ', 'Willow', 'Vermilion Bird', 'The willow; the bird\'s beak.'],
  ['星宿', '星', 'Xīng', 'Star', 'Vermilion Bird', 'The bird\'s neck, with Alphard.'],
  ['张宿', '張', 'Zhāng', 'Extended Net', 'Vermilion Bird', 'The spread wings; the crop.'],
  ['翼宿', '翼', 'Yì', 'Wings', 'Vermilion Bird', 'The wings; music and travel.'],
  ['轸宿', '軫', 'Zhěn', 'Chariot', 'Vermilion Bird', 'The chariot; death and burial.'],
];
for (const [name, p] of Object.entries(FOUR_SYMBOLS)) {
  add(`sym:${name}`, { kind: 'sym', kindLabel: 'Chinese symbol of a quarter', name, glyph: p.hanzi, colour: p.colour, essence: p.essence, attrs: [['Direction', p.direction], ['Season', p.season]] });
  link(`sym:${name}`, `phase:${p.phase}`, 'Its phase', 'Symbol of the quarter');
}
XIU.forEach(([key, han, pin, en, sym], i) => {
  const id = `xiu:${en}`;
  add(id, { kind: 'xiu', kindLabel: `Chinese mansion ${i + 1}`, name: en, glyph: han, colour: FOUR_SYMBOLS[sym].colour, essence: XIU[i][5], key,
    attrs: [['Name', `${han}宿 ${pin}`], ['Quarter', `${sym} ${FOUR_SYMBOLS[sym].hanzi}`]] });
  link(id, `sym:${sym}`, 'Its quarter', 'Mansion of the quarter');
});
// Where a Chinese and an Indian mansion are drawn round the same stars.
[['Hairy Head', 'Krittika'], ['Net', 'Rohini'], ['Three Stars', 'Ardra'], ['Ghost', 'Pushya'], ['Heart', 'Jyeshtha'], ['Room', 'Anuradha'], ['Tail', 'Mula'], ['Horn', 'Chitra'], ['Wall', 'Uttara Bhadrapada'], ['Encampment', 'Purva Bhadrapada'], ['Dipper', 'Uttara Ashadha'], ['Winnowing Basket', 'Purva Ashadha']]
  .forEach(([x, n]) => link(`xiu:${x}`, `nak:${n}`, 'Indian mansion on the same stars', 'Chinese mansion on the same stars'));

// The great figures off the zodiac, and the named asterisms, so each can be found and opened.
export const FIG_OFF = { Ori: 'Orion', UMa: 'Ursa Major', Cyg: 'Cygnus', Per: 'Perseus', And: 'Andromeda', Peg: 'Pegasus', Cas: 'Cassiopeia' };
for (const [k, n] of Object.entries(FIG_OFF)) add(`fig:${k}`, { kind: 'fig', kindLabel: 'Constellation off the zodiac', name: n, glyph: '✦', colour: '#EADFC4', essence: FIGURE_NOTE[n][1], fig: k });
const figEnt = (k) => (FIG_OFF[k] ? `fig:${k}` : CONSTELLATIONS.find((c) => c.fig === k) && `const:${CONSTELLATIONS.find((c) => c.fig === k).id}`);
for (const a of ASTERISMS) {
  const id = `ast:${a.name}`;
  add(id, { kind: 'ast', kindLabel: FIGURE_NOTE[a.name][0], name: a.name, glyph: '✧', colour: '#FFECBE', essence: FIGURE_NOTE[a.name][1], fig: a.fig || null });
  if (a.fig && figEnt(a.fig)) link(id, figEnt(a.fig), 'Part of', a.glow ? 'Holds the nebula' : 'Holds the asterism');
}
[["Orion's Belt", 'Three Stars'], ['Pleiades', 'Hairy Head'], ['Hyades', 'Net']].forEach(([a, x]) => link(`ast:${a}`, `xiu:${x}`, 'Chinese mansion on these stars', 'The same stars in the West'));
link('ast:Pleiades', 'nak:Krittika', 'Indian mansion on these stars', 'The same stars in the West');
link('fig:Ori', 'nak:Ardra', 'Indian mansion on its shoulder star', 'Western figure round its star');
link('fig:Ori', 'xiu:Three Stars', 'Chinese mansion on its stars', 'The same stars in the West');

// The pole star, which the whole sky turns about.
export const POLARIS = { at: [37.95, 89.26], pointers: [[165.46, 56.38], [165.93, 61.75], [37.95, 89.26]] };
add('star:Polaris', { kind: 'star', kindLabel: 'The North Star', name: 'Polaris', glyph: '✶', colour: '#FFF3D0',
  essence: 'The pole star. Less than a degree from the north celestial pole, so it barely moves while every other star wheels round it. Its height above the horizon is your latitude.',
  attrs: [['Constellation', 'Ursa Minor, the tip of the Little Bear\'s tail'], ['Find it', 'Follow Merak and Dubhe, the pointers of the Plough'], ['Other names', 'Stella Polaris, Cynosura, Dhruva in India, 勾陳一 Gōuchén Yī in China']] });
link('star:Polaris', 'fig:UMa', 'The pointers lead to it from', 'Its pointers lead to');

// The five beasts tied through: the stars each quarter holds in the West, the
// branches of its direction, the signs of its season, its opposite, and the
// Yellow Dragon of the centre, whose sky is the palace about the pole.
add('sym:Yellow Dragon', { kind: 'sym', kindLabel: 'Chinese symbol of the centre', name: 'Yellow Dragon', glyph: '黃龍', colour: '#D9B44A',
  essence: 'The dragon of the centre, earth and the turn of every season; the emperor\'s own beast.',
  attrs: [['Direction', 'Centre'], ['Season', 'Late summer, and the last days of each season'], ['Sky', 'The Purple Forbidden Enclosure 紫微垣 about the pole, with no mansions of its own']] });
link('sym:Yellow Dragon', 'phase:Earth', 'Its phase', 'Symbol of the centre');
link('sym:Yellow Dragon', 'star:Polaris', 'Its palace about the pole', 'Beast of the centre it marks');
link('sym:Yellow Dragon', 'fig:UMa', 'Its carriage, the Northern Dipper 北斗, whose handle turns the seasons', 'The centre its handle turns about');
const QUARTER_TIES = {
  'Azure Dragon':   { opp: 'White Tiger',    stars: ['const:Virgo', 'const:Libra', 'const:Scorpius', 'const:Sagittarius'], branches: ['Tiger', 'Rabbit', 'Dragon'], signs: ['Aries', 'Taurus', 'Gemini'], west: 'Virgo, Libra, Scorpius and the tip of Sagittarius. Spica is its horn, Antares its heart.' },
  'Vermilion Bird': { opp: 'Black Tortoise', stars: ['const:Gemini', 'const:Cancer'], branches: ['Snake', 'Horse', 'Goat'], signs: ['Cancer', 'Leo', 'Virgo'], west: 'Gemini, Cancer, Hydra, Crater and Corvus. The Beehive is the Ghost mansion; Alphard the Bird\'s heart.' },
  'White Tiger':    { opp: 'Azure Dragon',   stars: ['fig:And', 'const:Pisces', 'const:Aries', 'const:Taurus', 'fig:Ori', 'ast:Pleiades', 'ast:Hyades', "ast:Orion's Belt"], branches: ['Monkey', 'Rooster', 'Dog'], signs: ['Libra', 'Scorpio', 'Sagittarius'], west: 'Andromeda, Aries, the Pleiades and Hyades of Taurus, and Orion. The Belt is the Three Stars, heart of the Tiger.' },
  'Black Tortoise': { opp: 'Vermilion Bird', stars: ['const:Sagittarius', 'const:Capricornus', 'const:Aquarius', 'fig:Peg', 'fig:And'], branches: ['Pig', 'Rat', 'Ox'], signs: ['Capricorn', 'Aquarius', 'Pisces'], west: 'Sagittarius (the Southern Dipper), Capricornus, Aquarius and the Great Square of Pegasus.' },
};
for (const [name, t] of Object.entries(QUARTER_TIES)) {
  const id = `sym:${name}`;
  E[id].attrs.push(['Western stars', t.west]);
  t.stars.forEach((to) => link(id, to, 'Its stars in the West', 'Stars of the Chinese quarter'));
  t.branches.forEach((a) => link(id, `branch:${a}`, 'Branch of its direction', 'Beast of its direction'));
  t.signs.forEach((sg) => link(id, `sign:${sg}`, 'Western sign of its season', 'Chinese beast of its season'));
  link(id, `sym:${t.opp}`, 'Faces it across the sky', 'Faces it across the sky');
  link(id, 'sym:Yellow Dragon', 'The centre it turns about', 'One of the four about it');
}
link('ast:Great Square', 'xiu:Encampment', 'Chinese mansion on these stars', 'The same stars in the West');
link('ast:Great Square', 'sym:Black Tortoise', 'Its Chinese quarter', 'Stars of the Chinese quarter');

export const ENTITIES = E;
export const KIND_ORDER = [
  ['planet', 'Planets, nodes and points'], ['angle', 'Angles'], ['sign', 'Tropical signs'], ['const', 'Constellations'], ['fig', 'Other constellations'], ['ast', 'Asterisms'], ['star', 'Stars'], ['nak', 'Nakshatras'],
  ['xiu', 'Chinese mansions'], ['sym', 'Chinese quarters'], ['branch', 'Earthly branches'], ['phase', 'Chinese phases'], ['el', 'Elements'], ['mode', 'Modes'], ['house', 'Houses'], ['asp', 'Aspects'],
].map(([k, label]) => ({ kind: k === 'el' ? 'element' : k === 'mode' ? 'mode' : k, label }));
export const AYANAMSA_J2000 = AYAN_J2000;
