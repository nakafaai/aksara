import { defineAssessmentSpecification } from "#corpus/tryout/specification";

/** Official 2026 SNBT schedule used as the latest published 2027 baseline. */
export const snbtOfficialSchedule = defineAssessmentSpecification({
  basis: {
    label: "Framework UTBK-SNBT 2026",
    retrievedAt: "2026-08-30",
    url: "https://snpmb.id/fr/",
  },
  countryKey: "indonesia",
  examKey: "snbt",
  sections: [
    {
      key: "general-reasoning",
      order: 1,
      questionCount: 30,
      timeLimitSeconds: 1800,
    },
    {
      key: "general-knowledge",
      order: 2,
      questionCount: 20,
      timeLimitSeconds: 900,
    },
    {
      key: "reading-and-writing-skills",
      order: 3,
      questionCount: 20,
      timeLimitSeconds: 1500,
    },
    {
      key: "quantitative-knowledge",
      order: 4,
      questionCount: 20,
      timeLimitSeconds: 1200,
    },
    {
      key: "indonesian-language",
      order: 5,
      questionCount: 30,
      timeLimitSeconds: 2550,
    },
    {
      key: "english-language",
      order: 6,
      questionCount: 20,
      timeLimitSeconds: 1200,
    },
    {
      key: "mathematical-reasoning",
      order: 7,
      questionCount: 20,
      timeLimitSeconds: 2550,
    },
  ],
  trackKey: "2027",
});
