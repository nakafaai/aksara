import { tkaEvidence } from "#corpus/tryout/indonesia/tka/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const TEXT_TYPES = [
  "descriptive",
  "recount",
  "narrative",
  "procedure",
  "analytical-exposition",
] as const;

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
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "explicit-information",
          },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "classification",
          },
          { contentDomains: TEXT_TYPES, editorialMinimum: 1, key: "outline" },
          { contentDomains: TEXT_TYPES, editorialMinimum: 1, key: "summary" },
          { contentDomains: TEXT_TYPES, editorialMinimum: 1, key: "synthesis" },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "supporting-detail",
          },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "main-idea-purpose",
          },
          { contentDomains: TEXT_TYPES, editorialMinimum: 1, key: "sequence" },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "comparison",
          },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "cause-effect",
          },
          { contentDomains: TEXT_TYPES, editorialMinimum: 1, key: "character" },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "prediction",
          },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "realism-fantasy",
          },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "fact-opinion",
          },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "information-validity",
          },
          { contentDomains: TEXT_TYPES, editorialMinimum: 1, key: "text-fit" },
          {
            contentDomains: TEXT_TYPES,
            editorialMinimum: 1,
            key: "reader-response",
          },
        ],
      },
      key: "english-language",
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
  trackKey: "english-language",
});
