import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { additionalMathematicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Additional Mathematics (K341), strand Calculus. */
export const singaporeAdditionalCalculusUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-additional-mathematics-calculus-derivatives",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 10,
      outcomes: [
        {
          code: "C1 Differentiation and integration",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-calculus-integrals",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 20,
      outcomes: [
        {
          code: "C1 Differentiation and integration",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-calculus-motion",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-kinematics"],
      order: 30,
      outcomes: [
        {
          code: "C1 Differentiation and integration",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
  ],
  key: "secondary-additional-mathematics-calculus",
  materialCard: {
    de: {
      description: "Leite ab, integriere und beschreibe Bewegungen.",
      title: "Analysis",
    },
    en: {
      description: "Differentiate, integrate, and describe motion.",
      title: "Calculus",
    },
    id: {
      description: "Turunkan, integralkan, dan jelaskan gerak.",
      title: "Kalkulus",
    },
    ms: {
      description: "Bezakan, kamirkan dan huraikan gerakan.",
      title: "Kalkulus",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "analysis", title: "Analysis" },
    en: { routeSlug: "calculus", title: "Calculus" },
    id: { routeSlug: "kalkulus", title: "Kalkulus" },
    ms: { routeSlug: "kalkulus", title: "Kalkulus" },
  },
});
