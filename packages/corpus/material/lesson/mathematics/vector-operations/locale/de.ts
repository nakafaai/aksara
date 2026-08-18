import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable vector operations lesson. */
export const vectorOperationsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.vector-operations",
  routeSlug: "vektoren-und-operationen",
  sections: [
    {
      routeSlug: "spalten-und-zeilenvektoren",
      sectionKey: "column-row-vector",
    },
    { routeSlug: "aequivalente-vektoren", sectionKey: "equivalent-vector" },
    { routeSlug: "gegenvektoren", sectionKey: "opposite-vector" },
    { routeSlug: "ortsvektoren", sectionKey: "position-vector" },
    {
      routeSlug: "skalare-multiplikation",
      sectionKey: "scalar-multiplication",
    },
    {
      routeSlug: "dreidimensionale-vektoren",
      sectionKey: "three-dimensional-vector",
    },
    {
      routeSlug: "zweidimensionale-vektoren",
      sectionKey: "two-dimensional-vector",
    },
    { routeSlug: "einheitsvektoren", sectionKey: "unit-vector" },
    { routeSlug: "vektoraddition", sectionKey: "vector-addition" },
    { routeSlug: "vektorkomponenten", sectionKey: "vector-components" },
    { routeSlug: "grundidee-von-vektoren", sectionKey: "vector-concept" },
    {
      routeSlug: "vektoren-im-koordinatensystem",
      sectionKey: "vector-coordinate-system",
    },
    { routeSlug: "vektorsubtraktion", sectionKey: "vector-subtraction" },
    { routeSlug: "vektortypen", sectionKey: "vector-types" },
    { routeSlug: "nullvektor", sectionKey: "zero-vector" },
  ],
  translation: {
    description: "Arbeite mit Vektoren, Koordinaten und Einheitsvektoren.",
    title: "Vektoren und Operationen",
  },
} as const satisfies MaterialLocaleSourceInput;
