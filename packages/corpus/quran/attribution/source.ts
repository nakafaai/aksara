import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  QURAN_SOURCE_IDS,
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
  type QuranSourceId,
} from "@nakafa/aksara-contracts/quran/source";

import {
  germanQuranSourceAttribution,
  germanQuranSourceCopy,
} from "#corpus/quran/attribution/german";
import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const RETRIEVED_AT = "2026-07-24T17:57:50Z";
const QURANENC_TERMS: QuranSourceAttribution["terms"] = {
  artifact: {
    ...QURAN_SOURCE_POLICY.terms.quranenc.artifact,
  },
  url: "https://quranenc.com/en/",
};

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
    germanQuranSourceCopy["tanzil-text"],
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
    germanQuranSourceCopy["tanzil-metadata"],
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
    ...QURAN_SOURCE_POLICY.data.translations.en.artifact,
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
    germanQuranSourceCopy["quranenc-english"],
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
    ...QURAN_SOURCE_POLICY.data.translations.id.artifact,
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
    germanQuranSourceCopy["quranenc-indonesian"],
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
    germanQuranSourceCopy["quranenc-tafsir"],
  ],
  id: "quranenc-tafsir",
  publisher: "Tafsir Center for Quranic Studies",
  retrievedAt: RETRIEVED_AT,
  sourceUrl:
    "https://quranenc.com/api/v1/translation/sura/indonesian_mokhtasar/1",
  terms: QURANENC_TERMS,
  updateUrl: "https://quranenc.com/id/browse/indonesian_mokhtasar",
  version: "v1.0.0",
});

const attributionBySourceId: Record<QuranSourceId, QuranSourceAttribution> = {
  "quranenc-english": quranencEnglish,
  "quranenc-german": germanQuranSourceAttribution,
  "quranenc-indonesian": quranencIndonesian,
  "quranenc-tafsir": quranencTafsir,
  "tanzil-metadata": tanzilMetadata,
  "tanzil-text": tanzilText,
};

/** Complete authoring source attribution in canonical contract order. */
export const quranSourceAttributions = QURAN_SOURCE_IDS.map(
  (sourceId) => attributionBySourceId[sourceId]
);

/** Resolves one complete authoring attribution by its stable source identity. */
export function authoringQuranSourceAttribution(sourceId: QuranSourceId) {
  return attributionBySourceId[sourceId];
}
