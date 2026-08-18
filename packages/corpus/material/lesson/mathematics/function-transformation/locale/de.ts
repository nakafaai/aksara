import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable function transformation lesson. */
export const functionTransformationGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.function-transformation",
  routeSlug: "funktionstransformationen",
  sections: [
    {
      routeSlug: "kombinierte-funktionstransformationen",
      sectionKey: "combined-transformation-function",
    },
    {
      routeSlug: "horizontale-streckung-und-stauchung",
      sectionKey: "horizontal-dilation",
    },
    {
      routeSlug: "spiegelung-an-der-y-achse",
      sectionKey: "horizontal-reflection",
    },
    {
      routeSlug: "horizontale-verschiebung",
      sectionKey: "horizontal-translation",
    },
    { routeSlug: "rotation", sectionKey: "rotation" },
    {
      routeSlug: "vertikale-streckung-und-stauchung",
      sectionKey: "vertical-dilation",
    },
    {
      routeSlug: "spiegelung-an-der-x-achse",
      sectionKey: "vertical-reflection",
    },
    { routeSlug: "vertikale-verschiebung", sectionKey: "vertical-translation" },
  ],
  translation: {
    description: "Ordne Verschiebungen, Streckungen und Spiegelungen.",
    title: "Funktionstransformationen",
  },
} as const satisfies MaterialLocaleSourceInput;
