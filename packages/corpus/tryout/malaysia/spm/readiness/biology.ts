import { spmEvidence } from "#corpus/tryout/malaysia/spm/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const COGNITIVE_LEVELS = ["applying", "analysing"] as const;
const FORM_4 = ["form-4"] as const;
const FORM_5 = ["form-5"] as const;

/**
 * Official schedule and format of SPM Biologi Paper 1 (4551/1). The 2021
 * timetable gives 1 hour 15 minutes; the format book's table shared by
 * Fizik, Kimia and Biologi Paper 1 gives 40 objective items for 40 marks,
 * single choice with one to three combined choices ("aneka gabungan"), four
 * options on at least 37 items, every learning area of the Form 4 and Form 5
 * KSSM syllabus, and a low, medium and high difficulty mix of 5:3:2. Nakafa
 * sets sit at or above the hardest real items and carry no recall-only items,
 * so remembering and understanding are not levels of this blueprint and the
 * editorial minimums lean on analysing. Every learning area of both forms appears
 * at least once.
 */
export const spmBiologyReadiness = defineAssessmentReadiness({
  countryKey: "malaysia",
  evidence: spmEvidence,
  examKey: "spm",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 3, key: "applying" },
          { editorialMinimum: 30, key: "analysing" },
        ],
        contentDomains: [
          { editorialMinimum: 18, key: "form-4" },
          { editorialMinimum: 18, key: "form-5" },
        ],
        evidenceKey: "spm-science-format",
        groupedStimulusEditorialMinimum: 0,
        responseMinimums: [{ editorialMinimum: 40, kind: "single-choice" }],
        topics: [
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "introduction-to-biology",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "cell-biology-and-organisation",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "movement-of-substances-across-the-plasma-membrane",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "chemical-composition-in-a-cell",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "metabolism-and-enzymes",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "cell-division",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "cellular-respiration",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "respiratory-systems",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "nutrition-and-the-human-digestive-system",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "transport-in-humans-and-animals",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "immunity-in-humans",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "coordination-and-response-in-humans",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "homeostasis-and-the-human-urinary-system",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "support-and-movement-in-humans-and-animals",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "reproduction-and-growth-in-humans-and-animals",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "plant-tissue-organisation-and-growth",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "leaf-structure-and-function",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "nutrition-in-plants",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "transport-in-plants",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "response-in-plants",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "sexual-reproduction-in-flowering-plants",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "adaptations-of-plants-in-different-habitats",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "biodiversity",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "ecosystem",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "environmental-sustainability",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "inheritance",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "variation",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "genetic-technology",
          },
        ],
      },
      key: "biology",
      order: 1,
      questionCount: {
        provenance: { evidenceKey: "spm-science-format", kind: "official" },
        value: 40,
      },
      timeLimitSeconds: {
        provenance: { evidenceKey: "spm-2021-timetable", kind: "official" },
        value: 4500,
      },
    },
  ],
  sourceRevision: "2026-11-15",
  trackKey: "biology",
});
