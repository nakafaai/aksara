import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/classification-system",
  domain: "biology",
  key: "lesson.biology.classification-system",
  kind: "lesson",
  routeSlugs: {
    de: "klassifikation-und-benennung",
    en: "classification-and-naming",
    id: "sistem-klasifikasi-dan-tata-nama",
    ms: "sistem-pengelasan-dan-penamaan",
  },
  sections: ["kingdoms-protists"],
  slug: "classification-system",
  translations: {
    de: {
      description: "Ordne Reiche, benenne Arten, bestimme Protisten.",
      title: "Klassifikation und Benennung",
    },
    en: {
      description: "Sort six kingdoms, name species and key out protists.",
      title: "Classification and Naming",
    },
    id: {
      description: "Kelompokkan enam kingdom dan namai spesies.",
      title: "Sistem Klasifikasi dan Tata Nama",
    },
    ms: {
      description: "Kelaskan enam alam, namakan spesies, kenal protista.",
      title: "Pengelasan dan Penamaan Organisma",
    },
  },
};

export default lesson;
