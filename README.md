# Aksara

Aksara is Nakafa's trusted content authoring, compilation, and publication
system. It owns reviewed source content, compiles trusted MDX ahead of time,
signs immutable artifacts and releases, and publishes them through a recoverable
protocol.

Nakafa owns product presentation and renderer implementations. Aksara owns the
authored corpus and signed publication. Neither repository keeps a second
editable copy of content that the other repository owns.

## What lives here

- `packages/corpus` contains reviewed articles, lessons, questions, public
  pages, program data, try-out data, and Quran sources. English, Indonesian,
  and German are active authoring and publication locales under the same
  locale-equivalent review model.
- `packages/contracts` defines the signed wire formats shared with Nakafa.
- `packages/compiler` validates trusted MDX and produces standard
  `function-body` output without executing the document.
- `packages/publisher` prepares, signs, stages, verifies, activates, recovers,
  and cleans releases through injected source and target interfaces.
- `apps/cli` provides preview and production publication commands.
- `packages/utilities` contains generic bounded byte, Git, HTTP, process, and
  TypeScript primitives. It does not own content-domain policy.
- `packages/testing` and `packages/typescript-config` own shared repository
  test and compiler configuration.

The body families are `article`, `material`, `page`, and `question`. Program,
Quran, and try-out data use structured snapshots under the same global release.
The generic `page` family owns public site documents, including legal pages,
without creating a second legal-only publication protocol.

Production state is not copied into this README. Read the authoritative release
slots with:

```sh
pnpm status
```

That command is read-only. It does not sign, stage, activate, or delete
anything.

## Trust model

Aksara MDX is reviewed executable source. It is not a sandbox or an upload
format for untrusted users.

Before Nakafa executes an artifact, the runtime verifies its signed release,
artifact signature, hashes, delivery policy, projection, and renderer support.
A release that adopts a renderer change must prove the complete corpus and bind
the exact deployed manifest. A scoped content-only release may retain the
active frozen manifest only while pre-activation proves the live renderer is a
compatible superset. Runtime reads independently prove the selected artifact
against the live renderer when its hash differs from the frozen manifest.

The release protocol keeps an invisible candidate and a verified signed
recovery before one atomic activation. Acceptance deliberately removes a
healthy recovery. Recovery activates a signed forward inverse. Process memory
and workflow status are never authoritative release state.

See:

- [`docs/adr/content.md`](docs/adr/content.md) for
  trusted MDX and renderer boundaries.
- [`docs/adr/release.md`](docs/adr/release.md) for release,
  compatibility, recovery, and cleanup rules.
- [`docs/publication-scope.md`](docs/publication-scope.md) for canonical release
  scopes.
- [`docs/contracts.md`](docs/contracts.md) for the immutable contracts archive.
- [`docs/governance.md`](docs/governance.md) for repository and release
  controls.

## Requirements

- Node 24
- pnpm 11.25.0 through Corepack

The exact supported runtime and package-manager versions live in
[`package.json`](package.json). Install the frozen workspace from the repository
root:

```sh
corepack enable
pnpm install --frozen-lockfile
```

## Development

Run the complete local quality gate:

```sh
pnpm format
pnpm lint
pnpm names
pnpm jsdocs
pnpm lines
pnpm boundaries
pnpm locales
pnpm workflows
pnpm typecheck
pnpm test
pnpm build
pnpm verify:consumer
pnpm security:audit
```

Preview one real document through a sibling Nakafa checkout:

```sh
pnpm dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Preview a German application shell while preserving the language being
assessed:

```sh
pnpm dev -- --document packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/question.en.mdx --app-locale de
```

The selected prompt and response options remain in the assessed language. The
shell and worked answer use the selected application locale.

Run a focused workspace test through Turbo so dependency builds are current:

```sh
pnpm exec turbo run test --filter=@nakafa/aksara-publisher
```

Do not run a package test directly when it consumes another workspace. Turbo
owns that build order.

## Publication

Every authored body and question projection records `datePublished`. Add
`dateModified` only when reviewed authored meaning changes after publication;
it must be later than `datePublished`. Repository and Git history remain the
provenance record, while these fields provide consistent publication metadata
to every consumer.

Every production operation uses an explicit canonical scope. For example:

```sh
pnpm release -- \
  --release-id release-2026-08-20 \
  --recovery-id recovery-2026-08-20 \
  --scope family:article \
  --scope family:material \
  --scope family:page \
  --scope family:question \
  --scope snapshot:program \
  --scope snapshot:quran \
  --scope snapshot:tryout
```

The first production activation that adds a locale must select every body and
structured snapshot family. One global release owns the complete locale set,
so a page-only release cannot safely move production from English and
Indonesian to English, Indonesian, and German.

Production publication runs from an exact Git revision after the contracts
archive, renderer, corpus, provenance, rollback, and target gates pass. It does
not compile mutable working-tree bytes.

Concurrent backend verification uses a task-owned Nakafa deployment through
[Convex Agent Mode](https://docs.convex.dev/cli/agent-mode), never a shared
development or production deployment. Local HTTPS renderer verification may
use `NODE_EXTRA_CA_CERTS` for its temporary certificate. Never disable TLS
verification.

The contracts package is published as `@nakafa/aksara-contracts` through npm
trusted publishing with provenance. Consumers pin the exact npm version and
pnpm integrity in their lockfile. An immutable GitHub Release retains the same
attested archive for independent byte and source verification.

## Toolchain notes

- TypeScript 7 is the repository CLI compiler. TypeScript 6 remains installed
  under its package name for programmatic consumers that still require the
  JavaScript compiler API.
- Effect work uses the version-matched read-only source under `repos/effect`.
  Run `pnpm effect:source:check` before review. Update that subtree only through
  `pnpm effect:source:update` as part of an approved dependency cohort.
- Package-internal imports use private aliases such as `#contracts/*`.
  Cross-package imports use exact `@nakafa/*` exports.
- Generated `dist` output is ignored. Source tests resolve package aliases to
  `src`, while isolated consumer verification installs the packed archive.

## License

Software is governed by the [Nakafa Source Available License 1.0](LICENSE).
Educational content is governed by the
[Nakafa Content License 1.0](CONTENT_LICENSE.md), subject to third-party rights
and attribution. Nakafa brand usage is governed by the
[Nakafa Trademark and Brand Policy](TRADEMARKS.md).
