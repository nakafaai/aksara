import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyClimateChangeMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/climate-change",
  domain: "biology",
  key: "lesson.biology.climate-change",
  kind: "lesson",
  routeSlugs: {
    de: "klimawandel",
    en: "climate-change",
    id: "perubahan-iklim",
  },
  sections: [
    {
      evidenceUrls: [
        "https://www.ipcc.ch/report/ar6/syr/",
        "https://www.epa.gov/ghgemissions/overview-greenhouse-gases",
        "https://www.oecd.org/en/publications/global-plastics-outlook_de747aef-en.html",
      ],
      routeSlugs: {
        de: "ursachen",
        en: "causes",
        id: "penyebab-perubahan-iklim",
      },
      slug: "causes",
    },
    {
      evidenceUrls: [
        "https://unfccc.int/process-and-meetings/the-paris-agreement",
        "https://www.ipcc.ch/report/ar6/syr/resources/spm-headline-statements/",
        "https://unfccc.int/process-and-meetings/the-paris-agreement/nationally-determined-contributions-ndcs",
        "https://unfccc.int/topics/global-stocktake",
      ],
      routeSlugs: {
        de: "internationale-zusammenarbeit",
        en: "global-cooperation",
        id: "kerja-sama-global-untuk-mengatasi-perubahan-iklim",
      },
      slug: "global-cooperation",
    },
    {
      evidenceUrls: [
        "https://www.ipcc.ch/report/ar6/syr/",
        "https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content",
        "https://oceanservice.noaa.gov/facts/coral_bleach.html",
        "https://www.who.int/news-room/fact-sheets/detail/climate-change-and-health",
      ],
      routeSlugs: { de: "folgen", en: "impact", id: "dampak-perubahan-iklim" },
      slug: "impact",
    },
    {
      evidenceUrls: [
        "https://www.ipcc.ch/report/ar6/syr/",
        "https://www.ipcc.ch/report/ar6/syr/summary-for-policymakers/",
      ],
      routeSlugs: {
        de: "klimaschutz-und-anpassung",
        en: "mitigation-adaptation",
        id: "upaya-mitigasi-dan-adaptasi-terhadap-perubahan-iklim",
      },
      slug: "mitigation-adaptation",
    },
    {
      evidenceUrls: [
        "https://wmo.int/wmo-climatological-normals",
        "https://science.nasa.gov/climate-change/evidence/",
        "https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content",
      ],
      routeSlugs: {
        de: "anzeichen",
        en: "symptoms",
        id: "gejala-perubahan-iklim",
      },
      slug: "symptoms",
    },
  ],
  slug: "climate-change",
  translations: {
    de: {
      description: "Untersuche Ursachen, Anzeichen, Folgen und Antworten.",
      title: "Klimawandel",
    },
    en: {
      description: "Trace how human activity traps heat on Earth.",
      title: "Climate Change",
    },
    id: {
      description: "Telusuri aktivitas manusia yang memerangkap panas bumi.",
      title: "Perubahan Iklim",
    },
  },
});
