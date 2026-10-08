import { BigDecimal, Exit, Option, Schema } from "effect";

import type { AppLocaleCode } from "#contracts/locale";
import {
  QuestionAnswerKeySchema,
  readNumberAnswer,
} from "#contracts/question/answer";

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

export const goldenText = Schema.decodeSync(QuestionAnswerKeySchema)({
  acceptedAnswers: ["jakarta", "Jakarta é"],
  collapseWhitespace: true,
  ignoreCase: true,
  kind: "text",
});
export const goldenAbsolute = Schema.decodeSync(QuestionAnswerKeySchema)({
  acceptsFractions: false,
  kind: "number",
  tolerance: { kind: "absolute", value: "0.05" },
  value: "2.5",
});
export const goldenRelative = Schema.decodeSync(QuestionAnswerKeySchema)({
  acceptsFractions: true,
  kind: "number",
  tolerance: { kind: "relative", value: "0.01" },
  value: "-12.75",
});
export const goldenExact = Schema.decodeSync(QuestionAnswerKeySchema)({
  acceptsFractions: true,
  kind: "number",
  value: "6",
});

/** Returns whether one unknown input fails strict schema decoding. */
export function rejects(
  schema: Schema.ConstraintDecoder<unknown>,
  input: unknown
) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

/** Returns one read learner number as `numerator/denominator` text. */
export function reading(input: string, language: AppLocaleCode) {
  return Option.map(
    readNumberAnswer(input, language),
    ({ denominator, fraction, numerator }) =>
      `${BigDecimal.format(numerator)}/${BigDecimal.format(denominator)}${fraction ? " fraction" : ""}`
  );
}

export const exact = {
  acceptsFractions: false,
  kind: "number",
  value: "2.5",
} as const;
export const city = {
  acceptedAnswers: ["Berlin", "Berlin, Germany"],
  collapseWhitespace: true,
  ignoreCase: true,
  kind: "text",
} as const;

/** Test-only numeric key with a bounded absolute tolerance. */
export const tolerantNumber = Schema.decodeSync(QuestionAnswerKeySchema)({
  acceptsFractions: true,
  kind: "number",
  tolerance: { kind: "absolute", value: "0.1" },
  value: "-3.5",
});

/** Test-only text key with one case-sensitive accepted answer. */
export const jakartaText = Schema.decodeSync(QuestionAnswerKeySchema)({
  acceptedAnswers: ["Jakarta"],
  collapseWhitespace: true,
  ignoreCase: false,
  kind: "text",
});
