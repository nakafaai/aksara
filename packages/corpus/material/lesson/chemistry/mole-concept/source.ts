import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/mole-concept",
  domain: "chemistry",
  key: "lesson.chemistry.mole-concept",
  kind: "lesson",
  routeSlugs: {
    en: "mole-concept",
    id: "konsep-mol",
    de: "stoffmenge-und-mol",
    ms: "konsep-mol",
  },
  sections: ["mole-calculation"],
  slug: "mole-concept",
  translations: {
    en: {
      description: "Convert between moles, mass, particles and gas volume.",
      title: "The Mole Concept",
    },
    id: {
      description: "Ubah mol menjadi massa, partikel, dan volume gas.",
      title: "Konsep Mol",
    },
    de: {
      description: "Rechne mit Stoffmenge, molarer Masse und Gasvolumen.",
      title: "Stoffmenge und Mol",
    },
    ms: {
      description: "Tukar mol kepada jisim, zarah dan isi padu gas.",
      title: "Konsep Mol",
    },
  },
};

export default lesson;
