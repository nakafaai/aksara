import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable derivative functions lesson. */
export const derivativeFunctionGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.derivative-function",
  routeSlug: "ableitungen",
  sections: [
    {
      routeSlug: "anwendungen-der-ableitung",
      sectionKey: "application-of-derivative",
    },
    { routeSlug: "kettenregel", sectionKey: "chain-rule-in-derivative" },
    {
      routeSlug: "begriff-der-ableitungsfunktion",
      sectionKey: "concept-of-derivative-function",
    },
    {
      routeSlug: "ableitung-algebraischer-funktionen",
      sectionKey: "derivative-of-algebraic-function",
    },
    {
      routeSlug: "ableitung-trigonometrischer-funktionen",
      sectionKey: "derivative-of-trigonometric-function",
    },
    {
      routeSlug: "tangentengleichung",
      sectionKey: "equation-of-a-tangent-line-to-a-curve",
    },
    {
      routeSlug: "extremwerte",
      sectionKey: "extrema-maximum-and-minimum-value",
    },
    {
      routeSlug: "monotonie-und-stationaere-punkte",
      sectionKey: "increasing-decreasing-and-stationary-function",
    },
    {
      routeSlug: "ableitungsregeln",
      sectionKey: "properties-of-derivative-function",
    },
    {
      routeSlug: "schreibweisen-der-ableitung",
      sectionKey: "writing-the-derivative-function",
    },
  ],
  translation: {
    description: "Untersuche Änderungsraten, Tangenten und Extremwerte.",
    title: "Ableitungen",
  },
} as const satisfies MaterialLocaleSourceInput;
