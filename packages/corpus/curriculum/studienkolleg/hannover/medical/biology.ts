import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverBiology } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover M-Kurs Biologie: Cytologie. */
const hannoverMedicalBiologyUnit1 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-biology-cytology-cell-organisation",
      level: "lesson",
      materialKeys: ["lesson.biology.cell-organisation"],
      order: 10,
      outcomes: [
        {
          code: "Cytologie: Aufbau und Funktion der Zelle",
          ...hannoverBiology,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-biology-cytology-membrane-transport",
      level: "lesson",
      materialKeys: ["lesson.biology.membrane-transport"],
      order: 20,
      outcomes: [
        { code: "Cytologie: Diffusion und Osmose", ...hannoverBiology },
      ],
    }),
  ],
  key: "hannover-m-biology-cytology",
  materialCard: {
    de: {
      description: "Die Zelle als kleinste Einheit des Lebens.",
      title: "Cytologie",
    },
    en: {
      description: "The cell as the smallest unit of life.",
      title: "Cytology",
    },
    id: {
      description: "Sel sebagai unit terkecil kehidupan.",
      title: "Sitologi",
    },
    ms: {
      description: "Sel sebagai unit terkecil hidupan.",
      title: "Sitologi",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "cytologie", title: "Cytologie" },
    en: { routeSlug: "cytology", title: "Cytology" },
    id: { routeSlug: "sitologi", title: "Sitologi" },
    ms: { routeSlug: "sitologi", title: "Sitologi" },
  },
});

/** Hannover M-Kurs Biologie: Genetik. */
const hannoverMedicalBiologyUnit2 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-biology-genetics-virus-role",
      level: "lesson",
      materialKeys: ["lesson.biology.virus-role"],
      order: 10,
      outcomes: [
        { code: "Genetik: Viren", ...hannoverBiology },
        { code: "Genetik: Biotechnologie", ...hannoverBiology },
      ],
    }),
  ],
  key: "hannover-m-biology-genetics",
  materialCard: {
    de: {
      description: "Wie Viren Gene in fremde Zellen schleusen.",
      title: "Genetik",
    },
    en: {
      description: "How viruses smuggle genes into other cells.",
      title: "Genetics",
    },
    id: {
      description: "Cara virus menyelundupkan gen ke sel lain.",
      title: "Genetika",
    },
    ms: {
      description: "Cara virus menyeludup gen ke dalam sel lain.",
      title: "Genetik",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "genetik", title: "Genetik" },
    en: { routeSlug: "genetics", title: "Genetics" },
    id: { routeSlug: "genetika", title: "Genetika" },
    ms: { routeSlug: "genetik", title: "Genetik" },
  },
});

/** Hannover M-Kurs Biologie: Physiologie. */
const hannoverMedicalBiologyUnit3 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-biology-physiology-circulatory-system",
      level: "lesson",
      materialKeys: ["lesson.biology.circulatory-system"],
      order: 10,
      outcomes: [
        { code: "Physiologie: Blut und Blutkreislauf", ...hannoverBiology },
      ],
    }),
    materialNode({
      key: "hannover-m-biology-physiology-immunity",
      level: "lesson",
      materialKeys: ["lesson.biology.immunity"],
      order: 20,
      outcomes: [{ code: "Physiologie: Immunsystem", ...hannoverBiology }],
    }),
  ],
  key: "hannover-m-biology-physiology",
  materialCard: {
    de: {
      description: "Blut, Kreislauf und die Abwehr des Körpers.",
      title: "Physiologie",
    },
    en: {
      description: "Blood, circulation and the body's defences.",
      title: "Physiology",
    },
    id: {
      description: "Darah, peredaran, dan pertahanan tubuh.",
      title: "Fisiologi",
    },
    ms: {
      description: "Darah, peredaran dan pertahanan badan.",
      title: "Fisiologi",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "physiologie", title: "Physiologie" },
    en: { routeSlug: "physiology", title: "Physiology" },
    id: { routeSlug: "fisiologi", title: "Fisiologi" },
    ms: { routeSlug: "fisiologi", title: "Fisiologi" },
  },
});

/** Hannover M-Kurs Biologie: the headings of its Prüfungsinhalte list, each with the lessons that teach its items */
export const hannoverMedicalBiologyUnitNodes = [
  hannoverMedicalBiologyUnit1,
  hannoverMedicalBiologyUnit2,
  hannoverMedicalBiologyUnit3,
];
