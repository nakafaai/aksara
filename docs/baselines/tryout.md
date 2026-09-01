# Try-out corpus provenance

This record separates three facts that must not be conflated: where the
historical Nakafa bytes came from, which sources informed assessment design,
and which Aksara commits own newly authored practice material. It does not
claim that a ministry authored Nakafa questions.

## Product boundary

The SNBT and TKA content is Nakafa practice material aligned to the cited
assessment frameworks. Official evidence owns schedule, response format,
subject scope, and blueprint claims. Nakafa and Aksara Git history owns the
wording, worked answers, distractors, translations, and later editorial
changes.

No question in the expanded sets is presented as an official past question.
The authorized reference files below were used to benchmark format and
reasoning burden. They are not evidence that their learner-facing wording was
copied into Aksara.

## SNBT lineage

- Historical Nakafa source commit:
  `d47a45856d00a98e510f2c2df165968f456a4c6d`
- Historical source path:
  `packages/contents/question-bank/tryout/indonesia/snbt`
- Signed Aksara migration:
  `45a661e567254f831ac7fedab16ba6c6e34bc58d`
- Pedagogy review:
  `3d56929262665281618ebe8f35b5a9796067072f`
- German locale completion:
  `58ed71f05f39c769873b2aa7f2e05c5f4dd1a7fa`
- Multilingual humanization:
  `34ba5d27c3f602de0eba07a8fe141642e1ab7b3b`
- Source-backed SNBT completion merge:
  `22e7e0209594edd07f83284515be02e1795ddc01`
- Completion tree:
  `f8d538751eca4a257c7eafd3881d1b477aad9e9a`

PR
[#266](https://github.com/nakafaai/aksara/pull/266) records the bounded
file-level comparison for the moved questions and the six reviewed corrections
that followed it. The latest official structure used for the 2027 product
track remains the source declared in the SNBT readiness contract. This does not
claim that an official SNBT 2027 framework has already been published.

## Authored expansion baseline

- Expansion and difficulty review merge:
  `e74ca03c759e9fd03dc8c4621bdc8e9a03cb8348`
- Expansion tree:
  `2d4e237dabac17d464e4ec80e98b769c9b772b30`
- Complete multilingual review merge:
  `da99ca8e88d9bd46fbd46beea5ef87be8fdba99a`
- Complete multilingual review tree:
  `64a36f08f9c73b6513cecdf083bcf8af27f91ab6`
- SNBT subtree at that merge:
  `54159f4a89d4d8bb04518400c901f82a4e240664`
- TKA subtree at that merge:
  `9283b0528d608ed62a414e946d712976067ce69d`

PR [#274](https://github.com/nakafaai/aksara/pull/274) introduced the
expanded set inventory and newly added practice items. PR
[#278](https://github.com/nakafaai/aksara/pull/278) owns the later rewrites,
locale review, response balancing, worked-answer changes, and exact visual
geometry. The hashes above establish the baseline before the rich-metadata
follow-up. The commit containing this record and later commits own subsequent
output bytes through ordinary Git history.

## Authorized TKA references

The user authorized the Drive folder
[`1F29Lm4wIKfdGUmhOxx1xSdkyStwKyQsh`](https://drive.google.com/drive/folders/1F29Lm4wIKfdGUmhOxx1xSdkyStwKyQsh)
as a supplementary research source. The following stored PDFs were the bounded
mandatory-subject examples used for format and difficulty comparison:

| Subject | Drive file | Revision | Bytes |
|---|---|---|---:|
| Mathematics | [`1RvtDXS4a5f09m-unfIbtSJuhIzrrna3W`](https://drive.google.com/file/d/1RvtDXS4a5f09m-unfIbtSJuhIzrrna3W/view) | `0B86GzB1cQEvKTFdidWp5L2pjRk40T2tJMXorMHp3Tis1bzlrPQ` | 1,568,001 |
| Indonesian | [`1_tRcadyeUsWMZpTAcsVHmL1KB6Fzp3F5`](https://drive.google.com/file/d/1_tRcadyeUsWMZpTAcsVHmL1KB6Fzp3F5/view) | `0B86GzB1cQEvKRkNjNTVKdmdTTEFOZ1BhQUdRem5sRVN6MmUwPQ` | 1,529,576 |
| English | [`1IathGpAW4EVs0ntwxR8C00LCXUYizOKy`](https://drive.google.com/file/d/1IathGpAW4EVs0ntwxR8C00LCXUYizOKy/view) | `0B86GzB1cQEvKU29LSm1BeTFFeS94UHY4T0JTdVBwTUxON01jPQ` | 1,528,564 |

The connected Drive metadata was checked on 2026-09-01 and returned one current
revision for each file, dated 2026-07-08. It did not expose a checksum, and the
revisions were not marked `keepForever`. The file ID, opaque current revision
ID, and byte size therefore identify the observed Drive state for review, but
do not claim durable byte provenance.

The authoritative blueprint source remains the public
[Kerangka Asesmen TKA](https://pusmendik.kemendikdasmen.go.id/tka/page/download_file/370807_44),
not the Drive copies. Its exact readiness use is declared in
`packages/corpus/tryout/indonesia/tka/evidence.ts` and the three subject-owned
readiness modules.

## Release boundary

Git history establishes source and editorial provenance, but it does not prove
public activation. `datePublished` and `dateModified` become truthful only when
the matching signed content release is activated. The publisher must bind the
final merge SHA, content hashes, renderer manifest, and active release receipt
before these dates may be exposed as production facts.
