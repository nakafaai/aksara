import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/linear-equation-inequality",
  domain: "mathematics",
  key: "lesson.mathematics.linear-equation-inequality",
  kind: "lesson",
  routeSlugs: {
    en: "linear-equation-inequality",
    id: "sistem-persamaan-dan-pertidaksamaan-linear",
    de: "lineare-gleichungs-und-ungleichungssysteme",
    ms: "sistem-persamaan-dan-ketaksamaan-linear",
  },
  sections: ["system-linear-equation", "system-linear-inequality"],
  slug: "linear-equation-inequality",
  translations: {
    en: {
      description: "Solve linear systems with substitution and elimination.",
      title: "Systems of Linear Equations and Inequalities",
    },
    id: {
      description: "Selesaikan sistem linear dengan dua cara utama.",
      title: "Sistem Persamaan dan Pertidaksamaan Linear",
    },
    de: {
      description: "Löse lineare Systeme durch Einsetzen und Addieren.",
      title: "Lineare Gleichungs- und Ungleichungssysteme",
    },
    ms: {
      description: "Selesaikan sistem linear dengan dua kaedah utama.",
      title: "Sistem Persamaan dan Ketaksamaan Linear",
    },
  },
};

export default lesson;
