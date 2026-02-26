from datetime import datetime

# Chaldean planetary order (descending orbital period)
CHALDEAN_ORDER = [
    "Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon",
]

# Traditional day rulers mapped to weekday index (Monday=0 in Python)
DAY_RULERS = {
    0: "Moon",
    1: "Mars",
    2: "Mercury",
    3: "Jupiter",
    4: "Venus",
    5: "Saturn",
    6: "Sun",
}


class ChronometricEngine:

    def compute_slots(self, dt_utc: datetime) -> dict:
        weekday = dt_utc.weekday()
        day_ruler = DAY_RULERS[weekday]

        # Find starting index in Chaldean order for this day's ruler
        ruler_index = CHALDEAN_ORDER.index(day_ruler)

        slots = []
        for slot in range(24):
            planet_index = (ruler_index + slot) % 7
            ruling_planet = CHALDEAN_ORDER[planet_index]
            slots.append({
                "slot": slot,
                "hour_start": slot,
                "hour_end": (slot + 1) % 24,
                "ruler": ruling_planet,
            })

        current_hour = dt_utc.hour
        current_slot = slots[current_hour]

        return {
            "day_ruler": day_ruler,
            "weekday": weekday,
            "current_slot": current_slot,
            "all_slots": slots,
        }
