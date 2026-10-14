import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  AssetIdSchema,
  ExamProfileIdSchema,
  hasDistinctIds,
  hasUniqueIds,
  ItemFamilyIdSchema,
  KebabKeySchema,
  LocalIdSchema,
  PaperIdSchema,
} from "#contracts/assessment/identity";

describe("assessment identifiers", () => {
  it("writes the identifier of a part in lower kebab case, starting with a letter", () => {
    for (const id of ["option-1", "gap-2", "a", "statement-10"]) {
      expect(Schema.is(LocalIdSchema)(id)).toBe(true);
    }
    for (const id of [
      "1-option",
      "Option-1",
      "option_1",
      "option--1",
      "",
      "-a",
    ]) {
      expect(Schema.is(LocalIdSchema)(id)).toBe(false);
    }
    expect(Schema.is(LocalIdSchema)("a".repeat(128))).toBe(true);
    expect(Schema.is(LocalIdSchema)("a".repeat(129))).toBe(false);
  });

  it("writes a section or blueprint key in lower kebab case", () => {
    expect(Schema.is(KebabKeySchema)("geometry-measurement")).toBe(true);
    expect(Schema.is(KebabKeySchema)("Geometry")).toBe(false);
    expect(Schema.is(KebabKeySchema)("a".repeat(129))).toBe(false);
  });

  it("names a family, a profile, a paper, and an asset by a path-like key", () => {
    const key =
      "question-bank/tryout/indonesia/tka/compulsory-mathematics/set-1/question-15";

    for (const schema of [
      ItemFamilyIdSchema,
      ExamProfileIdSchema,
      PaperIdSchema,
      AssetIdSchema,
    ]) {
      expect(Schema.is(schema)(key)).toBe(true);
      expect(Schema.is(schema)("Question 15")).toBe(false);
      expect(Schema.is(schema)("")).toBe(false);
    }
  });

  it("finds an identifier that a list names twice", () => {
    expect(hasDistinctIds(["a", "b"])).toBe(true);
    expect(hasDistinctIds(["a", "b", "a"])).toBe(false);
    expect(hasUniqueIds([{ id: "a" }, { id: "b" }])).toBe(true);
    expect(hasUniqueIds([{ id: "a" }, { id: "a" }])).toBe(false);
  });
});
