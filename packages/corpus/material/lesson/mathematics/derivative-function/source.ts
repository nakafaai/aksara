import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsDerivativeFunctionMaterial = defineLessonMaterial(
  {
    assetRoot: "material/lesson/mathematics/derivative-function",
    domain: "mathematics",
    key: "lesson.mathematics.derivative-function",
    kind: "lesson",
    routeSlugs: { en: "derivative-function", id: "turunan-fungsi" },
    sections: [
      {
        routeSlugs: { en: "application-of-derivative", id: "aplikasi-turunan" },
        slug: "application-of-derivative",
      },
      {
        routeSlugs: {
          en: "chain-rule-in-derivative",
          id: "aturan-rantai-pada-turunan",
        },
        slug: "chain-rule-in-derivative",
      },
      {
        routeSlugs: {
          en: "concept-of-derivative-function",
          id: "konsep-turunan-fungsi",
        },
        slug: "concept-of-derivative-function",
      },
      {
        routeSlugs: {
          en: "derivative-of-algebraic-function",
          id: "turunan-fungsi-aljabar",
        },
        slug: "derivative-of-algebraic-function",
      },
      {
        routeSlugs: {
          en: "derivative-of-trigonometric-function",
          id: "turunan-fungsi-trigonometri",
        },
        slug: "derivative-of-trigonometric-function",
      },
      {
        routeSlugs: {
          en: "equation-of-a-tangent-line-to-a-curve",
          id: "persamaan-garis-singgung-pada-kurva",
        },
        slug: "equation-of-a-tangent-line-to-a-curve",
      },
      {
        routeSlugs: {
          en: "extrema-maximum-and-minimum-value",
          id: "titik-ekstrim-nilai-balik-maksimum-dan-minimum",
        },
        slug: "extrema-maximum-and-minimum-value",
      },
      {
        routeSlugs: {
          en: "increasing-decreasing-and-stationary-function",
          id: "fungsi-naik-turun-dan-stasioner",
        },
        slug: "increasing-decreasing-and-stationary-function",
      },
      {
        routeSlugs: {
          en: "properties-of-derivative-function",
          id: "sifat-turunan-fungsi",
        },
        slug: "properties-of-derivative-function",
      },
      {
        routeSlugs: {
          en: "writing-the-derivative-function",
          id: "penulisan-turunan-fungsi",
        },
        slug: "writing-the-derivative-function",
      },
    ],
    slug: "derivative-function",
    translations: {
      en: {
        description: "Use derivatives for velocity, acceleration, and height.",
        title: "Derivative Functions",
      },
      id: {
        description: "Gunakan turunan untuk kecepatan, percepatan, dan tinggi.",
        title: "Turunan Fungsi",
      },
    },
  }
);
