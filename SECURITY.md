# Security policy

## Reporting a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a
public issue for suspected signature, publication, authorization, secret, or
executable-content vulnerabilities.

Include the affected commit, the smallest reproducible case, the expected
security boundary, and the observed impact. Do not include real production
credentials, signing keys, unpublished content, or personal data.

## Supported code

Only the latest `main` revision and immutable contract archives currently
referenced by Nakafa production are supported. The signed content runtime is
production-supported only for explicitly activated scopes: the article,
material, and learning-program families. Question-bank, try-out, and Quran
scopes are not production-supported until their separate runtime, migration,
and activation gates pass. The exact source commits and production acceptance
evidence are recorded in [`README.md`](README.md).

## Trust boundary

Aksara MDX is trusted executable source. The compiler rejects common capability
and prototype-chain escape syntax as defense in depth, but static checks cannot
prove arbitrary JavaScript safe and do not create a sandbox. Treat every MDX
author and reviewer as a production code author. Arbitrary public uploads must
never reach the artifact compiler or Nakafa's server-side MDX runtime.

The implemented publication module resolves each signed corpus path from the
manifest's exact full Git commit, recompiles that immutable blob, matches the
canonical artifact hash to the signed release item, and only then permits the
package-private signing primitive to authenticate it. No publication credential
is exposed from this repository. The authenticated Convex ingress, immutable
artifact storage, and server-only runtime adapters are implemented and owned in
`nakafaai/nakafa.com`.
