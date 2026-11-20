import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/gravitation",
  domain: "physics",
  key: "lesson.physics.gravitation",
  kind: "lesson",
  routeSlugs: {
    en: "gravitation",
    id: "gravitasi",
    de: "gravitation",
    ms: "kegravitian",
  },
  sections: ["universal-gravitation"],
  slug: "gravitation",
  translations: {
    en: {
      description: "Calculate gravity, satellite orbits and escape velocity.",
      title: "Gravitation",
    },
    id: {
      description: "Hitung gravitasi, orbit satelit, dan kecepatan lepas.",
      title: "Gravitasi",
    },
    de: {
      description: "Berechne Schwerkraft, Bahnen und Fluchtgeschwindigkeit.",
      title: "Gravitation",
    },
    ms: {
      description: "Kira daya graviti, orbit satelit dan halaju lepas.",
      title: "Kegravitian",
    },
  },
};

export default lesson;
