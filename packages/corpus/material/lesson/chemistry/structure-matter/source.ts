import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryStructureMatterMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/structure-matter",
  domain: "chemistry",
  key: "lesson.chemistry.structure-matter",
  kind: "lesson",
  routeSlugs: { de: "atombau", en: "structure-matter", id: "struktur-atom" },
  sections: [
    {
      routeSlugs: {
        de: "antike-atomvorstellung",
        en: "ancient-atom-concept",
        id: "konsep-atom-zaman-yunani",
      },
      slug: "ancient-atom-concept",
    },
    {
      routeSlugs: {
        de: "elektronenhuelle",
        en: "atom-shell",
        id: "kulit-atom",
      },
      slug: "atom-shell",
    },
    {
      routeSlugs: { de: "atomsymbol", en: "atom-symbol", id: "lambang-atom" },
      slug: "atom-symbol",
    },
    {
      routeSlugs: {
        de: "elektronenkonfiguration",
        en: "electron-configuration",
        id: "konfigurasi-elektron",
      },
      slug: "electron-configuration",
    },
    {
      routeSlugs: { de: "ionen", en: "ion", id: "ion" },
      slug: "ion",
    },
    {
      routeSlugs: { de: "isotope", en: "isotope", id: "isotop" },
      slug: "isotope",
    },
    {
      routeSlugs: {
        de: "modernes-periodensystem",
        en: "modern-periodic-table",
        id: "sistem-periodik-unsur-modern",
      },
      slug: "modern-periodic-table",
    },
    {
      routeSlugs: {
        de: "periodische-eigenschaften",
        en: "periodic-properties",
        id: "sifat-keperiodikan-unsur",
      },
      slug: "periodic-properties",
    },
    {
      routeSlugs: {
        de: "entwicklung-des-atommodells",
        en: "reconceptualization-atom",
        id: "rekonseptualisasi-atom",
      },
      slug: "reconceptualization-atom",
    },
    {
      routeSlugs: {
        de: "subatomare-teilchen",
        en: "subatomic-particles",
        id: "partikel-subatom",
      },
      slug: "subatomic-particles",
    },
    {
      routeSlugs: {
        de: "eigenschaften-subatomarer-teilchen",
        en: "subatomic-particles-properties",
        id: "sifat-partikel-subatom",
      },
      slug: "subatomic-particles-properties",
    },
    {
      routeSlugs: {
        de: "valenzelektronen",
        en: "valence-electron",
        id: "elektron-valensi",
      },
      slug: "valence-electron",
    },
  ],
  slug: "structure-matter",
  translations: {
    de: {
      description: "Erkenne, wie Atommodelle unsichtbare Stoffe erklären.",
      title: "Atombau",
    },
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
