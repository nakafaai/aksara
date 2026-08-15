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
2. Audit every existing locale sibling that owns the reviewed meaning for
   factual, citation, structural, terminology, and artificial-writing problems.
3. Read and apply the complete Humanizer skill to the source. Correct the source
   only when evidence supports the change.
4. Record the corrected document's ordered teaching units: concepts, sections,
   examples, exercises, worked solutions, checks, tables, diagrams, math, code,
   and custom MDX components. Every locale sibling must implement that same
   inventory.
5. Translate the complete corrected document. Natural target-language syntax is
   required, but it must not add, remove, reorder, compress, or replace a
   teaching unit. Translation is not permission to redesign the lesson.
6. Apply the complete Humanizer skill again to the target draft. Humanizer may
   improve wording, rhythm, and clarity, but it may not remove teaching context,
   reasoning steps, evidence, math, or components.
7. Check fabrication, citations, terminology, headings, math, code,
   accessibility, punctuation, and route identity.
8. Compare the locale siblings structurally and semantically. Confirm that every
   teaching unit and component has one corresponding localized implementation.
9. Compile the exact document through Aksara and preview it through Nakafa's
   real renderer.
10. Keep the resulting authored bytes in their domain-owned Aksara source. Git
   provenance and the publication contracts authenticate those bytes.

## Assessed language

- Prompts and choices use the section's assessed `deliveryLanguage` for every
  app locale.
- Answers and explanations use the app locale.
- Do not duplicate an assessed prompt or its choices merely because the app
  locale changes.
- Do not change assessed bytes merely to match authored style.

## Immutable sources

- Read the current pinned source policy before touching provenance.
- Never pass exact Quran translation, Tafsir, or other official source bytes
  through Humanizer.
- Keep path, exact byte hash, source version, attribution, and terms bound by
  the source-owned provenance contract.
- Localized explanatory shell copy is authored content and follows the authored
  workflow separately.

## Locale terminology

Create or review the target locale glossary before translating a scope. Use it
consistently for education levels, subjects, mathematics, science, Quran,
account, accessibility, and try-out terms. Derive route slugs from the
contract-owned locale policy, then validate collisions and stable cross-locale
identity instead of adding spelling redirects.
