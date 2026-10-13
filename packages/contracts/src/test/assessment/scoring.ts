/** The rule that scores 1 for a fully correct answer and 0 for any other. */
export const allOrNothing = { kind: "allOrNothing" };

/** The rule of AKM complex multiple choice: one point for each correct option. */
export const perPart = {
  floor: 0,
  kind: "perPart",
  penaltyPerWrongPart: 1,
  pointsPerPart: 1,
};

/** The lowest level of the approach criterion. */
export const missingLevel = { id: "level-1", label: "Missing", points: 0 };

/** The middle level of the approach criterion. */
export const partialLevel = { id: "level-2", label: "Partial", points: 1 };

/** The highest level of the approach criterion. */
export const completeLevel = { id: "level-3", label: "Complete", points: 2 };

/** A criterion worth 2 points at its highest level. */
export const approachCriterion = {
  id: "approach",
  label: "Approach",
  levels: [missingLevel, partialLevel, completeLevel],
};

/** A criterion worth 1 point at its highest level. */
export const resultCriterion = {
  id: "result",
  label: "Result",
  levels: [
    { id: "level-1", label: "Wrong", points: 0 },
    { id: "level-2", label: "Right", points: 1 },
  ],
};

/** A rubric of two criteria, worth 3 points at their highest levels. */
export const rubricRule = {
  criteria: [approachCriterion, resultCriterion],
  kind: "rubric",
};

/** A written formula in every active language, as a test-only composite uses. */
export const formula = {
  de: "Mittelwert der Teilergebnisse (Testwert)",
  en: "Average of the section scores (test value)",
  id: "Rata-rata skor bagian (nilai uji)",
};
