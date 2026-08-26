import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { assert, describe, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import { createHeadingPolicy } from "#compiler/heading-policy";

const TEST_CONTENT_KEY = ContentKeySchema.make("test:heading-policy");

/** Compiles one fixture and applies the heading policy through its Effect seam. */
const validateHeadings = Effect.fn("HeadingPolicyTest.validateHeadings")(
  function* (rawMdx: string) {
    const policy = createHeadingPolicy(TEST_CONTENT_KEY);
    yield* Effect.promise(() =>
      compile(rawMdx, { remarkPlugins: [policy.remarkPlugin] })
    );
    yield* policy.validate();
  }
);

/** Applies the heading policy to one prebuilt MDX tree. */
const validateHeadingTree = Effect.fn("HeadingPolicyTest.validateHeadingTree")(
  function* (tree: Root) {
    const policy = createHeadingPolicy(TEST_CONTENT_KEY);
    yield* Effect.promise(() => unified().use(policy.remarkPlugin).run(tree));
    yield* policy.validate();
  }
);

describe("createHeadingPolicy", () => {
  it.effect.each([
    ["1. First item", "1."],
    ["2) Second item", "2)"],
    ["3: Third item", "3:"],
    ["(4) Fourth item", "(4)"],
    ["A. First option", "A."],
    ["b) Second option", "b)"],
    ["C: Third option", "C:"],
    ["(d) Fourth option", "(d)"],
    ["- Bullet item", "-"],
    ["+ Bullet item", "+"],
    ["* Bullet item", "*"],
    ["• Bullet item", "•"],
  ] as const)("rejects the %s heading marker", ([heading, marker]) =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(validateHeadings(`#### ${heading}`));
      assert.deepStrictEqual(error.occurrences, [
        { column: 1, depth: 4, line: 1, marker },
      ]);
    })
  );

  it.effect("keeps real headings, Markdown lists, and fenced examples", () =>
    validateHeadings(`## Base 10 logarithms

1. First list item
2. Second list item

\`\`\`md
#### 1. Example heading
\`\`\``)
  );

  it.effect("uses stable fallback positions for an unpositioned tree", () =>
    Effect.gen(function* () {
      const tree: Root = {
        children: [
          {
            children: [{ type: "text", value: "1. First item" }],
            depth: 2,
            type: "heading",
          },
        ],
        type: "root",
      };
      const error = yield* Effect.flip(validateHeadingTree(tree));
      assert.deepStrictEqual(error.occurrences, [
        { column: 1, depth: 2, line: 1, marker: "1." },
      ]);
    })
  );
});
