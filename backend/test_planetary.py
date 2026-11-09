"""Proof tests for the planetary foundation and the chronometric engine.

Each check states a fact from a source or from physics and fails if the
code stops reproducing it. Run: python3 test_planetary.py
"""

import sys
from datetime import date, datetime, timezone

from chronometric_engine import ChronometricEngine
from planetary_foundation import (CHALDEAN_ORDER, DAY_RULERS, FOUNDATION, KEPLER_INTERVALS,
                                  MODERN_LAYERS, PHI, hour_ruler, kepler_speed_ratio,
                                  octave_tone, venus_earth_cycle, EARTH_TROPICAL_YEAR_DAYS)
from sun_times import sun_times

PASS = FAIL = 0
LONDON = (51.5074, -0.1278)


def check(label, ok, detail=""):
    global PASS, FAIL
    if ok:
        PASS += 1
        print(f"  PASS  {label}")
    else:
        FAIL += 1
        print(f"  FAIL  {label} {detail}")


def minutes(t):
    return t.hour * 60 + t.minute + t.second / 60


print("Dio 37.19: hour order and day order")
check("Order runs Saturn to Moon", CHALDEAN_ORDER == ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"])
week = [DAY_RULERS[i] for i in (6, 0, 1, 2, 3, 4, 5)]
for today, tomorrow in zip(week, week[1:] + week[:1]):
    check(f"Hour 25 after {today}'s day is {tomorrow}", hour_ruler(today, 25) == tomorrow)
check("Saturday hour 1 Saturn, hour 4 Sun (Dio's worked example)",
      hour_ruler("Saturn", 1) == "Saturn" and hour_ruler("Saturn", 4) == "Sun")
check("Sunday hours 1-7: Sun Venus Mercury Moon Saturn Jupiter Mars",
      [hour_ruler("Sun", n) for n in range(1, 8)] == ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"])

print("Sunrise and sunset (NOAA method, London)")
mid = sun_times(date(2026, 6, 21), *LONDON)
check("21 Jun 2026 sunrise 03:43 UTC +-3 min", abs(minutes(mid["sunrise"]) - (3 * 60 + 43)) <= 3, mid["sunrise"])
check("21 Jun 2026 sunset 20:21 UTC +-3 min", abs(minutes(mid["sunset"]) - (20 * 60 + 21)) <= 3, mid["sunset"])
check("Polar night reported at 78N in December", sun_times(date(2026, 12, 21), 78.0, 15.0)["polar"] == "polar_night")

print("Planetary hours (unequal, from sunrise)")
ce = ChronometricEngine()
r = ce.compute_slots(datetime(2026, 11, 8, 15, 46, tzinfo=timezone.utc), *LONDON)
check("8 Nov 2026 is a Sun day", r["day_ruler"] == "Sun")
check("15:46 UTC London is day hour 12, ruled by Saturn",
      r["current_slot"]["hour_number"] == 12 and r["current_slot"]["ruler"] == "Saturn", r["current_slot"])
day_len = r["all_slots"][0]["minutes"]
night_len = r["all_slots"][12]["minutes"]
check("November day hours shorter than night hours", day_len < 60 < night_len, (day_len, night_len))
check("24 hours span sunrise to next sunrise",
      r["all_slots"][0]["start"] == r["sunrise"] and len(r["all_slots"]) == 24)
early = ce.compute_slots(datetime(2026, 11, 9, 3, 0, tzinfo=timezone.utc), *LONDON)
check("03:00 UTC Monday before sunrise is still Sunday's night (hour 21, Mars)",
      early["day_ruler"] == "Sun" and early["current_slot"]["hour_number"] == 21
      and early["current_slot"]["ruler"] == "Mars", early["current_slot"])
sun_var = ce.compute_slots(datetime(2026, 11, 8, 20, 0, tzinfo=timezone.utc), *LONDON, day_start="sunset")
check("Sunset variant: Sunday evening belongs to Monday, night hours first",
      sun_var["day_ruler"] == "Moon" and sun_var["current_slot"]["part"] == "night")

print("Agrippa II.x metals and angels")
check("Seven metals, all distinct", len({FOUNDATION[p]["metal"] for p in CHALDEAN_ORDER}) == 7)
check("Sun gold, Moon silver, Saturn lead",
      (FOUNDATION["Sun"]["metal"], FOUNDATION["Moon"]["metal"], FOUNDATION["Saturn"]["metal"]) == ("Gold", "Silver", "Lead"))

print("Physics checks")
vc = venus_earth_cycle()
check("13 Venus orbits within 0.1% of 8 Earth years", abs(vc["thirteen_orbits"] / vc["eight_years"] - 1) < 0.001)
check("5 Venus synodic periods within 3 days of 8 years", abs(vc["five_synodic"] - vc["eight_years"]) < 3)
check("Earth/Venus period ratio within 0.5% of phi", abs(vc["ratio"] / PHI - 1) < 0.005)
for planet, (a, b) in KEPLER_INTERVALS.items():
    got = kepler_speed_ratio(planet)
    tol = 0.005 if planet == "Earth" else 0.02
    check(f"Kepler {planet} speed ratio near {a}:{b}", abs(got / (a / b) - 1) < tol, round(got, 4))

print("Modern layers stay on top of the foundation")
t = octave_tone(EARTH_TROPICAL_YEAR_DAYS)
check("Earth tropical year -> 136.10 Hz (Cousto method)", abs(t["hz"] - 136.10) < 0.01, t["hz"])
check("Moon synodic -> 210.42 Hz", abs(MODERN_LAYERS["cousto_tones"]["tones"]["Moon"]["hz"] - 210.42) < 0.01)
check("Sun has no tone (no orbital period)", "Sun" not in MODERN_LAYERS["cousto_tones"]["tones"])
check("Every visible wavelength in 380-760 nm",
      all(380 <= v["wavelength_nm"] <= 760 for v in MODERN_LAYERS["cousto_tones"]["tones"].values()))
blend = MODERN_LAYERS["phi_blend"]
check("phi blend weights sum to 1", abs(blend["planetary"] + blend["clock"] - 1) < 1e-12)
check("Stephanos 38:62 is the phi blend rounded",
      round(blend["clock"] * 100) == 38 and round(blend["planetary"] * 100) == 62)
hues = list(MODERN_LAYERS["golden_angle_hues"]["hues"].values())
gaps = sorted(hues)
min_gap = min(min(b - a for a, b in zip(gaps, gaps[1:])), 360 - gaps[-1] + gaps[0])
# Golden-angle spacing keeps any count well spread, but for exactly 7 an even
# 51.4 degree split is wider; the golden angle gives 32.5 degrees minimum.
check("Golden-angle hues at least 32 degrees apart (even split would give 51.4)", min_gap >= 32, min_gap)
check("No modern layer overwrites a foundation key",
      all(k in ("standing", "colours", "tones", "minor", "major", "planetary", "clock", "hues")
          for layer in MODERN_LAYERS.values() for k in layer))

print(f"\nRESULTS: {PASS} passed, {FAIL} failed")
sys.exit(1 if FAIL else 0)
