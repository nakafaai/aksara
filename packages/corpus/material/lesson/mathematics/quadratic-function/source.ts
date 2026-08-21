import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsQuadraticFunctionMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/quadratic-function",
  domain: "mathematics",
  key: "lesson.mathematics.quadratic-function",
  kind: "lesson",
  routeSlugs: {
    de: "quadratische-funktionen",
    en: "quadratic-function",
    id: "persamaan-dan-fungsi-kuadrat",
  },
  sections: [
    {
      routeSlugs: {
        de: "quadratische-gleichungen",
        en: "quadratic-equation",
        id: "persamaan-kuadrat",
      },
      slug: "quadratic-equation",
    },
    {
      routeSlugs: {
        de: "faktorisieren-quadratischer-gleichungen",
        en: "quadratic-equation-factorization",
        id: "faktorisasi-persamaan-kuadrat",
      },
      slug: "quadratic-equation-factorization",
    },
    {
      routeSlugs: {
        de: "loesungsformel-fuer-quadratische-gleichungen",
        en: "quadratic-equation-formula",
        id: "rumus-persamaan-kuadrat",
      },
      slug: "quadratic-equation-formula",
    },
    {
      routeSlugs: {
        de: "komplexe-loesungen-quadratischer-gleichungen",
        en: "quadratic-equation-imaginary-root",
        id: "akar-tidak-nyata-atau-imajiner",
      },
      slug: "quadratic-equation-imaginary-root",
    },
    {
      routeSlugs: {
        de: "quadratische-ergaenzung-und-scheitelpunktform",
        en: "quadratic-equation-perfect-square",
        id: "melengkapi-kuadrat-sempurna",
      },
      slug: "quadratic-equation-perfect-square",
    },
    {
      routeSlugs: {
        de: "arten-von-nullstellen",
        en: "quadratic-equation-types-of-root",
        id: "jenis-jenis-akar-persamaan-kuadrat",
      },
      slug: "quadratic-equation-types-of-root",
    },
    {
      routeSlugs: {
        de: "eigenschaften-quadratischer-funktionen",
        en: "quadratic-function-characteristics",
        id: "karakteristik-fungsi-kuadrat",
      },
      slug: "quadratic-function-characteristics",
    },
    {
      routeSlugs: {
        de: "quadratische-funktion-aufstellen",
        en: "quadratic-function-construction",
        id: "mengonstruksi-fungsi-kuadrat",
      },
      slug: "quadratic-function-construction",
    },
    {
      routeSlugs: {
        de: "maximale-flaeche-mit-quadratischen-funktionen",
        en: "quadratic-function-maximum-area",
        id: "menentukan-luas-maksimum",
      },
      slug: "quadratic-function-maximum-area",
    },
    {
      routeSlugs: {
        de: "minimale-flaeche-mit-quadratischen-funktionen",
        en: "quadratic-function-minimum-area",
        id: "menentukan-luas-minimum",
      },
      slug: "quadratic-function-minimum-area",
    },
  ],
  slug: "quadratic-function",
  translations: {
    de: {
      description: "Löse Gleichungen und prüfe quadratische Modelle.",
      title: "Quadratische Funktionen",
    },
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
