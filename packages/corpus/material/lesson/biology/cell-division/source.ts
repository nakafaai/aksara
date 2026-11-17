import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyCellDivisionMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/cell-division",
  domain: "biology",
  key: "lesson.biology.cell-division",
  kind: "lesson",
  routeSlugs: {
    de: "zellteilung",
    en: "cell-division",
    id: "pembelahan-sel",
    ms: "pembahagian-sel",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/10-1-cell-division",
        "https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle",
        "https://openstax.org/books/biology-2e/pages/10-4-cancer-and-the-cell-cycle",
        "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis",
        "https://openstax.org/books/biology-2e/pages/13-2-chromosomal-basis-of-inherited-disorders",
        "https://www.ncbi.nlm.nih.gov/books/NBK26869/",
        "https://bsi.gov.in/uploads/userfiles/file/Chromosome%20Database/Species%20data/Angiosperms/Allium%20cepa.pdf",
      ],
      routeSlugs: {
        de: "mitose-und-meiose",
        en: "mitosis-and-meiosis",
        id: "mitosis-dan-meiosis",
        ms: "mitosis-dan-meiosis",
      },
      slug: "mitosis-meiosis",
    },
  ],
  slug: "cell-division",
  translations: {
    de: {
      description: "Vergleiche Mitose und Meiose im Zellzyklus.",
      title: "Zellteilung",
    },
    en: {
      description: "Compare mitosis and meiosis and follow the cell cycle.",
      title: "Cell Division",
    },
    id: {
      description: "Bandingkan mitosis dan meiosis serta ikuti siklus sel.",
      title: "Pembelahan Sel",
    },
    ms: {
      description: "Bandingkan mitosis dan meiosis serta ikuti kitar sel.",
      title: "Pembahagian Sel",
    },
  },
});
