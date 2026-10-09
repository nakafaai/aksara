import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, BigDecimal, Option, Schema } from "effect";

import {
  canonicalQuestionAnswerKey,
  canonicalQuestionAnswerKeyStructure,
  isBlankAnswer,
  matchesAnswerKey,
  type QuestionAnswerKey,
  QuestionAnswerKeySchema,
  QuestionDecimalSchema,
  QuestionNumberKeySchema,
  QuestionTextKeySchema,
  readNumberAnswer,
} from "#contracts/question/answer";
import {
  city,
  exact,
  goldenAbsolute,
  goldenExact,
  goldenRelative,
  goldenText,
  jakartaText,
  reading,
  rejects,
  tolerantNumber,
} from "#contracts/test/answer";
import { encodeJsonText } from "#contracts/text/json";

describe("question answer golden canonical bytes", () => {
  it("pins the canonical bytes of a text key with unsorted accepted answers", () => {
    expect(encodeJsonText(canonicalQuestionAnswerKey(goldenText))).toBe(
      '{"acceptedAnswers":["jakarta","Jakarta é"],"collapseWhitespace":true,"ignoreCase":true,"kind":"text"}'
    );
  });

  it("pins the canonical bytes of numeric keys with and without tolerance", () => {
    expect(encodeJsonText(canonicalQuestionAnswerKey(goldenAbsolute))).toBe(
      '{"acceptsFractions":false,"kind":"number","tolerance":{"kind":"absolute","value":"0.05"},"value":"2.5"}'
    );
    expect(encodeJsonText(canonicalQuestionAnswerKey(goldenRelative))).toBe(
      '{"acceptsFractions":true,"kind":"number","tolerance":{"kind":"relative","value":"0.01"},"value":"-12.75"}'
    );
    expect(encodeJsonText(canonicalQuestionAnswerKey(goldenExact))).toBe(
      '{"acceptsFractions":true,"kind":"number","value":"6"}'
    );
  });

  it("pins the structure bytes that omit accepted text", () => {
    expect(
      encodeJsonText(canonicalQuestionAnswerKeyStructure(goldenText))
    ).toBe('{"collapseWhitespace":true,"ignoreCase":true,"kind":"text"}');
  });
});

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
    for (const key of [
      exact,
      { ...exact, acceptsFractions: true, value: "0.75" },
      { ...exact, tolerance: { kind: "absolute", value: "0.05" } },
      { ...exact, tolerance: { kind: "absolute", value: "2" } },
      { ...exact, tolerance: { kind: "relative", value: "0.01" } },
    ]) {
      expect(Schema.decodeUnknownSync(QuestionNumberKeySchema)(key)).toEqual(
        key
      );
    }
  });

  it("rejects tolerances that are not positive or cannot bound a relative error", () => {
    for (const key of [
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
      expect(rejects(QuestionNumberKeySchema, key)).toBe(true);
    }
  });

  it("accepts distinct single-line text answers under their own rules", () => {
    expect(Schema.decodeSync(QuestionTextKeySchema)(city)).toEqual(city);
    expect(
      Schema.decodeSync(QuestionTextKeySchema)({
        ...city,
        acceptedAnswers: ["Berlin", "BERLIN"],
        ignoreCase: false,
      }).acceptedAnswers
    ).toEqual(["Berlin", "BERLIN"]);
  });

  it("rejects text answers that normalize together, need a second spelling, or cannot be typed on one line", () => {
    for (const key of [
      { ...city, acceptedAnswers: [] },
      { ...city, acceptedAnswers: ["Berlin", "BERLIN"] },
      { ...city, acceptedAnswers: ["New York", "New  York"] },
      { ...city, acceptedAnswers: ["Café", "Cafe\u0301"] },
      { ...city, acceptedAnswers: ["Cafe\u0301"] },
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
      expect(rejects(QuestionTextKeySchema, key)).toBe(true);
    }
  });

  it("canonicalizes every answer key in stable field order", () => {
    expect(encodeJsonText(canonicalQuestionAnswerKey(tolerantNumber))).toBe(
      '{"acceptsFractions":true,"kind":"number","tolerance":{"kind":"absolute","value":"0.1"},"value":"-3.5"}'
    );
    expect(encodeJsonText(canonicalQuestionAnswerKey(exact))).toBe(
      '{"acceptsFractions":false,"kind":"number","value":"2.5"}'
    );
    expect(encodeJsonText(canonicalQuestionAnswerKey(jakartaText))).toBe(
      '{"acceptedAnswers":["Jakarta"],"collapseWhitespace":true,"ignoreCase":false,"kind":"text"}'
    );
    for (const key of [tolerantNumber, exact, jakartaText, city]) {
      const stored: QuestionAnswerKey = canonicalQuestionAnswerKey(key);
      expect(Schema.decodeSync(QuestionAnswerKeySchema)(stored)).toEqual(key);
    }
  });

  it("keeps numeric keys but drops localized text from the structure", () => {
    expect(canonicalQuestionAnswerKeyStructure(exact)).toEqual(
      canonicalQuestionAnswerKey(exact)
    );
    expect(canonicalQuestionAnswerKeyStructure(city)).toEqual({
      collapseWhitespace: true,
      ignoreCase: true,
      kind: "text",
    });
  });
});

describe("typed learner answer", () => {
  it("reads decimals with the delivery language's separator and fractions in any language", () => {
    for (const [input, language, expected] of [
      ["0,75", "id", "0.75/1"],
      ["-2,5", "de", "-2.5/1"],
      ["\u22122.5", "en", "-2.5/1"],
      ["+7", "en", "7/1"],
      [".5", "en", "0.5/1"],
      ["5.", "en", "5/1"],
      [",5", "de", "0.5/1"],
      ["007", "id", "7/1"],
      [" 3,50 ", "id", "3.5/1"],
      ["\u00a04\u200b2", "en", "42/1"],
      ["6/8", "en", "6/8 fraction"],
      ["\u22123 / 4", "de", "-3/4 fraction"],
      ["-3/4", "id", "-3/4 fraction"],
    ] as const) {
      expect(Option.getOrNull(reading(input, language))).toBe(expected);
    }
  });

  it("treats an answer with nothing visible as blank", () => {
    const invisible = " \t\n\u00a0\u2028\u200b\u2060\u00ad\ufeff";
    expect(Arr.every(["", invisible, ...invisible], isBlankAnswer)).toBe(true);
    expect(Arr.some(["0", "x", `x${invisible}`], isBlankAnswer)).toBe(false);
  });

  it("reads nothing outside the one documented number grammar", () => {
    for (const [input, language] of [
      ["", "en"],
      ["   ", "id"],
      ["-", "en"],
      [".", "en"],
      [",", "de"],
      ["0.5", "id"],
      ["0,5", "en"],
      ["1.234,5", "de"],
      ["1,234.5", "en"],
      ["1 234", "de"],
      ["1e3", "en"],
      ["- 5", "en"],
      ["5-", "en"],
      ["--5", "en"],
      ["\u20135", "en"],
      ["\uff15", "en"],
      ["1 1/2", "en"],
      ["3/-4", "en"],
      ["1,5/2", "id"],
      ["6/0", "en"],
      ["6/", "en"],
      ["/8", "en"],
      ["x", "en"],
    ] as const) {
      expect(Option.isNone(readNumberAnswer(input, language))).toBe(true);
    }
  });

  it("grades numbers exactly, inclusive of tolerance, and fractions only when accepted", () => {
    const third = {
      acceptsFractions: true,
      kind: "number",
      tolerance: { kind: "absolute", value: "0.001" },
      value: "0.333",
    } as const;
    const relative = {
      ...exact,
      tolerance: { kind: "relative", value: "0.1" },
      value: "-20",
    } as const;
    const cases = [
      [exact, "2,5", "id", true],
      [exact, "2.50", "en", true],
      [exact, "2,5", "en", false],
      [exact, "2.6", "en", false],
      [exact, "5/2", "en", false],
      [{ ...exact, acceptsFractions: true }, "5/2", "en", true],
      [{ ...exact, acceptsFractions: true }, "10 / 4", "de", true],
      [third, "1/3", "en", true],
      [third, "0.334", "en", true],
      [third, "0.3345", "en", false],
      [third, "1/2", "en", false],
      [relative, "-22", "en", true],
      [relative, "-18", "en", true],
      [relative, "-17.9", "en", false],
      [relative, "-22.1", "en", false],
      [{ ...exact, value: "0" }, "", "en", false],
      [{ ...exact, value: "0" }, "0", "en", true],
      [{ ...exact, value: "0" }, "-0", "en", true],
    ] as const;

    expect(
      Arr.map(cases, ([key, answer, language]) =>
        matchesAnswerKey(key, answer, language)
      )
    ).toEqual(Arr.map(cases, ([, , , expected]) => expected));
  });

  it("grades text through the key's rules after reading it as visible text", () => {
    const strict = {
      acceptedAnswers: ["New York", "Café au lait"],
      collapseWhitespace: false,
      ignoreCase: false,
      kind: "text",
    } as const;
    const loose = { ...strict, collapseWhitespace: true, ignoreCase: true };
    const cases = [
      [strict, "New York", true],
      [strict, "  New York ", true],
      [strict, "New\u00a0York", true],
      [strict, "New\u202fYork", true],
      [strict, "New\u200b York", true],
      [strict, "Cafe\u0301 au lait", true],
      [strict, "new york", false],
      [strict, "New  York", false],
      [strict, "", false],
      [loose, "NEW   york", true],
      [loose, "CAFÉ\u00a0AU\u00a0\u00a0LAIT", true],
      [loose, "Newyork", false],
      [loose, " ", false],
    ] as const;

    expect(
      Arr.map(cases, ([key, answer]) => matchesAnswerKey(key, answer, "en"))
    ).toEqual(Arr.map(cases, ([, , expected]) => expected));
  });
});
