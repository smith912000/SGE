# SGE Engines

Computation engines: JavaScript (frontend) and Python (backend).

---

## Frontend Engines (`src/engines/`)

| Engine | Purpose |
|--------|---------|
| **astronomy.js** | Tropical/sidereal positions, house calculations, aspects, harmonics, progressions, solar returns, ayanamsa, phi cycle. The only source of chart positions; nothing is fetched from a server. |
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

The ephemeris-based Python engines (`planetary_engine`, `house_engine`,
`transit_engine`, `progression_engine`, `solar_return_engine`, `return_engine`)
and the `sge.py` orchestrator were removed on 2026-10-12 with Swiss Ephemeris
(see DECISIONS.md, entry 4). What remains is pure Python with no ephemeris:

| Engine | Purpose |
|--------|---------|
| **time_engine.py** | Timezone conversion, Julian day calculations (Meeus). |
| **aspect_engine.py** | Aspect detection (conjunction, square, trine, opposition, etc.). |
| **synastry_engine.py** | Relationship chart comparison (Person A vs Person B). |
| **harmonic_engine.py** | Harmonic chart calculations (2nd–12th). |
| **chinese_cycle.py** | Chinese calendar cycle calculations. |
| **chronometric_engine.py** | Planetary hour/day ruler calculations. |
| **phi_engine.py** | Golden ratio (φ) cycle calculations. |
| **element_modality.py** | Element/modality distribution. |

---

## API

**api.py** exposes `/health` and the phonetics router (`/phonetics/*`). There
are no chart endpoints; the frontend computes charts with the JS engines.
