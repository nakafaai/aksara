# Aksara

Aksara is Nakafa's trusted content compilation and publication system. It is a
small public Turborepo. The repository currently owns only the real bilingual
Function Concept vertical slice; it is not connected to Nakafa production yet.

## Current modules

- `@nakafaai/aksara-contracts` defines signed artifact, release, and renderer
  wire contracts.
- `@nakafaai/aksara-compiler` validates trusted MDX syntax and compiles it into
  standard `function-body` output without executing it.
- `@nakafaai/aksara-publisher` verifies, signs, batches, stages, and activates a
  release through injected source and target interfaces. It prepares the real
  material slice from AST-decoded MDX metadata. No Convex adapter is implemented
  yet.
- `@nakafaai/aksara-corpus` owns the reviewed Function Concept `en` and `id`
  sources plus their non-React source registry. No substitute lessons or React
  implementations live in this package.
- `@nakafaai/typescript-config` owns the single Node ESM compiler contract used
  by the domain packages.

The CLI will be added only with the actual Nakafa preview caller. Further corpus
families remain gated by provenance and renderer-fidelity checks.

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
```

Run a focused workspace test through Turbo so dependency builds stay current:

```bash
pnpm exec turbo run test --filter=@nakafaai/aksara-publisher
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
