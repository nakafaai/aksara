import { chemistryStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Chemistry chapter of the theme Industrial Chemistry, Bab 8. */
export const kssmForm4ChemistryIndustryNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-manufactured-substances-in-industry-manufactured-substances",
        level: "lesson",
        materialKeys: ["lesson.chemistry.manufactured-substances"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 8.1 to 8.4",
            document: chemistryStandards,
          },
        ],
      }),
    ],
    key: "form-4-chemistry-manufactured-substances-in-industry",
    materialCard: {
      de: {
        description: "Sieh, warum Legierungen, Glas und Keramik so wirken.",
        title: "Industriell hergestellte Stoffe",
      },
      en: {
        description: "See why alloys, glass and ceramics behave as they do.",
        title: "Manufactured Substances in Industry",
      },
      id: {
        description: "Lihat alasan sifat paduan logam, kaca, dan keramik.",
        title: "Bahan Buatan dalam Industri",
      },
      ms: {
        description: "Lihat sebab sifat aloi, kaca dan seramik berbeza.",
        title: "Bahan Buatan dalam Industri",
      },
    },
    order: 80,
    translations: {
      de: {
        routeSlug: "industriell-hergestellte-stoffe",
        title: "Industriell hergestellte Stoffe",
      },
      en: {
        routeSlug: "manufactured-substances-in-industry",
        title: "Manufactured Substances in Industry",
      },
      id: {
        routeSlug: "bahan-buatan-dalam-industri",
        title: "Bahan Buatan dalam Industri",
      },
      ms: {
        routeSlug: "bahan-buatan-dalam-industri",
        title: "Bahan Buatan dalam Industri",
      },
    },
  }),
];
