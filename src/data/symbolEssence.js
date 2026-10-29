// What each symbol stands for in itself, before any chart or relation: the
// core it is known by, the words the traditions keep returning to, what it
// rules or is pictured as, and the story told of it. Kept to the traditional
// words; a hint at the essence, not an explanation.
//
// Shape: { core, keys: [...], rep: [[label, text], ...], myth? }

const P = {
  Sun: { core: 'Sovereignty', keys: ['light', 'life', 'kingship', 'the heart', 'glory', 'the father', 'the centre'],
    rep: [['Rules', 'rank, honour, vitality, fame, the will'], ['People', 'kings, fathers, magistrates, goldsmiths'], ['Emblems', 'the crown, the disc, the lion, the open eye'], ['Body', 'heart, spine, the right eye, vital heat'], ['Animals', 'lion, eagle, cockerel'], ['Plants', 'sunflower, heliotrope, laurel, saffron'], ['Stones', 'ruby, topaz, carnelian'], ['Colour', 'gold, yellow'], ['Virtue and vice', 'magnanimity; pride']],
    myth: 'Helios drives the chariot of the day across the sky. Apollo bears the lyre and the bow. Ra sails the solar barque through the night and is born again each dawn.' },
  Moon: { core: 'The Mother', keys: ['change', 'the tide', 'night', 'memory', 'nourishment', 'the people', 'reflection'],
    rep: [['Rules', 'growth and waning, birth, the crowd, journeys by water'], ['People', 'mothers, queens, nurses, sailors, travellers, the public'], ['Emblems', 'the crescent, the silver bow, the cup, the hare'], ['Body', 'breasts, womb, stomach, the fluids, the left eye'], ['Animals', 'hare, crab, owl, cat'], ['Plants', 'willow, lily, poppy, moonwort'], ['Stones', 'pearl, moonstone, selenite'], ['Colour', 'silver, white'], ['Virtue and vice', 'care; inconstancy']],
    myth: 'Selene drives the night sky and loves the sleeping Endymion. Artemis hunts by the silver bow. Chandra wanes under a curse and waxes again by a blessing, month after month.' },
  Mercury: { core: 'The Messenger', keys: ['speech', 'trade', 'writing', 'wit', 'theft', 'the crossroads', 'youth'],
    rep: [['Rules', 'language, number, commerce, medicine, cunning'], ['People', 'merchants, scribes, scholars, heralds, thieves, the young'], ['Emblems', 'the caduceus, winged sandals, the pen, the purse'], ['Body', 'tongue, hands, lungs, nerves'], ['Animals', 'ibis, monkey, fox, weasel'], ['Plants', 'hazel, fennel, lavender, marjoram'], ['Stones', 'agate, emerald, quicksilver'], ['Colour', 'mixed and shot colours'], ['Virtue and vice', 'eloquence; deceit']],
    myth: 'Hermes steals Apollo\'s cattle on the day he is born and talks his way out of it; he guides souls to the underworld. Thoth invents writing and records the weighing of the heart.' },
  Venus: { core: 'Love', keys: ['beauty', 'desire', 'union', 'pleasure', 'art', 'peace', 'adornment'],
    rep: [['Rules', 'love, marriage, the arts, ornament, harmony'], ['People', 'lovers, artists, musicians, jewellers, women'], ['Emblems', 'the mirror, the girdle, the dove, the rose, the shell'], ['Body', 'throat, kidneys, skin, the senses'], ['Animals', 'dove, sparrow, swan'], ['Plants', 'rose, myrtle, apple, violet'], ['Stones', 'emerald, rose quartz, diamond'], ['Colour', 'green, rose, sky blue'], ['Virtue and vice', 'grace; indulgence']],
    myth: 'Aphrodite rises from the sea-foam and steps ashore at Cyprus. Ishtar goes down to the underworld and the earth turns barren until she returns. Shukra, teacher of the asuras, knows the secret of reviving the dead.' },
  Mars: { core: 'War', keys: ['war', 'blood', 'iron', 'courage', 'anger', 'the blade', 'heat', 'conquest'],
    rep: [['Rules', 'war, strife, surgery, the forge, fever, desire as hunger'], ['People', 'soldiers, surgeons, smiths, butchers, athletes, rivals'], ['Emblems', 'the sword, the spear, the shield and helmet, fire'], ['Body', 'blood, muscle, gall, the head, fevers and wounds'], ['Animals', 'wolf, war-horse, ram, vulture, woodpecker'], ['Plants', 'nettle, thistle, garlic, pepper'], ['Stones', 'bloodstone, red jasper, red coral'], ['Colour', 'red'], ['Virtue and vice', 'courage; wrath']],
    myth: 'Ares rages through the battlefield with Fear and Terror at his side. Roman Mars fathers Romulus and the city of war. Mangala, born of the Earth, leads the armies of the gods; Nergal brings plague and battle.' },
  Jupiter: { core: 'Abundance', keys: ['law', 'faith', 'increase', 'wisdom', 'fortune', 'generosity', 'the judge'],
    rep: [['Rules', 'religion, law, wealth, teaching, good fortune'], ['People', 'priests, judges, teachers, bankers, nobles'], ['Emblems', 'the thunderbolt, the eagle, the sceptre, the oak, the throne'], ['Body', 'liver, thighs, the blood\'s growth'], ['Animals', 'eagle, elephant, peacock'], ['Plants', 'oak, sage, cedar, dandelion'], ['Stones', 'yellow sapphire, amethyst, tin'], ['Colour', 'purple, blue, yellow'], ['Virtue and vice', 'justice; excess']],
    myth: 'Zeus rules from Olympus with the thunderbolt and keeps the oaths of gods and men. Marduk orders the cosmos out of the body of Tiamat. Brihaspati is guru and priest to the gods.' },
  Saturn: { core: 'Time', keys: ['limit', 'time', 'death', 'the harvest', 'law', 'solitude', 'endurance'],
    rep: [['Rules', 'time, boundaries, old age, death, land, discipline'], ['People', 'the old, farmers, miners, gravediggers, hermits, builders'], ['Emblems', 'the scythe, the hourglass, the skull, the key'], ['Body', 'bones, teeth, skin, spleen, joints'], ['Animals', 'crow, raven, mole, goat'], ['Plants', 'cypress, yew, hemlock, nightshade'], ['Stones', 'onyx, jet, blue sapphire, lead'], ['Colour', 'black, grey, deep blue'], ['Virtue and vice', 'patience; melancholy']],
    myth: 'Kronos swallows his children for fear of being overthrown, and rules the Golden Age. At Saturnalia the world is turned upside down. Shani, son of the Sun by Shadow, has a gaze that the gods themselves avoid.' },
  Uranus: { core: 'Revolution', keys: ['the sky', 'rupture', 'the sudden', 'invention', 'freedom', 'lightning'],
    rep: [['Rules', 'invention, revolt, electricity, the unforeseen'], ['People', 'inventors, rebels, astrologers, eccentrics'], ['Emblems', 'lightning, the starry sky'], ['Discovery', 'Herschel, 1781, the decade of revolutions']],
    myth: 'Ouranos, the starry sky, lies over Gaia until Kronos cuts him down; from his blood come the Furies, and from the sea-foam, Aphrodite.' },
  Neptune: { core: 'Dissolution', keys: ['the sea', 'dream', 'mysticism', 'illusion', 'compassion', 'intoxication'],
    rep: [['Rules', 'the ocean, dreams, spirit, glamour, deception'], ['People', 'mystics, mediums, artists, sailors'], ['Emblems', 'the trident, fog, the sea-horse'], ['Discovery', '1846, found by calculation before it was seen']],
    myth: 'Poseidon shakes the earth with his trident and rules the depths. The sea that gives and drowns.' },
  Pluto: { core: 'The Underworld', keys: ['death and rebirth', 'hidden wealth', 'power', 'compulsion', 'the depths'],
    rep: [['Rules', 'the underworld, buried wealth, power held unseen, renewal'], ['People', 'undertakers, miners, the powerful in shadow'], ['Emblems', 'the helm of invisibility, the pomegranate, Cerberus'], ['Discovery', '1930']],
    myth: 'Hades carries Persephone below; six pomegranate seeds bind her to return each year, and the seasons turn on her going and coming.' },
  Rahu: { core: 'Hunger', keys: ['obsession', 'the foreign', 'eclipse', 'ambition', 'smoke', 'the unquenchable'],
    rep: [['Emblems', 'the serpent\'s head, smoke'], ['Colour', 'smoky black'], ['Stone', 'hessonite']],
    myth: 'The demon Svarbhanu drinks the nectar of immortality in disguise. Vishnu\'s discus severs him, and the deathless head swallows the Sun and Moon at each eclipse.' },
  Ketu: { core: 'Release', keys: ['detachment', 'liberation', 'the past', 'insight', 'loss', 'the flag'],
    rep: [['Emblems', 'the flag, the serpent\'s tail'], ['Colour', 'smoky grey'], ['Stone', 'cat\'s eye']],
    myth: 'The headless body of Svarbhanu wanders without appetite: what is left when hunger has been cut away.' },
};

const S = {
  Aries: { core: 'Beginning', keys: ['impulse', 'courage', 'the pioneer', 'the spark', 'spring\'s first push'], rep: [['Image', 'the ram'], ['Season', 'first month of spring, from the equinox'], ['Body', 'head and face']], myth: 'The golden ram carries Phrixus to Colchis; its fleece becomes the prize of the Argonauts.' },
  Taurus: { core: 'Fertility', keys: ['earth', 'beauty', 'possession', 'patience', 'the senses'], rep: [['Image', 'the bull'], ['Season', 'spring in full flower'], ['Body', 'throat and neck']], myth: 'Zeus as a white bull carries Europa across the sea. The Bull of Heaven is sent against Gilgamesh.' },
  Gemini: { core: 'Duality', keys: ['the twins', 'speech', 'exchange', 'curiosity', 'siblings'], rep: [['Image', 'the twins'], ['Season', 'late spring'], ['Body', 'arms, hands, lungs']], myth: 'Castor is mortal and Pollux divine; Pollux shares his immortality, and the brothers live alternate days among the gods and the dead.' },
  Cancer: { core: 'The Shell', keys: ['home', 'mother', 'memory', 'the tide', 'protection'], rep: [['Image', 'the crab'], ['Season', 'from the summer solstice'], ['Body', 'breast and stomach']], myth: 'Hera sends the crab against Heracles at Lerna. Macrobius calls the sign the gate through which souls come down into birth.' },
  Leo: { core: 'The King', keys: ['the heart', 'glory', 'generosity', 'pride', 'play'], rep: [['Image', 'the lion'], ['Season', 'high summer'], ['Body', 'heart and back']], myth: 'The Nemean lion, whose hide no blade can pierce, is strangled by Heracles, who wears its skin ever after.' },
  Virgo: { core: 'The Harvest', keys: ['purity', 'service', 'discernment', 'craft', 'healing'], rep: [['Image', 'the maiden with the ear of wheat'], ['Season', 'late summer, the harvest'], ['Body', 'belly and intestines']], myth: 'Astraea, justice, is the last of the immortals to leave the earth when the Golden Age ends. Demeter holds the grain.' },
  Libra: { core: 'Balance', keys: ['justice', 'harmony', 'union', 'judgement', 'the equal night'], rep: [['Image', 'the scales'], ['Season', 'from the autumn equinox'], ['Body', 'kidneys and loins']], myth: 'The scales of Themis and Astraea. The Greeks drew them as the scorpion\'s claws; Rome gave them their own sign.' },
  Scorpio: { core: 'Death and Rebirth', keys: ['secrecy', 'desire', 'poison and cure', 'depth', 'the hidden'], rep: [['Image', 'the scorpion; also the eagle and the serpent'], ['Season', 'deep autumn, the decay of leaves'], ['Body', 'genitals and bladder']], myth: 'The scorpion sent by Gaia stings the hunter Orion to death; they are set at opposite ends of the sky and never share it.' },
  Sagittarius: { core: 'The Quest', keys: ['aim', 'faith', 'philosophy', 'the far journey', 'freedom'], rep: [['Image', 'the centaur archer'], ['Season', 'last month of autumn'], ['Body', 'hips and thighs']], myth: 'The centaur draws his bow at the heart of the scorpion. Chiron, wisest of centaurs, teaches heroes and gives up his immortality.' },
  Capricorn: { core: 'Ambition', keys: ['the mountain', 'structure', 'time', 'the climb', 'authority'], rep: [['Image', 'the sea-goat'], ['Season', 'from the winter solstice'], ['Body', 'knees and bones']], myth: 'Pan leaps into the Nile to escape Typhon and becomes half goat, half fish. Enki\'s goat-fish rises from the sweet waters.' },
  Aquarius: { core: 'Humanity', keys: ['the pouring out', 'community', 'ideals', 'the future', 'the stranger'], rep: [['Image', 'the water-bearer'], ['Season', 'deep winter'], ['Body', 'calves, ankles, circulation']], myth: 'Ganymede is carried up by the eagle to pour for the gods. In Babylon the water-bearer is Ea, who brings the flood.' },
  Pisces: { core: 'The Ocean', keys: ['compassion', 'sacrifice', 'the dream', 'faith', 'the end that holds the beginning'], rep: [['Image', 'two fishes tied by a cord'], ['Season', 'last month of winter'], ['Body', 'feet']], myth: 'Aphrodite and Eros turn into fish to escape Typhon and tie themselves together so as not to lose each other.' },
};

const CONSTS = {
  Pisces: 'The Tied Fishes', Aries: 'The Golden Ram', Taurus: 'The Bull of Heaven', Gemini: 'The Twins', Cancer: 'The Crab',
  Leo: 'The Lion', Virgo: 'The Maiden', Libra: 'The Scales', Scorpius: 'The Scorpion', Ophiuchus: 'The Healer',
  Sagittarius: 'The Archer', Capricornus: 'The Sea-Goat', Aquarius: 'The Water-Bearer',
};

const H = [
  ['Life', ['the body', 'appearance', 'the start', 'the rising', 'vitality']],
  ['Wealth', ['livelihood', 'possessions', 'what is earned and held']],
  ['Siblings', ['the near road', 'letters', 'neighbours', 'the goddess']],
  ['Roots', ['the father', 'land', 'the home', 'the end of things', 'the grave']],
  ['Children', ['pleasure', 'love affairs', 'good fortune', 'feasting']],
  ['Illness', ['labour', 'servants', 'small animals', 'misfortune']],
  ['Marriage', ['the partner', 'the other', 'open enemies', 'contracts']],
  ['Death', ['inheritance', 'other people\'s money', 'fear', 'the crisis']],
  ['Faith', ['the far road', 'religion', 'philosophy', 'dreams', 'the god']],
  ['Honour', ['action', 'career', 'rule', 'the mother', 'the midheaven']],
  ['Friends', ['hopes', 'allies', 'reward', 'the good spirit']],
  ['Confinement', ['hidden enemies', 'prison', 'exile', 'sorrow', 'the bad spirit']],
];

const EL = {
  Fire: { core: 'Spirit', keys: ['will', 'heat', 'light', 'aspiration', 'the kindling'], rep: [['Qualities', 'hot and dry'], ['Humour', 'choleric, yellow bile'], ['Season', 'summer'], ['Spirits', 'salamanders'], ['Solid', 'tetrahedron'], ['Cherub', 'the lion']] },
  Earth: { core: 'Matter', keys: ['form', 'weight', 'endurance', 'the senses', 'the body'], rep: [['Qualities', 'cold and dry'], ['Humour', 'melancholic, black bile'], ['Season', 'autumn'], ['Spirits', 'gnomes'], ['Solid', 'cube'], ['Cherub', 'the bull']] },
  Air: { core: 'Mind', keys: ['breath', 'thought', 'word', 'connection', 'the between'], rep: [['Qualities', 'hot and wet'], ['Humour', 'sanguine, blood'], ['Season', 'spring'], ['Spirits', 'sylphs'], ['Solid', 'octahedron'], ['Cherub', 'the man']] },
  Water: { core: 'Soul', keys: ['feeling', 'binding', 'memory', 'depth', 'the flowing'], rep: [['Qualities', 'cold and wet'], ['Humour', 'phlegmatic, phlegm'], ['Season', 'winter'], ['Spirits', 'undines'], ['Solid', 'icosahedron'], ['Cherub', 'the eagle']] },
};
const MODE = {
  Cardinal: { core: 'Initiation', keys: ['the start', 'the push', 'the turn of a season', 'the leader'] },
  Fixed: { core: 'Persistence', keys: ['the hold', 'the height of a season', 'loyalty', 'the keeper'] },
  Mutable: { core: 'Adaptation', keys: ['the change', 'the wane of a season', 'the go-between', 'the bridge'] },
};
const PH = {
  Wood: { core: 'Growth', keys: ['spring', 'rising sap', 'planning', 'benevolence'], rep: [['Organ', 'liver'], ['Emotion', 'anger'], ['Taste', 'sour'], ['Creature', 'the Azure Dragon']] },
  Fire: { core: 'Flourishing', keys: ['summer', 'blaze', 'joy', 'propriety'], rep: [['Organ', 'heart'], ['Emotion', 'joy'], ['Taste', 'bitter'], ['Creature', 'the Vermilion Bird']] },
  Earth: { core: 'Centre', keys: ['the turn', 'ripening', 'nourishment', 'trust'], rep: [['Organ', 'spleen'], ['Emotion', 'worry'], ['Taste', 'sweet'], ['Creature', 'the Yellow Dragon']] },
  Metal: { core: 'Harvest', keys: ['autumn', 'the cut', 'refinement', 'righteousness'], rep: [['Organ', 'lungs'], ['Emotion', 'grief'], ['Taste', 'pungent'], ['Creature', 'the White Tiger']] },
  Water: { core: 'Storage', keys: ['winter', 'the deep', 'stillness', 'wisdom'], rep: [['Organ', 'kidneys'], ['Emotion', 'fear'], ['Taste', 'salty'], ['Creature', 'the Black Tortoise']] },
};
const ASP = {
  Conjunction: { core: 'Union', keys: ['fusion', 'the seed', 'one voice'], rep: [['Number', 'one'], ['Figure', 'the point']] },
  Opposition: { core: 'Polarity', keys: ['the mirror', 'the axis', 'the full moon'], rep: [['Number', 'two'], ['Figure', 'the line']] },
  Trine: { core: 'Harmony', keys: ['ease', 'flow', 'the gift'], rep: [['Number', 'three'], ['Figure', 'the triangle']] },
  Square: { core: 'Tension', keys: ['friction', 'the crossroads', 'the test'], rep: [['Number', 'four'], ['Figure', 'the square, the cross']] },
  Sextile: { core: 'Opportunity', keys: ['the opening', 'kinship', 'the offered hand'], rep: [['Number', 'six'], ['Figure', 'the hexagon']] },
  Quincunx: { core: 'Adjustment', keys: ['the misfit', 'the unease', 'the strain'], rep: [['Number', 'twelve'], ['Figure', 'five twelfths of the circle']] },
  Semisquare: { core: 'Irritation', keys: ['the half-friction', 'the itch'], rep: [['Number', 'eight'], ['Figure', 'the octagon']] },
  Sesquiquadrate: { core: 'Agitation', keys: ['the restless', 'the friction carried on'], rep: [['Number', 'eight'], ['Figure', 'three eighths of the circle']] },
};
const NAK_MEANING = [
  'The horse-born', 'The bearer', 'The cutters', 'The red one', 'The deer\'s head', 'The moist one', 'The light returning',
  'The nourisher', 'The embrace', 'The mighty', 'The former red one', 'The latter red one', 'The hand', 'The bright one',
  'The sword, the independent', 'The forked branch', 'Success that follows', 'The eldest', 'The root', 'The former invincible',
  'The latter invincible', 'The ear that hears', 'The wealthiest', 'A hundred healers', 'The former blessed feet',
  'The latter blessed feet', 'The wealthy',
];
const QUARTER = {
  'Azure Dragon': { core: 'The Rising East', keys: ['spring', 'wood', 'dawn', 'growth', 'the emperor'] },
  'Black Tortoise': { core: 'The Dark North', keys: ['winter', 'water', 'midnight', 'longevity', 'stillness'] },
  'White Tiger': { core: 'The Cutting West', keys: ['autumn', 'metal', 'dusk', 'war', 'judgement'] },
  'Vermilion Bird': { core: 'The Blazing South', keys: ['summer', 'fire', 'noon', 'renewal', 'the phoenix'] },
};

// Look up the symbolism for an entity built in symbolMap.js.
export function essenceOf(ent) {
  const n = ent.name;
  switch (ent.kind) {
    case 'planet': return P[n] || null;
    case 'sign': return S[n] || null;
    case 'const': { const id = ent.id.slice(6); const sign = S[{ Scorpius: 'Scorpio', Capricornus: 'Capricorn' }[id] || id];
      return { core: CONSTS[id], keys: sign && id !== 'Ophiuchus' ? sign.keys : ['healing', 'the serpent', 'medicine', 'the thirteenth'], rep: [], myth: id === 'Ophiuchus' ? 'Asclepius, the healer who learned to raise the dead, is struck down by Zeus and set among the stars holding the serpent.' : sign?.myth }; }
    case 'house': { const i = Number(ent.glyph) - 1; return { core: H[i][0], keys: H[i][1], rep: [] }; }
    case 'element': return EL[n] || null;
    case 'mode': return MODE[n] || null;
    case 'phase': return PH[n] || null;
    case 'asp': return ASP[n] || null;
    case 'nak': { const i = parseInt(ent.kindLabel.replace(/\D/g, ''), 10) - 1; return { core: NAK_MEANING[i], keys: [], rep: [] }; }
    case 'sym': return QUARTER[n] || null;
    case 'xiu': return { core: n, keys: [], rep: [] };
    case 'branch': return { core: ent.essence.split(',')[0], keys: [], rep: [] };
    default: return null;
  }
}
