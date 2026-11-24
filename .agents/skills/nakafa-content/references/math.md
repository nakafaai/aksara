# Mathematics and code

These rules apply to MDX and renderer props. Response labels are Markdown
strings with their own [math syntax](questions.md#response-items).

- Mathematics and chemistry are never plain text, anywhere a learner reads
  them: prose, headings, table cells, and every visual's title, description,
  labels, facts, and legends. Write `<InlineMath math="..." />` or
  `<BlockMath math="..." />`, never dollar math (the gate blocks `$$30$$` and
  `$x$` in MDX as `dollar-math`, while a price such as `USD $100` stays text),
  and write a visual's text prop
  as JSX: `description={<>Die Kurve <InlineMath math="x^2/16" /> steigt</>}`.
  Chemistry follows the corpus convention, `\mathrm{H_2O}` with
  `\rightarrow`, so `title="2H₂(g) + O₂(g) → 2H₂O(g)"` becomes
  `title={<InlineMath math="2\mathrm{H_2}(g) + \mathrm{O_2}(g) \rightarrow 2\mathrm{H_2O}(g)" />}`.
  Unicode sub- and superscripts, math arrows, `×`, `÷`, `−`, `≤`, `≥`, `√`,
  `π` and other Greek letters, chemical formulas such as `H2O`, and simple
  equations such as `x = 2` never stand outside math. The
  [voice gate](verification.md#lesson-voice-gate) reports each one as
  `plain-math-text`.
- **Keep a clean separation between `<InlineMath />` and `<BlockMath />`.**
  - Use `<InlineMath />` strictly for single variables (`x`, `v_0`), numbers and
    constants (`2`, `3{,}14`, `25\%`), short symbols or notations (`f(x)`,
    `\Delta H`, `\mathrm{H_2O}`), short units (`5\text{ cm}`, `9{,}8\text{ m/s}^2`),
    small coordinates (`(2, -3)`), simple standalone fractions (`\frac{1}{2}`),
    or brief inline conditions (`x \neq 0`, `x \ge 1`, `0 < x < 1`).
  - Use `<BlockMath />` for equations, inequalities, complex or nested
    fractions, multi-term expressions, chemical reaction equations, and every
    algebraic transformation or calculation step. Keeping full formulas and
    derivations in `<BlockMath />` keeps prose paragraphs airy and readable on
    both phones and desktops (`bloated-inline-math` enforces this on changed
    lessons and try-out answers; table cells and visual props stay exempt since
    they cannot host `<BlockMath />`).
  - Keep instructional ordinals and references such as `Step 1`, `Example 2`,
    and `equation (3)` as ordinary text. Mathematical indices and calculated
    positions remain math.
- Every number a learner reads as a quantity is math, never plain digits
  beside rendered math (owner, 13 November 2026): a count, a measurement, an
  amount, a percentage, a value, a duration, and an ordinal index such as
  `ke-<InlineMath math="3" />`, in every case (`Ke-2`, `hari ke-1 dan ke-2`). `bersisa 2 jika dibagi 5` becomes `bersisa
  <InlineMath math="2" /> jika dibagi <InlineMath math="5" />`. A unit symbol
  goes inside the math as `5\text{ cm}`, `\text{ cm}^2`, `\text{ m/s}^2`,
  `30^\circ`, `30^\circ\text{C}`, `10\text{ k}\Omega`, `25\%`, and
  `\text{Rp}5{.}000`; a unit word such as `meter`, `jam`, or `hours` stays prose
  after the math. Indonesian and German write `2{,}5` and `5{.}000`; English
  and Malay write `2.5` and `5{,}000`. These stay text: a year (`2024`,
  `1998-2024`, `SNBT 2027`, `tahun ajaran 2025/26`), a date (`13 November
  2026`, `13.11.2026`), a clock time, which names a moment (`08.00`,
  `12:30`, `6:45`, `18 Uhr`, `6:00 pagi`, `pukul 7`, `jam 8.00`, `7 a.m.`,
  never `20{:}24` or `16{.}00` inside math, which the gate blocks as
  `clock-time-math`, while the duration between two times stays math),
  an era or century (`300 SM`, `abad ke-19`), a document,
  exam, course, or legal label (`Soal 3`, `Kelas 10`, `Langkah 1 dan 2`,
  `Bab 4.1`, `Pasal 1(2)`, `UU 12/2011`, `urutan ke-1 sampai ke-6`), a
  numbered reference an item or a solution points back to (`syarat 1`,
  `rule 2`, `Bedingung 3`, `Teks 2`, `Angabe 4`, `Simpulan 2`), a numbered
  place or slot (`jalur 3`, `lane 3`, `Bahn 1`, `lorong 3`, `kursi 4`,
  `lantai 2`, `Platz 3`, `SMA Negeri 2`), an item title whose label word
  carries a qualifier before its number (`Soal identifikasi 4`,
  `Einordnungsaufgabe 1`, `Soalan pengelasan 2`), a statement, equation, or
  citation marker (`(1)`, `(2')`, `[3]`, `(Smith, 2019)`), a section number that opens a line, and a
  number glued into a name (`COVID-19`, `3D`, `B12`, `1990s`, the suspended
  `45-` of `45- bis 64-Jährige`). A count before the noun (`3 kursi`,
  `7 jam`, `3 malam`) stays a quantity. A one-digit hour before a point
  (`6.45`) reads as an English decimal, so write `pukul 6.45` or `6:45`.
  Code, links, and metadata stay out. The [voice gate](verification.md#lesson-voice-gate)
  blocks each remaining number as `plain-number` in lessons, articles,
  questions, readings, and answers, and
  `node --conditions=aksara-source .agents/skills/nakafa-content/scripts/math/fix.ts <directory or .mdx file>...`
  wraps every unambiguous one in place. It leaves for a person a number whose
  separators the locale cannot read (`3.5` in Indonesian), a number inside a
  string prop (convert the prop to JSX first), and a number alone on its line.
- Use upright math letters for named factorizations and algorithms in prose.
  Write `<InlineMath math="\mathrm{QR}" />`, `<InlineMath
  math="\mathrm{LU}" />`, and `<InlineMath math="\mathrm{SVD}" />` instead of
  bare labels such as `QR`, `LU`, `SVD`, `PLU`, or `PCA`. Keep schema-owned page
  titles as ordinary text. React-node visual titles use the same mathematical
  notation as their descriptions and labels. Exempt code, code
  comments, URLs, immutable quotations, and string-only schema fields. Never
  insert JSX or LaTeX into a programming-language comment.
- Use `<BlockMath />` for all standalone equations, inequalities, complex
  fractions, multi-term expressions, matrices, cases, and every step of a
  derivation or calculation. Refer to an already displayed equation or matrix
  instead of expanding it again inside prose. Response options keep math inline
  under the question-bank contract.
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
  comparison in `<MathContainer>` across every document type (lessons,
  articles, questions, and answers). Blank MDX lines do not space adjacent JSX
  blocks. Keep intervening prose and visual components outside `<MathContainer>`
  so a formula card and a visual card stay clearly spaced apart and never merge
  into one container; use `ContentStack` or `ContentGrid` when grouping math
  with a graph, diagram, simulation, or other non-math component.
  The `unwrapped-math-stack` gate checks rendered MDX sibling order, including
  transparent fragments and comment-only gaps, uniformly across questions,
  answers, articles, and lessons (both in `test:lesson-voice` and on changed
  try-out answers in `bun run explanations`). A prose paragraph, heading,
  distinct list item, or different visual separates the blocks and stays valid.
  Code examples are not rendered math. JSX inside expression-valued props still
  requires manual composition review.
  The `math-stack-content` gate rejects paragraphs, headings, and other visuals
  inside `MathContainer`, whose direct rendered children must be `BlockMath`
  cards. Do not hide those children inside fragments or other wrappers:
  the renderer counts direct React children to reserve the stack height.
  Move the explanation outside, and split the stack where prose
  separates mathematical steps.
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
  one mathematics visual for points, lines, curves, number lines, circles,
  vectors, and regions.
- Follow the [emphasis contract](emphasis.md) for `<Highlight>` and `**`. A locale
  picks its own highlight phrase instead of translating the marked words of a
  sibling.
