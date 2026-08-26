import { assert, describe, it } from "@effect/vitest";
import { compile, createProcessor } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import {
  extractMetadata,
  type MetadataCollector,
  readMetadataDocument,
  validateMetadata,
} from "#compiler/metadata";

const VALID_METADATA = "export const metadata = {}";
const contentKey = ContentKeySchema.make("test:metadata");

/** Compiles test MDX and returns metadata captured by the remark plugin. */
const collectMetadata = Effect.fn("MetadataTest.collectMetadata")(function* (
  rawMdx: string
) {
  const collector: MetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  const output = yield* Effect.promise(() =>
    compile(rawMdx, {
      outputFormat: "function-body",
      remarkPlugins: [extractMetadata(collector)],
    })
  );
  return { collector, output: String(output) };
});

/** Returns the typed validation failure for one invalid metadata fixture. */
const rejectMetadata = Effect.fn("MetadataTest.rejectMetadata")(function* (
  rawMdx: string
) {
  const { collector } = yield* collectMetadata(rawMdx);
  return yield* Effect.flip(validateMetadata(contentKey, collector));
});

/** Runs metadata extraction directly against a typed MDX tree fixture. */
const collectTree = Effect.fn("MetadataTest.collectTree")(function* (
  tree: Root
) {
  const collector: MetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  const output = yield* Effect.promise(() =>
    unified().use(extractMetadata(collector)).run(tree)
  );
  return { collector, output };
});

/** Parses one valid test fixture through the installed MDX processor. */
const parseMdx = Effect.fn("MetadataTest.parseMdx")((rawMdx: string) =>
  Effect.try(() => createProcessor({ format: "mdx" }).parse(rawMdx))
);

describe("authored metadata", () => {
  it.effect("accepts one static object and removes it from output", () =>
    Effect.gen(function* () {
      const { collector, output } = yield* collectMetadata(
        `export const metadata = {
          title: "Test",
          "published": true,
          count: 1,
          optional: null,
          nested: [{ enabled: false }, ["value"]],
        }\n\n## Test`
      );
      const metadata = yield* validateMetadata(contentKey, collector);
      assert.deepStrictEqual(metadata, {
        count: 1,
        nested: [{ enabled: false }, ["value"]],
        optional: null,
        published: true,
        title: "Test",
      });
      assert.ok(!output.includes("metadata"));
    })
  );

  it.effect("requires exactly one authored metadata export", () =>
    Effect.gen(function* () {
      const missing = yield* rejectMetadata("## Test");
      const duplicate = yield* rejectMetadata(
        `${VALID_METADATA}\n\n${VALID_METADATA}`
      );
      assert.strictEqual(missing._tag, "AuthoredMetadataMissingError");
      assert.strictEqual(duplicate._tag, "AuthoredMetadataDuplicateError");
    })
  );

  it.effect("does not invent missing metadata source offsets", () =>
    Effect.gen(function* () {
      const tree = yield* parseMdx(VALID_METADATA);
      const document = yield* readMetadataDocument(contentKey, {
        ...tree,
        children: tree.children.map(({ position: _position, ...node }) => node),
      });
      assert.deepStrictEqual(document.metadata, {});
      assert.strictEqual(document.sourceRange, undefined);
      assert.deepStrictEqual(document.bodyTree.children, []);
    })
  );

  it.effect("returns the body tree without the metadata module", () =>
    Effect.gen(function* () {
      const rawMdx = `export const note = "x"\n\n${VALID_METADATA}`;
      const tree = yield* parseMdx(rawMdx);
      const document = yield* readMetadataDocument(contentKey, tree);
      const start = rawMdx.indexOf(VALID_METADATA);
      assert.deepStrictEqual(document.metadata, {});
      assert.deepStrictEqual(document.sourceRange, {
        end: start + VALID_METADATA.length,
        source: VALID_METADATA,
        start,
      });
      assert.strictEqual(document.bodyTree.children.length, 1);
      assert.strictEqual(document.bodyTree.children[0]?.type, "mdxjsEsm");
    })
  );

  it.effect("handles incomplete ESTree metadata without fallback", () =>
    Effect.gen(function* () {
      const missingProgram = yield* collectTree({
        children: [{ type: "mdxjsEsm", value: VALID_METADATA }],
        type: "root",
      });
      const missingInitializer = yield* collectTree({
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
      assert.deepStrictEqual(missingProgram.collector, {
        candidates: [],
        syntaxReasons: [],
      });
      assert.strictEqual(missingProgram.output.children.length, 1);
      assert.deepStrictEqual(missingInitializer.collector.syntaxReasons, [
        "invalid-declaration",
      ]);
      assert.strictEqual(missingInitializer.output.children.length, 0);
    })
  );

  it.effect.each([
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
  ] as const)("rejects %s metadata syntax", ([reason, rawMdx]) =>
    Effect.gen(function* () {
      const error = yield* rejectMetadata(rawMdx);
      assert.strictEqual(error._tag, "AuthoredMetadataSyntaxError");
      if (error._tag === "AuthoredMetadataSyntaxError") {
        assert.ok(error.reasons.includes(reason));
      }
    })
  );
});
