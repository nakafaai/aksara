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
  sections: ["place-value"],
  slug: "number-base",
  translations: {
    de: {
      description: "Rechne zwischen Basen um und addiere darin.",
      title: "Zahlensysteme",
    },
    en: {
      description: "Convert between bases and add in them.",
      title: "Number Bases",
    },
    id: {
      description: "Ubah bilangan antarbasis dan jumlahkan.",
      title: "Basis Bilangan",
    },
    ms: {
      description: "Tukar nombor antara asas dan tambah dalamnya.",
      title: "Asas Nombor",
    },
  },
};

export default lesson;
