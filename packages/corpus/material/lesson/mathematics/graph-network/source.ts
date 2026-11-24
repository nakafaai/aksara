import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/graph-network",
  domain: "mathematics",
  key: "lesson.mathematics.graph-network",
  kind: "lesson",
  routeSlugs: {
    de: "netzwerke-und-graphen",
    en: "networks-and-graphs",
    id: "jaringan-dan-graf",
    ms: "rangkaian-dan-graf",
  },
  sections: ["network"],
  slug: "graph-network",
  translations: {
    de: {
      description: "Bestimme Grade, Bäume und kürzeste Wege.",
      title: "Netzwerke in der Graphentheorie",
    },
    en: {
      description: "Find degrees, trees and shortest paths.",
      title: "Network in Graph Theory",
    },
    id: {
      description: "Tentukan derajat, pohon, dan lintasan terpendek.",
      title: "Jaringan dalam Teori Graf",
    },
    ms: {
      description: "Tentukan darjah, pokok dan laluan terpendek.",
      title: "Rangkaian dalam Teori Graf",
    },
  },
};

export default lesson;
