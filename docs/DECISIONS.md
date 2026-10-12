# SGE — Decision Record

Standing decisions that constrain future work. Each entry records the choice
and the reasoning, so neither has to be re-derived.

---

## 1. Licence: GNU AGPL-3.0-only

**Decided.** SGE is licensed AGPL-3.0-only.

Swiss Ephemeris is dual-licensed AGPL-3.0 / paid Professional Licence. Taking
the free branch means SGE itself must be AGPL, and the obligations follow:

- SGE stays open source. It can never be closed, nor bundled into a closed
  paid product.
- AGPL §13 (the network clause) applies to a deployed instance: users
  interacting with it over a network must be offered the corresponding
  source. The footer therefore links to the repository, which is public.

### Consequence for accuracy work — route B

Accuracy work stays on **static hosting**. Specifically ruled out:

- deploying the Python backend
- shipping a WASM build of Swiss Ephemeris

The intended route is to generate a **bounded-range ephemeris table offline**,
using Swiss Ephemeris in **Moshier mode** — which uses no Astrodienst data
files and so raises no data-licence question — and ship that table with
interpolation.

This is not scheduled work. It is recorded so that nothing taken on in the
meantime forecloses it.

---

## 2. House system: Porphyry

**Decided.** The implementation stays as it is. `src/engines/astronomy.js`
computes **Porphyry**, and every label in the UI and docs must say so
accurately.

Do not silently switch the implementation to Placidus or anything else.

### Follow-up wanted (separate work)

A **house-system selector** — Whole Sign / Porphyry / Placidus — is wanted
later. This audience will expect the choice. Tracked here rather than done
now; it is its own piece of work.

---

## Ephemeris accuracy — provenance of the published figures

The deployed app does not use a Swiss Ephemeris backend; GitHub Pages cannot run
one, so the live site computes from the hand-rolled series in
`src/engines/astronomy.js`.

The Education tab publishes these figures for that series: Sun and Moon
effectively exact, Mercury reliable, Venus oscillating to 0.8°, and the outer
planets drifting with epoch to about 1.18° on Saturn by 2060.

**These figures were supplied by the project owner, not measured in this
repository.** They are attributed to `docs/RESEARCH_BRIEF.md`, which is not
present here and appears in no commit in this repository's history. Before
they are relied on — or restated anywhere else — they should be reproduced by
measuring `astronomy.js` against a reference ephemeris. That measurement is
outstanding work.

The following are verified against the source and are not in doubt:

- The Lahiri ayanamsa is a linear approximation:
  `ayanamsa = 23.8531 + 0.01397 * ((jd - 2451545) / 365.25)`.
- Sade Sati is not detected at all. The technique needs transiting Saturn;
  only natal Saturn is available, and `astronomy.js` carries a comment
  recording the decision not to infer it from natal data.
- Vedic yoga and dosha detection is described in the source as simplified.
- `MANSION_CROSSWALK` in `src/data/calendar/lunarMansions.js` pairs the Arabic
  manazil, the nakshatra scheme and the Chinese xiu by ordinal index. The three
  do not divide the sky the same way.
- The house system computed is Porphyry.

Why sub-degree error matters here: navamsa divisions are 3°20′, nakshatra
boundaries 13°20′, several dignities are degree-exact, and combustion orbs span
only a few degrees.

---

## 3. Grammatology and Sacred Calendar removed from the app

**Decided.** Neither tab is mounted any more. The app no longer surfaces
grammatology or the Sacred Calendar.

**Nothing is deleted.** The code and data are retained in full:

| Retained | Path |
|---|---|
| Grammatology tab | `src/tabs/GrammatologyTab.jsx` |
| Grammatology data | `src/data/grammatology/` — letterDb, hebrewMap, yetzirah, ogham, egyptian, ipa, digraphs, kangxiRadicals, scriptAtlas, writingSystems, correspondences, phonetics_data.json |
| Sacred Calendar tab | `src/tabs/CalendarTab.jsx` |
| Calendar data | `src/data/calendar/` — sambraielicWheel, subdivisions, symbolicCycles, sacredNames, lunarMansions, months, festivals, crossCultural, egyptianSolar, lunarEgyptian, cuspDays, interpretations, tarot |

What was removed is the wiring only: the two entries in the tab list, the two
lazy imports and the two render blocks in `src/App.jsx`. Remounting either tab
is a matter of restoring those three things.

Note that `src/data/calendar/tarot.js` is still used by the Tarot tab, and
`src/engines/gematria.js` is still used by Numerology, so those paths remain
live even though the Calendar and Grammatology tabs do not.

`MANSION_CROSSWALK` is no longer surfaced anywhere, so the note about it has
been dropped from the Education tab. The caveat still stands for the data
itself: it pairs three 28-fold systems by ordinal index, and they do not divide
the sky the same way.

---

## 4. Swiss Ephemeris dropped (2026-10-12)

**Decided** by Brandon, 12 October 2026: "drop swiss". SGE is going into a
paid subscription app, and Swiss Ephemeris (`pyswisseph`) is available only
under the AGPL or a paid professional licence. No part of SGE may depend on it.

What changed:

- Chart calculation runs only in the browser, in the JavaScript engines under
  `src/engines/` (chiefly `astronomy.js`). `src/App.jsx` no longer calls the
  backend `/full-analysis` endpoint; the in-browser path, which was already
  what the static site used, is now the only path.
- `pyswisseph` is gone from `backend/requirements.txt`. The backend engines
  that could not work without it were removed rather than left with dead
  imports: `planetary_engine.py`, `house_engine.py`, `transit_engine.py`,
  `progression_engine.py`, `solar_return_engine.py`, `return_engine.py`, the
  `sge.py` orchestrator, and the chart endpoints in `api.py` (`/natal`,
  `/full-analysis`, `/transits`, `/synastry`, `/progressions`,
  `/solar-return`, `/lunar-return`, `/harmonic`). The backend now serves
  `/health` and the phonetics data only.
- `time_engine.py` computes Julian days with the Meeus algorithm instead of
  `swe.julday` / `swe.revjul`; `harmonic_engine.py` carries its own sign table.
- `tools/accuracy_check.py`, which compared the JS engines against
  `pyswisseph`, was removed. Measuring `astronomy.js` against a reference
  ephemeris (see "Ephemeris accuracy" above) remains outstanding; it must be
  done with a reference that SGE does not ship or link against.

This supersedes the "route B" plan in entry 1: the offline table is no longer
to be generated with Swiss Ephemeris in Moshier mode. Future accuracy work
stays inside the JavaScript engines and must not reintroduce AGPL code.

Entry 1's reasoning for the AGPL licence rested on Swiss Ephemeris. That
reason no longer applies, but SGE's own licence (`LICENSE`, `package.json`,
the footer link) is unchanged by this entry; relicensing is a separate
decision for the owner.
