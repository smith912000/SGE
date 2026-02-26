# SGE Documentation

**Stellar Geometry Engine (SGE)** is a comprehensive astro-temporal computation and visualization platform combining Western tropical/sidereal astrology, Chinese astrology, numerology, gematria, grammatology, solar returns, synastry, harmonics, and more.

---

## Features

- **Western Astrology** — Tropical and sidereal natal charts, house systems (Placidus, Whole Sign), planetary aspects
- **Chinese Astrology** — Heavenly Stems, Earthly Branches, zodiac animals, Wuxing elements, Zi Wei Doushu
- **Numerology** — Pythagorean and Chaldean systems, Life Path, Expression, Soul Urge, Master Numbers
- **Gematria** — Hebrew transliteration and numerical value computation
- **Grammatology** — Cross-script letter analysis, writing systems, Kangxi radicals, Sefer Yetzirah
- **Sacred Calendar** — Šambraielic calendar system with subdivisions, symbolic cycles, festivals
- **Solar Returns** — Annual solar return chart analysis
- **Synastry** — Relationship chart comparison (Person A vs Person B)
- **Harmonics** — 2nd–12th harmonic chart analysis
- **Progressions** — Secondary progressions (1 day = 1 year)
- **Transits** — Current planetary positions vs natal chart
- **Phi Rhythm** — Golden ratio (φ) cycle and element/modality balance

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite 6 |
| Styling | Material Design 3 (deep-space theme), global.css |
| Animation | anime.js (CDN-loaded) |
| Backend | FastAPI, Python 3 |
| Ephemeris | Swiss Ephemeris (pyswisseph) |
| Data | Pydantic, NumPy, pytz |

---

## Installation & Running

### Frontend

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173` (Vite default).

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload
```

API runs at `http://localhost:8000`.

---

## Documentation Index

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Modular architecture and folder structure |
| [COMPONENTS.md](COMPONENTS.md) | Reusable UI components (charts, tables, layout) |
| [ENGINES.md](ENGINES.md) | Computation engines (JS + Python) |
| [TABS.md](TABS.md) | Tab views and page-level features |
| [DATA.md](DATA.md) | Static data layer (astrology, calendar, grammatology) |
