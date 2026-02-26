"""
SGE v5.0 Smoke Test
Runs every engine with a known birth datetime and validates structural correctness.
Test subject: June 15, 1990, 14:30, New York (40.7128, -74.006)
"""

import json
import sys
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
from sge import SGE

BIRTH_DT = datetime(1990, 6, 15, 14, 30, 0)
TZ = "America/New_York"
LAT = 40.7128
LON = -74.006

PASS = 0
FAIL = 0


def check(name: str, condition: bool, detail: str = ""):
    global PASS, FAIL
    status = "PASS" if condition else "FAIL"
    if not condition:
        FAIL += 1
        print(f"  [{status}] {name}: {detail}")
    else:
        PASS += 1
        print(f"  [{status}] {name}")


def test_time_engine():
    print("\n=== TimeEngine ===")
    te = TimeEngine()
    utc = te.to_utc(BIRTH_DT, TZ)
    check("to_utc returns datetime", utc is not None)
    check("UTC offset applied", utc.hour != BIRTH_DT.hour or TZ == "UTC")

    jd = te.julian_day(utc)
    check("Julian Day is float", isinstance(jd, float))
    check("JD in valid range", 2440000 < jd < 2470000)

    roundtrip = te.jd_to_datetime(jd)
    check("JD roundtrip year", roundtrip.year == utc.year)
    check("JD roundtrip month", roundtrip.month == utc.month)
    check("JD roundtrip day", roundtrip.day == utc.day)
    return utc, jd


def test_planetary_engine(jd):
    print("\n=== PlanetaryEngine ===")
    pe = PlanetaryEngine()
    trop, sid = pe.compute_positions(jd)

    check("Tropical has >= 11 bodies", len(trop) >= 11, f"Got {len(trop)}")
    check("Sidereal has >= 11 bodies", len(sid) >= 11, f"Got {len(sid)}")
    check("Sun in tropical", "Sun" in trop)
    check("Moon in tropical", "Moon" in trop)

    sun = trop["Sun"]
    check("Sun has longitude", "longitude" in sun)
    check("Sun has sign", "sign" in sun)
    check("Sun has speed", "speed" in sun)
    check("Sun has retrograde flag", "retrograde" in sun)
    check("Sun longitude 0-360", 0 <= sun["longitude"] < 360)

    check("Sidereal offset from tropical",
          abs(trop["Sun"]["longitude"] - sid["Sun"]["longitude"]) > 15,
          "Ayanamsa offset should be ~24 degrees")

    return trop, sid


def test_house_engine(jd, positions):
    print("\n=== HouseEngine ===")
    he = HouseEngine()
    houses = he.compute(jd, LAT, LON, positions)

    check("Has placidus", "placidus" in houses)
    check("Has whole_sign", "whole_sign" in houses)
    check("Placidus has 12 cusps", len(houses["placidus"]["cusps"]) == 12)
    check("Whole sign has 12 cusps", len(houses["whole_sign"]["cusps"]) == 12)
    check("Placidus has ascendant", "ascendant" in houses["placidus"])
    check("Placidus has MC", "mc" in houses["placidus"])
    check("Placidus has planet_houses", "planet_houses" in houses["placidus"])
    return houses


def test_aspect_engine(positions):
    print("\n=== AspectEngine ===")
    ae = AspectEngine()
    aspects = ae.compute(positions)

    check("Aspects is list", isinstance(aspects, list))
    check("Found aspects", len(aspects) > 0, f"Got {len(aspects)}")
    if aspects:
        a = aspects[0]
        check("Aspect has planet1", "planet1" in a)
        check("Aspect has planet2", "planet2" in a)
        check("Aspect has type", "aspect" in a)
        check("Aspect has orb", "orb" in a)
        check("Aspect has strength", "strength" in a)
        check("Aspect has applying", "applying" in a)
        check("Strength 0-1", 0 <= a["strength"] <= 1)
    return aspects


def test_transit_engine(natal_positions, jd):
    print("\n=== TransitEngine ===")
    te = TransitEngine()
    transit_jd = jd + 365 * 30
    trop, sid = te.compute_transits(transit_jd)
    check("Transit tropical has planets", len(trop) >= 10)

    cross = te.compare(natal_positions, trop)
    check("Cross aspects is list", isinstance(cross, list))

    aspects, score = te.weighted_transits(natal_positions, transit_jd)
    check("Weighted transits returns aspects", isinstance(aspects, list))
    check("Weighted transits returns score", isinstance(score, float))


def test_progression_engine(jd):
    print("\n=== ProgressionEngine ===")
    pe = ProgressionEngine()
    prog = pe.secondary_progressions(jd, 30)
    check("Progression has jd", "jd" in prog)
    check("Progression has tropical", "tropical" in prog)
    check("Progression has sidereal", "sidereal" in prog)
    check("Progressed JD offset", abs(prog["jd"] - jd - 30) < 0.001)

    moon = pe.progressed_moon(jd, 30)
    check("Progressed moon has longitude", "longitude" in moon)
    check("Progressed moon has sign", "sign" in moon)

    changes = pe.progressed_sun_sign_changes(jd, 90)
    check("Sun sign changes is list", isinstance(changes, list))
    check("At least one sign change in 90 years", len(changes) > 0)


def test_solar_return_engine(natal_sun_lon):
    print("\n=== SolarReturnEngine ===")
    sre = SolarReturnEngine()
    result = sre.find_solar_return(natal_sun_lon, 2025, LAT, LON)
    check("Solar return found", result is not None)
    if result:
        check("SR has jd", "jd" in result)
        check("SR has tropical", "tropical" in result)
        check("SR has houses", "houses" in result)


def test_lunar_return_engine(natal_moon_lon, jd):
    print("\n=== LunarReturnEngine ===")
    lre = LunarReturnEngine()
    result = lre.find_lunar_return(natal_moon_lon, jd, LAT, LON)
    check("Lunar return found", result is not None)
    if result:
        check("LR has jd", "jd" in result)
        check("LR has tropical", "tropical" in result)
        check("LR JD after start", result["jd"] >= jd)


def test_synastry_engine(natal_trop):
    print("\n=== SynastryEngine ===")
    se = SynastryEngine()
    pe = PlanetaryEngine()
    te = TimeEngine()
    other_dt = datetime(1992, 3, 20, 10, 0, 0)
    other_utc = te.to_utc(other_dt, TZ)
    other_jd = te.julian_day(other_utc)
    other_trop, _ = pe.compute_positions(other_jd)

    chart_a = {"tropical": natal_trop}
    chart_b = {"tropical": other_trop}
    result = se.compare(chart_a, chart_b)

    check("Synastry has aspects", "aspects" in result)
    check("Synastry has score", "score" in result)
    check("Score has harmony", "harmony" in result["score"])
    check("Score has tension", "tension" in result["score"])
    check("Cross aspects found", len(result["aspects"]) > 0)


def test_harmonic_engine(positions):
    print("\n=== HarmonicEngine ===")
    he = HarmonicEngine()
    h5 = he.compute(positions, 5)
    check("Harmonic has number", h5["harmonic_number"] == 5)
    check("Harmonic has meaning", "meaning" in h5)
    check("Harmonic has positions", "positions" in h5)
    check("All planets in harmonic", len(h5["positions"]) == len(positions))
    for p, data in h5["positions"].items():
        check(f"H5 {p} longitude 0-360", 0 <= data["longitude"] < 360)
        break


def test_chinese_cycle(jd):
    print("\n=== Chinese Cycle ===")
    cy = chinese_year(1990)
    check("Chinese year has animal", "animal" in cy)
    check("Chinese year has stem", "heavenly_stem" in cy)
    check("Chinese year has branch", "earthly_branch" in cy)
    check("Chinese year has element", "stem_element" in cy)
    check("1990 is Horse", cy["animal"] == "Horse")
    check("1990 stem element is Metal", cy["stem_element"] == "Metal")

    cd = chinese_day(jd)
    check("Chinese day has stem", "heavenly_stem" in cd)
    check("Chinese day has branch", "earthly_branch" in cd)


def test_chronometric_engine(utc):
    print("\n=== ChronometricEngine ===")
    ce = ChronometricEngine()
    slots = ce.compute_slots(utc)
    check("Has day_ruler", "day_ruler" in slots)
    check("Has 24 slots", len(slots["all_slots"]) == 24)
    check("Has current_slot", "current_slot" in slots)
    check("Current slot has ruler", "ruler" in slots["current_slot"])


def test_phi_engine():
    print("\n=== PhiEngine ===")
    pe = PhiEngine()
    state, mult = pe.compute(15, 30)
    check("Phi state is string", isinstance(state, str))
    check("Multiplier is float", isinstance(mult, float))
    check("Multiplier in range", 0.3 < mult < 2.0)

    fib = pe.fibonacci_resonance(13)
    check("Fibonacci day 13 is fibonacci", fib["is_fibonacci_day"] is True)
    check("Fibonacci resonance = 1.0 for exact match", fib["resonance"] == 1.0)

    fib_off = pe.fibonacci_resonance(14)
    check("Day 14 is not fibonacci", fib_off["is_fibonacci_day"] is False)


def test_element_modality(positions):
    print("\n=== ElementModalityEngine ===")
    em = ElementModalityEngine()
    result = em.compute(positions)
    check("Has elements", "elements" in result)
    check("Has modalities", "modalities" in result)
    check("Has dominant element", "dominant_element" in result)
    check("Has dominant modality", "dominant_modality" in result)
    check("4 elements", len(result["elements"]) == 4)
    check("3 modalities", len(result["modalities"]) == 3)
    check("Element totals > 0", sum(result["elements"].values()) > 0)


def test_full_sge():
    print("\n=== SGE Full Analysis ===")
    sge = SGE()
    result = sge.full_analysis(
        birth_dt=BIRTH_DT,
        tz=TZ,
        lat=LAT,
        lon=LON,
        age=35,
        harmonic_n=7,
        phi_cycle_length=29,
    )
    check("Has version", result.get("version") == "5.0")
    check("Has tropical", "tropical" in result)
    check("Has sidereal", "sidereal" in result)
    check("Has houses", "houses" in result)
    check("Has aspects", "aspects" in result)
    check("Has progressions", "progressions" in result)
    check("Has solar_return", "solar_return" in result)
    check("Has lunar_return", "lunar_return" in result)
    check("Has harmonic", "harmonic" in result)
    check("Has chinese", "chinese" in result)
    check("Has chronometric", "chronometric" in result)
    check("Has phi", "phi" in result)
    check("Has element_modality", "element_modality" in result)

    print("\n--- Full Analysis Output (sample keys) ---")
    for key in result:
        val = result[key]
        if isinstance(val, dict):
            print(f"  {key}: dict with {len(val)} keys")
        elif isinstance(val, list):
            print(f"  {key}: list with {len(val)} items")
        else:
            print(f"  {key}: {val}")

    return result


def main():
    print("=" * 60)
    print("SGE v5.0 SMOKE TEST")
    print("=" * 60)

    utc, jd = test_time_engine()
    trop, sid = test_planetary_engine(jd)
    test_house_engine(jd, trop)
    test_aspect_engine(trop)
    test_transit_engine(trop, jd)
    test_progression_engine(jd)
    test_solar_return_engine(trop["Sun"]["longitude"])
    test_lunar_return_engine(trop["Moon"]["longitude"], jd)
    test_synastry_engine(trop)
    test_harmonic_engine(trop)
    test_chinese_cycle(jd)
    test_chronometric_engine(utc)
    test_phi_engine()
    test_element_modality(trop)
    result = test_full_sge()

    print("\n" + "=" * 60)
    print(f"RESULTS: {PASS} passed, {FAIL} failed")
    print("=" * 60)

    if FAIL > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
