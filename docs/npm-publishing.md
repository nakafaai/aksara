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

After the one-time package bootstrap, the trusted workflow stages that
already-verified exact tarball with pnpm's native staged-publishing command:

```sh
pnpm stage publish ./path/to/nakafa-aksara-contracts-<version>.tgz
```

The checked-in `publish.yml` steady-state workflow preserves the tarball
produced by the isolated package verifier and stages that same file. It refuses
to run until bootstrap is complete and the one-time workflow is deleted. It
validates the returned stage UUID and prints that exact ID, package version,
and tarball digest in the workflow summary. Its verification job has
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

Direct publication is permitted only for the one-time `0.1.0` bootstrap flow
below. A content or application release must never select a contracts version
that has not completed its applicable package proof.

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

Npm staged publishing cannot create a new package, and a trusted publisher
cannot be configured until the package exists. The initial `0.1.0` therefore
uses the one-time `bootstrap.yml` workflow. It does not create a placeholder
version, reuse an application release, or silently omit provenance.

Npm identities, scope permissions, package availability, and 2FA policy are
external state and must never be inferred from repository documentation. Before
dispatching bootstrap, an operator must verify the current pnpm-authenticated
identity, confirm public-package permission for `@nakafa`, confirm 2FA, and
confirm that `@nakafa/aksara-contracts@0.1.0` is absent. The operator then
creates the shortest-lived granular token allowed for the `@nakafa` scope with
read/write and bypass-2FA enabled, and stores it only as the protected
`content-production` environment secret `NPM_BOOTSTRAP_TOKEN`. This exception
exists solely because npm requires an existing package before tokenless trusted
publishing can be configured.

The unprivileged bootstrap job checks the source-controlled marker and exact
`0.1.0` version, runs every repository gate, builds the isolated package, records
its SHA-256 and sha512 integrity, and uploads the exact tarball for one day. It
cannot read the token or mint an OIDC identity. A maintainer reviews that
evidence before approving the protected publish job.

The privileged job checks out no repository code and installs no package
dependencies. It verifies the transferred tarball, publishes that exact file
once with pnpm, `--provenance`, `--ignore-scripts`, and a GitHub-hosted OIDC
identity, then proves the registry tarball, repository, attestation signatures,
workflow path, main ref, and exact source SHA. If npm commits the publish but
the command response is lost, a rerun verifies the already-present exact
version and never publishes again. If protected `main` has advanced, the rerun
accepts only the same exact tarball with valid bootstrap provenance from an
ancestor commit. A mismatched existing version, unrelated provenance, or
diverged source fails closed; a publish result that never becomes observable
also fails closed.

Immediately after proof succeeds, revoke the granular token and delete
`NPM_BOOTSTRAP_TOKEN`. Then configure a package-scoped GitHub Actions trusted
publisher on a GitHub-hosted runner, restricted to `publish.yml`, the
`content-production` environment, and staged publishing only. Finally merge a
reviewed PR that deletes `bootstrap.yml` and changes
`.changeset/bootstrap.json` from `false` to `true`. CI enforces that the
one-time workflow exists only while the marker is false; version automation and
steady-state publishing remain disabled until that deletion lands.

OIDC may stage but cannot approve a package. After reviewing the workflow
summary and the staged tarball, a package owner must approve the exact stage ID
through npmjs.com or `pnpm stage approve <stage-id>` and complete npm 2FA. This
proof-of-presence step is intentionally outside GitHub Actions; no workflow
secret or permanent registry token may automate it.

After approval, dispatch `package-proof.yml` from current protected `main` with
the package version, integrity, and source SHA printed by the staging workflow.
The source SHA must remain an ancestor of current `main`. The proof downloads
the exact registry tarball and attestations, requires the supplied integrity to
match those bytes, verifies their Sigstore signatures and SLSA identity with
the pinned upstream verifier, then checks the verified provenance subject,
repository, workflow, main ref, hosted runner, and exact resolved Git commit. A
package is not available to Nakafa until this proof succeeds.

The bootstrap job owns the initial package proof. `package-proof.yml` owns every
later staged release and runs only after bootstrap. The source-controlled marker
remains the only switch for version automation; transient registry results can
therefore never enable Changesets.

The marker proves only that the initial package bootstrap completed. Every
production content release and rollback first calls `package-proof.yml` in
`current` mode. That reusable job derives the exact version from the protected
caller checkout, performs a frozen pnpm install, builds and verifies its exact
contracts tarball, and requires that tarball's sha512 integrity to equal both
the registry metadata and downloaded package bytes. It then cryptographically
verifies the SLSA provenance and requires its unique source commit to remain in
current `main` history. A Changesets version that is not yet approved and proven
is therefore absent from the registry and fails closed; an unversioned contract
change produces different package bytes and also fails closed. Unrelated
repository policy or application changes do not invalidate an unchanged exact
package. Emergency abort and cleanup deliberately bypass registry proof and do
not receive the signing key; their required dependency install remains a
separate availability boundary.

After the initial `0.1.0` package exists, every contracts change carries a
Changeset. `version.yml` uses the official Changesets action only to create or
update a ready version pull request through GitHub's API. GitHub suppresses
ordinary recursive workflow runs for `GITHUB_TOKEN` changes, so the version job
validates the exact bot-owned pull request and branch head, then dispatches CI
for that SHA through `workflow_dispatch`. The CI workflow independently binds
the dispatch back to the same ready pull request before running. GitHub exempts
`workflow_dispatch` from recursion suppression, so this needs no PAT, extra
GitHub App, or unattended approval; the resulting `verify` check belongs to the
exact latest pull-request head required by the main ruleset. The version
workflow never publishes, never receives an npm token, and remains inactive
before bootstrap.

References:

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [npm staged publishing](https://docs.npmjs.com/staged-publishing/)
- [npm provenance](https://docs.npmjs.com/generating-provenance-statements/)
- [npm access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens/)
- [npm publish authentication](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/)
- [GitHub OIDC permissions](https://docs.github.com/en/actions/reference/security/oidc#workflow-permissions-for-the-requesting-the-oidc-token)
- [GitHub workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
- [GitHub token workflow triggers](https://docs.github.com/en/actions/concepts/security/github_token#when-github_token-triggers-workflow-runs)
- [GitHub workflow dispatch API](https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event)
- [GitHub required status checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)
- [pnpm staged publishing](https://pnpm.io/cli/stage)
- [pnpm native publishing](https://pnpm.io/cli/publish)
- [publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)
