# Integration To-Do: Add 170+ Unicode Scripts to the Engine

Purpose: outline a structured, AI-friendly sequence to import, map, validate and surface full-script datasets so each script can be displayed and used by the `LETTER_DB`/Grammatology engine.

Priority: High — break into automated + manual steps.

Steps

1. Fetch canonical script list
   - Source: `src/data/datasets/linguistics/unicode_scripts.json` (already generated).
   - Verify version and record `updatedAt`.

2. Create per-script dataset skeletons (automated)
   - For each script name, create a dataset file: `datasets/linguistics/scripts/{ScriptName}.json`.
   - Each file should contain the schema below (skeleton with unicode ranges and placeholder glyphs).

3. Populate Unicode codepoint ranges (automated)
   - From `Scripts.txt`, extract ranges for each script and add them to the script dataset under `codepointRanges`.

4. Generate representative glyph samples (automated then manual)
   - Grab sample codepoints for each script (first N assigned codepoints and commonly used letters). Store as `samples` (array of hex points and rendered glyphs where possible).
   - Where multiple orthographies exist (e.g., Han/Japanese/Korean), mark `usageHints`.

5. Map script dataset fields to `LETTER_DB` (manual + AI-assisted)
   - Define mapping rules: which `LETTER_DB` field corresponds to which script dataset field (e.g., `latin` -> Latin; `greek` -> Greek; `hiero` -> Egyptian_Hieroglyphs/Han fallback).
   - Produce a `mapping.json` that maps canonical Unicode script names to `LETTER_DB` keys and transformation rules.

6. Build transliteration & canonical names (AI-assisted)
   - For scripts lacking Latin transliterations, use standard transliteration tables (ISO 15919, ISO 9, Hepburn, Pinyin etc.) via datasets or libraries.
   - Store `transliterationMap` in each script file.

7. Curate representative letter-to-root correspondences (manual + AI suggesting)
   - For each `LETTER_DB` entry (the 22 root letters), propose candidate glyphs in the script dataset that map to that root (based on historical/glyph similarity and phonetics).
   - Save candidate lists with confidence scores for human review.

8. Validation and QA (automated tests)
   - Validate JSON schema for each script dataset.
   - Run a rendering smoke-test: render sample glyphs in a headless browser or React SSR to ensure fonts/characters display.
   - Check transliteration round-trips where possible.

9. Merge into `LETTER_DB` (controlled, incremental)
   - For validated mappings, create a patch to `src/data/grammatology/letterDb.js` or preferably create a `letterDb_overlays/{script}.js` that augments `LETTER_DB` at runtime.
   - Do not overwrite existing curated data; append or align via `CROSS_SCRIPTS` style overlay objects.

10. UI/UX integration
   - Ensure `ScriptSelector` is connected to table filters and column rendering (done for simple mapping).
   - Add a per-script detail page that lists `codepointRanges`, `samples`, `transliterationMap`, `mappingCandidates` and QA notes.

11. Automation & tooling
   - Provide Node scripts: `scripts/generate_script_skeletons.js`, `scripts/populate_codepoints.js`, `scripts/generate_samples.js`, `scripts/attach_mappings.js`.
   - Provide an `ai_assist/` folder with prompt templates for proposing mapping candidates and quality-check instructions.

12. Documentation & review
   - Keep a human-review board (PR-based) for each script dataset.
   - Track review status in each dataset: `status: draft|review|validated|published`.

Schema (per-script JSON skeleton)

```
{
  "id": "Latin",
  "title": "Latin",
  "unicodeVersion": "17.0.0",
  "codepointRanges": ["0000-007F","0100-017F"],
  "samples": [{"cp":"0041","glyph":"A","name":"LATIN CAPITAL LETTER A"}],
  "transliterationMap": {"Α":"A"},
  "mappingCandidates": {
    "rootA": [{"cp":"0041","glyph":"A","confidence":0.9}]
  },
  "status": "draft",
  "notes": "source: Unicode Scripts.txt"
}
```

AI tasks (templates)
 - Extract likely letter correspondences by phonetic similarity and glyph shape.
 - Propose transliterations and confidence-scored mappings.
 - Generate `mappingCandidates` for human review.

Milestones
 - M1: Skeletons + codepoint ranges created (automated).
 - M2: Samples + transliteration maps generated (automated + AI).
 - M3: Mapping candidates proposed and under review (AI + human).
 - M4: Validated mappings merged into overlays and surfaced in UI.

Notes
 - Start with high-value scripts (Latin, Greek, Hebrew, Arabic, Devanagari, Chinese/Han, Cyrillic, Armenian, Georgian, Ethiopic) then iterate the rest.
 - Prefer overlay files to editing `letterDb.js` directly.
