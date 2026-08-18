import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable integral calculus lesson. */
export const integralGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.integral",
  routeSlug: "integralrechnung",
  sections: [
    { routeSlug: "flaecheninhalt", sectionKey: "area-of-a-flat-surface" },
    { routeSlug: "bestimmtes-integral", sectionKey: "definite-integral" },
    {
      routeSlug: "definition-des-unbestimmten-integrals",
      sectionKey: "definition-of-indefinite-integral",
    },
    {
      routeSlug: "hauptsatz-der-differential-und-integralrechnung",
      sectionKey: "fundamental-theorem-of-calculus",
    },
    {
      routeSlug: "integrale-in-wirtschaft-und-oekonomie",
      sectionKey: "integral-in-economics-and-business",
    },
    { routeSlug: "integrale-in-der-physik", sectionKey: "integral-in-physics" },
    {
      routeSlug: "eigenschaften-bestimmter-integrale",
      sectionKey: "properties-of-definite-integral",
    },
    {
      routeSlug: "eigenschaften-unbestimmter-integrale",
      sectionKey: "properties-of-indefinite-integral",
    },
    { routeSlug: "riemann-summen", sectionKey: "riemann-sum" },
  ],
  translation: {
    description: "Berechne Flächen mit bestimmten Integralen.",
    title: "Integralrechnung",
  },
} as const satisfies MaterialLocaleSourceInput;
