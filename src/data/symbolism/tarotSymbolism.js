/*
 * tarotSymbolism.js
 *
 * Symbolic records for the 22 Major Arcana as keyed by the DECK array in
 * src/tabs/TarotTab.jsx. Each record names the image that stands on the card
 * and what the traditions have attributed to it, at three depths.
 *
 * Two lineages run through these records and are kept separate rather than
 * blended:
 *   - the Golden Dawn line (Hebrew letters, zodiacal and planetary
 *     attributions, Tree of Life paths), carried into the Rider-Waite-Smith
 *     drawings and from there into most English-language practice;
 *   - the Tarot de Marseille line, older as printed matter, which does not
 *     carry the Hebrew lettering at all and does not make the Golden Dawn's
 *     swap of Strength and Justice.
 *
 * Where the two disagree the disagreement is recorded in `contested` and left
 * unresolved. No record forecasts, and no record addresses the reader.
 */

export const TAROT_SYMBOLISM = {
  "The Fool": {
    plain:
      "A traveller in motion, a bundle carried on a stick, a small animal at the heel. In most printings the figure is at an edge, or has not looked down.",
    reading:
      "The card has no settled station in the sequence. Rider-Waite-Smith prints it as 0 and sets it at the head of the trumps; the Tarot de Marseille leaves Le Mat without a number and lets it sit anywhere. What the traditions attribute here gathers around unformed potential, the beginning that carries no weight yet, and the licensed folly of the one who stands outside the order and is therefore not bound by it.",
    principle:
      "The Golden Dawn gave the Fool the letter Aleph and the element Air, on the path from Kether to Chokmah. The Continental scheme running from Eliphas Levi through Papus gave Aleph to the Magician instead and pushed the Fool late in the lettering, usually to Shin. The two schemes sit one place apart across almost the whole deck, so a working that mixes them will not close. Decks that print an outer planet here are grafting Uranus onto the older Air attribution, which is a twentieth-century move with no Golden Dawn warrant.",
    energies: ["unformed potential", "air", "the unnumbered", "the licensed outsider"],
    tensions: ["the step and the edge", "freedom against accountability"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Aleph, the element Air, the path from Kether to Chokmah." },
      { lineage: "Continental (Levi, Papus)", claim: "Shin is given to the Fool and Aleph to the Magician, shifting the entire lettering by one place." },
      { lineage: "Tarot de Marseille", claim: "Le Mat carries no number and is not fixed in the order of the trumps." },
      { lineage: "Modern", claim: "Uranus is often added alongside Air in twentieth-century decks and reference books." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Aleph",
      "element: Air",
      "Marseille name: Le Mat",
      "number: 0, or none"
    ],
    contested: [
      "The Fool's position is unsettled: 0 at the head of the trumps (Golden Dawn, Rider-Waite-Smith), unnumbered and mobile (Marseille), or set between Judgement and the World (Levi, Papus).",
      "The Uranus attribution is a modern addition and does not descend from the Golden Dawn papers."
    ],
    prompts: [
      "Does the deck on the table number this card, or leave it loose?",
      "If the lettering in use is Continental, which card holds Aleph?"
    ]
  },

  "The Magician": {
    plain:
      "A figure standing at a table that bears a cup, a sword, a wand and a coin or disc. One arm is raised holding a wand, the other points down at the ground.",
    reading:
      "The Marseille card is Le Bateleur, a fairground conjuror behind a trestle table, and the older French reading keeps that low setting: dexterity, address, sleight of hand, sharp practice included. Rider-Waite-Smith raises the same figure into an operator with the four suit emblems laid out under command, and the attributions shift with it towards directed skill and the will that works through instruments.",
    principle:
      "The Golden Dawn gave the Magician Beth, the letter of the house, with Mercury and the path from Kether to Binah. The upright-and-downward gesture is not in the Marseille woodcut; it enters through the nineteenth-century occultists and is fixed by the Rider-Waite-Smith drawing, where it renders the axiom of correspondence between what is above and what is below. The lemniscate over the head is likewise a modern element, read backwards into the wide flattened brim of the Bateleur's hat. This card is the clearest single case of the occult revival changing what the picture is a picture of.",
    energies: ["directed skill", "instrument and operator", "mercury", "address"],
    tensions: ["craft against trickery", "the adept and the mountebank"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Beth, Mercury, the path from Kether to Binah." },
      { lineage: "Continental (Levi, Papus)", claim: "Aleph, taken as the first letter and the first operator." },
      { lineage: "Tarot de Marseille", claim: "Le Bateleur, a street conjuror, read for dexterity rather than for magic." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Beth",
      "planet: Mercury",
      "Marseille name: Le Bateleur",
      "table objects: cup, sword, wand, coin"
    ],
    contested: [
      "Whether the raised and lowered arms belong to the old image or are a nineteenth-century reading imposed on it.",
      "Whether the Bateleur's hat brim was ever intended as a sign of infinity, or was simply a hat."
    ],
    prompts: [
      "Is the figure here read as a craftsman or as an adept, and which reading does the deck's own drawing support?"
    ]
  },

  "The High Priestess": {
    plain:
      "A seated woman between a dark pillar and a pale one, a veil behind her, a crescent at her foot and a partly covered scroll in her lap.",
    reading:
      "The Marseille card is La Papesse, a woman in a papal tiara with an open book. Waite renamed her and rebuilt the setting around Solomon's temple and a lunar crown, which moved the card from a Christian scandal to an Egyptian and Isiac frame. Attributions in both lines gather around what is held and not yet said: latency, the closed or half-covered book, memory that has not been spoken out.",
    principle:
      "The Golden Dawn gave her Gimel, the Moon, and the path from Kether to Tiphareth, the long path that crosses the abyss down the middle of the Tree. The pillars lettered B and J are Waite's addition and belong to the temple imagery, not to the Marseille card. The Besancon decks, printed where a female pope was unwelcome, replaced her with Juno and replaced the Pope with Jupiter, so a whole line of French decks carries classical figures where the Marseille line carries ecclesiastical ones.",
    energies: ["latency", "the veil", "lunar reflection", "the withheld book"],
    tensions: ["knowledge held against knowledge given", "silence and secrecy"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Gimel, the Moon, the path from Kether to Tiphareth." },
      { lineage: "Tarot de Marseille", claim: "La Papesse, seated in a tiara with an open book." },
      { lineage: "Besancon decks", claim: "The figure is replaced by Juno, with an attendant peacock." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Gimel",
      "luminary: the Moon",
      "Marseille name: La Papesse",
      "Besancon name: Junon"
    ],
    contested: [
      "The identity behind the Marseille Papesse is unresolved: Pope Joan of legend, a Visconti family member who led a heretical sect, an allegory of the Church, or an allegory of Faith.",
      "Whether the Isis reading is old or was supplied by the eighteenth-century French writers who first claimed an Egyptian origin for the deck."
    ],
    prompts: [
      "Which figure does this deck print here, the Popess or Juno, and does the working depend on the difference?"
    ]
  },

  "The Empress": {
    plain:
      "A crowned woman on a cushioned seat, a shield beside her bearing the sign of Venus, ripe grain in front of her and falling water behind.",
    reading:
      "The Marseille Empress sits upright with a sceptre and an eagle shield, and reads as an office: the imperial seat, held by a woman. Rider-Waite-Smith surrounds her with a garden, and the attributions move towards generation, increase and the productive ground. Both lines set her opposite the Emperor as one term of a pair rather than as a character in her own right.",
    principle:
      "The Golden Dawn gave her Daleth, the letter of the door, with Venus and the path from Chokmah to Binah, joining the two supernal fathers and mothers of the Tree. The twelve stars in her crown are borrowed from Marian iconography and appear in the Rider-Waite-Smith drawing rather than in the Marseille woodcut. The eagle on the Marseille shield is imperial heraldry and carries no Venusian sense at all, so the planetary attribution here is read into the card by the revival rather than drawn out of it.",
    energies: ["generation", "increase", "venus", "the fertile ground"],
    tensions: ["nurture against possession", "office against nature"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Daleth, Venus, the path from Chokmah to Binah." },
      { lineage: "Tarot de Marseille", claim: "An enthroned empress with sceptre and eagle shield, paired with the Emperor." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Daleth",
      "planet: Venus",
      "Marseille name: L'Imperatrice",
      "emblems: grain, falling water, shield"
    ],
    contested: [
      "Whether the Venus attribution is native to the image or was read back into it by the nineteenth-century occultists."
    ],
    prompts: [
      "Does this card sit here as an office or as a natural power, and which does the drawing show?"
    ]
  },

  "The Emperor": {
    plain:
      "A crowned man on a stone seat with ram heads at its corners, an orb in one hand and a sceptre in the other, dry mountains behind him.",
    reading:
      "The Marseille Emperor sits in profile with his legs crossed into the shape of a figure four and an eagle shield at his side. Attributions in both lines gather around rule, boundary, settled order and the authority that is held by position rather than by persuasion. The armour showing beneath the robe in the Rider-Waite-Smith drawing marks the office as one that is defended.",
    principle:
      "The Golden Dawn gave him Heh, Aries, and the path from Chokmah to Tiphareth, and the ram heads on the throne are drawn to carry that sign. Crowley's Thoth deck broke this: on the ground that Tzaddi is not the Star, he exchanged the letters Heh and Tzaddi between the Emperor and the Star while leaving Aries with the Emperor and Aquarius with the Star. Most Golden Dawn descended practice does not follow him, so the letter on this card depends entirely on which lineage the working stands in.",
    energies: ["rule", "boundary", "aries", "settled order"],
    tensions: ["order against rigidity", "authority held and authority earned"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Heh, Aries, the path from Chokmah to Tiphareth." },
      { lineage: "Thoth (Crowley)", claim: "Tzaddi, with Aries retained, following the exchange of Heh and Tzaddi with the Star." },
      { lineage: "Tarot de Marseille", claim: "L'Empereur in profile, legs crossed, with an eagle shield." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Heh",
      "sign: Aries",
      "Marseille name: L'Empereur",
      "emblems: ram heads, orb, crossed legs"
    ],
    contested: [
      "The Heh and Tzaddi exchange between the Emperor and the Star is accepted in Thoth-descended work and rejected in most other Golden Dawn descended work."
    ],
    prompts: [
      "Which letter does the working give this card, and does the same scheme govern the Star?"
    ]
  },

  "The Hierophant": {
    plain:
      "A seated figure in a triple crown holding a triple cross, two shaven-headed attendants below, crossed keys at his feet, two pillars behind.",
    reading:
      "The Marseille card is Le Pape, and the attributions follow the office: transmission, the outward form of doctrine, the channel through which a teaching is handed on rather than the teaching itself. Waite's rename to Hierophant lifts it out of one church and into priesthood as a general function, which is why the card is read for lineage and initiation in English-language practice.",
    principle:
      "The Golden Dawn gave him Vau, the letter of the nail or hook, with Taurus and the path from Chokmah to Chesed. Vau is the joining letter, and the card is read on that basis as the link between an upper and a lower term. The two attendants, added by Waite and Smith, make the transmission visible in the picture; the Marseille card shows two figures from behind, kneeling, with no indication of who they are. In the Besancon decks this card is Jupiter rather than the Pope.",
    energies: ["transmission", "lineage", "taurus", "the joining term"],
    tensions: ["form against spirit", "custody against ossification"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Vau, Taurus, the path from Chokmah to Chesed." },
      { lineage: "Tarot de Marseille", claim: "Le Pape, enthroned in blessing, with two figures before him." },
      { lineage: "Besancon decks", claim: "The figure is replaced by Jupiter." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Vau",
      "sign: Taurus",
      "Marseille name: Le Pape",
      "emblems: triple crown, triple cross, crossed keys"
    ],
    contested: [
      "Whether the crossed keys belong to the older image or were supplied by Waite from Petrine iconography."
    ],
    prompts: [
      "What is being handed on in this reading, and by what authority does the deck say it travels?"
    ]
  },

  "The Lovers": {
    plain:
      "In the Rider-Waite-Smith drawing, a naked man and woman stand apart under a winged figure, one tree bearing fruit and a serpent behind her, one tree in flames behind him. In the Marseille card a young man stands between two women while a winged archer draws a bow overhead.",
    reading:
      "The two lines do not show the same scene. The Marseille title is singular, L'Amoureux, and the composition is a choice or a hesitation between two claims. The Rider-Waite-Smith title is plural, the composition is a pair, and the setting is Eden. Attributions accordingly split between election and union, and a reading taken from one line will not transfer cleanly to the other.",
    principle:
      "The Golden Dawn gave this card Zain, the letter of the sword, with Gemini and the path from Binah to Tiphareth. Zain is a cutting letter, which fits the older reading of decision far better than the later reading of harmony. The difference between three human figures and two is not a difference of drawing style; it is a difference in what the card is about, and it is one of the sharpest breaks between the Marseille and Golden Dawn lines.",
    energies: ["election", "union", "gemini", "the cut that decides"],
    tensions: ["choosing against wanting both", "harmony against discrimination"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Zain, Gemini, the path from Binah to Tiphareth." },
      { lineage: "Tarot de Marseille", claim: "L'Amoureux, singular, a figure between two women under an archer." },
      { lineage: "Rider-Waite-Smith", claim: "A pair under an angel, in an Eden setting with two trees." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Zain",
      "sign: Gemini",
      "Marseille name: L'Amoureux",
      "figure count: three (Marseille), two (Rider-Waite-Smith)"
    ],
    contested: [
      "Who the third figure in the Marseille card is: a rival, a mother, or vice and virtue personified, all of which are argued.",
      "Whether the card is read for choice or for union depends on the line, and neither reading is derivable from the other."
    ],
    prompts: [
      "How many human figures stand on the card in this deck, and does the reading being given match that count?"
    ]
  },

  "The Chariot": {
    plain:
      "A canopy carried on four pillars over a standing driver, drawn by two creatures facing slightly apart. In the Rider-Waite-Smith drawing they are sphinxes, one dark and one pale; in the Marseille card they are horses.",
    reading:
      "The card is a conveyance before it is a triumph. Attributions gather around motion held on a course, the vehicle that is kept together by the driver rather than by its parts, and victory of the processional kind rather than the hard-won kind. The two draught animals pulling in slightly different directions carry the strain that the driver is holding.",
    principle:
      "The Golden Dawn gave the Chariot Cheth, the letter of the fence or enclosure, with Cancer and the path from Binah to Geburah, which is why the card is read as a carried and shelled thing rather than an open one. The driver in the Rider-Waite-Smith card holds no reins, and the Marseille horses show no visible traces either; older commentators treat this as an engraver's economy and later ones treat it as doctrine, that the team is held by will alone.",
    energies: ["conveyance", "held course", "cancer", "the shell that carries"],
    tensions: ["control against momentum", "armour against contact"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Cheth, Cancer, the path from Binah to Geburah." },
      { lineage: "Tarot de Marseille", claim: "Le Chariot, drawn by two horses under a canopy on four pillars." },
      { lineage: "Rider-Waite-Smith", claim: "Two sphinxes, a starred canopy, and a driver holding no reins." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Cheth",
      "sign: Cancer",
      "Marseille name: Le Chariot",
      "emblems: canopy, two draught animals, city behind"
    ],
    contested: [
      "Whether the absence of reins and traces is deliberate doctrine or an artefact of woodblock printing."
    ],
    prompts: [
      "What holds the team together in this drawing, and is anything in the picture actually attached to anything else?"
    ]
  },

  "Strength": {
    plain:
      "A woman with her hands at the jaws of a lion, closing them or opening them, a chain of flowers about her and a flattened figure of eight over her head.",
    reading:
      "The attributions gather around mastery that does not use force: the animal is handled rather than beaten. The Marseille card, La Force, shows the same encounter with a hat brim in place of the sign of infinity. What is at issue in both is the manner of the mastery, not whether the lion is subdued.",
    principle:
      "The Golden Dawn moved Strength to VIII and Justice to XI so that the trumps would run in zodiacal order against the Hebrew letters, Leo standing before Libra. The Tarot de Marseille makes no such swap: there, VIII is La Justice and XI is La Force. Rider-Waite-Smith follows the Golden Dawn, and the deck in this application follows Rider-Waite-Smith. The Golden Dawn attribution is Teth, the letter of the serpent, with Leo and the path from Chesed to Geburah.",
    energies: ["mastery without force", "leo", "the handled animal", "sustained pressure"],
    tensions: ["gentleness against domination", "patience against the moment"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Teth, Leo, the path from Chesed to Geburah, numbered VIII." },
      { lineage: "Tarot de Marseille", claim: "La Force, numbered XI, with no zodiacal attribution attached." },
      { lineage: "Thoth (Crowley)", claim: "Retitled Lust and numbered XI, following a further renumbering of his own." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Teth",
      "sign: Leo",
      "Marseille name: La Force",
      "number: VIII (Golden Dawn, Rider-Waite-Smith), XI (Marseille)"
    ],
    contested: [
      "The VIII and XI numbering of Strength and Justice is the best-known split in the deck. The Golden Dawn exchanged them to fit the zodiacal order to the Hebrew letters; the Marseille line never made the exchange, and there is no neutral position between the two."
    ],
    prompts: [
      "Which numbering does the deck in hand use here, and does the spread's positional logic depend on it?"
    ]
  },

  "The Hermit": {
    plain:
      "A hooded figure standing on high ground, holding up a lantern and leaning on a long staff. In the Rider-Waite-Smith drawing the lantern contains a six-pointed star.",
    reading:
      "Attributions gather around deliberate withdrawal and the carried light: one who has gone ahead and turned to show the way, or one who has gone apart in order to see at all. The Marseille lantern holds an ordinary flame, partly shielded by the cloak, and the card reads more plainly as age, caution and slow travel.",
    principle:
      "The Golden Dawn gave the Hermit Yod, the smallest letter and the letter of the hand, with Virgo and the path from Chesed to Tiphareth. Yod is also the seed from which the other letters are formed, and the card is read on that basis as a concentration rather than a retreat. Some early Italian trumps show an old man with an hourglass rather than a lantern, which makes this card a picture of Time before it becomes a picture of a hermit; the lamp replaces the glass somewhere in the passage into the Marseille pattern.",
    energies: ["withdrawal", "the carried light", "virgo", "concentration"],
    tensions: ["solitude against isolation", "guidance against distance"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Yod, Virgo, the path from Chesed to Tiphareth." },
      { lineage: "Tarot de Marseille", claim: "L'Hermite, an old man with a shielded lantern and a staff." },
      { lineage: "Early Italian trumps", claim: "The figure appears with an hourglass, read as Time rather than as a hermit." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Yod",
      "sign: Virgo",
      "Marseille name: L'Hermite",
      "emblems: lantern, staff, cloak"
    ],
    contested: [
      "Whether the hexagram inside the Rider-Waite-Smith lantern carries a Solomonic sense or is decorative; it has no counterpart in the Marseille lamp."
    ],
    prompts: [
      "Is the lamp in this drawing held up for another, or held close for the one carrying it?"
    ]
  },

  "Wheel of Fortune": {
    plain:
      "A wheel with figures on its rim, one rising, one crowned at the top and one falling. In the Rider-Waite-Smith drawing four winged creatures read books at the corners and a sphinx sits above with a sword.",
    reading:
      "The Marseille wheel belongs to the medieval Rota Fortunae, the wheel familiar from Boethius, turned by a crank with animal figures carried up and over and down. Attributions gather around contingency: the turn that is nobody's doing, the rise and fall that has no argument attached to it. Rider-Waite-Smith adds a fixed axis and an observer above the turning, which changes what the card is about.",
    principle:
      "The Golden Dawn gave the Wheel Kaph, the letter of the open palm, with Jupiter and the path from Chesed to Netzach. The letters set around the Rider-Waite-Smith rim, read with the Hebrew name of God interleaved, spell ROTA, TAROT or TORA depending on where the reading starts; that word-game is a nineteenth-century device, not a medieval one. The four corner creatures repeat those on the World, which links the two cards as opening and closing terms of the same figure.",
    energies: ["contingency", "the turn", "jupiter", "the fixed axis"],
    tensions: ["fate against agency", "the rim and the centre"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Kaph, Jupiter, the path from Chesed to Netzach." },
      { lineage: "Tarot de Marseille", claim: "La Roue de Fortune, a cranked wheel carrying animal figures up and down." },
      { lineage: "Rider-Waite-Smith", claim: "A lettered rim, a sphinx above, and the four living creatures at the corners." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Kaph",
      "planet: Jupiter",
      "Marseille name: La Roue de Fortune",
      "rim letters: T A R O with the divine name interleaved"
    ],
    contested: [
      "Whether the rim letters were meant to be read as ROTA, as TAROT, or as TORA; the drawing supports all three and settles none."
    ],
    prompts: [
      "Is this card being read from the rim or from the axis, and does the drawing offer an axis at all?"
    ]
  },

  "Justice": {
    plain:
      "An enthroned figure holding an upright sword in one hand and a pair of scales in the other, a veil hung between two pillars behind.",
    reading:
      "The attributions gather around measure and the settling of accounts: weighing before cutting, the balance that has to be struck before the sword moves. Crowley retitled the card Adjustment, which shifts it away from moral verdict and towards the restoring of an equilibrium, and that retitling is worth noticing because it changes the tense of the card from judgement passed to balance sought.",
    principle:
      "The Golden Dawn gave Justice Lamed, the letter of the ox-goad, with Libra and the path from Geburah to Tiphareth, and numbered it XI so that Libra would fall after Leo in the zodiacal run. The Tarot de Marseille numbers La Justice VIII and attaches no sign to it. The sword upright and the scales level are constants across both lines; only the number and the attribution move.",
    energies: ["measure", "equilibrium", "libra", "the settled account"],
    tensions: ["justice against mercy", "the weighing and the cut"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Lamed, Libra, the path from Geburah to Tiphareth, numbered XI." },
      { lineage: "Tarot de Marseille", claim: "La Justice, numbered VIII, with no zodiacal attribution." },
      { lineage: "Thoth (Crowley)", claim: "Retitled Adjustment and read as rebalancing rather than verdict." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Lamed",
      "sign: Libra",
      "Marseille name: La Justice",
      "number: XI (Golden Dawn, Rider-Waite-Smith), VIII (Marseille)"
    ],
    contested: [
      "The exchange of numbers with Strength is a lineage split, not an error in either deck. Marseille holds VIII for Justice and XI for Strength; the Golden Dawn reversed them for the sake of the zodiacal order."
    ],
    prompts: [
      "Is the scale in this drawing level or tipped, and does the reading depend on which?"
    ]
  },

  "The Hanged Man": {
    plain:
      "A figure suspended by one ankle from a wooden frame, the free leg crossed behind the other so the legs make a figure four, the hands out of sight behind the back.",
    reading:
      "The Marseille Pendu hangs between two lopped trees and is a shame-picture in origin, close to the painted images used to expose traitors and defaulters by hanging them upside down in effigy. Rider-Waite-Smith adds a light around the head, which converts the exposure into a willed suspension. Attributions in the later line gather around reversal of the ordinary view and a fixed position held on purpose.",
    principle:
      "The Golden Dawn gave this card Mem, the element Water, and the path from Geburah to Hod. Mem is one of the three mother letters, so the card takes an element rather than a planet or a sign, as the Fool and Judgement do. Decks that print Neptune here are grafting an outer planet onto that Water attribution, which is a twentieth-century addition. The crossed legs repeat the figure four of the Emperor, inverted, and several commentaries read the two cards against each other on that basis.",
    energies: ["suspension", "reversal", "water", "the held position"],
    tensions: ["surrender against paralysis", "exposure against initiation"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Mem, the element Water, the path from Geburah to Hod." },
      { lineage: "Tarot de Marseille", claim: "Le Pendu, hung by one foot between two lopped trees, with no halo." },
      { lineage: "Modern", claim: "Neptune is often added alongside Water in twentieth-century references." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Mem",
      "element: Water",
      "Marseille name: Le Pendu",
      "emblem: the inverted figure four of the legs"
    ],
    contested: [
      "Whether the Marseille figure is a penitent, a traitor exposed, or an initiate is unresolved, and the woodcut supports more than one of these.",
      "The Neptune attribution is modern and has no Golden Dawn warrant."
    ],
    prompts: [
      "Is the suspension in this drawing something done to the figure or something the figure is doing?"
    ]
  },

  "Death": {
    plain:
      "A skeleton at work. In the Marseille card it wields a scythe over ground still yielding heads and hands; in the Rider-Waite-Smith drawing it rides armoured on a pale horse, carrying a black banner with a white rose.",
    reading:
      "The Marseille card carries no title at all: the number XIII stands alone, and French commentary calls it the arcanum without a name. Attributions gather around ending taken as a process rather than an event, harvest, and the levelling of rank, which the Rider-Waite-Smith drawing makes explicit by laying a crowned figure, a bishop, a woman and a child in the horse's path.",
    principle:
      "The Golden Dawn gave this card Nun, the letter of the fish, with Scorpio and the path from Tiphareth to Netzach. Nun carries a sense of sprouting and of what moves unseen in water, which is why the attribution is read for transformation rather than for extinction. The sun rising between two towers on the Rider-Waite-Smith horizon is the same pair of towers that stand on the Moon, and the two cards are often read as one passage in Golden Dawn descended practice.",
    energies: ["ending as process", "harvest", "scorpio", "the levelling"],
    tensions: ["release against loss", "the cut and what regrows"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Nun, Scorpio, the path from Tiphareth to Netzach." },
      { lineage: "Tarot de Marseille", claim: "Numbered XIII and left untitled, a reaper clearing a field." },
      { lineage: "Rider-Waite-Smith", claim: "A rider with a banner, with figures of every rank before him." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Nun",
      "sign: Scorpio",
      "Marseille name: none printed, the arcanum without a name",
      "emblems: scythe, white rose, pale horse"
    ],
    contested: [
      "Whether the Marseille card was left untitled by design, out of superstition, or by ordinary printing convention is argued and unsettled."
    ],
    prompts: [
      "Does the deck on the table name this card, and does the naming change how the spread is read?"
    ]
  },

  "Temperance": {
    plain:
      "A winged figure pouring liquid between two vessels. In the Rider-Waite-Smith drawing one foot rests on land and one in water, and a crowned light sits on the horizon.",
    reading:
      "Tempering is a metallurgical word before it is a moral one: the mixing of two things at a rate that neither can set alone. Attributions gather around measured combination, the flow that continues between vessels without spilling, and the middle way understood as a working method rather than as timidity. Crowley retitled the card Art and read it as the alchemical conjunction outright.",
    principle:
      "The Golden Dawn gave Temperance Samekh, the letter of the prop or support, with Sagittarius and the path from Tiphareth to Yesod, the central path that carries the whole middle pillar. The triangle within a square on the breast of the Rider-Waite-Smith figure is an alchemical sign of spirit set in matter and does not appear on the Marseille card, which shows the pouring alone with no landscape and no emblem.",
    energies: ["tempering", "measured flow", "sagittarius", "the middle pillar"],
    tensions: ["moderation against dilution", "patience against delay"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Samekh, Sagittarius, the path from Tiphareth to Yesod." },
      { lineage: "Tarot de Marseille", claim: "Temperance, a winged figure pouring between two vessels, without setting." },
      { lineage: "Thoth (Crowley)", claim: "Retitled Art and read as the alchemical marriage." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Samekh",
      "sign: Sagittarius",
      "Marseille name: Temperance",
      "emblems: two vessels, one foot on land and one in water"
    ],
    contested: [
      "Whether the liquid in the older woodcuts is being poured from one vessel to the other or is passing between them in both directions; printings differ, and readings follow the printing."
    ],
    prompts: [
      "Which way is the pour running in this drawing, and can the direction be told at all?"
    ]
  },

  "The Devil": {
    plain:
      "A horned figure with wings, standing or seated above two smaller horned figures tethered to the block beneath. In the Rider-Waite-Smith drawing the chains hang loose over their heads.",
    reading:
      "The Rider-Waite-Smith card is drawn as a deliberate mirror of the Lovers: the same two figures, now horned, tailed and tied to a half-cube, under a raised hand that counterfeits the Hierophant's blessing. Attributions gather around bondage that is not locked, the material half-known, and the appetite that is served rather than examined. The Marseille Diable stands on a pedestal with two tethered figures and carries no pentagram.",
    principle:
      "The Golden Dawn gave the Devil Ayin, the letter of the eye, with Capricorn and the path from Tiphareth to Hod. Ayin also carries a sense of the outward appearance, the thing as seen, which is why the attribution is read for illusion and mistaken solidity rather than for evil as such. The inverted pentagram at the brow is a nineteenth-century sign, taken from the occult revival, and has no counterpart in the Marseille woodcut.",
    energies: ["binding", "appetite", "capricorn", "the half-cube"],
    tensions: ["bondage against consent", "matter against materialism"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Ayin, Capricorn, the path from Tiphareth to Hod." },
      { lineage: "Tarot de Marseille", claim: "Le Diable on a pedestal with two tethered figures, no pentagram." },
      { lineage: "Rider-Waite-Smith", claim: "A deliberate inversion of the Lovers, with loose chains and a half-cube." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Ayin",
      "sign: Capricorn",
      "Marseille name: Le Diable",
      "emblems: half-cube, loose chains, raised torch"
    ],
    contested: [
      "The inverted pentagram belongs to the nineteenth-century revival and is absent from the older image, so a Marseille reading cannot draw on it."
    ],
    prompts: [
      "Are the chains in this drawing fastened, and does the reading being given assume that they are?"
    ]
  },

  "The Tower": {
    plain:
      "A tower struck by lightning, its upper part displaced, two figures falling head first, points of light scattered in the air.",
    reading:
      "The Marseille name is La Maison Dieu, and the card is the most violent image in the deck in both lines. Attributions gather around sudden discharge, a structure opened from outside, and the failure of what was built rather than the failure of the builder. The crown-shaped top of the tower being knocked off is a constant across printings.",
    principle:
      "The Golden Dawn gave the Tower Peh, the letter of the mouth, with Mars and the path from Netzach to Hod. Peh is the letter of speech and of what is uttered, which the attribution reads as the sudden breaking of a silence as much as the breaking of a building. What Maison Dieu means is genuinely unsettled: house of God, the ordinary French term for a hospital or almshouse, or a corruption of an earlier title. Waite's rename to The Tower removes the ambiguity and with it the older sense.",
    energies: ["discharge", "the opened structure", "mars", "the displaced crown"],
    tensions: ["destruction against release", "what falls and what was false"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Peh, Mars, the path from Netzach to Hod." },
      { lineage: "Tarot de Marseille", claim: "La Maison Dieu, a tower topped like a crown, struck from above." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Peh",
      "planet: Mars",
      "Marseille name: La Maison Dieu",
      "emblems: lightning, displaced crown, falling figures"
    ],
    contested: [
      "The sense of Maison Dieu is disputed: a house of God, an almshouse or hospital in ordinary French usage, or a corrupted earlier name. The card's reading shifts with the answer."
    ],
    prompts: [
      "Is the strike in this drawing coming from outside the tower or from inside it?"
    ]
  },

  "The Star": {
    plain:
      "A naked figure kneeling at the edge of water, pouring from two vessels, one onto the land and one into the pool. Above, one large star and seven smaller ones.",
    reading:
      "The card follows the Tower in every ordering, and the traditions read it in that position: the pouring out that continues after the structure has gone. Attributions gather around replenishment, the light that is distant but constant, and giving that is not depleted. The bird in the tree of the Rider-Waite-Smith drawing is usually named as an ibis and read as Thoth's bird.",
    principle:
      "The Golden Dawn gave the Star Tzaddi, the letter of the fish-hook, with Aquarius and the path from Netzach to Yesod. Crowley rejected this outright, on the ground that Tzaddi is not the Star, and exchanged the letters Heh and Tzaddi with the Emperor while leaving Aquarius here. Most Golden Dawn descended work keeps Tzaddi on this card. The one great star with seven lesser ones is read in some commentaries as the sun with the classical planets and in others as an ornament that carries no count at all.",
    energies: ["replenishment", "distant light", "aquarius", "the unstinted pour"],
    tensions: ["hope against passivity", "giving against emptying"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Tzaddi, Aquarius, the path from Netzach to Yesod." },
      { lineage: "Thoth (Crowley)", claim: "Heh, with Aquarius retained, following the exchange with the Emperor." },
      { lineage: "Tarot de Marseille", claim: "L'Etoile, a kneeling figure with two urns under one large star and seven lesser." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Tzaddi",
      "sign: Aquarius",
      "Marseille name: L'Etoile",
      "count: one great star, seven lesser"
    ],
    contested: [
      "The Heh and Tzaddi exchange with the Emperor is followed in Thoth-descended work and rejected elsewhere.",
      "Whether the seven lesser stars are the classical planets or are decorative is argued in both directions."
    ],
    prompts: [
      "How many stars are actually printed on this card, and does the reading depend on the count?"
    ]
  },

  "The Moon": {
    plain:
      "Two towers with a track running between them into the distance, a dog and a wolf baying at the sky, a crayfish rising out of a pool in the foreground, drops falling in the air.",
    reading:
      "Attributions gather around light that is borrowed and partial, the road that continues past the last landmark, and what comes up out of the water without being called. The dog and the wolf are read as the tamed and the untamed answering the same signal, which is a Rider-Waite-Smith framing that the Marseille card, showing two similar animals, does not settle.",
    principle:
      "The Golden Dawn gave the Moon Qoph, the letter of the back of the head, with Pisces and the path from Netzach to Malkuth. Qoph is read for what lies behind conscious sight, which fits the crayfish rising from the pool. The two towers are the same pair that stand behind the rising sun on Death, and the track between them is read in Golden Dawn descended practice as the continuation of that passage.",
    energies: ["borrowed light", "the track past the towers", "pisces", "what rises from water"],
    tensions: ["intuition against distortion", "the tame and the wild answering alike"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Qoph, Pisces, the path from Netzach to Malkuth." },
      { lineage: "Tarot de Marseille", claim: "La Lune, with two towers, two animals, a crayfish and falling drops." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Qoph",
      "sign: Pisces",
      "Marseille name: La Lune",
      "emblems: two towers, dog and wolf, crayfish, falling drops"
    ],
    contested: [
      "Whether the drops in the Marseille printings fall or rise; editions differ, and commentators have built opposite readings on each."
    ],
    prompts: [
      "Where does the track in this drawing go once it passes the towers, and does the card show it?"
    ]
  },

  "The Sun": {
    plain:
      "A rayed face in the sky above a walled enclosure. In the Rider-Waite-Smith drawing one child rides a white horse carrying a red banner past a wall of sunflowers; the Marseille card shows two children inside the wall.",
    reading:
      "Attributions gather around full disclosure: what is lit is simply visible, with no veil and no reflection. The wall is a constant across both lines, so the light in this card is enclosed rather than universal, which several commentaries treat as the point of the image rather than an incidental detail.",
    principle:
      "The Golden Dawn gave the Sun the letter Resh, the letter of the head, with the Sun itself and the path from Hod to Yesod. In the Continental scheme this card takes a different letter, because the whole lettering is displaced by one place, and the two systems cannot be run together on this card any more than on the Fool. The pair of children in the older image is not resolved into a single rider until Waite and Smith.",
    energies: ["disclosure", "enclosed light", "the sun", "plain sight"],
    tensions: ["clarity against exposure", "the wall and the light"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Resh, the Sun, the path from Hod to Yesod." },
      { lineage: "Continental (Levi, Papus)", claim: "The lettering is shifted one place, so this card does not carry Resh." },
      { lineage: "Tarot de Marseille", claim: "Le Soleil, two children within a wall beneath a rayed sun with falling drops." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Resh",
      "luminary: the Sun",
      "Marseille name: Le Soleil",
      "figure count: two (Marseille), one (Rider-Waite-Smith)"
    ],
    contested: [
      "Whether the two figures in the Marseille card are twins, lovers, or two children at play is not settled by the drawing."
    ],
    prompts: [
      "How many figures stand inside the wall on this card, and what is the wall for?"
    ]
  },

  "Judgement": {
    plain:
      "A winged figure sounding a trumpet hung with a cross-marked banner, and below it figures rising with their arms lifted, out of open tombs or out of the ground.",
    reading:
      "Attributions gather around a summons rather than a sentence: something is called and something answers. The Marseille card, Le Jugement, shows three figures rising, which is read as a family or as a resurrection scene proper. Crowley retitled the card The Aeon and removed the resurrection entirely, replacing it with an Egyptian scheme, so the Thoth card is not the same picture at all.",
    principle:
      "The Golden Dawn gave Judgement Shin, the element Fire, and the path from Hod to Malkuth. Shin is one of the three mother letters, so the card takes an element rather than a planet or sign, as the Fool and the Hanged Man do. The Continental scheme gives Shin to the Fool instead and lets this card take Resh, which is the one-place shift running through the whole deck. Decks printing Pluto here are grafting an outer planet onto the Fire attribution, and that graft is twentieth-century.",
    energies: ["summons", "rising", "fire", "the call answered"],
    tensions: ["reckoning against verdict", "being called against choosing"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Shin, the element Fire, the path from Hod to Malkuth." },
      { lineage: "Continental (Levi, Papus)", claim: "Resh, with Shin transferred to the Fool." },
      { lineage: "Tarot de Marseille", claim: "Le Jugement, an angel with a trumpet and three figures rising." },
      { lineage: "Thoth (Crowley)", claim: "Retitled The Aeon, with the resurrection scene replaced." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Shin",
      "element: Fire",
      "Marseille name: Le Jugement",
      "emblems: trumpet, cross-marked banner, opened ground"
    ],
    contested: [
      "The Pluto attribution is modern and does not descend from the Golden Dawn papers.",
      "Whether Shin belongs here or on the Fool depends entirely on the lettering scheme in use."
    ],
    prompts: [
      "Which letter does this working give the card, and does the same scheme leave the Fool without one?"
    ]
  },

  "The World": {
    plain:
      "A figure within a wreath or oval garland, holding a wand in each hand, with four creatures at the corners of the card: a man, an eagle, a bull and a lion.",
    reading:
      "The card closes the sequence in every ordering. Attributions gather around completion of a circuit, the whole set out at once, and the dance held inside a boundary. The four creatures repeat those at the corners of the Wheel of Fortune, which links the two cards as the turning and the completed figure of the same motion.",
    principle:
      "The Golden Dawn gave the World Tau, the letter of the mark or cross, with Saturn and the path from Yesod to Malkuth, the lowest path and the first one an initiate is held to take. The four creatures are the tetramorph, read as the four fixed signs, Aquarius, Scorpio, Taurus and Leo, in the Golden Dawn scheme and as the four evangelists in the Christian one. The same drawing serves both readings without alteration, which is a good illustration of how much of the deck's meaning is supplied by the scheme brought to it.",
    energies: ["completion", "the closed circuit", "saturn", "the bounded dance"],
    tensions: ["wholeness against enclosure", "ending as arrival or as limit"],
    attributions: [
      { lineage: "Golden Dawn", claim: "Tau, Saturn, the path from Yesod to Malkuth." },
      { lineage: "Tarot de Marseille", claim: "Le Monde, a figure in a mandorla with the four creatures at the corners." },
      { lineage: "Thoth (Crowley)", claim: "Retitled The Universe, with Saturn retained." }
    ],
    correspondences: [
      "Hebrew letter (Golden Dawn): Tau",
      "planet: Saturn",
      "Marseille name: Le Monde",
      "corner creatures: man, eagle, bull, lion"
    ],
    contested: [
      "Whether the four creatures are the fixed signs of the zodiac or the four evangelists; the picture supports both and settles neither.",
      "The sex of the central figure is left ambiguous in several Marseille printings, and commentaries differ on whether a dancer, a hermaphrodite or the soul of the world is intended."
    ],
    prompts: [
      "Do the four corner creatures on this card match the four on the Wheel, and does the deck draw them the same way?"
    ]
  }
};

export function getTarotSymbolism(card) {
  return TAROT_SYMBOLISM[card] || null;
}
