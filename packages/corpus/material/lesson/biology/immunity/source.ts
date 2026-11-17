import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/immunity",
  domain: "biology",
  key: "lesson.biology.immunity",
  kind: "lesson",
  routeSlugs: {
    de: "immunsystem",
    en: "immunity",
    id: "sistem-kekebalan",
    ms: "keimunan",
  },
  sections: ["body-defence"],
  slug: "immunity",
  translations: {
    de: {
      description: "Erkläre Abwehrlinien, Antikörper und Impfung.",
      title: "Das Immunsystem des Menschen",
    },
    en: {
      description: "Explain the lines of defence, antibodies and vaccines.",
      title: "Immunity in Humans",
    },
    id: {
      description: "Jelaskan lapis pertahanan, antibodi, dan vaksin.",
      title: "Sistem Kekebalan Tubuh",
    },
    ms: {
      description: "Terangkan barisan pertahanan, antibodi dan vaksin.",
      title: "Keimunan Manusia",
    },
  },
};

export default lesson;
