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
- `NumberLine` and `LineEquation` require explicit design-system imports. Read
  the real Nakafa component contract before using either one.

## Components and visuals

- Use standard Markdown or an existing renderer component when it explains the
  idea clearly.
- Add Mermaid or a custom visual only when it materially improves
  understanding.
- Do not use raw HTML, manual React renderers, or decorative component wrappers.
- Keep component labels localized and accessible.
- Verify any explicit component import against the current renderer manifest.

## Readability

- Keep raw MDX easy to review with blank lines around standalone math and
  component blocks.
- Do not hide educational prose inside component props when normal paragraphs
  are clearer.
- Keep external links after a complete explanatory sentence so the linked text
  does not replace required prose.
