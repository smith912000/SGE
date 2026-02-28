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
