# @nakafaai/aksara-contracts

Exact runtime contracts shared by the Aksara compiler/publisher and Nakafa's
published-content runtime.

This package contains schemas, branded identifiers, canonical wire encodings,
and server-only signature verification. It contains no corpus, renderer
implementation, signing key, deployment credential, or browser-side MDX
runtime.

Consumers must install an exact version. Content requiring a newer contract may
be activated only after the compatible Nakafa renderer is live.

The Node verification exports accept only reviewed, signed Aksara artifacts and
releases. They do not make MDX safe for arbitrary uploads; MDX remains trusted
executable source.

The package is publicly readable for supply-chain verification. Publication
does not grant rights to the Nakafa corpus, branding, or educational material.
Its source is governed by the included Nakafa Source Available License 1.0.
