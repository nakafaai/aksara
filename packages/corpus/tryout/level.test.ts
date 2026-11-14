import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import { SetRatingSchema, setLevel } from "#corpus/tryout/level";

/** A two-rater panel rating with the given mean level. */
function rating(level: number) {
  return { items: 20, level, raters: 2 };
}

describe("setLevel", () => {
  it("reads a set rated like the real exam as easy", () => {
    expect(setLevel(rating(1))).toBe("easy");
    expect(setLevel(rating(3))).toBe("easy");
    expect(setLevel(rating(3.49))).toBe("easy");
  });

  it("climbs through medium and hard to cooked above the real exam", () => {
    expect(setLevel(rating(3.5))).toBe("medium");
    expect(setLevel(rating(3.99))).toBe("medium");
    expect(setLevel(rating(4))).toBe("hard");
    expect(setLevel(rating(4.49))).toBe("hard");
    expect(setLevel(rating(4.5))).toBe("cooked");
    expect(setLevel(rating(5))).toBe("cooked");
  });

  it("refuses a rating outside the panel's scale", () => {
    const decode = Schema.decodeUnknownOption(SetRatingSchema);

    expect(decode(rating(5.5))._tag).toBe("None");
    expect(decode({ ...rating(3), raters: 0 })._tag).toBe("None");
  });
});
