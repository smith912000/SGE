from datetime import datetime

from time_engine import TimeEngine
from planetary_engine import PlanetaryEngine
from house_engine import HouseEngine
from aspect_engine import AspectEngine
from transit_engine import TransitEngine
from progression_engine import ProgressionEngine
from solar_return_engine import SolarReturnEngine
from return_engine import LunarReturnEngine
from synastry_engine import SynastryEngine
from harmonic_engine import HarmonicEngine
from chinese_cycle import chinese_year, chinese_day
from chronometric_engine import ChronometricEngine
from phi_engine import PhiEngine
from element_modality import ElementModalityEngine


class SGE:
    """SGE v5.0 -- Full Professional Astro-Temporal System"""

    VERSION = "5.0"

    def __init__(self):
        self.time_engine = TimeEngine()
        self.planetary_engine = PlanetaryEngine()
        self.house_engine = HouseEngine()
        self.aspect_engine = AspectEngine()
        self.transit_engine = TransitEngine()
        self.progression_engine = ProgressionEngine()
        self.solar_return_engine = SolarReturnEngine()
        self.lunar_return_engine = LunarReturnEngine()
        self.synastry_engine = SynastryEngine()
        self.harmonic_engine = HarmonicEngine()
        self.chronometric_engine = ChronometricEngine()
        self.phi_engine = PhiEngine()
        self.element_modality_engine = ElementModalityEngine()

    def natal_chart(self, birth_dt: datetime, tz: str, lat: float, lon: float) -> dict:
        dt_utc = self.time_engine.to_utc(birth_dt, tz)
        jd = self.time_engine.julian_day(dt_utc)

        tropical, sidereal = self.planetary_engine.compute_positions(jd)
        houses = self.house_engine.compute(jd, lat, lon, tropical)
        aspects = self.aspect_engine.compute(tropical)
        elements = self.element_modality_engine.compute(tropical)

        return {
            "jd": jd,
            "dt_utc": dt_utc.isoformat(),
            "tropical": tropical,
            "sidereal": sidereal,
            "houses": houses,
            "aspects": aspects,
            "element_modality": elements,
        }

    def full_analysis(
        self,
        birth_dt: datetime,
        tz: str,
        lat: float,
        lon: float,
        age: float | None = None,
        transit_dt: datetime | None = None,
        transit_tz: str = "UTC",
        comparison_birth_dt: datetime | None = None,
        comparison_tz: str | None = None,
        comparison_lat: float | None = None,
        comparison_lon: float | None = None,
        harmonic_n: int = 5,
        phi_cycle_length: int = 30,
    ) -> dict:
        dt_utc = self.time_engine.to_utc(birth_dt, tz)
        jd = self.time_engine.julian_day(dt_utc)

        # --- Natal ---
        tropical, sidereal = self.planetary_engine.compute_positions(jd)
        houses = self.house_engine.compute(jd, lat, lon, tropical)
        aspects = self.aspect_engine.compute(tropical)
        elements = self.element_modality_engine.compute(tropical)

        output = {
            "version": self.VERSION,
            "input": {
                "birth_dt": birth_dt.isoformat(),
                "timezone": tz,
                "latitude": lat,
                "longitude": lon,
            },
            "jd": jd,
            "dt_utc": dt_utc.isoformat(),
            "tropical": tropical,
            "sidereal": sidereal,
            "houses": houses,
            "aspects": aspects,
            "element_modality": elements,
        }

        # --- Transits ---
        if transit_dt is not None:
            transit_utc = self.time_engine.to_utc(transit_dt, tz)
            transit_jd = self.time_engine.julian_day(transit_utc)
            transit_aspects, transit_score = self.transit_engine.weighted_transits(
                tropical, transit_jd
            )
            output["transits"] = {
                "transit_dt": transit_utc.isoformat(),
                "transit_jd": transit_jd,
                "aspects": transit_aspects,
                "score": transit_score,
            }

        # --- Progressions ---
        if age is not None:
            progressions = self.progression_engine.secondary_progressions(jd, age)
            progressed_moon = self.progression_engine.progressed_moon(jd, age)
            progressions["progressed_moon"] = progressed_moon
            output["progressions"] = progressions

        # --- Solar Return ---
        solar_return = self.solar_return_engine.find_solar_return(
            tropical["Sun"]["longitude"], dt_utc.year + 1, lat, lon
        )
        if solar_return:
            output["solar_return"] = solar_return

        # --- Lunar Return ---
        lunar_return = self.lunar_return_engine.find_lunar_return(
            tropical["Moon"]["longitude"], jd, lat, lon
        )
        if lunar_return:
            output["lunar_return"] = lunar_return

        # --- Harmonics ---
        harmonic = self.harmonic_engine.compute(tropical, harmonic_n)
        output["harmonic"] = harmonic

        # --- Chinese Cycle ---
        ch_year = chinese_year(dt_utc.year)
        ch_day = chinese_day(jd)
        output["chinese"] = {
            "year": ch_year,
            "day": ch_day,
        }

        # --- Chronometric ---
        chrono = self.chronometric_engine.compute_slots(dt_utc)
        output["chronometric"] = chrono

        # --- Phi ---
        phi_data = self.phi_engine.full_analysis(dt_utc.timetuple().tm_yday, phi_cycle_length)
        output["phi"] = phi_data

        # --- Synastry ---
        if comparison_birth_dt and comparison_tz is not None:
            comp_utc = self.time_engine.to_utc(comparison_birth_dt, comparison_tz)
            comp_jd = self.time_engine.julian_day(comp_utc)
            comp_lat = comparison_lat if comparison_lat is not None else lat
            comp_lon = comparison_lon if comparison_lon is not None else lon

            comp_trop, comp_sid = self.planetary_engine.compute_positions(comp_jd)
            chart_b = {"tropical": comp_trop, "sidereal": comp_sid}
            chart_a = {"tropical": tropical, "sidereal": sidereal}

            synastry = self.synastry_engine.compare(chart_a, chart_b)
            output["synastry"] = synastry

        return output
