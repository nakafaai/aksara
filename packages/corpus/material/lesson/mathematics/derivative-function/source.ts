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
        translations: {
          en: {
            title: "Application of Derivatives",
          },
          id: {
            title: "Aplikasi Turunan",
          },
        },
      },
      {
        routeSlugs: {
          en: "chain-rule-in-derivative",
          id: "aturan-rantai-pada-turunan",
        },
        slug: "chain-rule-in-derivative",
        translations: {
          en: {
            title: "Chain Rule in Derivative",
          },
          id: {
            title: "Aturan Rantai pada Turunan",
          },
        },
      },
      {
        routeSlugs: {
          en: "concept-of-derivative-function",
          id: "konsep-turunan-fungsi",
        },
        slug: "concept-of-derivative-function",
        translations: {
          en: {
            title: "Concept of Derivative Function",
          },
          id: {
            title: "Konsep Turunan Fungsi",
          },
        },
      },
      {
        routeSlugs: {
          en: "derivative-of-algebraic-function",
          id: "turunan-fungsi-aljabar",
        },
        slug: "derivative-of-algebraic-function",
        translations: {
          en: {
            title: "Derivative of Algebraic Function",
          },
          id: {
            title: "Turunan Fungsi Aljabar",
          },
        },
      },
      {
        routeSlugs: {
          en: "derivative-of-trigonometric-function",
          id: "turunan-fungsi-trigonometri",
        },
        slug: "derivative-of-trigonometric-function",
        translations: {
          en: {
            title: "Derivative of Trigonometric Function",
          },
          id: {
            title: "Turunan Fungsi Trigonometri",
          },
        },
      },
      {
        routeSlugs: {
          en: "equation-of-a-tangent-line-to-a-curve",
          id: "persamaan-garis-singgung-pada-kurva",
        },
        slug: "equation-of-a-tangent-line-to-a-curve",
        translations: {
          en: {
            title: "Equation of a Tangent Line to a Curve",
          },
          id: {
            title: "Persamaan Garis Singgung pada Kurva",
          },
        },
      },
      {
        routeSlugs: {
          en: "extrema-maximum-and-minimum-value",
          id: "titik-ekstrim-nilai-balik-maksimum-dan-minimum",
        },
        slug: "extrema-maximum-and-minimum-value",
        translations: {
          en: {
            title: "Extreme Points, Maximum and Minimum Turning Points",
          },
          id: {
            title: "Titik Ekstrim, Nilai Balik Maksimum dan Minimum",
          },
        },
      },
      {
        routeSlugs: {
          en: "increasing-decreasing-and-stationary-function",
          id: "fungsi-naik-turun-dan-stasioner",
        },
        slug: "increasing-decreasing-and-stationary-function",
        translations: {
          en: {
            title: "Increasing, Decreasing, and Stationary Functions",
          },
          id: {
            title: "Fungsi Naik, Turun, dan Stasioner",
          },
        },
      },
      {
        routeSlugs: {
          en: "properties-of-derivative-function",
          id: "sifat-turunan-fungsi",
        },
        slug: "properties-of-derivative-function",
        translations: {
          en: {
            title: "Properties of Derivative Function",
          },
          id: {
            title: "Sifat Turunan Fungsi",
          },
        },
      },
      {
        routeSlugs: {
          en: "writing-the-derivative-function",
          id: "penulisan-turunan-fungsi",
        },
        slug: "writing-the-derivative-function",
        translations: {
          en: {
            title: "Writing the Derivative Function",
          },
          id: {
            title: "Penulisan Turunan Fungsi",
          },
        },
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
