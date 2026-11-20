import { courseNode, materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsStandards } from "#corpus/curriculum/united-states/documents";
import { usHighSchoolGeometryUnit } from "#corpus/curriculum/united-states/mathematics/geometry";
import { usHighSchoolStatisticsProbabilityUnit } from "#corpus/curriculum/united-states/mathematics/statistics";

export const usHighSchoolMathematicsCourseNode = courseNode({
  children: [
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-mathematics-number-complex",
          level: "lesson",
          materialKeys: ["lesson.mathematics.complex-number"],
          order: 10,
          outcomes: [
            {
              code: "N-CN The Complex Number System",
              document: mathematicsStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-mathematics-number-vectors",
          level: "lesson",
          materialKeys: ["lesson.mathematics.vector-operations"],
          order: 20,
          outcomes: [
            {
              code: "N-VM Vector and Matrix Quantities",
              document: mathematicsStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-mathematics-number-matrices",
          level: "lesson",
          materialKeys: ["lesson.mathematics.matrix"],
          order: 30,
          outcomes: [
            {
              code: "N-VM Vector and Matrix Quantities",
              document: mathematicsStandards,
            },
          ],
        }),
      ],
      key: "high-school-mathematics-number-quantity",
      materialCard: {
        de: {
          description: "Arbeite mit komplexen Zahlen, Vektoren und Matrizen.",
          title: "Zahlen und Größen",
        },
        en: {
          description: "Use complex numbers, vectors, and matrices.",
          title: "Number and Quantity",
        },
        id: {
          description: "Gunakan bilangan kompleks, vektor, dan matriks.",
          title: "Bilangan dan Kuantitas",
        },
        ms: {
          description: "Guna nombor kompleks, vektor dan matriks.",
          title: "Nombor dan Kuantiti",
        },
      },
      order: 10,
      translations: {
        de: { routeSlug: "zahlen-und-groessen", title: "Zahlen und Größen" },
        en: { routeSlug: "number-and-quantity", title: "Number and Quantity" },
        id: {
          routeSlug: "bilangan-dan-kuantitas",
          title: "Bilangan dan Kuantitas",
        },
        ms: { routeSlug: "nombor-dan-kuantiti", title: "Nombor dan Kuantiti" },
      },
    }),
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-mathematics-algebra-linear",
          level: "lesson",
          materialKeys: ["lesson.mathematics.linear-equation-inequality"],
          order: 10,
          outcomes: [
            {
              code: "A-REI Reasoning with Equations and Inequalities",
              document: mathematicsStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-mathematics-algebra-quadratic",
          level: "lesson",
          materialKeys: ["lesson.mathematics.quadratic-function"],
          order: 20,
          outcomes: [
            {
              code: "A-REI Reasoning with Equations and Inequalities",
              document: mathematicsStandards,
            },
            {
              code: "A-SSE Seeing Structure in Expressions",
              document: mathematicsStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-mathematics-algebra-polynomial",
          level: "lesson",
          materialKeys: ["lesson.mathematics.polynomial"],
          order: 30,
          outcomes: [
            {
              code: "A-APR Arithmetic with Polynomials and Rational Expressions",
              document: mathematicsStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-mathematics-algebra-exponential",
          level: "lesson",
          materialKeys: ["lesson.mathematics.exponential-logarithm"],
          order: 40,
          outcomes: [
            {
              code: "N-RN The Real Number System",
              document: mathematicsStandards,
            },
            {
              code: "F-LE Linear, Quadratic, and Exponential Models",
              document: mathematicsStandards,
            },
          ],
        }),
      ],
      key: "high-school-mathematics-algebra",
      materialCard: {
        de: {
          description: "Löse Gleichungen, Polynome und Exponentialterme.",
          title: "Algebra",
        },
        en: {
          description: "Solve equations, polynomials, and exponentials.",
          title: "Algebra",
        },
        id: {
          description: "Selesaikan persamaan, polinom, dan eksponen.",
          title: "Aljabar",
        },
        ms: {
          description: "Selesaikan persamaan, polinomial dan eksponen.",
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
    }),
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-mathematics-functions-modeling",
          level: "lesson",
          materialKeys: ["lesson.mathematics.function-modeling"],
          order: 10,
          outcomes: [
            {
              code: "F-IF Interpreting Functions",
              document: mathematicsStandards,
            },
            {
              code: "F-TF Trigonometric Functions",
              document: mathematicsStandards,
            },
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
            { code: "F-BF Building Functions", document: mathematicsStandards },
          ],
        }),
        materialNode({
          key: "us-high-school-mathematics-functions-transformations",
          level: "lesson",
          materialKeys: ["lesson.mathematics.function-transformation"],
          order: 30,
          outcomes: [
            { code: "F-BF Building Functions", document: mathematicsStandards },
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
        id: {
          description: "Modelkan, susun, dan ubah fungsi.",
          title: "Fungsi",
        },
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
    }),
    usHighSchoolGeometryUnit,
    usHighSchoolStatisticsProbabilityUnit,
  ],
  iconKey: "mathematics",
  key: "high-school-mathematics",
  materialDomain: "mathematics",
  order: 10,
  translations: {
    de: { routeSlug: "mathematik", title: "Mathematik" },
    en: { routeSlug: "mathematics", title: "Mathematics" },
    id: { routeSlug: "matematika", title: "Matematika" },
    ms: { routeSlug: "matematik", title: "Matematik" },
  },
});
