/**
 * numerologySymbolism.js
 *
 * Symbolic records for the twelve numbers this instrument reports:
 * 1-9 plus the disputed master numbers 11, 22 and 33.
 *
 * Each record names what the number has been taken to signify, which lineage
 * made the attribution, and where the sources fail to agree. The single
 * methodological fact that governs the whole file: Pythagorean and Chaldean
 * numerology use different letter-to-number maps, so the same name reduces to
 * different figures under the two. A number reported without its method is an
 * unread figure.
 *
 * Voice rule: name the position and the attribution. Never address the reader.
 */

export const NUMBER_SYMBOLISM = {
  1: {
    plain:
      "One is the unit - the first mark, standing alone before anything is set beside it. A reported 1 means the letters or digits of the source were summed and reduced until a single stroke remained.",
    reading:
      "Greek arithmology called one the monad and treated it as the spring from which the series proceeds rather than as one member of that series. Modern popular numerology carries this over as initiation, originality and singularity, and titles the 1 life path the Leader or Pioneer. In the planetary series inherited from the Chaldean-derived literature, one is referred to the Sun.",
    principle:
      "Nothing here can be read until the method is named. Pythagorean numerology runs A to I onto 1 to 9 and then repeats the run twice, so A, J and S all give 1; Chaldean uses a different map and gives 1 to A, I, J, Q and Y. The same name therefore reduces to different numbers under the two systems, and the two systems were never reconciled. Note also that the monad of Greek arithmology and the 1 of a modern letter-sum are distinct claims that happen to share a numeral.",
    energies: ["initiation", "singularity", "self-direction", "origination"],
    tensions: ["isolation", "domination in place of leadership", "assertion against the group"],
    attributions: [
      { lineage: "Pythagorean", claim: "The monad is the source of number rather than a number within the series." },
      { lineage: "Chaldean planetary series", claim: "One is referred to the Sun." },
      { lineage: "Kabbalistic", claim: "One is referred to Kether, the crown, the first emanation of the Tree." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Leader or Pioneer; as an expression, initiative and originality; as a soul urge, independence; as a personality, the impression of decisiveness; as a birthday number, the initiator." },
    ],
    correspondences: [
      "planet: Sun",
      "Pythagorean letters: A, J, S",
      "Chaldean letters: A, I, J, Q, Y",
      "sefirah: Kether",
      "figure: the point",
    ],
    contested: [
      "Greek sources disagree over whether the monad is a number at all, or the principle from which numbers arise.",
      "The Pythagorean and Chaldean letter maps assign 1 to different letters, so a name-derived 1 under one system need not be a 1 under the other.",
    ],
    prompts: [
      "Which letter map produced this 1 - Pythagorean or Chaldean?",
      "Is the reading resting on the monad of Greek arithmology, or on the modern vocabulary of leadership traits?",
    ],
  },

  2: {
    plain:
      "Two is the first count that admits a second thing: one mark, and another beside it. A reported 2 is a digit sum that settled on a pair.",
    reading:
      "Greek arithmology called two the dyad and treated it as the principle of division, otherness and the first departure from unity. Modern popular numerology reads it as relation, mediation and receptivity, and titles the 2 life path the Diplomat or Peacemaker. The Chaldean-derived planetary series refers two to the Moon.",
    principle:
      "The two dominant letter systems part company immediately at this number: Pythagorean gives 2 to B, K and T, while Chaldean gives 2 to B, K and R. A name that reduces to 2 under one map may reduce to something else entirely under the other, so the method has to be recorded with the figure or the figure carries no determinate sense. Beneath the letter-counting sits an older structural claim - that the dyad is what makes relation possible at all, since there is no pairing where there is only unity.",
    energies: ["relation", "mediation", "receptivity", "pairing"],
    tensions: ["accommodation without limit", "indirect resistance", "dissolution of the one into the pair"],
    attributions: [
      { lineage: "Pythagorean", claim: "The dyad is the principle of otherness and indefiniteness, the first division of the monad." },
      { lineage: "Chaldean planetary series", claim: "Two is referred to the Moon." },
      { lineage: "Kabbalistic", claim: "Two is referred to Chokmah, the second emanation." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Diplomat or Peacemaker; as an expression, cooperation and diplomacy; as a soul urge, partnership; as a personality, the impression of gentleness; as a birthday number, the mediator." },
    ],
    correspondences: [
      "planet: Moon",
      "Pythagorean letters: B, K, T",
      "Chaldean letters: B, K, R",
      "sefirah: Chokmah",
      "figure: the line between two points",
    ],
    contested: [
      "Pythagorean sources treat the even numbers as the unlimited and the odd as the limiting principle; later moral readings of 2 as weakness or passivity are a much later overlay and are not carried by the arithmological texts.",
      "The letter R gives 2 in Chaldean and 9 in Pythagorean - one of the sharpest divergences between the two maps.",
    ],
    prompts: [
      "Does this 2 arise from the letter map, from a birth date, or from both agreeing?",
      "Where in the wider reading does the second term of the pair actually stand?",
    ],
  },

  3: {
    plain:
      "Three is the first count with a middle: something at each end and something between. A reported 3 is a total reduced to three.",
    reading:
      "Greek sources treat three as the first number in the full sense, because it holds beginning, middle and end, and so is the smallest count that can be called complete. Modern popular numerology reads it as expression, creation and social outwardness, and titles the 3 life path the Communicator or Artist. The Chaldean-derived planetary series refers three to Jupiter.",
    principle:
      "The letter maps diverge again: Pythagorean gives 3 to C, L and U, while Chaldean gives 3 to C, G, L and S. The overlap at C and L is coincidence, not agreement - the two systems were built on different principles and no working can treat them as interchangeable. What the traditions do share about three is structural rather than psychological: it is the count at which a relation acquires a mediating term, and the triangle is the first figure that encloses an area.",
    energies: ["expression", "synthesis", "fertility of form", "outward speech"],
    tensions: ["scattering across too many channels", "surface in place of depth", "charm used to avoid the difficult term"],
    attributions: [
      { lineage: "Pythagorean", claim: "Three is complete because it possesses beginning, middle and end." },
      { lineage: "Chaldean planetary series", claim: "Three is referred to Jupiter." },
      { lineage: "Kabbalistic", claim: "Three is referred to Binah, the third emanation." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Communicator or Artist; as an expression, creativity and communication; as a soul urge, joyful making; as a personality, the impression of charm; as a birthday number, the speaker." },
    ],
    correspondences: [
      "planet: Jupiter",
      "Pythagorean letters: C, L, U",
      "Chaldean letters: C, G, L, S",
      "sefirah: Binah",
      "figure: the triangle, first enclosed plane",
    ],
    contested: [
      "Whether three is the first true number, or whether that title belongs to two, varies between arithmological sources.",
      "S gives 1 in Pythagorean and 3 in Chaldean; U gives 3 in Pythagorean and 6 in Chaldean.",
    ],
    prompts: [
      "Which two terms does this third one stand between in the wider chart?",
      "Is the reading using the triadic structure, or only the modern trait list attached to it?",
    ],
  },

  4: {
    plain:
      "Four is the count of the square and the four directions - the first number that can be laid out as a stable base. A reported 4 is a total reduced to four.",
    reading:
      "Pythagorean tradition holds four in high regard through the tetraktys, the triangular arrangement of ten points in rows of one, two, three and four, whose sum is the decad. Modern popular numerology reads four as structure, method and endurance, and titles the 4 life path the Builder or Architect. The planetary series used in the Chaldean-derived popular literature refers four to Uranus.",
    principle:
      "The letter maps disagree here in a way that matters for names: Pythagorean gives 4 to D, M and V; Chaldean gives 4 to D, M and T. T is a 2 in Pythagorean and a 4 in Chaldean, so any name carrying a T can shift systems entirely. Behind the letter arithmetic, four is the number at which extension becomes measurable - three points fix a plane, four fix a body - and the traditions that name four elements, four directions and four humours are all working the same structural claim about a world laid out on axes.",
    energies: ["structure", "measure", "endurance", "the laid foundation"],
    tensions: ["rigidity", "work without rest", "order defended past its usefulness"],
    attributions: [
      { lineage: "Pythagorean", claim: "The tetraktys - four rows summing to ten - was held as a figure of the whole; four is the row that completes it." },
      { lineage: "Chaldean planetary series", claim: "Four is referred to Uranus in the modern form of the series." },
      { lineage: "Kabbalistic", claim: "Four is referred to Chesed, the fourth emanation." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Builder or Architect; as an expression, structure and reliability; as a soul urge, order; as a personality, the impression of steadiness; as a birthday number, the one who makes ideas concrete." },
    ],
    correspondences: [
      "planet: Uranus, in the modern form of the series",
      "Pythagorean letters: D, M, V",
      "Chaldean letters: D, M, T",
      "sefirah: Chesed",
      "figure: the square; the tetraktys row of four",
    ],
    contested: [
      "The assignment of Uranus to four is a modern revision - Uranus was unknown to the sources the series claims descent from, and other schools assign the lunar north node or a terrestrial signification instead.",
      "T is 2 in Pythagorean and 4 in Chaldean; V is 4 in Pythagorean and 6 in Chaldean.",
    ],
    prompts: [
      "If the modern planet is set aside, which older signification does the working put in its place?",
      "Which of the two letter maps was used, and does the other map give the same figure?",
    ],
  },

  5: {
    plain:
      "Five is the count of the hand and the five senses - the first number that sits at a centre with two on each side. A reported 5 is a total reduced to five.",
    reading:
      "Greek arithmology called five the marriage number, since it is the sum of the first even and the first odd, two and three. Modern popular numerology reads it as motion, variety and the appetite for direct experience, and titles the 5 life path the Adventurer or Freedom-Seeker. The Chaldean-derived planetary series refers five to Mercury.",
    principle:
      "Pythagorean gives 5 to E, N and W; Chaldean gives 5 to E, H, N and X - and puts W with U and V at 6. Two names differing only in a W will part ways between the systems, which is why the method must be recorded alongside the number. The older claim about five is structural: it is the pentad of the human figure inscribed in the pentagram, and the quintessence added to the four elements as the term that will not reduce to them.",
    energies: ["motion", "variety", "sense and appetite", "the loosened boundary"],
    tensions: ["appetite for stimulation", "avoidance of the fixed", "movement in place of depth"],
    attributions: [
      { lineage: "Pythagorean", claim: "Five is the marriage number, the union of the first even with the first odd." },
      { lineage: "Chaldean planetary series", claim: "Five is referred to Mercury." },
      { lineage: "Renaissance magical", claim: "The pentagram is read as the human figure and as the four elements crowned by a fifth, the quintessence." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Adventurer or Freedom-Seeker; as an expression, versatility and change; as a soul urge, freedom; as a personality, the impression of restless vitality; as a birthday number, the traveller." },
    ],
    correspondences: [
      "planet: Mercury",
      "Pythagorean letters: E, N, W",
      "Chaldean letters: E, H, N, X",
      "sefirah: Geburah",
      "figure: the pentagram; the five regular solids of the Platonic series",
    ],
    contested: [
      "Whether the marriage of five is 2 with 3 or 3 with 2 - which term is taken as active - varies between arithmological sources and changes the reading.",
      "W is 5 in Pythagorean and 6 in Chaldean; H is 8 in Pythagorean and 5 in Chaldean; X is 6 in Pythagorean and 5 in Chaldean.",
    ],
    prompts: [
      "Which of the two terms, the even or the odd, does the working treat as leading in this five?",
      "Does the same source name give five under both maps, or only under one?",
    ],
  },

  6: {
    plain:
      "Six is the count that divides evenly into halves and thirds, and the number of sides on the cell of a honeycomb. A reported 6 is a total reduced to six.",
    reading:
      "Six is the first perfect number in the arithmetic sense set out in Euclid's number books: it equals the sum of its proper divisors, one, two and three, which also multiply to give it. Modern popular numerology reads it as care, responsibility and the ordering of a household, and titles the 6 life path the Nurturer or Healer. The Chaldean-derived planetary series refers six to Venus.",
    principle:
      "The two maps are almost entirely at odds at this number: Pythagorean gives 6 to F, O and X, while Chaldean gives 6 to U, V and W - no letter is shared. A name reducing to 6 under one system is unlikely to reduce to 6 under the other, and any reading that does not state its method is asserting more than it knows. The perfection claimed for six is arithmetic before it is moral: the number's own parts reconstitute it, which is what the traditions of harmony, proportion and the hexagram are drawing on.",
    energies: ["care", "proportion", "the ordered household", "harmony of parts"],
    tensions: ["care that controls", "perfectionism directed outward", "service kept past its term"],
    attributions: [
      { lineage: "Euclidean arithmetic", claim: "Six is the first perfect number - equal to the sum of its proper divisors." },
      { lineage: "Chaldean planetary series", claim: "Six is referred to Venus." },
      { lineage: "Kabbalistic", claim: "Six is referred to Tiphereth, the central emanation of the Tree." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Nurturer or Healer; as an expression, love and responsibility; as a soul urge, home; as a personality, the impression of warmth; as a birthday number, the keeper of the household." },
    ],
    correspondences: [
      "planet: Venus",
      "Pythagorean letters: F, O, X",
      "Chaldean letters: U, V, W",
      "sefirah: Tiphereth",
      "figure: the hexagram; the hexagon that tiles the plane",
    ],
    contested: [
      "The two letter maps share no letter at 6, which makes this number the clearest single demonstration that Pythagorean and Chaldean results are not comparable.",
      "F is 6 in Pythagorean and 8 in Chaldean; O is 6 in Pythagorean and 7 in Chaldean.",
    ],
    prompts: [
      "Given that the maps share no letter here, was the figure checked under both?",
      "Is the perfection being read arithmetically, or as a moral quality attached after the fact?",
    ],
  },

  7: {
    plain:
      "Seven is the count of the days of the week and of the planets visible without instruments. A reported 7 is a total reduced to seven.",
    reading:
      "Greek arithmology called seven the virgin or motherless number, because within the first ten it neither divides another nor is produced by any pair below it. Modern popular numerology reads it as withdrawal, analysis and the search behind appearances, and titles the 7 life path the Seeker or Mystic. The Chaldean-derived planetary series refers seven to Neptune in its modern form.",
    principle:
      "Pythagorean gives 7 to G, P and Y; Chaldean gives 7 to O and Z alone, and puts G with C, L and S at 3. The maps are not variants of one system but separate systems, and a 7 reported without its map cannot be traced back to the name that produced it. The older weight on seven comes from the planetary week - seven moving lights, seven days, seven metals - a scheme that structured calendars and correspondence tables long before any letter-sum method was attached to it.",
    energies: ["withdrawal", "analysis", "the search behind appearance", "silence"],
    tensions: ["isolation held as superiority", "analysis without contact", "the unshared conclusion"],
    attributions: [
      { lineage: "Pythagorean", claim: "Seven is the virgin number, neither generating nor generated within the decad." },
      { lineage: "Classical planetary week", claim: "Seven orders the days, the visible planets and the traditional metals." },
      { lineage: "Chaldean planetary series", claim: "Seven is referred to Neptune in the modern form of the series." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Seeker or Mystic; as an expression, analysis and introspection; as a soul urge, understanding; as a personality, the impression of privacy; as a birthday number, the questioner." },
    ],
    correspondences: [
      "planet: Neptune in the modern form of the series; the classical seven-planet week stands behind the number itself",
      "Pythagorean letters: G, P, Y",
      "Chaldean letters: O, Z",
      "sefirah: Netzach",
      "figure: the heptagram, the first star polygon that cannot be constructed with compass and straightedge",
    ],
    contested: [
      "Neptune is a modern planet and cannot descend from the tradition the series claims; other schools give seven to the lunar south node or leave it with the classical seventh light.",
      "G is 7 in Pythagorean and 3 in Chaldean; O is 6 in Pythagorean and 7 in Chaldean; Y is 7 in Pythagorean and 1 in Chaldean.",
    ],
    prompts: [
      "Does this seven come from the planetary week, from the arithmological virgin number, or from a letter-sum?",
      "Which map assigned the letter Y here, and does the vowel treatment of Y change the total?",
    ],
  },

  8: {
    plain:
      "Eight is two cubed - the first number that can be built as a solid block of equal sides. A reported 8 is a total reduced to eight.",
    reading:
      "Arithmology treats eight as the first cube and reads it as solidity, weight and the fully extended body. Modern popular numerology reads it as authority, material mastery and the handling of consequence, and titles the 8 life path the Powerhouse or Executive. The Chaldean-derived planetary series refers eight to Saturn, and it is the one planetary assignment in the series that the older correspondence tables also support.",
    principle:
      "Pythagorean gives 8 to H, Q and Z; Chaldean gives 8 to F and P, and sends H to 5, Q to 1 and Z to 7. The systems agree on no letter at this number. The structural claim under the varied readings is the cube: three dimensions of the same measure, the point of maximum consolidation, which is why the traditions attach both justice and heaviness to it - what has been fully consolidated also cannot be moved.",
    energies: ["authority", "consolidation", "consequence", "weight of the built thing"],
    tensions: ["status taken for worth", "force in place of authority", "accumulation without term"],
    attributions: [
      { lineage: "Arithmological", claim: "Eight is the first cube, the number of full three-dimensional extension." },
      { lineage: "Chaldean planetary series", claim: "Eight is referred to Saturn." },
      { lineage: "Christian symbolic", claim: "The eighth day is read as the day beyond the week, which is why baptismal fonts were commonly built with eight sides." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Powerhouse or Executive; as an expression, ambition and authority; as a soul urge, mastery; as a personality, the impression of command; as a birthday number, the one who thinks in scale." },
    ],
    correspondences: [
      "planet: Saturn",
      "Pythagorean letters: H, Q, Z",
      "Chaldean letters: F, P",
      "sefirah: Hod",
      "figure: the cube; the octagon of the baptistery",
    ],
    contested: [
      "Popular numerology often calls 8 a number of karmic consequence; that framing entered through nineteenth and twentieth century theosophical writing and is not present in the older arithmological sources.",
      "The two maps share no letter at 8 - H, Q and Z scatter to 5, 1 and 7 under Chaldean.",
    ],
    prompts: [
      "Is the reading using Saturn as limit, as time, or as the modern language of achievement?",
      "Where does the consolidation named by this eight actually appear in the chart as a whole?",
    ],
  },

  9: {
    plain:
      "Nine is the last single figure before the count rolls over into two digits. A reported 9 is a total that reduced to the highest single mark.",
    reading:
      "Nine is the triple triad and the boundary of the decad, and it behaves unusually under reduction: adding nine to any number leaves its digital root unchanged, which is the arithmetic behind the old checking method of casting out nines. Modern popular numerology reads it as completion, release and wide-scoped concern, and titles the 9 life path the Humanitarian or Sage. The Chaldean-derived planetary series refers nine to Mars.",
    principle:
      "Here the two systems differ not in detail but in kind. Pythagorean gives 9 to I and R; Chaldean assigns no letter to nine at all, the reason given in that literature being that nine is held apart as whole and sacred. A Chaldean name total can therefore never be 9 from letters alone, while a Pythagorean one often is - which means a 9 from a name is a Pythagorean result by construction, and the two methods are not producing rival answers to one question but answers to different ones.",
    energies: ["completion", "release", "wide scope", "the closing of a series"],
    tensions: ["detachment read as distance", "giving that expects return", "the ending held too long"],
    attributions: [
      { lineage: "Arithmological", claim: "Nine is the triple triad and the horizon of the single figures." },
      { lineage: "Chaldean", claim: "Nine is withheld from the letter map and treated as sacred." },
      { lineage: "Chaldean planetary series", claim: "Nine is referred to Mars." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Humanitarian or Sage; as an expression, compassion and breadth; as a soul urge, universal concern; as a personality, the impression of worldliness; as a birthday number, the one who sees the whole arc." },
    ],
    correspondences: [
      "planet: Mars",
      "Pythagorean letters: I, R",
      "Chaldean letters: none - nine is not assigned",
      "sefirah: Yesod",
      "arithmetic: any multiple of nine has digits summing to nine",
    ],
    contested: [
      "Chaldean numerology does not assign 9 to any letter, so a name-derived 9 exists only under the Pythagorean map. Sources differ on whether this makes a Chaldean 9 impossible or merely rare, since date-derived totals can still reach it.",
      "I is 9 in Pythagorean and 1 in Chaldean; R is 9 in Pythagorean and 2 in Chaldean.",
    ],
    prompts: [
      "Did this nine come from a name or from a date - and under which map?",
      "If the working is Chaldean, what accounts for a nine appearing at all?",
    ],
  },

  11: {
    plain:
      "Eleven is the first count past ten: the decad complete, and one more standing outside it. In most modern methods a total of 11 is held rather than reduced to 2.",
    reading:
      "Modern popular numerology treats eleven as the first master number and titles it the Illuminator or Visionary, reading it as the 2 raised in pitch - relation and receptivity turned toward vision rather than partnership. Medieval Christian number commentary read eleven the other way, as excess past the ten of the law. The planetary table used here refers eleven to Uranus, following its assignment of four.",
    principle:
      "Whether eleven stands or reduces is a live dispute, not a settled rule: the master-number doctrine belongs to modern popular numerology and has no counterpart in Greek arithmology, and many practitioners reduce every total to a single figure without exception. On top of that sits the letter-map problem - a name that totals 11 under the Pythagorean map need not total 11 under Chaldean, whose different assignments and missing 9 change every intermediate sum. Two decisions therefore have to be declared before an eleven means anything: which map, and whether masters are held.",
    energies: ["heightened pitch", "vision in place of partnership", "the term outside the set"],
    tensions: ["tension held without discharge", "elevation alternating with collapse", "a claim of rank that the arithmetic does not carry"],
    attributions: [
      { lineage: "Modern popular numerology", claim: "Eleven is the first master number, held rather than reduced, and titled the Illuminator or Visionary." },
      { lineage: "Medieval Christian exegesis", claim: "Eleven was read as transgression - the number that goes past the ten of the commandments." },
      { lineage: "Modern planetary table", claim: "Eleven is referred to Uranus, as an intensification of four." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Master Illuminator; as an expression, communication that shifts perception; as a soul urge, illumination; as a personality, the impression of intensity; as a birthday number, the intuitive." },
    ],
    correspondences: [
      "planet: Uranus, in the modern table",
      "reduces to: 2, where masters are not held",
      "figure: the doubled unit, one beside one",
    ],
    contested: [
      "Whether 11 is held as a master number or reduced to 2 is disputed. Schools that reduce everything treat the master doctrine as a modern addition; schools that hold it treat reduction as a loss of information.",
      "Some practitioners hold 11 only in certain positions - life path and expression - and reduce it elsewhere. There is no agreed rule.",
      "Because the Pythagorean and Chaldean maps differ, a name yielding 11 under one may yield an unrelated figure under the other.",
    ],
    prompts: [
      "Does this working hold master numbers in every position, or only in some?",
      "Under the other letter map, what does the same name give?",
    ],
  },

  22: {
    plain:
      "Twenty-two is two elevens, or twice the decad and two over. In methods that hold master numbers, a total of 22 is kept rather than reduced to 4.",
    reading:
      "Modern popular numerology titles twenty-two the Master Builder and reads it as the 4 raised in pitch - structure at a scale that outlasts the builder. The number carries independent weight elsewhere: the Hebrew alphabet has twenty-two letters, and the Sepher Yetzirah counts thirty-two paths of wisdom as the ten sefirot together with those twenty-two letters. The tarot trumps also number twenty-two, and the Golden Dawn set them against the letters path by path.",
    principle:
      "The twenty-two of the Hebrew letters and the twenty-two of a reduced name total are separate structures that share a numeral, and running them together is the commonest error in modern practice. Within numerology itself the same two questions govern: whether master numbers are held at all, and which letter map produced the total, since Pythagorean and Chaldean assignments differ letter by letter and Chaldean withholds 9 entirely. A 22 with neither decision recorded is a figure without provenance.",
    energies: ["structure at scale", "the plan carried into matter", "the alphabet as a complete set"],
    tensions: ["scope beyond means", "the blueprint that stays a blueprint", "pressure of a rank claimed in advance"],
    attributions: [
      { lineage: "Modern popular numerology", claim: "Twenty-two is a master number, the Master Builder, held rather than reduced." },
      { lineage: "Sepher Yetzirah", claim: "Thirty-two paths of wisdom are counted as ten sefirot plus the twenty-two Hebrew letters." },
      { lineage: "Golden Dawn", claim: "The twenty-two tarot trumps are set against the twenty-two letters and the paths of the Tree." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Master Builder; as an expression, systems built to outlast their maker; as a soul urge, construction at scale; as a personality, the impression of capacity; as a birthday number, the visionary builder." },
    ],
    correspondences: [
      "planet: Pluto, in the modern table",
      "reduces to: 4, where masters are not held",
      "letters: the twenty-two of the Hebrew alphabet",
      "tarot: the twenty-two trumps of the major arcana",
    ],
    contested: [
      "Whether 22 is held or reduced to 4 is disputed, on the same grounds as 11.",
      "Pluto as the assignment for 22 is a modern addition and has no standing in the older correspondence tables.",
      "The correspondence between the twenty-two letters and the twenty-two trumps is a Golden Dawn arrangement, not an older tradition, and the ordering of that arrangement is itself disputed between schools.",
    ],
    prompts: [
      "Is this 22 being read as a numerological master number, or as the alphabetic twenty-two? They are not the same claim.",
      "Which letter map produced the total, and does it hold under the other?",
    ],
  },

  33: {
    plain:
      "Thirty-three is three elevens. Where master numbers are held, a total of 33 is kept rather than reduced to 6; many practitioners hold it only in certain positions, and some do not hold it at all.",
    reading:
      "Modern popular numerology titles thirty-three the Master Teacher and reads it as the 6 raised in pitch - care extended past the household toward instruction and service. The number appears elsewhere in Western tradition: the Ancient and Accepted Scottish Rite of Freemasonry numbers thirty-three degrees, and a long-standing Christian tradition gives thirty-three as the years of the life of Christ. The planetary table used here refers thirty-three to Neptune, following its assignment of seven.",
    principle:
      "Thirty-three is the least established of the three master numbers and the most openly disputed - it is a comparatively recent addition to the set, and a good deal of numerological writing recognises only 11 and 22. As a life-path total it is also arithmetically uncommon, which is one reason the literature attached to it is thin. The two governing questions remain in force: whether masters are held, and whether the total came from the Pythagorean map or the Chaldean, which assign letters differently and cannot be mixed within a single working.",
    energies: ["instruction", "care extended past the household", "service at scale"],
    tensions: ["rescue taken as a role", "depletion", "a rank the arithmetic does not establish"],
    attributions: [
      { lineage: "Modern popular numerology", claim: "Thirty-three is the third master number, the Master Teacher, and the last of the set." },
      { lineage: "Freemasonry, Scottish Rite", claim: "Thirty-three degrees are counted in the Ancient and Accepted Rite." },
      { lineage: "Christian tradition", claim: "Thirty-three is given as the number of years of the life of Christ." },
      { lineage: "Modern positional numerology", claim: "As a life path, the Master Teacher; as an expression, unconditional service and teaching; as a soul urge, healing; as a personality, the impression of an uplifting presence; as a birthday number, the healer-teacher." },
    ],
    correspondences: [
      "planet: Neptune, in the modern table",
      "reduces to: 6, where masters are not held",
      "figure: the triple eleven",
    ],
    contested: [
      "Thirty-three is the most disputed of the master numbers. Much of the numerological literature admits only 11 and 22, and treats 33 as a later addition.",
      "Among those who hold it, several restrict it to particular positions and reduce it to 6 elsewhere.",
      "The commonly cited correspondence with the thirty-three vertebrae of the spine depends on how fused sacral and coccygeal segments are counted, and is not a stable figure.",
    ],
    prompts: [
      "Does this working admit 33 as a master number at all, and in which positions?",
      "If reduced, the figure is 6 - does the reading change enough for the distinction to matter here?",
    ],
  },
};

export function getNumerologySymbolism(n) {
  return NUMBER_SYMBOLISM[Number(n)] || null;
}
