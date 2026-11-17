import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/linear-programming",
  domain: "mathematics",
  key: "lesson.mathematics.linear-programming",
  kind: "lesson",
  routeSlugs: {
    en: "linear-programming",
    id: "program-linear",
    de: "lineare-optimierung",
    ms: "pengaturcaraan-linear",
  },
  sections: ["feasible-region-optimisation"],
  slug: "linear-programming",
  translations: {
    en: {
      description: "Shade feasible regions and optimise at vertices.",
      title: "Linear Programming",
    },
    id: {
      description: "Arsir daerah penyelesaian dan uji titik pojok.",
      title: "Program Linear",
    },
    de: {
      description: "Schraffiere Bereiche und optimiere an den Ecken.",
      title: "Lineare Optimierung",
    },
    ms: {
      description: "Lorek rantau tersaur dan uji nilai pada bucu.",
      title: "Pengaturcaraan Linear",
    },
  },
};

export default lesson;
