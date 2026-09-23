# Mathematics and code

These rules apply to MDX and renderer props. Response labels are Markdown
strings with their own [math syntax](question-bank.md#response-items).

- Use `<InlineMath />` for mathematical expressions, variables, quantities,
  units, coordinates, and calculated values in prose. Keep instructional
  ordinals and references such as `Step 1`, `Example 2`, and `equation (3)` as
  ordinary text. Mathematical indices and calculated positions remain math.
- Use upright math letters for named factorizations and algorithms in prose.
  Write `<InlineMath math="\mathrm{QR}" />`, `<InlineMath
  math="\mathrm{LU}" />`, and `<InlineMath math="\mathrm{SVD}" />` instead of
  bare labels such as `QR`, `LU`, `SVD`, `PLU`, or `PCA`. Keep schema-owned page
  titles as ordinary text. React-node visual titles use the same mathematical
  notation as their descriptions and labels. Exempt code, code
  comments, URLs, immutable quotations, and string-only schema fields. Never
  insert JSX or LaTeX into a programming-language comment.
- Use `<BlockMath />` for standalone formulas.
- Move tall matrices, cases, long or nested fractions, or derivations out of
  prose when they disrupt reading. Fitting the width alone does not prove good
  line flow. Refer to an already displayed matrix instead of expanding it again
  in a summary. Keep short expressions inline; decide from context, not length.
  Response options keep math inline under the question-bank contract.
- Compose displayed derivations around complete mathematical steps. Keep short
  equations whole. If a line must continue, align it with the side it belongs
  to and preserve the grouping of sums, products, and conditions. Do not leave
  a lone term such as `+a` on a new row or split one expression across bordered
  blocks. Introduce meaningful subexpressions with complete prose when needed.
  Explain what a domain or condition applies to and why a conclusion permits
  the next step. Put that explanation beside the formula in prose; do not leave
  a bare domain or comparison fragment on a separate row. Preserve every
  transformation and condition. Verify both desktop and mobile composition
  in the actual renderer. Matching tokens and fitting widths do
  not prove clarity. Do not shrink or clip math; prefer necessary scrolling
  over an ambiguous rewrite while resolving avoidable long lines.
- Start a displayed chain with a complete equation. A row sequence that opens
  with a bare term and continues with a relation on the next row reads as an
  unfinished fragment, so keep `x = \frac{2+4}{2} = 3` on one row instead of
  leaving `x` alone above it. Put the conjunction that joins two alternative
  results on its own aligned row or in prose; inside a chain row it welds onto
  the next variable. A unit word after a value or a closing delimiter needs its
  own space, so write `\text{ Einheiten}` with the space inside the group,
  because `5 \text{Einheiten}` renders as `5Einheiten`. A word that directly
  follows a closing parenthesis or bracket welds the same way, so write
  `(3{,}13 \pm 0{,}02)\text{ cm}` rather than
  `(3{,}13 \pm 0{,}02)\text{cm}`, which renders as `(3,13±0,02)cm`. The lesson
  voice gate blocks every one of these shapes.
- Keep the leading backslash on every LaTeX command in a `math` prop. Bare
  `ldots`, `cdots`, `vdots`, or `ddots` render as letters rather than an
  ellipsis. Check this only inside rendered math, not in prose, code, or
  comments.
- Apply the same rule inside renderer component props. When `title`,
  `description`, or another learner-facing prop accepts a React node, pass a
  JSX fragment and wrap every mathematical token with `<InlineMath />` instead
  of hiding it in a plain string.

  For example, use `title={<>Segment <InlineMath math="AB" /></>}` and
  `description={<>The segment joins <InlineMath math="A" /> and <InlineMath math="B" />.</>}`.

- This obligation covers axis symbols, variable names, formulas, coordinates,
  inequalities, values with units, and mathematical labels in every authored
  locale. Text such as `y-axis`, `x = 2`, `(3, 4)`, or `5 m` is not exempt
  because it appears in a component string.
- Graph and 3D label fields are semantic React content. Pass ordinary prose as
  text, and use a fragment with `<InlineMath />` for mixed prose and notation.
  Do not choose between plain and rich label modes, encode JSX or LaTeX inside a
  string, or replace a scientific label with easier prose merely to avoid math
  rendering.
- If a component field accepts only a string, do not place raw LaTeX or a
  plain-text formula in that field. Put the mathematical statement in nearby
  prose with `<InlineMath />`, or use a verified math-aware renderer prop.
- Compiler-owned metadata fields remain schema-owned strings. Keep metadata
  descriptions as natural prose rather than encoding formulas with JSX or raw
  LaTeX.
- Prefer one aligned `<BlockMath />` for a connected derivation. One standalone
  `<BlockMath />` is complete by itself and does not require a
  `<MathContainer>` wrapper.
- Wrap consecutive `<BlockMath />` rows from one derivation or mathematical
  comparison in `<MathContainer>`. Blank MDX lines do not space adjacent JSX
  blocks. Keep intervening prose outside the wrapper; use `ContentStack` for
  math grouped with a graph, diagram, simulation, or other non-math component.
- Direct MDX attributes keep one LaTeX backslash, as in `math="8\text{ kg}"`.
  JavaScript expression strings and ordinary template literals escape it, as
  in `math={"8\\text{ kg}"}`. A single `\t` inside such a string becomes a
  tab, so `\text` or `\times` can silently render as ordinary letters.
  Inspect decoded math values as well as parser success. The gate rejects the
  proven tab-plus-`ext{` and tab-plus-`imes` corruption patterns while allowing
  ordinary tab spacing and indentation.
- Write a percentage sign as `\%` inside LaTeX. A bare `%` begins a comment
  and can silently remove the sign or the rest of the formula. Inspect the
  rendered value as well as checking for parser errors.
- Format learner-facing numbers according to the authored locale without
  changing their value. English uses `.` for decimals and `{,}` for grouped
  thousands. Indonesian and German use `{,}` for decimals and `{.}` for grouped
  thousands. Braces keep the separator from acquiring mathematical punctuation
  spacing in the renderer.
- Prove whether a separator is decimal or grouping from the source meaning,
  unit, calculation, or cited evidence. Never infer it from three following
  digits alone, and never run a global dot-or-comma replacement. Preserve the
  exact digit sequence and independently recompute the value after editing.
- Keep programming-language numeric literals in their required source syntax.
  Render those literals as code rather than localizing syntax that a compiler
  or runtime must parse.
- Use inline code for programming syntax and identifiers.
- MDX content must not import renderer components. Use only component names
  exposed by Nakafa's authenticated renderer manifest. `MathVisual` is the
  shared mathematical visual boundary; domain-owned components such as
  `NumberLine` remain limited to the domains that expose them.
- Follow the [emphasis contract](emphasis.md) for `<Highlight>` and `**`. A locale
  picks its own highlight phrase instead of translating the marked words of a
  sibling.
