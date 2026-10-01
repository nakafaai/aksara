import { describe, expect, it } from "@effect/vitest";
import { BigDecimal, Exit, Schema } from "effect";

import {
  canonicalQuestionAnswer,
  canonicalQuestionAnswerStructure,
  normalizeTextAnswer,
  QuestionAnswerSchema,
  QuestionDecimalSchema,
  QuestionNumberAnswerSchema,
  QuestionTextAnswerSchema,
} from "#contracts/question/answer";

/** Returns whether one unknown input fails strict schema decoding. */
function rejects(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

const exact = {
  acceptsFractions: false,
  kind: "number",
  value: "2.5",
} as const;
const city = {
  acceptedAnswers: ["Berlin", "Berlin, Germany"],
  collapseWhitespace: true,
  ignoreCase: true,
  kind: "text",
} as const;

describe("question answer key", () => {
  it("accepts canonical decimals that Effect BigDecimal reads exactly", () => {
    for (const value of ["0", "7", "-7", "0.5", "-0.25", "120", "3.1415"]) {
      const decoded = Schema.decodeSync(QuestionDecimalSchema)(value);
      expect(BigDecimal.format(BigDecimal.fromStringUnsafe(decoded))).toBe(
        value
      );
    }
  });

  it("rejects decimals with a second spelling of the same value", () => {
    for (const value of [
      "",
      "-0",
      "00",
      "07",
      "1.0",
      "0.50",
      "+1",
      ".5",
      "5.",
      "1,5",
      "1e3",
      " 1",
    ]) {
      expect(rejects(QuestionDecimalSchema, value)).toBe(true);
    }
  });

  it("accepts exact numbers with positive absolute or bounded relative tolerance", () => {
    for (const answer of [
      exact,
      { ...exact, acceptsFractions: true, value: "0.75" },
      { ...exact, tolerance: { kind: "absolute", value: "0.05" } },
      { ...exact, tolerance: { kind: "absolute", value: "2" } },
      { ...exact, tolerance: { kind: "relative", value: "0.01" } },
    ]) {
      expect(
        Schema.decodeUnknownSync(QuestionNumberAnswerSchema)(answer)
      ).toEqual(answer);
    }
  });

  it("rejects tolerances that are not positive or cannot bound a relative error", () => {
    for (const answer of [
      { ...exact, tolerance: { kind: "absolute", value: "0" } },
      { ...exact, tolerance: { kind: "absolute", value: "-0.1" } },
      { ...exact, tolerance: { kind: "relative", value: "1" } },
      { ...exact, tolerance: { kind: "relative", value: "1.5" } },
      { ...exact, tolerance: { kind: "relative", value: "0.1" }, value: "0" },
      { ...exact, tolerance: { kind: "percent", value: "0.1" } },
      { ...exact, value: "2.50" },
      { acceptsFractions: false, kind: "number", value: 2.5 },
      { kind: "number", value: "2.5" },
    ]) {
      expect(rejects(QuestionNumberAnswerSchema, answer)).toBe(true);
    }
  });

  it("normalizes text with the documented rules in their exact order", () => {
    const decomposed = "  Müller   Straße ".normalize("NFD");
    const strict = { collapseWhitespace: false, ignoreCase: false };

    expect(normalizeTextAnswer(decomposed, strict)).toBe("Müller   Straße");
    expect(
      normalizeTextAnswer(decomposed, { ...strict, collapseWhitespace: true })
    ).toBe("Müller Straße");
    expect(
      normalizeTextAnswer(decomposed, {
        collapseWhitespace: true,
        ignoreCase: true,
      })
    ).toBe("müller straße");
    expect(normalizeTextAnswer("Á\tB", { ...strict, ignoreCase: true })).toBe(
      "á\tb"
    );
  });

  it("accepts distinct single-line text answers under their own rules", () => {
    expect(Schema.decodeSync(QuestionTextAnswerSchema)(city)).toEqual(city);
    expect(
      Schema.decodeSync(QuestionTextAnswerSchema)({
        ...city,
        acceptedAnswers: ["Berlin", "BERLIN"],
        ignoreCase: false,
      }).acceptedAnswers
    ).toEqual(["Berlin", "BERLIN"]);
  });

  it("rejects text answers that normalize together or cannot be typed on one line", () => {
    for (const answer of [
      { ...city, acceptedAnswers: [] },
      { ...city, acceptedAnswers: ["Berlin", "BERLIN"] },
      { ...city, acceptedAnswers: ["New York", "New  York"] },
      { ...city, acceptedAnswers: ["München".normalize("NFD"), "München"] },
      { ...city, acceptedAnswers: [" Berlin"] },
      { ...city, acceptedAnswers: [""] },
      { ...city, acceptedAnswers: ["Ber\nlin"] },
      { ...city, acceptedAnswers: ["Ber\tlin"] },
      { ...city, acceptedAnswers: ["New\u2028York"] },
      { ...city, acceptedAnswers: ["New\u2029York"] },
      { ...city, acceptedAnswers: ["New\u00a0York"] },
      { ...city, acceptedAnswers: ["New\u200bYork"] },
      { ...city, ignoreCase: "yes" },
    ]) {
      expect(rejects(QuestionTextAnswerSchema, answer)).toBe(true);
    }
  });

  it("canonicalizes every answer key in stable field order", () => {
    const tolerant = Schema.decodeSync(QuestionAnswerSchema)({
      acceptsFractions: true,
      kind: "number",
      tolerance: { kind: "absolute", value: "0.1" },
      value: "-3.5",
    });
    const text = Schema.decodeSync(QuestionAnswerSchema)({
      acceptedAnswers: ["Jakarta"],
      collapseWhitespace: true,
      ignoreCase: false,
      kind: "text",
    });

    expect(JSON.stringify(canonicalQuestionAnswer(tolerant))).toBe(
      '{"acceptsFractions":true,"kind":"number","tolerance":{"kind":"absolute","value":"0.1"},"value":"-3.5"}'
    );
    expect(JSON.stringify(canonicalQuestionAnswer(exact))).toBe(
      '{"acceptsFractions":false,"kind":"number","value":"2.5"}'
    );
    expect(JSON.stringify(canonicalQuestionAnswer(text))).toBe(
      '{"acceptedAnswers":["Jakarta"],"collapseWhitespace":true,"ignoreCase":false,"kind":"text"}'
    );
  });

  it("keeps numeric keys but drops localized text from the structure", () => {
    expect(canonicalQuestionAnswerStructure(exact)).toEqual(
      canonicalQuestionAnswer(exact)
    );
    expect(canonicalQuestionAnswerStructure(city)).toEqual({
      collapseWhitespace: true,
      ignoreCase: true,
      kind: "text",
    });
  });
});
