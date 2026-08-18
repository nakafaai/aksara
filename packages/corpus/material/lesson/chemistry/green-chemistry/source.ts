import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryGreenChemistryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/green-chemistry",
  domain: "chemistry",
  key: "lesson.chemistry.green-chemistry",
  kind: "lesson",
  routeSlugs: { en: "green-chemistry", id: "kimia-hijau" },
  sections: [
    {
      routeSlugs: {
        en: "chemical-processes-daily-life",
        id: "proses-kimia-sehari-hari",
      },
      slug: "chemical-processes-daily-life",
    },
    {
      routeSlugs: { en: "definition", id: "pengertian-kimia-hijau" },
      slug: "definition",
    },
    {
      routeSlugs: {
        en: "green-chemistry-activities",
        id: "kegiatan-kimia-hijau",
      },
      slug: "green-chemistry-activities",
    },
    {
      routeSlugs: { en: "principles", id: "prinsip-kimia-hijau" },
      slug: "principles",
    },
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
  },
});
