# Aksara

Aksara is Nakafa's trusted content-authoring, compilation, and publication
system. This repository starts as a deliberately small Turborepo and keeps the
real Nakafa application as the renderer.

Repository visibility is public by explicit user decision on 2026-07-21. The
existing Nakafa corpus was already public-source; protected entitlements must
come from release, authorization, and delivery controls, never Git secrecy.
Public visibility is not itself a content-license grant.

## Workspaces

- `@nakafaai/aksara-contracts` owns schema-derived IDs and wire contracts.
- `@nakafaai/aksara-compiler` statically extracts and validates exact authored
  metadata, then compiles trusted MDX into reviewed `function-body` artifacts
  without executing either source or metadata.
- `@nakafaai/aksara-publisher` owns signing and publication interfaces, with no
  external deployment implementation yet.
- `@nakafaai/aksara-corpus` owns authored content and the first rich fixture.
- `@nakafaai/aksara-cli` is the executable boundary for `check`.

## Commands

```sh
pnpm install
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify:package
pnpm check
```

`check` compiles the real two-locale corpus fixture through the installed MDX
compiler and verifies the Node runtime. It does not execute the artifact,
publish it, or contact Convex, Vercel, or GitHub.

Every document contains exactly one `export const metadata` declaration. The
compiler reads only literal arrays and plain objects from the MDX ESTree,
validates the exact metadata contract, removes that declaration before body
compilation, and includes the decoded metadata in the signed payload. The
payload also preserves the complete authored source in `rawMdx`, and its
`sourceHash` covers that complete source.

Production execution is reserved for reviewed, source-controlled, signed
artifacts after hash, signature, and renderer-contract verification. Nakafa
uses official server-only `@mdx-js/mdx/run`, one pure global contract manifest,
and finite static route-domain implementation registries. This trusted path is
not a sandbox and must never accept arbitrary uploads.

The repository currently assigns every path to `@nabilfatih`. Broader ordinary
corpus ownership remains a governance blocker until a real GitHub user or team
is explicitly selected; contracts, compiler, publisher, and workflow ownership
stay maintainer-only. Ownership of the npm `@nakafaai` scope could not be
verified without an authenticated npm session, so the public-ready contracts
package must not be published yet.

The checked-in CI is foundation-only. Phase 7 still requires affected-document
selection, sufficient Git history for rename/delete detection, conditional full
corpus verification, and OIDC trusted publishing. None of those gates should be
claimed complete from this initial workflow.

The executable-content decision is recorded in
[`docs/adr/0001-executable-content-boundary.md`](docs/adr/0001-executable-content-boundary.md).
Verified external repository controls and the initial-branch gate are recorded
in [`docs/governance.md`](docs/governance.md).
The exact npm tarball and trusted-publishing bootstrap boundary are recorded in
[`docs/npm-publishing.md`](docs/npm-publishing.md).

## License

Software is governed by the [Nakafa Source Available License 1.0](LICENSE).
Educational corpus is governed by the
[Nakafa Content License 1.0](CONTENT_LICENSE.md). Nakafa brand usage is governed
by the [Nakafa Trademark and Brand Policy](TRADEMARKS.md).
