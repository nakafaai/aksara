import { describe, expect, it } from "vitest";
import { resolveColor } from "#compiler/normalize/color";
import type { StaticValue } from "#compiler/normalize/value";

describe("color migration macro", () => {
  it("resolves exact Nakafa palette and fixed colors", () => {
    expect(resolveColor(["CYAN"])).toBe("#0891b2");
    expect(resolveColor(["WHITE"])).toBe("#ffffff");
  });

  it.each([[[]], [["UNKNOWN"]], [[1]], [["CYAN", 500]]] satisfies readonly [
    readonly StaticValue[],
  ][])("rejects unsupported arguments %s", (arguments_) => {
    expect(resolveColor(arguments_)).toBeUndefined();
  });
});
