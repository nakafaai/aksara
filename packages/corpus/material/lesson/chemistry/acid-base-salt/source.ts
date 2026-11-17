import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/acid-base-salt",
  domain: "chemistry",
  key: "lesson.chemistry.acid-base-salt",
  kind: "lesson",
  routeSlugs: {
    en: "acid-base-and-salt",
    id: "asam-basa-dan-garam",
    de: "saeuren-basen-und-salze",
    ms: "asid-bes-dan-garam",
  },
  sections: ["acid-alkali"],
  slug: "acid-base-salt",
  translations: {
    en: {
      description: "Measure pH, run titrations and prepare salts.",
      title: "Acid, Base and Salt",
    },
    id: {
      description: "Ukur pH, lakukan titrasi, dan buat garam.",
      title: "Asam, Basa, dan Garam",
    },
    de: {
      description: "Miss den pH-Wert, titriere und stelle Salze her.",
      title: "Säuren, Basen und Salze",
    },
    ms: {
      description: "Ukur pH, jalankan pentitratan dan sediakan garam.",
      title: "Asid, Bes dan Garam",
    },
  },
};

export default lesson;
