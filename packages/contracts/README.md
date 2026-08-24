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
- `projection/page` owns stable public page identities, localized paths, and
  signed metadata for human, agent, and sitemap delivery.
- `history/decode` is the single read-only boundary for immutable releases,
  try-out snapshots and rows, and attempt-bound protected content retained by
  existing user history.

Current publication and new try-out starts must never import `history/decode`.
The history boundary has no writer, route fallback, or mixed current wire.

## Publication dates

Article and material metadata carries one required `datePublished` and one
optional `dateModified`, both as exact `DateOnly` values.

- `datePublished` is the first verified public availability of that specific
  locale page.
- `dateModified` is the public activation date of a later signed release that
  contains a meaningful content change.
- When present, `dateModified` must be strictly later than `datePublished`.

Neither value may be derived from a build clock, import time, Convex
`_creationTime`, an unsigned source commit, or an unactivated candidate. The
signed release and activation history remain the audit evidence for both
values. These rules keep visible dates and structured data aligned with
[Google publication date guidance](https://developers.google.com/search/docs/appearance/publication-dates)
and
[Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

Runtime verification authenticates the independently signed release and
artifact values against the exact renderer manifest frozen into that release.
Execution verification also proves the selected artifact against the complete
live renderer when the deployed manifest hash differs. Non-rendering evidence
verification authenticates the same frozen release and artifact without
claiming that its consumer can execute the artifact. This directional
execution check lets an additive live renderer serve an older release only when
it still publishes the selected domain and supports every required component
version. It never authorizes publication: new releases, activation, and
recovery preflight remain bound to the exact complete live renderer. The
renderer is not a third signed value. Current production trusts authenticated
Convex state for route/head membership, delivery class, and the active pointer;
a release result digest is not a per-row inclusion proof. This boundary is
recorded explicitly in
[ADR 0002](https://github.com/nakafaai/aksara/blob/main/docs/adr/0002-release-state.md).

The package source is publicly readable for supply-chain review. All use and
redistribution remain subject to the included Nakafa Source Available License
1.0. The package grants no rights to the Nakafa corpus, branding, or
educational material.
