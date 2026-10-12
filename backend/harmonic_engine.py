ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces",
]


def _lon_to_sign(lon: float) -> dict:
    sign_index = int(lon / 30) % 12
    degree_in_sign = lon % 30
    return {
        "sign": ZODIAC_SIGNS[sign_index],
        "sign_index": sign_index,
        "degree_in_sign": round(degree_in_sign, 6),
    }


HARMONIC_MEANINGS = {
    1: "Radical (natal chart)",
    2: "Opposition / polarity",
    3: "Trine / creativity flow",
    4: "Square / challenge and action",
    5: "Quintile / creative talent",
    7: "Septile / spiritual inspiration",
    8: "Semisquare / manifest effort",
    9: "Novile / joy, dharma, marriage",
    12: "Semisextile / subtle growth",
}


class HarmonicEngine:

    def compute(self, positions: dict, harmonic_number: int) -> dict:
        harmonic_positions = {}

        for planet, data in positions.items():
            lon = data["longitude"] if isinstance(data, dict) else float(data)
            new_lon = (lon * harmonic_number) % 360
            sign_info = _lon_to_sign(new_lon)
            harmonic_positions[planet] = {
                "longitude": round(new_lon, 6),
                "original_longitude": round(lon, 6),
                **sign_info,
            }

        meaning = HARMONIC_MEANINGS.get(harmonic_number, f"Harmonic {harmonic_number}")

        return {
            "harmonic_number": harmonic_number,
            "meaning": meaning,
            "positions": harmonic_positions,
        }
