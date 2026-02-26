from itertools import combinations

ASPECT_DEFINITIONS = {
    "conjunction":    {"angle": 0,   "orb": 8.0},
    "semi-sextile":   {"angle": 30,  "orb": 2.0},
    "semi-square":    {"angle": 45,  "orb": 2.0},
    "sextile":        {"angle": 60,  "orb": 6.0},
    "quintile":       {"angle": 72,  "orb": 2.0},
    "square":         {"angle": 90,  "orb": 7.0},
    "trine":          {"angle": 120, "orb": 8.0},
    "sesquiquadrate": {"angle": 135, "orb": 2.0},
    "quincunx":       {"angle": 150, "orb": 3.0},
    "opposition":     {"angle": 180, "orb": 8.0},
}

LUMINARY_BONUS = 2.0


class AspectEngine:

    def compute(self, positions: dict) -> list[dict]:
        aspects = []
        planet_names = list(positions.keys())

        for p1, p2 in combinations(planet_names, 2):
            lon1 = self._extract_lon(positions[p1])
            lon2 = self._extract_lon(positions[p2])
            speed1 = self._extract_speed(positions[p1])
            speed2 = self._extract_speed(positions[p2])

            diff = abs(lon1 - lon2) % 360
            if diff > 180:
                diff = 360 - diff

            for asp_name, asp_def in ASPECT_DEFINITIONS.items():
                orb_limit = asp_def["orb"]
                if self._is_luminary(p1) or self._is_luminary(p2):
                    orb_limit += LUMINARY_BONUS

                actual_orb = abs(diff - asp_def["angle"])
                if actual_orb <= orb_limit:
                    strength = round(1.0 - (actual_orb / orb_limit), 6)
                    applying = self._is_applying(
                        lon1, lon2, speed1, speed2, asp_def["angle"]
                    )
                    aspects.append({
                        "planet1": p1,
                        "planet2": p2,
                        "aspect": asp_name,
                        "angle": asp_def["angle"],
                        "orb": round(actual_orb, 6),
                        "max_orb": orb_limit,
                        "strength": strength,
                        "applying": applying,
                    })
                    break

        return aspects

    def _extract_lon(self, value) -> float:
        if isinstance(value, dict):
            return value["longitude"]
        return float(value)

    def _extract_speed(self, value) -> float:
        if isinstance(value, dict):
            return value.get("speed", 0.0)
        return 0.0

    def _is_luminary(self, name: str) -> bool:
        base = name.split("_")[-1] if "_" in name else name
        return base in ("Sun", "Moon")

    def _is_applying(
        self,
        lon1: float,
        lon2: float,
        speed1: float,
        speed2: float,
        aspect_angle: float,
    ) -> bool:
        diff_now = abs(lon1 - lon2) % 360
        if diff_now > 180:
            diff_now = 360 - diff_now
        current_orb = abs(diff_now - aspect_angle)

        step = 1.0 / 24.0
        future_lon1 = (lon1 + speed1 * step) % 360
        future_lon2 = (lon2 + speed2 * step) % 360
        diff_future = abs(future_lon1 - future_lon2) % 360
        if diff_future > 180:
            diff_future = 360 - diff_future
        future_orb = abs(diff_future - aspect_angle)

        return future_orb < current_orb
