# SGE Engines

Computation engines: JavaScript (frontend) and Python (backend).

---

## Frontend Engines (`src/engines/`)

| Engine | Purpose |
|--------|---------|
| **astronomy.js** | Tropical/sidereal positions, house calculations, aspects, harmonics, progressions, solar returns, ayanamsa, phi cycle. Can call backend or use local fallback. |
| **calendar.js** | Šambraielic calendar conversion, subdivisions, symbolic cycles (I Ching, Hebrew, Greek, Runic, Tarot), sacred names (72/99, 32 paths), festivals. |
| **calendarWheelEngine.js** | Builds multi-calendar wheel model (Mayan, Chinese, Islamic, Jewish, etc.) for CalendarWheel component. |
| **chinese.js** | Chinese cycle calculation: Heavenly Stems, Earthly Branches, zodiac animals, elements, lunar dates. |
| **gematria.js** | Hebrew transliteration and gematria value computation. |
| **numerology.js** | Pythagorean/Chaldean numerology, number sequence detection, Life Path, Expression, Soul Urge, etc. |
| **profile.js** | Generates astrological profile summaries from chart data (signs, houses, aspects). |
| **datasetStore.js** | Dataset registry and validation for calendars, linguistics, semiotics. |
| **wordCrosswalk.js** | Word analysis across writing systems (Hebrew, Greek, Egyptian, etc.). |

---

## Backend Engines (`backend/`)

| Engine | Purpose |
|--------|---------|
| **time_engine.py** | Timezone conversion, Julian day calculations. |
| **planetary_engine.py** | Swiss Ephemeris integration for planetary positions (tropical/sidereal). |
| **house_engine.py** | House calculations (Placidus, Whole Sign). |
| **aspect_engine.py** | Aspect detection (conjunction, square, trine, opposition, etc.). |
| **transit_engine.py** | Current planetary positions vs natal chart. |
| **progression_engine.py** | Secondary progressions (1 day = 1 year). |
| **solar_return_engine.py** | Solar return chart finder and calculation. |
| **return_engine.py** | Lunar return chart finder. |
| **synastry_engine.py** | Relationship chart comparison (Person A vs Person B). |
| **harmonic_engine.py** | Harmonic chart calculations (2nd–12th). |
| **chinese_cycle.py** | Chinese calendar cycle calculations. |
| **chronometric_engine.py** | Planetary hour/day ruler calculations. |
| **phi_engine.py** | Golden ratio (φ) cycle calculations. |
| **element_modality.py** | Element/modality distribution. |

---

## API Orchestration

**sge.py** — Main SGE class that wires all backend engines. **api.py** exposes FastAPI endpoints:

- `/natal` — Natal chart (positions, houses, aspects)
- `/full` — Full analysis (natal + transits + progressions + solar return)
- `/transits` — Current transits vs natal
- `/progressions` — Secondary progressions
- `/solar_return` — Solar return chart
- `/synastry` — Synastry comparison
- Additional endpoints for harmonics, Chinese cycles, etc.
