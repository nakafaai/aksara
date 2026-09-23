import { assert, describe, it } from "@effect/vitest";
import { compile } from "@mdx-js/mdx";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import { createHeadingPolicy } from "#compiler/heading-policy";

const TEST_SOURCE_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/material/lesson/test/en.mdx"
);

const TEST_CONTENT_KEY = ContentKeySchema.make("test:heading-policy");

/** Compiles one fixture and applies the heading policy through its Effect seam. */
const validateHeadings = Effect.fn("HeadingPolicyTest.validateHeadings")(
  function* (rawMdx: string, sourcePath = TEST_SOURCE_PATH) {
    const policy = createHeadingPolicy(TEST_CONTENT_KEY, sourcePath);
    yield* Effect.promise(() =>
      compile(rawMdx, { remarkPlugins: [policy.remarkPlugin] })
    );
    yield* policy.validate();
  }
);

/** Applies the heading policy to one prebuilt MDX tree. */
const validateHeadingTree = Effect.fn("HeadingPolicyTest.validateHeadingTree")(
  function* (tree: Root) {
    const policy = createHeadingPolicy(TEST_CONTENT_KEY, TEST_SOURCE_PATH);
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

describe("authored heading depth", () => {
  it.effect.each([
    "## Exercises\n\n### Solutions\n\n#### Subproblem",
    "##### Deep section",
    "###### Deepest section",
    "<h4>Deep section</h4>",
    "Text <h5>Deep section</h5>",
    "{<h4>Deep section</h4>}",
    "<Panel title={<h6>Deep section</h6>} />",
    "<Panel {...{title: <h4>Deep section</h4>}} />",
  ])("rejects Markdown and JSX depth in both authored genres: %s", (rawMdx) =>
    Effect.gen(function* () {
      for (const sourcePath of [
        TEST_SOURCE_PATH,
        CorpusSourcePathSchema.make("packages/corpus/articles/test/en.mdx"),
      ]) {
        const error = yield* Effect.flip(validateHeadings(rawMdx, sourcePath));
        assert.strictEqual(error._tag, "AuthoredHeadingDepthError");
        assert.strictEqual(error.occurrences.length, 1);
        assert.isTrue(error.occurrences.every(({ depth }) => depth > 3));
      }
    })
  );
  it.effect("preserves question-bank answer nesting and fenced examples", () =>
    Effect.gen(function* () {
      yield* validateHeadings(
        "#### Answer\n\n##### Subcase",
        CorpusSourcePathSchema.make(
          "packages/corpus/question-bank/test/answer.en.mdx"
        )
      );
      yield* validateHeadings(
        "## Concept\n\n### Subconcept\n\n<h3>Detail</h3>\n\n{<h2>Section</h2>}\n\n<Panel title={2} />\n\n```md\n#### Example\n```"
      );
      yield* validateHeadings("<Panel title={<UI.Title>Detail</UI.Title>} />");
      yield* validateHeadings("<>Section</>");
    })
  );
  it.effect("reports fallback locations for unpositioned deep headings", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(
        validateHeadingTree({
          children: [
            {
              children: [{ type: "text", value: "Deep section" }],
              depth: 4,
              type: "heading",
            },
            {
              attributes: [],
              children: [],
              name: "h4",
              type: "mdxJsxFlowElement",
            },
            {
              data: {
                estree: {
                  body: [
                    {
                      expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                          attributes: [],
                          name: { name: "h5", type: "JSXIdentifier" },
                          selfClosing: true,
                          type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                      },
                      type: "ExpressionStatement",
                    },
                  ],
                  sourceType: "module",
                  type: "Program",
                },
              },
              type: "mdxFlowExpression",
              value: "<h5 />",
            },
          ],
          type: "root",
        })
      );
      assert.deepStrictEqual(error.occurrences, [
        { column: 1, depth: 4, line: 1 },
        { column: 1, depth: 4, line: 1 },
        { column: 1, depth: 5, line: 1 },
      ]);
    })
  );
});
