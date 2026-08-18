import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable regression statistics lesson. */
export const statisticsRegressionGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.statistics-regression",
  routeSlug: "regression-und-korrelation",
  sections: [
    {
      routeSlug: "bestimmtheitsmass",
      sectionKey: "coefficient-of-determination",
    },
    {
      routeSlug: "grundidee-der-korrelationsanalyse",
      sectionKey: "correlation-analysis-concept",
    },
    {
      routeSlug: "methode-der-kleinsten-quadrate",
      sectionKey: "least-squares-method",
    },
    {
      routeSlug: "grundidee-der-linearen-regression",
      sectionKey: "linear-regression-concept",
    },
    {
      routeSlug: "produkt-moment-korrelation",
      sectionKey: "product-moment-correlation",
    },
    { routeSlug: "streudiagramm", sectionKey: "scatter-diagram" },
  ],
  translation: {
    description: "Lies am Bestimmtheitsmaß die erklärte Streuung ab.",
    title: "Regression und Korrelation",
  },
} as const satisfies MaterialLocaleSourceInput;
