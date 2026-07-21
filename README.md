# Aksara

Aksara is the foundation for Nakafa's trusted content compilation and
publication system. It is a small public Turborepo. The current repository does
not own the Nakafa corpus and is not connected to the production application.

## Current modules

- `@nakafaai/aksara-contracts` defines signed artifact, release, and renderer
  wire contracts.
- `@nakafaai/aksara-compiler` validates trusted MDX syntax and compiles it into
  standard `function-body` output without executing it.
- `@nakafaai/aksara-publisher` verifies, signs, batches, stages, and activates a
  release through injected source and target interfaces. No Convex adapter is
  implemented yet.
- `@nakafaai/typescript-config` owns the single Node ESM compiler contract used
  by all three domain packages.

The corpus and CLI modules will be added only when they operate on real Nakafa
sources. This repository contains no authored educational content or substitute
fixtures.

## Commands

```sh
pnpm install
pnpm format
pnpm lint
pnpm names
pnpm boundaries
pnpm typecheck
pnpm test
pnpm build
pnpm verify:package
```

Run a focused workspace test through Turbo so dependency builds stay current:

```bash
pnpm exec turbo run test --filter=@nakafaai/aksara-publisher
```

Do not invoke a package test script directly when it consumes another workspace;
Turbo owns that dependency build order.

`package.json` is the single toolchain source for Node 24, pnpm 10.34.1, and
their CI setup. Aksara does not duplicate that contract in `.npmrc`,
`.node-version`, or `.nvmrc` files.

Package-internal TypeScript imports use private Node aliases such as
`#contracts/*`; cross-package imports use exact `@nakafaai/*` exports. Tests
resolve the current package alias to `src`, while emitted JavaScript resolves
the same alias through `package.json` to `dist`, so stale build output cannot
silently satisfy source tests.

The compiler requires one static `export const metadata = { ... }` object so it
can remove that module declaration before body compilation. It deliberately
does not define family metadata or content taxonomy before the authoritative
Nakafa contracts are migrated.

Signed artifacts are a proposed trusted-source seam, not a sandbox. Nakafa does
not execute Aksara artifacts in production yet. The accepted design keeps the
official server-only `@mdx-js/mdx/run` runtime and finite static route-domain
registries in Nakafa; production integration still requires a real vertical
slice, Convex adapter, fidelity proof, and release/rollback gates.

The executable-content decision is recorded in
[`docs/adr/0001-content-boundary.md`](docs/adr/0001-content-boundary.md).
Measured baselines are under [`docs/baselines`](docs/baselines), and repository
controls are recorded in [`docs/governance.md`](docs/governance.md).

## License

Software is governed by the [Nakafa Source Available License 1.0](LICENSE).
Future educational corpus imports remain governed by the
[Nakafa Content License 1.0](CONTENT_LICENSE.md). Nakafa brand usage is governed
by the [Nakafa Trademark and Brand Policy](TRADEMARKS.md).
