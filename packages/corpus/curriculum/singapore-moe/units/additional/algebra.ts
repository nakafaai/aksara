import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { additionalMathematicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Additional Mathematics (K341), strand Algebra. */
export const singaporeAdditionalAlgebraUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-additional-mathematics-algebra-quadratics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 10,
      outcomes: [
        { code: "A1 Quadratic functions", ...additionalMathematicsSyllabus },
        {
          code: "A2 Equations and inequalities",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-algebra-simultaneous-equations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.simultaneous-equation"],
      order: 20,
      outcomes: [
        {
          code: "A2 Equations and inequalities",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-algebra-surds-logarithms",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 30,
      outcomes: [
        { code: "A3 Surds", ...additionalMathematicsSyllabus },
        {
          code: "A6 Exponential and logarithmic functions",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-algebra-polynomials",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 40,
      outcomes: [
        {
          code: "A4 Polynomials and partial fractions",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-algebra-binomial",
      level: "lesson",
      materialKeys: ["lesson.mathematics.combinatorics"],
      order: 50,
      outcomes: [
        { code: "A5 Binomial expansions", ...additionalMathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-algebra-functions",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 60,
      outcomes: [
        {
          code: "A6 Exponential and logarithmic functions",
          ...additionalMathematicsSyllabus,
        },
        {
          code: "G1 Trigonometric functions, identities and equations",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
  ],
  key: "secondary-additional-mathematics-algebra",
  materialCard: {
    de: {
      description: "Nutze Wurzeln, Polynome und Logarithmen sicher.",
      title: "Algebra",
    },
    en: {
      description: "Work with surds, polynomials, and logarithms.",
      title: "Algebra",
    },
    id: {
      description: "Olah bentuk akar, polinomial, dan logaritma.",
      title: "Aljabar",
    },
    ms: {
      description: "Guna surd, polinomial dan logaritma.",
      title: "Algebra",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "algebra", title: "Algebra" },
    en: { routeSlug: "algebra", title: "Algebra" },
    id: { routeSlug: "aljabar", title: "Aljabar" },
    ms: { routeSlug: "algebra", title: "Algebra" },
  },
});
