# Aksara

Aksara is Nakafa's trusted content compilation and publication system. It is a
small public Turborepo. The repository currently owns only the real bilingual
Function Concept vertical slice; it is not connected to Nakafa production yet.

## Current modules

- `@nakafa/aksara-contracts` defines signed artifact, release, and renderer
  wire contracts.
- `@nakafa/aksara-compiler` validates trusted MDX syntax and compiles it into
  standard `function-body` output without executing it.
- `@nakafa/aksara-publisher` verifies, signs, batches, stages, and activates a
  release through injected source and target interfaces. Its strict
  authenticated HTTP target owns the client half of the publication protocol.
  It prepares the real material slice from AST-decoded MDX metadata. The
  Nakafa-owned Convex ingress, storage, and runtime adapter remain outside this
  repository and have not been cut over to production.
- `@nakafa/aksara-corpus` owns the reviewed Function Concept `en` and `id`
  sources plus their non-React source registry. No substitute lessons or React
  implementations live in this package.
- `@nakafa/aksara-cli` compiles one selected real document, serves its signed
  local artifact over loopback, and starts the actual Nakafa application with
  ephemeral credentials for hot preview.
- `@nakafa/typescript-config` owns the single Node ESM compiler contract used
  by the domain packages.

Further corpus families remain gated by provenance and renderer-fidelity
checks.

## Commands

```sh
pnpm install
pnpm format
pnpm lint
pnpm names
pnpm jsdocs
pnpm lines
pnpm boundaries
pnpm typecheck
pnpm test
pnpm build
pnpm verify:package
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx
```

Run a focused workspace test through Turbo so dependency builds stay current:

```bash
pnpm exec turbo run test --filter=@nakafa/aksara-publisher
```

Do not invoke a package test script directly when it consumes another workspace;
Turbo owns that dependency build order.

`package.json` is the single toolchain source for Node, pnpm, and their CI
setup. Aksara does not duplicate that contract in `.npmrc`,
`.node-version`, or `.nvmrc` files.

All hand-written executable source and repository tooling is TypeScript. The
file-name gate rejects tracked JavaScript source. `dist/*.js` is ignored,
generated output because Node does not execute TypeScript source from an
installed `node_modules` package, as documented by Node's
[TypeScript support](https://nodejs.org/api/typescript.html#type-stripping-in-dependencies).

Package-internal TypeScript imports use private Node aliases such as
`#contracts/*`; cross-package imports use exact `@nakafa/*` exports. Tests
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
registries in Nakafa; production integration still requires the hosted
vertical-slice fidelity proof, Nakafa-side activation, and release/rollback
gates.

The executable-content decision is recorded in
[`docs/adr/0001-content-boundary.md`](docs/adr/0001-content-boundary.md).
Measured baselines are under [`docs/baselines`](docs/baselines), and repository
controls are recorded in [`docs/governance.md`](docs/governance.md).

## License

Software is governed by the [Nakafa Source Available License 1.0](LICENSE).
Future educational corpus imports remain governed by the
[Nakafa Content License 1.0](CONTENT_LICENSE.md). Nakafa brand usage is governed
by the [Nakafa Trademark and Brand Policy](TRADEMARKS.md).
