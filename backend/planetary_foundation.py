"""The seven classical planets: foundation layer first, modern layers on top.

FOUNDATION holds only what is (a) documented in historical texts or
(c) measured or defined in physics, plus values computed from those by
plain arithmetic. MODERN_LAYERS holds (b) twentieth-century systems and our
own design rules. Modern layers may be shown on top of the foundation but
never replace a foundation value. Every entry names its source.

Standing labels:
  "a" historical and documented     "b" modern esoteric system
  "c" physics / measurement         "d" our own design rule
"""

import math

PHI = (1 + math.sqrt(5)) / 2
C_LIGHT = 299_792_458.0  # m/s, exact by definition of the metre (c)
SECONDS_PER_DAY = 86_400

# ---------------------------------------------------------------- foundation

# (a) Cassius Dio, Roman History 37.18-19 (trans. E. Cary): hours are given to
# the planets in turn starting from Saturn, the outermost; the first hour of
# each day names the day.
CHALDEAN_ORDER = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"]

# (a) Day rulers that follow from Dio's rule. Python weekday(): Monday = 0.
DAY_RULERS = {0: "Moon", 1: "Mars", 2: "Mercury", 3: "Jupiter",
              4: "Venus", 5: "Saturn", 6: "Sun"}

SYMBOLS = {"Saturn": "♄", "Jupiter": "♃", "Mars": "♂", "Sun": "☉",
           "Venus": "♀", "Mercury": "☿", "Moon": "☽"}

# (a) Agrippa, Three Books of Occult Philosophy, Book II ch. x,
# "Scale of the Number seven" (1651 English, esotericarchives.com).
AGRIPPA_SCALE_OF_SEVEN = {
    "Saturn":  {"angel": "Zaphkiel", "metal": "Lead",        "stone": "Onyx"},
    "Jupiter": {"angel": "Zadkiel",  "metal": "Tin",         "stone": "Saphire"},
    "Mars":    {"angel": "Camael",   "metal": "Iron",        "stone": "Diamond"},
    "Sun":     {"angel": "Raphael",  "metal": "Gold",        "stone": "Carbuncle"},
    "Venus":   {"angel": "Haniel",   "metal": "Copper",      "stone": "Emerald"},
    "Mercury": {"angel": "Michael",  "metal": "Quicksilver", "stone": "Achates"},
    "Moon":    {"angel": "Gabriel",  "metal": "Silver",      "stone": "Crystall"},
}

# (a) Barrett, The Magus (1801), ch. XXXI pp. 150-151: how each planet looks.
APPEARANCE_COLOUR = {
    "Saturn": "blue, and leaden", "Jupiter": "citrine, near to a paleness",
    "Mars": "red and fiery", "Sun": "yellow, and when it rises red",
    "Venus": "white and shining", "Mercury": "glittering", "Moon": "fair",
}

# (c) Orbital periods in days. Moon: NASA Moon Fact Sheet (sidereal 27.3217,
# synodic 29.53). Planets: standard sidereal values, consistent with the NASA
# planetary fact sheet ratios (0.241, 0.615, 1, 1.88, 11.9, 29.4).
SIDEREAL_PERIOD_DAYS = {
    "Moon": 27.3217, "Mercury": 87.969, "Venus": 224.701, "Earth": 365.2564,
    "Mars": 686.980, "Jupiter": 4332.589, "Saturn": 10759.22,
}
MOON_SYNODIC_DAYS = 29.530589
EARTH_TROPICAL_YEAR_DAYS = 365.2422

# (c) Orbital eccentricities (standard values) for Kepler's speed ratios.
ECCENTRICITY = {"Mercury": 0.20563, "Venus": 0.00677, "Earth": 0.01671,
                "Mars": 0.09339, "Jupiter": 0.04839, "Saturn": 0.05415}

# (a) Kepler, Harmonices Mundi (1619) Book V: intervals for Earth and Venus,
# confirmed this session (Earth 16:15 semitone, Venus 25:24 diesis).
KEPLER_INTERVALS = {"Earth": (16, 15), "Venus": (25, 24)}


def kepler_speed_ratio(planet: str) -> float:
    """(c) Fastest / slowest angular speed seen from the Sun: ((1+e)/(1-e))^2."""
    e = ECCENTRICITY[planet]
    return ((1 + e) / (1 - e)) ** 2


def venus_earth_cycle() -> dict:
    """(c) 13 Venus orbits, 8 Earth years and 5 Venus synodic periods."""
    v, e = SIDEREAL_PERIOD_DAYS["Venus"], SIDEREAL_PERIOD_DAYS["Earth"]
    synodic = 1 / (1 / v - 1 / e)
    return {"synodic_days": synodic, "five_synodic": 5 * synodic,
            "eight_years": 8 * e, "thirteen_orbits": 13 * v,
            "ratio": e / v, "fibonacci_ratio": 13 / 8}


def hour_ruler(day_ruler: str, hour_number: int) -> str:
    """(a) Ruler of planetary hour 1..24 of a day, by Dio's rule."""
    i = CHALDEAN_ORDER.index(day_ruler)
    return CHALDEAN_ORDER[(i + hour_number - 1) % 7]


FOUNDATION = {
    planet: {
        "symbol": SYMBOLS[planet],
        "order_index": CHALDEAN_ORDER.index(planet),
        **AGRIPPA_SCALE_OF_SEVEN[planet],
        "appearance": APPEARANCE_COLOUR[planet],
        "period_days": (MOON_SYNODIC_DAYS if planet == "Moon"
                        else SIDEREAL_PERIOD_DAYS.get(planet)),
        "standing": {"order": "a", "angel": "a", "metal": "a",
                     "appearance": "a", "period_days": "c"},
    }
    for planet in CHALDEAN_ORDER
}

# ------------------------------------------------------------- modern layers

NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def octave_tone(period_days: float, low: float = 126.0) -> dict:
    """(b on c) Cousto's cosmic octave method: invert the period to a frequency
    and double it into the audible range [low, 2*low); keep doubling into the
    visible band and convert to wavelength. Doubling keeps the pitch class."""
    f = 1 / (period_days * SECONDS_PER_DAY)
    while f < low:
        f *= 2
    while f >= 2 * low:
        f /= 2
    g = f
    while g < 394.7e12:
        g *= 2
    while g >= 789.5e12:
        g /= 2
    midi = 12 * math.log2(f / 440) + 69
    n = round(midi)
    return {"hz": f, "note": f"{NOTE_NAMES[n % 12]}{n // 12 - 1}",
            "cents": round((midi - n) * 100), "light_thz": g / 1e12,
            "wavelength_nm": C_LIGHT / g * 1e9}


MODERN_LAYERS = {
    # (b) Golden Dawn Sephirah colours as in Crowley, Liber 777 (read through
    # Heidrick, "Magical Correspondences"): Saturn-Binah ... Moon-Yesod.
    "golden_dawn_queen": {
        "standing": "b",
        "colours": {"Saturn": "Black", "Jupiter": "Blue", "Mars": "Scarlet red",
                    "Sun": "Yellow (gold)", "Venus": "Emerald", "Mercury": "Orange",
                    "Moon": "Violet"},
    },
    "golden_dawn_king": {
        "standing": "b",
        "colours": {"Saturn": "Crimson", "Jupiter": "Deep violet", "Mars": "Orange",
                    "Sun": "Clear pink rose", "Venus": "Amber", "Mercury": "Violet purple",
                    "Moon": "Indigo"},
    },
    # (b) Cousto, Die Kosmische Oktave (1978): method only; values computed.
    "cousto_tones": {
        "standing": "b",
        "tones": {p: octave_tone(FOUNDATION[p]["period_days"])
                  for p in CHALDEAN_ORDER if FOUNDATION[p]["period_days"]},
    },
    # (b) Stephanos, The Book of the Circle: golden ratio rounded to 38:62.
    "stephanos_balance": {"standing": "b", "minor": 38, "major": 62},
    # (d) Our rule: the accent blends planetary hour and clock wheel by 1/phi.
    "phi_blend": {"standing": "d", "planetary": 1 / PHI, "clock": 1 / PHI ** 2},
    # (d) Our rule: planet hues 137.5 degrees apart in Chaldean order.
    "golden_angle_hues": {
        "standing": "d",
        "hues": {p: round((i * 360 * (1 - 1 / PHI)) % 360, 3)
                 for i, p in enumerate(CHALDEAN_ORDER)},
    },
}
