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
      evidenceUrls: [
        "https://www.physics.nist.gov/PhysRefData/Compositions/notes.html",
        "https://iupac.org/what-we-do/periodic-table-of-elements/",
      ],
      routeSlugs: { de: "atomsymbol", en: "atom-symbol", id: "lambang-atom" },
      slug: "atom-symbol",
    },
    {
      evidenceUrls: [
        "https://physics.nist.gov/cuu/Constants/Table/allascii.txt",
      ],
      routeSlugs: {
        de: "elektronenkonfiguration",
        en: "electron-configuration",
        id: "konfigurasi-elektron",
      },
      slug: "electron-configuration",
    },
    {
      evidenceUrls: ["https://goldbook.iupac.org/terms/view/I03158"],
      routeSlugs: { de: "ionen", en: "ion", id: "ion" },
      slug: "ion",
    },
    {
      evidenceUrls: [
        "https://goldbook.iupac.org/terms/view/I03331",
        "https://www.energy.gov/science/doe-explainsdeuterium-tritium-fusion-fuel",
        "https://news.uchicago.edu/explainer/what-is-carbon-14-dating",
        "https://www.physics.nist.gov/PhysRefData/Compositions/notes.html",
      ],
      routeSlugs: { de: "isotope", en: "isotope", id: "isotop" },
      slug: "isotope",
    },
    {
      evidenceUrls: [
        "https://iupac.org/what-we-do/periodic-table-of-elements/",
      ],
      routeSlugs: {
        de: "modernes-periodensystem",
        en: "modern-periodic-table",
        id: "sistem-periodik-unsur-modern",
      },
      slug: "modern-periodic-table",
    },
    {
      evidenceUrls: ["https://goldbook.iupac.org/terms/view/E01977"],
      routeSlugs: {
        de: "periodische-eigenschaften",
        en: "periodic-properties",
        id: "sifat-keperiodikan-unsur",
      },
      slug: "periodic-properties",
    },
    {
      evidenceUrls: ["https://ciaaw.org/atomic-weights.htm"],
      routeSlugs: {
        de: "entwicklung-des-atommodells",
        en: "reconceptualization-atom",
        id: "rekonseptualisasi-atom",
      },
      slug: "reconceptualization-atom",
    },
    {
      evidenceUrls: [
        "https://history.aip.org/exhibits/rutherford/sections/alpha-particles-atom.html",
        "https://www.nobelprize.org/prizes/physics/1990/9592-the-nobel-prize-in-physics-1990/",
        "https://www.nobelprize.org/prizes/physics/1935/chadwick/facts/",
      ],
      routeSlugs: {
        de: "subatomare-teilchen",
        en: "subatomic-particles",
        id: "partikel-subatom",
      },
      slug: "subatomic-particles",
    },
    {
      evidenceUrls: ["https://physics.nist.gov/cuu/pdf/wall_2022.pdf"],
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
