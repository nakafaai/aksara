import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsStandards } from "#corpus/curriculum/united-states/documents";

/** United States high school, CCSS conceptual category Number and Quantity. */
export const usNumberQuantityUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-mathematics-number-quantity-exponents",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 10,
      outcomes: [
        { code: "N-RN The Real Number System", ...mathematicsStandards },
        {
          code: "F-LE Linear, Quadratic, and Exponential Models",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-number-quantity-complex-numbers",
      level: "lesson",
      materialKeys: ["lesson.mathematics.complex-number"],
      order: 20,
      outcomes: [
        { code: "N-CN The Complex Number System", ...mathematicsStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-number-quantity-vectors",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 30,
      outcomes: [
        { code: "N-VM Vector and Matrix Quantities", ...mathematicsStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-number-quantity-matrices",
      level: "lesson",
      materialKeys: ["lesson.mathematics.matrix"],
      order: 40,
      outcomes: [
        { code: "N-VM Vector and Matrix Quantities", ...mathematicsStandards },
      ],
    }),
  ],
  key: "high-school-mathematics-number-quantity",
  materialCard: {
    de: {
      description: "Nutze Potenzen, komplexe Zahlen, Vektoren, Matrizen.",
      title: "Zahlen und Größen",
    },
    en: {
      description: "Use exponents, complex numbers, vectors, and matrices.",
      title: "Number and Quantity",
    },
    id: {
      description: "Pakai eksponen, bilangan kompleks, vektor, dan matriks.",
      title: "Bilangan dan Kuantitas",
    },
    ms: {
      description: "Guna eksponen, nombor kompleks, vektor dan matriks.",
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
});
