import { tkaEvidence } from "#corpus/tryout/indonesia/tka/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const READING_DOMAINS = ["informational-text", "fiction"] as const;
const TEXTUAL = ["textual"] as const;
const INFERENTIAL = ["inferential"] as const;
const EVALUATION = ["evaluation-appreciation"] as const;

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
          { editorialMinimum: 10, key: "inferential" },
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
            cognitiveLevels: TEXTUAL,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "loanwords",
          },
          {
            cognitiveLevels: TEXTUAL,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "setting-character-phenomenon",
          },
          {
            cognitiveLevels: TEXTUAL,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "outline",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "main-supporting-ideas",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "meaning-relations",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "continuation",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "daily-relevance",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: ["informational-text"],
            editorialMinimum: 1,
            key: "information-quality",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: READING_DOMAINS,
            editorialMinimum: 1,
            key: "language-suitability",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: ["fiction"],
            editorialMinimum: 1,
            key: "fiction-evidence",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: ["fiction"],
            editorialMinimum: 1,
            key: "emotional-response",
          },
        ],
      },
      key: "indonesian-language",
      order: 1,
      questionCount: {
        provenance: {
          evidenceKey: "tka-sma-2026-update",
          kind: "official",
        },
        value: 25,
      },
      timeLimitSeconds: {
        provenance: {
          evidenceKey: "tka-sma-2026-update",
          kind: "official",
        },
        value: 4500,
      },
    },
  ],
  sourceRevision: "2026-08-31",
  trackKey: "indonesian-language",
});
