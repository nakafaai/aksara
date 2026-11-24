import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters on the plant's tissues, leaves, nutrition and transport, Bab 1 to Bab 4. */
export const kssmForm5BiologyStructureNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-organisation-of-plant-tissues-and-growth-plant-tissue",
        level: "lesson",
        materialKeys: ["lesson.biology.plant-tissue"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 16.1 to 16.3",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-organisation-of-plant-tissues-and-growth",
    materialCard: {
      de: {
        description: "Erkenne Pflanzengewebe und lies Wachstumskurven.",
        title: "Gewebeaufbau und Wachstum der Pflanzen",
      },
      en: {
        description: "Identify plant tissues and read growth curves.",
        title: "Organisation of Plant Tissues and Growth",
      },
      id: {
        description: "Kenali jaringan tumbuhan dan baca kurva pertumbuhan.",
        title: "Organisasi Jaringan Tumbuhan dan Pertumbuhan",
      },
      ms: {
        description: "Kenali tisu tumbuhan dan tafsir lengkung pertumbuhan.",
        title: "Organisasi Tisu Tumbuhan dan Pertumbuhan",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "gewebeaufbau-und-wachstum-der-pflanzen",
        title: "Gewebeaufbau und Wachstum der Pflanzen",
      },
      en: {
        routeSlug: "organisation-of-plant-tissues-and-growth",
        title: "Organisation of Plant Tissues and Growth",
      },
      id: {
        routeSlug: "organisasi-jaringan-tumbuhan-dan-pertumbuhan",
        title: "Organisasi Jaringan Tumbuhan dan Pertumbuhan",
      },
      ms: {
        routeSlug: "organisasi-tisu-tumbuhan-dan-pertumbuhan",
        title: "Organisasi Tisu Tumbuhan dan Pertumbuhan",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-leaf-structure-and-function-leaf-structure",
        level: "lesson",
        materialKeys: ["lesson.biology.leaf-structure"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 17.1 to 17.5",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-leaf-structure-and-function",
    materialCard: {
      de: {
        description: "Versteh Blattbau, Gasaustausch und Fotosynthese.",
        title: "Bau und Funktion des Blattes",
      },
      en: {
        description: "Link leaf structure to gas exchange and photosynthesis.",
        title: "Leaf Structure and Function",
      },
      id: {
        description: "Pahami struktur daun, pertukaran gas, dan fotosintesis.",
        title: "Struktur dan Fungsi Daun",
      },
      ms: {
        description: "Fahami struktur daun, pertukaran gas dan fotosintesis.",
        title: "Struktur dan Fungsi Daun",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "bau-und-funktion-des-blattes",
        title: "Bau und Funktion des Blattes",
      },
      en: {
        routeSlug: "leaf-structure-and-function",
        title: "Leaf Structure and Function",
      },
      id: {
        routeSlug: "struktur-dan-fungsi-daun",
        title: "Struktur dan Fungsi Daun",
      },
      ms: {
        routeSlug: "struktur-dan-fungsi-daun",
        title: "Struktur dan Fungsi Daun",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-nutrition-in-plants",
    order: 30,
    translations: {
      de: {
        routeSlug: "ernaehrung-der-pflanzen",
        title: "Ernährung der Pflanzen",
      },
      en: { routeSlug: "nutrition-in-plants", title: "Nutrition in Plants" },
      id: {
        routeSlug: "nutrisi-pada-tumbuhan",
        title: "Nutrisi pada Tumbuhan",
      },
      ms: {
        routeSlug: "nutrisi-dalam-tumbuhan",
        title: "Nutrisi dalam Tumbuhan",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-transport-in-plants",
    order: 40,
    translations: {
      de: {
        routeSlug: "transport-in-pflanzen",
        title: "Transport in Pflanzen",
      },
      en: { routeSlug: "transport-in-plants", title: "Transport in Plants" },
      id: {
        routeSlug: "transportasi-pada-tumbuhan",
        title: "Transportasi pada Tumbuhan",
      },
      ms: {
        routeSlug: "pengangkutan-dalam-tumbuhan",
        title: "Pengangkutan dalam Tumbuhan",
      },
    },
  }),
];
