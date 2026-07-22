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

The authenticated npm identity is `nabilfatih`, and the owner-created
organization is the real `@nakafa` scope. `@nakafa/aksara-contracts` does not
exist yet. Trusted publishing can be configured only after that first package
version exists, so the bootstrap publication must use the verified exact
tarball and complete the scope's required npm 2FA without exposing a token.

After the pnpm upgrade and package bootstrap, configure a package-scoped GitHub
Actions trusted publisher on a GitHub-hosted runner. Give the publish job
`id-token: write` and `contents: read`, do not set a write token, and restrict
the package to staged publishing. The selected pnpm release must implement the
registry's OIDC token exchange and provenance flow directly. The registry
automatically attaches provenance to a public package published with OIDC from
a public repository.

References:

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [npm staged publishing](https://docs.npmjs.com/staged-publishing/)
- [pnpm staged publishing](https://pnpm.io/cli/stage)
- [pnpm native publishing](https://pnpm.io/cli/publish)
- [publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)
