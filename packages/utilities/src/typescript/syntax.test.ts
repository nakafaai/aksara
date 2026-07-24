import { describe, expect, it } from "vitest";
import { hasTypeScriptSyntaxError } from "#utilities/typescript/syntax";

describe("TypeScript syntax", () => {
  it("distinguishes valid modules from parser errors", () => {
    expect(
      hasTypeScriptSyntaxError(
        'import type { ReactNode } from "react";\nexport const value: ReactNode = null;',
        "valid.ts"
      )
    ).toBe(false);
    expect(
      hasTypeScriptSyntaxError("export const value = {;", "invalid.ts")
    ).toBe(true);
  });
});
