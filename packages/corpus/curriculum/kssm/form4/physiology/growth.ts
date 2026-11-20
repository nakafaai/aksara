import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on support, movement, reproduction and growth, chapters 14 and 15 of the DSKP. */
export const kssmForm4PhysiologyGrowthNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-support-and-movement-in-humans-and-animals-support-movement",
        level: "lesson",
        materialKeys: ["lesson.biology.support-movement"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 14.1 to 14.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-support-and-movement-in-humans-and-animals",
    materialCard: {
      de: {
        description: "Erkläre Skelett, Gelenke und Muskelhebel.",
        title: "Stütze und Bewegung bei Mensch und Tier",
      },
      en: {
        description: "Explain the skeleton, joints and muscle levers.",
        title: "Support and Movement in Humans and Animals",
      },
      id: {
        description: "Jelaskan rangka, sendi, dan tuas otot.",
        title: "Sistem Gerak pada Manusia dan Hewan",
      },
      ms: {
        description: "Terangkan rangka, sendi dan tuas otot.",
        title: "Sokongan dan Pergerakan dalam Manusia dan Haiwan",
      },
    },
    order: 140,
    translations: {
      de: {
        routeSlug: "stuetze-und-bewegung-bei-mensch-und-tier",
        title: "Stütze und Bewegung bei Mensch und Tier",
      },
      en: {
        routeSlug: "support-and-movement-in-humans-and-animals",
        title: "Support and Movement in Humans and Animals",
      },
      id: {
        routeSlug: "penyokong-dan-gerak-pada-manusia-dan-hewan",
        title: "Penyokong dan Gerak pada Manusia dan Hewan",
      },
      ms: {
        routeSlug: "sokongan-dan-pergerakan-dalam-manusia-dan-haiwan",
        title: "Sokongan dan Pergerakan dalam Manusia dan Haiwan",
      },
    },
  }),
  unitNode({
    key: "form-4-biology-sexual-reproduction-development-and-growth-in-humans-and-animals",
    order: 150,
    translations: {
      de: {
        routeSlug:
          "geschlechtliche-fortpflanzung-entwicklung-und-wachstum-bei-mensch-und-tier",
        title:
          "Geschlechtliche Fortpflanzung, Entwicklung und Wachstum bei Mensch und Tier",
      },
      en: {
        routeSlug:
          "sexual-reproduction-development-and-growth-in-humans-and-animals",
        title:
          "Sexual Reproduction, Development and Growth in Humans and Animals",
      },
      id: {
        routeSlug:
          "reproduksi-seksual-perkembangan-dan-pertumbuhan-pada-manusia-dan-hewan",
        title:
          "Reproduksi Seksual, Perkembangan, dan Pertumbuhan pada Manusia dan Hewan",
      },
      ms: {
        routeSlug:
          "pembiakan-seks-perkembangan-dan-pertumbuhan-dalam-manusia-dan-haiwan",
        title:
          "Pembiakan Seks, Perkembangan dan Pertumbuhan dalam Manusia dan Haiwan",
      },
    },
  }),
];
