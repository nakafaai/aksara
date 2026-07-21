# Corpus history migration evidence

This evidence prepares, but does not perform, the history migration. No commit
from the filtered branch has been merged into Aksara.

## Source and result

- Nakafa baseline: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Source path: `packages/contents`
- Source tree: `bcddf04d40b1fe7ab33dfe4c89e55bbdf650a418`
- Filtered tree: `bcddf04d40b1fe7ab33dfe4c89e55bbdf650a418`
- Filtered head: `66e9c650f3499b116d49b75420d7f9a5f6821821`
- Filtered commits: 450
- Current tracked files: 5,245
- Current tracked bytes: 36,813,077
- Complete bundle size: approximately 15 MiB
- Bundle SHA-256:
  `7692f3e80b626ba3a8cdbcb75a90faaf607972f9d653baa584cfeb20b1bef107`

The equal source and filtered tree hashes prove that the current tracked corpus
was preserved byte-for-byte by `git subtree split` in the temporary clone.

## Bounded safety scan

The complete filtered history was searched without printing file contents for
common private-key headers and common GitHub, Stripe, Slack, npm, Convex,
Vercel, and AWS credential patterns. That bounded scan found no matching path.
It does not replace GitHub secret scanning or a dedicated secret scanner before
push.

No `LICENSE`, `COPYING`, or `NOTICE` file and no common inline open-source
license marker was found inside the filtered corpus history. Absence of a marker
is not provenance proof. Source attribution and reuse terms still require a
family-by-family audit before public migration.

The only reachable blob above 10 MiB is the Quran source data, currently
24,492,363 bytes. It is text rather than binary, but its attribution, license,
compilation cost, and long-term storage representation remain explicit Quran
migration gates.

## Reproduction

Run these operations only in a disposable clone of the exact Nakafa baseline:

```sh
git subtree split --prefix=packages/contents -b aksara-corpus-history
git rev-parse main:packages/contents
git rev-parse aksara-corpus-history^{tree}
git rev-list --count aksara-corpus-history
git bundle create aksara-corpus-history.bundle aksara-corpus-history
git bundle verify aksara-corpus-history.bundle
```

Do not merge or push the filtered branch until commit authorization, dedicated
secret scanning, and source provenance review have all passed.
