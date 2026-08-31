import { tkaEvidence } from "#corpus/tryout/indonesia/tka/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const TEXT_TYPES = [
  "descriptive",
  "recount",
  "narrative",
  "procedure",
  "analytical-exposition",
] as const;
const TEXTUAL = ["textual"] as const;
const INFERENTIAL = ["inferential"] as const;
const EVALUATION = ["evaluation-appreciation"] as const;

/** Official 2026 TKA English schedule and reading coverage gate. */
export const tkaEnglishReadiness = defineAssessmentReadiness({
  countryKey: "indonesia",
  evidence: tkaEvidence,
  examKey: "tka",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 10, key: "textual" },
          { editorialMinimum: 10, key: "inferential" },
          { editorialMinimum: 5, key: "evaluation-appreciation" },
        ],
        contentDomains: [
          { editorialMinimum: 5, key: "descriptive" },
          { editorialMinimum: 5, key: "recount" },
          { editorialMinimum: 5, key: "narrative" },
          { editorialMinimum: 5, key: "procedure" },
          { editorialMinimum: 5, key: "analytical-exposition" },
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
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "explicit-information",
          },
          {
            cognitiveLevels: TEXTUAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "classification",
          },
          {
            cognitiveLevels: TEXTUAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "outline",
          },
          {
            cognitiveLevels: TEXTUAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "summary",
          },
          {
            cognitiveLevels: TEXTUAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "synthesis",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "supporting-detail",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "main-idea-purpose",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "sequence",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "comparison",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "cause-effect",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "character",
          },
          {
            cognitiveLevels: INFERENTIAL,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "prediction",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "realism-fantasy",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "fact-opinion",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "information-validity",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "text-fit",
          },
          {
            cognitiveLevels: EVALUATION,
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "reader-response",
          },
        ],
      },
      key: "english-language",
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
  trackKey: "english-language",
});
