import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsStandards } from "#corpus/curriculum/united-states/documents";

/** United States high school, CCSS conceptual category Algebra. */
export const usAlgebraUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-mathematics-algebra-polynomials",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 10,
      outcomes: [
        {
          code: "A-APR Arithmetic with Polynomials and Rational Expressions",
          ...mathematicsStandards,
        },
        {
          code: "A-SSE Seeing Structure in Expressions",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-algebra-linear",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-equation-inequality"],
      order: 20,
      outcomes: [
        {
          code: "A-REI Reasoning with Equations and Inequalities",
          ...mathematicsStandards,
        },
        { code: "A-CED Creating Equations", ...mathematicsStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-algebra-simultaneous",
      level: "lesson",
      materialKeys: ["lesson.mathematics.simultaneous-equation"],
      order: 30,
      outcomes: [
        {
          code: "A-REI Reasoning with Equations and Inequalities",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-algebra-quadratic",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 40,
      outcomes: [
        {
          code: "A-REI Reasoning with Equations and Inequalities",
          ...mathematicsStandards,
        },
        {
          code: "A-SSE Seeing Structure in Expressions",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-algebra-linear-programming",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-programming"],
      order: 50,
      outcomes: [
        {
          code: "A-REI Reasoning with Equations and Inequalities",
          ...mathematicsStandards,
        },
        { code: "A-CED Creating Equations", ...mathematicsStandards },
      ],
    }),
  ],
  key: "high-school-mathematics-algebra",
  materialCard: {
    de: {
      description: "Löse Gleichungen, Ungleichungen und Polynome.",
      title: "Algebra",
    },
    en: {
      description: "Solve equations, inequalities, and polynomials.",
      title: "Algebra",
    },
    id: {
      description: "Selesaikan persamaan, pertidaksamaan, dan polinomial.",
      title: "Aljabar",
    },
    ms: {
      description: "Selesaikan persamaan, ketaksamaan dan polinomial.",
      title: "Algebra",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "algebra", title: "Algebra" },
    en: { routeSlug: "algebra", title: "Algebra" },
    id: { routeSlug: "aljabar", title: "Aljabar" },
    ms: { routeSlug: "algebra", title: "Algebra" },
  },
});
