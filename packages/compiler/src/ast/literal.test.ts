import { assert, describe, it } from "@effect/vitest";
import type { Expression } from "estree-jsx";
import { staticLiteralNodeAtPath } from "#compiler/ast/literal";

describe("staticLiteralNodeAtPath", () => {
  it("keeps the deepest known node when a path cannot continue", () => {
    const scalar: Expression = { type: "Literal", value: 1 };
    const emptyArray: Expression = { elements: [], type: "ArrayExpression" };

    assert.strictEqual(staticLiteralNodeAtPath(scalar, [0]), scalar);
    assert.strictEqual(staticLiteralNodeAtPath(emptyArray, [0]), emptyArray);
    assert.strictEqual(staticLiteralNodeAtPath(scalar, ["missing"]), scalar);
  });
});
