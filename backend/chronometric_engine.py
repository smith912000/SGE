"""Planetary days and hours.

The planetary day runs from sunrise to the next sunrise at the given place.
Its 12 day hours divide sunrise-to-sunset into equal twelfths and its 12
night hours divide sunset-to-next-sunrise, so the hours change length with
season and latitude. Hour 1 belongs to the day's ruler and the rest follow
the Chaldean order (Cassius Dio, Roman History 37.18-19).

day_start="sunset" gives the older variant in which the day begins at the
previous sunset and the 12 night hours come first (Vettius Valens).

The result also carries "sky": where each planet really is at that instant
(planet_sky.py, JPL elements), and the current slot's "strength", which says
how strongly the ruler shows today (hidden in the Sun's glare 0.382, at its
brightest 1). The ruler itself never changes; only its strength does.

Previous version (until 8 Nov 2026) used 24 equal clock hours from UTC
midnight and the UTC weekday, which put the wrong ruler on most hours.
"""

from datetime import datetime, timedelta, timezone

from planet_sky import sky
from planetary_foundation import CHALDEAN_ORDER, DAY_RULERS, hour_ruler
from sun_times import solar_date, sun_times


class ChronometricEngine:

    def _events(self, d, lat, lon):
        ev = sun_times(d, lat, lon)
        if ev["polar"]:
            raise ValueError(f"No sunrise or sunset on {d} at latitude {lat}: {ev['polar']}")
        return ev

    def _day(self, d, lat, lon, day_start):
        prev = self._events(d - timedelta(days=1), lat, lon)
        cur = self._events(d, lat, lon)
        nxt = self._events(d + timedelta(days=1), lat, lon)
        if day_start == "sunset":
            spans = [(prev["sunset"], cur["sunrise"], "night"), (cur["sunrise"], cur["sunset"], "day")]
        else:
            spans = [(cur["sunrise"], cur["sunset"], "day"), (cur["sunset"], nxt["sunrise"], "night")]
        ruler = DAY_RULERS[d.weekday()]
        slots = []
        for start, end, part in spans:
            length = (end - start) / 12
            for k in range(12):
                n = len(slots) + 1
                slots.append({
                    "slot": n - 1,
                    "hour_number": n,
                    "part": part,
                    "start": start + length * k,
                    "end": start + length * (k + 1),
                    "minutes": round(length.total_seconds() / 60, 2),
                    "ruler": hour_ruler(ruler, n),
                })
        return {"date": d, "day_ruler": ruler, "weekday": d.weekday(),
                "sunrise": cur["sunrise"], "sunset": cur["sunset"], "slots": slots}

    def compute_slots(self, dt_utc: datetime, lat: float, lon: float,
                      day_start: str = "sunrise") -> dict:
        """Planetary day and hour containing dt_utc at latitude lat, longitude lon (east +)."""
        if dt_utc.tzinfo is None:
            dt_utc = dt_utc.replace(tzinfo=timezone.utc)
        base = solar_date(dt_utc, lon)
        for offset in (0, -1, 1):
            day = self._day(base + timedelta(days=offset), lat, lon, day_start)
            slots = day["slots"]
            if slots[0]["start"] <= dt_utc < slots[-1]["end"]:
                current = dict(next(s for s in slots if s["start"] <= dt_utc < s["end"]))
                now_sky = sky(dt_utc)
                current["strength"] = now_sky[current["ruler"]]["strength"]
                return {
                    "day_ruler": day["day_ruler"],
                    "weekday": day["weekday"],
                    "solar_date": day["date"],
                    "sunrise": day["sunrise"],
                    "sunset": day["sunset"],
                    "day_start": day_start,
                    "current_slot": current,
                    "all_slots": slots,
                    "sky": now_sky,
                }
        raise ValueError("Instant falls outside the computed planetary days")


__all__ = ["ChronometricEngine", "CHALDEAN_ORDER", "DAY_RULERS"]
