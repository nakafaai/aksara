import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Order } from "effect";
import { compareCodeUnits } from "#contracts/text/order";

describe("code-unit ordering", () => {
  it("orders text without locale or ICU behavior", () => {
    expect(compareCodeUnits("alpha", "beta")).toBe(-1);
    expect(compareCodeUnits("beta", "alpha")).toBe(1);
    expect(compareCodeUnits("alpha", "alpha")).toBe(0);
  });
});

describe("pinned code-unit order", () => {
  it("sorts non-ASCII and astral text by UTF-16 code units", () => {
    expect(
      Arr.sort(
        ["\uFF5E", "a", "\u{1F600}", "Z", "é"],
        Order.make(compareCodeUnits)
      )
    ).toEqual(["Z", "a", "é", "\u{1F600}", "\uFF5E"]);
    expect([
      compareCodeUnits("\u{1F600}", "\uFF5E"),
      compareCodeUnits("é", "a"),
      compareCodeUnits("Z", "a"),
      compareCodeUnits("a", "a"),
    ]).toEqual([-1, 1, -1, 0]);
  });
});
