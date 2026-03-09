/**
 * Šambraielic Calendar Engine
 * Extracted from App.jsx (lines 1335-2176)
 */

import { SAMB_MONTHS, SAMB_ZODIAC_RANGES } from '../data/calendar/months.js';
import { SAMB_CUSP_DAYS } from '../data/calendar/cuspDays.js';
import { SAMB_SUBDIVISIONS, NUM_SEQ_DEFS } from '../data/calendar/subdivisions.js';
import { ICHING_HEX, TAIXUANJING, HEBREW_22_CYCLE, HEBREW_27_CYCLE, HEBREW_28_CYCLE, GREEK_24_CYCLE, RUNIC_HALF_MONTHS, MAJOR_ARCANA } from '../data/calendar/symbolicCycles.js';
import { NAMES_72, NAMES_99, PATHS_32 } from '../data/calendar/sacredNames.js';
import { MONTH_DAY_TAROT } from '../data/calendar/tarot.js';
import { OGHAM_TREES, INDIGENOUS_ZODIAC, CHINESE_SOLAR_ZODIAC } from '../data/calendar/crossCultural.js';
import { MASTER_TEACHER_DAYS, REFLECTIVE_FESTIVALS, SAMB_WEEKDAYS } from '../data/calendar/festivals.js';
import { HEBREW_LUNAR_MONTHS, EGYPTIAN_MONTHS, HINDU_MONTHS, ATHENIAN_MONTHS } from '../data/calendar/lunarEgyptian.js';
import { E_SEASON_RE, E_MONTH_RE, E_EPAG_RE, computeEgyptianSolarDate } from './egyptianEngine.js'; // I will create this engine file to keep it clean


/* ── Phase 1: Gregorian to Samb Conversion ── */
function gregorianToSamb(year, month, day) {
  const gDate = new Date(year, month - 1, day);
  const solsticeYear = month >= 12 && day >= 22 ? year : year - 1;
  const solstice = new Date(solsticeYear, 11, 22);
  let diff = Math.round((gDate - solstice) / 86400000);
  if (diff <= 0) {
    const prevSol = new Date(solsticeYear - 1, 11, 22);
    diff = Math.round((gDate - prevSol) / 86400000);
  }
  const isLeap = (solsticeYear + 1) % 4 === 0 && ((solsticeYear + 1) % 100 !== 0 || (solsticeYear + 1) % 400 === 0);
  const maxDay = isLeap ? 366 : 365;
  const dayNum = Math.max(1, Math.min(diff, maxDay));

  let sambMonth = null, dayOfMonth = 0;
  for (const m of SAMB_MONTHS) {
    const mDays = m.n === 12 && isLeap ? m.days + 1 : m.days;
    if (dayNum >= m.start && dayNum < m.start + mDays) {
      sambMonth = m;
      dayOfMonth = dayNum - m.start + 1;
      break;
    }
  }
  if (!sambMonth) { sambMonth = SAMB_MONTHS[11]; dayOfMonth = dayNum - 335; }

  const weekNum = Math.min(53, Math.ceil(dayNum / 7));
  const is53rd = dayNum === 365 || (isLeap && dayNum === 366);
  const isLeapDay = isLeap && dayNum === 366;

  let zodPrimary = null, zodSecondary = null;
  for (const z of SAMB_ZODIAC_RANGES) {
    if (dayNum >= z.start && dayNum < z.end) { zodPrimary = z; break; }
  }
  if (!zodPrimary) zodPrimary = SAMB_ZODIAC_RANGES[11];
  const isCusp = SAMB_CUSP_DAYS.has(dayNum);
  if (isCusp) {
    for (const z of SAMB_ZODIAC_RANGES) {
      if (z.sign !== zodPrimary.sign && dayNum >= z.start - 3 && dayNum < z.end + 3 && z.sign !== zodPrimary.sign) {
        zodSecondary = z; break;
      }
    }
  }

  return {
    dayOfYear: dayNum, month: sambMonth.n, dayOfMonth, monthName: sambMonth.name,
    monthNameFull: sambMonth.gk, monthData: sambMonth, zodiacPrimary: zodPrimary,
    zodiacSecondary: isCusp ? zodSecondary : null, isCusp, weekNumber: weekNum,
    is53rdDay: is53rd, isLeapDay, isLeap, maxDay,
    gregYear: year, gregMonth: month, gregDay: day, solsticeYear
  };
}

/* ── Phase 2: Geometric Subdivisions ── */
function computeSubdivisions(dayNum, isLeap) {
  const result = {};
  for (const [key, sub] of Object.entries(SAMB_SUBDIVISIONS)) {
    const daysSet = isLeap && sub.leapDays ? sub.leapDays : sub.days;
    const idx = daysSet.indexOf(dayNum);
    result[key] = { active: idx !== -1, index: idx, total: daysSet.length, sym: sub.sym, name: sub.name, fraction: sub.fraction };
    if (sub.planets && idx !== -1) result[key].planet = sub.planets[idx] || "";
  }
  return result;
}

/* ── Phase 3: Number Sequences ── */
function computeNumSequences(dayNum) {
  return NUM_SEQ_DEFS.map(d => ({ ...d, active: d.set.has(dayNum) }));
}

/* ── Phase 4: Symbolic Cycles ── */
function findCycleEntry(arr, dayNum, dayKey = "day") {
  for (let i = arr.length - 1; i >= 0; i--) { if (dayNum >= arr[i][dayKey]) return arr[i]; }
  return arr[arr.length - 1];
}

function computeSymbolicCycles(dayNum, monthNum, dayOfMonth) {
  const arcanaIdx = Math.floor(((dayNum - 1) / 365) * 22) % 22;
  return {
    iChing: findCycleEntry(ICHING_HEX, dayNum),
    tetragram: findCycleEntry(TAIXUANJING, dayNum),
    hebrew22: findCycleEntry(HEBREW_22_CYCLE, dayNum),
    hebrew27: findCycleEntry(HEBREW_27_CYCLE, dayNum),
    hebrew28: findCycleEntry(HEBREW_28_CYCLE, dayNum),
    greek24: findCycleEntry(GREEK_24_CYCLE, dayNum),
    runic: findCycleEntry(RUNIC_HALF_MONTHS, dayNum),
    name72: findCycleEntry(NAMES_72, dayNum),
    name99: findCycleEntry(NAMES_99, dayNum),
    path32: findCycleEntry(PATHS_32, dayNum),
    arcana: MAJOR_ARCANA[arcanaIdx],
    arcanaIdx,
    monthDayTarot: dayOfMonth ? (MONTH_DAY_TAROT[dayOfMonth] || null) : null,
  };
}

/* ── Phase 5: Holiday Database ── */
const SAMB_HOLIDAYS_MAP = {};
function _addH(day, name, trad, sym) {
  if (!SAMB_HOLIDAYS_MAP[day]) SAMB_HOLIDAYS_MAP[day] = [];
  SAMB_HOLIDAYS_MAP[day].push({ name, tradition: trad, symbol: sym });
}
_addH(1, "Yule / Winter Solstice", "norse", "ᛃᚤᛚ"); _addH(1, "Day of Genesis", "sambraielic", "🔯"); _addH(1, "6th Day of Saturnalia", "roman", "🇲🇪");
_addH(4, "Sol Invictus / Christmas", "roman", "🇲🇪"); _addH(4, "Χριστούγεννα", "christian", "✝");
_addH(11, "Kalends of January", "roman", "🇲🇪"); _addH(11, "Kaphernalia", "sambraielic", "🔯"); _addH(11, "Solemnity of Mary", "christian", "✝");
_addH(16, "Epiphany", "christian", "✝"); _addH(19, "Agonalia (Per Janus)", "roman", "🇲🇪");
_addH(21, "Carmentalia & Juturna", "roman", "🇲🇪"); _addH(29, "Theophany", "orthodox", "☦");
_addH(30, "Festival of the Name of אל", "sambraielic", "🔯"); _addH(33, "Golden Ratio Day", "sambraielic", "🔯");
_addH(35, "Festa Alarmonia", "sambraielic", "🔯"); _addH(37, "Day of the Name אלהא", "norse", "ᚦᛟᚱᚱᚨᛒᛚᛟᛏ");
_addH(40, "Aetosalia Anabasis", "sambraielic", "🔯"); _addH(42, "Februarialia", "roman", "🇲🇪"); _addH(42, "Disablot", "norse", "ᛞᛁᛊᚨᛒᛚᛟᛏ");
_addH(43, "Imbolc", "neopagan", "🍀"); _addH(44, "Day the Family is Born", "sambraielic", "🔯");
_addH(50, "Angelion", "sambraielic", "🔯"); _addH(51, "Harmony of Heart (11-day)", "sambraielic", "🔯");
_addH(55, "St. Valentine's Day", "christian", "✝"); _addH(56, "Lupercalia", "roman", "🇲🇪");
_addH(58, "Fornacalia & Quirinalia", "roman", "🇲🇪"); _addH(62, "Feralia", "roman", "🇲🇪");
_addH(64, "Terminalia", "roman", "🇲🇪"); _addH(68, "Equirria Primo", "roman", "🇲🇪");
_addH(72, "Chrono of Eliyahu", "sambraielic", "🔯"); _addH(73, "Festa Bast", "kemetic", "☥");
_addH(79, "Chrysokordia", "sambraielic", "🔯"); _addH(80, "Oceanosia", "sambraielic", "🔯");
_addH(81, "Enneazoesia (9 Lives Day)", "sambraielic", "🔯"); _addH(83, "Equirria Secundo", "roman", "🇲🇪");
_addH(84, "Feriae Jovis", "roman", "🇲🇪"); _addH(85, "Alphabetalia", "sambraielic", "🔯");
_addH(86, "Liberalia", "roman", "🇲🇪"); _addH(88, "Quinquatria", "roman", "🇲🇪");
_addH(90, "Aries Ingress / Astrological NY", "sambraielic", "🌟"); _addH(91, "Ostara", "neopagan", "ᛟᛊᛏᚫᚱᚫ");
_addH(100, "Pastoralia", "sambraielic", "🔯"); _addH(101, "Veneralia", "roman", "🇲🇪");
_addH(109, "Gamoprotoarchika", "sambraielic", "🔯"); _addH(110, "Megalesia", "roman", "🇲🇪");
_addH(111, "Heliosia / Kyriokardia", "sambraielic", "🔯"); _addH(112, "Cerealia", "roman", "🇲🇪");
_addH(120, "Taurus Ingress", "sambraielic", "🔯"); _addH(121, "Ophypsolia", "sambraielic", "🔯");
_addH(130, "Walpurgisnacht", "norse", "ᚹᚨᛚᛈᚢᚱᚷᛁᛊ"); _addH(131, "Beltane", "neopagan", "🍀");
_addH(131, "Paneudemonia", "sambraielic", "🔯"); _addH(134, "Sambraiel's Birthday", "sambraielic", "🔯");
_addH(141, "Eudaimonion", "sambraielic", "🔯"); _addH(145, "Mercuralia", "roman", "🇲🇪");
_addH(149, "Antichronia", "sambraielic", "🔯"); _addH(150, "Holy Day of ÆΛ", "sambraielic", "🔯");
_addH(151, "Gemini Ingress", "sambraielic", "🔯"); _addH(152, "Rosalia", "roman", "🇲🇪");
_addH(162, "Navisalia", "sambraielic", "🔯"); _addH(163, "Petalydania", "sambraielic", "🔯");
_addH(167, "Hybridion", "sambraielic", "🔯"); _addH(168, "Ludi Piscatorii", "roman", "🇲🇪");
_addH(172, "Matralia", "roman", "🇲🇪"); _addH(172, "Asterialia", "sambraielic", "🔯");
_addH(182, "Cancer Ingress / Lunar NY", "sambraielic", "🌙"); _addH(182, "Eptaleia", "sambraielic", "🔯");
_addH(185, "Fortuna Fortunalia", "roman", "🇲🇪"); _addH(186, "St. John the Baptist", "christian", "✝");
_addH(191, "Festa Hathor", "kemetic", "☥"); _addH(192, "Hera Juno Felicitas", "roman", "🇲🇪");
_addH(192, "Medusania", "sambraielic", "🔯"); _addH(193, "Festa Thoth", "sambraielic", "🔯");
_addH(197, "Ludi Apollinares", "roman", "🇲🇪"); _addH(203, "Pafosalia", "sambraielic", "🔯");
_addH(206, "Nemoralia", "roman", "🇲🇪"); _addH(210, "Vinalia Rustica", "roman", "🇲🇪");
_addH(211, "Festa Perun", "sambraielic", "🔯"); _addH(214, "Neptunalia", "roman", "🇲🇪");
_addH(223, "Lughnasadh", "neopagan", "🍀"); _addH(225, "Ra & Horus (Egyptian NY)", "kemetic", "☥");
_addH(226, "Chrysochronia (10-day)", "sambraielic", "🔯"); _addH(234, "Lychnaphsia", "kemetic", "☥");
_addH(239, "Portunalia", "roman", "🇲🇪"); _addH(240, "Wag Festival (Osiris)", "kemetic", "☥");
_addH(243, "Festa Thoth", "kemetic", "☥"); _addH(245, "Vulcanalia", "roman", "🇲🇪");
_addH(254, "Zeus Pater Tonans", "roman", "🇲🇪"); _addH(255, "Nyxkorelia", "sambraielic", "🔯");
_addH(262, "Enneadia", "sambraielic", "🔯"); _addH(266, "Reginalia", "sambraielic", "🔯");
_addH(267, "Feast of the Cross", "christian", "✝"); _addH(271, "Ornithalia", "sambraielic", "🔯");
_addH(272, "Festa Ipet", "kemetic", "☥"); _addH(276, "Libra Ingress", "sambraielic", "🔯");
_addH(278, "Festa Ma'at", "kemetic", "☥"); _addH(282, "Michaelmas", "christian", "✝");
_addH(284, "Ceremonia Fides", "roman", "🇲🇪"); _addH(286, "Bendalia", "sambraielic", "🔯");
_addH(291, "Festa Amun-Ra", "kemetic", "☥"); _addH(295, "Nymphalia", "sambraielic", "🔯");
_addH(301, "Sacred Fire of the King", "sambraielic", "🔯"); _addH(302, "Armilustrium", "roman", "🇲🇪");
_addH(304, "Festa Set", "kemetic", "☥"); _addH(306, "Scorpio Ingress", "sambraielic", "🔯");
_addH(307, "Raphaelmas", "christian", "✝"); _addH(314, "Samhain", "neopagan", "🍀");
_addH(315, "Hallowmas", "christian", "✝"); _addH(316, "Aetosalia Katabasis", "sambraielic", "🔯");
_addH(322, "Urielmas", "christian", "✝"); _addH(326, "Festa Phoenix", "sambraielic", "🔯");
_addH(330, "Nox Hekate", "sambraielic", "🔯"); _addH(336, "Sagittarius Ingress", "sambraielic", "🔯");
_addH(340, "Festa Sokar", "kemetic", "☥"); _addH(344, "Erection of Djed", "kemetic", "☥");
_addH(346, "Belenalia", "sambraielic", "🔯"); _addH(347, "Festa Nehebkau", "kemetic", "☥");
_addH(349, "Festa Faunus", "roman", "🇲🇪"); _addH(352, "Immaculate Conception", "christian", "✝");
_addH(356, "Cheironalia", "sambraielic", "🔯"); _addH(361, "Saturnalia (7 days)", "roman", "🇲🇪");
_addH(362, "Eponalia", "roman", "🇲🇪"); _addH(363, "Opalia", "sambraielic", "🔯");
_addH(364, "Festa Wadjyt", "kemetic", "☥"); _addH(365, "Armonalia", "sambraielic", "🔯");
_addH(366, "Armonalion Cadence Day", "sambraielic", "🔯");

// Hindu holidays
_addH(25, "Makar Sankranti", "hindu", "🕉"); _addH(35, "Thaipusam", "hindu", "🕉");
_addH(78, "Maha Shivaratri", "hindu", "🕉"); _addH(95, "Holi (day 1)", "hindu", "🕉"); _addH(96, "Holi (day 2)", "hindu", "🕉");
_addH(110, "Ugadi", "hindu", "🕉"); _addH(118, "Rama Navami", "hindu", "🕉");
_addH(152, "Narasimha Jayanti", "hindu", "🕉"); _addH(199, "Ratha Yatra", "hindu", "🕉");
_addH(232, "Raksha Bandhan", "hindu", "🕉"); _addH(249, "Krishna Janmashtami (day 1)", "hindu", "🕉"); _addH(250, "Krishna Janmashtami (day 2)", "hindu", "🕉");
_addH(261, "Ganesh Chaturthi", "hindu", "🕉"); _addH(259, "Onam (start)", "hindu", "🕉"); _addH(271, "Onam (end)", "hindu", "🕉");
_addH(293, "Durga Puja (start)", "hindu", "🕉"); _addH(297, "Vijayadashami / Dussehra", "hindu", "🕉");
_addH(303, "Karva Chauth", "hindu", "🕉"); _addH(313, "Dhanteras", "hindu", "🕉");
_addH(316, "Diwali / Lakshmi Puja", "hindu", "🕉"); _addH(317, "Govardhan Puja", "hindu", "🕉"); _addH(318, "Bhai Dooj", "hindu", "🕉");
_addH(331, "Elephant Festival", "hindu", "🕉");

// Buddhist holidays
_addH(56, "Parinirvana Day", "buddhist", "☸"); _addH(65, "Magha Puja", "buddhist", "☸");
_addH(144, "Royal Ploughing Festival", "buddhist", "☸"); _addH(146, "Buddha Purnima / Vesak", "buddhist", "☸");
_addH(212, "Asalha Puja", "buddhist", "☸");

// Vodou holidays
_addH(14, "Casse Gateaux", "vodou", "🐍"); _addH(40, "Feeding of the Springs", "vodou", "🐍");
_addH(58, "Fete Legba", "vodou", "🐍"); _addH(72, "Fete Damballah", "vodou", "🐍");
_addH(92, "Breaking of the Jugs", "vodou", "🐍"); _addH(108, "Feeding of the Dead", "vodou", "🐍");
_addH(130, "Fete Ogou", "vodou", "🐍"); _addH(158, "Fete Erzulie", "vodou", "🐍");
_addH(185, "Fete Simbi", "vodou", "🐍"); _addH(210, "Fete Agwe", "vodou", "🐍");
_addH(240, "Fete Ghede", "vodou", "🐍"); _addH(268, "Fete Kouzen Zaka", "vodou", "🐍");
_addH(290, "Manger Yams", "vodou", "🐍"); _addH(320, "Ganga Bwa", "vodou", "🐍");
_addH(345, "Feeding of the Sea", "vodou", "🐍");

// Shinto / Japanese holidays
_addH(122, "Sakura Matsuri", "shinto", "⛩"); _addH(129, "Golden Week", "shinto", "⛩");
_addH(133, "Tado Festival", "shinto", "⛩"); _addH(135, "Children's Day (Kodomo no Hi)", "shinto", "⛩");
_addH(285, "Utagaki", "shinto", "⛩"); _addH(337, "Niiname-no-Matsuri", "shinto", "⛩");

// Chinese / Eastern holidays
_addH(51, "Chinese New Year (approx)", "eastern", "🏮"); _addH(65, "Lantern Festival / Shangyuan", "eastern", "🏮");
_addH(105, "Qing Ming / Tomb Sweeping", "eastern", "🏮"); _addH(172, "Dragon Boat / Duanwu", "eastern", "🏮");
_addH(271, "Mid-Autumn / Moon Cake Festival", "eastern", "🏮");

// Greek Classical holidays
_addH(34, "Lenaia (start)", "greek", "🏛"); _addH(38, "Lenaia (end)", "greek", "🏛");
_addH(62, "Anthesteria (start)", "greek", "🏛"); _addH(64, "Anthesteria (end)", "greek", "🏛");
_addH(71, "Eleusinia Minor (start)", "greek", "🏛"); _addH(77, "Eleusinia Minor (end)", "greek", "🏛");
_addH(74, "Diasia", "greek", "🏛"); _addH(91, "Dionysia (start)", "greek", "🏛"); _addH(98, "Dionysia (end)", "greek", "🏛");
_addH(105, "Thesmophoria", "greek", "🏛"); _addH(115, "Munychion / Artemis Fest", "greek", "🏛");
_addH(128, "Plynteria", "greek", "🏛"); _addH(140, "Kallynteria", "greek", "🏛");
_addH(145, "Thargelia (day 1)", "greek", "🏛"); _addH(146, "Thargelia (day 2)", "greek", "🏛");
_addH(160, "Arrephoria", "greek", "🏛"); _addH(170, "Skirophoria", "greek", "🏛"); _addH(181, "Skira", "greek", "🏛");
_addH(195, "Panathenaia", "greek", "🏛"); _addH(220, "Hekatombaion Games", "greek", "🏛");
_addH(250, "Eleusinia Major (start)", "greek", "🏛"); _addH(256, "Eleusinia Major (end)", "greek", "🏛");
_addH(272, "Eleusinia Major (rites)", "greek", "🏛"); _addH(278, "Eleusinia Major (close)", "greek", "🏛");
_addH(290, "Pyanepsia", "greek", "🏛"); _addH(295, "Apaturia", "greek", "🏛");
_addH(310, "Pompeion", "greek", "🏛"); _addH(330, "Haloa", "greek", "🏛");
_addH(345, "Poseidea", "greek", "🏛"); _addH(360, "Lenaia Prep", "greek", "🏛");

// Missing neopagan & Roman
_addH(182, "Litha / Summer Solstice", "neopagan", "🍀"); _addH(276, "Mabon / Autumn Equinox", "neopagan", "🍀");
_addH(127, "Floralia", "roman", "🇲🇪");

/* ── Phase 6: Day Symbolism ── */
const DAY_MEANINGS = [
  null,
  { n: 1, tarot: "Magician & Fool", meaning: "Day of All, Magik and New Beginnings", sym: "ב א" },
  { n: 2, tarot: "High Priestess", meaning: "Day of Reflection & Separation", sym: "ג ב" },
  { n: 3, tarot: "Empress", meaning: "Day of Unity, Children, Motherhood", sym: "ד ג" },
  { n: 4, tarot: "Emperor", meaning: "Day of Balance & Order", sym: "ה ד" },
  { n: 5, tarot: "Hierophant", meaning: "Day of Sacred Teaching", sym: "ו ה" },
  { n: 6, tarot: "Lovers", meaning: "Day of Balance through Passion & Love", sym: "ז ו" },
  { n: 7, tarot: "Chariot", meaning: "Day of Choices, Gaining Control & Action", sym: "ח ז" },
  { n: 8, tarot: "Strength", meaning: "Day of Strength & Harmony", sym: "ט ח" },
  { n: 9, tarot: "Hermit", meaning: "Day of Solitude and Reflective Thought", sym: "י ט" },
  { n: 10, tarot: "Wheel of Fortune", meaning: "Day of Fortune and Games of Chance", sym: "כ י" },
  { n: 11, tarot: "Justice", meaning: "Day of Justice & Reflective Thought", sym: "ל כ" },
  { n: 12, tarot: "Hanged Man", meaning: "Day of Atonement, Pause & Release", sym: "מ ל" },
  { n: 13, tarot: "Death", meaning: "Day of Death & Rebirth, Endings, Transition", sym: "נ מ" },
  { n: 14, tarot: "Temperance", meaning: "Day of Temperance, Meditation, Balance", sym: "ס נ" },
  { n: 15, tarot: "Devil", meaning: "Day of the Shadow Self, Sexuality", sym: "ע ס" },
  { n: 16, tarot: "Tower", meaning: "Day of Revelation, Chaos, Awakening", sym: "פ ע" },
  { n: 17, tarot: "Star", meaning: "Day of Hope, Faith, Renewal & Purpose", sym: "צ פ" },
  { n: 18, tarot: "Moon", meaning: "Day of Intuition, Reflection & Subconscious", sym: "ק צ" },
  { n: 19, tarot: "Sun", meaning: "Day of Enlightenment, Vitality & Success", sym: "ר ק" },
  { n: 20, tarot: "Judgement", meaning: "Day of Judgement, Absolution & Inner Calling", sym: "ש ר" },
  { n: 21, tarot: "World", meaning: "Day of Accomplishment, Oaths & Bonds", sym: "ת ש" },
  { n: 22, tarot: "Master Builder", meaning: "Day of the Word, Miracles, Sacred Heart", sym: "ת ב" },
  { n: 23, tarot: "Perfect Hand", meaning: "Day of Technique & Demonstration", sym: "" },
  { n: 24, tarot: "Leisure & Sacrifice", meaning: "Day of Crossroads, Meditative Pursuits", sym: "" },
  { n: 25, tarot: "Magik of the Word", meaning: "Day of Incantation", sym: "" },
  { n: 26, tarot: "The Gate", meaning: "Day of Passage", sym: "" },
  { n: 27, tarot: "Pure Spirit", meaning: "Day of Veil Thinning & Regeneration", sym: "" },
  { n: 28, tarot: "Perfection", meaning: "Day of Balance & Heart-Hand Magik", sym: "" },
  { n: 29, tarot: "Grieving", meaning: "Day of Emotion, Confession & Atonement", sym: "" },
  { n: 30, tarot: "Crook & Flail", meaning: "Crossover Day of Sacred Rulership", sym: "" },
  { n: 31, tarot: "אל & Reflections", meaning: "Days of אל and Asherah", sym: "" },
  { n: 32, tarot: "32 Paths", meaning: "Day of the Sacred Heart & Centering", sym: "" },
];

/* ── Phase 7: Ogham / Celtic Tree Zodiac ── */
function getOghamTree(dayNum) {
  for (const t of OGHAM_TREES) { if (dayNum >= t.day && dayNum <= t.end) return t; }
  return OGHAM_TREES[0];
}

/* ── Phase 8: Pan-Indigenous American Zodiac ── */
function getIndigenousAnimal(dayNum) {
  for (const z of INDIGENOUS_ZODIAC) { if (dayNum >= z.day && dayNum <= z.end) return z; }
  return INDIGENOUS_ZODIAC[0];
}

/* ── Phase 9: Chinese Zodiac Solar Cycle ── */
function getChineseSolarAnimal(dayNum) {
  for (const z of CHINESE_SOLAR_ZODIAC) { if (dayNum >= z.day && dayNum <= z.end) return z; }
  return CHINESE_SOLAR_ZODIAC[0];
}

/* ── Phase 10: Days of the Master Teacher (33-day cycle) ── */
const MASTER_TEACHER_SET = new Set(MASTER_TEACHER_DAYS);
function getMasterTeacher(dayNum) {
  if (!MASTER_TEACHER_SET.has(dayNum)) return null;
  const idx = MASTER_TEACHER_DAYS.indexOf(dayNum);
  const path = PATHS_32[idx] || PATHS_32[PATHS_32.length - 1];
  const isEl = idx === 32;
  return { cyclePos: idx + 1, pathNum: path.n, pathName: path.west, intel: path.intel, heb: path.heb, isEl };
}

/* ── Phase 11: Reflective Festivals ── */
function getReflectiveFestival(monthNum, dayOfMonth, monthDays) {
  const fest = REFLECTIVE_FESTIVALS.find(f => f.month === monthNum);
  if (!fest) return null;
  const festStart = monthDays - fest.days + 1;
  if (dayOfMonth >= festStart) {
    return { ...fest, festDay: dayOfMonth - festStart + 1 };
  }
  return null;
}

/* ── Phase 12: Weekday Calculation ── */
function getSambWeekday(dayNum) {
  return SAMB_WEEKDAYS[(dayNum - 1 + 5) % 7];
}

/* ── Phase 13: Main Calendar Computation ── */
function computeSambCalendar(year, month, day) {
  const core = gregorianToSamb(year, month, day);
  const d = core.dayOfYear;
  const subs = computeSubdivisions(d, core.isLeap);
  const numSeqs = computeNumSequences(d);
  const cycles = computeSymbolicCycles(d, core.month, core.dayOfMonth);
  const holidays = SAMB_HOLIDAYS_MAP[d] || [];
  const dayMeaning = DAY_MEANINGS[core.dayOfMonth] || null;
  const activeMarkers = [];
  for (const [, v] of Object.entries(subs)) { if (v.active) activeMarkers.push(v.sym); }
  const activeSeqs = numSeqs.filter(s => s.active);

  const ogham = getOghamTree(d);
  const indigenous = getIndigenousAnimal(d);
  const chineseSolar = getChineseSolarAnimal(d);
  const masterTeacher = getMasterTeacher(d);
  const mDays = core.monthData ? (core.monthData.n === 12 && core.isLeap ? core.monthData.days + 1 : core.monthData.days) : 30;
  const reflective = getReflectiveFestival(core.month, core.dayOfMonth, mDays);
  const weekday = getSambWeekday(d);
  const hebrewMonth = HEBREW_LUNAR_MONTHS[(core.month - 1) % 12];
  const egyptianMonth = EGYPTIAN_MONTHS[(core.month - 1) % 12];
  const hinduMonth = HINDU_MONTHS[(core.month - 1) % 12];

  return {
    ...core, subdivisions: subs, numSequences: numSeqs, cycles, holidays,
    dayMeaning, activeMarkers, activeSeqs,
    ogham, indigenous, chineseSolar, masterTeacher, reflective, weekday,
    hebrewMonth, egyptianMonth, hinduMonth,
    athenianMonth: ATHENIAN_MONTHS[(core.month - 1) % 12],
    egyptianSolar: computeEgyptianSolarDate(year, month, day)
  };
}

export { gregorianToSamb, computeSubdivisions, computeNumSequences, findCycleEntry, computeSymbolicCycles, SAMB_HOLIDAYS_MAP, DAY_MEANINGS, getOghamTree, getIndigenousAnimal, getChineseSolarAnimal, getMasterTeacher, getReflectiveFestival, getSambWeekday, computeSambCalendar };
