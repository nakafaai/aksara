import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable circle geometry lesson. */
export const circleGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.circle",
  routeSlug: "kreisgeometrie",
  sections: [
    {
      routeSlug: "mittelpunkt-und-umfangswinkel",
      sectionKey: "central-angle-and-inscribed-angle",
    },
    { routeSlug: "kreis-und-kreisbogen", sectionKey: "circle-and-arc-circle" },
    { routeSlug: "kreis-und-sehne", sectionKey: "circle-and-chord" },
    { routeSlug: "kreis-und-tangente", sectionKey: "circle-and-tangent-line" },
    {
      routeSlug: "aeussere-und-innere-gemeinsame-tangente",
      sectionKey: "external-tangent-line-and-internal-tangent-line",
    },
    {
      routeSlug: "winkelsaetze-am-kreis",
      sectionKey: "properties-of-angle-in-circle",
    },
  ],
  translation: {
    description: "Vergleiche Mittel- und Umfangswinkel am Kreis.",
    title: "Kreisgeometrie",
  },
} as const satisfies MaterialLocaleSourceInput;
