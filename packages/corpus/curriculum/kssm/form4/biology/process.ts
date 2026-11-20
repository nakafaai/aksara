import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on what happens inside a cell, Bab 5 to Bab 7 of the DSKP. */
export const kssmForm4BiologyProcessNodes = [
  unitNode({
    key: "form-4-biology-metabolism-and-enzymes",
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
    key: "form-4-biology-cell-division",
    order: 60,
    translations: {
      de: { routeSlug: "zellteilung", title: "Zellteilung" },
      en: { routeSlug: "cell-division", title: "Cell Division" },
      id: { routeSlug: "pembelahan-sel", title: "Pembelahan Sel" },
      ms: { routeSlug: "pembahagian-sel", title: "Pembahagian Sel" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-cellular-respiration-cellular-respiration",
        level: "lesson",
        materialKeys: ["lesson.biology.cellular-respiration"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 7.1 to 7.3",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-cellular-respiration",
    materialCard: {
      de: {
        description: "Vergleiche Zellatmung, Gärung und Sauerstoffschuld.",
        title: "Zellatmung",
      },
      en: {
        description: "Compare respiration, fermentation and oxygen debt.",
        title: "Cellular Respiration",
      },
      id: {
        description: "Bandingkan respirasi, fermentasi, dan utang oksigen.",
        title: "Respirasi Sel",
      },
      ms: {
        description: "Bandingkan respirasi, fermentasi dan hutang oksigen.",
        title: "Respirasi Sel",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "zellatmung", title: "Zellatmung" },
      en: { routeSlug: "cellular-respiration", title: "Cellular Respiration" },
      id: { routeSlug: "respirasi-sel", title: "Respirasi Sel" },
      ms: { routeSlug: "respirasi-sel", title: "Respirasi Sel" },
    },
  }),
];
