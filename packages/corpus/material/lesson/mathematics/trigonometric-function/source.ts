import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/trigonometric-function",
  domain: "mathematics",
  key: "lesson.mathematics.trigonometric-function",
  kind: "lesson",
  routeSlugs: {
    en: "trigonometric-functions",
    id: "fungsi-trigonometri",
    de: "trigonometrische-funktionen",
    ms: "fungsi-trigonometri",
  },
  sections: ["any-angle-graph-identity"],
  slug: "trigonometric-function",
  translations: {
    en: {
      description: "Values, graphs, identities and equations.",
      title: "Trigonometric Functions",
    },
    id: {
      description: "Nilai, grafik, identitas, dan persamaan.",
      title: "Fungsi Trigonometri",
    },
    de: {
      description: "Werte, Graphen, Identitäten und Gleichungen.",
      title: "Trigonometrische Funktionen",
    },
    ms: {
      description: "Nilai, graf, identiti dan persamaan trigonometri.",
      title: "Fungsi Trigonometri",
    },
  },
};

export default lesson;
