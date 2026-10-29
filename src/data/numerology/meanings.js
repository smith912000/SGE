// Number meanings over the symbolic record layer.
//
// LIFE_PATH_MEANING is an object per number. The other four maps are short
// strings, matching what their consumers render. Each names what the tradition
// attributes to that number in that position. See docs/VOICE.md.
//
// Pythagorean and Chaldean assign letters different values, so a name yields
// different numbers under the two. The method has to be named for any of these
// to mean anything.

import { getNumerologySymbolism } from '../symbolism/numerologySymbolism.js';
import { terse } from '../symbolism/terse.js';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

// Title: the Pythagorean name of the number. Archetype: the label modern
// numerology gives it, named as such so the two lineages stay distinct.
const TITLES = {
  1:  { title: "The Monad",   archetype: "Modern numerology: the Leader" },
  2:  { title: "The Dyad",    archetype: "Modern numerology: the Diplomat" },
  3:  { title: "The Triad",   archetype: "Modern numerology: the Communicator" },
  4:  { title: "The Tetrad",  archetype: "Modern numerology: the Builder" },
  5:  { title: "The Pentad",  archetype: "Modern numerology: the Seeker" },
  6:  { title: "The Hexad",   archetype: "Modern numerology: the Nurturer" },
  7:  { title: "The Heptad",  archetype: "Modern numerology: the Analyst" },
  8:  { title: "The Ogdoad",  archetype: "Modern numerology: the Executive" },
  9:  { title: "The Ennead",  archetype: "Modern numerology: the Humanitarian" },
  11: { title: "Master number 11", archetype: "Modern numerology: the Illuminator" },
  22: { title: "Master number 22", archetype: "Modern numerology: the Master Builder" },
  33: { title: "Master number 33", archetype: "Modern numerology: the Teacher" },
};

export const LIFE_PATH_MEANING = Object.fromEntries(
  NUMBERS.map((n) => {
    const rec = getNumerologySymbolism(n);
    return [n, {
      ...(TITLES[n] || { title: String(n), archetype: "" }),
      desc: rec ? terse(rec) : "",
      detail: rec ? rec.reading : "",
      principle: rec ? rec.principle : "",
      record: rec || null,
    }];
  })
);

// The name total, reduced.
export const EXPRESSION_MEANING = {
  1: "initiation · single direction",
  2: "pairing · receptivity",
  3: "expression · multiplicity",
  4: "boundary · measure",
  5: "movement · change",
  6: "care · proportion",
  7: "withdrawal · enquiry",
  8: "weight · mastery",
  9: "completion · release",
  11: "master number · heightened two",
  22: "master number · heightened four",
  33: "master number · heightened six",
};

// The vowels of the name.
export const SOUL_URGE_MEANING = {
  1: "independence",
  2: "union · response",
  3: "utterance · delight",
  4: "order · endurance",
  5: "freedom · appetite",
  6: "care · belonging",
  7: "solitude · enquiry",
  8: "authority · consequence",
  9: "release · universality",
  11: "intensified two",
  22: "intensified four",
  33: "intensified six",
};

// The consonants of the name — the outward face in the tradition.
export const PERSONALITY_MEANING = {
  1: "forthright",
  2: "mild · approachable",
  3: "vivid · sociable",
  4: "steady · plain",
  5: "quick · unsettled",
  6: "warm · responsible",
  7: "reserved · watchful",
  8: "weighty · commanding",
  9: "open-handed",
  11: "two, carrying more charge",
  22: "four, carrying more charge",
  33: "six, carrying more charge",
};

// The day of the month, reduced.
export const BIRTHDAY_MEANING = {
  1: "the first stroke",
  2: "the second that answers the first",
  3: "the third issuing from two",
  4: "the square · the foundation",
  5: "the hinge of the decad",
  6: "the first perfect number",
  7: "the number set apart",
  8: "the cube of two",
  9: "the last before return",
  11: "a two held unreduced",
  22: "a four held unreduced",
  33: "a six held unreduced",
};
