import swisseph as swe
from planetary_engine import PlanetaryEngine, _lon_to_sign


class ProgressionEngine:

    def __init__(self):
        self._planetary = PlanetaryEngine()

    def secondary_progressions(self, natal_jd: float, age_years: float) -> dict:
        progressed_jd = natal_jd + age_years
        tropical, sidereal = self._planetary.compute_positions(progressed_jd)
        return {
            "jd": progressed_jd,
            "tropical": tropical,
            "sidereal": sidereal,
        }

    def progressed_moon(self, natal_jd: float, age_years: float) -> dict:
        progressed_jd = natal_jd + age_years
        flags = swe.FLG_MOSEPH | swe.FLG_SPEED
        result, _ = swe.calc_ut(progressed_jd, swe.MOON, flags)
        lon = result[0] % 360
        speed = result[3]
        sign_info = _lon_to_sign(lon)
        return {
            "longitude": round(lon, 6),
            "speed": round(speed, 6),
            **sign_info,
        }

    def progressed_sun_sign_changes(self, natal_jd: float, max_years: int = 90) -> list[dict]:
        flags = swe.FLG_MOSEPH
        changes = []

        result, _ = swe.calc_ut(natal_jd, swe.SUN, flags)
        prev_sign_index = int((result[0] % 360) / 30) % 12

        for year in range(1, max_years + 1):
            pjd = natal_jd + year
            result, _ = swe.calc_ut(pjd, swe.SUN, flags)
            lon = result[0] % 360
            sign_index = int(lon / 30) % 12
            if sign_index != prev_sign_index:
                sign_info = _lon_to_sign(lon)
                changes.append({
                    "age": year,
                    "jd": pjd,
                    **sign_info,
                })
                prev_sign_index = sign_index

        return changes
