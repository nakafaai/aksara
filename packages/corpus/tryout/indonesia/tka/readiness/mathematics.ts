import { tkaEvidence } from "#corpus/tryout/indonesia/tka/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

/** Official 2026 TKA Mathematics schedule and source-backed coverage gate. */
export const tkaMathematicsReadiness = defineAssessmentReadiness({
  countryKey: "indonesia",
  evidence: tkaEvidence,
  examKey: "tka",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 8, key: "knowledge-understanding" },
          { editorialMinimum: 10, key: "application" },
          { editorialMinimum: 7, key: "reasoning" },
        ],
        contentDomains: [
          { editorialMinimum: 3, key: "numbers" },
          { editorialMinimum: 6, key: "algebra" },
          { editorialMinimum: 10, key: "geometry-measurement" },
          { editorialMinimum: 5, key: "data-probability" },
          { editorialMinimum: 1, key: "trigonometry" },
        ],
        evidenceKey: "tka-framework",
        groupedStimulusEditorialMinimum: 3,
        responseMinimums: [
          { editorialMinimum: 19, kind: "single-choice" },
          { editorialMinimum: 3, kind: "multiple-choice" },
          { editorialMinimum: 3, kind: "category" },
        ],
        topics: [
          {
            contentDomains: ["numbers"],
            editorialMinimum: 3,
            key: "real-numbers",
          },
          {
            contentDomains: ["algebra"],
            editorialMinimum: 3,
            key: "linear-equations-inequalities",
          },
          {
            contentDomains: ["algebra"],
            editorialMinimum: 2,
            key: "functions",
          },
          {
            contentDomains: ["algebra"],
            editorialMinimum: 1,
            key: "sequences-series",
          },
          {
            contentDomains: ["geometry-measurement"],
            editorialMinimum: 3,
            key: "geometry-objects",
          },
          {
            contentDomains: ["geometry-measurement"],
            editorialMinimum: 3,
            key: "geometry-transformations",
          },
          {
            contentDomains: ["geometry-measurement"],
            editorialMinimum: 4,
            key: "measurement",
          },
          {
            contentDomains: ["trigonometry"],
            editorialMinimum: 1,
            key: "trigonometric-ratios",
          },
          {
            contentDomains: ["data-probability"],
            editorialMinimum: 3,
            key: "data",
          },
          {
            contentDomains: ["data-probability"],
            editorialMinimum: 2,
            key: "probability",
          },
        ],
      },
      key: "mathematics",
      order: 1,
      questionCount: {
        provenance: { evidenceKey: "tka-results-2026", kind: "official" },
        value: 25,
      },
      timeLimitSeconds: {
        provenance: {
          evidenceKey: "tka-pedoman-2026",
          kind: "official",
        },
        value: 3000,
      },
    },
  ],
  sourceRevision: "2026-08-30",
  trackKey: "mathematics",
});
