import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/electromagnetism",
  domain: "physics",
  key: "lesson.physics.electromagnetism",
  kind: "lesson",
  routeSlugs: {
    en: "electromagnetism",
    id: "elektromagnetisme",
    de: "elektromagnetismus",
    ms: "keelektromagnetan",
  },
  sections: ["induction-transformer"],
  slug: "electromagnetism",
  translations: {
    en: {
      description: "Explain motors, generators and transformers.",
      title: "Electromagnetism",
    },
    id: {
      description: "Jelaskan motor, generator, dan transformator.",
      title: "Elektromagnetisme",
    },
    de: {
      description: "Erklär Motor, Generator und Transformator.",
      title: "Elektromagnetismus",
    },
    ms: {
      description: "Terangkan motor, penjana dan transformer.",
      title: "Keelektromagnetan",
    },
  },
};

export default lesson;
