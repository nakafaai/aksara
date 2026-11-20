import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters on how a plant responds, reproduces and adapts, Bab 5 to Bab 7. */
export const kssmForm5BiologyLifeNodes = [
  unitNode({
    key: "form-5-biology-response-in-plants",
    order: 50,
    translations: {
      de: {
        routeSlug: "reaktionen-der-pflanzen",
        title: "Reaktionen der Pflanzen",
      },
      en: { routeSlug: "response-in-plants", title: "Response in Plants" },
      id: {
        routeSlug: "respons-pada-tumbuhan",
        title: "Respons pada Tumbuhan",
      },
      ms: {
        routeSlug: "gerak-balas-dalam-tumbuhan",
        title: "Gerak Balas dalam Tumbuhan",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-sexual-reproduction-in-flowering-plants",
    order: 60,
    translations: {
      de: {
        routeSlug: "geschlechtliche-fortpflanzung-der-bluetenpflanzen",
        title: "Geschlechtliche Fortpflanzung der Blütenpflanzen",
      },
      en: {
        routeSlug: "sexual-reproduction-in-flowering-plants",
        title: "Sexual Reproduction in Flowering Plants",
      },
      id: {
        routeSlug: "reproduksi-seksual-pada-tumbuhan-berbunga",
        title: "Reproduksi Seksual pada Tumbuhan Berbunga",
      },
      ms: {
        routeSlug: "pembiakan-seks-dalam-tumbuhan-berbunga",
        title: "Pembiakan Seks dalam Tumbuhan Berbunga",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-adaptations-of-plants-in-different-habitats-plant-adaptation",
        level: "lesson",
        materialKeys: ["lesson.biology.plant-adaptation"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standard 22.1",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-adaptations-of-plants-in-different-habitats",
    materialCard: {
      de: {
        description: "Vergleiche Pflanzen in Wasser, Salzsumpf und Wüste.",
        title: "Angepasstheit der Pflanzen",
      },
      en: {
        description: "Compare plants of water, salty swamps and deserts.",
        title: "Plant Adaptations",
      },
      id: {
        description: "Bandingkan tumbuhan air, hutan bakau, dan gurun.",
        title: "Adaptasi Tumbuhan",
      },
      ms: {
        description: "Bandingkan tumbuhan air, paya bakau dan gurun.",
        title: "Penyesuaian Tumbuhan",
      },
    },
    order: 70,
    translations: {
      de: {
        routeSlug: "angepasstheit-der-pflanzen-an-verschiedene-lebensraeume",
        title: "Angepasstheit der Pflanzen an verschiedene Lebensräume",
      },
      en: {
        routeSlug: "adaptations-of-plants-in-different-habitats",
        title: "Adaptations of Plants in Different Habitats",
      },
      id: {
        routeSlug: "adaptasi-tumbuhan-di-habitat-yang-berbeda",
        title: "Adaptasi Tumbuhan di Habitat yang Berbeda",
      },
      ms: {
        routeSlug: "penyesuaian-tumbuhan-pada-habitat-berlainan",
        title: "Penyesuaian Tumbuhan pada Habitat Berlainan",
      },
    },
  }),
];
