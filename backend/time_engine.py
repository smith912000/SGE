from datetime import datetime, timezone
import math
import pytz


class TimeEngine:

    def to_utc(self, dt: datetime, tz_name: str) -> datetime:
        tz = pytz.timezone(tz_name)
        if dt.tzinfo is None:
            dt = tz.localize(dt)
        return dt.astimezone(pytz.utc)

    def julian_day(self, dt_utc: datetime) -> float:
        """Julian Day (UT) for a Gregorian calendar date (Meeus, Astronomical Algorithms, ch. 7)."""
        hour = dt_utc.hour + dt_utc.minute / 60.0 + dt_utc.second / 3600.0
        year, month = dt_utc.year, dt_utc.month
        if month <= 2:
            year -= 1
            month += 12
        a = year // 100
        b = 2 - a + a // 4
        return float(
            math.floor(365.25 * (year + 4716))
            + math.floor(30.6001 * (month + 1))
            + dt_utc.day + b - 1524.5
            + hour / 24.0
        )

    def jd_to_datetime(self, jd: float) -> datetime:
        """Inverse of julian_day (Meeus, ch. 7), Gregorian calendar."""
        z = math.floor(jd + 0.5)
        f = jd + 0.5 - z
        alpha = math.floor((z - 1867216.25) / 36524.25)
        a = z + 1 + alpha - alpha // 4
        b = a + 1524
        c = math.floor((b - 122.1) / 365.25)
        d = math.floor(365.25 * c)
        e = math.floor((b - d) / 30.6001)
        day = int(b - d - math.floor(30.6001 * e))
        month = int(e - 1 if e < 14 else e - 13)
        year = int(c - 4716 if month > 2 else c - 4715)
        hour_frac = f * 24.0
        hours = int(hour_frac)
        remainder = (hour_frac - hours) * 60
        minutes = int(remainder)
        seconds = int((remainder - minutes) * 60)
        return datetime(year, month, day, hours, minutes, seconds, tzinfo=timezone.utc)
