import swisseph as swe

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces",
]

PLANETS = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mercury": swe.MERCURY,
    "Venus": swe.VENUS,
    "Mars": swe.MARS,
    "Jupiter": swe.JUPITER,
    "Saturn": swe.SATURN,
    "Uranus": swe.URANUS,
    "Neptune": swe.NEPTUNE,
    "Pluto": swe.PLUTO,
    "North Node": swe.MEAN_NODE,
    "Chiron": swe.CHIRON,
    "Lilith": swe.MEAN_APOG,
}


def _lon_to_sign(lon: float) -> dict:
    sign_index = int(lon / 30) % 12
    degree_in_sign = lon % 30
    return {
        "sign": ZODIAC_SIGNS[sign_index],
        "sign_index": sign_index,
        "degree_in_sign": round(degree_in_sign, 6),
    }


class PlanetaryEngine:

    def compute_positions(self, jd: float) -> tuple[dict, dict]:
        tropical = self._compute(jd, sidereal=False)
        sidereal = self._compute(jd, sidereal=True)
        return tropical, sidereal

    def _compute(self, jd: float, sidereal: bool = False) -> dict:
        flags = swe.FLG_MOSEPH | swe.FLG_SPEED
        if sidereal:
            swe.set_sid_mode(swe.SIDM_LAHIRI)
            flags |= swe.FLG_SIDEREAL

        positions = {}
        for name, planet_id in PLANETS.items():
            try:
                result, ret_flags = swe.calc_ut(jd, planet_id, flags)
            except swe.Error:
                continue
            lon = result[0] % 360
            lat = result[1]
            speed = result[3]
            sign_info = _lon_to_sign(lon)
            positions[name] = {
                "longitude": round(lon, 6),
                "latitude": round(lat, 6),
                "speed": round(speed, 6),
                "retrograde": speed < 0,
                **sign_info,
            }
        return positions
