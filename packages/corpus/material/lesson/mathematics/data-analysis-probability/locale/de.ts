import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable probability analysis lesson. */
export const dataAnalysisProbabilityGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.data-analysis-probability",
  routeSlug: "datenanalyse-und-wahrscheinlichkeit",
  sections: [
    {
      routeSlug: "binomialverteilung",
      sectionKey: "binomial-distribution-function",
    },
    {
      routeSlug: "erwartungswert-der-binomialverteilung",
      sectionKey: "expected-value-of-binomial-distribution",
    },
    {
      routeSlug: "erwartungswert-der-normalverteilung",
      sectionKey: "expected-value-of-normal-distribution",
    },
    {
      routeSlug: "normalverteilung",
      sectionKey: "normal-distribution-function",
    },
    { routeSlug: "gleichverteilung", sectionKey: "uniform-distribution" },
  ],
  translation: {
    description: "Modelliere Wiederholungen mit Binomialverteilungen.",
    title: "Datenanalyse und Wahrscheinlichkeit",
  },
} as const satisfies MaterialLocaleSourceInput;
