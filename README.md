# Aksara

Aksara is Nakafa's trusted content authoring, compilation, and publication
system. It owns reviewed source content, compiles trusted MDX ahead of time,
signs immutable artifacts and releases, and publishes them through a recoverable
protocol.

Nakafa owns product presentation and renderer implementations. Aksara owns the
authored corpus and signed publication. Neither repository keeps a second
editable copy of content that the other repository owns.

## What lives here

- `packages/corpus` contains reviewed articles, lessons, public pages, the
  assessment item bank and its try-out exams, program data, and Quran sources. English, Indonesian,
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

The body families are `article`, `material`, and `page`. Assessment, program,
and Quran data use structured snapshots under the same global release.
The generic `page` family owns public site documents, including legal pages,
without creating a second legal-only publication protocol.

Production state is not copied into this README. Read the authoritative release
slots with:

```sh
bun run status
```

That command is read-only. It does not sign, stage, activate, or delete
anything.

## Trust model

Aksara MDX is reviewed executable source. It is not a sandbox or an upload
format for untrusted users.

Before Nakafa executes an artifact, the runtime verifies its signed release,
artifact signature, hashes, delivery policy, projection, and renderer manifest.
A release that changes the renderer must prove the complete corpus and bind the
exact deployed manifest. A scoped content-only release may retain the active
frozen manifest only while pre-activation proves the live renderer is a
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
- [`docs/scope.md`](docs/scope.md) for canonical release
  scopes.
- [`docs/contracts.md`](docs/contracts.md) for the immutable contracts archive.
- [`docs/governance.md`](docs/governance.md) for repository and release
  controls.

## Requirements

- Node 26
- Bun 1.4.4

The exact supported runtime and package-manager versions live in
[`package.json`](package.json). Install the frozen workspace from the repository
root:

```sh
bun install --frozen-lockfile
```

Bun does not enforce the `engines` or `devEngines` fields, so a local install
on another Node.js major succeeds without an error. CI selects Node.js from
`package.json` through `actions/setup-node`; a local checkout must run Node 26
itself.

## Development

Run the local quality gate on each pull request's exact head. It runs the checks
that GitHub Actions CI used to run. The contract archive identity,
`packages/contracts/scripts/release/command.ts describe` and `decide`, needs
GitHub release data, so `contracts.yml` checks it on `main` instead.

```sh
bun run format
bun run lint
bun run deprecations
bun run names
bun run jsdocs
bun run lines
bun run boundaries
bun run locales
bun run points
bun run workflows
bun run native
bun run typecheck
bun run test
bun run build
bun run verify:consumer
bun run security:audit
```

Preview one real document through a sibling Nakafa checkout:

```sh
bun run dev -- --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
```

Preview a German application shell while preserving the language being
assessed:

```sh
bun run dev -- --document packages/corpus/question-bank/tryout/indonesia/snbt/literacy-in-english/set-1/question-1/question.en.mdx --app-locale de
```

The selected prompt and response options remain in the assessed language. The
shell and worked answer use the selected application locale.

Run a focused workspace test through Turbo so dependency builds are current:

```sh
bunx turbo run test --filter=@nakafa/aksara-publisher
```

Do not run a package test directly when it consumes another workspace. Turbo
owns that build order.

## Publication

Every authored body and question projection records `datePublished`. Add
`dateModified` only when reviewed authored meaning changes after publication;
it must be later than `datePublished`. Repository and Git history remain the
provenance record, while these fields provide consistent publication metadata
to every consumer.

Creating a production release requires an explicit canonical scope. Recovery,
acceptance, status, and cleanup use the recorded release identity. For example:

```sh
bun run release -- \
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

The first release of a new content contract generation replaces a base that
the new renderer cannot read, so no inverse can protect it. Such a release
names the retired active release with `--bootstrap-over <active-release-id>`
in place of `--recovery-id`, and it selects every family and snapshot because
it must replace every head. A live renderer change must be closed by that
scope, or the command refuses before any write. It takes one target and has no
accept or recover step. The switch is one way: the retired generation is never
restored. See [`docs/adr/release.md`](docs/adr/release.md).

Production publication runs from an exact Git revision after the contracts
archive, renderer, corpus, provenance, rollback, and target gates pass. It does
not compile mutable working-tree bytes.

The protected `release.yml` workflow publishes and accepts from that revision.
Its `target` input is `production` (the default), `development`, or `both`.
Production alone is a complete release: it publishes, verifies, and is accepted
without waiting for development. Development alone is a catch-up that publishes
the same release identity to the development deployment later. `both` runs the
two targets side by side and adds the parity gate described below. One shared
verification job finishes before any publication job receives credentials. A
failed target does not cancel its peer. Inspect each durable state before
rerunning the same release identity at its exact original revision. Resume
rejects a different revision. Recovery, abort, and cleanup take exactly one
target. A production release or recovery that changes content runs Nakafa's
deploy workflow with the deploy app's installation token, so the site
prerenders the active release; development deploys nothing. Credentials are
selected by target key with no value fallback.

A catch-up publishes the revision of `main` that the workflow is dispatched
from, so dispatch it while `main` is still at the revision of the production
release when the two must match. Select every family and snapshot in which
development still differs from production, because a release keeps the base
state of each family and snapshot it does not select. Accept the retained
inverse of any earlier development release first, because a retained inverse
blocks a new candidate. Accept a release to one target with a dispatch for that
same target.

The read-only `bun run parity -- --release-id <id> --recovery-id <id>` command
verifies both active signatures, source revision, locales, frozen renderer,
complete result catalog digest, and every snapshot result identity. The workflow
runs it only when `both` is selected: after the paired release and acceptance,
and before either acceptance mutation. A partial-scope release with inherited
drift therefore fails the workflow. Signed manifest hashes may differ because
each manifest binds its own base history. Accept both only after rendered
acceptance is verified; the workflow enforces content parity before releasing
either inverse. The targets activate independently; a failed workflow is not
evidence of cross-target atomicity or completed parity. After a catch-up, run
the same command by hand with the same identities to prove that the two
deployments hold the same content.

Concurrent backend verification uses a task-owned Nakafa deployment through
[Convex Agent Mode](https://docs.convex.dev/cli/agent-mode), never a shared
development or production deployment. Local HTTPS renderer verification may
use `NODE_EXTRA_CA_CERTS` for its temporary certificate. Never disable TLS
verification.

The contracts package is published as `@nakafa/aksara-contracts` through npm
trusted publishing with provenance. Consumers pin the exact npm version and its
integrity in their lockfile. An immutable GitHub Release retains the same
attested archive for independent byte and source verification.

## Toolchain notes

- TypeScript 7 provides the repository CLI compiler and native AST API.
  Source inspection uses scoped native compiler snapshots. The compiler,
  unstable API, and Effect patch are pinned and upgraded together.
- Effect work uses the version-matched read-only source under `repos/effect`.
  Run `bun run effect:source:check` before review. Update that subtree only through
  `bun run effect:source:update` as part of an approved dependency cohort.
- Package-internal imports use private aliases such as `#contracts/*`.
  Cross-package imports use exact `@nakafa/*` exports.
- Generated `dist` output is ignored. Source tests resolve package aliases to
  `src`, while isolated consumer verification installs the packed archive.

## License

Aksara is source available, not open source: it is public so that anyone can
read and audit it, not so that anyone can copy, fork, publish, rebrand, or gain
from it. Software is governed by the
[Nakafa Source Available License 2.0](LICENSE). Educational content is governed
by the [Nakafa Content License 2.0](CONTENT_LICENSE.md), which reserves text and
data mining and AI training, subject to third-party rights. Nakafa brand usage
is governed by the [Nakafa Trademark and Brand Policy 2.0](TRADEMARKS.md).
