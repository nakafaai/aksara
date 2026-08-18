import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  QuranSourceAttributionSchema,
  QuranSourceCopySchema,
} from "@nakafa/aksara-contracts/quran/source";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

/** Reviewed German copy for every official Quran source visible in Nakafa. */
export const germanQuranSourceCopy = {
  "quranenc-english": QuranSourceCopySchema.make({
    appLocale: AppLocaleSchema.make("de"),
    notice:
      "Die englische Übersetzung stammt vom Team des Rowwad Translation Center. Sie entstand in Zusammenarbeit mit der Rabwah Dawah Association, der Islamic Content Service Association in Languages und IslamHouse.com. Quelle: QuranEnc.com.",
    title: "Englische Übersetzung der Bedeutungen des Quran",
  }),
  "quranenc-indonesian": QuranSourceCopySchema.make({
    appLocale: AppLocaleSchema.make("de"),
    notice:
      "Die indonesische Übersetzung wurde vom indonesischen Religionsministerium herausgegeben und unter Aufsicht des Rowwad Translation Center weiterentwickelt. Quelle: QuranEnc.com.",
    title: "Indonesische Übersetzung des Religionsministeriums",
  }),
  "quranenc-tafsir": QuranSourceCopySchema.make({
    appLocale: AppLocaleSchema.make("de"),
    notice:
      "Diese Quelle enthält Al-Mukhtasar auf Indonesisch, einen Tafsir (Koranauslegung). Herausgeber ist das Tafsir Center for Quranic Studies. Eine deutsche Tafsir-Ausgabe ist bei Nakafa derzeit nicht verfügbar. Quelle: QuranEnc.com.",
    title: "Al-Mukhtasar auf Indonesisch",
  }),
  "tanzil-metadata": QuranSourceCopySchema.make({
    appLocale: AppLocaleSchema.make("de"),
    notice:
      "Die Quran-Metadaten, Version 1.0, stammen von Tanzil.info. In der Originaldatei ist Creative Commons Namensnennung als Lizenz angegeben. Copyright (C) 2008-2009 Tanzil.info.",
    title: "Quran-Metadaten",
  }),
  "tanzil-text": QuranSourceCopySchema.make({
    appLocale: AppLocaleSchema.make("de"),
    notice:
      "Der Qurantext von Tanzil liegt in uthmanischer Schrift, Version 1.1, vor. Er steht unter der Lizenz Creative Commons Namensnennung 3.0 und wird unverändert wiedergegeben. Copyright (C) 2007-2026 Tanzil Project.",
    title: "Tanzil-Qurantext in uthmanischer Schrift",
  }),
} as const;

/** Complete reviewed attribution for the pinned German Bubenheim translation. */
export const germanQuranSourceAttribution = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.data.translations.de.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "‘Abdullah as-Sāmit (Frank Bubenheim) and Dr. Nadim Elias translated this German edition. The pinned IslamHouse publication record credits the King Fahd Complex For Printing The Holy Quran as its source. The transcript comes from QuranEnc.com.",
      title: "German Translation - Frank Bubenheim",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Terjemahan bahasa Jerman ini disusun oleh ‘Abdullah as-Sāmit (Frank Bubenheim) dan Dr. Nadim Elias. Catatan publikasi IslamHouse yang disimpan mencantumkan King Fahd Complex For Printing The Holy Quran sebagai sumber. Transkripnya berasal dari QuranEnc.com.",
      title: "Terjemahan bahasa Jerman - Frank Bubenheim",
    },
    {
      appLocale: AppLocaleSchema.make("de"),
      notice:
        "Diese deutsche Übersetzung stammt von ‘Abdullah as-Sāmit (Frank Bubenheim) und Dr. Nadim Elias. Der gesicherte IslamHouse-Publikationsdatensatz nennt das König-Fahd-Institut für den Druck der edlen Quran-Bücher als Quelle. Das Transkript stammt von QuranEnc.com.",
      title: "Deutsche Quranübersetzung von Frank Bubenheim und Nadim Elias",
    },
  ],
  id: "quranenc-german",
  publisher: "King Fahd Complex For Printing The Holy Quran",
  retrievedAt: "2026-08-13T06:12:57Z",
  sourceUrl: "https://quranenc.com/en/home/download/xml/german_bubenheim",
  terms: {
    artifact: {
      ...QURAN_SOURCE_POLICY.terms.quranenc.artifact,
    },
    url: "https://quranenc.com/en/",
  },
  updateUrl: "https://quranenc.com/check/german_bubenheim/v1.1.4-xml.1",
  version: "v1.1.4-xml.1",
});
