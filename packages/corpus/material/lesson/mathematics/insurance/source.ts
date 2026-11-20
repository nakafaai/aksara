import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/insurance",
  domain: "mathematics",
  key: "lesson.mathematics.insurance",
  kind: "lesson",
  routeSlugs: {
    de: "versicherung",
    en: "insurance",
    id: "asuransi",
    ms: "insurans",
  },
  sections: ["premium"],
  slug: "insurance",
  translations: {
    de: {
      description: "Berechne Prämien, Selbstbehalt und Entschädigung.",
      title: "Versicherung",
    },
    en: {
      description: "Work out premiums, deductibles and compensation.",
      title: "Insurance",
    },
    id: {
      description: "Hitung premi, risiko sendiri, dan ganti rugi.",
      title: "Asuransi",
    },
    ms: {
      description: "Kira premium, deduktibel dan pampasan.",
      title: "Insurans",
    },
  },
};

export default lesson;
