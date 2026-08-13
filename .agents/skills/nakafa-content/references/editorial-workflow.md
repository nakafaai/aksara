# Editorial workflow

## Classify ownership first

Use exactly one review mode for each target.

- `authored-humanizer-review` covers Nakafa-authored prose and localized
  metadata.
- `assessed-language-preserved` covers prompts and choices whose language is
  the skill being assessed.
- `immutable-official-source` covers byte-exact official sources and quoted
  material whose provenance requires preservation.

Classification controls which bytes may change. It is not a label added after
translation.

## Authored translation sequence

For every authored target document or localized metadata record:

1. Identify the exact target path, app locale, delivery language, and source
   paths.
2. Audit the English and Indonesian sources for factual, citation, structural,
   terminology, and artificial-writing problems.
3. Read and apply the complete Humanizer skill to the source. Correct the source
   only when evidence supports the change.
4. Draft from the corrected meaning, the current terminology glossary, and
   primary evidence. Do not translate sentence by sentence without considering
   how a teacher would explain the idea in the target locale.
5. Apply the complete Humanizer skill again to the target draft.
6. Check fabrication, citations, terminology, headings, math, code,
   accessibility, punctuation, and route identity.
7. Compile the exact document through Aksara and preview it through Nakafa's
   real renderer.
8. Record exact target and source hashes in editorial review evidence only after
   the reviewed bytes are final.

Humanizer is an editorial workflow, not proof that a person wrote the text. Use
the phrase `Humanizer-reviewed editorial content`, never `human-authored`, in
release evidence.

## Assessed language

- English-language sections use English prompt and choice artifacts for every
  app locale.
- Indonesian-language sections use Indonesian prompt and choice artifacts for
  every app locale.
- Answers and explanations use the app locale.
- Do not create German prompt or choice copies for an English or Indonesian
  language assessment.
- Do not change assessed bytes merely to match authored style. Bind them through
  `assessed-language-preserved` evidence.

## Immutable sources

- Read the current pinned source policy before touching provenance.
- Never pass exact Quran translation, Tafsir, or other official source bytes
  through Humanizer.
- Keep path, exact byte hash, source version, attribution, and terms bound by
  `immutable-official-source` evidence.
- Localized explanatory shell copy is authored content and follows the authored
  workflow separately.

## German terminology

Create and review one glossary before translating a scope. Use it consistently
for education levels, subjects, mathematics, science, Quran, account,
accessibility, and try-out terms. Route slugs use lowercase ASCII kebab case with
`ae`, `oe`, `ue`, and `ss` where required. Validate collisions and stable
cross-locale identity rather than adding spelling redirects.
