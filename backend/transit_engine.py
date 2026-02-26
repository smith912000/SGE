from planetary_engine import PlanetaryEngine
from aspect_engine import AspectEngine, ASPECT_DEFINITIONS


TRANSIT_ORBS = {
    "conjunction":    6.0,
    "semi-sextile":   1.5,
    "semi-square":    1.5,
    "sextile":        4.0,
    "quintile":       1.5,
    "square":         5.0,
    "trine":          6.0,
    "sesquiquadrate": 1.5,
    "quincunx":       2.5,
    "opposition":     6.0,
}


class TransitEngine:

    def __init__(self):
        self._planetary = PlanetaryEngine()

    def compute_transits(self, transit_jd: float) -> tuple[dict, dict]:
        return self._planetary.compute_positions(transit_jd)

    def compare(self, natal_positions: dict, transit_positions: dict) -> list[dict]:
        combined = {}
        for k, v in natal_positions.items():
            combined[f"natal_{k}"] = v
        for k, v in transit_positions.items():
            combined[f"transit_{k}"] = v

        all_aspects = AspectEngine().compute(combined)

        cross_aspects = [
            a for a in all_aspects
            if (a["planet1"].startswith("natal_") and a["planet2"].startswith("transit_"))
            or (a["planet1"].startswith("transit_") and a["planet2"].startswith("natal_"))
        ]
        return cross_aspects

    def weighted_transits(self, natal_positions: dict, transit_jd: float) -> tuple[list[dict], float]:
        transit_trop, _ = self.compute_transits(transit_jd)
        aspects = self.compare(natal_positions, transit_trop)

        total_score = 0.0
        for asp in aspects:
            total_score += asp["strength"]

        return aspects, round(total_score, 6)
