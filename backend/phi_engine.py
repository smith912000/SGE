import math

PHI = (1 + math.sqrt(5)) / 2  # 1.6180339887...
PHI_INV = 1 / PHI              # 0.6180339887...

FIBONACCI_SEQ = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]

PHI_STATES = [
    {"label": "Phi Peak",       "min": 0.0,   "max": 0.1},
    {"label": "Phi Ascent",     "min": 0.1,   "max": 0.382},
    {"label": "Phi Equilibrium","min": 0.382,  "max": 0.618},
    {"label": "Phi Descent",    "min": 0.618,  "max": 0.9},
    {"label": "Phi Nadir",      "min": 0.9,   "max": 1.0},
]


class PhiEngine:

    def compute(self, day_of_cycle: int, cycle_length: int) -> tuple[str, float]:
        if cycle_length <= 0:
            return "Undefined", 1.0

        position = (day_of_cycle % cycle_length) / cycle_length
        phi_position = (position * PHI) % 1.0

        state = "Phi Equilibrium"
        for s in PHI_STATES:
            if s["min"] <= phi_position < s["max"]:
                state = s["label"]
                break

        # Multiplier: peaks at phi resonance points, ranges ~0.5 to ~1.5
        multiplier = 0.5 + abs(math.sin(phi_position * math.pi * PHI))

        return state, round(multiplier, 6)

    def fibonacci_resonance(self, day_of_cycle: int) -> dict:
        is_fibonacci = day_of_cycle in FIBONACCI_SEQ
        nearest = min(FIBONACCI_SEQ, key=lambda f: abs(f - day_of_cycle))
        distance = abs(day_of_cycle - nearest)

        resonance = max(0.0, 1.0 - distance / nearest) if nearest > 0 else 0.0

        return {
            "day": day_of_cycle,
            "is_fibonacci_day": is_fibonacci,
            "nearest_fibonacci": nearest,
            "distance": distance,
            "resonance": round(resonance, 6),
        }

    def full_analysis(self, day_of_cycle: int, cycle_length: int) -> dict:
        state, multiplier = self.compute(day_of_cycle, cycle_length)
        fib = self.fibonacci_resonance(day_of_cycle)

        return {
            "phi_state": state,
            "multiplier": multiplier,
            "fibonacci": fib,
            "phi_constant": round(PHI, 10),
            "cycle_position": round(
                (day_of_cycle % cycle_length) / cycle_length if cycle_length > 0 else 0, 6
            ),
        }
