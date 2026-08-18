import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable geometric transformation lesson. */
export const geometricTransformationGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.geometric-transformation",
  routeSlug: "geometrische-transformationen",
  sections: [
    {
      routeSlug: "zusammengesetzte-transformationen-mit-matrizen",
      sectionKey: "composite-transformation-matrix",
    },
    { routeSlug: "streckung", sectionKey: "dilation" },
    { routeSlug: "streckungsmatrix", sectionKey: "dilation-matrix" },
    { routeSlug: "transformationsmatrix", sectionKey: "matrix-transformation" },
    { routeSlug: "spiegelungsmatrix", sectionKey: "reflection-matrix" },
    {
      routeSlug: "spiegelungsmatrix-an-beliebigem-punkt",
      sectionKey: "reflection-matrix-arbitrary-point",
    },
    {
      routeSlug: "spiegelungsmatrix-um-den-ursprung",
      sectionKey: "reflection-matrix-center",
    },
    {
      routeSlug: "spiegelung-an-einer-geraden",
      sectionKey: "reflection-over-line",
    },
    { routeSlug: "punktspiegelung", sectionKey: "reflection-over-point" },
    {
      routeSlug: "spiegelung-an-der-x-achse",
      sectionKey: "reflection-over-x-axis",
    },
    {
      routeSlug: "spiegelung-an-x-gleich-k",
      sectionKey: "reflection-over-x-equals-k",
    },
    {
      routeSlug: "spiegelung-an-der-y-achse",
      sectionKey: "reflection-over-y-axis",
    },
    {
      routeSlug: "spiegelung-an-y-gleich-h",
      sectionKey: "reflection-over-y-equals-h",
    },
    {
      routeSlug: "spiegelung-an-y-gleich-minus-x",
      sectionKey: "reflection-over-y-equals-minus-x",
    },
    {
      routeSlug: "spiegelung-an-y-gleich-x",
      sectionKey: "reflection-over-y-equals-x",
    },
    { routeSlug: "rotation", sectionKey: "rotation" },
    { routeSlug: "rotationsmatrix", sectionKey: "rotation-matrix" },
    { routeSlug: "translation", sectionKey: "translation" },
    { routeSlug: "translationsmatrix", sectionKey: "translation-matrix" },
  ],
  translation: {
    description: "Verknüpfe geometrische Transformationen mit Matrizen.",
    title: "Geometrische Transformationen",
  },
} as const satisfies MaterialLocaleSourceInput;
