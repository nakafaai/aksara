import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  type QuranEmbeddedSourceAttribution,
  QuranEmbeddedSourceAttributionSchema,
} from "@nakafa/aksara-contracts/quran/source";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const RETRIEVED_AT = "2026-07-24T17:57:50Z";
const QURANENC_TERMS: QuranEmbeddedSourceAttribution["terms"] = {
  artifact: {
    ...QURAN_SOURCE_POLICY.terms.quranenc.artifact,
  },
  url: "https://quranenc.com/en/",
};

/** Complete attribution for the pinned English QuranEnc translation. */
export const quranencEnglishAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
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
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Die englische Übersetzung stammt vom Team des Rowwad Translation Center. Sie entstand in Zusammenarbeit mit der Rabwah Dawah Association, der Islamic Content Service Association in Languages und IslamHouse.com. Quelle: QuranEnc.com.",
        title: "Englische Übersetzung der Bedeutungen des Quran",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Terjemahan bahasa Inggeris oleh pasukan Rowwad Translation Center, dengan kerjasama Rabwah Dawah Association, Islamic Content Service Association in Languages dan IslamHouse.com. Sumber: QuranEnc.com.",
        title: "Terjemahan bahasa Inggeris makna Al-Quran",
      },
    ],
    id: "quranenc-english",
    kind: "embedded",
    publisher: "Rowwad Translation Center",
    retrievedAt: RETRIEVED_AT,
    sourceUrl: "https://quranenc.com/en/home/download/xml/english_rwwad",
    terms: QURANENC_TERMS,
    updateUrl: "https://quranenc.com/check/english_rwwad/v1.0.19-xml.1",
    version: "v1.0.19-xml.1",
  });

/** Complete attribution for the pinned Indonesian QuranEnc translation. */
export const quranencIndonesianAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
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
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Die indonesische Übersetzung wurde vom indonesischen Religionsministerium herausgegeben und unter Aufsicht des Rowwad Translation Center weiterentwickelt. Quelle: QuranEnc.com.",
        title: "Indonesische Übersetzung des Religionsministeriums",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Terjemahan bahasa Indonesia diterbitkan oleh Kementerian Agama Republik Indonesia dan dibangunkan di bawah seliaan Rowwad Translation Center. Sumber: QuranEnc.com.",
        title: "Terjemahan bahasa Indonesia - Kementerian Agama",
      },
    ],
    id: "quranenc-indonesian",
    kind: "embedded",
    publisher: "Indonesian Ministry of Religious Affairs",
    retrievedAt: RETRIEVED_AT,
    sourceUrl: "https://quranenc.com/en/home/download/xml/indonesian_affairs",
    terms: QURANENC_TERMS,
    updateUrl: "https://quranenc.com/check/indonesian_affairs/v1.0.1-xml.1",
    version: "v1.0.1-xml.1",
  });

/** Complete attribution for the pinned Indonesian Al-Mukhtasar corpus. */
export const quranencTafsirAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
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
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Diese eingebettete Quelle enthält Al-Mukhtasar auf Indonesisch. Nakafa verlinkt die separate offizielle deutsche Ausgabe, ohne deren Text neu zu veröffentlichen. Quelle: QuranEnc.com.",
        title: "Al-Mukhtasar auf Indonesisch",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Sumber terbenam ini mengandungi Al-Mukhtasar dalam bahasa Indonesia. Bagi pembaca bahasa Melayu, Nakafa memautkan edisi rasmi bahasa Indonesia di laman penerbit tanpa menerbitkan semula teksnya. Sumber: QuranEnc.com.",
        title: "Al-Mukhtasar dalam bahasa Indonesia",
      },
    ],
    id: "quranenc-tafsir",
    kind: "embedded",
    publisher: "Tafsir Center for Quranic Studies",
    retrievedAt: RETRIEVED_AT,
    sourceUrl:
      "https://quranenc.com/api/v1/translation/sura/indonesian_mokhtasar/1",
    terms: QURANENC_TERMS,
    updateUrl: "https://quranenc.com/id/browse/indonesian_mokhtasar",
    version: "v1.0.0",
  });

/** Complete attribution for the pinned German Bubenheim translation. */
export const quranencGermanAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
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
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "‘Abdullah as-Sāmit (Frank Bubenheim) dan Dr. Nadim Elias menterjemahkan edisi bahasa Jerman ini. Rekod penerbitan IslamHouse yang disematkan menyatakan Kompleks Raja Fahd untuk Percetakan Al-Quran sebagai sumbernya. Transkripnya diambil daripada QuranEnc.com.",
        title: "Terjemahan bahasa Jerman - Frank Bubenheim",
      },
    ],
    id: "quranenc-german",
    kind: "embedded",
    publisher: "King Fahd Complex For Printing The Holy Quran",
    retrievedAt: "2026-08-13T06:12:57Z",
    sourceUrl: "https://quranenc.com/en/home/download/xml/german_bubenheim",
    terms: QURANENC_TERMS,
    updateUrl: "https://quranenc.com/check/german_bubenheim/v1.1.4-xml.1",
    version: "v1.1.4-xml.1",
  });

/** Complete attribution for the pinned Malay QuranEnc translation. */
export const quranencMalayAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
    artifact: {
      ...QURAN_SOURCE_POLICY.malayTranslation.artifact,
    },
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice:
          "Malay translation by Abdullah Basumayyah, version 1.0.0, pinned as the 114 official QuranEnc API responses because QuranEnc publishes no XML transcript of it. Source: QuranEnc.com.",
        title: "Malay Translation - Abdullah Basumayyah",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice:
          "Terjemahan bahasa Melayu oleh Abdullah Basumayyah, versi 1.0.0, disimpan sebagai 114 respons resmi API QuranEnc karena QuranEnc tidak menerbitkan transkrip XML-nya. Sumber: QuranEnc.com.",
        title: "Terjemahan Melayu - Abdullah Basumayyah",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Malaiische Übersetzung von Abdullah Basumayyah, Version 1.0.0, gespeichert als die 114 offiziellen QuranEnc-API-Antworten, weil QuranEnc kein XML-Transkript davon veröffentlicht. Quelle: QuranEnc.com.",
        title: "Malaiische Übersetzung - Abdullah Basumayyah",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Terjemahan bahasa Melayu oleh Abdullah Basumayyah, versi 1.0.0, disimpan sebagai 114 respons rasmi API QuranEnc kerana QuranEnc tidak menerbitkan transkrip XML baginya. Sumber: QuranEnc.com.",
        title: "Terjemahan Melayu - Abdullah Basumayyah",
      },
    ],
    id: "quranenc-malay",
    kind: "embedded",
    publisher: "Abdullah Basumayyah",
    retrievedAt: "2026-11-13T15:30:00Z",
    sourceUrl: "https://quranenc.com/api/v1/translation/sura/malay_basumayyah/1",
    terms: QURANENC_TERMS,
    updateUrl: "https://quranenc.com/en/browse/malay_basumayyah",
    version: "v1.0.0",
  });
