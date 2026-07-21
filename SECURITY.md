# Security policy

## Reporting a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a
public issue for suspected signature, publication, authorization, secret, or
executable-content vulnerabilities.

Include the affected commit, the smallest reproducible case, the expected
security boundary, and the observed impact. Do not include real production
credentials, signing keys, unpublished content, or personal data.

## Supported code

Only the latest `main` revision is supported. No contracts package or content
runtime has been released to production yet.

## Trust boundary

Aksara MDX is trusted executable source. The compiler rejects common capability
and prototype-chain escape syntax as defense in depth, but static checks cannot
prove arbitrary JavaScript safe and do not create a sandbox. Treat every MDX
author and reviewer as a production code author. Arbitrary public uploads must
never reach the artifact compiler or Nakafa's server-side MDX runtime.

The implemented publication module requires an injected source interface to
return authored MDX for the manifest's exact Git revision. It recompiles that
source, matches the canonical artifact hash to the signed release item, and only
then permits the package-private signing primitive to authenticate it. No Git,
Convex, or production adapter is implemented yet.
