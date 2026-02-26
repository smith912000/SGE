/* ─────────────────────────────────────────────────────────────
   ZODIAC ↔ CHINESE IDEOGRAM ↔ BOPOMOFO CORRESPONDENCES
   ───────────────────────────────────────────────────────────── */
export const ZODIAC_CHINESE_MAP = [
  { sign:"Capricorn",   chinese:"羓", pinyin:"bā", meaning:"Goat (Legendary)", bopomofo:"ㄛ", hebrew:"ע" },
  { sign:"Aquarius",    chinese:"瓶", pinyin:"píng", meaning:"Vase (Bearer of Water)", bopomofo:"ㄘ", hebrew:"צ" },
  { sign:"Pisces",      chinese:"魚", pinyin:"yú", meaning:"Fish", bopomofo:"ㄑ", hebrew:"ק" },
  { sign:"Aries",       chinese:"羘", pinyin:"zāng", meaning:"Ram", bopomofo:"ㄏ", hebrew:"ה" },
  { sign:"Taurus",      chinese:"牞", pinyin:"jiū", meaning:"Bull", bopomofo:"ㄡ", hebrew:"ו" },
  { sign:"Gemini",      chinese:"雙", pinyin:"shuāng", meaning:"Twins", bopomofo:"ㄗ", hebrew:"ז" },
  { sign:"Cancer",      chinese:"蠏", pinyin:"xiè", meaning:"Crab", bopomofo:"ㄎ", hebrew:"ח" },
  { sign:"Leo",         chinese:"獅", pinyin:"shī", meaning:"Lion", bopomofo:"ㄊ", hebrew:"ט" },
  { sign:"Virgo",       chinese:"婐", pinyin:"wǒ", meaning:"Maiden", bopomofo:"ㄧ", hebrew:"י" },
  { sign:"Libra",       chinese:"秤", pinyin:"chèng", meaning:"Scales", bopomofo:"ㄖ", hebrew:"ל" },
  { sign:"Scorpio",     chinese:"萬", pinyin:"wàn", meaning:"Scorpion", bopomofo:"ㄋ", hebrew:"נ" },
  { sign:"Sagittarius", chinese:"羿", pinyin:"yì", meaning:"Archer (Legendary)", bopomofo:"ㄙ", hebrew:"ס" },
];

export const CHINESE_ZODIAC_HEBREW = [
  { animal:"鼠", pinyin:"shǔ", english:"Rat", hebrew:"ב", bopomofo:"ㄅ" },
  { animal:"牛", pinyin:"niú", english:"Ox", hebrew:"מ", bopomofo:"ㄇ" },
  { animal:"虎", pinyin:"hǔ", english:"Tiger", hebrew:"ת", bopomofo:"ㄉ" },
  { animal:"兔", pinyin:"tù", english:"Rabbit", hebrew:"כ", bopomofo:"ㄍ" },
  { animal:"龍", pinyin:"lóng", english:"Dragon", hebrew:"א", bopomofo:"ㄜ" },
  { animal:"蛇", pinyin:"shé", english:"Snake", hebrew:"ע", bopomofo:"ㄚ" },
  { animal:"馬", pinyin:"mǎ", english:"Horse", hebrew:"פ", bopomofo:"ㄆ" },
  { animal:"羊", pinyin:"yáng", english:"Sheep", hebrew:"ש", bopomofo:"ㄕ" },
  { animal:"猴", pinyin:"hóu", english:"Monkey", hebrew:"ר", bopomofo:"ㄖ" },
  { animal:"雞", pinyin:"jī", english:"Rooster", hebrew:"ד", bopomofo:"ㄉ" },
  { animal:"狗", pinyin:"gǒu", english:"Dog", hebrew:"מ", bopomofo:"ㄇ" },
  { animal:"豬", pinyin:"zhū", english:"Pig", hebrew:"ג", bopomofo:"ㄍ" },
];

/* ─────────────────────────────────────────────────────────────
   MUSICAL SCALE — OCCULTIC CORRESPONDENCES
   ───────────────────────────────────────────────────────────── */
export const MUSICAL_SCALE_OCCULT = {
  notes7:["C","D","E","F","G","A","B"],
  accidentals5:["C♯","D♯","F♯","G♯","A♯"],
  desc:"7 Key Notes = 7 Planets. 5 Accidentals = 5 Elements. Full 12-note chromatic = 12 Zodiac. With the octave: 13 notes — Ophiuchus, the hidden sign.",
  pentatonic:"The 5 accidentals form a pentatonic chord (Chinese Zhǐ scale = Fire, the colour red, number 8 in feng shui). Also the Japanese Ritsusen/Yō scale and Hindustani Durga.",
};
