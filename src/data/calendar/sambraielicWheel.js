import { gregorianToSamb } from "../../engines/calendar.js";

export const ELDER_FUTHARK = [
  "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ",
  "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ",
  "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛝ", "ᛟ", "ᛞ",
];

export const SAMBRAIELIC_HOURLY_CHECKPOINTS = [
  { hour: 0,  hebrew: "ע", west: "Capricorn", westGlyph: "♑︎", east: "Goat", eastCn: "羓", eastPin: "bā", eastNote: "Legendary",
    trigram: "☷☵", iChing: "01 ䷀ 乾", taiXuan: "𝌆 中", bopomofo: "ㄛ (ㄠ)", kangxi: "目 mù",
    month: 12, day: 22, note: "Yule / Winter Solstice", runicBlot: "ᛃᚤᛚ" },
  { hour: 1,  hebrew: "ם", west: "Ox Axis", westGlyph: "", east: "Ox", eastCn: "牛", eastPin: "niú", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄇ", kangxi: "冰 bīng",
    month: 1, day: 5, note: "12th Night" },
  { hour: 2,  hebrew: "צ", west: "Aquarius", westGlyph: "♒︎", east: "Vase", eastCn: "瓶", eastPin: "píng", eastNote: "Thing which bears water",
    trigram: "", iChing: "03 ䷂ 屯", taiXuan: "𝌉 閑", bopomofo: "ㄘ", kangxi: "紙 zhǐ",
    month: 1, day: 20, note: "Torahalia: Day of the Name אלהא" },
  { hour: 3,  hebrew: "ת", west: "Tiger Axis", westGlyph: "", east: "Tiger", eastCn: "虎", eastPin: "hǔ", eastNote: "",
    trigram: "☳☶", iChing: "07 ䷆ 師", taiXuan: "𝌎 {爻+疋}", bopomofo: "ㄉ", kangxi: "標 biāo",
    month: 2, day: 4, note: "Imbolc period" },
  { hour: 4,  hebrew: "ק", west: "Pisces", westGlyph: "♓︎", east: "Fish", eastCn: "魚", eastPin: "yú", eastNote: "",
    trigram: "", iChing: "", taiXuan: "14. 𝌓 銳", bopomofo: "ㄑ", kangxi: "禺 yú",
    month: 2, day: 19, note: "Pisces gate", runicBlot: "ᛏᛃᚱᛊᛒᛚᛟᛏ" },
  { hour: 5,  hebrew: "כ", west: "Rabbit Axis", westGlyph: "", east: "Rabbit / Hare", eastCn: "兔", eastPin: "tù", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄍ", kangxi: "掌 zhǎng",
    month: 3, day: 6, note: "Usagi no Hi", runicBlot: "ᚠᚱᛁᚷᛊᛒᛚᛟᛏ (& ᛃᚨᚱᛞᚨᛒᛚᛟᛏ)" },
  { hour: 6,  hebrew: "ה", west: "Aries", westGlyph: "♈︎", east: "Ram", eastCn: "羘", eastPin: "zāng", eastNote: "",
    trigram: "☲☳", iChing: "16 ䷏ 豫", taiXuan: "19. 𝌘 從", bopomofo: "ㄏ(ㄝ)", kangxi: "窗 chuāng",
    month: 3, day: 21, note: "Eostara / Aries ingress" },
  { hour: 7,  hebrew: "א", west: "Dragon Axis", westGlyph: "", east: "Dragon", eastCn: "龍", eastPin: "lóng", eastNote: "",
    trigram: "", iChing: "", taiXuan: "𝌝 樂", bopomofo: "ㄜ", kangxi: "犖 luò",
    month: 4, day: 4, note: "Draconalia", runicBlot: "ᛗᚨᚾᛁᛒᛚᛟᛏ Κερεαλια ⚳" },
  { hour: 8,  hebrew: "ו", west: "Taurus", westGlyph: "♉︎", east: "Bull", eastCn: "牞", eastPin: "jiū", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄡ", kangxi: "釘 dīng",
    month: 4, day: 20, note: "Οφαιψωλια period" },
  { hour: 9,  hebrew: "⚕", west: "Serpent Bearer", westGlyph: "⚕/☤", east: "Snake", eastCn: "蛇", eastPin: "shé", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄚ", kangxi: "巴 bā",
    month: 5, day: 5, note: "נחשאליא & Cadenzalia", runicBlot: "ᛁᚾᚷᚹᛖᛒᛚᛟᛏ" },
  { hour: 10, hebrew: "ז", west: "Gemini", westGlyph: "♊︎", east: "Twins", eastCn: "雙", eastPin: "Shuāng", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄗ(ㄓ)", kangxi: "劍 jiàn",
    month: 5, day: 21, note: "Day of Twins" },
  { hour: 11, hebrew: "פ", west: "Horse Axis", westGlyph: "", east: "Horse", eastCn: "馬", eastPin: "mǎ", eastNote: "",
    trigram: "", iChing: "36. ䷣ 明夷", taiXuan: "36. 𝌩 強", bopomofo: "ㄆ(ㄅ)", kangxi: "口 kǒu",
    month: 6, day: 5, note: "Day of Gold Horses / פזפסאליא" },
  { hour: 12, hebrew: "ח", west: "Cancer", westGlyph: "♋︎", east: "Crab", eastCn: "蠏", eastPin: "xiè", eastNote: "",
    trigram: "☰☲", iChing: "31 ䷞ 咸", taiXuan: "", bopomofo: "ㄎ (ㄟ)", kangxi: "牆 qiáng (院 yuàn)",
    month: 6, day: 21, note: "Επταλια (♀[⚵⚶♁])" },
  { hour: 13, hebrew: "ש", west: "Sheep Axis", westGlyph: "", east: "Sheep / Goat", eastCn: "羊", eastPin: "yáng", eastNote: "",
    trigram: "", iChing: "35. ䷢ 晉", taiXuan: "𝌯 迎", bopomofo: "ㄕ", kangxi: "齒 chǐ (日 rì)",
    month: 7, day: 7, note: "כתראליא" },
  { hour: 14, hebrew: "ט", west: "Leo", westGlyph: "♌︎", east: "Lion", eastCn: "獅", eastPin: "shī", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄊ", kangxi: "車 chē",
    month: 7, day: 23, note: "Νεπτυναλια Ψ" },
  { hour: 15, hebrew: "ר", west: "Monkey Axis", westGlyph: "", east: "Monkey", eastCn: "猴", eastPin: "hóu", eastNote: "",
    trigram: "☴☷", iChing: "", taiXuan: "", bopomofo: "ㄖ", kangxi: "頭 tóu",
    month: 8, day: 7, note: "4th Day of Χρυσοχρονια" },
  { hour: 16, hebrew: "י", west: "Virgo", westGlyph: "♍︎", east: "Maiden", eastCn: "婐", eastPin: "wǒ", eastNote: "",
    trigram: "", iChing: "42 ䷩ 益", taiXuan: "55. 𝌼 減", bopomofo: "ㄧ", kangxi: "手 shǒu",
    month: 8, day: 23, note: "Beware of Restless Hungry Ghosts" },
  { hour: 17, hebrew: "ד", west: "Rooster Axis", westGlyph: "", east: "Rooster", eastCn: "雞", eastPin: "jī", eastNote: "",
    trigram: "", iChing: "46. ䷭ 升", taiXuan: "", bopomofo: "ㄉ", kangxi: "門 mén (魚 yú)",
    month: 9, day: 7, note: "Heart's Call / Reginalia / Cruxmas", runicBlot: "ᛁᛞᚢᚾᚾᛊᛒᛚᛟᛏ" },
  { hour: 18, hebrew: "ל", west: "Libra", westGlyph: "♎︎", east: "Scales", eastCn: "秤", eastPin: "chèng", eastNote: "",
    trigram: "☵☱", iChing: "", taiXuan: "", bopomofo: "ㄖ", kangxi: "鞭 biān",
    month: 9, day: 23, note: "Michaelmas corridor / Marriage of Oðinn & Frigg" },
  { hour: 19, hebrew: "מ", west: "Dog Axis", westGlyph: "", east: "Dog", eastCn: "狗", eastPin: "gǒu", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄇ", kangxi: "水 Shuǐ",
    month: 10, day: 8, note: "Wanir blot window", runicBlot: "ᚹᚨᚾᛁᚱᛒᛚᛟᛏ" },
  { hour: 20, hebrew: "נ", west: "Scorpio", westGlyph: "♏︎", east: "Scorpion", eastCn: "萬", eastPin: "wàn", eastNote: "",
    trigram: "", iChing: "54. ䷵ 歸妹", taiXuan: "67. 𝍈 晦", bopomofo: "ㄋ", kangxi: "蜃 shèn (魚 yú)",
    month: 10, day: 23, note: "Scorpio gate", runicBlot: "ᚹᛖᛏᚣᚾᛇᛏᛦ" },
  { hour: 21, hebrew: "ג", west: "Pig Axis", westGlyph: "", east: "Pig", eastCn: "豬", eastPin: "zhū", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄍ", kangxi: "杖 zhàng",
    month: 11, day: 7, note: "Time of Norns" },
  { hour: 22, hebrew: "ס", west: "Sagittarius", westGlyph: "♐︎", east: "Archer", eastCn: "羿", eastPin: "yì", eastNote: "Legendary",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄙ", kangxi: "柱 zhù",
    month: 11, day: 22, note: "⛎︎ Onset of Ophiuchus" },
  { hour: 23, hebrew: "ב", west: "Rat Axis", westGlyph: "", east: "Rat", eastCn: "鼠", eastPin: "shǔ", eastNote: "",
    trigram: "", iChing: "", taiXuan: "", bopomofo: "ㄅ", kangxi: "房 fáng",
    month: 12, day: 7, note: "Chinese zodiac revolution marker", runicBlot: "ᛒᚨᛚᛞᛦᛒᛚᛟᛏ & Feast of St. Lucia" },
];

export const SAMBRAIELIC_HALF_HOUR_NOTES = [
  { slot: 1,  rune: "ᛇ", month: 12, day: 29, note: "Five Gold Rings Day" },
  { slot: 3,  rune: "ᛈ", month: 1,  day: 12, note: "ᚢᛚᛚᛦᛒᛚᛟᛏ" },
  { slot: 5,  rune: "ᛉ", month: 1,  day: 27, note: "ᚦᛟᚱᚱᚨᛒᛚᛟᛏ Day of the Name אלהא" },
  { slot: 7,  rune: "ᛊ", month: 2,  day: 12, note: "ᛊᛟᛚᛊᚢᚾᚾᚨᛒᛚᛟᛏ (Imbolc period)" },
  { slot: 9,  rune: "ᛏ", month: 2,  day: 26, note: "ᛏᛃᚱᛊᛒᛚᛟᛏ" },
  { slot: 11, rune: "ᛒ", month: 3,  day: 14, note: "ᚠᚱᛁᚷᛊᛒᛚᛟᛏ (& ᛃᚨᚱᛞᚨᛒᛚᛟᛏ)" },
  { slot: 13, rune: "ᛖ", month: 3,  day: 27, note: "Twins & Sleipnir marker" },
  { slot: 15, rune: "ᛗ", month: 4,  day: 12, note: "ᛗᚨᚾᛁᛒᛚᛟᛏ Κερεαλια ⚳" },
  { slot: 17, rune: "ᛚ", month: 4,  day: 27, note: "Floralia (Nehalennia & Freja)" },
  { slot: 19, rune: "ᛝ", month: 5,  day: 13, note: "Kundalinalia / Κηρύκειοναλια ᛁᚾᚷᚹᛖᛒᛚᛟᛏ" },
  { slot: 21, rune: "ᛞ", month: 5,  day: 29, note: "ᛞᛇᚷᛦᛒᛚᛟᛏ" },
  { slot: 23, rune: "ᛟ", month: 6,  day: 13, note: "ᛟᛞᛁᚾᚾᛊᛒᛚᛟᛏ" },
  { slot: 25, rune: "ᚠ", month: 6,  day: 29, note: "ᚠᚱᛖᛃᚨᛊᛒᛚᛟᛏ (ᚱᚢᚾᚨᛚᛁᚨ = Runic New Year)" },
  { slot: 27, rune: "ᚢ", month: 7,  day: 14, note: "Primordial Forces marker" },
  { slot: 29, rune: "ᚦ", month: 7,  day: 30, note: "Thor's Battles With Jörmungandr" },
  { slot: 31, rune: "ᚨ", month: 8,  day: 15, note: "End of Χρυσοχρονια / Yggdrasil Blot / Assumption of Miriam" },
  { slot: 33, rune: "ᚱ", month: 8,  day: 30, note: "Beware of Restless Hungry Ghosts" },
  { slot: 35, rune: "ᚲ", month: 9,  day: 14, note: "Reginalia / Cruxmas ᛁᛞᚢᚾᚾᛊᛒᛚᛟᛏ (Muspelheim) Germanic Fire Stories" },
  { slot: 37, rune: "ᚷ", month: 9,  day: 30, note: "Marriage of Oðinn & Frigg / Michælmas" },
  { slot: 39, rune: "ᚹ", month: 10, day: 16, note: "ᚹᚨᚾᛁᚱᛒᛚᛟᛏ" },
  { slot: 41, rune: "ᚺ", month: 10, day: 30, note: "ᚹᛖᛏᚣᚾᛇᛏᛦ" },
  { slot: 43, rune: "ᚾ", month: 11, day: 15, note: "Time of Norns" },
  { slot: 45, rune: "ᛁ", month: 11, day: 29, note: "⛎︎ Onset of Ophiuchus" },
  { slot: 47, rune: "ᛃ", month: 12, day: 13, note: "ᛒᚨᛚᛞᛦᛒᛚᛟᛏ & Feast of St. Lucia" },
];

function checkpointDayOfYear(checkpointMonth, checkpointDay, anchorYear) {
  const targetYear = checkpointMonth === 12 && checkpointDay >= 22 ? anchorYear : anchorYear + 1;
  const target = new Date(Date.UTC(targetYear, checkpointMonth - 1, checkpointDay));
  const start = new Date(Date.UTC(anchorYear, 11, 22));
  return Math.floor((target - start) / 86400000) + 1;
}

export function sambraielicDayOfYear(year, month, day) {
  const core = gregorianToSamb(year, month, day);
  return core.dayOfYear;
}

export function resolveCheckpointForDate(year, month, day) {
  const anchorYear = month === 12 && day >= 22 ? year : year - 1;
  const dayOfYear = sambraielicDayOfYear(year, month, day);

  const withDays = SAMBRAIELIC_HOURLY_CHECKPOINTS.map((cp) => ({
    ...cp,
    dayOfYear: checkpointDayOfYear(cp.month, cp.day, anchorYear),
  })).sort((a, b) => a.dayOfYear - b.dayOfYear);

  let active = withDays[0];
  for (const cp of withDays) {
    if (dayOfYear >= cp.dayOfYear) active = cp;
  }
  return { dayOfYear, checkpoints: withDays, active };
}
