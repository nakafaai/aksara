# Verification

## Focused document preview

Compile and open one real document through the Aksara CLI and Nakafa renderer:

```sh
bun run dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
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
bun run test:lesson-voice
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --strict-review
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/articles
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/articles --strict-review
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/question-bank --strict-review
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/voice/check.ts --root packages/corpus/pages --strict-review
```

Run that suite before the corpus gate when changing a voice rule. The
`aksara-source` condition resolves the tracked locale contract in a clean
checkout. `bun run test` includes the suite and default corpus gate through Turbo;
checks must never depend on an ignored `packages/contracts/dist` left by an
older task.

Format changed files, then run the repository gates appropriate to the change:

```sh
bun run format
bun run names
bun run lines
bun run jsdocs
bun run locales
bun run points
bun run headings
bun run explanations
bun run boundaries
bun run lint
bun run typecheck
bun run test
bun run build
bun run verify:consumer
```

Before a release candidate, also run:

```sh
bun run deprecations
bun run security:audit
bun run check
```

`bun run check` needs exact renderer credentials and validates the complete
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

The gate owns four authored scopes: lessons in
`packages/corpus/material/lesson`, articles in `packages/corpus/articles`,
assessed questions with worked answers in `packages/corpus/question-bank`, and
public pages in `packages/corpus/pages`. All four suites assert zero findings. Keep each document's locale siblings
clean, and point the command at one directory with `--root` while editing.
Question prompts and worked answers use separate profiles and parity groups,
as defined in [checker limits and gate scope](checker.md#deterministic-gate-scope).
A page holds the legal notice, the terms, the privacy and security policies, or
the developer resources, so the gate applies only the address rules to it:
Nakafa never addresses a reader formally, not even in a contract. Everything
else on a page is public legal and product copy that its own acceptance path
reviews.

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
  `empty-section-body`, `heading-without-body`, `list-only-section`,
  `component-only-section`, and `thin-section-body` are blocking section-body
  defects; `thin-section-body` became blocking on 15 November 2026, when no
  lesson section stayed under the bar. The lesson outline rules
  `lone-subsection`, `flat-outline`, `crowded-outline`, and `heading-anchor`
  block too, and [structure](structure.md#lesson-shape) owns their shape. The
  outline rules the corpus does not meet yet run in the
  [outline gate](#outline-gate) on changed pages. The section-body
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
- `heading-symbol` fixtures keep the Indonesian reduplication hyphen and the
  German or English compound that joins one letter to a word, such as
  `y-Achse` or `x-axis`, in page titles and headings. They reject a hyphen
  after a longer word, a single letter on both sides such as `x-y`, a dangling
  hyphen, a digit, and the one-letter compound in Indonesian, whose axis names
  put the letter after the noun, as in `sumbu y`.
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

## Points gate

The gate keeps every plotted value computed from its formula and stops a
revision from ending with fewer interactive visuals than it started with. It
parses each MDX file with the checker's own MDX tooling and reads the ESTree of
every JSX attribute and every expression of the page, never raw text. The
three findings, the thresholds, and the one scoped skip live in
[computed and exact visuals](visuals.md#computed-and-exact-visuals).

It also holds every lesson folder that the change touched (or every lesson
under `--all`) to the [scene bar](visuals.md#interactive-visual-in-every-lesson),
global custom visual uniqueness (Rule 18), and banned plain-text card footers:

- `[custom-scenes]`: counts distinct custom scenes across all sections of the
  lesson, in the locale with the fewest. Fewer than three blocks; three or four
  prints `[review: custom-scenes]` asking for five. A custom scene is every
  Visual Catalog figure (`FIGURE_NAMES` in `@nakafa/aksara-contracts`) except
  the standard visuals in `STANDARD_VISUALS` of `points/scene.ts`.
- `[duplicate-scene-across-lessons]`: blocks any changed or new lesson that
  reuses a custom visual component already owned by another lesson folder.
- `[repeated-scene-in-lesson]`: blocks any changed or new lesson that renders
  the same custom visual component more than once in the same locale as filler.
- `[banned-visual-footer]`: blocks any changed or new lesson or article whose
  visual card (`FIGURE_NAMES`) passes a plain-text `footer` prop. A `VisualCard`
  holds at most one structured key-value footer band owned by the component.

A lesson or file the change never touched keeps its state until a revision
touches it; `--all` audits every lesson and visual across the whole corpus. A
change that only corrects figures (rule D26) does not revise a lesson either:
when every touched file of a lesson is modified in place and reads the same
once each `MathVisual`'s `scene` attribute is left out, and the lesson keeps
every custom scene, the bar does not hold it. Any change to text, a title, a
description, a footer, a label, a section, or the outline holds the lesson to
every rule.

```sh
bun run points
bun run points -- --all
bun run points -- --base <ref>
node --conditions=aksara-source .agents/skills/nakafa-content/scripts/points/check.ts packages/corpus/material/lesson/mathematics/<topic> --base origin/main
```

`--base` names the revision the change started from. The gate compares each
changed file with its version at the merge base of that revision and `HEAD`, so
visuals that landed on `main` after the branch point never read as visuals this
change removed. A file that gains visuals passes, and a file at a new path has
nothing to compare with, except that Git pairs a renamed lesson with the file
it came from when the two are at least half alike, so a slug change that keeps
the lesson recognizable never hides a lost visual. A revision that removes one
fails even when the lesson is otherwise better, so replace a visual with an
equal or better one instead of deleting it. Exit code `1` means findings, and
exit code `2` means a typed failure such as an unknown base. The content release
checks out the full history, and a local checkout needs the same history, so the
merge base is always available. The release repeats the gate on the exact `main`
revision it publishes, where the merge base is the revision itself, so it
enforces the literal rules over both corpus roots.

No Aksara module lists the renderer component names: the contracts package
defines only the manifest schema, and the live renderer supplies the names when
a document compiles. The visual count therefore excludes the closed set of
names that only lay out, typeset, emphasize, or embed content, plus every
lowercase HTML element, and counts every other name. A newly deployed visual
counts without a change to the gate. A new text, layout, or media component
joins `NON_VISUAL_COMPONENTS` in `points/visual.ts` with its test.

## Outline gate

`bun run headings` holds every lesson and article page that a change touched
to the outline, heading, and repetition rules, and compares it with every page
of its locale in the corpus, so a collision with an untouched lesson still
fails.
It reads the change from the merge base of `origin/main` and `HEAD`, as the
points gate does, including untracked files. A page whose change only corrects
its figures (rule D26, the same `correctsFiguresOnly` reading as the scene bar)
keeps its findings until a revision touches it: it reads the same once each
`MathVisual`'s `scene` attribute is left out. Any change to a heading, a
sentence, a section, or a figure's words holds the page to every rule.

```sh
bun run headings
bun run headings --strict-review
bun run headings --base <ref>
bun run headings --all
```

| Rule                               | Tier                                    | What it holds                                                                                                                     |
| ---------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `outline-budget`                   | block above 12 entries, review above 10 | H2 and H3 entries of a lesson page                                                                                                |
| `section-count`                    | block above 8 H2, review below 4        | H2 sections of a lesson page                                                                                                      |
| `lone-subsection`                  | block                                   | any H2 with exactly 1 H3 (no exemption for solution headings in any locale)                                                       |
| `section-fanout`                   | block above 4 H3, review at 4           | H3 subsections under one H2                                                                                                       |
| `flat-sections`                    | block                                   | 4 or more H2 with no teaching H3                                                                                                  |
| `metadata-description-punctuation` | block                                   | `metadata.description` allows only commas and periods (no `:`, `;`, `()`, `[]`, `!`, `?`, `/`, quotes, dashes)                    |
| `metadata-description-prefix`      | block                                   | `metadata.description` carries no curriculum or chapter prefix (`Form X`, `Tingkatan X`, `Bab X`, `Chapter X`, `Nota`, `Kelas X`) |
| `visual-missing-intro`             | block                                   | visual dropped directly under a heading with zero lead-in prose                                                                   |
| `visual-missing-takeaway`          | block                                   | visual followed directly by the next heading or end of file with zero takeaway prose                                              |
| `back-to-back-visuals`             | block                                   | two visuals placed back-to-back with zero bridging prose                                                                          |
| `formula-without-intro`            | block                                   | displayed formula dumped directly under a heading with zero plain-language intuition before it                                    |
| `dangling-colon`                   | block                                   | prose paragraph ending in `:` followed by another plain paragraph                                                                 |
| `unit-scaling-hack`                | block                                   | axis-scaling workaround text in prose or visual text across all four locales                                                      |
| `stiff-formal-prose`               | block                                   | stiff textbook connectors (`tersebut`, `merupakan`, `yakni`, `adapun`, etc.) across all four locales                              |
| `wall-of-text`                     | block above 85 words, review above 60   | dense single prose paragraph (lessons via `bun run headings` and try-out answers via `bun run explanations`)                      |
| `missing-blockquote`               | block                                   | lesson or try-out worked answer with zero authored blockquotes (`> ...`)                                                          |
| `bloated-inline-math`              | block                                   | equations, derivations, complex fractions, or long expressions inside `<InlineMath />` in prose                                   |
| `answer-heading-structure`         | block                                   | changed try-out answers via `bun run explanations`: exact four standard headings in order (`#` single, `##` under `# Bagian a`)   |
| `answer-heading-depth`             | block                                   | changed try-out answers via `bun run explanations`: sub-steps only inside `# Penyelesaian` / `## Penyelesaian`                    |
| `heading-title`                    | block when equal, review when contained | a heading that repeats the page title                                                                                             |
| `generic-heading`                  | block                                   | a scaffold label alone, or a section about the visual                                                                             |
| `title-unique`                     | block                                   | the page title, per locale                                                                                                        |
| `heading-unique`                   | block                                   | every heading, per locale, across lessons and articles, except an article's standard scientific section names                     |
| `heading-names-lesson`             | block                                   | a heading that is another page's title                                                                                            |
| `shared-skeleton`                  | block                                   | the scaffold sections a lesson page ends with, shared with another page                                                           |
| `repeated-sentence`                | block                                   | a sentence of 6 or more words, formulas aside, that another lesson page of the locale also has                                    |
| `repeated-paragraph`               | block                                   | a paragraph of 20 or more words sharing half its five-word runs with another lesson page's                                        |
| `heading-width`                    | review                                  | about 30 characters for an H2, 24 for an H3                                                                                       |
| `section-span`                     | review                                  | a leaf section above 300 words of text alone                                                                                      |
| `lesson-length`                    | review                                  | a page above 1,400 visible words                                                                                                  |
| `heading-density`                  | review                                  | more than 15 headings per 1,000 visible words                                                                                     |
| `heading-only-change`              | review                                  | a change that only renames the headings of a page that failed the rules                                                           |

A page that no change touched keeps its findings until a change touches it,
so the corpus rises to the rules one revision at a time; `--all` reports
every page and measures how far the corpus is from the rules. Exit code `1`
means a blocking finding, or any finding under `--strict-review`, which every
lesson revision runs before review. Once `--all` reports no blocking finding,
the gate runs `bun run headings --all` on every change, so the rules hold the
whole corpus (decision D1). The rule code lives in
`scripts/heading/` of this skill, so each rule moves into the voice gate once
the corpus meets it.

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
   [editorial workflow](editorial.md). Preserve every meaningful step,
   condition, unit, conclusion, and representation. Investigate each lost list,
   table, quotation, diagram, derivation, or component and record which teaching
   job replaced it in every locale. A compiling summary is insufficient. The
   [points gate](#points-gate) counts the interactive visuals mechanically, and
   the count never falls.
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
7. For questions, complete the [assessment review](questions.md#assessment-review)
   and [worked-solution checks](solutions.md). Keep language policy,
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
numbered answers, prose-numbered prompts, mixed list continuations, and table row
and column references in ID, EN, and DE. Fixtures include Answer, Jawaban, and
Antwort labels, literal and expression-wrapped JSX headings, and mixed
Markdown/JSX section boundaries. Heading labels come from visible parsed children, never
component attributes. The check is lesson-only and does not rewrite question-bank
answer structure.

## Release gate

Nakafa is an education platform, so a small error is a defect that blocks
publication. Every new or rewritten lesson, item, answer, and visual passes
this gate in full before it is published. The gate applies to every artifact,
never to a sample, and the author of an artifact never serves as its verifier.

- **Items:** two verifiers solve the item independently without seeing the
  key. A computer algebra system or exact arithmetic recomputes every value.
  Each option and statement is judged, a single-choice item has exactly one
  defensible answer, data in visuals matches the prompt, the assessed language
  is correct, and the item repeats nothing in the bank.
- **Answers:** every step is recomputed, the conclusion matches the key, the
  distractor analysis is correct, and every locale carries the same steps and
  mathematics.
- **Lessons:** every factual claim has primary or official evidence, every
  formula, example, and exercise is recomputed, a verifier reads the complete
  lesson in every locale, and the gate reports zero findings.
- **Visuals:** data modules are unit tested at full coverage, drawn values are
  compared with the governing formula, scientific constants cite their source,
  the [points gate](#points-gate) reports zero findings, and the rendered
  component is checked at phone and desktop widths, in light and dark themes,
  and after rotation.
- **Scores:** each new set is attempted end to end, and the score matches a hand
  calculation for all-correct, all-wrong, and mixed answers.
- **Acceptance:** the change is published to development and passes
  acceptance there.

Production publication is the approved, protected release that follows a
passed gate. After it, check the published pages in production and treat any
difference from acceptance as a release defect.

When verifiers disagree, a third verifier and the release owner decide from
the evidence. An ambiguity that cannot be resolved removes the item or rewrites
it. Keep every verification record outside the publication source and link it
from the pull request.
