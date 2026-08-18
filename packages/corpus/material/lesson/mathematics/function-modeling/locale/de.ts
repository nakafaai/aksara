import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable function modeling lesson. */
export const functionModelingGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.function-modeling",
  routeSlug: "funktionen-und-modelle",
  sections: [
    { routeSlug: "betragsfunktion", sectionKey: "absolute-value-function" },
    { routeSlug: "asymptoten", sectionKey: "asymptote" },
    { routeSlug: "exponentialfunktion", sectionKey: "exponential-function" },
    {
      routeSlug: "begriff-der-logarithmusfunktion",
      sectionKey: "logarithmic-function-concept",
    },
    {
      routeSlug: "graph-der-logarithmusfunktion",
      sectionKey: "logarithmic-function-graph",
    },
    {
      routeSlug: "identitaeten-der-logarithmusfunktion",
      sectionKey: "logarithmic-function-identity",
    },
    {
      routeSlug: "stueckweise-definierte-funktionen",
      sectionKey: "piecewise-function-modeling",
    },
    {
      routeSlug: "gebrochen-rationale-funktion",
      sectionKey: "rational-function",
    },
    { routeSlug: "quadratwurzelfunktion", sectionKey: "square-root-function" },
    { routeSlug: "treppenfunktionen", sectionKey: "step-function-modeling" },
    {
      routeSlug: "trigonometrische-funktionen-beliebiger-winkel",
      sectionKey: "trigonometric-function-arbitrary-angle",
    },
    {
      routeSlug: "graphen-trigonometrischer-funktionen",
      sectionKey: "trigonometric-function-graph",
    },
    {
      routeSlug: "trigonometrische-identitaeten",
      sectionKey: "trigonometric-identity",
    },
  ],
  translation: {
    description: "Untersuche Funktionen, Graphen und passende Modelle.",
    title: "Funktionen und ihre Modelle",
  },
} as const satisfies MaterialLocaleSourceInput;
