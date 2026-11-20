import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on the laboratory and the cell, Bab 1 to Bab 4 of the DSKP. */
export const kssmForm4BiologyStructureNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-introduction-to-biology-and-laboratory-rules-biology-introduction",
        level: "lesson",
        materialKeys: ["lesson.biology.biology-introduction"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 1.1 to 1.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-introduction-to-biology-and-laboratory-rules",
    materialCard: {
      de: {
        description: "Kenne Fachgebiete, Laborregeln und faire Versuche.",
        title: "Einführung in die Biologie",
      },
      en: {
        description: "Explore biology fields, lab safety and investigations.",
        title: "Introduction to Biology",
      },
      id: {
        description: "Kenali bidang biologi, aturan lab, dan metode ilmiah.",
        title: "Pengantar Biologi",
      },
      ms: {
        description: "Kenali bidang biologi, peraturan makmal dan penyiasatan.",
        title: "Pengenalan kepada Biologi",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "einfuehrung-in-die-biologie-und-laborregeln",
        title: "Einführung in die Biologie und Laborregeln",
      },
      en: {
        routeSlug: "introduction-to-biology-and-laboratory-rules",
        title: "Introduction to Biology and Laboratory Rules",
      },
      id: {
        routeSlug: "pengantar-biologi-dan-tata-tertib-laboratorium",
        title: "Pengantar Biologi dan Tata Tertib Laboratorium",
      },
      ms: {
        routeSlug: "pengenalan-kepada-biologi-dan-peraturan-makmal",
        title: "Pengenalan kepada Biologi dan Peraturan Makmal",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-cell-biology-and-cell-organisation-cell-organisation",
        level: "lesson",
        materialKeys: ["lesson.biology.cell-organisation"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 2.1 to 2.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-cell-biology-and-cell-organisation",
    materialCard: {
      de: {
        description: "Erkenne Organellen und spezialisierte Zellen.",
        title: "Zellbiologie und Zellorganisation",
      },
      en: {
        description: "Identify organelles and specialised cells.",
        title: "Cell Biology and Cell Organisation",
      },
      id: {
        description: "Kenali organel dan sel khusus.",
        title: "Biologi Sel dan Organisasi Sel",
      },
      ms: {
        description: "Kenal pasti organel dan sel khusus.",
        title: "Biologi Sel dan Organisasi Sel",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "zellbiologie-und-zellorganisation",
        title: "Zellbiologie und Zellorganisation",
      },
      en: {
        routeSlug: "cell-biology-and-cell-organisation",
        title: "Cell Biology and Cell Organisation",
      },
      id: {
        routeSlug: "biologi-sel-dan-organisasi-sel",
        title: "Biologi Sel dan Organisasi Sel",
      },
      ms: {
        routeSlug: "biologi-sel-dan-organisasi-sel",
        title: "Biologi Sel dan Organisasi Sel",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-movement-of-substances-across-a-plasma-membrane-membrane-transport",
        level: "lesson",
        materialKeys: ["lesson.biology.membrane-transport"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 3.1 to 3.4",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-4-biology-movement-of-substances-across-a-plasma-membrane",
    materialCard: {
      de: {
        description: "Unterscheide Diffusion, Osmose und aktiven Transport.",
        title: "Stofftransport durch die Plasmamembran",
      },
      en: {
        description: "Tell diffusion, osmosis and active transport apart.",
        title: "Movement of Substances across a Plasma Membrane",
      },
      id: {
        description: "Bedakan difusi, osmosis, dan transpor aktif.",
        title: "Transpor Zat melalui Membran Plasma",
      },
      ms: {
        description: "Bezakan resapan, osmosis dan pengangkutan aktif.",
        title: "Pergerakan Bahan Merentas Membran Plasma",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "stofftransport-durch-die-plasmamembran",
        title: "Stofftransport durch die Plasmamembran",
      },
      en: {
        routeSlug: "movement-of-substances-across-a-plasma-membrane",
        title: "Movement of Substances across a Plasma Membrane",
      },
      id: {
        routeSlug: "transpor-zat-melalui-membran-plasma",
        title: "Transpor Zat melalui Membran Plasma",
      },
      ms: {
        routeSlug: "pergerakan-bahan-merentasi-membran-plasma",
        title: "Pergerakan Bahan Merentasi Membran Plasma",
      },
    },
  }),
  unitNode({
    key: "form-4-biology-chemical-composition-in-a-cell",
    order: 40,
    translations: {
      de: {
        routeSlug: "chemische-zusammensetzung-der-zelle",
        title: "Chemische Zusammensetzung der Zelle",
      },
      en: {
        routeSlug: "chemical-composition-in-a-cell",
        title: "Chemical Composition in a Cell",
      },
      id: {
        routeSlug: "komposisi-kimia-dalam-sel",
        title: "Komposisi Kimia dalam Sel",
      },
      ms: {
        routeSlug: "komposisi-kimia-dalam-sel",
        title: "Komposisi Kimia dalam Sel",
      },
    },
  }),
];
