import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryMoleConceptMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/mole-concept",
  domain: "chemistry",
  key: "lesson.chemistry.mole-concept",
  kind: "lesson",
  routeSlugs: {
    de: "stoffmenge-und-mol",
    en: "mole-concept",
    id: "konsep-mol",
    ms: "konsep-mol",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept",
        "https://openstax.org/books/chemistry-2e/pages/3-2-determining-empirical-and-molecular-formulas",
        "https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry",
        "https://openstax.org/books/chemistry-2e/pages/9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions",
        "https://ciaaw.org/atomic-weights.htm",
      ],
      routeSlugs: {
        de: "stoffmenge-masse-und-gasvolumen",
        en: "moles-mass-and-gas-volume",
        id: "mol-massa-dan-volume-gas",
        ms: "mol-jisim-dan-isi-padu-gas",
      },
      slug: "mole-calculation",
    },
  ],
  slug: "mole-concept",
  translations: {
    de: {
      description: "Rechne mit Stoffmenge, molarer Masse und Gasvolumen.",
      title: "Stoffmenge und Mol",
    },
    en: {
      description: "Convert between moles, mass, particles and gas volume.",
      title: "The Mole Concept",
    },
    id: {
      description: "Ubah mol menjadi massa, partikel, dan volume gas.",
      title: "Konsep Mol",
    },
    ms: {
      description: "Tukar mol kepada jisim, zarah dan isi padu gas.",
      title: "Konsep Mol",
    },
  },
});
