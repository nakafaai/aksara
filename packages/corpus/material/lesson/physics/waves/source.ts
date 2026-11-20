import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/waves",
  domain: "physics",
  key: "lesson.physics.waves",
  kind: "lesson",
  routeSlugs: {
    en: "waves",
    id: "gelombang",
    de: "wellen",
    ms: "gelombang",
  },
  sections: ["wave-properties"],
  slug: "waves",
  translations: {
    en: {
      description: "Describe waves, resonance and interference.",
      title: "Waves",
    },
    id: {
      description: "Jelaskan gelombang, resonansi, dan interferensi.",
      title: "Gelombang",
    },
    de: {
      description: "Beschreibe Wellen, Resonanz und Interferenz.",
      title: "Wellen",
    },
    ms: {
      description: "Huraikan gelombang, resonans dan interferens.",
      title: "Gelombang",
    },
  },
};

export default lesson;
