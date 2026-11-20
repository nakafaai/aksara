import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Mathematics (K310), strand Number and Algebra. */
export const singaporeNumberAlgebraUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-mathematics-number-algebra-polynomials",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 10,
      outcomes: [
        {
          code: "N5 Algebraic expressions and formulae",
          ...mathematicsSyllabus,
        },
        { code: "N6 Functions and graphs", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-number-algebra-linear-equations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-equation-inequality"],
      order: 20,
      outcomes: [
        { code: "N7 Equations and inequalities", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-number-algebra-simultaneous-equations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.simultaneous-equation"],
      order: 30,
      outcomes: [
        { code: "N7 Equations and inequalities", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-number-algebra-quadratics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 40,
      outcomes: [
        {
          code: "N5 Algebraic expressions and formulae",
          ...mathematicsSyllabus,
        },
        { code: "N6 Functions and graphs", ...mathematicsSyllabus },
        { code: "N7 Equations and inequalities", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-number-algebra-matrices",
      level: "lesson",
      materialKeys: ["lesson.mathematics.matrix"],
      order: 50,
      outcomes: [{ code: "N9 Matrices", ...mathematicsSyllabus }],
    }),
  ],
  key: "secondary-mathematics-number-algebra",
  materialCard: {
    de: {
      description: "Löse Gleichungen und lies Graphen von Funktionen.",
      title: "Zahlen und Algebra",
    },
    en: {
      description: "Solve equations and read graphs of functions.",
      title: "Number and algebra",
    },
    id: {
      description: "Selesaikan persamaan dan baca grafik fungsi.",
      title: "Bilangan dan aljabar",
    },
    ms: {
      description: "Selesaikan persamaan dan baca graf fungsi.",
      title: "Nombor dan algebra",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "zahlen-und-algebra", title: "Zahlen und Algebra" },
    en: { routeSlug: "number-and-algebra", title: "Number and algebra" },
    id: { routeSlug: "bilangan-dan-aljabar", title: "Bilangan dan aljabar" },
    ms: { routeSlug: "nombor-dan-algebra", title: "Nombor dan algebra" },
  },
});
