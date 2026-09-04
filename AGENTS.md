# Aksara Agent Guide

Aksara is Nakafa's trusted content-authoring and publication system. Build it
for clarity, measurable scale, and safe releases.

- Keep only workspaces with a real implemented capability. The domain modules
  are `packages/contracts`, `packages/compiler`, `packages/corpus`, and
  `packages/publisher`. `packages/utilities` owns only generic cross-workspace
  primitives. `packages/typescript-config` owns the shared compiler contract,
  while `packages/testing` owns shared test-runner defaults consumed by local
  workspace configs. Add CLI ownership only with the actual Nakafa preview
  caller; never fill a workspace with substitute content.
- File and folder names may contain at most two words. Exact source-owned
  educational directory segments below `packages/corpus/material/lesson` and
  `packages/corpus/question-bank/tryout` are the only exceptions; never split
  one source identity into a fake hierarchy to satisfy code naming. Source
  filenames and every code or configuration directory still obey the two-word
  limit. Group longer code concepts under a domain folder, such as
  `artifact/verify.ts`, without repeating the domain in the filename.
- Never invent educational content, author metadata, corpus facts, renderer
  manifests, or production-state claims. Test-only protocol values must be
  unmistakably named as tests; content evidence must cite an exact Nakafa
  source and commit.
- Treat Effect as architecture. Expected failures use typed errors, effectful
  seams compose Effects, and runners stay at CLI, framework, or test boundaries.
- Optimize for code that is easy to read and skim. Use direct names, early
  returns, and small named steps. Avoid clever pipelines, nested ternaries,
  workaround types, wrapper-only functions, and abstractions without a real
  caller.
- Use Effect v4 `Context.Service` plus `Layer` for dependency contracts.
  Function-style and class-style service keys are both native v4 patterns. A
  service may own a `make` effect only when its module genuinely owns
  construction. Only the matching v4 service Interface is valid. Follow the
  vendored Effect source and its native Interfaces.
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
- Keep authored executable source in TypeScript. Do not add JavaScript source
  files or generated JavaScript to Git.
- Do not use APIs marked deprecated by the installed TypeScript declarations.
  `pnpm deprecations` must cover every tracked authored TypeScript file.
- Run `pnpm security:audit` after changing dependencies or the lockfile. Known
  dependency advisories are release blockers.
- Keep handwritten TypeScript modules at or below 300 lines.
- Give every stable callable declaration, including functions, methods, and
  callable bindings, useful JSDoc. Keep framework callbacks anonymous instead of
  inventing names or filler comments solely for compliance. JSDoc-only lines
  do not count toward the 300-line module limit.
- Put dependencies in the workspace that uses them and use `workspace:*` for
  internal dependencies.
- Same-package TypeScript imports use their private workspace alias such as
  `#contracts/*`, `#compiler/*`, `#corpus/*`, `#publisher/*`, `#utilities/*`,
  or `#cli/*`. Cross-package imports use exact `@nakafa/*` package exports.
  Relative module imports are forbidden; relative config inheritance and CLI
  filesystem paths are not module imports.
- Root task scripts delegate to Turbo, except repository-wide tooling such as
  Ultracite and source-policy checks.
- Run focused workspace tests through `pnpm exec turbo run test --filter=...`.
  Do not bypass Turbo for tests that consume another workspace because Turbo
  owns the dependency build order.
- Import test APIs from `@effect/vitest`. Use the shared configured `vi` global
  for mocks because Vitest hoists mock calls before re-export bindings
  initialize. Do not import `vi`. Keep `vitest` installed only because
  `@effect/vitest`, the CLI runner, coverage, and `vitest/config` require it.
  Raw `vitest` imports are forbidden in authored TypeScript.
- Never add deployment credentials to the repository. Publisher transport
  implementations must remain injected, authenticated, and exact-contract.
  Tests and repository verification never call a remote target; only an
  explicit CLI or protected release boundary may execute publication after
  approval.
- Use colocated `name.test.ts` files to test the real `name.ts` module.
- Do not create a test merely because a `.ts` file exists, to restate
  declarative configuration, or to satisfy coverage. Every test must prove
  meaningful behavior, a regression, or a failure contract at the owning
  public seam. Maintain 100% statement, branch, function, and line coverage
  without lowering thresholds or excluding behavior. Keep declarative
  configuration outside the executable coverage surface instead of creating
  mirror modules solely to manufacture tests.
- Name new folders and files with one concise domain word per path segment
  whenever the toolchain permits it. Avoid hyphenated phrases, repeated parent
  wording, and names that restate the containing capability.
- Do not add compatibility layers. Migration-only seams need explicit deletion
  gates.

## Vendored References

- External source references live under `repos/` as read-only Git subtrees.
- Follow the official Effect guidance on
  [vendoring source for coding agents](https://www.effect.website/blog/the-one-weird-git-trick-that-makes-coding-agents-more-effect-ive).
- `repos/effect` is pinned to the installed `effect` package version. Before
  writing or reviewing Effect code, read its `AGENTS.md`, then inspect the
  relevant implementation, tests, type-level tests, module structure, and API
  design under `packages/effect`.
- Prefer the matching vendored source for Effect API shape and idioms instead
  of guessing from memory, generated declarations, or examples for another
  major version.
- Never edit, import from, build, lint, or test `repos/effect` as Aksara code.
- `pnpm effect:source:check` verifies that the installed and vendored Effect
  versions match. After committing an Effect dependency update, run
  `pnpm effect:source:update`; it pulls the matching release tag and creates one
  linear reference update commit.
