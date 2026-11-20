import { unitNode } from "#corpus/curriculum/schema";

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
