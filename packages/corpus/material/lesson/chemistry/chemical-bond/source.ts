import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryChemicalBondMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/chemical-bond",
  domain: "chemistry",
  key: "lesson.chemistry.chemical-bond",
  kind: "lesson",
  routeSlugs: {
    de: "chemische-bindung",
    en: "chemical-bond",
    id: "ikatan-kimia",
    ms: "ikatan-kimia",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/7-1-ionic-bonding",
        "https://openstax.org/books/chemistry-2e/pages/7-2-covalent-bonding",
        "https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces",
        "https://openstax.org/books/chemistry-2e/pages/10-5-the-solid-state-of-matter",
        "https://goldbook.iupac.org/terms/view/H02899",
      ],
      routeSlugs: {
        de: "bindungsarten",
        en: "types-of-chemical-bonds",
        id: "jenis-ikatan-kimia",
        ms: "jenis-ikatan-kimia",
      },
      slug: "bond-types",
    },
  ],
  slug: "chemical-bond",
  translations: {
    de: {
      description: "Erkenne, wie Atome Ionen, Moleküle und Metalle bilden.",
      title: "Chemische Bindung",
    },
    en: {
      description: "See how atoms form ions, molecules and metals.",
      title: "Chemical Bond",
    },
    id: {
      description: "Lihat cara atom membentuk ion, molekul, dan logam.",
      title: "Ikatan Kimia",
    },
    ms: {
      description: "Lihat cara atom membentuk ion, molekul dan logam.",
      title: "Ikatan Kimia",
    },
  },
});
