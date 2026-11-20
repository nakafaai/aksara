import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
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
  sections: ["water-biomolecules"],
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
};

export default lesson;
