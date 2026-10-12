from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from phonetic_router import router as phonetic_router

VERSION = "5.0"

# Chart calculation (planets, houses, aspects, progressions, returns,
# synastry, harmonics) runs in the browser via the JavaScript engines in
# src/engines/. The astrology endpoints that used to live here depended on
# Swiss Ephemeris (AGPL / paid licence) and were removed on 2026-10-12; see
# docs/DECISIONS.md. This service now serves the phonetics data only.

app = FastAPI(
    title="SGE v5.0 -- Phonetics API",
    description="Phonetic inventory and crosswalk data for the SGE grammatology views.",
    version=VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(phonetic_router)


@app.get("/health")
def health():
    return {"status": "ok", "version": VERSION}
