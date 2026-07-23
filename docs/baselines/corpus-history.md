# Corpus history migration evidence

This evidence records the bounded rich-slice history imports. The complete
corpus history remains a later family-by-family migration and has not been
merged into Aksara.

## Function Concept

- Source Nakafa SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Filtered slice head: `894704cedfd6e882f63eea9bd7a8b882254cc620`
- Durable source ref: `refs/tags/history/function-concept`
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

## Atom Shell

- Source Nakafa SHA: `7bbf91eb2898c610c5280e114641d5444c48c65b`
- Filtered slice head: `98c0fcf1af71d2648a926c8fc49adca1821ec4d2`
- Durable source ref: `refs/tags/history/atom-shell`
- Reachable source commits: 1
- Aksara history merge: `50417f547f3d8145cd3a20f9b2312181010afc70`
- Final authored paths:
  - `packages/corpus/material/lesson/chemistry/structure-matter/atom-shell/en.mdx`
  - `packages/corpus/material/lesson/chemistry/structure-matter/atom-shell/id.mdx`

The disposable filtered clone contained only these two real locale documents.
Its largest blob was 8,474 bytes, its only author identity was the existing
Nakafa contributor, and the bounded common credential-pattern scan found no
matches. After the history merge, only the reviewed `AtomShellLab` import and
its adjacent blank line were removed from each document. The resulting SHA-256
digests are `d102b06e1ab932ed9dbd867e9403df43f3ded52d476364273c11959bd76d5f7a`
for English and
`7e00d7922e9c36eb455c50840f0b291d5b178ba9b8c24d7bbf45d3a5195c58bf`
for Indonesian. Both are byte-identical to the exact Nakafa source after that
same import removal; no educational text or metadata was added or rewritten.

The repository accepts only squash merges. The two immutable `history/*` tags
therefore pin the exact filtered source ancestry independently of temporary PR
branches, so branch cleanup cannot make the reviewed provenance objects
unreachable.

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
