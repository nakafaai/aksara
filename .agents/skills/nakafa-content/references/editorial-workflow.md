# Editorial workflow

## Classify ownership first

Classify each target before changing its bytes.

- Nakafa-authored prose and localized metadata receive the authored review
  workflow below.
- Prompts and response options whose language is being assessed retain that assessed
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
2. Audit every canonical source sibling for factual, citation, structural,
   terminology, and artificial-writing problems. No sibling that contributes
   reviewed meaning may be skipped.
3. Read and apply the complete Humanizer skill to the source. Correct the source
   only when evidence supports the change.
4. Audit every causal, comparative, and qualitative claim. Record its subject,
   condition, comparison or mechanism, consequence, and evidence. Remove a
   claim when the source does not support the detail needed to make it clear.
5. Record the corrected document's ordered teaching units: concepts, sections,
   examples, exercises, worked solutions, checks, tables, diagrams, math, code,
   and custom MDX components. Also trace the teacher-led reasoning from the
   learner's starting point through each explanation, example, and check. This
   trace describes the lesson at hand. It must not become a repeated template
   imposed on unrelated lessons. Every locale sibling must implement the same
   teaching and representation inventory.
6. Recreate the complete corrected document in the target language from the
   reviewed meaning and teaching inventory. Do not map the source sentence word
   by word or preserve its clause order merely for symmetry. Use the target
   language's normal syntax, connective words, technical vocabulary, and
   register. This language-specific rewrite must not add, remove, reorder,
   compress, or replace a teaching unit.
7. Apply the complete Humanizer skill again to the target draft. Humanizer may
   improve wording, rhythm, and clarity, but it may not remove teaching context,
   reasoning steps, evidence, math, or components.
8. Check fabrication, citations, terminology, headings, math, code,
   accessibility, punctuation, and route identity. Keep authoring evidence in
   the source and publisher contracts. Competitor or secondary explainers may
   inform the writing and remain as non-published, claim-matched provenance,
   but never as learner-visible links. Remove redundant, citation-only, and
   optional external navigation. Keep official documentation, primary data, a
   standard, or a reference link visible only when the learner has a concrete
   reason to inspect that exact resource. Put a descriptive linked source name
   or phrase beside the exact claim it supports without flattening the teaching
   sentence. Never add a lesson, domain, or URL allowlist to the deterministic
   checker.
9. Compare the locale siblings structurally and semantically. Confirm that every
   teaching unit and component has one corresponding localized implementation.
   Then hide the siblings and read each locale on its own. A sentence fails if
   its meaning becomes clear only after consulting another language.
10. Compile the exact document through Aksara and preview it through Nakafa's
   real renderer.
11. Keep the resulting authored bytes in their domain-owned Aksara source. Git
   provenance and the publication contracts authenticate those bytes.

## Assessed language

- Prompts and response options use the section's assessed `deliveryLanguage` for every
  app locale.
- Answers and explanations use the app locale.
- Do not duplicate an assessed prompt or its response options merely because the app
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

## Locale terminology and routes

Create and review one glossary for each target locale before translating a
scope. Use it consistently for education levels, subjects, mathematics,
science, Quran, account, accessibility, and try-out terms. Route slugs use the
contract-owned normalization policy. Validate collisions and stable
cross-locale identity rather than adding spelling redirects.

Read `locale-sources.md` before choosing language-specific wording.
Official orthography sources settle spelling and punctuation. Naturalness and
AI-writing references provide review candidates only. The surrounding lesson,
subject community, and spoken teacher voice decide whether a sentence is
natural and clear.
