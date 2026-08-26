import { assert, describe, it } from "@nakafa/testing/effect";
import type { Program } from "estree-jsx";
import type { Node as UnistNode } from "unist";
import { readNodeProgram } from "#compiler/ast/program";

describe("readNodeProgram", () => {
  it("returns a structurally valid attached ESTree program", () => {
    const program = {
      body: [],
      sourceType: "module",
      type: "Program",
    } satisfies Program;
    assert.strictEqual(
      readNodeProgram({ data: { estree: program }, type: "protocol" }),
      program
    );
  });

  it.each([
    { type: "protocol" },
    { data: { estree: null }, type: "protocol" },
    { data: { estree: { body: [], type: "Expression" } }, type: "protocol" },
    { data: { estree: { body: null, type: "Program" } }, type: "protocol" },
  ] satisfies readonly UnistNode[])("rejects invalid attached data", (node) => {
    assert.strictEqual(readNodeProgram(node), undefined);
  });
});
