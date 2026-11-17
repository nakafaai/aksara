import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/light-optics",
  domain: "physics",
  key: "lesson.physics.light-optics",
  kind: "lesson",
  routeSlugs: {
    en: "light-and-optics",
    id: "cahaya-dan-optika",
    de: "licht-und-optik",
    ms: "cahaya-dan-optik",
  },
  sections: ["refraction-lens"],
  slug: "light-optics",
  translations: {
    en: {
      description: "Work out refraction, total reflection and lens images.",
      title: "Light and Optics",
    },
    id: {
      description: "Hitung pembiasan, pemantulan total, dan bayangan lensa.",
      title: "Cahaya dan Optika",
    },
    de: {
      description: "Berechne Brechung, Totalreflexion und Linsenbilder.",
      title: "Licht und Optik",
    },
    ms: {
      description: "Kira pembiasan, pantulan dalam penuh dan imej kanta.",
      title: "Cahaya dan Optik",
    },
  },
};

export default lesson;
