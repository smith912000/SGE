/* ─────────────────────────────────────────────────────────────
   EGYPTIAN HIEROGLYPHIC UNILITERAL SIGNS — Full set with IPA,
   colour (traditional pigment), and description
   ───────────────────────────────────────────────────────────── */
export const EGYPTIAN_UNILITERALS = [
  { glyph:"𓄿", ipa:"ʔ/j/r/l", color:"polychrome", name:"Egyptian Vulture", translit:"ꜣ", gardiner:"G1" },
  { glyph:"𓇋", ipa:"j/i", color:"green", name:"Flowering Reed", translit:"j", gardiner:"M17" },
  { glyph:"𓇌", ipa:"i:/j", color:"green", name:"Pair of Reeds", translit:"jj", gardiner:"M17A" },
  { glyph:"𓏭", ipa:"i:/j", color:"blue", name:"Pair of Strokes", translit:"y", gardiner:"Z4" },
  { glyph:"𓂝", ipa:"ʕ", color:"red", name:"Forearm", translit:"ꜥ", gardiner:"D36" },
  { glyph:"𓅱", ipa:"w/u", color:"yellow", name:"Quail Chick", translit:"w", gardiner:"G43" },
  { glyph:"𓏲", ipa:"w/u", color:"yellow", name:"Hieratic Abbreviation", translit:"w", gardiner:"Z7" },
  { glyph:"𓃀", ipa:"b", color:"red", name:"Lower Leg / Foot", translit:"b", gardiner:"D58" },
  { glyph:"𓊪", ipa:"p", color:"green", name:"Reed Mat / Stool / Socle", translit:"p", gardiner:"Q3" },
  { glyph:"𓆑", ipa:"f", color:"yellow", name:"Horned Viper", translit:"f", gardiner:"I9" },
  { glyph:"𓅓", ipa:"m", color:"yellow", name:"Owl", translit:"m", gardiner:"G17" },
  { glyph:"𓈖", ipa:"n", color:"black", name:"Water (rippling)", translit:"n", gardiner:"N35" },
  { glyph:"𓂋", ipa:"r/l", color:"red", name:"Human Mouth", translit:"r", gardiner:"D21" },
  { glyph:"𓉔", ipa:"h", color:"blue", name:"Reed Shelter", translit:"h", gardiner:"O4" },
  { glyph:"𓎛", ipa:"ħ", color:"green", name:"Twisted Wick / Eternity", translit:"ḥ", gardiner:"V28" },
  { glyph:"𓐍", ipa:"χ", color:"green", name:"Sieve or Placenta", translit:"ḫ", gardiner:"Aa1" },
  { glyph:"𓄡", ipa:"ç", color:"multiple", name:"Animal Belly and Tail", translit:"ẖ", gardiner:"F32" },
  { glyph:"𓊃", ipa:"s/z", color:"red", name:"Door Bolt", translit:"s", gardiner:"O34" },
  { glyph:"𓋴", ipa:"s", color:"red", name:"Folded Cloth", translit:"s", gardiner:"S29" },
  { glyph:"𓈙", ipa:"ʃ", color:"blue", name:"Garden / Pool", translit:"š", gardiner:"N37" },
  { glyph:"𓈎", ipa:"q/k", color:"blue", name:"Hill / Slope", translit:"q", gardiner:"N29" },
  { glyph:"𓎡", ipa:"k", color:"green", name:"Basket with Handle", translit:"k", gardiner:"V31" },
  { glyph:"𓎼", ipa:"g", color:"red", name:"Jar Stand", translit:"g", gardiner:"W11" },
  { glyph:"𓏏", ipa:"t", color:"blue", name:"Bread Loaf", translit:"t", gardiner:"X1" },
  { glyph:"𓍿", ipa:"tʃ/θ", color:"green", name:"Tethering Rope / Hobble", translit:"ṯ", gardiner:"V13" },
  { glyph:"𓂧", ipa:"d", color:"red", name:"Hand", translit:"d", gardiner:"D46" },
  { glyph:"𓆓", ipa:"dʒ", color:"yellow", name:"Snake / Serpent", translit:"ḏ", gardiner:"I10" },
];

/* ─────────────────────────────────────────────────────────────
   PHOENICIAN ACROPHONY — Proto-Canaanite to Phoenician name
   changes per Nöldeke's 1904 theory
   ───────────────────────────────────────────────────────────── */
export const ACROPHONY_SHIFTS = [
  { letter:"𐤂", original:"gaml", meaning:"throwing stick", shifted:"gimel", shiftMeaning:"camel" },
  { letter:"𐤃", original:"digg", meaning:"fish", shifted:"dalet", shiftMeaning:"door" },
  { letter:"𐤄", original:"hll (hillul)", meaning:"jubilation", shifted:"he", shiftMeaning:"window" },
  { letter:"𐤆", original:"ziqq", meaning:"manacle", shifted:"zayin", shiftMeaning:"weapon" },
  { letter:"𐤍", original:"naḥš", meaning:"snake", shifted:"nun", shiftMeaning:"fish" },
  { letter:"𐤐", original:"piʾt", meaning:"corner", shifted:"pe", shiftMeaning:"mouth" },
  { letter:"𐤔", original:"šimš", meaning:"sun", shifted:"šin", shiftMeaning:"tooth" },
];
