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
    children: [
      materialNode({
        key: "form-5-biology-ecosystem-ecosystem",
        level: "lesson",
        materialKeys: ["lesson.biology.ecosystem"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 24.1 to 24.2",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-ecosystem",
    materialCard: {
      de: {
        description: "Berechne Energieflüsse und schätze Populationen.",
        title: "Ökosystem",
      },
      en: {
        description: "Calculate energy flow and estimate populations.",
        title: "Ecosystem",
      },
      id: {
        description: "Hitung aliran energi dan taksir ukuran populasi.",
        title: "Ekosistem",
      },
      ms: {
        description: "Kira aliran tenaga dan anggar saiz populasi.",
        title: "Ekosistem",
      },
    },
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
    ],
    key: "form-5-biology-environmental-sustainability",
    materialCard: {
      de: {
        description: "Versteh, wie der Klimawandel unsere Zukunft prägt.",
        title: "Ökologische Nachhaltigkeit",
      },
      en: {
        description: "See how climate change shapes a sustainable future.",
        title: "Environmental Sustainability",
      },
      id: {
        description: "Pahami cara perubahan iklim memengaruhi masa depan.",
        title: "Kelestarian Lingkungan",
      },
      ms: {
        description: "Fahami cara perubahan iklim membentuk masa depan.",
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
