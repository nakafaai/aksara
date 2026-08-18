import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable analytic geometry lesson. */
export const analyticGeometryGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.analytic-geometry",
  routeSlug: "analytische-geometrie",
  sections: [
    { routeSlug: "kreisdefinition", sectionKey: "definition-of-circle" },
    { routeSlug: "ellipse", sectionKey: "ellipse" },
    {
      routeSlug: "tangentengleichung-am-kreis",
      sectionKey: "equation-of-a-tangent-line-to-a-circle",
    },
    { routeSlug: "kreisgleichung", sectionKey: "equation-of-circle" },
    { routeSlug: "hyperbel", sectionKey: "hyperbola" },
    { routeSlug: "parabel", sectionKey: "parabola" },
    {
      routeSlug: "lage-einer-geraden-zum-kreis",
      sectionKey: "position-of-a-line-to-a-circle",
    },
    {
      routeSlug: "lage-eines-punktes-zum-kreis",
      sectionKey: "position-of-a-point-to-a-circle",
    },
    {
      routeSlug: "lage-einer-tangente-zum-kreis",
      sectionKey: "position-of-a-tangent-line-to-a-circle",
    },
    {
      routeSlug: "lage-zweier-kreise",
      sectionKey: "position-of-two-circles",
    },
    {
      routeSlug: "tangenten-an-kegelschnitte",
      sectionKey: "tangent-line-to-conic-sections",
    },
  ],
  translation: {
    description: "Untersuche Kreise, Kegelschnitte und ihre Tangenten.",
    title: "Analytische Geometrie",
  },
} as const satisfies MaterialLocaleSourceInput;
