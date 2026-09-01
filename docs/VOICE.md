# SGE — Voice Rule

SGE is a symbolic instrument for practitioners and spiritualists who already
know what to do with what they find. It is not a horoscope app.

## The governing rule

> **Name what stands there and what it has meant.
> Never tell the reader who they are or what will happen.**

## Forbidden in rendered text

- **Second-person address about the person** — "you are", "you're", "you were
  born with", "your core self", "you may feel", "you tend to", "your greatest
  gift"
- **Forecasts** — "expect", "this will bring", "a good day to", "this year
  brings"
- **Compatibility verdicts** — "you two are highly compatible"
- **Growth instructions** — "you're growing when…", "lean into this"

## Permitted, and wanted

- Naming the position and what the tradition has attributed to it
- Naming the **lineage** of an attribution (Ptolemaic, Hellenistic, Golden
  Dawn, Sepher Yetzirah, Vedic, modern psychological, and so on)
- Naming where sources **disagree**, and leaving it unresolved
- Asking the practitioner a **question**

## The test

| Wrong | Right |
|---|---|
| "Your 7th house shows who you attract" | "The 7th house is the ground of the one-to-one relation" |
| "Your Sun in Aries makes you a natural leader" | "The Sun in Aries places the light in the sign of initiation" |
| "This transit will bring conflict" | "Mars squares natal Saturn at an orb of 1.2°" |

Prefer **"this chart"** to "your chart". Prefer naming the count and the orb to
characterising what a count means.

## Record shape

Every record in `src/data/symbolism/` is:

```js
{
  plain:     "depth 0 — what stands there, ordinary words, 1-2 sentences",
  reading:   "depth 1 — what the tradition attributes to it, 2-3 sentences",
  principle: "depth 2 — underlying structure and lineage, 2-4 sentences",

  energies:        ["short", "noun", "phrases"],       // optional
  tensions:        ["short", "noun", "phrases"],       // optional
  attributions:    [{ lineage: "Ptolemaic", claim: "…" }], // optional
  correspondences: ["metal: iron", "day: Tuesday"],    // optional
  contested:       ["Sources disagree on …"],          // optional
  prompts:         ["A question for the practitioner?"],// optional
}
```

Only `plain` is required. `SymbolPanel` reveals the structural fields as depth
increases.

## Enforcement

`scripts/smoke-test.mjs` renders every tab and asserts that no second-person
address survives on the rendered surface. The rule is kept by the test, not by
grep discipline.
