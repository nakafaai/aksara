# @nakafa/aksara-contracts

This package defines exact runtime contracts for the Aksara compiler and
publisher. Nakafa runtime adoption is a separate cutover gated by a proven
registry version and compatible renderer support.

This package contains schemas, branded identifiers, canonical wire encodings,
and server-only signature verification. It contains no corpus, renderer
implementation, signing key, deployment credential, or browser-side MDX
runtime.

When a registry version is available, consumers must install that exact proven
version. Content requiring a newer contract may be activated only after a
compatible Nakafa renderer is live.

The Node verification exports accept only reviewed, signed Aksara artifacts and
releases. They do not make MDX safe for arbitrary uploads; MDX remains trusted
executable source.

Runtime verification authenticates the release, renderer, and artifact as
independent signed values. Production v1 trusts authenticated Convex state for
route/head membership, delivery class, and the active pointer; a release result
digest is not a per-row inclusion proof. This boundary is recorded explicitly
in [ADR 0002](https://github.com/nakafaai/aksara/blob/b0103ca40f6abab437860bd87a21450d5a62432e/docs/adr/0002-release-state.md).

The package source is publicly readable for supply-chain review. All use and
redistribution remain subject to the included Nakafa Source Available License
1.0. The package grants no rights to the Nakafa corpus, branding, or
educational material.
