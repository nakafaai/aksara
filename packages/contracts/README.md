# @nakafa/aksara-contracts

Exact runtime contracts used by the Aksara compiler and publisher. Nakafa does
not consume this package yet.

This package contains schemas, branded identifiers, canonical wire encodings,
and server-only signature verification. It contains no corpus, renderer
implementation, signing key, deployment credential, or browser-side MDX
runtime.

Future consumers must install an exact version. Content requiring a newer
contract may be activated only after a compatible Nakafa renderer is live.

The Node verification exports accept only reviewed, signed Aksara artifacts and
releases. They do not make MDX safe for arbitrary uploads; MDX remains trusted
executable source.

Runtime verification authenticates the release, renderer, and artifact as
independent signed values. Production v1 trusts authenticated Convex state for
route/head membership, delivery class, and the active pointer; a release result
digest is not a per-row inclusion proof. This boundary is recorded explicitly
in [ADR 0002](../../docs/adr/0002-release-state.md).

The package source is publicly readable for supply-chain review, but the npm
package has not been published. Future publication does not grant rights to the
Nakafa corpus, branding, or educational material. Its source is governed by the
included Nakafa Source Available License 1.0.
