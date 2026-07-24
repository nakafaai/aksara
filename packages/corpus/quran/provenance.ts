import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { QuranProvenanceRecordSchema } from "@nakafa/aksara-contracts/quran/provenance";
import {
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
} from "@nakafa/aksara-contracts/quran/source";

const RETRIEVED_AT = "2026-07-24T17:57:50Z";
const QURANENC_TERMS = {
  artifact: {
    byteCount: 1_051_521,
    digest: Sha256HashSchema.make(
      "sha256:858791320276bef37616be75f3d57efac5b46463246d7cf5503aab1a6de2c774"
    ),
    fileCount: 1,
  },
  url: "https://quranenc.com/en/",
} satisfies QuranSourceAttribution["terms"];

const tanzilText = QuranSourceAttributionSchema.make({
  artifact: {
    byteCount: 1_334_737,
    digest: Sha256HashSchema.make(
      "sha256:ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af"
    ),
    fileCount: 1,
  },
  id: "tanzil-text",
  notice:
    "Tanzil Quran Text (Uthmani, Version 1.1). Copyright (C) 2007-2026 Tanzil Project. Creative Commons Attribution 3.0. Distributed verbatim; changing the text is not allowed.",
  publisher: "Tanzil Project",
  retrievedAt: RETRIEVED_AT,
  sourceUrl:
    "https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=txt&agree=true",
  terms: {
    artifact: {
      byteCount: 7903,
      digest: Sha256HashSchema.make(
        "sha256:795064d93b6b9a9e2df190800a32bfe77add93eb6e978215ddb36f8e0130ccaa"
      ),
      fileCount: 1,
    },
    url: "https://tanzil.net/docs/Text_License",
  },
  title: "Tanzil Quran Text (Uthmani)",
  updateUrl: "https://tanzil.net/updates/",
  version: "1.1",
});

const tanzilMetadata = QuranSourceAttributionSchema.make({
  artifact: {
    byteCount: 77_234,
    digest: Sha256HashSchema.make(
      "sha256:8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a"
    ),
    fileCount: 1,
  },
  id: "tanzil-metadata",
  notice:
    "Quran Metadata, Version 1.0. Copyright (C) 2008-2009 Tanzil.info. The official artifact declares the cc-by license.",
  publisher: "Tanzil Project",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://tanzil.net/res/text/metadata/quran-data.xml",
  terms: {
    artifact: {
      byteCount: 77_234,
      digest: Sha256HashSchema.make(
        "sha256:8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a"
      ),
      fileCount: 1,
    },
    url: "https://tanzil.net/docs/Quran_Metadata",
  },
  title: "Quran Metadata",
  updateUrl: "https://tanzil.net/docs/Quran_Metadata",
  version: "1.0",
});

const quranencEnglish = QuranSourceAttributionSchema.make({
  artifact: {
    byteCount: 1_690_410,
    digest: Sha256HashSchema.make(
      "sha256:213e1aeb515c5bac6ca446955527b8f3c0f9c21e9d1bad9c6857e9e5b282e9b6"
    ),
    fileCount: 1,
  },
  id: "quranenc-english",
  notice:
    "English translation by the Rowwad Translation Center team, in cooperation with the Rabwah Dawah Association, the Islamic Content Service Association in Languages, and IslamHouse.com. Source: QuranEnc.com.",
  publisher: "Rowwad Translation Center",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://quranenc.com/en/home/download/xml/english_rwwad",
  terms: QURANENC_TERMS,
  title: "Translation of the meanings of the Noble Qur'an",
  updateUrl: "https://quranenc.com/check/english_rwwad/v1.0.19-xml.1",
  version: "v1.0.19-xml.1",
});

const quranencIndonesian = QuranSourceAttributionSchema.make({
  artifact: {
    byteCount: 1_820_207,
    digest: Sha256HashSchema.make(
      "sha256:45d0014236443e91af1338fe7b60f9e20741c6ff5b4ee82ead960d111f91071b"
    ),
    fileCount: 1,
  },
  id: "quranenc-indonesian",
  notice:
    "Indonesian translation issued by the Indonesian Ministry of Religious Affairs and developed under the supervision of Rowwad Translation Center. Source: QuranEnc.com.",
  publisher: "Indonesian Ministry of Religious Affairs",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://quranenc.com/en/home/download/xml/indonesian_affairs",
  terms: QURANENC_TERMS,
  title: "Indonesian Translation - Ministry of Religious Affairs",
  updateUrl: "https://quranenc.com/check/indonesian_affairs/v1.0.1-xml.1",
  version: "v1.0.1-xml.1",
});

const quranencTafsir = QuranSourceAttributionSchema.make({
  artifact: {
    byteCount: 6_584_353,
    digest: Sha256HashSchema.make(
      "sha256:b46b730418767dfacdf34ac35cec4277822a019b631910d603def280c3d56364"
    ),
    fileCount: 114,
  },
  id: "quranenc-tafsir",
  notice:
    "Indonesian Translation of Al-Mukhtasar in Interpreting the Noble Quran, issued by Tafsir Center for Quranic Studies. Source: QuranEnc.com.",
  publisher: "Tafsir Center for Quranic Studies",
  retrievedAt: RETRIEVED_AT,
  sourceUrl:
    "https://quranenc.com/api/v1/translation/sura/indonesian_mokhtasar/1",
  terms: QURANENC_TERMS,
  title:
    "Indonesian Translation of Al-Mukhtasar in Interpreting the Noble Quran",
  updateUrl: "https://quranenc.com/en/browse/indonesian_mokhtasar",
  version: "v1.0.0",
});

/** Complete visible source attribution in canonical display order. */
export const quranSourceAttributions: readonly [
  QuranSourceAttribution,
  ...QuranSourceAttribution[],
] = [
  tanzilText,
  tanzilMetadata,
  quranencEnglish,
  quranencIndonesian,
  quranencTafsir,
];

/** Exact ordered provider evidence used to gate Quran publication. */
export const quranProvenanceRecords = [
  QuranProvenanceRecordSchema.make({
    attribution: tanzilText,
    evidence:
      "The pinned Uthmani v1.1 bytes are generated and published verbatim with the required Tanzil attribution, update link, license notice, and unchanged raw copyright block.",
    scope: "arabic-text",
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    attribution: quranencEnglish,
    evidence:
      "The official exact XML transcript, publisher, v1.0.19-xml.1 identifier, republishing terms, and update endpoint are pinned without modifying content.",
    scope: "en-translation",
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    attribution: quranencTafsir,
    evidence:
      "All 114 official API responses are pinned as one domain-separated byte bundle; v1.0.0 publisher and republishing terms are preserved without short or long reconstruction.",
    scope: "id-tafsir",
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    attribution: quranencIndonesian,
    evidence:
      "The official exact XML transcript, publisher, v1.0.1-xml.1 identifier, republishing terms, and update endpoint are pinned without modifying content.",
    scope: "id-translation",
    status: "approved",
  }),
  QuranProvenanceRecordSchema.make({
    attribution: tanzilMetadata,
    evidence:
      "Surah identity, verse counts, revelation order and place, partitions, and sajda markers come only from the pinned official metadata v1.0 bytes declaring cc-by.",
    scope: "metadata",
    status: "approved",
  }),
];
