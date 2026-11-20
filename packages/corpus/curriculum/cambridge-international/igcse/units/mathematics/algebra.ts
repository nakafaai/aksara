import { mathematicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Mathematics 0580, topic 2 Algebra and graphs. */
export const igcseAlgebraGraphsUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-algebra-graphs-polynomials",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 10,
      outcomes: [
        { code: "E2.1 Introduction to algebra", ...mathematicsSyllabus },
        { code: "E2.2 Algebraic manipulation", ...mathematicsSyllabus },
        { code: "E2.10 Graphs of functions", ...mathematicsSyllabus },
        { code: "E2.11 Sketching curves", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-linear-equations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-equation-inequality"],
      order: 20,
      outcomes: [
        { code: "E2.5 Equations", ...mathematicsSyllabus },
        { code: "E2.6 Inequalities", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-simultaneous-equations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.simultaneous-equation"],
      order: 30,
      outcomes: [{ code: "E2.5 Equations", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-quadratics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 40,
      outcomes: [
        { code: "E2.2 Algebraic manipulation", ...mathematicsSyllabus },
        { code: "E2.5 Equations", ...mathematicsSyllabus },
        { code: "E2.10 Graphs of functions", ...mathematicsSyllabus },
        { code: "E2.11 Sketching curves", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-linear-programming",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-programming"],
      order: 50,
      outcomes: [{ code: "E2.6 Inequalities", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-sequences",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 60,
      outcomes: [{ code: "E2.7 Sequences", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-motion-graphs",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-kinematics"],
      order: 70,
      outcomes: [
        { code: "E2.9 Graphs in practical situations", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-functions",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 80,
      outcomes: [
        { code: "E2.3 Algebraic fractions", ...mathematicsSyllabus },
        { code: "E2.10 Graphs of functions", ...mathematicsSyllabus },
        { code: "E2.11 Sketching curves", ...mathematicsSyllabus },
        { code: "E6.4 Trigonometric functions", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-transformations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 90,
      outcomes: [{ code: "E2.11 Sketching curves", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-differentiation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 100,
      outcomes: [{ code: "E2.12 Differentiation", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "mathematics-0580-algebra-graphs-composite-inverse",
      level: "lesson",
      materialKeys: [
        "lesson.mathematics.function-composition-inverse-function",
      ],
      order: 110,
      outcomes: [{ code: "E2.13 Functions", ...mathematicsSyllabus }],
    }),
  ],
  key: "mathematics-0580-algebra-graphs",
  materialCard: {
    de: {
      description: "Stelle Gleichungen, Graphen, Folgen und Funktionen auf.",
      title: "Algebra und Graphen",
    },
    en: {
      description: "Build equations, graphs, sequences, and functions.",
      title: "Algebra and graphs",
    },
    id: {
      description: "Bangun persamaan, grafik, barisan, dan fungsi.",
      title: "Aljabar dan grafik",
    },
    ms: {
      description: "Bina persamaan, graf, jujukan dan fungsi.",
      title: "Algebra dan graf",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "algebra-und-graphen", title: "Algebra und Graphen" },
    en: { routeSlug: "algebra-and-graphs", title: "Algebra and graphs" },
    id: { routeSlug: "aljabar-dan-grafik", title: "Aljabar dan grafik" },
    ms: { routeSlug: "algebra-dan-graf", title: "Algebra dan graf" },
  },
});
