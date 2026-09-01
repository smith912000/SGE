/*
 * difficultySymbolism.js
 *
 * Four places in the scheme that the traditions have read as costly, named by
 * sign: Saturn (the classical greater malefic), Chiron (a twentieth-century
 * addition), Pluto (a twentieth-century addition, generational by orbit) and
 * the twelfth house (Hellenistic Kakodaimon, the joy of Saturn).
 *
 * These records name the attribution and its lineage. They do not describe a
 * person, do not forecast, and do not instruct. "Difficulty" here is an
 * interpretive tradition with a documented history, not an observation; where
 * the sources disagree, the disagreement is left standing in the contested
 * field rather than resolved.
 *
 * Shape: { plain, reading, principle, energies?, tensions?, attributions?,
 *          correspondences?, contested?, prompts? }
 */

const MALEFIC_CONTEST = "The modern psychological reading of Saturn as the teacher, the wise elder or the necessary structure is a twentieth-century softening of an older attribution. Hellenistic, Persian and mediaeval sources call Saturn the greater malefic without qualification, and treat its significations as harm rather than instruction. Both readings remain in circulation and they are not compatible.";

export const DIFFICULTY = {

  /* ------------------------------------------------------------------ *
   * SATURN BY SIGN - the classical greater malefic, placed
   * ------------------------------------------------------------------ */
  saturn: {
    Aries: {
      plain: "Saturn stands in Aries. The slowest of the seven classical planets sits in the sign the tradition puts first.",
      reading: "Traditional dignity tables place Saturn in its fall in Aries, with the fall degree given as the twenty-first. The attribution is one of mismatch: the significator of delay, weight and boundary set in the sign of first motion. Older texts read the pairing as the check arriving at the moment of starting.",
      principle: "Fall is a position in the dignity scheme, not a verdict on an outcome. It names the sign opposite a planet's exaltation, and the doctrine holds that a planet there signifies with less of its own authority. Ptolemaic qualities give Saturn cold and dry, Aries hot and dry; the shared dryness is what some later commentators used to argue the fall is less severe here than the scheme suggests. " + MALEFIC_CONTEST,
      energies: ["delayed ignition", "weighted initiative", "slow first move"],
      tensions: ["speed against limit", "the check placed at the beginning"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Saturn is in fall in Aries, the sign opposite its exaltation in Libra." },
        { lineage: "Dorothean", claim: "Saturn is nonetheless the participating triplicity ruler of the fire signs, so it retains a minor dignity here." },
        { lineage: "Vedic", claim: "Shani is debilitated in Mesha; the same structural claim appears under the sidereal zodiac." }
      ],
      correspondences: ["dignity: fall", "metal: lead", "day: Saturday", "sign element: fire", "sign mode: cardinal"],
      contested: [
        "Whether fall names a weakened planet or a differently directed one is not settled across the sources.",
        "Some traditional authors weigh the minor triplicity dignity against the fall; others disregard it entirely."
      ],
      prompts: [
        "Which house holds this placement, and does the house topic support what the sign dignity withholds?",
        "Does the working follow the Ptolemaic dignity table or a later one?"
      ]
    },

    Taurus: {
      plain: "Saturn stands in Taurus. The planet of limit sits in a fixed earth sign that has no dignity table entry for it.",
      reading: "Saturn holds neither domicile, exaltation, fall nor detriment in Taurus, and in the Dorothean triplicity scheme the earth signs go to Venus, the Moon and Mars. A planet with no dignity in its sign is called peregrine, a term from the Latin for foreigner. Traditional texts read peregrine placement as acting without the sign's backing.",
      principle: "The essential dignity scheme grades a planet by where it falls, and peregrine is the null case rather than the negative one. Mediaeval authors nonetheless list peregrine among the debilities, and in horary practice a peregrine planet in an angular house carried a specific and unfavourable significance. The difficulty attributed here is therefore procedural, drawn from the scoring table, not from any quality of earth or of Venus. " + MALEFIC_CONTEST,
      energies: ["sustained holding", "unbacked endurance", "slow accumulation"],
      tensions: ["fixity meeting restriction", "weight upon what already resists movement"],
      attributions: [
        { lineage: "Mediaeval", claim: "Saturn is peregrine in Taurus, having no essential dignity there." },
        { lineage: "Dorothean", claim: "The earth triplicity is ruled by Venus by day, the Moon by night, with Mars participating; Saturn has no share." }
      ],
      correspondences: ["dignity: peregrine", "metal: lead", "day: Saturday", "sign element: earth", "sign mode: fixed"],
      contested: [
        "Later horary writers treated peregrine as a genuine debility; earlier Hellenistic material weights sect and aspect far more heavily than the dignity score.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Does the reading in hand use a dignity score at all, or does it work by sect and aspect?",
        "What condition does Venus hold in this chart, given that Venus rules the sign?"
      ]
    },

    Gemini: {
      plain: "Saturn stands in Gemini. A mutable air sign, and one of the three signs where the older triplicity tables give Saturn a share.",
      reading: "In the Dorothean scheme Saturn rules the air triplicity by day, with Mercury by night and Jupiter participating. Gemini is therefore a sign where Saturn carries a minor dignity rather than none. The attribution of difficulty here comes not from the dignity table but from the pairing of the slowest planet with the sign the tradition associates with quickness and division.",
      principle: "Triplicity is the second of the essential dignities, weaker than domicile and exaltation but real in the mediaeval scoring systems. Its assignment depends on sect, meaning whether the chart is diurnal or nocturnal, so the same placement scores differently in a day chart and a night chart. Sect matters twice over for Saturn, which Hellenistic doctrine counts as the diurnal malefic and holds to be less harmful by day. " + MALEFIC_CONTEST,
      energies: ["measured speech", "structured enquiry", "long study"],
      tensions: ["slowness set against quickness", "the many divided by the one that will not hurry"],
      attributions: [
        { lineage: "Dorothean", claim: "Saturn is the day triplicity ruler of the air signs, Gemini among them." },
        { lineage: "Hellenistic", claim: "Saturn belongs to the diurnal sect and is held to signify less harshly in a day chart." }
      ],
      correspondences: ["dignity: triplicity by day", "metal: lead", "day: Saturday", "sign element: air", "sign mode: mutable"],
      contested: [
        "Triplicity ruler tables differ: the Dorothean threefold scheme and the simpler Ptolemaic pairing do not always agree.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Is this chart diurnal or nocturnal, and does the method in use apply sect at all?",
        "Which triplicity table does the working follow?"
      ]
    },

    Cancer: {
      plain: "Saturn stands in Cancer, the sign opposite its own house of Capricorn.",
      reading: "Cancer is one of the two signs of Saturn's detriment, being opposite Capricorn, which the tradition gives Saturn as its nocturnal domicile. Detriment is read as a planet lodged in the sign of its opposite significations. The Moon rules Cancer, and the pairing of the slowest, driest and coldest classical planet with the fastest and most changeable body is the older ground of the attribution.",
      principle: "Detriment is derived by opposition rather than observed: it is a consequence of the domicile scheme, which itself derives from the Thema Mundi ordering of planets outward from the luminaries. The scheme is elegant and internally consistent, which is a different thing from being empirical. What is being named is a position in a diagram. " + MALEFIC_CONTEST,
      energies: ["guarded feeling", "structural memory", "enclosure made solid"],
      tensions: ["cold set in a water sign", "the fixed answer given to a changing question"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Saturn is in detriment in Cancer, opposite its domicile in Capricorn." },
        { lineage: "Hellenistic", claim: "The domicile scheme derives from the Thema Mundi, with Cancer and Leo given to the luminaries and the other signs ordered outward from them." }
      ],
      correspondences: ["dignity: detriment", "metal: lead", "day: Saturday", "sign element: water", "sign mode: cardinal"],
      contested: [
        "Detriment is a derived position, not an independently attested one; some modern traditional revivalists weight it heavily, others treat it as bookkeeping.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "What condition does the Moon hold, given that the Moon rules the sign Saturn occupies here?",
        "Does the method in hand give detriment its own weight, or only the absence of dignity?"
      ]
    },

    Leo: {
      plain: "Saturn stands in Leo, the sign opposite its diurnal house of Aquarius.",
      reading: "Leo is Saturn's second sign of detriment, opposite Aquarius. The Sun rules Leo, and the classical attribution sets the coldest planet against the source of heat and visible light. Mediaeval texts read the pairing as the significator of restriction placed in the sign of display.",
      principle: "The two detriments of Saturn are the two solar and lunar signs, which follows necessarily from the Thema Mundi arrangement: Saturn is placed furthest from the luminaries in the domicile order, so its own signs fall opposite theirs. The apparent hostility between Saturn and the Sun in this scheme is therefore structural before it is qualitative. " + MALEFIC_CONTEST,
      energies: ["restrained display", "sober authority", "light under weight"],
      tensions: ["cold against heat", "the withheld against the shown"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Saturn is in detriment in Leo, opposite its domicile in Aquarius." },
        { lineage: "Renaissance", claim: "Saturn and the Sun are treated as contrary in nature within the qualitative scheme of hot and cold, dry and moist." }
      ],
      correspondences: ["dignity: detriment", "metal: lead", "day: Saturday", "sign element: fire", "sign mode: fixed"],
      contested: [
        "Whether Saturn and the Sun are genuinely contrary or merely diametric in the domicile diagram is argued differently by qualitative and structural readings.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Where does the Sun sit in relation to this placement, and is there an aspect between them?",
        "Does the reading treat the contrariety as qualitative or as an artefact of the domicile order?"
      ]
    },

    Virgo: {
      plain: "Saturn stands in Virgo, a mutable earth sign where the dignity tables give it nothing.",
      reading: "Saturn is peregrine in Virgo. Mercury rules the sign, and the earth triplicity belongs to Venus, the Moon and Mars in the Dorothean scheme. What the tradition attributes here is not a named debility but the meeting of the planet of limit with the sign of division and measure.",
      principle: "Some later authors read Saturn and Virgo as mutually reinforcing, since both carry significations of restriction, correction and the sorting of what is fit from what is not. That reading is a resemblance argument rather than a dignity argument, and the two kinds of claim are often blended in modern texts without being distinguished. " + MALEFIC_CONTEST,
      energies: ["exacting measure", "long correction", "labour without ornament"],
      tensions: ["the standard that cannot be met", "limit applied to what is already being sorted"],
      attributions: [
        { lineage: "Mediaeval", claim: "Saturn is peregrine in Virgo, holding no essential dignity there." },
        { lineage: "Modern psychological", claim: "Saturn and Virgo are read as thematically alike, both concerned with correction and sufficiency." }
      ],
      correspondences: ["dignity: peregrine", "metal: lead", "day: Saturday", "sign element: earth", "sign mode: mutable"],
      contested: [
        "Resemblance arguments and dignity arguments are different kinds of claim; many modern sources present them together without marking the difference.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Is the claim being made here a dignity claim or a resemblance claim?",
        "What is the condition of Mercury, which rules the sign?"
      ]
    },

    Libra: {
      plain: "Saturn stands in Libra, the sign of its exaltation. The dignity tables give the exaltation degree as the twenty-first.",
      reading: "Exaltation is the second of the essential dignities and Libra is where the tradition raises Saturn highest. Venus rules the sign and Saturn is exalted in it, which older texts read as the significator of limit given honour in the sign of proportion, measure and the weighed judgement. Ancient sources also note that the Sun is in its fall in Libra, so the same sign holds an exaltation and a fall together.",
      principle: "Exaltation is the oldest layer of the dignity scheme and predates the domicile scheme, with Mesopotamian antecedents in the places of the planets. It does not cancel Saturn's malefic classification: the greater malefic is still the greater malefic when exalted, and traditional texts describe an exalted malefic as more effective rather than more benign. That distinction is repeatedly lost in modern paraphrase. " + MALEFIC_CONTEST,
      energies: ["weighed judgement", "measured restraint", "honoured limit"],
      tensions: ["the scale that will not tip", "authority held in a sign of balance"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Saturn is exalted in Libra, at the twenty-first degree." },
        { lineage: "Mesopotamian", claim: "The exaltation degrees descend from an earlier scheme of planetary places predating the Greek domicile system." },
        { lineage: "Vedic", claim: "Shani is exalted in Tula, the same claim under the sidereal zodiac." }
      ],
      correspondences: ["dignity: exaltation", "exaltation degree: 21 Libra", "metal: lead", "day: Saturday", "sign element: air", "sign mode: cardinal"],
      contested: [
        "An exalted malefic is described in older sources as more able rather than more benign; the modern reading of exaltation as simply favourable does not follow from the traditional texts.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Does the method in use distinguish an exalted planet from a benefic one?",
        "How near is the placement to the twenty-first degree, and does the working weight that degree at all?"
      ]
    },

    Scorpio: {
      plain: "Saturn stands in Scorpio, a fixed water sign ruled in the traditional scheme by Mars.",
      reading: "Saturn is peregrine in Scorpio; the water triplicity belongs to Venus, Mars and the Moon. What the tradition names here is the meeting of the two classical malefics by rulership, Saturn placed in a sign of Mars. Mediaeval texts pay attention to the reception between a planet and its sign ruler, and this pairing sets the greater malefic in the house of the lesser.",
      principle: "Reception is the relation between a planet and the ruler of the sign it occupies, and it is a separate axis of judgement from dignity. A planet in the sign of a malefic is not thereby debilitated in the dignity sense, but the mediaeval scheme reads the placement through the condition of the dispositor. This is a relational claim, not a qualitative one about water or about depth. " + MALEFIC_CONTEST,
      energies: ["endurance under pressure", "held silence", "long consequence"],
      tensions: ["the two malefics joined by rulership", "restriction set in a sign of extremity"],
      attributions: [
        { lineage: "Mediaeval", claim: "Saturn is peregrine in Scorpio and disposited by Mars, the lesser malefic." },
        { lineage: "Modern", claim: "Scorpio is assigned to Pluto in most twentieth-century rulership schemes, which changes the dispositor entirely." }
      ],
      correspondences: ["dignity: peregrine", "traditional ruler: Mars", "modern ruler: Pluto", "metal: lead", "day: Saturday"],
      contested: [
        "Traditional and modern schemes give Scorpio different rulers, so the dispositor of this placement is not the same body in the two systems.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Which rulership scheme does the working follow, and therefore which body disposits this placement?",
        "What condition does that dispositor hold?"
      ]
    },

    Sagittarius: {
      plain: "Saturn stands in Sagittarius, a mutable fire sign ruled by Jupiter.",
      reading: "Saturn holds no major dignity in Sagittarius, though the Dorothean scheme gives it a participating share in the fire triplicity. Jupiter rules the sign, and the older texts set the greater malefic against the greater benefic as a standing pair. A placement of Saturn in a Jupiter sign is read through that pairing rather than through the dignity score.",
      principle: "The benefic and malefic classification is one of the oldest layers of the doctrine and is not derived from the dignity tables; it is asserted independently and then combined with them. Sagittarius places the two classifications in contact by rulership. Whether the contact is read as moderation of the malefic or as constriction of the benefic depends entirely on which source is being followed. " + MALEFIC_CONTEST,
      energies: ["disciplined enquiry", "structured belief", "long journey"],
      tensions: ["limit in the sign of extension", "the greater malefic in the house of the greater benefic"],
      attributions: [
        { lineage: "Dorothean", claim: "Saturn participates in the fire triplicity, a minor dignity in this sign." },
        { lineage: "Hellenistic", claim: "Saturn is classified the greater malefic and Jupiter the greater benefic, independently of the dignity tables." }
      ],
      correspondences: ["dignity: participating triplicity", "sign ruler: Jupiter", "metal: lead", "day: Saturday"],
      contested: [
        "Sources differ on whether a malefic in a benefic's sign is moderated or whether the benefic's significations are constrained.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "What condition does Jupiter hold in this chart?",
        "Does the working treat benefic and malefic as fixed classifications or as sect-dependent ones?"
      ]
    },

    Capricorn: {
      plain: "Saturn stands in Capricorn, one of its two domiciles. In the traditional scheme this is Saturn's nocturnal house.",
      reading: "Domicile is the strongest of the essential dignities: a planet in its own sign is held to act with its full and unmixed significations. For Saturn that means limit, weight, time, cold and the boundary, given without dilution. Older texts describe a planet in domicile as being in its own house, at liberty to do what it does.",
      principle: "Full dignity for a malefic is not the same claim as a favourable placement, and the traditional literature is explicit that the greater malefic in its own sign signifies its own nature most completely. The domicile scheme derives from the Thema Mundi, where the signs are ordered outward from Cancer and Leo, placing the two Saturnine signs at the far end of that order. " + MALEFIC_CONTEST,
      energies: ["structure at full strength", "time made visible", "authority by duration"],
      tensions: ["the unmixed nature of the greater malefic", "boundary without counterweight"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Capricorn is the nocturnal domicile of Saturn." },
        { lineage: "Hellenistic", claim: "The Thema Mundi orders the domiciles outward from the luminary signs, placing Capricorn and Aquarius at the outermost position." },
        { lineage: "Vedic", claim: "Makara is a domicile of Shani, and Shani rules the drig-related periods in the Vimshottari scheme." }
      ],
      correspondences: ["dignity: domicile", "metal: lead", "day: Saturday", "sign element: earth", "sign mode: cardinal"],
      contested: [
        "A planet at full dignity signifies fully; whether that is read as favourable depends on whether the planet is classified benefic or malefic, and the modern literature often conflates the two.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Does the method treat domicile as strength of effect or as quality of effect?",
        "Which house does this domicile fall in, and does that house share Saturn's significations?"
      ]
    },

    Aquarius: {
      plain: "Saturn stands in Aquarius, its diurnal domicile in the traditional scheme.",
      reading: "Before Uranus was added to the scheme, Aquarius was Saturn's day house, and traditional practice still reads it that way. A planet in domicile carries its significations at full weight. Sect doctrine adds a second layer here, since Saturn belongs to the diurnal sect and this is the diurnal of its two houses.",
      principle: "The assignment of Aquarius to Uranus is a post-eighteenth-century addition and does not displace the older attribution in traditional practice; the two schemes run in parallel in contemporary use. Sect is the more consequential distinction in the Hellenistic material: Saturn in a day chart is held to be within its own sect and to signify less harshly, and that judgement has nothing to do with the dignity table. " + MALEFIC_CONTEST,
      energies: ["fixed structure", "law over instance", "distance held"],
      tensions: ["the general applied to the particular", "boundary at full strength in a sign of abstraction"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Aquarius is the diurnal domicile of Saturn." },
        { lineage: "Modern", claim: "Aquarius is assigned to Uranus in most schemes written after that planet was identified." },
        { lineage: "Hellenistic", claim: "Saturn is of the diurnal sect; the same placement is judged differently in a day and a night chart." }
      ],
      correspondences: ["dignity: domicile", "traditional ruler: Saturn", "modern ruler: Uranus", "metal: lead", "day: Saturday"],
      contested: [
        "Traditional and modern schemes assign Aquarius to different rulers, and both are in current use.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Does the working use the traditional ruler of Aquarius, the modern one, or both?",
        "Is the chart diurnal or nocturnal, and does the method apply sect?"
      ]
    },

    Pisces: {
      plain: "Saturn stands in Pisces, a mutable water sign ruled in the traditional scheme by Jupiter.",
      reading: "Saturn is peregrine in Pisces; the water triplicity belongs to Venus, Mars and the Moon. Jupiter rules the sign, so as in Sagittarius the greater malefic sits in a house of the greater benefic. Venus is exalted in Pisces, which places a benefic exaltation and a peregrine malefic in the same sign.",
      principle: "Several independent layers of the scheme meet here and can be read against each other: rulership, triplicity, exaltation of another body, and the benefic and malefic classification. Traditional judgement proceeds by weighting these layers in a stated order, and different authors state different orders. A reading that does not name its order of precedence is not reproducible. " + MALEFIC_CONTEST,
      energies: ["boundary in solution", "long endurance", "structure meeting dissolution"],
      tensions: ["form set against what will not hold form", "limit where the sign signifies the unbounded"],
      attributions: [
        { lineage: "Mediaeval", claim: "Saturn is peregrine in Pisces, disposited by Jupiter." },
        { lineage: "Ptolemaic", claim: "Venus is exalted in Pisces, at the twenty-seventh degree." },
        { lineage: "Modern", claim: "Pisces is assigned to Neptune in most twentieth-century rulership schemes." }
      ],
      correspondences: ["dignity: peregrine", "traditional ruler: Jupiter", "modern ruler: Neptune", "metal: lead", "day: Saturday"],
      contested: [
        "Authors differ on the order in which dignity, reception, sect and aspect are weighted, so the same placement yields different judgements by different methods.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "What order of precedence does the method in hand apply?",
        "Which of the layers present in this sign is being given the deciding weight, and why that one?"
      ]
    }
  },

  /* ------------------------------------------------------------------ *
   * CHIRON BY SIGN - a twentieth-century body with no classical dignities
   * ------------------------------------------------------------------ */
  chiron: {
    Aries: {
      plain: "Chiron stands in Aries. Chiron was identified in 1977 and orbits between Saturn and Uranus; it carries both a minor planet and a comet designation.",
      reading: "Modern astrological literature reads Chiron through the myth of the centaur who taught medicine and could not cure his own wound. Placed in Aries, the sign of first motion and of Mars, the attribution is usually made to the act of asserting or beginning. No classical source assigns Chiron anything, because no classical source knew of it.",
      principle: "Every Chiron attribution is younger than the body's identification, which places the whole doctrine within living memory. The wounded healer reading is a late-twentieth-century coinage that draws on the Greek myth rather than on any astrological transmission, and the myth itself is a story about a teacher, not a diagnostic scheme. Where a source presents Chiron significations as ancient, the claim is anachronistic.",
      energies: ["first assertion", "the untested edge", "self-initiation"],
      tensions: ["the wound at the point of beginning", "assertion and its cost"],
      attributions: [
        { lineage: "Modern", claim: "Chiron is read as the wounded healer, a coinage of late twentieth-century astrological writing." },
        { lineage: "Greek myth", claim: "Chiron the centaur taught medicine, was wounded incurably and surrendered immortality; the myth predates any astrological use of the name." }
      ],
      correspondences: ["orbit: between Saturn and Uranus", "class: centaur", "identified: 1977", "sign ruler: Mars"],
      contested: [
        "There is no traditional lineage for Chiron; all significations are modern and the sources for them are recent and various.",
        "Some modern schemes assign Chiron rulership of Virgo, others of Sagittarius, and many assign none at all."
      ],
      prompts: [
        "Which modern source is the Chiron reading in hand drawn from?",
        "Does the working give Chiron the weight of a planet, of an asteroid, or of neither?"
      ]
    },

    Taurus: {
      plain: "Chiron stands in Taurus, a fixed earth sign ruled by Venus.",
      reading: "Modern readings attach Chiron in Taurus to the significations of the sign: the body, holding, worth and material sufficiency. The attribution is made by combining Chiron's modern keyword with the sign's traditional significations, which is the standard method in Chiron literature.",
      principle: "That method, keyword plus sign, generates a reading for any body placed in any sign, including bodies for which there is no observational or textual tradition. It is a productive method and a circular one: it can never fail to produce a result, which means it cannot be tested by producing one. Naming the method is part of naming the placement.",
      energies: ["the held thing", "material sufficiency", "slow repair"],
      tensions: ["worth measured against lack", "the body as the site of the attribution"],
      attributions: [
        { lineage: "Modern", claim: "Chiron in Taurus is read through Venus significations of worth, body and holding." }
      ],
      correspondences: ["class: centaur", "sign element: earth", "sign mode: fixed", "sign ruler: Venus"],
      contested: [
        "The keyword-plus-sign method produces a reading for every combination and therefore cannot be falsified by any of them.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Is the reading derived from the body, from the sign, or only from the combination of two keywords?",
        "What would count as evidence against this particular attribution?"
      ]
    },

    Gemini: {
      plain: "Chiron stands in Gemini, a mutable air sign ruled by Mercury.",
      reading: "Modern literature locates the Chiron attribution in Gemini around speech, learning and the exchange of information, following the traditional significations of Mercury's sign. The myth supplies the teaching motif, since the centaur is remembered as the tutor of heroes.",
      principle: "The teaching motif is the one part of the Chiron myth with a genuine textual basis in Greek sources, and it maps onto Gemini through Mercury rather than through anything specific to the body. The wound motif is equally attested in the myth; modern astrological writing tends to foreground the wound and background the teaching, which is an editorial choice rather than a finding.",
      energies: ["transmitted knowledge", "the taught thing", "exchange"],
      tensions: ["the teacher who cannot treat the teacher", "words that reach past what they can mend"],
      attributions: [
        { lineage: "Greek myth", claim: "Chiron is remembered as a tutor, named in the sources as teacher to Asclepius and Achilles." },
        { lineage: "Modern", claim: "Chiron in Gemini is read through Mercury significations of speech and learning." }
      ],
      correspondences: ["class: centaur", "sign element: air", "sign mode: mutable", "sign ruler: Mercury"],
      contested: [
        "Modern astrological writing emphasises the wound over the teaching; the myth carries both, and the emphasis is a choice made by recent authors.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Which half of the myth is the reading in hand leaning on?",
        "Does the working distinguish what the myth says from what modern astrology has made of it?"
      ]
    },

    Cancer: {
      plain: "Chiron stands in Cancer, a cardinal water sign ruled by the Moon.",
      reading: "Modern readings place the Chiron attribution in Cancer around household, lineage and the conditions of early care, following the traditional significations of the Moon's sign. In the myth Chiron is set apart from his own parentage and raised outside it, and modern writers commonly cite that detail for this placement.",
      principle: "The myth detail is genuine, but its use here is an association drawn by recent authors rather than a transmitted doctrine. Cancer's significations of household and origin come from the Hellenistic material and are far older than anything attached to Chiron. Two different ages of material are being combined, and the combination is the modern contribution.",
      energies: ["origin and its account", "shelter", "the tended thing"],
      tensions: ["care and the gap in it", "lineage set apart from itself"],
      attributions: [
        { lineage: "Greek myth", claim: "Chiron is described in the sources as separated from his parentage and reared apart." },
        { lineage: "Modern", claim: "Chiron in Cancer is read through lunar significations of household and origin." }
      ],
      correspondences: ["class: centaur", "sign element: water", "sign mode: cardinal", "sign ruler: Moon"],
      contested: [
        "Cancer's significations are ancient; the Chiron significations are recent. Combining them does not make the result ancient.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "How old is each half of the claim being made here?",
        "What condition does the Moon hold, given that the Moon rules the sign?"
      ]
    },

    Leo: {
      plain: "Chiron stands in Leo, a fixed fire sign ruled by the Sun.",
      reading: "Modern readings attach the Chiron attribution in Leo to visibility, performance and the made thing, following the traditional solar significations of the sign. The Chiron literature commonly frames this as the site where recognition and its absence are at issue.",
      principle: "Leo's significations as the solar domicile are Hellenistic and structural, derived from the Thema Mundi where Leo is given to the Sun. The Chiron layer laid over them is fifty years old at most. Naming the two layers separately is what keeps the reading honest; collapsing them produces a claim with a borrowed authority it has not earned.",
      energies: ["the shown thing", "made work", "recognition"],
      tensions: ["visibility and what it costs", "the made thing measured against the maker"],
      attributions: [
        { lineage: "Hellenistic", claim: "Leo is the domicile of the Sun in the Thema Mundi ordering." },
        { lineage: "Modern", claim: "Chiron in Leo is read through solar significations of display and the made work." }
      ],
      correspondences: ["class: centaur", "sign element: fire", "sign mode: fixed", "sign ruler: Sun"],
      contested: [
        "The sign layer and the Chiron layer differ in age by roughly two thousand years and are often presented as a single claim.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Are the two layers of this attribution being named separately in the reading?",
        "Where does the Sun sit in relation to this placement?"
      ]
    },

    Virgo: {
      plain: "Chiron stands in Virgo, a mutable earth sign ruled by Mercury. Some modern schemes assign Chiron rulership of Virgo.",
      reading: "This is the sign where the modern Chiron rulership claim is most often made, on the grounds that Virgo carries significations of healing, correction and service, and that the myth names Chiron a physician. The claim is not universal: other modern authors assign Chiron to Sagittarius on the grounds of the centaur form, and many assign no rulership at all.",
      principle: "Rulership claims for bodies discovered after the classical period are asserted by argument from resemblance, and resemblance arguments can be constructed in more than one direction, as the Virgo and Sagittarius proposals demonstrate. The traditional scheme has Mercury ruling Virgo, and none of the modern proposals has displaced that in traditional practice. The disagreement is live and unresolved.",
      energies: ["remedy", "correction", "service and its limit"],
      tensions: ["the physician and the untreatable case", "sufficiency measured and found short"],
      attributions: [
        { lineage: "Modern", claim: "Some schemes assign Chiron rulership of Virgo, citing healing and service significations." },
        { lineage: "Modern", claim: "Other schemes assign Chiron rulership of Sagittarius, citing the centaur form." },
        { lineage: "Ptolemaic", claim: "Virgo is the domicile of Mercury and the sign of Mercury's exaltation." }
      ],
      correspondences: ["class: centaur", "sign element: earth", "sign mode: mutable", "traditional ruler: Mercury"],
      contested: [
        "Chiron rulership of Virgo, of Sagittarius, or of nothing at all: three positions, all current, none settled.",
        "Resemblance arguments support both the Virgo and the Sagittarius proposals, which is a problem for the method rather than for either proposal."
      ],
      prompts: [
        "Which rulership position does the working adopt, and on what grounds?",
        "If a resemblance argument supports two incompatible conclusions, what decides between them?"
      ]
    },

    Libra: {
      plain: "Chiron stands in Libra, a cardinal air sign ruled by Venus.",
      reading: "Modern readings place the Chiron attribution in Libra around the one-to-one relation, proportion and the terms of agreement, following the traditional significations of the seventh sign. Libra is also the sign of Saturn's exaltation and the Sun's fall in the classical tables, so several older attributions already stand here.",
      principle: "Libra carries a dense set of classical attributions independent of Chiron: Venus rulership, Saturn exaltation, solar fall. A modern body placed in the sign enters a crowded field, and the reading has to state whether the modern layer is being added to the classical one or read instead of it. Most texts do not state this.",
      energies: ["the terms of a relation", "proportion", "agreement"],
      tensions: ["the balance that does not settle", "relation and the cost of holding it"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Libra holds the exaltation of Saturn and the fall of the Sun." },
        { lineage: "Modern", claim: "Chiron in Libra is read through Venus significations of relation and proportion." }
      ],
      correspondences: ["class: centaur", "sign element: air", "sign mode: cardinal", "sign ruler: Venus"],
      contested: [
        "Whether modern bodies are read alongside the classical dignities of a sign or in place of them is rarely stated explicitly.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Is the modern layer being added to the classical attributions of this sign, or substituted for them?",
        "Which of the attributions standing in Libra does the reading actually use?"
      ]
    },

    Scorpio: {
      plain: "Chiron stands in Scorpio, a fixed water sign ruled by Mars in the traditional scheme and by Pluto in most modern ones.",
      reading: "Modern readings attach the Chiron attribution in Scorpio to what is not shown, to consequence and to what the sign's literature calls the irreversible. This places two modern bodies in relation, since the modern ruler of the sign is itself a twentieth-century addition.",
      principle: "Where a modern body sits in a sign given a modern ruler, the entire chain of attribution is recent and self-referential: the dispositor argument depends on a rulership that the traditional scheme does not grant. A reading that follows the modern dispositor is not extending the tradition but running a parallel system with its own axioms.",
      energies: ["consequence", "the unshown", "what does not reverse"],
      tensions: ["depth and its price", "what is held rather than said"],
      attributions: [
        { lineage: "Traditional", claim: "Scorpio is a domicile of Mars." },
        { lineage: "Modern", claim: "Scorpio is assigned to Pluto in most twentieth-century schemes, making both body and dispositor modern here." }
      ],
      correspondences: ["class: centaur", "sign element: water", "sign mode: fixed", "traditional ruler: Mars", "modern ruler: Pluto"],
      contested: [
        "The modern rulership of Scorpio is not accepted in traditional practice, so the dispositor of this placement differs entirely between the two systems.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Which system is the working inside, and does it mix axioms from both?",
        "Which body is being treated as the dispositor here?"
      ]
    },

    Sagittarius: {
      plain: "Chiron stands in Sagittarius, a mutable fire sign ruled by Jupiter. The sign is figured as an archer of centaur form.",
      reading: "The centaur figure is the ground of the second modern rulership proposal for Chiron. Sagittarius is depicted in the traditional iconography as a centaur archer, and some modern authors read that resemblance as grounds for assigning the sign to Chiron rather than to Jupiter. Others reject the argument as iconographic rather than astrological.",
      principle: "The Sagittarius figure and the Chiron myth are separate strands of Greek material that share a form and not a source; the constellation and the centaur of the myth are not identified with each other in the ancient sources with any consistency. An argument from shared iconography is weaker than an argument from transmitted doctrine, and the tradition transmits Jupiter as ruler of this sign without dissent until the twentieth century.",
      energies: ["the aimed thing", "extension", "the sought account"],
      tensions: ["reach and what is left behind", "the figure that is half one thing and half another"],
      attributions: [
        { lineage: "Modern", claim: "Some schemes assign Chiron rulership of Sagittarius on the grounds of the shared centaur figure." },
        { lineage: "Ptolemaic", claim: "Sagittarius is the diurnal domicile of Jupiter." },
        { lineage: "Greek myth", claim: "Chiron is one centaur among many in the sources and is repeatedly distinguished from the rest." }
      ],
      correspondences: ["class: centaur", "sign element: fire", "sign mode: mutable", "traditional ruler: Jupiter"],
      contested: [
        "Ancient sources do not consistently identify the constellation figure with Chiron of the myth.",
        "The Virgo and Sagittarius rulership proposals for Chiron are incompatible and both remain in circulation."
      ],
      prompts: [
        "Does the argument in use rest on iconography or on transmitted doctrine?",
        "What weight does the working give to Jupiter as the traditional ruler here?"
      ]
    },

    Capricorn: {
      plain: "Chiron stands in Capricorn, a cardinal earth sign and a domicile of Saturn.",
      reading: "Modern readings attach the Chiron attribution in Capricorn to authority, structure and the terms on which standing is held, following the traditional Saturnine significations of the sign. Two difficulty attributions meet here: the classical malefic by rulership and the modern body by placement.",
      principle: "The classical and modern difficulty attributions are not the same kind of claim. Saturn's malefic classification is transmitted doctrine with a documented chain from the Hellenistic material forward; Chiron's is a recent interpretive proposal. Treating them as equivalent flattens a real difference in the evidence available for each.",
      energies: ["standing", "the structure inherited", "terms of authority"],
      tensions: ["obligation and its weight", "the account rendered to an older order"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Capricorn is the nocturnal domicile of Saturn and the sign of Mars exaltation, at the twenty-eighth degree." },
        { lineage: "Modern", claim: "Chiron in Capricorn is read through Saturnine significations of structure and standing." }
      ],
      correspondences: ["class: centaur", "sign element: earth", "sign mode: cardinal", "sign ruler: Saturn"],
      contested: [
        "The classical malefic attribution and the modern Chiron attribution rest on different kinds of evidence and are frequently presented at equal weight.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Are the two attributions in this sign being weighted equally, and should they be?",
        "What condition does Saturn hold, given that Saturn rules the sign?"
      ]
    },

    Aquarius: {
      plain: "Chiron stands in Aquarius, a fixed air sign, traditionally a domicile of Saturn and in modern schemes assigned to Uranus.",
      reading: "Modern readings attach the Chiron attribution in Aquarius to belonging, the group and the terms of inclusion, following significations that are themselves largely modern. The traditional significations of Aquarius as a Saturnine air sign are different in character and are not the ones usually invoked.",
      principle: "Much of what circulates as Aquarius symbolism is nineteenth and twentieth-century material shaped by the assignment of the sign to Uranus, not the Hellenistic significations of a Saturnine sign. Placing a modern body there and reading it through modern sign significations produces a doubly modern claim. That is a legitimate system; it is not the transmitted one.",
      energies: ["the group and its terms", "distance", "the general case"],
      tensions: ["belonging measured against difference", "the rule that does not fit the instance"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Aquarius is the diurnal domicile of Saturn." },
        { lineage: "Modern", claim: "Aquarius is assigned to Uranus, and much current Aquarius symbolism follows from that assignment rather than from the older material." }
      ],
      correspondences: ["class: centaur", "sign element: air", "sign mode: fixed", "traditional ruler: Saturn", "modern ruler: Uranus"],
      contested: [
        "Current popular significations of Aquarius derive largely from the modern Uranus assignment, not from the Hellenistic treatment of a Saturnine sign.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Which set of Aquarius significations is the reading using, the Saturnine or the Uranian?",
        "Does the working state which of the two rulership schemes it follows?"
      ]
    },

    Pisces: {
      plain: "Chiron stands in Pisces, a mutable water sign, traditionally a domicile of Jupiter and in modern schemes assigned to Neptune.",
      reading: "Modern readings attach the Chiron attribution in Pisces to what has no edge, to loss and to what cannot be held in a fixed account. Venus is exalted in Pisces in the classical tables, which sets a benefic exaltation alongside the modern attribution in the same sign.",
      principle: "Pisces is the last sign of the tropical order, and both classical and modern treatments load it with significations of ending and dissolution; the two traditions arrive at similar language from unrelated premises. Convergence between an old scheme and a new one is not evidence for either. It is worth naming, and it is not a confirmation.",
      energies: ["what has no edge", "solution", "the ending of the round"],
      tensions: ["loss without a boundary to mark it", "what cannot be held in an account"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Pisces is the nocturnal domicile of Jupiter and holds the exaltation of Venus at the twenty-seventh degree." },
        { lineage: "Modern", claim: "Pisces is assigned to Neptune, and Chiron here is read through significations of dissolution and loss." }
      ],
      correspondences: ["class: centaur", "sign element: water", "sign mode: mutable", "traditional ruler: Jupiter", "modern ruler: Neptune"],
      contested: [
        "Classical and modern treatments converge on similar language for Pisces from different premises; the convergence is not evidence.",
        "There is no traditional lineage for Chiron in any sign."
      ],
      prompts: [
        "Where two schemes agree, what independent reason is there to trust either?",
        "Which ruler does the working use for this sign?"
      ]
    }
  },

  /* ------------------------------------------------------------------ *
   * PLUTO BY SIGN - a twentieth-century body, generational by orbit
   * ------------------------------------------------------------------ */
  pluto: {
    Aries: {
      plain: "Pluto stands in Aries. Pluto takes between roughly twelve and just over thirty years to cross a sign, so a sign placement is shared by everyone born across that span.",
      reading: "Modern readings attach Pluto to what is not negotiable: consequence, the irreversible, and what operates below the level at which it can be argued with. In Aries, the sign of first motion and of Mars, the attribution is usually made to the act of beginning and to force applied at the outset.",
      principle: "Pluto's orbital period means a sign placement is a cohort marker, not an individual one, and any reading of it as personal is reading a shared position as a private one. That distinction is the single most consequential thing to state about outer planet signs, and it is the thing most often left unstated. Pluto was identified in 1930 and reclassified by the International Astronomical Union as a dwarf planet in 2006; astrological use continued unchanged through the reclassification.",
      energies: ["consequence", "force at the outset", "the non-negotiable"],
      tensions: ["a shared position read as a private one", "beginning under compulsion"],
      attributions: [
        { lineage: "Modern", claim: "Pluto is read as significator of the irreversible and of what operates beneath argument." },
        { lineage: "Roman", claim: "The name is that of the underworld god, Greek Plouton, chosen after the body was identified in 1930." }
      ],
      correspondences: ["identified: 1930", "reclassified as dwarf planet: 2006", "sign span: cohort scale", "sign ruler: Mars"],
      contested: [
        "Whether an outer planet sign placement carries individual significance at all, or only cohort significance, is disputed within modern practice.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Is this being read as a cohort position or as a personal one, and is the choice stated?",
        "What in this chart individuates the placement: house, aspect, angularity, or nothing?"
      ]
    },

    Taurus: {
      plain: "Pluto stands in Taurus, a fixed earth sign ruled by Venus. Pluto crosses the slower part of its orbit here, so the transit spans decades.",
      reading: "Modern readings attach Pluto in Taurus to what is held, to material arrangement and to value under pressure. Because the crossing is long, the placement is shared by an unusually wide cohort.",
      principle: "The width of the cohort matters to the reading: a placement shared by three decades of births carries less differentiating information than one shared by twelve years. Mundane astrology treats these long crossings as period markers rather than as chart factors, and that is the use for which the position is best suited. Reading a thirty-year position as a personal signature is a category error the literature commits routinely.",
      energies: ["what is held", "value under pressure", "material arrangement"],
      tensions: ["fixity meeting what does not reverse", "the long crossing read as a personal mark"],
      attributions: [
        { lineage: "Modern mundane", claim: "Long outer planet sign crossings are read as period markers in mundane astrology." },
        { lineage: "Modern natal", claim: "Pluto in Taurus is read through Venus significations of holding and worth." }
      ],
      correspondences: ["sign element: earth", "sign mode: fixed", "sign ruler: Venus", "crossing: multi-decade"],
      contested: [
        "Mundane and natal uses of outer planet signs make different claims and are often conflated.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Is the claim mundane or natal, and does the source distinguish the two?",
        "How wide is the cohort that shares this exact placement?"
      ]
    },

    Gemini: {
      plain: "Pluto stands in Gemini, a mutable air sign ruled by Mercury.",
      reading: "Modern readings attach Pluto in Gemini to speech, transmission and the circulation of accounts, following Mercury significations. Mundane treatments of this crossing concern the conditions under which information moves.",
      principle: "Outer planet significations were largely fixed in the middle of the twentieth century, at a point when the observational record for Pluto covered a fraction of one orbit. Pluto's full circuit takes roughly two and a half centuries; no astrologer has observed a complete one. Every claim about Pluto by sign therefore rests on a partial record, and the tradition of interpretation is younger than the data it interprets.",
      energies: ["transmission", "the circulating account", "what is said and what is withheld"],
      tensions: ["speech under compulsion", "quickness meeting what does not reverse"],
      attributions: [
        { lineage: "Modern", claim: "Pluto in Gemini is read through Mercury significations of speech and transmission." },
        { lineage: "Modern mundane", claim: "The crossing is treated as a period marker for the conditions of information." }
      ],
      correspondences: ["sign element: air", "sign mode: mutable", "sign ruler: Mercury", "orbital period: roughly two and a half centuries"],
      contested: [
        "No complete Pluto orbit has been observed since the body was identified, so no sign attribution rests on a full cycle of record.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "How much observational record stands behind the attribution being made?",
        "What condition does Mercury hold, given that Mercury rules the sign?"
      ]
    },

    Cancer: {
      plain: "Pluto stands in Cancer, a cardinal water sign ruled by the Moon.",
      reading: "Modern readings attach Pluto in Cancer to household, lineage and the conditions of belonging, following lunar significations. Mundane treatments of the crossing concern the arrangements by which people are housed and held.",
      principle: "Cancer's significations are Hellenistic and rest on a long transmission; Pluto's are twentieth-century and rest on a short one. When a recent attribution is combined with an ancient sign meaning, the resulting statement inherits the confidence of the older half without inheriting its evidence. Naming which half of a compound claim carries the weight is basic hygiene in this material.",
      energies: ["household", "lineage", "the conditions of belonging"],
      tensions: ["what is inherited and not chosen", "shelter under pressure"],
      attributions: [
        { lineage: "Hellenistic", claim: "Cancer is the domicile of the Moon and signifies household and origin." },
        { lineage: "Modern", claim: "Pluto in Cancer is read through those lunar significations under the modern Pluto keyword." }
      ],
      correspondences: ["sign element: water", "sign mode: cardinal", "sign ruler: Moon"],
      contested: [
        "Compound claims joining an ancient sign meaning to a modern body meaning borrow authority across the join.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Which half of this compound claim is doing the work?",
        "Would the reading survive if the modern half were removed?"
      ]
    },

    Leo: {
      plain: "Pluto stands in Leo, a fixed fire sign and the domicile of the Sun.",
      reading: "Modern readings attach Pluto in Leo to the terms on which anything is shown, to standing and to the made work. Mundane treatments of the crossing concern authority and its visible forms.",
      principle: "The Sun in the Hellenistic scheme is the most public of the seven, and Pluto in modern usage is the most concealed body in the scheme; the placement sets those two attributions in the same sign. That is a genuine structural observation about the symbol set, and it is a fact about the scheme rather than about anything the scheme describes. Keeping that distinction visible is the difference between a symbolic instrument and a horoscope.",
      energies: ["standing", "the made work", "the terms of showing"],
      tensions: ["the concealed set in the sign of display", "authority and what underwrites it"],
      attributions: [
        { lineage: "Hellenistic", claim: "Leo is the domicile of the Sun in the Thema Mundi order." },
        { lineage: "Modern", claim: "Pluto signifies the concealed and the non-negotiable, a reading fixed in the twentieth century." }
      ],
      correspondences: ["sign element: fire", "sign mode: fixed", "sign ruler: Sun"],
      contested: [
        "Structural observations about a symbol set are claims about the scheme, not about the world; the literature often presents them as the latter.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Is this a claim about the scheme or a claim about what the scheme describes?",
        "Where does the Sun stand in relation to this placement?"
      ]
    },

    Virgo: {
      plain: "Pluto stands in Virgo, a mutable earth sign ruled by Mercury.",
      reading: "Modern readings attach Pluto in Virgo to work, method, health and the sorting of what functions from what does not. Mundane treatments of the crossing concern labour and the systems by which bodies are managed.",
      principle: "Virgo carries the exaltation of Mercury as well as its domicile, a double dignity that is rare in the tables and that predates any modern layer by two millennia. Modern outer planet readings are laid over an existing structure that already assigns the sign a dense set of meanings. Where the layers agree, the agreement is usually because the modern author knew the older material, not because two independent methods converged.",
      energies: ["method", "the functioning and the failing", "work"],
      tensions: ["correction under compulsion", "the sorting that does not stop"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Virgo is both the domicile and the exaltation of Mercury, at the fifteenth degree." },
        { lineage: "Modern", claim: "Pluto in Virgo is read through significations of work, method and health." }
      ],
      correspondences: ["sign element: earth", "sign mode: mutable", "sign ruler: Mercury", "Mercury exaltation: 15 Virgo"],
      contested: [
        "Apparent agreement between old and new layers usually reflects shared authorship rather than independent confirmation.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Where the layers agree, is the agreement independent or inherited?",
        "Does the working use the exaltation of Mercury here at all?"
      ]
    },

    Libra: {
      plain: "Pluto stands in Libra, a cardinal air sign ruled by Venus and the sign of Saturn's exaltation.",
      reading: "Modern readings attach Pluto in Libra to the terms of relation, to agreement and to what is settled between parties. Mundane treatments of the crossing concern law, contract and the arrangements by which parties are bound.",
      principle: "Libra already holds two classical difficulty-adjacent attributions: the exaltation of the greater malefic and the fall of the Sun. A modern body added to that sign enters a position the tradition has already marked, and readings that treat the modern layer as introducing difficulty to Libra are describing something the older scheme had already located there by other means.",
      energies: ["the terms between parties", "settlement", "binding agreement"],
      tensions: ["balance held under force", "what is agreed and what is imposed"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Libra holds the exaltation of Saturn and the fall of the Sun." },
        { lineage: "Modern", claim: "Pluto in Libra is read through Venus significations of relation and agreement." }
      ],
      correspondences: ["sign element: air", "sign mode: cardinal", "sign ruler: Venus", "Saturn exaltation: 21 Libra"],
      contested: [
        "Whether the classical and modern attributions in this sign reinforce each other or simply coexist is a matter of interpretive choice, not of doctrine.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Which of the several attributions standing in Libra is the reading actually using?",
        "Does the modern layer add anything the classical layer had not already located here?"
      ]
    },

    Scorpio: {
      plain: "Pluto stands in Scorpio. Most modern schemes assign Pluto rulership of Scorpio; the traditional scheme gives the sign to Mars. Pluto crosses the fastest part of its orbit here, so the transit is comparatively short.",
      reading: "The modern rulership assignment makes this the placement modern authors treat as strongest: the body in what is claimed as its own sign. Traditional practice does not recognise the assignment, keeps Mars as ruler, and treats the placement as one of a modern body in a Mars sign with no dignity of its own.",
      principle: "The Pluto rulership of Scorpio was proposed in the twentieth century by argument from resemblance between the modern significations of the body and the traditional significations of the sign. That argument is circular in a specific way: the significations of Pluto were themselves partly derived from what the sign was already held to mean. Traditional revivalists reject the assignment on those grounds, and the disagreement is one of the sharpest live divisions in current practice.",
      energies: ["what does not reverse", "the concealed", "consequence at depth"],
      tensions: ["a rulership claimed and a rulership transmitted", "the short crossing and the concentrated cohort"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Scorpio is the nocturnal domicile of Mars." },
        { lineage: "Modern", claim: "Scorpio is assigned to Pluto in most twentieth-century schemes." },
        { lineage: "Traditional revival", claim: "The Pluto assignment is rejected and Mars retained as sole ruler." }
      ],
      correspondences: ["sign element: water", "sign mode: fixed", "traditional ruler: Mars", "modern ruler: Pluto"],
      contested: [
        "The Pluto rulership of Scorpio is asserted by one branch of current practice and denied by another; there is no shared ground between them.",
        "The resemblance argument for the assignment draws on significations partly derived from the sign it is being used to claim."
      ],
      prompts: [
        "Which rulership does the working follow, and is the choice stated in advance or made to fit the result?",
        "What condition does Mars hold in this chart?"
      ]
    },

    Sagittarius: {
      plain: "Pluto stands in Sagittarius, a mutable fire sign ruled by Jupiter.",
      reading: "Modern readings attach Pluto in Sagittarius to the accounts by which things are justified, to doctrine and to the reach of a claim. Mundane treatments of the crossing concern law, belief and the institutions that carry them.",
      principle: "Jupiter is the greater benefic in the classical classification and Pluto carries the heaviest of the modern attributions; the placement joins the two by rulership. The benefic and malefic classification is a Hellenistic layer that was never extended to the outer planets by any transmitted authority, so calling Pluto a malefic is a modern extension of an old category rather than an application of it.",
      energies: ["the justifying account", "doctrine", "reach"],
      tensions: ["extension meeting what will not extend", "the claim and what enforces it"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Sagittarius is the diurnal domicile of Jupiter, classified the greater benefic." },
        { lineage: "Modern", claim: "Pluto is often described in malefic terms, extending a Hellenistic category to a body the category was never defined for." }
      ],
      correspondences: ["sign element: fire", "sign mode: mutable", "sign ruler: Jupiter"],
      contested: [
        "The benefic and malefic classification was never extended to the outer planets by transmitted authority; modern usage extends it by analogy.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Does the method in hand classify the outer planets as benefic or malefic, and on what authority?",
        "What condition does Jupiter hold, given that Jupiter rules the sign?"
      ]
    },

    Capricorn: {
      plain: "Pluto stands in Capricorn, a cardinal earth sign and a domicile of Saturn.",
      reading: "Modern readings attach Pluto in Capricorn to structure, office and the arrangements by which authority is held. Mundane treatments of the crossing concern institutions and the terms of their standing. The classical greater malefic rules the sign, so the placement joins the old difficulty attribution and the new one by rulership.",
      principle: "This is the clearest case in the set for distinguishing the two lineages, because both are present and both concern limit. Saturn's malefic attribution is transmitted from Hellenistic sources through Persian and mediaeval channels with a traceable chain. Pluto's is asserted within living memory. Both may be used; they should not be presented as one continuous doctrine.",
      energies: ["office", "structure", "the terms of standing"],
      tensions: ["two difficulty attributions of unequal provenance", "authority and what dissolves it"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Capricorn is the nocturnal domicile of Saturn and holds the exaltation of Mars at the twenty-eighth degree." },
        { lineage: "Modern", claim: "Pluto in Capricorn is read through Saturnine significations of structure and institution." }
      ],
      correspondences: ["sign element: earth", "sign mode: cardinal", "sign ruler: Saturn", "Mars exaltation: 28 Capricorn"],
      contested: [
        "The Saturn attribution has a traceable transmission; the Pluto attribution does not. They are frequently cited side by side as equivalent.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Are the two attributions here being given the same evidential weight?",
        "Which of them is doing the actual work in the reading?"
      ]
    },

    Aquarius: {
      plain: "Pluto stands in Aquarius, a fixed air sign, traditionally a domicile of Saturn and in modern schemes assigned to Uranus.",
      reading: "Modern readings attach Pluto in Aquarius to the group, to distribution and to the terms on which membership is held. Mundane treatments of the crossing concern collective arrangements and the machinery by which they are administered.",
      principle: "Two modern bodies stand in relation here if the modern rulership is used, and a modern body stands in a Saturnine sign if the traditional one is used; the two produce materially different readings of the same position. Sign symbolism for Aquarius is itself largely modern in current circulation, which means the traditional option is not simply the older half of the same reading but a different reading altogether.",
      energies: ["the group", "distribution", "the terms of membership"],
      tensions: ["the collective and the instance", "administration and what it cannot reach"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Aquarius is the diurnal domicile of Saturn." },
        { lineage: "Modern", claim: "Aquarius is assigned to Uranus, and Pluto here is read against that modern rulership." }
      ],
      correspondences: ["sign element: air", "sign mode: fixed", "traditional ruler: Saturn", "modern ruler: Uranus"],
      contested: [
        "The traditional and modern readings of this placement are not two depths of one reading; they are separate systems producing different results.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Which rulership scheme is in force, and what changes in the reading if the other is used instead?",
        "Is the Aquarius symbolism being used the Saturnine set or the Uranian set?"
      ]
    },

    Pisces: {
      plain: "Pluto stands in Pisces, a mutable water sign, traditionally a domicile of Jupiter and in modern schemes assigned to Neptune.",
      reading: "Modern readings attach Pluto in Pisces to dissolution, to what has no boundary and to the end of a settled arrangement. Pisces closes the tropical order, and both classical and modern treatments load the sign with significations of ending.",
      principle: "The zodiacal order gives Pisces its terminal position, and that structural fact generates ending significations in every scheme that uses the order, ancient or modern, independently of any body placed there. What a placement in Pisces adds to that has to be argued separately, or the sign is simply supplying the meaning and the body is supplying a name for it.",
      energies: ["dissolution", "the unbounded", "the closing of the round"],
      tensions: ["what will not hold an edge", "ending read as a placement rather than as a position in the order"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Pisces is the nocturnal domicile of Jupiter and holds the exaltation of Venus at the twenty-seventh degree." },
        { lineage: "Modern", claim: "Pisces is assigned to Neptune, and Pluto here is read through significations of dissolution." }
      ],
      correspondences: ["sign element: water", "sign mode: mutable", "traditional ruler: Jupiter", "modern ruler: Neptune"],
      contested: [
        "Ending significations for Pisces follow from its terminal position in the order and are present regardless of what is placed there.",
        "Pluto has no classical lineage; every attribution to it postdates 1930."
      ],
      prompts: [
        "Is the body adding anything here that the sign position did not already supply?",
        "Which of the two rulers is the working using?"
      ]
    }
  },

  /* ------------------------------------------------------------------ *
   * TWELFTH HOUSE BY SIGN - Hellenistic Kakodaimon, the joy of Saturn
   * ------------------------------------------------------------------ */
  twelfth: {
    Aries: {
      plain: "Aries occupies the twelfth place. In whole sign houses that means Aries is the sign immediately before the rising sign.",
      reading: "Hellenistic sources name the twelfth place Kakodaimon, the bad spirit, rendered in the Latin authors as Malus Daemon. Its traditional significations are enemies, confinement, exile, illness, large animals and what is hidden from the native. Mars rules Aries, so the lesser malefic disposits this place here.",
      principle: "The twelfth is the joy of Saturn in the Hellenistic scheme of planetary joys, which assigns each of the seven a place where its significations are held to operate at home. Joy is a doctrine about houses, not about signs, and it is one of the oldest structural features of the system. The modern reading of the twelfth as the unconscious is a twentieth-century substitution for the older significations of confinement and hidden enmity.",
      energies: ["what precedes the visible", "the unwitnessed", "retreat"],
      tensions: ["the place read as loss in the older material", "the lesser malefic disposing the bad spirit"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." },
        { lineage: "Latin", claim: "Firmicus and the Latin tradition render the place Malus Daemon." },
        { lineage: "Modern psychological", claim: "The twelfth is read as the unconscious, a substitution made in the twentieth century." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Mars", "cadent from the ascendant"],
      contested: [
        "In whole sign houses the twelfth is a whole sign; in quadrant systems the cusp falls at a degree and the sign on it may differ. The two systems can place different signs here for the same chart.",
        "The modern reading of the twelfth as the unconscious replaces rather than extends the older significations."
      ],
      prompts: [
        "Which house system is in use, and does the twelfth hold the same sign under the other?",
        "Where does the ruler of this sign fall, and is it in aspect to the ascendant?"
      ]
    },

    Taurus: {
      plain: "Taurus occupies the twelfth place, the sign before the rising sign in whole sign houses. Venus rules it.",
      reading: "The twelfth carries the Hellenistic significations of confinement, hidden enmity and what is not witnessed. With Taurus here the place is disposited by Venus, one of the two benefics in the classical classification, which the tradition treats as materially altering the judgement of the place.",
      principle: "The condition of the ruler of the twelfth is a separate and often decisive factor in traditional judgement of the place, distinct from the sign that occupies it. A benefic dispositor does not change the significations of the house; it changes the account of how those significations are carried. That distinction, between what a place means and how its ruler carries it, is the structure of traditional house judgement.",
      energies: ["what is kept", "the unwitnessed holding", "quiet"],
      tensions: ["a benefic ruling the place of the bad spirit", "material significations in a place of loss"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." },
        { lineage: "Mediaeval", claim: "The condition and placement of the ruler of the twelfth is judged separately from the house itself." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Venus", "cadent from the ascendant"],
      contested: [
        "Whether a benefic ruler mitigates the place or is itself compromised by ruling it is answered differently by different authors.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "Where does Venus fall, and what is its condition?",
        "Does the method judge the house by its sign, by its ruler, or by both in a stated order?"
      ]
    },

    Gemini: {
      plain: "Gemini occupies the twelfth place. Mercury rules it.",
      reading: "The twelfth in the Hellenistic material signifies what stands outside the account: enmity not declared, confinement, and matters conducted away from witness. Mercury as dispositor brings the significations of speech and record into a place the tradition defines by their absence.",
      principle: "The twelfth is cadent from the ascendant, meaning it falls away from the angle rather than toward it, and cadency is the structural reason for the place's weakness in the older scheme rather than any quality of its contents. Angular, succedent and cadent is a dynamic classification about a house's relation to the angles; the malefic reading of the twelfth follows from that geometry and from the Saturn joy, not from a separate doctrine.",
      energies: ["the unrecorded", "what is not said aloud", "the account kept elsewhere"],
      tensions: ["speech in the place defined by silence", "cadency and the loss of the angle"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is cadent from the ascendant and is the joy of Saturn." },
        { lineage: "Ptolemaic", claim: "Cadent houses are classified as weaker in the dynamic scheme of angular, succedent and cadent." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Mercury", "dynamic class: cadent"],
      contested: [
        "Whether the twelfth is difficult because it is cadent, because Saturn joys there, or for both reasons independently is argued differently across the sources.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "Does the reading rest on cadency, on the Saturn joy, or on the modern substitution?",
        "Where does Mercury fall in this chart?"
      ]
    },

    Cancer: {
      plain: "Cancer occupies the twelfth place. The Moon rules it.",
      reading: "The twelfth carries significations of confinement, the unwitnessed and hidden enmity in the Hellenistic material. Lunar rulership brings the significations of household, body and the visible course of things into that place, and the Moon is the fastest of the seven, so its condition changes quickly relative to the rest of the chart.",
      principle: "The Moon's speed makes it the most volatile dispositor in any house, and traditional judgement gives the Moon a special role as the significator of the course of matters generally, quite apart from any house it rules. Two doctrines therefore meet here: the general lunar significations and the specific rulership. Sources that read only one of them are reading half the position.",
      energies: ["shelter out of sight", "the unwitnessed course", "what precedes appearance"],
      tensions: ["the fastest body ruling the place of the slowest planet's joy", "household in a place of separation"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." },
        { lineage: "Hellenistic", claim: "The Moon signifies the general course of matters independently of the house it rules." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Moon", "dynamic class: cadent"],
      contested: [
        "The general lunar significations and the specific rulership of a house are separate doctrines and are often collapsed into one claim.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "Is the Moon being read here as ruler of the place or as general significator, and are the two kept apart?",
        "What phase is the Moon in, and does the method weight phase at all?"
      ]
    },

    Leo: {
      plain: "Leo occupies the twelfth place. The Sun rules it.",
      reading: "The twelfth signifies in the older material what is not witnessed and what stands apart from the visible account. Solar rulership sets the most public of the seven as dispositor of the least public of the twelve places, and traditional texts treat the position of the Sun's dispositorship as a substantive factor in judging the house.",
      principle: "The Sun in Hellenistic doctrine is also the sect light of a day chart, which means its condition is weighted more heavily in a diurnal nativity than a nocturnal one. Sect is a doctrine the modern tradition largely dropped and the traditional revival has restored; whether it is applied is a stated choice of method and it materially changes the judgement of any solar rulership.",
      energies: ["the unshown", "what is not put on the record", "withdrawal"],
      tensions: ["the visible ruling the invisible place", "the light disposing the place of the bad spirit"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." },
        { lineage: "Hellenistic", claim: "The Sun is the sect light of a diurnal chart and is weighted accordingly." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Sun", "dynamic class: cadent"],
      contested: [
        "Sect was largely dropped in modern practice and restored in the traditional revival; whether it applies is a method choice, not a fact about the chart.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "Is the chart diurnal or nocturnal, and does the method in hand use sect?",
        "Where does the Sun fall, and in what relation to the ascendant?"
      ]
    },

    Virgo: {
      plain: "Virgo occupies the twelfth place. Mercury rules it, and Mercury is also exalted in the sign.",
      reading: "The twelfth carries the Hellenistic significations of illness, confinement and hidden enmity, and Virgo carries significations of the body, work and the sorting of what functions. Mercury holds a double dignity here, both domicile and exaltation, which is uncommon in the tables.",
      principle: "A dispositor with double dignity is a specific and comparatively strong configuration in the traditional scoring, and it sits in tension with the weakness the scheme assigns the twelfth place itself. Dignity is essential, describing the planet in its sign; house position is accidental, describing the planet in the chart. The two are separate axes and a planet can be strong on one and weak on the other, which is why traditional judgement reports both.",
      energies: ["the unattended matter", "quiet method", "what is sorted out of view"],
      tensions: ["essential strength set in an accidentally weak place", "the body in the place of confinement"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Virgo is both the domicile and the exaltation of Mercury, at the fifteenth degree." },
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Mercury", "Mercury exaltation: 15 Virgo"],
      contested: [
        "Essential and accidental dignity are separate axes; sources differ on how a conflict between them is resolved.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "How does the method resolve essential strength set against accidental weakness?",
        "Which axis is the reading in hand actually reporting?"
      ]
    },

    Libra: {
      plain: "Libra occupies the twelfth place. Venus rules it and Saturn is exalted in it.",
      reading: "The twelfth is the joy of Saturn in the Hellenistic scheme, and Libra is the sign of Saturn's exaltation in the dignity tables. Two separate Saturnine attributions therefore meet in this configuration, one belonging to the house doctrine and one to the sign doctrine.",
      principle: "Joy and exaltation are unrelated doctrines that happen to point at the same planet here: joy is a house assignment from the Hellenistic scheme of planetary joys, exaltation is a sign assignment with Mesopotamian antecedents. Their meeting is a coincidence of two systems, not a compounding of one. Reading it as reinforcement requires an argument that neither system supplies.",
      energies: ["the terms settled out of view", "unwitnessed agreement", "proportion"],
      tensions: ["two Saturnine doctrines meeting by coincidence", "relation in the place of separation"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is the joy of Saturn." },
        { lineage: "Ptolemaic", claim: "Libra is the exaltation of Saturn, at the twenty-first degree." },
        { lineage: "Mesopotamian", claim: "The exaltation scheme descends from an earlier system of planetary places." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Venus", "Saturn exaltation: 21 Libra"],
      contested: [
        "Joy and exaltation are separate doctrines from separate layers; treating their coincidence as reinforcement is an interpretive move with no textual warrant.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "Does the reading treat this coincidence as meaningful, and on what grounds?",
        "Where does Saturn itself fall in this chart?"
      ]
    },

    Scorpio: {
      plain: "Scorpio occupies the twelfth place. Mars rules it in the traditional scheme, Pluto in most modern ones.",
      reading: "The twelfth carries significations of hidden enmity and confinement, and Scorpio is a Mars sign in the classical tables. The place of the bad spirit is therefore disposited by the lesser malefic, which the older texts note as a doubling within the malefic classification.",
      principle: "Traditional judgement of a house proceeds through its ruler, so a malefic ruling the twelfth is read as the malefic carrying the significations of that place, not as an intensification of them by mere presence. The distinction between a planet ruling a house and a planet occupying it is basic to the method and is routinely blurred in popular writing. Under the modern rulership the dispositor is a body with no classical standing at all, which changes the chain entirely.",
      energies: ["what is not disclosed", "consequence out of view", "the withheld"],
      tensions: ["the lesser malefic ruling the place of the greater malefic's joy", "two rulership schemes giving two different dispositors"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Scorpio is the nocturnal domicile of Mars, the lesser malefic." },
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." },
        { lineage: "Modern", claim: "Scorpio is assigned to Pluto in most twentieth-century schemes." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "traditional ruler: Mars", "modern ruler: Pluto"],
      contested: [
        "Ruling a house and occupying it are different claims and are frequently conflated.",
        "Traditional and modern schemes give this place different rulers, producing different chains of judgement."
      ],
      prompts: [
        "Which body is being treated as ruler of this place, and where does it fall?",
        "Does the reading distinguish rulership from occupation?"
      ]
    },

    Sagittarius: {
      plain: "Sagittarius occupies the twelfth place. Jupiter rules it.",
      reading: "The twelfth is the place the Hellenistic sources name for confinement and hidden enmity, and Jupiter, classified the greater benefic, disposits it here. Traditional texts note the case of a benefic ruling a difficult place as one requiring the ruler's own condition to be judged before anything is said about the house.",
      principle: "Order of judgement is the operative issue: house significations, then the ruler's dignity, then the ruler's house position, then aspects to it. Different authors state different orders and the result depends on which is followed. A reading that reports a conclusion without reporting the order of judgement that produced it cannot be checked by anyone else, and being checkable is what separates a method from an impression.",
      energies: ["the account not given publicly", "reach beyond the witnessed", "solitary enquiry"],
      tensions: ["the greater benefic ruling the place of the bad spirit", "extension in a place of enclosure"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Sagittarius is the diurnal domicile of Jupiter, the greater benefic." },
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Jupiter", "dynamic class: cadent"],
      contested: [
        "Authors state different orders of judgement, and the order determines the result.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "What order of judgement is the reading following, and is it stated before the conclusion or after?",
        "Where does Jupiter fall, and what dignity does it hold there?"
      ]
    },

    Capricorn: {
      plain: "Capricorn occupies the twelfth place. Saturn rules it, and the twelfth is the joy of Saturn.",
      reading: "This configuration puts Saturn in charge of the place the Hellenistic scheme already assigns to it. The twelfth is Kakodaimon and the joy of Saturn; Capricorn is a Saturn domicile. The house doctrine and the sign doctrine point at the same planet through two separate routes.",
      principle: "A planet ruling the house of its own joy is a specific configuration the older material notices, and the joys are among the strongest evidence that the house meanings were derived from a coherent scheme rather than assembled piecemeal: the joys of the seven planets distribute across the houses in a pattern that also generates the benefic and malefic character of the places. Whether that pattern is evidence of an original design or of later systematisation is a live question in the scholarship.",
      energies: ["structure out of view", "the long account", "what is administered unseen"],
      tensions: ["the greater malefic ruling its own place of joy", "limit in a place already read as limitation"],
      attributions: [
        { lineage: "Hellenistic", claim: "The twelfth is the joy of Saturn, and Capricorn is a domicile of Saturn." },
        { lineage: "Hellenistic", claim: "The scheme of planetary joys distributes the seven across the houses in a pattern that parallels the benefic and malefic character of the places." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "sign ruler: Saturn", "dynamic class: cadent"],
      contested: [
        "Whether the joys reflect an original design behind the house meanings or a later systematisation of them is unsettled in the scholarship.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Where does Saturn itself fall, and does it occupy the place it rules?",
        "Does the method use the joys at all, or only the dignities?"
      ]
    },

    Aquarius: {
      plain: "Aquarius occupies the twelfth place. Saturn rules it in the traditional scheme, Uranus in most modern ones.",
      reading: "As with Capricorn, the traditional ruler of this place is the planet whose joy the twelfth is, so the house doctrine and the sign doctrine converge. Under the modern rulership the dispositor is Uranus, a body identified in the eighteenth century and given significations no classical source supplies.",
      principle: "The convergence holds only in the traditional scheme; adopting the modern ruler dissolves it, because the joy remains with Saturn while the dispositorship moves. Mixed schemes that use modern rulers alongside Hellenistic house doctrine are internally inconsistent in exactly this way, and the inconsistency is usually invisible because the two doctrines are rarely stated in the same breath.",
      energies: ["the general held out of view", "the unadministered case", "distance"],
      tensions: ["joy and rulership pulled apart by the modern scheme", "the group in a place of separation"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Aquarius is the diurnal domicile of Saturn." },
        { lineage: "Hellenistic", claim: "The twelfth is the joy of Saturn." },
        { lineage: "Modern", claim: "Aquarius is assigned to Uranus in schemes written after that planet was identified." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "traditional ruler: Saturn", "modern ruler: Uranus"],
      contested: [
        "Using modern rulers alongside Hellenistic house doctrine produces an internally inconsistent scheme; the inconsistency is real whether or not it is noticed.",
        MALEFIC_CONTEST
      ],
      prompts: [
        "Is the working mixing modern rulerships with traditional house doctrine, and is that mixing deliberate?",
        "Which body is being followed as dispositor of this place?"
      ]
    },

    Pisces: {
      plain: "Pisces occupies the twelfth place, the last sign in the last of the twelve places. Jupiter rules it traditionally, Neptune in most modern schemes.",
      reading: "Pisces on the twelfth aligns the terminal sign with the terminal house, which produces the arrangement sometimes called the natural twelfth, since Pisces is the twelfth sign of the tropical order. The Hellenistic significations of the place remain what they are: confinement, hidden enmity, and what stands outside the account.",
      principle: "The natural house scheme, which pairs the first sign with the first house and so on down, is a modern organising device rather than a Hellenistic doctrine; the older material treats signs and places as separate systems that combine, not as two expressions of one order. Alignments between them are therefore notable as coincidences of the two schemes, not as confirmations of either.",
      energies: ["the dissolved boundary", "the unaccounted", "the closing place"],
      tensions: ["terminal sign in terminal house", "a modern pairing device applied to an older structure"],
      attributions: [
        { lineage: "Ptolemaic", claim: "Pisces is the nocturnal domicile of Jupiter and holds the exaltation of Venus at the twenty-seventh degree." },
        { lineage: "Hellenistic", claim: "The twelfth is Kakodaimon and is the joy of Saturn; signs and places are treated as separate systems." },
        { lineage: "Modern", claim: "The natural house scheme pairs Pisces with the twelfth, a device of recent organising rather than transmitted doctrine." }
      ],
      correspondences: ["Hellenistic name: Kakodaimon", "joy: Saturn", "traditional ruler: Jupiter", "modern ruler: Neptune"],
      contested: [
        "The natural house scheme is a modern device; the older material keeps signs and places distinct.",
        "House system choice can place a different sign on the twelfth for the same chart."
      ],
      prompts: [
        "Does the reading rest on the natural house pairing, and is that pairing being treated as doctrine?",
        "Where does the ruler of this place fall, and in what condition?"
      ]
    }
  }
};

export function getDifficulty(context, sign) {
  const c = DIFFICULTY[context];
  if (!c) return null;
  return c[sign] || null;
}
