import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/vector-operations",
  domain: "mathematics",
  key: "lesson.mathematics.vector-operations",
  kind: "lesson",
  routeSlugs: {
    en: "vector-operations",
    id: "vektor-dan-operasinya",
    de: "vektoren-und-operationen",
    ms: "vektor-dan-operasinya",
  },
  sections: [
    "column-row-vector",
    "equivalent-vector",
    "opposite-vector",
    "position-vector",
    "scalar-multiplication",
    "three-dimensional-vector",
    "two-dimensional-vector",
    "unit-vector",
    "vector-addition",
    "vector-components",
    "vector-concept",
    "vector-coordinate-system",
    "vector-subtraction",
    "vector-types",
    "zero-vector",
  ],
  slug: "vector-operations",
  translations: {
    en: {
      description: "Work with vector notation, transpose, and unit vectors.",
      title: "Vector and Operations",
    },
    id: {
      description: "Olah notasi vektor, transpos, dan vektor satuan.",
      title: "Vektor dan Operasinya",
    },
    de: {
      description: "Arbeite mit Vektoren, Koordinaten und Einheitsvektoren.",
      title: "Vektoren und Operationen",
    },
    ms: {
      description: "Guna tatatanda vektor, transpos dan vektor unit.",
      title: "Vektor dan Operasinya",
    },
  },
};

export default lesson;
