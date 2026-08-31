import { tkaEvidence } from "#corpus/tryout/indonesia/tka/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const READING_DOMAINS = ["informational-text", "fiction"] as const;

/** Official 2026 TKA Bahasa Indonesia schedule and reading coverage gate. */
export const tkaIndonesianReadiness = defineAssessmentReadiness({
  countryKey: "indonesia",
  evidence: tkaEvidence,
  examKey: "tka",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 6, key: "textual" },
          { editorialMinimum: 12, key: "inferential" },
          { editorialMinimum: 7, key: "evaluation-appreciation" },
        ],
        contentDomains: [
          { editorialMinimum: 15, key: "informational-text" },
          { editorialMinimum: 10, key: "fiction" },
        ],
        evidenceKey: "tka-framework",
        groupedStimulusEditorialMinimum: 5,
        responseMinimums: [
          { editorialMinimum: 19, kind: "single-choice" },
          { editorialMinimum: 3, kind: "multiple-choice" },
          { editorialMinimum: 3, kind: "category" },
        ],
        topics: [
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "loanwords",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "setting-character-phenomenon",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "outline",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "main-supporting-ideas",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "meaning-relations",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "continuation",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "daily-relevance",
          },
          {
            contentDomains: ["informational-text"],
            editorialMinimum: 1,
            key: "information-quality",
          },
          {
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "language-suitability",
          },
          {
            contentDomains: ["fiction"],
            editorialMinimum: 1,
            key: "fiction-evidence",
          },
          {
            contentDomains: ["fiction"],
            editorialMinimum: 1,
            key: "emotional-response",
          },
        ],
      },
      key: "indonesian-language",
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
        value: 2700,
      },
    },
  ],
  sourceRevision: "2026-08-30",
  trackKey: "indonesian-language",
});
