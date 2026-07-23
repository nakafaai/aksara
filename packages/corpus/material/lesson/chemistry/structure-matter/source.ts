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
      translations: {
        en: {
          title: "Ancient Greek Atomic Concept",
        },
        id: {
          title: "Konsep Atom Zaman Yunani",
        },
      },
    },
    {
      routeSlugs: { en: "atom-shell", id: "kulit-atom" },
      slug: "atom-shell",
      translations: {
        en: {
          title: "Atomic Shells",
        },
        id: {
          title: "Kulit Atom",
        },
      },
    },
    {
      routeSlugs: { en: "atom-symbol", id: "lambang-atom" },
      slug: "atom-symbol",
      translations: {
        en: {
          title: "Atomic Symbol",
        },
        id: {
          title: "Lambang Atom",
        },
      },
    },
    {
      routeSlugs: { en: "electron-configuration", id: "konfigurasi-elektron" },
      slug: "electron-configuration",
      translations: {
        en: {
          title: "Electron Configuration",
        },
        id: {
          title: "Konfigurasi Elektron",
        },
      },
    },
    {
      routeSlugs: { en: "ion", id: "ion" },
      slug: "ion",
      translations: {
        en: {
          title: "Ions",
        },
        id: {
          title: "Ion",
        },
      },
    },
    {
      routeSlugs: { en: "isotope", id: "isotop" },
      slug: "isotope",
      translations: {
        en: {
          title: "Isotopes",
        },
        id: {
          title: "Isotop",
        },
      },
    },
    {
      routeSlugs: {
        en: "modern-periodic-table",
        id: "sistem-periodik-unsur-modern",
      },
      slug: "modern-periodic-table",
      translations: {
        en: {
          title: "Modern Periodic Table",
        },
        id: {
          title: "Sistem Periodik Unsur Modern",
        },
      },
    },
    {
      routeSlugs: { en: "periodic-properties", id: "sifat-keperiodikan-unsur" },
      slug: "periodic-properties",
      translations: {
        en: {
          title: "Periodic Properties of Elements",
        },
        id: {
          title: "Sifat Keperiodikan Unsur",
        },
      },
    },
    {
      routeSlugs: {
        en: "reconceptualization-atom",
        id: "rekonseptualisasi-atom",
      },
      slug: "reconceptualization-atom",
      translations: {
        en: {
          title: "Atomic Reconceptualization",
        },
        id: {
          title: "Rekonseptualisasi Atom",
        },
      },
    },
    {
      routeSlugs: { en: "subatomic-particles", id: "partikel-subatom" },
      slug: "subatomic-particles",
      translations: {
        en: {
          title: "Subatomic Particles",
        },
        id: {
          title: "Partikel Subatom",
        },
      },
    },
    {
      routeSlugs: {
        en: "subatomic-particles-properties",
        id: "sifat-partikel-subatom",
      },
      slug: "subatomic-particles-properties",
      translations: {
        en: {
          title: "Subatomic Particle Properties",
        },
        id: {
          title: "Sifat Partikel Subatom",
        },
      },
    },
    {
      routeSlugs: { en: "valence-electron", id: "elektron-valensi" },
      slug: "valence-electron",
      translations: {
        en: {
          title: "Valence Electrons",
        },
        id: {
          title: "Elektron Valensi",
        },
      },
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
