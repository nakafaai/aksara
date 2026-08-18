import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsQuadraticFunctionMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/quadratic-function",
  domain: "mathematics",
  key: "lesson.mathematics.quadratic-function",
  kind: "lesson",
  routeSlugs: { en: "quadratic-function", id: "persamaan-dan-fungsi-kuadrat" },
  sections: [
    {
      routeSlugs: { en: "quadratic-equation", id: "persamaan-kuadrat" },
      slug: "quadratic-equation",
    },
    {
      routeSlugs: {
        en: "quadratic-equation-factorization",
        id: "faktorisasi-persamaan-kuadrat",
      },
      slug: "quadratic-equation-factorization",
    },
    {
      routeSlugs: {
        en: "quadratic-equation-formula",
        id: "rumus-persamaan-kuadrat",
      },
      slug: "quadratic-equation-formula",
    },
    {
      routeSlugs: {
        en: "quadratic-equation-imaginary-root",
        id: "akar-tidak-nyata-atau-imajiner",
      },
      slug: "quadratic-equation-imaginary-root",
    },
    {
      routeSlugs: {
        en: "quadratic-equation-perfect-square",
        id: "melengkapi-kuadrat-sempurna",
      },
      slug: "quadratic-equation-perfect-square",
    },
    {
      routeSlugs: {
        en: "quadratic-equation-types-of-root",
        id: "jenis-jenis-akar-persamaan-kuadrat",
      },
      slug: "quadratic-equation-types-of-root",
    },
    {
      routeSlugs: {
        en: "quadratic-function-characteristics",
        id: "karakteristik-fungsi-kuadrat",
      },
      slug: "quadratic-function-characteristics",
    },
    {
      routeSlugs: {
        en: "quadratic-function-construction",
        id: "mengonstruksi-fungsi-kuadrat",
      },
      slug: "quadratic-function-construction",
    },
    {
      routeSlugs: {
        en: "quadratic-function-maximum-area",
        id: "menentukan-luas-maksimum",
      },
      slug: "quadratic-function-maximum-area",
    },
    {
      routeSlugs: {
        en: "quadratic-function-minimum-area",
        id: "menentukan-luas-minimum",
      },
      slug: "quadratic-function-minimum-area",
    },
  ],
  slug: "quadratic-function",
  translations: {
    en: {
      description: "Solve quadratics with factors, squares, and formulas.",
      title: "Quadratic Functions",
    },
    id: {
      description: "Selesaikan kuadrat dengan faktor dan rumus.",
      title: "Persamaan dan Fungsi Kuadrat",
    },
  },
});
