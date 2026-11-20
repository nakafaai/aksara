import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics chapter on linear programming. */
export const kssmForm5AdditionalMathematicsProgrammingNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-linear-programming-linear-programming",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-programming"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 7.1 to 7.2",
            document: additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-additional-mathematics-linear-programming",
    materialCard: {
      de: {
        description: "Schraffiere Bereiche und optimiere an den Ecken.",
        title: "Lineare Optimierung",
      },
      en: {
        description: "Shade feasible regions and optimise at vertices.",
        title: "Linear Programming",
      },
      id: {
        description: "Arsir daerah penyelesaian dan uji titik pojok.",
        title: "Program Linear",
      },
      ms: {
        description: "Lorek rantau tersaur dan uji nilai pada bucu.",
        title: "Pengaturcaraan Linear",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "lineare-optimierung", title: "Lineare Optimierung" },
      en: { routeSlug: "linear-programming", title: "Linear Programming" },
      id: { routeSlug: "program-linear", title: "Program Linear" },
      ms: {
        routeSlug: "pengaturcaraan-linear",
        title: "Pengaturcaraan Linear",
      },
    },
  }),
];
