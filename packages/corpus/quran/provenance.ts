import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { QuranProvenanceRecordSchema } from "@nakafa/aksara-contracts/quran/provenance";
import {
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
} from "@nakafa/aksara-contracts/quran/source";
import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const RETRIEVED_AT = "2026-07-24T17:57:50Z";
const QURANENC_TERMS = {
  artifact: {
    ...QURAN_SOURCE_POLICY.terms.quranenc.artifact,
  },
  url: "https://quranenc.com/en/",
} satisfies QuranSourceAttribution["terms"];

const tanzilText = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.data.arabic.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "Tanzil Quran Text (Uthmani, Version 1.1). Copyright (C) 2007-2026 Tanzil Project. Creative Commons Attribution 3.0. Distributed verbatim; changing the text is not allowed.",
      title: "Tanzil Quran Text (Uthmani)",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Teks Al-Qur'an Tanzil (Utsmani, versi 1.1). Hak cipta (C) 2007-2026 Tanzil Project. Lisensi Creative Commons Attribution 3.0. Teks disebarkan apa adanya dan tidak boleh diubah.",
      title: "Teks Al-Qur'an Tanzil (Utsmani)",
    },
  ],
  id: "tanzil-text",
  publisher: "Tanzil Project",
  retrievedAt: RETRIEVED_AT,
  sourceUrl:
    "https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=txt&agree=true",
  terms: {
    artifact: {
      ...QURAN_SOURCE_POLICY.terms.tanzil.artifact,
    },
    url: "https://tanzil.net/docs/Text_License",
  },
  updateUrl: "https://tanzil.net/updates/",
  version: "1.1",
});

const tanzilMetadata = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.data.metadata.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "Quran Metadata, Version 1.0. Copyright (C) 2008-2009 Tanzil.info. The official artifact declares the CC BY license.",
      title: "Quran Metadata",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Metadata Al-Qur'an, versi 1.0. Hak cipta (C) 2008-2009 Tanzil.info. Artefak resminya mencantumkan lisensi CC BY.",
      title: "Metadata Al-Qur'an",
    },
  ],
  id: "tanzil-metadata",
  publisher: "Tanzil Project",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://tanzil.net/res/text/metadata/quran-data.xml",
  terms: {
    artifact: {
      ...QURAN_SOURCE_POLICY.data.metadata.artifact,
    },
    url: "https://tanzil.net/docs/Quran_Metadata",
  },
  updateUrl: "https://tanzil.net/docs/Quran_Metadata",
  version: "1.0",
});

const quranencEnglish = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.data.english.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "English translation by the Rowwad Translation Center team, in cooperation with the Rabwah Dawah Association, the Islamic Content Service Association in Languages, and IslamHouse.com. Source: QuranEnc.com.",
      title: "Translation of the meanings of the Noble Qur'an",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Terjemahan bahasa Inggris oleh tim Rowwad Translation Center, bekerja sama dengan Rabwah Dawah Association, Islamic Content Service Association in Languages, dan IslamHouse.com. Sumber: QuranEnc.com.",
      title: "Terjemahan bahasa Inggris makna Al-Qur'an",
    },
  ],
  id: "quranenc-english",
  publisher: "Rowwad Translation Center",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://quranenc.com/en/home/download/xml/english_rwwad",
  terms: QURANENC_TERMS,
  updateUrl: "https://quranenc.com/check/english_rwwad/v1.0.19-xml.1",
  version: "v1.0.19-xml.1",
});

const quranencIndonesian = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.data.indonesian.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "Indonesian translation issued by the Indonesian Ministry of Religious Affairs and developed under the supervision of Rowwad Translation Center. Source: QuranEnc.com.",
      title: "Indonesian Translation - Ministry of Religious Affairs",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Terjemahan bahasa Indonesia diterbitkan oleh Kementerian Agama Republik Indonesia dan dikembangkan di bawah pengawasan Rowwad Translation Center. Sumber: QuranEnc.com.",
      title: "Terjemahan Indonesia - Kementerian Agama",
    },
  ],
  id: "quranenc-indonesian",
  publisher: "Indonesian Ministry of Religious Affairs",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://quranenc.com/en/home/download/xml/indonesian_affairs",
  terms: QURANENC_TERMS,
  updateUrl: "https://quranenc.com/check/indonesian_affairs/v1.0.1-xml.1",
  version: "v1.0.1-xml.1",
});

const quranencTafsir = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.tafsir.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "Indonesian Translation of Al-Mukhtasar in Interpreting the Noble Quran, issued by Tafsir Center for Quranic Studies. Source: QuranEnc.com.",
      title:
        "Indonesian Translation of Al-Mukhtasar in Interpreting the Noble Quran",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Terjemahan bahasa Indonesia Al-Mukhtashar fi Tafsir Al-Qur'an diterbitkan oleh Tafsir Center for Quranic Studies. Sumber: QuranEnc.com.",
      title: "Terjemahan Indonesia Al-Mukhtashar fi Tafsir Al-Qur'an",
    },
  ],
  id: "quranenc-tafsir",
  publisher: "Tafsir Center for Quranic Studies",
  retrievedAt: RETRIEVED_AT,
  sourceUrl:
    "https://quranenc.com/api/v1/translation/sura/indonesian_mokhtasar/1",
  terms: QURANENC_TERMS,
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
    attribution: quranencIndonesian,
    evidence:
      "The official exact XML transcript, publisher, v1.0.1-xml.1 identifier, republishing terms, and update endpoint are pinned without modifying content.",
    scope: "id-translation",
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
    attribution: tanzilMetadata,
    evidence:
      "Surah identity, verse counts, revelation order and place, partitions, and sajda markers come only from the pinned official metadata v1.0 bytes declaring cc-by.",
    scope: "metadata",
    status: "approved",
  }),
];
