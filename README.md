# SGE — Stellar Geometry Engine

A comprehensive astro-temporal computation and visualization platform combining Western tropical/sidereal astrology, Chinese astrology, numerology, gematria, grammatology, solar returns, synastry, harmonics, and more.

---

## Quick Start

### Frontend

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

### Backend

```bash
pip install -r backend/requirements.txt
uvicorn backend.api:app --reload
```

API runs at `http://localhost:8000`. (If running from `backend/` directory, use `uvicorn api:app --reload`.)

---

## Features

- **Western Astrology** — Natal charts, houses, aspects, tropical/sidereal
- **Chinese Astrology** — Stems, branches, animals, Wuxing, Zi Wei
- **Numerology** — Pythagorean/Chaldean, Life Path, Expression, Soul Urge
- **Gematria & Grammatology** — Hebrew gematria, cross-script letter analysis
- **Sacred Calendar** — Šambraielic system, festivals, symbolic cycles
- **Timing** — Solar returns, transits, progressions, synastry, harmonics
- **Phi Rhythm** — Golden ratio cycle, element/modality balance

---

## Tech Stack

- **Frontend:** React 18, Vite 6, Material Design 3, anime.js
- **Backend:** FastAPI, Swiss Ephemeris (pyswisseph), Pydantic

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/README.md](docs/README.md) | Project overview, features, tech stack |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Modular architecture |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | UI components |
| [docs/ENGINES.md](docs/ENGINES.md) | Computation engines |
| [docs/TABS.md](docs/TABS.md) | Tab views |
| [docs/DATA.md](docs/DATA.md) | Data layer |
