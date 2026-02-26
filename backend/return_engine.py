import swisseph as swe
from planetary_engine import PlanetaryEngine
from house_engine import HouseEngine


def _moon_lon_at(jd: float) -> float:
    result, _ = swe.calc_ut(jd, swe.MOON, swe.FLG_MOSEPH)
    return result[0] % 360


def _angle_diff(a: float, b: float) -> float:
    d = (a - b) % 360
    if d > 180:
        d -= 360
    return d


class LunarReturnEngine:

    def find_lunar_return(
        self,
        natal_moon_lon: float,
        jd_start: float,
        lat: float = 0.0,
        lon: float = 0.0,
    ) -> dict | None:
        # Coarse scan: 0.25-day steps over ~30 days (one lunar cycle is ~27.3 days)
        best_jd = None
        best_abs_diff = 999.0
        for i in range(120):
            jd = jd_start + i * 0.25
            moon_now = _moon_lon_at(jd)
            d = abs(_angle_diff(moon_now, natal_moon_lon))
            if d < best_abs_diff:
                best_abs_diff = d
                best_jd = jd

        if best_jd is None or best_abs_diff > 10.0:
            return None

        # Bisection refinement
        lo = best_jd - 0.25
        hi = best_jd + 0.25
        for _ in range(50):
            mid = (lo + hi) / 2.0
            d = _angle_diff(_moon_lon_at(mid), natal_moon_lon)
            d_lo = _angle_diff(_moon_lon_at(lo), natal_moon_lon)
            if d_lo * d <= 0:
                hi = mid
            else:
                lo = mid
            if abs(hi - lo) < 1e-6:
                break

        lr_jd = (lo + hi) / 2.0

        planetary = PlanetaryEngine()
        tropical, sidereal = planetary.compute_positions(lr_jd)
        houses = HouseEngine().compute(lr_jd, lat, lon, tropical)

        return {
            "jd": lr_jd,
            "tropical": tropical,
            "sidereal": sidereal,
            "houses": houses,
        }
