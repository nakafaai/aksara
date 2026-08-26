import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import type { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { unified } from "unified";
import { createCoordinateLabelPolicy } from "#compiler/label-policy";

const TEST_CONTENT_KEY = ContentKeySchema.make("test:coordinate-label-policy");

/** Parses one MDX fixture and validates its coordinate-label policy. */
const validateLabels = Effect.fn("CoordinateLabelPolicyTest.validateLabels")(
  function* (rawMdx: string) {
    const policy = createCoordinateLabelPolicy(TEST_CONTENT_KEY);
    yield* Effect.promise(() =>
      compile(rawMdx, { remarkPlugins: [policy.remarkPlugin] })
    );
    yield* policy.validate();
  }
);

/** Applies the policy to a prebuilt syntax tree for malformed-node coverage. */
const validateTree = Effect.fn("CoordinateLabelPolicyTest.validateTree")(
  function* (tree: Root) {
    const policy = createCoordinateLabelPolicy(TEST_CONTENT_KEY);
    yield* Effect.promise(() => unified().use(policy.remarkPlugin).run(tree));
    yield* policy.validate();
  }
);

describe("coordinate label policy", () => {
  it.effect.each([
    ["direct JSX text", '<Fixture text="P (0, 0)" />', "P (0, 0)"],
    ["expression JSX text", '<Fixture text={"R(8,0)"} />', "R(8,0)"],
    [
      "object-property text",
      '<Fixture labels={{ point: { text: "(-1.5, +2, .25)" } }} />',
      "(-1.5, +2, .25)",
    ],
    [
      "quoted-property text",
      '<Fixture labels={{ "text": `A1\' (.5, -2)` }} />',
      "A1' (.5, -2)",
    ],
  ] as const)("rejects coordinate notation in %s", ([, rawMdx, text]) =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(validateLabels(rawMdx));
      expect(error).toMatchObject({
        _tag: "AuthoredCoordinateLabelError",
        contentKey: TEST_CONTENT_KEY,
        occurrences: [{ text }],
      });
      if (error._tag === "AuthoredCoordinateLabelError") {
        expect(error.occurrences[0]?.line).toBeGreaterThan(0);
        expect(error.occurrences[0]?.column).toBeGreaterThan(0);
      }
    })
  );

  it.effect("keeps semantic React labels and non-coordinate strings", () =>
    validateLabels(`<Fixture
        text={<>Point <InlineMath math="P(0,0)" /></>}
        labels={{
          arc: { text: "Arc (curved line)" },
          dynamic: { text: \`P (\${1}, 0)\` },
          numeric: { text: 42 },
          computed: { ["text"]: "R(8,0)" },
          rich: { text: <>R <InlineMath math="(8,0)" /></> },
          unrelated: { 1: "P (0, 0)" },
        }}
      />`)
  );

  it.effect("keeps all existing numbered tangent names as prose", () => {
    const labels = [
      "Singgung 1",
      "Singgung 2",
      "Singgung 1",
      "Singgung 2",
      "Tangente 1",
      "Tangente 2",
      "Tangente 1",
      "Tangente 2",
      "Tangent 1",
      "Tangent 2",
      "Tangent 1",
      "Tangent 2",
      "Singgung 1",
      "Singgung 2",
      "Tangente 1",
      "Tangente 2",
      "Tangent 1",
      "Tangent 2",
    ];
    const authored = labels
      .map((text) => `{ text: ${JSON.stringify(text)} }`)
      .join(",");
    return validateLabels(`<Fixture labels={[${authored}]} />`);
  });

  it.effect("ignores non-JSX and malformed JSX nodes", () => {
    const missingAttributes: MdxJsxFlowElement = {
      attributes: [],
      children: [],
      name: "Fixture",
      type: "mdxJsxFlowElement",
    };
    const malformedAttributes: MdxJsxFlowElement = {
      attributes: [],
      children: [],
      name: "Fixture",
      type: "mdxJsxFlowElement",
    };
    Reflect.deleteProperty(missingAttributes, "attributes");
    Reflect.set(malformedAttributes, "attributes", [null, {}, { type: 1 }]);
    return validateTree({
      children: [
        { children: [], type: "paragraph" },
        missingAttributes,
        malformedAttributes,
      ],
      type: "root",
    });
  });

  it.effect("normalizes missing locations in valid attached programs", () => {
    const element: MdxJsxFlowElement = {
      attributes: [],
      children: [],
      name: "Fixture",
      type: "mdxJsxFlowElement",
    };
    const directText = {
      name: "text",
      type: "mdxJsxAttribute",
      value: "P (0, 0)",
    };
    const emptyTextProgram = {
      data: {
        estree: { body: [], sourceType: "module", type: "Program" },
      },
      name: "text",
      type: "mdxJsxAttribute",
      value: null,
    };
    const declarationTextProgram = {
      data: {
        estree: {
          body: [
            { declarations: [], kind: "const", type: "VariableDeclaration" },
          ],
          sourceType: "module",
          type: "Program",
        },
      },
      name: "text",
      type: "mdxJsxAttribute",
      value: null,
    };
    const objectTextProgram = {
      data: {
        estree: {
          body: [
            {
              expression: {
                properties: [
                  {
                    computed: false,
                    key: { name: "text", type: "Identifier" },
                    kind: "init",
                    method: false,
                    shorthand: false,
                    type: "Property",
                    value: {
                      raw: '"R(8,0)"',
                      type: "Literal",
                      value: "R(8,0)",
                    },
                  },
                ],
                type: "ObjectExpression",
              },
              type: "ExpressionStatement",
            },
          ],
          sourceType: "module",
          type: "Program",
        },
      },
      name: "labels",
      type: "mdxJsxAttribute",
      value: null,
    };
    const literalTextProgram = {
      data: {
        estree: {
          body: [
            {
              expression: {
                raw: '"(-1, 2)"',
                type: "Literal",
                value: "(-1, 2)",
              },
              type: "ExpressionStatement",
            },
          ],
          sourceType: "module",
          type: "Program",
        },
      },
      name: "text",
      type: "mdxJsxAttribute",
      value: null,
    };
    const valueWithoutProgram = {
      name: "labels",
      type: "mdxJsxAttribute",
      value: { type: "mdxJsxAttributeValueExpression", value: "" },
    };
    const namespacedName = {
      name: { local: "text", namespace: "test" },
      type: "mdxJsxAttribute",
      value: null,
    };
    const expressionAttribute = {
      type: "mdxJsxExpressionAttribute",
      value: "",
    };
    Reflect.set(element, "attributes", [
      directText,
      emptyTextProgram,
      declarationTextProgram,
      objectTextProgram,
      literalTextProgram,
      valueWithoutProgram,
      namespacedName,
      expressionAttribute,
    ]);

    return Effect.gen(function* () {
      const error = yield* Effect.flip(
        validateTree({ children: [element], type: "root" })
      );
      expect(error).toMatchObject({
        occurrences: [
          { column: 1, line: 1, text: "P (0, 0)" },
          { column: 1, line: 1, text: "R(8,0)" },
          { column: 1, line: 1, text: "(-1, 2)" },
        ],
      });
    });
  });
});
