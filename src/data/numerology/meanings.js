// Number meanings over the symbolic record layer.
//
// The five maps below are the five positions a number can occupy in a reading.
// The number's attributed meaning is the same in each; the position is the
// context, and the interface names it. See docs/VOICE.md.

import { getNumerologySymbolism } from '../symbolism/numerologySymbolism.js';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

const TITLES = {
  1:  { title: "The Leader",       archetype: "Pioneer / Initiator" },
  2:  { title: "The Diplomat",     archetype: "Peacemaker / Partner" },
  3:  { title: "The Communicator", archetype: "Artist / Expresser" },
  4:  { title: "The Builder",      archetype: "Worker / Foundation" },
  5:  { title: "The Seeker",       archetype: "Traveller / Changer" },
  6:  { title: "The Nurturer",     archetype: "Carer / Harmoniser" },
  7:  { title: "The Analyst",      archetype: "Mystic / Investigator" },
  8:  { title: "The Executive",    archetype: "Steward / Power" },
  9:  { title: "The Humanitarian", archetype: "Completer / Giver" },
  11: { title: "The Illuminator",  archetype: "Master number — visionary" },
  22: { title: "The Master Builder", archetype: "Master number — architect" },
  33: { title: "The Teacher",      archetype: "Master number — carer" },
};

function build() {
  return Object.fromEntries(
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
}

export const LIFE_PATH_MEANING   = build();
export const EXPRESSION_MEANING  = build();
export const SOUL_URGE_MEANING   = build();
export const PERSONALITY_MEANING = build();
export const BIRTHDAY_MEANING    = build();
