// Hebrew months ordered from religious new year (Nisan).
// The 19-year Metonic cycle has 7 leap years (years 3,6,8,11,14,17,19)
// which add Adar II (אדר ב׳) as a 13th month.
// Civil new year begins at Tishrei (month 7 in religious count).
export const HEBREW_LUNAR_MONTHS = [
  {
    n:1, heb:"ניסן", en:"Nisan", zodiac:"Aries",
    greg:"March–April", days:"30",
    civilMonth:7,
    holidays:[
      { name:"Passover (Pesach)", day:"15–22", type:"major" },
      { name:"Yom HaShoah", day:"27", type:"memorial" },
    ],
    note:"First month of the religious year. The Exodus from Egypt."
  },
  {
    n:2, heb:"אייר", hebAlt:"איר", en:"Iyar", zodiac:"Taurus",
    greg:"April–May", days:"29",
    civilMonth:8,
    holidays:[
      { name:"Pesach Sheni", day:"14", type:"minor" },
      { name:"Lag BaOmer", day:"18", type:"minor" },
      { name:"Yom HaZikaron", day:"4", type:"memorial" },
      { name:"Yom HaAtzma'ut", day:"5", type:"national" },
    ],
    note:"Month of healing. Counting of the Omer continues."
  },
  {
    n:3, heb:"סיון", en:"Sivan", zodiac:"Gemini",
    greg:"May–June", days:"30",
    civilMonth:9,
    holidays:[
      { name:"Shavuot", day:"6–7", type:"major" },
    ],
    note:"Revelation at Sinai. Giving of the Torah."
  },
  {
    n:4, heb:"תמוז", en:"Tammuz", zodiac:"Cancer",
    greg:"June–July", days:"29",
    civilMonth:10,
    holidays:[
      { name:"Fast of the 17th of Tammuz", day:"17", type:"fast" },
    ],
    note:"Beginning of the Three Weeks of mourning."
  },
  {
    n:5, heb:"אב", en:"Av", zodiac:"Leo",
    greg:"July–August", days:"30",
    civilMonth:11,
    holidays:[
      { name:"Tisha B'Av", day:"9", type:"fast" },
      { name:"Tu B'Av", day:"15", type:"minor" },
    ],
    note:"Destruction of both Temples. Tu B'Av celebrates love and renewal."
  },
  {
    n:6, heb:"אלול", en:"Elul", zodiac:"Virgo",
    greg:"August–September", days:"29",
    civilMonth:12,
    holidays:[],
    note:"Month of repentance and preparation for the High Holy Days. The shofar is blown daily."
  },
  {
    n:7, heb:"תשרי", en:"Tishrei", zodiac:"Libra",
    greg:"September–October", days:"30",
    civilMonth:1,
    holidays:[
      { name:"Rosh Hashanah", day:"1–2", type:"major" },
      { name:"Fast of Gedaliah", day:"3", type:"fast" },
      { name:"Yom Kippur", day:"10", type:"major" },
      { name:"Sukkot", day:"15–21", type:"major" },
      { name:"Shemini Atzeret", day:"22", type:"major" },
      { name:"Simchat Torah", day:"23", type:"major" },
    ],
    note:"Civil new year. The most holiday-dense month. Judgement and joy."
  },
  {
    n:8, heb:"חשון", en:"Cheshvan", zodiac:"Scorpio",
    greg:"October–November", days:"29–30",
    civilMonth:2,
    holidays:[],
    note:"Also called Marcheshvan. The only month with no holidays or fasts — a 'bitter' month."
  },
  {
    n:9, heb:"כסלו", en:"Kislev", zodiac:"Sagittarius",
    greg:"November–December", days:"29–30",
    civilMonth:3,
    holidays:[
      { name:"Chanukah", day:"25–30+", type:"major" },
    ],
    note:"Festival of Lights begins. Chanukah extends into Tevet."
  },
  {
    n:10, heb:"טבת", en:"Tevet", zodiac:"Capricorn",
    greg:"December–January", days:"29",
    civilMonth:4,
    holidays:[
      { name:"Asara B'Tevet", day:"10", type:"fast" },
    ],
    note:"Chanukah concludes. Fast commemorates the siege of Jerusalem."
  },
  {
    n:11, heb:"שבט", en:"Shevat", zodiac:"Aquarius",
    greg:"January–February", days:"30",
    civilMonth:5,
    holidays:[
      { name:"Tu BiShvat", day:"15", type:"minor" },
    ],
    note:"New Year for Trees. Earliest almond blossoms in the Land of Israel."
  },
  {
    n:12, heb:"אדר", en:"Adar", zodiac:"Pisces",
    greg:"February–March", days:"29",
    civilMonth:6,
    holidays:[
      { name:"Fast of Esther", day:"13", type:"fast" },
      { name:"Purim", day:"14", type:"major" },
    ],
    note:"Month of joy. 'When Adar enters, joy increases.' 9 Adar marks the traditional date of the first dispute between the schools of Hillel and Shammai. In leap years this becomes Adar I."
  },
  {
    n:13, heb:"אדר ב׳", hebAlt:"ואדר", en:"Adar II", zodiac:"Pisces",
    greg:"(leap years only)", days:"29",
    civilMonth:7,
    holidays:[
      { name:"Fast of Esther", day:"13", type:"fast" },
      { name:"Purim", day:"14", type:"major" },
    ],
    leapOnly:true,
    note:"Added in 7 of every 19 years (years 3,6,8,11,14,17,19 of the Metonic cycle). Purim and Fast of Esther move to Adar II in leap years. Also written ואדר (VeAdar)."
  },
];

export const HEBREW_CALENDAR_INFO = {
  name: "Jewish (Hebrew) Calendar",
  type: "Lunisolar",
  epoch: "Anno Mundi — years counted from traditional creation (3761 BCE)",
  newDay: "Sunset (a new Hebrew day begins at sunset, not midnight)",
  religiousNewYear: "1 Nisan (spring)",
  civilNewYear: "1 Tishrei (autumn — Rosh Hashanah)",
  leapCycle: "19-year Metonic cycle with 7 leap years (adding Adar II)",
  leapYears: [3, 6, 8, 11, 14, 17, 19],
  monthLength: "Lunar-based, 29–30 days per month",
  yearLength: { regular:"353–355 days", leap:"383–385 days" },
  currentYear: 5786,
  currentYearGregorian: "October 2025 – September 2026",
  isCurrentLeap: false,
  nextLeapYear: { hebrew:5787, begins:"Evening of Fri, Sep 11, 2026" },
};

export const EGYPTIAN_MONTHS = [
  {n:1, name:"Thuthi",    deity:"Thoth"},
  {n:2, name:"Paopi",     deity:"Hapi"},
  {n:3, name:"Athyr",     deity:"Hathor"},
  {n:4, name:"Choiak",    deity:"Ka-Her-Ka"},
  {n:5, name:"Tybi",      deity:"Shef-Bedet"},
  {n:6, name:"Mechir",    deity:"Rekh-Ur"},
  {n:7, name:"Phamenoth", deity:"Amenhotep"},
  {n:8, name:"Pharmuthi", deity:"Renenutet"},
  {n:9, name:"Pachons",   deity:"Khonsu"},
  {n:10,name:"Payni",     deity:"Khent"},
  {n:11,name:"Epiphi",    deity:"Ipet-Hemet"},
  {n:12,name:"Mesore",    deity:"Re-Horakhty"},
];

// ════════════════════════════════════════════════════════════════════
// Hindu (Panchanga) Calendar
// ════════════════════════════════════════════════════════════════════

export const HINDU_MONTHS = [
  {
    n:1, san:"चैत्र", en:"Chaitra", greg:"March–April",
    ritu:"Vasanta (Spring)", rituSan:"वसन्त", days:"29–30",
    festivals:[
      { name:"Ugadi / Gudi Padwa", day:"1", type:"new year" },
      { name:"Rama Navami", day:"9", type:"major" },
      { name:"Hanuman Jayanti", day:"15 (Purnima)", type:"major" },
    ],
    note:"First month of the religious year. New Year for many regional calendars (Ugadi in the south, Gudi Padwa in Maharashtra)."
  },
  {
    n:2, san:"वैशाख", en:"Vaisakha", greg:"April–May",
    ritu:"Vasanta (Spring)", rituSan:"वसन्त", days:"29–30",
    festivals:[
      { name:"Akshaya Tritiya", day:"3", type:"auspicious" },
      { name:"Vaisakhi / Baisakhi", day:"1 (solar)", type:"harvest" },
      { name:"Buddha Purnima", day:"15 (Purnima)", type:"major" },
    ],
    note:"Sacred bathing month. Akshaya Tritiya is considered the most auspicious day."
  },
  {
    n:3, san:"ज्येष्ठ", en:"Jyeshtha", greg:"May–June",
    ritu:"Grishma (Summer)", rituSan:"ग्रीष्म", days:"29–30",
    festivals:[
      { name:"Vat Savitri Vrat", day:"Amavasya", type:"observance" },
      { name:"Ganga Dussehra", day:"10", type:"major" },
    ],
    note:"Hottest month. Ganga Dussehra celebrates the descent of the Ganges."
  },
  {
    n:4, san:"आषाढ", en:"Ashadha", greg:"June–July",
    ritu:"Grishma (Summer)", rituSan:"ग्रीष्म", days:"29–30",
    festivals:[
      { name:"Guru Purnima", day:"15 (Purnima)", type:"major" },
      { name:"Rath Yatra", day:"2 (Shukla Dwitiya)", type:"major" },
      { name:"Devshayani Ekadashi", day:"11", type:"ekadashi" },
    ],
    note:"Onset of monsoon. Chaturmas (four holy months) begins with Devshayani Ekadashi."
  },
  {
    n:5, san:"श्रावण", en:"Shravana", greg:"July–August",
    ritu:"Varsha (Monsoon)", rituSan:"वर्षा", days:"29–30",
    festivals:[
      { name:"Naga Panchami", day:"5", type:"major" },
      { name:"Raksha Bandhan", day:"15 (Purnima)", type:"major" },
    ],
    note:"Holiest month for Shiva worship. Monday fasts (Shravan Somvar) widely observed."
  },
  {
    n:6, san:"भाद्रपद", en:"Bhadrapada", greg:"August–September",
    ritu:"Varsha (Monsoon)", rituSan:"वर्षा", days:"29–30",
    festivals:[
      { name:"Krishna Janmashtami", day:"8 (Krishna Ashtami)", type:"major" },
      { name:"Ganesh Chaturthi", day:"4 (Shukla Chaturthi)", type:"major" },
      { name:"Onam", day:"Thiruvonam nakshatra", type:"regional" },
      { name:"Anant Chaturdashi", day:"14", type:"major" },
    ],
    note:"Month of Krishna's birth and Ganesha's arrival. Immense devotional energy."
  },
  {
    n:7, san:"अश्विन", en:"Ashvina", greg:"September–October",
    ritu:"Sharad (Autumn)", rituSan:"शरद्", days:"29–30",
    festivals:[
      { name:"Navratri", day:"1–9", type:"major" },
      { name:"Durga Puja", day:"6–10", type:"major" },
      { name:"Vijayadashami / Dussehra", day:"10", type:"major" },
      { name:"Sharad Purnima", day:"15 (Purnima)", type:"auspicious" },
    ],
    note:"Nine nights of the Goddess. Triumph of good over evil (Dussehra)."
  },
  {
    n:8, san:"कार्तिक", en:"Kartika", greg:"October–November",
    ritu:"Sharad (Autumn)", rituSan:"शरद्", days:"29–30",
    festivals:[
      { name:"Karva Chauth", day:"4 (Krishna Chaturthi)", type:"observance" },
      { name:"Dhanteras", day:"13 (Krishna Trayodashi)", type:"major" },
      { name:"Diwali / Lakshmi Puja", day:"Amavasya", type:"major" },
      { name:"Govardhan Puja", day:"1 (Shukla Pratipada)", type:"major" },
      { name:"Bhai Dooj", day:"2 (Shukla Dwitiya)", type:"major" },
      { name:"Chhath Puja", day:"6 (Shukla Shashthi)", type:"regional" },
      { name:"Dev Prabodhini Ekadashi", day:"11", type:"ekadashi" },
    ],
    note:"Festival of Lights. Chaturmas ends. Kartik Purnima sacred for Vishnu and Shiva."
  },
  {
    n:9, san:"मार्गशीर्ष", en:"Margashirsha", altEn:"Agrahayana", greg:"November–December",
    ritu:"Hemanta (Pre-winter)", rituSan:"हेमन्त", days:"29–30",
    festivals:[
      { name:"Geeta Jayanti", day:"11 (Mokshada Ekadashi)", type:"major" },
    ],
    note:"Krishna declares in the Bhagavad Gita: 'Of months, I am Margashirsha.' Considered the best month for meditation."
  },
  {
    n:10, san:"पौष", en:"Pausha", greg:"December–January",
    ritu:"Hemanta (Pre-winter)", rituSan:"हेमन्त", days:"29–30",
    festivals:[
      { name:"Makar Sankranti / Pongal", day:"~14 Jan (solar)", type:"major" },
      { name:"Lohri", day:"~13 Jan (solar)", type:"regional" },
    ],
    note:"Winter solstice transit. Sun enters Makara (Capricorn). Harvest festivals across India."
  },
  {
    n:11, san:"माघ", en:"Magha", greg:"January–February",
    ritu:"Shishira (Winter)", rituSan:"शिशिर", days:"29–30",
    festivals:[
      { name:"Mauni Amavasya", day:"Amavasya", type:"auspicious" },
      { name:"Vasant Panchami / Saraswati Puja", day:"5 (Shukla Panchami)", type:"major" },
      { name:"Thaipusam", day:"Purnima", type:"regional" },
    ],
    note:"Sacred bathing at Triveni Sangam. Vasant Panchami marks the arrival of spring."
  },
  {
    n:12, san:"फाल्गुन", en:"Phalguna", greg:"February–March",
    ritu:"Shishira (Winter)", rituSan:"शिशिर", days:"29–30",
    festivals:[
      { name:"Maha Shivaratri", day:"13/14 (Krishna Chaturdashi)", type:"major" },
      { name:"Holika Dahan", day:"14 (Purnima eve)", type:"major" },
      { name:"Holi", day:"15 (Purnima)", type:"major" },
    ],
    note:"Month of colour and devotion. Shivaratri is the great night of Shiva. Holi celebrates the triumph of devotion."
  },
];

export const HINDU_LEAP_MONTH = {
  san: "अधिकमास",
  en: "Adhika-masa",
  altSan: "पुरुषोत्तममास",
  altEn: "Purushottama-masa",
  note: "An intercalary month inserted approximately every 32.5 months to synchronise the lunar calendar with the solar year. Considered sacred to Vishnu as Purushottama. The last Adhik Maas occurred in 2023 (Savana Maas); the next falls in the coming Hindu year.",
};

export const HINDU_RITUS = [
  { san:"वसन्त", en:"Vasanta", meaning:"Spring", months:["Chaitra","Vaisakha"] },
  { san:"ग्रीष्म", en:"Grishma", meaning:"Summer", months:["Jyeshtha","Ashadha"] },
  { san:"वर्षा", en:"Varsha", meaning:"Monsoon", months:["Shravana","Bhadrapada"] },
  { san:"शरद्", en:"Sharad", meaning:"Autumn", months:["Ashvina","Kartika"] },
  { san:"हेमन्त", en:"Hemanta", meaning:"Pre-winter", months:["Margashirsha","Pausha"] },
  { san:"शिशिर", en:"Shishira", meaning:"Winter", months:["Magha","Phalguna"] },
];

export const HINDU_CALENDAR_INFO = {
  name: "Panchāngam (पञ्चाङ्गम्)",
  altNames: ["Panchang", "Panjika (Eastern India)"],
  meaning: "Five limbs — Tithi, Vaar, Nakshatra, Yoga, Karana",
  type: "Lunisolar",
  eraCalendars: ["Vikram Samvat", "Shalivahana Shaka"],
  monthStart: "New Moon (Amanta) or Full Moon (Purnimanta), varies by region",
  fiveLimbs: {
    tithi: "Lunar day — 30 tithis per lunar month (15 Shukla + 15 Krishna)",
    vara: "Weekday — Ravivara (Sun), Somavara (Mon), Mangalavara (Tue), Buddhavara (Wed), Guruvara (Thu), Shukravara (Fri), Shanivara (Sat)",
    nakshatra: "Lunar mansion — 27 nakshatras the Moon transits through",
    yoga: "Sun-Moon angular relationship — 27 yogas",
    karana: "Half-tithi — 11 karana types cycling through 60 per month",
  },
  seasons: 6,
  leapMonth: "Adhika-masa (~every 32.5 months)",
  currentSamvat: 2082,
  currentSamvatGregorian: "March 2025 – March 2026",
  note: "Panchang details vary by geographical location. Two main month-reckoning systems: Amanta (new-moon ending, used in South/West India) and Purnimanta (full-moon ending, used in North India).",
};

// ════════════════════════════════════════════════════════════════════
// Athenian (Attic) Lunar Calendar
// ════════════════════════════════════════════════════════════════════

export const ATHENIAN_MONTHS = [
  {
    n:1, gk:"Ἑκατομβαιών", en:"Hekatombaiōn", greg:"July–August",
    days:"29–30",
    festivals:[
      { name:"Panathenaia", type:"major" },
      { name:"Kronia", type:"festival" },
      { name:"Synoikia", type:"civic" },
    ],
    note:"First month. Named for the great hecatomb (hundred-ox sacrifice). The Greater Panathenaia was celebrated every 4 years."
  },
  {
    n:2, gk:"Μεταγειτνιών", en:"Metageitniōn", greg:"August–September",
    days:"29–30",
    festivals:[
      { name:"Metageitnia", type:"festival" },
    ],
    note:"Month of 'changing neighbours.' Festival honoured Apollo Metageitnios."
  },
  {
    n:3, gk:"Βοηδρομιών", en:"Boëdromiōn", greg:"September–October",
    days:"29–30",
    festivals:[
      { name:"Eleusinian Mysteries (Greater)", type:"major" },
      { name:"Genesia", type:"ancestral" },
      { name:"Demokratia", type:"civic" },
    ],
    note:"Named for the 'running to aid' war-cry. The Greater Mysteries at Eleusis were the most sacred rites in the Greek world."
  },
  {
    n:4, gk:"Πυανεψιών", en:"Pyanepsiōn", greg:"October–November",
    days:"29–30",
    festivals:[
      { name:"Pyanepsia", type:"festival" },
      { name:"Thesmophoria", type:"major" },
      { name:"Apaturia", type:"phratry" },
      { name:"Oschophoria", type:"festival" },
    ],
    note:"Named for the bean-stew offering to Apollo. Thesmophoria was a women-only fertility rite for Demeter."
  },
  {
    n:5, gk:"Μαιμακτηριών", en:"Maimaktēriōn", greg:"November–December",
    days:"29–30",
    festivals:[
      { name:"Maimakteria", type:"propitiatory" },
    ],
    note:"Month of storms. Named for Zeus Maimaktes ('the Blustering'). Propitiatory sacrifices for mild weather."
  },
  {
    n:6, gk:"Ποσειδεών", en:"Poseideōn", greg:"December–January",
    days:"29–30",
    festivals:[
      { name:"Poseidea", type:"festival" },
      { name:"Rural Dionysia", type:"major" },
      { name:"Haloa", type:"mystery" },
    ],
    leapDoubled:true,
    note:"Sacred to Poseidon. The Rural Dionysia featured dramatic performances in demes. This month was doubled (Poseideon I & II) in leap years."
  },
  {
    n:7, gk:"Γαμηλιών", en:"Gamēliōn", greg:"January–February",
    days:"29–30",
    festivals:[
      { name:"Gamelia", type:"marriage" },
      { name:"Lenaia", type:"major" },
    ],
    note:"Month of marriages. The Lenaia was a festival of Dionysus with dramatic competitions."
  },
  {
    n:8, gk:"Ἀνθεστηριών", en:"Anthestēriōn", greg:"February–March",
    days:"29–30",
    festivals:[
      { name:"Anthesteria", type:"major" },
      { name:"Diasia", type:"festival" },
    ],
    note:"Month of flowers. The three-day Anthesteria was Dionysus' oldest festival — Pithoigia (jar opening), Choës (libations), Chytroi (pots for the dead)."
  },
  {
    n:9, gk:"Ἐλαφηβολιών", en:"Elaphēboliōn", greg:"March–April",
    days:"29–30",
    festivals:[
      { name:"City Dionysia (Greater Dionysia)", type:"major" },
      { name:"Elaphebolia", type:"festival" },
      { name:"Asclepieia", type:"healing" },
    ],
    note:"Named for the deer-hunt of Artemis. The City Dionysia was Athens' greatest dramatic festival — premieres of tragedies and comedies by Aeschylus, Sophocles, Euripides, Aristophanes."
  },
  {
    n:10, gk:"Μουνιχιών", en:"Mounichiōn", greg:"April–May",
    days:"29–30",
    festivals:[
      { name:"Mounichia", type:"festival" },
      { name:"Brauronia", type:"quadrennial" },
      { name:"Olympieia", type:"festival" },
    ],
    note:"Sacred to Artemis Mounichia (of the harbour). Brauronia honoured Artemis at Brauron every 4 years."
  },
  {
    n:11, gk:"Θαργηλιών", en:"Thargēliōn", greg:"May–June",
    days:"29–30",
    festivals:[
      { name:"Thargelia", type:"major" },
      { name:"Kallynteria", type:"purification" },
      { name:"Plynteria", type:"purification" },
    ],
    note:"Festival of first-fruits for Apollo and Artemis. Plynteria involved washing the ancient wooden statue of Athena — an ill-omened day."
  },
  {
    n:12, gk:"Σκιροφοριών", en:"Skirophoriōn", greg:"June–July",
    days:"29–30",
    festivals:[
      { name:"Skira / Skirophoria", type:"major" },
      { name:"Bouphonia (Dipoleia)", type:"ancient" },
      { name:"Arrephoria", type:"mystery" },
    ],
    note:"Last month. Skirophoria was a women's fertility rite. Bouphonia was an ancient ox-killing ritual for Zeus Polieus. Arrephoria involved the secret night-journey of two young girls for Athena."
  },
];

export const ATHENIAN_CALENDAR_INFO = {
  name: "Athenian (Attic) Lunar Calendar",
  type: "Lunisolar",
  yearStart: "First new moon after the summer solstice (approximately July)",
  monthLength: "Alternating 29 and 30 days following the lunar cycle (synodic month ~29.53 days)",
  leapMechanism: "Intercalary 13th month — usually a second Poseideon (Ποσειδεών I & II) — inserted roughly every 3 years (7 times in 19 years, Metonic cycle)",
  leapYearLength: "~384 days",
  regularYearLength: "~354 days",
  reference: "https://www.hellenion.org/calendar/",
  note: "The Athenian calendar was the civic calendar of Athens. Months were named after major religious festivals. An archon decided intercalation based on observation, not a fixed formula. The parallel 'conciliar' (prytany) calendar divided the year into 10 periods for political purposes.",
};

// ════════════════════════════════════════════════════════════════════
// 16 Kalas — Hindu Metaphysical Hierarchy
// Connected to Panchanga through the cosmological framework of prana
// units, divine qualities (Krishna's Kalas), and stages of consciousness.
// ════════════════════════════════════════════════════════════════════

export const SIXTEEN_KALAS = [
  {
    n:1, realm:"Physical",
    prana:"Earth", pranaNote:"Material foundation",
    krishna1:"Daya", krishna1En:"Compassion",
    krishna2:"Annamaya", krishna2En:"Seed-born (food)",
    beings:"Minerals, soil, stone",
  },
  {
    n:2, realm:"Physical",
    prana:"Water", pranaNote:"Fluidity and cohesion",
    krishna1:"Dharjya", krishna1En:"Patience",
    krishna2:"Pranamaya", krishna2En:"Water-born (breath)",
    beings:"Oceans, rivers, rain",
  },
  {
    n:3, realm:"Physical",
    prana:"Fire", pranaNote:"Transformation and digestion",
    krishna1:"Kshama", krishna1En:"Forgiveness",
    krishna2:"Manomaya", krishna2En:"Egg-born (mind)",
    beings:"Solar fire, metabolic fire, lightning",
  },
  {
    n:4, realm:"Physical",
    prana:"Air", pranaNote:"Movement and vitality",
    krishna1:"Nyaya", krishna1En:"Justice",
    krishna2:"Vigyanamaya", krishna2En:"Womb-born (intellect)",
    beings:"Wind, breath, atmosphere",
  },
  {
    n:5, realm:"Physical",
    prana:"Aether / Spirit", pranaNote:"Space, the container of all",
    krishna1:"Nirapeksha", krishna1En:"Impartiality",
    krishna2:"Anandamaya", krishna2En:"Reborn (joy)",
    beings:"Akasha — the substratum",
  },
  {
    n:6, realm:"Physical",
    prana:"Trees / Plants", pranaNote:"Vegetative life-force",
    krishna1:"Niraskata", krishna1En:"Detachment",
    krishna2:"Atishayini", krishna2En:"Peace",
    beings:"Flora — rooted consciousness",
  },
  {
    n:7, realm:"Physical",
    prana:"Animals", pranaNote:"Instinctual consciousness",
    krishna1:"Tapasya", krishna1En:"Meditation & Spiritual Powers",
    krishna2:"Viparinabhini", krishna2En:"Love",
    beings:"Fauna — sentient creatures",
  },
  {
    n:8, realm:"Physical",
    prana:"Humans", pranaNote:"Self-aware consciousness",
    krishna1:"Aparchitta", krishna1En:"Invincibility",
    krishna2:"Sankramini", krishna2En:"Creator",
    beings:"Mankind — capable of moksha",
  },
  {
    n:9, realm:"Physical",
    prana:"Superhumans / Geniuses", pranaNote:"Elevated human potential",
    krishna1:"Danasheel", krishna1En:"Bestower of all wealth",
    krishna2:"Prabhavi", krishna2En:"Potent, mighty",
    beings:"Rishis, sages, extraordinary souls",
  },
  {
    n:10, realm:"Beyond Physical",
    prana:"Pitrus (Ancestors)", pranaNote:"Dead humans / Angels",
    krishna1:"Saundarjyamaya", krishna1En:"Beauty Incarnate",
    krishna2:"Kunthini", krishna2En:"Beyond pain, eternal",
    beings:"Ancestral spirits — Lwa and Djinn may exist here",
  },
  {
    n:11, realm:"Beyond Physical",
    prana:"Kinnaras", pranaNote:"Spirits of social & political work",
    krishna1:"Nrityajna", krishna1En:"Best of Dancers",
    krishna2:"Vikasini", krishna2En:"Great",
    beings:"Half-human celestial musicians & workers",
  },
  {
    n:12, realm:"Beyond Physical",
    prana:"Gandharvas", pranaNote:"Music / Artist spirits (Joy & Fame)",
    krishna1:"Sangitajna", krishna1En:"Best of Singers",
    krishna2:"Maryadini", krishna2En:"Highly revered",
    beings:"Celestial musicians and artists",
  },
  {
    n:13, realm:"Beyond Physical",
    prana:"Yakshas", pranaNote:"Wealth spirits / Tutelary entities of lands",
    krishna1:"Neetibadi", krishna1En:"Embodiment of Honesty",
    krishna2:"Sanhaladini", krishna2En:"Source of happiness",
    beings:"Nature spirits, guardians of treasures — Lwa and Djinn may exist here",
  },
  {
    n:14, realm:"Beyond Physical",
    prana:"Devas", pranaNote:"Gods, Goddesses, High Angels — 33 types",
    krishna1:"Satyabadi", krishna1En:"Truth Itself",
    krishna2:"Ahladini", krishna2En:"Causing joy",
    beings:"The 33 types of Devas — Adityas, Vasus, Rudras, Ashvins, etc.",
  },
  {
    n:15, realm:"Beyond Physical",
    prana:"Asuras / Titans", pranaNote:"High Gods & Goddesses — Trimurti & Tridevi",
    krishna1:"Sarvagnata", krishna1En:"Perfect master of all arts (poetry, drama, painting)",
    krishna2:"Paripurna", krishna2En:"Complete, perfect, full",
    beings:"Brahma, Vishnu, Shiva (Trimurti) / Saraswati, Lakshmi, Parvati (Tridevi)",
  },
  {
    n:16, realm:"Beyond Physical",
    prana:"Siddha", pranaNote:"Perfected Being / Monad (God)",
    krishna1:"Sarvaniyanta", krishna1En:"Controller of All",
    krishna2:"Swarupavasthitha", krishna2En:"Established in self/form, Independent",
    beings:"The liberated — beyond all categories",
  },
];

export const KALAS_INFO = {
  title: "16 Kalas & 16 Units of Prana",
  physicalBound: 9,
  beyondPhysicalStart: 10,
  lwaAndDjinnRange: "Lwa and Djinn can exist from Kala 1–14 (predominantly 10–14)",
  threeSystems: [
    "Units of Prana — cosmic hierarchy from gross matter to perfected being",
    "Kalas of Krishna (Type 1) — 16 divine qualities embodied by Sri Krishna",
    "Kalas of Krishna (Type 2) — 16 stages of consciousness from food-sheath to self-established independence",
  ],
  connection: "The Kalas map onto the Panchanga through the principle that each tithi and nakshatra carries a specific quality (kala) of cosmic energy. The 16 tithis of the waxing moon (Shukla Paksha) correspond to the 16 Kalas — Purnima (full moon) embodies all 16 simultaneously, which is why Sri Krishna is called 'Purna Avatar' (complete with all 16 Kalas).",
};
