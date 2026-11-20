import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics geometry chapter, circular measure. */
export const kssmForm5AdditionalMathematicsGeometryNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-circular-measure-circle-arc-sector",
        level: "lesson",
        materialKeys: ["lesson.mathematics.circle-arc-sector"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 1.1 to 1.4",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-additional-mathematics-circular-measure",
    materialCard: {
      de: {
        description: "Nutze Bogenmaß für Bogenlänge und Sektorfläche.",
        title: "Bogenmaß",
      },
      en: {
        description: "Use radians for arc length and sector area.",
        title: "Circular Measure",
      },
      id: {
        description: "Pakai radian untuk panjang busur dan luas juring.",
        title: "Ukuran Radian",
      },
      ms: {
        description: "Guna radian untuk panjang lengkok dan luas sektor.",
        title: "Sukatan Membulat",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "bogenmass", title: "Bogenmaß" },
      en: { routeSlug: "circular-measure", title: "Circular Measure" },
      id: { routeSlug: "ukuran-radian", title: "Ukuran Radian" },
      ms: { routeSlug: "sukatan-membulat", title: "Sukatan Membulat" },
    },
  }),
];
