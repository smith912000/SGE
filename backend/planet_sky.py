"""Where the planets really are: (c) layer under the planetary hours.

Positions from JPL's approximate Keplerian elements (E. M. Standish, "Keplerian
Elements for Approximate Positions of the Major Planets", Table 1, valid
1800-2050). From them: each planet's elongation from the Sun as seen from
Earth, and its brightness in magnitudes below the best it reaches. The Moon's
phase uses the mean synodic month from the new moon of 2000-01-06 18:14 UTC.

visibility is 0 when the planet is lost in the Sun's glare (elongation under
10 degrees, rising to full by 25) and 1 at its brightest, falling to 0 five
magnitudes below that. strength = 1/phi^2 + 1/phi * visibility (our rule, d):
the hour's ruler always shows, and the real sky sets how strongly. This is the
same rule as WILD's assets/wild-time.js.
"""

import math
from datetime import datetime, timezone

from planetary_foundation import PHI, MOON_SYNODIC_DAYS

R = math.pi / 180

# [a, e, I, L, long. perihelion, long. node] and rates per Julian century.
ELEMENTS = {
    "Mercury": ((0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593),
                (0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081)),
    "Venus": ((0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255),
              (0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418)),
    "Earth": ((1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0),
              (0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0)),
    "Mars": ((1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891),
             (0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343)),
    "Jupiter": ((5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909),
                (-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106)),
    "Saturn": ((9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448),
               (-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, 0.28867794)),
}
NEW_MOON_2000 = datetime(2000, 1, 6, 18, 14, tzinfo=timezone.utc)


def _centuries(dt):
    jd = dt.timestamp() / 86400 + 2440587.5
    return (jd - 2451545.0) / 36525


def heliocentric(planet, T):
    """(c) Heliocentric ecliptic x, y, z in AU at T Julian centuries from J2000."""
    base, rate = ELEMENTS[planet]
    a, e, I, L, wbar, node = (b + r * T for b, r in zip(base, rate))
    w, O, I = (wbar - node) * R, node * R, I * R
    M = ((L - wbar) % 360) * R
    E = M
    for _ in range(8):
        E -= (E - e * math.sin(E) - M) / (1 - e * math.cos(E))
    xp, yp = a * (math.cos(E) - e), a * math.sqrt(1 - e * e) * math.sin(E)
    cw, sw, cO, sO, cI, sI = math.cos(w), math.sin(w), math.cos(O), math.sin(O), math.cos(I), math.sin(I)
    return ((cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
            (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
            sw * sI * xp + cw * sI * yp)


def _sub(u, v):
    return tuple(a - b for a, b in zip(u, v))


def _len(u):
    return math.sqrt(sum(a * a for a in u))


def _angle(u, v):
    c = sum(a * b for a, b in zip(u, v)) / (_len(u) * _len(v))
    return math.degrees(math.acos(max(-1.0, min(1.0, c))))


def _flux(r, delta, alpha):
    return (1 + math.cos(alpha * R)) / 2 / (r * r * delta * delta)


_BEST = {}


def _best(planet):
    if planet not in _BEST:
        a, m = ELEMENTS[planet][0][0], 0.0
        for k in range(720):
            th = k / 2 * R
            P = (a * math.cos(th), a * math.sin(th), 0.0)
            D = _sub(P, (1.0, 0.0, 0.0))
            if _angle((-1.0, 0.0, 0.0), D) < 15:
                continue
            m = max(m, _flux(a, _len(D), _angle(_sub((1.0, 0.0, 0.0), P), (-P[0], -P[1], 0.0))))
        _BEST[planet] = m
    return _BEST[planet]


def _smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


def sky(dt: datetime) -> dict:
    """(c) State of each classical planet at dt (UTC): elongation, magnitudes below best, visibility."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    T = _centuries(dt)
    earth = heliocentric("Earth", T)
    out = {}
    for p in ("Mercury", "Venus", "Mars", "Jupiter", "Saturn"):
        P = heliocentric(p, T)
        D = _sub(P, earth)
        elong = _angle(tuple(-x for x in earth), D)
        alpha = _angle(_sub(earth, P), tuple(-x for x in P))
        below = -2.5 * math.log10(_flux(_len(P), _len(D), alpha) / _best(p))
        vis = _smooth((elong - 10) / 15) * max(0.0, min(1.0, 1 - below / 5))
        out[p] = {"elongation": elong, "below_best_mag": below, "visibility": vis,
                  "distance_au": _len(D)}
    age = ((dt - NEW_MOON_2000).total_seconds() / 86400) % MOON_SYNODIC_DAYS
    lit = (1 - math.cos(age / MOON_SYNODIC_DAYS * 2 * math.pi)) / 2
    out["Moon"] = {"age_days": age, "illuminated": lit, "visibility": lit}
    out["Sun"] = {"visibility": 1.0}
    for p in out:
        out[p]["strength"] = 1 / PHI ** 2 + out[p]["visibility"] / PHI
        out[p]["standing"] = "c (position), d (strength rule)"
    return out
