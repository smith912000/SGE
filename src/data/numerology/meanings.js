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

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

const TITLES = {
  1:  { title: "The Leader",         archetype: "Pioneer / Initiator" },
  2:  { title: "The Diplomat",       archetype: "Peacemaker / Partner" },
  3:  { title: "The Communicator",   archetype: "Artist / Expresser" },
  4:  { title: "The Builder",        archetype: "Worker / Foundation" },
  5:  { title: "The Seeker",         archetype: "Traveller / Changer" },
  6:  { title: "The Nurturer",       archetype: "Carer / Harmoniser" },
  7:  { title: "The Analyst",        archetype: "Mystic / Investigator" },
  8:  { title: "The Executive",      archetype: "Steward / Power" },
  9:  { title: "The Humanitarian",   archetype: "Completer / Giver" },
  11: { title: "The Illuminator",    archetype: "Master number — visionary" },
  22: { title: "The Master Builder", archetype: "Master number — architect" },
  33: { title: "The Teacher",        archetype: "Master number — carer" },
};

export const LIFE_PATH_MEANING = Object.fromEntries(
  NUMBERS.map((n) => {
    const rec = getNumerologySymbolism(n);
    return [n, {
      ...(TITLES[n] || { title: String(n), archetype: "" }),
      desc: rec ? rec.plain : "",
      detail: rec ? rec.reading : "",
      principle: rec ? rec.principle : "",
      record: rec || null,
    }];
  })
);

// The name total, reduced.
export const EXPRESSION_MEANING = {
  1:  "a name-total read as initiation and single direction",
  2:  "a name-total read as pairing, receptivity and mediation",
  3:  "a name-total read as expression, multiplicity and the spoken word",
  4:  "a name-total read as boundary, measure and the built foundation",
  5:  "a name-total read as movement, change and the crossing of limits",
  6:  "a name-total read as care, proportion and the tended household",
  7:  "a name-total read as withdrawal, analysis and the hidden order",
  8:  "a name-total read as weight, mastery and the administered world",
  9:  "a name-total read as completion, dissolution and what is given away",
  11: "held as a master number in most schools; read as a heightened two, and whether it reduces is disputed",
  22: "held as a master number in most schools; read as a heightened four, and whether it reduces is disputed",
  33: "held as a master number in most schools; read as a heightened six, and whether it reduces is disputed",
};

// The vowels of the name.
export const SOUL_URGE_MEANING = {
  1:  "the vowel-total of one — the tradition places independence at the centre",
  2:  "the vowel-total of two — the tradition places union and response at the centre",
  3:  "the vowel-total of three — the tradition places utterance and delight at the centre",
  4:  "the vowel-total of four — the tradition places order and endurance at the centre",
  5:  "the vowel-total of five — the tradition places freedom and appetite at the centre",
  6:  "the vowel-total of six — the tradition places care and belonging at the centre",
  7:  "the vowel-total of seven — the tradition places solitude and enquiry at the centre",
  8:  "the vowel-total of eight — the tradition places authority and consequence at the centre",
  9:  "the vowel-total of nine — the tradition places release and universality at the centre",
  11: "a master vowel-total in most schools; read as an intensified two",
  22: "a master vowel-total in most schools; read as an intensified four",
  33: "a master vowel-total in most schools; read as an intensified six",
};

// The consonants of the name — the outward face in the tradition.
export const PERSONALITY_MEANING = {
  1:  "a consonant-total presented in the tradition as forthright and self-directed",
  2:  "a consonant-total presented in the tradition as mild and approachable",
  3:  "a consonant-total presented in the tradition as vivid and sociable",
  4:  "a consonant-total presented in the tradition as steady and plain",
  5:  "a consonant-total presented in the tradition as quick and unsettled",
  6:  "a consonant-total presented in the tradition as warm and responsible",
  7:  "a consonant-total presented in the tradition as reserved and watchful",
  8:  "a consonant-total presented in the tradition as weighty and commanding",
  9:  "a consonant-total presented in the tradition as open-handed and wide-ranging",
  11: "a master consonant-total; read as a two carrying more charge",
  22: "a master consonant-total; read as a four carrying more charge",
  33: "a master consonant-total; read as a six carrying more charge",
};

// The day of the month, reduced.
export const BIRTHDAY_MEANING = {
  1:  "the day-number of initiation — the first stroke",
  2:  "the day-number of pairing — the second that answers the first",
  3:  "the day-number of expression — the third that issues from two",
  4:  "the day-number of measure — the square and the foundation",
  5:  "the day-number of movement — the centre of the decad, and its hinge",
  6:  "the day-number of proportion — the first perfect number in the Greek reckoning",
  7:  "the day-number of withdrawal — the number the tradition sets apart",
  8:  "the day-number of consequence — the cube of two, and the ordered world",
  9:  "the day-number of completion — the last before the return to unity",
  11: "a master day-number; read as a two held unreduced",
  22: "a master day-number; read as a four held unreduced",
  33: "a master day-number; read as a six held unreduced",
};
