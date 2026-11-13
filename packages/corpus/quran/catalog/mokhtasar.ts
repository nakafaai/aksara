import {
  ACTIVE_APP_LOCALE_CODES,
  AppLocaleCodeSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { QuranExternalSourceAttributionSchema } from "@nakafa/aksara-contracts/quran/source";
import { Array as Arr, Schema } from "effect";

const MokhtasarEditionSchema = Schema.Struct({
  appLocale: AppLocaleCodeSchema,
  bookId: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  completed: Schema.Literal(true),
  officialUrl: Schema.Trimmed.check(Schema.isNonEmpty()),
  slug: Schema.Trimmed.check(Schema.isNonEmpty()),
  title: Schema.Trimmed.check(Schema.isNonEmpty()),
  version: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
});

/** Checks that the official catalog covers every active application locale once. */
function hasCompleteLocaleCoverage(
  editions: readonly (typeof MokhtasarEditionSchema.Type)[]
) {
  return (
    editions.length === ACTIVE_APP_LOCALE_CODES.length &&
    Arr.every(
      editions,
      ({ appLocale }, index) => appLocale === ACTIVE_APP_LOCALE_CODES[index]
    )
  );
}

const MokhtasarCatalogSchema = Schema.Struct({
  editions: Schema.NonEmptyArray(MokhtasarEditionSchema).pipe(
    Schema.check(
      Schema.makeFilter(hasCompleteLocaleCoverage, {
        message:
          "Expected one official Mokhtasar edition for every active app locale.",
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
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          `Edisi rasmi Al-Mukhtasar dalam bahasa Inggeris, buku ${mokhtasarEnglishEdition.bookId}, versi katalog ${mokhtasarEnglishEdition.version}. Nakafa memautkan penerbit dan tidak menerbitkan semula teksnya.`,
        title: "Tafsir Al-Mukhtasar Inggeris Rasmi",
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
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice:
          `Edisi rasmi Al-Mukhtasar dalam bahasa Jerman, buku ${mokhtasarGermanEdition.bookId}, versi katalog ${mokhtasarGermanEdition.version}. Nakafa memautkan penerbit dan tidak menerbitkan semula teksnya.`,
        title: "Tafsir Al-Mukhtasar Jerman Rasmi",
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

/** Official external Indonesian attribution, the Tafsir access for Malay readers. */
export const mokhtasarIndonesianAttribution =
  QuranExternalSourceAttributionSchema.make({
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice: `Official Indonesian Al-Mukhtasar edition, book ${mokhtasarIndonesianEdition.bookId}, catalog version ${mokhtasarIndonesianEdition.version}. No Malay edition exists, so Malay readers are linked to the Indonesian one. Nakafa links to the publisher and does not republish its text.`,
        title: "Official Indonesian Al-Mukhtasar Tafsir",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice: `Edisi resmi Al-Mukhtasar berbahasa Indonesia, buku ${mokhtasarIndonesianEdition.bookId}, versi katalog ${mokhtasarIndonesianEdition.version}. Belum ada edisi bahasa Melayu, jadi pembaca bahasa Melayu ditautkan ke edisi Indonesia. Nakafa menautkan penerbit dan tidak menerbitkan ulang teksnya.`,
        title: "Tafsir Al-Mukhtasar Indonesia Resmi",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice: `Offizielle indonesische Al-Mukhtasar-Ausgabe, Buch ${mokhtasarIndonesianEdition.bookId}, Katalogversion ${mokhtasarIndonesianEdition.version}. Eine malaiische Ausgabe gibt es nicht, daher verlinkt Nakafa malaiische Leser auf die indonesische. Nakafa verlinkt den Herausgeber und veröffentlicht den Text nicht erneut.`,
        title: "Offizieller indonesischer Al-Mukhtasar-Tafsir",
      },
      {
        appLocale: AppLocaleSchema.make("ms"),
        notice: `Edisi rasmi Al-Mukhtasar dalam bahasa Indonesia, buku ${mokhtasarIndonesianEdition.bookId}, versi katalog ${mokhtasarIndonesianEdition.version}. Tiada edisi bahasa Melayu, jadi pembaca bahasa Melayu dipautkan kepada edisi bahasa Indonesia. Nakafa memautkan penerbit dan tidak menerbitkan semula teksnya.`,
        title: "Tafsir Al-Mukhtasar Indonesia Rasmi",
      },
    ],
    id: "mokhtasar-indonesian",
    kind: "external",
    publisher: mokhtasarCatalog.publisher,
    retrievedAt: mokhtasarCatalog.observedAt,
    sourceUrl: mokhtasarIndonesianEdition.officialUrl,
    terms: {
      access: mokhtasarCatalog.terms.access,
      url: mokhtasarCatalog.terms.url,
    },
    updateUrl: mokhtasarIndonesianEdition.officialUrl,
    version: `catalog-v${mokhtasarIndonesianEdition.version}`,
  });
