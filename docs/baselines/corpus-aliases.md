# Corpus alias migration evidence

This evidence covers the 1,030 normalized authored TypeScript modules imported
from Nakafa at filtered head
`b65f344e8a48029723bdfd5bd6500e4ca6fe92fd`.

## Original dependency graph

- Authored modules with an old `@repo/contents` import: 905
- Old `@repo/contents` import edges: 925
- Unique old module specifiers: 22
- Contract edges: 909
- Physical same-corpus source edges: 16
- Existing temporary `#content/*` edges: 122

The independent TypeScript AST inventory found 16 physical
`@repo/contents/curriculum/*` edges, not 21. Every one resolved to a retained
authored module before its specifier changed.

## Final ownership

The 909 contract edges now import their direct domain owners:

| Authored concern | Aksara owner | Edges |
|---|---|---:|
| Article references | `#corpus/articles/reference` | 7 |
| Curriculum trees | `#corpus/curriculum/schema` | 20 |
| Lesson materials | `#corpus/material/schema` | 36 |
| Learning program keys | `#corpus/program/keys` | 4 |
| Question choices | `#corpus/question-bank/choices` | 840 |
| Try-out exams | `#corpus/tryout/schema` | 2 |

The route, material-domain, card-description, and navigation schemas are
separate domain owners because they are independently reused by those
contracts. They are not barrels, facades, or compatibility aliases.

At the dependency-migration checkpoint, all 1,047 imports in the authored
TypeScript graph used `#corpus/*`. The later deterministic Quran decomposition
added 1,074 direct range imports, so that recorded normalized data graph had
2,121 direct `#corpus/*` imports. At the same checkpoint, 2,133 of 2,161
production corpus imports were direct corpus aliases; the remaining 28 were
external package imports.

Repository-wide scans find:

- zero `@repo/contents` references under `packages/corpus`
- zero `#content/*` references
- zero relative TypeScript imports
- one package-local alias source: `#corpus/*`

## Source parity

For each of the 1,030 authored modules, the pre-migration staged source and the
post-alias source were parsed with TypeScript. After removing only
`ImportDeclaration` nodes, all 1,030 path/body pairs were byte-identical.
Therefore the alias migration changed dependency ownership without changing
any authored values, ordering, or source paths.

The deterministic path, byte-length, and body framing contains 25,030,883
bytes. Both sides produce SHA-256
`3d6104cb67a99be6267563876fc3b016495e6ef70447de6b9d06883f2fc3022b`.

This per-module proof was recorded before the Quran verse-range decomposition,
which intentionally changes the physical module boundaries. That later
mechanical split is instead covered by the lossless canonical Quran proof in
`corpus-history.md`: 114 ordered surahs, 6,236 ordered verses, 19,376,634
canonical bytes, and SHA-256
`9aa95cde6f38685d313bf1e4ceb0e8b9db1fe021205202e9ee9a49e2de24fce6`.
