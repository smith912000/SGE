/*
 * chineseSymbolism.js
 *
 * Symbolic records for the twelve animals of the year cycle (the twelve
 * earthly branches) and for the five phases (wu xing) as the app names them.
 *
 * Each record carries three depths -- plain, reading, principle -- plus
 * optional structural fields: energies, tensions, attributions,
 * correspondences, contested, prompts.
 *
 * Voice rule (docs/VOICE.md): name what stands there and what it has meant.
 * No second-person address, no forecast, no verdict about a person.
 *
 * Animal keys match ANIMALS in src/data/astrology/chinese.js.
 * Element keys match CN_EL / CN_EL_INFO in the same file.
 */

export const ANIMAL_SYMBOLISM = {
  Rat: {
    plain:
      "The Rat is the first of the twelve animals of the year cycle and sits on the first earthly branch, 子 (zǐ). Its double hour runs from 23:00 to 01:00 and its direction is due north.",
    reading:
      "Folk tradition seats the Rat at the head of the twelve by wit rather than by size: in the widely told race legend it crosses the river on the back of a larger animal and steps off first. The qualities gathered around the branch are quickness of notice, thrift and provisioning, and a talent for the opening that others walk past. Older almanac material treats the branch itself as the operative unit and reads it as deep winter water rather than as an animal character.",
    principle:
      "子 is the branch of the winter solstice month and of the hinge of the night, the point at which yin is fullest and the first stir of yang is said to begin. It is a yang branch fixed to the water phase, opens the first trine with 辰 (chén, Dragon) and 申 (shēn, Monkey), and stands opposite 午 (wǔ, Horse). The animal names a position in a sixty-term stem-and-branch count, not a personality type. The year it labels begins at the lunar new year -- or, in the reckoning most Four Pillars practitioners use, at the solar term Lichun -- and never on 1 January, so a birth in January or early February falls exactly where the two reckonings part.",
    energies: [
      "opening of the cycle",
      "solstice water",
      "nocturnal alertness",
      "storing and provisioning",
      "the early opening"
    ],
    tensions: [
      "accumulation against scarcity",
      "cleverness against trust",
      "first place won by stratagem"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The race legend explains the order of the twelve and gives the Rat its place by borrowed transport and a final leap."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "子 is a yang water branch, the pure water of the solstice month, and one of the four cardinal or peach-blossom branches."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "The north, black, winter and water are set in one correlative column with this branch."
      }
    ],
    correspondences: [
      "branch: 子 (zǐ), first earthly branch",
      "double hour: 23:00-01:00",
      "direction: north",
      "month: eleventh lunar month, containing the winter solstice",
      "fixed phase: Water",
      "polarity: yang",
      "trine: Rat, Dragon, Monkey",
      "opposition: Horse"
    ],
    contested: [
      "Sources disagree on where the animal year begins: popular almanacs use the lunar new year, most Four Pillars practice uses the solar term Lichun, and the two can differ by several weeks.",
      "The 23:00 to 00:00 hour is disputed in hour-pillar practice, some schools reading it as early zi belonging to the day that is ending, others as late zi belonging to the day beginning.",
      "Whether the animal names were original to the branches or attached later is a matter of scholarly dispute; the branch count is attested long before the animal correlations are common in the record."
    ],
    prompts: [
      "Which boundary does this working take for the year -- the lunar new year or Lichun?",
      "Is the Rat here being read as an animal character or as the water branch 子?"
    ]
  },

  Ox: {
    plain:
      "The Ox is the second animal of the cycle and sits on the second earthly branch, 丑 (chǒu). Its double hour runs from 01:00 to 03:00 and its direction is north-northeast.",
    reading:
      "The attributions gathered on the Ox are endurance, method, and work that shows its result only at the end. The race legend has it carrying the Rat and arriving second without complaint, which the tradition reads as steadiness rather than defeat. Almanac material treats 丑 as frozen earth holding a reserve of water and metal, so the branch is described as a store rather than as a surface.",
    principle:
      "丑 is the last month of winter, a yin earth branch counted among the four storage branches, where the closing phase of a season is kept. It carries hidden stems of earth, water and metal, opens the second trine with 巳 (sì, Snake) and 酉 (yǒu, Rooster), and stands opposite 未 (wèi, Goat). The animal is a label on a position in the sixty-term count. Its year opens at the lunar new year, or at Lichun in solar-term reckoning, never on 1 January -- a January or early February date is precisely where the two systems disagree.",
    energies: [
      "frozen earth",
      "endurance",
      "held reserve",
      "unhurried method",
      "closing of winter"
    ],
    tensions: [
      "patience against inertia",
      "storage against release",
      "burden borne without account"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The Ox is placed second in the race legend, carrying a passenger and yielding the finish."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "丑 is a yin earth storage branch holding hidden stems of earth, water and metal."
      },
      {
        lineage: "Agrarian almanac usage",
        claim: "The ox is the plough animal and stands for labour timed to season rather than to appetite."
      }
    ],
    correspondences: [
      "branch: 丑 (chǒu), second earthly branch",
      "double hour: 01:00-03:00",
      "direction: north-northeast",
      "month: twelfth lunar month, last of winter",
      "fixed phase: Earth",
      "polarity: yin",
      "trine: Ox, Snake, Rooster",
      "opposition: Goat"
    ],
    contested: [
      "The year boundary is disputed: lunar new year in almanac use, the solar term Lichun in most Four Pillars practice, and never 1 January in either.",
      "Schools differ on how much weight the hidden stems of a storage branch should carry when the storage is not opened by a clash."
    ],
    prompts: [
      "Is 丑 being read here as a storage branch or only as an animal sign?",
      "Which hidden stem in this branch does the rest of the chart actually activate?"
    ]
  },

  Tiger: {
    plain:
      "The Tiger is the third animal of the cycle and sits on the third earthly branch, 寅 (yín). Its double hour runs from 03:00 to 05:00 and its direction is east-northeast.",
    reading:
      "The Tiger carries attributions of force, initiative and command of a threshold. In Chinese iconography the tiger is a guardian figure set at gates and on doorways to turn away harm, and that protective ferocity is part of what the branch has meant. Almanac material reads 寅 as the first month of spring, wood that is still cold and has not yet leafed.",
    principle:
      "寅 opens the spring quarter and, in solar-term reckoning, the year itself: Lichun, the beginning of spring, falls in this month, which is why the Tiger branch is where the year boundary is drawn. It is a yang wood branch, one of the four growth or initiating branches, opens the third trine with 午 (wǔ, Horse) and 戌 (xū, Dog), and stands opposite 申 (shēn, Monkey). Because the branch itself is the seat of the boundary, a birth in January or early February is the exact case where the lunar new year reckoning and the Lichun reckoning can assign different animals.",
    energies: [
      "beginning of spring",
      "cold wood",
      "initiation",
      "guardianship of a threshold",
      "declared force"
    ],
    tensions: [
      "courage against recklessness",
      "protection that becomes domination",
      "movement started before the ground is warm"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The tiger is a door guardian and apotropaic figure, painted at gates to turn away what should not enter."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "寅 is a yang wood growth branch and the seat of Lichun, from which the solar year and its animal are counted."
      },
      {
        lineage: "Directional cosmology",
        claim: "The White Tiger holds the west in the four-emblem scheme, a separate assignment from the Tiger branch in the east-northeast; the two are distinct figures with the same animal name."
      }
    ],
    correspondences: [
      "branch: 寅 (yín), third earthly branch",
      "double hour: 03:00-05:00",
      "direction: east-northeast",
      "month: first lunar month, containing Lichun",
      "fixed phase: Wood",
      "polarity: yang",
      "trine: Tiger, Horse, Dog",
      "opposition: Monkey"
    ],
    contested: [
      "The animal year begins at the lunar new year in almanac use and at Lichun in most Four Pillars practice; the two can fall weeks apart, so January and early February dates are exactly where the reckonings diverge.",
      "The Tiger of the branches and the White Tiger of the four directional emblems are frequently conflated in popular material, though they belong to different schemes."
    ],
    prompts: [
      "Is the Tiger here the branch 寅 at the east-northeast, or the White Tiger of the west?",
      "If Lichun is the boundary, what animal does this same date give under the lunar new year count?"
    ]
  },

  Rabbit: {
    plain:
      "The Rabbit is the fourth animal of the cycle and sits on the fourth earthly branch, 卯 (mǎo). Its double hour runs from 05:00 to 07:00 and its direction is due east.",
    reading:
      "The Rabbit gathers attributions of quiet, refinement and the avoidance of open conflict. Chinese lunar lore places a hare, not a man, in the moon, pounding an elixir with a pestle, and that lunar association gives the branch its cast of coolness and reflection. Almanac material reads 卯 as the spring equinox month, wood in full leaf and light and dark in balance.",
    principle:
      "卯 is a yin wood branch at the spring equinox, one of the four cardinal branches where a season reaches its pure form. It opens the fourth trine with 未 (wèi, Goat) and 亥 (hài, Pig), stands opposite 酉 (yǒu, Rooster), and is the exact east on the branch compass. The animal is a name for a position in the sixty-term stem-and-branch count rather than a description of a person. The year it labels starts at the lunar new year or, in solar-term reckoning, at Lichun, never at 1 January, so January and early February dates sit on the seam between the two.",
    energies: [
      "spring equinox",
      "lunar hare",
      "leafed wood",
      "quiet increase",
      "balance of light and dark"
    ],
    tensions: [
      "diplomacy against evasion",
      "refinement against necessary confrontation",
      "softness held as strategy"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The moon holds a hare with a mortar and pestle, an image long attached to this branch."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "卯 is a yin wood cardinal branch, pure wood without hidden stems of another phase, and is counted among the peach-blossom positions."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "East, spring, green-blue and wood are set in one correlative column with this branch."
      }
    ],
    correspondences: [
      "branch: 卯 (mǎo), fourth earthly branch",
      "double hour: 05:00-07:00",
      "direction: east",
      "month: second lunar month, containing the spring equinox",
      "fixed phase: Wood",
      "polarity: yin",
      "trine: Rabbit, Goat, Pig",
      "opposition: Rooster"
    ],
    contested: [
      "Sources disagree on the year boundary: lunar new year in almanac use, Lichun in most Four Pillars practice, and 1 January in neither.",
      "Vietnamese reckoning of the twelve places a cat at this position rather than a rabbit, and the reason for the difference is disputed."
    ],
    prompts: [
      "Which of the two lineages does this reading follow at the fourth branch, the rabbit or the cat?",
      "Where else in this chart does the wood phase stand?"
    ]
  },

  Dragon: {
    plain:
      "The Dragon is the fifth animal of the cycle and sits on the fifth earthly branch, 辰 (chén). Its double hour runs from 07:00 to 09:00 and its direction is east-southeast. It is the only one of the twelve that is not an ordinary animal.",
    reading:
      "The Chinese dragon is a water and rain creature and an imperial emblem, which is why the branch carries attributions of authority, weather, and scale beyond the ordinary. Popular almanac material calls Dragon years auspicious and birth rates in some regions have been observed to rise in them, a social fact rather than a claim about the branch. Almanac reading of 辰 itself is more sober: damp earth at the close of spring, holding water in store.",
    principle:
      "辰 is a yang earth storage branch at the end of the spring quarter, holding hidden stems of earth, wood and water. It belongs to the first trine with 子 (zǐ, Rat) and 申 (shēn, Monkey) and stands opposite 戌 (xū, Dog), a clash of two earth storages that older texts treat as the opening of both stores. The dragon of this branch should be distinguished from the Azure Dragon of the eastern quadrant in the four-emblem scheme. The year it names begins at the lunar new year or at Lichun, never on 1 January, and a January or early February date is where the two counts can name different animals.",
    energies: [
      "damp earth at the close of spring",
      "rain-bringing",
      "imperial emblem",
      "held water",
      "scale beyond the ordinary"
    ],
    tensions: [
      "authority against proportion",
      "storage that is opened by clash",
      "auspiciousness as social expectation rather than structure"
    ],
    attributions: [
      {
        lineage: "Imperial iconography",
        claim: "The five-clawed dragon was reserved to the emperor, and the creature stands for sanctioned power and for rain."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "辰 is a yang earth storage branch with hidden stems of earth, wood and water; its clash with 戌 is read as a store being broken open."
      },
      {
        lineage: "Directional cosmology",
        claim: "The Azure Dragon holds the east among the four emblems, a scheme separate from the branch dragon at east-southeast."
      }
    ],
    correspondences: [
      "branch: 辰 (chén), fifth earthly branch",
      "double hour: 07:00-09:00",
      "direction: east-southeast",
      "month: third lunar month, last of spring",
      "fixed phase: Earth",
      "polarity: yang",
      "trine: Rat, Dragon, Monkey",
      "opposition: Dog"
    ],
    contested: [
      "The year boundary is disputed between the lunar new year and the solar term Lichun, so January and early February dates can be assigned different animals by different sources.",
      "Whether a storage branch releases its hidden stems only on clash, or also on combination, is argued between Four Pillars schools."
    ],
    prompts: [
      "Is the dragon here the storage branch 辰 or the Azure Dragon of the eastern quadrant?",
      "Does anything in this chart clash with 辰 and open the store?"
    ]
  },

  Snake: {
    plain:
      "The Snake is the sixth animal of the cycle and sits on the sixth earthly branch, 巳 (sì). Its double hour runs from 09:00 to 11:00 and its direction is south-southeast.",
    reading:
      "Attributions on the Snake are concealment, discernment and knowledge that is not announced. The creature that sheds its skin has long stood for renewal without display, and in Chinese myth the paired figures Fuxi and Nuwa are shown with serpent bodies, which links the branch to origin and to law rather than to menace alone. Almanac material reads 巳 as the first month of summer, fire beginning to gather while metal is held hidden within it.",
    principle:
      "巳 is a yin fire growth branch opening the summer quarter, carrying hidden stems of fire, earth and metal. It belongs to the second trine with 丑 (chǒu, Ox) and 酉 (yǒu, Rooster) -- the metal trine, which is why a fire branch heads a metal grouping and why commentaries return to this branch when explaining how a trine transforms. It stands opposite 亥 (hài, Pig). The animal is a position label in the sixty-term count. Its year begins at the lunar new year or at Lichun, not on 1 January, so a January or early February birth date is exactly where the two reckonings can differ.",
    energies: [
      "beginning of summer",
      "gathering fire",
      "shed skin",
      "concealed knowledge",
      "metal hidden inside fire"
    ],
    tensions: [
      "discretion against secrecy",
      "insight that withholds itself",
      "a fire branch heading a metal trine"
    ],
    attributions: [
      {
        lineage: "Chinese myth",
        claim: "Fuxi and Nuwa are depicted with serpent bodies, holding compass and set square, which ties the serpent to measure and origin."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "巳 is a yin fire growth branch with hidden metal, and it opens the 巳酉丑 metal trine."
      },
      {
        lineage: "Chinese folk tradition",
        claim: "The snake, called the little dragon in common speech, stands beside the Dragon branch as its quieter counterpart."
      }
    ],
    correspondences: [
      "branch: 巳 (sì), sixth earthly branch",
      "double hour: 09:00-11:00",
      "direction: south-southeast",
      "month: fourth lunar month, first of summer",
      "fixed phase: Fire",
      "polarity: yin",
      "trine: Ox, Snake, Rooster",
      "opposition: Pig"
    ],
    contested: [
      "The year boundary is disputed: almanac use takes the lunar new year, most Four Pillars practice takes Lichun, and neither takes 1 January.",
      "Whether a trine produces its phase only when the central branch is present, or partially from any two members, is disputed between schools."
    ],
    prompts: [
      "Is the full 巳酉丑 trine present in this chart, or only a partial pairing?",
      "Which of the hidden stems of 巳 does the rest of the structure draw on?"
    ]
  },

  Horse: {
    plain:
      "The Horse is the seventh animal of the cycle and sits on the seventh earthly branch, 午 (wǔ). Its double hour runs from 11:00 to 13:00 and its direction is due south.",
    reading:
      "The Horse carries attributions of movement, visibility and heat at its height. It sits at noon and at the summer solstice month, the point the tradition calls the fullness of yang, where the turn back toward yin is already implied. Almanac material reads 午 as pure fire, the most exposed and least concealed of the branch positions.",
    principle:
      "午 is a yang fire cardinal branch at the summer solstice, the exact opposite of 子 (zǐ, Rat) on the branch compass and the second of the four cardinal or peach-blossom positions. It belongs to the third trine with 寅 (yín, Tiger) and 戌 (xū, Dog). In the yin-yang scheme the solstice is not only a maximum but a hinge: fullness is where the countermovement begins, which is the structural reason the tradition pairs noon with midnight rather than opposing them absolutely. The year the Horse labels opens at the lunar new year or at Lichun, never on 1 January, and January or early February dates fall on the seam.",
    energies: [
      "summer solstice",
      "noon",
      "pure fire",
      "motion and range",
      "full visibility"
    ],
    tensions: [
      "fullness that is already turning",
      "range against staying",
      "heat without shade"
    ],
    attributions: [
      {
        lineage: "Four Pillars (Bazi)",
        claim: "午 is a yang fire cardinal branch, one of the four peach-blossom positions, and clashes directly with 子."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "South, red, summer and fire stand in one correlative column with this branch."
      },
      {
        lineage: "Yin-yang theory",
        claim: "The solstice is read as a hinge rather than a plateau: at the fullness of one term the other begins."
      }
    ],
    correspondences: [
      "branch: 午 (wǔ), seventh earthly branch",
      "double hour: 11:00-13:00",
      "direction: south",
      "month: fifth lunar month, containing the summer solstice",
      "fixed phase: Fire",
      "polarity: yang",
      "trine: Tiger, Horse, Dog",
      "opposition: Rat"
    ],
    contested: [
      "The animal year begins at the lunar new year or at the solar term Lichun depending on lineage, and never on 1 January.",
      "Hour pillars taken from clock time and hour pillars taken from true solar time can differ by a whole branch, and practitioners disagree on which to use."
    ],
    prompts: [
      "Is this hour pillar built from clock time or from true solar time at the place of birth?",
      "What in this chart stands opposite 午, and at what distance?"
    ]
  },

  Goat: {
    plain:
      "The Goat is the eighth animal of the cycle and sits on the eighth earthly branch, 未 (wèi). Its double hour runs from 13:00 to 15:00 and its direction is south-southwest. English sources render the same animal as Goat, Sheep or Ram.",
    reading:
      "The attributions on this branch are gentleness, making, and dependence on a settled surrounding. In classical Chinese the character for sheep sits inside the characters for beauty and for what is right, an etymological link the tradition has often drawn on when reading this branch as the aesthetic and the fitting. Almanac material reads 未 as dry earth at the close of summer, holding fire and wood in store.",
    principle:
      "未 is a yin earth storage branch closing the summer quarter, with hidden stems of earth, fire and wood. It belongs to the fourth trine with 卯 (mǎo, Rabbit) and 亥 (hài, Pig) and stands opposite 丑 (chǒu, Ox), the other cold storage, a clash the tradition reads as two stores forced open at once. The animal name is a label on a branch position in the sixty-term count. Its year opens at the lunar new year or at Lichun rather than on 1 January, so a January or early February date is where the two reckonings can name different animals.",
    energies: [
      "dry earth at the close of summer",
      "the fitting and the beautiful",
      "making and tending",
      "held warmth",
      "settled surrounding"
    ],
    tensions: [
      "sensitivity against decision",
      "dependence on conditions that are given",
      "storage opened by its opposite"
    ],
    attributions: [
      {
        lineage: "Chinese lexical tradition",
        claim: "The sheep radical stands inside the graphs for beauty and for rightness, and commentators have long read the branch through that link."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "未 is a yin earth storage branch with hidden stems of earth, fire and wood, and it clashes with 丑."
      },
      {
        lineage: "Chinese folk tradition",
        claim: "The eighth branch is rendered as goat, sheep or ram without a single settled English equivalent."
      }
    ],
    correspondences: [
      "branch: 未 (wèi), eighth earthly branch",
      "double hour: 13:00-15:00",
      "direction: south-southwest",
      "month: sixth lunar month, last of summer",
      "fixed phase: Earth",
      "polarity: yin",
      "trine: Rabbit, Goat, Pig",
      "opposition: Ox"
    ],
    contested: [
      "The year boundary is disputed between the lunar new year and Lichun, and is 1 January in neither, so January and early February dates sit exactly on the divergence.",
      "The English name for this branch is unsettled -- goat, sheep and ram are all in use for the same character."
    ],
    prompts: [
      "Which English rendering does this working use for 未, and does the choice change anything in the reading?",
      "Is 丑 present in this chart to clash the storage open?"
    ]
  },

  Monkey: {
    plain:
      "The Monkey is the ninth animal of the cycle and sits on the ninth earthly branch, 申 (shēn). Its double hour runs from 15:00 to 17:00 and its direction is west-southwest.",
    reading:
      "Attributions on the Monkey are invention, imitation, speed of learning and a disregard for the fixed order of things. The Monkey King of the vernacular novel tradition, who breaks the register of the dead and disrupts the court of heaven before being subdued, is the figure most often used to give the branch its cast. Almanac material reads 申 as the first month of autumn, metal that has just begun to harden while water is held hidden inside it.",
    principle:
      "申 is a yang metal growth branch opening the autumn quarter, with hidden stems of metal, water and earth. It belongs to the first trine with 子 (zǐ, Rat) and 辰 (chén, Dragon) -- the water trine, a fire-to-water structure mirroring the way 巳 heads a metal trine -- and it stands opposite 寅 (yín, Tiger). The animal names a position in the sixty-term stem-and-branch count. The year it labels begins at the lunar new year or, in solar-term reckoning, at Lichun, never on 1 January, so a January or early February date is exactly the case where the two systems can disagree.",
    energies: [
      "beginning of autumn",
      "new metal",
      "invention and imitation",
      "speed of learning",
      "water hidden inside metal"
    ],
    tensions: [
      "ingenuity against constancy",
      "a metal branch heading a water trine",
      "disruption of an order that also protects"
    ],
    attributions: [
      {
        lineage: "Vernacular novel tradition",
        claim: "The Monkey King is the standard literary figure attached to this branch: unruly, resourceful and finally bound."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "申 is a yang metal growth branch with hidden water, and it opens the 申子辰 water trine."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "West, white, autumn and metal stand in one correlative column with the branches of this quarter."
      }
    ],
    correspondences: [
      "branch: 申 (shēn), ninth earthly branch",
      "double hour: 15:00-17:00",
      "direction: west-southwest",
      "month: seventh lunar month, first of autumn",
      "fixed phase: Metal",
      "polarity: yang",
      "trine: Rat, Dragon, Monkey",
      "opposition: Tiger"
    ],
    contested: [
      "The year boundary differs by lineage -- lunar new year or Lichun -- and is 1 January in neither reckoning.",
      "Whether the growth branch that opens a trine keeps its own phase or is largely absorbed into the trine phase is argued between schools."
    ],
    prompts: [
      "Is 申 being weighed here as metal, or as the head of the water trine?",
      "Which branch in this chart sits opposite 申, and does anything mediate the axis?"
    ]
  },

  Rooster: {
    plain:
      "The Rooster is the tenth animal of the cycle and sits on the tenth earthly branch, 酉 (yǒu). Its double hour runs from 17:00 to 19:00 and its direction is due west.",
    reading:
      "The Rooster gathers attributions of exactness, announcement and the keeping of time. The bird that calls the hour is a timekeeper before it is a character, and in folk usage the crowing cock is also apotropaic, its call marking the end of the night and the dispersal of what belongs to it. Almanac material reads 酉 as the autumn equinox month, pure metal, refined rather than raw.",
    principle:
      "酉 is a yin metal cardinal branch at the autumn equinox, one of the four cardinal or peach-blossom positions and pure in its phase without hidden stems of another. It belongs to the second trine with 巳 (sì, Snake) and 丑 (chǒu, Ox), and stands opposite 卯 (mǎo, Rabbit) on the east-west axis of the branch compass. The animal is a name for a position in the sixty-term count rather than a description of a person. The year it labels begins at the lunar new year or at Lichun and never on 1 January, so January and early February dates fall precisely where the reckonings part.",
    energies: [
      "autumn equinox",
      "refined metal",
      "the announced hour",
      "exactness",
      "sorting and cutting away"
    ],
    tensions: [
      "precision against tolerance",
      "announcement against timing",
      "refinement that has nothing left to remove"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The cock crow marks the end of night and is treated as dispersing what belongs to the dark."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "酉 is a yin metal cardinal branch, pure metal, counted among the peach-blossom positions and clashing with 卯."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "West, white, autumn and metal are set in one correlative column with this branch."
      }
    ],
    correspondences: [
      "branch: 酉 (yǒu), tenth earthly branch",
      "double hour: 17:00-19:00",
      "direction: west",
      "month: eighth lunar month, containing the autumn equinox",
      "fixed phase: Metal",
      "polarity: yin",
      "trine: Ox, Snake, Rooster",
      "opposition: Rabbit"
    ],
    contested: [
      "Sources disagree on the start of the animal year: lunar new year in almanac use, Lichun in most Four Pillars practice, 1 January in neither.",
      "Whether a cardinal branch can be said to have hidden stems at all is treated differently in different manuals."
    ],
    prompts: [
      "What sits on the 卯-酉 axis in this chart, and at what distance?",
      "Is the Rooster read here as timekeeper or as refined metal?"
    ]
  },

  Dog: {
    plain:
      "The Dog is the eleventh animal of the cycle and sits on the eleventh earthly branch, 戌 (xū). Its double hour runs from 19:00 to 21:00 and its direction is west-northwest.",
    reading:
      "Attributions on the Dog are guarding, fidelity and the marking of a boundary between what belongs inside and what does not. The watch-dog at dusk is the image the almanacs use, and the branch takes its cast from the hour: the point at which the day closes and the household is shut. Almanac material reads 戌 as dry earth at the close of autumn, holding fire and metal in store.",
    principle:
      "戌 is a yang earth storage branch closing the autumn quarter, with hidden stems of earth, metal and fire. It belongs to the third trine with 寅 (yín, Tiger) and 午 (wǔ, Horse) -- the fire trine, which it closes as the store into which that fire is put away -- and it stands opposite 辰 (chén, Dragon), the clash of the two yang earth storages. The animal is a label on a position in the sixty-term count. Its year begins at the lunar new year or at Lichun rather than 1 January, so January and early February dates are exactly where the two reckonings can assign different animals.",
    energies: [
      "dry earth at the close of autumn",
      "dusk and the shut gate",
      "guarding",
      "fire put into store",
      "fidelity to a boundary"
    ],
    tensions: [
      "vigilance against suspicion",
      "loyalty to a boundary that may be wrongly drawn",
      "two earth storages clashing on one axis"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The dog keeps the threshold at nightfall and stands for the difference between household and outside."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "戌 is a yang earth storage branch with hidden stems of earth, metal and fire, and closes the 寅午戌 fire trine."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "The four storage branches sit at the corners of the compass and each closes the season before it."
      }
    ],
    correspondences: [
      "branch: 戌 (xū), eleventh earthly branch",
      "double hour: 19:00-21:00",
      "direction: west-northwest",
      "month: ninth lunar month, last of autumn",
      "fixed phase: Earth",
      "polarity: yang",
      "trine: Tiger, Horse, Dog",
      "opposition: Dragon"
    ],
    contested: [
      "The year boundary is disputed between the lunar new year and Lichun; a January or early February date can be given two different animals by two different sources.",
      "Manuals differ on the proportions of the hidden stems inside a storage branch, and therefore on how much fire 戌 is holding."
    ],
    prompts: [
      "Does the 寅午戌 trine complete in this chart, and if not, which member is missing?",
      "What in this chart would open the 辰-戌 clash?"
    ]
  },

  Pig: {
    plain:
      "The Pig is the twelfth and last animal of the cycle and sits on the twelfth earthly branch, 亥 (hài). Its double hour runs from 21:00 to 23:00 and its direction is north-northwest. English sources also render it Boar.",
    reading:
      "Attributions on the Pig are plenty, candour and rest at the end of a round. The pig is the household animal of provision and the branch closes the twelve, so what has been gathered through the cycle is read here rather than what is set in motion. Almanac material reads 亥 as the first month of winter, moving water, with wood held hidden inside it.",
    principle:
      "亥 is a yin water growth branch opening the winter quarter, with hidden stems of water and wood. It belongs to the fourth trine with 卯 (mǎo, Rabbit) and 未 (wèi, Goat) -- the wood trine, headed by a water branch, the same pattern by which 巳 heads a metal trine and 申 a water one -- and it stands opposite 巳 (sì, Snake). Closing the twelve, it returns the count to 子 and the sixty-term stem-and-branch cycle begins its next turn. The year it labels opens at the lunar new year or at Lichun, never on 1 January, so a January or early February date is exactly where the two reckonings diverge.",
    energies: [
      "beginning of winter",
      "moving water",
      "provision and plenty",
      "close of the round",
      "wood hidden inside water"
    ],
    tensions: [
      "candour against defence",
      "plenty against discernment",
      "an ending that is also a growth branch"
    ],
    attributions: [
      {
        lineage: "Chinese folk tradition",
        claim: "The pig is the household animal of stored provision, and the twelfth branch closes the round on abundance rather than on initiative."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "亥 is a yin water growth branch with hidden wood, and it opens the 亥卯未 wood trine."
      },
      {
        lineage: "Sexagenary structure",
        claim: "亥 is the last branch; after it the ten stems and twelve branches resume their pairing and the sixty-term cycle turns over."
      }
    ],
    correspondences: [
      "branch: 亥 (hài), twelfth earthly branch",
      "double hour: 21:00-23:00",
      "direction: north-northwest",
      "month: tenth lunar month, first of winter",
      "fixed phase: Water",
      "polarity: yin",
      "trine: Rabbit, Goat, Pig",
      "opposition: Snake"
    ],
    contested: [
      "The year boundary differs by lineage: lunar new year in almanac use, Lichun in most Four Pillars practice, and 1 January in neither.",
      "The English name for the twelfth branch is unsettled between pig and boar, and the two carry different connotations in English that the Chinese term does not separate."
    ],
    prompts: [
      "Where does the 亥卯未 wood trine stand in this chart, complete or partial?",
      "Is 亥 being read as an ending or as the opening of the winter quarter?"
    ]
  }
};

export const CN_ELEMENT_SYMBOLISM = {
  Wood: {
    plain:
      "Wood (木, mù) is one of the five phases. It is placed in the east, in spring, and in the colour green-blue. Its stems are 甲 (yang wood) and 乙 (yin wood).",
    reading:
      "Wood is named for what a growing tree does rather than for timber: it pushes outward and upward against resistance, it bends, and it branches. Medical tradition attaches it to the liver and gall bladder, to the eyes, to the sour flavour, to wind, and to anger as the emotion that rises when the movement is blocked. Divinatory material reads wood positions as planning, extension and the setting of direction.",
    principle:
      "Wood holds a fixed place in both of the cycles that give the five phases their structure. In the generating cycle (xiang sheng) water generates wood and wood generates fire; in the overcoming cycle (xiang ke) metal cuts wood and wood parts earth. Wood is therefore generated by what precedes it and constrained by the phase two steps ahead, so no phase in the scheme is free-standing. The two branches fixed to wood are 寅 (Tiger) and 卯 (Rabbit); the astral correlate is Jupiter, the year-star.",
    energies: [
      "upward extension",
      "spring",
      "bending without breaking",
      "planning and direction",
      "germination"
    ],
    tensions: [
      "extension against the limit that metal sets",
      "flexibility that becomes rigidity",
      "growth outrunning its root"
    ],
    attributions: [
      {
        lineage: "Five phases (wu xing)",
        claim: "Water generates wood; wood generates fire. Metal overcomes wood; wood overcomes earth."
      },
      {
        lineage: "Traditional Chinese medicine",
        claim: "Wood governs the liver and gall bladder, the eyes and the sinews, with wind as its climate and anger as its emotion."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "East, spring, green-blue, the sour flavour and Jupiter are set in the wood column."
      }
    ],
    correspondences: [
      "direction: east",
      "season: spring",
      "colour: green-blue (qing)",
      "stems: 甲 (yang), 乙 (yin)",
      "branches: 寅 (Tiger), 卯 (Rabbit)",
      "planet: Jupiter",
      "climate: wind",
      "flavour: sour",
      "organs: liver, gall bladder",
      "generated by: Water | generates: Fire",
      "overcome by: Metal | overcomes: Earth"
    ],
    contested: [
      "The five phases are given in more than one canonical order: the Hong Fan chapter of the Book of Documents lists them in one sequence, while the generating and overcoming cycles order them in two others. Sources differ on which order is prior.",
      "Whether wu xing is best rendered as elements, phases or agents is disputed, and the choice changes what the scheme appears to describe."
    ],
    prompts: [
      "Which cycle is being read at this point in the working, the generating or the overcoming?",
      "What is generating the wood here, and what is cutting it?"
    ]
  },

  Fire: {
    plain:
      "Fire (火, huǒ) is one of the five phases. It is placed in the south, in summer, and in the colour red. Its stems are 丙 (yang fire) and 丁 (yin fire).",
    reading:
      "Fire is named for what rises, spreads and makes visible. Medical tradition attaches it to the heart and small intestine, to the tongue and speech, to the bitter flavour, to heat, and to joy as its emotion. Divinatory material reads fire positions as display, recognition and whatever depends on being seen.",
    principle:
      "In the generating cycle wood generates fire and fire generates earth, ash returning to the ground. In the overcoming cycle water quenches fire and fire melts metal. Fire therefore sits between what feeds it and what it consumes, and the tradition emphasises that the same relation is a benefit at one remove and a constraint at two. The branches fixed to fire are 巳 (Snake) and 午 (Horse); the astral correlate is Mars, called the sparkling deluder.",
    energies: [
      "rising and spreading",
      "summer",
      "visibility",
      "warmth given outward",
      "quickened transformation"
    ],
    tensions: [
      "brightness against fuel",
      "display against reserve",
      "heat without the water that answers it"
    ],
    attributions: [
      {
        lineage: "Five phases (wu xing)",
        claim: "Wood generates fire; fire generates earth. Water overcomes fire; fire overcomes metal."
      },
      {
        lineage: "Traditional Chinese medicine",
        claim: "Fire governs the heart and small intestine, the tongue and the vessels, with heat as its climate and joy as its emotion."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "South, summer, red, the bitter flavour and Mars are set in the fire column."
      }
    ],
    correspondences: [
      "direction: south",
      "season: summer",
      "colour: red",
      "stems: 丙 (yang), 丁 (yin)",
      "branches: 巳 (Snake), 午 (Horse)",
      "planet: Mars",
      "climate: heat",
      "flavour: bitter",
      "organs: heart, small intestine",
      "generated by: Wood | generates: Earth",
      "overcome by: Water | overcomes: Metal"
    ],
    contested: [
      "Medical tradition sometimes splits fire into sovereign fire and ministerial fire, giving it two seats rather than one; other schemes keep it single.",
      "Whether the five-phase correspondences form one consistent system or several overlapping ones assembled in the Han period is a long-standing scholarly dispute."
    ],
    prompts: [
      "Is fire here read as single, or split into sovereign and ministerial?",
      "What answers the fire in this configuration -- water that controls it, or earth that drains it?"
    ]
  },

  Earth: {
    plain:
      "Earth (土, tǔ) is one of the five phases. It is placed at the centre rather than at a compass point, and is attached to the transitions between seasons. Its stems are 戊 (yang earth) and 己 (yin earth).",
    reading:
      "Earth is named for what receives, holds and turns one thing into another. Medical tradition attaches it to the spleen and stomach, to the mouth and the flesh, to the sweet flavour, to damp, and to pensiveness or overthinking as its emotion. Divinatory material reads earth positions as mediation, holding and the ground on which the other phases stand.",
    principle:
      "Earth is structurally unlike the other four: it has no season of its own in one scheme and four in another, sitting in the last eighteen days of each season or at the centre of the compass with the other phases around it. In the generating cycle fire generates earth and earth generates metal; in the overcoming cycle wood parts earth and earth dams water. All four storage branches -- 辰, 未, 戌, 丑 -- are earth, which is why earth in this scheme is the phase of storage as such. Its astral correlate is Saturn, the quelling star.",
    energies: [
      "the centre",
      "transition between seasons",
      "receiving and holding",
      "storage",
      "mediation"
    ],
    tensions: [
      "holding against release",
      "a phase with no season, or with four",
      "damp that becomes stagnation"
    ],
    attributions: [
      {
        lineage: "Five phases (wu xing)",
        claim: "Fire generates earth; earth generates metal. Wood overcomes earth; earth overcomes water."
      },
      {
        lineage: "Traditional Chinese medicine",
        claim: "Earth governs the spleen and stomach, the mouth and the flesh, with damp as its climate and pensiveness as its emotion."
      },
      {
        lineage: "Four Pillars (Bazi)",
        claim: "The four storage branches are all earth, so earth carries the function of storage in the branch scheme."
      }
    ],
    correspondences: [
      "direction: centre",
      "season: the transitions, or the last period of each season",
      "colour: yellow",
      "stems: 戊 (yang), 己 (yin)",
      "branches: 辰, 未, 戌, 丑 (the four storages)",
      "planet: Saturn",
      "climate: damp",
      "flavour: sweet",
      "organs: spleen, stomach",
      "generated by: Fire | generates: Metal",
      "overcome by: Wood | overcomes: Water"
    ],
    contested: [
      "Sources place earth either at the centre with no season of its own or in the closing period of every season; the two placements give different readings and are not reconciled.",
      "In some schemes earth is treated as the pivot on which the other four turn rather than as a fifth term alongside them."
    ],
    prompts: [
      "Is earth being placed at the centre here, or distributed into the season closings?",
      "Which of the four earth branches is actually present in this chart?"
    ]
  },

  Metal: {
    plain:
      "Metal (金, jīn) is one of the five phases. It is placed in the west, in autumn, and in the colour white. Its stems are 庚 (yang metal) and 辛 (yin metal).",
    reading:
      "Metal is named for what condenses, hardens and separates -- the blade and the ingot rather than ore in the ground. Medical tradition attaches it to the lungs and large intestine, to the nose and the skin, to the pungent flavour, to dryness, and to grief as its emotion. Divinatory material reads metal positions as judgement, form and the cutting away of what does not belong.",
    principle:
      "In the generating cycle earth generates metal and metal generates water, condensation forming on a cold surface. In the overcoming cycle fire melts metal and metal cuts wood. The pairing of grief with autumn and with the lungs is one of the tightest joins in the correlative system: the season of falling, the organ of taking in and letting go, and the emotion of loss are read as one movement described three ways. The branches fixed to metal are 申 (Monkey) and 酉 (Rooster); the astral correlate is Venus, the great white.",
    energies: [
      "autumn",
      "condensation and hardening",
      "separation",
      "form and edge",
      "letting fall"
    ],
    tensions: [
      "discernment against severity",
      "clarity that cuts more than intended",
      "dryness without the water it makes"
    ],
    attributions: [
      {
        lineage: "Five phases (wu xing)",
        claim: "Earth generates metal; metal generates water. Fire overcomes metal; metal overcomes wood."
      },
      {
        lineage: "Traditional Chinese medicine",
        claim: "Metal governs the lungs and large intestine, the nose and the skin, with dryness as its climate and grief as its emotion."
      },
      {
        lineage: "Han correlative cosmology",
        claim: "West, autumn, white, the pungent flavour and Venus are set in the metal column."
      }
    ],
    correspondences: [
      "direction: west",
      "season: autumn",
      "colour: white",
      "stems: 庚 (yang), 辛 (yin)",
      "branches: 申 (Monkey), 酉 (Rooster)",
      "planet: Venus",
      "climate: dryness",
      "flavour: pungent",
      "organs: lungs, large intestine",
      "generated by: Earth | generates: Water",
      "overcome by: Fire | overcomes: Wood"
    ],
    contested: [
      "How metal generates water is explained differently across sources -- condensation on a cold surface in some, molten metal flowing in others -- and the two images support different readings.",
      "Whether metal should be read as raw ore or as worked blade changes what the phase is taken to mean, and manuals differ."
    ],
    prompts: [
      "Is the metal here ore or blade, and does the reading depend on the difference?",
      "What in this configuration is being cut, and by what?"
    ]
  },

  Water: {
    plain:
      "Water (水, shuǐ) is one of the five phases. It is placed in the north, in winter, and in the colour black. Its stems are 壬 (yang water) and 癸 (yin water).",
    reading:
      "Water is named for what descends, seeks the low ground and takes the shape of what holds it. Medical tradition attaches it to the kidneys and bladder, to the ears and the bones, to the salty flavour, to cold, and to fear as its emotion. Divinatory material reads water positions as depth, communication and what moves without being seen to move.",
    principle:
      "In the generating cycle metal generates water and water generates wood; in the overcoming cycle earth dams water and water quenches fire. Water closes the generating round and hands it back to wood, which is why the scheme is a cycle and not a line. The branches fixed to water are 亥 (Pig) and 子 (Rat), and the winter solstice sits inside 子, so the deepest point of the water season is also where the tradition places the first return of yang. The astral correlate is Mercury, the morning star of the almanacs.",
    energies: [
      "winter",
      "descent to the low ground",
      "depth",
      "taking the shape of the vessel",
      "the turn at the solstice"
    ],
    tensions: [
      "yielding against direction",
      "depth that will not surface",
      "fear as the cost of accurate perception"
    ],
    attributions: [
      {
        lineage: "Five phases (wu xing)",
        claim: "Metal generates water; water generates wood. Earth overcomes water; water overcomes fire."
      },
      {
        lineage: "Traditional Chinese medicine",
        claim: "Water governs the kidneys and bladder, the ears and the bones, with cold as its climate and fear as its emotion."
      },
      {
        lineage: "Daoist writing",
        claim: "Water is repeatedly used as the figure for strength that works by yielding and by taking the low place."
      }
    ],
    correspondences: [
      "direction: north",
      "season: winter",
      "colour: black",
      "stems: 壬 (yang), 癸 (yin)",
      "branches: 亥 (Pig), 子 (Rat)",
      "planet: Mercury",
      "climate: cold",
      "flavour: salty",
      "organs: kidneys, bladder",
      "generated by: Metal | generates: Wood",
      "overcome by: Earth | overcomes: Fire"
    ],
    contested: [
      "The Hong Fan chapter of the Book of Documents opens its list of the five with water, while the generating cycle places water fourth; sources disagree on which ordering is the older.",
      "Beyond the generating and overcoming cycles, some traditions add over-acting and counter-acting relations, and how far these should be used in reading is not settled."
    ],
    prompts: [
      "Which relation is in play at this point -- generation, overcoming, or a counter-acting excess?",
      "What holds the water in this configuration, and what would break the vessel?"
    ]
  }
};

export function getAnimalSymbolism(a) {
  return ANIMAL_SYMBOLISM[a] || null;
}

export function getChineseElementSymbolism(e) {
  return CN_ELEMENT_SYMBOLISM[e] || null;
}
