# SGE Components

Reusable UI components in `src/components/`. Organized by charts, ui, layout, and tables.

---

## charts/

| Component | Description |
|-----------|-------------|
| **WheelChart** | Western astrological chart wheel: zodiac ring, houses, planets, aspects, axis waves. SVG-based with anime.js entrance animations. |
| **WheelWithTooltip** | Wrapper around WheelChart that adds tooltip support for planets and aspects. |
| **CalendarWheel** | Multi-ring calendar wheel (e.g. Mayan, Chinese, Islamic, Jewish). Renders rings, segments, labels, center. |
| **CalendarWheelWithTooltip** | CalendarWheel with tooltip support. |
| **ChineseWheel** | Chinese zodiac wheel: animals, elements, trigrams, yin-yang. |
| **ChineseWheelWithTooltip** | ChineseWheel with tooltip support. |

---

## ui/

| Component | Description |
|-----------|-------------|
| **ProfilePanel** | Renders astrological profile summary sections (e.g. from `profile.js`). Staggered anime.js entrance. |
| **Tooltip** | Contextual tooltip with positioning. Animated opacity/scale on show. |
| **Card** | Glassmorphic card with variants (e.g. surface, primary container). |
| **ComputeButton** | Animated compute button with loading state. Scale animation on click. |
| **DistBar** | Distribution bar chart for element/modality balance. Animated width. |
| **Field** | Number input field with optional tooltip. |
| **ScriptSelector** | Searchable script/alphabet selector for grammatology. |
| **StarCanvas** | Animated starfield background canvas. |
| **TabBar** | Horizontal scrolling tab navigation with groups. |
| **TabContent** | Animated tab content wrapper (fade/slide on tab change). |

---

## layout/

| Component | Description |
|-----------|-------------|
| **Header** | App header with title and tagline. Staggered text animation. |
| **Footer** | App footer with version info. |
| **InputPanel** | Birth data input form: Person A/B fields, location, synastry toggle, compute trigger. |

---

## tables/

| Component | Description |
|-----------|-------------|
| **PlanetTable** | Table of planet positions: sign, degree, house, Western/Vedic mappings, script mappings. Staggered row animation. |
| **AspectTable** | Table of planetary aspects with strength indicators (orb, type, interpretation). |

---

## Exports

- `charts/index.js` — Exports WheelChart, WheelWithTooltip, CalendarWheel, CalendarWheelWithTooltip, ChineseWheel, ChineseWheelWithTooltip
- `tables/index.js` — Exports PlanetTable, AspectTable
- `ui/index.js` — Exports all UI components
- Layout components are imported directly from their paths
