# @nakafa/aksara-contracts

This package defines exact runtime contracts for the Aksara compiler and
publisher. Nakafa runtime adoption is a separate cutover gated by a proven
immutable release archive and compatible renderer support.

This package contains schemas, branded identifiers, canonical wire encodings,
and Web Crypto signature verification. It contains no corpus, renderer
implementation, signing key, deployment credential, or browser-side MDX
runtime.

Consumers install the exact attested GitHub Release archive recorded in their
pnpm lockfile. Content requiring a newer contract may be activated only after a
compatible Nakafa renderer is live.

Node-only writer and incremental digest exports remain isolated behind package
conditions. Default-runtime exports used by Convex are audited to reject
reachable Node built-ins. Verification accepts only reviewed, signed Aksara
artifacts and releases. It does not make MDX safe for arbitrary uploads; MDX
remains trusted executable source.

## Consumer boundaries

Current consumers use unversioned semantic Interfaces:

- `graph/family` classifies either a complete graph identity or one exact
  asset ID into its application locale and content family.
- `tryout/catalog` owns minimal catalog node schemas, while `tryout/identity`
  builds their pure lookup identities before complete signed rows are loaded.
- `projection/material` owns the application-locale material namespace and
  validates every signed route and projection against it.
- `history/decode` is the single read-only boundary for immutable releases,
  try-out snapshots and rows, and attempt-bound protected content retained by
  existing user history.

Current publication and new try-out starts must never import `history/decode`.
The history boundary has no writer, route fallback, or mixed current wire.

Runtime verification authenticates the independently signed release and
artifact values. Public content requires the renderer manifest authenticated by
the signed release to match the deployed Nakafa manifest exactly. Protected
content is bound to its signed snapshot release, verified against that frozen
renderer manifest, and then verified against the deployed renderer. A later
deployed renderer may serve the retained snapshot only when it remains
compatible with every artifact requirement. The renderer is not a third signed
value. Current production trusts authenticated Convex state for route/head
membership, delivery class, and the active pointer; a release result digest is
not a per-row inclusion proof. This boundary is recorded explicitly in
[ADR 0002](https://github.com/nakafaai/aksara/blob/main/docs/adr/0002-release-state.md).

The package source is publicly readable for supply-chain review. All use and
redistribution remain subject to the included Nakafa Source Available License
1.0. The package grants no rights to the Nakafa corpus, branding, or
educational material.
