import { Array as Arr } from "effect";

/** The correct option of the choice of the interaction tests. */
export const choiceKey = {
  correct: ["option-2"],
  interaction: "answer",
  kind: "choice",
};

/** The columns of the two statements of the matrix tests. */
export const matrixKey = {
  answers: [
    { column: "column-1", statement: "statement-1" },
    { column: "column-2", statement: "statement-2" },
  ],
  interaction: "table",
  kind: "matrix",
};

/** The capitals of the two countries of the match tests. */
export const matchKey = {
  interaction: "capitals",
  kind: "match",
  pairs: [
    { source: "country-1", target: "capital-1" },
    { source: "country-2", target: "capital-2" },
  ],
};

/** The order of the three steps. */
export const orderKey = {
  interaction: "steps",
  kind: "order",
  sequence: ["step-1", "step-2", "step-3"],
};

/** The city that completes the sentence. */
export const inlineChoiceKey = {
  correct: "city-1",
  interaction: "city",
  kind: "inlineChoice",
};

/** The accepted spellings of a capital, compared without case or spacing noise. */
export const textEntryKey = {
  accepted: {
    acceptedAnswers: ["Jakarta", "DKI Jakarta"],
    collapseWhitespace: true,
    ignoreCase: true,
    kind: "text",
  },
  interaction: "capital",
  kind: "textEntry",
};

/** The volume of the tank of SNBT general reasoning set 1, question 10. */
export const numericEntryKey = {
  interaction: "volume",
  kind: "numericEntry",
  tolerance: { kind: "absolute", value: "0.05" },
  value: "64",
};

/** An expression, to which the learner's answer must be equivalent. */
export const mathEntryKey = {
  expression: "2x+1",
  interaction: "expression",
  kind: "mathEntry",
};

/** The heart is the area to select. */
export const hotspotKey = {
  correct: ["area-1"],
  interaction: "organs",
  kind: "hotspot",
};

/** The seasons that fill the two gaps. */
export const gapMatchKey = {
  interaction: "quote",
  kind: "gapMatch",
  pairs: [
    { choice: "word-1", gap: "gap-1" },
    { choice: "word-2", gap: "gap-2" },
  ],
};

/** Two points to plot, each within a quarter of a unit. */
export const graphPointKey = {
  interaction: "plot",
  kind: "graphPoint",
  target: {
    kind: "points",
    points: [
      { x: 1, y: 2 },
      { x: -3, y: 4 },
    ],
  },
  tolerance: 0.25,
};

/** The lowest level of the approach criterion, in words for a grader. */
export const lowDescriptor = {
  descriptor: "No method is shown.",
  level: "level-1",
};

/** What earns each level of the approach criterion. */
export const approachKey = {
  criterion: "approach",
  levels: [
    lowDescriptor,
    { descriptor: "A method is shown but not finished.", level: "level-2" },
    { descriptor: "The method is complete and correct.", level: "level-3" },
  ],
};

/** What earns each level of the result criterion. */
export const resultKey = {
  criterion: "result",
  levels: [
    { descriptor: "The result is wrong.", level: "level-1" },
    { descriptor: "The result is right.", level: "level-2" },
  ],
};

/** What earns each level of the rubric of the essay. */
export const extendedTextKey = {
  criteria: [approachKey, resultKey],
  interaction: "essay",
  kind: "extendedText",
};

/** One key of every kind, in the order of the contract. */
export const ALL_KEYS = Arr.make(
  choiceKey,
  matrixKey,
  matchKey,
  orderKey,
  inlineChoiceKey,
  textEntryKey,
  numericEntryKey,
  mathEntryKey,
  hotspotKey,
  gapMatchKey,
  graphPointKey,
  extendedTextKey
);
