import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { QuranEmbeddedSourceAttributionSchema } from "@nakafa/aksara-contracts/quran/source";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const RETRIEVED_AT = "2026-07-24T17:57:50Z";

/** Complete attribution for the verbatim Tanzil Uthmani text. */
export const tanzilTextAttribution = QuranEmbeddedSourceAttributionSchema.make({
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
    {
      appLocale: AppLocaleSchema.make("de"),
      notice:
        "Der Qurantext von Tanzil liegt in uthmanischer Schrift, Version 1.1, vor. Er steht unter der Lizenz Creative Commons Namensnennung 3.0 und wird unverändert wiedergegeben. Copyright (C) 2007-2026 Tanzil Project.",
      title: "Tanzil-Qurantext in uthmanischer Schrift",
    },
  ],
  id: "tanzil-text",
  kind: "embedded",
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

/** Complete attribution for the verbatim Tanzil Quran metadata. */
export const tanzilMetadataAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
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
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Die Quran-Metadaten, Version 1.0, stammen von Tanzil.info. In der Originaldatei ist Creative Commons Namensnennung als Lizenz angegeben. Copyright (C) 2008-2009 Tanzil.info.",
        title: "Quran-Metadaten",
      },
    ],
    id: "tanzil-metadata",
    kind: "embedded",
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
