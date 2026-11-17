import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/measurement",
  domain: "physics",
  key: "lesson.physics.measurement",
  kind: "lesson",
  routeSlugs: {
    en: "measurement",
    id: "pengukuran-dalam-kerja-ilmiah",
    de: "messen-im-naturwissenschaftlichen-arbeiten",
    ms: "pengukuran",
  },
  sections: [
    "dimension",
    "notation",
    "quantity",
    "significant-figures",
    "tools",
    "uncertainty",
    "unit",
  ],
  slug: "measurement",
  translations: {
    en: {
      description: "Use dimensions to check quantities and formulas.",
      title: "Measurement in Scientific Work",
    },
    id: {
      description: "Gunakan dimensi untuk mengecek besaran dan rumus.",
      title: "Pengukuran dalam Kerja Ilmiah",
    },
    de: {
      description: "Ordne Messgrößen, Einheiten und Unsicherheiten ein.",
      title: "Messen im naturwissenschaftlichen Arbeiten",
    },
    ms: {
      description: "Guna dimensi untuk menyemak kuantiti dan rumus.",
      title: "Pengukuran dalam Kerja Saintifik",
    },
  },
};

export default lesson;
