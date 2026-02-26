SIGN_ELEMENT = {
    "Aries": "Fire",      "Taurus": "Earth",    "Gemini": "Air",
    "Cancer": "Water",    "Leo": "Fire",        "Virgo": "Earth",
    "Libra": "Air",       "Scorpio": "Water",   "Sagittarius": "Fire",
    "Capricorn": "Earth", "Aquarius": "Air",    "Pisces": "Water",
}

SIGN_MODALITY = {
    "Aries": "Cardinal",    "Taurus": "Fixed",      "Gemini": "Mutable",
    "Cancer": "Cardinal",   "Leo": "Fixed",         "Virgo": "Mutable",
    "Libra": "Cardinal",    "Scorpio": "Fixed",     "Sagittarius": "Mutable",
    "Capricorn": "Cardinal","Aquarius": "Fixed",    "Pisces": "Mutable",
}

# Luminaries and personal planets weighted more heavily
PLANET_WEIGHTS = {
    "Sun": 3.0, "Moon": 3.0, "Mercury": 2.0, "Venus": 2.0, "Mars": 2.0,
    "Jupiter": 1.5, "Saturn": 1.5,
    "Uranus": 1.0, "Neptune": 1.0, "Pluto": 1.0,
    "North Node": 0.5, "Chiron": 0.5,
}


class ElementModalityEngine:

    def compute(self, positions: dict) -> dict:
        elements = {"Fire": 0.0, "Earth": 0.0, "Air": 0.0, "Water": 0.0}
        modalities = {"Cardinal": 0.0, "Fixed": 0.0, "Mutable": 0.0}
        planet_breakdown = []

        for planet_name, data in positions.items():
            sign = data["sign"] if isinstance(data, dict) else None
            if sign is None:
                continue

            weight = PLANET_WEIGHTS.get(planet_name, 1.0)
            element = SIGN_ELEMENT.get(sign)
            modality = SIGN_MODALITY.get(sign)

            if element:
                elements[element] += weight
            if modality:
                modalities[modality] += weight

            planet_breakdown.append({
                "planet": planet_name,
                "sign": sign,
                "element": element,
                "modality": modality,
                "weight": weight,
            })

        dominant_element = max(elements, key=elements.get)
        dominant_modality = max(modalities, key=modalities.get)

        return {
            "elements": {k: round(v, 2) for k, v in elements.items()},
            "modalities": {k: round(v, 2) for k, v in modalities.items()},
            "dominant_element": dominant_element,
            "dominant_modality": dominant_modality,
            "breakdown": planet_breakdown,
        }
