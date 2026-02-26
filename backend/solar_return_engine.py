import swisseph as swe
from planetary_engine import PlanetaryEngine
from house_engine import HouseEngine


def _sun_lon_at(jd: float) -> float:
    result, _ = swe.calc_ut(jd, swe.SUN, swe.FLG_MOSEPH)
    return result[0] % 360


def _angle_diff(a: float, b: float) -> float:
    d = (a - b) % 360
    if d > 180:
        d -= 360
    return d


class SolarReturnEngine:

    def find_solar_return(self, natal_sun_lon: float, year: int, lat: float, lon: float) -> dict | None:
        jd_start = swe.julday(year, 1, 1, 0.0)

        # Coarse scan: 1-day steps over the year
        best_jd = None
        best_abs_diff = 999.0
        for i in range(366):
            jd = jd_start + i
            sun_now = _sun_lon_at(jd)
            d = abs(_angle_diff(sun_now, natal_sun_lon))
            if d < best_abs_diff:
                best_abs_diff = d
                best_jd = jd

        if best_jd is None:
            return None

        # Bisection refinement to ~1 second precision
        lo = best_jd - 1.0
        hi = best_jd + 1.0
        for _ in range(50):
            mid = (lo + hi) / 2.0
            d = _angle_diff(_sun_lon_at(mid), natal_sun_lon)
            d_lo = _angle_diff(_sun_lon_at(lo), natal_sun_lon)
            if d_lo * d <= 0:
                hi = mid
            else:
                lo = mid
            if abs(hi - lo) < 1e-6:
                break

        sr_jd = (lo + hi) / 2.0

        planetary = PlanetaryEngine()
        tropical, sidereal = planetary.compute_positions(sr_jd)
        houses = HouseEngine().compute(sr_jd, lat, lon, tropical)

        return {
            "jd": sr_jd,
            "tropical": tropical,
            "sidereal": sidereal,
            "houses": houses,
        }
