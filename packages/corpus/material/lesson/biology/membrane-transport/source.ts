import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/membrane-transport",
  domain: "biology",
  key: "lesson.biology.membrane-transport",
  kind: "lesson",
  routeSlugs: {
    en: "membrane-transport",
    id: "transpor-membran",
    de: "stofftransport-durch-membranen",
    ms: "pengangkutan-merentas-membran",
  },
  sections: ["diffusion-osmosis"],
  slug: "membrane-transport",
  translations: {
    en: {
      description: "Tell diffusion, osmosis and active transport apart.",
      title: "Movement across Membranes",
    },
    id: {
      description: "Bedakan difusi, osmosis, dan transpor aktif.",
      title: "Transpor Zat Melintasi Membran",
    },
    de: {
      description: "Unterscheide Diffusion, Osmose und aktiven Transport.",
      title: "Stofftransport durch Membranen",
    },
    ms: {
      description: "Bezakan resapan, osmosis dan pengangkutan aktif.",
      title: "Pergerakan Bahan Merentas Membran",
    },
  },
};

export default lesson;
