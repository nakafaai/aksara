import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, BigDecimal, Option, Schema } from "effect";

import {
  DecimalSchema,
  isBlankAnswer,
  matchesAnswerKey,
  NumberKeySchema,
  readNumberAnswer,
  TextKeySchema,
} from "#contracts/assessment/answer";
import { city, exact, reading, rejects } from "#contracts/test/answer";

describe("answer key", () => {
  it("accepts canonical decimals that Effect BigDecimal reads exactly", () => {
    for (const value of ["0", "7", "-7", "0.5", "-0.25", "120", "3.1415"]) {
      const decoded = Schema.decodeSync(DecimalSchema)(value);
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
      expect(rejects(DecimalSchema, value)).toBe(true);
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
      expect(Schema.decodeUnknownSync(NumberKeySchema)(key)).toEqual(key);
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
      expect(rejects(NumberKeySchema, key)).toBe(true);
    }
  });

  it("accepts distinct single-line text answers under their own rules", () => {
    expect(Schema.decodeSync(TextKeySchema)(city)).toEqual(city);
    expect(
      Schema.decodeSync(TextKeySchema)({
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
      expect(rejects(TextKeySchema, key)).toBe(true);
    }
  });
});

describe("typed learner answer", () => {
  it("reads any decimal separator and Arabic-Indic digits in every language, and fractions", () => {
    for (const [input, expected] of [
      ["0,75", "0.75/1"],
      ["0.75", "0.75/1"],
      ["\u0660\u066b\u0667\u0665", "0.75/1"],
      ["\u06f2\u066b\u06f5", "2.5/1"],
      ["\u0663,\u0665", "3.5/1"],
      ["\u0661\u0662.5", "12.5/1"],
      ["\u061c-\u0661\u0662\u200f", "-12/1"],
      ["-2,5", "-2.5/1"],
      ["\u22122.5", "-2.5/1"],
      ["+7", "7/1"],
      [".5", "0.5/1"],
      ["5.", "5/1"],
      [",5", "0.5/1"],
      ["\u066b5", "0.5/1"],
      ["007", "7/1"],
      [" 3,50 ", "3.5/1"],
      ["\u00a04\u200b2", "42/1"],
      ["6/8", "6/8 fraction"],
      ["\u0666/\u0668", "6/8 fraction"],
      ["\u22123 / 4", "-3/4 fraction"],
      ["-3/4", "-3/4 fraction"],
    ] as const) {
      expect(Option.getOrNull(reading(input))).toBe(expected);
    }
  });

  it("treats an answer with nothing visible as blank", () => {
    const invisible = " \t\n\u00a0\u2028\u200b\u2060\u00ad\ufeff";
    expect(Arr.every(["", invisible, ...invisible], isBlankAnswer)).toBe(true);
    expect(Arr.some(["0", "x", `x${invisible}`], isBlankAnswer)).toBe(false);
  });

  it("reads nothing outside the one documented number grammar", () => {
    for (const input of [
      "",
      "   ",
      "-",
      ".",
      ",",
      "\u066b",
      "1.234,5",
      "1,234.5",
      "1,2,3",
      "1\u066b2.3",
      "1\u066c234",
      "1 234",
      "1e3",
      "- 5",
      "5-",
      "--5",
      "\u20135",
      "\uff15",
      "\u0967",
      "1 1/2",
      "3/-4",
      "1,5/2",
      "6/0",
      "\u0666/\u0660",
      "6/",
      "/8",
      "x",
    ]) {
      expect(Option.isNone(readNumberAnswer(input))).toBe(true);
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
      [exact, "2,5", true],
      [exact, "2.50", true],
      [exact, "\u0662\u066b\u0665", true],
      [exact, "\u06f2,\u06f5\u06f0", true],
      [exact, "2.6", false],
      [exact, "\u0662\u066b\u0666", false],
      [exact, "5/2", false],
      [exact, "\u0665/\u0662", false],
      [{ ...exact, acceptsFractions: true }, "5/2", true],
      [{ ...exact, acceptsFractions: true }, "\u0665/\u0662", true],
      [{ ...exact, acceptsFractions: true }, "10 / 4", true],
      [third, "1/3", true],
      [third, "0,334", true],
      [third, "0.3345", false],
      [third, "1/2", false],
      [relative, "-22", true],
      [relative, "-18", true],
      [relative, "-17,9", false],
      [relative, "-22.1", false],
      [{ ...exact, value: "0" }, "", false],
      [{ ...exact, value: "0" }, "0", true],
      [{ ...exact, value: "0" }, "-0", true],
      [{ ...exact, value: "0" }, "\u0660", true],
    ] as const;

    expect(
      Arr.map(cases, ([key, answer]) => matchesAnswerKey(key, answer))
    ).toEqual(Arr.map(cases, ([, , expected]) => expected));
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
      Arr.map(cases, ([key, answer]) => matchesAnswerKey(key, answer))
    ).toEqual(Arr.map(cases, ([, , expected]) => expected));
  });
});
