import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/linear-law",
  domain: "mathematics",
  key: "lesson.mathematics.linear-law",
  kind: "lesson",
  routeSlugs: {
    en: "linear-law",
    id: "hukum-linear",
    de: "linearisierung",
    ms: "hukum-linear",
  },
  sections: ["best-fit-transformation"],
  slug: "linear-law",
  translations: {
    en: {
      description: "Draw best-fit lines and straighten curves.",
      title: "Linear Law",
    },
    id: {
      description: "Gambar garis paling cocok dan luruskan kurva.",
      title: "Hukum Linear",
    },
    de: {
      description: "Zeichne Ausgleichsgeraden und linearisiere Kurven.",
      title: "Linearisierung",
    },
    ms: {
      description: "Lukis garis penyuaian terbaik dan luruskan lengkung.",
      title: "Hukum Linear",
    },
  },
};

export default lesson;
