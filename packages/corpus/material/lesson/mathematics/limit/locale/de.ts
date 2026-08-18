import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable limits lesson. */
export const limitGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.limit",
  routeSlug: "grenzwerte",
  sections: [
    {
      routeSlug: "anwendungen-von-grenzwerten",
      sectionKey: "application-of-limit-function",
    },
    {
      routeSlug: "begriff-des-grenzwerts",
      sectionKey: "concept-of-limit-function",
    },
    {
      routeSlug: "grenzwerte-algebraischer-funktionen",
      sectionKey: "limit-of-algebraic-function",
    },
    {
      routeSlug: "grenzwerte-trigonometrischer-funktionen",
      sectionKey: "limit-of-trigonometric-function",
    },
    {
      routeSlug: "eigenschaften-von-grenzwerten",
      sectionKey: "properties-of-limit-function",
    },
  ],
  translation: {
    description: "Nutze Grenzwerte, um Veränderungen zu beschreiben.",
    title: "Grenzwerte",
  },
} as const satisfies MaterialLocaleSourceInput;
