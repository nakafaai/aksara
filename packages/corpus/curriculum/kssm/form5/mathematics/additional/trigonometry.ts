import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics trigonometry chapter, trigonometric functions. */
export const kssmForm5AdditionalMathematicsTrigonometryNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-trigonometric-functions-trigonometric-function",
        level: "lesson",
        materialKeys: ["lesson.mathematics.trigonometric-function"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 6.1 and 6.3 to 6.6",
            document: additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-additional-mathematics-trigonometric-functions",
    materialCard: {
      de: {
        description: "Werte, Graphen, Identitäten und Gleichungen.",
        title: "Trigonometrische Funktionen",
      },
      en: {
        description: "Values, graphs, identities and equations.",
        title: "Trigonometric Functions",
      },
      id: {
        description: "Nilai, grafik, identitas, dan persamaan.",
        title: "Fungsi Trigonometri",
      },
      ms: {
        description: "Nilai, graf, identiti dan persamaan trigonometri.",
        title: "Fungsi Trigonometri",
      },
    },
    order: 60,
    translations: {
      de: {
        routeSlug: "trigonometrische-funktionen",
        title: "Trigonometrische Funktionen",
      },
      en: {
        routeSlug: "trigonometric-functions",
        title: "Trigonometric Functions",
      },
      id: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
      ms: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
    },
  }),
];
