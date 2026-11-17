import { unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on how the body defends and regulates itself: immunity, coordination and homeostasis, chapters 11 to 13 of the DSKP. */
export const kssmForm4PhysiologyControlNodes = [
  unitNode({
    key: "form-4-biology-immunity-in-humans",
    order: 110,
    translations: {
      de: {
        routeSlug: "immunitaet-beim-menschen",
        title: "Immunität beim Menschen",
      },
      en: { routeSlug: "immunity-in-humans", title: "Immunity in Humans" },
      id: {
        routeSlug: "imunitas-pada-manusia",
        title: "Imunitas pada Manusia",
      },
      ms: { routeSlug: "keimunan-manusia", title: "Keimunan Manusia" },
    },
  }),
  unitNode({
    key: "form-4-biology-coordination-and-response-in-humans",
    order: 120,
    translations: {
      de: {
        routeSlug: "koordination-und-reaktion-beim-menschen",
        title: "Koordination und Reaktion beim Menschen",
      },
      en: {
        routeSlug: "coordination-and-response-in-humans",
        title: "Coordination and Response in Humans",
      },
      id: {
        routeSlug: "koordinasi-dan-respons-pada-manusia",
        title: "Koordinasi dan Respons pada Manusia",
      },
      ms: {
        routeSlug: "koordinasi-dan-gerak-balas-dalam-manusia",
        title: "Koordinasi dan Gerak Balas dalam Manusia",
      },
    },
  }),
  unitNode({
    key: "form-4-biology-homeostasis-and-the-human-urinary-system",
    order: 130,
    translations: {
      de: {
        routeSlug: "homoeostase-und-das-harnsystem-des-menschen",
        title: "Homöostase und das Harnsystem des Menschen",
      },
      en: {
        routeSlug: "homeostasis-and-the-human-urinary-system",
        title: "Homeostasis and the Human Urinary System",
      },
      id: {
        routeSlug: "homeostasis-dan-sistem-ekskresi-urine-manusia",
        title: "Homeostasis dan Sistem Ekskresi Urine Manusia",
      },
      ms: {
        routeSlug: "homeostasis-dan-sistem-urinari-manusia",
        title: "Homeostasis dan Sistem Urinari Manusia",
      },
    },
  }),
];
