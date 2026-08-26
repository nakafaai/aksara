import {
  type ActiveAppLocaleList,
  type AppLocaleCode,
  AppLocaleSchema,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  type QuranTafsirAccess,
  QuranTafsirAccessSchema,
} from "@nakafa/aksara-contracts/quran/source";

const RETRIEVED_AT = "2026-08-26T15:51:00Z";

const quranTafsirAccessByLocale = {
  de: QuranTafsirAccessSchema.make({
    appLocale: AppLocaleSchema.make("de"),
    kind: "external",
    notice:
      "Nakafa bietet Al-Mukhtasar derzeit nur auf Indonesisch versweise an. Nakafa verwendet für Tafsir keine maschinelle Übersetzung.",
    source: {
      label: "Lies die offizielle deutsche Ausgabe auf der Mokhtasar-Seite.",
      publisher: "Mokhtasar",
      retrievedAt: RETRIEVED_AT,
      termsUrl: "https://mokhtasr.com/en/pages/terms-and-conditions",
      title: "الألمانية | Deutsch",
      url: "https://mokhtasr.com/en/books/336",
      version: 6,
    },
  }),
  en: QuranTafsirAccessSchema.make({
    appLocale: AppLocaleSchema.make("en"),
    kind: "external",
    notice:
      "Nakafa currently offers verse-by-verse Al-Mukhtasar tafsir in Indonesian. Nakafa does not machine-translate tafsir.",
    source: {
      label: "Read the official English edition on the Mokhtasar site.",
      publisher: "Mokhtasar",
      retrievedAt: RETRIEVED_AT,
      termsUrl: "https://mokhtasr.com/en/pages/terms-and-conditions",
      title: "الإنجليزية | English",
      url: "https://mokhtasr.com/en/books/319",
      version: 7,
    },
  }),
  id: QuranTafsirAccessSchema.make({
    appLocale: AppLocaleSchema.make("id"),
    kind: "embedded",
    notice:
      "Nakafa menyediakan tafsir Al-Mukhtasar per ayat berbahasa Indonesia yang diterbitkan oleh Markaz Tafsir untuk Studi Al-Qur'an melalui QuranEnc. Nakafa tidak menggunakan terjemahan mesin.",
    sourceId: "quranenc-tafsir",
  }),
} satisfies Record<AppLocaleCode, QuranTafsirAccess>;

/** Selects signed Tafsir access in the exact active-locale order. */
export function quranTafsirAccessFor(
  activeAppLocales: ActiveAppLocaleList
): readonly [QuranTafsirAccess, ...QuranTafsirAccess[]] {
  const [firstAppLocale, ...remainingAppLocales] = activeAppLocales;
  const first = quranTafsirAccessByLocale[activeAppLocaleCode(firstAppLocale)];
  const remaining = remainingAppLocales.map(
    (appLocale) => quranTafsirAccessByLocale[activeAppLocaleCode(appLocale)]
  );
  return [first, ...remaining];
}
