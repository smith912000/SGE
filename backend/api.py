from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from sge import SGE

app = FastAPI(
    title="SGE v5.0 -- Astro-Temporal Engine",
    description="Full professional astro-temporal computation system. "
                "Natal charts, transits, progressions, solar/lunar returns, "
                "synastry, harmonics, Chinese cycle, chronometric overlay, phi modifier.",
    version="5.0",
)

engine = SGE()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request Models ──────────────────────────────────────────────────

class BirthData(BaseModel):
    year: int = Field(..., example=1990)
    month: int = Field(..., ge=1, le=12, example=6)
    day: int = Field(..., ge=1, le=31, example=15)
    hour: int = Field(12, ge=0, le=23)
    minute: int = Field(0, ge=0, le=59)
    second: int = Field(0, ge=0, le=59)
    timezone: str = Field("UTC", example="America/New_York")
    latitude: float = Field(..., ge=-90, le=90, example=40.7128)
    longitude: float = Field(..., ge=-180, le=180, example=-74.006)

    def to_datetime(self) -> datetime:
        return datetime(self.year, self.month, self.day,
                        self.hour, self.minute, self.second)


class NatalRequest(BaseModel):
    birth: BirthData


class FullAnalysisRequest(BaseModel):
    birth: BirthData
    age: float | None = None
    transit_year: int | None = None
    transit_month: int | None = None
    transit_day: int | None = None
    transit_hour: int | None = None
    transit_minute: int | None = None
    transit_timezone: str = Field("UTC", example="UTC")
    harmonic_n: int = Field(5, ge=1, le=360)
    phi_cycle_length: int = Field(30, ge=1)


class TransitRequest(BaseModel):
    birth: BirthData
    transit_year: int
    transit_month: int = Field(..., ge=1, le=12)
    transit_day: int = Field(..., ge=1, le=31)
    transit_hour: int = Field(12, ge=0, le=23)
    transit_minute: int = Field(0, ge=0, le=59)
    transit_timezone: str = Field("UTC", example="UTC")


class SynastryRequest(BaseModel):
    birth_a: BirthData
    birth_b: BirthData


class ProgressionRequest(BaseModel):
    birth: BirthData
    age: float = Field(..., gt=0)


class SolarReturnRequest(BaseModel):
    birth: BirthData
    return_year: int


class LunarReturnRequest(BaseModel):
    birth: BirthData
    from_year: int
    from_month: int = Field(..., ge=1, le=12)
    from_day: int = Field(..., ge=1, le=31)


class HarmonicRequest(BaseModel):
    birth: BirthData
    harmonic_number: int = Field(..., ge=1, le=360)


# ── Endpoints ───────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "version": SGE.VERSION}


@app.post("/natal")
def natal_chart(req: NatalRequest):
    try:
        result = engine.natal_chart(
            req.birth.to_datetime(),
            req.birth.timezone,
            req.birth.latitude,
            req.birth.longitude,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/full-analysis")
def full_analysis(req: FullAnalysisRequest):
    try:
        transit_dt = None
        if req.transit_year is not None:
            transit_dt = datetime(
                req.transit_year,
                req.transit_month or 1,
                req.transit_day or 1,
                req.transit_hour or 12,
                req.transit_minute or 0,
            )

        result = engine.full_analysis(
            birth_dt=req.birth.to_datetime(),
            tz=req.birth.timezone,
            lat=req.birth.latitude,
            lon=req.birth.longitude,
            age=req.age,
            transit_dt=transit_dt,
            harmonic_n=req.harmonic_n,
            phi_cycle_length=req.phi_cycle_length,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/transits")
def transits(req: TransitRequest):
    try:
        transit_dt = datetime(
            req.transit_year, req.transit_month, req.transit_day,
            req.transit_hour, req.transit_minute,
        )
        natal = engine.natal_chart(
            req.birth.to_datetime(),
            req.birth.timezone,
            req.birth.latitude,
            req.birth.longitude,
        )
        aspects, score = engine.transit_engine.weighted_transits(
            natal["tropical"],
            engine.time_engine.julian_day(
                engine.time_engine.to_utc(transit_dt, req.transit_timezone)
            ),
        )
        return {"aspects": aspects, "score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/synastry")
def synastry(req: SynastryRequest):
    try:
        chart_a = engine.natal_chart(
            req.birth_a.to_datetime(),
            req.birth_a.timezone,
            req.birth_a.latitude,
            req.birth_a.longitude,
        )
        chart_b = engine.natal_chart(
            req.birth_b.to_datetime(),
            req.birth_b.timezone,
            req.birth_b.latitude,
            req.birth_b.longitude,
        )
        result = engine.synastry_engine.compare(chart_a, chart_b)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/progressions")
def progressions(req: ProgressionRequest):
    try:
        dt_utc = engine.time_engine.to_utc(
            req.birth.to_datetime(), req.birth.timezone
        )
        jd = engine.time_engine.julian_day(dt_utc)
        prog = engine.progression_engine.secondary_progressions(jd, req.age)
        prog["progressed_moon"] = engine.progression_engine.progressed_moon(jd, req.age)
        return prog
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/solar-return")
def solar_return(req: SolarReturnRequest):
    try:
        natal = engine.natal_chart(
            req.birth.to_datetime(),
            req.birth.timezone,
            req.birth.latitude,
            req.birth.longitude,
        )
        sun_lon = natal["tropical"]["Sun"]["longitude"]
        result = engine.solar_return_engine.find_solar_return(
            sun_lon, req.return_year,
            req.birth.latitude, req.birth.longitude,
        )
        if result is None:
            raise HTTPException(status_code=404, detail="Solar return not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/lunar-return")
def lunar_return(req: LunarReturnRequest):
    try:
        natal = engine.natal_chart(
            req.birth.to_datetime(),
            req.birth.timezone,
            req.birth.latitude,
            req.birth.longitude,
        )
        moon_lon = natal["tropical"]["Moon"]["longitude"]
        from_dt = datetime(req.from_year, req.from_month, req.from_day)
        from_utc = engine.time_engine.to_utc(from_dt, req.birth.timezone)
        from_jd = engine.time_engine.julian_day(from_utc)
        result = engine.lunar_return_engine.find_lunar_return(
            moon_lon, from_jd,
            req.birth.latitude, req.birth.longitude,
        )
        if result is None:
            raise HTTPException(status_code=404, detail="Lunar return not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/harmonic")
def harmonic(req: HarmonicRequest):
    try:
        natal = engine.natal_chart(
            req.birth.to_datetime(),
            req.birth.timezone,
            req.birth.latitude,
            req.birth.longitude,
        )
        result = engine.harmonic_engine.compute(
            natal["tropical"], req.harmonic_number
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
