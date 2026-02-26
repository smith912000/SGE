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
  Conjunction:"same place — energies fuse together", Opposition:"directly across — a push-pull dynamic",
  Trine:"120° apart — natural ease and flow", Square:"90° — creative friction that drives growth",
  Sextile:"60° — gentle opportunity", Quincunx:"150° — requires constant adjustment",
  Semisquare:"45° — minor irritant", Sesquiquadrate:"135° — inner restlessness",
};
export const ASP_SHORT = {
  Conjunction:"energies merge",Opposition:"push-pull tension",Trine:"natural flow",
  Square:"friction that drives growth",Sextile:"gentle opportunity",Quincunx:"constant adjustment",
  Semisquare:"minor irritation",Sesquiquadrate:"inner restlessness",
};
export const ASPECT_MEANINGS = {
  Conjunction:    "Two planets merge their energies in the same spot. Very powerful — they amplify each other, for better or worse.",
  Opposition:     "Two planets face off across the chart. Creates tension and awareness — like two forces pulling in opposite directions that must learn to cooperate.",
  Trine:          "Two planets in harmony, flowing easily together. Natural talent and ease — though sometimes so comfortable that the energy isn't fully used.",
  Square:         "Two planets in friction, forcing action. Challenging, but produces results through effort. The source of much drive and achievement.",
  Sextile:        "Two planets at a friendly 60° angle, offering opportunities. Less automatic than a trine — the energy needs a little activation.",
  Quincunx:       "An awkward angle requiring constant adjustment. Two energies that don't naturally understand each other but must keep adapting.",
  Semisquare:     "A minor irritation — small but nagging friction between two planetary energies that requires minor course corrections.",
  Sesquiquadrate: "A minor tense angle, like a square but more internal. Creates inner restlessness and a drive to resolve conflicting impulses.",
};
