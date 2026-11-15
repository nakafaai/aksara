import { spmEvidence } from "#corpus/tryout/malaysia/spm/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const COGNITIVE_LEVELS = ["applying", "analysing"] as const;
const FORM_4 = ["form-4"] as const;
const FORM_5 = ["form-5"] as const;

/**
 * Official schedule and format of SPM Kimia Paper 1 (4541/1). The 2021
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
export const spmChemistryReadiness = defineAssessmentReadiness({
  countryKey: "malaysia",
  evidence: spmEvidence,
  examKey: "spm",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 4, key: "applying" },
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
            key: "introduction-to-chemistry",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "matter-and-atomic-structure",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "mole-concept",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "periodic-table",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "chemical-bonds",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "acids-bases-and-salts",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "rate-of-reaction",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "manufactured-substances-in-industry",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "redox-equilibrium",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "carbon-compounds",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "thermochemistry",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "polymers",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "consumer-and-industrial-chemistry",
          },
        ],
      },
      key: "chemistry",
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
  trackKey: "chemistry",
});
