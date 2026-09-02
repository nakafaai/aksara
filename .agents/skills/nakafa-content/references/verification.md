# Verification

## Focused document preview

Compile and open one real document through the Aksara CLI and Nakafa renderer:

```sh
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Set `NAKAFA_APP_DIR` when the sibling Nakafa checkout is not at the configured
default. The preview must use the real Nakafa renderer. Do not create a second
preview renderer for content review.

## Required checks

Run focused scope tests first, then the repository gates appropriate to the
change:

```sh
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/lesson-voice.ts
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/lesson-voice.ts --strict-review
node --conditions=aksara-source --test '.agents/skills/nakafa-content/scripts/**/*.test.ts'
pnpm format
pnpm locales
pnpm boundaries
pnpm typecheck
pnpm test
pnpm build
pnpm verify:consumer
```

The lesson voice test is a deterministic regression gate for known wording,
ambiguity, and standard-language failures, including forbidden symbols in page
titles and lesson headings. It also reports bare `QR`, `LU`, `SVD`, `PLU`, and
`PCA` labels in learner prose when they should use upright inline math. The
strict review also reports a lowercase prose fragment immediately after a
displayed math block because the renderer presents it as a separate paragraph.
This flow check remains a review item and requires all three locale siblings to
be read before editing. The direct Node commands use the `aksara-source` export
condition so they resolve the tracked locale contract in a clean checkout.
`pnpm test` runs the Node checker suite and the default corpus gate through the
root Turbo graph. It must not depend on an ignored `packages/contracts/dist`
build from an earlier task. The default gate also blocks visible semicolons in
learner prose and component labels. Its MDX parser excludes source syntax,
code, HTML entities, and LaTeX spacing such as `\;`. The gate also blocks hidden
C0 control characters other than line feed and tab, plus DEL, because those
bytes can silently corrupt prose or LaTeX. The default command exits with an
error only for objective constraints and proven regressions. Broader style
patterns are labeled `review` and do not block the default command.
`--strict-review` makes every reported item fail so an editor can complete a
bounded corpus audit. It never proves authorship or replaces contextual
editorial review. Inspect every reported line with its paragraph and locale
siblings, fix the shared teaching document, then rerun strict review until every
remaining match has been judged. Do not rewrite a valid sentence merely to
obtain a zero count.

The global prose linters are not MDX parsers. Pass them only the
learner-visible sentence or paragraph being reviewed. Running them over a raw
MDX file can misread metadata quotes, JSX delimiters, code, math, and technical
identifiers as prose. Those diagnostics are false positives unless the same
problem remains in the rendered learner text.

The link guard inspects only real `http` and `https` Markdown links in the MDX
tree. It rejects proven placeholder, claim, generic-description, and topic-label
patterns while excluding internal links and code examples. It deliberately has
no character-count gate and no hostname-to-label map. After the automated gate
passes, inspect every external link in context and confirm that the explanation
is ordinary prose while the chip label identifies the source or publication.

The gate distinguishes abstract and concrete visibility. It may reject
`hubungannya menjadi terlihat` or bare `tanpa terlihat`, while accepting a
named line that is visible on a graph or a physical change that cannot be seen
from a stated surface. It also rejects unmeasured claims such as `cara
tercepat`, but accepts a comparison that states the input and measured runtime.

Before adding or widening a lesson voice rule, record the concrete failure
class in `writing-quality.md`, search the complete lesson corpus for variants,
and add both a failing example and a legitimate nearby example to the test
suite. Run the test before the corpus gate. A rule that catches valid technical
prose, assessed text, code, math, quotations, or a comparison with a named
quantity is too broad and must be narrowed. Never tune the corpus merely to
obtain a zero count.

For Indonesian programming lessons, compare terminology before and after the
edit. Investigate any broad loss of canonical English terms such as `standard
library`, `namespace`, `built-in`, `mutable`, `immutable`, `indexing`,
`slicing`, `method`, or `loop`. Keep the English term when it is the clearest
bridge to code and documentation. The checker must include a negative test that
proves these terms are not rejected merely because they are English.

Before a release candidate, also run:

```sh
pnpm lint
pnpm deprecations
pnpm security:audit
pnpm check
```

`pnpm check` requires exact renderer credentials and validates the complete
current corpus. It must not read Humanizer output or an editorial review
catalog. Source, provenance, renderer, locale, and publication failures remain
typed blockers, never fallback conditions.

## Final review

- Confirm app locale and delivery language are intentionally different only for
  assessed-language policy.
- Inspect learner-facing component props as well as prose. Any mathematical
  token in a React-node-capable title, description, caption, or label must use
  `<InlineMath />`; reject plain strings such as `y-axis`, `x = 2`, `(3, 4)`,
  or `5 m` when they carry mathematical meaning.
- Confirm named factorizations and algorithms such as `QR`, `LU`, `SVD`, `PLU`, and `PCA`
  use upright `<InlineMath />` in learner prose. Keep them as plain letters in
  page titles, headings, code, and code comments, then render the notation in
  the first body sentence. Include a negative regression fixture proving that
  the checker ignores programming-language comments.
- Confirm LaTeX commands inside `math` props keep their leading backslash.
  Regression fixtures must reject bare `ldots`, `cdots`, `vdots`, and `ddots`
  inside rendered math while accepting the same words in prose and code.
- Compare every locale sibling for the same formulas,
  conditions, units, significant steps, and conclusions. Natural phrasing may
  differ, but mathematical meaning and instructional support may not.
- Verify every localized number against its source meaning and calculation.
  Confirm that the digit sequence and numerical value are unchanged while the
  decimal and thousands separators follow the target locale. Treat assessed
  source text and programming literals according to their owned language and
  syntax rather than rewriting them mechanically.
- Confirm the document compiles and renders without console or network errors.
- For every graph, diagram, simulation, or three-dimensional component, compare
  representative rendered points and relationships with an independent
  calculation. Inspect all branches, boundaries, signs, axes, labels, legends,
  camera framing, clipping, and supported interactions in Nakafa's real
  renderer. Repeat the visual check for every locale with localized labels.
- Confirm localized route identity has no collision.
- Confirm every new authored translation completed both Humanizer passes.
- Compare each translated document with every audited source sibling. The
  ordered concepts, sections, examples, exercises, worked solutions, checks,
  tables, diagrams, math, code, and custom MDX components must match exactly.
  A shorter file, a compiling file, or a semantically similar summary is not
  sufficient evidence of locale parity.
- Treat `locale-representation-parity` as a structural release blocker. It
  compares heading levels, list type and item count, table shape, blockquotes,
  code blocks, display math, and custom flow components in teaching order. It
  intentionally ignores sentence shape and inline-math count so every locale
  can use natural grammar.
- Treat `indonesian-stiff-interpret-instruction` as a wording release blocker.
  It catches generic learner instructions such as `tafsirkan solusi` and labels
  such as `Interpretasi Hasil`, while leaving technical uses such as Python
  `interpreter` alone.
- Compare the changed corpus with its base representation inventory. Investigate
  every lost list, table, blockquote, Mermaid diagram, math block, graph, or
  custom component and record which teaching job replaced it. An unexplained
  loss is a release blocker.
- Confirm no U+2014 character exists outside a pinned immutable allowlist.
- Confirm every lesson heading passes the deterministic symbol rule and still
  reads naturally in its locale. The rule must allow a hyphen required by
  standard word formation, such as Indonesian reduplication, without allowing
  decorative separators or damaged spellings.
- Confirm no learner-facing lesson contains a citation-only source or reference
  heading. Check all three locale siblings and keep evidence URLs in the source,
  readiness, or publisher contract.
- Confirm no visible semicolon remains in paragraphs, lists, tables, metadata
  descriptions, or learner-facing component props. Inspect the parsed MDX
  result rather than rejecting semicolons required by code, syntax, HTML
  entities, or LaTeX spacing.
- Confirm every causal or comparative claim names the relevant quantity,
  condition, mechanism, and consequence. Reject bare claims such as `dapat
  tinggi`, unexplained operational calques, and summary nouns with more than one
  possible antecedent.
- Review Indonesian words ending in `-nya` in their full paragraph. Ask what
  exact noun or operation the suffix refers to. Replace the suffix when more
  than one answer is possible, but do not treat the suffix itself as an error.
- Confirm every claim that a method is easier, safer, clearer, or neater names
  the exact operation changed or error prevented. Reject stock `key`, gateway,
  and foundation transitions that carry no teaching content.
- Read revised paragraphs aloud and answer the student questions `apa yang
  berubah`, `dibandingkan dengan apa`, `kenapa`, and `contohnya apa` whenever
  they apply. A paragraph that requires an explanation of its own wording is
  not ready.
- Search for `latihan fiktif`, `skenario fiktif`, `model fiktif`, `fictional
  exercise`, `fictional model`, `fiktive Aufgabe`, and `fiktives Modell`. Remove the
  label when it does not change the mathematical or scientific meaning. Keep a
  concrete safety boundary when the example could otherwise be mistaken for
  real medical, policy, or scientific guidance.
- Retell each revised lesson as a teacher would explain it. Every paragraph
  should begin from a named fact, question, representation, example, or prior
  result and prepare the learner for the next step. Do not require a fixed
  storytelling template, and do not accept empty signposting as narrative flow.
- Confirm no temporary input, preview process, cache, or task-owned artifact is
  left behind.
