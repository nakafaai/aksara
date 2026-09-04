import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyBiodiversityMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/biodiversity",
  domain: "biology",
  key: "lesson.biology.biodiversity",
  kind: "lesson",
  routeSlugs: {
    de: "vielfalt-der-lebewesen",
    en: "biodiversity",
    id: "keanekaragaman-makhluk-hidup",
  },
  sections: [
    {
      evidenceUrls: [
        "https://irp.nih.gov/catalyst/21/6/the-human-microbiome-project",
      ],
      routeSlugs: { de: "bakterien", en: "bacteria", id: "bakteri" },
      slug: "bacteria",
    },
    {
      evidenceUrls: ["https://www.ncbi.nlm.nih.gov/taxonomy"],
      routeSlugs: {
        de: "klassifikation",
        en: "classification",
        id: "klasifikasi-makhluk-hidup",
      },
      slug: "classification",
    },
    {
      evidenceUrls: ["https://research.fs.usda.gov/treesearch/41353"],
      routeSlugs: { de: "pilze", en: "fungi", id: "fungi" },
      slug: "fungi",
    },
    {
      evidenceUrls: [
        "https://www.cbd.int/convention/articles?a=cbd-02",
        "https://doi.org/10.1111/brv.12683",
        "https://docs.gbif.org/course-introduction-to-gbif/en/primary-biodiversity-data.html",
      ],
      routeSlugs: {
        de: "ebenen-der-vielfalt",
        en: "levels",
        id: "keanekaragaman-hayati",
      },
      slug: "levels",
    },
    {
      evidenceUrls: ["https://www.fao.org/pollination/"],
      routeSlugs: {
        de: "lebewesen",
        en: "living-organisms",
        id: "makhluk-hidup-dalam-ekosistem",
      },
      slug: "living-organisms",
    },
  ],
  slug: "biodiversity",
  translations: {
    de: {
      description: "Untersuche Vielfalt, Ökosysteme, Bakterien und Pilze.",
      title: "Vielfalt der Lebewesen",
    },
    en: {
      description: "Connect bacterial shapes and parts to life roles.",
      title: "Biodiversity of Living Organisms",
    },
    id: {
      description: "Kenali bentuk bakteri dan perannya dalam hidup.",
      title: "Keanekaragaman Makhluk Hidup",
    },
  },
});
