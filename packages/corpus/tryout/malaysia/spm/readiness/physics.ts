import { spmEvidence } from "#corpus/tryout/malaysia/spm/evidence";
import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

const COGNITIVE_LEVELS = ["understanding", "applying", "analysing"] as const;
const FORM_4 = ["form-4"] as const;
const FORM_5 = ["form-5"] as const;

/**
 * Official schedule and format of SPM Fizik Paper 1 (4531/1). The 2021
 * timetable gives 1 hour 15 minutes; the format book gives 40 objective items
 * for 40 marks, single choice with one to three combined choices ("aneka
 * gabungan"), four options on at least 37 items, every learning area of the
 * Form 4 and Form 5 KSSM syllabus, and constructs of remembering 15,
 * understanding 15, applying 6 and analysing 4 with a low, medium and high
 * difficulty mix of 5:3:2. Nakafa sets sit at or above the hardest real
 * items and carry no recall-only items, so remembering is not a level of
 * this blueprint and the editorial minimums lean on applying and analysing.
 * Every learning area of both forms appears at least once.
 */
export const spmPhysicsReadiness = defineAssessmentReadiness({
  countryKey: "malaysia",
  evidence: spmEvidence,
  examKey: "spm",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 2, key: "understanding" },
          { editorialMinimum: 10, key: "applying" },
          { editorialMinimum: 20, key: "analysing" },
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
            key: "measurement",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "force-and-motion-1",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "gravitation",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "heat",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "waves",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_4,
            editorialMinimum: 1,
            key: "light-and-optics",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "force-and-motion-2",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "pressure",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "electricity",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "electromagnetism",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "electronics",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "nuclear-physics",
          },
          {
            cognitiveLevels: COGNITIVE_LEVELS,
            contentDomains: FORM_5,
            editorialMinimum: 1,
            key: "quantum-physics",
          },
        ],
      },
      key: "physics",
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
  trackKey: "physics",
});
