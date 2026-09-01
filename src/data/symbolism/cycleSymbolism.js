/**
 * cycleSymbolism.js
 *
 * Symbolic records for the long return and phase cycles: planetary returns,
 * oppositions and squares to natal position, the progressed lunar cycle, the
 * solar and lunar return conventions, and the mundane cycles (Metonic, the
 * Jupiter-Saturn great conjunction, the Venus pentagram).
 *
 * Each record names the cycle as a PERIOD - its astronomical length as fact -
 * and then names what the traditions have attributed to the return. Nothing
 * here forecasts, and nothing here describes a person. Return charts are
 * treated as an interpretive convention laid over a real recurrence, and the
 * distinction is stated at principle depth.
 *
 * Shape: { plain, reading, principle, energies?, tensions?, attributions?,
 *          correspondences?, contested?, prompts? }
 */

export const CYCLE_SYMBOLISM = {

  saturnReturn: {
    plain: "Saturn takes about 29.4 years to travel once round the zodiac. The Saturn return is the period in which transiting Saturn regains the degree it held at birth, so the first falls near age twenty-nine, the second near fifty-eight, and a third near eighty-eight.",
    reading: "Saturn is the outermost of the seven visible planets and the slowest, and traditional astrology made it the marker of limit, time, boundary and weight. The return has accordingly been read as a joint in the structure of a life rather than as an incident inside it. Because Saturn stations and turns retrograde, the transiting body may cross the natal degree once or three times, and practitioners differ over whether the return is the first contact or the whole passage.",
    principle: "The recurrence itself is ordinary orbital mechanics: a body with a 29.4-year sidereal period returns to a fixed ecliptic longitude every 29.4 years, give or take the wobble that eccentricity and retrograde loops introduce. Everything read into that moment is attribution. Ptolemy's Tetrabiblos assigns the ages of a life to the planets in order of apparent speed and gives the last and slowest period to Saturn, which places the planet at the far end of a scheme rather than at a crisis point. The modern habit of naming the twenty-ninth year specifically, and of treating it as a threshold, belongs to twentieth-century psychological astrology and not to the older material.",
    energies: ["limit", "structure", "duration", "consolidation", "gravity", "the finished form"],
    tensions: ["contraction against expansion", "obligation against release", "the built thing against the thing outgrown", "slowness against demand"],
    attributions: [
      { lineage: "Hellenistic", claim: "Saturn is the greater malefic, cold and dry, lord of the outermost visible sphere and of boundary." },
      { lineage: "Ptolemaic", claim: "The Tetrabiblos orders the ages of a life by planetary speed and gives the final and longest age to Saturn." },
      { lineage: "Vedic", claim: "Shani is the slow one, the karaka of longevity, labour and discipline; the sade sati counted round Saturn's transit of the natal Moon runs seven and a half years." },
      { lineage: "Modern psychological", claim: "The return is read as an initiation into adult structure, a reading with no counterpart in the older sources." }
    ],
    correspondences: ["period: approximately 29.4 years", "metal: lead", "day: Saturday", "second return: near age 58", "third return: near age 88"],
    contested: [
      "Sources disagree on whether the return is dated from the exact degree of natal Saturn or from the ingress of transiting Saturn into the natal sign, which can differ by two years or more.",
      "Where Saturn makes three passes over the natal degree, sources disagree on whether the return is the first pass, the last, or the whole interval between them.",
      "Sidereal and tropical practice date the same return to the same instant, since a return to natal longitude is zodiac-independent, but disagree entirely on the sign involved."
    ],
    prompts: [
      "Which house holds natal Saturn, and which houses does the returning transit cross on the approach?",
      "Does the working date this return from the exact degree, or from the sign ingress?",
      "Is Saturn dignified, debilitated or peregrine in this chart, and does that change how the return is being read?"
    ]
  },

  saturnOpposition: {
    plain: "Halfway through Saturn's 29.4-year circuit, transiting Saturn stands opposite the degree it held at birth. That falls near ages fifteen, forty-four and seventy-three. The quarter points, where transiting Saturn squares its natal place, fall near ages seven, twenty-two, thirty-six and fifty-one.",
    reading: "Traditional astrology counted the seven-year steps of Saturn among the climacterics, the hinge years of the older medical and astrological literature, and the ages of seven, fourteen and twenty-one appear in that role well before modern astrology took them up. The opposition has been read as the point at which what Saturn built at the return stands fully across from its origin. The reading is structural, not predictive: it names a geometry, and the geometry recurs on schedule for every chart alike.",
    principle: "The quarter, half and three-quarter points of any orbital return are arithmetic, and they carry no observational content beyond the angle itself. What makes them symbolically loaded is the older doctrine of the aspects, in which opposition and square are the configurations of division and the trine and sextile the configurations of accord - a scheme set out in Hellenistic sources and systematised by Ptolemy from the geometry of the zodiac's divisibility. The seven-year climacteric scheme runs alongside this from an independent root in Greek medical writing, and the two were later folded together.",
    energies: ["division", "counterpoise", "the halfway mark", "visible structure"],
    tensions: ["the built thing against its origin", "outward form against inward reason"],
    attributions: [
      { lineage: "Hellenistic", claim: "Opposition and square are the configurations of division; trine and sextile the configurations of agreement." },
      { lineage: "Greek medical", claim: "The climacteric years, counted in sevens, mark hinges in the course of a life." }
    ],
    correspondences: ["half cycle: near ages 15, 44, 73", "quarter cycles: near ages 7, 22, 36, 51"],
    contested: [
      "Sources disagree on whether the seven-year climacteric scheme is genuinely Saturnine or a separate medical tradition later attached to Saturn."
    ],
    prompts: [
      "Which natal factors sit on the axis Saturn now occupies, and were they already active at the last return?"
    ]
  },

  jupiterReturn: {
    plain: "Jupiter takes about 11.9 years to complete one circuit of the zodiac. The Jupiter return is the period in which transiting Jupiter regains its natal degree, so returns fall near ages twelve, twenty-four, thirty-five, forty-seven and on at roughly twelve-year steps.",
    reading: "Hellenistic astrology names Jupiter the greater benefic, temperate, warm and moist, and the counterweight to Saturn in the pair of outer visible planets. The return has been read as the point at which the frame of a life is measured against its own widest terms rather than as a promise of increase. Vedic tradition treats the same body as Guru, the teacher and the karaka of counsel and doctrine, and reads its cycle against the natal Moon rather than against its own place.",
    principle: "The near-twelve-year period is the reason Jupiter carries a calendrical role in more than one tradition: Chinese astronomy used the year-star, sui xing, to divide the sky into twelve stations and to count years, and the twelve-year animal series sits on that division. The period is 11.86 years and not twelve, so the shortfall accumulates to about one station every eighty-odd years, and Chinese astronomical writing recognised the drift and introduced corrections for it. The lesson generalises: a symbolic cycle that rounds an orbital period to a convenient whole number will drift against the sky, and every tradition that counts in whole years has had to decide whether to correct the count or keep the symbol.",
    energies: ["extension", "measure", "counsel", "the widened frame", "surplus"],
    tensions: ["expansion against limit", "abundance against proportion", "the broad view against the near one"],
    attributions: [
      { lineage: "Hellenistic", claim: "Jupiter is the greater benefic, temperate in quality, diurnal in sect." },
      { lineage: "Ptolemaic", claim: "The Tetrabiblos gives Jupiter a warm and moist temperament and places its age of life after the Sun's." },
      { lineage: "Vedic", claim: "Brihaspati or Guru signifies teaching, doctrine, counsel and lawful increase." },
      { lineage: "Chinese astronomical", claim: "The year-star divides the ecliptic into twelve stations, and the year-count follows the division." }
    ],
    correspondences: ["period: approximately 11.9 years", "metal: tin", "day: Thursday", "returns near ages 12, 24, 35, 47, 59"],
    contested: [
      "Sources disagree on whether Jupiter's benefic character is unconditional or dependent on sect, dignity and the condition of the chart's benefics as a whole."
    ],
    prompts: [
      "Which sign and house does Jupiter hold natally, and is the return arriving into dignity or into detriment?",
      "Does the working read the Jupiter cycle from its own natal place, or from the natal Moon as Vedic practice does?"
    ]
  },

  lunarNodeReturn: {
    plain: "The lunar nodes are the two points where the Moon's orbital plane crosses the ecliptic. They move backwards through the zodiac and complete a circuit in about 18.6 years, so the nodal return falls near ages nineteen, thirty-seven and fifty-six, with the reversed nodes - nodes on the opposite natal degrees - near ages nine, twenty-eight, forty-six and sixty-five.",
    reading: "Vedic astrology treats the nodes as Rahu and Ketu, the severed head and tail of the eclipse dragon, and gives them full status as grahas with their own dasha periods. Medieval Latin astrology inherited the same figure as caput and cauda draconis, and read the head as increasing whatever it touched and the tail as diminishing it. Western practice from the twentieth century onwards has read the nodal axis as a line of intake and release, which is a modern reading laid on an old figure.",
    principle: "The nodes are a geometric intersection, not a body: nothing occupies them, and their signification has always had to be argued rather than observed. Their motion is what makes eclipses possible, since an eclipse requires a syzygy near a node, and the same 18.6-year regression governs the lunar standstill cycle visible in the extremes of moonrise along the horizon. Two conventions exist for locating them - the mean node, a smoothed average that never retrogrades, and the true node, which oscillates and can turn direct for days at a time. Vedic practice generally uses the mean node and much Western practice the true node, so two competent astrologers can place the same nodal return weeks apart.",
    energies: ["intersection", "eclipse", "the crossing point", "intake and release"],
    tensions: ["the head against the tail", "what is drawn in against what is let go", "a point that signifies against a point that is empty"],
    attributions: [
      { lineage: "Vedic", claim: "Rahu and Ketu are shadow grahas with their own dasha periods and full signifying status." },
      { lineage: "Medieval Latin", claim: "Caput draconis increases and cauda draconis diminishes the significations it touches." },
      { lineage: "Modern psychological", claim: "The nodal axis is read as an axis of habit and direction, a reading with no ancient precedent." }
    ],
    correspondences: ["period: approximately 18.6 years, retrograde", "return near ages 19, 37, 56", "reversal near ages 9, 28, 46, 65", "eclipse seasons: roughly every 173 days"],
    contested: [
      "Sources disagree on whether the nodes signify in their own right or only by modifying whatever planet is conjunct them.",
      "Mean node and true node give different degrees and occasionally different signs; there is no settled rule for choosing between them.",
      "Some traditions read Ketu as wholly malefic, others as a point of detachment and release; the two readings are not reconcilable."
    ],
    prompts: [
      "Mean node or true node - which convention governs this working, and does the difference move either node across a sign boundary?",
      "Is any natal planet within orb of the nodal axis, and does the return bring the transiting nodes back over it?"
    ]
  },

  progressedLunar: {
    plain: "In secondary progression each day after birth is counted as one year of life. The Moon returns to the same zodiacal longitude in about 27.3 days, so the progressed Moon completes a circuit of the chart in about twenty-seven to twenty-eight years, spending roughly two and a quarter years in each sign.",
    reading: "The progressed lunar return falls near ages twenty-seven or twenty-eight, then near fifty-five and near eighty-two, close enough to the Saturn return that the two are often read together and sometimes confused. Twentieth-century astrology, notably Dane Rudhyar's treatment of the lunation cycle, divided the progressed cycle into eight phases running from progressed new moon to progressed balsamic, and read the phase rather than the sign as the primary marker. Older practice used the progressed Moon chiefly as a timing device for directing other significators.",
    principle: "Day-for-a-year is a symbolic convention with no mechanism behind it: nothing in the sky links the twenty-eighth day after a birth to the twenty-eighth year of a life. The rule has long been justified by scriptural precedent, the day-for-a-year measure in Ezekiel, and by the elegance of the correspondence between the lunar month and the human generation, but neither is a cause. What the convention does supply is a slow, evenly-paced hand that sweeps the natal chart once in a working lifetime, and that structural property - one full circuit per adult life - is arguably the whole of its usefulness.",
    energies: ["slow circuit", "phase", "the moving hand", "the monthly figure stretched to a lifetime"],
    tensions: ["a real period against a symbolic scale", "sign emphasis against phase emphasis"],
    attributions: [
      { lineage: "Traditional directional", claim: "Progressions serve as a timing measure for directing natal significators, subordinate to the natal figure." },
      { lineage: "Modern psychological", claim: "The eight-phase progressed lunation cycle is read as the primary structure, with the sign position secondary." }
    ],
    correspondences: ["cycle: approximately 27 to 28 years", "roughly 2.25 years per sign", "progressed lunar return near ages 27, 55, 82", "eight phases from progressed new moon"],
    contested: [
      "Sources disagree on whether the day-for-a-year rule requires any justification at all, or whether it is simply a convention that has proved workable.",
      "Several progression methods compete - secondary, tertiary, minor - and give different progressed positions for the same date."
    ],
    prompts: [
      "Which natal house does the progressed Moon now occupy, and which natal planets has it crossed since the last progressed new moon?",
      "Where does the progressed lunar return fall relative to the Saturn return in this chart - before, after, or overlapping?"
    ]
  },

  solarReturn: {
    plain: "The solar return is the moment the transiting Sun regains the exact zodiacal longitude it held at birth. Because the tropical year runs to about 365.2422 days, that moment falls roughly six hours later each year and steps back by about eighteen hours when a leap day intervenes, so it rarely coincides with the calendar birthday.",
    reading: "The practice of casting a chart for the return of the Sun descends from the Persian and Arabic doctrine of the revolutions of the years of nativities, which passed into Latin Europe through translation and remained standard through the Renaissance. In that lineage the return chart is not read alone: it is read against the natal chart, alongside annual profections and the lord of the year, and its authority is derivative rather than independent. Later practice, particularly from the nineteenth century onwards, tended to read the return chart as a standalone figure, which is a substantial departure.",
    principle: "The Sun's return to its natal longitude is a genuine astronomical event and can be computed to the second. The practice of erecting a chart for that instant and reading it as governing the following year is an interpretive convention, not a consequence of the astronomy - nothing in the return itself makes the subsequent twelve months its jurisdiction. The convention's internal disputes make the point: sources differ on whether to cast for the birthplace or the current location, and on whether to correct for precession, and each choice moves the angles by degrees or hours while leaving the astronomy untouched.",
    energies: ["annual recurrence", "the year's frame", "the returned degree"],
    tensions: ["a real recurrence against an assigned jurisdiction", "birthplace against present location", "the return figure against the natal figure"],
    attributions: [
      { lineage: "Persian and Arabic", claim: "The revolution of the years of nativities is read together with the profection and the lord of the year, and is subordinate to the nativity." },
      { lineage: "Renaissance", claim: "The revolution chart is judged against the radix, with the natal promise setting the limit of what the revolution can signify." },
      { lineage: "Modern", claim: "The return chart is often read as a self-sufficient figure for the year, a practice the older sources do not support." }
    ],
    correspondences: ["period: approximately 365.2422 days", "drift: about six hours later each year", "companion techniques: annual profection, lord of the year"],
    contested: [
      "Sources disagree on whether the return chart is cast for the birthplace or for the location occupied at the moment of return.",
      "Precessed and non-precessed solar returns are both in use and give different charts; there is no settled resolution.",
      "Sources disagree on whether the return figure can signify anything the natal chart does not already promise."
    ],
    prompts: [
      "Cast for the birthplace or for the present location - which convention governs this working, and what changes on the angles between the two?",
      "Which natal planet falls on an angle of the return chart, and does it hold dignity in either figure?",
      "Does this working read the return as subordinate to the nativity, or as a chart in its own right?"
    ]
  },

  lunarReturn: {
    plain: "The lunar return is the moment the transiting Moon regains its natal longitude. The sidereal month runs to about 27.32 days, so the return recurs about thirteen times in a year.",
    reading: "In the same Persian and Arabic tradition that produced the solar revolution, the lunar return functions as a subordinate revolution: a shorter frame nested inside the annual one, read for the interval until the next return rather than for the year. Hellenistic doctrine gives the Moon the body, the incarnate and changeable part, and Ptolemy's ordering of the ages of life assigns the Moon the first and shortest age. The monthly figure has accordingly been read as the finer-grained of the two returns rather than the weightier.",
    principle: "The Moon travels roughly thirteen degrees a day, which makes the lunar return the most timing-sensitive of the standard return charts: a birth time in error by four minutes moves the natal lunar longitude by about two arcminutes, and the return moment by roughly an hour, which is enough to shift the return ascendant by fifteen degrees or more. The same convention caveat applies as to the solar return - the recurrence is astronomical, the jurisdiction assigned to it is not - but the sensitivity means the lunar return also carries a practical warning about rectification. A chart this responsive to the birth time cannot be read confidently on an approximate one.",
    energies: ["monthly recurrence", "the finer measure", "the incarnate part", "rapid angles"],
    tensions: ["precision against reliability", "the short frame against the long one"],
    attributions: [
      { lineage: "Persian and Arabic", claim: "The lunar revolution is a subordinate frame nested inside the solar revolution." },
      { lineage: "Hellenistic", claim: "The Moon signifies the body and the changeable, and is nocturnal in sect." },
      { lineage: "Ptolemaic", claim: "The Tetrabiblos assigns the Moon the first and shortest of the ages of life." }
    ],
    correspondences: ["period: approximately 27.32 days", "about 13 returns per year", "metal: silver", "day: Monday"],
    contested: [
      "Sources disagree on whether lunar returns carry independent signification or only refine the solar return already in force.",
      "As with the solar return, birthplace and current location are both in use and give different angles."
    ],
    prompts: [
      "How firm is the birth time behind this chart, and does the lunar return survive a fifteen-minute error?",
      "Does this return fall in the same house of the natal chart as the last one, or has it moved?"
    ]
  },

  marsReturn: {
    plain: "Mars completes a circuit of the zodiac in about 1.88 years, roughly 687 days. The Mars return therefore recurs a little under every two years, and Mars retrogrades for about two to three months in each synodic cycle of roughly 780 days.",
    reading: "Hellenistic astrology names Mars the lesser malefic, hot and dry, nocturnal in sect, and the significator of cutting, separation and force. The return has been read chiefly as a marker for the renewal of whatever Mars signifies in the natal figure by house and rulership, rather than as a general indicator. Because the period is close to two years but not equal to it, the return walks steadily round the calendar rather than settling on a season.",
    principle: "Mars is the innermost of the superior planets and the first whose retrograde loops were visible enough to demand explanation, and its synodic period of about 780 days sets the rhythm at which those loops recur. Traditional doctrine treats a retrograde Mars quite differently from a direct one, so a return that falls during a retrograde passage is read under different rules from one that does not - a case where the astronomy genuinely constrains the interpretation rather than merely supplying an anchor. The distinction between the sidereal period, which sets the return, and the synodic period, which sets the retrograde, is worth keeping separate in any working.",
    energies: ["cutting", "separation", "impetus", "heat", "the renewed edge"],
    tensions: ["force against measure", "direct motion against retrograde", "the two-year step against the calendar year"],
    attributions: [
      { lineage: "Hellenistic", claim: "Mars is the lesser malefic, hot and dry, and nocturnal in sect, so its condition is judged partly by whether the chart is diurnal or nocturnal." },
      { lineage: "Vedic", claim: "Mangala or Kuja signifies energy, siblings and land, and its affliction is treated as a distinct condition with its own remedies." }
    ],
    correspondences: ["sidereal period: approximately 1.88 years", "synodic period: approximately 780 days", "metal: iron", "day: Tuesday"],
    contested: [
      "Sources disagree on whether a retrograde return should be dated to the first crossing of the natal degree or to the final direct one."
    ],
    prompts: [
      "Is the return direct or retrograde, and does the working read the two differently?",
      "Which houses does Mars rule in this chart, and does the return touch either of them?"
    ]
  },

  uranusOpposition: {
    plain: "Uranus takes about eighty-four years to circle the zodiac. The Uranus opposition is the period in which transiting Uranus stands opposite the degree it held at birth, half an orbit on, which falls near age forty-two. The squares fall near ages twenty-one and sixty-three, and the return near eighty-four.",
    reading: "Uranus was identified as a planet in 1781, so it has no place in any tradition older than that, and every attribution it carries was assigned afterwards. Nineteenth and twentieth-century astrology gave it disruption, sudden reversal, independence and the breaking of settled form, largely by association with the political and industrial upheavals contemporaneous with its discovery. The opposition has been read alongside the mid-life literature of twentieth-century psychology, which is a borrowing from outside astrology rather than a development within it.",
    principle: "Uranus's orbit is nearly circular, with low eccentricity, so unlike the outer bodies with eccentric orbits it moves through the signs at a fairly even pace and its opposition falls at close to the same age for everyone. That uniformity is itself worth noting: a cycle that reaches the same angle at the same age in every chart cannot distinguish one chart from another, and whatever it signifies must be generational or common rather than particular. Any weight the opposition carries in a specific reading has to come from what natal factors sit on the axis it crosses, not from the transit alone.",
    energies: ["reversal", "severance from precedent", "the broken pattern", "sudden difference"],
    tensions: ["the assigned meaning against the absent lineage", "a generational marker read as a personal one"],
    attributions: [
      { lineage: "Modern", claim: "Uranus signifies disruption, independence and the breaking of established form; the attribution dates from after the 1781 identification." },
      { lineage: "Traditional", claim: "Traditional astrology has no Uranus and assigns Aquarius to Saturn; practitioners working in that lineage often exclude the body entirely." }
    ],
    correspondences: ["period: approximately 84 years", "opposition near age 42", "squares near ages 21 and 63", "return near age 84"],
    contested: [
      "Sources disagree on whether the outer planets carry sign rulership at all; Aquarius is assigned to Uranus in modern practice and to Saturn in traditional practice.",
      "Because the opposition falls at nearly the same age in every chart, sources disagree on whether it signifies individually or only marks a shared stage."
    ],
    prompts: [
      "Which natal factors sit on the axis the transiting opposition now occupies?",
      "Does this working admit the outer planets as rulers, or only as transiting significators?"
    ]
  },

  neptuneSquare: {
    plain: "Neptune takes about 164.8 years to circle the zodiac, so it never returns to its natal degree within a life. The square from transiting Neptune to its natal place - a quarter of the orbit - falls near age forty-one, and the opposition would fall near eighty-two.",
    reading: "Neptune was identified in 1846, and like Uranus it carries only assigned meanings. Modern astrology gives it dissolution, the sea, the boundary that will not hold, imagination and the unfocused, largely by way of its mythological namesake rather than by any observational or traditional route. The square has been read as the point at which the natal Neptune placement is met at right angles, and the reading in practice is generally structural: it names the houses put under stress by the transit rather than any content.",
    principle: "For any body whose period exceeds a human lifetime, the only aspects available to the natal position are the fractional ones - the sextile, square and trine of the orbit - and the age at which each falls is fixed by the orbital period alone. That means these markers are close to universal, varying by only a year or two across birth dates, and they are therefore better understood as a shared cadence than as a personal signature. Attribution to the mythological Neptune, made in the nineteenth century for a planet named by convention rather than by observation of its qualities, is a case worth watching: the name was chosen first and the significations were derived from it.",
    energies: ["dissolution", "diffusion", "the failing boundary", "the unbounded"],
    tensions: ["a name-derived attribution against an observed one", "the shared cadence against the particular chart"],
    attributions: [
      { lineage: "Modern", claim: "Neptune signifies dissolution, imagination and the loss of definition; assigned after the 1846 identification." },
      { lineage: "Traditional", claim: "Traditional astrology assigns Pisces to Jupiter and does not admit Neptune." }
    ],
    correspondences: ["period: approximately 164.8 years", "square near age 41", "sextile near age 27", "trine near age 55"],
    contested: [
      "Sources disagree on whether significations derived from a planet's assigned mythological name have any standing.",
      "Pisces is assigned to Neptune in modern practice and to Jupiter in traditional practice."
    ],
    prompts: [
      "Which houses are placed under the square, and does either hold a natal significator?"
    ]
  },

  plutoSquare: {
    plain: "Pluto's orbit runs to about 248 years and is strongly eccentric, so the body crosses some signs in a little over a decade and others in more than thirty years. The square from transiting Pluto to its natal degree therefore falls at an age that differs sharply between birth years, rather than at a fixed point as with Uranus or Neptune.",
    reading: "Pluto was identified in 1930 and reclassified as a dwarf planet in 2006, and astrological practice has not settled on what the reclassification means for its use. Modern astrology attributes to it depth, compulsion, the buried and the irreversible, again largely through the mythological name. The square is read as the transit that meets the natal placement at right angles, and because its timing varies so widely with birth era, it is one of the few outer-planet markers that does distinguish between generations rather than uniting them.",
    principle: "The eccentricity is the whole of the interest here. A near-circular orbit produces a uniform cadence and a marker that falls at the same age for everyone; a strongly eccentric one produces a marker whose age varies by decades depending on where in the orbit the natal position sat. Charts from eras when Pluto was near perihelion reach the square far earlier than charts from eras when it was near aphelion. Whatever is attributed to the square, the variation is a real consequence of orbital mechanics and not an interpretive choice, and it is one of the few places where the astronomy alone produces genuine differentiation between charts.",
    energies: ["depth", "compulsion", "the buried", "irreversibility"],
    tensions: ["the uniform reading against the uneven orbit", "a signification derived from a name", "planetary status against dwarf-planet status"],
    attributions: [
      { lineage: "Modern", claim: "Pluto signifies depth, compulsion and irreversible change; assigned after the 1930 identification." },
      { lineage: "Traditional", claim: "Scorpio is assigned to Mars, and traditional practice does not admit Pluto." }
    ],
    correspondences: ["period: approximately 248 years", "orbit strongly eccentric", "age at square varies widely by birth era"],
    contested: [
      "Sources disagree on whether the 2006 reclassification affects astrological use at all.",
      "Scorpio is assigned to Pluto in modern practice and to Mars in traditional practice.",
      "Sources disagree on whether the widely varying age at the square makes it a generational marker or a personal one."
    ],
    prompts: [
      "At what age does the square actually fall for this chart, and how far is that from the figure quoted in general references?",
      "Where in its orbit was Pluto at the time of birth - near perihelion, near aphelion, or between?"
    ]
  },

  chironReturn: {
    plain: "Chiron orbits the Sun in about 50.4 years on a markedly eccentric path that crosses inside Saturn's orbit at perihelion and reaches out towards Uranus at aphelion. The Chiron return therefore falls near age fifty, though the exact age varies with the sign Chiron held at birth.",
    reading: "Chiron was identified in 1977 and named for the centaur of Greek myth, the teacher who was himself wounded and could not heal the wound. Modern astrology took the myth almost directly as the signification, and reads the placement as the wound that instructs. The attribution is recent, explicit about its mythological source, and has no lineage before the discovery, which practitioners working in traditional frames generally take as reason to exclude it.",
    principle: "The eccentricity has a direct consequence for the return: because Chiron moves quickly through the signs near perihelion and slowly through those near aphelion, the age at which the return arrives is not the same for every chart, and the return is one of the few outer markers whose timing is genuinely individual. The body's classification is also unsettled - first catalogued among the minor planets, later recognised as the first of the centaurs, and it has shown cometary activity, so it holds both an asteroid and a comet designation. An object that will not stay in one category is a useful test of how much a working depends on category in the first place.",
    energies: ["the instructing wound", "the teacher who cannot self-treat", "the bridge between the visible and the outer"],
    tensions: ["a myth-derived attribution against a lineage", "asteroid against comet against centaur", "the healer against the unhealed"],
    attributions: [
      { lineage: "Modern", claim: "Chiron signifies the wound that teaches; assigned directly from the myth after the 1977 identification." },
      { lineage: "Traditional", claim: "Traditional practice excludes bodies without ancient standing and does not use Chiron." }
    ],
    correspondences: ["period: approximately 50.4 years", "orbit crosses inside Saturn's at perihelion", "return near age 50, varying by natal sign", "classed as centaur, with comet and minor-planet designations"],
    contested: [
      "Sources disagree on whether Chiron carries sign rulership; both Virgo and Sagittarius have been claimed, and neither claim is settled.",
      "Sources disagree on whether the wound-and-healing attribution is anything more than a direct reading of the myth.",
      "Because the orbit is eccentric, general references quoting a fixed age for the return are approximating; the actual age varies."
    ],
    prompts: [
      "At what age does the return actually fall for this chart, given the sign Chiron held at birth?",
      "Does this working admit minor bodies as significators, and if so on what grounds?"
    ]
  },

  metonicReturn: {
    plain: "Nineteen tropical years run to almost exactly 235 synodic months, a coincidence close enough that after nineteen years the Moon returns to nearly the same phase on nearly the same calendar date, and to nearly the same zodiacal degree. The Metonic return therefore falls near ages nineteen, thirty-eight, fifty-seven and seventy-six.",
    reading: "The cycle is named for Meton of Athens, who set it out in the fifth century BC, though Babylonian astronomers were already using the same nineteen-year intercalation to keep lunar months aligned to the solar year. The Hebrew calendar's nineteen-year leap cycle rests on it, and so does the computus by which the date of Easter is reckoned. Astrologically the return is read as the point at which the natal Sun-Moon relation - the phase itself, not just the two positions - recurs, which is a stricter condition than either luminary returning alone.",
    principle: "This is a resonance rather than a period: nothing orbits in nineteen years, and the cycle exists only because two independent periods happen to fall into a near-whole-number ratio. Nineteen tropical years exceed 235 synodic months by roughly two hours, so the alignment slips by about a day every two and a half centuries and the cycle is accurate but not exact. Every calendar built on it has needed correction eventually, which is the general fate of symbolic structures resting on approximate commensurability - the ratio holds long enough to be believed and not long enough to be true.",
    energies: ["resonance", "commensurability", "the recurring phase", "calendrical closure"],
    tensions: ["an approximate ratio held as an exact one", "the solar count against the lunar count"],
    attributions: [
      { lineage: "Babylonian", claim: "Nineteen-year intercalation was used to keep the lunar month aligned to the solar year." },
      { lineage: "Greek", claim: "Meton of Athens set out the nineteen-year cycle in the fifth century BC." },
      { lineage: "Hebrew calendrical", claim: "The nineteen-year leap cycle governs the placement of the intercalary month." },
      { lineage: "Christian computus", claim: "The reckoning of Easter rests on the nineteen-year lunar cycle." }
    ],
    correspondences: ["19 tropical years is approximately 235 synodic months", "return near ages 19, 38, 57, 76", "slippage: roughly a day every two and a half centuries"],
    contested: [
      "Sources disagree on whether the Metonic return has any astrological signification distinct from the separate solar and lunar returns that coincide within it."
    ],
    prompts: [
      "Does the natal lunar phase recur exactly at this return, or has the slippage moved it?",
      "Which is being read here - the phase relation, or the two luminaries taken separately?"
    ]
  },

  greatConjunction: {
    plain: "Jupiter and Saturn conjoin about every 19.86 years. Each successive conjunction falls roughly 243 degrees further round the zodiac than the last, so consecutive conjunctions cluster within one triplicity of signs for around two centuries before the series shifts to the next.",
    reading: "Persian and Arabic historical astrology built an entire doctrine of ages on this cycle: the conjunction itself marked the smaller period, the shift from one triplicity to the next the middle period, and the return of the series to the fiery triplicity the great period, and these were used to date the rise and fall of dynasties and religions. The doctrine reached Latin Europe through translation and remained a standard tool of mundane astrology through the Renaissance. Kepler's diagram of the successive conjunctions tracing a rotating triangle around the zodiac is the best-known visual statement of the pattern.",
    principle: "The 243-degree step is the ordinary consequence of two orbital periods in a near ratio: Jupiter gains a full lap on Saturn in just under twenty years, and the point at which it does so advances by a fixed amount each time. The near-trine spacing is what generates the triplicity clustering, and the fact that the step is not exactly 240 degrees is what eventually forces the series out of one triplicity and into the next. This is a mundane cycle rather than a natal one, and the older sources are clear about that distinction - the great conjunctions were read for kingdoms and eras, and applying them to an individual nativity is a modern extension rather than a traditional use.",
    energies: ["the mundane hinge", "era and dynasty", "the rotating triangle", "elemental series"],
    tensions: ["expansion against limitation", "the mundane frame against the natal one", "a near ratio against an exact one"],
    attributions: [
      { lineage: "Persian and Arabic", claim: "Conjunctionist doctrine dates the smaller, middle and great periods by the Jupiter-Saturn cycle and its triplicity shifts." },
      { lineage: "Medieval Latin", claim: "The great conjunctions are the primary instrument of mundane astrology, read for kingdoms and religions rather than for individuals." },
      { lineage: "Renaissance astronomical", claim: "Kepler diagrammed the successive conjunctions as a rotating triangle inscribed in the zodiac." }
    ],
    correspondences: ["period: approximately 19.86 years", "step: approximately 243 degrees per conjunction", "triplicity series: roughly two centuries", "traditionally a mundane rather than a natal cycle"],
    contested: [
      "Sources disagree on whether the great conjunction has any bearing on an individual nativity, or belongs strictly to mundane astrology.",
      "The date at which a conjunction series is said to have shifted triplicity depends on whether tropical or sidereal signs are used, and the two give different answers."
    ],
    prompts: [
      "Is this being read as a mundane cycle or applied to a nativity, and does the source support that use?",
      "Which triplicity does the current conjunction series occupy under the zodiac this working uses?"
    ]
  },

  venusPentagram: {
    plain: "Venus and the Earth return to nearly the same relative positions every eight years: five Venus synodic periods of about 584 days fall just short of eight tropical years. Successive inferior conjunctions of Venus therefore fall at five points spaced roughly evenly round the zodiac, tracing a five-pointed figure that rotates slowly as the small shortfall accumulates.",
    reading: "The Venus tablet of Ammisaduqa records observations of the risings and settings of Venus and is among the oldest surviving astronomical records of any planet. The Dresden Codex preserves a Mesoamerican Venus table built on the 584-day count and correlated with the ritual calendar. Modern esoteric writing has associated the five-point figure with the pentagram and with the rose, a correspondence that reads a genuine geometrical pattern through a symbolic vocabulary developed independently of it.",
    principle: "The figure is real and observable: anyone recording the zodiacal position of each inferior conjunction over four decades will draw it. What it is not is exact - the five synodic periods fall about two days short of eight years, so each figure is rotated slightly from the last and the pattern precesses rather than closing. This is the same structural situation as the Metonic cycle, and it carries the same caution: the near-commensurability is close enough to look like design and loose enough that any claim of perfect closure is describing an idealisation rather than the sky.",
    energies: ["the five-point figure", "morning star and evening star", "the near-closed pattern"],
    tensions: ["an approximate figure taken as an exact one", "an observed geometry against an imported symbol"],
    attributions: [
      { lineage: "Babylonian", claim: "The Venus tablet of Ammisaduqa records the risings and settings of Venus as omen material." },
      { lineage: "Mesoamerican", claim: "The Dresden Codex Venus table counts the 584-day period and correlates it with the ritual calendar." },
      { lineage: "Modern esoteric", claim: "The five-point figure traced by the inferior conjunctions is identified with the pentagram and the rose." }
    ],
    correspondences: ["synodic period: approximately 584 days", "five synodic periods is approximately 8 tropical years", "shortfall: about two days per figure", "metal: copper", "day: Friday"],
    contested: [
      "Sources disagree on whether the pentagram association is an ancient correspondence or a modern reading projected onto the pattern.",
      "Morning-star and evening-star phases of Venus were treated as distinct powers in several traditions and as one body in others."
    ],
    prompts: [
      "Was Venus a morning star or an evening star at the time of this chart, and does the working distinguish the two?",
      "Where do the five conjunction points fall in this chart, and does any of them sit on a natal significator?"
    ]
  }

};

export function getCycleSymbolism(id) {
  return CYCLE_SYMBOLISM[id] || null;
}
