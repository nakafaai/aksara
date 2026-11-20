import { assert, describe, it } from "@effect/vitest";
import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import {
  createAnchorPolicy,
  headingAnchor,
  headingLabel,
  headingWords,
} from "#compiler/policy/anchor";

const TEST_CONTENT_KEY = ContentKeySchema.make("test:anchor-policy");

/** Compiles one fixture and applies the anchor policy through its Effect seam. */
const validateAnchors = Effect.fn("AnchorPolicyTest.validateAnchors")(
  function* (rawMdx: string) {
    const policy = createAnchorPolicy(TEST_CONTENT_KEY);
    yield* Effect.promise(() =>
      compile(rawMdx, { remarkPlugins: [policy.remarkPlugin] })
    );
    yield* policy.validate();
  }
);

describe("headingLabel", () => {
  it("keeps the source of inline and block math components", () => {
    assert.strictEqual(
      headingLabel('Area <InlineMath math="A" /> circle'),
      "Area A circle"
    );
    assert.strictEqual(headingLabel('<BlockMath math="x^2" />'), "x^2");
  });

  it("names a code block, removes markup, and keeps LaTeX command names", () => {
    assert.strictEqual(
      headingLabel("Example <CodeBlock data={[]} />"),
      "Example [Code]"
    );
    assert.strictEqual(
      headingLabel("<strong>Sudut</strong> \\alpha"),
      "Sudut alpha"
    );
    assert.strictEqual(headingLabel(""), "");
  });
});

describe("headingAnchor", () => {
  it("slugs the readable label as nakafa.com does", () => {
    assert.strictEqual(
      headingAnchor('Area <InlineMath math="A" /> Circle'),
      "area-a-circle"
    );
    assert.strictEqual(headingAnchor("Sudut   Pusat"), "sudut-pusat");
  });
});

describe("headingWords", () => {
  it("reads text, inline code, and literal math props, and nothing else", () => {
    assert.strictEqual(
      headingWords({
        children: [
          { type: "text", value: "Nilai " },
          { attributes: [], type: "mdxJsxTextElement" },
          { type: "mdxJsxTextElement" },
          {
            attributes: [{ name: "math", value: { type: "expression" } }],
            type: "mdxJsxTextElement",
          },
          { children: "not a list", type: "emphasis" },
          { type: "text" },
          { value: "no type" },
          { type: "inlineCode", value: "x" },
          { type: "mdxTextExpression", value: "y" },
        ],
        type: "heading",
      }),
      "Nilai x"
    );
  });
});

describe("createAnchorPolicy", () => {
  it.effect("accepts headings whose anchors all differ", () =>
    validateAnchors(`## Sudut Pusat

### Sudut Keliling

## Sudut <InlineMath math="\\alpha" /> dan Busur`)
  );

  it.effect(
    "rejects headings that differ only in case, spacing, or markup",
    () =>
      Effect.gen(function* () {
        const error = yield* Effect.flip(
          validateAnchors(`## Sudut Pusat

Text.

### sudut   pusat

## **Sudut** Pusat

## Nilai <InlineMath math="x" />

### Nilai \`x\`

## Nilai x`)
        );

        assert.strictEqual(error._tag, "AuthoredHeadingAnchorError");
        assert.deepStrictEqual(error.occurrences, [
          { anchor: "sudut-pusat", column: 1, firstLine: 1, line: 5 },
          { anchor: "sudut-pusat", column: 1, firstLine: 1, line: 7 },
          { anchor: "nilai-x", column: 1, firstLine: 9, line: 11 },
          { anchor: "nilai-x", column: 1, firstLine: 9, line: 13 },
        ]);
      })
  );

  it.effect("reads a JSX child without a math prop by its words", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(
        validateAnchors(`## Nilai <Highlight tone="soft">Rata-rata</Highlight>

## Nilai Rata-rata`)
      );

      assert.deepStrictEqual(error.occurrences, [
        { anchor: "nilai-rata-rata", column: 1, firstLine: 1, line: 3 },
      ]);
    })
  );

  it.effect("ignores empty headings and uses fallback positions", () =>
    Effect.gen(function* () {
      const tree: Root = {
        children: [
          { children: [], depth: 2, type: "heading" },
          { children: [], depth: 2, type: "heading" },
          {
            children: [{ type: "text", value: "Same" }, { type: "break" }],
            depth: 2,
            type: "heading",
          },
          {
            children: [{ type: "text", value: "same" }],
            depth: 3,
            type: "heading",
          },
        ],
        type: "root",
      };
      const policy = createAnchorPolicy(TEST_CONTENT_KEY);
      yield* Effect.promise(() => unified().use(policy.remarkPlugin).run(tree));
      const error = yield* Effect.flip(policy.validate());

      assert.deepStrictEqual(error.occurrences, [
        { anchor: "same", column: 1, firstLine: 1, line: 1 },
      ]);
    })
  );
});
