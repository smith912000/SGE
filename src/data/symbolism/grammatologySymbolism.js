/* ─────────────────────────────────────────────────────────────
   GRAMMATOLOGY — SYMBOLISM OF THE TWENTY-TWO HEBREW LETTERS

   One record per letter, keyed by the hebrewName used in
   src/data/grammatology/letterDb.js (Aleph … Tav).

   Each record names: the letter form, the meaning of the letter
   name, the numerical value, and the Sepher Yetzirah class
   (three mothers, seven doubles, twelve simples).

   Two attribution schemes are held apart deliberately:
     1. the Sepher Yetzirah's own elemental/planetary/zodiacal
        assignments, and
     2. the Golden Dawn's assignment of letters to the twenty-two
        paths of the Tree of Life.
   These are NOT the same scheme and do not agree.

   Tarot trump assignments are marked contested throughout: the
   Golden Dawn and the Continental systems following Levi and
   Papus attach different trumps to the same letters.

   Gematria totals are meaningless until the cipher is named.
   ───────────────────────────────────────────────────────────── */

const CIPHER_NOTE =
  "A gematria total means nothing until the cipher is named. Standard value (mispar hechrachi) counts this letter as stated; ordinal value (mispar siduri) counts it by its place from 1 to 22; reduced value (mispar katan) collapses it to a single digit. The same word yields three different totals under the three ciphers, and a fourth if final forms are given the extended values (mispar gadol).";

const SCHEME_NOTE =
  "The Sepher Yetzirah's classification and the Golden Dawn's Tree of Life path attribution are two separate systems laid over the same twenty-two letters. Neither derives from the other, and a correspondence taken from one cannot be checked against the other.";

function trumpNote(goldenDawn, continental) {
  return (
    "Tarot attribution is contested: the Golden Dawn attaches " +
    goldenDawn +
    " to this letter, while Continental systems following Levi and Papus attach " +
    continental +
    ". Neither ordering can be derived from the Sepher Yetzirah, which knows nothing of tarot."
  );
}

const RECENSION_NOTE =
  "The Sepher Yetzirah survives in several recensions (Short, Long, Saadia, and the Gra version edited from the Ari's readings), and they do not agree on which planet, quality or faculty attaches to which letter. The assignment given here follows the Gra recension, which is the one carried by this instrument.";

export const LETTER_SYMBOLISM = {
  Aleph: {
    plain:
      "Aleph is the first letter, written א, with the standard value 1. Its name means ox, and the sign descends from a pictograph of an ox head with horns.",
    reading:
      "The Sepher Yetzirah counts Aleph among the three mother letters and sets it over Air, over the trunk of the body, and over the temperate condition that stands between heat and cold. It is a silent consonant: it carries whatever vowel is placed with it and sounds nothing of its own. Later Kabbalistic reading takes its written shape as two Yods separated by a diagonal Vav, an upper water and a lower water held apart by a bar.",
    principle:
      "Aleph is the clearest place to see the two schemes come apart. Under the Sepher Yetzirah it is an elemental letter, one of three mothers, and has no planet and no sign. Under the Golden Dawn it is the eleventh path of the Tree of Life, joining Kether to Chokmah, a position the Sepher Yetzirah never assigns. Both attributions are old enough to be traditional and neither is a correction of the other.",
    energies: ["breath before speech", "the unsounded consonant", "air", "the yoked ox"],
    tensions: ["silence set against articulation", "one sign standing for a division into two"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Mother letter, set over Air, the trunk of the body, and the temperate season." },
      { lineage: "Golden Dawn", claim: "Path 11 of the Tree of Life, Kether to Chokmah, elemental Air." },
      { lineage: "Rabbinic midrash", claim: "The letter that stood silent while Bet opened the work of creation." }
    ],
    correspondences: [
      "standard value: 1",
      "class: mother letter",
      "element: Air (Sepher Yetzirah)",
      "Golden Dawn path: 11, Kether to Chokmah",
      "name meaning: ox"
    ],
    contested: [CIPHER_NOTE, SCHEME_NOTE, trumpNote("the Fool", "the Magician")],
    prompts: [
      "Which scheme is in force in this working: the elemental classification of the Sepher Yetzirah, or the path attribution of the Golden Dawn?",
      "Does the silence of this letter matter to the reading, or only its numerical value?"
    ]
  },

  Bet: {
    plain:
      "Bet is the second letter, written ב, with the standard value 2. Its name means house, and the sign descends from a pictograph of a floor plan or dwelling.",
    reading:
      "Bet is one of the seven doubles, letters with a hard and a soft pronunciation marked by the presence or absence of the dagesh. The Sepher Yetzirah pairs each double with a planet, a day, a direction and a pair of opposites; in the Gra recension Bet takes Saturn and the pair wisdom and folly. It is also the letter that opens the Torah, and rabbinic reading makes much of the fact that scripture begins with the second letter and not the first.",
    principle:
      "The planetary attribution of Bet is the sharpest single divergence between lineages. The Gra recension of the Sepher Yetzirah gives Bet to Saturn; the Golden Dawn and the wider Hermetic current give Bet to Mercury, on the path from Kether to Binah, and attach the Magician to it. Both attributions are internally consistent within their own systems and produce different results in practice. The instrument carries both, and the practitioner selects.",
    energies: ["enclosure", "the interior", "the opening word", "duality"],
    tensions: ["shelter against confinement", "Saturn in one lineage, Mercury in the other"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, planet Saturn, the pair wisdom and folly." },
      { lineage: "Golden Dawn", claim: "Path 12, Kether to Binah, planet Mercury, the Magician." },
      { lineage: "Rabbinic", claim: "The letter with which the world was created, closed on three sides and open forward." }
    ],
    correspondences: [
      "standard value: 2",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Saturn",
      "planet (Golden Dawn): Mercury",
      "Golden Dawn path: 12, Kether to Binah",
      "name meaning: house"
    ],
    contested: [CIPHER_NOTE, RECENSION_NOTE, trumpNote("the Magician", "the High Priestess")],
    prompts: [
      "Which planetary attribution does this working take for the doubles, and is that choice recorded anywhere in the working?",
      "Where else in this reading does the house appear as an image?"
    ]
  },

  Gimel: {
    plain:
      "Gimel is the third letter, written ג, with the standard value 3. Its name is read as camel, and some sources read it instead as a throwing stick or a foot in motion.",
    reading:
      "Gimel is a double letter. The Gra recension of the Sepher Yetzirah assigns it Jupiter and the pair wealth and poverty. The camel reading carries the sense of a bearer that crosses a waste and delivers what it carries; the foot reading carries simple motion. Rabbinic commentary pairs Gimel with Dalet as the rich one running after the poor one, taking the two letters as a single image rather than two.",
    principle:
      "Under the Golden Dawn scheme Gimel takes the thirteenth path, the long central path from Kether across the Abyss to Tiphareth, with the Moon and the High Priestess, which is a very different weight from Jupiter and wealth. The divergence is not a matter of one system being more careful than the other: the Sepher Yetzirah assigns planets to doubles by an internal ordering, while the Golden Dawn assigns them to fit a Tree diagram that the Sepher Yetzirah does not use.",
    energies: ["carrying across", "recompense", "motion between two states"],
    tensions: ["giving against withholding", "Jupiter in one lineage, the Moon in the other"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, planet Jupiter, the pair wealth and poverty." },
      { lineage: "Golden Dawn", claim: "Path 13, Kether to Tiphareth, the Moon, the High Priestess." },
      { lineage: "Rabbinic", claim: "Read together with Dalet as bestowal and reception." }
    ],
    correspondences: [
      "standard value: 3",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Jupiter",
      "planet (Golden Dawn): Moon",
      "Golden Dawn path: 13, Kether to Tiphareth",
      "name meaning: camel"
    ],
    contested: [CIPHER_NOTE, RECENSION_NOTE, trumpNote("the High Priestess", "the Empress")],
    prompts: [
      "Is Gimel being read on its own here, or as half of the Gimel and Dalet pair?",
      "Which of the two planetary lineages does the rest of this working already assume?"
    ]
  },

  Dalet: {
    plain:
      "Dalet is the fourth letter, written ד, with the standard value 4. Its name means door, and the sign descends from a pictograph of a door or a tent flap.",
    reading:
      "Dalet is a double letter. The Gra recension of the Sepher Yetzirah gives it Mars and the pair seed and desolation, fertility set against waste. The door is a threshold rather than a room: it names the moment of passage and not what lies on either side. In rabbinic reading Dalet is also dal, the poor one, the letter that receives from Gimel.",
    principle:
      "The Golden Dawn places Dalet on the fourteenth path, the horizontal path between Chokmah and Binah, with Venus and the Empress, which reverses the martial reading entirely. Two traditions here attach opposite temperaments to one letter, and the door image supports both: a threshold can be forced or it can be opened. Where a working depends on the temperament rather than the number, the lineage must be declared first.",
    energies: ["threshold", "passage", "reception"],
    tensions: ["opening against barring", "Mars in one lineage, Venus in the other"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, planet Mars, the pair seed and desolation." },
      { lineage: "Golden Dawn", claim: "Path 14, Chokmah to Binah, Venus, the Empress." },
      { lineage: "Rabbinic", claim: "Dal, the poor one, the receiver in the Gimel and Dalet pair." }
    ],
    correspondences: [
      "standard value: 4",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Mars",
      "planet (Golden Dawn): Venus",
      "Golden Dawn path: 14, Chokmah to Binah",
      "name meaning: door"
    ],
    contested: [CIPHER_NOTE, RECENSION_NOTE, trumpNote("the Empress", "the Emperor")],
    prompts: [
      "Is the door in this reading being approached, held open, or closed?",
      "Which temperament does the working need here, and does the chosen lineage supply it?"
    ]
  },

  He: {
    plain:
      "He is the fifth letter, written ה, with the standard value 5. Its name is read as window or lattice, and the letter is formed as a Dalet with a detached leg, leaving a gap in the lower left.",
    reading:
      "He is one of the twelve simple letters. The Sepher Yetzirah sets the simples over the twelve signs and the twelve months, and gives He to Aries and to the month of Nisan. In the Gra recension the twelve simples also carry twelve faculties, running in letter order from sight to sleep, with He taking sight. He appears twice in the four-letter Name, and Kabbalistic reading treats the two occurrences as an upper and a lower mother.",
    principle:
      "On the simples the two schemes agree more than they do elsewhere: the Golden Dawn kept the Sepher Yetzirah's zodiacal assignment, placing He on the fifteenth path between Chokmah and Tiphareth and attaching the Emperor and Aries to it. That agreement was broken in the twentieth century by Crowley's claim that the Star and the Emperor should exchange places, on the strength of a line read as denying Tsade the Star. Practitioners in that line swap He and Tsade; practitioners outside it do not.",
    energies: ["aperture", "breath let out", "sight"],
    tensions: ["the gap that admits light and also lets it escape", "an attribution that one modern lineage deliberately swapped"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Aries, month Nisan; faculty of sight in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 15, Chokmah to Tiphareth, Aries, the Emperor." },
      { lineage: "Thelemic revision", claim: "The Emperor and the Star are exchanged, moving this letter to Aquarius." }
    ],
    correspondences: [
      "standard value: 5",
      "class: simple letter",
      "sign: Aries",
      "month: Nisan",
      "Golden Dawn path: 15, Chokmah to Tiphareth",
      "name meaning: window"
    ],
    contested: [
      CIPHER_NOTE,
      "The exchange of the Emperor and the Star, and with it the swap of He and Tsade, is accepted in Thelemic practice and rejected in the older Golden Dawn line. Sources disagree, and the disagreement is doctrinal rather than textual.",
      trumpNote("the Emperor", "the Hierophant")
    ],
    prompts: [
      "Does this working follow the swap of He and Tsade, or the older assignment?",
      "Which of the two occurrences of He in the Name is at issue here?"
    ]
  },

  Vav: {
    plain:
      "Vav is the sixth letter, written ו, with the standard value 6. Its name means hook, nail or peg, and the sign is a single vertical stroke.",
    reading:
      "Vav is a simple letter. The Sepher Yetzirah gives it Taurus and the month of Iyar, and in the Gra recension the faculty of hearing. In grammar the letter does the work of joining: prefixed to a word it means and, and the conversive Vav turns a completed verb into an incomplete one and back again. Kabbalistic reading takes it as the link between the upper He and the lower He of the Name.",
    principle:
      "The hook is a structural image rather than a thing: it names the joint and not either of the members joined. The Golden Dawn keeps Taurus and places Vav on the sixteenth path from Chokmah to Chesed, attaching the Hierophant. Continental systems shift the trump by one, so the same letter carries the Lovers there. The zodiacal attribution survives the shift; the tarot attribution does not.",
    energies: ["the joint", "conjunction", "hearing"],
    tensions: ["binding that is also fastening down", "a connector with no content of its own"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Taurus, month Iyar; faculty of hearing in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 16, Chokmah to Chesed, Taurus, the Hierophant." },
      { lineage: "Kabbalistic", claim: "The Vav of the four-letter Name, joining the upper and lower He." }
    ],
    correspondences: [
      "standard value: 6",
      "class: simple letter",
      "sign: Taurus",
      "month: Iyar",
      "Golden Dawn path: 16, Chokmah to Chesed",
      "name meaning: hook or nail"
    ],
    contested: [CIPHER_NOTE, trumpNote("the Hierophant", "the Lovers")],
    prompts: [
      "What two things is this letter being asked to join in the reading?",
      "Is the grammatical sense of Vav as and doing any work here, or only the numerical value?"
    ]
  },

  Zayin: {
    plain:
      "Zayin is the seventh letter, written ז, with the standard value 7. Its name is read as weapon or sword, and the sign is a stroke with a crown or crossbar on top.",
    reading:
      "Zayin is a simple letter, given by the Sepher Yetzirah to Gemini and the month of Sivan, with the faculty of smell in the Gra recension. The weapon reading makes it the letter of division: what cuts separates one thing from another and makes distinction possible. Some sources read the form instead as a crowned Vav, a connector that has been given rulership.",
    principle:
      "The sword and the crowned peg are two readings of one shape, and they pull opposite ways: one severs, the other elevates. The Golden Dawn keeps Gemini and places Zayin on the seventeenth path from Binah to Tiphareth with the Lovers, the trump of choice between two, which suits division. Continental systems place the Chariot here instead. Where the reading turns on cutting rather than choosing, the lineage should be stated.",
    energies: ["division", "the cut that distinguishes", "smell"],
    tensions: ["severance against sovereignty", "a weapon read as a crown"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Gemini, month Sivan; faculty of smell in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 17, Binah to Tiphareth, Gemini, the Lovers." },
      { lineage: "Pictographic", claim: "A crowned Vav, connection raised to rulership." }
    ],
    correspondences: [
      "standard value: 7",
      "class: simple letter",
      "sign: Gemini",
      "month: Sivan",
      "Golden Dawn path: 17, Binah to Tiphareth",
      "name meaning: weapon or sword"
    ],
    contested: [CIPHER_NOTE, trumpNote("the Lovers", "the Chariot")],
    prompts: [
      "Is the cut in this reading a separation or a distinction?",
      "Which of the two readings of the form, sword or crowned peg, does the working take?"
    ]
  },

  Chet: {
    plain:
      "Chet is the eighth letter, written ח, with the standard value 8. Its name is read as fence, wall or courtyard, and the sign is two uprights joined by a bar across the top.",
    reading:
      "Chet is a simple letter, assigned by the Sepher Yetzirah to Cancer and the month of Tammuz, with the faculty of speech in the Gra recension. The enclosure reading gives it the sense of a bounded field: what is inside is marked off from what is outside, and the boundary itself is the letter. The root chai, life, is written with Chet and Yod, and much popular numerology rests on that word rather than on the letter.",
    principle:
      "The Golden Dawn keeps Cancer and places Chet on the eighteenth path from Binah to Geburah, attaching the Chariot, a covered vehicle that carries an enclosure through open ground. Continental systems place Justice here under the Marseille numbering, in which Justice is the eighth trump and Strength the eleventh. The trump numbering itself is contested before the letter attribution even begins.",
    energies: ["enclosure", "boundary", "speech"],
    tensions: ["protection against confinement", "what a wall keeps out and what it keeps in"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Cancer, month Tammuz; faculty of speech in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 18, Binah to Geburah, Cancer, the Chariot." },
      { lineage: "Continental", claim: "Justice, numbered eighth under the Marseille ordering." }
    ],
    correspondences: [
      "standard value: 8",
      "class: simple letter",
      "sign: Cancer",
      "month: Tammuz",
      "Golden Dawn path: 18, Binah to Geburah",
      "name meaning: fence or courtyard"
    ],
    contested: [
      CIPHER_NOTE,
      "The Golden Dawn numbers Strength as the eighth trump and Justice as the eleventh; the Marseille and Continental line reverses that. The letter attribution and the trump numbering are two separate disagreements stacked on the same card.",
      trumpNote("the Chariot", "Justice")
    ],
    prompts: [
      "Is the boundary in this reading being built, crossed, or held?",
      "Does the working use the Golden Dawn trump numbering or the Marseille numbering?"
    ]
  },

  Teth: {
    plain:
      "Teth is the ninth letter, written ט, with the standard value 9. Its name is read as basket or coiled serpent, and the sign is a vessel with the stroke turned inward at the top.",
    reading:
      "Teth is a simple letter, given by the Sepher Yetzirah to Leo and the month of Av, with the faculty of taste in the Gra recension. The inward-turning form is read as containment: something is held and hidden inside rather than displayed. Teth is the first letter of tov, good, and rabbinic reading connects the letter to a good concealed until it is brought out.",
    principle:
      "The Golden Dawn keeps Leo and places Teth on the nineteenth path between Chesed and Geburah, attaching Strength, numbered eighth in that system. Continental systems place the Hermit here, numbered ninth, which agrees with the letter's own numerical value and is one of the arguments used to defend that ordering. The coincidence of number is an argument, not a proof, and the two systems remain unreconciled.",
    energies: ["containment", "the coil", "the good held in reserve"],
    tensions: ["concealment against manifestation", "a serpent read as a basket"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Leo, month Av; faculty of taste in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 19, Chesed to Geburah, Leo, Strength." },
      { lineage: "Continental", claim: "The Hermit, whose number nine matches the value of the letter." }
    ],
    correspondences: [
      "standard value: 9",
      "class: simple letter",
      "sign: Leo",
      "month: Av",
      "Golden Dawn path: 19, Chesed to Geburah",
      "name meaning: basket or coiled serpent"
    ],
    contested: [CIPHER_NOTE, trumpNote("Strength", "the Hermit")],
    prompts: [
      "Does the numerical agreement between Teth and the ninth trump carry weight in this working, or is it treated as coincidence?",
      "What is being held inside the vessel in this reading?"
    ]
  },

  Yod: {
    plain:
      "Yod is the tenth letter, written י, with the standard value 10. Its name means hand, and it is the smallest letter in the alphabet, written as a single suspended point.",
    reading:
      "Yod is a simple letter, given by the Sepher Yetzirah to Virgo and the month of Elul, with the faculty of coition in the Gra recension. Every other letter is held to be formed from Yod, so the letter functions as the seed-stroke of the script. It is the first letter of the four-letter Name, and Kabbalistic reading takes it as the point from which the whole Name unfolds.",
    principle:
      "The Golden Dawn keeps Virgo and places Yod on the twentieth path from Chesed to Tiphareth with the Hermit, whose lamp and staff continue the image of a point of light carried. Continental systems place the Wheel of Fortune here instead, a wholly different figure. The Sepher Yetzirah supports neither: its own claim about Yod concerns a sign, a month and a faculty, and nothing about a trump.",
    energies: ["the point", "the generative stroke", "the hand that makes"],
    tensions: ["the smallest sign carrying the largest claim", "a seed that is not yet the thing"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Virgo, month Elul; faculty of coition in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 20, Chesed to Tiphareth, Virgo, the Hermit." },
      { lineage: "Kabbalistic", claim: "The point from which every other letter is drawn, and the first letter of the Name." }
    ],
    correspondences: [
      "standard value: 10",
      "class: simple letter",
      "sign: Virgo",
      "month: Elul",
      "Golden Dawn path: 20, Chesed to Tiphareth",
      "name meaning: hand"
    ],
    contested: [CIPHER_NOTE, trumpNote("the Hermit", "the Wheel of Fortune")],
    prompts: [
      "Is Yod read here as a hand that acts, or as a point that has not yet extended?",
      "Where else in the working does the same point recur at a larger scale?"
    ]
  },

  Kaph: {
    plain:
      "Kaph is the eleventh letter, written כ, with the standard value 20. Its name means the palm or the cupped hand, and it takes a final form ך at the end of a word.",
    reading:
      "Kaph is a double letter with a hard and a soft pronunciation. The Gra recension of the Sepher Yetzirah gives it the Sun and the pair life and death. The cupped palm is a vessel formed by the body itself: it holds only as long as it is held open, and the same hand closed becomes a fist. In the extended cipher the final form ך is counted as 500.",
    principle:
      "The Golden Dawn gives Kaph to Jupiter on the twenty-first path from Chesed to Netzach, with the Wheel of Fortune, while the Gra recension gives it the Sun. The Wheel and the Sun are not compatible readings, and the choice changes what the letter is taken to govern. Because Kaph has a final form, it is also one of the five letters where the extended cipher and the standard cipher diverge, which is a second and independent source of disagreement in any total.",
    energies: ["the vessel formed by the body", "capacity", "the turning"],
    tensions: ["the open palm against the closed fist", "the Sun in one lineage, Jupiter in the other"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, the Sun, the pair life and death." },
      { lineage: "Golden Dawn", claim: "Path 21, Chesed to Netzach, Jupiter, the Wheel of Fortune." },
      { lineage: "Scribal", claim: "One of the five letters with a distinct final form, valued 500 in the extended cipher." }
    ],
    correspondences: [
      "standard value: 20",
      "final form value (mispar gadol): 500",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Sun",
      "planet (Golden Dawn): Jupiter",
      "Golden Dawn path: 21, Chesed to Netzach",
      "name meaning: palm of the hand"
    ],
    contested: [CIPHER_NOTE, RECENSION_NOTE, trumpNote("the Wheel of Fortune", "Strength")],
    prompts: [
      "Does the total in this working count final forms at their extended values, and is that stated?",
      "Is the palm open or closed in the image being worked with?"
    ]
  },

  Lamed: {
    plain:
      "Lamed is the twelfth letter, written ל, with the standard value 30. Its name means ox-goad or staff, and it is the only letter that rises above the line of writing.",
    reading:
      "Lamed is a simple letter, given by the Sepher Yetzirah to Libra and the month of Tishrei, with the faculty of action or work in the Gra recension. The root lamad means to learn and to teach, so the goad that drives the ox and the instruction that directs a pupil are the same image. Its ascending stroke makes it the tallest letter, and scribal commentary reads the height as aspiration.",
    principle:
      "The Golden Dawn keeps Libra and places Lamed on the twenty-second path from Geburah to Tiphareth with Justice, numbered eleventh, which agrees closely with the Libran sense of the scale. Continental systems place the Hanged Man here. The agreement between the sign and the Golden Dawn trump is often cited as evidence for that scheme, but the Sepher Yetzirah assigned the sign centuries before the trump existed, so the agreement is a later fit rather than a confirmation.",
    energies: ["the goad", "instruction", "the ascending stroke"],
    tensions: ["driving against guiding", "the tallest letter set over the sign of balance"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Libra, month Tishrei; faculty of action in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 22, Geburah to Tiphareth, Libra, Justice." },
      { lineage: "Scribal", claim: "The only letter ascending above the ruled line." }
    ],
    correspondences: [
      "standard value: 30",
      "class: simple letter",
      "sign: Libra",
      "month: Tishrei",
      "Golden Dawn path: 22, Geburah to Tiphareth",
      "name meaning: ox-goad or staff"
    ],
    contested: [CIPHER_NOTE, trumpNote("Justice", "the Hanged Man")],
    prompts: [
      "Is the goad in this reading applied from outside, or taken up deliberately?",
      "Does the fit between Libra and Justice count as evidence in this working, or as coincidence?"
    ]
  },

  Mem: {
    plain:
      "Mem is the thirteenth letter, written מ, with the standard value 40. Its name means water, and it takes a closed final form ם at the end of a word.",
    reading:
      "Mem is one of the three mother letters. The Sepher Yetzirah sets it over Water, over the belly, and over the cold season, standing against Shin and fire with Aleph holding the balance between. The open medial form and the closed final form are read by Kabbalistic commentary as revealed water and concealed water, a distinction that has no parallel among the other mothers.",
    principle:
      "Mem carries no planet and no sign in the Sepher Yetzirah, because the mothers stand outside both of those series; the twelve simples take the signs and the seven doubles take the planets. The Golden Dawn preserves the element and places Mem on the twenty-third path from Geburah to Hod, attaching the Hanged Man. The elemental attribution is one of the few points where the two schemes coincide without strain, since both name Water.",
    energies: ["the deep", "the medium that takes any shape", "the closed and the open"],
    tensions: ["the revealed against the concealed water", "an element with no sign and no planet"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Mother letter, set over Water, the belly, and the cold season." },
      { lineage: "Golden Dawn", claim: "Path 23, Geburah to Hod, elemental Water, the Hanged Man." },
      { lineage: "Scribal and Kabbalistic", claim: "The open medial Mem and closed final Mem read as revealed and concealed." }
    ],
    correspondences: [
      "standard value: 40",
      "final form value (mispar gadol): 600",
      "class: mother letter",
      "element: Water (Sepher Yetzirah)",
      "Golden Dawn path: 23, Geburah to Hod",
      "name meaning: water"
    ],
    contested: [CIPHER_NOTE, SCHEME_NOTE, trumpNote("the Hanged Man", "Death")],
    prompts: [
      "Is the water in this reading the open form or the closed one?",
      "What holds the balance between this letter and Shin in the working at hand?"
    ]
  },

  Nun: {
    plain:
      "Nun is the fourteenth letter, written נ, with the standard value 50, and it takes a final form ן that descends below the line.",
    reading:
      "Nun is a simple letter, given by the Sepher Yetzirah to Scorpio and the month of Cheshvan, with the faculty of motion in the Gra recension. The name is read as fish and in Aramaic carries the sense of continuing or propagating. The bent medial form and the extended final form are read as a figure stooping and the same figure straightened.",
    principle:
      "The Golden Dawn keeps Scorpio and places Nun on the twenty-fourth path from Tiphareth to Netzach with Death, an attribution in which the sign and the trump reinforce one another. Continental systems place Temperance here. Where a working leans on the Death image, the whole weight of that reading comes from the Golden Dawn and not from the Sepher Yetzirah, which says only sign, month and faculty.",
    energies: ["continuation", "the fish in the deep", "descent and rising"],
    tensions: ["the bent form against the extended form", "a letter of propagation read as a letter of ending"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Scorpio, month Cheshvan; faculty of motion in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 24, Tiphareth to Netzach, Scorpio, Death." },
      { lineage: "Aramaic", claim: "The name carries the sense of fish and of continuing." }
    ],
    correspondences: [
      "standard value: 50",
      "final form value (mispar gadol): 700",
      "class: simple letter",
      "sign: Scorpio",
      "month: Cheshvan",
      "Golden Dawn path: 24, Tiphareth to Netzach",
      "name meaning: fish"
    ],
    contested: [CIPHER_NOTE, trumpNote("Death", "Temperance")],
    prompts: [
      "Is the Death attribution doing work in this reading, and does the working accept its lineage?",
      "Does the difference between the medial and final form matter to the passage being read?"
    ]
  },

  Samekh: {
    plain:
      "Samekh is the fifteenth letter, written ס, with the standard value 60. Its name means prop or support, and it is a closed ring, one of the few fully enclosed forms in the script.",
    reading:
      "Samekh is a simple letter, given by the Sepher Yetzirah to Sagittarius and the month of Kislev, with the faculty of anger in the Gra recension. The prop reading names a thing that holds something else up without being what it holds. The closed circular form is read in scribal commentary as an unbroken circuit, and it is one of two letters whose shape encloses a space entirely.",
    principle:
      "The Golden Dawn keeps Sagittarius and places Samekh on the twenty-fifth path from Tiphareth to Yesod, the central path of the Tree, attaching Temperance and treating the letter as the path of the arrow. Continental systems place the Devil here. The arrow reading depends on the Tree diagram, which the Sepher Yetzirah does not have, so the image cannot be traced back beyond the Golden Dawn.",
    energies: ["support from beneath", "the closed circuit", "the arrow drawn"],
    tensions: ["holding up against holding in", "a circle read as a trajectory"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Sagittarius, month Kislev; faculty of anger in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 25, Tiphareth to Yesod, Sagittarius, Temperance." },
      { lineage: "Scribal", claim: "A fully closed form, an unbroken ring." }
    ],
    correspondences: [
      "standard value: 60",
      "class: simple letter",
      "sign: Sagittarius",
      "month: Kislev",
      "Golden Dawn path: 25, Tiphareth to Yesod",
      "name meaning: prop or support"
    ],
    contested: [CIPHER_NOTE, trumpNote("Temperance", "the Devil")],
    prompts: [
      "What is being propped up in this reading, and what is doing the propping?",
      "Is the arrow image in play here, and does the working accept the Tree diagram it depends on?"
    ]
  },

  Ayin: {
    plain:
      "Ayin is the sixteenth letter, written ע, with the standard value 70. Its name means eye, and the same word means spring or fountain.",
    reading:
      "Ayin is a simple letter, given by the Sepher Yetzirah to Capricorn and the month of Tevet, with the faculty of laughter in the Gra recension. Like Aleph it is a guttural that carries no sound of its own in most modern pronunciations, so the letter is written and not heard. The double sense of the name, eye and spring, gives perception and source as one word.",
    principle:
      "The Golden Dawn keeps Capricorn and places Ayin on the twenty-sixth path from Tiphareth to Hod with the Devil, the goat-figure matching the sign. Continental systems place the Tower here. The Sepher Yetzirah names only the sign, the month and the faculty, and attaches no moral colouring at all; the demonic reading enters with the trump and belongs to that lineage rather than to the older text.",
    energies: ["perception", "the source", "the letter written and not sounded"],
    tensions: ["the eye that sees against the eye that is only surface", "an unsounded letter carrying a heavy trump"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Capricorn, month Tevet; faculty of laughter in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 26, Tiphareth to Hod, Capricorn, the Devil." },
      { lineage: "Lexical", claim: "The name means both eye and spring of water." }
    ],
    correspondences: [
      "standard value: 70",
      "class: simple letter",
      "sign: Capricorn",
      "month: Tevet",
      "Golden Dawn path: 26, Tiphareth to Hod",
      "name meaning: eye, also spring"
    ],
    contested: [CIPHER_NOTE, trumpNote("the Devil", "the Tower")],
    prompts: [
      "Is this letter read as the organ of sight or as the source that wells up?",
      "Does the moral weight of the Devil belong to the reading, or has it been imported from the trump?"
    ]
  },

  Pe: {
    plain:
      "Pe is the seventeenth letter, written פ, with the standard value 80. Its name means mouth, and it takes a final form ף at the end of a word.",
    reading:
      "Pe is a double letter with a hard and a soft pronunciation. The Gra recension of the Sepher Yetzirah gives it Venus and the pair dominance and subjugation. The mouth is read as the organ of speech and so as the point at which what is inward becomes outward; scribal commentary notes a Bet hidden inside the form, a house within the mouth.",
    principle:
      "The Golden Dawn gives Pe to Mars on the twenty-seventh path from Netzach to Hod, attaching the Tower, while the Gra recension gives it Venus with a pair of opposites concerning rule. The two are close in subject, since dominance and subjugation are martial ideas, and far apart in planet. That closeness of theme with divergence of attribution is exactly the pattern that makes unlabelled correspondence tables unusable.",
    energies: ["utterance", "the outward turn", "the house within the mouth"],
    tensions: ["speech against silence", "Venus in one lineage, Mars in the other"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, planet Venus, the pair dominance and subjugation." },
      { lineage: "Golden Dawn", claim: "Path 27, Netzach to Hod, Mars, the Tower." },
      { lineage: "Scribal", claim: "A Bet enclosed within the form of the letter." }
    ],
    correspondences: [
      "standard value: 80",
      "final form value (mispar gadol): 800",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Venus",
      "planet (Golden Dawn): Mars",
      "Golden Dawn path: 27, Netzach to Hod",
      "name meaning: mouth"
    ],
    contested: [CIPHER_NOTE, RECENSION_NOTE, trumpNote("the Tower", "the Star")],
    prompts: [
      "Is what this letter names being spoken or withheld in the passage at hand?",
      "Which planet does the working take for Pe, and is the choice recorded?"
    ]
  },

  Tsade: {
    plain:
      "Tsade is the eighteenth letter, written צ, with the standard value 90, and it takes a final form ץ. Its name is read as fishhook, and the letter is also associated with tzaddik, the righteous one.",
    reading:
      "Tsade is a simple letter, given by the Sepher Yetzirah to Aquarius and the month of Shevat, with the faculty of thought in the Gra recension. The fishhook reading names an instrument that draws something up out of water it cannot be seen in. The association with tzaddik comes from the letter name rather than from the Sepher Yetzirah, which makes no moral claim about it.",
    principle:
      "This letter sits at the centre of the sharpest modern dispute in the system. The Golden Dawn keeps Aquarius and places Tsade on the twenty-eighth path from Netzach to Yesod with the Star. Crowley read a received line as denying the Star to Tsade and exchanged the Star with the Emperor, which moves Tsade to Aries and He to Aquarius. Practitioners in the Thelemic line accept the swap; the older Golden Dawn line does not, and the two produce incompatible path diagrams.",
    energies: ["drawing up from below", "the hook", "thought"],
    tensions: ["righteousness as a name against righteousness as a claim", "an attribution deliberately overturned in one modern lineage"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Aquarius, month Shevat; faculty of thought in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 28, Netzach to Yesod, Aquarius, the Star." },
      { lineage: "Thelemic revision", claim: "The Star is taken from this letter and exchanged with the Emperor, moving it to Aries." }
    ],
    correspondences: [
      "standard value: 90",
      "final form value (mispar gadol): 900",
      "class: simple letter",
      "sign: Aquarius",
      "month: Shevat",
      "Golden Dawn path: 28, Netzach to Yesod",
      "name meaning: fishhook"
    ],
    contested: [
      CIPHER_NOTE,
      "The exchange of Tsade and He, and of the Star and the Emperor, divides modern practice. Sources disagree and the disagreement rests on the reading of a single received line, not on the Sepher Yetzirah.",
      trumpNote("the Star", "the Moon")
    ],
    prompts: [
      "Does this working follow the swap, and is that decision written down anywhere in it?",
      "Is the hook drawing something up here, or holding something fast?"
    ]
  },

  Qoph: {
    plain:
      "Qoph is the nineteenth letter, written ק, with the standard value 100. Its name is read as the back of the head or the eye of a needle, and its tail descends below the line of writing.",
    reading:
      "Qoph is a simple letter, given by the Sepher Yetzirah to Pisces and the month of Adar, with the faculty of sleep in the Gra recension. The back of the head names what is behind the field of sight and cannot be turned to face. The descending tail is read in scribal commentary as reaching below the line into what is beneath the written world.",
    principle:
      "The Golden Dawn keeps Pisces and places Qoph on the twenty-ninth path from Netzach to Malkuth with the Moon, the trump of the path through water at night, which fits both the sign and the faculty of sleep. Continental systems place the Sun here, a complete inversion. Where a reading turns on darkness or on illumination, that inversion decides the outcome, so the lineage has to be named before the reading begins.",
    energies: ["what lies behind", "the descent below the line", "sleep"],
    tensions: ["the hidden against the merely unseen", "the Moon in one lineage, the Sun in the other"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Simple letter, sign Pisces, month Adar; faculty of sleep in the Gra recension." },
      { lineage: "Golden Dawn", claim: "Path 29, Netzach to Malkuth, Pisces, the Moon." },
      { lineage: "Scribal", claim: "One of the letters whose stroke descends below the ruled line." }
    ],
    correspondences: [
      "standard value: 100",
      "class: simple letter",
      "sign: Pisces",
      "month: Adar",
      "Golden Dawn path: 29, Netzach to Malkuth",
      "name meaning: back of the head, or eye of a needle"
    ],
    contested: [CIPHER_NOTE, trumpNote("the Moon", "the Sun")],
    prompts: [
      "Does the reading here depend on night or on light, and which lineage supplies that?",
      "What stands behind the position being examined that the reading has not yet turned to face?"
    ]
  },

  Resh: {
    plain:
      "Resh is the twentieth letter, written ר, with the standard value 200. Its name means head, and the sign descends from a pictograph of a head in profile.",
    reading:
      "Resh is a double letter in the Sepher Yetzirah, although in modern Hebrew it no longer takes the hard and soft distinction that defines the other six. The Gra recension gives it Mercury and the pair peace and war. The head reading gives it the sense of beginning as well as of thought, since rosh means both head and first.",
    principle:
      "The Golden Dawn gives Resh to the Sun on the thirtieth path from Hod to Yesod, with the trump of the Sun, while the Gra recension gives it Mercury. Resh is also the one double whose membership in the class is itself contested, since the pronunciation distinction that justifies the grouping has been lost. A working that treats the seven doubles as a fixed set should record which grammar it is relying on.",
    energies: ["the head", "beginning", "the seat of thought"],
    tensions: ["Mercury in one lineage, the Sun in the other", "a double letter whose doubling is no longer audible"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, planet Mercury, the pair peace and war." },
      { lineage: "Golden Dawn", claim: "Path 30, Hod to Yesod, the Sun, the trump of the Sun." },
      { lineage: "Grammatical", claim: "Counted among the doubles although the hard and soft distinction is not preserved in modern pronunciation." }
    ],
    correspondences: [
      "standard value: 200",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Mercury",
      "planet (Golden Dawn): Sun",
      "Golden Dawn path: 30, Hod to Yesod",
      "name meaning: head, also first"
    ],
    contested: [
      CIPHER_NOTE,
      RECENSION_NOTE,
      "Whether Resh belongs among the doubles at all is disputed, since the pronunciation distinction that defines the class is not preserved for this letter in modern Hebrew.",
      trumpNote("the Sun", "Judgement")
    ],
    prompts: [
      "Is Resh being read as head or as first here, and does the difference change the result?",
      "Which planetary attribution is the rest of this working using for the doubles?"
    ]
  },

  Shin: {
    plain:
      "Shin is the twenty-first letter, written ש, with the standard value 300. Its name is read as tooth, and the form has three ascending prongs.",
    reading:
      "Shin is one of the three mother letters. The Sepher Yetzirah sets it over Fire, over the head, and over the hot season, standing against Mem and water with Aleph between them. The three prongs are read in Kabbalistic commentary as three columns or three flames; a four-pronged Shin appears on one side of the tefillin, and that variant is treated as deliberate rather than as an error.",
    principle:
      "Shin carries no planet and no sign, because the mothers stand outside both series. The Golden Dawn preserves the element and places Shin on the thirty-first path from Hod to Malkuth, attaching Judgement and, in that system, the element Fire together with a later attribution of Spirit. The doubling of Fire and Spirit on one path is an internal Golden Dawn adjustment and has no basis in the Sepher Yetzirah.",
    energies: ["fire", "the three prongs", "consuming and purifying"],
    tensions: ["heat against the cold of Mem", "an element that in one lineage is also given Spirit"],
    attributions: [
      { lineage: "Sepher Yetzirah", claim: "Mother letter, set over Fire, the head, and the hot season." },
      { lineage: "Golden Dawn", claim: "Path 31, Hod to Malkuth, Fire, Judgement." },
      { lineage: "Scribal", claim: "A four-pronged variant appears on one side of the tefillin." }
    ],
    correspondences: [
      "standard value: 300",
      "class: mother letter",
      "element: Fire (Sepher Yetzirah)",
      "Golden Dawn path: 31, Hod to Malkuth",
      "name meaning: tooth"
    ],
    contested: [
      CIPHER_NOTE,
      SCHEME_NOTE,
      "Whether the thirty-first path carries Fire alone or Fire together with Spirit is an internal disagreement within the Golden Dawn current and its successors.",
      trumpNote("Judgement", "the Fool")
    ],
    prompts: [
      "Is the fire in this reading the consuming kind or the refining kind?",
      "Does the working use the three-pronged or the four-pronged form, and why?"
    ]
  },

  Tav: {
    plain:
      "Tav is the twenty-second and last letter, written ת, with the standard value 400. Its name means mark or sign, and in the older scripts the letter was drawn as a cross.",
    reading:
      "Tav is a double letter. The Gra recension of the Sepher Yetzirah gives it the Moon and the pair grace and ugliness. As the final letter it holds the highest single value in the standard cipher, and the mark reading gives it the sense of a signature: what is set on a thing to show that it is finished or that it belongs.",
    principle:
      "The Golden Dawn gives Tav to Saturn on the thirty-second path from Yesod to Malkuth, attaching the World and, in that system, the element Earth alongside the planet. The Gra recension gives the Moon. The two lineages therefore end the alphabet on opposite notes, one lunar and one saturnine, and any working that treats the last letter as a seal will read it differently depending on which is chosen.",
    energies: ["the mark", "completion", "the signature set on a work"],
    tensions: ["the Moon in one lineage, Saturn in the other", "an ending that is also a boundary stone"],
    attributions: [
      { lineage: "Sepher Yetzirah (Gra recension)", claim: "Double letter, the Moon, the pair grace and ugliness." },
      { lineage: "Golden Dawn", claim: "Path 32, Yesod to Malkuth, Saturn and Earth, the World." },
      { lineage: "Palaeographic", claim: "Drawn as a cross or an X in the Phoenician and palaeo-Hebrew scripts." }
    ],
    correspondences: [
      "standard value: 400",
      "class: double letter",
      "planet (Sepher Yetzirah, Gra): Moon",
      "planet (Golden Dawn): Saturn",
      "Golden Dawn path: 32, Yesod to Malkuth",
      "name meaning: mark or sign"
    ],
    contested: [
      CIPHER_NOTE,
      RECENSION_NOTE,
      "Whether the thirty-second path carries Saturn alone or Saturn together with the element Earth is an internal Golden Dawn adjustment, made to fit the Tree rather than drawn from the older text.",
      trumpNote("the World", "the World, though reached by a different count")
    ],
    prompts: [
      "Is Tav read here as an ending or as a seal placed on what came before?",
      "Which planet does the working assign to the last letter, and does the rest of the sequence agree with that choice?"
    ]
  }
};

export function getLetterSymbolism(k) {
  return LETTER_SYMBOLISM[k] || null;
}
