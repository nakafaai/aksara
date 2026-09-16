# Source and readability

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
- Every visual card requires a description that adds useful information beyond
  its title. Never repeat or merely restate the title. Describe a relevant
  diagram fact or a specific learning task.

## Readability

- Keep raw MDX easy to review with blank lines around standalone math and
  component blocks.
- Do not hide educational prose inside component props when normal paragraphs
  are clearer.
