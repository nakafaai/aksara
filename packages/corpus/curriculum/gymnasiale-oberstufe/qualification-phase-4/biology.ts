import {
  biologyCoreCurriculum,
  biologyEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q4 Biologie: Einfluss des Menschen auf Ökosysteme; Nachhaltigkeit, Biodiversität. */
const qualificationPhase4BiologyUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-4-biology-human-impact-climate-change",
      level: "lesson",
      materialKeys: ["lesson.biology.climate-change"],
      order: 10,
      outcomes: [
        {
          code: "Biologie Q4.1 Einfluss des Menschen auf Ökosysteme; Nachhaltigkeit, Biodiversität",
          ...biologyCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.3 Lebewesen in ihrer Umwelt (Einfluss des Menschen auf Ökosysteme)",
          ...biologyEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-4-biology-human-impact",
  materialCard: {
    de: {
      description: "Was der Treibhauseffekt mit Leben auf der Erde macht.",
      title:
        "Einfluss des Menschen auf Ökosysteme; Nachhaltigkeit, Biodiversität",
    },
    en: {
      description: "What a warmer planet means for living things.",
      title: "Human impact on ecosystems, sustainability and biodiversity",
    },
    id: {
      description: "Arti planet yang memanas bagi makhluk hidup.",
      title:
        "Dampak manusia pada ekosistem, keberlanjutan, dan keanekaragaman hayati",
    },
    ms: {
      description: "Maksud planet yang memanas bagi hidupan.",
      title: "Kesan manusia terhadap ekosistem, kelestarian dan biodiversiti",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "einfluss-des-menschen-auf-oekosysteme",
      title:
        "Einfluss des Menschen auf Ökosysteme; Nachhaltigkeit, Biodiversität",
    },
    en: {
      routeSlug: "human-impact-on-ecosystems",
      title: "Human impact on ecosystems, sustainability and biodiversity",
    },
    id: {
      routeSlug: "dampak-manusia-pada-ekosistem",
      title:
        "Dampak manusia pada ekosistem, keberlanjutan, dan keanekaragaman hayati",
    },
    ms: {
      routeSlug: "kesan-manusia-terhadap-ekosistem",
      title: "Kesan manusia terhadap ekosistem, kelestarian dan biodiversiti",
    },
  },
});

/** Q4 Biologie: the Themenfelder of the Hessen Kerncurriculum Biologie that a lesson teaches, in its order */
export const qualificationPhase4BiologyUnitNodes = [
  qualificationPhase4BiologyUnit1,
];
