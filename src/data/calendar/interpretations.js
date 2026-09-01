// Calendar-period attributions.
//
// Each entry names what a tradition has attributed to the period. The
// `attributed` field carries that; `advice` is kept as an alias so older
// components keep rendering, but nothing here instructs or forecasts.
// See docs/VOICE.md.

const withAlias = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === 'string' ? v : { ...v, advice: v.attributed },
    ])
  );

export const HEBREW_MONTH_DATA = withAlias({
  1:  { name: "Nisan",    theme: "Miracles & Redemption",      attributed: "The month of the Exodus, associated in the tradition with release from bondage and the start of the festal year." },
  2:  { name: "Iyar",     theme: "Healing & Introspection",    attributed: "Counted between Passover and Shavuot; the tradition associates it with healing and with the discipline of counting." },
  3:  { name: "Sivan",    theme: "Revelation & Unity",         attributed: "The month of Shavuot, associated with the giving of the Torah at Sinai and with the gathering of a people to receive it." },
  4:  { name: "Tammuz",   theme: "Sight & Vision",             attributed: "Named for a Mesopotamian deity; the tradition associates the month with the breach of the walls and with the faculty of sight." },
  5:  { name: "Av",       theme: "Consolation & Comfort",      attributed: "Holds Tisha B'Av, the fast marking the destruction of both Temples; the tradition pairs mourning with consolation in the same month." },
  6:  { name: "Elul",     theme: "Repentance & Preparation",   attributed: "The month preceding the High Holy Days, associated with self-examination and with the shofar sounded daily." },
  7:  { name: "Tishrei",  theme: "Judgment & Renewal",         attributed: "Holds Rosh Hashanah and Yom Kippur; the tradition reads it as the month of judgement and of the sealing of the year." },
  8:  { name: "Cheshvan", theme: "Silence & Rain",             attributed: "Sometimes called Mar Cheshvan, the bitter month, for holding no festival; associated with the onset of the rains." },
  9:  { name: "Kislev",   theme: "Faith & Dreams",             attributed: "Holds Hanukkah; associated with light kindled in the darkest part of the year." },
  10: { name: "Tevet",    theme: "Manifestation & Structure",  attributed: "Holds the fast of the Tenth of Tevet, marking the siege of Jerusalem; associated with constraint and with the body." },
  11: { name: "Shevat",   theme: "Rebirth & Sap",              attributed: "Holds Tu BiShvat, the new year of the trees, when the sap is held to begin rising." },
  12: { name: "Adar",     theme: "Joy & Transformation",       attributed: "Holds Purim; the tradition associates the month with reversal, concealment and increased joy." },
  13: { name: "Adar II",  theme: "Double Joy",                 attributed: "The intercalary month added in leap years to keep the lunar calendar aligned with the solar year." },
});

export const ISLAMIC_MONTH_DATA = withAlias({
  1:  { name: "Muharram",         theme: "Sacred Beginnings", attributed: "One of the four sacred months in which fighting is prohibited; holds Ashura." },
  2:  { name: "Safar",            theme: "Transition",        attributed: "The name has been read as 'empty'; pre-Islamic superstition treated it as inauspicious, a reading the tradition explicitly rejects." },
  3:  { name: "Rabi' al-Awwal",   theme: "Celebration",       attributed: "Associated with the birth of the Prophet; the name means the first spring." },
  4:  { name: "Rabi' al-Thani",   theme: "Consistency",       attributed: "The second spring; named for the season in which the month originally fell before the calendar drifted." },
  5:  { name: "Jumada al-Ula",    theme: "Foundation",        attributed: "The name refers to dry or frozen ground, from the season the month once occupied." },
  6:  { name: "Jumada al-Akhira", theme: "Completion",        attributed: "The second of the two Jumada months, closing that pair." },
  7:  { name: "Rajab",            theme: "Sowing Seeds",      attributed: "One of the four sacred months; associated in the tradition with the Isra and Mi'raj." },
  8:  { name: "Sha'ban",          theme: "Cultivation",       attributed: "The month preceding Ramadan; associated with preparation and with the night of Bara'ah." },
  9:  { name: "Ramadan",          theme: "Harvest & Fasting", attributed: "The month of the obligatory fast, associated with the first revelation of the Qur'an and with the Night of Decree." },
  10: { name: "Shawwal",          theme: "Elevation",         attributed: "Opens with Eid al-Fitr, marking the end of the fast." },
  11: { name: "Dhu al-Qi'dah",    theme: "Rest & Truce",      attributed: "One of the four sacred months; the name refers to sitting, to the cessation of travel and conflict." },
  12: { name: "Dhu al-Hijjah",    theme: "Sacrifice & Journey", attributed: "The month of the Hajj and of Eid al-Adha; the last of the four sacred months." },
});

export const EGYPTIAN_SEASON_DATA = withAlias({
  Akhet: { name: "Akhet (Inundation)", theme: "Flooding & Fertility", attributed: "The season of the Nile flood, when the fields lay under water and the silt was deposited that made them fertile." },
  Peret: { name: "Peret (Emergence)",  theme: "Growth & Planting",    attributed: "The season when the waters receded and the land emerged; the sowing season in the agricultural year." },
  Shemu: { name: "Shemu (Harvest)",    theme: "Heat & Harvest",       attributed: "The dry season of harvest and low water, before the flood returned." },
});

export const MAYAN_TZOLKIN_DATA = withAlias({
  Imix:     { power: "Nurturing",     theme: "Primal Source",         attributed: "The first day sign, associated with the primordial waters and with the earth as source." },
  Ik:       { power: "Breath",        theme: "Spirit & Communication", attributed: "Wind and breath; associated with speech and with the animating principle." },
  Akbal:    { power: "Intuition",     theme: "The Dreamtime",         attributed: "Night and the interior of the earth; associated with dream and with the house of darkness." },
  Kan:      { power: "Growth",        theme: "The Seed",              attributed: "The seed and ripening maize; associated with latent potential." },
  Chikchan: { power: "Life Force",    theme: "The Serpent",           attributed: "The serpent; associated with vital force moving through the body." },
  Kimi:     { power: "Release",       theme: "Death & Rebirth",       attributed: "Death as transition; associated with ancestors and with what is handed on." },
  Manik:    { power: "Completion",    theme: "The Deer",              attributed: "The deer and the grasping hand; associated with the hunt and with closure." },
  Lamat:    { power: "Harmony",       theme: "The Star",              attributed: "Venus as morning and evening star; associated with abundance and with rising and setting." },
  Muluk:    { power: "Purification",  theme: "The Water",             attributed: "Water and offering; associated with what is given and with immersion." },
  Ok:       { power: "Loyalty",       theme: "The Dog",               attributed: "The dog as guide of the dead; associated with companionship and with the road." },
  Chuwen:   { power: "Play",          theme: "The Monkey",            attributed: "The monkey as artisan and patron of craft; associated with making and with the thread of days." },
  Eb:       { power: "Wisdom",        theme: "The Human",             attributed: "The road and the human vessel; associated with the course a life takes." },
  Ben:      { power: "Authority",     theme: "The Reed",              attributed: "The reed and the growing maize stalk; associated with the axis joining sky and earth." },
  Ix:       { power: "Magic",         theme: "The Jaguar",            attributed: "The jaguar and the face of the earth; associated with the night and with concealed power." },
  Men:      { power: "Vision",        theme: "The Eagle",             attributed: "The eagle; associated with distance and with the elevated view." },
  Kib:      { power: "Grace",         theme: "The Warrior",           attributed: "The candle and the ancestors; associated with debt owed and with inherited counsel." },
  Kaban:    { power: "Synchronicity", theme: "The Earth",             attributed: "Earth and movement; associated with the tremor and with correspondence between events." },
  Etznab:   { power: "Discernment",   theme: "The Mirror",            attributed: "The obsidian blade and mirror; associated with the cut that separates and with reflection." },
  Kawak:    { power: "Storm",         theme: "Transformation",        attributed: "Storm and rain; associated with the thunder that breaks and the water that follows." },
  Ajaw:     { power: "Enlightenment", theme: "The Sun",               attributed: "The lord and the sun at zenith; the closing sign of the count." },
});

export const VEDIC_TITHI_DATA = {
  Pratipada:  "The first lunar day. The tradition associates it with beginnings and with what is newly set in motion.",
  Dwitiya:    "The second. Associated with pairing and with what is established between two parties.",
  Tritiya:    "The third. Associated with Gauri and with matters of beauty and prosperity.",
  Chaturthi:  "The fourth. Associated with Ganesha and with the removal of obstacles.",
  Panchami:   "The fifth. Associated with the Nagas and with learning.",
  Shashthi:   "The sixth. Associated with Kartikeya and with contest and discipline.",
  Saptami:    "The seventh. Associated with Surya and with clarity and light.",
  Ashtami:    "The eighth. Associated with Durga and with contained force.",
  Navami:     "The ninth. Associated with Durga in her fierce aspect and with difficult undertakings.",
  Dashami:    "The tenth. Associated with completion and with victory in the classical texts.",
  Ekadashi:   "The eleventh. The principal fasting day in Vaishnava practice.",
  Dwadashi:   "The twelfth. Associated with the breaking of the Ekadashi fast and with giving.",
  Trayodashi: "The thirteenth. Holds Pradosha, associated with Shiva and with rejuvenation.",
  Chaturdashi:"The fourteenth. Associated with intensity and with rites of release.",
  "Purnima/Amavasya": "The fifteenth: full moon or new moon. Purnima is the completed phase, Amavasya the dark conjunction of Sun and Moon.",
};
