// ──────────────────────────────────────────────────────────────────────
//  VEDIC SYMBOLISM LAYER
//
//  Symbolic records for the 27 nakshatras (lunar mansions) and the 9
//  Vimshottari dasha lords. Each record carries three depths -- plain,
//  reading, principle -- plus optional structural fields: energies,
//  tensions, attributions, correspondences, contested, prompts.
//
//  Nakshatra name spellings match src/data/astrology/nakshatras.js exactly.
//  Spans are stated in the sidereal frame, 0 degrees Aries onward. Every
//  span below therefore depends on the ayanamsa; SGE computes a linear
//  approximation of the Lahiri (Chitrapaksha) value, which is one choice
//  among several in current use. That choice is marked as contested.
//
//  Voice rule (docs/VOICE.md): name what stands there and what it has
//  meant. Never tell the reader who they are or what will happen.
// ──────────────────────────────────────────────────────────────────────

export const NAKSHATRA_SYMBOLISM = {
  Ashwini: {
    plain:
      "Ashwini holds the first 13 degrees 20 minutes of the sidereal zodiac, from 0 degrees to 13 degrees 20 minutes of Aries. Its Vimshottari lord is Ketu, its symbol a horse's head, and its presiding deities the Ashwini Kumaras, the twin physicians.",
    reading:
      "The tradition attributes to this mansion speed, remedy and the unprecedented start -- the horse already at the gallop before the rider has settled. The Ashwini Kumaras arrive at the moment of crisis and depart once the cure is given, so the mansion is read as rescue delivered fast rather than treatment sustained. Muhurta texts class it kshipra (swift) and favour it for medicine, travel and openings.",
    principle:
      "Ashwini is the head of the lunar circle, and that structural position does most of the interpretative work: whatever falls here is read as first, without accumulated history behind it. Ketu's lordship places the opening mansion under a shadow point rather than a body, which is why the classical sources pair the freshness with rootlessness. The kshipra classification belongs to electional practice and was carried across into natal reading later; the two uses are not identical, and conflating them flattens both.",
    energies: ["swift onset", "healing arts", "the untested move", "raw vitality"],
    tensions: ["speed outrunning preparation", "rescue without follow-through", "restlessness"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "The Ashwini Kumaras, twin physicians, preside over the mansion." },
      { lineage: "Vimshottari", claim: "Ketu holds lordship, opening the 120-year cycle of periods." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed kshipra, swift, favoured for medicine and for beginnings." },
    ],
    correspondences: [
      "span: 0 deg 00 min to 13 deg 20 min Aries",
      "lord: Ketu",
      "deity: Ashwini Kumaras",
      "symbol: horse's head",
      "gana: Deva",
      "yoni: horse (male)",
    ],
    contested: [
      "Every boundary in this list depends on the ayanamsa. SGE computes a linear approximation of the Lahiri (Chitrapaksha) value; the Raman, Krishnamurti and Fagan-Bradley ayanamsas each place 0 degrees sidereal Aries elsewhere, shifting all 27 spans with it.",
    ],
    prompts: ["Does the working here rest on the whole mansion, or on the pada it falls in?"],
  },

  Bharani: {
    plain:
      "Bharani spans 13 degrees 20 minutes to 26 degrees 40 minutes of Aries, a full 13 degrees 20 minutes like every mansion. Venus is its Vimshottari lord, Yama its presiding deity, and its symbol the yoni, the bearer.",
    reading:
      "The tradition reads this mansion as the container that holds what has not yet been released -- gestation, restraint, the burden carried to term. Yama, who receives the dead, presides over a mansion whose symbol is the organ of birth, and the classical readings keep both ends of that pairing rather than choosing one. It is named among the mansions of ordeal and of threshold-crossing.",
    principle:
      "The strength of Bharani in the tradition is structural rather than temperamental: it is the only place in the circle where the sign of birth and the lord of death are set in the same frame. Venus lordship over a mansion of Yama has been read as the pull of desire meeting the fact of limit. The name itself carries the sense of bearing or supporting, and translators differ over whether that is the bearing of a child or the bearing of a weight.",
    energies: ["gestation", "restraint held deliberately", "threshold-crossing", "creative pressure"],
    tensions: ["burden without release", "desire measured against limit", "the delay before delivery"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Yama, lord of the dead, presides." },
      { lineage: "Vimshottari", claim: "Venus holds lordship, carrying a 20-year period." },
      { lineage: "Classical Jyotisha", claim: "Counted among the ugra (fierce) mansions in electional classification." },
    ],
    correspondences: [
      "span: 13 deg 20 min to 26 deg 40 min Aries",
      "lord: Venus",
      "deity: Yama",
      "symbol: yoni, the bearer",
      "gana: Manushya",
      "yoni: elephant (male)",
    ],
    contested: [
      "Sources disagree over whether the name points primarily to bearing a child or to bearing a load; the two readings pull the mansion in different directions.",
    ],
    prompts: ["Which of the two halves -- the bearer or the receiver of the dead -- does this reading lean on?"],
  },

  Krittika: {
    plain:
      "Krittika runs 26 degrees 40 minutes of Aries to 10 degrees 00 minutes of Taurus, crossing the sign boundary at its midpoint. The Sun is its Vimshottari lord, Agni its deity, and its symbol a razor or flame.",
    reading:
      "The tradition attributes to this mansion the cutting edge and the purifying burn -- fire that separates rather than fire that warms. Agni is the sacrificial fire that carries the offering, so the classical reading is of a heat that transforms by consuming, and of sharpness in judgement. It has long been associated with the star cluster called the Krittikas, the nurses of the war-god Skanda.",
    principle:
      "Krittika sits across the Aries-Taurus join, so half of it falls under Mars and half under Venus while the Sun holds the Vimshottari lordship throughout -- three rulerships bearing on one mansion. That structural overlap, not any single attribution, is what makes readings of the two halves diverge in the classical sources. The mansion once opened the nakshatra list in older enumerations, before the reckoning shifted to begin at Ashwini.",
    energies: ["cutting clarity", "purification by fire", "nurture that also tests", "sharp discernment"],
    tensions: ["the cut that goes too deep", "criticism read as care", "heat without containment"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Agni, the sacrificial fire, presides." },
      { lineage: "Vimshottari", claim: "The Sun holds lordship, carrying a 6-year period." },
      { lineage: "Puranic narrative", claim: "The Krittikas are named as the nurses of Skanda." },
    ],
    correspondences: [
      "span: 26 deg 40 min Aries to 10 deg 00 min Taurus",
      "lord: Sun",
      "deity: Agni",
      "symbol: razor, flame",
      "gana: Rakshasa",
      "yoni: sheep (female)",
    ],
    contested: [
      "Older enumerations open the nakshatra sequence at Krittika rather than Ashwini; sources differ on when and why the starting point moved.",
      "The identification of the Krittikas with the star cluster known in the West as the Pleiades is standard but not universally handled the same way across texts.",
    ],
    prompts: ["Is the Aries half or the Taurus half of this mansion in play here?"],
  },

  Rohini: {
    plain:
      "Rohini spans 10 degrees 00 minutes to 23 degrees 20 minutes of Taurus. The Moon is its Vimshottari lord, Brahma its presiding deity, and its symbols a chariot and a banyan tree.",
    reading:
      "The tradition treats this mansion as fertile ground -- growth, sensuality, and the thing that flourishes because conditions favour it. The Puranic narrative names Rohini as the daughter of Daksha whom Chandra, the Moon, favoured above her sisters, and the curse that followed is the story the tradition tells about favouring one place over the rest. Taurus is the Moon's sign of exaltation, which the classical readings hold alongside the mansion's own lunar lordship.",
    principle:
      "Rohini is the one place where a planet rules the mansion, the mansion sits in that planet's sign of exaltation, and a myth of preference attaches to the same pairing -- three reinforcements of a single reading. That is why the sources describe it as favoured rather than merely fortunate: the language is about being chosen, not about outcome. The banyan, which propagates by dropping roots from its own branches, carries the structural sense better than the chariot does.",
    energies: ["fertile growth", "sensory richness", "the favoured place", "material increase"],
    tensions: ["preference that creates resentment", "attachment to comfort", "growth outrunning its ground"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Brahma presides; some lists give Prajapati." },
      { lineage: "Vimshottari", claim: "The Moon holds lordship, carrying a 10-year period." },
      { lineage: "Puranic narrative", claim: "Chandra favoured Rohini among the daughters of Daksha." },
    ],
    correspondences: [
      "span: 10 deg 00 min to 23 deg 20 min Taurus",
      "lord: Moon",
      "deity: Brahma",
      "symbol: chariot, banyan",
      "gana: Manushya",
      "yoni: serpent (male)",
    ],
    contested: [
      "The presiding deity is given as Brahma in some lists and as Prajapati in others; the two are treated as one figure in parts of the tradition and as distinct in others.",
    ],
    prompts: ["Does this reading rest on the mansion or on the Moon's exaltation in the sign that holds it?"],
  },

  Mrigashira: {
    plain:
      "Mrigashira runs 23 degrees 20 minutes of Taurus to 6 degrees 40 minutes of Gemini. Mars is its Vimshottari lord, Soma its deity, and its symbol a deer's head.",
    reading:
      "The tradition attributes to this mansion the search rather than the find -- the deer lifting its head, scenting, moving on. It is read as gentle curiosity kept in motion, and the classical sources tie it to seeking that does not settle. Soma, the pressed draught and the lunar principle, gives the mansion its association with what is sought for its sweetness.",
    principle:
      "Mars ruling a mansion whose symbol is a deer is the structural oddity here, and the tradition uses that friction rather than smoothing it: the martial drive is turned to searching instead of striking. The mansion straddles Taurus and Gemini, moving from the fixed earth of the senses into the mutable air of enquiry, which is the same movement its symbol describes. Its alternative name, Mrigashirsha, is the older form found in the Vedic lists.",
    energies: ["seeking", "gentle enquiry", "scent and trace", "movement between grounds"],
    tensions: ["never quite arriving", "curiosity without commitment", "suspicion misread as searching"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Soma presides over the mansion." },
      { lineage: "Vimshottari", claim: "Mars holds lordship, carrying a 7-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed mridu (soft), suited to gentle undertakings." },
    ],
    correspondences: [
      "span: 23 deg 20 min Taurus to 6 deg 40 min Gemini",
      "lord: Mars",
      "deity: Soma",
      "symbol: deer's head",
      "gana: Deva",
      "yoni: serpent (female)",
    ],
    prompts: ["Where does the search in this chart come to rest, if the mansion itself will not settle it?"],
  },

  Ardra: {
    plain:
      "Ardra occupies 6 degrees 40 minutes to 20 degrees 00 minutes of Gemini. Rahu is its Vimshottari lord, Rudra its presiding deity, and its symbol is given as a teardrop or a gem.",
    reading:
      "The tradition attributes to this mansion the storm and what the storm leaves behind -- the name carries the sense of moist or wet, the ground after rain. Rudra is the howling form, the one who wounds and then heals, so the classical reading holds destruction and remedy in the same hand. It is counted among the mansions of upheaval, and electional texts class it tikshna, sharp.",
    principle:
      "Rahu ruling a Rudra mansion is the sharpest pairing of shadow point and fierce deity in the circle, and the sources read it as pressure applied until something gives. The mansion sits in the middle of Gemini, so the upheaval is placed in the field of mind and speech rather than of body or property. Whether the transformation is understood as grief working itself out or as a sudden breach depends on which commentary is followed.",
    energies: ["storm and clearing", "breakthrough under pressure", "sharpened perception", "grief that moves"],
    tensions: ["destruction outrunning repair", "turbulence in speech and thought", "the wound kept open"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Rudra presides over the mansion." },
      { lineage: "Vimshottari", claim: "Rahu holds lordship, carrying an 18-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed tikshna, sharp, avoided for gentle undertakings." },
    ],
    correspondences: [
      "span: 6 deg 40 min to 20 deg 00 min Gemini",
      "lord: Rahu",
      "deity: Rudra",
      "symbol: teardrop, gem",
      "gana: Manushya",
      "yoni: dog (female)",
    ],
    contested: [
      "The symbol is given variously as a teardrop, a gem and a human head across the sources, and the three readings are not easily reconciled.",
    ],
    prompts: ["Which of the symbols -- teardrop, gem, head -- does this working take as primary, and why that one?"],
  },

  Punarvasu: {
    plain:
      "Punarvasu spans 20 degrees 00 minutes of Gemini to 3 degrees 20 minutes of Cancer. Jupiter is its Vimshottari lord, Aditi its deity, and its symbol a bow with a quiver.",
    reading:
      "The name carries the sense of good again, or wealth restored, and the tradition reads the mansion as return after loss rather than as gain never interrupted. Aditi is the boundless mother, so what is attributed here is shelter offered without condition and the second chance that follows a first failure. Classical sources count it among the benign mansions, safe for most undertakings.",
    principle:
      "The mansion crosses from Gemini into Cancer, and the return it names is structurally that crossing: out of the field of exchange and back into the field of shelter. Jupiter's lordship over an Aditi mansion doubles the note of expansion held open rather than expansion pushed. The quiver matters more than the bow in the classical reading, because a quiver is what makes a second shot possible.",
    energies: ["return of light", "renewal after loss", "unconditioned shelter", "the second attempt"],
    tensions: ["repetition mistaken for progress", "generosity that scatters", "relying on the second chance"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Aditi, the boundless one, presides." },
      { lineage: "Vimshottari", claim: "Jupiter holds lordship, carrying a 16-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed chara (movable), suited to travel and to change of place." },
    ],
    correspondences: [
      "span: 20 deg 00 min Gemini to 3 deg 20 min Cancer",
      "lord: Jupiter",
      "deity: Aditi",
      "symbol: bow, quiver",
      "gana: Deva",
      "yoni: cat (female)",
    ],
    prompts: ["What is being returned to in this chart, and what was lost first?"],
  },

  Pushya: {
    plain:
      "Pushya occupies 3 degrees 20 minutes to 16 degrees 40 minutes of Cancer. Saturn is its Vimshottari lord, Brihaspati its presiding deity, and its symbols a cow's udder, a flower and a circle.",
    reading:
      "The tradition names this the most auspicious of the mansions, and attributes to it nourishment given steadily rather than abundantly. Brihaspati is the priest of the gods, so the reading is of wisdom that feeds -- teaching, counsel, provision. Muhurta texts favour it for almost every undertaking with the standing exception of marriage.",
    principle:
      "Saturn ruling a Brihaspati mansion set in the Moon's own sign is a rare alignment of the slow, the wise and the nourishing, and the classical reputation of Pushya rests on that triple structure rather than on any single claim. The exception for marriage is old and is explained differently in different commentaries, none of which the tradition has settled. The udder is the operative symbol: what it names is a supply that has to be drawn on to flow.",
    energies: ["steady nourishment", "counsel and instruction", "provision", "the reliable ground"],
    tensions: ["care that constrains", "nourishing others before the source", "conservatism"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Brihaspati, priest of the gods, presides." },
      { lineage: "Vimshottari", claim: "Saturn holds lordship, carrying a 19-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Held the most auspicious mansion for undertakings, marriage excepted." },
    ],
    correspondences: [
      "span: 3 deg 20 min to 16 deg 40 min Cancer",
      "lord: Saturn",
      "deity: Brihaspati",
      "symbol: cow's udder, flower, circle",
      "gana: Deva",
      "yoni: sheep (male)",
    ],
    contested: [
      "The exclusion of marriage from an otherwise universally auspicious mansion is explained several different ways in the commentaries, and no explanation has become standard.",
    ],
    prompts: ["Which classical exception applies to the undertaking at hand, and does the source name a reason for it?"],
  },

  Ashlesha: {
    plain:
      "Ashlesha runs 16 degrees 40 minutes to 30 degrees 00 minutes of Cancer, ending at the sign boundary. Mercury is its Vimshottari lord, the Nagas its presiding deities, and its symbol a coiled serpent.",
    reading:
      "The name means embrace or entwining, and the tradition attributes to the mansion what holds by winding around rather than by grasping. The Nagas are serpent powers who guard hidden treasure and hidden knowledge, so the classical reading joins secrecy, medicine, venom and depth in one figure. It is counted among the sharp mansions in electional practice.",
    principle:
      "The last portion of Ashlesha forms a gandanta, the knot where a water sign ends and a fire sign begins, and the tradition treats that junction as the most delicate degree-range in the whole circle. Mercury's lordship places the serpent's knowledge in the field of speech and calculation, which is why the mansion carries attributions of both healing craft and manipulation. Whether the venom or the antidote is emphasised varies by commentator, and the sources do not resolve it.",
    energies: ["coiled attention", "hidden knowledge", "the entwining hold", "medicinal insight"],
    tensions: ["entanglement", "knowledge used to bind", "what is withheld"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "The Nagas, serpent powers, preside." },
      { lineage: "Vimshottari", claim: "Mercury holds lordship, carrying a 17-year period." },
      { lineage: "Classical Jyotisha", claim: "The final portion forms a gandanta junction with Magha." },
    ],
    correspondences: [
      "span: 16 deg 40 min to 30 deg 00 min Cancer",
      "lord: Mercury",
      "deity: Nagas",
      "symbol: coiled serpent",
      "gana: Rakshasa",
      "yoni: cat (male)",
    ],
    contested: [
      "Commentators divide over whether the serpent here names the poison or the cure; both readings are long-standing.",
      "The width of the gandanta zone is given differently across sources -- some take the final pada, some a narrower band of degrees.",
    ],
    prompts: ["How wide is the gandanta band in the source this working follows?"],
  },

  Magha: {
    plain:
      "Magha holds 0 degrees 00 minutes to 13 degrees 20 minutes of Leo, opening the sign. Ketu is its Vimshottari lord, the Pitris -- the ancestors -- are its presiding deities, and its symbols a throne and a palanquin.",
    reading:
      "The tradition attributes to this mansion inherited standing: the seat occupied because others occupied it first. The Pitris are the ancestral dead who receive offerings, so what is read here is obligation running backwards in time as much as honour running forwards. It is counted among the fierce mansions in electional classification.",
    principle:
      "Magha opens Leo directly after the Ashlesha gandanta, so the throne is reached across the knot -- the tradition places inheritance immediately on the far side of dissolution. Ketu ruling a mansion of the ancestors is the structural core of the reading: a shadow point governing what is received from those no longer present. The throne is a seat, not a person, and the classical sources keep that distinction, describing the office rather than the occupant.",
    energies: ["inherited standing", "ancestral obligation", "ceremony", "the honoured seat"],
    tensions: ["the weight of lineage", "standing without earning", "duty to the dead"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "The Pitris, the ancestral dead, preside." },
      { lineage: "Vimshottari", claim: "Ketu holds lordship, carrying a 7-year period." },
      { lineage: "Classical Jyotisha", claim: "The opening portion forms a gandanta with the end of Ashlesha." },
    ],
    correspondences: [
      "span: 0 deg 00 min to 13 deg 20 min Leo",
      "lord: Ketu",
      "deity: Pitris (ancestors)",
      "symbol: throne, palanquin",
      "gana: Rakshasa",
      "yoni: rat (male)",
    ],
    prompts: ["Whose seat is this in the chart, and who sat in it before?"],
  },

  "Purva Phalguni": {
    plain:
      "Purva Phalguni spans 13 degrees 20 minutes to 26 degrees 40 minutes of Leo. Venus is its Vimshottari lord, Bhaga its deity, and its symbol the front legs of a bed.",
    reading:
      "The tradition attributes to this mansion rest taken as a share earned rather than as idleness. Bhaga is the apportioner, the god who allots the portion due, so the classical reading joins pleasure to entitlement -- what is enjoyed because it has been allotted. It is read for union, for celebration and for the interval before work resumes.",
    principle:
      "The bed is split across two mansions, front legs here and back legs in Uttara Phalguni, and the pairing is the point: the tradition divides the same object into the reclining and the rising. Venus ruling the front half places desire at the beginning of the rest rather than at its end. Bhaga's apportioning function is what separates this from mere indulgence in the classical sources, though later popular readings often drop that distinction.",
    energies: ["allotted pleasure", "union", "the earned interval", "warmth and display"],
    tensions: ["rest extended past its portion", "entitlement", "charm standing in for work"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Bhaga, the apportioner, presides." },
      { lineage: "Vimshottari", claim: "Venus holds lordship, carrying a 20-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed ugra (fierce), despite the mansion's benign attributions." },
    ],
    correspondences: [
      "span: 13 deg 20 min to 26 deg 40 min Leo",
      "lord: Venus",
      "deity: Bhaga",
      "symbol: front legs of a bed",
      "gana: Manushya",
      "yoni: rat (female)",
    ],
    contested: [
      "The ugra classification sits awkwardly against the mansion's gentle significations, and the sources do not explain the tension.",
    ],
    prompts: ["Which half of the bed is in question here -- the lying down or the getting up?"],
  },

  "Uttara Phalguni": {
    plain:
      "Uttara Phalguni runs 26 degrees 40 minutes of Leo to 10 degrees 00 minutes of Virgo. The Sun is its Vimshottari lord, Aryaman its presiding deity, and its symbol the back legs of a bed.",
    reading:
      "The tradition attributes to this mansion patronage and the contract honoured -- Aryaman is the god of compacts, hospitality and the bond between allies. Where the earlier half of the bed is read for pleasure, this half is read for what follows: the friendship that survives the celebration. Classical sources favour it for agreements, for marriage and for arrangements meant to hold.",
    principle:
      "The mansion crosses from Leo into Virgo, moving from the sign of the sovereign to the sign of service, and the tradition reads patronage as exactly that crossing -- standing put to use. Solar lordship over a mansion of Aryaman places the compact under the light rather than in private. The bed's back legs bear the weight when the sleeper rises; the symbol is about what holds, not what is enjoyed.",
    energies: ["compact and alliance", "patronage", "hospitality", "reliable arrangement"],
    tensions: ["obligation that outlasts the warmth", "standing carried as duty", "generosity turned formal"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Aryaman, god of compacts and hospitality, presides." },
      { lineage: "Vimshottari", claim: "The Sun holds lordship, carrying a 6-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed dhruva (fixed), favoured for what is meant to last." },
    ],
    correspondences: [
      "span: 26 deg 40 min Leo to 10 deg 00 min Virgo",
      "lord: Sun",
      "deity: Aryaman",
      "symbol: back legs of a bed",
      "gana: Manushya",
      "yoni: cow (male)",
    ],
    prompts: ["Is the agreement being read here a compact between equals, or a patronage running one way?"],
  },

  Hasta: {
    plain:
      "Hasta occupies 10 degrees 00 minutes to 23 degrees 20 minutes of Virgo. The Moon is its Vimshottari lord, Savitar its deity, and its symbol an open hand.",
    reading:
      "The name means hand, and the tradition attributes to this mansion craft, dexterity and the thing made by working fingers. Savitar is the impelling aspect of the sun, the one who sets things in motion, so the reading joins skill to the moment of setting to work. Classical sources associate it with handicraft, with sleight and with the healing touch.",
    principle:
      "Hasta is the only mansion whose symbol is a part of the human body used as a tool, and the tradition builds the reading outward from that: what is held, what is made, what is given, what is taken. Lunar lordship in Mercury's sign places the making under feeling rather than under calculation, which is the classical explanation for why craft here is read as instinctive rather than trained. Whether the open hand signifies giving or grasping is not settled in the sources.",
    energies: ["craft and dexterity", "the making hand", "practical skill", "the impelling start"],
    tensions: ["sleight and misdirection", "skill turned to acquisition", "restless hands"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Savitar, the impeller, presides." },
      { lineage: "Vimshottari", claim: "The Moon holds lordship, carrying a 10-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed kshipra (swift), favoured for craft and for quick work." },
    ],
    correspondences: [
      "span: 10 deg 00 min to 23 deg 20 min Virgo",
      "lord: Moon",
      "deity: Savitar",
      "symbol: open hand",
      "gana: Deva",
      "yoni: buffalo (female)",
    ],
    contested: [
      "The open hand is read as the giving hand in some sources and as the taking hand in others; the symbol supports both.",
    ],
    prompts: ["What passes through the hand in this reading -- and in which direction?"],
  },

  Chitra: {
    plain:
      "Chitra runs 23 degrees 20 minutes of Virgo to 6 degrees 40 minutes of Libra. Mars is its Vimshottari lord, Vishvakarma its presiding deity, and its symbol a bright jewel.",
    reading:
      "The name means bright, variegated or wonderful, and the tradition attributes to this mansion made beauty -- design, ornament, the form that draws the eye. Vishvakarma is the divine architect and craftsman of the gods, so what is read here is construction with an aesthetic intent rather than construction for use. Classical sources tie it to jewellery, to architecture and to appearance.",
    principle:
      "The fixed star Chitra, Spica, is the anchor of the Chitrapaksha ayanamsa, which sets the sidereal frame so that this star holds a fixed position -- so this mansion is not only a place in the circle but part of how the circle is pinned to the sky. Mars ruling an architect's mansion gives the classical pairing of force and design: the chisel as well as the drawing. The mansion crosses from Virgo into Libra, moving from the analysis of parts to the balancing of the whole.",
    energies: ["designed brilliance", "ornament", "architecture", "the eye-catching form"],
    tensions: ["surface mistaken for structure", "brilliance that isolates", "form over function"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Vishvakarma, the divine architect, presides; some lists give Tvashtar." },
      { lineage: "Vimshottari", claim: "Mars holds lordship, carrying a 7-year period." },
      { lineage: "Jyotisha sidereal astronomy", claim: "The star Chitra fixes the Chitrapaksha reckoning of the ayanamsa." },
    ],
    correspondences: [
      "span: 23 deg 20 min Virgo to 6 deg 40 min Libra",
      "lord: Mars",
      "deity: Vishvakarma",
      "symbol: bright jewel",
      "gana: Rakshasa",
      "yoni: tiger (female)",
    ],
    contested: [
      "The exact position assigned to the star Chitra differs between ayanamsa definitions, and SGE's linear approximation of Lahiri is one treatment among several.",
      "Vishvakarma and Tvashtar are treated as the same craftsman-deity in some lists and as separate figures in others.",
    ],
    prompts: ["If the frame itself is pinned near this mansion, how much weight will a boundary reading here bear?"],
  },

  Swati: {
    plain:
      "Swati spans 6 degrees 40 minutes to 20 degrees 00 minutes of Libra. Rahu is its Vimshottari lord, Vayu its deity, and its symbols a young shoot moving in the wind and a piece of coral.",
    reading:
      "The tradition attributes to this mansion independent movement -- the shoot bends because nothing holds it, and the wind that bends it cannot be caught. Vayu is breath and wind, so what is read here is mobility, dispersal and the thing that will not be fixed in place. Classical sources associate it with trade, with travel and with self-directed work.",
    principle:
      "Rahu ruling a Vayu mansion sets a shadow point over the element that has no form of its own, and the sources read the combination as reach without anchor. The young shoot survives storms precisely by not resisting, which the tradition treats as a structural principle rather than a temperament. Placed in the middle of Libra, the mansion's independence is set inside the sign of the scale, so what moves freely is nonetheless being weighed.",
    energies: ["independent movement", "breath and dispersal", "flexible endurance", "self-directed work"],
    tensions: ["scattering", "resisting the tie", "flexibility read as evasion"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Vayu, the wind, presides." },
      { lineage: "Vimshottari", claim: "Rahu holds lordship, carrying an 18-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed chara (movable), favoured for travel and trade." },
    ],
    correspondences: [
      "span: 6 deg 40 min to 20 deg 00 min Libra",
      "lord: Rahu",
      "deity: Vayu",
      "symbol: young shoot, coral",
      "gana: Deva",
      "yoni: buffalo (male)",
    ],
    contested: [
      "The fixed star identified with Swati differs between sources, so the mansion's astronomical marker is less settled than most.",
    ],
    prompts: ["Is the movement in this reading chosen, or is it the absence of anything holding?"],
  },

  Vishakha: {
    plain:
      "Vishakha runs 20 degrees 00 minutes of Libra to 3 degrees 20 minutes of Scorpio. Jupiter is its Vimshottari lord, the paired deities Indra and Agni preside, and its symbol a forked branch or a triumphal arch.",
    reading:
      "The tradition attributes to this mansion the goal held in view and the fork in the road that reaches it -- two branches, one destination. Indra and Agni together are a rare double dedication, and the classical reading takes the pairing as power joined to purifying force. It is read for ambition, for effort sustained over distance, and for the moment just short of arrival.",
    principle:
      "The fork is the structure: the mansion names a choice between routes rather than a choice between ends, which is why the sources describe determination and division in the same breath. Jupiter's lordship crossing the Libra-Scorpio boundary places expansion at the point where balance gives way to intensity. An older name, Radha, pairs it with Anuradha as a couple, and the tradition reads the two mansions together as often as separately.",
    energies: ["fixed purpose", "sustained effort", "the branching route", "triumph in view"],
    tensions: ["arrival deferred", "two paths held at once", "ambition consuming its object"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Indra and Agni preside jointly, a rare double dedication." },
      { lineage: "Vimshottari", claim: "Jupiter holds lordship, carrying a 16-year period." },
      { lineage: "Classical Jyotisha", claim: "Paired with Anuradha under the older name Radha." },
    ],
    correspondences: [
      "span: 20 deg 00 min Libra to 3 deg 20 min Scorpio",
      "lord: Jupiter",
      "deity: Indra and Agni",
      "symbol: forked branch, arch",
      "gana: Rakshasa",
      "yoni: tiger (male)",
    ],
    prompts: ["Does this reading treat Vishakha alone, or as half of the Radha-Anuradha pair?"],
  },

  Anuradha: {
    plain:
      "Anuradha occupies 3 degrees 20 minutes to 16 degrees 40 minutes of Scorpio. Saturn is its Vimshottari lord, Mitra its presiding deity, and its symbols a lotus and an arch.",
    reading:
      "Mitra is the god of the friendly contract, the bond kept because it was given, and the tradition attributes to this mansion devotion held over time. What is read here is companionship in work rather than companionship in pleasure -- the alliance that persists through the difficult stretch. Classical sources favour it for cooperative undertakings and for anything requiring loyalty.",
    principle:
      "Saturn ruling a Mitra mansion is the tradition's clearest statement that friendship is a structure maintained, not a feeling had; the same lordship gives the mansion its endurance and its coldness. Placed in Scorpio, the loyalty is set in the sign of depth and concealment, so the sources read the bond as one that survives what is not spoken. The lotus, which roots in mud and opens above it, carries the reading better than the arch does.",
    energies: ["devoted alliance", "loyalty over time", "cooperative work", "depth of bond"],
    tensions: ["loyalty outliving its object", "friendship as obligation", "what stays unspoken"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Mitra, god of the friendly compact, presides." },
      { lineage: "Vimshottari", claim: "Saturn holds lordship, carrying a 19-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed mridu (soft), suited to gentle and cooperative work." },
    ],
    correspondences: [
      "span: 3 deg 20 min to 16 deg 40 min Scorpio",
      "lord: Saturn",
      "deity: Mitra",
      "symbol: lotus, arch",
      "gana: Deva",
      "yoni: deer (female)",
    ],
    prompts: ["Which bond in this chart is being kept because it was given rather than because it is easy?"],
  },

  Jyeshtha: {
    plain:
      "Jyeshtha spans 16 degrees 40 minutes to 30 degrees 00 minutes of Scorpio, ending at the sign boundary. Mercury is its Vimshottari lord, Indra its deity, and its symbols an earring, an umbrella and a protective talisman.",
    reading:
      "The name means eldest or foremost, and the tradition attributes to this mansion seniority won rather than inherited -- Indra holds his position because he took it and defends it. What is read here is protection extended downward and isolation at the height. Classical sources count it among the sharp mansions and treat it with caution.",
    principle:
      "The last portion of Jyeshtha forms the second gandanta, the knot where Scorpio's water gives way to Sagittarius' fire, so the mansion of the eldest ends at a dissolution. Mercury ruling an Indra mansion places command in the field of speech, which the sources read as authority exercised by what is said. The umbrella and the earring are both insignia -- marks of rank rather than instruments of it, and the tradition keeps that distinction.",
    energies: ["seniority", "protection given", "insignia of rank", "authority defended"],
    tensions: ["isolation at the top", "rank without succession", "the cost of holding position"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Indra, chief of the gods, presides." },
      { lineage: "Vimshottari", claim: "Mercury holds lordship, carrying a 17-year period." },
      { lineage: "Classical Jyotisha", claim: "The final portion forms a gandanta junction with Mula." },
    ],
    correspondences: [
      "span: 16 deg 40 min to 30 deg 00 min Scorpio",
      "lord: Mercury",
      "deity: Indra",
      "symbol: earring, umbrella, talisman",
      "gana: Rakshasa",
      "yoni: deer (male)",
    ],
    prompts: ["Is the authority here read as held, or as about to pass across the gandanta?"],
  },

  Mula: {
    plain:
      "Mula holds 0 degrees 00 minutes to 13 degrees 20 minutes of Sagittarius, opening the sign. Ketu is its Vimshottari lord, Nirriti its presiding deity, and its symbol a bunch of bound roots.",
    reading:
      "The name means root, and the tradition attributes to this mansion the going-down to what a thing rests on -- and the pulling-up that follows. Nirriti is dissolution, the goddess of what comes apart, so the classical reading joins investigation to demolition. It is counted among the fierce mansions and is treated with the same caution as the gandanta it opens from.",
    principle:
      "Mula begins Sagittarius immediately after the Jyeshtha gandanta, so the tradition places the search for foundations directly on the far side of a knot -- the root is reached by way of the break. Ketu ruling a Nirriti mansion is the strongest concentration of severance in the circle, and the sources read it as removal that clears rather than removal that merely destroys. Whether Mula is read as spiritual excavation or as material loss depends heavily on the commentary followed.",
    energies: ["going to the source", "dismantling", "investigation", "foundations exposed"],
    tensions: ["uprooting what still bears weight", "loss preceding insight", "severance"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Nirriti, goddess of dissolution, presides." },
      { lineage: "Vimshottari", claim: "Ketu holds lordship, carrying a 7-year period." },
      { lineage: "Classical Jyotisha", claim: "The opening portion forms a gandanta with the end of Jyeshtha." },
    ],
    correspondences: [
      "span: 0 deg 00 min to 13 deg 20 min Sagittarius",
      "lord: Ketu",
      "deity: Nirriti",
      "symbol: bound roots",
      "gana: Rakshasa",
      "yoni: dog (male)",
    ],
    contested: [
      "The presiding deity is given as Nirriti in most lists and as Alakshmi in some; the two are not the same figure everywhere they appear.",
      "Traditional remedial prescriptions attached to this mansion vary widely by region and school, and there is no single received practice.",
    ],
    prompts: ["What is being taken down here, and is anything still resting on it?"],
  },

  "Purva Ashadha": {
    plain:
      "Purva Ashadha spans 13 degrees 20 minutes to 26 degrees 40 minutes of Sagittarius. Venus is its Vimshottari lord, Apas -- the waters -- are its presiding deities, and its symbols a hand fan and a winnowing basket.",
    reading:
      "The name carries the sense of the early invincible one, and the tradition attributes to this mansion momentum that has not yet met resistance. The Apas are the primordial waters, so what is read here is force that moves by flowing and cleanses by covering. Classical sources associate it with declarations, with confidence and with the first move in a contest.",
    principle:
      "The mansion is the earlier of a pair, and the pair divides invincibility into two kinds: the surge here and the settlement in Uttara Ashadha. Venus ruling a mansion of waters in a fire sign is the friction the tradition works with -- desire carried on a current through a sign of conviction. The winnowing basket names the operative action: separation by movement, not by cutting.",
    energies: ["early momentum", "declared confidence", "cleansing flow", "the opening move"],
    tensions: ["confidence untested", "force that has not yet met resistance", "surge without settlement"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "The Apas, the waters, preside." },
      { lineage: "Vimshottari", claim: "Venus holds lordship, carrying a 20-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed ugra (fierce), used for confrontation rather than for accord." },
    ],
    correspondences: [
      "span: 13 deg 20 min to 26 deg 40 min Sagittarius",
      "lord: Venus",
      "deity: Apas",
      "symbol: hand fan, winnowing basket",
      "gana: Manushya",
      "yoni: monkey (male)",
    ],
    prompts: ["Is the victory read here the opening one or the lasting one, and does the source distinguish them?"],
  },

  "Uttara Ashadha": {
    plain:
      "Uttara Ashadha runs 26 degrees 40 minutes of Sagittarius to 10 degrees 00 minutes of Capricorn. The Sun is its Vimshottari lord, the Vishve Devas its presiding deities, and its symbol an elephant's tusk.",
    reading:
      "This is the later invincible one, and the tradition attributes to it the win that holds rather than the win that is taken. The Vishve Devas are the collective of all the gods, so the reading is of authority that rests on general assent rather than on force. Classical sources favour it for foundations, for oaths and for undertakings meant to outlast their founders.",
    principle:
      "The mansion crosses from Sagittarius into Capricorn, from conviction into structure, and the tradition reads lasting victory as exactly that crossing -- belief given an institution. Solar lordship over a collective deity is the structural tension the sources keep: one light standing for many. The last portion of this mansion and the first of Shravana are where the disputed twenty-eighth nakshatra, Abhijit, is placed.",
    energies: ["lasting victory", "collective assent", "founding work", "righteous strength"],
    tensions: ["standing that has to be maintained", "the individual speaking for the many", "slowness"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "The Vishve Devas, the all-gods, preside." },
      { lineage: "Vimshottari", claim: "The Sun holds lordship, carrying a 6-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed dhruva (fixed), favoured for foundations and oaths." },
    ],
    correspondences: [
      "span: 26 deg 40 min Sagittarius to 10 deg 00 min Capricorn",
      "lord: Sun",
      "deity: Vishve Devas",
      "symbol: elephant's tusk",
      "gana: Manushya",
      "yoni: mongoose (female)",
    ],
    contested: [
      "A twenty-eighth nakshatra, Abhijit, is placed across the end of this mansion and the start of Shravana in part of the tradition. SGE uses the 27-mansion scheme; sources that keep Abhijit assign it different widths and different uses, and it is not part of the Vimshottari lord sequence.",
    ],
    prompts: ["Does the scheme in use here count 27 mansions or 28, and what changes if it counts 28?"],
  },

  Shravana: {
    plain:
      "Shravana occupies 10 degrees 00 minutes to 23 degrees 20 minutes of Capricorn. The Moon is its Vimshottari lord, Vishnu its presiding deity, and its symbols three footprints and an ear.",
    reading:
      "The name means hearing, and the tradition attributes to this mansion learning received by listening rather than by reading or by doing. Vishnu's three strides, which cross the whole world, give the mansion its association with what is preserved and held together. Classical sources tie it to teaching lineages, to recitation and to transmitted knowledge.",
    principle:
      "In a tradition that carried its texts orally before it wrote them, a mansion of the ear is a mansion of transmission itself -- the reading is about the channel, not about the content that passes through it. Lunar lordship in Saturn's sign places receptivity inside structure, which the sources give as the reason the mansion favours disciplined study. The three footprints are stages of a crossing, so what is heard here is understood as arriving in sequence.",
    energies: ["listening", "transmitted knowledge", "preservation", "attentive devotion"],
    tensions: ["receiving without questioning", "hearing everything and keeping nothing", "reverence for the channel"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Vishnu presides over the mansion." },
      { lineage: "Vimshottari", claim: "The Moon holds lordship, carrying a 10-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed chara (movable), favoured for study and for setting out." },
    ],
    correspondences: [
      "span: 10 deg 00 min to 23 deg 20 min Capricorn",
      "lord: Moon",
      "deity: Vishnu",
      "symbol: three footprints, ear",
      "gana: Deva",
      "yoni: monkey (female)",
    ],
    contested: [
      "Where Abhijit is counted, it takes a portion at the start of this mansion, and Shravana's span is reduced accordingly. SGE keeps the full 13 degrees 20 minutes.",
    ],
    prompts: ["What is being transmitted in this reading, and through whom did it arrive?"],
  },

  Dhanishta: {
    plain:
      "Dhanishta runs 23 degrees 20 minutes of Capricorn to 6 degrees 40 minutes of Aquarius. Mars is its Vimshottari lord, the eight Vasus its presiding deities, and its symbols a drum and a flute.",
    reading:
      "The tradition attributes to this mansion rhythm and the wealth that gathers around it -- the drum that assembles a crowd, the measure that others keep time to. The Vasus are the eight elemental deities of dwelling and substance, so the reading joins music to material abundance. Classical sources associate it with performance, with reputation and with property.",
    principle:
      "A percussion instrument is the tradition's figure for time made audible, and this mansion is where measure and prosperity are read as the same thing: what keeps regular accumulates. Mars ruling a mansion of the Vasus places drive under the eight forms of substance, which is the classical explanation for its association with acquisition. The mansion crosses from Capricorn into Aquarius, from what is owned into what is shared out.",
    energies: ["rhythm and measure", "gathering abundance", "performance", "reputation"],
    tensions: ["accumulation for its own sake", "the beat that will not vary", "audience dependence"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "The eight Vasus preside." },
      { lineage: "Vimshottari", claim: "Mars holds lordship, carrying a 7-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed chara (movable), used for undertakings involving movement and exchange." },
    ],
    correspondences: [
      "span: 23 deg 20 min Capricorn to 6 deg 40 min Aquarius",
      "lord: Mars",
      "deity: eight Vasus",
      "symbol: drum, flute",
      "gana: Rakshasa",
      "yoni: lion (female)",
    ],
    contested: [
      "Part of the tradition attaches a marriage-related affliction to this mansion; the schools that use it and the schools that do not have never reconciled the rule.",
    ],
    prompts: ["Which measure is this chart keeping time to, and who set it?"],
  },

  Shatabhisha: {
    plain:
      "Shatabhisha spans 6 degrees 40 minutes to 20 degrees 00 minutes of Aquarius. Rahu is its Vimshottari lord, Varuna its presiding deity, and its symbol an empty circle -- read also as a hundred healers or a hundred stars.",
    reading:
      "The name carries the sense of a hundred physicians or a hundred remedies, and the tradition attributes to this mansion healing that works out of sight. Varuna is the keeper of cosmic law and of the waters, the one who binds by oath and looses by pardon, so the reading joins concealment to correction. Classical sources associate it with medicine, with research and with what is done in private.",
    principle:
      "The empty circle is the operative symbol: an enclosure that shows nothing of what is inside it, which the tradition reads as the veil rather than as absence. Rahu ruling a Varuna mansion sets the shadow point over cosmic law, which the sources treat as the rule glimpsed rather than the rule known. A hundred remedies implies that no single one is sufficient, and part of the tradition builds its reading of the mansion on that implication.",
    energies: ["remedy", "concealed work", "research", "the veil that protects"],
    tensions: ["isolation", "a hundred cures and no diagnosis", "what is kept from view"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Varuna, keeper of cosmic law and the waters, presides." },
      { lineage: "Vimshottari", claim: "Rahu holds lordship, carrying an 18-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed chara (movable), and used for medical undertakings." },
    ],
    correspondences: [
      "span: 6 deg 40 min to 20 deg 00 min Aquarius",
      "lord: Rahu",
      "deity: Varuna",
      "symbol: empty circle, hundred healers",
      "gana: Rakshasa",
      "yoni: horse (female)",
    ],
    contested: [
      "The hundred of the name is read as healers in some sources and as stars in others; the mansion's astronomical marker is faint enough that both survive.",
    ],
    prompts: ["Is the circle here read as empty, or as full of what cannot be seen?"],
  },

  "Purva Bhadrapada": {
    plain:
      "Purva Bhadrapada runs 20 degrees 00 minutes of Aquarius to 3 degrees 20 minutes of Pisces. Jupiter is its Vimshottari lord, Aja Ekapada -- the one-footed goat -- is its presiding deity, and its symbol the front legs of a funeral cot.",
    reading:
      "The tradition attributes to this mansion austerity carried to the edge of the body's endurance: fire-walking, fasting, the discipline that scorches. Aja Ekapada is an obscure and fierce Vedic form, and the sources keep the obscurity rather than explaining it away. What is read here is intensity turned towards something beyond the ordinary rather than intensity spent on the ordinary.",
    principle:
      "The funeral cot is divided across two mansions exactly as the bed was divided across the Phalgunis, and the tradition sets the two pairs opposite each other in the circle: one pair for rest, one for the last rest. Jupiter's lordship over an ascetic mansion is the classical pairing of expansion with renunciation -- growth by subtraction. The crossing from Aquarius into Pisces moves the austerity from a sign of collectives into a sign of dissolution.",
    energies: ["austerity", "intensity turned upward", "the fire that scorches", "unsentimental depth"],
    tensions: ["severity", "discipline detached from purpose", "extremity"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Aja Ekapada, the one-footed goat, presides." },
      { lineage: "Vimshottari", claim: "Jupiter holds lordship, carrying a 16-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed ugra (fierce), avoided for gentle undertakings." },
    ],
    correspondences: [
      "span: 20 deg 00 min Aquarius to 3 deg 20 min Pisces",
      "lord: Jupiter",
      "deity: Aja Ekapada",
      "symbol: front legs of a funeral cot",
      "gana: Manushya",
      "yoni: lion (male)",
    ],
    contested: [
      "Aja Ekapada is barely described in the surviving Vedic material, and later commentaries supply characterisations the older sources do not support.",
    ],
    prompts: ["What is the austerity in this reading for -- and does the source say, or only that it is severe?"],
  },

  "Uttara Bhadrapada": {
    plain:
      "Uttara Bhadrapada occupies 3 degrees 20 minutes to 16 degrees 40 minutes of Pisces. Saturn is its Vimshottari lord, Ahir Budhnya -- the serpent of the deep -- is its presiding deity, and its symbol the back legs of a funeral cot.",
    reading:
      "The tradition attributes to this mansion the stillness underneath rather than the fire above: the serpent coiled at the bottom of the waters, unmoving and very old. What is read here is equanimity arrived at through what has been endured, not equanimity by temperament. Classical sources count it among the benign mansions and favour it for depth-work and for what needs patience.",
    principle:
      "The later half of the funeral cot completes what the earlier half began, and the tradition reads the pair as ordeal followed by rest -- the same two-stage structure the Phalgunis and the Ashadhas use. Saturn's lordship over a serpent of the deep is the most sustained image of slowness in the circle. The mansion is often paired with Revati and Purva Bhadrapada as the closing group where the year's reckoning runs out.",
    energies: ["depth and stillness", "equanimity through endurance", "patient counsel", "the old ground"],
    tensions: ["stillness read as withdrawal", "endurance with no end named", "detachment"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Ahir Budhnya, serpent of the deep, presides." },
      { lineage: "Vimshottari", claim: "Saturn holds lordship, carrying a 19-year period." },
      { lineage: "Muhurta (electional) tradition", claim: "Classed dhruva (fixed), favoured for lasting undertakings." },
    ],
    correspondences: [
      "span: 3 deg 20 min to 16 deg 40 min Pisces",
      "lord: Saturn",
      "deity: Ahir Budhnya",
      "symbol: back legs of a funeral cot",
      "gana: Manushya",
      "yoni: cow (female)",
    ],
    prompts: ["Is the calm read here the calm of depth, or the calm of distance?"],
  },

  Revati: {
    plain:
      "Revati closes the circle at 16 degrees 40 minutes to 30 degrees 00 minutes of Pisces. Mercury is its Vimshottari lord, Pushan its presiding deity, and its symbols a fish and a drum.",
    reading:
      "Pushan is the guide of roads and of herds, the one who sees travellers safely to the far side, and the tradition attributes to this mansion safe passage and gentle completion. What is read here is the end of a journey rather than the end of a life -- arrival, delivery, the thing brought home. Classical sources count it among the most benign mansions and favour it for departures and for endings.",
    principle:
      "Revati is the last mansion, and its final degrees form the third gandanta, where the circle closes into Ashwini and the whole sequence begins again -- so completion and dissolution occupy the same degrees. Mercury's lordship over a mansion of the guide places wayfinding in the field of speech and reckoning. The star traditionally identified with Revati has served as a zero point for one family of ayanamsa definitions, which makes this mansion structurally relevant to how the frame itself is set.",
    energies: ["safe passage", "gentle completion", "guidance", "nourishing the traveller"],
    tensions: ["ending confused with dissolution", "care extended past its use", "the last stretch"],
    attributions: [
      { lineage: "Vedic nakshatra lists", claim: "Pushan, guide of roads and of herds, presides." },
      { lineage: "Vimshottari", claim: "Mercury holds lordship, carrying a 17-year period." },
      { lineage: "Classical Jyotisha", claim: "The final portion forms the gandanta closing into Ashwini." },
    ],
    correspondences: [
      "span: 16 deg 40 min to 30 deg 00 min Pisces",
      "lord: Mercury",
      "deity: Pushan",
      "symbol: fish, drum",
      "gana: Deva",
      "yoni: elephant (female)",
    ],
    contested: [
      "One family of ayanamsa definitions fixes the sidereal zero point against the Revati star; the Chitrapaksha family fixes it against Chitra. SGE computes a linear approximation of the Lahiri (Chitrapaksha) value, so a Revati-based reckoning will place these boundaries differently.",
    ],
    prompts: ["Where the circle closes and reopens in the same degrees, which of the two does a reading here take?"],
  },
};

export const DASHA_SYMBOLISM = {
  Ketu: {
    plain:
      "Ketu opens the Vimshottari sequence with a period of 7 years. It is the descending lunar node, the south node, a calculated point rather than a body, and it rules three nakshatras: Ashwini, Magha and Mula.",
    reading:
      "The tradition attributes to a Ketu period the loosening of holds -- what has been carried is set down, sometimes deliberately and sometimes not. Ketu is read as the headless remainder, indifferent to worldly increase, so the classical descriptions favour detachment, renunciation and the return of unfinished matters. It is the shortest period apart from the Sun's.",
    principle:
      "The whole Vimshottari scheme is anchored to the Moon's nakshatra at birth: the mansion the Moon occupies fixes which lord runs first and how much of that first period has already elapsed. The scheme is therefore only ever as good as the Moon's computed position, and the Moon is the fastest-moving body in the chart, so a small error in birth time moves the entire dasha timeline. The sidereal frame that fixes the Moon's nakshatra depends on the ayanamsa; SGE uses a linear approximation of the Lahiri value, which introduces a further drift away from a rigorously computed ayanamsa the further a date sits from the reference epoch.",
    energies: ["release", "detachment", "the past surfacing", "reduction to essentials"],
    tensions: ["loss without an account of it", "indifference to what still matters", "severance"],
    attributions: [
      { lineage: "Vimshottari", claim: "Ketu carries 7 of the cycle's 120 years and opens the lord sequence." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "Vimshottari is set out as the principal dasha system for the present age." },
      { lineage: "Classical Jyotisha", claim: "Ketu is a chhaya graha, a shadow point, with no physical body." },
    ],
    correspondences: [
      "period: 7 years",
      "cycle position: 1st of 9",
      "nakshatras ruled: Ashwini, Magha, Mula",
      "class: shadow point (chhaya graha)",
    ],
    contested: [
      "The ayanamsa is not settled. SGE computes a linear approximation of the Lahiri (Chitrapaksha) value; Raman, Krishnamurti and Fagan-Bradley differ, and a Moon near a nakshatra boundary can fall in different mansions under different reckonings, changing the opening lord of the whole sequence.",
      "Whether a shadow point can be said to rule a period in the same sense as a physical body is argued differently across schools.",
    ],
    prompts: ["How close is the Moon to a nakshatra boundary in this chart, and would another ayanamsa move it across?"],
  },

  Venus: {
    plain:
      "Venus carries a Vimshottari period of 20 years, the longest of the nine. It rules three nakshatras: Bharani, Purva Phalguni and Purva Ashadha, and follows Ketu in the sequence.",
    reading:
      "The tradition attributes to a Venus period the long work of relation, art and material comfort -- what is built slowly because it is pleasant to build. Venus is the teacher of the asuras in the classical accounts, so its knowledge is read as worldly rather than renunciate. Twenty years is long enough that classical sources treat the period as a phase of life rather than an episode within one.",
    principle:
      "The Vimshottari periods are not equal, and the inequality is the system's main structural claim: Venus at 20 years and the Sun at 6 are held to weigh differently on a life by duration alone. All of it hangs on the Moon's nakshatra at birth, which sets both the first lord and the fraction of that first period already spent, so the timeline is only as reliable as the Moon's position. The sidereal frame in turn depends on the ayanamsa, and SGE's linear approximation of Lahiri is one treatment among several rather than a settled value.",
    energies: ["relation", "art and ornament", "material comfort", "the long sweet work"],
    tensions: ["comfort deferring the difficult", "attachment", "duration mistaken for depth"],
    attributions: [
      { lineage: "Vimshottari", claim: "Venus carries 20 of the cycle's 120 years, the longest single period." },
      { lineage: "Classical Jyotisha", claim: "Venus is Shukra, preceptor of the asuras, holding worldly rather than renunciate knowledge." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "Sub-periods (antardashas) subdivide each period in the same 120-year proportions." },
    ],
    correspondences: [
      "period: 20 years",
      "cycle position: 2nd of 9",
      "nakshatras ruled: Bharani, Purva Phalguni, Purva Ashadha",
      "share of cycle: 20 of 120 years",
    ],
    contested: [
      "The ayanamsa choice is unresolved. SGE's linear approximation of Lahiri will not agree exactly with a rigorously computed Lahiri, still less with Raman or Krishnamurti, and dasha start dates shift accordingly.",
      "Vimshottari is one dasha system among several -- Ashtottari, Yogini and Kalachakra each run different lengths and different conditions of applicability.",
    ],
    prompts: ["Which dasha system does this working use, and what makes Vimshottari the right one for it?"],
  },

  Sun: {
    plain:
      "The Sun carries a Vimshottari period of 6 years, the shortest of the nine. It rules three nakshatras: Krittika, Uttara Phalguni and Uttara Ashadha, and follows Venus in the sequence.",
    reading:
      "The tradition attributes to a Solar period visibility, authority and the matter of standing -- what is stated openly and answered for. The Sun is karaka for the atma, the self as principle, and for the father, so classical readings of the period concentrate on position and on the paternal line. Six years is the briefest of the periods, and the sources note the compression rather than treating it as a diminishment.",
    principle:
      "The nine periods run in a fixed order -- Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury -- and that order is the nakshatra lord order, not a planetary speed order, which is why the sequence cannot be derived from the sky alone. The entry point into the sequence is the Moon's nakshatra at birth, so everything downstream depends on that one position being right. SGE's sidereal positions rest on a linear approximation of the Lahiri ayanamsa, a simplification that grows less exact with distance from its reference epoch.",
    energies: ["visibility", "authority", "the stated position", "vitality"],
    tensions: ["exposure", "standing that must be defended", "brevity"],
    attributions: [
      { lineage: "Vimshottari", claim: "The Sun carries 6 of the cycle's 120 years, the shortest period." },
      { lineage: "Classical Jyotisha", claim: "The Sun is karaka for atma, the self as principle, and for the father." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "The lord order follows the nakshatra lords, not planetary order." },
    ],
    correspondences: [
      "period: 6 years",
      "cycle position: 3rd of 9",
      "nakshatras ruled: Krittika, Uttara Phalguni, Uttara Ashadha",
      "share of cycle: 6 of 120 years",
    ],
    contested: [
      "The ayanamsa remains a live disagreement, and SGE's linear approximation of Lahiri is a computational simplification rather than a settled position on it.",
    ],
    prompts: ["Does the reading here weigh a 6-year period against a 20-year one, or treat the two as equivalent units?"],
  },

  Moon: {
    plain:
      "The Moon carries a Vimshottari period of 10 years. It rules three nakshatras: Rohini, Hasta and Shravana, and follows the Sun in the sequence.",
    reading:
      "The tradition attributes to a lunar period the maturing of the inner life -- home, mother, the emotional foundation and what shelters it. The Moon is karaka for manas, mind as the receiving faculty, so the classical readings concern reception and mood rather than action. Ten years sits in the middle of the range of period lengths.",
    principle:
      "The Moon has a double role in this scheme that no other body has: it is a period lord like the rest, and it is also the origin from which every period is calculated, since the dasha sequence begins from the nakshatra it occupies at birth. That makes the whole timeline only as good as the Moon's position -- and the Moon moves roughly its own diameter in an hour, so birth-time uncertainty translates directly into dasha uncertainty. Its nakshatra also depends on the ayanamsa; SGE uses a linear approximation of the Lahiri value, which is a simplification of a figure that is itself disputed.",
    energies: ["emotional foundation", "shelter and home", "receptivity", "the inner life maturing"],
    tensions: ["mood taken for circumstance", "dependence", "change without direction"],
    attributions: [
      { lineage: "Vimshottari", claim: "The Moon carries 10 of the cycle's 120 years." },
      { lineage: "Classical Jyotisha", claim: "The Moon is karaka for manas, the receiving mind, and for the mother." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "The dasha sequence starts from the nakshatra the Moon occupies at birth." },
    ],
    correspondences: [
      "period: 10 years",
      "cycle position: 4th of 9",
      "nakshatras ruled: Rohini, Hasta, Shravana",
      "structural role: origin of the whole dasha calculation",
    ],
    contested: [
      "The ayanamsa is contested, and SGE's linear approximation of Lahiri compounds that with an approximation error of its own; a Moon within a fraction of a degree of a nakshatra boundary should not be read as settled.",
      "Some schools calculate Vimshottari from the ascendant or the Sun rather than the Moon; the Moon-based reckoning is the standard one but not the only one recorded.",
    ],
    prompts: ["How exact is the birth time behind this chart, and what does that do to the dasha start dates?"],
  },

  Mars: {
    plain:
      "Mars carries a Vimshottari period of 7 years. It rules three nakshatras: Mrigashira, Chitra and Dhanishta, and follows the Moon in the sequence.",
    reading:
      "The tradition attributes to a Mars period the application of force -- work undertaken, conflict entered, ambition given a shape. Mars is karaka for energy, for courage and for land, and the classical readings tie the period to disputes over what is held. Seven years matches Ketu's length, and part of the tradition reads the two as related in kind.",
    principle:
      "Sub-periods run inside each period in the same 120-year proportions, so a Mars major period contains a Mars-Venus stretch, a Mars-Sun stretch and so on -- the structure is recursive, and classical practice reads the pair rather than the major lord alone. All of it is calculated from the Moon's nakshatra at birth, which makes the scheme dependent on a single fast-moving position. The sidereal frame that fixes that position rests on the ayanamsa, and SGE's is a linear approximation of Lahiri.",
    energies: ["applied force", "courage", "contest", "ambition given form"],
    tensions: ["conflict for its own sake", "force applied to the wrong object", "haste"],
    attributions: [
      { lineage: "Vimshottari", claim: "Mars carries 7 of the cycle's 120 years." },
      { lineage: "Classical Jyotisha", claim: "Mars is karaka for energy, courage, siblings and land." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "Antardashas subdivide each major period in the same proportions as the main cycle." },
    ],
    correspondences: [
      "period: 7 years",
      "cycle position: 5th of 9",
      "nakshatras ruled: Mrigashira, Chitra, Dhanishta",
      "share of cycle: 7 of 120 years",
    ],
    contested: [
      "The ayanamsa question is unresolved across schools, and the linear approximation of Lahiri used here is a simplification of one side of it.",
      "How far to subdivide -- antardasha, pratyantardasha, and further -- is a matter of school preference, and the deeper levels magnify any birth-time error.",
    ],
    prompts: ["How many levels of subdivision does this working read, and is the birth time accurate enough to support them?"],
  },

  Rahu: {
    plain:
      "Rahu carries a Vimshottari period of 18 years, the second longest. It is the ascending lunar node, the north node, a calculated point rather than a body, and it rules three nakshatras: Ardra, Swati and Shatabhisha.",
    reading:
      "The tradition attributes to a Rahu period appetite directed outward -- the foreign, the unfamiliar, the thing wanted because it has not been had. Rahu is read as the head without a body, taking in without being filled, so the classical descriptions concentrate on pursuit and on the distortion that pursuit introduces. Eighteen years is long enough for the sources to describe the period as a whole chapter.",
    principle:
      "Rahu and Ketu are always exactly opposite, so their periods sit 180 degrees apart in the zodiac but adjacent in neither the sequence nor the sky's rhythm -- the Vimshottari order is a nakshatra order, not a spatial one. Everything is reckoned from the Moon's nakshatra at birth, which makes the accuracy of the Moon the limit on the accuracy of the scheme. The nakshatra itself depends on the ayanamsa, and SGE's linear approximation of Lahiri is one choice among several in current use.",
    energies: ["outward appetite", "the unfamiliar", "amplification", "sudden reach"],
    tensions: ["pursuit that does not satisfy", "distortion of scale", "the foreign taken for the better"],
    attributions: [
      { lineage: "Vimshottari", claim: "Rahu carries 18 of the cycle's 120 years." },
      { lineage: "Classical Jyotisha", claim: "Rahu is a chhaya graha, a shadow point, always opposite Ketu." },
      { lineage: "Classical Jyotisha", claim: "Rahu is karaka for the foreign, for obsession and for sudden gain." },
    ],
    correspondences: [
      "period: 18 years",
      "cycle position: 6th of 9",
      "nakshatras ruled: Ardra, Swati, Shatabhisha",
      "class: shadow point (chhaya graha)",
    ],
    contested: [
      "The ayanamsa is not agreed. SGE computes a linear approximation of the Lahiri (Chitrapaksha) value, which will differ from a rigorous Lahiri and more so from Raman, Krishnamurti or Fagan-Bradley.",
      "Whether the nodes are taken as mean or as true positions differs by school, and the two can place Rahu in different nakshatras near a boundary.",
    ],
    prompts: ["Is the node here computed as mean or as true, and does the source of this reading say which it assumes?"],
  },

  Jupiter: {
    plain:
      "Jupiter carries a Vimshottari period of 16 years. It rules three nakshatras: Punarvasu, Vishakha and Purva Bhadrapada, and follows Rahu in the sequence.",
    reading:
      "The tradition attributes to a Jupiter period expansion given a direction -- teaching, counsel, the enlargement of what a life is understood to be for. Jupiter is Guru, karaka for wisdom, for children and for dharma, and the classical readings tie the period to instruction given and received. Sixteen years places it among the longer periods.",
    principle:
      "The nine period lengths are fixed proportions of 120 years and do not vary from chart to chart; only the entry point does, and that entry point is the Moon's nakshatra at birth together with how far through it the Moon has travelled. That makes the Moon's position the single load-bearing measurement in the whole system. Its sidereal value depends on the ayanamsa, and SGE's linear approximation of Lahiri is a working simplification, not a settled astronomical constant.",
    energies: ["directed expansion", "instruction", "counsel", "faith given practical form"],
    tensions: ["expansion past what can be held", "certainty", "advice unasked for"],
    attributions: [
      { lineage: "Vimshottari", claim: "Jupiter carries 16 of the cycle's 120 years." },
      { lineage: "Classical Jyotisha", claim: "Jupiter is Guru, karaka for wisdom, children and dharma." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "The 120-year total is fixed; only the starting point varies by chart." },
    ],
    correspondences: [
      "period: 16 years",
      "cycle position: 7th of 9",
      "nakshatras ruled: Punarvasu, Vishakha, Purva Bhadrapada",
      "share of cycle: 16 of 120 years",
    ],
    contested: [
      "The ayanamsa remains disputed; the linear approximation of Lahiri used here should be treated as a stated method, not as a neutral fact about the sky.",
      "Whether 120 years is meant as a full human span or as a purely proportional device is read differently across commentaries.",
    ],
    prompts: ["Is the 120-year cycle being read here as a life span or as a proportional scheme?"],
  },

  Saturn: {
    plain:
      "Saturn carries a Vimshottari period of 19 years, the second longest after Venus. It rules three nakshatras: Pushya, Anuradha and Uttara Bhadrapada, and follows Jupiter in the sequence.",
    reading:
      "The tradition attributes to a Saturn period the long road -- delay, structure, and what is built because nothing else will hold. Saturn is karaka for discipline, for longevity and for karma understood as accumulated consequence, so the classical readings concern duration rather than event. Nineteen years is long enough that the sources describe entering and leaving it as distinct passages.",
    principle:
      "The sequence is cyclical: after Mercury it returns to Ketu, so a life long enough to complete 120 years would meet each lord twice, and the tradition reads the second meeting against the first. Where in that cycle a chart begins is set entirely by the Moon's nakshatra at birth, making the Moon's position the foundation of the whole reckoning. The nakshatra depends on the ayanamsa, and SGE's linear approximation of Lahiri is one method among several rather than the received answer.",
    energies: ["duration", "structure built slowly", "discipline", "what endures pressure"],
    tensions: ["delay without explanation", "endurance turned to resignation", "weight"],
    attributions: [
      { lineage: "Vimshottari", claim: "Saturn carries 19 of the cycle's 120 years." },
      { lineage: "Classical Jyotisha", claim: "Saturn is karaka for discipline, longevity and accumulated karma." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "The lord sequence is cyclical, returning to Ketu after Mercury." },
    ],
    correspondences: [
      "period: 19 years",
      "cycle position: 8th of 9",
      "nakshatras ruled: Pushya, Anuradha, Uttara Bhadrapada",
      "share of cycle: 19 of 120 years",
    ],
    contested: [
      "The ayanamsa is contested and SGE's is a linear approximation of Lahiri; over long spans a linear model diverges from a rigorously computed value.",
      "Saturn's dasha and the separate Sade Sati transit reckoning are distinct systems that classical sources sometimes read together and sometimes keep apart.",
    ],
    prompts: ["Does this reading keep the dasha and the transit systems separate, or let one qualify the other?"],
  },

  Mercury: {
    plain:
      "Mercury carries a Vimshottari period of 17 years and closes the sequence, which then returns to Ketu. It rules three nakshatras: Ashlesha, Jyeshtha and Revati.",
    reading:
      "The tradition attributes to a Mercury period exchange -- speech, calculation, commerce, the widening of a network. Mercury is karaka for buddhi, the discriminating intellect, and for speech, so the classical readings concern how things are stated and traded rather than what is done. Seventeen years closes a cycle that began 120 years earlier with Ketu.",
    principle:
      "Ketu 7, Venus 20, Sun 6, Moon 10, Mars 7, Rahu 18, Jupiter 16, Saturn 19 and Mercury 17 sum to exactly 120 years, and that closure is what makes the scheme a cycle rather than a list. The point of entry into it is the Moon's nakshatra at birth and the fraction of that mansion already traversed, so the entire timeline rests on one fast-moving position being correctly computed. That position is sidereal, so it depends on the ayanamsa; SGE uses a linear approximation of the Lahiri value, which is a deliberate simplification of a figure that the schools have never agreed on.",
    energies: ["exchange", "speech and calculation", "the widening network", "discrimination"],
    tensions: ["talk substituting for the act", "dispersal across too many threads", "cleverness"],
    attributions: [
      { lineage: "Vimshottari", claim: "Mercury carries 17 of the cycle's 120 years and closes the sequence." },
      { lineage: "Classical Jyotisha", claim: "Mercury is karaka for buddhi, the discriminating intellect, and for speech." },
      { lineage: "Brihat Parashara Hora Shastra", claim: "The nine periods total 120 years exactly, then repeat from Ketu." },
    ],
    correspondences: [
      "period: 17 years",
      "cycle position: 9th of 9",
      "nakshatras ruled: Ashlesha, Jyeshtha, Revati",
      "cycle total: 7 + 20 + 6 + 10 + 7 + 18 + 16 + 19 + 17 = 120 years",
    ],
    contested: [
      "Ayanamsa choice is unresolved, and SGE's linear approximation of Lahiri is a stated method rather than a neutral measurement; a different ayanamsa can move the Moon into an adjacent nakshatra and reassign every period boundary.",
      "Ashtottari (108 years), Yogini (36 years) and Kalachakra run alongside Vimshottari in the classical literature, each with its own conditions for when it applies.",
    ],
    prompts: ["If a different ayanamsa moved the Moon one mansion along, how much of this reading would survive?"],
  },
};

export function getNakshatraSymbolism(n) {
  return NAKSHATRA_SYMBOLISM[n] || null;
}

export function getDashaSymbolism(lord) {
  return DASHA_SYMBOLISM[lord] || null;
}
