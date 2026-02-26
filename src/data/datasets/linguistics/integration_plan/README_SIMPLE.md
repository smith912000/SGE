Integration Plan — Simple Explanation

This folder contains two files:

- `integration_todo.md` — A step-by-step checklist for importing and mapping all Unicode scripts into the app.
- `README_SIMPLE.md` — (this file) Explains what the todo file contains and how to use it.

How to use

1. Read `integration_todo.md` to see the full steps and schema.
2. Run or implement the Node automation scripts (suggested filenames are in the todo) to create skeleton JSON for each script.
3. Use AI assistance to propose mappings from `LETTER_DB` root letters to script glyphs. Save proposals in `mappingCandidates` inside each script file.
4. Human review the proposals and mark `status` to `validated` when confirmed.
5. Merge validated overlays into the app via overlay files or runtime augmentation.

Why this is split

- The todo file is action-oriented for developers and AI agents.
- This simple README explains the workflow plainly so non-technical reviewers can understand what to check.

Notes for AI workers

- Use `unicode_scripts.json` as the canonical list of script names.
- When extracting codepoints, use the official `Scripts.txt` ranges.
- Provide confidence scores for any automatic mapping; humans will review borderline cases.
