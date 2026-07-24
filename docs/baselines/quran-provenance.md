# Quran provenance evidence

- Reviewed: 2026-07-23
- Decision: production replacement remains blocked
- Aksara source: `packages/corpus/quran`

## Exact lineage

The canonical Aksara data is byte-for-byte equal to
[`gadingnst/quran-api/data/quran.json`](https://github.com/gadingnst/quran-api/blob/0d9497128748181fed96d29005c00afcec29d96d/data/quran.json)
except for two reviewed Nakafa corrections:

- `db1ac4eb4a94afb1f3ef0e274b1c964db2a4449f` corrects one Surah 2
  tafsir typo.
- `f1df617c7076b1dfa56f1494cb2736ab49464122` corrects one Indonesian
  translation typo at 19:2.

The first Nakafa import is
`102e976ad863df96ebd701379ddd466e31dd5d9b`. The lossless Aksara
decomposition is proved separately in `docs/baselines/corpus-history.md`.

The pinned upstream
[`quran-api` crawler](https://github.com/gadingnst/quran-api/blob/96113d2b9608e2f884f555370e4e45abe46a2a60/crawler/script.js#L13-L163)
establishes these exact field sources:

| Aksara field | Exact upstream source |
|---|---|
| Arabic text | Al Quran Cloud `quran-simple-enhanced` |
| Verse numbering and base metadata | Al Quran Cloud `ar.alafasy` response |
| English translation | Al Quran Cloud `en.sahih`, Saheeh International |
| Transliteration | Al Quran Cloud `en.transliteration` |
| Audio | Al Quran Cloud `ar.alafasy`, Mishary Rashid Alafasy |
| Indonesian translation | Kemenag-derived data through `quran.machine` |
| Verse short and long tafsir | Kemenag-derived data through `quran.machine` |
| Surah description, sequence, and short name | `bachors/Al-Quran-ID-API` |

The pinned
[`quran.machine` generator](https://github.com/gadingnst/quran.machine/blob/0877dbcb902c028fa34601c9ca4101cc3d0d7d04/src/app/utils/generate.ts#L25-L114)
shows its `rioastamal/quran-json` and former Kemenag API inputs.

## License evidence

- `gadingnst/quran-api`, `gadingnst/quran.machine`, and
  `rioastamal/quran-json` carry MIT licenses. Their required notices are
  retained in `THIRD_PARTY.md`.
- [Al Quran Cloud terms](https://alquran.cloud/terms-and-conditions) permit
  Arabic reproduction with acknowledgement and require translator attribution.
  They identify reciter-owned audio rights and possible removal.
- [LPMQ's official API procedure](https://quran-api.lpmqkemenag.id/) requires
  registration, a formal application, activation, and a token. The reviewed
  page does not grant public-Git or hosted commercial redistribution rights.
- The pinned
  [`bachors/Al-Quran-ID-API`](https://github.com/bachors/Al-Quran-ID-API/tree/2926f459401592cb91c20bd737a7a4b424d6040a)
  repository has no license file.

An intermediary MIT license does not grant rights that its upstream provider
did not grant. Nakafa's content license also explicitly preserves third-party
rights rather than relicensing them.

## Remaining approvals

Production replacement remains fail-closed until all of these are true:

1. Nakafa has written LPMQ permission covering public source and hosted
   redistribution of the exact Indonesian translation and tafsir.
2. The Bachors-derived surah fields are licensed or replaced with an approved
   source.
3. The `en.transliteration` rights holder and redistribution terms are known,
   or the values are replaced.
4. Nakafa ships exact Arabic-provider, English-translator, and reciter
   attribution.
5. Nakafa accepts the current audio removal risk or obtains durable written
   clearance.

The signed Quran snapshot includes this blocked decision. A release that
replaces Quran state is rejected before signing or publication IO. Other
families may change only when the same global release inherits unchanged Quran
state, restores an already approved snapshot, or carries a fully approved Quran
replacement; they do not have an independent publication protocol.
