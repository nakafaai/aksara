# @nakafa/aksara-contracts

This package defines exact runtime contracts for the Aksara compiler and
publisher. Nakafa runtime adoption is a separate cutover gated by a proven
immutable release archive and compatible renderer support.

This package contains schemas, branded identifiers, canonical wire encodings,
and server-only signature verification. It contains no corpus, renderer
implementation, signing key, deployment credential, or browser-side MDX
runtime.

Consumers install the exact attested GitHub Release archive recorded in their
pnpm lockfile. Content requiring a newer contract may be activated only after a
compatible Nakafa renderer is live.

The Node verification exports accept only reviewed, signed Aksara artifacts and
releases. They do not make MDX safe for arbitrary uploads; MDX remains trusted
executable source.

Runtime verification authenticates the independently signed release and
artifact values. Public content requires the renderer manifest authenticated by
the signed release to match the deployed Nakafa manifest exactly. Protected
content is bound to its signed snapshot release, verified against that frozen
renderer manifest, and then verified against the deployed renderer. A later
deployed renderer may serve the retained snapshot only when it remains
compatible with every artifact requirement. The renderer is not a third signed
value. Production v1 trusts authenticated Convex state for route/head
membership, delivery class, and the active pointer; a release result digest is
not a per-row inclusion proof. This boundary is recorded explicitly in
[ADR 0002](https://github.com/nakafaai/aksara/blob/main/docs/adr/0002-release-state.md).

The package source is publicly readable for supply-chain review. All use and
redistribution remain subject to the included Nakafa Source Available License
1.0. The package grants no rights to the Nakafa corpus, branding, or
educational material.
