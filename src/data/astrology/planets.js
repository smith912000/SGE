import { getPlanetSymbolism } from '../symbolism/planetSymbolism.js';
import { terse } from '../symbolism/terse.js';

// U+FE0E: text glyphs, not emoji (♀ ♂ and others turn into emoji on phones).
export const P_SYM = Object.fromEntries(Object.entries({ Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃", Saturn: "♄", Uranus: "⛢", Neptune: "♆", Pluto: "♇", Chiron: "⚷", Node: "☊", Lilith: "⚸" }).map(([k, g]) => [k, g + "\uFE0E"]));
// Muted planetary colours after the traditional metals: gold, silver,
// quicksilver, copper, iron, tin, lead; the modern bodies in cool tones.
export const P_COL = {
  Sun: "#E9C766", Moon: "#D8DEE6", Mercury: "#B8C4B0", Venus: "#D7A6A0",
  Mars: "#D07262", Jupiter: "#A5A9D9", Saturn: "#A89A82", Uranus: "#8FC1C9",
  Neptune: "#7F95C9", Pluto: "#A27D9A", Chiron: "#B9A9F0", Node: "#A6A2B0", Lilith: "#B88AA8",
};
export const P_ROLE = {
  // Classical designations. The seven traditional bodies carry the office the
  // Hellenistic and medieval sources give them; the rest are named for what
  // they are, since no classical office exists for them.
  Sun: "greater light", Moon: "lesser light", Mercury: "messenger",
  Venus: "lesser benefic", Mars: "lesser malefic",
  Jupiter: "greater benefic", Saturn: "greater malefic",
  Uranus: "modern addition", Neptune: "modern addition", Pluto: "modern addition",
  Chiron: "modern addition", Lilith: "lunar apogee",
  Node: "north node", Rahu: "north node", Ketu: "south node",
};
export const PL = {};

// Letter, gematria and label data for each body. Structural, not interpretive.
export const PLANET_LETTER = {
  "Sun": {
    "title": "The Sun ☉",
    "emoji": "☀️",
    "hebrew": "כ",
    "hiero": "𓂧",
    "gematriaVal": 20,
    "letterName": "Kaph (Palm)"
  },
  "Moon": {
    "title": "The Moon ☽",
    "emoji": "🌙",
    "hebrew": "ת",
    "hiero": "𓏴",
    "gematriaVal": 400,
    "letterName": "Tav (Mark)"
  },
  "Mercury": {
    "title": "Mercury ☿",
    "emoji": "💬",
    "hebrew": "ר",
    "hiero": "𓁶",
    "gematriaVal": 200,
    "letterName": "Resh (Head)"
  },
  "Venus": {
    "title": "Venus ♀",
    "emoji": "💖",
    "hebrew": "פ",
    "hiero": "𓂋",
    "gematriaVal": 80,
    "letterName": "Pe (Mouth)"
  },
  "Mars": {
    "title": "Mars ♂",
    "emoji": "🔥",
    "hebrew": "ד",
    "hiero": "𓉿",
    "gematriaVal": 4,
    "letterName": "Dalet (Door)"
  },
  "Jupiter": {
    "title": "Jupiter ♃",
    "emoji": "🌟",
    "hebrew": "ג",
    "hiero": "𓌙",
    "gematriaVal": 3,
    "letterName": "Gimel (Camel)"
  },
  "Saturn": {
    "title": "Saturn ♄",
    "emoji": "⏳",
    "hebrew": "ב",
    "hiero": "𓉐",
    "gematriaVal": 2,
    "letterName": "Bet (House)"
  },
  "Uranus": {
    "title": "Uranus ⛢",
    "emoji": "⚡",
    "hebrew": null,
    "hiero": null,
    "gematriaVal": null,
    "letterName": null
  },
  "Neptune": {
    "title": "Neptune ♆",
    "emoji": "🌊",
    "hebrew": null,
    "hiero": null,
    "gematriaVal": null,
    "letterName": null
  },
  "Pluto": {
    "title": "Pluto ♇",
    "emoji": "💀",
    "hebrew": null,
    "hiero": null,
    "gematriaVal": null,
    "letterName": null
  },
  "Chiron": {
    "title": "Chiron ⚷",
    "emoji": "🩹",
    "hebrew": null,
    "hiero": null,
    "gematriaVal": null,
    "letterName": null
  },
  "Node": {
    "title": "North Node ☊",
    "emoji": "🧭",
    "hebrew": null,
    "hiero": null,
    "gematriaVal": null,
    "letterName": null
  },
  "Lilith": {
    "title": "Black Moon Lilith ⚸",
    "emoji": "🌑",
    "hebrew": null,
    "hiero": null,
    "gematriaVal": null,
    "letterName": null
  }
};

// PLANET_INFO keeps the shape older components expect, but every line of prose
// now comes from the symbolic record layer. See docs/VOICE.md.
export const PLANET_INFO = Object.fromEntries(
  Object.entries(PLANET_LETTER).map(([body, meta]) => {
    const rec = getPlanetSymbolism(body);
    return [body, {
      ...meta,
      plain: rec ? terse(rec) : "",
      detail: rec ? rec.reading : "",
      principle: rec ? rec.principle : "",
      record: rec || null,
    }];
  })
);
