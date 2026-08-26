import {
  APP_LOCALE_CODES,
  AppLocaleCodeSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { QuranExternalSourceAttributionSchema } from "@nakafa/aksara-contracts/quran/source";
import { Schema } from "effect";

const MokhtasarEditionSchema = Schema.Struct({
  appLocale: AppLocaleCodeSchema,
  bookId: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  completed: Schema.Literal(true),
  officialUrl: Schema.Trimmed.check(Schema.isNonEmpty()),
  slug: Schema.Trimmed.check(Schema.isNonEmpty()),
  title: Schema.Trimmed.check(Schema.isNonEmpty()),
  version: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
});

/** Checks that the official catalog covers every application locale once. */
function hasCompleteLocaleCoverage(
  editions: readonly (typeof MokhtasarEditionSchema.Type)[]
) {
  return (
    editions.length === APP_LOCALE_CODES.length &&
    editions.every(
      ({ appLocale }, index) => appLocale === APP_LOCALE_CODES[index]
    )
  );
}

const MokhtasarCatalogSchema = Schema.Struct({
  editions: Schema.NonEmptyArray(MokhtasarEditionSchema).pipe(
    Schema.check(
      Schema.makeFilter(hasCompleteLocaleCoverage, {
        message:
          "Expected one official Mokhtasar edition for every app locale.",
      })
    )
  ),
  observedAt: Schema.String.pipe(
    Schema.check(Schema.isPattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/u))
  ),
  publisher: Schema.Trimmed.check(Schema.isNonEmpty()),
  terms: Schema.Struct({
    access: Schema.Literal("link-only"),
    reason: Schema.Trimmed.check(Schema.isNonEmpty()),
    url: Schema.Trimmed.check(Schema.isNonEmpty()),
  }),
});

export const mokhtasarEnglishEdition = MokhtasarEditionSchema.make({
  appLocale: "en",
  bookId: 319,
  completed: true,
  officialUrl: "https://mokhtasr.com/en/books/319",
  slug: "english_mokhtasar",
  title: "الإنجليزية | English",
  version: 7,
});

export const mokhtasarIndonesianEdition = MokhtasarEditionSchema.make({
  appLocale: "id",
  bookId: 219,
  completed: true,
  officialUrl: "https://mokhtasr.com/en/books/219",
  slug: "indonesian_mokhtasar",
  title: "الإندونيسية | Indonesia",
  version: 6,
});

export const mokhtasarGermanEdition = MokhtasarEditionSchema.make({
  appLocale: "de",
  bookId: 336,
  completed: true,
  officialUrl: "https://mokhtasr.com/en/books/336",
  slug: "german_mokhtasar",
  title: "الألمانية | Deutsch",
  version: 6,
});

/** Reviewed official catalog metadata without copied Tafsir content. */
export const mokhtasarCatalog = MokhtasarCatalogSchema.make({
  editions: [
    mokhtasarEnglishEdition,
    mokhtasarIndonesianEdition,
    mokhtasarGermanEdition,
  ],
  observedAt: "2026-08-26T15:51:00Z",
  publisher: "Tafsir Center for Quranic Studies",
  terms: {
    access: "link-only",
    reason:
      "Nakafa links to the official editions and does not republish their text because the reviewed terms limit reproduction to personal, non-commercial use.",
    url: "https://mokhtasr.com/en/pages/terms-and-conditions",
  },
});

/** Official external English attribution derived from reviewed catalog facts. */
export const mokhtasarEnglishAttribution =
  QuranExternalSourceAttributionSchema.make({
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice: `Official English Al-Mukhtasar edition, book ${mokhtasarEnglishEdition.bookId}, catalog version ${mokhtasarEnglishEdition.version}. Nakafa links to the publisher and does not republish its text.`,
        title: "Official English Al-Mukhtasar Tafsir",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice: `Edisi resmi Al-Mukhtasar berbahasa Inggris, buku ${mokhtasarEnglishEdition.bookId}, versi katalog ${mokhtasarEnglishEdition.version}. Nakafa menautkan penerbit dan tidak menerbitkan ulang teksnya.`,
        title: "Tafsir Al-Mukhtasar Inggris Resmi",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice: `Offizielle englische Al-Mukhtasar-Ausgabe, Buch ${mokhtasarEnglishEdition.bookId}, Katalogversion ${mokhtasarEnglishEdition.version}. Nakafa verlinkt den Herausgeber und veröffentlicht den Text nicht erneut.`,
        title: "Offizieller englischer Al-Mukhtasar-Tafsir",
      },
    ],
    id: "mokhtasar-english",
    kind: "external",
    publisher: mokhtasarCatalog.publisher,
    retrievedAt: mokhtasarCatalog.observedAt,
    sourceUrl: mokhtasarEnglishEdition.officialUrl,
    terms: {
      access: mokhtasarCatalog.terms.access,
      url: mokhtasarCatalog.terms.url,
    },
    updateUrl: mokhtasarEnglishEdition.officialUrl,
    version: `catalog-v${mokhtasarEnglishEdition.version}`,
  });

/** Official external German attribution derived from reviewed catalog facts. */
export const mokhtasarGermanAttribution =
  QuranExternalSourceAttributionSchema.make({
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice: `Official German Al-Mukhtasar edition, book ${mokhtasarGermanEdition.bookId}, catalog version ${mokhtasarGermanEdition.version}. Nakafa links to the publisher and does not republish its text.`,
        title: "Official German Al-Mukhtasar Tafsir",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice: `Edisi resmi Al-Mukhtasar berbahasa Jerman, buku ${mokhtasarGermanEdition.bookId}, versi katalog ${mokhtasarGermanEdition.version}. Nakafa menautkan penerbit dan tidak menerbitkan ulang teksnya.`,
        title: "Tafsir Al-Mukhtasar Jerman Resmi",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice: `Offizielle deutsche Al-Mukhtasar-Ausgabe, Buch ${mokhtasarGermanEdition.bookId}, Katalogversion ${mokhtasarGermanEdition.version}. Nakafa verlinkt den Herausgeber und veröffentlicht den Text nicht erneut.`,
        title: "Offizieller deutscher Al-Mukhtasar-Tafsir",
      },
    ],
    id: "mokhtasar-german",
    kind: "external",
    publisher: mokhtasarCatalog.publisher,
    retrievedAt: mokhtasarCatalog.observedAt,
    sourceUrl: mokhtasarGermanEdition.officialUrl,
    terms: {
      access: mokhtasarCatalog.terms.access,
      url: mokhtasarCatalog.terms.url,
    },
    updateUrl: mokhtasarGermanEdition.officialUrl,
    version: `catalog-v${mokhtasarGermanEdition.version}`,
  });
