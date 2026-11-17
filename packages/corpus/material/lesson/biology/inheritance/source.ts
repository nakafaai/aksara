import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyInheritanceMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/inheritance",
  domain: "biology",
  key: "lesson.biology.inheritance",
  kind: "lesson",
  routeSlugs: {
    de: "vererbung",
    en: "inheritance",
    id: "pewarisan-sifat",
    ms: "pewarisan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/12-1-mendels-experiments-and-the-laws-of-probability",
        "https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits",
        "https://openstax.org/books/biology-2e/pages/12-3-laws-of-inheritance",
        "https://openstax.org/books/biology-2e/pages/13-1-chromosomal-theory-and-genetic-linkage",
        "https://openstax.org/books/biology-2e/pages/13-2-chromosomal-basis-of-inherited-disorders",
        "https://openstax.org/books/concepts-biology/pages/8-3-extensions-of-the-laws-of-inheritance",
        "https://medlineplus.gov/genetics/condition/color-vision-deficiency/",
        "https://medlineplus.gov/genetics/condition/hemophilia/",
        "https://medlineplus.gov/genetics/condition/beta-thalassemia/",
      ],
      routeSlugs: {
        de: "mendelsche-und-menschliche-vererbung",
        en: "mendelian-and-human-inheritance",
        id: "pewarisan-mendel-dan-manusia",
        ms: "pewarisan-mendel-dan-manusia",
      },
      slug: "mendelian-human",
    },
  ],
  slug: "inheritance",
  translations: {
    de: {
      description: "Rechne Erbgänge nach Mendel und beim Menschen.",
      title: "Vererbung",
    },
    en: {
      description: "Work out Mendel's crosses and human inheritance.",
      title: "Inheritance",
    },
    id: {
      description: "Hitung persilangan Mendel dan pewarisan pada manusia.",
      title: "Pewarisan Sifat",
    },
    ms: {
      description: "Selesaikan kacukan Mendel dan pewarisan manusia.",
      title: "Pewarisan",
    },
  },
});
