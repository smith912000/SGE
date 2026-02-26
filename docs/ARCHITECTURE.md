# SGE Architecture

SGE follows a modular architecture with clear separation between UI, computation, data, and API layers.

---

## High-Level Structure

```
SGE/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── engines/            # Pure computation (JS)
│   ├── data/               # Static constants & datasets
│   ├── tabs/               # Page-level views
│   ├── theme/              # M3 design tokens
│   ├── styles/             # Global CSS
│   ├── hooks/              # React hooks (e.g. useAnime)
│   └── App.jsx             # Root app & routing
├── backend/                # Python API & engines
│   ├── api.py              # FastAPI endpoints
│   ├── sge.py              # Main orchestrator
│   └── *_engine.py         # Computation modules
└── docs/                   # Documentation
```

---

## Layer Responsibilities

### `src/components/`

Reusable, presentational UI. No business logic; receives props and renders.

- **charts/** — SVG visualizations (wheels, calendars)
- **ui/** — Buttons, tooltips, panels, inputs
- **layout/** — Header, footer, input panel
- **tables/** — Planet and aspect tables

### `src/engines/`

Pure JavaScript computation. No React; pure functions that take input and return structured output. Used by tabs and components.

- Astronomy, calendar, Chinese cycles, gematria, numerology, profile generation, dataset store, word crosswalk

### `src/data/`

Static constants: sign/planet/aspect definitions, calendar months, letter databases, numerology tables. Imported by engines and components.

- **astrology/** — Signs, planets, houses, aspects, Chinese data
- **calendar/** — Šambraielic months, festivals, symbolic cycles
- **grammatology/** — Letter DB, writing systems, correspondences
- **numerology/** — Tables, meanings
- **deepAnalysis/** — Interpretive text for deep chart analysis
- **datasets/** — JSON datasets (calendars, linguistics, semiotics)

### `src/tabs/`

Page-level views. Each tab composes components, calls engines, and fetches from the backend when needed. One tab per route/section.

### `src/theme/`

Material Design 3 design tokens: colors (surface, primary, tertiary), typography, spacing, radius. Single `m3.js` export.

### `src/styles/`

Global CSS: fonts, reset, scrollbar styling, animations, selection styling.

### `backend/`

Python FastAPI application. Orchestrates Swiss Ephemeris via `pyswisseph` for planetary positions, houses, aspects, transits, progressions, solar returns, synastry, harmonics. Additional engines for Chinese cycles, chronometric rulers, phi rhythm, element/modality.

- **api.py** — REST endpoints (natal, full analysis, transits, progressions, solar return, synastry, etc.)
- **sge.py** — Main SGE class that wires engines together
- **\*_engine.py** — Modular engines (time, planetary, house, aspect, transit, progression, solar return, synastry, harmonic, Chinese, chronometric, phi, element_modality)

---

## Data Flow

1. **User input** → `InputPanel` (birth data, location, synastry toggle)
2. **Frontend** → Calls `fetch()` to backend `/natal`, `/full`, `/transits`, etc.
3. **Backend** → `sge.py` runs engines, returns JSON
4. **Frontend** → Engines (JS) process or augment data; tabs render components with results

---

## Key Conventions

- Engines are **pure** — no side effects, no React
- Components receive **props** — no direct API calls in presentational components
- Tabs own **state** and **API calls** — orchestrate data flow
- Theme values live in `m3.js` — components import `M3` for colors/spacing
