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
        "https://openstax.org/books/biology-2e/pages/22-2-structure-of-prokaryotes-bacteria-and-archaea",
      ],
      routeSlugs: { de: "bakterien", en: "bacteria", id: "bakteri" },
      slug: "bacteria",
    },
    {
      evidenceUrls: [
        "https://www.ncbi.nlm.nih.gov/taxonomy",
        "https://openstax.org/books/biology-2e/pages/20-1-organizing-life-on-earth",
      ],
      routeSlugs: {
        de: "klassifikation",
        en: "classification",
        id: "klasifikasi-makhluk-hidup",
      },
      slug: "classification",
    },
    {
      evidenceUrls: [
        "https://research.fs.usda.gov/treesearch/41353",
        "https://openstax.org/books/biology-2e/pages/24-1-characteristics-of-fungi",
      ],
      routeSlugs: { de: "pilze", en: "fungi", id: "fungi" },
      slug: "fungi",
    },
    {
      evidenceUrls: [
        "https://www.cbd.int/convention/articles?a=cbd-02",
        "https://doi.org/10.1111/brv.12683",
        "https://docs.gbif.org/course-introduction-to-gbif/en/primary-biodiversity-data.html",
        "https://openstax.org/books/biology-2e/pages/45-6-community-ecology",
        "https://openstax.org/books/biology-2e/pages/47-1-the-biodiversity-crisis",
      ],
      routeSlugs: {
        de: "ebenen-der-vielfalt",
        en: "levels",
        id: "keanekaragaman-hayati",
      },
      slug: "levels",
    },
    {
      evidenceUrls: [
        "https://www.fao.org/pollination/",
        "https://openstax.org/books/biology-2e/pages/46-1-ecology-of-ecosystems",
      ],
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
