import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyPlantResponseMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/plant-response",
  domain: "biology",
  key: "lesson.biology.plant-response",
  kind: "lesson",
  routeSlugs: {
    de: "reaktionen-der-pflanzen",
    en: "response-in-plants",
    id: "respons-tumbuhan",
    ms: "gerak-balas-tumbuhan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/30-6-plant-sensory-systems-and-responses",
        "https://openstax.org/books/concepts-biology/pages/14-4-seed-plants-angiosperms",
      ],
      routeSlugs: {
        de: "tropismen-und-phytohormone",
        en: "tropisms-and-plant-hormones",
        id: "tropisme-dan-fitohormon",
        ms: "tropisme-dan-fitohormon",
      },
      slug: "tropism-hormone",
    },
  ],
  slug: "plant-response",
  translations: {
    de: {
      description: "Unterscheide Tropismen und Nastien, erkläre Auxin.",
      title: "Reaktionen der Pflanzen",
    },
    en: {
      description: "Tell tropisms from nastic responses and explain auxin.",
      title: "Response in Plants",
    },
    id: {
      description: "Bedakan tropisme dan nasti, lalu pahami auksin.",
      title: "Respons pada Tumbuhan",
    },
    ms: {
      description: "Bezakan tropisme dengan nasti dan fahami auksin.",
      title: "Gerak Balas dalam Tumbuhan",
    },
  },
});
