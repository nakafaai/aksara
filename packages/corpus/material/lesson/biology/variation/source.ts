import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyVariationMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/variation",
  domain: "biology",
  key: "lesson.biology.variation",
  kind: "lesson",
  routeSlugs: {
    de: "variation",
    en: "variation",
    id: "variasi",
    ms: "variasi",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis",
        "https://openstax.org/books/biology-2e/pages/11-2-sexual-reproduction",
        "https://openstax.org/books/biology-2e/pages/12-3-laws-of-inheritance",
        "https://openstax.org/books/biology-2e/pages/13-2-chromosomal-basis-of-inherited-disorders",
        "https://openstax.org/books/biology-2e/pages/14-6-dna-repair",
        "https://openstax.org/books/biology-2e/pages/19-1-population-evolution",
        "https://openstax.org/books/biology-2e/pages/19-2-population-genetics",
        "https://medlineplus.gov/genetics/condition/sickle-cell-disease/",
        "https://medlineplus.gov/genetics/gene/hbb/",
        "https://www.ncbi.nlm.nih.gov/nuccore/NM_000518.5",
        "https://medlineplus.gov/genetics/condition/down-syndrome/",
        "https://medlineplus.gov/genetics/condition/turner-syndrome/",
        "https://medlineplus.gov/genetics/condition/klinefelter-syndrome/",
        "https://medlineplus.gov/genetics/condition/oculocutaneous-albinism/",
      ],
      routeSlugs: {
        de: "variationsformen-und-mutationen",
        en: "types-of-variation-and-mutation",
        id: "jenis-variasi-dan-mutasi",
        ms: "jenis-variasi-dan-mutasi",
      },
      slug: "types-mutation",
    },
  ],
  slug: "variation",
  translations: {
    de: {
      description: "Unterscheide Variationsformen und erkläre Mutationen.",
      title: "Variation",
    },
    en: {
      description: "Tell variation types apart and explain mutations.",
      title: "Variation",
    },
    id: {
      description: "Bedakan jenis variasi dan jelaskan mutasi.",
      title: "Variasi",
    },
    ms: {
      description: "Bezakan jenis variasi dan terangkan mutasi.",
      title: "Variasi",
    },
  },
});
