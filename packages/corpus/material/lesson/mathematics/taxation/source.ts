import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/taxation",
  domain: "mathematics",
  key: "lesson.mathematics.taxation",
  kind: "lesson",
  routeSlugs: {
    de: "steuern",
    en: "taxation",
    id: "perpajakan",
    ms: "percukaian",
  },
  sections: ["income-tax"],
  slug: "taxation",
  translations: {
    de: {
      description: "Berechne progressive Einkommensteuer.",
      title: "Steuern",
    },
    en: {
      description: "Work out progressive income tax.",
      title: "Taxation",
    },
    id: {
      description: "Hitung pajak penghasilan progresif.",
      title: "Perpajakan",
    },
    ms: {
      description: "Kira cukai pendapatan berperingkat.",
      title: "Percukaian",
    },
  },
};

export default lesson;
