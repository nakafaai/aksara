import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/set-operation",
  domain: "mathematics",
  key: "lesson.mathematics.set-operation",
  kind: "lesson",
  routeSlugs: {
    de: "mengenoperationen",
    en: "operations-on-sets",
    id: "operasi-himpunan",
    ms: "operasi-set",
  },
  sections: ["venn"],
  slug: "set-operation",
  translations: {
    de: {
      description: "Bilde Schnitt und Vereinigung und zähle Elemente.",
      title: "Mengenoperationen",
    },
    en: {
      description: "Form intersections and unions and count elements.",
      title: "Operations on Sets",
    },
    id: {
      description: "Tentukan irisan, gabungan, dan banyak anggota.",
      title: "Operasi Himpunan",
    },
    ms: {
      description: "Tentukan persilangan, kesatuan dan bilangan unsur.",
      title: "Operasi Set",
    },
  },
};

export default lesson;
