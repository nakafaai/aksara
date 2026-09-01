# MDX quality

## Source contract

- Inspect the owning registry and schema before editing metadata. Aksara families
  deliberately have different metadata contracts.
- Keep the compiler-owned static `export const metadata = { ... }` declaration.
- Do not add dynamic metadata, executable imports, or arbitrary module syntax.
- Raw MDX remains trusted executable source. It is compiled ahead of time and
  rendered by Nakafa's native MDX renderer.
- Reject hidden C0 control characters other than line feed and tab, as well as
  DEL. They can corrupt prose or LaTeX while remaining hard to see in a diff.
  Write the intended visible character explicitly and recheck every locale
  sibling for the same corruption.
- Keep provenance, originality, evidence URLs, and publication status in the
  source, readiness, and publisher contracts. Do not insert learner-facing
  notices such as "original practice text" into a question or answer.
- Every locale sibling that shares a `stimulusKey` must present the exact same
  stimulus to every question in that group. Question-specific instructions may
  differ, but they must not silently change, shorten, or enrich the shared
  evidence.
- A scored question must contain all information needed to answer it. Do not
  require a learner to remember or solve a preceding question merely to obtain
  an unstated intermediate value.

## Headings

- Lesson and article body headings start at `##` and use `###` only for real
  nested concepts.
- Answer explanation MDX is rendered beneath an app-owned `###` heading, so its
  sections start at `####` and may use `#####` for real nested analysis.
- Leave one blank line after headings.
- Use one short phrase written with ordinary words. Keep decorative
  punctuation, formulas, code tokens, operators, emojis, option letters, and
  decorative numbers out of headings. Move exact notation, aliases, and full
  questions into the first sentence below the heading. A hyphen required by
  standard word formation is allowed, such as the Indonesian reduplication in
  `rata-rata` and `jari-jari`. Do not delete that hyphen or replace a familiar
  word with a stiffer synonym merely to make the checker pass.

## Learner facing punctuation

- Do not use a visible semicolon in authored paragraphs, lists, tables,
  metadata descriptions, or learner-facing component props. Use a comma for
  one continuous sentence or a period for separate thoughts.
- After replacing a semicolon with a period, read both sentences together.
  Name the subject again when a pronoun or possessive could refer to more than
  one noun.
- Preserve semicolons that belong to JavaScript or MDX syntax, authored code
  examples, HTML entities, and LaTeX spacing commands such as `\;`. These
  characters are source syntax rather than learner-facing punctuation.
- A visible semicolon used as a separator inside rendered mathematics is still
  learner-facing punctuation and must be replaced with notation that states the
  relationship clearly. An encoded entity that renders as a semicolon is also
  forbidden.

## Links

- Nakafa renders external Markdown links as compact source chips. Keep the
  explanation in ordinary prose and use the source, institution, journal,
  report, or publication name as the label.
- Do not use a clause, lesson term, page topic, chapter title, `tautan ini`,
  `this source link`, or a sentence about opening the source as an external
  label. A source chip must identify the evidence even when its destination is
  hidden.
- Keep generic words such as `official documentation`, `Dokumentasi resmi`, or
  `Dokumentation` in the sentence, not in the chip. Use `[NumPy]` or `[GBIF]`
  for the source label.
- Internal links beginning with `/` use the ordinary underlined-link treatment.
  Give them a descriptive destination label that fits the sentence.
- Read the destination and the surrounding paragraph before editing a label.
  Do not impose a global character limit or a hostname-to-label map. A longer
  official publication name may be necessary, and one domain may host several
  distinct journals or institutions.

## Mathematics and code

- Use `<InlineMath />` for mathematical expressions, variables, quantities,
  units, coordinates, and calculated values in prose.
- Use upright math letters for named factorizations and algorithms in prose.
  Write `<InlineMath math="\mathrm{QR}" />`, `<InlineMath
  math="\mathrm{LU}" />`, and `<InlineMath math="\mathrm{SVD}" />` instead of
  bare labels such as `QR`, `LU`, `SVD`, `PLU`, or `PCA`. Keep the page title and headings as ordinary text,
  then render the notation in the first body sentence. Exempt code, code
  comments, URLs, immutable quotations, and string-only schema fields. Never
  insert JSX or LaTeX into a programming-language comment.
- Use `<BlockMath />` for standalone formulas.
- Keep the leading backslash on every LaTeX command in a `math` prop. Bare
  `ldots`, `cdots`, `vdots`, or `ddots` render as letters rather than an
  ellipsis. Check this only inside rendered math, not in prose, code, or
  comments.
- Apply the same rule inside renderer component props. When `title`,
  `description`, or another learner-facing prop accepts a React node, pass a
  JSX fragment and wrap every mathematical token with `<InlineMath />` instead
  of hiding it in a plain string.

  ```mdx
  <MathVisual
    title={<>Segment <InlineMath math="AB" /></>}
    description={
      <>
        The segment joins <InlineMath math="A=(-2,-1)" /> and
        <InlineMath math="B=(2,3)" />.
      </>
    }
    scene={{
      space: "plane",
      frame: {
        kind: "cartesian",
        axes: "visible",
        grid: "visible",
        x: { min: -3, max: 3 },
        y: { min: -2, max: 4 },
      },
      view: { kind: "fit" },
      objects: [
        {
          id: "segment-ab",
          kind: "segment",
          appearance: "primary",
          from: { x: -2, y: -1 },
          to: { x: 2, y: 3 },
        },
      ],
    }}
  />
  ```

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
- Use `<MathContainer>` only when two or more consecutive formula rows belong
  to the same derivation and should remain visually distinct. Do not use it to
  group a formula with a graph, diagram, simulation, code block, or other
  non-math component.
- MDX math props use a single LaTeX backslash. TypeScript semantic math parts
  escape the backslash.
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

## Components and visuals

Choose a representation for its instructional job, not for variety alone.

For try-out content, visual polish does not compensate for a weak assessment
task. A graph, chart, or 3D model must support a real inference. Review the
complete cognitive path from stimulus to answer and reject items whose assessed
step remains direct formula recall when the blueprint calls for application or
reasoning. Difficulty should come from a small number of meaningful dependent
steps, not obscure wording, oversized arithmetic, or gratuitous data.

Across each active set, section, locale, and option-count cohort, balance the
correct positions so their frequencies differ by at most one. Keep the pattern
unpredictable in question order, preserve distractor meaning across locale
siblings, and never move only the `isCorrect` marker to manufacture balance.

- Use prose for explanation, interpretation, uncertainty, and causal reasoning.
- Use a short list for parallel items that do not need cross-column comparison.
- Use a Markdown table for exact mappings or repeated comparisons. Keep cells
  compact and explain nuanced reasoning outside the table.
- Use a blockquote only for a real quotation or a clearly identified claim,
  misconception, or source excerpt that the surrounding prose analyzes. Do not
  turn ordinary emphasis into decorative quotations.
- Use Mermaid for a sequence, flow, hierarchy, state change, or relationship
  that is materially harder to understand in prose. Do not convert a simple
  list or one-step process into a diagram.
- Use math components for notation and derivation. Use a domain component such
  as a graph, number line, simulation, or interactive model only when it models
  the concept the learner is studying.
- Compose related block components with the renderer-owned layout primitives.
  Use `<ContentStack>` when a formula and a graph, diagram, number line,
  simulation, or other visual form one teaching unit. Use `<ContentBlock>` for
  one custom visual that needs the standard separation from an adjacent block.
  A blank line in raw MDX improves source readability but does not create DOM
  spacing between two JSX flow components.
- Never repair block spacing with empty paragraphs, repeated `<br />` tags,
  nonbreaking spaces, or content-local margin props. Preserve the semantic
  grouping and let `ContentBlock`, `ContentStack`, or `ContentGrid` own layout.
- Use nearby prose to tell the learner what to notice, how the representation
  connects to the concept, and what conclusion it supports. A visual must not
  carry essential meaning only through color, motion, or position.
- Verify every graph, geometric construction, simulation, and three-dimensional
  component through Nakafa's real renderer. Compilation proves only that the
  source is valid. It does not prove that plotted values, signs, domains,
  discontinuities, asymptotes, labels, axes, legends, camera framing, scale,
  occlusion, or interaction are mathematically and visually correct.
- Recalculate representative plotted points independently from the authored
  equation and compare them with the rendered component. For discontinuous or
  piecewise objects, inspect every branch and boundary. For three-dimensional
  objects, inspect and rotate the rendered scene when interaction is available
  so hidden intersections, incorrect depth, or misleading camera angles are
  not accepted from one static view.
- Never represent an exact straight segment, polygon, or polyhedron with a
  spline. In `MathVisual`, use the semantic straight object kinds. Author a
  balok as
  `{ id, kind: "cuboid", appearance, center, size: { length, width, height } }`,
  then verify eight vertices, twelve straight edges, four edges of each
  declared dimension, and a camera view that still reads as a cuboid after
  rotation.
- Render every locale sibling that changes learner-facing labels or prose around
  a visual. Longer localized text must not clip, overlap, obscure data, or
  detach from the representation it explains.

Lessons and articles should not become uninterrupted walls of text when a
meaningful structure or representation would reduce search and comparison
effort. This is a review decision, not a quota. A clear short lesson can remain
mostly prose, and a routine worked answer can remain prose plus one derivation.
Do not add a table, blockquote, Mermaid diagram, video, or interaction merely
to make the document look more varied.

During a humanization pass, compare the representation inventory before and
after editing. Do not flatten a useful list, table, blockquote, Mermaid diagram,
math block, graph, or custom component into prose just to shorten or smooth the
lesson. A removal is valid only when the representation no longer has a
teaching job or when every locale sibling carries the same job more clearly in
another form.

Keep the teaching structure equivalent across locale siblings. If a diagram,
table, example, warning, or worked model is necessary in one authored locale,
preserve the same instructional evidence in the others while localizing its
labels and explanation naturally.

Structural parity applies to the teaching representation and its information.
A list keeps the same ordered steps, a table keeps the same comparisons, and a
displayed derivation keeps the same mathematical work in every sibling.
Sentence boundaries and inline-math wrappers may follow each language's grammar
and do not need a byte-for-byte match.

Do not use raw HTML, manual React renderers, decorative component wrappers, or
content-local component implementations. Verify every nonstandard component
against the current route-domain renderer manifest before authoring with it.

## Readability

- Keep raw MDX easy to review with blank lines around standalone math and
  component blocks.
- Do not hide educational prose inside component props when normal paragraphs
  are clearer.
- Keep external links after a complete explanatory sentence so the linked text
  does not replace required prose.
- A source chip is a citation, not a grammatical subject, object, or
  attribution. Reject constructions such as `[EPA] explains`, `menurut [EIA]`,
  `ein Eintrag in [PubChem]`, and `published by [CIAAW]`. State the claim in
  ordinary prose, end the sentence, and append one or more source chips. An
  explicit source or reference list may begin an item with its source chip.

## Evidence basis

- The What Works Clearinghouse mathematics practice guide recommends teaching
  students to use visual representations such as tables, graphs, number lines,
  and diagrams, while selecting representations that fit the problem rather
  than overwhelming learners with examples:
  https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/MPS_PG_043012.pdf
- Mayer's research-based multimedia principles support combining words with
  relevant pictures while minimizing extraneous words and visuals:
  https://doi.org/10.1075/dd.1.1.02may
- A meta-analysis of 103 investigations found that instructional signals that
  expose organization or relevant relationships improved retention and
  transfer and reduced cognitive load:
  https://doi.org/10.1016/j.edurev.2017.11.001
- A separate meta-analysis of text-picture integration signals found a
  small-to-medium comprehension and transfer benefit, especially for learners
  with low prior knowledge:
  https://doi.org/10.1016/j.edurev.2015.12.003

This evidence supports purposeful representations, clear signaling, and
removal of irrelevant decoration. It does not support adding multimedia to
every page or shortening the explanation that makes a representation useful.
