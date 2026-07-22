# Corpus history migration evidence

This evidence records the bounded Function Concept history import. The complete
corpus history remains a later family-by-family migration and has not been
merged into Aksara.

## Imported vertical slice

- Source Nakafa SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Filtered slice head: `894704cedfd6e882f63eea9bd7a8b882254cc620`
- Reachable source commits: 2
- Aksara history merge: `c9c59216248160a3d8a0e5ac91cd4c54f9628b9b`
- Final authored paths:
  - `packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/en.mdx`
  - `packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/id.mdx`

The disposable filtered clone contained only the two real locale documents and
their original local React implementation. Its largest blob was under 4.7 KiB,
and the only source author identity was the existing Nakafa contributor. The
common credential-pattern scan found no matches. After the history merge, the
two MDX imports were removed and the React implementation moved to Nakafa's
mathematics design-system domain. The remaining MDX bytes are identical to the
current Nakafa sources after removing each import and its adjacent blank line;
no educational text or metadata was added or rewritten.

## Complete-corpus preparation

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

The equal source and filtered tree hashes prove that the prepared complete
corpus branch preserved the current tracked tree byte-for-byte. That full branch
was not merged or pushed.

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

The Nakafa `main` history has three reachable blobs above 10 MiB. All are Quran
source revisions: one current `packages/contents/quran/source.ts` blob at
24,492,363 bytes and two historical `packages/contents/_data/quran.ts` blobs at
24,492,362 bytes. They are text rather than binary, but attribution, license,
compilation cost, and long-term storage representation remain explicit Quran
migration gates.

## Reproduction

Prepare the complete corpus only in a disposable clone of the exact Nakafa
baseline:

```sh
git subtree split --prefix=packages/contents -b aksara-corpus
git rev-parse main:packages/contents
git rev-parse aksara-corpus^{tree}
git rev-list --count aksara-corpus
git bundle create aksara-corpus.bundle aksara-corpus
git bundle verify aksara-corpus.bundle
```

Each later family must repeat the bounded secret and provenance review before
its history is merged or pushed. Do not merge the prepared complete-corpus
branch as one unreviewed migration.
