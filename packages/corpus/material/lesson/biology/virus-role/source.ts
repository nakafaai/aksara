import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyVirusRoleMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/virus-role",
  domain: "biology",
  key: "lesson.biology.virus-role",
  kind: "lesson",
  routeSlugs: { en: "virus-role", id: "virus-dan-peranannya" },
  sections: [
    {
      routeSlugs: {
        en: "how-virus-reproduce",
        id: "bagaimana-virus-bereproduksi",
      },
      slug: "how-virus-reproduce",
      translations: {
        en: {
          title: "How Do Viruses Reproduce?",
        },
        id: {
          title: "Bagaimana Virus Bereproduksi?",
        },
      },
    },
    {
      routeSlugs: {
        en: "prevent-virus-spread",
        id: "cara-mencegah-penyebaran-virus",
      },
      slug: "prevent-virus-spread",
      translations: {
        en: {
          title: "Ways to Prevent Virus Spread",
        },
        id: {
          title: "Cara Mencegah Penyebaran Virus",
        },
      },
    },
    {
      routeSlugs: { en: "role", id: "peranan-virus" },
      slug: "role",
      translations: {
        en: {
          title: "Role of Viruses",
        },
        id: {
          title: "Peranan Virus",
        },
      },
    },
    {
      routeSlugs: { en: "what-is-virus", id: "apa-itu-virus" },
      slug: "what-is-virus",
      translations: {
        en: {
          title: "What is a Virus?",
        },
        id: {
          title: "Apa itu Virus?",
        },
      },
    },
  ],
  slug: "virus-role",
  translations: {
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
