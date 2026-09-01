/*
 * aspectSymbolism.js
 *
 * Symbolic records for the eight aspects SGE computes (Conjunction,
 * Opposition, Trine, Square, Sextile, Quincunx, Semisquare, Sesquiquadrate)
 * and for the four frame points of the chart (AC, DC, MC, IC).
 *
 * Each record carries three depths: plain (what stands there), reading (what
 * the tradition has attributed to it) and principle (structure and lineage),
 * plus optional energies, tensions, attributions, correspondences, contested
 * points and prompts.
 *
 * Angles and orbs stated here match the defaults in
 * src/data/astrology/aspects.js. Orbs are conventions of this instrument, not
 * measurements; see the contested field on every aspect record.
 */

export const ASPECT_SYMBOLISM = {
  Conjunction: {
    plain:
      "Two bodies standing at the same degree of the zodiac, an angular separation of 0 degrees. This instrument counts a conjunction while the separation stays within an orb of 8 degrees.",
    reading:
      "The tradition reads the conjunction as fusion rather than as a relation: the two bodies act as one compound signification, and the compound takes its colour from the natures of the bodies joined. Older texts add a rider about proximity to the Sun, where a body close to the solar degree is said to be combust and its significations obscured. The figure is neither benefic nor malefic in itself; it intensifies whatever it joins.",
    principle:
      "The conjunction stands at the head of the Ptolemaic set, with the sextile, square, trine and opposition, all derived from simple divisions of the circle. Hellenistic practice draws a finer distinction: bodies sharing a sign are said to be in assembly, while only the configurations of regard are strictly aspects, since a body cannot behold itself. The 8 degree orb applied here is a working convention of this instrument, chosen and not measured.",
    energies: ["fusion", "assembly", "single compound signification", "intensification"],
    tensions: [
      "loss of distinction between the two bodies",
      "combustion near the solar degree",
      "no standpoint from which either body is seen separately",
    ],
    attributions: [
      {
        lineage: "Ptolemaic",
        claim:
          "Tetrabiblos derives the configurations from ratios of the circle and handles bodily conjunction separately from them.",
      },
      {
        lineage: "Hellenistic",
        claim:
          "Bodies in the same sign are in assembly rather than in regard; the language of beholding is reserved for bodies looking across signs.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The conjunction is read as a single fused function, hard to observe from within because it offers no second vantage point.",
      },
    ],
    correspondences: [
      "angle: 0 degrees",
      "orb in this instrument: 8 degrees",
      "harmonic: first",
      "class: Ptolemaic, major",
    ],
    contested: [
      "Orb size is a judgement call, not a measurement. Some schools set orbs by aspect, as here; others assign a moiety to each body and combine the two, so that a conjunction of the Sun and the Moon is granted far more room than a conjunction of two minor bodies.",
      "Sources disagree on whether the conjunction is an aspect at all, or a condition of position that precedes aspect entirely.",
    ],
    prompts: [
      "Which of the two bodies dominates the compound here, and on what grounds is that judged?",
      "Does the working treat conjunction as an aspect, or as assembly prior to aspect?",
    ],
  },

  Opposition: {
    plain:
      "Two bodies standing 180 degrees apart, at opposite degrees of the zodiac. Counted here while the separation stays within an orb of 8 degrees.",
    reading:
      "The tradition reads the opposition as confrontation across the full diameter of the circle: two significations entirely in view of each other and unable to occupy the same ground. Classical texts class it among the difficult configurations, with the square. Its distinguishing feature in the older material is visibility, since each body stands exactly where the other can be seen whole.",
    principle:
      "The opposition is the second harmonic, the circle halved, and it belongs to the Ptolemaic core. Signs 180 degrees apart share a modality and a polarity while holding contrasting elements, fire against air or earth against water, so the figure sets like against like across a difference. Whether the difficulty attributed to it is intrinsic to the angle or a function of the bodies involved is a point on which lineages part company.",
    energies: ["confrontation", "full mutual visibility", "the axis", "awareness by contrast"],
    tensions: [
      "polarisation into two irreconcilable terms",
      "one end of the axis carried outwardly rather than held",
      "no shared ground between the two significations",
    ],
    attributions: [
      {
        lineage: "Ptolemaic",
        claim:
          "The opposition follows from the halving of the circle and is listed among the configurations of regard.",
      },
      {
        lineage: "Hellenistic",
        claim:
          "Opposite signs behold each other across the diameter, and the regard is counted among the difficult ones.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The opposition is described as a polarity in which one pole is commonly met in another party or in an outward circumstance rather than recognised at home.",
      },
    ],
    correspondences: [
      "angle: 180 degrees",
      "orb in this instrument: 8 degrees",
      "harmonic: second",
      "class: Ptolemaic, major",
      "sign relation: shared modality, shared polarity, contrasting element",
    ],
    contested: [
      "Orb size is a judgement call. The 8 degree figure used here is common in modern practice; classical work more often derived the allowance from the bodies rather than from the angle.",
      "Sources disagree on whether the opposition is inherently afflicting or simply the clearest form of regard, with the difficulty supplied entirely by the natures involved.",
    ],
    prompts: [
      "Which end of this axis is easier to name in the chart as a whole, and which is harder?",
      "Does the working treat the opposition as affliction, or as the sharpest available form of sight?",
    ],
  },

  Trine: {
    plain:
      "Two bodies 120 degrees apart, a third of the circle. Counted here while the separation stays within an orb of 6 degrees.",
    reading:
      "The tradition reads the trine as the most concordant of the configurations: signs 120 degrees apart share an element, and what the bodies signify is held to pass between them without resistance. Classical texts call its effect favourable more or less regardless of the bodies involved. The recurring caution in modern material is that ease and use are not the same thing.",
    principle:
      "The trine is the third harmonic, the circle in thirds, and it maps exactly onto the four elemental triplicities of fire, earth, air and water. It is Ptolemaic and among the oldest configurations of regard. The doctrine of triplicity rulership in Hellenistic and Medieval practice rests on the same division, which is why the trine carries more structural weight in those systems than a bare harmonic count would suggest.",
    energies: ["concord", "elemental kinship", "unimpeded transfer", "the triplicity"],
    tensions: [
      "ease that draws no attention to itself",
      "no friction to force the significations into articulation",
    ],
    attributions: [
      {
        lineage: "Ptolemaic",
        claim:
          "The trine derives from the division of the circle into three and is counted among the favourable configurations.",
      },
      {
        lineage: "Hellenistic and Medieval",
        claim:
          "The 120 degree division underwrites triplicity rulership, so the trine ties into the rulership scheme and not only into the aspect list.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The trine is described as facility that operates without supervision, and is therefore easy to leave unused.",
      },
    ],
    correspondences: [
      "angle: 120 degrees",
      "orb in this instrument: 6 degrees",
      "harmonic: third",
      "class: Ptolemaic, major",
      "sign relation: shared element",
    ],
    contested: [
      "Orb size is a judgement call. Some schools grant the trine the same allowance as the conjunction and opposition, some pull it in tighter than the 6 degrees used here.",
      "Sources disagree on whether the trine is favourable in itself or simply transmits whatever the two bodies already signify, which would make a trine of two malefics no gift at all.",
    ],
    prompts: [
      "Does anything in this chart interrupt the trine, or does it run unopposed?",
      "Is the favourable character being read from the angle, or from the bodies standing at its ends?",
    ],
  },

  Square: {
    plain:
      "Two bodies 90 degrees apart, a quarter of the circle. Counted here while the separation stays within an orb of 6 degrees.",
    reading:
      "Classical texts class the square among the hard configurations: signs 90 degrees apart share a modality but differ in element and in polarity, and the two significations are held to obstruct one another. Renaissance material treats it plainly as an aspect of impediment. Modern psychological astrology recasts the same figure as the friction that forces a function into use rather than as an affliction to be suffered.",
    principle:
      "The square is the fourth harmonic, the circle quartered, and it sits in the Ptolemaic core. The move from impediment to productive friction is a change of interpretive frame between lineages, not a change in the geometry, which is identical in both accounts. Naming which frame is in force matters more here than settling which frame is correct, since the two produce different readings from the same measured angle.",
    energies: ["friction", "shared modality", "compulsion towards action", "cross bracing"],
    tensions: [
      "obstruction between the two significations",
      "purposes working at cross angles",
      "action taken to relieve pressure rather than by election",
    ],
    attributions: [
      {
        lineage: "Ptolemaic and Medieval",
        claim: "The square is listed among the configurations of difficulty and read as impediment.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The square is read as structural tension that produces work, and is treated as the most generative of the hard angles.",
      },
      {
        lineage: "Harmonic",
        claim:
          "The square is grouped with the semisquare and the sesquiquadrate as members of one family founded on repeated halving of the circle.",
      },
    ],
    correspondences: [
      "angle: 90 degrees",
      "orb in this instrument: 6 degrees",
      "harmonic: fourth",
      "class: Ptolemaic, major",
      "sign relation: shared modality, differing element and polarity",
    ],
    contested: [
      "Orb size is a judgement call. The 6 degrees used here is a middle setting; tighter schools work at 5 and looser ones at 8, and moiety systems compute a different allowance for every pair.",
      "Sources disagree on whether the square afflicts or merely compels, which is the single largest interpretive gap between classical and twentieth century practice.",
    ],
    prompts: [
      "Which of the two bodies is the one giving way when this square is under pressure?",
      "Is the classical frame or the modern frame doing the work in this reading?",
    ],
  },

  Sextile: {
    plain:
      "Two bodies 60 degrees apart, a sixth of the circle. Counted here while the separation stays within an orb of 4 degrees.",
    reading:
      "The tradition counts the sextile as concordant but weaker than the trine: signs 60 degrees apart share a polarity and stand in compatible elements, fire with air or earth with water. Older texts describe it as a regard of moderate strength, granted less allowance than the greater configurations. A common modern qualification holds that what the sextile offers is available rather than automatic.",
    principle:
      "The sextile is the sixth harmonic and completes the Ptolemaic core alongside the conjunction, square, trine and opposition. Its narrower orb here, 4 degrees against 6 for the square and trine, follows an old rule of thumb that weaker configurations are granted less room. That scaling rule is a convention of practice, and different schools scale it by different steps or not at all.",
    energies: ["opportunity", "compatible elements", "moderate concord", "an opening"],
    tensions: [
      "concord that requires deliberate activation",
      "easily passed over in a chart crowded with harder figures",
    ],
    attributions: [
      {
        lineage: "Ptolemaic",
        claim:
          "The sextile derives from the division of the circle into six and is counted favourable but of lesser strength than the trine.",
      },
      {
        lineage: "Hellenistic",
        claim:
          "Signs 60 degrees apart behold each other, and the regard is counted among the agreeable ones though weaker in effect.",
      },
      {
        lineage: "Modern",
        claim:
          "The sextile is described as latent rather than operative, an opening that stays shut until something else in the figure opens it.",
      },
    ],
    correspondences: [
      "angle: 60 degrees",
      "orb in this instrument: 4 degrees",
      "harmonic: sixth",
      "class: Ptolemaic, major",
      "sign relation: shared polarity, compatible elements",
    ],
    contested: [
      "Orb size is a judgement call. The 4 degrees used here reflects the convention that lesser aspects take lesser orbs; schools weighting orb by body rather than by aspect grant a solar sextile far more room than this.",
      "Sources disagree on whether the sextile carries independent weight or only reinforces what the trines and squares in a figure have already established.",
    ],
    prompts: [
      "What else in this chart would have to move before this sextile came into operation?",
      "Does the working scale orbs by aspect, by body, or by both together?",
    ],
  },

  Quincunx: {
    plain:
      "Two bodies 150 degrees apart, five twelfths of the circle. Counted here while the separation stays within an orb of 3 degrees. Also called the inconjunct.",
    reading:
      "Practitioners who use the quincunx read it as a relation without common terms: signs 150 degrees apart share no element, no modality and no polarity, so the two significations have nothing to negotiate with. The usual description is continual adjustment rather than open conflict. Hellenistic practice takes the opposite view and counts such signs as averse, unable to behold each other at all.",
    principle:
      "The quincunx is the fifth step of the twelfth harmonic and stands outside the Ptolemaic set. Its status carries the sharpest disagreement in this whole list: in Hellenistic terms the 150 degree relation is precisely a non-aspect, an aversion, whereas much twentieth century practice promoted it to a working minor aspect with a distinct signification. Both positions remain in active use, and this instrument draws the line while leaving the disagreement unresolved.",
    energies: ["adjustment", "no shared terms", "oblique relation"],
    tensions: [
      "two significations with no common measure",
      "a figure some schools would not draw at all",
    ],
    attributions: [
      {
        lineage: "Hellenistic",
        claim:
          "Signs 150 degrees apart are averse: they do not behold each other, and the configuration is therefore not counted as a regard.",
      },
      {
        lineage: "Modern",
        claim:
          "The quincunx is treated as a genuine minor aspect signifying continual adjustment between functions that share no basis.",
      },
      {
        lineage: "Medical and horary usage",
        claim:
          "Some practitioners restrict the quincunx to particular branches of the work rather than reading it in every figure.",
      },
    ],
    correspondences: [
      "angle: 150 degrees",
      "orb in this instrument: 3 degrees",
      "harmonic: twelfth, fifth step",
      "class: minor, post-Ptolemaic in standing",
      "sign relation: no shared element, modality or polarity",
    ],
    contested: [
      "Hellenistic sources treat the 150 degree relation as aversion, that is, as no aspect; much modern practice treats it as a working minor aspect. The two readings cannot both hold and neither has been given up.",
      "Orb size is a judgement call, and the spread is wide here: 3 degrees in this instrument, 2 in tighter schools, as much as 5 in looser ones.",
    ],
    prompts: [
      "Does the working count the 150 degree relation as an aspect or as aversion?",
      "If it is aversion, what is lost by drawing a line across the chart at all?",
    ],
  },

  Semisquare: {
    plain:
      "Two bodies 45 degrees apart, an eighth of the circle. Counted here while the separation stays within an orb of 2 degrees. Also called the octile.",
    reading:
      "Practitioners who work with the minor aspects treat the semisquare as a lesser member of the square family: the same order of friction at lower amplitude and shorter reach. The usual description is a persistent low-level irritation between two significations rather than open obstruction. Schools that keep to the classical configurations read the 45 degree separation as no relation at all.",
    principle:
      "The semisquare belongs to the eighth harmonic, the circle halved three times, and it is not Ptolemaic. Minor aspects of this kind are commonly credited to Kepler, whose harmonic work extended the aspect list past the classical configurations, with later schools adding further divisions of their own. The narrow 2 degree orb used here follows the convention that finer and later divisions are granted less room, which is a judgement about weight, not a finding about the sky.",
    energies: ["low-amplitude friction", "the eighth harmonic", "minor irritation"],
    tensions: [
      "a nagging figure easily lost among the major aspects",
      "a relation half the practice does not recognise",
    ],
    attributions: [
      {
        lineage: "Keplerian",
        claim:
          "The extension of the aspect list by further harmonic divisions of the circle is commonly credited to Kepler's work on harmony.",
      },
      {
        lineage: "Hamburg school and its successors",
        claim:
          "The 45 degree series is worked heavily, divided further to 22.5 degrees and read on a dial rather than in a round chart.",
      },
      {
        lineage: "Classical",
        claim: "No 45 degree configuration is recognised; the separation is simply not an aspect.",
      },
    ],
    correspondences: [
      "angle: 45 degrees",
      "orb in this instrument: 2 degrees",
      "harmonic: eighth",
      "class: minor, post-classical",
    ],
    contested: [
      "Orb size is a judgement call, and it is sharpest here: 2 degrees in this instrument, 1 degree or less in dial work, up to 3 in schools that read minors freely.",
      "Sources disagree on whether the minor aspects carry independent signification or only modulate the major figures already present.",
    ],
    prompts: [
      "Would this reading survive the removal of every aspect outside the Ptolemaic set?",
      "At 2 degrees of orb, how much of what is drawn here is the convention rather than the figure?",
    ],
  },

  Sesquiquadrate: {
    plain:
      "Two bodies 135 degrees apart, three eighths of the circle. Counted here while the separation stays within an orb of 2 degrees. Also called the sesquisquare or trioctile.",
    reading:
      "Practitioners who work with the minor aspects treat the sesquiquadrate as the larger partner of the semisquare: a square with a semisquare added, read in the same register of friction. The common description sets it apart from the square by direction rather than by strength, as a tension carried inwardly rather than met in the open. Like the semisquare it is absent altogether from schools holding to the classical configurations.",
    principle:
      "The sesquiquadrate is 90 plus 45 degrees and belongs to the same eighth harmonic family as the semisquare and the square. It is not Ptolemaic and enters the standard list through the harmonic extensions credited to Kepler and taken up by later European practice. The distinction often drawn between an outward square and an inward sesquiquadrate is an interpretive convention with no counterpart in the geometry, which knows only the angle.",
    energies: ["compounded friction", "the eighth harmonic", "restlessness without an outlet"],
    tensions: [
      "friction with no outward object to work against",
      "a figure defined against the square by convention rather than by structure",
    ],
    attributions: [
      {
        lineage: "Keplerian",
        claim:
          "The 135 degree figure enters the aspect list with the harmonic extensions credited to Kepler.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The sesquiquadrate is described as friction turned inward, distinguished from the square by direction rather than by degree.",
      },
      {
        lineage: "Classical",
        claim: "No 135 degree configuration is recognised among the aspects of regard.",
      },
    ],
    correspondences: [
      "angle: 135 degrees",
      "orb in this instrument: 2 degrees",
      "harmonic: eighth, third step",
      "class: minor, post-classical",
    ],
    contested: [
      "Orb size is a judgement call. The 2 degrees applied here matches the semisquare; some schools allow the sesquiquadrate more room because it is nearer the trine and opposition in span, which is a rationale others reject.",
      "Sources disagree on whether the inward character attributed to this figure is observed or inherited, since nothing in the angle distinguishes it from the square other than its size.",
    ],
    prompts: [
      "What separates the sesquiquadrate from the square in this working, apart from amplitude?",
      "If the whole eighth harmonic family were set aside, which readings in this chart would change?",
    ],
  },
};

export const AXIS_SYMBOLISM = {
  AC: {
    plain:
      "The Ascendant is the degree of the ecliptic rising over the eastern horizon at the moment and place the chart is cast for. In quadrant house systems it is the cusp of the first house.",
    reading:
      "The tradition names the Ascendant the horoskopos, the hour marker, and counts the houses from it in most schemes. Hellenistic and Medieval practice make its ruler the lord of the chart, giving that planet a governing part in the whole figure. Later material attaches outward manner and bodily temperament to the rising sign, a reading with far less support in the older sources than its present popularity suggests.",
    principle:
      "The Ascendant is a point of the frame rather than a body: it marks where the local horizon cuts the ecliptic, so it is a joint function of date, clock time, latitude and longitude. It moves about one degree every four minutes of clock time on average, and the rate varies considerably with latitude and with the sign rising, so a recorded time in error by a quarter of an hour can shift it several degrees and occasionally into the neighbouring sign. Planetary longitudes carry nothing like that sensitivity: across the same quarter hour the Moon moves roughly a third of a degree and the slower bodies barely at all. The whole practice of rectification exists because of this asymmetry.",
    energies: ["the horizon in the east", "the hour marker", "the point from which houses are counted"],
    tensions: [
      "total dependence on an accurate recorded time",
      "conflated in popular usage with a description of manner",
    ],
    attributions: [
      {
        lineage: "Hellenistic",
        claim:
          "The horoskopos is the hour marker; the places are counted from it and its ruler is taken as lord of the chart.",
      },
      {
        lineage: "Medieval",
        claim:
          "The Ascendant and its lord are treated as significators of the body and constitution of the native.",
      },
      {
        lineage: "Modern",
        claim:
          "The rising sign is described as outward manner and first impression, a reading that postdates the older structural use of the point.",
      },
    ],
    correspondences: [
      "cusp of the first house in quadrant systems",
      "opposite point: the Descendant",
      "depends on: date, clock time, latitude, longitude",
      "rate: about one degree per four minutes of clock time, varying with latitude",
    ],
    contested: [
      "House systems disagree about what the Ascendant governs: quadrant systems place it exactly on the first cusp, while whole sign houses let it fall anywhere inside the first place.",
      "Tropical and sidereal frameworks assign the same horizon degree to different signs, so the rising sign is framework-dependent in a way the horizon degree is not.",
    ],
    prompts: [
      "How accurate is the recorded time behind this Ascendant, and to what confidence?",
      "Does the working treat the Ascendant as the cusp of the first house, or as a degree standing inside it?",
    ],
  },

  DC: {
    plain:
      "The Descendant is the degree of the ecliptic setting on the western horizon, exactly 180 degrees from the Ascendant. In quadrant house systems it is the cusp of the seventh house.",
    reading:
      "The tradition reads the Descendant as the far end of the horizon axis and the ground of the one-to-one relation: partnership, contracts, marriage and open opposition. Hellenistic material names the setting place the Dusis and gives the seventh place both marriage and open enemies together. Modern psychological writing adds the theme of projection, in which what stands at the Descendant is met in another party rather than recognised as belonging to the figure itself.",
    principle:
      "The Descendant holds no information independent of the Ascendant: it is that point reflected through the centre of the chart, so whatever is said of one end is said of the axis entire. Its inherited house associations, marriage and open enmity in the same place, come from the Hellenistic list of places and sit awkwardly with modern relationship readings that keep the first theme and quietly drop the second. Whether the two belong together is a question the tradition never settled.",
    energies: ["the horizon in the west", "the one-to-one relation", "the contracted other"],
    tensions: [
      "what is met outwardly rather than recognised at home",
      "marriage and open enmity sharing a single place",
    ],
    attributions: [
      {
        lineage: "Hellenistic",
        claim:
          "The Dusis, the setting place, governs the seventh and holds marriage and open enemies in one signification.",
      },
      {
        lineage: "Medieval and Renaissance",
        claim:
          "The seventh house is used for partners, contracts, opponents at law and, in horary work, the quesited party.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The Descendant is described as the ground of projection, where a disowned function is encountered in another.",
      },
    ],
    correspondences: [
      "angle: 180 degrees from the Ascendant",
      "cusp of the seventh house in quadrant systems",
      "Hellenistic name: Dusis, the setting place",
      "depends on: the same data as the Ascendant, being its reflection",
    ],
    contested: [
      "Sources disagree on whether the seventh place is properly one theme with two faces or two themes that history bundled together.",
      "Whole sign practice and quadrant practice place the setting degree differently with respect to the seventh cusp, exactly as they do for the Ascendant.",
    ],
    prompts: [
      "Which of the seventh place themes is in force in this reading, the partner or the open opponent?",
      "What is gained by reading the Descendant separately, given that it adds no degree the Ascendant did not already fix?",
    ],
  },

  MC: {
    plain:
      "The Midheaven is the degree of the ecliptic culminating at the local meridian, the highest point the ecliptic reaches for that moment and place. In quadrant house systems it is the cusp of the tenth house.",
    reading:
      "The tradition names this point the Medium Coeli and associates the tenth place with action in public, standing, office and the visible outcome of a life. Hellenistic material treats the culminating degree as the place of greatest visibility in the figure and weights it accordingly. Later practice narrows the theme to vocation and reputation, which is a smaller claim than the older sources make.",
    principle:
      "The Midheaven is defined by the meridian rather than by the horizon, so it advances with the diurnal rotation at a steady rate in right ascension, about fifteen degrees an hour, while the corresponding ecliptic longitude moves unevenly. Like the Ascendant it cannot be computed at all without a clock time, which the planetary longitudes do not require to anything like the same precision. Beyond the polar circles the relation between meridian and horizon breaks down: quadrant house systems fail or return houses of grossly unequal size, the culminating degree can fall below the horizon, and the MC and IC axis is left undefined or ambiguous in several schemes.",
    energies: ["the culminating degree", "the meridian above", "greatest visibility"],
    tensions: [
      "dependence on a recorded clock time",
      "undefined or unstable at extreme latitudes",
      "a structural point read as a description of ambition",
    ],
    attributions: [
      {
        lineage: "Hellenistic",
        claim:
          "The culminating place is counted among the four pivots and treated as the most visible sector of the figure.",
      },
      {
        lineage: "Medieval and Renaissance",
        claim:
          "The tenth house signifies office, honours, rule and the person under whom the native serves.",
      },
      {
        lineage: "Modern",
        claim:
          "The Midheaven is narrowed to vocation, public standing and reputation, dropping most of the older governance material.",
      },
    ],
    correspondences: [
      "cusp of the tenth house in quadrant systems",
      "opposite point: the Imum Coeli",
      "rate: about fifteen degrees of right ascension per hour",
      "depends on: date, clock time, longitude, and latitude for its house relations",
    ],
    contested: [
      "House systems disagree on whether the Midheaven is the tenth cusp at all: quadrant systems place it there by construction, while whole sign houses let it fall in the ninth, tenth or eleventh place.",
      "Practice disagrees on which bodies may aspect the angles and with what orb, since an angle has no body and therefore no moiety of its own.",
    ],
    prompts: [
      "In this house system, is the culminating degree the tenth cusp, or does it fall in some other place?",
      "Which lineage supplies the tenth house reading in force here, the older governance material or the modern vocational one?",
    ],
  },

  IC: {
    plain:
      "The Imum Coeli is the degree of the ecliptic opposite the Midheaven, at the lowest point of the local meridian beneath the horizon. In quadrant house systems it is the cusp of the fourth house.",
    reading:
      "The tradition reads the fourth place as origin and foundation: ancestry, land, the household and the private ground, and in Hellenistic and Medieval texts also the end of the matter. The Imum Coeli is the hidden end of the meridian axis, out of sight by construction, and older material associates it with what is buried, inherited or concealed. Modern psychological writing recasts the same place as the inward base from which the public life at the Midheaven is raised.",
    principle:
      "The Imum Coeli holds no information independent of the Midheaven; it is one axis read from the other end, and both are undefined or unstable wherever the meridian and horizon relation breaks down at extreme latitudes. The older reading, the end of the matter, and the modern reading, the psychological foundation, are not the same claim and neither follows from the other. Both are in circulation under the same abbreviation, which is worth noticing before either is used.",
    energies: ["the meridian below", "foundation and origin", "what is out of sight by construction"],
    tensions: [
      "two unrelated readings carried under one name",
      "undefined or unstable at extreme latitudes, with the Midheaven",
    ],
    attributions: [
      {
        lineage: "Hellenistic",
        claim:
          "The subterranean pivot governs parents, property and the end of the matter, and is counted among the four pivots.",
      },
      {
        lineage: "Medieval and Renaissance",
        claim:
          "The fourth house is used for land, inheritance, the father in some schemes, and the conclusion of a question in horary work.",
      },
      {
        lineage: "Modern psychological",
        claim:
          "The Imum Coeli is described as the private base and the inherited emotional ground beneath the public life.",
      },
    ],
    correspondences: [
      "cusp of the fourth house in quadrant systems",
      "opposite point: the Midheaven",
      "Latin name: Imum Coeli, the lowest of the heavens",
      "depends on: the same data as the Midheaven, being its reflection",
    ],
    contested: [
      "Sources disagree on whether the fourth place signifies the father, the mother, or the parents undifferentiated, and the assignment varies by lineage rather than by chart.",
      "The end of the matter and the psychological foundation are distinct doctrines that later practice merged; which is meant is rarely stated.",
    ],
    prompts: [
      "Which reading of the fourth place is in force here, the end of the matter or the inward foundation?",
      "If the recorded birth time is uncertain, how much of this axis survives the uncertainty?",
    ],
  },
};

export function getAspectSymbolism(a) {
  return ASPECT_SYMBOLISM[a] || null;
}

export function getAxisSymbolism(x) {
  return AXIS_SYMBOLISM[x] || null;
}
