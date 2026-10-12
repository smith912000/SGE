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
├── backend/                # Optional Python API (phonetics data)
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

Page-level views. Each tab composes components, and calls engines. One tab per route/section.

### `src/theme/`

Material Design 3 design tokens: colors (surface, primary, tertiary), typography, spacing, radius. Single `m3.js` export.

### `src/styles/`

Global CSS: fonts, reset, scrollbar styling, animations, selection styling.

### `backend/`

Optional Python FastAPI application. It serves the phonetics data (`/phonetics/*`, used by the phonetic crosswalk, which falls back to bundled static data when the API is unreachable) and a `/health` check. It does **not** compute charts: every chart figure is computed in the browser by `src/engines/`. The Swiss Ephemeris-based chart endpoints were removed on 2026-10-12 (see DECISIONS.md, entry 4).

- **api.py** — FastAPI app: `/health` plus the phonetics router
- **phonetic_router.py / phonetic_db.py** — phonetics endpoints and SQLite models
- **\*_engine.py** — Pure-Python helper engines with no ephemeris dependency (time, aspect, synastry, harmonic, Chinese, chronometric, phi, element_modality, resonance). They are not wired to any endpoint.

---

## Data Flow

1. **User input** → `InputPanel` (birth data, location, synastry toggle)
2. **Frontend** → `App.jsx` computes the chart with the JS engines in `src/engines/` (positions, houses, aspects, progressions, solar return, harmonics, synastry); no server call
3. **Frontend** → Tabs render components with the results

---

## Key Conventions

- Engines are **pure** — no side effects, no React
- Components receive **props** — no direct API calls in presentational components
- Tabs own **state** and **API calls** — orchestrate data flow
- Theme values live in `m3.js` — components import `M3` for colors/spacing
