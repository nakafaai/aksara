import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/matrix",
  domain: "mathematics",
  key: "lesson.mathematics.matrix",
  kind: "lesson",
  routeSlugs: {
    en: "matrix",
    id: "matriks",
    de: "matrizen",
    ms: "matriks",
  },
  sections: [
    "cofactor-expansion-method",
    "matrix-addition",
    "matrix-concept",
    "matrix-determinant",
    "matrix-equality",
    "matrix-inverse",
    "matrix-multiplication",
    "matrix-scalar-multiplication",
    "matrix-subtraction",
    "matrix-transpose",
    "matrix-types",
    "properties-determinant-matrix",
    "sarrus-method",
  ],
  slug: "matrix",
  translations: {
    en: {
      description: "Compute determinants through minors and cofactors.",
      title: "Matrix",
    },
    id: {
      description: "Hitung determinan lewat minor dan kofaktor.",
      title: "Matriks",
    },
    de: {
      description: "Lies, verknüpfe und untersuche Matrizen sicher.",
      title: "Matrizen",
    },
    ms: {
      description: "Kira penentu melalui minor dan kofaktor.",
      title: "Matriks",
    },
  },
};

export default lesson;
