---
name: nakafa-content
description: Author and review Nakafa educational content in Aksara. Use for articles, materials, questions, answers, choices, program metadata, Quran shell copy, routes, and translations.
---

# Nakafa Content in Aksara

Aksara is the only authored-content source for activated Nakafa scopes. Use this
skill for every content addition, revision, or translation in this repository.

## First steps

- Read the repository `AGENTS.md` and the nearest source schema, registry, and
  tests for the scope being changed.
- Read the complete global Humanizer skill before revising authored prose or
  translating it. Humanizer review is mandatory for every authored translation.
- Inspect the exact neighboring corpus entries and recent Git history. Do not
  infer a file layout, locale rule, or metadata contract from an old Nakafa copy.
- Classify the target as authored prose, assessed-language content, or an
  immutable official or quoted source before editing bytes.
- Verify facts through primary evidence and preserve source attribution.

## Source ownership

- Articles live under `packages/corpus/articles/`.
- Lesson materials live under `packages/corpus/material/`.
- Questions, answers, and choices live under
  `packages/corpus/question-bank/`.
- Learning programs and localized route metadata live in the corresponding
  registries under `packages/corpus/`.
- Pinned Quran source bytes and policy live under
  `packages/corpus/quran/source/`. Never Humanizer-rewrite immutable source
  bytes.

## Reference map

| Work | Read |
| --- | --- |
| Any authored revision or translation | `references/editorial-workflow.md`, `references/writing-quality.md` |
| Lesson or article MDX | `references/mdx-quality.md` |
| Question or choices | `references/question-bank.md` |
| Worked answer explanation | `references/question-bank.md`, `references/worked-solutions.md`, `references/mdx-quality.md` |
| Preview and release checks | `references/verification.md` |

## Always enforce

- `appLocale` and `deliveryLanguage` are different concepts. Localize shell and
  explanations through `appLocale`. Preserve the language being assessed in
  prompts and choices through `deliveryLanguage`.
- German authored prose must preserve the reviewed meaning of its English and
  Indonesian siblings. Do not translate from an unreviewed meaning.
- Locale siblings are one teaching document expressed in different languages.
  Preserve the same sequence and count of concepts, sections, examples,
  exercises, worked solutions, checks, tables, diagrams, math, code, and custom
  MDX components. Do not condense, expand, reorder, or replace a teaching unit
  in only one locale.
- If the English or Indonesian source is inaccurate, incomplete, artificial,
  or pedagogically weak, repair the shared teaching document first. Apply the
  same correction to EN and ID. When German is part of the explicitly
  authorized authoring scope, translate that corrected document to DE before
  treating the locale set as complete.
- Use natural teacher voice for the target locale. A translation must read as a
  lesson written for that student, while preserving meaning and evidence.
- Do not translate assessed passages, assessed choices, quotations, code,
  mathematical notation, or immutable official source bytes.
- Lessons must work from a direct visit. Define required terms, abbreviations,
  symbols, and prerequisites on first use.
- Every section must teach a real idea. Avoid thin headings, copied lesson
  skeletons, generic summaries, and decorative visuals.
- Give every lesson and article a deliberate presentation plan. Use prose,
  lists, tables, quotations, diagrams, math, or a renderer-owned component
  according to the learning job each representation does. Break up a wall of
  text when another representation makes a comparison, sequence, hierarchy,
  relationship, or worked model materially easier to understand.
- Do not satisfy a component quota. A decorative table, quotation, diagram, or
  interaction adds cognitive load without adding instruction. Every visual
  must be explained in nearby prose and must remain understandable through its
  accessible text.
- Keep English, Indonesian, and German siblings equivalent in facts,
  instructional sequence, examples, visual evidence, and learner support. Use
  natural language for each locale instead of forcing sentence-level symmetry.
- Render every learner-facing mathematical expression through Aksara's math
  components, including expressions inside component titles, descriptions, and
  other props that accept React nodes. Do not leave variables, formulas,
  coordinates, quantities, units, or axis symbols as plain text merely because
  they appear inside a prop.
- Treat a lesson and a worked answer explanation as different teaching forms.
  A lesson develops a concept across a sequence. An answer must completely
  resolve one attempted problem for a learner who may not know which step
  failed.
- Do not optimize answer explanations for fewer lines. Preserve every
  meaningful subgoal, condition, substitution, case, transformation, unit, and
  check needed to reproduce the reasoning. Group connected calculations when
  that improves readability, but do not delete instructional steps.
- Do not use U+2014 in authored content, metadata, documentation, or code.
- Do not add compatibility routes, fallback content, manual MDX import maps,
  duplicate preview renderers, JSON renderers, or a second corpus.
- Compile through Aksara and preview through Nakafa's real renderer before
  considering the authored revision complete.
