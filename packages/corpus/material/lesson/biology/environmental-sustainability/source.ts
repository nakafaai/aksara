import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyEnvironmentalSustainabilityMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/biology/environmental-sustainability",
    domain: "biology",
    key: "lesson.biology.environmental-sustainability",
    kind: "lesson",
    routeSlugs: {
      de: "oekologische-nachhaltigkeit",
      en: "environmental-sustainability",
      id: "kelestarian-lingkungan",
      ms: "kelestarian-alam-sekitar",
    },
    sections: [
      {
        evidenceUrls: [
          "https://openstax.org/books/biology-2e/pages/47-3-threats-to-biodiversity",
          "https://openstax.org/books/biology-2e/pages/47-4-preserving-biodiversity",
          "https://openstax.org/books/concepts-biology/pages/21-3-preserving-biodiversity",
          "https://www.usgs.gov/special-topics/water-science-school/science/dissolved-oxygen-and-water",
          "https://water.usgs.gov/water-resources/software/DOTABLES/",
          "https://www.epa.gov/nutrientpollution/issue",
          "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health",
          "https://www.cdc.gov/niosh/noise/about/index.html",
          "https://sdgs.un.org/goals",
          "https://leap.unep.org/en/countries/my/national-legislation/national-green-technology-policy",
          "https://www.dosm.gov.my/portal-main/release-content/supply-and-utilization-accounts-selected-agricultural-commodities-malaysia-2019-2023-",
        ],
        routeSlugs: {
          de: "verschmutzung-und-naturschutz",
          en: "pollution-and-conservation",
          id: "pencemaran-dan-konservasi",
          ms: "pencemaran-dan-pemuliharaan",
        },
        slug: "pollution-conservation",
      },
    ],
    slug: "environmental-sustainability",
    translations: {
      de: {
        description: "Miss Verschmutzung und vergleiche Wege zum Naturschutz.",
        title: "Ökologische Nachhaltigkeit",
      },
      en: {
        description: "Measure pollution and compare ways to protect nature.",
        title: "Environmental Sustainability",
      },
      id: {
        description: "Ukur pencemaran dan bandingkan cara melindungi alam.",
        title: "Kelestarian Lingkungan",
      },
      ms: {
        description: "Ukur pencemaran dan bandingkan cara melindungi alam.",
        title: "Kelestarian Alam Sekitar",
      },
    },
  });
