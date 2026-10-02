/** Test-only numeric short answer that also accepts equivalent fractions. */
export const shortNumber = {
  key: { acceptsFractions: true, kind: "number", value: "0.75" },
  kind: "short-answer",
} as const;

/** Test-only text short answer compared without case or spacing noise. */
export const shortText = {
  key: {
    acceptedAnswers: ["Test-only answer"],
    collapseWhitespace: true,
    ignoreCase: true,
    kind: "text",
  },
  kind: "short-answer",
} as const;
