"""
SGE backend smoke test
Runs the remaining Python engines and validates structural correctness.

Chart positions are computed in the browser by the JavaScript engines
(src/engines/). The Python ephemeris engines were removed with Swiss
Ephemeris on 2026-10-12 (see docs/DECISIONS.md), so these tests feed the
pure-math engines a fixed set of sample longitudes instead.
Test subject: June 15, 1990, 14:30, New York (40.7128, -74.006)
"""

import sys
from datetime import datetime

from time_engine import TimeEngine
from aspect_engine import AspectEngine
from synastry_engine import SynastryEngine
from harmonic_engine import HarmonicEngine, _lon_to_sign
from chinese_cycle import chinese_year, chinese_day
from chronometric_engine import ChronometricEngine
from phi_engine import PhiEngine
from element_modality import ElementModalityEngine

BIRTH_DT = datetime(1990, 6, 15, 14, 30, 0)
TZ = "America/New_York"
LAT = 40.7128
LON = -74.006

PASS = 0
FAIL = 0


def sample_positions(longitudes: dict) -> dict:
    return {
        name: {"longitude": lon, "speed": 0.0, **_lon_to_sign(lon)}
        for name, lon in longitudes.items()
    }


# Approximate tropical longitudes for the test subject (rounded; used as
# fixtures for the pure-math engines, not as an accuracy reference).
NATAL = sample_positions({
    "Sun": 84.3, "Moon": 334.1, "Mercury": 70.6, "Venus": 43.6,
    "Mars": 2.2, "Jupiter": 98.6, "Saturn": 293.9, "Uranus": 277.6,
    "Neptune": 283.9, "Pluto": 225.4,
})
OTHER = sample_positions({
    "Sun": 0.1, "Moon": 312.0, "Mercury": 344.5, "Venus": 316.2,
    "Mars": 304.8, "Jupiter": 95.5, "Saturn": 302.6, "Uranus": 286.9,
    "Neptune": 288.5, "Pluto": 231.6,
})


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



def test_synastry_engine(natal_trop):
    print("\n=== SynastryEngine ===")
    se = SynastryEngine()
    chart_a = {"tropical": natal_trop}
    chart_b = {"tropical": OTHER}
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


def main():
    print("=" * 60)
    print("SGE BACKEND SMOKE TEST")
    print("=" * 60)

    utc, jd = test_time_engine()
    test_aspect_engine(NATAL)
    test_synastry_engine(NATAL)
    test_harmonic_engine(NATAL)
    test_chinese_cycle(jd)
    test_chronometric_engine(utc)
    test_phi_engine()
    test_element_modality(NATAL)

    print("\n" + "=" * 60)
    print(f"RESULTS: {PASS} passed, {FAIL} failed")
    print("=" * 60)

    if FAIL > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
