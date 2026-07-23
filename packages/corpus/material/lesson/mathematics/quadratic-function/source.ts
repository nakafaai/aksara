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
      translations: {
        en: {
          title: "Quadratic Equations",
        },
        id: {
          title: "Persamaan Kuadrat",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-equation-factorization",
        id: "faktorisasi-persamaan-kuadrat",
      },
      slug: "quadratic-equation-factorization",
      translations: {
        en: {
          title: "Quadratic Equation Factorization",
        },
        id: {
          title: "Faktorisasi Persamaan Kuadrat",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-equation-formula",
        id: "rumus-persamaan-kuadrat",
      },
      slug: "quadratic-equation-formula",
      translations: {
        en: {
          title: "Quadratic Formula",
        },
        id: {
          title: "Rumus Persamaan Kuadrat",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-equation-imaginary-root",
        id: "akar-tidak-nyata-atau-imajiner",
      },
      slug: "quadratic-equation-imaginary-root",
      translations: {
        en: {
          title: "Imaginary or Non-Real Roots",
        },
        id: {
          title: "Akar Tidak Nyata atau Imajiner",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-equation-perfect-square",
        id: "melengkapi-kuadrat-sempurna",
      },
      slug: "quadratic-equation-perfect-square",
      translations: {
        en: {
          title: "Completing the Square",
        },
        id: {
          title: "Melengkapi Kuadrat Sempurna",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-equation-types-of-root",
        id: "jenis-jenis-akar-persamaan-kuadrat",
      },
      slug: "quadratic-equation-types-of-root",
      translations: {
        en: {
          title: "Types of Quadratic Equation Roots",
        },
        id: {
          title: "Jenis-Jenis Akar Persamaan Kuadrat",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-function-characteristics",
        id: "karakteristik-fungsi-kuadrat",
      },
      slug: "quadratic-function-characteristics",
      translations: {
        en: {
          title: "Characteristics of Quadratic Functions",
        },
        id: {
          title: "Karakteristik Fungsi Kuadrat",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-function-construction",
        id: "mengonstruksi-fungsi-kuadrat",
      },
      slug: "quadratic-function-construction",
      translations: {
        en: {
          title: "Constructing Quadratic Functions",
        },
        id: {
          title: "Mengonstruksi Fungsi Kuadrat",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-function-maximum-area",
        id: "menentukan-luas-maksimum",
      },
      slug: "quadratic-function-maximum-area",
      translations: {
        en: {
          title: "Determining Maximum Area",
        },
        id: {
          title: "Menentukan Luas Maksimum",
        },
      },
    },
    {
      routeSlugs: {
        en: "quadratic-function-minimum-area",
        id: "menentukan-luas-minimum",
      },
      slug: "quadratic-function-minimum-area",
      translations: {
        en: {
          title: "Determining Minimum Area",
        },
        id: {
          title: "Menentukan Luas Minimum",
        },
      },
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
