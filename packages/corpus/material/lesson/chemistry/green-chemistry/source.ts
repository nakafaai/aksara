import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryGreenChemistryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/green-chemistry",
  domain: "chemistry",
  key: "lesson.chemistry.green-chemistry",
  kind: "lesson",
  routeSlugs: { de: "gruene-chemie", en: "green-chemistry", id: "kimia-hijau" },
  sections: [
    {
      routeSlugs: {
        de: "chemische-prozesse-im-alltag",
        en: "chemical-processes-daily-life",
        id: "proses-kimia-sehari-hari",
      },
      slug: "chemical-processes-daily-life",
    },
    {
      routeSlugs: {
        de: "definition",
        en: "definition",
        id: "pengertian-kimia-hijau",
      },
      slug: "definition",
    },
    {
      routeSlugs: {
        de: "massnahmen-der-gruenen-chemie",
        en: "green-chemistry-activities",
        id: "kegiatan-kimia-hijau",
      },
      slug: "green-chemistry-activities",
    },
    {
      routeSlugs: {
        de: "prinzipien",
        en: "principles",
        id: "prinsip-kimia-hijau",
      },
      slug: "principles",
    },
  ],
  slug: "green-chemistry",
  translations: {
    de: {
      description: "Bewerte Alltagsreaktionen mit grüner Chemie.",
      title: "Grüne Chemie",
    },
    en: {
      description: "Judge everyday reactions through green chemistry ideas.",
      title: "Green Chemistry",
    },
    id: {
      description: "Nilai reaksi sehari-hari dengan prinsip kimia hijau.",
      title: "Kimia Hijau",
    },
  },
});
