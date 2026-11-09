"""Sunrise and sunset for a place and date (NOAA solar calculator method).

Low-precision Meeus/NOAA formulas, good to about one minute between the
polar circles. Sunrise and sunset are the moments the Sun's upper limb
touches the horizon with standard refraction (zenith 90.833 degrees).
Longitude is east-positive. Times are returned as aware UTC datetimes.
"""

import math
from datetime import date, datetime, timedelta, timezone

ZENITH = 90.833  # degrees: 90 + 34' refraction + 16' solar semi-diameter


def _sun(jc: float) -> tuple[float, float]:
    """Declination (radians) and equation of time (minutes) at Julian century jc."""
    l0 = (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360
    m = 357.52911 + jc * (35999.05029 - 0.0001537 * jc)
    e = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc)
    mr = math.radians(m)
    c = (math.sin(mr) * (1.914602 - jc * (0.004817 + 0.000014 * jc))
         + math.sin(2 * mr) * (0.019993 - 0.000101 * jc)
         + math.sin(3 * mr) * 0.000289)
    omega = 125.04 - 1934.136 * jc
    lam = l0 + c - 0.00569 - 0.00478 * math.sin(math.radians(omega))
    eps0 = 23 + (26 + (21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813))) / 60) / 60
    eps = eps0 + 0.00256 * math.cos(math.radians(omega))
    decl = math.asin(math.sin(math.radians(eps)) * math.sin(math.radians(lam)))
    y = math.tan(math.radians(eps) / 2) ** 2
    l0r = math.radians(l0)
    eq = 4 * math.degrees(
        y * math.sin(2 * l0r) - 2 * e * math.sin(mr)
        + 4 * e * y * math.sin(mr) * math.cos(2 * l0r)
        - 0.5 * y * y * math.sin(4 * l0r) - 1.25 * e * e * math.sin(2 * mr))
    return decl, eq


def _jc(t: datetime) -> float:
    jd = t.timestamp() / 86400 + 2440587.5
    return (jd - 2451545.0) / 36525


def _event(d: date, lat: float, lon: float, rising: bool):
    base = datetime(d.year, d.month, d.day, tzinfo=timezone.utc)
    t = base + timedelta(minutes=720 - 4 * lon)
    sign = 1 if rising else -1
    for _ in range(3):  # refine at the event time itself
        decl, eq = _sun(_jc(t))
        cos_h = (math.cos(math.radians(ZENITH)) / (math.cos(math.radians(lat)) * math.cos(decl))
                 - math.tan(math.radians(lat)) * math.tan(decl))
        if cos_h > 1:
            return None, "polar_night"
        if cos_h < -1:
            return None, "midnight_sun"
        h = math.degrees(math.acos(cos_h))
        t = base + timedelta(minutes=720 - 4 * (lon + sign * h) - eq)
    return t, None


def sun_times(d: date, lat: float, lon: float) -> dict:
    """Sunrise and sunset (UTC) on the solar date d at the given place."""
    rise, why1 = _event(d, lat, lon, True)
    sset, why2 = _event(d, lat, lon, False)
    return {"sunrise": rise, "sunset": sset, "polar": why1 or why2}


def solar_date(t: datetime, lon: float) -> date:
    """The local mean solar date at longitude lon for instant t."""
    return (t.astimezone(timezone.utc) + timedelta(minutes=4 * lon)).date()
