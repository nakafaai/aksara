# Editorial workflow

## Classify ownership first

Classify each target before changing its bytes.

- Nakafa-authored prose and localized metadata receive the authored review
  workflow below.
- Prompts and choices whose language is being assessed retain that assessed
  language.
- Byte-exact official sources and quoted material retain their required source
  bytes and provenance.

Classification controls which bytes may change. It is not a label added after
translation.

Humanizer is Codex authoring guidance only. Never encode its name, version,
completion, classification, or output in Aksara contracts, corpus metadata,
snapshot identities, release manifests, digests, or runtime publication gates.

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
8. Keep the resulting authored bytes in their domain-owned Aksara source. Git
   provenance and the publication contracts authenticate those bytes.

## Assessed language

- English-language sections use English prompt and choice artifacts for every
  app locale.
- Indonesian-language sections use Indonesian prompt and choice artifacts for
  every app locale.
- Answers and explanations use the app locale.
- Do not create German prompt or choice copies for an English or Indonesian
  language assessment.
- Do not change assessed bytes merely to match authored style.

## Immutable sources

- Read the current pinned source policy before touching provenance.
- Never pass exact Quran translation, Tafsir, or other official source bytes
  through Humanizer.
- Keep path, exact byte hash, source version, attribution, and terms bound by
  the source-owned provenance contract.
- Localized explanatory shell copy is authored content and follows the authored
  workflow separately.

## German terminology

Create and review one glossary before translating a scope. Use it consistently
for education levels, subjects, mathematics, science, Quran, account,
accessibility, and try-out terms. Route slugs use lowercase ASCII kebab case with
`ae`, `oe`, `ue`, and `ss` where required. Validate collisions and stable
cross-locale identity rather than adding spelling redirects.
