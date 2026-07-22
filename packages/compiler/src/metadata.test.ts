import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafaai/aksara-contracts/ids";
import { Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import { describe, expect, it } from "vitest";
import {
  extractMetadata,
  type MetadataCollector,
  validateMetadata,
} from "#compiler/metadata";

const VALID_METADATA = "export const metadata = {}";
const contentKey = ContentKeySchema.make("test:metadata");

/** Compiles test MDX and returns the metadata captured by the plugin. */
async function collectMetadata(rawMdx: string) {
  const collector: MetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  const output = await compile(rawMdx, {
    outputFormat: "function-body",
    remarkPlugins: [extractMetadata(collector)],
  });
  return { collector, output: String(output) };
}

/** Returns the typed validation failure for one invalid metadata fixture. */
async function rejectMetadata(rawMdx: string) {
  const { collector } = await collectMetadata(rawMdx);
  return Effect.runPromise(
    validateMetadata(contentKey, collector).pipe(Effect.flip)
  );
}

/** Runs metadata extraction directly against a typed MDX tree fixture. */
async function collectTree(tree: Root) {
  const collector: MetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  const output = await unified().use(extractMetadata(collector)).run(tree);
  return { collector, output };
}

describe("authored metadata", () => {
  it("accepts one static object and removes it from compiled output", async () => {
    const { collector, output } = await collectMetadata(
      `export const metadata = {
        title: "Test",
        "published": true,
        count: 1,
        optional: null,
        nested: [{ enabled: false }, ["value"]],
      }\n\n## Test`
    );

    await expect(
      Effect.runPromise(validateMetadata(contentKey, collector))
    ).resolves.toEqual({
      count: 1,
      nested: [{ enabled: false }, ["value"]],
      optional: null,
      published: true,
      title: "Test",
    });
    expect(output).not.toContain("metadata");
  });

  it("requires exactly one authored metadata export", async () => {
    const missing = await rejectMetadata("## Test");
    const duplicate = await rejectMetadata(
      `${VALID_METADATA}\n\n${VALID_METADATA}`
    );

    expect(missing._tag).toBe("AuthoredMetadataMissingError");
    expect(duplicate._tag).toBe("AuthoredMetadataDuplicateError");
  });

  it("handles incomplete ESTree metadata without an implicit fallback", async () => {
    const missingProgram = await collectTree({
      children: [{ type: "mdxjsEsm", value: VALID_METADATA }],
      type: "root",
    });
    const missingInitializer = await collectTree({
      children: [
        {
          data: {
            estree: {
              body: [
                {
                  attributes: [],
                  declaration: {
                    declarations: [
                      {
                        id: { name: "metadata", type: "Identifier" },
                        init: null,
                        type: "VariableDeclarator",
                      },
                    ],
                    kind: "const",
                    type: "VariableDeclaration",
                  },
                  source: null,
                  specifiers: [],
                  type: "ExportNamedDeclaration",
                },
              ],
              sourceType: "module",
              type: "Program",
            },
          },
          type: "mdxjsEsm",
          value: VALID_METADATA,
        },
      ],
      type: "root",
    });

    expect(missingProgram.collector).toEqual({
      candidates: [],
      syntaxReasons: [],
    });
    expect(missingProgram.output.children).toHaveLength(1);
    expect(missingInitializer.collector.syntaxReasons).toEqual([
      "invalid-declaration",
    ]);
    expect(missingInitializer.output.children).toHaveLength(0);
  });

  it.each([
    ["dynamic-value", "export const metadata = getMetadata()"],
    ["dynamic-value", "export const metadata = /pattern/"],
    ["dynamic-value", "export const metadata = [getMetadata()]"],
    ["array-hole", "export const metadata = { values: [,] }"],
    ["spread", "export const metadata = { values: [...[]] }"],
    ["computed-property", 'export const metadata = { ["key"]: "value" }'],
    ["spread", "export const metadata = { ...{} }"],
    ["unsupported-property", "export const metadata = { method() {} }"],
    ["unsupported-property", "export const metadata = { get title() {} }"],
    ["unsupported-property", "export const metadata = { 1: true }"],
    ["duplicate-property", "export const metadata = { title: 1, title: 2 }"],
    ["invalid-declaration", "export let metadata = {}"],
    ["invalid-declaration", "export const metadata = {}, extra = 1"],
    ["mixed-metadata-module", `${VALID_METADATA}; export function hidden() {}`],
    ["mixed-metadata-module", `${VALID_METADATA}; export default true`],
    ["mixed-metadata-module", `${VALID_METADATA}; export const hidden = true`],
    ["metadata-not-object", 'export const metadata = "invalid"'],
  ])("rejects %s metadata syntax", async (reason, rawMdx) => {
    const error = await rejectMetadata(rawMdx);

    expect(error._tag).toBe("AuthoredMetadataSyntaxError");
    if (error._tag === "AuthoredMetadataSyntaxError") {
      expect(error.reasons).toContain(reason);
    }
  });
});
