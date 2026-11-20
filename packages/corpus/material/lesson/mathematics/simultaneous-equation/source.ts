import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/simultaneous-equation",
  domain: "mathematics",
  key: "lesson.mathematics.simultaneous-equation",
  kind: "lesson",
  routeSlugs: {
    en: "systems-of-equations",
    id: "sistem-persamaan",
    de: "gleichungssysteme",
    ms: "sistem-persamaan",
  },
  sections: ["linear-nonlinear-system"],
  slug: "simultaneous-equation",
  translations: {
    en: {
      description: "Solve three-variable and line-curve systems.",
      title: "Systems of Equations",
    },
    id: {
      description: "Selesaikan sistem tiga variabel dan garis-kurva.",
      title: "Sistem Persamaan",
    },
    de: {
      description: "Löse Systeme mit drei Variablen und Kurven.",
      title: "Gleichungssysteme",
    },
    ms: {
      description: "Selesaikan sistem tiga pemboleh ubah dan tak linear.",
      title: "Sistem Persamaan",
    },
  },
};

export default lesson;
