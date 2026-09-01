// ════════════════════════════════════════════════════════════════════
// Mansion Symbolism — the twenty-eight lunar stations, depth records
//
// One record per index 1-28, keyed to the app's MANSION_CROSSWALK in
// src/data/calendar/lunarMansions.js. Each record names the Arabic
// manzil and its determining star, the nakshatra and the Chinese xiu
// that the crosswalk places at the same ordinal position, and what
// each tradition has attributed to that station.
//
// Structural warning carried on every record: the crosswalk pairs three
// different 28-fold systems BY INDEX. The manazil are approximately
// equal segments of about 12 degrees 51 minutes 26 seconds; the 28-fold
// nakshatra scheme uses equal segments of 13 degrees 20 minutes, with
// Abhijit inserted as a 28th; the Chinese xiu are unequal and fixed by
// their reference stars. An index match is a convenience of tabulation.
// It is not an equivalence.
// ════════════════════════════════════════════════════════════════════

export const MANSION_SYMBOLISM = {
  1: {
    plain: "The first station. In the Arabic manazil it is Ash-Sharatain, the Two Signs, determined by Beta Arietis (Sheratan) at the head of the Ram, opening at 0°0' Aries in this table. At the same index the crosswalk sets the nakshatra Ashvini and the Chinese xiu Jiao, the Horn.",
    reading: "The manazil tradition treats this as the station of opening, and Agrippa's list of the twenty-eight mansions attaches to it the buying of cattle, the planting of seed and the taking of voyages, together with discords and journeys. Ashvini carries the twin horse-riders, the Ashvins, physicians of the gods, ruled by Ketu, its symbol the horse's head. Jiao is the Horn of the Azure Dragon of the East and stands at the head of the spring quadrant.",
    principle: "Three traditions each begin a cycle here, but they do not begin it in the same sky. Ash-Sharatain and Ashvini both take their determining stars from the head of Aries, so the first index is one of the places where manzil and nakshatra genuinely coincide. Jiao does not: its determinant is Spica in Virgo, and in the tables this application carries, the xiu whose star matches a given manzil sits about thirteen index positions away. The first mansion is therefore a real convergence of two systems and a tabular accident of the third.",
    energies: ["opening", "the first cut", "swift departure", "the physician's arrival"],
    tensions: ["discord", "motion without arrival", "a beginning that will not settle"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Ash-Sharatain, the Two Signs, marked by Sheratan and Mesarthim at the Ram's horn." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Names the mansion angel Geniel and lists the station as causing discords and journeys." },
      { lineage: "Vedic jyotisha", claim: "Ashvini, ruled by Ketu, deity the Ashvin twins, the first of the twenty-seven." },
      { lineage: "Chinese xiu", claim: "Jiao, the Horn, first station of the Azure Dragon of the East." },
      { lineage: "Islamic letter sciences", claim: "The station carries alif, first of the twenty-eight Arabic letters, abjad value 1." }
    ],
    correspondences: ["letter: alif, abjad value 1", "Agrippa angel: Geniel", "nakshatra ruler: Ketu", "quadrant: Azure Dragon of the East, spring", "start degree in this table: 0°0' Aries"],
    contested: [
      "The crosswalk pairs manzil, nakshatra and xiu by ordinal index. The manazil are roughly equal twenty-eighths of about 12 degrees 51 minutes 26 seconds; the 28-fold nakshatra scheme uses equal segments of 13 degrees 20 minutes with Abhijit inserted as a 28th; the xiu are unequal and set by their reference stars. An index match is not an equivalence.",
      "Whether the manazil are read against the tropical or the sidereal zodiac is itself unsettled. The degree given here is tropical; medieval Arabic practice was largely sidereal, and the two drift apart."
    ],
    prompts: [
      "Does the working take the station from the degree of the ecliptic, or from the visible star at the Ram's horn?",
      "Where two systems agree on a determining star and the third does not, which one governs the reading?"
    ]
  },

  2: {
    plain: "The second station. Al-Butain, the Belly, determined by Delta Arietis (Botein) in the body of the Ram, from 12°51' Aries in this table. The crosswalk sets beside it the nakshatra Bharani and the xiu Kang, the Neck.",
    reading: "Agrippa's list gives this mansion to buying and selling while avoiding the sea, and to the finding of treasure and the holding of captives. Bharani is the Bearer, ruled by Venus, its deity Yama the lord of the dead and its symbol the yoni, the passage through which what is carried arrives. Kang is the Neck of the Azure Dragon, second of the spring stations.",
    principle: "Both the Arabic and the Vedic station here concern containment: a belly, a bearer. That agreement is suggestive but should not be taken as descent from a common source, since the resemblance is thin and the segments are of different length. Delta Arietis and the Bharani triad of 35, 39 and 41 Arietis lie close in the sky, so the two systems do overlap in fact at this index, which is not true of most of the twenty-eight.",
    energies: ["holding", "the hidden store", "what is carried before it is born"],
    tensions: ["confinement", "the treasure that must stay buried", "burden"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Butain, the Little Belly, from Botein in the Ram's body." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Enediel; helps the finding of treasures and the retaining of captives." },
      { lineage: "Vedic jyotisha", claim: "Bharani, ruled by Venus, deity Yama, symbol the yoni." },
      { lineage: "Chinese xiu", claim: "Kang, the Neck, second station of the Azure Dragon." }
    ],
    correspondences: ["letter: ba, abjad value 2", "Agrippa angel: Enediel", "nakshatra ruler: Venus", "quadrant: Azure Dragon of the East, spring"],
    contested: [
      "Index pairing is a tabular convenience. Equal manazil of about 12 degrees 51 minutes 26 seconds, equal nakshatras of 13 degrees 20 minutes, and unequal star-fixed xiu cannot be made to coincide by numbering them alike.",
      "Bharani is counted second in every nakshatra list, but the manazil boundary at this index falls short of the nakshatra boundary by roughly half a degree per station and the gap widens across the circle."
    ],
    prompts: [
      "What is being held here, and by whose reckoning is it not yet released?",
      "Does the resemblance between a belly and a bearer indicate a shared source, or two peoples looking at the same faint stars?"
    ]
  },

  3: {
    plain: "The third station. Ath-Thurayya, the Many Little Ones, determined by Eta Tauri (Alcyone) in the Pleiades, from 25°43' Aries. At this index stand the nakshatra Krittika, also the Pleiades, and the xiu Di, the Root.",
    reading: "Agrippa gives the mansion to planting and sowing but not to marriage or travel by water, and calls it profitable to sailors, hunters and alchemists. Krittika means to cut; its deity is Agni, its ruler the Sun, its symbol a blade. The Pleiades are among the most widely attested star groups in the world, and both traditions name them at the same index. Di is the Root of the Azure Dragon.",
    principle: "This is the strongest coincidence in the whole crosswalk: two independent systems place the Pleiades at station three. That is not evidence of borrowing so much as evidence that a compact, unmistakable cluster on the Moon's path will be marked by anyone who watches it. The Chinese also mark the Pleiades, as Mao, but at index eighteen, which is exactly the thirteen-station displacement that runs through these tables. The same stars, three numberings.",
    energies: ["the cutting edge", "many gathered as one", "fire that separates"],
    tensions: ["dispersal", "the flame that consumes what it clarifies", "the sea refused"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Ath-Thurayya, the Many Little Ones, the Pleiades." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Anixiel; profitable to sailors, huntsmen and alchemists." },
      { lineage: "Vedic jyotisha", claim: "Krittika, ruled by the Sun, deity Agni, the cutter and the flame." },
      { lineage: "Chinese xiu", claim: "The Pleiades are marked as Mao, the Hairy Head, at index eighteen and not here." }
    ],
    correspondences: ["letter: jim, abjad value 3", "Agrippa angel: Anixiel", "nakshatra ruler: the Sun", "quadrant: Azure Dragon of the East, spring"],
    contested: [
      "The three schemes divide the sky differently and the crosswalk pairs them by index alone. An index match is not an equivalence, and here the Chinese entry proves it: the same cluster is xiu eighteen, not xiu three.",
      "Whether Krittika once headed the nakshatra list, rather than Ashvini, is argued from the older Vedic orderings and is not settled."
    ],
    prompts: [
      "Which of the seven sisters is being taken as the determinant, and does the working require a single star or the cluster entire?",
      "If two traditions mark the same cluster at different index numbers, what does the index number actually record?"
    ]
  },

  4: {
    plain: "The fourth station. Ad-Dabaran, the Follower, determined by Alpha Tauri (Aldebaran), the red eye of the Bull, from 8°34' Taurus. The nakshatra Rohini stands at the same index, also on Aldebaran; the xiu is Fang, the Room.",
    reading: "Agrippa's list gives this mansion to business, travel, marriage and the taking of medicine, and also names it as causing destruction and hindrance to buildings, wells and mines, and as begetting discord. Rohini is the Radiant Maiden, ruled by the Moon, deity Prajapati, symbol the cart. Aldebaran is one of the four so-called royal stars of the Persian scheme, a designation of long standing and uncertain origin.",
    principle: "Manzil and nakshatra agree here on a single first-magnitude star, which makes the fourth index a place where the crosswalk is not merely notional. The Arabic name records observation directly: the Follower is the star that comes up behind the Pleiades. The Vedic name records relation instead, the beloved of the Moon. Fang, the Room, takes Pi Scorpii as its determinant and belongs to a different quarter of the sky altogether.",
    energies: ["the following light", "the red eye", "what is fixed and watched"],
    tensions: ["destruction of the built thing", "discord", "brilliance that draws attack"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Ad-Dabaran, the Follower, from Aldebaran, following the Pleiades in their rising." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Azariel; causes destruction and hindrance of buildings, fountains, wells and mines, and begets discord." },
      { lineage: "Vedic jyotisha", claim: "Rohini, ruled by the Moon, deity Prajapati, the Moon's most favoured station." },
      { lineage: "Persian royal stars", claim: "Aldebaran counted among the four watchers of the heavens; the antiquity of the scheme is disputed." }
    ],
    correspondences: ["letter: dal, abjad value 4", "Agrippa angel: Azariel", "nakshatra ruler: the Moon", "quadrant: Azure Dragon of the East, spring"],
    contested: [
      "The crosswalk pairs three unlike divisions by ordinal number. Manazil of about 12 degrees 51 minutes 26 seconds, nakshatras of 13 degrees 20 minutes, and unequal star-fixed xiu do not align; an index match is not an equivalence.",
      "The Arabic sources give this station strongly destructive attributions while the Vedic sources give Rohini the most favourable of all lunar placements. The two readings of the same star contradict each other and neither yields."
    ],
    prompts: [
      "One star, two traditions, opposite verdicts. Which lineage is the working actually standing in?",
      "Does the redness of Aldebaran carry into the reading, or is it the position on the ecliptic that governs?"
    ]
  },

  5: {
    plain: "The fifth station. Al-Haq'ah, a White Spot, determined by Lambda Orionis (Meissa) at the head of Orion, from 21°26' Taurus. At the same index the crosswalk sets the nakshatra Mrigashirsha, whose stars are Lambda and Phi Orionis, and the xiu Xin, the Heart.",
    reading: "Agrippa's list assigns to this mansion the beginning of war, and forbids sowing or the undertaking of any good; he also credits it with return from journeys, the instruction of scholars, building, health and goodwill. Mrigashirsha is the Deer's Head, ruled by Mars, deity Soma, and its symbol is the searching antelope. Xin is the Heart of the Azure Dragon, determined by Antares.",
    principle: "Manzil and nakshatra take the same stars at this index, both reading the small triangle at Orion's head, one as a white mark and the other as a deer's head. The convergence is real. The Chinese Heart is not: its star is Antares, which the Arabic system places at station eighteen. Note that Agrippa's entry contradicts itself within a single line, offering both war and goodwill, which is what happens when a Latin compiler stacks several Arabic sources without reconciling them.",
    energies: ["the white mark", "the seeking head", "the scholar's instruction"],
    tensions: ["war begun", "nothing good undertaken", "restlessness"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Haq'ah, the white spot, from the small group at Orion's head." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Gabriel; helps return from journeys and the instruction of scholars, yet the station is given to beginning war." },
      { lineage: "Vedic jyotisha", claim: "Mrigashirsha, ruled by Mars, deity Soma, the deer's head, the station of searching." },
      { lineage: "Chinese xiu", claim: "Xin, the Heart, determined by Antares, fifth of the Azure Dragon." }
    ],
    correspondences: ["letter: ha, abjad value 5", "Agrippa angel: Gabriel", "nakshatra ruler: Mars", "quadrant: Azure Dragon of the East, spring"],
    contested: [
      "Index pairing across the three schemes is a convenience of tabulation. Equal manazil, equal nakshatras of a different width, and unequal star-fixed xiu cannot be equated by their ordinal number.",
      "Agrippa's attributions for this station pull in two directions at once, and the Latin tradition never resolves them."
    ],
    prompts: [
      "When a single received text gives contrary attributions, is the right move to choose, or to keep both and watch which one answers?",
      "Is the deer's head and the white spot the same observation named twice, or two observations that happen to fall together?"
    ]
  },

  6: {
    plain: "The sixth station. Al-Han'ah, a Brand or Mark, determined by Gamma Geminorum (Alhena) in the foot of the Twins, from 4°17' Gemini. The crosswalk sets here the nakshatra Ardra and the xiu Wei, the Tail.",
    reading: "Agrippa gives this mansion to ploughing and sowing but not to travel, and names it favourable for hunting, for besieging towns and for the revenge of princes, while it destroys harvests and hinders the physician. Ardra is the Moist One, ruled by Rahu, its deity Rudra the howler, its symbol a teardrop. Wei is the Tail of the Azure Dragon, determined by Mu Scorpii.",
    principle: "This index is one of the clearest places where the crosswalk parts company with the sky. The manzil takes Alhena in Gemini; Ardra takes Betelgeuse in Orion, well off the ecliptic and considerably to the west. Two systems that agreed at indices three, four and five now disagree, because equal segments of 12 degrees 51 minutes and equal segments of 13 degrees 20 minutes accumulate a drift, and because the nakshatras reach off the ecliptic for their determinants while the manazil largely do not.",
    energies: ["the brand", "the storm before rain", "the hunt"],
    tensions: ["the harvest destroyed", "grief", "the physician hindered"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Han'ah, the brand or camel-mark, from Alhena." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Dirachiel; favourable for hunting and for the besieging of towns, destroys harvests." },
      { lineage: "Vedic jyotisha", claim: "Ardra, ruled by Rahu, deity Rudra, the moist one, the tear." },
      { lineage: "Chinese xiu", claim: "Wei, the Tail, sixth station of the Azure Dragon." }
    ],
    correspondences: ["letter: waw, abjad value 6", "Agrippa angel: Dirachiel", "nakshatra ruler: Rahu", "quadrant: Azure Dragon of the East, spring"],
    contested: [
      "The three systems are paired here by index alone. At this index the determining stars are genuinely far apart: Alhena in Gemini for the manzil, Betelgeuse in Orion for the nakshatra, Mu Scorpii for the xiu. An index match is not an equivalence, and this record is one of the plainest demonstrations of that.",
      "Whether Ardra's determinant is Betelgeuse or a fainter star nearer the ecliptic is argued among jyotisha commentators."
    ],
    prompts: [
      "Three determining stars in three constellations at one index. What, if anything, is shared besides the number six?",
      "Does a station reach off the ecliptic for its star, or must the determinant lie on the Moon's own road?"
    ]
  },

  7: {
    plain: "The seventh station. Adh-Dhira, the Forearm, determined by Alpha Geminorum (Castor), from 17°9' Gemini. At the same index stand the nakshatra Punarvasu, whose stars are Castor and Pollux, and the xiu Ji, the Winnowing Basket.",
    reading: "Agrippa's list gives the mansion to travel and to the taking of medicine, and calls it favourable for gain, for friendship and for lovers, while it destroys magistracies. Punarvasu means the return of the light, ruled by Jupiter, deity Aditi the boundless mother, symbol the bow and quiver. Ji is the Winnowing Basket, last of the seven Azure Dragon stations.",
    principle: "Manzil and nakshatra agree again here, both taking the heads of the Twins. The Arabic reads the pair as an outstretched forearm of the lion figure that Arabian star-lore laid across this part of the sky, a figure much larger than the Greek Leo. The Vedic reads the same pair as a return, a second dwelling. The two names record different constellation frameworks over identical stars, which is the ordinary condition of this material.",
    energies: ["return", "the outstretched arm", "restoration of what was given"],
    tensions: ["office lost", "the arm that reaches too far", "repetition"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Adh-Dhira, the forearm of the great lion figure of Arabian star-lore, from Castor and Pollux." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Scheliel; favourable for gain, friendship and lovers, destroys magistracies." },
      { lineage: "Vedic jyotisha", claim: "Punarvasu, ruled by Jupiter, deity Aditi, the return of the light." },
      { lineage: "Chinese xiu", claim: "Ji, the Winnowing Basket, seventh and last station of the Azure Dragon." }
    ],
    correspondences: ["letter: zayn, abjad value 7", "Agrippa angel: Scheliel", "nakshatra ruler: Jupiter", "quadrant: Azure Dragon of the East, spring"],
    contested: [
      "Ordinal pairing across the three schemes does not make them one system. Equal manazil of about 12 degrees 51 minutes 26 seconds, equal nakshatras of 13 degrees 20 minutes, and unequal star-fixed xiu remain three divisions of one sky.",
      "The great Arabian lion, of which this station is the forearm, spans a stretch of sky that no Greek or Latin constellation matches, so the Arabic mansion names cannot be read through the Ptolemaic figures without loss."
    ],
    prompts: [
      "Which constellation framework is the working using to name this place, and does the choice change the reading?",
      "If the station is a return, what is it that returns, and by whose account?"
    ]
  },

  8: {
    plain: "The eighth station. An-Nathrah, the Gap or the Crib, determined by the cluster M44 in Cancer, the Praesepe or Beehive, at 0°0' Cancer. Beside it the crosswalk sets the nakshatra Pushya, whose stars are Gamma, Delta and Theta Cancri, and the xiu Dou, the Southern Dipper.",
    reading: "Agrippa gives this mansion to navigation, and names it as causing love, friendship and the fellowship of travellers, driving away mice and afflicting captives. Pushya is the Nourisher, ruled by Saturn, deity Brihaspati, its symbol the cow's udder and the lotus, and much of the jyotisha tradition counts it the most auspicious of the twenty-seven. Dou opens the winter quadrant of the Black Tortoise of the North.",
    principle: "Manzil and nakshatra again share their sky, both centred on the Praesepe cluster and the two asses flanking it. The Arabic sees a gap or a nose, a hazy place; the Vedic sees a udder, something that gives. Both readings begin from the same visual fact, a soft patch rather than a point, and both make nourishment or passage of it. The xiu at this index belongs to Sagittarius and to a different season entirely.",
    energies: ["nourishment", "the soft cluster", "fellowship on the road"],
    tensions: ["the captive afflicted", "haze where a point was wanted", "dependency"],
    attributions: [
      { lineage: "Arabic manazil", claim: "An-Nathrah, the gap, from the Praesepe cluster." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Amnediel; causes love, friendship and the society of fellow travellers." },
      { lineage: "Vedic jyotisha", claim: "Pushya, ruled by Saturn, deity Brihaspati, widely held the most benefic nakshatra." },
      { lineage: "Chinese xiu", claim: "Dou, the Southern Dipper, first station of the Black Tortoise of the North." }
    ],
    correspondences: ["letter: ha (the eighth letter), abjad value 8", "Agrippa angel: Amnediel", "nakshatra ruler: Saturn", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "The crosswalk pairs three unlike divisions by index. An index match is not an equivalence: here the Chinese station opens a winter quadrant in Sagittarius while the Arabic and Vedic stations sit in Cancer.",
      "Saturn as ruler of the most auspicious nakshatra is a tension the jyotisha commentaries handle in several incompatible ways."
    ],
    prompts: [
      "A hazy cluster read as a gap by one tradition and as a source of milk by another. Which reading does the working need?",
      "What is the difference, in practice, between a station named for absence and a station named for supply?"
    ]
  },

  9: {
    plain: "The ninth station. At-Tarf, the Glance of the Lion's Eye, determined by Lambda Leonis (Alterf), from 12°51' Cancer. At the same index the crosswalk sets the nakshatra Ashlesha, whose stars are in Hydra, and the xiu Niu, the Ox.",
    reading: "Agrippa's list gives the mansion to planting, building and marriage but not to travel, and names it as hindering harvests and travellers and causing discord. Ashlesha is the Embrace, ruled by Mercury, its deity the Nagas, its symbol the coiled serpent. Niu is the Ox of the Black Tortoise, determined by Beta Capricorni.",
    principle: "The Arabic station is a glance and the Vedic station is a coil: one is a gaze that fixes, the other a grip that will not release. The determining stars are near neighbours but not the same, Lambda Leonis for the manzil and the Hydra group for Ashlesha, so this index is a partial overlap rather than a match. That partial condition is the normal case across the twenty-eight, and it is worth naming as such rather than smoothing over.",
    energies: ["the fixing glance", "the coil", "what is held by looking"],
    tensions: ["the traveller hindered", "venom", "discord"],
    attributions: [
      { lineage: "Arabic manazil", claim: "At-Tarf, the glance, the eye of the great Arabian lion." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Barbiel; hinders harvest and travellers, causes discord." },
      { lineage: "Vedic jyotisha", claim: "Ashlesha, ruled by Mercury, deity the Nagas, the serpent's embrace." },
      { lineage: "Chinese xiu", claim: "Niu, the Ox, second station of the Black Tortoise of the North." }
    ],
    correspondences: ["letter: ta, abjad value 9", "Agrippa angel: Barbiel", "nakshatra ruler: Mercury", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "Three schemes, one index, three widths: about 12 degrees 51 minutes 26 seconds for the manzil, 13 degrees 20 minutes for the nakshatra, and no fixed width at all for the xiu. Pairing by number is not correspondence.",
      "Ashlesha's determinants are placed in Hydra by most jyotisha sources, which puts them south of the ecliptic and outside the band the manazil use."
    ],
    prompts: [
      "Is a glance and a coil the same gesture at different speeds, or two unrelated attributions that share a number?",
      "How near must two determining stars be before the traditions can be said to agree?"
    ]
  },

  10: {
    plain: "The tenth station. Al-Jab'hah, the Forehead, determined by Eta Leonis, from 25°43' Cancer. At the same index stand the nakshatra Magha, whose star is Regulus, and the xiu Nu, the Girl.",
    reading: "Agrippa gives this mansion to sowing, planting and the release of prisoners, and names it as strengthening buildings, promoting love and benevolence, and helping against enemies. Magha is the Mighty, ruled by Ketu, its deity the Pitrs or ancestral fathers, its symbol the royal throne. Nu, the Girl, belongs to the winter quadrant of the Black Tortoise.",
    principle: "The Arabic forehead and the Vedic throne both mark the same region at the front of the Lion, and both make it a place of rank: what is worn on the brow, what is sat upon. Regulus, the little king, has carried royal attribution in Babylonian, Persian and Greek material alike, which is one of the better-attested continuities in this whole body of star-lore. The manzil takes Eta Leonis rather than Regulus itself, so even here the two systems differ on the determinant while agreeing on the sense.",
    energies: ["the brow", "the throne", "the ancestral line"],
    tensions: ["rank claimed without ground", "the weight of the fathers", "enmity answered"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Jab'hah, the forehead of the lion." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Ardefiel; strengthens buildings, promotes love and benevolence." },
      { lineage: "Vedic jyotisha", claim: "Magha, ruled by Ketu, deity the Pitrs, symbol the royal throne, star Regulus." },
      { lineage: "Persian royal stars", claim: "Regulus counted among the four watchers; the scheme is widely repeated and its origin is disputed." }
    ],
    correspondences: ["letter: ya, abjad value 10", "Agrippa angel: Ardefiel", "nakshatra ruler: Ketu", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "The index pairing in this application places manzil, nakshatra and xiu side by side, but the three divisions of the sky are unequal in width and unequal in method. An index match is not an equivalence.",
      "The manzil is determined by Eta Leonis and the nakshatra by Regulus. The two are close but distinct, and sources differ on which star anchors the Arabic station."
    ],
    prompts: [
      "Royal attribution appears here in several unrelated traditions. Is that convergence, transmission, or the simple brightness of one star?",
      "Which is the determinant for the working at hand, the brow or the throne?"
    ]
  },

  11: {
    plain: "The eleventh station. Az-Zubrah, the Mane, determined by Delta Leonis (Zosma) on the Lion's back, from 8°34' Leo. Beside it the crosswalk sets the nakshatra Purva Phalguni, whose stars are Delta and Theta Leonis, and the xiu Xu, Emptiness.",
    reading: "Agrippa's list gives the mansion to planting and marriage but not to navigation, and calls it good for voyages, for gain by merchandise and for the redemption of captives. Purva Phalguni is the Former Reddish One, ruled by Venus, deity Bhaga the giver of fortune, its symbol the front legs of a bed or hammock. Xu, Emptiness, is the eleventh station of the Black Tortoise.",
    principle: "Manzil and nakshatra take the same two stars here, Delta and Theta Leonis, and this is a genuine overlap of determinant. The names diverge in kind: the Arabic is anatomical, naming the mane of the beast, while the Vedic is a paired station, the former of two, whose sense depends on the latter. Vedic astronomy repeatedly builds such pairs, which the manazil do not, and that structural difference matters more than the shared stars.",
    energies: ["the mane", "the fore-half of a pair", "gift and enjoyment"],
    tensions: ["a thing incomplete until its second half", "the sea refused", "indolence"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Az-Zubrah, the mane of the lion, from Zosma." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Neciel; good for voyages, gain by merchandise, redemption of captives." },
      { lineage: "Vedic jyotisha", claim: "Purva Phalguni, ruled by Venus, deity Bhaga, first of a paired station." },
      { lineage: "Chinese xiu", claim: "Xu, Emptiness, determined by Beta Aquarii, in the winter quadrant." }
    ],
    correspondences: ["letter: kaf, abjad value 20", "Agrippa angel: Neciel", "nakshatra ruler: Venus", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "Ordinal pairing is a convenience of this table. The manazil are approximately equal at about 12 degrees 51 minutes 26 seconds, the nakshatras equal at 13 degrees 20 minutes, and the xiu unequal and star-determined. An index match is not an equivalence.",
      "The paired structure of the Phalguni, Ashadha and Bhadrapada stations has no counterpart in the manazil, so any one-to-one mapping breaks the Vedic pairs apart."
    ],
    prompts: [
      "When a system pairs its stations and the parallel system does not, what happens to the pair under an index mapping?",
      "Is the mane a covering or an ornament in the reading being built?"
    ]
  },

  12: {
    plain: "The twelfth station. As-Sarfah, the Changer of the Weather, determined by Beta Leonis (Denebola) in the Lion's tail, from 21°26' Leo. At the same index stand the nakshatra Uttara Phalguni, also on Denebola, and the xiu Wei, the Rooftop.",
    reading: "Agrippa gives this mansion to travel, navigation, sowing, ploughing, marriage and the sending of messengers, and calls it prosperous for harvests but hindering to seamen. Uttara Phalguni is the Latter Reddish One, ruled by the Sun, deity Aryaman the patron of contracts and hospitality, its symbol the four legs of a bed. The Arabic name records that the star's heliacal setting marked a turn in the season.",
    principle: "Both systems take Denebola, so the twelfth index is another real convergence of determinant. The Arabic name is meteorological, a mark of when the weather changes; the Vedic name is contractual, the completion of a pair that began at index eleven. This is the difference between a calendar sign and a symbolic station, and both readings are attested for the same star. The Chinese Rooftop, on Alpha Aquarii, is thirteen positions away from the xiu that shares this star.",
    energies: ["the turn of the season", "completion of a pair", "the bond concluded"],
    tensions: ["weather that will not hold", "the seaman hindered", "a contract entered too fast"],
    attributions: [
      { lineage: "Arabic manazil", claim: "As-Sarfah, the changer, named because the setting of Denebola was taken to mark a shift in the weather." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Abdizuel; gives prosperity to harvest and plantations, hinders seamen." },
      { lineage: "Vedic jyotisha", claim: "Uttara Phalguni, ruled by the Sun, deity Aryaman, the latter of the paired station." },
      { lineage: "Chinese xiu", claim: "Wei, the Rooftop, twelfth station of the Black Tortoise of the North." }
    ],
    correspondences: ["letter: lam, abjad value 30", "Agrippa angel: Abdizuel", "nakshatra ruler: the Sun", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "The three 28-fold schemes are set beside one another here by index alone. Unequal Chinese xiu, equal manazil and equal but differently sized nakshatras cannot be equated by their numbering.",
      "A weather-marking name is tied to a latitude and an epoch. The seasonal sense of As-Sarfah does not travel with the star, and precession has moved the setting date since the name was given."
    ],
    prompts: [
      "Does a name derived from a season's turn still mean anything once the station is read as a fixed arc of the zodiac?",
      "Which half of the reading is being taken: the changing weather, or the concluded contract?"
    ]
  },

  13: {
    plain: "The thirteenth station. Al-Awwa', the Barker, determined by Beta Virginis (Zavijava), from 4°17' Virgo. At the same index the crosswalk sets the nakshatra Hasta, whose stars are the five of Corvus, and the xiu Shi, the Encampment.",
    reading: "Agrippa's list gives the mansion to sowing, planting and the taking of medicine but not to travel or marriage, and names it as giving benevolence, gain, voyages, harvests and the freedom of captives. Hasta is the Hand, ruled by the Moon, deity Savitr the impeller, its symbol a hand or a closed fist. Shi, the Encampment, takes Alpha Pegasi and belongs to the winter quadrant.",
    principle: "Here the two ecliptic systems separate again. The manzil sits at the beginning of Virgo on Zavijava; Hasta takes the compact quadrilateral of Corvus, which lies well south of the ecliptic. The Arabic name has been read both as a barking dog and as a bend or turn in a line of stars, and the sources do not settle it. Two uncertainties therefore compound at this index: an unfixed etymology and a determinant in a different part of the sky from its paired station.",
    energies: ["the hand", "the call that carries", "skill in making"],
    tensions: ["a name whose sense is lost", "travel refused", "grasping"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Awwa', read variously as the barker or as the bend in a line of stars." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Jazeriel; gives benevolence, gain, voyages, harvests and freedom of captives." },
      { lineage: "Vedic jyotisha", claim: "Hasta, ruled by the Moon, deity Savitr, symbol the hand, stars in Corvus." },
      { lineage: "Chinese xiu", claim: "Shi, the Encampment, on Alpha Pegasi, thirteenth station of the Black Tortoise." }
    ],
    correspondences: ["letter: mim, abjad value 40", "Agrippa angel: Jazeriel", "nakshatra ruler: the Moon", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "An index match across these three systems is not an equivalence. The manazil divide the ecliptic into approximately equal twenty-eighths, the nakshatras into equal thirteen-degree-twenty-minute segments with Abhijit added as a 28th, and the xiu into unequal arcs fixed by their reference stars.",
      "The meaning of Al-Awwa' is genuinely unsettled between the barking and the bending readings, and translators have gone both ways."
    ],
    prompts: [
      "Where a name has two defensible translations, does the working need one of them, or does the ambiguity belong in the reading?",
      "What is a hand for in a system whose other stations are body parts of a lion?"
    ]
  },

  14: {
    plain: "The fourteenth station. As-Simak, the Unarmed, determined by Alpha Virginis (Spica), from 17°9' Virgo. At the same index stand the nakshatra Chitra, also on Spica, and the xiu Bi, the Wall.",
    reading: "Agrippa gives the mansion to digging but not to marriage or travel, and names it as causing marital love, curing the sick and helping sailors while hindering journeys by land. Chitra is the Bright One, ruled by Mars, deity Vishvakarma the divine artificer, its symbol a bright jewel. The Arabic name distinguishes this star, the unarmed one, from As-Simak ar-Ramih, the armed one, which is Arcturus.",
    principle: "Manzil and nakshatra agree on Spica, and this index carries the greatest structural weight in the whole set: Spica is the reference point from which the sidereal zodiac used in jyotisha is commonly fixed, and it is also the determinant of the first Chinese xiu, Jiao. That last fact sets the thirteen-station displacement that runs through the crosswalk tables in this application. The same star is manzil fourteen, nakshatra fourteen and xiu one.",
    energies: ["the bright ear of grain", "the maker's craft", "the unarmed hand"],
    tensions: ["brilliance without defence", "the land journey hindered", "artifice mistaken for substance"],
    attributions: [
      { lineage: "Arabic manazil", claim: "As-Simak al-A'zal, the unarmed, distinguished from the armed Simak, Arcturus." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Ergediel; causes marital love, cures the sick, helps sailors." },
      { lineage: "Vedic jyotisha", claim: "Chitra, ruled by Mars, deity Vishvakarma, the bright jewel." },
      { lineage: "Chinese xiu", claim: "Spica determines Jiao, the Horn, the first of the twenty-eight, not the fourteenth." }
    ],
    correspondences: ["letter: nun, abjad value 50", "Agrippa angel: Ergediel", "nakshatra ruler: Mars", "quadrant: Black Tortoise of the North, winter"],
    contested: [
      "Spica is manzil fourteen, nakshatra fourteen and xiu one. That single fact shows what index pairing does and does not establish: the crosswalk's Chinese column is displaced by roughly thirteen stations from its Arabic column, so an index match is not an equivalence.",
      "The ayanamsha that fixes the sidereal zodiac is itself contested, and several of the competing values are defined by where Spica is placed. Different schools therefore assign different boundaries to this very station."
    ],
    prompts: [
      "If the whole sidereal frame is pinned to this star, what happens to every other station when the pin is moved?",
      "Which Simak does the source mean, the armed or the unarmed, and has a translator already decided?"
    ]
  },

  15: {
    plain: "The fifteenth station. Al-Ghafr, the Covering, determined by Iota Virginis (Syrma), at 0°0' Libra in this table. Beside it the crosswalk sets the nakshatra Svati, whose star is Arcturus, and the xiu Kui, the Legs.",
    reading: "Agrippa's list marks this mansion unfortunate for anything, while also naming it favourable for extracting treasure, digging pits, divorce and the destruction of houses and enemies. Svati is the Independent One, ruled by Rahu, deity Vayu the wind, its symbol a young shoot bending. Kui, the Legs, opens the autumn quadrant of the White Tiger of the West.",
    principle: "The determinants diverge sharply at this index: Iota Virginis lies on the ecliptic, Arcturus lies far north of it, and Eta Andromedae lies in another quarter again. The Arabic name means a covering or veil, taken from the faintness of the stars, while the Vedic name means self-going, taken from Arcturus standing alone away from the band. A veil and an independence are opposite readings of the same condition, which is a star that does not sit where the others do.",
    energies: ["the veil", "the wind", "what moves alone"],
    tensions: ["a station marked unfortunate outright", "separation", "the house pulled down"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Ghafr, the covering, named for the faintness of its stars." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Atliel; unfortunate for anything, yet favourable for extracting treasures and for divorce." },
      { lineage: "Vedic jyotisha", claim: "Svati, ruled by Rahu, deity Vayu, star Arcturus, the self-going one." },
      { lineage: "Chinese xiu", claim: "Kui, the Legs, first station of the White Tiger of the West." }
    ],
    correspondences: ["letter: sin, abjad value 60", "Agrippa angel: Atliel", "nakshatra ruler: Rahu", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "The three schemes are aligned here by number only. Equal manazil, equal but wider nakshatras with Abhijit inserted as a 28th, and unequal star-fixed xiu do not share boundaries. An index match is not an equivalence.",
      "Agrippa marks the station unfortunate for everything and then lists several purposes it favours. The Latin compilation contains both statements without reconciling them."
    ],
    prompts: [
      "A faint place named for its veil and a bright star named for its independence share this index. Which condition is actually being marked?",
      "Where a source declares a station unfortunate and then lists its uses, which statement carries the older authority?"
    ]
  },

  16: {
    plain: "The sixteenth station. Az-Zubana, the Claws, determined by Alpha Librae (Zubenelgenubi), from 12°51' Libra. At the same index stand the nakshatra Vishakha, whose stars are in Libra, and the xiu Lou, the Bond.",
    reading: "Agrippa gives the mansion to the buying of cattle but not to navigation, and names it as hindering journeys, marriage, harvest and merchandise while favouring the redemption of captives. Vishakha means branching out or forked, ruled by Jupiter, its deities Indra and Agni together, its symbol a triumphal arch and a potter's wheel. Lou, the Bond, belongs to the autumn quadrant of the White Tiger.",
    principle: "Both ecliptic systems take the same stars here, the pair that Greek astronomy renamed as the pans of a balance but which Arabic and Babylonian material had long read as the claws of the Scorpion. Vishakha's fork and the Arabic claws are the same visual fact, a two-pronged figure. The Libra of the Greeks is the later imposition; the older reading, preserved in both these station names, is that the Scorpion once reached this far.",
    energies: ["the fork", "the two-pronged reach", "the arch"],
    tensions: ["a choice that splits", "the journey hindered", "grip"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Az-Zubana, the claws, retaining the older reading of these stars as part of the Scorpion." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Azeruel; hinders journeys and marriage, favours the redemption of captives." },
      { lineage: "Vedic jyotisha", claim: "Vishakha, ruled by Jupiter, deities Indra and Agni, the forked or branching station." },
      { lineage: "Chinese xiu", claim: "Lou, the Bond, on Beta Arietis, in the autumn quadrant of the White Tiger." }
    ],
    correspondences: ["letter: ayn, abjad value 70", "Agrippa angel: Azeruel", "nakshatra ruler: Jupiter", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "This application pairs the three systems by ordinal index. The manazil are approximately equal segments, the nakshatras equal segments of a different size, and the xiu unequal arcs fixed by reference stars. An index match is not an equivalence.",
      "Whether these stars belong to a balance or to a scorpion is a disagreement between star-lore traditions that was never resolved, only overwritten by the Greek figure."
    ],
    prompts: [
      "Claws or scales: which figure is the working standing inside, and what does the other one make of the same degrees?",
      "When a later constellation replaces an earlier one over the same stars, does the older attribution survive in the station name?"
    ]
  },

  17: {
    plain: "The seventeenth station. Al-Iklil, the Crown of the Forehead, determined by Delta Scorpii (Dschubba), from 25°43' Libra. At the same index the crosswalk sets the nakshatra Anuradha, whose stars are Beta, Delta and Pi Scorpionis, and the xiu Wei, the Stomach.",
    reading: "Agrippa's list gives this mansion to building, sowing, planting and navigation but not to marriage, and names it as improving misfortune, making love durable, strengthening buildings and helping seamen. Anuradha means following Radha, ruled by Saturn, deity Mitra the god of covenant and friendship, its symbol a triumphal archway and a lotus. Wei, the Stomach, sits in the autumn quadrant of the White Tiger.",
    principle: "Manzil and nakshatra take the same arc of the Scorpion's head here, and both make it a place of binding: a crown that is worn, a covenant that is kept. The Arabic crown belongs to the anatomy of the beast, the Vedic covenant belongs to a moral order, and the same three stars carry both. This is the ordinary situation of the material, where the observational fact is shared and the interpretive frame is not.",
    energies: ["the crown", "covenant", "friendship that holds"],
    tensions: ["marriage withheld", "an ornament mistaken for a rule", "obligation"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Iklil, the crown, from the head of the Scorpion." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Adriel; improves misfortune, makes love durable, strengthens buildings." },
      { lineage: "Vedic jyotisha", claim: "Anuradha, ruled by Saturn, deity Mitra, the station of covenant." },
      { lineage: "Chinese xiu", claim: "Wei, the Stomach, on 35 Arietis, in the autumn quadrant." }
    ],
    correspondences: ["letter: fa, abjad value 80", "Agrippa angel: Adriel", "nakshatra ruler: Saturn", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "The crosswalk sets three unlike divisions at one index. Equal manazil of about 12 degrees 51 minutes 26 seconds, equal nakshatras of 13 degrees 20 minutes, and unequal star-determined xiu remain three systems. An index match is not an equivalence.",
      "The precise stars of Al-Iklil are given differently by different Arabic sources, some taking the three of the Scorpion's head and some only Dschubba."
    ],
    prompts: [
      "Is a crown a bond or a display in the tradition being worked from?",
      "Where a source names three stars and another names one, does the station widen or does the reading narrow?"
    ]
  },

  18: {
    plain: "The eighteenth station. Al-Qalb, the Heart, determined by Alpha Scorpii (Antares), from 8°34' Scorpio. At the same index stand the nakshatra Jyeshtha, whose stars are Alpha, Sigma and Tau Scorpionis, and the xiu Mao, the Hairy Head.",
    reading: "Agrippa gives this mansion to planting, sowing, travel and the making of war, and names it as causing discord, sedition and conspiracy against princes while freeing captives and helping building. Jyeshtha is the Eldest, ruled by Mercury, deity Indra, its symbol a circular amulet and an umbrella. Antares is a red star of the first magnitude and is counted among the Persian royal stars.",
    principle: "Manzil and nakshatra agree completely here, both naming Antares and both making it the heart or the eldest of its region. The Chinese also name Antares as a heart, Xin, but at index five, not eighteen. The whole thirteen-station displacement of the crosswalk can be read off this record alone: one star, called the heart by two of the three traditions, sitting at index eighteen in one column and index five in another.",
    energies: ["the heart", "seniority", "the rival fire"],
    tensions: ["sedition", "the eldest displaced", "burning at the centre"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Qalb, the heart of the Scorpion, from Antares." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Egibiel; causes discord, sedition and conspiracy against princes, yet frees captives." },
      { lineage: "Vedic jyotisha", claim: "Jyeshtha, the eldest, ruled by Mercury, deity Indra." },
      { lineage: "Chinese xiu", claim: "Antares determines Xin, the Heart, at index five of the Azure Dragon." },
      { lineage: "Persian royal stars", claim: "Antares counted among the four watchers of the heavens." }
    ],
    correspondences: ["letter: sad, abjad value 90", "Agrippa angel: Egibiel", "nakshatra ruler: Mercury", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "Antares is manzil eighteen and xiu five. Two traditions independently call it a heart and put it at different index numbers, which shows directly that the crosswalk's ordinal pairing is a convenience and not a correspondence.",
      "Whether Jyeshtha's eldership is honour or burden is read both ways in the jyotisha commentaries, and the Arabic material attaches sedition to the same degrees."
    ],
    prompts: [
      "Two traditions call this star the heart and number it differently. What does that settle about index mapping?",
      "Is eldership here a rank held or a rank contested?"
    ]
  },

  19: {
    plain: "The nineteenth station. Ash-Shawlah, the Sting, determined by Lambda Scorpii (Shaula) in the Scorpion's raised tail, from 21°26' Scorpio. Beside it the crosswalk sets the nakshatra Mula and the xiu Bi, the Net.",
    reading: "Agrippa's list gives the mansion to buying cattle and to hunting but not to marriage, and names it as helping the besieging of cities, the taking of towns and the driving of men from their places, and as destroying seamen and captives. Mula means the root, ruled by Ketu, its deity Nirriti, its symbol a bunch of tied roots and an elephant goad. Bi, the Net, sits in the autumn quadrant of the White Tiger.",
    principle: "The manzil takes the sting at the tip of the tail; Mula takes the whole run of stars from Epsilon to Nu Scorpionis, a much wider spread that reaches towards the galactic centre. Sting and root are the same place read from opposite ends: the point where the creature ends, or the point where the world is anchored. The station is one of the few where the Arabic determinant sits inside the Vedic star list rather than beside it.",
    energies: ["the sting", "the root", "the tearing away"],
    tensions: ["dissolution", "the city besieged", "an ending that clears ground"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Ash-Shawlah, the raised sting, from Shaula and Lesath." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Amutiel; helps the besieging of cities and the driving of men from places." },
      { lineage: "Vedic jyotisha", claim: "Mula, the root, ruled by Ketu, deity Nirriti, goddess of dissolution." },
      { lineage: "Chinese xiu", claim: "Bi, the Net, on Epsilon Tauri, in the autumn quadrant of the White Tiger." }
    ],
    correspondences: ["letter: qaf, abjad value 100", "Agrippa angel: Amutiel", "nakshatra ruler: Ketu", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "Index pairing is a convenience of the table. Manazil of about 12 degrees 51 minutes 26 seconds, nakshatras of 13 degrees 20 minutes, and unequal star-fixed xiu do not divide the sky alike, and an index match is not an equivalence.",
      "Mula spans a far wider group of stars than the manzil determinant, so even where the two overlap they do not cover the same arc."
    ],
    prompts: [
      "Sting and root at one index: is that a coincidence of numbering or two names for a terminal point?",
      "Does the working want the single determinant star or the whole run of the tail?"
    ]
  },

  20: {
    plain: "The twentieth station. An-Na'am, the Ostriches, determined by Phi Sagittarii, from 4°17' Sagittarius. At the same index stand the nakshatra Purva Ashadha, whose stars are Delta and Epsilon Sagittarii, and the xiu Zi, the Turtle Beak.",
    reading: "Agrippa gives this mansion to building and to the asking of favours but not to marriage, and names it as taming wild beasts, strengthening prisons, destroying the wealth of societies and compelling a person to come to a given place. Purva Ashadha is the Former Unconquered, ruled by Venus, deity Apah the waters, its symbol an elephant tusk and a winnowing basket. Zi, the Turtle Beak, is in the autumn quadrant.",
    principle: "The Arabic station names two groups of ostriches, those going to the river and those returning, spread across the Archer's body, while the Vedic station opens the paired Ashadha, the former of two unconquered. Both take stars in Sagittarius and the arcs genuinely overlap. The pairing structure again belongs to the Vedic side alone, so the index mapping cuts a Vedic pair across two Arabic stations that have no such relation to each other.",
    energies: ["the birds at the river", "the unconquered", "invocation"],
    tensions: ["the prison strengthened", "wealth dispersed", "compulsion"],
    attributions: [
      { lineage: "Arabic manazil", claim: "An-Na'am, the ostriches, read as two flocks about the Milky Way." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Kyriel; tames wild beasts, strengthens prisons, compels a person to come to a place." },
      { lineage: "Vedic jyotisha", claim: "Purva Ashadha, ruled by Venus, deity Apah, the former unconquered." },
      { lineage: "Chinese xiu", claim: "Zi, the Turtle Beak, on Lambda Orionis, in the autumn quadrant." }
    ],
    correspondences: ["letter: ra, abjad value 200", "Agrippa angel: Kyriel", "nakshatra ruler: Venus", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "The crosswalk pairs manzil, nakshatra and xiu by number alone; the three systems divide the sky by different methods and different widths. An index match is not an equivalence.",
      "Arabic sources differ on which stars of Sagittarius belong to the ostriches, and the count is given variously."
    ],
    prompts: [
      "Where a station is named for a flock rather than a figure, what fixes its boundaries?",
      "If a compulsion is attributed to a place in the sky, whose account of causation is that, and does the working accept it?"
    ]
  },

  21: {
    plain: "The twenty-first station. Al-Baldah, the City or the District, determined by Pi Sagittarii (Albaldah), from 17°9' Sagittarius. Beside it the crosswalk sets the nakshatra Uttara Ashadha, whose stars are Zeta and Sigma Sagittarii, and the xiu Shen, the Three Stars.",
    reading: "Agrippa's list gives the mansion to the taking of medicine, to navigation and to putting on new clothes, and calls it favourable for harvest, gain, buildings and travellers while causing divorce. Uttara Ashadha is the Latter Unconquered, ruled by the Sun, deity the Vishvadevas, its symbol an elephant tusk and a small bed. The Arabic name records an empty tract of sky between star groups, a district with nothing built in it.",
    principle: "Al-Baldah is a station named for what is not there, an unoccupied space, which is unusual in a system that otherwise names bright determinants. Uttara Ashadha completes the Vedic pair begun at index twenty and, in the standard 27-fold scheme, is the last nakshatra before Abhijit is inserted in the 28-fold version this application uses. From the next index onwards the nakshatra column here departs by one from the standard numbering.",
    energies: ["the open district", "the latter unconquered", "final victory"],
    tensions: ["emptiness taken for a place", "divorce", "a completion that arrives late"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Baldah, the district, named for a blank tract between the star groups." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Bethnael; favourable for harvest, gain, buildings and travellers, causes divorce." },
      { lineage: "Vedic jyotisha", claim: "Uttara Ashadha, ruled by the Sun, deity the Vishvadevas, the latter unconquered." },
      { lineage: "Chinese xiu", claim: "Shen, the Three Stars, on Zeta Orionis, last station of the White Tiger of the West." }
    ],
    correspondences: ["letter: shin, abjad value 300", "Agrippa angel: Bethnael", "nakshatra ruler: the Sun", "quadrant: White Tiger of the West, autumn"],
    contested: [
      "Beyond this index the nakshatra column of the crosswalk carries Abhijit as a 28th station, which displaces every remaining nakshatra by one from the standard 27-fold numbering. Combined with the unequal xiu and the differently sized manazil, an index match is not an equivalence.",
      "Whether Al-Baldah is properly empty or determined by Pi Sagittarii is given both ways in the sources."
    ],
    prompts: [
      "How is a station bounded when it is named for the absence of stars rather than the presence of one?",
      "From here on the nakshatra numbering shifts by one. Which numbering does the working intend?"
    ]
  },

  22: {
    plain: "The twenty-second station. Sa'd adh-Dhabih, the Lucky One of the Slaughterers, determined by Beta Capricorni (Dabih), at 0°0' Capricorn. At this index the crosswalk sets Abhijit, the intercalary twenty-eighth nakshatra, and the xiu Jing, the Well.",
    reading: "Agrippa gives this mansion to the taking of medicine and to travel but not to lending money or to marriage, and names it as helping the escape of servants and captives and the curing of disease. Abhijit means the invincible or the all-conquering; its deity is Brahma and its emblem the vina. It is not one of the twenty-seven. It is inserted between Uttara Ashadha and Shravana to make a count of twenty-eight, and it is omitted from most working jyotisha schemes.",
    principle: "This is the load-bearing record for the whole crosswalk. The Vedic system is natively twenty-seven, not twenty-eight, and the 28-fold form used here exists only because Abhijit is placed into it. Abhijit is a narrow wedge, given in this application as 6°40' to 10°53' Capricorn, which is far shorter than the 13°20' of a standard nakshatra and quite unlike the approximately 12 degrees 51 minutes 26 seconds of a manzil. An index that pairs an intercalary wedge with a full Arabic station is a numbering, not a correspondence.",
    energies: ["the sacrifice made", "the invincible", "release from confinement"],
    tensions: ["a station that does not properly exist", "debt refused", "an interval too narrow to hold"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Sa'd adh-Dhabih, the fortunate star of the slaughterers, from Dabih." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Geliel; helps the escape of servants and captives and the curing of diseases." },
      { lineage: "Vedic jyotisha", claim: "Abhijit, deity Brahma, emblem the vina, intercalary and omitted from the standard twenty-seven." },
      { lineage: "Chinese xiu", claim: "Jing, the Well, on Mu Geminorum, first station of the Vermilion Bird of the South." }
    ],
    correspondences: ["letter: ta, abjad value 400", "Agrippa angel: Geliel", "nakshatra span given here: 6°40'-10°53' Capricorn", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "The nakshatra scheme is natively twenty-seven. Abhijit is inserted to reach twenty-eight, and its arc is a wedge taken from its neighbours rather than a full station. Pairing it by index with a full manzil and an unequal xiu is a convenience of tabulation and nothing more.",
      "The determining stars of Abhijit are usually given as Vega with its neighbours in Lyra; the table in this application lists Zeta and Sigma Lyrae, and the sources vary."
    ],
    prompts: [
      "If one of the three columns contains a station the tradition itself treats as optional, what weight can the row carry?",
      "Does the working use the twenty-seven-fold nakshatra scheme or the twenty-eight-fold, and is the choice recorded anywhere?"
    ]
  },

  23: {
    plain: "The twenty-third station. Sa'd al-Bula, the Good Fortune of the Swallower, determined by Mu Aquarii, from 12°51' Capricorn. At the same index the crosswalk sets the nakshatra Shravana, whose stars are the three of Aquila, and the xiu Gui, the Ghost.",
    reading: "Agrippa's list gives this mansion to marriage, sowing, the taking of medicine and the leading of an army, and names it as causing divorce, the liberty of captives and the healing of the sick. Shravana means to hear, ruled by the Moon, deity Vishnu, its symbol an ear or three footprints. Gui, the Ghost, belongs to the summer quadrant of the Vermilion Bird.",
    principle: "The nakshatra column has now shifted: Shravana is the twenty-second of the standard twenty-seven and appears here as the twenty-third because Abhijit was inserted before it. Its stars are in Aquila, north of the ecliptic and well away from Mu Aquarii. Two separate misfits therefore stack at this index, a displaced numbering and a divergent determinant, and both are artefacts of forcing three systems into one column of twenty-eight rows.",
    energies: ["hearing", "the three strides", "swallowing what is given"],
    tensions: ["divorce", "a numbering displaced", "what is heard and not verified"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Sa'd al-Bula, the fortune of the swallower, from the faint stars of Aquarius." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Requiel; causes divorce, the liberty of captives and the healing of the sick." },
      { lineage: "Vedic jyotisha", claim: "Shravana, ruled by the Moon, deity Vishnu, the listening ear, twenty-second in the standard scheme." },
      { lineage: "Chinese xiu", claim: "Gui, the Ghost, on Theta Cancri, in the summer quadrant of the Vermilion Bird." }
    ],
    correspondences: ["letter: tha, abjad value 500", "Agrippa angel: Requiel", "nakshatra ruler: the Moon", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "From index twenty-three the nakshatra column runs one ahead of the standard twenty-seven-fold numbering because Abhijit occupies index twenty-two. An index match here is not an equivalence in any sense at all.",
      "The Hebrew column of the crosswalk turns to final letter forms at this index, which is a device for reaching twenty-eight rather than a traditional lettering of the mansions."
    ],
    prompts: [
      "Which numbering is on the page: twenty-seven standard, or twenty-eight with Abhijit?",
      "What is the difference between hearing a transmission and verifying it, and where does the working sit?"
    ]
  },

  24: {
    plain: "The twenty-fourth station. Sa'd as-Su'ud, the Luckiest of the Lucky, determined by Beta Aquarii (Sadalsuud), from 25°43' Capricorn. Beside it the crosswalk sets the nakshatra Dhanishtha, whose stars are in Delphinus, and the xiu Liu, the Willow.",
    reading: "Agrippa gives this mansion to building, marriage, the making of friends and travel, and names it as giving marital happiness and victory to soldiers while preventing the execution of government. Dhanishtha means the wealthiest, ruled by Mars, deity the Vasus, its symbol a drum or flute. The Arabic name is a superlative built on the word for fortune, the most fortunate of the fortunate stars.",
    principle: "The Arabic sequence runs a series of four fortune-stations through Capricorn and Aquarius, each named sa'd, and this is the strongest of them. That series has no counterpart in the Vedic or Chinese schemes, which do not group their stations into runs of shared fortune. The nakshatra at this index takes its stars from Delphinus, north of the ecliptic, and remains displaced by one from the standard numbering.",
    energies: ["the doubled fortune", "the drum", "wealth held"],
    tensions: ["governance obstructed", "fortune that cannot be accounted for", "noise"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Sa'd as-Su'ud, the most fortunate of the fortunate, fourth in the run of sa'd stations." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Abrinael; gives marital happiness and victory of soldiers, prevents execution of government." },
      { lineage: "Vedic jyotisha", claim: "Dhanishtha, ruled by Mars, deity the Vasus, symbol the drum, twenty-third in the standard scheme." },
      { lineage: "Chinese xiu", claim: "Liu, the Willow, on Delta Hydrae, in the summer quadrant." }
    ],
    correspondences: ["letter: kha, abjad value 600", "Agrippa angel: Abrinael", "nakshatra ruler: Mars", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "Three unlike divisions are set at this index by number alone. The nakshatra column is additionally shifted by one because of Abhijit. An index match is not an equivalence.",
      "The run of sa'd stations is a feature of the Arabic system with no structural parallel in the other two, so any mapping distributes a coherent Arabic sequence across unrelated foreign stations."
    ],
    prompts: [
      "Where one system groups its stations into a run and the others do not, what is lost by reading them row by row?",
      "Is the superlative in this name a claim about the star or a position within a sequence?"
    ]
  },

  25: {
    plain: "The twenty-fifth station. Sa'd al-Akhbiyya, the Lucky Star of Hidden Things, determined by Gamma Aquarii (Sadachbia), from 8°34' Aquarius. At the same index stands the nakshatra Shatabhisha, whose star is also Gamma Aquarii, and the xiu Xing, the Star.",
    reading: "Agrippa's list marks this mansion unfortunate for everything except the taking of medicine, while also naming it favourable for sieges and revenge, destroying enemies, causing divorce, hastening messengers and hindering childbirth. Shatabhisha means a hundred physicians or a hundred healers, ruled by Rahu, deity Varuna, its symbol an empty circle. The Arabic name refers to tents or hidden dwellings.",
    principle: "This index carries the only place in the later part of the crosswalk where manzil and nakshatra share a determining star outright: Gamma Aquarii is Sadachbia and it is Shatabhisha. That is remarkable given that the nakshatra column is displaced by one here because of Abhijit, so the agreement is arrived at through a shift rather than in spite of one. Both names concern concealment and healing, which makes the coincidence worth recording and worth resisting as proof of anything.",
    energies: ["the hidden tent", "a hundred healers", "the empty circle"],
    tensions: ["a station marked unfortunate", "birth hindered", "medicine that is also poison"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Sa'd al-Akhbiyya, the fortune of the hidden things or tents, from Sadachbia." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Aziel; unfortunate for everything except taking medicine, favourable for besieging and revenge." },
      { lineage: "Vedic jyotisha", claim: "Shatabhisha, the hundred healers, ruled by Rahu, deity Varuna, star Gamma Aquarii." },
      { lineage: "Chinese xiu", claim: "Xing, the Star, on Alpha Hydrae, in the summer quadrant of the Vermilion Bird." }
    ],
    correspondences: ["letter: dhal, abjad value 700", "Agrippa angel: Aziel", "nakshatra ruler: Rahu", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "The shared determinant here does not validate the crosswalk. The manazil, the 28-fold nakshatras and the unequal xiu still divide the sky by three incompatible methods, and one coincidence in twenty-eight rows is not a correspondence.",
      "Agrippa marks the station both unfortunate for everything and favourable for several named purposes; the Latin compilation preserves the contradiction."
    ],
    prompts: [
      "One shared star after a displaced numbering. Is that convergence or arithmetic?",
      "A hundred healers and a hidden dwelling: does the tradition make healing a matter of concealment here, and does the working follow it?"
    ]
  },

  26: {
    plain: "The twenty-sixth station. Al-Fargh al-Muqaddam, the Fore-spout of the Water-bucket, determined by Alpha Pegasi (Markab), from 21°26' Aquarius. Beside it the crosswalk sets the nakshatra Purva Bhadrapada, whose stars are Alpha and Beta Pegasi, and the xiu Zhang, the Extended Net.",
    reading: "Agrippa gives the mansion to planting, sowing, bargaining and marriage but not to navigation, and names it as causing union and the health of captives while destroying buildings and prisons. Purva Bhadrapada is the Former Blessed Feet, ruled by Jupiter, deity Ajaikapada the one-footed goat, its symbol a two-faced figure and the front legs of a funeral cot. Zhang is in the summer quadrant of the Vermilion Bird.",
    principle: "Both ecliptic systems take the Great Square of Pegasus here, the Arabic reading it as the mouth of a bucket pouring water and the Vedic as the forward pair of a set of blessed feet. The stars are the same and the figures are wholly unrelated, which is the clearest kind of evidence that these systems were built independently on shared observation. The Vedic pairing structure returns for the last time in the Bhadrapada.",
    energies: ["the pouring spout", "the forward feet", "union"],
    tensions: ["the building pulled down", "two faces", "water that will not be held"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Fargh al-Muqaddam, the fore-spout of the water bucket, from Markab and Scheat." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Tagriel; causes union and the health of captives, destroys buildings and prisons." },
      { lineage: "Vedic jyotisha", claim: "Purva Bhadrapada, ruled by Jupiter, deity Ajaikapada, twenty-fifth in the standard scheme." },
      { lineage: "Chinese xiu", claim: "Zhang, the Extended Net, on Upsilon Hydrae, in the summer quadrant." }
    ],
    correspondences: ["letter: dad, abjad value 800", "Agrippa angel: Tagriel", "nakshatra ruler: Jupiter", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "The three columns are aligned by ordinal index and by nothing else. The nakshatra column remains displaced by one because of Abhijit, and the xiu are unequal arcs fixed by reference stars. An index match is not an equivalence.",
      "The Bhadrapada pair is a single figure divided in two. Mapping it row by row against unpaired Arabic stations breaks the figure."
    ],
    prompts: [
      "A bucket and a pair of feet over the same four stars. What does that say about how much of a station is observation and how much is figure?",
      "When the last Vedic pair is split across two rows, which row carries the sense?"
    ]
  },

  27: {
    plain: "The twenty-seventh station. Al-Fargh al-Mu'akhkhar, the Second Spout of the Water-bucket, determined by Gamma Pegasi (Algenib), from 4°17' Pisces. At the same index stand the nakshatra Uttara Bhadrapada, whose stars are Gamma Pegasi and Alpha Andromedae, and the xiu Yi, the Wings.",
    reading: "Agrippa's list gives the mansion to marriage, the taking of medicine and the pursuit of business but not to travel or the lending of money, and names it as increasing harvests and revenues, healing infirmities, hindering building, upholding prisons and endangering seamen. Uttara Bhadrapada is the Latter Blessed Feet, ruled by Saturn, deity Ahirbudhnya the serpent of the deep, its symbol a snake in water. Yi, the Wings, is in the summer quadrant.",
    principle: "Manzil and nakshatra share Gamma Pegasi, completing the two-station figure that began at index twenty-six in both systems, though they completed different figures. The Arabic finishes a bucket, the Vedic finishes a set of feet. The serpent of the depths attached to this nakshatra is one of the older Vedic attributions and sits oddly beside Agrippa's list of harvests and revenues, which is a reminder that the two bodies of material answer different questions about the same degrees.",
    energies: ["the second spout", "the deep serpent", "completion of the pouring"],
    tensions: ["building hindered", "the prison upheld", "still water over depth"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Al-Fargh al-Mu'akhkhar, the hinder spout of the water bucket, from Algenib and Alpheratz." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Atheniel; increases harvests and revenues, heals infirmities, hinders building." },
      { lineage: "Vedic jyotisha", claim: "Uttara Bhadrapada, ruled by Saturn, deity Ahirbudhnya, the serpent of the deep." },
      { lineage: "Chinese xiu", claim: "Yi, the Wings, on Alpha Crateris, in the summer quadrant of the Vermilion Bird." }
    ],
    correspondences: ["letter: za, abjad value 900", "Agrippa angel: Atheniel", "nakshatra ruler: Saturn", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "The crosswalk's index pairing survives to the end of the circle without ever becoming a correspondence. Equal manazil, equal nakshatras of a different width with an intercalary insertion, and unequal star-fixed xiu are three systems throughout.",
      "Alpha Andromedae is claimed by both Pegasus and Andromeda in the constellation figures, and the station boundaries inherit that ambiguity."
    ],
    prompts: [
      "The same star closes a bucket in one tradition and a pair of feet in another. Which figure does the working carry forward?",
      "What does a serpent of the deep have to do with revenue, and is the pairing anything more than a shared arc?"
    ]
  },

  28: {
    plain: "The twenty-eighth and last station. Batn al-Hut, the Belly of the Fish, determined by Beta Andromedae (Mirach), from 17°9' Pisces. At the same index stand the nakshatra Revati and the xiu Zhen, the Chariot.",
    reading: "Agrippa gives this mansion to travel and to the taking of purgatives, and names it as increasing harvest and merchandise, helping travellers through danger, strengthening prisons, causing marital happiness and the loss of treasure. Revati means prosperous or wealthy, ruled by Mercury, deity Pushan the guide of roads and herds, its symbol a fish or a drum. Zhen, the Chariot, closes the summer quadrant of the Vermilion Bird and the Chinese circle.",
    principle: "All three systems close here, and all three close differently. The manzil takes Mirach in Andromeda, off the ecliptic; Revati takes Zeta Piscium and is the twenty-seventh of the standard scheme, appearing as the twenty-eighth only because Abhijit was inserted; Zhen takes Gamma Corvi in a wholly different quarter. The crosswalk's Hebrew column also fails at this index: twenty-two letters plus five final forms reach only twenty-seven, and the twenty-eighth cell carries a symbol that is not a Hebrew letter at all.",
    energies: ["the belly of the fish", "the guide of roads", "prosperity at the end"],
    tensions: ["treasure lost", "an ending that is also a swallowing", "a scheme that runs out of letters"],
    attributions: [
      { lineage: "Arabic manazil", claim: "Batn al-Hut, the belly of the fish, from Mirach." },
      { lineage: "Agrippa, Three Books of Occult Philosophy", claim: "Angel Amnixiel; helps travellers through danger, causes marital happiness and loss of treasure." },
      { lineage: "Vedic jyotisha", claim: "Revati, ruled by Mercury, deity Pushan, the last of the standard twenty-seven." },
      { lineage: "Chinese xiu", claim: "Zhen, the Chariot, on Gamma Corvi, last of the twenty-eight." },
      { lineage: "Islamic letter sciences", claim: "The station carries ghayn, the twenty-eighth and last Arabic letter, abjad value 1000." }
    ],
    correspondences: ["letter: ghayn, abjad value 1000", "Agrippa angel: Amnixiel", "nakshatra ruler: Mercury", "quadrant: Vermilion Bird of the South, summer"],
    contested: [
      "The three schemes are paired by index and close on three unrelated stars. Approximately equal manazil, equal nakshatras of 13 degrees 20 minutes with Abhijit inserted as a 28th, and unequal xiu determined by their reference stars do not divide the sky the same way. An index match is not an equivalence, here least of all.",
      "The Hebrew column of MANSION_CROSSWALK holds twenty-two letters and five final forms, which totals twenty-seven. The twenty-eighth cell is filled with a non-letter placeholder. The Arabic alphabet supplies twenty-eight letters for twenty-eight stations; Hebrew does not, and no traditional Hebrew lettering of the mansions is implied by that column."
    ],
    prompts: [
      "The Arabic letters fit the stations exactly and the Hebrew letters do not. Is the fit evidence of design, or is it why the stations were numbered at twenty-eight in the first place?",
      "Three traditions end the circle at three different stars. Where, then, does the circle actually close?"
    ]
  }
};

export function getMansionSymbolism(i) {
  return MANSION_SYMBOLISM[Number(i)] || null;
}
