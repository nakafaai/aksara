const GOETHE_TEST = "https://www.goethe.de/ins/de/de/m/prf/prf/gzsd2/ub2.html";
const IQB_TASKS =
  "https://www.iqb.hu-berlin.de/media/exercise_group_files/VERA-3_Mathematik/AllgemeineAnweisungenAufgabenformate.pdf";
const QURANENC_GERMAN = "https://quranenc.com/de/browse/german_bubenheim";
const BUND_ID = "https://id.bund.de/";
const POLAR_LOCALIZATION =
  "https://polar.sh/docs/features/checkout/localization";
const WCAG_GERMAN = "https://www.w3.org/translations/wcag20-de";
const ACCESSIBLE_ALT_TEXT =
  "https://www.bundesfachstelle-barrierefreiheit.de/DE/Fachwissen/Informationstechnik/Barrierefreie-Social-Media/Alternativtexte";

/** Reviewed German terminology for product, account, and navigation surfaces. */
export const germanProductGlossarySource = [
  {
    key: "tryout-product",
    note: "Prüfungstraining bezeichnet den größeren Vorbereitungsbereich.",
    preferred: "Probetest",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "question",
    note: "Frage bleibt echten Fragesätzen vorbehalten.",
    preferred: "Aufgabe",
    scope: "exam",
    sourceUrl: IQB_TASKS,
  },
  {
    key: "answer-choice",
    preferred: "Antwortmöglichkeit",
    scope: "exam",
    sourceUrl: IQB_TASKS,
  },
  {
    key: "question-set",
    preferred: "Aufgabensatz",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "attempt",
    preferred: "Versuch",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "time-limit",
    preferred: "Bearbeitungszeit",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "remaining-time",
    preferred: "Verbleibende Zeit",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "score",
    preferred: "Punktzahl",
    scope: "exam",
    sourceUrl: IQB_TASKS,
  },
  {
    key: "solution-explanation",
    preferred: "Lösungserklärung",
    routeSlug: "loesungserklaerung",
    scope: "exam",
    sourceUrl: IQB_TASKS,
  },
  {
    key: "resume-attempt",
    preferred: "Versuch fortsetzen",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "review-answers",
    preferred: "Antworten überprüfen",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "submit-answers",
    preferred: "Antworten abgeben",
    scope: "exam",
    sourceUrl: GOETHE_TEST,
  },
  {
    key: "free-text-answer",
    preferred: "Freitextantwort",
    scope: "exam",
    sourceUrl: IQB_TASKS,
  },
  {
    key: "quran-product",
    note: "In erklärendem deutschem Text darf Koran stehen. Die Produktbezeichnung bleibt Quran.",
    preferred: "Quran",
    scope: "quran",
    sourceUrl: QURANENC_GERMAN,
  },
  {
    key: "surah",
    preferred: "Sure",
    scope: "quran",
    sourceUrl: QURANENC_GERMAN,
  },
  {
    key: "ayah",
    preferred: "Vers",
    scope: "quran",
    sourceUrl: QURANENC_GERMAN,
  },
  {
    key: "tafsir",
    note: "Beim ersten Vorkommen Tafsir (Koranauslegung), danach Tafsir.",
    preferred: "Tafsir",
    scope: "quran",
    sourceUrl: QURANENC_GERMAN,
  },
  {
    key: "account",
    preferred: "Konto",
    scope: "account",
    sourceUrl: BUND_ID,
  },
  {
    key: "create-account",
    preferred: "Konto erstellen",
    scope: "account",
    sourceUrl: BUND_ID,
  },
  {
    key: "sign-in",
    preferred: "Anmelden",
    scope: "account",
    sourceUrl: BUND_ID,
  },
  {
    key: "sign-out",
    preferred: "Abmelden",
    scope: "account",
    sourceUrl: BUND_ID,
  },
  {
    key: "settings",
    preferred: "Einstellungen",
    scope: "account",
    sourceUrl: BUND_ID,
  },
  {
    key: "subscription",
    preferred: "Abonnement",
    scope: "billing",
    sourceUrl: POLAR_LOCALIZATION,
  },
  {
    key: "billing",
    preferred: "Abrechnung",
    scope: "billing",
    sourceUrl: POLAR_LOCALIZATION,
  },
  {
    key: "payment-method",
    preferred: "Zahlungsmethode",
    scope: "billing",
    sourceUrl: POLAR_LOCALIZATION,
  },
  {
    key: "invoice",
    preferred: "Rechnung",
    scope: "billing",
    sourceUrl: POLAR_LOCALIZATION,
  },
  {
    key: "customer-portal",
    preferred: "Kundenportal",
    scope: "billing",
    sourceUrl: POLAR_LOCALIZATION,
  },
  {
    key: "checkout-action",
    preferred: "Weiter zur Zahlung",
    scope: "billing",
    sourceUrl: POLAR_LOCALIZATION,
  },
  {
    key: "accessibility",
    preferred: "Barrierefreiheit",
    scope: "accessibility",
    sourceUrl: WCAG_GERMAN,
  },
  {
    key: "alternative-text",
    preferred: "Alternativtext",
    scope: "accessibility",
    sourceUrl: ACCESSIBLE_ALT_TEXT,
  },
  {
    key: "screen-reader",
    preferred: "Screenreader",
    scope: "accessibility",
    sourceUrl: WCAG_GERMAN,
  },
  {
    key: "keyboard-navigation",
    preferred: "Tastaturnavigation",
    scope: "accessibility",
    sourceUrl: WCAG_GERMAN,
  },
  {
    key: "keyboard-focus",
    preferred: "Tastaturfokus",
    scope: "accessibility",
    sourceUrl: WCAG_GERMAN,
  },
  {
    key: "skip-link",
    preferred: "Zum Hauptinhalt springen",
    scope: "accessibility",
    sourceUrl: WCAG_GERMAN,
  },
  {
    key: "home",
    preferred: "Startseite",
    scope: "navigation",
    sourceUrl: BUND_ID,
  },
];
