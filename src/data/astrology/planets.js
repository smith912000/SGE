import { getPlanetSymbolism } from '../symbolism/planetSymbolism.js';

export const P_SYM = { Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃", Saturn: "♄", Uranus: "⛢", Neptune: "♆", Pluto: "♇", Chiron: "⚷", Node: "☊", Lilith: "⚸" };
export const P_COL = {
  Sun: "#FFD700", Moon: "#d0dce8", Mercury: "#c9a840", Venus: "#ff80ab",
  Mars: "#ff5252", Jupiter: "#ffa726", Saturn: "#bcaa84", Uranus: "#4dd0e1",
  Neptune: "#5c6bc0", Pluto: "#ab47bc", Chiron: "#b388ff", Node: "#78909c", Lilith: "#e040fb",
};
export const P_ROLE = {
  Sun: "Identity", Moon: "Emotions", Mercury: "Thinking", Venus: "Love", Mars: "Drive",
  Jupiter: "Growth", Saturn: "Discipline", Uranus: "Change", Neptune: "Imagination", Pluto: "Transformation",
  Chiron: "Healing", Node: "Life Purpose", Lilith: "Shadow Self",
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
      plain: rec ? rec.plain : "",
      detail: rec ? rec.reading : "",
      principle: rec ? rec.principle : "",
      record: rec || null,
    }];
  })
);
