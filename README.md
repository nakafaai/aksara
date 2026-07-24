# Aksara

Aksara is Nakafa's trusted content compilation and publication system. It is a
small public Turborepo. The repository contains Nakafa's real `en` and `id`
source corpus: articles, materials, question banks, learning programs, try-out
catalogs, and the Quran data carried forward from the public Nakafa repository.
The unresolved Quran redistribution rights are recorded explicitly below; Git
visibility is not evidence of permission. Nakafa production has not cut over to
this source yet.

## Current modules

- `@nakafa/aksara-contracts` defines signed artifact, release, and renderer
  wire contracts.
- `@nakafa/aksara-compiler` validates trusted MDX syntax and compiles it into
  standard `function-body` output without executing it.
- `@nakafa/aksara-publisher` verifies, signs, batches, stages, and activates a
  release through injected source and target interfaces. Its strict
  authenticated HTTP target owns the client half of the publication protocol.
  It prepares real article, material, question, program, Quran, and try-out
  release data from exact Git source. A blocked Quran replacement fails the
  global candidate before signing or publication IO; a release can proceed only
  when it inherits unchanged Quran state or every required provenance approval
  is present. The Nakafa-owned Convex ingress, storage, and runtime adapter
  remain outside this repository and have not been cut over to production.
- `@nakafa/aksara-corpus` contains all reviewed `en` and `id` sources plus
  their non-React registries and projections. No substitute lessons or React
  implementations live in this package.
- `@nakafa/aksara-cli` compiles the dependency closure of one selected real
  document, serves its signed local artifacts over loopback, and starts a
  preview-enabled sibling Nakafa checkout with ephemeral credentials.
- `@nakafa/aksara-utilities` owns generic bounded byte, Git, HTTP, process, and
  TypeScript-syntax primitives shared across packages. It contains no
  content-domain contracts.
- `@nakafa/typescript-config` owns the single Node ESM compiler contract used
  by the domain packages.

Production activation remains gated by renderer fidelity, migration, release,
rollback, and provenance checks. Quran publication is explicitly blocked until
every source scope has approved provenance and required attribution.

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
pnpm status
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

`pnpm status` reads the authoritative publication slots using publication
credentials only; it does not sign, stage, activate, or mutate a release.

Run a focused workspace test through Turbo so dependency builds stay current:

```bash
pnpm exec turbo run test --filter=@nakafa/aksara-publisher
```

Do not invoke a package test script directly when it consumes another workspace;
Turbo owns that dependency build order.

`package.json` is the local-development and ordinary-CI toolchain source for
Node and pnpm. Privileged publishing workflows intentionally pin concrete
reviewed versions so repository dependency changes cannot select their
executables. Aksara does not duplicate the local contract in `.npmrc`,
`.node-version`, or `.nvmrc` files.

All non-MDX hand-written executable source and repository tooling is
TypeScript. The file-name gate rejects tracked JavaScript source. `dist/*.js`
is ignored, generated output because Node does not execute TypeScript source
from an installed `node_modules` package, as documented by Node's
[TypeScript support](https://nodejs.org/api/typescript.html#type-stripping-in-dependencies).
The native `tsc` command is TypeScript 7. The separately named `typescript`
dependency remains the TypeScript 6 JavaScript compiler API required by
programmatic consumers; it is not Aksara's CLI compiler.

Package-internal TypeScript imports use private Node aliases such as
`#contracts/*`; cross-package imports use exact `@nakafa/*` exports. Tests
resolve the current package alias to `src`, while emitted JavaScript resolves
the same alias through `package.json` to `dist`, so stale build output cannot
silently satisfy source tests. The `aksara-source` condition is confined to
workspace execution and typechecking; the published contracts manifest strips
that private condition.

The compiler requires one static `export const metadata = { ... }` object so it
can remove that module declaration before body compilation. Corpus registries
and publisher capabilities then validate each real family through its
authoritative schema rather than one speculative universal metadata contract.

Signed artifacts are a trusted-source seam, not a sandbox. Nakafa does not
execute Aksara artifacts in production yet. The accepted design keeps the
official server-only `@mdx-js/mdx/run` runtime and finite static route-domain
registries in Nakafa; production integration still requires the hosted
fidelity proof, Nakafa-side activation, stable user-state migration, and
release/rollback gates.

The executable-content decision is recorded in
[`docs/adr/0001-content-boundary.md`](docs/adr/0001-content-boundary.md).
Measured baselines are under [`docs/baselines`](docs/baselines), and repository
controls are recorded in [`docs/governance.md`](docs/governance.md).

## License

Software is governed by the [Nakafa Source Available License 1.0](LICENSE).
The educational corpus is governed by the
[Nakafa Content License 1.0](CONTENT_LICENSE.md), subject to each third-party
source's own rights and attribution requirements. Nakafa brand usage is
governed by the [Nakafa Trademark and Brand Policy](TRADEMARKS.md).
