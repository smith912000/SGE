export const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
export const SIGN_SYM = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
export const SIGN_COL = {
  Aries: "#ff6b6b", Taurus: "#8bc34a", Gemini: "#fdd835", Cancer: "#64b5f6",
  Leo: "#ff9800", Virgo: "#aed581", Libra: "#f06292", Scorpio: "#e53935",
  Sagittarius: "#ff7043", Capricorn: "#a1887f", Aquarius: "#29b6f6", Pisces: "#9575cd",
};
export const SIGN_INFO = {
  Aries: {
    emoji: "♈", element: "Fire", mode: "Cardinal", ruler: "Mars", hebrew: "ה",
    plain: "Bold and pioneering. Aries energy is direct, courageous, and loves being first.",
    power: "Action, Courage, Initiative",
    compat: "Gemini, Leo, Sagittarius",
    shadow: "Lacks patience, impulsive, can be aggressive."
  },
  Taurus: {
    emoji: "♉", element: "Earth", mode: "Fixed", ruler: "Venus", hebrew: "ו",
    plain: "Steady and sensual. Taurus builds slowly and values security and beauty.",
    power: "Stability, Sensuality, Patience",
    compat: "Virgo, Capricorn, Cancer",
    shadow: "Stubbornness, possessiveness, resistant to change."
  },
  Gemini: {
    emoji: "♊", element: "Air", mode: "Mutable", ruler: "Mercury", hebrew: "ז",
    plain: "Curious and versatile. Gemini collects ideas and thrives on variety.",
    power: "Communication, Intelligence, Adaptability",
    compat: "Libra, Aquarius, Aries",
    shadow: "Inconsistency, tendency to be superficial, scattered energy."
  },
  Cancer: {
    emoji: "♋", element: "Water", mode: "Cardinal", ruler: "Moon", hebrew: "ח",
    plain: "Deeply feeling and protective. Cancer nurtures and creates a sense of home.",
    power: "Intuition, Nurturing, Emotional Depth",
    compat: "Scorpio, Pisces, Taurus",
    shadow: "Oversensitivity, moodiness, clinging to the past."
  },
  Leo: {
    emoji: "♌", element: "Fire", mode: "Fixed", ruler: "Sun", hebrew: "ט",
    plain: "Radiant and generous. Leo loves to shine and warm others with its light.",
    power: "Creativity, Sovereignty, Warmth",
    compat: "Aries, Sagittarius, Gemini",
    shadow: "Pride, need for attention, inflexibility."
  },
  Virgo: {
    emoji: "♍", element: "Earth", mode: "Mutable", ruler: "Mercury", hebrew: "י",
    plain: "Precise and of service. Virgo notices every detail and seeks to improve.",
    power: "Detail, Service, Analysis",
    compat: "Taurus, Capricorn, Cancer",
    shadow: "Hyper-criticism, worry, perfectionism to a fault."
  },
  Libra: {
    emoji: "♎", element: "Air", mode: "Cardinal", ruler: "Venus", hebrew: "ל",
    plain: "Harmonious and fair-minded. Libra seeks beauty and partnership.",
    power: "Balance, Diplomacy, Aesthetics",
    compat: "Gemini, Aquarius, Leo",
    shadow: "Indecisiveness, self-pity, avoids necessary conflict."
  },
  Scorpio: {
    emoji: "♏", element: "Water", mode: "Fixed", ruler: "Pluto", hebrew: "נ",
    plain: "Intense and transformative. Scorpio dives into the depths of mystery.",
    power: "Intensity, Rebirth, Truth",
    compat: "Cancer, Pisces, Capricorn",
    shadow: "Secretiveness, jealousy, tendency toward extremes."
  },
  Sagittarius: {
    emoji: "♐", element: "Fire", mode: "Mutable", ruler: "Jupiter", hebrew: "ס",
    plain: "Expansive and truth-seeking. Sagittarius explores new horizons.",
    power: "Exploration, Optimism, Higher Truth",
    compat: "Aries, Leo, Aquarius",
    shadow: "Recklessness, over-promising, lack of tact."
  },
  Capricorn: {
    emoji: "♑", element: "Earth", mode: "Cardinal", ruler: "Saturn", hebrew: "ע",
    plain: "Disciplined and ambitious. Capricorn builds structures that last.",
    power: "Mastery, Ambition, Responsibility",
    compat: "Taurus, Virgo, Scorpio",
    shadow: "Coldness, workaholism, pessimistic about success."
  },
  Aquarius: {
    emoji: "♒", element: "Air", mode: "Fixed", ruler: "Uranus", hebrew: "צ",
    plain: "Visionary and humanitarian. Aquarius thinks ahead of its time.",
    power: "Innovation, Community, Freedom",
    compat: "Gemini, Libra, Sagittarius",
    shadow: "Detachment, radicalism, unpredictable behavior."
  },
  Pisces: {
    emoji: "♓", element: "Water", mode: "Mutable", ruler: "Neptune", hebrew: "ק",
    plain: "Empathic and otherworldly. Pisces dissolves boundaries to feel.",
    power: "Compassion, Imagination, Spirituality",
    compat: "Cancer, Scorpio, Taurus",
    shadow: "Vagueness, escapism, being a martyr."
  },
};
export const EL_COL = { Fire: "#ff5252", Earth: "#8bc34a", Air: "#29b6f6", Water: "#5c6bc0" };
export const MOD_COL = { Cardinal: "#ffa726", Fixed: "#ab47bc", Mutable: "#4dd0e1" };
