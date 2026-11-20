import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/environmental-sustainability",
  domain: "biology",
  key: "lesson.biology.environmental-sustainability",
  kind: "lesson",
  routeSlugs: {
    de: "oekologische-nachhaltigkeit",
    en: "environmental-sustainability",
    id: "kelestarian-lingkungan",
    ms: "kelestarian-alam-sekitar",
  },
  sections: ["pollution-conservation"],
  slug: "environmental-sustainability",
  translations: {
    de: {
      description: "Miss Verschmutzung und vergleiche Wege zum Naturschutz.",
      title: "Ökologische Nachhaltigkeit",
    },
    en: {
      description: "Measure pollution and compare ways to protect nature.",
      title: "Environmental Sustainability",
    },
    id: {
      description: "Ukur pencemaran dan bandingkan cara melindungi alam.",
      title: "Kelestarian Lingkungan",
    },
    ms: {
      description: "Ukur pencemaran dan bandingkan cara melindungi alam.",
      title: "Kelestarian Alam Sekitar",
    },
  },
};

export default lesson;
