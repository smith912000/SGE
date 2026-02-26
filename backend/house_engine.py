import swisseph as swe
from planetary_engine import ZODIAC_SIGNS, _lon_to_sign


class HouseEngine:

    def compute(self, jd: float, lat: float, lon: float, positions: dict | None = None) -> dict:
        placidus = self._compute_system(jd, lat, lon, b"P")
        whole_sign = self._compute_system(jd, lat, lon, b"W")

        result = {
            "placidus": placidus,
            "whole_sign": whole_sign,
        }

        if positions:
            result["placidus"]["planet_houses"] = self._assign_houses(
                positions, placidus["cusps"]
            )
            result["whole_sign"]["planet_houses"] = self._assign_houses(
                positions, whole_sign["cusps"]
            )

        return result

    def _compute_system(self, jd: float, lat: float, lon: float, system: bytes) -> dict:
        cusps, ascmc = swe.houses(jd, lat, lon, system)
        cusp_list = []
        for i, cusp_lon in enumerate(cusps):
            cusp_lon = cusp_lon % 360
            info = _lon_to_sign(cusp_lon)
            cusp_list.append({
                "house": i + 1,
                "longitude": round(cusp_lon, 6),
                **info,
            })

        return {
            "cusps": cusp_list,
            "ascendant": round(ascmc[0] % 360, 6),
            "mc": round(ascmc[1] % 360, 6),
            "armc": round(ascmc[2] % 360, 6),
            "vertex": round(ascmc[3] % 360, 6),
        }

    def _assign_houses(self, positions: dict, cusps: list[dict]) -> dict:
        cusp_lons = [c["longitude"] for c in cusps]
        assignments = {}
        for planet_name, pdata in positions.items():
            plon = pdata["longitude"]
            house = self._find_house(plon, cusp_lons)
            assignments[planet_name] = house
        return assignments

    def _find_house(self, lon: float, cusp_lons: list[float]) -> int:
        n = len(cusp_lons)
        for i in range(n):
            start = cusp_lons[i]
            end = cusp_lons[(i + 1) % n]
            if start < end:
                if start <= lon < end:
                    return i + 1
            else:
                if lon >= start or lon < end:
                    return i + 1
        return 1
