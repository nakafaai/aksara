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
- Prefer one aligned `<BlockMath />` for a connected derivation.
- Use `<MathContainer>` only when separate formula rows should remain visually
  distinct.
- MDX math props use a single LaTeX backslash. TypeScript choice strings escape
  the backslash.
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
- Use nearby prose to tell the learner what to notice, how the representation
  connects to the concept, and what conclusion it supports. A visual must not
  carry essential meaning only through color, motion, or position.

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
