import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable trigonometry lesson. */
export const trigonometryGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.trigonometry",
  routeSlug: "trigonometrie",
  sections: [
    {
      routeSlug: "bezeichnungen-am-rechtwinkligen-dreieck",
      sectionKey: "right-triangle-naming",
    },
    {
      routeSlug: "sinus-und-kosinus-vergleichen",
      sectionKey: "trigonometric-comparison-sin-cos",
    },
    {
      routeSlug: "werte-besonderer-winkel",
      sectionKey: "trigonometric-comparison-special-angle",
    },
    {
      routeSlug: "tangens-vergleichen",
      sectionKey: "trigonometric-comparison-tan",
    },
    {
      routeSlug: "tangens-anwenden",
      sectionKey: "trigonometric-comparison-tan-usage",
    },
    {
      routeSlug: "sinus-kosinus-und-tangens-vergleichen",
      sectionKey: "trigonometric-comparison-three-primary",
    },
    {
      routeSlug: "grundidee-der-trigonometrie",
      sectionKey: "trigonometry-concept",
    },
  ],
  translation: {
    description: "Ordne Dreiecksseiten den Winkelfunktionen zu.",
    title: "Trigonometrie",
  },
} as const satisfies MaterialLocaleSourceInput;
