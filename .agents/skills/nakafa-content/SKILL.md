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
   `references/core.md`; read `references/naturalness.md` only when a regional
   voice or speech level is in scope. For German, read the
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

Read only what the task needs. Each reference owns one concern.

| Work | Read |
| --- | --- |
| Any authored revision or translation | [Editorial workflow](references/editorial-workflow.md) |
| Voice, register, and the clarity test | [Voice and scope](references/voice.md) |
| Terminology and technical vocabulary | [Terminology](references/terminology.md) |
| Claims, comparisons, and causal sentences | [Claims and references](references/claims.md) |
| Transitions and imperatives | [Teaching transitions](references/transitions.md) |
| Headings, sections, and lists | [Structure](references/structure.md) |
| Facts, citations, and source accuracy | [Accuracy and evidence](references/evidence.md) |
| Checker scope and rule admission | [Checker limits and gate scope](references/checker.md) |
| The closing read-through | [Final language review](references/review.md) |
| Locale wording and cross-locale review | [Locale sources](references/locale-sources.md) |
| Raw MDX, metadata, and readability | [Source and readability](references/source.md) |
| MDX headings | [Headings](references/headings.md) |
| Learner-facing punctuation | [Learner facing punctuation](references/punctuation.md) |
| Emphasis markers | [Emphasis](references/emphasis.md) |
| Internal and external links | [Links](references/links.md) |
| Mathematics and code in MDX | [Mathematics and code](references/math.md) |
| Graphs, diagrams, and components | [Components and visuals](references/visuals.md) |
| Representation research basis | [Evidence basis](references/evidence-basis.md) |
| Questions and response items | [Question bank](references/question-bank.md) |
| Worked answer explanations | [Worked solutions](references/worked-solutions.md) |
| Verification commands and acceptance | [Verification](references/verification.md) |

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
- Keep genre boundaries explicit. Lessons use teacher-led pedagogy. Articles
  use a professional scientific-journal register for professional readers,
  preserve claim-matched sources and author-written charts, tables, and other
  evidence, and never receive lesson choreography. Assessed questions keep the
  source-owned real-exam language and difficulty. Worked answers use complete
  post-attempt pedagogy without rewriting the assessed prompt.
- Keep facts and source attribution verified. Preserve claim-matched provenance
  when changing the page outline or removing a resource. A learner-visible
  external resource must satisfy the [link policy](references/links.md).
- Choose representations for their teaching job, then preserve that job in
  every locale. Humanization never authorizes deleting useful reasoning or
  flattening a diagram, table, derivation, or component to reduce line count.
- Use the current renderer contract. MDX math and React-node labels follow
  [mathematics and code](references/math.md); response labels remain one rich
  Markdown string under the
  [question-bank contract](references/question-bank.md#response-items). Worked
  answers retain the complete post-attempt reasoning described in
  [worked solutions](references/worked-solutions.md).
- Mark an emphasised phrase, and no more of it than the phrase. `**` and
  `<Highlight>` render the same treatment, so the [emphasis
  contract](references/emphasis.md) owns where they belong and how dense they
  may be.
- Keep every lesson self-contained. An internal link adds navigation, never a
  teaching step, so explain the concept and link only where the prose genuinely
  invokes the relation. The [link policy](references/links.md) owns
  the link rules.
- Run the deterministic gate on lessons (`packages/corpus/material/lesson`),
  articles (`packages/corpus/articles`), and the question bank
  (`packages/corpus/question-bank`). The question bank uses separate profiles
  for assessed prompts and authored solutions. All roots must reach zero
  findings at every tier. The commands live in
  [verification](references/verification.md#lesson-voice-gate). Scope and rule
  admission live in
  [checker limits and gate scope](references/checker.md#deterministic-gate-scope).
- For a corpus or family audit, run the optional `--pedagogy-review` inventory
  and read every complete document in every owned locale. Review each section,
  including sections without signals, for an explained mechanism, a worked
  example where needed, selective emphasis, and a representation that serves
  the concept. A passing gate, a component count, or a sample of documents is
  not evidence of complete editorial review. Keep per-document audit evidence
  outside the publication source; distinguish source review, calculation
  verification, compilation, and rendered acceptance.
- Treat checker output as evidence to investigate. Default blockers need proven
  regressions; strict-review candidates still need contextual judgment. Never
  invent a global word ban or optimize prose for an authorship score. Group
  checker scripts by concern; their filenames use one lowercase word and
  `.test.ts` for tests, without repeating the directory name.
- Compile the exact authored document through Aksara and preview it through
  Nakafa's real renderer before accepting the change. Preserve the repository's
  signed publication boundary and single corpus ownership.
