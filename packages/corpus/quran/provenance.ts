import { QuranProvenanceRecordSchema } from "@nakafa/aksara-contracts/quran/provenance";

const AL_QURAN_CLOUD_TERMS = "https://alquran.cloud/terms-and-conditions";
const GADING_LICENSE =
  "https://github.com/gadingnst/quran-api/blob/0d9497128748181fed96d29005c00afcec29d96d/LICENSE";
const MACHINE_LICENSE =
  "https://github.com/gadingnst/quran.machine/blob/0877dbcb902c028fa34601c9ca4101cc3d0d7d04/LICENSE";
const RIO_LICENSE =
  "https://github.com/rioastamal/quran-json/blob/73b1d5262f30695f5d17d9a61ce6b6af9b74aeda/LICENSE.md";
const BACHORS_SOURCE =
  "https://github.com/bachors/Al-Quran-ID-API/tree/2926f459401592cb91c20bd737a7a4b424d6040a";
const LPMQ_API = "https://quran-api.lpmqkemenag.id/";

/** Exact ordered provider evidence used to gate Quran publication. */
export const quranProvenanceRecords = [
  QuranProvenanceRecordSchema.make({
    evidence:
      "The exact Arabic edition is quran-simple-enhanced. Al Quran Cloud permits reproduction with source acknowledgement, but Nakafa has not shipped the required product attribution.",
    provider: "Al Quran Cloud",
    retrievedOn: "2026-07-23",
    scope: "arabic-text",
    sourceUrl: AL_QURAN_CLOUD_TERMS,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The imported Arabic values came through the pinned quran-api aggregation, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran-api",
    retrievedOn: "2026-07-23",
    scope: "arabic-text",
    sourceUrl: GADING_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The exact recitation edition is ar.alafasy by Mishary Rashid Alafasy. Current terms allow educational embedding but preserve reciter removal rights; durable Nakafa production approval is absent.",
    provider: "Al Quran Cloud",
    retrievedOn: "2026-07-23",
    scope: "audio",
    sourceUrl: AL_QURAN_CLOUD_TERMS,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The imported audio URLs came through the pinned quran-api aggregation, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran-api",
    retrievedOn: "2026-07-23",
    scope: "audio",
    sourceUrl: GADING_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The exact edition is en.sahih by Saheeh International. Al Quran Cloud requires translator attribution, which Nakafa has not shipped in the product.",
    provider: "Al Quran Cloud",
    retrievedOn: "2026-07-23",
    scope: "en-translation",
    sourceUrl: AL_QURAN_CLOUD_TERMS,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The imported English values came through the pinned quran-api aggregation, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran-api",
    retrievedOn: "2026-07-23",
    scope: "en-translation",
    sourceUrl: GADING_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The official API requires registration, a formal application, activation, and a token. No written permission proves redistribution of the exact short and long tafsir in public Git and hosted Nakafa.",
    provider: "LPMQ Kementerian Agama RI",
    retrievedOn: "2026-07-23",
    scope: "id-tafsir",
    sourceUrl: LPMQ_API,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The imported verse tafsir came through the pinned quran.machine generator, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran.machine",
    retrievedOn: "2026-07-23",
    scope: "id-tafsir",
    sourceUrl: MACHINE_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The official API requires registration, a formal application, activation, and a token. No written permission proves redistribution of the exact Indonesian translation in public Git and hosted Nakafa.",
    provider: "LPMQ Kementerian Agama RI",
    retrievedOn: "2026-07-23",
    scope: "id-translation",
    sourceUrl: LPMQ_API,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The imported Indonesian translation came through the pinned quran.machine generator, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran.machine",
    retrievedOn: "2026-07-23",
    scope: "id-translation",
    sourceUrl: MACHINE_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The pinned quran.machine generator reads quran-json as an intermediate Indonesian source. Its MIT notice is retained without treating that license as permission from Kemenag.",
    provider: "rioastamal/quran-json",
    retrievedOn: "2026-07-23",
    scope: "id-translation",
    sourceUrl: RIO_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "Verse numbering and part of the surah metadata came from the ar.alafasy response. The exact field chain is known, but product attribution and an explicit metadata redistribution basis are absent.",
    provider: "Al Quran Cloud",
    retrievedOn: "2026-07-23",
    scope: "metadata",
    sourceUrl: AL_QURAN_CLOUD_TERMS,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "Surah descriptions, revelation sequence, and short Arabic names came from this repository. It contains no license granting redistribution.",
    provider: "bachors/Al-Quran-ID-API",
    retrievedOn: "2026-07-23",
    scope: "metadata",
    sourceUrl: BACHORS_SOURCE,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The composite metadata came through the pinned quran-api aggregation, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran-api",
    retrievedOn: "2026-07-23",
    scope: "metadata",
    sourceUrl: GADING_LICENSE,
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The exact edition is en.transliteration, but its rights holder and redistribution license are not identified by the reviewed terms.",
    provider: "Al Quran Cloud",
    retrievedOn: "2026-07-23",
    scope: "transliteration",
    sourceUrl: AL_QURAN_CLOUD_TERMS,
    status: "blocked",
  }),
  QuranProvenanceRecordSchema.make({
    evidence:
      "The imported transliteration came through the pinned quran-api aggregation, which is MIT licensed and retained in the repository notice.",
    provider: "gadingnst/quran-api",
    retrievedOn: "2026-07-23",
    scope: "transliteration",
    sourceUrl: GADING_LICENSE,
    status: "approved",
  }),
];
