// 27 Nakshatras — the lunar mansions of Vedic astrology.
// Each occupies 13°20' of the sidereal zodiac, starting from 0° Aries.
//
// Fields: name (Sanskrit), lord (Vimshottari ruler), deity, symbol,
//   gana (Deva/Manushya/Rakshasa — divine/human/demonic temperament),
//   varga (caste-class designation), nature (single line on essential theme).

export const NAKSHATRA_INFO = [
  { name: "Ashwini",            lord: "Ketu",    deity: "Ashwini Kumaras (twin healers)",  symbol: "Horse's head",        gana: "Deva",     varga: "Vaishya",   nature: "Swift initiation. Healers, sudden movement, the fresh start." },
  { name: "Bharani",            lord: "Venus",   deity: "Yama (god of death)",             symbol: "Yoni (the bearer)",   gana: "Manushya", varga: "Mleccha",   nature: "The burden carried. Restraint, gestation, the threshold of life and death." },
  { name: "Krittika",           lord: "Sun",     deity: "Agni (fire)",                     symbol: "Razor / flame",       gana: "Rakshasa", varga: "Brahmin",   nature: "Cutting fire. Purification, sharpness, the burn that clears." },
  { name: "Rohini",             lord: "Moon",    deity: "Brahma (creator)",                symbol: "Chariot / banyan",    gana: "Manushya", varga: "Shudra",    nature: "Fertile beauty. Growth, sensuality, the favoured one." },
  { name: "Mrigashira",         lord: "Mars",    deity: "Soma (moon-nectar)",              symbol: "Deer's head",         gana: "Deva",     varga: "Kshatriya", nature: "The seeker. Restless searching, gentle curiosity, never quite arriving." },
  { name: "Ardra",              lord: "Rahu",    deity: "Rudra (storm)",                   symbol: "Teardrop / diamond",  gana: "Manushya", varga: "Butcher",   nature: "Tears that cleanse. Storms, transformation through grief, the breakthrough." },
  { name: "Punarvasu",          lord: "Jupiter", deity: "Aditi (mother of gods)",          symbol: "Bow / quiver",        gana: "Deva",     varga: "Vaishya",   nature: "Return of light. Renewal after loss, generosity, the second chance." },
  { name: "Pushya",             lord: "Saturn",  deity: "Brihaspati (teacher)",            symbol: "Cow's udder / flower",gana: "Deva",     varga: "Kshatriya", nature: "Nourishment. Steady wisdom, providing, the most auspicious mansion." },
  { name: "Ashlesha",           lord: "Mercury", deity: "Nagas (serpents)",                symbol: "Coiled serpent",      gana: "Rakshasa", varga: "Mleccha",   nature: "Hypnotic embrace. Hidden depth, entanglement, the serpent's wisdom." },
  { name: "Magha",              lord: "Ketu",    deity: "Pitris (ancestors)",              symbol: "Throne / palanquin",  gana: "Rakshasa", varga: "Shudra",    nature: "Ancestral throne. Heritage, dignity, the weight of lineage." },
  { name: "Purva Phalguni",     lord: "Venus",   deity: "Bhaga (delight)",                 symbol: "Front of a bed",      gana: "Manushya", varga: "Brahmin",   nature: "Pleasure earned. Romance, indulgence, the lounge before the work." },
  { name: "Uttara Phalguni",    lord: "Sun",     deity: "Aryaman (patronage)",             symbol: "Back of a bed",       gana: "Manushya", varga: "Kshatriya", nature: "Generous repose. Patronage, contracts honoured, the trustworthy ally." },
  { name: "Hasta",              lord: "Moon",    deity: "Savitar (impeller)",              symbol: "Open hand",           gana: "Deva",     varga: "Vaishya",   nature: "Skilful hand. Craft, dexterity, what you make with your own fingers." },
  { name: "Chitra",             lord: "Mars",    deity: "Vishvakarma (cosmic architect)",  symbol: "Bright jewel",        gana: "Rakshasa", varga: "Vaishya",   nature: "Sparkling architecture. Brilliance, design, the eye-catching form." },
  { name: "Swati",              lord: "Rahu",    deity: "Vayu (wind)",                     symbol: "Young shoot / coral", gana: "Deva",     varga: "Butcher",   nature: "Independent breeze. Solo, scattered, the one who can't be tied down." },
  { name: "Vishakha",           lord: "Jupiter", deity: "Indra & Agni",                    symbol: "Forked branch / arch",gana: "Rakshasa", varga: "Mleccha",   nature: "Focused goal. Ambition, two paths, the determined climb." },
  { name: "Anuradha",           lord: "Saturn",  deity: "Mitra (friendship)",              symbol: "Lotus / triumphal arch", gana:"Deva",   varga: "Shudra",    nature: "Devoted alliance. Loyal companionship, the work done with friends." },
  { name: "Jyeshtha",           lord: "Mercury", deity: "Indra (king of gods)",            symbol: "Earring / umbrella",  gana: "Rakshasa", varga: "Butcher",   nature: "The eldest. Authority earned by suffering, protection, isolation at the top." },
  { name: "Mula",               lord: "Ketu",    deity: "Nirriti (dissolution)",           symbol: "Bound roots",         gana: "Rakshasa", varga: "Butcher",   nature: "Root-uprooting. Going to the source, dismantling, the foundation laid bare." },
  { name: "Purva Ashadha",      lord: "Venus",   deity: "Apas (waters)",                   symbol: "Hand-fan / winnowing",gana: "Manushya", varga: "Brahmin",   nature: "Early victory. Invincible momentum, the confident first move." },
  { name: "Uttara Ashadha",     lord: "Sun",     deity: "Vishve Devas (ten gods)",         symbol: "Elephant's tusk",     gana: "Manushya", varga: "Kshatriya", nature: "Lasting victory. The win that endures, statesmanship, righteous strength." },
  { name: "Shravana",           lord: "Moon",    deity: "Vishnu (preserver)",              symbol: "Three footsteps / ear", gana:"Deva",    varga: "Mleccha",   nature: "Sacred listening. The one who hears, devotion through attention, preservation." },
  { name: "Dhanishta",          lord: "Mars",    deity: "Eight Vasus (riches)",            symbol: "Drum / flute",        gana: "Rakshasa", varga: "Shudra",    nature: "Rhythmic abundance. Music, prosperity, the beat that pulls a crowd." },
  { name: "Shatabhisha",        lord: "Rahu",    deity: "Varuna (cosmic waters)",          symbol: "Empty circle / 100 healers", gana:"Rakshasa", varga:"Butcher", nature: "Hundred remedies. Healing, secrecy, the veil that hides the cure." },
  { name: "Purva Bhadrapada",   lord: "Jupiter", deity: "Aja Ekapada (one-footed serpent)",symbol: "Front of funeral cot",gana: "Manushya", varga: "Brahmin",   nature: "Fierce austerity. The intensity that scorches, fire-walker, the spiritual warrior." },
  { name: "Uttara Bhadrapada",  lord: "Saturn",  deity: "Ahir Budhnya (depths serpent)",   symbol: "Back of funeral cot", gana: "Manushya", varga: "Kshatriya", nature: "Cosmic depth. The serpent in the well, equanimity through suffering." },
  { name: "Revati",             lord: "Mercury", deity: "Pushan (shepherd)",               symbol: "Fish / drum",         gana: "Deva",     varga: "Shudra",    nature: "Safe passage. The shepherd who guides souls across, gentle endings, completion." },
];

// Index helpers
export const NAK_BY_LORD = NAKSHATRA_INFO.reduce((acc, n, i) => {
  if (!acc[n.lord]) acc[n.lord] = [];
  acc[n.lord].push({ ...n, idx: i });
  return acc;
}, {});

// Dasha lord meanings (short summary of what each ruling-period emphasises)
export const DASHA_THEME = {
  Ketu:    { years: 7,  theme: "Letting go, spiritual detachment, the past surfacing for release." },
  Venus:   { years: 20, theme: "Relationships, pleasure, art, partnership, the long sweet work." },
  Sun:     { years: 6,  theme: "Authority, visibility, the self stepping forward." },
  Moon:    { years: 10, theme: "Emotional foundation, home, the inner life maturing." },
  Mars:    { years: 7,  theme: "Action, conflict resolved, ambition put into form." },
  Rahu:    { years: 18, theme: "Worldly desire, foreign influence, the chase that consumes." },
  Jupiter: { years: 16, theme: "Wisdom, teaching, expansion, faith made practical." },
  Saturn:  { years: 19, theme: "Discipline, the long road, what endures through hardship." },
  Mercury: { years: 17, theme: "Communication, analysis, the network growing." },
};

export const RASHI_INFO = [
  { name: "Mesha (Aries)",      lord: "Mars",    element: "Fire",  quality: "Movable",  body: "Head" },
  { name: "Vrishabha (Taurus)", lord: "Venus",   element: "Earth", quality: "Fixed",    body: "Face" },
  { name: "Mithuna (Gemini)",   lord: "Mercury", element: "Air",   quality: "Dual",     body: "Chest, arms" },
  { name: "Karka (Cancer)",     lord: "Moon",    element: "Water", quality: "Movable",  body: "Heart" },
  { name: "Simha (Leo)",        lord: "Sun",     element: "Fire",  quality: "Fixed",    body: "Stomach" },
  { name: "Kanya (Virgo)",      lord: "Mercury", element: "Earth", quality: "Dual",     body: "Hips, lower belly" },
  { name: "Tula (Libra)",       lord: "Venus",   element: "Air",   quality: "Movable",  body: "Pelvis" },
  { name: "Vrishchika (Scorpio)",lord:"Mars",    element: "Water", quality: "Fixed",    body: "Genitals" },
  { name: "Dhanu (Sagittarius)",lord: "Jupiter", element: "Fire",  quality: "Dual",     body: "Thighs" },
  { name: "Makara (Capricorn)", lord: "Saturn",  element: "Earth", quality: "Movable",  body: "Knees" },
  { name: "Kumbha (Aquarius)",  lord: "Saturn",  element: "Air",   quality: "Fixed",    body: "Calves" },
  { name: "Meena (Pisces)",     lord: "Jupiter", element: "Water", quality: "Dual",     body: "Feet" },
];
