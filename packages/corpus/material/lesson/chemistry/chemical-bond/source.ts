import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/chemical-bond",
  domain: "chemistry",
  key: "lesson.chemistry.chemical-bond",
  kind: "lesson",
  routeSlugs: {
    en: "chemical-bond",
    id: "ikatan-kimia",
    de: "chemische-bindung",
    ms: "ikatan-kimia",
  },
  sections: ["bond-types"],
  slug: "chemical-bond",
  translations: {
    en: {
      description: "See how atoms form ions, molecules and metals.",
      title: "Chemical Bond",
    },
    id: {
      description: "Lihat cara atom membentuk ion, molekul, dan logam.",
      title: "Ikatan Kimia",
    },
    de: {
      description: "Erkenne, wie Atome Ionen, Moleküle und Metalle bilden.",
      title: "Chemische Bindung",
    },
    ms: {
      description: "Lihat cara atom membentuk ion, molekul dan logam.",
      title: "Ikatan Kimia",
    },
  },
};

export default lesson;
