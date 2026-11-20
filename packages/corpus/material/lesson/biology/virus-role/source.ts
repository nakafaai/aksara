import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/virus-role",
  domain: "biology",
  key: "lesson.biology.virus-role",
  kind: "lesson",
  routeSlugs: {
    en: "virus-role",
    id: "virus-dan-peranannya",
    de: "viren-und-ihre-rolle",
    ms: "virus-dan-peranannya",
  },
  sections: [
    "how-virus-reproduce",
    "prevent-virus-spread",
    "role",
    "what-is-virus",
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
    de: {
      description: "Verfolge, wie Viren sich in Wirtszellen vermehren.",
      title: "Viren und ihre Rolle",
    },
    ms: {
      description: "Ikuti cara virus membiak di dalam sel perumah.",
      title: "Virus dan Peranannya",
    },
  },
};

export default lesson;
