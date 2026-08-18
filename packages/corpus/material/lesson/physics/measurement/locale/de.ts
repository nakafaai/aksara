import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable measurement lesson. */
export const measurementGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.physics.measurement",
  routeSlug: "messen-im-naturwissenschaftlichen-arbeiten",
  sections: [
    { routeSlug: "dimension", sectionKey: "dimension" },
    { routeSlug: "schreibweise", sectionKey: "notation" },
    { routeSlug: "physikalische-groesse", sectionKey: "quantity" },
    { routeSlug: "signifikante-stellen", sectionKey: "significant-figures" },
    { routeSlug: "messgeraete", sectionKey: "tools" },
    { routeSlug: "messunsicherheit", sectionKey: "uncertainty" },
    { routeSlug: "einheit", sectionKey: "unit" },
  ],
  translation: {
    description: "Ordne Messgrößen, Einheiten und Unsicherheiten ein.",
    title: "Messen im naturwissenschaftlichen Arbeiten",
  },
} as const satisfies MaterialLocaleSourceInput;
