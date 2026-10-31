import { BigDecimal, Exit, Option, Schema } from "effect";

import { readNumberAnswer } from "#contracts/assessment/answer";

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
export function reading(input: string) {
  return Option.map(
    readNumberAnswer(input),
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
