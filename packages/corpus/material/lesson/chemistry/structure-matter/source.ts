import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryStructureMatterMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/structure-matter",
  domain: "chemistry",
  key: "lesson.chemistry.structure-matter",
  kind: "lesson",
  routeSlugs: { en: "structure-matter", id: "struktur-atom" },
  sections: [
    {
      routeSlugs: {
        en: "ancient-atom-concept",
        id: "konsep-atom-zaman-yunani",
      },
      slug: "ancient-atom-concept",
    },
    {
      routeSlugs: { en: "atom-shell", id: "kulit-atom" },
      slug: "atom-shell",
    },
    {
      routeSlugs: { en: "atom-symbol", id: "lambang-atom" },
      slug: "atom-symbol",
    },
    {
      routeSlugs: { en: "electron-configuration", id: "konfigurasi-elektron" },
      slug: "electron-configuration",
    },
    {
      routeSlugs: { en: "ion", id: "ion" },
      slug: "ion",
    },
    {
      routeSlugs: { en: "isotope", id: "isotop" },
      slug: "isotope",
    },
    {
      routeSlugs: {
        en: "modern-periodic-table",
        id: "sistem-periodik-unsur-modern",
      },
      slug: "modern-periodic-table",
    },
    {
      routeSlugs: { en: "periodic-properties", id: "sifat-keperiodikan-unsur" },
      slug: "periodic-properties",
    },
    {
      routeSlugs: {
        en: "reconceptualization-atom",
        id: "rekonseptualisasi-atom",
      },
      slug: "reconceptualization-atom",
    },
    {
      routeSlugs: { en: "subatomic-particles", id: "partikel-subatom" },
      slug: "subatomic-particles",
    },
    {
      routeSlugs: {
        en: "subatomic-particles-properties",
        id: "sifat-partikel-subatom",
      },
      slug: "subatomic-particles-properties",
    },
    {
      routeSlugs: { en: "valence-electron", id: "elektron-valensi" },
      slug: "valence-electron",
    },
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
  },
});
