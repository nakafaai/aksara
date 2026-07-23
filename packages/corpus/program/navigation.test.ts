import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  ProgramNavigationIconKeySchema,
  ProgramNavigationLevelSchema,
} from "#corpus/program/navigation";

describe("program navigation", () => {
  it("accepts only levels and icons used by imported curriculum trees", () => {
    expect(ProgramNavigationLevelSchema.literals).toEqual([
      "class",
      "course",
      "lesson",
      "stage",
      "subject",
      "unit",
    ]);
    expect(Schema.is(ProgramNavigationIconKeySchema)("grade-12")).toBe(true);
    expect(Schema.is(ProgramNavigationIconKeySchema)("invented-icon")).toBe(
      false
    );
  });
});
