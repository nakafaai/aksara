# Contracts release

`@nakafa/aksara-contracts` is a normal compiled TypeScript package distributed
as one immutable GitHub Release archive. It contains schemas and verification
code, not corpus bodies, renderer implementations, signing keys, or deployment
credentials.

## Why one release archive

The contracts package has two repository consumers: Aksara and Nakafa. A remote
archive gives both repositories one immutable package boundary with generated
JavaScript, declarations, exact exports, and pnpm lockfile integrity.

An npm registry adds an unrelated namespace, authentication, bootstrap, staged
publishing, and support boundary without improving this two-repository seam.
An exact Git `#path:` dependency was also measured and rejected: pnpm fetched
and prepared the full Aksara repository, including the corpus, before selecting
the contracts subdirectory. That defeats the package's small installation
boundary.

The accepted artifact is approximately 176 KiB compressed and 2.3 MiB
unpacked. The measured exact-Git repository archive was approximately 8.3 MiB
compressed, 55 MiB unpacked, and 6,894 files before dependency preparation.

References:

- [pnpm dependency sources](https://pnpm.io/package_json#dependencies)
- [GitHub artifact attestations](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/use-artifact-attestations)
- [GitHub immutable releases](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)

## Release identity

The source version lives only in `packages/contracts/package.json`.
Version `0.1.0` produces:

```text
tag:   contracts-v0.1.0
asset: nakafa-aksara-contracts-0.1.0.tgz
```

After the first release, a changed archive must use a stable semantic version
strictly greater than the latest `contracts-v*` tag. The first release is
exactly `0.1.0`. CI builds the verified archive and compares its exact bytes
with the latest immutable release:

- identical bytes keep the existing version and publish nothing;
- different bytes require a greater version.

This byte comparison is the artifact-input contract. It automatically includes
compiled source, exports, shared compiler configuration, the Effect peer
version, README, license, package metadata, and pnpm's archive format without a
duplicated workflow path list.

An identical archive matching the latest immutable version is an unchanged
build, not a retry or a new release. The only mutable recovery case is a draft
or published mutable release targeting the exact current source SHA with a
matching tag target; it is deleted and recreated before publication. A tag
without a release, a prerelease, an immutable collision, a foreign SHA, or any
tag mismatch fails without changing that state.

## Verified archive

Run:

```sh
pnpm verify:consumer
```

The verifier builds the contracts package, copies only `dist`, `README.md`,
`LICENSE`, and a release manifest into a temporary staging directory, then
creates the archive with pnpm. The release manifest removes repository-only
source conditions, scripts, and development dependencies and replaces workspace
protocols with portable exact versions.

The same verifier installs that exact archive in a credential-free isolated
pnpm consumer, typechecks every public export with TypeScript 7, executes every
runtime export, and rejects missing files, private source targets, nested Effect
runtimes, or a mismatched license.

Consumers pin the immutable asset URL:

```json
{
  "dependencies": {
    "@nakafa/aksara-contracts": "https://github.com/nakafaai/aksara/releases/download/contracts-v0.1.0/nakafa-aksara-contracts-0.1.0.tgz"
  }
}
```

The committed pnpm lockfile records the downloaded archive integrity. The
contracts package has no registry fallback and no Git source fallback; ordinary
third-party dependencies continue to use pnpm's configured registry.

Nakafa content publication also rebuilds the contract archive from its exact
Aksara source revision before production approval. An unprivileged proof job
then requires the matching final immutable release, one exact asset, matching
version, bytes, size, SHA-256 digest, lightweight source tag, and an ancestor
source commit. It verifies the GitHub release, downloaded asset, and build
attestation before the production environment can expose publication
credentials. A missing, mutable, foreign, unattested, or byte-different release
blocks every content operation.

Terminal recovery remains independent from the full corpus gate: abort,
cleanup, and recover run only the small immutable-contract proof plus their
focused publisher and CLI checks. They do not depend on the full content build
or test suite.

## GitHub workflow

Every protected `main` revision runs `.github/workflows/contracts.yml`. The
workflow first builds the small verified contract archive and exits without a
release when its bytes equal the latest immutable archive. This avoids both
corpus publication and a brittle list of guessed archive inputs.

1. A source build job installs the frozen pnpm lockfile and builds the small
   verified archive needed for the byte decision.
2. When the archive changed, that job runs every repository gate, creates and
   verifies the build attestation, and transfers only the archive through
   GitHub Actions. Unchanged archives stop before the full release gate.
3. One tested TypeScript module parses semantic versions, validates archive
   identity, hashes the archive, and decides publication from exact bytes.
   Workflows never evaluate tag-controlled text with shell arithmetic.
4. A separate job with `contents: write` and `attestations: read` downloads and
   re-verifies those exact bytes. It never checks out source or runs pnpm,
   Node.js, or repository code.
5. It creates a draft for the exact source SHA, attaches the archive, and
   publishes the immutable release.
6. It verifies the final release, single asset, archive bytes, size, digest,
   source tag, GitHub release attestation, and build attestation.

Draft-first publication lets the workflow attach the asset before an immutable
release is published. GitHub's ordinary workflow token cannot read the
repository Administration setting, so the workflow does not pretend to
preflight it. Instead, final verification requires GitHub to report the
published release as immutable. Byte comparison considers only final immutable
contract releases. If publication fails before immutability, the mutable
same-SHA state therefore reaches the guarded publish job on retry; that job may
delete only the mutable release and tag targeting its exact source SHA. It
never deletes an immutable release or another revision's tag.

An operator independently verifies the final release and downloaded archive:

```sh
gh release verify contracts-v0.1.0 --repo nakafaai/aksara

gh release verify-asset contracts-v0.1.0 \
  nakafa-aksara-contracts-0.1.0.tgz \
  --repo nakafaai/aksara

gh attestation verify nakafa-aksara-contracts-0.1.0.tgz \
  --repo nakafaai/aksara \
  --signer-workflow nakafaai/aksara/.github/workflows/contracts.yml \
  --source-digest <exact-40-character-source-sha> \
  --source-ref refs/heads/main

gh api repos/nakafaai/aksara/git/ref/tags/contracts-v0.1.0 \
  --jq '.object.type + " " + .object.sha'

sha256sum nakafa-aksara-contracts-0.1.0.tgz
```

The tag object must be a commit at the same source SHA passed to
`--source-digest`. The local SHA-256 must equal the release asset's `digest`
field from `gh api repos/nakafaai/aksara/releases/tags/contracts-v0.1.0`.
