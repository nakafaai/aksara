# Verification

## Focused document preview

Compile and open one real document through the Aksara CLI and Nakafa renderer:

```sh
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Set `NAKAFA_APP_DIR` when the sibling Nakafa checkout is not at the configured
default. Use Nakafa's real renderer; do not create a second preview renderer.

## Checks by scope

Run the nearest behavior tests first. Tests consuming another workspace run
through Turbo, which owns dependency build order. The repository-owned lesson
voice suite has its own root command:

```sh
pnpm test:lesson-voice
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --strict-review
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

Rule ownership and admission criteria live in
[writing quality](writing-quality.md#evidence-and-checker-limits). Record a new
failure class there, search the complete lesson corpus for locale variants,
and add a failing case, a legitimate nearby case, and the nearest false-positive
boundary before widening a rule. Preserve the following verification boundaries:

- Parsed learner text follows [MDX constraints](mdx-quality.md), including
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
  capitalized pronouns. Use the authored-voice boundaries in writing quality.
- Link fixtures enforce HTTPS Markdown structure and reject external images,
  JSX destinations, and dynamic escape hatches. Internal links and protected
  source examples remain valid. Source eligibility requires the
  [editorial link review](mdx-quality.md#links), never a path or domain allowlist.
- `locale-representation-parity` is a structural blocker. It compares heading
  levels, list type and count, table shape, blockquotes, code blocks, display
  math, and custom flow components in teaching order. It ignores sentence shape
  and inline-math count so locale grammar can remain natural.
- `indonesian-stiff-interpret-instruction` blocks generic instructions such as
  `tafsirkan solusi` and `Interpretasi Hasil`, while preserving technical uses
  such as Python `interpreter`. Terminology fixtures must also preserve valid
  English programming terms.
- A lowercase prose continuation after display math remains a review item.
  Read every locale sibling before deciding whether it fails the complete
  sentence rule. Visibility and speed candidates likewise need the named
  observer, quantity, input, or measured comparison described in writing quality.

Global language linters are not MDX parsers. Give them only the learner-visible
passage being reviewed and validate their findings in context.

## Acceptance review

1. Confirm exact ownership, app locale, assessed delivery language, and route
   identity without collisions. Preserve every assessed or immutable byte
   governed by source policy; authored content contains no U+2014.
2. Complete both Humanizer passes for authored translations and the
   [final language review](writing-quality.md#final-language-review) for each
   changed document. Read each locale alone, then compare all audited siblings.
   Retell the reasoning and answer the student questions about what changes,
   compared with what, why, and with which example.
3. Compare the base and changed teaching inventories from the
   [editorial workflow](editorial-workflow.md). Preserve every meaningful step,
   condition, unit, conclusion, and representation. Investigate each lost list,
   table, quotation, diagram, derivation, or component and record which teaching
   job replaced it in every locale. A compiling summary is insufficient.
4. Compare source and revised URL inventories under the
   [link policy](mdx-quality.md#links). A removed, dead, or mismatched URL blocks
   release until its replacement or justified removal is recorded. For a
   removed visual resource, verify the owned replacement or the documented gap
   addressed by a new component.
5. Recompute localized numerical values independently. Preserve digits and
   value while applying the authored locale's decimal and grouping separators.
   Keep assessed text and programming literals in their required syntax.
   Investigate any broad loss of established English programming terms in an
   Indonesian revision.
6. Verify MDX math, props, geometry, accessibility, layout, and localized labels
   through [MDX quality](mdx-quality.md). Compare representative rendered values
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
