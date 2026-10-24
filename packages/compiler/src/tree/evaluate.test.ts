import { NodeServices } from "@effect/platform-node";
import { assert, describe, it, layer } from "@effect/vitest";
import { compile } from "@mdx-js/mdx";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { canonicalizeContentTree } from "@nakafa/aksara-contracts/tree";
import { Effect } from "effect";
import {
  COMPILE_OPTIONS,
  componentNamesOf,
  dataComputingDocuments,
  referenceTree,
} from "#compiler/test/reference";
import { evaluateContentTree } from "#compiler/tree/evaluate";

const input = {
  componentNames: ["InlineMath"],
  contentKey: ContentKeySchema.make("test:evaluate"),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/evaluate/en.mdx"
  ),
};

describe("evaluateContentTree", () => {
  it.effect("evaluates the compiled body once into its fragment tree", () =>
    Effect.gen(function* () {
      const tree = yield* evaluateContentTree({
        ...input,
        compiledCode:
          'const runtime = arguments[0]; return { default: () => runtime.jsx(runtime.Fragment, { children: ["hi"] }) };',
      });

      assert.deepStrictEqual(tree, {
        $node: "element",
        children: ["hi"],
        name: "fragment",
        props: {},
      });
    })
  );

  it.effect("fails with the evaluation error when the body throws", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(
        evaluateContentTree({
          ...input,
          compiledCode:
            'return { default: () => { throw new Error("boom"); } };',
        })
      );

      assert.strictEqual(error._tag, "ContentTreeEvaluationError");
      assert.strictEqual(error.contentKey, input.contentKey);
    })
  );

  it.effect("wraps a single returned element in the fragment root", () =>
    Effect.gen(function* () {
      const tree = yield* evaluateContentTree({
        ...input,
        compiledCode:
          "const runtime = arguments[0]; return { default: () => runtime.jsx('p', { children: 'x' }) };",
      });

      assert.deepStrictEqual(tree, {
        $node: "element",
        children: [{ $node: "element", children: ["x"], name: "p", props: {} }],
        name: "fragment",
        props: {},
      });
    })
  );

  it.effect("fails when the body does not return an element", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(
        evaluateContentTree({
          ...input,
          compiledCode: 'return { default: () => "text" };',
        })
      );

      assert.strictEqual(error._tag, "ContentTreeEvaluationError");
      assert.strictEqual(
        error.message,
        "The compiled document body must return one element."
      );
    })
  );

  it.effect("passes a rejected element through as its policy error", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(
        evaluateContentTree({
          ...input,
          compiledCode:
            "const runtime = arguments[0]; return { default: () => runtime.jsx(runtime.Fragment, { children: [runtime.jsx('span', {})] }) };",
        })
      );

      assert.strictEqual(error._tag, "ContentTreePolicyError");
      if (error._tag === "ContentTreePolicyError") {
        assert.strictEqual(error.reason, "unknown-element");
      }
    })
  );
});

layer(NodeServices.layer)("content tree equivalence", (test) => {
  test.effect(
    "matches the React element model for every data-computing corpus document",
    () =>
      Effect.gen(function* () {
        const documents = yield* dataComputingDocuments;
        assert.isAtLeast(documents.length, 30);
        for (const entry of documents) {
          const sourcePath = CorpusSourcePathSchema.make(entry.sourcePath);
          const compiledCode = String(
            yield* Effect.promise(() => compile(entry.rawMdx, COMPILE_OPTIONS))
          );
          const actual = yield* evaluateContentTree({
            compiledCode,
            componentNames: componentNamesOf(entry.rawMdx),
            contentKey: ContentKeySchema.make(`equivalence:${sourcePath}`),
            sourcePath,
          });
          const expected = yield* referenceTree(entry.rawMdx);
          assert.strictEqual(
            canonicalizeContentTree(actual),
            canonicalizeContentTree(expected),
            sourcePath
          );
        }
      }),
    120_000
  );
});
