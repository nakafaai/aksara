import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/structure-matter",
  domain: "chemistry",
  key: "lesson.chemistry.structure-matter",
  kind: "lesson",
  routeSlugs: {
    en: "structure-matter",
    id: "struktur-atom",
    de: "atombau",
    ms: "struktur-atom",
  },
  sections: [
    "ancient-atom-concept",
    "atom-shell",
    "atom-symbol",
    "electron-configuration",
    "ion",
    "isotope",
    "modern-periodic-table",
    "periodic-properties",
    "reconceptualization-atom",
    "subatomic-particles",
    "subatomic-particles-properties",
    "valence-electron",
  ],
  slug: "structure-matter",
  translations: {
    en: {
      description: "See why atomic ideas explain matter beyond sight.",
      title: "Atomic Structure",
    },
    id: {
      description: "Lihat cara atom menjelaskan materi tak kasatmata.",
      title: "Struktur Atom",
    },
    de: {
      description: "Erkenne, wie Atommodelle unsichtbare Stoffe erklären.",
      title: "Atombau",
    },
    ms: {
      description: "Lihat cara model atom menerangkan jirim.",
      title: "Struktur Atom",
    },
  },
};

export default lesson;
