# Aksara Agent Guide

Aksara is Nakafa's trusted content-authoring and publication system. Build it
for clarity, measurable scale, and safe releases.

- Keep exactly five workspaces until a real sixth capability exists:
  `apps/cli`, `packages/contracts`, `packages/compiler`,
  `packages/publisher`, and `packages/corpus`.
- Treat Effect as architecture. Expected failures use typed errors, effectful
  seams compose Effects, and runners stay at CLI, framework, or test boundaries.
- Keep authored MDX executable and trusted. Compile it ahead of time into a
  signed `function-body` artifact. Nakafa may evaluate only reviewed,
  source-controlled, hash-verified artifacts through official server-only
  `@mdx-js/mdx/run` after signature and renderer-contract checks.
- The trusted artifact path is not a sandbox. Never accept arbitrary or
  untrusted MDX uploads into compilation or runtime evaluation.
- Preserve Nakafa's real React/Next renderer. Do not create a JSON/AST renderer,
  duplicate preview renderer, or manual per-document import registry.
- Keep React and TSX component implementations in Nakafa. Corpus MDX references
  versioned contract names; Aksara never owns a duplicate preview component.
- Keep handwritten TypeScript modules at or below 300 lines.
- Put dependencies in the workspace that uses them and use `workspace:*` for
  internal dependencies.
- Root task scripts delegate to Turbo, except repository-wide tooling such as
  Ultracite and Changesets.
- Never add deployment credentials to the repository. Publisher code describes
  release operations but performs no external deployment in this foundation.
- Use colocated `name.test.ts` files to test the real `name.ts` module.
- Do not add compatibility layers. Migration-only seams need explicit deletion
  gates.
