import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsStandards } from "#corpus/curriculum/united-states/documents";

/** United States high school, CCSS conceptual category Functions. */
export const usFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-mathematics-functions-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 10,
      outcomes: [
        { code: "F-IF Interpreting Functions", ...mathematicsStandards },
        {
          code: "F-LE Linear, Quadratic, and Exponential Models",
          ...mathematicsStandards,
        },
        { code: "F-TF Trigonometric Functions", ...mathematicsStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-functions-composition",
      level: "lesson",
      materialKeys: [
        "lesson.mathematics.function-composition-inverse-function",
      ],
      order: 20,
      outcomes: [
        { code: "F-BF Building Functions", ...mathematicsStandards },
        { code: "F-IF Interpreting Functions", ...mathematicsStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-functions-transformations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 30,
      outcomes: [{ code: "F-BF Building Functions", ...mathematicsStandards }],
    }),
    materialNode({
      key: "us-high-school-mathematics-functions-trigonometric",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 40,
      outcomes: [
        { code: "F-TF Trigonometric Functions", ...mathematicsStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-functions-sequences",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 50,
      outcomes: [
        { code: "F-BF Building Functions", ...mathematicsStandards },
        {
          code: "A-SSE Seeing Structure in Expressions",
          ...mathematicsStandards,
        },
      ],
    }),
  ],
  key: "high-school-mathematics-functions",
  materialCard: {
    de: {
      description: "Modelliere, verknüpfe und transformiere Funktionen.",
      title: "Funktionen",
    },
    en: {
      description: "Model, compose, and transform functions.",
      title: "Functions",
    },
    id: { description: "Modelkan, susun, dan ubah fungsi.", title: "Fungsi" },
    ms: {
      description: "Modelkan, gubah dan transformasikan fungsi.",
      title: "Fungsi",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "funktionen", title: "Funktionen" },
    en: { routeSlug: "functions", title: "Functions" },
    id: { routeSlug: "fungsi", title: "Fungsi" },
    ms: { routeSlug: "fungsi", title: "Fungsi" },
  },
});
