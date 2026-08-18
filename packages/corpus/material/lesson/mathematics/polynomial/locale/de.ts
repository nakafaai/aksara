import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable polynomial lesson. */
export const polynomialGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.polynomial",
  routeSlug: "polynome",
  sections: [
    {
      routeSlug: "addition-und-subtraktion-von-polynomen",
      sectionKey: "addition-subtraction-polynomial",
    },
    { routeSlug: "polynomdivision", sectionKey: "division-polynomial" },
    { routeSlug: "faktorsatz", sectionKey: "factor-theorem" },
    { routeSlug: "horner-schema", sectionKey: "horner-method" },
    {
      routeSlug: "multiplikation-von-polynomen",
      sectionKey: "multiplication-polynomial",
    },
    { routeSlug: "grundidee-von-polynomen", sectionKey: "polynomial-concept" },
    { routeSlug: "grad-eines-polynoms", sectionKey: "polynomial-degree" },
    {
      routeSlug: "faktorisierung-von-polynomen",
      sectionKey: "polynomial-factorization",
    },
    { routeSlug: "polynomfunktionen", sectionKey: "polynomial-function" },
    {
      routeSlug: "graphen-von-polynomfunktionen",
      sectionKey: "polynomial-graph",
    },
    { routeSlug: "polynomidentitaeten", sectionKey: "polynomial-identity" },
    { routeSlug: "rationale-nullstellen", sectionKey: "rational-zero" },
    { routeSlug: "restsatz", sectionKey: "remainder-theorem" },
    {
      routeSlug: "polynomdivision-schritt-fuer-schritt",
      sectionKey: "synthetic-division",
    },
  ],
  translation: {
    description: "Untersuche Polynome, ihre Nullstellen und Graphen.",
    title: "Polynome",
  },
} as const satisfies MaterialLocaleSourceInput;
