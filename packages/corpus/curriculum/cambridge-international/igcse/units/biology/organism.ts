import { biologySyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Biology 0610, topic 1 Characteristics and classification of living organisms. */
export const igcseClassificationUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-classification-biodiversity",
      level: "lesson",
      materialKeys: ["lesson.biology.biodiversity"],
      order: 10,
      outcomes: [
        {
          code: "1.2 Concept and uses of classification systems",
          ...biologySyllabus,
        },
        { code: "1.3 Features of organisms", ...biologySyllabus },
        { code: "19.1 Energy flow", ...biologySyllabus },
        { code: "19.2 Food chains and food webs", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-classification",
  materialCard: {
    de: {
      description: "Ordne Lebewesen mit Schlüsseln und Rangstufen.",
      title: "Merkmale und Klassifikation der Lebewesen",
    },
    en: {
      description: "Sort organisms with keys and classification ranks.",
      title: "Characteristics and classification of living organisms",
    },
    id: {
      description: "Kelompokkan organisme dengan kunci dan takson.",
      title: "Ciri dan klasifikasi makhluk hidup",
    },
    ms: {
      description: "Kelaskan organisma dengan kekunci dan takson.",
      title: "Ciri dan pengelasan organisma hidup",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "merkmale-und-klassifikation-der-lebewesen",
      title: "Merkmale und Klassifikation der Lebewesen",
    },
    en: {
      routeSlug: "characteristics-and-classification-of-living-organisms",
      title: "Characteristics and classification of living organisms",
    },
    id: {
      routeSlug: "ciri-dan-klasifikasi-makhluk-hidup",
      title: "Ciri dan klasifikasi makhluk hidup",
    },
    ms: {
      routeSlug: "ciri-dan-pengelasan-organisma-hidup",
      title: "Ciri dan pengelasan organisma hidup",
    },
  },
});

/** Cambridge IGCSE Biology 0610, topic 2 Organisation of the organism. */
export const igcseOrganisationUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-organisation-cells",
      level: "lesson",
      materialKeys: ["lesson.biology.cell-organisation"],
      order: 10,
      outcomes: [
        { code: "2.1 Cell structure", ...biologySyllabus },
        { code: "2.2 Size of specimens", ...biologySyllabus },
        { code: "1.1 Characteristics of living organisms", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-organisation",
  materialCard: {
    de: {
      description: "Vergleiche Zellen und berechne Vergrößerungen.",
      title: "Aufbau des Organismus",
    },
    en: {
      description: "Compare cells and calculate magnification.",
      title: "Organisation of the organism",
    },
    id: {
      description: "Bandingkan sel dan hitung perbesaran.",
      title: "Organisasi tubuh organisme",
    },
    ms: {
      description: "Bandingkan sel dan kira pembesaran.",
      title: "Organisasi organisma",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "aufbau-des-organismus", title: "Aufbau des Organismus" },
    en: {
      routeSlug: "organisation-of-the-organism",
      title: "Organisation of the organism",
    },
    id: {
      routeSlug: "organisasi-tubuh-organisme",
      title: "Organisasi tubuh organisme",
    },
    ms: { routeSlug: "organisasi-organisma", title: "Organisasi organisma" },
  },
});

/** Cambridge IGCSE Biology 0610, topic 3 Movement into and out of cells. */
export const igcseCellTransportUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-cell-transport-membranes",
      level: "lesson",
      materialKeys: ["lesson.biology.membrane-transport"],
      order: 10,
      outcomes: [
        { code: "3.1 Diffusion", ...biologySyllabus },
        { code: "3.2 Osmosis", ...biologySyllabus },
        { code: "3.3 Active transport", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-cell-transport",
  materialCard: {
    de: {
      description: "Erkläre Diffusion, Osmose und aktiven Transport.",
      title: "Stofftransport in und aus Zellen",
    },
    en: {
      description: "Explain diffusion, osmosis, and active transport.",
      title: "Movement into and out of cells",
    },
    id: {
      description: "Jelaskan difusi, osmosis, dan transpor aktif.",
      title: "Pergerakan zat masuk dan keluar sel",
    },
    ms: {
      description: "Terangkan resapan, osmosis dan pengangkutan aktif.",
      title: "Pergerakan ke dalam dan ke luar sel",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "stofftransport-in-und-aus-zellen",
      title: "Stofftransport in und aus Zellen",
    },
    en: {
      routeSlug: "movement-into-and-out-of-cells",
      title: "Movement into and out of cells",
    },
    id: {
      routeSlug: "pergerakan-zat-masuk-dan-keluar-sel",
      title: "Pergerakan zat masuk dan keluar sel",
    },
    ms: {
      routeSlug: "pergerakan-ke-dalam-dan-ke-luar-sel",
      title: "Pergerakan ke dalam dan ke luar sel",
    },
  },
});

/** Cambridge IGCSE Biology 0610, topic 20 Human influences on ecosystems. */
export const igcseHumanInfluenceUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-human-influences-climate",
      level: "lesson",
      materialKeys: ["lesson.biology.climate-change"],
      order: 10,
      outcomes: [
        { code: "20.2 Habitat destruction", ...biologySyllabus },
        { code: "20.3 Pollution", ...biologySyllabus },
        { code: "20.4 Conservation", ...biologySyllabus },
        { code: "19.3 Nutrient cycles", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-human-influences",
  materialCard: {
    de: {
      description: "Bewerte Treibhausgase, Landnutzung und Naturschutz.",
      title: "Einfluss des Menschen auf Ökosysteme",
    },
    en: {
      description: "Weigh greenhouse gases, land use, and conservation.",
      title: "Human influences on ecosystems",
    },
    id: {
      description: "Timbang gas rumah kaca, lahan, dan konservasi.",
      title: "Pengaruh manusia terhadap ekosistem",
    },
    ms: {
      description: "Nilai gas rumah hijau, guna tanah dan pemuliharaan.",
      title: "Pengaruh manusia terhadap ekosistem",
    },
  },
  order: 200,
  translations: {
    de: {
      routeSlug: "einfluss-des-menschen-auf-oekosysteme",
      title: "Einfluss des Menschen auf Ökosysteme",
    },
    en: {
      routeSlug: "human-influences-on-ecosystems",
      title: "Human influences on ecosystems",
    },
    id: {
      routeSlug: "pengaruh-manusia-terhadap-ekosistem",
      title: "Pengaruh manusia terhadap ekosistem",
    },
    ms: {
      routeSlug: "pengaruh-manusia-terhadap-ekosistem",
      title: "Pengaruh manusia terhadap ekosistem",
    },
  },
});
