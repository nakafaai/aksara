import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/triangle-solution",
  domain: "mathematics",
  key: "lesson.mathematics.triangle-solution",
  kind: "lesson",
  routeSlugs: {
    en: "solution-of-triangles",
    id: "penyelesaian-segitiga",
    de: "dreiecksberechnung",
    ms: "penyelesaian-segi-tiga",
  },
  sections: ["sine-cosine-area"],
  slug: "triangle-solution",
  translations: {
    en: {
      description: "Use the sine rule, cosine rule and area formulas.",
      title: "Solution of Triangles",
    },
    id: {
      description: "Pakai aturan sinus, kosinus, dan rumus luas.",
      title: "Penyelesaian Segitiga",
    },
    de: {
      description: "Nutze Sinussatz, Kosinussatz und Flächenformeln.",
      title: "Dreiecksberechnung",
    },
    ms: {
      description: "Guna petua sinus, petua kosinus dan rumus luas.",
      title: "Penyelesaian Segi Tiga",
    },
  },
};

export default lesson;
