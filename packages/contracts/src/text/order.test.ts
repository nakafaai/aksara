import { describe, expect, it } from "vitest";
import { compareCodeUnits } from "#contracts/text/order";

describe("code-unit ordering", () => {
  it("orders text without locale or ICU behavior", () => {
    expect(compareCodeUnits("alpha", "beta")).toBe(-1);
    expect(compareCodeUnits("beta", "alpha")).toBe(1);
    expect(compareCodeUnits("alpha", "alpha")).toBe(0);
  });
});
