---
name: nakafa-content
description: Author and review Nakafa educational content in Aksara. Use for articles, materials, questions, answers, response items, program metadata, Quran shell copy, routes, and translations.
---

# Nakafa content in Aksara

Aksara owns authored content and signed publication. Use this skill for every
content addition, revision, review, or translation in this repository.

## Before editing

1. Read the repository `AGENTS.md`, then the current schema, registry, tests,
   neighboring entries, and recent Git history for the target scope. Do not
   infer contracts from an old Nakafa copy.
2. Identify the exact paths, authorized locales, and source evidence. Classify
   each target as authored prose, assessed-language content, or immutable
   official or quoted source before changing bytes.
3. Read the applicable references below in full. They own the detailed rules,
   examples, and acceptance criteria; this entry point does not replace them.
4. Read the complete global Humanizer skill before revising or translating
   authored prose. Follow the source and target passes in the editorial
   workflow. For Indonesian, also read `bahasa-indonesia` and its
   `references/core.md` and `references/naturalness.md`. For German, read the
   canonical global `humanizer-de/SKILL.md` and the references it routes to. Its
   nested plugin entry point redirects to that same workflow, so do not run
   two independent German passes merely because both entries are installed.
5. If a required locale skill is missing, use the global skill installer for
   [bahasa-indonesia](https://www.skills.sh/ajipurn/bahasa-indonesia-skill/bahasa-indonesia)
   or [humanizer-de](https://github.com/marmbiz/humanizer-de). Do not copy global
   skills into Aksara or begin the affected locale edit before the skill is
   available.

Global prose linters receive only learner-visible sentences or paragraphs.
Raw MDX includes metadata syntax, JSX, code, and math that those tools cannot
classify. Review every candidate in the complete teaching context before editing.

## Source ownership

| Content | Aksara source |
| --- | --- |
| Articles | `packages/corpus/articles/` |
| Lessons | `packages/corpus/material/` |
| Questions, answers, and response items | `packages/corpus/question-bank/` |
| Programs and localized routes | Owning registries under `packages/corpus/` |
| Pinned Quran bytes and policy | `packages/corpus/quran/source/` |

## Required references

| Work | Read |
| --- | --- |
| Any authored revision or translation | [Editorial workflow](references/editorial-workflow.md) and [writing quality](references/writing-quality.md) |
| Locale wording and cross-locale review | [Locale sources](references/locale-sources.md) |
| Any MDX, including prompts and answers | [MDX quality](references/mdx-quality.md) |
| Questions and response items | [Question bank](references/question-bank.md) |
| Worked answer explanations | [Question bank](references/question-bank.md) and [worked solutions](references/worked-solutions.md) |
| Checker changes | [Evidence and checker limits](references/writing-quality.md#evidence-and-checker-limits) and [verification](references/verification.md) |
| Every completed content change | [Verification](references/verification.md) |

## Content invariants

- Keep `appLocale` separate from assessed `deliveryLanguage`. Localize authored
  shell and explanations; preserve assessed prompts and responses in their
  owned language. Never Humanizer-rewrite protected quotations, code,
  mathematical meaning, or pinned official source bytes.
- Reconcile every canonical source sibling before translating. Locale siblings
  carry the same reviewed facts and ordered teaching units: concepts, sections,
  examples, exercises, solutions, checks, lists, tables, diagrams, math, code,
  and components. Correct shared weaknesses in every affected sibling. Natural
  grammar and inline-math wrappers may differ; teaching support may not.
- Write a complete explanation a teacher could say to the intended learner.
  Name objects, actions, conditions, and results. Preserve technical meaning and
  necessary reasoning. Follow the locale's voice and terminology rules without
  imposing one lesson template or inventing anecdotes, settings, or metaphors.
- Keep facts and source attribution verified. Preserve claim-matched provenance
  when changing the page outline or removing a resource. A learner-visible
  external resource must satisfy the [MDX link policy](references/mdx-quality.md#links).
- Choose representations for their teaching job, then preserve that job in
  every locale. Humanization never authorizes deleting useful reasoning or
  flattening a diagram, table, derivation, or component to reduce line count.
- Use the current renderer contract. MDX math and React-node labels follow
  [MDX quality](references/mdx-quality.md#mathematics-and-code); response labels
  remain one rich Markdown string under the [question-bank contract](references/question-bank.md#response-items).
  Worked answers retain the complete post-attempt reasoning described in
  [worked solutions](references/worked-solutions.md).
- Treat checker output as evidence to investigate. Default blockers need proven
  regressions; strict-review candidates still need contextual judgment. Never
  invent a global word ban or optimize prose for an authorship score. Group
  checker scripts by concern; their filenames use one lowercase word and
  `.test.ts` for tests, without repeating the directory name.
- Compile the exact authored document through Aksara and preview it through
  Nakafa's real renderer before accepting the change. Preserve the repository's
  signed publication boundary and single corpus ownership.
