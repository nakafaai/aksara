import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyCellOrganisationMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/cell-organisation",
  domain: "biology",
  key: "lesson.biology.cell-organisation",
  kind: "lesson",
  routeSlugs: {
    de: "zelle-und-organisation",
    en: "cell-and-organisation",
    id: "sel-dan-organisasi",
    ms: "sel-dan-organisasi",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells",
        "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells",
        "https://openstax.org/books/biology-2e/pages/4-1-studying-cells",
        "https://openstax.org/books/concepts-biology/pages/3-1-how-cells-are-studied",
      ],
      routeSlugs: {
        de: "zellbau-und-spezialisierte-zellen",
        en: "cell-structure-and-specialised-cells",
        id: "struktur-sel-dan-sel-khusus",
        ms: "struktur-sel-dan-sel-khusus",
      },
      slug: "cell-structure",
    },
  ],
  slug: "cell-organisation",
  translations: {
    de: {
      description: "Erkenne Organellen und spezialisierte Zellen.",
      title: "Zelle und Organisation",
    },
    en: {
      description: "Identify organelles and specialised cells.",
      title: "Cells and Organisation",
    },
    id: {
      description: "Kenali organel dan sel khusus.",
      title: "Sel dan Organisasi Kehidupan",
    },
    ms: {
      description: "Kenal pasti organel dan sel khusus.",
      title: "Sel dan Organisasi Sel",
    },
  },
});
