import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/green-chemistry",
  domain: "chemistry",
  key: "lesson.chemistry.green-chemistry",
  kind: "lesson",
  routeSlugs: {
    en: "green-chemistry",
    id: "kimia-hijau",
    de: "gruene-chemie",
    ms: "kimia-hijau",
  },
  sections: [
    "chemical-processes-daily-life",
    "definition",
    "green-chemistry-activities",
    "principles",
  ],
  slug: "green-chemistry",
  translations: {
    en: {
      description: "Judge everyday reactions through green chemistry ideas.",
      title: "Green Chemistry",
    },
    id: {
      description: "Nilai reaksi sehari-hari dengan prinsip kimia hijau.",
      title: "Kimia Hijau",
    },
    de: {
      description: "Bewerte Alltagsreaktionen mit grüner Chemie.",
      title: "Grüne Chemie",
    },
    ms: {
      description: "Nilai tindak balas harian dengan prinsip kimia hijau.",
      title: "Kimia Hijau",
    },
  },
};

export default lesson;
