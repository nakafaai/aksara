import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { QuranEmbeddedSourceAttributionSchema } from "@nakafa/aksara-contracts/quran/source";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const RETRIEVED_AT = "2026-08-28T03:59:12Z";

/** Official LPMQ source for the 114 Indonesian surah-name meanings. */
export const kemenagNamesAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
    artifact: { ...QURAN_SOURCE_POLICY.data.names.id.artifact },
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice:
          "All 114 Indonesian surah-name meanings come from LPMQ's official 2019 revised translation archive, version 4. Display capitalization is normalized without changing the words.",
        title: "Indonesian surah-name meanings from LPMQ",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice:
          "Seluruh 114 arti nama surah berasal dari arsip resmi Terjemahan Al-Qur'an Kemenag edisi penyempurnaan 2019, versi 4. Kapitalisasi tampilan dinormalkan tanpa mengubah kata.",
        title: "Arti nama surah Indonesia dari LPMQ",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Alle 114 indonesischen Bedeutungen der Surennamen stammen aus dem offiziellen LPMQ-Archiv der überarbeiteten Koranübersetzung von 2019, Version 4. Nur die Großschreibung für die Anzeige wurde normalisiert.",
        title: "Indonesische Surennamen-Bedeutungen von LPMQ",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Kesemua 114 maksud nama surah dalam bahasa Indonesia diambil daripada arkib terjemahan rasmi LPMQ yang disemak pada 2019, versi 4. Huruf besar dipaparkan secara seragam tanpa mengubah perkataannya.",
        title: "Maksud nama surah bahasa Indonesia daripada LPMQ",
      },
    ],
    id: "kemenag-names",
    kind: "embedded",
    publisher: "Lajnah Pentashihan Mushaf Al-Qur'an",
    retrievedAt: RETRIEVED_AT,
    sourceUrl:
      "https://lajnah.kemenag.go.id/info-lpmq/unduhan/terjemah-al-quran.html?download=3%3Aterjemah-tahun-2019",
    terms: {
      artifact: { ...QURAN_SOURCE_POLICY.terms.kemenag.artifact },
      url: "https://lajnah.kemenag.go.id/info-lpmq/berita-dan-artikel/berita/9-produk-hasil-kajian-lpmq-peroleh-surat-hak-cipta.html",
    },
    updateUrl:
      "https://lajnah.kemenag.go.id/info-lpmq/unduhan/terjemah-al-quran/terjemah-tahun-2019.html",
    version: "2019-v4-2022-11",
  });

/** Official Bubenheim and Elyas source for German surah-name meanings. */
export const bubenheimNamesAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
    artifact: { ...QURAN_SOURCE_POLICY.data.names.de.artifact },
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice:
          "All 114 German surah headings and the meanings stated in their source footnotes follow the official Bubenheim and Elyas edition published by the King Fahd Complex. Proper-name headings remain untranslated, exactly as in the edition.",
        title: "German surah names from the Bubenheim edition",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice:
          "Seluruh 114 judul surah bahasa Jerman dan arti yang dinyatakan dalam catatan sumber mengikuti edisi resmi Bubenheim dan Elyas yang diterbitkan oleh King Fahd Complex. Judul berupa nama diri tetap tidak diterjemahkan, sesuai edisi tersebut.",
        title: "Nama surah Jerman dari edisi Bubenheim",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Alle 114 deutschen Surenüberschriften und die in den Quellfußnoten genannten Bedeutungen folgen der offiziellen Ausgabe von Bubenheim und Elyas, herausgegeben vom König-Fahd-Komplex. Eigennamen bleiben wie in dieser Ausgabe unübersetzt.",
        title: "Deutsche Surennamen aus der Bubenheim-Ausgabe",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Kesemua 114 tajuk surah dalam bahasa Jerman dan maksud yang dinyatakan dalam nota kaki sumbernya mengikut edisi rasmi Bubenheim dan Elyas terbitan Kompleks Raja Fahd. Tajuk yang berupa nama khas kekal tidak diterjemahkan, sama seperti dalam edisi itu.",
        title: "Nama surah bahasa Jerman daripada edisi Bubenheim",
      },
    ],
    id: "bubenheim-names",
    kind: "embedded",
    publisher: "King Fahd Complex For Printing The Holy Quran",
    retrievedAt: RETRIEVED_AT,
    sourceUrl:
      "https://d1.islamhouse.com/data/de/ih_books/single/de-der-edle-quran-und-die-ubersetzung-seiner-bedeutung.pdf",
    terms: {
      artifact: { ...QURAN_SOURCE_POLICY.terms.islamhouse.artifact },
      url: "https://d1.islamhouse.com/html/faq.htm",
    },
    updateUrl:
      "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-item/59081/de/json",
    version: "islamhouse-attachment-1590725541",
  });

/** Nakafa's reviewed record of the 114 Malay surah-name meanings. */
export const nakafaMalayNamesAttribution =
  QuranEmbeddedSourceAttributionSchema.make({
    artifact: { ...QURAN_SOURCE_POLICY.data.names.ms.artifact },
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice:
          "No official Malaysian edition lists all 114 surah-name meanings, so Nakafa wrote the Malay values from the Arabic names and reviewed each one against the Tanzil English and LPMQ Indonesian meanings.",
        title: "Malay surah-name meanings by Nakafa",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice:
          "Belum ada edisi resmi Malaysia yang memuat makna ke-114 nama surah, jadi Nakafa menulis makna berbahasa Melayu dari nama Arabnya dan meninjau masing-masing terhadap makna bahasa Inggris dari Tanzil dan makna bahasa Indonesia dari LPMQ.",
        title: "Makna nama surah berbahasa Melayu dari Nakafa",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice:
          "Keine offizielle malaysische Ausgabe nennt die Bedeutungen aller 114 Surennamen. Deshalb hat Nakafa die malaiischen Bedeutungen aus den arabischen Namen geschrieben und jede mit den englischen Bedeutungen von Tanzil und den indonesischen von LPMQ abgeglichen.",
        title: "Malaiische Surennamen von Nakafa",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          "Tiada edisi rasmi Malaysia yang menyenaraikan maksud kesemua 114 nama surah, jadi Nakafa menulis maksud dalam bahasa Melayu daripada nama Arabnya dan menyemak setiap satu dengan maksud bahasa Inggeris daripada Tanzil dan maksud bahasa Indonesia daripada LPMQ.",
        title: "Maksud nama surah bahasa Melayu oleh Nakafa",
      },
    ],
    id: "nakafa-malay-names",
    kind: "embedded",
    publisher: "Nakafa",
    retrievedAt: "2026-11-13T15:30:00Z",
    sourceUrl:
      "https://github.com/nakafaai/aksara/blob/main/packages/corpus/quran/sources/nakafa/names.md",
    terms: {
      artifact: { ...QURAN_SOURCE_POLICY.terms.nakafa.artifact },
      url: "https://github.com/nakafaai/aksara/blob/main/LICENSE",
    },
    updateUrl:
      "https://github.com/nakafaai/aksara/commits/main/packages/corpus/quran/sources/nakafa/names.md",
    version: "2026-11-13",
  });

