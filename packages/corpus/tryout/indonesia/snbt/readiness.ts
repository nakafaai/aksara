import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

/** Binds an official item count to the SNPMB 2026 launch deck. */
const officialCount = (value: number) => ({
  provenance: { evidenceKey: "snpmb-2026", kind: "official" as const },
  value,
});

/** Binds an official subtest time to the SNPMB framework page, the only source of per-subtest minutes. */
const officialTime = (value: number) => ({
  provenance: { evidenceKey: "snpmb-framework", kind: "official" as const },
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
    {
      key: "snpmb-framework",
      label: "Framework UTBK SNBT 2026",
      retrievedAt: "2026-11-20",
      url: "https://snpmb.id/fr/",
    },
  ],
  examKey: "snbt",
  sections: [
    {
      key: "general-reasoning",
      order: 1,
      questionCount: officialCount(30),
      timeLimitSeconds: officialTime(1800),
    },
    {
      key: "general-knowledge-and-understanding",
      order: 2,
      questionCount: officialCount(20),
      timeLimitSeconds: officialTime(900),
    },
    {
      key: "reading-comprehension-and-writing",
      order: 3,
      questionCount: officialCount(20),
      timeLimitSeconds: officialTime(1500),
    },
    {
      key: "quantitative-knowledge",
      order: 4,
      questionCount: officialCount(20),
      timeLimitSeconds: officialTime(1200),
    },
    {
      key: "literacy-in-indonesian",
      order: 5,
      questionCount: officialCount(30),
      timeLimitSeconds: officialTime(2550),
    },
    {
      key: "literacy-in-english",
      order: 6,
      questionCount: officialCount(20),
      timeLimitSeconds: officialTime(1200),
    },
    {
      key: "mathematical-reasoning",
      order: 7,
      questionCount: officialCount(20),
      timeLimitSeconds: officialTime(2550),
    },
  ],
  sourceRevision: "2026-10-02",
  trackKey: "2027",
});
