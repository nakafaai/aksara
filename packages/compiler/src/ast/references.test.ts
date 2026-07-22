import { createProcessor } from "@mdx-js/mdx";
import { describe, expect, it } from "vitest";
import { readNodeProgram } from "#compiler/ast/program";
import { readFreeReferences } from "#compiler/ast/references";

/** Reads the expression program parsed by the official MDX processor. */
function expressionProgram(rawMdx: string) {
  const tree = createProcessor().parse(rawMdx);
  const node = tree.children.find(
    (child) => child.type === "mdxFlowExpression"
  );
  const program = node ? readNodeProgram(node) : undefined;
  if (!program) {
    throw new Error("Expected one parsed MDX expression program.");
  }
  return program;
}

describe("readFreeReferences", () => {
  it("returns exact free references without local shadows or object keys", () => {
    const program = expressionProgram(
      "{(() => { const helper = 1; return { helper, macro: macro(1) } })()}"
    );
    expect(readFreeReferences(program).map(({ name }) => name)).toEqual([
      "macro",
    ]);
    expect(readFreeReferences(expressionProgram("{<Widget />}"))).toEqual([]);
  });
});
