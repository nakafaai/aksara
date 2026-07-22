import type { Node as UnistNode } from "unist";
import { describe, expect, it } from "vitest";
import { readNodeProgram } from "#compiler/ast/program";

describe("readNodeProgram", () => {
  it("returns a structurally valid attached ESTree program", () => {
    const program = { body: [], sourceType: "module", type: "Program" };
    expect(
      readNodeProgram({ data: { estree: program }, type: "protocol" })
    ).toBe(program);
  });

  it.each([
    { type: "protocol" },
    { data: { estree: null }, type: "protocol" },
    { data: { estree: { body: [], type: "Expression" } }, type: "protocol" },
    { data: { estree: { body: null, type: "Program" } }, type: "protocol" },
  ] satisfies readonly UnistNode[])("rejects invalid attached data", (node) => {
    expect(readNodeProgram(node)).toBeUndefined();
  });
});
