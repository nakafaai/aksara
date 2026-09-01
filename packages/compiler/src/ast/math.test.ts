import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import type { Program } from "estree-jsx";
import type { Root } from "mdast";
import { unified } from "unified";
import { createMathVisualPolicy } from "#compiler/math-policy";
import {
  planeScene,
  rejectMathVisual,
  TEST_MATH_CONTENT_KEY,
  validateMathSource,
  validateMathVisual,
} from "#compiler/test/math";

describe("MathVisual authored syntax", () => {
  it.effect("accepts the exact prop-only surface with rich labels", () =>
    validateMathSource(`<MathVisual
      title={<>A diagonal</>}
      description={<>The point <InlineMath math="A" /> lies on the line.</>}
      scene={${planeScene(
        'labels: [{ key: "point-a", at: { x: 0, y: 0 }, placement: "above" }],'
      )}}
      labels={{ "point-a": <>Point <InlineMath math="A" /></> }}
    />`)
  );

  it.effect.each([
    ["scene-array-hole", "{ objects: [,] }"],
    ["scene-spread", "{ objects: [...[]] }"],
    ["scene-dynamic-value", "{ objects: [getObject()] }"],
    ["scene-computed-property", '{ ["space"]: "plane" }'],
    ["scene-duplicate-property", '{ space: "plane", space: "space" }'],
    ["scene-spread", "{ ...{} }"],
    ["scene-property", "{ view() {} }"],
    ["scene-property", "{ 1: true }"],
    ["scene-dynamic-value", "{ space: getSpace() }"],
    ["scene-dynamic-value", "{ space: source.space }"],
    ["scene-dynamic-value", "{ transform: () => true }"],
    ["scene-dynamic-value", "{ space: `plane` }"],
    ["scene-dynamic-value", "{ pattern: /plane/u }"],
  ] as const)("rejects %s scene syntax", ([reason, scene]) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `# Context\n\n<MathVisual scene={${scene}} />`
      );
      assert.strictEqual(error._tag, "MathVisualPolicyError");
      assert.strictEqual(error.violations[0]?.reason, reason);
      assert.ok((error.violations[0]?.line ?? 0) > 0);
      assert.ok((error.violations[0]?.column ?? 0) > 0);
    })
  );

  it.effect.each([
    ["scene-missing", "<MathVisual />"],
    ["scene-expression", "<MathVisual scene={getScene()} />"],
    ["scene-duplicate", "<MathVisual scene={{}} scene={{}} />"],
    [
      "labels-duplicate",
      `<MathVisual scene={${planeScene()}} labels={{}} labels={{}} />`,
    ],
    ["attribute-spread", `<MathVisual {...props} scene={${planeScene()}} />`],
  ] as const)("rejects %s component syntax", ([reason, rawMdx]) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(rawMdx);
      assert.ok(
        error.violations.some((violation) => violation.reason === reason)
      );
    })
  );

  it.effect.each([
    ["title-missing", 'description="A coordinate plane."'],
    ["description-missing", 'title="Coordinate plane"'],
  ] as const)("rejects %s accessibility metadata", ([reason, attribute]) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `<MathVisual ${attribute} scene={${planeScene()}} />`
      );
      assert.ok(
        error.violations.some((violation) => violation.reason === reason)
      );
    })
  );

  it.effect.each([
    "smooth",
    "points",
    "curvePoints",
    "version",
    "cameraFov",
    "rendererOnly",
    "data-test",
  ])("rejects the unexpected %s component prop", (name) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `<MathVisual ${name} scene={${planeScene()}} />`
      );
      assert.ok(
        error.violations.some(
          (violation) => violation.reason === "attribute-unexpected"
        )
      );
    })
  );

  it.effect.each(["title", "description"])(
    "rejects a duplicate %s component prop",
    (name) =>
      Effect.gen(function* () {
        const error = yield* rejectMathVisual(
          `<MathVisual ${name}="A" ${name}="B" scene={${planeScene()}} />`
        );
        assert.ok(
          error.violations.some(
            (violation) => violation.reason === "attribute-duplicate"
          )
        );
      })
  );

  it.effect("rejects every child on the prop-only component surface", () =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        "<MathVisual scene={{}}>Unexpected child</MathVisual>"
      );
      assert.ok(
        error.violations.some(
          (violation) => violation.reason === "children-unexpected"
        )
      );
    })
  );

  it.effect.each([
    ["labels-expression", 'labels="point-a"'],
    ["labels-object", "labels={makeLabels()}"],
    ["labels-computed-property", 'labels={{ ["point-a"]: <>A</> }}'],
    ["labels-duplicate-property", "labels={{ a: <>A</>, a: <>B</> }}"],
    ["labels-spread", "labels={{ ...labels }}"],
    ["labels-property", "labels={{ pointA }}"],
    ["labels-property", "labels={{ 1: <>A</> }}"],
  ] as const)("rejects %s rich-label syntax", ([reason, labels]) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `<MathVisual scene={${planeScene()}} ${labels} />`
      );
      assert.strictEqual(error.violations[0]?.reason, reason);
    })
  );

  it.effect("ignores similarly named components", () =>
    validateMathVisual("<LegacyMathVisual scene={getScene()} />")
  );

  it.effect("uses stable locations for incomplete synthetic MDX trees", () =>
    Effect.gen(function* () {
      const dynamicProgram: Program = {
        body: [
          {
            expression: {
              properties: [
                {
                  computed: false,
                  key: { name: "space", type: "Identifier" },
                  kind: "init",
                  method: false,
                  shorthand: false,
                  type: "Property",
                  value: { name: "dynamic", type: "Identifier" },
                },
              ],
              type: "ObjectExpression",
            },
            type: "ExpressionStatement",
          },
        ],
        sourceType: "module",
        type: "Program",
      };
      const tree: Root = {
        children: [
          {
            attributes: [],
            children: [],
            name: "MathVisual",
            type: "mdxJsxFlowElement",
          },
          {
            attributes: [
              {
                name: "scene",
                type: "mdxJsxAttribute",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: "dynamic",
                },
              },
            ],
            children: [],
            name: "MathVisual",
            type: "mdxJsxFlowElement",
          },
          {
            attributes: [
              {
                name: "scene",
                type: "mdxJsxAttribute",
                value: {
                  data: { estree: dynamicProgram },
                  type: "mdxJsxAttributeValueExpression",
                  value: "{ space: dynamic }",
                },
              },
            ],
            children: [],
            name: "MathVisual",
            type: "mdxJsxFlowElement",
          },
        ],
        type: "root",
      };
      const policy = createMathVisualPolicy(TEST_MATH_CONTENT_KEY);
      yield* Effect.promise(() => unified().use(policy.remarkPlugin).run(tree));
      const error = yield* Effect.flip(policy.validate());
      assert.deepStrictEqual(error.violations, [
        { column: 1, line: 1, reason: "scene-missing" },
        { column: 1, line: 1, reason: "title-missing" },
        { column: 1, line: 1, reason: "description-missing" },
        { column: 1, line: 1, reason: "scene-expression" },
        { column: 1, line: 1, reason: "title-missing" },
        { column: 1, line: 1, reason: "description-missing" },
        { column: 1, line: 1, reason: "scene-dynamic-value" },
        { column: 1, line: 1, reason: "title-missing" },
        { column: 1, line: 1, reason: "description-missing" },
      ]);
    })
  );
});
