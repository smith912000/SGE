from aspect_engine import AspectEngine

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

        return {
            "aspects": cross_aspects,
            "score": score,
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
