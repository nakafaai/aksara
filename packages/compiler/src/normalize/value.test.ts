import { createProcessor } from "@mdx-js/mdx";
import { Effect } from "effect";
import type { Node } from "estree-jsx";
import { describe, expect, it } from "vitest";
import { readNodeProgram } from "#compiler/ast/program";
import {
  encodeStaticValue,
  evaluateStaticExpression,
  isStaticObject,
} from "#compiler/normalize/value";

const SOURCE_PATH = "packages/contents/articles/protocol/en.mdx";
const COLOR_BINDING = new Map([["getColor", "getColor"]]);

/** Reads one official ESTree expression from protocol-only MDX. */
function expression(rawMdx: string): Node {
  const tree = createProcessor().parse(rawMdx);
  const node = tree.children.find(
    (child) => child.type === "mdxFlowExpression"
  );
  const program = node ? readNodeProgram(node) : undefined;
  const statement = program?.body[0];
  if (statement?.type !== "ExpressionStatement") {
    throw new Error("Expected one parsed MDX expression.");
  }
  return statement.expression;
}

/** Evaluates one parsed expression at the Vitest boundary. */
function evaluate(rawMdx: string) {
  return Effect.runPromise(
    evaluateStaticExpression(expression(rawMdx), COLOR_BINDING, SOURCE_PATH)
  );
}

/** Returns one typed static-expression rejection at the Vitest boundary. */
function reject(rawMdx: string) {
  return Effect.runPromise(
    evaluateStaticExpression(
      expression(rawMdx),
      COLOR_BINDING,
      SOURCE_PATH
    ).pipe(Effect.flip)
  );
}

describe("static macro values", () => {
  it("evaluates the complete measured literal grammar", async () => {
    const value = await evaluate(
      '{({ text: "Arc", "data-label": "arc", offset: [-1, 2 / 4, null], visible: true, color: getColor("CYAN") })}'
    );
    expect(value).toEqual({
      color: "#0891b2",
      "data-label": "arc",
      offset: [-1, 0.5, null],
      text: "Arc",
      visible: true,
    });
    expect(isStaticObject(value)).toBe(true);
    expect(isStaticObject([value])).toBe(false);
    expect(isStaticObject(null)).toBe(false);
  });

  it.each([
    "{protocol}",
    "{Math.max(1, 2)}",
    "{({ ...protocol })}",
    "{({ [protocol]: 1 })}",
    "{({ x: 1, x: 2 })}",
    "{({ __proto__: 1 })}",
    "{({ constructor: 1 })}",
    "{({ prototype: 1 })}",
    "{({ 1: 'one' })}",
    "{[1, , 2]}",
    '{-"x"}',
    '{"x" / 2}',
    "{1 / 0}",
    "{/protocol/u}",
    "{1n}",
    '{getColor("UNKNOWN")}',
    '{getColor(...["CYAN"])}',
    '{getColor?.("CYAN")}',
  ])("rejects unsupported expression %s", async (rawMdx) => {
    await expect(reject(rawMdx)).resolves.toMatchObject({
      _tag: "MdxMacroNormalizationError",
    });
  });

  it("serializes canonical literal source with stable object keys", () => {
    expect(
      encodeStaticValue({
        a: -0,
        z: [null, true, "protocol"],
      })
    ).toBe('{"a":-0,"z":[null,true,"protocol"]}');
    expect(encodeStaticValue({ z: 2, ä: 1 })).toBe('{"z":2,"ä":1}');
    expect(encodeStaticValue(false)).toBe("false");
    expect(encodeStaticValue(2)).toBe("2");
  });
});
