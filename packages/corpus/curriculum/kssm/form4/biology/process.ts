import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on what happens inside a cell, Bab 5 to Bab 7 of the DSKP. */
export const kssmForm4BiologyProcessNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-metabolism-and-enzymes-metabolism-enzyme",
        level: "lesson",
        materialKeys: ["lesson.biology.metabolism-enzyme"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 5.1 to 5.3",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-metabolism-and-enzymes",
    materialCard: {
      de: {
        description: "Erkläre, wie Enzyme den Stoffwechsel beschleunigen.",
        title: "Stoffwechsel und Enzyme",
      },
      en: {
        description: "Explain metabolism and how enzymes speed up reactions.",
        title: "Metabolism and Enzymes",
      },
      id: {
        description: "Jelaskan metabolisme dan cara enzim mempercepat reaksi.",
        title: "Metabolisme dan Enzim",
      },
      ms: {
        description: "Terangkan metabolisme dan cara enzim bertindak.",
        title: "Metabolisme dan Enzim",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "stoffwechsel-und-enzyme",
        title: "Stoffwechsel und Enzyme",
      },
      en: {
        routeSlug: "metabolism-and-enzymes",
        title: "Metabolism and Enzymes",
      },
      id: {
        routeSlug: "metabolisme-dan-enzim",
        title: "Metabolisme dan Enzim",
      },
      ms: {
        routeSlug: "metabolisme-dan-enzim",
        title: "Metabolisme dan Enzim",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-cell-division-cell-division",
        level: "lesson",
        materialKeys: ["lesson.biology.cell-division"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 6.1 to 6.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-cell-division",
    materialCard: {
      de: {
        description: "Vergleiche Mitose und Meiose im Zellzyklus.",
        title: "Zellteilung",
      },
      en: {
        description: "Compare mitosis and meiosis and follow the cell cycle.",
        title: "Cell Division",
      },
      id: {
        description: "Bandingkan mitosis dan meiosis serta ikuti siklus sel.",
        title: "Pembelahan Sel",
      },
      ms: {
        description: "Bandingkan mitosis dan meiosis serta ikuti kitar sel.",
        title: "Pembahagian Sel",
      },
    },
    order: 60,
    translations: {
      de: { routeSlug: "zellteilung", title: "Zellteilung" },
      en: { routeSlug: "cell-division", title: "Cell Division" },
      id: { routeSlug: "pembelahan-sel", title: "Pembelahan Sel" },
      ms: { routeSlug: "pembahagian-sel", title: "Pembahagian Sel" },
    },
  }),
  unitNode({
    key: "form-4-biology-cellular-respiration",
    order: 70,
    translations: {
      de: { routeSlug: "zellatmung", title: "Zellatmung" },
      en: { routeSlug: "cellular-respiration", title: "Cellular Respiration" },
      id: { routeSlug: "respirasi-sel", title: "Respirasi Sel" },
      ms: { routeSlug: "respirasi-sel", title: "Respirasi Sel" },
    },
  }),
];
