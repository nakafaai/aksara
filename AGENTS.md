# Aksara Agent Guide

Aksara is Nakafa's trusted content-authoring and publication system. Build it for clarity, measurable scale, and safe releases.

This guide is a map. It states each Aksara decision once and names the command or file that owns the detail. What a command enforces is not restated here: run the command and follow its message.

## Sources Of Truth

| Topic | Owner |
| --- | --- |
| Writing Effect v4 | `repos/effect/LLMS.md`, then source and tests under `repos/effect/packages` |
| Effect-native source rules | `scripts/check/effect.ts`, run by `bun run lint` |
| Effect compiler rules | `packages/typescript-config/base.json` |
| Facts shared with nakafa.com: the compiler rule block, `scripts/osv`, the verifier core in `scripts/provenance`, the Effect cohort pins | nakafa.com owns them; `bun run native` compares the copies here with the commit pinned in `scripts/check/native.ts` |
| File and folder names | `bun run names` |
| Module length | `bun run lines` |
| JSDoc on stable callables | `bun run jsdocs` |
| Deprecated APIs | `bun run deprecations` |
| Import aliases and boundaries | `bun run boundaries` |
| Locale declarations | `bun run locales` |
| Workflow policy | `bun run workflows` |
| Dependency audit and its time-boxed exceptions | `scripts/osv`, `osv.toml` |
| Contracts release path | `docs/contracts.md` |
| Scope, governance, architecture decisions | `docs/scope.md`, `docs/governance.md`, `docs/adr` |
| Authoring, reviewing, and verifying content | `.agents/skills/nakafa-content` |
| Turborepo | `docs/README.md` inside the installed `turbo` package |

## Workspaces And Names

- Keep only workspaces with a real implemented capability. The domain modules are `packages/contracts`, `packages/compiler`, `packages/corpus`, and `packages/publisher`. `packages/utilities` owns only generic cross-workspace primitives, `packages/typescript-config` the shared compiler contract, and `packages/testing` the shared test-runner defaults. Add CLI ownership only with the actual Nakafa preview caller; never fill a workspace with substitute content.
- Name every code, script, and document folder and file with exactly one concise domain word. Group a longer capability under its domain, such as `artifact/verify.ts` or `tryout/hash/catalog.ts`, without repeating the parent name. Role suffixes such as `.config.ts`, `.d.ts`, and `.test.ts`, toolchain files, and uppercase repository documents keep their conventional names.
- Content identities keep their exact names: folders below `packages/corpus/material/lesson`, `packages/corpus/articles`, `packages/corpus/curriculum`, and `packages/corpus/pages`, the `question-bank` root with its source hierarchy, and skill folders. Code in a content root is a one-word file at that root. Never invent a hierarchy or rename a source identity to satisfy code naming, and rename existing code in a dedicated change that rewrites every import, export, and reference in one pass.
- Put dependencies in the workspace that uses them, with `workspace:*` for internal ones. Same-package imports use the private workspace alias such as `#contracts/*`; cross-package imports use exact `@nakafa/*` package exports. Relative module imports are forbidden; relative config inheritance and CLI filesystem paths are not module imports.
- Authored executable source is TypeScript: no JavaScript source and no generated JavaScript in Git. The dependency audit `scripts/osv` is the one shell script, because it decides whether the installed packages can be trusted and so imports none of them. It is an exact copy of the script in nakafa.com, which takes extra lockfiles as arguments: change it there first, then copy it and move the pin.
- Root task scripts delegate to Turbo, except repository-wide tooling such as Ultracite and the source-policy checks. Run focused workspace tests through `bunx turbo run test --filter=...`, because Turbo owns the dependency build order. A root script that forwards arguments to a Turbo task ends with ` --`, because Bun drops the separator of `bun run <script> -- <args>` and Turbo would read the arguments as its own options.

## Content And Publication

- Never invent educational content, author metadata, corpus facts, renderer manifests, or production-state claims. Test-only protocol values must be unmistakably named as tests; content evidence must cite an exact Nakafa source and commit.
- Authored MDX is executable and trusted. Aksara evaluates each document once at publish time in Node and signs its `content-tree` payload: a fragment of intrinsic tags, renderer components, JSON props, and text. Nakafa renders that tree with its component map and never evaluates code. Publish-time evaluation is not a sandbox: never accept arbitrary or untrusted MDX uploads into compilation.
- Nakafa's real React and TanStack Start renderer is the only renderer. Aksara writes the content tree as signed data and renders nothing. Do not create a JSON or AST renderer, a duplicate preview renderer, a manual per-document import registry, or a React component in Aksara. Corpus MDX references current authenticated renderer names; renderer manifests and artifact requirements contain names, without version fields or separate authoring and supported registries. A renderer change ships in the same change as the content that uses it, and the publisher requires the exact deployed renderer manifest hash for a renderer change.
- Assessment items are structured data, not MDX. `packages/contracts/src/assessment` owns their schemas and `docs/adr/assessment.md` the decision: a ProseMirror JSON document that Nakafa's renderer draws and Tiptap edits, interactions that hold no answer key, and an answer key that is its own artifact. The older `question/` and `tryout/` contracts are deleted in the same change that switches their readers.
- A breaking signed contract change lands in one step: the predecessor encoding is deleted in that change, and the signed content is republished in full in the current format. Do not add compatibility layers, migration-only readers or writers, backfills, or temporary functions.
- Never add deployment credentials to the repository. Publisher transport implementations stay injected, authenticated, and exact-contract. Tests and repository verification never call a remote target; only an explicit CLI or protected release boundary may publish after approval.
- A push to `main` builds and verifies the contracts package but never publishes it. To release a contracts version, dispatch `Release contracts` from `main`; the owner approves its `npm-production` gate.

## Effect And TypeScript

- Treat Effect as architecture. Expected failures use typed errors, effectful seams compose Effects, and runners stay at CLI, framework, or test boundaries. Dependency contracts use Effect v4 `Context.Service` plus `Layer`: function-style and class-style service keys are both native, a service owns a `make` effect only when its module genuinely owns construction, and only the matching v4 service Interface is valid.
- `repos/effect` is a read-only Git subtree pinned to the installed `effect` version. Prefer it over memory, generated declarations, or examples for another major version, and never edit, import from, build, lint, or test it. `bun run effect:source:check` verifies parity; `bun run effect:source:update` creates the matching reference commit after an Effect update.
- Enforcement: `bun run lint` runs the source rules over `apps`, `packages`, and `scripts` (agent skill tooling under `.agents/` keeps its own conventions), and the typecheck runs the compiler rules. Each violation names its fix. A rule becomes an error in the change that clears its last violation, and no `@effect-diagnostics` comment may switch one off.
- `effect-tsgo patch` gives `tsc` the Effect language service, and editors start that same `tsc` as their language server (`.zed/settings.json`, `.vscode/settings.json`), so Effect diagnostics show while editing.
- Judge a typecheck by its exit code: the Effect language service reports suggestions that fail it without the word "error". The shared configuration turns off `unstableApiUsage` and `experimentalApiUsage`, because Aksara uses Effect's unstable HTTP and process modules on purpose, pins Effect exactly, and reviews every upgrade.
- Optimize for code that is easy to read and skim: direct names, early returns, and small named steps. Avoid clever pipelines, nested ternaries, workaround types, wrapper-only functions, and abstractions without a real caller.
- Give every stable callable declaration useful JSDoc. Keep framework callbacks anonymous instead of inventing names or filler comments for compliance.

## Testing

- A colocated `name.test.ts` tests the real `name.ts`. Import test APIs from `@effect/vitest` and use the shared configured `vi` global; never import `vi` or `vitest` directly.
- A test proves meaningful behavior, a regression, or a failure contract at the owning public seam. Never create one because a file exists, to restate declarative configuration, or for coverage. Keep 100% statement, branch, function, and line coverage without lowering thresholds or excluding behavior, and keep declarative configuration outside the executable coverage surface instead of creating mirror modules.

## Dependencies And Release

- Run `bun run security:audit` after changing dependencies or the lockfile; known advisories are release blockers. `bun run security:audit` reads live OSV advisories, so a new advisory can fail it with no code change: pin the patched version with an override in `package.json` in its own change, then update waiting pull requests from `main`.
- Bun checks every new resolution against the one-day `minimumReleaseAge` in `bunfig.toml`. List a reviewed version that must land sooner in `minimumReleaseAgeExcludes`, and remove the entry once that version is a day old or leaves the lockfile.
- Unresolved review threads, automated reviewers' included, block merging: fix each verified finding or reply with evidence, then resolve the thread.
- A pull request merges by squash once its exact head, with the latest `main` merged in, passed the local quality gate in `README.md`: `gh pr merge <number> --squash --match-head-commit <sha>`.
- Do not use U+2014 in authored content, metadata, documentation, or code.
