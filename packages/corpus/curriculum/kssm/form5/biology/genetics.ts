import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters on inheritance, variation and genetic technology, Bab 11 to Bab 13. */
export const kssmForm5BiologyGeneticsNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-inheritance-inheritance",
        level: "lesson",
        materialKeys: ["lesson.biology.inheritance"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 26.1 to 26.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-inheritance",
    materialCard: {
      de: {
        description: "Rechne Erbgänge nach Mendel und beim Menschen.",
        title: "Vererbung",
      },
      en: {
        description: "Work out Mendel's crosses and human inheritance.",
        title: "Inheritance",
      },
      id: {
        description: "Hitung persilangan Mendel dan pewarisan pada manusia.",
        title: "Pewarisan Sifat",
      },
      ms: {
        description: "Selesaikan kacukan Mendel dan pewarisan manusia.",
        title: "Pewarisan",
      },
    },
    order: 110,
    translations: {
      de: { routeSlug: "vererbung", title: "Vererbung" },
      en: { routeSlug: "inheritance", title: "Inheritance" },
      id: { routeSlug: "pewarisan-sifat", title: "Pewarisan Sifat" },
      ms: { routeSlug: "pewarisan", title: "Pewarisan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-variation-variation",
        level: "lesson",
        materialKeys: ["lesson.biology.variation"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 27.1 to 27.3",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-variation",
    materialCard: {
      de: {
        description: "Unterscheide Variationsformen und erkläre Mutationen.",
        title: "Variation",
      },
      en: {
        description: "Tell variation types apart and explain mutations.",
        title: "Variation",
      },
      id: {
        description: "Bedakan jenis variasi dan jelaskan mutasi.",
        title: "Variasi",
      },
      ms: {
        description: "Bezakan jenis variasi dan terangkan mutasi.",
        title: "Variasi",
      },
    },
    order: 120,
    translations: {
      de: { routeSlug: "variation", title: "Variation" },
      en: { routeSlug: "variation", title: "Variation" },
      id: { routeSlug: "variasi", title: "Variasi" },
      ms: { routeSlug: "variasi", title: "Variasi" },
    },
  }),
  unitNode({
    key: "form-5-biology-genetic-technology",
    order: 130,
    translations: {
      de: { routeSlug: "gentechnik", title: "Gentechnik" },
      en: { routeSlug: "genetic-technology", title: "Genetic Technology" },
      id: { routeSlug: "teknologi-genetika", title: "Teknologi Genetika" },
      ms: { routeSlug: "teknologi-genetik", title: "Teknologi Genetik" },
    },
  }),
];
