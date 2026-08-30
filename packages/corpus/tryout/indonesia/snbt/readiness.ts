import { defineAssessmentReadiness } from "#corpus/tryout/readiness";

/** Binds one official schedule value to the current SNPMB evidence. */
const official = (value: number) => ({
  provenance: { evidenceKey: "snpmb-2026", kind: "official" as const },
  value,
});

/** Latest official SNBT structure used as the 2027 baseline until superseded. */
export const snbtReadiness = defineAssessmentReadiness({
  countryKey: "indonesia",
  evidence: [
    {
      key: "snpmb-2026",
      label: "Paparan Informasi SNPMB 2026",
      retrievedAt: "2026-08-30",
      url: "https://files.snpmb.id/web2026/Paparan%20Informasi%20SNPMB%202026%20untuk%20Peluncuran.pdf",
    },
  ],
  examKey: "snbt",
  sections: [
    {
      key: "general-reasoning",
      order: 1,
      questionCount: official(30),
      timeLimitSeconds: official(1800),
    },
    {
      key: "general-knowledge",
      order: 2,
      questionCount: official(20),
      timeLimitSeconds: official(900),
    },
    {
      key: "reading-and-writing-skills",
      order: 3,
      questionCount: official(20),
      timeLimitSeconds: official(1500),
    },
    {
      key: "quantitative-knowledge",
      order: 4,
      questionCount: official(20),
      timeLimitSeconds: official(1200),
    },
    {
      key: "indonesian-language",
      order: 5,
      questionCount: official(30),
      timeLimitSeconds: official(2550),
    },
    {
      key: "english-language",
      order: 6,
      questionCount: official(20),
      timeLimitSeconds: official(1200),
    },
    {
      key: "mathematical-reasoning",
      order: 7,
      questionCount: official(20),
      timeLimitSeconds: official(2550),
    },
  ],
  sourceRevision: "2026-08-30",
  trackKey: "2027",
});
