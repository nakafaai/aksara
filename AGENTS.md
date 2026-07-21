# Aksara Agent Guide

Aksara is Nakafa's trusted content-authoring and publication system. Build it
for clarity, measurable scale, and safe releases.

- Keep only workspaces with a real implemented capability. The domain modules
  are `packages/contracts`, `packages/compiler`, and `packages/publisher`.
  `packages/typescript-config` owns their one shared compiler contract. Add
  corpus or CLI ownership only with authoritative Nakafa sources and an
  end-to-end caller; never fill a workspace with substitute content.
- File and folder names may contain at most two words. Group longer concepts
  under a domain folder, such as `artifact/verify.ts`, without repeating the
  domain in the filename.
- Never invent educational content, author metadata, corpus facts, renderer
  manifests, or production-state claims. Test-only protocol values must be
  unmistakably named as tests; content evidence must cite an exact Nakafa
  source and commit.
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
- Give every stable callable declaration—functions, methods, and callable
  bindings—useful JSDoc. Keep framework callbacks anonymous instead of
  inventing names or filler comments solely for compliance. JSDoc-only lines
  do not count toward the 300-line module limit.
- Put dependencies in the workspace that uses them and use `workspace:*` for
  internal dependencies.
- Same-package TypeScript imports use the private `#contracts/*`, `#compiler/*`,
  or `#publisher/*` alias. Cross-package imports use exact `@nakafaai/*` package
  exports. Relative module imports are forbidden; relative config inheritance
  and CLI filesystem paths are not module imports.
- Root task scripts delegate to Turbo, except repository-wide tooling such as
  Ultracite and Changesets.
- Run focused workspace tests through `pnpm exec turbo run test --filter=...`.
  Do not bypass Turbo for tests that consume another workspace because Turbo
  owns the dependency build order.
- Never add deployment credentials to the repository. Publisher code describes
  release operations but performs no external deployment in this foundation.
- Use colocated `name.test.ts` files to test the real `name.ts` module.
- Do not add compatibility layers. Migration-only seams need explicit deletion
  gates.
