import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/number-base",
  domain: "mathematics",
  key: "lesson.mathematics.number-base",
  kind: "lesson",
  routeSlugs: {
    de: "zahlensysteme",
    en: "number-bases",
    id: "basis-bilangan",
    ms: "asas-nombor",
  },
  sections: ["place-value", "conversion", "operations"],
  slug: "number-base",
  translations: {
    de: {
      description: "Lies Stellenwerte, rechne um, addiere und subtrahiere.",
      title: "Zahlensysteme",
    },
    en: {
      description: "Read place value, convert bases, add and subtract.",
      title: "Number Bases",
    },
    id: {
      description: "Baca nilai tempat, ubah basis, jumlahkan, dan kurangkan.",
      title: "Basis Bilangan",
    },
    ms: {
      description: "Baca nilai tempat, tukar asas, tambah dan tolak.",
      title: "Asas Nombor",
    },
  },
};

export default lesson;
