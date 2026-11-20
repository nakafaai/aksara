import {
  chemistryCoreCurriculum,
  chemistryEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q2 Chemie: Grundlagen der Kunststoffchemie. */
const qualificationPhase2ChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-2-chemistry-plastics-polymer",
      level: "lesson",
      materialKeys: ["lesson.chemistry.polymer"],
      order: 10,
      outcomes: [
        {
          code: "Chemie Q2.2 Grundlagen der Kunststoffchemie",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Chemie Q2.4 Organische Werkstoffe (Kautschuk, Vulkanisation)",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Stoffe, Strukturen, Eigenschaften (Natürliche und synthetische Stoffe: Kunststoffe)",
          ...chemistryEducationStandards,
        },
        {
          code: "Inhaltsbereich 2.6.3 Arbeitsweisen (Synthesen: Kunststoffsynthese)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-2-chemistry-plastics",
  materialCard: {
    de: {
      description: "Kleine Moleküle verketten sich zu langen Kunststoffen.",
      title: "Grundlagen der Kunststoffchemie",
    },
    en: {
      description: "Small molecules link up into long plastic chains.",
      title: "Foundations of plastics chemistry",
    },
    id: {
      description: "Molekul kecil bersambung jadi rantai plastik panjang.",
      title: "Dasar kimia plastik",
    },
    ms: {
      description: "Molekul kecil bergabung menjadi rantai plastik.",
      title: "Asas kimia plastik",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "grundlagen-der-kunststoffchemie",
      title: "Grundlagen der Kunststoffchemie",
    },
    en: {
      routeSlug: "foundations-of-plastics-chemistry",
      title: "Foundations of plastics chemistry",
    },
    id: { routeSlug: "dasar-kimia-plastik", title: "Dasar kimia plastik" },
    ms: { routeSlug: "asas-kimia-plastik", title: "Asas kimia plastik" },
  },
});

/** Q2 Chemie: the Themenfelder of the Hessen Kerncurriculum Chemie that a lesson teaches, in its order */
export const qualificationPhase2ChemistryUnitNodes = [
  qualificationPhase2ChemistryUnit1,
];
