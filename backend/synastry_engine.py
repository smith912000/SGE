from aspect_engine import AspectEngine
from math_utils import midpoint

COMPATIBILITY_WEIGHTS = {
    ("Sun", "Moon"): 3.0,
    ("Moon", "Sun"): 3.0,
    ("Sun", "Sun"): 2.0,
    ("Moon", "Moon"): 2.5,
    ("Venus", "Mars"): 3.0,
    ("Mars", "Venus"): 3.0,
    ("Venus", "Venus"): 2.0,
    ("Sun", "Venus"): 2.0,
    ("Venus", "Sun"): 2.0,
    ("Moon", "Venus"): 2.0,
    ("Venus", "Moon"): 2.0,
    ("Sun", "Mars"): 1.5,
    ("Mars", "Sun"): 1.5,
    ("Sun", "Jupiter"): 1.5,
    ("Jupiter", "Sun"): 1.5,
    ("Moon", "Jupiter"): 1.5,
    ("Jupiter", "Moon"): 1.5,
}

HARMONIOUS_ASPECTS = {"conjunction", "sextile", "trine"}
TENSE_ASPECTS = {"square", "opposition"}


class SynastryEngine:

    def compare(self, chart_a: dict, chart_b: dict) -> dict:
        combined = {}
        positions_a = chart_a.get("tropical", {})
        positions_b = chart_b.get("tropical", {})

        for k, v in positions_a.items():
            combined[f"A_{k}"] = v
        for k, v in positions_b.items():
            combined[f"B_{k}"] = v

        all_aspects = AspectEngine().compute(combined)

        cross_aspects = [
            a for a in all_aspects
            if (a["planet1"].startswith("A_") and a["planet2"].startswith("B_"))
            or (a["planet1"].startswith("B_") and a["planet2"].startswith("A_"))
        ]

        score = self.compatibility_score(cross_aspects)
        
        composite = self.calculate_composite(chart_a, chart_b)

        return {
            "aspects": cross_aspects,
            "score": score,
            "composite": composite,
        }

    def calculate_composite(self, chart_a: dict, chart_b: dict) -> dict:
        pos_a = chart_a.get("tropical", {})
        pos_b = chart_b.get("tropical", {})
        
        composite_pos = {}
        for p in pos_a:
            if p in pos_b:
                mid = midpoint(pos_a[p]["longitude"], pos_b[p]["longitude"])
                composite_pos[p] = {
                    "longitude": round(mid, 4),
                    "sign": int(mid // 30),
                    "degree": round(mid % 30, 4)
                }
        
        # Houses (mean midpoints)
        houses_a = chart_a.get("houses", [])
        houses_b = chart_b.get("houses", [])
        composite_houses = []
        if houses_a and houses_b:
            for h1, h2 in zip(houses_a, houses_b):
                composite_houses.append(round(midpoint(h1, h2), 4))
        
        # Internal aspects of the composite chart
        composite_aspects = AspectEngine().compute(composite_pos)
        
        return {
            "positions": composite_pos,
            "houses": composite_houses,
            "aspects": composite_aspects
        }

    def compatibility_score(self, aspects: list[dict]) -> dict:
        harmony = 0.0
        tension = 0.0
        total_weighted = 0.0

        for asp in aspects:
            p1_base = asp["planet1"].split("_", 1)[1]
            p2_base = asp["planet2"].split("_", 1)[1]

            weight = COMPATIBILITY_WEIGHTS.get((p1_base, p2_base), 1.0)
            contribution = asp["strength"] * weight

            if asp["aspect"] in HARMONIOUS_ASPECTS:
                harmony += contribution
            elif asp["aspect"] in TENSE_ASPECTS:
                tension += contribution

            total_weighted += contribution

        return {
            "harmony": round(harmony, 4),
            "tension": round(tension, 4),
            "total": round(total_weighted, 4),
            "balance": round(harmony - tension, 4),
        }
