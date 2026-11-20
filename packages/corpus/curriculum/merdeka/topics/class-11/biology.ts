import {
  biologyBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka Kelas 11 Biologi units, in the chapter order of the Kemendikbudristek Buku Siswa Biologi SMA/MA Kelas XI (2022). */
export const merdekaClass11BiologyTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-11-biology-cell-material",
        level: "lesson",
        materialKeys: ["lesson.biology.cell-organisation"],
        order: 10,
        outcomes: [
          {
            code: "Biologi, Fase F, elemen Pemahaman Biologi",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab 1 Menjelajah Sel, A dan B", ...biologyBookXI },
        ],
      }),
    ],
    key: "class-11-biology-cell",
    materialCard: {
      de: {
        description: "Lerne Zellstrukturen und die Aufgaben der Organellen.",
        title: "Die Zelle erkunden",
      },
      en: {
        description: "Learn cell structures and what each organelle does.",
        title: "Exploring the Cell",
      },
      id: {
        description: "Kenali struktur sel dan fungsi organelnya.",
        title: "Menjelajah Sel",
      },
      ms: {
        description: "Kenali struktur sel dan fungsi organelnya.",
        title: "Meneroka Sel",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "die-zelle-erkunden", title: "Die Zelle erkunden" },
      en: { routeSlug: "exploring-the-cell", title: "Exploring the Cell" },
      id: { routeSlug: "menjelajah-sel", title: "Menjelajah Sel" },
      ms: { routeSlug: "meneroka-sel", title: "Meneroka Sel" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-biology-membrane-transport-material",
        level: "lesson",
        materialKeys: ["lesson.biology.membrane-transport"],
        order: 10,
        outcomes: [
          {
            code: "Biologi, Fase F, elemen Pemahaman Biologi",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 2 Pergerakan Zat melalui Membran Sel, A dan B",
            ...biologyBookXI,
          },
        ],
      }),
    ],
    key: "class-11-biology-membrane-transport",
    materialCard: {
      de: {
        description: "Unterscheide Diffusion, Osmose und aktiven Transport.",
        title: "Stofftransport durch die Zellmembran",
      },
      en: {
        description: "Tell diffusion, osmosis and active transport apart.",
        title: "Movement of Substances across the Cell Membrane",
      },
      id: {
        description: "Bedakan difusi, osmosis, dan transpor aktif.",
        title: "Pergerakan Zat melalui Membran Sel",
      },
      ms: {
        description: "Bezakan resapan, osmosis dan pengangkutan aktif.",
        title: "Pergerakan Bahan merentasi Membran Sel",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "stofftransport-durch-die-zellmembran",
        title: "Stofftransport durch die Zellmembran",
      },
      en: {
        routeSlug: "movement-of-substances-across-the-cell-membrane",
        title: "Movement of Substances across the Cell Membrane",
      },
      id: {
        routeSlug: "pergerakan-zat-melalui-membran-sel",
        title: "Pergerakan Zat melalui Membran Sel",
      },
      ms: {
        routeSlug: "pergerakan-bahan-merentasi-membran-sel",
        title: "Pergerakan Bahan merentasi Membran Sel",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-biology-human-transport-circulation-material",
        level: "lesson",
        materialKeys: ["lesson.biology.circulatory-system"],
        order: 10,
        outcomes: [
          {
            code: "Biologi, Fase F, elemen Pemahaman Biologi",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 4 Transpor dan Pertukaran Zat pada Manusia",
            ...biologyBookXI,
          },
        ],
      }),
      materialNode({
        key: "class-11-biology-human-transport-respiration-material",
        level: "lesson",
        materialKeys: ["lesson.biology.respiratory-system"],
        order: 20,
        outcomes: [
          {
            code: "Biologi, Fase F, elemen Pemahaman Biologi",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 4 Transpor dan Pertukaran Zat pada Manusia",
            ...biologyBookXI,
          },
        ],
      }),
      materialNode({
        key: "class-11-biology-human-transport-digestion-material",
        level: "lesson",
        materialKeys: ["lesson.biology.digestive-system"],
        order: 30,
        outcomes: [
          {
            code: "Biologi, Fase F, elemen Pemahaman Biologi",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 4 Transpor dan Pertukaran Zat pada Manusia",
            ...biologyBookXI,
          },
        ],
      }),
    ],
    key: "class-11-biology-human-transport",
    materialCard: {
      de: {
        description: "Verfolge Nährstoffe und Sauerstoff bis zur Zelle.",
        title: "Transport und Stoffaustausch beim Menschen",
      },
      en: {
        description: "Follow food and oxygen from gut and lungs to cells.",
        title: "Transport and Exchange in Humans",
      },
      id: {
        description: "Ikuti sari makanan dan oksigen sampai ke sel.",
        title: "Transpor dan Pertukaran Zat pada Manusia",
      },
      ms: {
        description: "Jejaki nutrien dan oksigen hingga ke sel badan.",
        title: "Pengangkutan dan Pertukaran Bahan dalam Manusia",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "transport-und-stoffaustausch-beim-menschen",
        title: "Transport und Stoffaustausch beim Menschen",
      },
      en: {
        routeSlug: "transport-and-exchange-in-humans",
        title: "Transport and Exchange in Humans",
      },
      id: {
        routeSlug: "transpor-dan-pertukaran-zat-pada-manusia",
        title: "Transpor dan Pertukaran Zat pada Manusia",
      },
      ms: {
        routeSlug: "pengangkutan-dan-pertukaran-bahan-dalam-manusia",
        title: "Pengangkutan dan Pertukaran Bahan dalam Manusia",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-biology-body-defence-material",
        level: "lesson",
        materialKeys: ["lesson.biology.immunity"],
        order: 10,
        outcomes: [
          {
            code: "Biologi, Fase F, elemen Pemahaman Biologi",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 5 Sistem Pertahanan Tubuh terhadap Penyakit",
            ...biologyBookXI,
          },
        ],
      }),
    ],
    key: "class-11-biology-body-defence",
    materialCard: {
      de: {
        description: "Sieh, wie der Körper Erreger erkennt und abwehrt.",
        title: "Abwehrsystem des Körpers",
      },
      en: {
        description: "See how the body recognises and fights pathogens.",
        title: "Body Defence against Disease",
      },
      id: {
        description: "Lihat cara tubuh mengenali dan melawan patogen.",
        title: "Sistem Pertahanan Tubuh terhadap Penyakit",
      },
      ms: {
        description: "Lihat cara badan mengecam dan melawan patogen.",
        title: "Sistem Pertahanan Badan terhadap Penyakit",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "abwehrsystem-des-koerpers",
        title: "Abwehrsystem des Körpers",
      },
      en: {
        routeSlug: "body-defence-against-disease",
        title: "Body Defence against Disease",
      },
      id: {
        routeSlug: "sistem-pertahanan-tubuh-terhadap-penyakit",
        title: "Sistem Pertahanan Tubuh terhadap Penyakit",
      },
      ms: {
        routeSlug: "sistem-pertahanan-badan-terhadap-penyakit",
        title: "Sistem Pertahanan Badan terhadap Penyakit",
      },
    },
  }),
];
