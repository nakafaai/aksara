import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable circle arc and sector lesson. */
export const circleArcSectorGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.circle-arc-sector",
  routeSlug: "kreisboegen-und-kreissektoren",
  sections: [
    { routeSlug: "bogen", sectionKey: "arc" },
    {
      routeSlug: "mittelpunktswinkel-ueber-einem-bogen",
      sectionKey: "central-angle-on-arc",
    },
    {
      routeSlug: "mittelpunktswinkel-im-kreissektor",
      sectionKey: "central-angle-on-sector",
    },
    { routeSlug: "sehne", sectionKey: "chord" },
    { routeSlug: "kreisbogen", sectionKey: "circle-arc" },
    { routeSlug: "kreissektor", sectionKey: "circle-sector" },
    { routeSlug: "geschichte-der-kreiszahl-pi", sectionKey: "pi-history" },
    {
      routeSlug: "bogenlaenge-und-sektorflaeche",
      sectionKey: "relationship-between-arc-length-and-sector-area",
    },
    { routeSlug: "sektor", sectionKey: "sector" },
    { routeSlug: "kreissegment", sectionKey: "segment" },
  ],
  translation: {
    description: "Verbinde Bogenlänge, Mittelpunktswinkel und Fläche.",
    title: "Kreisbögen und Kreissektoren",
  },
} as const satisfies MaterialLocaleSourceInput;
