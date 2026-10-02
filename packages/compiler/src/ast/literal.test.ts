import { assert, describe, it } from "@effect/vitest";
import type { Expression } from "estree-jsx";
import {
  decodeConstantLiteral,
  decodeStaticLiteral,
  staticLiteralNodeAtPath,
} from "#compiler/ast/literal";
import { parseExpression } from "#compiler/test/expression";

describe("staticLiteralNodeAtPath", () => {
  it("keeps the deepest known node when a path cannot continue", () => {
    const scalar: Expression = { type: "Literal", value: 1 };
    const emptyArray: Expression = { elements: [], type: "ArrayExpression" };

    assert.strictEqual(staticLiteralNodeAtPath(scalar, [0]), scalar);
    assert.strictEqual(staticLiteralNodeAtPath(emptyArray, [0]), emptyArray);
    assert.strictEqual(staticLiteralNodeAtPath(scalar, ["missing"]), scalar);
  });
});

describe("static literal decoding", () => {
  it("decodes literals, signed numbers, arrays, and plain objects", () => {
    const result = decodeStaticLiteral(
      parseExpression('{ a: [1, -2, +3, "x", true, null], b: { c: 0.5 } }')
    );

    assert.deepStrictEqual(result, {
      success: true,
      value: { a: [1, -2, 3, "x", true, null], b: { c: 0.5 } },
    });
  });

  it.each(["1 / 3", "Math.PI", "Math.sqrt(3)", "-Math.PI", "1e999", "x"])(
    "does not evaluate the expression %s",
    (source) => {
      const result = decodeStaticLiteral(parseExpression(`[${source}]`));

      assert.strictEqual(result.success, false);
      if (!result.success) {
        assert.strictEqual(result.failure.reason, "dynamic-value");
      }
    }
  );
});

describe("constant literal decoding", () => {
  it("folds constant numbers wherever arrays and objects hold them", () => {
    const result = decodeConstantLiteral(
      parseExpression(
        '{ at: [1 / 2, -Math.SQRT1_2], size: { radius: Math.sqrt(3) }, name: "a", on: true, none: null }'
      )
    );

    assert.deepStrictEqual(result, {
      success: true,
      value: {
        at: [0.5, -Math.SQRT1_2],
        name: "a",
        none: null,
        on: true,
        size: { radius: Math.sqrt(3) },
      },
    });
  });

  it.each([
    ["{ x: Math.random() }", "CallExpression"],
    ["[1, 1 / 0]", "BinaryExpression"],
    ["{ a: { b: Math.sqrt(-1) } }", "CallExpression"],
    ["[x]", "Identifier"],
    ["{ x: `1` }", "TemplateLiteral"],
    ["[1n]", "Literal"],
  ])("rejects %s at the node that is not a constant", (scene, nodeType) => {
    const result = decodeConstantLiteral(parseExpression(scene));

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.strictEqual(result.failure.reason, "dynamic-value");
      assert.strictEqual(result.failure.node.type, nodeType);
    }
  });

  it("keeps every other static literal rule", () => {
    for (const [source, reason] of [
      ["[,]", "array-hole"],
      ["[...[]]", "spread"],
      ["{ ...{} }", "spread"],
      ['{ ["a"]: 1 }', "computed-property"],
      ["{ a: 1, a: 2 }", "duplicate-property"],
      ["{ a() {} }", "unsupported-property"],
    ] as const) {
      const result = decodeConstantLiteral(parseExpression(source));

      assert.strictEqual(result.success, false, source);
      if (!result.success) {
        assert.strictEqual(result.failure.reason, reason, source);
      }
    }
  });
});
