import { materialNode, unitNode } from "#corpus/curriculum/schema";
import {
  earthActivityStandards,
  earthSystemsStandards,
  ecosystemStandards,
  evolutionStandards,
  heredityStandards,
  organismStandards,
} from "#corpus/curriculum/united-states/documents";

/** United States high school, NGSS Life Sciences. */
export const usLifeSciencesUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-science-life-sciences-cells",
      level: "lesson",
      materialKeys: ["lesson.biology.cell-organisation"],
      order: 10,
      outcomes: [
        { code: "LS1.A Structure and Function", ...organismStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-life-sciences-circulation",
      level: "lesson",
      materialKeys: ["lesson.biology.circulatory-system"],
      order: 20,
      outcomes: [
        { code: "LS1.A Structure and Function", ...organismStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-life-sciences-breathing",
      level: "lesson",
      materialKeys: ["lesson.biology.respiratory-system"],
      order: 30,
      outcomes: [
        { code: "LS1.A Structure and Function", ...organismStandards },
        {
          code: "LS1.C Organization for Matter and Energy Flow in Organisms",
          ...organismStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-life-sciences-homeostasis",
      level: "lesson",
      materialKeys: ["lesson.biology.homeostasis"],
      order: 40,
      outcomes: [
        { code: "LS1.A Structure and Function", ...organismStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-life-sciences-digestion",
      level: "lesson",
      materialKeys: ["lesson.biology.digestive-system"],
      order: 50,
      outcomes: [
        {
          code: "LS1.C Organization for Matter and Energy Flow in Organisms",
          ...organismStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-life-sciences-biodiversity",
      level: "lesson",
      materialKeys: ["lesson.biology.biodiversity"],
      order: 60,
      outcomes: [
        { code: "LS4.D Biodiversity and Humans", ...evolutionStandards },
        {
          code: "LS4.A Evidence of Common Ancestry and Diversity",
          ...evolutionStandards,
        },
        {
          code: "LS2.A Interdependent Relationships in Ecosystems",
          ...ecosystemStandards,
        },
        {
          code: "LS2.B Cycles of Matter and Energy Transfer in Ecosystems",
          ...ecosystemStandards,
        },
        { code: "LS3.B Variation of Traits", ...heredityStandards },
      ],
    }),
  ],
  key: "high-school-science-life-sciences",
  materialCard: {
    de: {
      description: "Vergleiche Lebewesen und biologische Vielfalt.",
      title: "Lebenswissenschaften",
    },
    en: {
      description: "Compare living systems and the diversity of life.",
      title: "Life Sciences",
    },
    id: {
      description: "Bandingkan sistem hayati dan keragaman makhluk hidup.",
      title: "Ilmu hayati",
    },
    ms: {
      description: "Bandingkan sistem hidupan dan kepelbagaian hidupan.",
      title: "Sains Hayat",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "lebenswissenschaften", title: "Lebenswissenschaften" },
    en: { routeSlug: "life-sciences", title: "Life Sciences" },
    id: { routeSlug: "ilmu-hayati", title: "Ilmu hayati" },
    ms: { routeSlug: "sains-hayat", title: "Sains Hayat" },
  },
});

/** United States high school, NGSS Earth and Space Sciences. */
export const usEarthSpaceSciencesUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-science-earth-space-sciences-climate",
      level: "lesson",
      materialKeys: ["lesson.biology.climate-change"],
      order: 10,
      outcomes: [
        { code: "ESS3.D Global Climate Change", ...earthActivityStandards },
        {
          code: "ESS3.C Human Impacts on Earth Systems",
          ...earthActivityStandards,
        },
        { code: "ESS2.D Weather and Climate", ...earthSystemsStandards },
      ],
    }),
  ],
  key: "high-school-science-earth-space-sciences",
  materialCard: {
    de: {
      description: "Verfolge den Klimawandel in den Systemen der Erde.",
      title: "Geo- und Weltraumwissenschaften",
    },
    en: {
      description: "Trace climate change through Earth systems.",
      title: "Earth and Space Sciences",
    },
    id: {
      description: "Telusuri perubahan iklim lewat sistem bumi.",
      title: "Ilmu bumi dan antariksa",
    },
    ms: {
      description: "Jejaki perubahan iklim melalui sistem Bumi.",
      title: "Sains Bumi dan Angkasa",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "geo-und-weltraumwissenschaften",
      title: "Geo- und Weltraumwissenschaften",
    },
    en: {
      routeSlug: "earth-and-space-sciences",
      title: "Earth and Space Sciences",
    },
    id: {
      routeSlug: "ilmu-bumi-dan-antariksa",
      title: "Ilmu bumi dan antariksa",
    },
    ms: {
      routeSlug: "sains-bumi-dan-angkasa",
      title: "Sains Bumi dan Angkasa",
    },
  },
});
