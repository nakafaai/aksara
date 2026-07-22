# Contracts package publishing

`@nakafa/aksara-contracts` is intended to be Aksara's only public npm package.
It is not published today. It contains schemas and verification code, not
corpus bodies or renderer implementations.

## Exact package artifact

The workspace uses pnpm catalogs, while published packages require ordinary
semver dependency values. The publish artifact is therefore the exact tarball
produced by `pnpm pack`, which rewrites catalog protocols. Publication must
never run against the workspace directory.

Run:

```sh
pnpm verify:package
```

The gate performs a clean build, creates one tarball, rejects remaining
`catalog:` or `workspace:` protocols, verifies the README, custom-license
metadata, and exact included `LICENSE`, installs the tarball with the
repository's pinned pnpm outside the workspace and without credentials,
typechecks the external consumer, and loads every exact export condition.

The eventual trusted workflow must stage that already-verified exact tarball
with pnpm's native staged-publishing command:

```sh
pnpm stage publish ./path/to/nakafa-aksara-contracts-<version>.tgz
```

The checked-in `publish.yml` workflow preserves the tarball produced by the
isolated package verifier and stages that same file. It validates the returned
stage UUID and prints that exact ID, package version, and tarball digest in the
workflow summary. Its verification job has
`contents: read` but cannot request an OIDC token. Both jobs use the same static,
reviewed Node and pnpm versions; repository code cannot select executables for
the privileged job. Verification records the tarball SHA-256 digest and
transfers the tarball as a one-day workflow artifact. The separate staging job
checks that digest, checks out no repository code, installs no dependencies,
and alone receives `id-token: write` through the protected
`content-production` environment. It also requires the exact package identity,
rejects a tarball-controlled registry, and pins both the default registry and
the `@nakafa` scoped registry to `https://registry.npmjs.org/`. Both jobs run
only from protected `main`.

Direct publication may use `pnpm publish <exact-tarball>` only after the
release policy explicitly permits it. A content or application release must
never select a contracts version that has not completed this package gate.

The repository is pinned to pnpm 11.15.1 for native publishing and `pnpm stage`
support. Its first frozen install correctly rejected dependencies younger than
pnpm's default 24-hour minimum release age. That supply-chain gate was not
bypassed. The lockfile was rebuilt through pnpm after the manifests stabilized,
so resolution selected the newest eligible releases rather than the quarantined
versions. A second frozen install passed the policy. No repository command may
invoke the npm CLI as a workaround.

Effect Platform brings the optional `msgpackr-extract` install script. Aksara
explicitly denies that script through pnpm's `allowBuilds` policy; the signed
platform prebuild remains available and its native-acceleration probe passes.
This keeps installs deterministic without granting an unnecessary dependency
script execution capability.

## Bootstrap state

Npm identities, scope permissions, package availability, and 2FA policy are
external state and must never be inferred from repository documentation. At
bootstrap time, an operator must verify the current pnpm-authenticated identity,
confirm that it may publish public packages under `@nakafa`, confirm the scope's
current 2FA policy, and confirm that the selected package version is absent.
Stop before publication if any check fails. Trusted publishing can be configured
only after the first package version exists, so the bootstrap publication must
use the verified exact tarball and complete the scope's required npm 2FA without
exposing a token.

After the pnpm upgrade and package bootstrap, configure a package-scoped GitHub
Actions trusted publisher on a GitHub-hosted runner. Give the publish job
`id-token: write`, do not set a write token or grant repository contents, and
restrict the package to `publish.yml`, the `content-production` environment,
and staged publishing only. The selected pnpm release must implement the
registry's OIDC token exchange and provenance flow directly. The registry
automatically attaches provenance to a public package published with OIDC from
a public repository.

OIDC may stage but cannot approve a package. After reviewing the workflow
summary and the staged tarball, a package owner must approve the exact stage ID
through npmjs.com or `pnpm stage approve <stage-id>` and complete npm 2FA. This
proof-of-presence step is intentionally outside GitHub Actions; no workflow
secret or permanent registry token may automate it.

After approval, dispatch `package-proof.yml` from the exact staged Aksara commit
with the package version, integrity, and SHA printed by the staging workflow.
The proof downloads the exact registry tarball and attestations, verifies their
Sigstore signatures and SLSA identity with the pinned upstream verifier, then
checks the verified provenance subject, repository, workflow, main ref, hosted
runner, and resolved Git commit. A stale source SHA is rejected even if that
older package is authentic. A package is not available to Nakafa until this
proof succeeds.

After the proof succeeds, a normal reviewed pull request changes
`.changeset/bootstrap.json` from `false` to `true`. That source-controlled marker
is the only switch for version automation; transient registry failures can
therefore never disable the Changeset gate. It must not be changed based only
on package existence.

After the initial `0.1.0` package exists, every contracts change carries a
Changeset. `version.yml` uses the official Changesets action only to create or
update a ready version pull request through GitHub's API. It never publishes,
never receives an npm token, and remains inactive before bootstrap.

References:

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [npm staged publishing](https://docs.npmjs.com/staged-publishing/)
- [GitHub OIDC permissions](https://docs.github.com/en/actions/reference/security/oidc#workflow-permissions-for-the-requesting-the-oidc-token)
- [GitHub workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
- [pnpm staged publishing](https://pnpm.io/cli/stage)
- [pnpm native publishing](https://pnpm.io/cli/publish)
- [publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)
