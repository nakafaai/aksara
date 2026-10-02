import { assert, describe, it } from "@effect/vitest";
import {
  COMPUTED_CURVE,
  curveWith,
  HOUSE_OUTLINE,
  lesson,
  literalFindings,
  literalRules,
  PASTED_CURVE,
  typedObjects,
  typedTuples,
} from "#nakafa-content/points/test/lesson";

/** Writes the given point lists as the elements of one array literal. */
function elementsOf(...lists: readonly string[]) {
  return `[${lists.map((list) => list.slice(1, -1)).join(", ")}]`;
}

describe("literal point lists", () => {
  it("rejects a vertex list typed into a series", () => {
    const source = lesson(PASTED_CURVE);
    const found = literalFindings(source);

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
    assert.include(found[0]?.message, "9 literal points in one series");
    assert.include(found[0]?.message, "Array.from");
    const lines = source.split("\n");
    const opening = lines.findIndex((line) => line.includes("points: ["));
    assert.strictEqual(found[0]?.line, opening + 1);
    assert.strictEqual(
      found[0]?.column,
      (lines[opening] ?? "").indexOf("[") + 1
    );
  });

  it("accepts a series computed with Array.from", () => {
    assert.deepStrictEqual(literalFindings(lesson(COMPUTED_CURVE)), []);
  });

  it("accepts a polygon whose five corners are named exactly", () => {
    assert.deepStrictEqual(literalFindings(lesson(HOUSE_OUTLINE)), []);
  });

  it("allows eight typed points and rejects the ninth", () => {
    assert.deepStrictEqual(literalRules(curveWith(typedObjects(8))), []);
    assert.deepStrictEqual(literalRules(curveWith(typedObjects(9))), [
      "literal-points",
    ]);
    assert.deepStrictEqual(literalRules(curveWith(typedTuples(8, 2))), []);
    assert.deepStrictEqual(literalRules(curveWith(typedTuples(9, 2))), [
      "literal-points",
    ]);
    assert.deepStrictEqual(literalRules(curveWith(typedTuples(9, 3))), [
      "literal-points",
    ]);
  });

  it("counts typed objects and tuples together", () => {
    const mixed = elementsOf(typedObjects(5), typedTuples(4, 2));

    assert.deepStrictEqual(literalRules(curveWith(mixed)), ["literal-points"]);
    assert.deepStrictEqual(
      literalRules(curveWith(elementsOf(typedObjects(5), typedTuples(3, 2)))),
      []
    );
  });

  it("counts signed literals but never a computed or partial point", () => {
    const signed = Array.from({ length: 9 }, () => "{ x: -1, y: +2 }").join(
      ", "
    );
    const negated = Array.from({ length: 9 }, () => "{ x: -t, y: 2 }").join(
      ", "
    );
    const quoted = Array.from({ length: 9 }, () => '{ x: "1", y: 2 }').join(
      ", "
    );
    const computedKey = Array.from(
      { length: 9 },
      () => "{ [x]: 1, y: 2 }"
    ).join(", ");
    const incomplete = Array.from({ length: 9 }, () => "{ x: 1, z: 2 }").join(
      ", "
    );
    const named = Array.from({ length: 9 }, () => "[x, 1]").join(", ");
    const wide = typedTuples(9, 4);
    const unary = Array.from({ length: 9 }, () => "[!1, 2]").join(", ");

    assert.deepStrictEqual(literalRules(curveWith(`[${signed}]`)), [
      "literal-points",
    ]);
    for (const points of [
      negated,
      quoted,
      computedKey,
      incomplete,
      named,
      unary,
    ]) {
      assert.deepStrictEqual(literalRules(curveWith(`[${points}]`)), []);
    }
    assert.deepStrictEqual(literalRules(curveWith(wide)), []);
  });

  it("checks lists nested inside one series and each list on its own", () => {
    const nested = `[${typedObjects(9)}, ${typedObjects(3)}]`;
    const found = literalFindings(lesson(curveWith(nested)));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
  });
});

describe("series split into chunks", () => {
  it("counts the arrays that a series spreads into itself", () => {
    const chunks = `[...${typedObjects(8)}, ...${typedObjects(8)}, ...${typedTuples(4, 2)}]`;
    const found = literalFindings(lesson(curveWith(chunks)));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
    assert.include(found[0]?.message, "20 literal points in one series");
    assert.deepStrictEqual(
      literalRules(curveWith(`[...${typedObjects(8)}, ...computed]`)),
      []
    );
    assert.deepStrictEqual(
      literalRules(curveWith(`[...${typedObjects(4)}, ...${typedObjects(4)}]`)),
      []
    );
  });

  it("counts the pieces that concat joins, and its receiver", () => {
    const pieces = `${typedObjects(5)}.concat(${typedObjects(2)}, ${typedObjects(2)})`;
    const onlyArguments = `base.concat(${typedObjects(9)})`;
    const nestedConcat = `[...${typedObjects(5)}.concat(${typedObjects(4)})]`;

    assert.deepStrictEqual(literalRules(curveWith(pieces)), ["literal-points"]);
    assert.deepStrictEqual(literalRules(curveWith(onlyArguments)), [
      "literal-points",
    ]);
    assert.deepStrictEqual(literalRules(curveWith(nestedConcat)), [
      "literal-points",
    ]);
    assert.deepStrictEqual(
      literalRules(curveWith(`${typedObjects(4)}.concat(${typedObjects(4)})`)),
      []
    );
    assert.deepStrictEqual(
      literalRules(
        curveWith(`Array.from({ length: 5 }).concat(${typedObjects(3)})`)
      ),
      []
    );
    assert.deepStrictEqual(
      literalRules(
        curveWith(`${typedObjects(5)}["concat"](${typedObjects(4)})`)
      ),
      []
    );
    assert.deepStrictEqual(
      literalRules(curveWith(`${typedObjects(3)}.concat(...computed)`)),
      []
    );
    assert.deepStrictEqual(literalRules(curveWith("series.slice(0, 9)")), []);
    assert.deepStrictEqual(literalRules(curveWith("series.concat(more)")), []);
  });

  it("reports one pasted list once, where it begins", () => {
    const twice = `[...${typedObjects(9)}, ...${typedObjects(9)}]`;
    const joined = `[].concat(${typedObjects(9)}, ${typedObjects(9)})`;

    assert.deepStrictEqual(literalRules(curveWith(twice)), ["literal-points"]);
    assert.deepStrictEqual(literalRules(curveWith(joined)), ["literal-points"]);
  });
});
