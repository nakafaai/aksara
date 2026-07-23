# Corpus history migration evidence

This evidence records the bounded rich-slice history imports and the complete
authored-input history import. Publication and source cutover remain a
family-by-family migration.

## Function Concept

- Source Nakafa SHA: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Filtered slice head: `894704cedfd6e882f63eea9bd7a8b882254cc620`
- Durable source ref: `refs/tags/history/function-concept`
- Reachable source commits: 2
- Aksara history merge: `c9c59216248160a3d8a0e5ac91cd4c54f9628b9b`
- Final authored paths:
  - `packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx`
  - `packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx`

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

## Complete authored inputs

- Current Nakafa source SHA:
  `8ed5d1a1efc68037890b1a5cc055c8be8fd6ae3f`
- Last source commit that changed the corpus:
  `8ed5d1a1efc68037890b1a5cc055c8be8fd6ae3f`
- Source path: `packages/contents`
- Source tree: `5db421d901f1631a1f88162ebef000001ff786b4`
- Filtered corpus tree:
  `5db421d901f1631a1f88162ebef000001ff786b4`
- Filtered repository tree:
  `b27b7b72e40bad073f2888363427764910f0ece5`
- Filtered head: `a92969897407de449837ec4ae468ca66ffedf273`
- Durable source ref: `refs/tags/history/full-corpus`
- Filtered commits: 930
- Pre-prune source files: 5,245
- Pre-prune source bytes: 36,813,113
- Imported authored inputs: 5,048
- Imported MDX documents: 4,140
- Imported non-React TypeScript inputs: 908
- Imported authored bytes: 36,150,053

The equal source and filtered corpus tree hashes prove that filtering preserved
the current Nakafa corpus byte-for-byte. The import then removed only the old
package configuration, loaders, type ownership, tests, and 56 React/TSX
implementations. Those renderer implementations remain Nakafa-owned.

At the import boundary, 5,044 of the 5,048 retained inputs were byte-identical
to the filtered source. The four reviewed rich-slice locale documents were
byte-identical after removing only their renderer import and adjacent blank
line, as recorded above. Repository formatting was applied only after this
evidence was recorded.

Outside `packages/corpus/material/lesson`, every logical path segment is passed
independently to `encodeCorpusPath`. Joining the resulting chunks with `-`
reconstructs the original segment exactly. Lesson directory segments preserve
their exact Nakafa paths; only their file names retain the two-word limit. The
import proved 5,048 unique physical targets with no collision, including 222
deterministic physical moves. No file name or non-lesson directory exceeds two
semantic words. Original paths remain permanently inspectable through
`history/full-corpus`; family registries own their logical identities when each
publication contract migrates.

## Post-import normalization

The imported TypeScript inputs were formatted with the repository formatter.
The two material registries above the 300-line module limit were decomposed by
their actual curricular domains:

- AI Programming: `syntax`, `data`, `numpy`, and `tools`
- Linear Methods: `eigen`, `matrix`, `geometry`, and `models`

The ordered section projections retain exact canonical field parity with the
filtered source:

| Material | Sections | Canonical bytes | SHA-256 |
|---|---:|---:|---|
| AI Programming | 27 | 4,968 | `7a71c024307691cbb11a12a2f80e1c710b686ce39cd287aa26d1945885e77d6b` |
| Linear Methods | 40 | 8,601 | `96d4e3dba9bbef575eac2be7e48078b3fc2ecb657706aa2d5a05276c240911e4` |

The monolithic Quran module was split into 114 numbered, surah-owned source
files plus one ordered aggregator. The 103 owners that exceeded the repository
line limit were then decomposed into 1,074 six-verse range modules. The other
11 owners remain unchanged because they already satisfy the limit. Each root
owner still owns its real metadata and ordered verse composition; each range
module owns the real verse data named by its path.

Recursive canonicalization sorts object field names while preserving every
authored array order, so formatting trivia does not influence the integrity
proof. Both the filtered source and the decomposed source produce:

- 114 uniquely numbered surahs in order
- 6,236 actual verses
- 6,236 declared verses
- 19,376,634 canonical JSON bytes
- SHA-256
  `9aa95cde6f38685d313bf1e4ceb0e8b9db1fe021205202e9ee9a49e2de24fce6`

The decomposed Quran has exactly 103 numeric chunk directories. The largest
decomposed owner is 143 lines, the largest verse range is 248 lines, and the
largest unchanged owner is 292 lines. No Quran TypeScript module exceeds 300
lines.

The corpus now contains 4,140 MDX documents and 2,104 authored data TypeScript
modules. Relative to the first normalized state, the only additional modules
are the 1,074 Quran verse ranges; no content row was invented.

The compiler security review found 12 runtime-computed member expressions in
eight English and Indonesian vector lessons. Nakafa PR #210 changed those
array reads mechanically from `array[index]` to the equivalent
`array.at(index)` form, and the filtered descendant preserves that exact source
commit. An MDX/ESTree audit parsed all 4,140 documents after the change: 51
files contained bracket-shaped text, while zero executable expression programs
retained a runtime-computed member property.

## Import normalization

The standard MDX parser successfully parsed all 4,140 documents after
normalization. The final corpus has zero MDX import declarations and zero
per-document import registry entries. Mechanical, source-reviewed changes were:

- 242 documents had `getColor` imports removed and 2,610 calls replaced with
  the exact current Nakafa color literals.
- 418 design-system import declarations were removed while preserving their JSX
  component names for route-domain renderer contracts.
- 140 relative renderer import declarations, representing 144 bindings to 55
  retained Nakafa renderer modules, were removed. Colliding semantic names were
  scoped by their exact question or article identity.
- 84 circle-helper calls in eight locale documents became declarative
  `LineEquation` entries that the existing Nakafa circle implementation expands
  at render time.

Raw text searches still find programming-language `import` examples inside
fenced code blocks. Those are educational text, not MDX module declarations,
and are therefore intentionally preserved.

## Bounded safety scan

The complete filtered history was searched without printing file contents for
common private-key headers and common GitHub, Stripe, Slack, npm, Convex,
Vercel, and AWS credential patterns. That bounded scan found no matching path.
It does not replace GitHub secret scanning or a dedicated secret scanner before
push.

No `LICENSE`, `COPYING`, or `NOTICE` file and no common inline open-source
license marker was found inside the filtered corpus history. Absence of a
marker is not provenance proof. Source attribution and reuse terms still
require a family-by-family audit before public migration.

The Nakafa `main` history has three reachable blobs above 10 MiB. All are Quran
source revisions: one current `packages/contents/quran/source.ts` blob at
24,492,363 bytes and two historical `packages/contents/_data/quran.ts` blobs at
24,492,362 bytes. They are text rather than binary, but attribution, license,
compilation cost, and long-term storage representation remain explicit Quran
migration gates.

## Reproduction

Prepare the complete corpus only in a disposable clone of the exact Nakafa
source:

```sh
git switch --detach 8ed5d1a1efc68037890b1a5cc055c8be8fd6ae3f
corpus_source_tree=$(git rev-parse HEAD:packages/contents)
git filter-repo \
  --force \
  --path packages/contents/ \
  --path-rename packages/contents/:packages/corpus/
test "$corpus_source_tree" = "$(git rev-parse HEAD:packages/corpus)"
git rev-list --count HEAD
```

Each family must repeat the bounded secret and provenance review before it is
published or cut over. Importing reviewed source history does not satisfy the
family publication gates.
