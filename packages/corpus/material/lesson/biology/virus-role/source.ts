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
      routeSlugs: {
        de: "ausbreitung-von-viren-verhindern",
        en: "prevent-virus-spread",
        id: "cara-mencegah-penyebaran-virus",
      },
      slug: "prevent-virus-spread",
    },
    {
      routeSlugs: { de: "rolle", en: "role", id: "peranan-virus" },
      slug: "role",
    },
    {
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
