---
name: nakafa-content
description: Author and review Nakafa educational content in Aksara. Use for articles, materials, questions, answers, choices, program metadata, Quran shell copy, routes, and translations.
---

# Nakafa Content in Aksara

Aksara is Nakafa's authored-content source. Use this skill for every content
addition, revision, review, or translation in this repository.

## First steps

- Read the repository `AGENTS.md` and the nearest source schema, registry, and
  tests for the scope being changed.
- Read the complete global Humanizer skill before revising authored prose or
  translating it. Humanizer review is mandatory for every authored translation.
- For Indonesian prose, also read the global `bahasa-indonesia` skill and its
  `references/core.md` and `references/naturalness.md` files. Use plain,
  Indonesia-first language for learners.
- For German prose, also read the complete global `humanizer-de` skill and its
  routed references. Use its deterministic linter as a source of review
  candidates, then judge every candidate in the full MDX and teaching context.
- If either locale skill is missing, use the global skill installer to install
  `https://www.skills.sh/ajipurn/bahasa-indonesia-skill/bahasa-indonesia` and
  `https://github.com/marmbiz/humanizer-de` in the user's Codex environment.
  Never copy either skill into this repository, and do not continue locale
  editing until the required skill is available.
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
- Localized authored prose must preserve the reconciled, reviewed meaning of
  every canonical source sibling. Never translate from an unreviewed or
  disputed source.
- Locale siblings are one teaching document expressed in different languages.
  Preserve the same sequence and count of concepts, sections, examples,
  exercises, worked solutions, checks, tables, diagrams, math, code, and custom
  MDX components. Do not condense, expand, reorder, or replace a teaching unit
  in only one locale.
- If any canonical source sibling is inaccurate, incomplete, artificial, or
  pedagogically weak, reconcile the shared teaching document first. Apply the
  correction to every affected existing sibling before translating the
  corrected document into every locale in the authorized scope.
- Use natural teacher voice for the target locale. A translation must read as a
  lesson written for that student, while preserving meaning and evidence.
- Prefer the shortest familiar word that keeps the subject meaning exact. Keep
  a necessary subject term, define it in one plain sentence on first use, and
  never replace an everyday word with a formal synonym merely to sound
  academic.
- State the teaching point directly. Do not use stock invitations such as
  `mari kita`, `let's`, `schauen wir uns`, or `sehen wir uns` as empty
  signposting. Start with the observation, instruction, or calculation.
- Do not use the rhetorical forms `X, bukan Y`, `X, not Y`, or `X, nicht Y`,
  including `not only`, `not just`, `bukan hanya`, `tidak hanya`,
  `bukan sekadar`, and `nicht nur`, in authored explanations. Rewrite the
  complete thought as direct positive teaching. Do not evade this rule by
  swapping in `rather than`, `instead of`, `dan bukan`, `daripada`, `und nicht`,
  `statt`, or `stattdessen`, or by moving the same clipped negation into a new
  sentence. Those substitutions only move the problem. Preserve negation when
  it is part of the fact, mathematical condition, assessed text, quotation, or
  correction a learner genuinely needs. Ordinary comparisons remain valid,
  such as `5 lebih besar daripada 3`; judge the sentence by its meaning.
- A clean keyword scan is only the start of review. Read every changed
  paragraph as a complete explanation and reject any rewrite that preserves the
  same artificial contrast, unexplained term, or stiff sentence structure under
  different words.
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
- Keep all locale siblings equivalent in facts, instructional sequence,
  examples, visual evidence, and learner support. Use
  natural language for each locale instead of forcing sentence-level symmetry.
- Render every learner-facing mathematical expression through Aksara's math
  components, including expressions inside component titles, descriptions, and
  other props that accept React nodes. Do not leave variables, formulas,
  coordinates, quantities, units, or axis symbols as plain text merely because
  they appear inside a prop.
- Treat graph and 3D labels as semantic React content by default. Plain prose is
  already valid content; compose prose and `<InlineMath />` in one fragment when
  a label includes notation. Never flatten mathematical meaning into a string or
  invent a separate plain-versus-rich authoring mode.
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
