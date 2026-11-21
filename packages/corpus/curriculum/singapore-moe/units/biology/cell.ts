import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { biologySyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Biology (K325), section I Cells and the Chemistry of Life. */
export const singaporeCellsUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-biology-cells-cells",
      level: "lesson",
      materialKeys: ["lesson.biology.cell-organisation"],
      order: 10,
      outcomes: [
        { code: "1 Cell Structure and Organisation", ...biologySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-biology-cells-transport",
      level: "lesson",
      materialKeys: ["lesson.biology.membrane-transport"],
      order: 20,
      outcomes: [{ code: "2 Movement of Substances", ...biologySyllabus }],
    }),
  ],
  key: "secondary-biology-cells",
  materialCard: {
    de: {
      description: "Untersuche Zellen und wie Stoffe hindurchgelangen.",
      title: "Zellen und die Chemie des Lebens",
    },
    en: {
      description: "Study cells and how substances cross them.",
      title: "Cells and the chemistry of life",
    },
    id: {
      description: "Pelajari sel dan cara zat melintasinya.",
      title: "Sel dan kimia kehidupan",
    },
    ms: {
      description: "Kaji sel dan cara bahan merentasinya.",
      title: "Sel dan kimia hidupan",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "zellen-und-die-chemie-des-lebens",
      title: "Zellen und die Chemie des Lebens",
    },
    en: {
      routeSlug: "cells-and-the-chemistry-of-life",
      title: "Cells and the chemistry of life",
    },
    id: {
      routeSlug: "sel-dan-kimia-kehidupan",
      title: "Sel dan kimia kehidupan",
    },
    ms: { routeSlug: "sel-dan-kimia-hidupan", title: "Sel dan kimia hidupan" },
  },
});

/** Singapore SEC G3 Biology (K325), section III Living Together, Plants, Animals and Ecosystems. */
export const singaporeEcosystemsUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-biology-living-together-food-webs",
      level: "lesson",
      materialKeys: ["lesson.biology.biodiversity"],
      order: 10,
      outcomes: [
        { code: "11 Organisms and their Environment", ...biologySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-biology-living-together-climate",
      level: "lesson",
      materialKeys: ["lesson.biology.climate-change"],
      order: 20,
      outcomes: [
        { code: "11 Organisms and their Environment", ...biologySyllabus },
      ],
    }),
  ],
  key: "secondary-biology-living-together",
  materialCard: {
    de: {
      description: "Verfolge Energie durch Nahrungsnetze und das Klima.",
      title: "Zusammenleben: Pflanzen, Tiere und Ökosysteme",
    },
    en: {
      description: "Follow energy through food webs and the climate.",
      title: "Living together: plants, animals and ecosystems",
    },
    id: {
      description: "Ikuti energi lewat jaring makanan dan iklim.",
      title: "Hidup bersama: tumbuhan, hewan, dan ekosistem",
    },
    ms: {
      description: "Ikuti tenaga melalui siratan makanan dan iklim.",
      title: "Hidup bersama: tumbuhan, haiwan dan ekosistem",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "zusammenleben-pflanzen-tiere-und-oekosysteme",
      title: "Zusammenleben: Pflanzen, Tiere und Ökosysteme",
    },
    en: {
      routeSlug: "living-together-plants-animals-and-ecosystems",
      title: "Living together: plants, animals and ecosystems",
    },
    id: {
      routeSlug: "hidup-bersama-tumbuhan-hewan-dan-ekosistem",
      title: "Hidup bersama: tumbuhan, hewan, dan ekosistem",
    },
    ms: {
      routeSlug: "hidup-bersama-tumbuhan-haiwan-dan-ekosistem",
      title: "Hidup bersama: tumbuhan, haiwan dan ekosistem",
    },
  },
});
