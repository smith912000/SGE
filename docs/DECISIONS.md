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

## Open — not yet established

**Ephemeris accuracy has not been measured.** The deployed app does not use a
Swiss Ephemeris backend; GitHub Pages cannot run one, so the live site runs on
the hand-rolled series in `src/engines/astronomy.js`.

No error figures for that series exist in this repository. `docs/RESEARCH_BRIEF.md`
is referenced by prior planning but is not present in the repo, and no such
file appears anywhere in the git history. Any published accuracy claim — per
body, per epoch — must come from an actual measurement against a reference
ephemeris before it is written down or shown to users.

This matters more than it would elsewhere, because several techniques in SGE
are sensitive at or below the degree:

- navamsa divisions are 3°20′
- nakshatra boundaries are 13°20′
- several dignities are degree-exact
- combustion orbs span only a few degrees

Related items needing verification before they are described to users:

- the Lahiri ayanamsa as implemented is a linear approximation
- Vedic yoga and dosha detection is self-documented as simplified
- `MANSION_CROSSWALK` in `src/data/calendar/lunarMansions.js` pairs three
  28-fold systems by index, though they do not divide the sky identically
