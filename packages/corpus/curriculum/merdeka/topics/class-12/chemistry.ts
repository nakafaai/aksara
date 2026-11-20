import {
  chemistryBookXII,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka Kelas 12 Kimia units, in the chapter order of the Kemendikbudristek Buku Siswa Kimia SMA/MA Kelas XII. */
export const merdekaClass12ChemistryTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-12-chemistry-electrochemistry-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.redox-equilibrium"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab II Elektrokimia, B sampai E",
            ...chemistryBookXII,
          },
        ],
      }),
    ],
    key: "class-12-chemistry-electrochemistry",
    materialCard: {
      de: {
        description: "Baue Zellen, elektrolysiere, nutze Potentiale.",
        title: "Elektrochemie",
      },
      en: {
        description: "Build cells, run electrolysis and use E° values.",
        title: "Electrochemistry",
      },
      id: {
        description: "Susun sel volta, elektrolisis, dan hitung potensial.",
        title: "Elektrokimia",
      },
      ms: {
        description: "Bina sel, jalankan elektrolisis dan guna nilai E°.",
        title: "Elektrokimia",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "elektrochemie", title: "Elektrochemie" },
      en: { routeSlug: "electrochemistry", title: "Electrochemistry" },
      id: { routeSlug: "elektrokimia", title: "Elektrokimia" },
      ms: { routeSlug: "elektrokimia", title: "Elektrokimia" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-chemistry-functional-groups-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.carbon-compound"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab III Gugus Fungsi dalam Senyawa Karbon",
            ...chemistryBookXII,
          },
        ],
      }),
    ],
    key: "class-12-chemistry-functional-groups",
    materialCard: {
      de: {
        description: "Benenne Alkohole, Carbonsäuren und Ester.",
        title: "Funktionelle Gruppen in Kohlenstoffverbindungen",
      },
      en: {
        description: "Name alcohols, carboxylic acids and esters.",
        title: "Functional Groups in Carbon Compounds",
      },
      id: {
        description: "Kenali alkohol, asam karboksilat, dan ester.",
        title: "Gugus Fungsi dalam Senyawa Karbon",
      },
      ms: {
        description: "Namakan alkohol, asid karboksilik dan ester.",
        title: "Kumpulan Berfungsi dalam Sebatian Karbon",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "funktionelle-gruppen-in-kohlenstoffverbindungen",
        title: "Funktionelle Gruppen in Kohlenstoffverbindungen",
      },
      en: {
        routeSlug: "functional-groups-in-carbon-compounds",
        title: "Functional Groups in Carbon Compounds",
      },
      id: {
        routeSlug: "gugus-fungsi-dalam-senyawa-karbon",
        title: "Gugus Fungsi dalam Senyawa Karbon",
      },
      ms: {
        routeSlug: "kumpulan-berfungsi-dalam-sebatian-karbon",
        title: "Kumpulan Berfungsi dalam Sebatian Karbon",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-chemistry-organic-macromolecules-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.polymer"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab IV Makromolekul Organik, A sampai C dan F",
            ...chemistryBookXII,
          },
        ],
      }),
    ],
    key: "class-12-chemistry-organic-macromolecules",
    materialCard: {
      de: {
        description: "Unterscheide Additions- und Kondensationspolymere.",
        title: "Organische Makromoleküle",
      },
      en: {
        description: "Tell addition and condensation polymers apart.",
        title: "Organic Macromolecules",
      },
      id: {
        description: "Bedakan polimer adisi dan kondensasi.",
        title: "Makromolekul Organik",
      },
      ms: {
        description: "Bezakan polimer penambahan dan kondensasi.",
        title: "Makromolekul Organik",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "organische-makromolekuele",
        title: "Organische Makromoleküle",
      },
      en: {
        routeSlug: "organic-macromolecules",
        title: "Organic Macromolecules",
      },
      id: { routeSlug: "makromolekul-organik", title: "Makromolekul Organik" },
      ms: { routeSlug: "makromolekul-organik", title: "Makromolekul Organik" },
    },
  }),
];
