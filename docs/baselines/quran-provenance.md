# Quran provenance evidence

- Retrieved: `2026-07-24T17:57:50Z`
- Reviewed: 2026-07-25
- Decision: source provenance approved; production cutover not performed
- Aksara source: `packages/corpus/quran`

This is the dated provenance decision from 2026-07-25. Production activation
later completed. Use the read-only `pnpm status` command documented in the root
[README](../../README.md) for authoritative release slots. The historical
decision below is retained to show what this review did and did not prove at
that time.

## Exact official artifacts

| Scope | Official edition | Exact artifact | Bytes | SHA-256 |
|---|---|---:|---:|---|
| Arabic text | Tanzil Uthmani v1.1 | `sources/tanzil/text.txt` | 1,334,737 | `ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af` |
| Metadata | Tanzil Quran Metadata v1.0 | `sources/tanzil/data.xml` | 77,234 | `8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a` |
| English translation | QuranEnc English Rwwad v1.0.19-xml.1 | `sources/quranenc/en.xml` | 1,690,410 | `213e1aeb515c5bac6ca446955527b8f3c0f9c21e9d1bad9c6857e9e5b282e9b6` |
| Indonesian translation | QuranEnc Indonesian Affairs v1.0.1-xml.1 | `sources/quranenc/id.xml` | 1,820,207 | `45d0014236443e91af1338fe7b60f9e20741c6ff5b4ee82ead960d111f91071b` |
| Indonesian tafsir | QuranEnc Al-Mukhtasar v1.0.0, 114 official API responses | `sources/quranenc/tafsir/*.json` | 6,584,353 | `b46b730418767dfacdf34ac35cec4277822a019b631910d603def280c3d56364` |

The Tanzil files came from the official
[download endpoint](https://tanzil.net/download/) and
[metadata endpoint](https://tanzil.net/res/text/metadata/quran-data.xml).
The QuranEnc XML files came from the official Rwwad and Indonesian Affairs
download links. Al-Mukhtasar came from the documented official endpoint
`/api/v1/translation/sura/indonesian_mokhtasar/{sura}` for surahs 1 through
114. No intermediary repository is part of the new lineage.

The Al-Mukhtasar digest starts SHA-256 with
`aksara.quranenc.api-bundle.v1\n`. For each numeric file from 1 through 114 it
adds `<name>\n<byte-count>\n`, the exact response bytes, and `\n`.

The 2026-07-25 baseline data bundle contains 118 files and 11,506,941 bytes. Its SHA-256
is `73e50fb15aac4cd95c86151cc43f002b5c76986584846e16d171bd0be99f58d7`.
That digest starts with `aksara.quran.source-bundle.v2\n`, then adds each
stable acquisition name, byte count, exact bytes, and newline in manifest
order. Provider-owned source folders are only repository organization; they do
not rewrite the pinned acquisition names or bytes.

## Pinned legal evidence

- Tanzil's exact text-license page is stored as `sources/tanzil/terms.html`:
  7,903 bytes,
  `795064d93b6b9a9e2df190800a32bfe77add93eb6e978215ddb36f8e0130ccaa`.
- QuranEnc's exact source, version, publisher, and republication-terms page is
  stored as `sources/quranenc/terms.html`: 1,051,521 bytes,
  `858791320276bef37616be75f3d57efac5b46463246d7cf5503aab1a6de2c774`.
- Tanzil permits verbatim distribution under CC BY 3.0, requires Tanzil
  attribution and an update link, forbids changing the Quran text, and requires
  its copyright notice in derived files containing substantial text.
- QuranEnc permits downloading and republication only without modification,
  addition, or deletion; with publisher, QuranEnc, and version attribution;
  with transcript information retained; with notes reported and current
  versions adopted; and without inappropriate advertisements.

The raw Tanzil copyright block remains byte-for-byte intact. The public
attribution row and `THIRD_PARTY.md` reproduce the required notices. Every
published Quran snapshot begins with one validated
`quran-attribution` row containing the five publishers, exact versions,
retrieval time, source/update/terms links, artifact byte counts, and hashes.

## Source-shaped field contract

| Published field | Exact official source |
|---|---|
| `text.arabic` | Tanzil Uthmani v1.1 line at the canonical global verse |
| surah name, count, revelation, partitions, sajda | Tanzil metadata v1.0 |
| `translation.en.text` and `.footnotes` | QuranEnc English Rwwad XML |
| `translation.id.text` and `.footnotes` | QuranEnc Indonesian Affairs XML |
| `tafsir.id.text` and `.footnotes` | QuranEnc Indonesian Al-Mukhtasar API |

The verified source parser preserves source strings exactly. It does not trim,
normalize, translate, repair, shorten, lengthen, or invent content. Empty QuranEnc XML
footnotes remain `""`; API `null` footnotes remain `null`.

At that baseline, blocked fields were deleted rather than adapted:

- Al Quran Cloud audio and all audio URLs
- unlicensed verse transliteration
- pre-Bismillah compatibility objects
- Bachors surah descriptions and metadata
- localized or synthetic surah names
- Kemenag-derived short and long tafsir compatibility fields
- German or any other locale data unsupported by that baseline

Audio remains omitted because no exact durable attribution and takedown
contract was proven for a specific recitation artifact.

## Completeness and publication identity

At that baseline, the verified source contained 114 ordered surahs and 6,236
ordered verses. Its published projection contained 1,085 bounded verse chunks,
228 locale search rows, and one visible attribution row. The 2026-07-25
snapshot therefore contained 1,200 runtime rows and 1,428 total projections.
Registry validation rejects count, surah order, local verse order, global verse
order, revelation-order duplication, source-schema drift, and unsupported
fields as typed failures.

The approved provenance decision means these exact source bytes satisfy the
current Aksara gate. It does not claim that Nakafa production was deployed,
migrated, or visually verified in this change.

## German publication addendum

- Translation retrieved: `2026-08-13T06:12:57Z`
- Publication record retrieved: `2026-08-13T08:31:04Z`
- Reviewed: 2026-08-13
- Decision: German source evidence approved for active publication

The German publication uses QuranEnc German Bubenheim v1.1.4-xml.1. Its exact
XML is stored at `sources/german/translation.xml`: 1,523,305 bytes, SHA-256
`38763b972b2efeeed3062ba3495042c28f320cf734071e010d746c525ebce47e`.
It contains 114 ordered surahs and 6,236 ordered verses. Every translation is
present, and all 6,236 footnote elements are empty. The parser preserves those
values exactly.

QuranEnc names ‘Abdullah as-Sāmit (Frank Bubenheim) and Dr. Nadim Elias as
translators. The exact German IslamHouse publication record credits the King
Fahd Complex For Printing The Holy Quran as the edition's source. That record
is stored at `sources/german/publication.json`: 3,485 bytes, SHA-256
`df3b2437afa0f52c3621c8c611384c45b00169e00a259a4f205a7ccd9150f645`.
It came from the official German item API for IslamHouse item 59081. This
evidence is review-bound to the authored attribution and provenance records;
it is not part of the Quran data bundle.

The active three-locale data bundle contains 119 files and 13,030,246 bytes. Its
SHA-256 is
`4834b7d8ca7e55e622c3e27a37c4b210af0ab58f066162603b1d76beb0dd91b8`.
The `translation.de.text` and `.footnotes` fields come only from the exact
German QuranEnc XML. The active snapshot contains 342 locale search rows and
1,542 total projections.

German Tafsir is unavailable. Nakafa must say so plainly and must not
substitute another language or label the German translation as Tafsir.
