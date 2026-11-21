import { mathematicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Mathematics 0580, topic 1 Number. */
export const igcseNumberUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-number-indices",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 10,
      outcomes: [
        { code: "E1.3 Powers and roots", ...mathematicsSyllabus },
        { code: "E1.7 Indices I", ...mathematicsSyllabus },
        { code: "E1.13 Percentages", ...mathematicsSyllabus },
        { code: "E1.17 Exponential growth and decay", ...mathematicsSyllabus },
        { code: "E1.18 Surds", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "mathematics-0580-number",
  materialCard: {
    de: {
      description: "Rechne mit Potenzen, Wurzeln und Wachstum.",
      title: "Zahlen",
    },
    en: {
      description: "Work with indices, surds, and exponential change.",
      title: "Number",
    },
    id: {
      description: "Olah indeks, bentuk akar, dan perubahan eksponensial.",
      title: "Bilangan",
    },
    ms: {
      description: "Guna indeks, surd dan perubahan eksponen.",
      title: "Nombor",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "zahlen", title: "Zahlen" },
    en: { routeSlug: "number", title: "Number" },
    id: { routeSlug: "bilangan", title: "Bilangan" },
    ms: { routeSlug: "nombor", title: "Nombor" },
  },
});
