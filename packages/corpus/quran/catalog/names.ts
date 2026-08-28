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
