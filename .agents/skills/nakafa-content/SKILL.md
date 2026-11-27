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
   For Malaysian Malay, read the Malaysian Malay section of
   `references/locales.md` completely: no global Malay skill exists, so that
   section owns the register, the words that differ from Indonesian, the
   false friends, and the Malay humanizer pass.
5. If a required locale skill is missing, use the global skill installer for
   [bahasa-indonesia](https://www.skills.sh/ajipurn/bahasa-indonesia-skill/bahasa-indonesia)
   or [humanizer-de](https://github.com/marmbiz/humanizer-de). Do not copy global
   skills into Aksara or begin the affected locale edit before the skill is
   available.

Global prose linters receive only learner-visible sentences or paragraphs.
Raw MDX includes metadata syntax, JSX, code, and math that those tools cannot
classify. Review every candidate in the complete teaching context before editing.

## Source ownership

| Content                                | Aksara source                                                                                                                                                                                                                                                           |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Articles                               | `packages/corpus/articles/`                                                                                                                                                                                                                                             |
| Lessons                                | `packages/corpus/material/lesson/<domain>/<lesson>/`, registered by the typed `source.ts` in that folder, which default-exports a `LessonModule`, and by the typed `section.ts` in each section folder, which default-exports a `LessonSection`; no shared list to edit |
| Questions, answers, and response items | `packages/corpus/question-bank/`                                                                                                                                                                                                                                        |
| Programs and localized routes          | Owning registries under `packages/corpus/`                                                                                                                                                                                                                              |
| Pinned Quran bytes and policy          | `packages/corpus/quran/source/`                                                                                                                                                                                                                                         |

## Required references

Read only what the task needs. Each reference owns one concern.

| Work                                           | Read                                                    |
| ---------------------------------------------- | ------------------------------------------------------- |
| Any lesson addition or rewrite                 | [Lesson standard](references/lesson.md)                 |
| Any authored revision or translation           | [Editorial workflow](references/editorial.md)           |
| Voice, register, and the clarity test          | [Voice and scope](references/voice.md)                  |
| Terminology and technical vocabulary           | [Terminology](references/terminology.md)                |
| Claims, comparisons, and causal sentences      | [Claims and references](references/claims.md)           |
| Transitions and imperatives                    | [Teaching transitions](references/transitions.md)       |
| Headings, sections, and lists                  | [Structure](references/structure.md)                    |
| Facts, citations, and source accuracy          | [Accuracy and evidence](references/evidence.md)         |
| Checker scope and rule admission               | [Checker limits and gate scope](references/checker.md)  |
| The closing read-through                       | [Final language review](references/review.md)           |
| Locale wording and cross-locale review         | [Locale sources](references/locales.md)                 |
| Raw MDX, metadata, and readability             | [Source and readability](references/source.md)          |
| MDX headings                                   | [Headings](references/headings.md)                      |
| Learner-facing punctuation                     | [Learner facing punctuation](references/punctuation.md) |
| Emphasis markers                               | [Emphasis](references/emphasis.md)                      |
| Internal and external links                    | [Links](references/links.md)                            |
| Search titles, descriptions, and search intent | [Search and answer engines](references/search.md)       |
| Mathematics and code in MDX                    | [Mathematics and code](references/math.md)              |
| Graphs, diagrams, and components               | [Components and visuals](references/visuals.md)         |
| Representation research basis                  | [Evidence basis](references/research.md)                |
| Questions and response items                   | [Question bank](references/questions.md)                |
| Building try-out sets from any source material | [Try-out sets](references/sets.md)                      |
| How hard a try-out item must be, per section   | [Try-out difficulty](references/difficulty.md)          |
| Worked answer explanations                     | [Worked solutions](references/solutions.md)             |
| Verification commands and acceptance           | [Verification](references/verification.md)              |

## Content invariants

- **Priority #1 is pedagogical depth and genuine student understanding.** Never
  write shallow summaries or shortcut explanations. Speak like a warm,
  knowledgeable teacher guiding one learner one-on-one in `id`, `en`, `ms`, and
  `de`. Apply the Feynman clarity test even to advanced topics: build a vivid,
  concrete everyday picture first so even a five-year-old grasps the core idea,
  then bridge step by step into full rigorous symbols, formulas, applicability
  conditions, result verification, and distractor analysis without ever dumbing
  down the academic depth.
- **People-First SEO and AEO (Google Search Central).** Answer the core question
  within the first 100 words, cover the learner's natural follow-up questions
  (Query Fan-Out), keep full parity between mobile and desktop content, and
  never add clickbait, filler, or keyword stuffing.
- Keep `appLocale` separate from assessed `deliveryLanguage`. Localize authored
  shell and explanations; preserve assessed prompts and responses in their
  owned language. Never Humanizer-rewrite protected quotations, code,
  mathematical meaning, or pinned official source bytes.
- Reconcile every canonical source sibling before translating. Locale siblings
  carry the same reviewed facts and ordered teaching units: concepts, sections,
  examples, exercises, solutions, checks, lists, tables, diagrams, math, code,
  and components. Correct shared weaknesses in every affected sibling. Natural
  grammar and inline-math wrappers may differ; teaching support may not.
- Keep genre boundaries explicit. Lessons use teacher-led pedagogy. Articles
  (`packages/corpus/articles/`) are copywriter-authored, evidence-led prose and
  are excluded from pedagogical lesson rewrites: preserve claim-matched sources
  and author-written charts, tables, and other evidence. Assessed questions keep
  the source-owned real-exam language and difficulty. Worked try-out answers use
  complete post-attempt pedagogy with the mandatory four-heading structure
  without rewriting the assessed prompt.
- **Highlighter emphasis (`**...**` / `<Highlight>`).** Use emphasis like a
  student's highlighter for key concepts, deciding conditions, important rules,
  and turning points so pages feel alive and scannable rather than flat (avoid
  leaving a long page with only one or two highlights). Wrapping
  `<InlineMath />` inside a highlighted phrase is fully supported end-to-end
  (`mathInline.marks`). Do not force artificial highlights on concise one-line
  try-out sections such as `# Ditanyakan` or `# Jawaban`. The
  [emphasis contract](references/emphasis.md) owns the rules.
- **Required core blockquote (`>= 1`).** Every lesson and every worked try-out
  answer includes at least one blockquote (`> ...`) holding a core concept,
  intuition, or warning a learner must remember. State the point directly with
  zero prefix labels and zero colons (never `Ingat bahwa:`, `Konsep kunci:`,
  `Catatan:`, `Tips:`, `Cek cepat:`, `Key concept:`, `Note:`, `Remember:`,
  `Merke:`, `Hinweis:`, or `Nota:`).
- **Clean separation of `<InlineMath />` and `<BlockMath />`, and one unified layout engine across lessons, articles, and try-outs.** Keep
  `<InlineMath />` strictly for single variables, numbers, short symbols or
  notations, brief units, small coordinates, or short inline conditions such as
  `x \neq 0`. Equations, inequalities, complex fractions, multi-term
  expressions, and every algebraic transformation or calculation step belong in
  `<BlockMath />` so paragraphs stay breathable on phones and desktops
  ([mathematics and code](references/math.md)). Wrap consecutive `<BlockMath />`
  rows from one derivation in `<MathContainer>` across every document type
  (lessons, articles, questions, and answers). Keep prose and visual components
  outside `<MathContainer>` so a formula card and a visual card always remain
  clearly spaced apart instead of fusing together; use `<ContentStack>` or
  `<ContentGrid>` when grouping math with a visual. Both `test:lesson-voice`
  and `bun run explanations` enforce this contract identically.
- **Mandatory four-heading try-out answer structure and zero heading symbols.**
  Every try-out worked answer uses the four standard headings in exact order:
  single-question answers at `#` (`Diketahui`, `Ditanyakan`, `Penyelesaian`,
  `Jawaban` in `id`; `Given`, `Asked`, `Solution`, `Answer` in `en`; `Diberi`,
  `Ditanya`, `Penyelesaian`, `Jawapan` in `ms`; `Gegeben`, `Gesucht`, `Lösung`,
  `Antwort` in `de`) with optional `##` sub-steps only inside the solution;
  multi-part answers (`kind: "parts"`) open each part with `# Bagian a`
  (`# Part a`, `# Bahagian a`, `# Teil a`) with no colon and no extra title,
  place the four standard headings at `##` inside each part, and allow `###`
  sub-steps only inside `## Penyelesaian`. All headings across lessons and
  try-out answers carry zero colons (`:`) or punctuation symbols
  ([worked solutions](references/solutions.md), [headings](references/headings.md)).
- Keep facts and source attribution verified. Preserve claim-matched provenance
  when changing the page outline or removing a resource. A learner-visible
  external resource must satisfy the [link policy](references/links.md).
- Choose representations for their teaching job, then preserve that job in
  every locale. Humanization never authorizes deleting useful reasoning or
  flattening a diagram, table, derivation, or component to reduce line count.
- Use the current renderer contract. MDX math and React-node labels follow
  [mathematics and code](references/math.md); response labels remain one rich
  Markdown string under the
  [question-bank contract](references/questions.md#response-items). Worked
  answers retain the complete post-attempt reasoning described in
  [worked solutions](references/solutions.md).
- Every lesson meets the [lesson standard](references/lesson.md) and Rules 16 to
  20: the answer first, a warm teacher talking to one learner, one continuous
  crystal-clear story with plain-language intuition before symbols or jargon,
  zero phantom references, tight text-to-visual anchoring (lead-in question
  before each visual and concrete takeaway interpretation right after it), at
  least one core blockquote, at least three unique custom 3D scenes or
  animations owned by this lesson alone (zero cross-lesson reuse and zero
  within-lesson filler repetition, aiming for five, never fewer than before a
  revision), zero plain-text `footer` props on catalog visual cards (a
  `VisualCard` owns at most one structured key-value or tabular footer band),
  strict `<InlineMath />` / `<BlockMath />` for every mathematical, physical,
  or chemical symbol, formula, ion, exponent, and unit in prose and JSX labels
  (zero plain-text formulas anywhere), complete worked examples, mistakes and
  practice only where the topic needs them (never a template tail), a non-flat
  outline (`>= 4` H2 sections grouped with 2 to 4 H3 subsections and zero lone
  H3), globally unique headings per locale, clean comma-and-period
  `metadata.description` with no curriculum or chapter prefixes, zero em dashes
  (U+2014), and a mandatory four-locale (`en`, `id`, `ms`, `de`) clarity trace
  (D29).
- Every plotted coordinate is computed in the source from the formula it
  draws, and a smooth function renders smooth. Illustrations use only Nakafa's
  three.js foundation or p5, never SVG, HTML drawings, canvas code, or images.
  Never mix 3D + charts or p5 + charts inside `VisualCardBody` (keep supporting
  charts in `VisualCardFooter` via EvilCharts), keep mathematical
  `CoordinateSystem` visuals razor-sharp GeoGebra-3D with zero drop shadows
  (`shadows={false}`), and keep Chemistry, Physics, and Biology labs real-world
  photorealistic with zero cartoonish primitives or unlabeled bottles.
  [Components and visuals](references/visuals.md#computed-and-exact-visuals)
  owns these rules and the `points` gate that enforces them, and
  [verification](references/verification.md#points-gate) owns the gate's
  command and scope.
- Nothing is published before it passes the
  [release gate](references/verification.md#release-gate). A small error on an
  education platform is a defect, so every artifact is verified, never a sample.
- Keep every lesson self-contained. An internal link adds navigation, never a
  teaching step, so explain the concept and link only where the prose genuinely
  invokes the relation. The [link policy](references/links.md) owns
  the link rules.
- Run the deterministic gate on lessons (`packages/corpus/material/lesson`),
  articles (`packages/corpus/articles`), the question bank
  (`packages/corpus/question-bank`), and public pages
  (`packages/corpus/pages`). The question bank uses separate profiles for
  assessed prompts and authored solutions, and a page receives the address
  rules alone. All roots must reach zero
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
