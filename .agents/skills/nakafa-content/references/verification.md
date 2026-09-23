# Verification

## Focused document preview

Compile and open one real document through the Aksara CLI and Nakafa renderer:

```sh
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Set `NAKAFA_APP_DIR` when the sibling Nakafa checkout is not at the configured
default. Use Nakafa's real renderer; do not create a second preview renderer.

## Checks by scope

Question-item ingestion checks parsed Markdown nodes and their original source
before renderer preprocessing. It rejects single-dollar and display math,
alternate LaTeX delimiters, raw HTML, and mathematics hidden in inline code.
Regression tests must cover broken math, valid inline math, escaped currency,
and protected code. They must also reject unescaped percentage signs inside
math while preserving escaped percentages and ordinary prose percentages.
Check the real rendered choices as well as prompt and answer MDX. Verify inline
math baselines in paragraphs and list items, including a formula at the end of
a line. Inspect display widths in every affected locale at a narrow viewport.
Source validity alone cannot prove baseline alignment or legibility.

Run the nearest behavior tests first. Tests consuming another workspace run
through Turbo, which owns dependency build order. The repository-owned lesson
voice suite has its own root command:

```sh
pnpm test:lesson-voice
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --strict-review
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/articles
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/articles --strict-review
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/question-bank --strict-review
```

Run that suite before the corpus gate when changing a voice rule. The
`aksara-source` condition resolves the tracked locale contract in a clean
checkout. `pnpm test` includes the suite and default corpus gate through Turbo;
checks must never depend on an ignored `packages/contracts/dist` left by an
older task.

Format changed files, then run the repository gates appropriate to the change:

```sh
pnpm format
pnpm names
pnpm lines
pnpm jsdocs
pnpm locales
pnpm boundaries
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify:consumer
```

Before a release candidate, also run:

```sh
pnpm deprecations
pnpm security:audit
pnpm check
```

`pnpm check` needs exact renderer credentials and validates the complete
current corpus. It must not consume Humanizer output or an editorial review
catalog. Source, provenance, renderer, locale, and publication failures remain
typed blockers. Run the security audit after every dependency or lockfile
change as required by `AGENTS.md`.

## Lesson voice gate

The gate checks source constraints and known language regressions. It does not
identify authorship or replace the full document review. The default command
fails only on objective constraints and proven regressions. Broader patterns
are reported as `review`; `--strict-review` makes those candidates fail during
an editorial audit. Inspect each match with its complete paragraph, subject
terminology, and locale siblings. Rerun after corrections and account for every
remaining match. Do not rewrite valid prose to obtain a zero count.

The corpus suites assert an empty issue list for all three authored scopes at every
tier, so a `review` candidate fails the repository suite exactly as a blocking
rule does. The CLI default mode is a debugging filter for a focused run, not a
release exception: narrow or repair the rule and the sentence before landing a
change that leaves any finding.

The gate owns three authored scopes: lessons in
`packages/corpus/material/lesson`, articles in `packages/corpus/articles`, and
assessed questions with worked answers in `packages/corpus/question-bank`.
All three suites assert zero findings. Keep each document's locale siblings
clean, and point the command at one directory with `--root` while editing.
Question prompts and worked answers use separate profiles and parity groups,
as defined in [checker limits and gate scope](checker.md#deterministic-gate-scope).
`packages/corpus/pages` remains out of scope: it holds the legal notice,
privacy policy, security policy, and developer resources, which are reviewed as
public legal and product copy under their own acceptance path.

Rule ownership and admission criteria live in
[checker limits](checker.md#evidence-and-checker-limits). Record a new
failure class there, search the complete lesson corpus for locale variants,
and add a failing case, a legitimate nearby case, and the nearest false-positive
boundary before widening a rule. Preserve the following verification boundaries:

- Parsed learner text follows the [source contract](source.md), including
  headings, hidden control characters, visible semicolons, and mathematical
  notation. Tests must retain semicolons used by code, MDX syntax, HTML entities,
  and LaTeX spacing while rejecting an entity or math separator that renders a
  visible semicolon.
- Math fixtures reject bare `ldots`, `cdots`, `vdots`, and `ddots` in rendered
  math and bare `QR`, `LU`, `SVD`, `PLU`, or `PCA` where upright inline math is
  required. Preserve valid prose, code, and programming-language comments.
- Address fixtures cover learner-facing metadata, direct and expression props,
  rendered fragments, Markdown link labels, and image alt text. Protect
  destinations, non-prose fields, code, math, assessed and immutable bytes, and
  real single-line or balanced multiline quotations. Metadata delimiters are
  syntax; an unmatched opening quote cannot protect the rest of the document.
- German address fixtures preserve anaphoric `Sie`, `Ihnen`, and `Ihr` with
  embedded links and soft wraps, while catching standalone and explicitly
  labeled direct address through local grammar. Never broaden the rule to all
  capitalized pronouns. Use the address boundaries in
  [checker limits](checker.md#evidence-and-checker-limits).
- Link fixtures enforce HTTPS Markdown structure and reject external images,
  JSX destinations, and dynamic escape hatches. Internal links and protected
  source examples remain valid. Source eligibility requires the
  [editorial link review](links.md), never a path or domain allowlist.
- `locale-representation-parity` is a structural blocker. It compares heading
  levels, list type and count, table shape, blockquotes, code blocks, display
  math, and custom flow components in teaching order. It ignores sentence shape
  and inline-math count so locale grammar can remain natural.
- The heading demonstrative form of an ambiguous reference is blocking through
  `heading-demonstrative-reference`, which matches only the demonstrative words;
  a heading that carries the `-nya` clitic stays a manual review item.
  `empty-section-body`, `heading-without-body`, `list-only-section`, and
  `component-only-section` are blocking section-body defects, while
  `thin-section-body` is a review candidate. The section-body
  bar is twenty-five prose words or one real representation, and list-item
  text counts as prose. Body-level demonstratives, possessives, Indonesian
  `-nya`, and English `it/that/they` stay a manual review item, because no rule
  separates a bare pronoun from a possessive determiner. The review tier reports
  three narrow shapes in that class, so a `--strict-review` run names them:
  `vague-demonstrative-conclusion`, `indonesian-unnamed-follow-up-reference`, and
  `indonesian-ambiguous-calculation-reference`.
- `indonesian-stiff-interpret-instruction` blocks generic instructions such as
  `tafsirkan solusi` and `Interpretasi Hasil`, while preserving technical uses
  such as Python `interpreter`. Terminology fixtures must also preserve valid
  English programming terms.
- A JavaScript `\b` never matches next to a non-ASCII letter, because `\w` stays
  ASCII-only even under the `u` flag. A German alternative that must begin at a
  word starting with `ä`, `ö`, `ü`, `Ä`, `Ö`, `Ü`, or `ß` therefore needs a
  negative lookbehind such as `(?<![\p{L}\p{N}_])` instead of `\b`, and its test
  must prove the alternative fires.
- A lowercase prose continuation after display math is a review candidate
  (`lowercase-fragment-after-math-block`). Read every locale sibling before
  deciding whether it fails the complete sentence rule. Visibility and speed
  candidates likewise need the named observer, quantity, input, or measured
  comparison described in [claims and references](claims.md).
- `unbalanced-emphasis` is a blocking source defect. MDX resolves an emphasis
  pair inside one paragraph only, so the gate blocks a `**` marker whose partner
  is missing or sits in another paragraph. Fixtures must keep a pair that wraps
  an inline component, inline code, and a fenced code block valid.
- Internal-link fixtures cover the three objective shapes: a label that names no
  destination concept, a paragraph or list item whose visible content is only
  links, and a heading whose whole label only announces navigation. They must
  keep the woven transformation links, a named single-word label such as `Mean`,
  an external or protocol-relative destination that carries a generic label, a
  reference-style destination with prose, and a link beside math, inline code,
  or an image valid. The numeric link ceiling stays editorial.
- `heading-order` fixtures reject skipped levels, incorrect opening levels, and
  lesson/article H4 or deeper even without a skipped level. Standalone
  question-bank answers retain valid H4 and H5, while H6 is rejected. Lesson
  fixtures also reject an explicit answer H2 immediately after its exercise H2,
  preserve the exercise H2 and solution H3, and retain conceptual solution
  headings and independent article structure.
- `duplicated-list-ordinal` fixtures cover `1. Pertama,`, `1. First,`,
  `1. Zuerst,`, and `3. **Zunächst:**`, and must keep `1. Pertama kali`,
  `1. First die 3, second die 4`, `1. First ionization energy`,
  `1. First term a`, `1. First element of the set is 2`, and
  `1. Erste Ableitung ist die Steigung.` valid. An ordinal followed directly by
  a verb stays outside the pattern because a zero-false-positive shape would
  need a per-language verb lexicon, and the corpus carries none.
- The German sequence frame fixture must reject `Gehe bei einer Sachaufgabe in
  dieser Reihenfolge vor:` and `Für diese Gleichung gehen wir in dieser
  Reihenfolge vor:`, while `A und B können in dieser Reihenfolge nur
  multipliziert werden.` stays valid because it names the required operand
  order, as the shipped matrix lesson does.
- Emphasis fixtures prove that Markdown strong emphasis and `<Highlight>`
  satisfy the same presence rule, including JSX passed through labels, while
  marker text in code does not count. `highlight-nesting` fixtures reject
  nested markers across both syntaxes while preserving sibling phrases.
- Question-bank fixtures preserve assessed wording, compare answer locale
  siblings independently of prompts, enforce the app-owned heading boundary,
  and retain authored address checks in worked answers. Numeric semicolons in
  decimal-comma math lists remain notation rather than prose punctuation.
- Blockquote bodies are scanned for the address rules and for an editorial
  prefix such as `Quick check:` or `Cek cepat:` (`blockquote-editorial-label`),
  because a blockquote may be a real quotation with protected bytes. A
  corpus-wide probe with the complete rule set over the current blockquotes
  reports zero findings, so the boundary is a documented scope limit, and the
  manual read in [the final language review](review.md#final-language-review)
  owns the remaining class.

Global language linters are not MDX parsers. Give them only the learner-visible
passage being reviewed and validate their findings in context.

## Acceptance review

1. Confirm exact ownership, app locale, assessed delivery language, and route
   identity without collisions. Preserve every assessed or immutable byte
   governed by source policy; authored content contains no U+2014.
2. Complete both Humanizer passes for authored translations and the
   [final language review](review.md#final-language-review) for each
   changed document. Read each locale alone, then compare all audited siblings.
   Retell the reasoning and answer the student questions about what changes,
   compared with what, why, and with which example.
3. Compare the base and changed teaching inventories from the
   [editorial workflow](editorial-workflow.md). Preserve every meaningful step,
   condition, unit, conclusion, and representation. Investigate each lost list,
   table, quotation, diagram, derivation, or component and record which teaching
   job replaced it in every locale. A compiling summary is insufficient.
4. Compare source and revised URL inventories under the
   [link policy](links.md). A removed, dead, or mismatched URL blocks
   release until its replacement or justified removal is recorded. For a
   removed visual resource, verify the owned replacement or the documented gap
   addressed by a new component.
5. Recompute localized numerical values independently. Preserve digits and
   value while applying the authored locale's decimal and grouping separators.
   Keep assessed text and programming literals in their required syntax.
   Investigate any broad loss of established English programming terms in an
   Indonesian revision.
6. Verify MDX math, props, geometry, accessibility, layout, and localized labels
   through [components and visuals](visuals.md). Compare representative rendered values
   with independent calculations, inspect every branch and boundary, and test
   supported interactions and 3D rotation. Render every affected locale without
   clipping, overlap, console errors, or network errors. Check response labels
   through Nakafa's canonical Markdown surface too.
7. For questions, complete the [assessment review](question-bank.md#assessment-review)
   and [worked-solution checks](worked-solutions.md). Keep language policy,
   answer keys, difficulty, and shared stimuli coherent across all placements.
8. Audit task-owned temporary inputs, preview processes, caches, and artifacts.
   Remove only resources proven obsolete and safe to remove; record anything
   retained for active review or recovery. Repository verification is not
   publication approval.

## Pedagogy inventory

```sh
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/material/lesson --pedagogy-review --format json
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/question-bank --pedagogy-review --format json
```

The optional `pedagogy` array lists heading locations, prose word counts,
component names, and review signals. It excludes assessed prompts and includes
authored worked answers. Signals do not change the deterministic exit status.
Review them using [structure](structure.md#review-each-teaching-section), with the
complete question and response key beside each answer. A missing signal is not
acceptance, and adding a component never clears the obligation to explain it.

`nested-relation-alignment` rejects an alignment relation inserted inside an
unfinished parenthesis, bracket, or group, as in `P(S &= 7)` instead of
`P(S=7) &= ...`. Preserve complete event arguments, radicals, and conditions.
Nested matrices and cases retain their own alignment. Recompute the displayed
steps after repairing their layout.

Exercise mapping regression fixtures cover missing question numbers, calculation
steps inside an answer, continuous and restarted prompt groups, prose labels,
numbered answers, mixed list continuations, and table row and column references
in ID, EN, and DE. The check is lesson-only and does not rewrite question-bank
answer structure.
