import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyPlantTransportMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/plant-transport",
  domain: "biology",
  key: "lesson.biology.plant-transport",
  kind: "lesson",
  routeSlugs: {
    de: "transport-in-pflanzen",
    en: "transport-in-plants",
    id: "transportasi-pada-tumbuhan",
    ms: "pengangkutan-dalam-tumbuhan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/30-2-stems",
        "https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants",
        "https://bio.libretexts.org/Bookshelves/Botany/Botany_(Ha_Morrow_and_Algiers)/04%3A_Plant_Physiology_and_Regulation/4.05%3A_Transport/4.5.01%3A_Water_Transport/4.5.1.04%3A_Water_Absorption",
        "https://openstax.org/books/college-physics-2e/pages/11-8-cohesion-and-adhesion-in-liquids-surface-tension-and-capillary-action",
        "https://openstax.org/books/college-physics-2e/pages/11-4-variation-of-pressure-with-depth-in-a-fluid",
        "https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties",
        "https://doi.org/10.1007/s11270-022-05620-x",
      ],
      routeSlugs: {
        de: "xylem-phloem-und-translokation",
        en: "xylem-phloem-and-translocation",
        id: "xilem-floem-dan-translokasi",
        ms: "xilem-floem-dan-translokasi",
      },
      slug: "xylem-phloem",
    },
  ],
  slug: "plant-transport",
  translations: {
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
});
