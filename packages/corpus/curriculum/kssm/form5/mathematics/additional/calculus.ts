import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics calculus chapters, differentiation then integration. */
export const kssmForm5AdditionalMathematicsCalculusNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-differentiation-derivative-function",
        level: "lesson",
        materialKeys: ["lesson.mathematics.derivative-function"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 2.1 to 2.3, Content Standard 2.4 (Learning Standards 2.4.1, 2.4.4 and 2.4.5)",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-additional-mathematics-differentiation",
    materialCard: {
      de: {
        description: "Leite Funktionen ab und finde Extrempunkte.",
        title: "Differentialrechnung",
      },
      en: {
        description: "Differentiate functions and find turning points.",
        title: "Differentiation",
      },
      id: {
        description: "Turunkan fungsi dan cari titik stasioner.",
        title: "Turunan",
      },
      ms: {
        description: "Bezakan fungsi dan cari titik pusingan.",
        title: "Pembezaan",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "differentialrechnung", title: "Differentialrechnung" },
      en: { routeSlug: "differentiation", title: "Differentiation" },
      id: { routeSlug: "turunan", title: "Turunan" },
      ms: { routeSlug: "pembezaan", title: "Pembezaan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-integration-integral",
        level: "lesson",
        materialKeys: ["lesson.mathematics.integral"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 3.1 to 3.4",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-additional-mathematics-integration",
    materialCard: {
      de: {
        description: "Integriere Funktionen und berechne Flächen.",
        title: "Integralrechnung",
      },
      en: {
        description: "Integrate functions and find areas under curves.",
        title: "Integration",
      },
      id: {
        description: "Integralkan fungsi dan hitung luas di bawah kurva.",
        title: "Integral",
      },
      ms: {
        description: "Kamirkan fungsi dan cari luas di bawah lengkung.",
        title: "Pengamiran",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "integralrechnung", title: "Integralrechnung" },
      en: { routeSlug: "integration", title: "Integration" },
      id: { routeSlug: "integral", title: "Integral" },
      ms: { routeSlug: "pengamiran", title: "Pengamiran" },
    },
  }),
];
