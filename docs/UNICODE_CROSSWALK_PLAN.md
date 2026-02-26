# Unicode / Grammatology Crosswalk Integration Plan

**Purpose:** Integrate 170+ Unicode scripts with the existing 22-root letter database (`LETTER_DB`), enabling cross-script character mapping, lineage tracing, and astrological resonance features.

**Related documents:**
- `src/data/datasets/linguistics/integration_plan/integration_todo.md` — Step-by-step integration checklist
- `src/data/datasets/linguistics/integration_plan/README_SIMPLE.md` — Workflow overview for reviewers

---

## Phase 1: Data Acquisition

### Objectives
- Import 170+ scripts from the Unicode Character Database (UCD)
- Build a master script registry with metadata for lineage and correlation

### Sources
| File | URL | Purpose |
|------|-----|---------|
| Scripts.txt | https://unicode.org/Public/UCD/latest/ucd/Scripts.txt | Script assignment per codepoint range |
| Blocks.txt | https://unicode.org/Public/UCD/latest/ucd/Blocks.txt | Block names and ranges |
| PropertyValueAliases.txt | https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt | Script name aliases, ISO 15924 codes |

### Master Script Registry Schema
Create `src/data/datasets/linguistics/script_registry.json`:

```json
{
  "unicodeVersion": "17.0.0",
  "scripts": [
    {
      "name": "Latin",
      "code": "Latn",
      "iso15924": "215",
      "unicodeBlocks": ["0000-007F", "0100-017F", "0180-024F", "2C60-2C7F", "A720-A7FF", "AB30-AB6F", "FB00-FB4F", "FF00-FFEF"],
      "estimatedAge": "-700",
      "parentScript": "Greek",
      "scriptType": "alphabet",
      "direction": "LTR",
      "derivationChain": ["Phoenician", "Greek", "Latin"]
    }
  ]
}
```

### Script Type Classification
- **alphabet** — Vowels and consonants equal (Greek, Latin, Cyrillic, Georgian, Armenian)
- **abjad** — Consonant-only (Phoenician, Hebrew, Arabic, Aramaic, Syriac)
- **abugida** — Consonant-vowel units (Devanagari, Tamil, Brahmi, Ge'ez, Thai, Tibetan)
- **syllabary** — Syllable-based (Linear B, Cherokee, Hiragana, Katakana)
- **logographic** — Word/morpheme-based (Han, Egyptian Hieroglyphs)

### Existing Infrastructure
- `src/data/datasets/linguistics/unicode_scripts.json` — Already contains 170+ script names; extend with metadata
- No existing script registry; Phase 1 creates it

### Estimated Effort
- **Automated:** 2–3 days (fetch UCD files, parse, generate registry)
- **Manual curation:** 3–5 days (parent script, derivation chains, estimated age for major scripts)

---

## Phase 2: Per-Script Dataset Skeletons

### Objectives
- Create dataset files for each major script family following the schema from `integration_todo.md`
- Populate with Unicode ranges, sample characters, and placeholder mappings

### Schema (from integration_todo.md)
```json
{
  "id": "Latin",
  "title": "Latin",
  "unicodeVersion": "17.0.0",
  "codepointRanges": ["0000-007F", "0100-017F"],
  "samples": [{"cp": "0041", "glyph": "A", "name": "LATIN CAPITAL LETTER A"}],
  "transliterationMap": {"Α": "A"},
  "mappingCandidates": {
    "root1": [{"cp": "0041", "glyph": "A", "confidence": 0.9}]
  },
  "status": "draft",
  "notes": "source: Unicode Scripts.txt"
}
```

### Extended Fields (for crosswalk)
| Field | Description |
|-------|-------------|
| `name` | Display name |
| `code` | ISO 15924 code |
| `type` | alphabet / abjad / abugida / syllabary / logographic |
| `direction` | LTR / RTL / Boustrophedon / Top-Bottom |
| `parent` | Parent script ID |
| `letterCount` | Approximate letter count |
| `sampleChars` | Representative glyphs string |
| `unicodeRange` | Primary block(s) |
| `historicalNotes` | Brief lineage notes |
| `connectionToRoot` | Array of `{ rootOrder: 1–22, glyph: "A", confidence: 0.9 }` |

### Priority Tiers
| Tier | Scripts | Rationale |
|------|---------|-----------|
| **Tier 1** | Phoenician, Hebrew, Greek, Aramaic, Samaritan | Direct Phoenician descendants; already in `CROSS_SCRIPTS` |
| **Tier 2** | Latin, Cyrillic, Coptic, Gothic, Armenian, Georgian, Syriac, Arabic, Ge'ez, Glagolitic | Indirect via Greek/Aramaic; most in `CROSS_SCRIPTS` |
| **Tier 3** | Brahmi, Devanagari, Tamil, Thai, Tibetan, Hangul, Han, Egyptian Hieroglyphs, Ogham, Runic | Independent or complex derivation; partial coverage |

### Output Location
- `src/data/datasets/linguistics/scripts/{ScriptName}.json`
- One file per script; start with Tier 1–2

### Existing Infrastructure
- `integration_todo.md` schema — Direct reuse
- `LETTER_DB` + `CROSS_SCRIPTS` — Source for `connectionToRoot` and `mappingCandidates`
- `WRITING_SYSTEM_TYPES` in `writingSystems.js` — Script type and example glyphs

### Estimated Effort
- **Automated skeletons:** 1–2 days (scripts from integration_todo)
- **Codepoint population:** 1 day (from Scripts.txt)
- **Sample generation:** 2–3 days (first N codepoints + common letters)
- **Manual mapping candidates:** 5–10 days (Tier 1–2 scripts)

---

## Phase 3: Crosswalk Correlation Engine

### Objectives
- Build `src/engines/crosswalk.js` that maps any script character back to the 22 proto-Sinaitic/Phoenician root letters
- Trace lineage through known derivation chains
- Generate cross-references for UI display

### Algorithm
1. **Input:** Target script name + character (or codepoint)
2. **Lookup:** Resolve character to script dataset → `mappingCandidates` or `connectionToRoot`
3. **Trace lineage:** For each root (1–22), build chain:
   - `LETTER_DB[root].phoenician` → `LETTER_DB[root].greek` → `LETTER_DB[root].latin` (etc.)
4. **Output:** `{ root: 1, rootName: "Aleph", chain: ["Latin A", "Greek Alpha", "Phoenician Aleph", "Root 1 (Ox)"], confidence: 0.95 }`

### API Surface
```javascript
// Map a character in a given script to root letter(s)
export function charToRoot(scriptId, charOrCodepoint) { ... }

// Map a string in a given script to root letters (for Word Crosswalk extension)
export function stringToRoots(scriptId, text) { ... }

// Get full lineage chain for a root letter across all known scripts
export function getRootLineage(rootOrder) { ... }

// Resolve script ID to LETTER_DB field name (e.g., "Latin" → "latin")
export function scriptToLetterDbField(scriptId) { ... }
```

### Derivation Chain Data
Store in script datasets or a dedicated `derivation_chains.json`:
- Phoenician → Greek, Aramaic, Old South Arabian
- Greek → Latin, Cyrillic, Coptic, Gothic
- Aramaic → Hebrew, Syriac, Arabic, Nabataean
- Brahmi → Devanagari, Tamil, Thai, Tibetan, etc.

### Existing Infrastructure
- `LETTER_DB` — 22 roots with phoenician, greek, hebrew, latin, runic, aramaic, samaritan, coptic, gothic, armenian, georgian, geez, ogham, arabic, syriac, devanagari, tamil, brahmi, oldSouthArabian, bopomofo, cyrillic, glagolitic, cuneiform
- `LATIN_TO_LETTER` in `yetzirah.js` — Latin → Hebrew mapping used by `analyzeWord`
- `wordCrosswalk.js` — `analyzeWord()` pattern; crosswalk engine extends this for multi-script input

### Dependencies
- Phase 1 (script registry)
- Phase 2 (per-script datasets with `mappingCandidates` / `connectionToRoot`)

### Estimated Effort
- **Core engine:** 3–4 days
- **Derivation chain data:** 2–3 days
- **Integration with `analyzeWord`:** 1–2 days

---

## Phase 4: UI Integration

### Objectives
- Expand `GrammatologyTab` to show all scripts organized by family tree
- Add interactive script family tree visualization
- Character evolution timeline per root letter
- Filtering by script type, region, era

### Components to Add/Extend

| Component | Description |
|-----------|-------------|
| **ScriptFamilyTree** | Interactive tree (D3/React Flow or CSS) showing Phoenician → Greek → Latin, etc. |
| **CharacterEvolutionTimeline** | Per root letter: show glyph evolution across scripts (Hiero → Phoenician → Greek → Latin) |
| **ScriptSelector** | Extend to include all 170+ scripts; filter by type, region, era |
| **CrosswalkTable** | Extend existing table to support dynamic script column selection from registry |

### GrammatologyTab Extensions
- New tab: **"Script Family Tree"** — Visual tree of script derivation
- New tab: **"Character Evolution"** — Select root letter (1–22), see glyph evolution across scripts
- Extend **"Cross-Script Table"** — Add `gramScriptFilter` options for all scripts in registry
- Filters: `scriptType` (alphabet/abjad/abugida/logographic), `region` (if added to registry), `era` (ancient/medieval/modern)

### Existing Infrastructure
- `GrammatologyTab.jsx` — `gramTab`, `gramScriptFilter`, `ScriptSelector`, `LETTER_DB`, `WRITING_SYSTEM_TYPES`
- `SCRIPT_TO_FIELD` — Maps script names to `LETTER_DB` keys; extend for new scripts
- `Card` component — Layout pattern
- Existing table with column filters (core, semitic, european, indic, all)

### Dependencies
- Phase 1 (script registry for tree structure)
- Phase 2 (script datasets for glyph display)
- Phase 3 (crosswalk engine for lineage chains)

### Estimated Effort
- **Script family tree:** 4–5 days
- **Character evolution timeline:** 5–6 days
- **Filtering and ScriptSelector:** 2–3 days

---

## Phase 5: Cross-System Resonance

### Objectives
- Connect script characters to astrology signs via existing zodiac-letter mappings in `letterDb`
- Generate "script signature" based on user birth data (which scripts resonate with their chart)

### Zodiac-Letter Mappings (Existing)
- `LETTER_DB[].yetzirah.sign` — Aries (He), Taurus (Vav), Gemini (Zayin), … Pisces (Qoph)
- `LETTER_DB[].yetzirah.planet` — Saturn (Bet), Jupiter (Gimel), Mars (Dalet), … Moon (Tav)
- `signToLetter`, `planetToLetter` in `yetzirah.js` — Used by `planetToLetter` in GrammatologyTab
- `ZODIAC_CHINESE_MAP`, `CHINESE_ZODIAC_HEBREW` in `correspondences.js`

### Script Signature Algorithm
1. **Input:** User birth data (date, time, place) → natal chart (planets in signs)
2. **Compute:** For each planet/sign in chart, get corresponding Hebrew letter via `planetToLetter` / `signToLetter`
3. **Map:** For each letter, get glyphs in all scripts via `CROSS_SCRIPTS` + Phase 2 datasets
4. **Output:** "Your chart emphasizes: Aleph (Air), Mem (Water), Shin (Fire) — scripts: Phoenician, Hebrew, Greek, Latin, …"

### UI Feature
- **"Your Script Resonance"** card in GrammatologyTab
- Shows: planets/signs in user chart → letters → sample glyphs across scripts
- Optional: "Your name in script X" — render user name in scripts that resonate with their chart

### Existing Infrastructure
- `planetToLetter`, `signToLetter`, `LATIN_TO_LETTER` in `yetzirah.js`
- `LETTER_DB[].yetzirah` — type, element, planet, sign
- `res` (chart result) in GrammatologyTab — `planetToLetter(p)` used for "YOUR LETTERS" display
- `P_COL`, `P_SYM`, `SIGN_COL`, `SIGN_SYM`, `SIGN_INFO` — Styling for planets/signs

### Dependencies
- Phase 2 (script datasets for glyph display)
- Phase 3 (crosswalk for multi-script glyph lookup)
- Birth chart / profile engine (already exists)

### Estimated Effort
- **Script signature logic:** 2–3 days
- **UI integration:** 2–3 days

---

## Phase Dependencies & Order

```
Phase 1 (Data Acquisition)
    └── Phase 2 (Per-Script Skeletons)
            ├── Phase 3 (Crosswalk Engine)
            │       └── Phase 4 (UI Integration)
            │       └── Phase 5 (Cross-System Resonance)
            └── Phase 4 (partial: script list, filters)
            └── Phase 5 (partial: glyph display)
```

---

## Summary: Existing Codebase Support

| Phase | Key Existing Files |
|-------|--------------------|
| 1 | `unicode_scripts.json`, `integration_todo.md` |
| 2 | `letterDb.js`, `CROSS_SCRIPTS`, `writingSystems.js`, integration_todo schema |
| 3 | `letterDb.js`, `yetzirah.js` (LATIN_TO_LETTER), `wordCrosswalk.js` |
| 4 | `GrammatologyTab.jsx`, `ScriptSelector`, `WRITING_SYSTEM_TYPES`, `SCRIPT_TO_FIELD` |
| 5 | `yetzirah.js` (planetToLetter, signToLetter), `letterDb.js` (yetzirah, tarot), `correspondences.js` |

---

## Automation Scripts (from integration_todo)

| Script | Purpose |
|--------|---------|
| `scripts/generate_script_skeletons.js` | Create skeleton JSON per script |
| `scripts/populate_codepoints.js` | Add codepoint ranges from Scripts.txt |
| `scripts/generate_samples.js` | Generate sample glyphs |
| `scripts/attach_mappings.js` | Attach mapping candidates from LETTER_DB |
| `ai_assist/` | Prompt templates for mapping proposals |

---

## Milestones

| Milestone | Description |
|-----------|-------------|
| **M1** | Script registry + skeletons + codepoint ranges (Phases 1–2 automated) |
| **M2** | Samples + transliteration maps + mapping candidates (Phase 2 manual) |
| **M3** | Crosswalk engine operational (Phase 3) |
| **M4** | UI: script family tree + character evolution (Phase 4) |
| **M5** | Script signature + cross-system resonance (Phase 5) |

**Total estimated effort:** ~35–50 person-days across all phases.
