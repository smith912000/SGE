export const ASPECTS = [
  { name:"Conjunction",    angle:0,   orb:8, sym:"☌", col:"#FFD700" },
  { name:"Opposition",     angle:180, orb:8, sym:"☍", col:"#ff5252" },
  { name:"Trine",          angle:120, orb:6, sym:"△", col:"#69ff8e" },
  { name:"Square",         angle:90,  orb:6, sym:"□", col:"#ff8a50" },
  { name:"Sextile",        angle:60,  orb:4, sym:"⚹", col:"#64b5f6" },
  { name:"Quincunx",       angle:150, orb:3, sym:"⚻", col:"#ce93d8" },
  { name:"Semisquare",     angle:45,  orb:2, sym:"∠", col:"#f48fb1" },
  { name:"Sesquiquadrate", angle:135, orb:2, sym:"⚼", col:"#ffcc80" },
];
export const ASP_EXPLAIN = {
  Conjunction:"0°, the same degree", Opposition:"180°, the axis",
  Trine:"120°, signs of the same element", Square:"90°, same mode and different element",
  Sextile:"60°, compatible elements", Quincunx:"150°, no element or mode in common",
  Semisquare:"45°, half a square", Sesquiquadrate:"135°, a square and a half",
};
export const ASP_SHORT = {
  Conjunction:"same degree",Opposition:"the axis",Trine:"same element",
  Square:"same mode",Sextile:"compatible elements",Quincunx:"nothing in common",
  Semisquare:"half a square",Sesquiquadrate:"a square and a half",
};
export const ASPECT_MEANINGS = {
  Conjunction:    "Two bodies at the same degree. Ptolemaic.",
  Opposition:     "Two bodies 180° apart, on one axis. Ptolemaic.",
  Trine:          "120° apart, in signs sharing an element. Ptolemaic.",
  Square:         "90° apart, sharing a mode but not an element. Ptolemaic.",
  Sextile:        "60° apart, in compatible elements. Ptolemaic.",
  Quincunx:       "150° apart, sharing neither element nor mode. A later addition.",
  Semisquare:     "45° apart, half a square. Attributed to Kepler.",
  Sesquiquadrate: "135° apart, a square and a half. Attributed to Kepler.",
};

// Adjectival form, for "Transiting Mars conjunct natal Saturn".
export const ASP_ADJ = {
  Conjunction: "conjunct", Opposition: "opposite", Trine: "trine", Square: "square",
  Sextile: "sextile", Quincunx: "quincunx", Semisquare: "semisquare",
  Sesquiquadrate: "sesquiquadrate",
};
