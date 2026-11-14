import { assert, describe, it } from "@effect/vitest";
import { compile } from "@mdx-js/mdx";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import { createDiagramPolicy } from "#compiler/policy/diagram";

const CONTENT_KEY = ContentKeySchema.make("test:diagram-policy");
/** Opens a placeholder in an authored template literal. */
const DOLLAR = "$";
const SOURCE_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/material/lesson/test/en.mdx"
);

/** Applies the diagram policy to one MDX fixture. */
const validateDiagrams = Effect.fn("DiagramPolicyTest.validate")(function* (
  rawMdx: string
) {
  const policy = createDiagramPolicy(CONTENT_KEY, SOURCE_PATH);
  yield* Effect.promise(() =>
    compile(rawMdx, { remarkPlugins: [policy.remarkPlugin] })
  );
  yield* policy.validate();
});

describe("createDiagramPolicy", () => {
  it.effect("accepts a document without diagrams", () =>
    validateDiagrams("# Title\n\n<Other />\n")
  );

  it.effect("accepts every static way to write a chart", () =>
    validateDiagrams(
      Arr.join(
        [
          "<Mermaid",
          "  title={<>Shifting and scaling the expected value</>}",
          "  chart={`flowchart LR",
          '  A["C with E(C) = 28"] -->|"times 1.8"| B["1.8C with E = 50.4"]',
          '  B -->|"plus 32"| C["F = 1.8C + 32 with E(F) = 82.4"]`}',
          "/>",
          "",
          '<Mermaid chart="pie title Share" />',
          "",
          '<Mermaid chart={"sequenceDiagram\\n  A->>B: hi"} />',
          "",
          'A sentence with <Mermaid chart="pie title Inline" /> inline.',
          "",
        ],
        "\n"
      )
    )
  );

  it.effect(
    "refuses a chart Mermaid cannot parse at its file line with Mermaid's message",
    () =>
      Effect.gen(function* () {
        const error = yield* Effect.flip(
          validateDiagrams(
            Arr.join(
              [
                "# Expected value",
                "",
                "<Mermaid",
                "  chart={`flowchart LR",
                '  A["C with E("C") = 28"] --> B`}',
                "/>",
                "",
              ],
              "\n"
            )
          )
        );
        assert.strictEqual(error._tag, "DiagramPolicyError");
        assert.strictEqual(error.sourcePath, SOURCE_PATH);
        assert.strictEqual(error.violations.length, 1);
        const [violation] = error.violations;
        assert.strictEqual(violation?.line, 5);
        assert.strictEqual(violation?.column, 3);
        assert.include(violation?.message, "Parse error on line 2");
        assert.isTrue(
          error.message.startsWith(`${SOURCE_PATH}:5:3 Error: Parse error`)
        );
      })
  );

  it.effect("refuses a chart that is not static Mermaid text", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(
        validateDiagrams(
          Arr.join(
            [
              `<Mermaid chart={\`flowchart LR\n  A --> ${DOLLAR}{1}\`} />`,
              "",
              "<Mermaid chart={1} />",
              "",
              "<Mermaid chart={diagram} />",
              "",
              '<Mermaid title="No chart" />',
              "",
              '<Mermaid chart="not a diagram" />',
              "",
            ],
            "\n"
          )
        )
      );
      assert.deepStrictEqual(
        Arr.map(error.violations, ({ line }) => line),
        [1, 4, 6, 8, 10]
      );
      const [dynamic, , , missing, unknown] = Arr.map(
        error.violations,
        ({ message }) => message
      );
      assert.include(dynamic, "static Mermaid text");
      assert.include(missing, "has no chart");
      assert.include(unknown, "UnknownDiagramError: No diagram type detected");
    })
  );

  it.effect("places a diagram without a source position on line 1", () =>
    Effect.gen(function* () {
      const policy = createDiagramPolicy(CONTENT_KEY, SOURCE_PATH);
      const tree: Root = {
        children: [
          {
            attributes: [],
            children: [],
            name: "Mermaid",
            type: "mdxJsxFlowElement",
          },
          {
            attributes: [
              {
                name: "chart",
                type: "mdxJsxAttribute",
                value: {
                  data: {
                    estree: {
                      body: [
                        {
                          expression: {
                            expressions: [],
                            quasis: [
                              {
                                tail: true,
                                type: "TemplateElement",
                                value: { cooked: null, raw: "\\u{" },
                              },
                            ],
                            type: "TemplateLiteral",
                          },
                          type: "ExpressionStatement",
                        },
                      ],
                      sourceType: "module",
                      type: "Program",
                    },
                  },
                  type: "mdxJsxAttributeValueExpression",
                  value: "`\\u{`",
                },
              },
            ],
            children: [],
            name: "Mermaid",
            type: "mdxJsxFlowElement",
          },
        ],
        type: "root",
      };
      yield* Effect.promise(() => unified().use(policy.remarkPlugin).run(tree));
      const error = yield* Effect.flip(policy.validate());
      assert.deepStrictEqual(
        Arr.map(error.violations, ({ column, line }) => ({ column, line })),
        [
          { column: 1, line: 1 },
          { column: 1, line: 1 },
        ]
      );
    })
  );
});
