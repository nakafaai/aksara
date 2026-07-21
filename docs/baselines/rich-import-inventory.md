# Rich-content import inventory

This is an AST-derived inventory of the complete current Nakafa corpus at
`25506da68a5dd97bc55f99b6f7304384c4744206`. It replaces the earlier rough
count of 544 importing documents.

## Exact corpus result

- 4,140 MDX documents parsed.
- 812 real import declarations across 536 documents.
- 136 documents import corpus-local TSX.
- 56 distinct corpus-local TSX modules.
- 0 unresolved relative imports.
- 21 modules are direct `"use client"` boundaries.
- 33 server modules transitively reach a client boundary.
- 2 modules remain pure server modules.

The classified transitive client graph is:

| Capability combination | Documents |
|---|---:|
| R3F only | 404 |
| charts and animation | 72 |
| R3F, charts, and animation | 6 |
| animation only | 8 |
| no classified heavy graph | 3,650 |

## Smallest measured candidate route partition

The standalone Next.js preload measurement found physical route entrypoints to
be the only tested topology that isolated rich implementations. If the user
approves that deviation, the smallest measured candidate is eleven source
domains:

1. articles: politics;
2. materials: AI/DS;
3. materials: biology;
4. materials: chemistry;
5. materials: mathematics;
6. materials: physics;
7. SNBT: general reasoning;
8. SNBT: mathematical reasoning;
9. SNBT: quantitative knowledge;
10. SNBT: one validated fallback for the four all-plain sections;
11. TKA: mathematics.

Static route children win over dynamic siblings. The plain SNBT fallback must
accept only English language, general knowledge, Indonesian language, and
reading and writing skills; it must not become an unbounded generic rich
loader. `next-intl` continues to own localized public path rewriting, so these
internal physical entries do not change public URLs.

| Physical shard | MDX | Heavy documents | Non-heavy documents sharing the union |
|---|---:|---|---:|
| articles politics | 14 | 6 charts and animation | 8 |
| material AI/DS | 134 | 8 R3F | 126 |
| material biology | 28 | 14 R3F | 14 |
| material chemistry | 48 | 30 R3F and 2 animation | 16 |
| material mathematics | 472 | 2 all-heavy, 24 charts, 6 animation, 206 R3F | 234 |
| material physics | 84 | 4 all-heavy and 40 R3F | 40 |
| SNBT general reasoning | 800 | 34 charts and animation | 766 |
| SNBT mathematical reasoning | 560 | 34 R3F | 526 |
| SNBT quantitative knowledge | 800 | 60 R3F | 740 |
| SNBT plain fallback | 720 | none | 720 |
| TKA mathematics | 480 | 8 charts and 12 R3F | 460 |

Further partitioning by topic, set, or document would add substantial route
duplication and is not justified by current evidence. The eleven-shard result
is inventory evidence, not an accepted architecture or a reproducible gate,
until an actual published-artifact runtime confirms it.

The topology follows the documented Next.js
[dynamic route](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
and [project structure](https://nextjs.org/docs/app/getting-started/project-structure)
rules, plus `next-intl`
[localized pathnames](https://next-intl.dev/docs/routing/configuration#pathnames).
Route groups are not an alternative because two groups may not resolve to the
same public path.
