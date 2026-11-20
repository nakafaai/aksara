import { coreCurriculum } from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/**
 * The Themenfelder of Q4 (Funktionenscharen, Problemlösen und Argumentieren)
 * that a Nakafa lesson teaches, in the order of the Kerncurriculum. Q4.1 is
 * verbindlich and Q4.3 optional; Q4.2 waits for a lesson that teaches it.
 */
export const qualificationPhase4MathematicsUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-4-mathematics-function-families-function-transformation",
        level: "lesson",
        materialKeys: ["lesson.mathematics.function-transformation"],
        order: 10,
        outcomes: [{ code: "Q4.1 Funktionenscharen", ...coreCurriculum }],
      }),
    ],
    key: "qualification-phase-4-mathematics-function-families",
    materialCard: {
      de: {
        description: "Sieh, wie ein Parameter Graphen schiebt und streckt.",
        title: "Funktionenscharen",
      },
      en: {
        description: "Watch how one parameter moves and stretches a graph.",
        title: "Families of Functions",
      },
      id: {
        description: "Lihat cara parameter menggeser dan meregangkan grafik.",
        title: "Keluarga Fungsi",
      },
      ms: {
        description: "Lihat cara satu parameter menganjak dan meregang graf.",
        title: "Keluarga Fungsi",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "funktionenscharen", title: "Funktionenscharen" },
      en: {
        routeSlug: "families-of-functions",
        title: "Families of Functions",
      },
      id: { routeSlug: "keluarga-fungsi", title: "Keluarga Fungsi" },
      ms: { routeSlug: "keluarga-fungsi", title: "Keluarga Fungsi" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-4-mathematics-complex-numbers-complex-number",
        level: "lesson",
        materialKeys: ["lesson.mathematics.complex-number"],
        order: 10,
        outcomes: [{ code: "Q4.3 Komplexe Zahlen", ...coreCurriculum }],
      }),
    ],
    key: "qualification-phase-4-mathematics-complex-numbers",
    materialCard: {
      de: {
        description: "Rechne mit komplexen Zahlen in der Gaußschen Ebene.",
        title: "Komplexe Zahlen",
      },
      en: {
        description: "Work with complex numbers as points on a plane.",
        title: "Complex Numbers",
      },
      id: {
        description: "Hitung bilangan kompleks sebagai titik pada bidang.",
        title: "Bilangan Kompleks",
      },
      ms: {
        description: "Kira nombor kompleks sebagai titik pada satah.",
        title: "Nombor Kompleks",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "komplexe-zahlen", title: "Komplexe Zahlen" },
      en: { routeSlug: "complex-numbers", title: "Complex Numbers" },
      id: { routeSlug: "bilangan-kompleks", title: "Bilangan Kompleks" },
      ms: { routeSlug: "nombor-kompleks", title: "Nombor Kompleks" },
    },
  }),
];
