import { describe, expect, it } from "vitest";
import { countModuleLines, lineViolations } from "#scripts/check-lines";

describe("line policy", () => {
  it("excludes JSDoc-only lines while retaining mixed source lines", () => {
    const source = `/**
 * Explains one callable clearly.
 */
export function documented() {}
/** Inline prose. */ export const value = 1;
`;

    expect(countModuleLines("source.ts", source)).toBe(2);
  });

  it("handles empty and unterminated source text", () => {
    expect(countModuleLines("empty.ts", "")).toBe(0);
    expect(countModuleLines("source.ts", "const value = 1;")).toBe(1);
  });

  it("reports only modules above the 300-line limit", () => {
    const sources = new Map([
      ["allowed.ts", `${"value;\n".repeat(300)}`],
      ["large.ts", `${"value;\n".repeat(301)}`],
    ]);

    expect(
      lineViolations([...sources.keys()], (file) => sources.get(file) ?? "")
    ).toEqual(["large.ts: 301 lines"]);
  });
});
