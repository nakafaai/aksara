import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsLightOpticsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/light-optics",
  domain: "physics",
  key: "lesson.physics.light-optics",
  kind: "lesson",
  routeSlugs: {
    de: "licht-und-optik",
    en: "light-and-optics",
    id: "cahaya-dan-optika",
    ms: "cahaya-dan-optik",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction",
        "https://openstax.org/books/university-physics-volume-3/pages/1-4-total-internal-reflection",
        "https://openstax.org/books/university-physics-volume-3/pages/2-4-thin-lenses",
      ],
      routeSlugs: {
        de: "brechung-totalreflexion-und-linsen",
        en: "refraction-total-internal-reflection-and-lenses",
        id: "pembiasan-pemantulan-total-dan-lensa",
        ms: "pembiasan-pantulan-dalam-penuh-dan-kanta",
      },
      slug: "refraction-lens",
    },
  ],
  slug: "light-optics",
  translations: {
    de: {
      description: "Berechne Brechung, Totalreflexion und Linsenbilder.",
      title: "Licht und Optik",
    },
    en: {
      description: "Work out refraction, total reflection and lens images.",
      title: "Light and Optics",
    },
    id: {
      description: "Hitung pembiasan, pemantulan total, dan bayangan lensa.",
      title: "Cahaya dan Optika",
    },
    ms: {
      description: "Kira pembiasan, pantulan dalam penuh dan imej kanta.",
      title: "Cahaya dan Optik",
    },
  },
});
