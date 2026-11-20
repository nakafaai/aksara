import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/basic-chemistry-laws",
  domain: "chemistry",
  key: "lesson.chemistry.basic-chemistry-laws",
  kind: "lesson",
  routeSlugs: {
    en: "basic-chemistry-laws",
    id: "hukum-dasar-kimia",
    de: "grundgesetze-der-chemie",
    ms: "hukum-asas-kimia",
  },
  sections: [
    "chemical-reaction-characteristics",
    "chemistry-law-applications",
    "combining-volumes-law",
    "constant-composition-law",
    "mass-conservation-law",
    "multiple-proportions-law",
    "types-chemical-reaction",
    "writing-chemical-reactions",
  ],
  slug: "basic-chemistry-laws",
  translations: {
    en: {
      description: "Spot chemical changes from observable evidence.",
      title: "Basic Laws of Chemistry",
    },
    id: {
      description: "Kenali perubahan kimia dari bukti yang terlihat.",
      title: "Hukum Dasar Kimia",
    },
    de: {
      description: "Erkenne chemische Veränderungen an Beobachtungen.",
      title: "Grundgesetze der Chemie",
    },
    ms: {
      description: "Kenal pasti perubahan kimia melalui pemerhatian.",
      title: "Hukum Asas Kimia",
    },
  },
};

export default lesson;
