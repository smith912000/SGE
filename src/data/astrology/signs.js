export const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
export const SIGN_SYM = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
export const SIGN_COL = {
  Aries: "#ff6b6b", Taurus: "#8bc34a", Gemini: "#fdd835", Cancer: "#64b5f6",
  Leo: "#ff9800", Virgo: "#aed581", Libra: "#f06292", Scorpio: "#e53935",
  Sagittarius: "#ff7043", Capricorn: "#a1887f", Aquarius: "#29b6f6", Pisces: "#9575cd",
};
export const SIGN_INFO = {
  Aries: {
    emoji: "♈", element: "Fire", mode: "Cardinal", ruler: "Mars", hebrew: "ה", hiero: "𓀠", phoenician: "𐤄", runic: "ᛖ", letterName: "He", letterMeaning: "He means 'window' — Aries is the opening through which spirit first enters the material world",
    plain: "Bold and pioneering. Aries energy is direct, courageous, and loves being first.",
    power: "Action, Courage, Initiative",
    compat: "Gemini, Leo, Sagittarius",
    shadow: "Lacks patience, impulsive, can be aggressive."
  },
  Taurus: {
    emoji: "♉", element: "Earth", mode: "Fixed", ruler: "Venus", hebrew: "ו", hiero: "𓌉", phoenician: "𐤅", runic: "ᚠ", letterName: "Vav", letterMeaning: "Vav means 'hook' — Taurus is the binding force that connects heaven to earth through the physical",
    plain: "Steady and sensual. Taurus builds slowly and values security and beauty.",
    power: "Stability, Sensuality, Patience",
    compat: "Virgo, Capricorn, Cancer",
    shadow: "Stubbornness, possessiveness, resistant to change."
  },
  Gemini: {
    emoji: "♊", element: "Air", mode: "Mutable", ruler: "Mercury", hebrew: "ז", hiero: "𓈔", phoenician: "𐤆", runic: "ᛉ", letterName: "Zayin", letterMeaning: "Zayin means 'sword' — Gemini is the mind that cuts, divides, and discerns between possibilities",
    plain: "Curious and versatile. Gemini collects ideas and thrives on variety.",
    power: "Communication, Intelligence, Adaptability",
    compat: "Libra, Aquarius, Aries",
    shadow: "Inconsistency, tendency to be superficial, scattered energy."
  },
  Cancer: {
    emoji: "♋", element: "Water", mode: "Cardinal", ruler: "Moon", hebrew: "ח", hiero: "𓉗", phoenician: "𐤇", runic: "ᚺ", letterName: "Chet", letterMeaning: "Chet means 'fence' — Cancer builds the sacred enclosure of home, womb, and emotional protection",
    plain: "Deeply feeling and protective. Cancer nurtures and creates a sense of home.",
    power: "Intuition, Nurturing, Emotional Depth",
    compat: "Scorpio, Pisces, Taurus",
    shadow: "Oversensitivity, moodiness, clinging to the past."
  },
  Leo: {
    emoji: "♌", element: "Fire", mode: "Fixed", ruler: "Sun", hebrew: "ט", hiero: "𓄤", phoenician: "𐤈", runic: "ᚦ", letterName: "Teth", letterMeaning: "Teth means 'serpent' — Leo is the coiled life-force, the kundalini fire of sovereign creative power",
    plain: "Radiant and generous. Leo loves to shine and warm others with its light.",
    power: "Creativity, Sovereignty, Warmth",
    compat: "Aries, Sagittarius, Gemini",
    shadow: "Pride, need for attention, inflexibility."
  },
  Virgo: {
    emoji: "♍", element: "Earth", mode: "Mutable", ruler: "Mercury", hebrew: "י", hiero: "𓂝", phoenician: "𐤉", runic: "ᛁ", letterName: "Yod", letterMeaning: "Yod means 'hand' — Virgo is the precise, skillful hand that shapes raw material into useful form",
    plain: "Precise and of service. Virgo notices every detail and seeks to improve.",
    power: "Detail, Service, Analysis",
    compat: "Taurus, Capricorn, Cancer",
    shadow: "Hyper-criticism, worry, perfectionism to a fault."
  },
  Libra: {
    emoji: "♎", element: "Air", mode: "Cardinal", ruler: "Venus", hebrew: "ל", hiero: "𓋿", phoenician: "𐤋", runic: "ᛚ", letterName: "Lamed", letterMeaning: "Lamed means 'ox-goad' — Libra is the guide that drives toward balance, justice, and right relation",
    plain: "Harmonious and fair-minded. Libra seeks beauty and partnership.",
    power: "Balance, Diplomacy, Aesthetics",
    compat: "Gemini, Aquarius, Leo",
    shadow: "Indecisiveness, self-pity, avoids necessary conflict."
  },
  Scorpio: {
    emoji: "♏", element: "Water", mode: "Fixed", ruler: "Pluto", hebrew: "נ", hiero: "𓆓", phoenician: "𐤍", runic: "ᚾ", letterName: "Nun", letterMeaning: "Nun means 'fish/serpent' — Scorpio is the creature that regenerates in the deep, unseen waters",
    plain: "Intense and transformative. Scorpio dives into the depths of mystery.",
    power: "Intensity, Rebirth, Truth",
    compat: "Cancer, Pisces, Capricorn",
    shadow: "Secretiveness, jealousy, tendency toward extremes."
  },
  Sagittarius: {
    emoji: "♐", element: "Fire", mode: "Mutable", ruler: "Jupiter", hebrew: "ס", hiero: "𓊽", phoenician: "𐤎", runic: "ᛋ", letterName: "Samekh", letterMeaning: "Samekh means 'prop/pillar' — Sagittarius is the Djed column, the support structure of meaning and faith",
    plain: "Expansive and truth-seeking. Sagittarius explores new horizons.",
    power: "Exploration, Optimism, Higher Truth",
    compat: "Aries, Leo, Aquarius",
    shadow: "Recklessness, over-promising, lack of tact."
  },
  Capricorn: {
    emoji: "♑", element: "Earth", mode: "Cardinal", ruler: "Saturn", hebrew: "ע", hiero: "𓁹", phoenician: "𐤏", runic: "ᛟ", letterName: "Ayin", letterMeaning: "Ayin means 'eye' — Capricorn is the watchful eye that sees the summit and measures the distance with precision",
    plain: "Disciplined and ambitious. Capricorn builds structures that last.",
    power: "Mastery, Ambition, Responsibility",
    compat: "Taurus, Virgo, Scorpio",
    shadow: "Coldness, workaholism, pessimistic about success."
  },
  Aquarius: {
    emoji: "♒", element: "Air", mode: "Fixed", ruler: "Uranus", hebrew: "צ", hiero: "𓇑", phoenician: "𐤑", runic: "—", letterName: "Tsade", letterMeaning: "Tsade means 'fishhook/righteous one' — Aquarius casts the line into the future to catch truth for humanity",
    plain: "Visionary and humanitarian. Aquarius thinks ahead of its time.",
    power: "Innovation, Community, Freedom",
    compat: "Gemini, Libra, Sagittarius",
    shadow: "Detachment, radicalism, unpredictable behavior."
  },
  Pisces: {
    emoji: "♓", element: "Water", mode: "Mutable", ruler: "Neptune", hebrew: "ק", hiero: "𓎗", phoenician: "𐤒", runic: "—", letterName: "Qoph", letterMeaning: "Qoph means 'back of the head' — Pisces is the hidden knowledge you feel but cannot see directly",
    plain: "Empathic and otherworldly. Pisces dissolves boundaries to feel.",
    power: "Compassion, Imagination, Spirituality",
    compat: "Cancer, Scorpio, Taurus",
    shadow: "Vagueness, escapism, being a martyr."
  },
};
export const EL_COL = { Fire: "#ff5252", Earth: "#8bc34a", Air: "#29b6f6", Water: "#5c6bc0" };
export const MOD_COL = { Cardinal: "#ffa726", Fixed: "#ab47bc", Mutable: "#4dd0e1" };
