import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsWavesMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/waves",
  domain: "physics",
  key: "lesson.physics.waves",
  kind: "lesson",
  routeSlugs: {
    de: "wellen",
    en: "waves",
    id: "gelombang",
    ms: "gelombang",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves",
        "https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations",
        "https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations",
        "https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference",
        "https://openstax.org/books/university-physics-volume-2/pages/16-5-the-electromagnetic-spectrum",
      ],
      routeSlugs: {
        de: "wellen-resonanz-und-interferenz",
        en: "wave-properties-resonance-and-interference",
        id: "sifat-gelombang-resonansi-dan-interferensi",
        ms: "sifat-gelombang-resonans-dan-interferens",
      },
      slug: "wave-properties",
    },
  ],
  slug: "waves",
  translations: {
    de: {
      description: "Beschreibe Wellen, Resonanz und Interferenz.",
      title: "Wellen",
    },
    en: {
      description: "Describe waves, resonance and interference.",
      title: "Waves",
    },
    id: {
      description: "Jelaskan gelombang, resonansi, dan interferensi.",
      title: "Gelombang",
    },
    ms: {
      description: "Huraikan gelombang, resonans dan interferens.",
      title: "Gelombang",
    },
  },
});
