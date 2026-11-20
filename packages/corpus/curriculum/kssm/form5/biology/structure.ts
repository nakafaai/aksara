import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters on the plant's tissues, leaves, nutrition and transport, Bab 1 to Bab 4. */
export const kssmForm5BiologyStructureNodes = [
  unitNode({
    key: "form-5-biology-organisation-of-plant-tissues-and-growth",
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
    key: "form-5-biology-leaf-structure-and-function",
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
    children: [
      materialNode({
        key: "form-5-biology-nutrition-in-plants-plant-nutrition",
        level: "lesson",
        materialKeys: ["lesson.biology.plant-nutrition"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 18.1 to 18.3",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-nutrition-in-plants",
    materialCard: {
      de: {
        description: "Erkenne Nährstoffmangel und die Aufnahme durch Wurzeln.",
        title: "Ernährung der Pflanzen",
      },
      en: {
        description: "Spot nutrient deficiencies and explain uptake by roots.",
        title: "Nutrition in Plants",
      },
      id: {
        description: "Kenali kekurangan unsur hara dan cara akar menyerapnya.",
        title: "Nutrisi pada Tumbuhan",
      },
      ms: {
        description: "Kenali kekurangan nutrien dan cara akar menyerapnya.",
        title: "Nutrisi dalam Tumbuhan",
      },
    },
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
    children: [
      materialNode({
        key: "form-5-biology-transport-in-plants-plant-transport",
        level: "lesson",
        materialKeys: ["lesson.biology.plant-transport"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 19.1 to 19.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-transport-in-plants",
    materialCard: {
      de: {
        description: "Erkläre Xylem, Phloem, Wasseraufstieg und Translokation.",
        title: "Transport in Pflanzen",
      },
      en: {
        description: "Explain xylem, phloem, transpiration and translocation.",
        title: "Transport in Plants",
      },
      id: {
        description: "Jelaskan xilem, floem, transpirasi, dan translokasi.",
        title: "Transportasi pada Tumbuhan",
      },
      ms: {
        description: "Terangkan xilem, floem, transpirasi dan translokasi.",
        title: "Pengangkutan dalam Tumbuhan",
      },
    },
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
