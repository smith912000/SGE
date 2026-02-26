from datetime import datetime, timezone
import swisseph as swe
import pytz


class TimeEngine:

    def to_utc(self, dt: datetime, tz_name: str) -> datetime:
        tz = pytz.timezone(tz_name)
        if dt.tzinfo is None:
            dt = tz.localize(dt)
        return dt.astimezone(pytz.utc)

    def julian_day(self, dt_utc: datetime) -> float:
        hour = dt_utc.hour + dt_utc.minute / 60.0 + dt_utc.second / 3600.0
        return swe.julday(dt_utc.year, dt_utc.month, dt_utc.day, hour)

    def jd_to_datetime(self, jd: float) -> datetime:
        year, month, day, hour_frac = swe.revjul(jd)
        hours = int(hour_frac)
        remainder = (hour_frac - hours) * 60
        minutes = int(remainder)
        seconds = int((remainder - minutes) * 60)
        return datetime(year, month, day, hours, minutes, seconds, tzinfo=timezone.utc)
