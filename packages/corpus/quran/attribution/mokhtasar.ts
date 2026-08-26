import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { QuranSourceAttributionSchema } from "@nakafa/aksara-contracts/quran/source";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const RETRIEVED_AT = "2026-08-26T15:51:00Z";
const TERMS = {
  artifact: {
    ...QURAN_SOURCE_POLICY.terms.mokhtasar.artifact,
  },
  url: "https://mokhtasr.com/en/pages/terms-and-conditions",
};

/** Official English Al-Mukhtasar edition that Nakafa links without copying. */
export const mokhtasarEnglishAttribution = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.evidence.mokhtasar.en.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "Official English Al-Mukhtasar edition, book 319, catalog version 7. Nakafa links to the publisher and does not republish its text.",
      title: "Official English Al-Mukhtasar Tafsir",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Edisi resmi Al-Mukhtasar berbahasa Inggris, buku 319, versi katalog 7. Nakafa menautkan penerbit dan tidak menerbitkan ulang teksnya.",
      title: "Tafsir Al-Mukhtasar Inggris Resmi",
    },
    {
      appLocale: AppLocaleSchema.make("de"),
      notice:
        "Offizielle englische Al-Mukhtasar-Ausgabe, Buch 319, Katalogversion 7. Nakafa verlinkt den Herausgeber und veröffentlicht den Text nicht erneut.",
      title: "Offizieller englischer Al-Mukhtasar-Tafsir",
    },
  ],
  id: "mokhtasar-english",
  publisher: "Dar al-Mukhtasar",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://mokhtasr.com/en/books/319",
  terms: TERMS,
  updateUrl: "https://mokhtasr.com/en/books/319",
  version: "catalog-v7",
});

/** Official German Al-Mukhtasar edition that Nakafa links without copying. */
export const mokhtasarGermanAttribution = QuranSourceAttributionSchema.make({
  artifact: {
    ...QURAN_SOURCE_POLICY.evidence.mokhtasar.de.artifact,
  },
  copy: [
    {
      appLocale: AppLocaleSchema.make("en"),
      notice:
        "Official German Al-Mukhtasar edition, book 336, catalog version 6. Nakafa links to the publisher and does not republish its text.",
      title: "Official German Al-Mukhtasar Tafsir",
    },
    {
      appLocale: AppLocaleSchema.make("id"),
      notice:
        "Edisi resmi Al-Mukhtasar berbahasa Jerman, buku 336, versi katalog 6. Nakafa menautkan penerbit dan tidak menerbitkan ulang teksnya.",
      title: "Tafsir Al-Mukhtasar Jerman Resmi",
    },
    {
      appLocale: AppLocaleSchema.make("de"),
      notice:
        "Offizielle deutsche Al-Mukhtasar-Ausgabe, Buch 336, Katalogversion 6. Nakafa verlinkt den Herausgeber und veröffentlicht den Text nicht erneut.",
      title: "Offizieller deutscher Al-Mukhtasar-Tafsir",
    },
  ],
  id: "mokhtasar-german",
  publisher: "Dar al-Mukhtasar",
  retrievedAt: RETRIEVED_AT,
  sourceUrl: "https://mokhtasr.com/en/books/336",
  terms: TERMS,
  updateUrl: "https://mokhtasr.com/en/books/336",
  version: "catalog-v6",
});
