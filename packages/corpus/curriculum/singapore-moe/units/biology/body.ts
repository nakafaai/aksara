import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { biologySyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Biology (K325), section II The Human Body, Maintaining Life. */
export const singaporeBodyUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-biology-human-body-nutrition",
      level: "lesson",
      materialKeys: ["lesson.biology.digestive-system"],
      order: 10,
      outcomes: [
        { code: "4 Nutrition in Humans", ...biologySyllabus },
        { code: "3 Biological Molecules", ...biologySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-biology-human-body-transport",
      level: "lesson",
      materialKeys: ["lesson.biology.circulatory-system"],
      order: 20,
      outcomes: [{ code: "5 Transport in Humans", ...biologySyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-biology-human-body-respiration",
      level: "lesson",
      materialKeys: ["lesson.biology.respiratory-system"],
      order: 30,
      outcomes: [{ code: "6 Respiration in Humans", ...biologySyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-biology-human-body-homeostasis",
      level: "lesson",
      materialKeys: ["lesson.biology.homeostasis"],
      order: 40,
      outcomes: [
        { code: "7 Excretion in Humans", ...biologySyllabus },
        {
          code: "8 Homeostasis, Co-ordination and Response in Humans",
          ...biologySyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-biology-human-body-coordination",
      level: "lesson",
      materialKeys: ["lesson.biology.coordination"],
      order: 50,
      outcomes: [
        {
          code: "8 Homeostasis, Co-ordination and Response in Humans",
          ...biologySyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-biology-human-body-immunity",
      level: "lesson",
      materialKeys: ["lesson.biology.immunity"],
      order: 60,
      outcomes: [
        { code: "9 Infectious Diseases in Humans", ...biologySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-biology-human-body-viruses",
      level: "lesson",
      materialKeys: ["lesson.biology.virus-role"],
      order: 70,
      outcomes: [
        { code: "9 Infectious Diseases in Humans", ...biologySyllabus },
      ],
    }),
  ],
  key: "secondary-biology-human-body",
  materialCard: {
    de: {
      description: "Verbinde Verdauung, Kreislauf, Atmung und Abwehr.",
      title: "Der menschliche Körper: Leben erhalten",
    },
    en: {
      description: "Connect digestion, circulation, breathing, and defence.",
      title: "The human body: maintaining life",
    },
    id: {
      description: "Hubungkan cerna, sirkulasi, napas, dan imun.",
      title: "Tubuh manusia: menjaga kehidupan",
    },
    ms: {
      description: "Kaitkan pencernaan, peredaran, pernafasan dan imun.",
      title: "Tubuh manusia: mengekalkan hidup",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "der-menschliche-koerper-leben-erhalten",
      title: "Der menschliche Körper: Leben erhalten",
    },
    en: {
      routeSlug: "the-human-body-maintaining-life",
      title: "The human body: maintaining life",
    },
    id: {
      routeSlug: "tubuh-manusia-menjaga-kehidupan",
      title: "Tubuh manusia: menjaga kehidupan",
    },
    ms: {
      routeSlug: "tubuh-manusia-mengekalkan-hidup",
      title: "Tubuh manusia: mengekalkan hidup",
    },
  },
});
