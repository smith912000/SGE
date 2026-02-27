"""Compare JS engine output against Swiss Ephemeris for a set of test dates."""
import json, subprocess, swisseph as swe

SWE_IDS = {
    "Sun": swe.SUN, "Moon": swe.MOON, "Mercury": swe.MERCURY,
    "Venus": swe.VENUS, "Mars": swe.MARS, "Jupiter": swe.JUPITER,
    "Saturn": swe.SATURN, "Uranus": swe.URANUS, "Neptune": swe.NEPTUNE,
    "Pluto": swe.PLUTO, "Node": swe.MEAN_NODE, "Chiron": swe.CHIRON,
    "Lilith": swe.MEAN_APOG,
}

SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo",
         "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]

def sign(lon):
    return SIGNS[int((lon % 360) // 30)]

def ang_diff(a, b):
    d = abs((a - b) % 360)
    return min(d, 360 - d)

TEST_CASES = [
    {"label": "1999-Jun-07 10:15 UT", "y": 1999, "m": 6, "d": 7, "ut": 10.25},
    {"label": "1990-Jan-15 12:00 UT", "y": 1990, "m": 1, "d": 15, "ut": 12.0},
    {"label": "2000-Mar-20 12:00 UT", "y": 2000, "m": 3, "d": 20, "ut": 12.0},
    {"label": "1975-Oct-31 06:00 UT", "y": 1975, "m": 10, "d": 31, "ut": 6.0},
]

for tc in TEST_CASES:
    js_code = (
        f'import {{ julianDay, allPlanets }} from "./src/engines/astronomy.js";'
        f' const jd=julianDay({tc["y"]},{tc["m"]},{tc["d"]},{tc["ut"]});'
        f' console.log(JSON.stringify({{jd:jd,p:allPlanets(jd)}}));'
    )
    raw = subprocess.check_output(
        ["node", "--input-type=module", "-e", js_code], text=True,
        cwd=r"c:\Users\freez\OneDrive\Desktop\SGE"
    )
    obj = json.loads(raw)
    jd = obj["jd"]
    p = obj["p"]

    print(f"\n=== {tc['label']} (JD {jd:.4f}) ===")
    print(f"{'Planet':>8s}  {'JS':>10s} {'SWE':>10s}  {'Diff':>7s}  JS-Sign  SWE-Sign  Match")
    for name in ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn",
                 "Uranus","Neptune","Pluto","Node"]:
        js_lon = p.get(name)
        if js_lon is None:
            continue
        xx, _ = swe.calc_ut(jd, SWE_IDS[name])
        swe_lon = xx[0]
        diff = ang_diff(js_lon, swe_lon)
        js_s = sign(js_lon)
        swe_s = sign(swe_lon)
        ok = "OK" if js_s == swe_s else "SIGN MISMATCH"
        print(f"{name:>8s}  {js_lon:10.4f} {swe_lon:10.4f}  {diff:7.3f}  {js_s:>9s}  {swe_s:>9s}  {ok}")
