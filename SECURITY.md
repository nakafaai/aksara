# Security policy

## Reporting a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a
public issue for suspected signature, publication, authorization, secret, or
executable-content vulnerabilities.

Include the affected commit, the smallest reproducible case, the expected
security boundary, and the observed impact. Do not include real production
credentials, signing keys, unpublished content, or personal data.

## Supported code

Only the latest `main` revision and the active production contracts release are
supported. Aksara is under initial development and has not passed its production
activation gates yet.

## Trust boundary

Aksara MDX is trusted executable source. The compiler rejects common capability
and prototype-chain escape syntax as defense in depth, but static checks cannot
prove arbitrary JavaScript safe and do not create a sandbox. Treat every MDX
author and reviewer as a production code author. Arbitrary public uploads must
never reach the artifact compiler or Nakafa's server-side MDX runtime.

Production publication loads authored source through the exact Git revision in
the release; it does not accept source beside a caller-claimed SHA or accept
caller-selected function bodies. It recompiles each source with the pinned
compiler and renderer manifest, matches the canonical artifact hash to the
signed release item, and only then permits the package-private signing primitive
to authenticate it.
