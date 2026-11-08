import { tkaEvidence } from "#corpus/tryout/indonesia/tka/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const MATHEMATICS_COGNITIVE_LEVELS = [
  "knowledge-understanding",
  "application",
  "reasoning",
] as const;

/**
 * TKA Advanced Mathematics schedule and coverage gate. The Pusmendik
 * framework page owns the elements, sub-elements, cognitive levels, and the
 * three response forms. No official document states the number of items in an
 * elective paper, and the minutes conflict: the signed Kepmendikdasmen 56/2026
 * table of 6 March 2026 gives 50 minutes, while the 28 July 2026 release
 * extended the 2026 durations and official BBPMP pages report 60 minutes per
 * elective. The paper therefore follows 25 items in 60 minutes, the elective
 * form those pages describe, as an editorial schedule.
 */
export const tkaAdvancedMathematicsReadiness = defineAssessmentReadiness({
  countryKey: "indonesia",
  evidence: [
    ...tkaEvidence,
    {
      key: "tka-advanced-mathematics",
      label: "Kerangka Asesmen TKA Matematika Tingkat Lanjut",
      retrievedAt: "2026-11-08",
      url: "https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-pilihan/sma/matematika-tingkat-lanjut",
    },
  ],
  examKey: "tka",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 5, key: "knowledge-understanding" },
          { editorialMinimum: 10, key: "application" },
          { editorialMinimum: 6, key: "reasoning" },
        ],
        contentDomains: [
          { editorialMinimum: 8, key: "algebra" },
          { editorialMinimum: 8, key: "geometry-measurement" },
          { editorialMinimum: 4, key: "calculus" },
        ],
        evidenceKey: "tka-advanced-mathematics",
        groupedStimulusEditorialMinimum: 1,
        responseMinimums: [
          { editorialMinimum: 17, kind: "single-choice" },
          { editorialMinimum: 3, kind: "multiple-choice" },
          { editorialMinimum: 3, kind: "category" },
        ],
        topics: [
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["algebra"],
            // The framework lists linear programming under the matrices
            // sub-element, so its items carry this topic.
            editorialMinimum: 4,
            key: "matrices",
          },
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["algebra"],
            editorialMinimum: 2,
            key: "polynomials",
          },
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["algebra"],
            editorialMinimum: 2,
            key: "functions",
          },
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["geometry-measurement"],
            editorialMinimum: 2,
            key: "vectors",
          },
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["geometry-measurement"],
            editorialMinimum: 2,
            key: "circles",
          },
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["geometry-measurement"],
            editorialMinimum: 2,
            key: "geometric-transformations",
          },
          {
            cognitiveLevels: MATHEMATICS_COGNITIVE_LEVELS,
            contentDomains: ["calculus"],
            editorialMinimum: 4,
            key: "limits",
          },
        ],
      },
      key: "advanced-mathematics",
      order: 1,
      questionCount: {
        provenance: { kind: "editorial" },
        value: 25,
      },
      timeLimitSeconds: {
        provenance: { kind: "editorial" },
        value: 3600,
      },
    },
  ],
  sourceRevision: "2026-09-27",
  trackKey: "advanced-mathematics",
});
