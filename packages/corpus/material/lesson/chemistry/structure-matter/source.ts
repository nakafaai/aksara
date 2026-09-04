import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryStructureMatterMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/structure-matter",
  domain: "chemistry",
  key: "lesson.chemistry.structure-matter",
  kind: "lesson",
  routeSlugs: { de: "atombau", en: "structure-matter", id: "struktur-atom" },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-1-early-ideas-in-atomic-theory",
        "https://plato.stanford.edu/entries/atomism-ancient/",
        "https://www.britannica.com/biography/Democritus",
      ],
      routeSlugs: {
        de: "antike-atomvorstellung",
        en: "ancient-atom-concept",
        id: "konsep-atom-zaman-yunani",
      },
      slug: "ancient-atom-concept",
    },
    {
      evidenceUrls: [
        "https://chem.libretexts.org/Courses/Barstow_Community_College/Survey_of_Chemistry_and_Physics/2%3A_Structure_of_Matter/3%3A_Atomic_Theory/2.4%3A_Atomic_Structure/2.3.5%3A_The_Bohr_Model_of_Atoms",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/3-2-the-bohr-model",
        "https://openstax.org/books/chemistry/pages/6-4-electronic-structure-of-atoms-electron-configurations",
      ],
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
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-3-atomic-structure-and-symbolism",
      ],
      routeSlugs: { de: "atomsymbol", en: "atom-symbol", id: "lambang-atom" },
      slug: "atom-symbol",
    },
    {
      evidenceUrls: [
        "https://physics.nist.gov/cuu/Constants/Table/allascii.txt",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/3-2-the-bohr-model",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/3-4-electronic-structure-of-atoms-electron-configurations",
      ],
      routeSlugs: {
        de: "elektronenkonfiguration",
        en: "electron-configuration",
        id: "konfigurasi-elektron",
      },
      slug: "electron-configuration",
    },
    {
      evidenceUrls: [
        "https://goldbook.iupac.org/terms/view/I03158",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-3-atomic-structure-and-symbolism",
      ],
      routeSlugs: { de: "ionen", en: "ion", id: "ion" },
      slug: "ion",
    },
    {
      evidenceUrls: [
        "https://goldbook.iupac.org/terms/view/I03331",
        "https://www.energy.gov/science/doe-explainsdeuterium-tritium-fusion-fuel",
        "https://news.uchicago.edu/explainer/what-is-carbon-14-dating",
        "https://www.physics.nist.gov/PhysRefData/Compositions/notes.html",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-3-atomic-structure-and-symbolism",
      ],
      routeSlugs: { de: "isotope", en: "isotope", id: "isotop" },
      slug: "isotope",
    },
    {
      evidenceUrls: [
        "https://iupac.org/what-we-do/periodic-table-of-elements/",
        "https://openstax.org/books/chemistry-atoms-first/pages/3-6-the-periodic-table",
      ],
      routeSlugs: {
        de: "modernes-periodensystem",
        en: "modern-periodic-table",
        id: "sistem-periodik-unsur-modern",
      },
      slug: "modern-periodic-table",
    },
    {
      evidenceUrls: [
        "https://goldbook.iupac.org/terms/view/E01977",
        "https://openstax.org/books/chemistry-atoms-first/pages/3-5-periodic-variations-in-element-properties",
      ],
      routeSlugs: {
        de: "periodische-eigenschaften",
        en: "periodic-properties",
        id: "sifat-keperiodikan-unsur",
      },
      slug: "periodic-properties",
    },
    {
      evidenceUrls: [
        "https://ciaaw.org/atomic-weights.htm",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-1-early-ideas-in-atomic-theory",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-2-evolution-of-atomic-theory",
        "https://www.britannica.com/biography/John-Dalton",
      ],
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
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-2-evolution-of-atomic-theory",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-3-atomic-structure-and-symbolism",
        "https://www.britannica.com/biography/J-J-Thomson",
      ],
      routeSlugs: {
        de: "subatomare-teilchen",
        en: "subatomic-particles",
        id: "partikel-subatom",
      },
      slug: "subatomic-particles",
    },
    {
      evidenceUrls: [
        "https://physics.nist.gov/cuu/pdf/wall_2022.pdf",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-3-atomic-structure-and-symbolism",
      ],
      routeSlugs: {
        de: "eigenschaften-subatomarer-teilchen",
        en: "subatomic-particles-properties",
        id: "sifat-partikel-subatom",
      },
      slug: "subatomic-particles-properties",
    },
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties",
        "https://openstax.org/books/chemistry/pages/6-4-electronic-structure-of-atoms-electron-configurations",
      ],
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
