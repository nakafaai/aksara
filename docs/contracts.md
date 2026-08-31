# Contracts release

`@nakafa/aksara-contracts` is the public compiled TypeScript package for the
runtime schemas and verification code shared by Aksara and Nakafa. It contains
no corpus bodies, renderer implementations, signing keys, or deployment
credentials.

The package has one production identity and two verified representations:

```text
npm:   @nakafa/aksara-contracts@<version>
tag:   @nakafa/aksara-contracts@<version>
asset: nakafa-aksara-contracts-<version>.tgz
```

npm is the consumer distribution channel. The immutable GitHub Release asset
is the independently attested archive used for byte comparison, release
recovery, and supply-chain verification. Consumers use an exact npm version and
commit its pnpm lockfile integrity. They do not depend on a raw GitHub archive
URL or Git source.

## Release identity

The source version lives only in `packages/contracts/package.json`. It must be a
stable semantic version. CI builds the exact package archive and compares its
bytes with the newest final immutable release asset:

- identical bytes keep the current version and publish nothing;
- different bytes require a strictly greater version;
- an existing npm name and version must contain the same archive bytes;
- a tag, release, registry entry, or attestation owned by different bytes or a
  different source commit fails closed.

The identity tool discovers historical versions from their immutable archive
asset names instead of assuming one tag prefix. Releases named
`contracts-v<version>` remain immutable history. New releases use the scoped
package tag shown above. Historical tag discovery is release-ledger support,
not a runtime compatibility interface.

The byte comparison automatically covers compiled source, exports, compiler
configuration, Effect compatibility, README, license, package metadata, and
pnpm archive format without a duplicated workflow path list.

## Verified package

Run:

```sh
pnpm verify:consumer
```

The verifier builds the contracts package, copies only `dist`, `README.md`,
`LICENSE`, and a release manifest into a temporary staging directory, then
creates the archive with pnpm. The release manifest removes repository-only
source conditions, scripts, and development dependencies and replaces
workspace protocols with portable exact versions.

The same verifier installs that exact archive in a credential-free isolated
pnpm consumer, typechecks every public export with TypeScript 7, executes every
runtime export, and rejects missing files, private source targets, nested Effect
runtimes, or a mismatched license.

Nakafa content publication separately rebuilds the contract archive from its
exact Aksara source revision. An unprivileged proof job requires the matching
final immutable release, archive bytes, version, size, SHA-256 digest,
lightweight source tag, ancestor source commit, GitHub attestation, and npm
package identity before production publication can proceed.

Terminal recovery remains independent from the full corpus gate. Abort,
cleanup, and recover run only the immutable-contract proof plus their focused
publisher and CLI checks. They do not depend on the full content build or test
suite.

## Trusted publication

Every protected `main` revision runs `.github/workflows/contracts.yml`. The
workflow follows the npm trusted-publisher requirements documented in
[Trusted publishing](https://docs.npmjs.com/trusted-publishers/) and
[Generating provenance statements](https://docs.npmjs.com/generating-provenance-statements/).
It does not use an npm access token.

1. `build` checks out the exact source revision, installs the frozen lockfile,
   builds and verifies the package, runs every repository gate when bytes
   changed, builds the standalone provenance verifier, and attests both
   transported artifacts.
2. `publish` runs only from protected `main` in the `npm-production`
   environment. It downloads the attested archive, verifies its digest and
   size, creates a same-SHA draft GitHub Release, and publishes the archive with
   the pinned npm CLI, OIDC, public access, ignored lifecycle scripts, and npm
   provenance.
3. `verify` has no permissions and no OIDC identity. It reads the public npm
   metadata, proves exact shasum and integrity, installs the exact package, runs
   `npm audit signatures --include-attestations`, and checks provenance against
   this repository, workflow, branch, commit, and environment.
4. `finalize` publishes the draft GitHub Release only after npm publication and
   independent verification succeed. It then proves immutable release state,
   the single asset, digest, size, tag target, GitHub release signature, and
   artifact attestation.

The `npm-production` environment allows only protected branches, requires the
repository owner review, has no wait timer, and disallows administrator bypass.
Readiness is evidence based. There is no fixed quiet window.

The jobs are intentionally direct in `contracts.yml`. npm trusted-publisher
identity includes the configured workflow filename, and reusable workflows can
change which caller identity npm validates. A shared publication workflow may
be introduced only after the trusted-publisher identity is proven for that
design.

## Idempotence and recovery

An unchanged archive exits before publication. A rerun may delete and recreate
only a mutable draft and lightweight tag that target the exact current source
SHA. It never deletes an immutable release, another revision's tag, or an npm
package version. npm package versions are immutable, so an existing version
with different bytes is a hard failure.

GitHub's ordinary workflow token cannot read the repository Administration
setting for immutable releases. The workflow therefore proves that the final
release is immutable instead of claiming an impossible preflight.

## Operator verification

Derive the release identity from package metadata, then verify both public
representations:

```sh
CONTRACT_VERSION="$(jq -r .version packages/contracts/package.json)"
CONTRACT_PACKAGE="@nakafa/aksara-contracts"
CONTRACT_SPECIFIER="${CONTRACT_PACKAGE}@${CONTRACT_VERSION}"
CONTRACT_TAG="${CONTRACT_SPECIFIER}"
CONTRACT_ASSET="nakafa-aksara-contracts-${CONTRACT_VERSION}.tgz"

npm view "$CONTRACT_SPECIFIER" \
  name version dist.shasum dist.integrity dist.attestations --json

VERIFY_ROOT="$(mktemp -d)"
(
  cd "$VERIFY_ROOT"
  npm init --yes >/dev/null
  npm install --save-exact --ignore-scripts --no-audit --no-fund \
    "$CONTRACT_SPECIFIER"
  npm audit signatures --include-attestations
)
rm -r -- "$VERIFY_ROOT"

gh release download "$CONTRACT_TAG" \
  --pattern "$CONTRACT_ASSET" \
  --repo nakafaai/aksara

gh release verify "$CONTRACT_TAG" --repo nakafaai/aksara

gh release verify-asset "$CONTRACT_TAG" \
  "$CONTRACT_ASSET" \
  --repo nakafaai/aksara

gh attestation verify "$CONTRACT_ASSET" \
  --repo nakafaai/aksara \
  --signer-workflow nakafaai/aksara/.github/workflows/contracts.yml \
  --source-digest <exact-40-character-source-sha> \
  --source-ref refs/heads/main

gh api "repos/nakafaai/aksara/git/ref/tags/${CONTRACT_TAG}" \
  --jq '.object.type + " " + .object.sha'

sha256sum "$CONTRACT_ASSET"
```

Run `npm audit signatures --include-attestations` from a temporary consumer
that installs the exact package when verifying a newly published version. The
tag object must be a commit at the same source SHA passed to
`--source-digest`. The local SHA-256 must equal the GitHub release asset digest,
and npm integrity must match the same archive bytes.

References:

- [npm trusted publishers](https://docs.npmjs.com/trusted-publishers/)
- [npm provenance](https://docs.npmjs.com/generating-provenance-statements/)
- [pnpm dependency sources](https://pnpm.io/package_json#dependencies)
- [GitHub artifact attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations)
- [GitHub immutable releases](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)
