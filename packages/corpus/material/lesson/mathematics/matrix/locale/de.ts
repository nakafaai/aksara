import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable matrix lesson. */
export const matrixGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.matrix",
  routeSlug: "matrizen",
  sections: [
    {
      routeSlug: "kofaktorentwicklung",
      sectionKey: "cofactor-expansion-method",
    },
    { routeSlug: "matrixaddition", sectionKey: "matrix-addition" },
    { routeSlug: "grundidee-von-matrizen", sectionKey: "matrix-concept" },
    {
      routeSlug: "determinante-einer-matrix",
      sectionKey: "matrix-determinant",
    },
    { routeSlug: "gleichheit-von-matrizen", sectionKey: "matrix-equality" },
    { routeSlug: "inverse-matrix", sectionKey: "matrix-inverse" },
    { routeSlug: "matrixmultiplikation", sectionKey: "matrix-multiplication" },
    {
      routeSlug: "skalare-multiplikation-von-matrizen",
      sectionKey: "matrix-scalar-multiplication",
    },
    { routeSlug: "matrixsubtraktion", sectionKey: "matrix-subtraction" },
    { routeSlug: "transponierte-matrix", sectionKey: "matrix-transpose" },
    { routeSlug: "matrixtypen", sectionKey: "matrix-types" },
    {
      routeSlug: "eigenschaften-von-determinanten",
      sectionKey: "properties-determinant-matrix",
    },
    { routeSlug: "satz-von-sarrus", sectionKey: "sarrus-method" },
  ],
  translation: {
    description: "Lies, verknüpfe und untersuche Matrizen sicher.",
    title: "Matrizen",
  },
} as const satisfies MaterialLocaleSourceInput;
