import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/nuclear-physics",
  domain: "physics",
  key: "lesson.physics.nuclear-physics",
  kind: "lesson",
  routeSlugs: {
    en: "nuclear-physics",
    id: "fisika-inti",
    de: "kernphysik",
    ms: "fizik-nuklear",
  },
  sections: ["radioactive-decay"],
  slug: "nuclear-physics",
  translations: {
    en: {
      description: "Write decay equations and calculate nuclear energy.",
      title: "Nuclear Physics",
    },
    id: {
      description: "Tulis persamaan peluruhan dan hitung energi nuklir.",
      title: "Fisika Inti",
    },
    de: {
      description: "Stell Zerfallsgleichungen auf und berechne Kernenergie.",
      title: "Kernphysik",
    },
    ms: {
      description: "Tulis persamaan reputan dan kira tenaga nuklear.",
      title: "Fizik Nuklear",
    },
  },
};

export default lesson;
