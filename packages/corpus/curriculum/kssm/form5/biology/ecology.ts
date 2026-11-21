import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters on biodiversity, ecosystems and environmental sustainability, Bab 8 to Bab 10. */
export const kssmForm5BiologyEcologyNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-biodiversity-biodiversity",
        level: "lesson",
        materialKeys: ["lesson.biology.biodiversity"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 23.1 to 23.3",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-biodiversity",
    materialCard: {
      de: {
        description: "Ordne Lebewesen und sieh, warum Vielfalt zählt.",
        title: "Biodiversität",
      },
      en: {
        description: "Sort living things and see why their variety matters.",
        title: "Biodiversity",
      },
      id: {
        description: "Kelompokkan makhluk hidup dan pahami keragamannya.",
        title: "Keanekaragaman Hayati",
      },
      ms: {
        description: "Kelaskan hidupan dan fahami kepelbagaiannya.",
        title: "Biodiversiti",
      },
    },
    order: 80,
    translations: {
      de: { routeSlug: "biodiversitaet", title: "Biodiversität" },
      en: { routeSlug: "biodiversity", title: "Biodiversity" },
      id: {
        routeSlug: "keanekaragaman-hayati",
        title: "Keanekaragaman Hayati",
      },
      ms: { routeSlug: "biodiversiti", title: "Biodiversiti" },
    },
  }),
  unitNode({
    key: "form-5-biology-ecosystem",
    order: 90,
    translations: {
      de: { routeSlug: "oekosystem", title: "Ökosystem" },
      en: { routeSlug: "ecosystem", title: "Ecosystem" },
      id: { routeSlug: "ekosistem", title: "Ekosistem" },
      ms: { routeSlug: "ekosistem", title: "Ekosistem" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-environmental-sustainability-climate-change",
        level: "lesson",
        materialKeys: ["lesson.biology.climate-change"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Learning Standard 25.1.2 (climate change, global warming)",
            ...biologyStandards,
          },
        ],
      }),
      materialNode({
        key: "form-5-biology-environmental-sustainability-environmental-sustainability",
        level: "lesson",
        materialKeys: ["lesson.biology.environmental-sustainability"],
        order: 20,
        outcomes: [
          {
            code: "Form 5, Content Standards 25.1 to 25.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-environmental-sustainability",
    materialCard: {
      de: {
        description: "Miss Verschmutzung, schütz Natur, versteh Klimawandel.",
        title: "Ökologische Nachhaltigkeit",
      },
      en: {
        description: "Measure pollution, protect nature, see climate change.",
        title: "Environmental Sustainability",
      },
      id: {
        description: "Ukur pencemaran, lindungi alam, pahami perubahan iklim.",
        title: "Kelestarian Lingkungan",
      },
      ms: {
        description: "Ukur pencemaran, lindungi alam, fahami perubahan iklim.",
        title: "Kelestarian Alam Sekitar",
      },
    },
    order: 100,
    translations: {
      de: {
        routeSlug: "oekologische-nachhaltigkeit",
        title: "Ökologische Nachhaltigkeit",
      },
      en: {
        routeSlug: "environmental-sustainability",
        title: "Environmental Sustainability",
      },
      id: {
        routeSlug: "kelestarian-lingkungan",
        title: "Kelestarian Lingkungan",
      },
      ms: {
        routeSlug: "kelestarian-alam-sekitar",
        title: "Kelestarian Alam Sekitar",
      },
    },
  }),
];
