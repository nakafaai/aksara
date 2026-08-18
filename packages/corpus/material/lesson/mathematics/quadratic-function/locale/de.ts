import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable quadratic functions lesson. */
export const quadraticFunctionGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.quadratic-function",
  routeSlug: "quadratische-funktionen",
  sections: [
    { routeSlug: "quadratische-gleichungen", sectionKey: "quadratic-equation" },
    {
      routeSlug: "faktorisieren-quadratischer-gleichungen",
      sectionKey: "quadratic-equation-factorization",
    },
    {
      routeSlug: "loesungsformel-fuer-quadratische-gleichungen",
      sectionKey: "quadratic-equation-formula",
    },
    {
      routeSlug: "komplexe-loesungen-quadratischer-gleichungen",
      sectionKey: "quadratic-equation-imaginary-root",
    },
    {
      routeSlug: "quadratische-ergaenzung-und-scheitelpunktform",
      sectionKey: "quadratic-equation-perfect-square",
    },
    {
      routeSlug: "arten-von-nullstellen",
      sectionKey: "quadratic-equation-types-of-root",
    },
    {
      routeSlug: "eigenschaften-quadratischer-funktionen",
      sectionKey: "quadratic-function-characteristics",
    },
    {
      routeSlug: "quadratische-funktion-aufstellen",
      sectionKey: "quadratic-function-construction",
    },
    {
      routeSlug: "maximale-flaeche-mit-quadratischen-funktionen",
      sectionKey: "quadratic-function-maximum-area",
    },
    {
      routeSlug: "minimale-flaeche-mit-quadratischen-funktionen",
      sectionKey: "quadratic-function-minimum-area",
    },
  ],
  translation: {
    description: "Löse Gleichungen und prüfe quadratische Modelle.",
    title: "Quadratische Funktionen",
  },
} as const satisfies MaterialLocaleSourceInput;
