import { compile } from "@mdx-js/mdx";
import type { Root } from "mdast";
import { describe, expect, it } from "vitest";
import type { UnsupportedMdxModuleOccurrence } from "#compiler/errors";
import { collectUnsupportedMdxModules } from "#compiler/module-policy";

/** Parses MDX and returns the redacted unsupported-module occurrences. */
async function inspectModules(rawMdx: string) {
  const occurrences: UnsupportedMdxModuleOccurrence[] = [];
  await compile(rawMdx, {
    remarkPlugins: [
      () => (tree) => collectUnsupportedMdxModules(tree, occurrences),
    ],
  });
  return occurrences;
}

describe("collectUnsupportedMdxModules", () => {
  it.each([
    ['import value from "fixture"', "import"],
    ["export const value = true", "export"],
    ['export * from "fixture"', "export"],
    ["export default true", "export"],
    ['import value from "fixture"\nexport { value }', "mixed"],
  ] as const)("classifies %s modules", async (rawMdx, kind) => {
    await expect(inspectModules(rawMdx)).resolves.toEqual([
      { column: 1, kind, line: 1 },
    ]);
  });

  it("keeps non-module children and redacts incomplete module data", () => {
    const tree: Root = {
      children: [
        {
          children: [{ type: "text", value: "Visible body" }],
          type: "paragraph",
        },
        { type: "mdxjsEsm", value: "unparsed source" },
        {
          data: {
            estree: {
              body: [
                {
                  expression: { raw: "true", type: "Literal", value: true },
                  type: "ExpressionStatement",
                },
              ],
              sourceType: "module",
              type: "Program",
            },
          },
          type: "mdxjsEsm",
          value: "true",
        },
      ],
      type: "root",
    };
    const occurrences: UnsupportedMdxModuleOccurrence[] = [];

    collectUnsupportedMdxModules(tree, occurrences);

    expect(tree.children).toHaveLength(3);
    expect(occurrences).toEqual([
      { column: 1, kind: "unknown", line: 1 },
      { column: 1, kind: "unknown", line: 1 },
    ]);
  });
});
