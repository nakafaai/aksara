import { assert, describe, expect, it } from "@effect/vitest";
import { canonicalizeCompiledContentPayload } from "@nakafa/aksara-contracts/content";
import { digestSha256 } from "@nakafa/aksara-contracts/hash/digest";
import { hashText } from "@nakafa/aksara-contracts/hash/text";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { Array as Arr, Effect } from "effect";
import { Hex } from "effect/encoding";
import { compileContent } from "#compiler/compile";
import {
  compileValidatedContent,
  validateCompileRequest,
} from "#compiler/engine";
import { createTestRendererManifest } from "#compiler/test/content";

describe("validateCompileRequest", () => {
  it.effect("rejects an incomplete renderer even with its correct hash", () =>
    Effect.gen(function* () {
      const live = yield* createTestRendererManifest({
        components: ["BlockMath"],
      });
      const domains = Arr.filter(live.domains, ({ name }) => name !== "site");
      const contract = {
        base: live.base,
        domains,
        publishedDomains: live.publishedDomains,
      };
      const incomplete = {
        ...live,
        domains,
        hash: yield* hashText(canonicalizeRendererManifestContract(contract)),
      };
      const error = yield* validateCompileRequest({
        artifactLocale: "en",
        contentKey: "test:engine",
        rawMdx: "export const metadata = {}",
        rendererDomain: "mathematics",
        rendererManifest: incomplete,
        sourcePath: "packages/corpus/test/engine/en.mdx",
      }).pipe(Effect.flip);
      assert.strictEqual(error._tag, "ContractDecodeError");
    })
  );
});

describe("compileValidatedContent", () => {
  it.effect(
    "pins the canonical payload of an out-of-order component document",
    () =>
      Effect.gen(function* () {
        const rendererManifest = yield* createTestRendererManifest({
          components: ["BlockMath", "InlineMath", "MathVisual"],
          domains: {
            chemistry: ["AtomShellLab"],
            mathematics: ["FunctionMachine"],
          },
        });
        const request = yield* validateCompileRequest({
          artifactLocale: "id",
          contentKey: "test:engine-vector",
          rawMdx: `export const metadata = {
  ratio: 0.1,
  title: "Pelajaran é ✓ 数学",
  tags: ["aljabar", { level: 2 }],
}

## Pelajaran é ✓ 数学

<InlineMath math="x" />

<BlockMath math="y" />`,
          rendererDomain: "mathematics",
          rendererManifest,
          sourcePath: "packages/corpus/test/engine/id.mdx",
        });
        const { metadata, payload } = yield* compileValidatedContent(request);
        expect(metadata).toMatchInlineSnapshot(`
          {
            "ratio": 0.1,
            "tags": [
              "aljabar",
              {
                "level": 2,
              },
            ],
            "title": "Pelajaran é ✓ 数学",
          }
        `);
        expect(payload.requiredComponents).toMatchInlineSnapshot(`
          [
            "BlockMath",
            "InlineMath",
          ]
        `);
        expect(payload.plainText).toMatchInlineSnapshot(`"Pelajaran é ✓ 数学"`);
        expect(
          Hex.encode(
            yield* digestSha256(
              new TextEncoder().encode(
                canonicalizeCompiledContentPayload(payload)
              )
            )
          )
        ).toMatchInlineSnapshot(
          `"d637147adc343c5e4a561ca8c688b2b300db0a559ad6995b0a66610287249fe1"`
        );
      })
  );
});

const rendererManifest = createTestRendererManifest({
  components: ["BlockMath", "InlineMath", "MathVisual"],
  domains: {
    chemistry: ["AtomShellLab"],
    mathematics: ["FunctionMachine"],
  },
});

/** Compiles one document body under a metadata declaration and returns its typed failure. */
const rejectDocument = Effect.fn("TreeTest.rejectDocument")(function* (
  body: string
) {
  const manifest = yield* rendererManifest;
  return yield* Effect.flip(
    compileContent({
      artifactLocale: "id",
      contentKey: "test:serialize-document",
      rawMdx: `export const metadata = {}\n\n${body}`,
      rendererDomain: "mathematics",
      rendererManifest: manifest,
      sourcePath: "packages/corpus/test/serialize/en.mdx",
    })
  );
});

describe("compileContent policy for the content tree", () => {
  it.effect.each([
    {
      body: '<InlineMath math="x" data={() => 1} />',
      prop: "data",
      reason: "not-json",
    },
    {
      body: '<InlineMath math="x" data={0 / 0} />',
      prop: "data",
      reason: "non-finite-number",
    },
    {
      body: '<InlineMath math="x" data={{ $node: "x" }} />',
      prop: "data",
      reason: "reserved-key",
    },
    {
      body: '<InlineMath math="x" data={{ nested: { $node: "x" } }} />',
      prop: "data.nested",
      reason: "reserved-key",
    },
    {
      body: '<InlineMath math="x" data={[1, () => 2]} />',
      prop: "data[1]",
      reason: "not-json",
    },
    {
      body: '<InlineMath math="x">{{ a: 1 }}</InlineMath>',
      prop: "children",
      reason: "unsupported-child",
    },
    { body: "<span>text</span>", prop: null, reason: "unknown-element" },
  ])("rejects $reason at $prop of $body", ({ body, prop, reason }) =>
    Effect.gen(function* () {
      const error = yield* rejectDocument(body);
      assert.strictEqual(error._tag, "ContentTreePolicyError");
      if (error._tag === "ContentTreePolicyError") {
        assert.strictEqual(error.reason, reason);
        assert.strictEqual(error.prop, prop);
        assert.strictEqual(
          error.sourcePath,
          "packages/corpus/test/serialize/en.mdx"
        );
      }
    })
  );

  it.effect("omits an undefined prop from the tree, as React does", () =>
    Effect.gen(function* () {
      const manifest = yield* rendererManifest;
      const result = yield* compileContent({
        artifactLocale: "id",
        contentKey: "test:undefined-prop",
        rawMdx:
          'export const metadata = {}\n\n<InlineMath math="x" data={undefined} />',
        rendererDomain: "mathematics",
        rendererManifest: manifest,
        sourcePath: "packages/corpus/test/serialize/en.mdx",
      });
      assert.deepStrictEqual(result.payload.contentTree.children, [
        {
          $node: "element",
          children: [],
          name: "InlineMath",
          props: { math: "x" },
        },
      ]);
    })
  );

  it.effect("wraps a failing authored expression as an evaluation error", () =>
    Effect.gen(function* () {
      const error = yield* rejectDocument(
        '<InlineMath math="x" data={JSON.parse("{")} />'
      );
      assert.strictEqual(error._tag, "ContentTreeEvaluationError");
    })
  );
});
