# MDX quality

## Source contract

- Inspect the owning registry and schema before editing metadata. Aksara families
  deliberately have different metadata contracts.
- Keep the compiler-owned static `export const metadata = { ... }` declaration.
- Do not add dynamic metadata, executable imports, or arbitrary module syntax.
- Raw MDX remains trusted executable source. It is compiled ahead of time and
  rendered by Nakafa's native MDX renderer.

## Headings

- Lesson and article body headings start at `##` and use `###` only for real
  nested concepts.
- Answer explanation MDX is rendered beneath an app-owned `###` heading, so its
  sections start at `####` and may use `#####` for real nested analysis.
- Leave one blank line after headings.
- Keep formulas, symbols, option letters, and parenthesized item numbers out of
  headings.

## Mathematics and code

- Use `<InlineMath />` for mathematical expressions, variables, quantities,
  units, coordinates, and calculated values in prose.
- Use `<BlockMath />` for standalone formulas.
- Apply the same rule inside renderer component props. When `title`,
  `description`, or another learner-facing prop accepts a React node, pass a
  JSX fragment and wrap every mathematical token with `<InlineMath />` instead
  of hiding it in a plain string.

  ```mdx
  <LineEquation
    title={<>Reflection of <InlineMath math="h(x)=|x-2|" /></>}
    description={
      <>
        The graph is reflected across the <InlineMath math="y" />-axis; its
        width is unchanged.
      </>
    }
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
  exposed for the document's route domain by Nakafa's authenticated renderer
  manifest. Components such as `NumberLine` and `LineEquation` are available
  only in the domains that own them.

## Components and visuals

Choose a representation for its instructional job, not for variety alone.

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
- Render every locale sibling that changes learner-facing labels or prose around
  a visual. Longer localized text must not clip, overlap, obscure data, or
  detach from the representation it explains.

Lessons and articles should not become uninterrupted walls of text when a
meaningful structure or representation would reduce search and comparison
effort. This is a review decision, not a quota. A clear short lesson can remain
mostly prose, and a routine worked answer can remain prose plus one derivation.
Do not add a table, blockquote, Mermaid diagram, video, or interaction merely
to make the document look more varied.

Keep the teaching structure equivalent across locale siblings. If a diagram,
table, example, warning, or worked model is necessary in one authored locale,
preserve the same instructional evidence in the others while localizing its
labels and explanation naturally.

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
