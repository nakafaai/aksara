import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyMembraneTransportMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/membrane-transport",
  domain: "biology",
  key: "lesson.biology.membrane-transport",
  kind: "lesson",
  routeSlugs: {
    de: "stofftransport-durch-membranen",
    en: "membrane-transport",
    id: "transpor-membran",
    ms: "pengangkutan-merentas-membran",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/5-1-components-and-structure",
        "https://openstax.org/books/biology-2e/pages/5-2-passive-transport",
        "https://openstax.org/books/biology-2e/pages/5-3-active-transport",
        "https://openstax.org/books/concepts-biology/pages/3-5-passive-transport",
      ],
      routeSlugs: {
        de: "diffusion-osmose-und-aktiver-transport",
        en: "diffusion-osmosis-and-active-transport",
        id: "difusi-osmosis-dan-transpor-aktif",
        ms: "resapan-osmosis-dan-pengangkutan-aktif",
      },
      slug: "diffusion-osmosis",
    },
  ],
  slug: "membrane-transport",
  translations: {
    de: {
      description: "Unterscheide Diffusion, Osmose und aktiven Transport.",
      title: "Stofftransport durch Membranen",
    },
    en: {
      description: "Tell diffusion, osmosis and active transport apart.",
      title: "Movement across Membranes",
    },
    id: {
      description: "Bedakan difusi, osmosis, dan transpor aktif.",
      title: "Transpor Zat Melintasi Membran",
    },
    ms: {
      description: "Bezakan resapan, osmosis dan pengangkutan aktif.",
      title: "Pergerakan Bahan Merentas Membran",
    },
  },
});
