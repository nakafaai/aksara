# Aksara

Aksara is Nakafa's trusted content compilation and publication system. It is a
small public Turborepo. The repository contains Nakafa's real `en` and `id`
source corpus: articles, materials, question banks, learning programs, try-out
catalogs, and Quran rows parsed from pinned official Tanzil and QuranEnc
artifacts. Production cutover is explicit and scope-owned: Nakafa currently
serves the article, material, question, learning-program, Quran, and try-out
scopes from signed Aksara releases. Filesystem copies of an activated scope in
Nakafa are coordinated deletion work, not another editable source of truth.

## Production scope

The article runtime ownership landed in Nakafa commit
[`4bf134519c`](https://github.com/nakafaai/nakafa.com/commit/4bf134519cb1cfb0d4181ed6d84d446afc973b9b);
release `article-family-forward-20260727-e7a29e2` from Aksara commit
[`e7a29e2c63`](https://github.com/nakafaai/aksara/commit/e7a29e2c63f2133a733c2093a6cc0268279a8721)
was accepted by production
[run `30217046243`](https://github.com/nakafaai/aksara/actions/runs/30217046243).
The initial function-concept material runtime landed in Nakafa commit
[`4df9f6a0a0`](https://github.com/nakafaai/nakafa.com/commit/4df9f6a0a0b8f7573ddb95940b00e5391c710ba1);
release `material-function-concept-canonical-final-20260728-f46e7ee` from
Aksara commit
[`f46e7ee9ef`](https://github.com/nakafaai/aksara/commit/f46e7ee9eff87ebb0a0a5857a03598d8670dace4)
was accepted by production
[run `30370321308`](https://github.com/nakafaai/aksara/actions/runs/30370321308).
Nakafa commit
[`91eef3fa7a`](https://github.com/nakafaai/nakafa.com/commit/91eef3fa7afa4fe964e350c673d0e6b9d0dc14f6)
then made the signed release the active runtime owner for the complete material
and learning-program families. Release
`material-program-family-20260731-e68ed35` from Aksara commit
[`e68ed356d4`](https://github.com/nakafaai/aksara/commit/e68ed356d4de69e2d2ce3093028c5c22032d09d8)
activated the complete reviewed scope through production
[run `30647670604`](https://github.com/nakafaai/aksara/actions/runs/30647670604).
The exact-source idempotent retry passed in
[run `30654679754`](https://github.com/nakafaai/aksara/actions/runs/30654679754),
then terminal recovery acceptance passed in
[run `30657823700`](https://github.com/nakafaai/aksara/actions/runs/30657823700)
after sitemap cache revalidation and unchanged projection proof. That acceptance
recorded sequence 20 with 764 heads, items, artifacts, and projections while
candidate, recovery, and compaction state were empty.

Nakafa commits
[`0d3df7ca07`](https://github.com/nakafaai/nakafa.com/commit/0d3df7ca072d155a020c9b0ba90cf539c4f0299a),
[`a743518173`](https://github.com/nakafaai/nakafa.com/commit/a7435181732ebf009fcf99200c72a9a395444873),
and
[`6604d6e0b3`](https://github.com/nakafaai/nakafa.com/commit/6604d6e0b3d68ce65974a8a2d5d088cd3f7b9694)
completed the signed Quran and try-out runtime boundary. Release
`quran-tryout-cutover-20260804-a48d644` from Aksara commit
[`a48d644c80`](https://github.com/nakafaai/aksara/commit/a48d644c809419c93dc247239eabba9ced519051)
activated the question family plus Quran and try-out snapshots in production
[run `30958694458`](https://github.com/nakafaai/aksara/actions/runs/30958694458).
Its retained recovery was accepted in
[run `30966405666`](https://github.com/nakafaai/aksara/actions/runs/30966405666).

Contract `0.11.0` then republished the complete six-scope corpus from Aksara
commit
[`16a7436af5`](https://github.com/nakafaai/aksara/commit/16a7436af5fb3e96d72a946dadc377541f8eecbe)
as release `full-corpus-runtime-v011-20260809-16a7436`. Production
[run `31288847248`](https://github.com/nakafaai/aksara/actions/runs/31288847248)
returned all 4,140 results with no head changes because the signed state was
already current. Its retained recovery
`recovery-full-corpus-runtime-v011-20260809-16a7436` was accepted in
[run `31290006866`](https://github.com/nakafaai/aksara/actions/runs/31290006866).

## Current modules

- `@nakafa/aksara-contracts` defines signed artifact, release, and renderer
  wire contracts.
- `@nakafa/aksara-compiler` validates trusted MDX syntax and compiles it into
  standard `function-body` output without executing it.
- `@nakafa/aksara-publisher` verifies, signs, batches, stages, and activates a
  release through injected source and target interfaces. Its strict
  authenticated HTTP target owns the client half of the publication protocol.
  It prepares real article, material, question, program, Quran, and try-out
  release data from exact Git source. A Quran replacement fails the global
  candidate before signing or publication IO unless every required source scope
  is approved. The Nakafa-owned Convex ingress, storage, and runtime adapter
  remain outside this repository and serve only explicitly activated Aksara
  scopes.
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
- `@nakafa/testing` owns shared Vitest defaults consumed by package-local test
  configs.

Every future production scope remains gated by renderer fidelity, migration,
release, rollback, provenance, and hosted acceptance. The active Quran snapshot
carries one mandatory visible attribution row and still fails closed if its
pinned provenance contract changes.

## Commands

```sh
pnpm install --frozen-lockfile
pnpm bump-deps
pnpm format
pnpm lint
pnpm security:audit
pnpm names
pnpm jsdocs
pnpm lines
pnpm boundaries
pnpm typecheck
pnpm test
pnpm build
pnpm verify:consumer
pnpm status
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

`pnpm status` reads the authoritative publication slots using publication
credentials only; it does not sign, stage, activate, or mutate a release.

Concurrent backend verification uses a task-owned Nakafa deployment through
[Convex Agent Mode](https://docs.convex.dev/cli/agent-mode), never shared
development or production. Aksara receives only that deployment's explicit
publication and renderer endpoints. When an isolated release verifies a local
HTTPS renderer, set `NODE_EXTRA_CA_CERTS` to its temporary CA certificate.
Turbo passes that trust path only to release, recover, and rollback tasks.
Never disable TLS verification for this workflow.

Run a focused workspace test through Turbo so dependency builds stay current:

```bash
pnpm exec turbo run test --filter=@nakafa/aksara-publisher
```

Do not invoke a package test script directly when it consumes another workspace;
Turbo owns that dependency build order.

`package.json` is the toolchain source for Node and pnpm in development and
GitHub Actions. Aksara does not duplicate that contract in `.npmrc`,
`.node-version`, or `.nvmrc`.

`pnpm bump-deps` updates ordinary workspace dependencies after the configured
24-hour release-age gate. It deliberately leaves Effect, TypeScript, and Node
types unchanged because those toolchain boundaries require a separately
reviewed, coordinated update.

Effect work follows the read-only workflow in
[`AGENTS.md`](AGENTS.md#vendored-references): inspect the matching
implementation and tests under `repos/effect` before writing or reviewing
code, then run `pnpm effect:source:check`. A coordinated Effect dependency
update keeps `effect`, `@effect/platform`, and `@effect/platform-node`
compatible and updates the pinned subtree only through
`pnpm effect:source:update`.

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
workspace execution and typechecking; the contracts release archive strips that
private condition.

The compiler requires one static `export const metadata = { ... }` object so it
can remove that module declaration before body compilation. Corpus registries
and publisher capabilities then validate each real family through its
authoritative schema rather than one speculative universal metadata contract.

Signed artifacts are a trusted-source seam, not a sandbox. Nakafa executes them
only for explicitly activated scopes. The accepted design keeps the official
server-only `@mdx-js/mdx/run` runtime and finite static route-domain registries
in Nakafa; each new production scope still requires hosted fidelity proof,
Nakafa-side activation, stable user-state migration, and release/rollback
gates.

The executable-content decision is recorded in
[`docs/adr/0001-content-boundary.md`](docs/adr/0001-content-boundary.md).
The immutable contracts archive is documented in
[`docs/contracts.md`](docs/contracts.md).
Measured baselines are under [`docs/baselines`](docs/baselines), and repository
controls are recorded in [`docs/governance.md`](docs/governance.md).

## License

Software is governed by the [Nakafa Source Available License 1.0](LICENSE).
The educational corpus is governed by the
[Nakafa Content License 1.0](CONTENT_LICENSE.md), subject to each third-party
source's own rights and attribution requirements. Nakafa brand usage is
governed by the [Nakafa Trademark and Brand Policy](TRADEMARKS.md).
