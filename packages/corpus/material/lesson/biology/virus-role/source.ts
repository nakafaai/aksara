import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyVirusRoleMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/virus-role",
  domain: "biology",
  key: "lesson.biology.virus-role",
  kind: "lesson",
  routeSlugs: {
    de: "viren-und-ihre-rolle",
    en: "virus-role",
    id: "virus-dan-peranannya",
  },
  sections: [
    {
      routeSlugs: {
        de: "wie-viren-sich-vermehren",
        en: "how-virus-reproduce",
        id: "bagaimana-virus-bereproduksi",
      },
      slug: "how-virus-reproduce",
    },
    {
      evidenceUrls: [
        "https://www.cdc.gov/infection-control/hcp/isolation-precautions/scientific-review.html",
        "https://www.cdc.gov/dengue/prevention/index.html",
        "https://www.cdc.gov/clean-hands/data-research/facts-stats/",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC8451441/",
        "https://www.cdc.gov/flu/hcp/antivirals/index.html",
      ],
      routeSlugs: {
        de: "ausbreitung-von-viren-verhindern",
        en: "prevent-virus-spread",
        id: "cara-mencegah-penyebaran-virus",
      },
      slug: "prevent-virus-spread",
    },
    {
      evidenceUrls: [
        "https://www.nature.com/articles/s41564-018-0166-y",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC4452904/",
        "https://www.nhlbi.nih.gov/health/genetic-therapies/types",
      ],
      routeSlugs: { de: "rolle", en: "role", id: "peranan-virus" },
      slug: "role",
    },
    {
      evidenceUrls: [
        "https://ictv.global/about/taxonomy",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7148634/",
        "https://www.nature.com/articles/s41586-020-2665-2",
      ],
      routeSlugs: {
        de: "was-ist-ein-virus",
        en: "what-is-virus",
        id: "apa-itu-virus",
      },
      slug: "what-is-virus",
    },
  ],
  slug: "virus-role",
  translations: {
    de: {
      description: "Verfolge, wie Viren sich in Wirtszellen vermehren.",
      title: "Viren und ihre Rolle",
    },
    en: {
      description: "Follow how viruses copy themselves inside host cells.",
      title: "Viruses and Their Role",
    },
    id: {
      description: "Ikuti cara virus menggandakan diri di dalam sel inang.",
      title: "Virus dan Peranannya",
    },
  },
});
