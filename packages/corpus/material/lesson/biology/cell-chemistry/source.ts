import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyCellChemistryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/cell-chemistry",
  domain: "biology",
  key: "lesson.biology.cell-chemistry",
  kind: "lesson",
  routeSlugs: {
    de: "chemie-der-zelle",
    en: "cell-chemistry",
    id: "kimia-sel",
    ms: "kimia-sel",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/2-2-water",
        "https://openstax.org/books/biology-2e/pages/3-1-synthesis-of-biological-macromolecules",
        "https://openstax.org/books/biology-2e/pages/3-2-carbohydrates",
        "https://openstax.org/books/biology-2e/pages/3-3-lipids",
        "https://openstax.org/books/biology-2e/pages/3-4-proteins",
        "https://openstax.org/books/biology-2e/pages/3-5-nucleic-acids",
        "https://openstax.org/books/biology-2e/pages/14-2-dna-structure-and-sequencing",
        "https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics",
        "https://book.bionumbers.org/what-is-the-macromolecular-composition-of-the-cell/",
        "https://www.ensembl.org/Homo_sapiens/Transcript/Summary?t=ENST00000335295",
      ],
      routeSlugs: {
        de: "wasser-und-biomolekuele",
        en: "water-and-biomolecules",
        id: "air-dan-biomolekul",
        ms: "air-dan-biomolekul",
      },
      slug: "water-biomolecules",
    },
  ],
  slug: "cell-chemistry",
  translations: {
    de: {
      description: "Wasser, Kohlenhydrate, Proteine, Lipide, Nukleinsäuren.",
      title: "Chemie der Zelle",
    },
    en: {
      description: "Water, carbohydrates, proteins, lipids, nucleic acids.",
      title: "Cell Chemistry",
    },
    id: {
      description: "Air, karbohidrat, protein, lipid, dan asam nukleat.",
      title: "Kimia Sel",
    },
    ms: {
      description: "Air, karbohidrat, protein, lipid dan asid nukleik.",
      title: "Kimia Sel",
    },
  },
});
