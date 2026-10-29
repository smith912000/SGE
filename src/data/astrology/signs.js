export const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
// U+FE0E asks for the text glyph; without it iOS and Android draw these as
// coloured emoji tiles.
export const SIGN_SYM = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map(g => g + "\uFE0E");
// Signs take their element's colour, the grouping every tradition shares:
// fire ember, earth moss, air pale silver-violet, water deep sea.
export const ELEMENT_HUE = { Fire: "#D98E5F", Earth: "#A9B27E", Air: "#C9C2E6", Water: "#7FA8C9" };
export const SIGN_COL = {
  Aries: "#D98E5F", Taurus: "#A9B27E", Gemini: "#C9C2E6", Cancer: "#7FA8C9",
  Leo: "#D98E5F", Virgo: "#A9B27E", Libra: "#C9C2E6", Scorpio: "#7FA8C9",
  Sagittarius: "#D98E5F", Capricorn: "#A9B27E", Aquarius: "#C9C2E6", Pisces: "#7FA8C9",
};
export const SIGN_INFO = {
  Aries: {
    emoji: "♈\uFE0E", element: "Fire", mode: "Cardinal", ruler: "Mars", hebrew: "ה", hiero: "𓀠", phoenician: "𐤄", runic: "ᛖ", letterName: "He", letterMeaning: "He means 'window': Aries is the opening through which spirit first enters the material world",
    plain: "Cardinal fire, domicile of Mars, exaltation of the Sun. The sign of the vernal equinox, where the tropical zodiac begins; attributed to initiation and the first impulse.",
    power: "Action, Courage, Initiative",
    compat: "Gemini, Leo, Sagittarius",
    shadow: "Lacks patience, impulsive, can be aggressive."
  },
  Taurus: {
    emoji: "♉\uFE0E", element: "Earth", mode: "Fixed", ruler: "Venus", hebrew: "ו", hiero: "𓌉", phoenician: "𐤅", runic: "ᚠ", letterName: "Vav", letterMeaning: "Vav means 'hook': Taurus is the binding force that connects heaven to earth through the physical",
    plain: "Fixed earth, domicile of Venus, exaltation of the Moon. The bull of mid-spring; attributed to substance, fertility and holding.",
    power: "Stability, Sensuality, Patience",
    compat: "Virgo, Capricorn, Cancer",
    shadow: "Stubbornness, possessiveness, resistant to change."
  },
  Gemini: {
    emoji: "♊\uFE0E", element: "Air", mode: "Mutable", ruler: "Mercury", hebrew: "ז", hiero: "𓈔", phoenician: "𐤆", runic: "ᛉ", letterName: "Zayin", letterMeaning: "Zayin means 'sword': Gemini is the mind that cuts, divides, and discerns between possibilities",
    plain: "Mutable air, domicile of Mercury. The twins; attributed to exchange, speech and the double.",
    power: "Communication, Intelligence, Adaptability",
    compat: "Libra, Aquarius, Aries",
    shadow: "Inconsistency, tendency to be superficial, scattered energy."
  },
  Cancer: {
    emoji: "♋\uFE0E", element: "Water", mode: "Cardinal", ruler: "Moon", hebrew: "ח", hiero: "𓉗", phoenician: "𐤇", runic: "ᚺ", letterName: "Chet", letterMeaning: "Chet means 'fence': Cancer builds the sacred enclosure of home, womb, and emotional protection",
    plain: "Cardinal water, domicile of Moon, exaltation of the Jupiter. The sign of the summer solstice and the Moon's own; attributed to nurture, the house and the tides.",
    power: "Intuition, Nurturing, Emotional Depth",
    compat: "Scorpio, Pisces, Taurus",
    shadow: "Oversensitivity, moodiness, clinging to the past."
  },
  Leo: {
    emoji: "♌\uFE0E", element: "Fire", mode: "Fixed", ruler: "Sun", hebrew: "ט", hiero: "𓄤", phoenician: "𐤈", runic: "ᚦ", letterName: "Teth", letterMeaning: "Teth means 'serpent': Leo is the coiled life-force, the kundalini fire of sovereign creative power",
    plain: "Fixed fire, domicile of Sun. The Sun's own sign at the height of summer; attributed to sovereignty and the heart.",
    power: "Creativity, Sovereignty, Warmth",
    compat: "Aries, Sagittarius, Gemini",
    shadow: "Pride, need for attention, inflexibility."
  },
  Virgo: {
    emoji: "♍\uFE0E", element: "Earth", mode: "Mutable", ruler: "Mercury", hebrew: "י", hiero: "𓂝", phoenician: "𐤉", runic: "ᛁ", letterName: "Yod", letterMeaning: "Yod means 'hand': Virgo is the precise, skillful hand that shapes raw material into useful form",
    plain: "Mutable earth, domicile of Mercury, exaltation of the Mercury. The maiden with the ear of wheat; attributed to discernment, harvest and service.",
    power: "Detail, Service, Analysis",
    compat: "Taurus, Capricorn, Cancer",
    shadow: "Hyper-criticism, worry, perfectionism to a fault."
  },
  Libra: {
    emoji: "♎\uFE0E", element: "Air", mode: "Cardinal", ruler: "Venus", hebrew: "ל", hiero: "𓋿", phoenician: "𐤋", runic: "ᛚ", letterName: "Lamed", letterMeaning: "Lamed means 'ox-goad': Libra is the guide that drives toward balance, justice, and right relation",
    plain: "Cardinal air, domicile of Venus, exaltation of the Saturn. The scales at the autumn equinox; attributed to balance, judgement and relation.",
    power: "Balance, Diplomacy, Aesthetics",
    compat: "Gemini, Aquarius, Leo",
    shadow: "Indecisiveness, self-pity, avoids necessary conflict."
  },
  Scorpio: {
    emoji: "♏\uFE0E", element: "Water", mode: "Fixed", ruler: "Pluto", hebrew: "נ", hiero: "𓆓", phoenician: "𐤍", runic: "ᚾ", letterName: "Nun", letterMeaning: "Nun means 'fish/serpent': Scorpio is the creature that regenerates in the deep, unseen waters",
    plain: "Fixed water, domicile of Pluto. The scorpion of late autumn; attributed to depth, death and regeneration.",
    power: "Intensity, Rebirth, Truth",
    compat: "Cancer, Pisces, Capricorn",
    shadow: "Secretiveness, jealousy, tendency toward extremes."
  },
  Sagittarius: {
    emoji: "♐\uFE0E", element: "Fire", mode: "Mutable", ruler: "Jupiter", hebrew: "ס", hiero: "𓊽", phoenician: "𐤎", runic: "ᛋ", letterName: "Samekh", letterMeaning: "Samekh means 'prop/pillar': Sagittarius is the Djed column, the support structure of meaning and faith",
    plain: "Mutable fire, domicile of Jupiter. The archer; attributed to aim, the long journey and doctrine.",
    power: "Exploration, Optimism, Higher Truth",
    compat: "Aries, Leo, Aquarius",
    shadow: "Recklessness, over-promising, lack of tact."
  },
  Capricorn: {
    emoji: "♑\uFE0E", element: "Earth", mode: "Cardinal", ruler: "Saturn", hebrew: "ע", hiero: "𓁹", phoenician: "𐤏", runic: "ᛟ", letterName: "Ayin", letterMeaning: "Ayin means 'eye': Capricorn is the watchful eye that sees the summit and measures the distance with precision",
    plain: "Cardinal earth, domicile of Saturn, exaltation of the Mars. The sea-goat at the winter solstice; attributed to structure, ambition and time.",
    power: "Mastery, Ambition, Responsibility",
    compat: "Taurus, Virgo, Scorpio",
    shadow: "Coldness, workaholism, pessimistic about success."
  },
  Aquarius: {
    emoji: "♒\uFE0E", element: "Air", mode: "Fixed", ruler: "Uranus", hebrew: "צ", hiero: "𓇑", phoenician: "𐤑", runic: "—", letterName: "Tsade", letterMeaning: "Tsade means 'fishhook/righteous one': Aquarius casts the line into the future to catch truth for humanity",
    plain: "Fixed air, domicile of Uranus. The water-bearer; attributed to the collective, the principle and the new.",
    power: "Innovation, Community, Freedom",
    compat: "Gemini, Libra, Sagittarius",
    shadow: "Detachment, radicalism, unpredictable behavior."
  },
  Pisces: {
    emoji: "♓\uFE0E", element: "Water", mode: "Mutable", ruler: "Neptune", hebrew: "ק", hiero: "𓎗", phoenician: "𐤒", runic: "—", letterName: "Qoph", letterMeaning: "Qoph means 'back of the head': Pisces is the hidden knowledge felt but not seen directly",
    plain: "Mutable water, domicile of Neptune, exaltation of the Venus. The two fishes that close the circle; attributed to dissolution, compassion and the unseen.",
    power: "Compassion, Imagination, Spirituality",
    compat: "Cancer, Scorpio, Taurus",
    shadow: "Vagueness, escapism, being a martyr."
  },
};
export const EL_COL = { Fire: "#D07262", Earth: "#93B89A", Air: "#8FC1C9", Water: "#7FA8C9" };
export const MOD_COL = { Cardinal: "#D98E5F", Fixed: "#8A6FE0", Mutable: "#8FC1C9" };
