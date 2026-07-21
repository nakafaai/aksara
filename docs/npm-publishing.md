# Contracts package publishing

`@nakafaai/aksara-contracts` is the only public npm package in Aksara. It
contains schemas and verification code, not corpus bodies or renderer
implementations.

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
pnpm stage publish ./path/to/nakafaai-aksara-contracts-<version>.tgz
```

Direct publication may use `pnpm publish <exact-tarball>` only after the
release policy explicitly permits it. A content or application release must
never select a contracts version that has not completed this package gate.

The current foundation remains pinned to pnpm 10.34.1 so its already-verified
lockfile stays reproducible. Publishing is blocked until Aksara upgrades to a
pnpm 11 release with native publishing and `pnpm stage` support. The attempted
pnpm 11.12.0 upgrade correctly rejected seven tooling dependencies that were
less than its default 24-hour minimum release age; that supply-chain gate was
not bypassed. No repository command may invoke the npm CLI as a workaround.

## Bootstrap blocker

The local npm session is not authenticated, so ownership of the `@nakafaai`
scope cannot be verified and the package cannot be created automatically.
Trusted publishing can be configured only after the package exists. The first
publication therefore requires the owner to authenticate interactively, verify
the exact package name and scope, and complete npm 2FA.

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
