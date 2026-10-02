import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findLiteralPoints } from "#nakafa-content/points/literal";
import {
  COMPUTED_CURVE,
  curveWith,
  HOUSE_OUTLINE,
  lesson,
  PASTED_CURVE,
  typedObjects,
  typedTuples,
} from "#nakafa-content/points/test/lesson";

/** Parses one real MDX document and runs the literal rules over it. */
function findings(source: string) {
  return findLiteralPoints(source, parseLessonMdx(source));
}

/** Returns the rule ids of every finding in one document. */
function rules(blocks: string) {
  return findings(lesson(blocks)).map(({ rule }) => rule);
}

describe("literal point lists", () => {
  it("rejects a vertex list typed into a series", () => {
    const source = lesson(PASTED_CURVE);
    const found = findings(source);

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
    assert.include(found[0]?.message, "9 literal points in one array");
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
    assert.deepStrictEqual(findings(lesson(COMPUTED_CURVE)), []);
  });

  it("accepts a polygon whose five corners are named exactly", () => {
    assert.deepStrictEqual(findings(lesson(HOUSE_OUTLINE)), []);
  });

  it("allows eight typed points and rejects the ninth", () => {
    assert.deepStrictEqual(rules(curveWith(typedObjects(8))), []);
    assert.deepStrictEqual(rules(curveWith(typedObjects(9))), [
      "literal-points",
    ]);
    assert.deepStrictEqual(rules(curveWith(typedTuples(8, 2))), []);
    assert.deepStrictEqual(rules(curveWith(typedTuples(9, 2))), [
      "literal-points",
    ]);
    assert.deepStrictEqual(rules(curveWith(typedTuples(9, 3))), [
      "literal-points",
    ]);
  });

  it("counts typed objects and tuples together", () => {
    const mixed = `[...${typedObjects(5)}, ...${typedTuples(4, 2)}]`;
    const split = `[${typedObjects(5).slice(1, -1)}, ${typedTuples(4, 2).slice(1, -1)}]`;

    assert.deepStrictEqual(rules(curveWith(mixed)), []);
    assert.deepStrictEqual(rules(curveWith(split)), ["literal-points"]);
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

    assert.deepStrictEqual(rules(curveWith(`[${signed}]`)), ["literal-points"]);
    for (const points of [
      negated,
      quoted,
      computedKey,
      incomplete,
      named,
      unary,
    ]) {
      assert.deepStrictEqual(rules(curveWith(`[${points}]`)), []);
    }
    assert.deepStrictEqual(rules(curveWith(wide)), []);
  });

  it("checks lists nested inside one series and each list on its own", () => {
    const nested = `[${typedObjects(9)}, ${typedObjects(3)}]`;
    const found = findings(lesson(curveWith(nested)));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
  });
});

describe("long decimal coordinates", () => {
  /** Draws one series that holds a single point with these coordinates. */
  const point = (coordinates: string) =>
    curveWith(`[{ ${coordinates}, z: 0 }]`);

  it("rejects a coordinate written with four or more fractional digits", () => {
    for (const coordinates of [
      "x: 0.707107, y: 1",
      "x: 0.0125, y: 1",
      'x: 1, "y": 0.3333333333333333',
      "x: 1, y: -1.2345",
      "x: 1, y: +1.2345",
      "x: 1e-5, y: 1",
      "x: 1_000.123_456, y: 1",
      "x: 1.5e-3, y: 1",
    ]) {
      assert.deepStrictEqual(rules(point(coordinates)), ["long-decimal"]);
    }
  });

  it("reports the written literal at its exact position", () => {
    const source = lesson(point("x: 1, y: -0.123456"));
    const found = findings(source);
    const line = source
      .split("\n")
      .find((entry) => entry.includes("-0.123456"));

    assert.include(found[0]?.message, "y: 0.123456 is a long decimal");
    assert.strictEqual(found[0]?.column, (line ?? "").indexOf("-0.123456") + 1);
  });

  it("accepts short, exact, and computed coordinates", () => {
    for (const coordinates of [
      "x: 0.125, y: 2.5",
      "x: 2.5000, y: 1",
      "x: 1.5e3, y: 1",
      "x: 0x1F, y: 1",
      "x: 1 / 3, y: Math.sqrt(3)",
      "x: -t, y: 1",
      "x: 3., y: .5",
    ]) {
      assert.deepStrictEqual(rules(point(coordinates)), []);
    }
  });

  it("ignores long decimals that no x, y, or z coordinate carries", () => {
    for (const source of [
      '<LineEquation title="Label" description="A label." data={[{ points: [{ x: 1, y: 1, z: 0 }], labels: [{ text: "A", at: 0, offset: [3.464101615, -0.8, 0] }] }]} />',
      curveWith("[{ x: 1, y: 1, z: 0, radius: 0.123456 }]"),
      curveWith("[{ [x]: 0.123456, y: 1 }]"),
      curveWith("[{ 1: 0.12345, y: 1 }]"),
      curveWith("[{ x: 1, y: 1 }].map(({ x = 0.123456 }) => x)"),
    ]) {
      assert.deepStrictEqual(rules(source), []);
    }
  });
});

describe("components that carry data or static literals", () => {
  /** Draws one MathVisual polyline through the given vertex source. */
  const scene = (vertices: string) => `<MathVisual
  title="Sectors"
  description="Eight radii of a wheel."
  scene={{
    space: "plane",
    frame: { kind: "cartesian", x: { min: -2, max: 2 }, y: { min: -2, max: 2 } },
    view: { kind: "fit" },
    objects: [{ id: "path", kind: "polyline", appearance: "primary", vertices: ${vertices} }],
    labels: [],
  }}
  labels={{}}
/>`;

  it("accepts the long decimals of an exact MathVisual corner", () => {
    const corner = scene(
      "[{ x: 0, y: 0 }, { x: 1.7320508075688772, y: 1 }, { x: 0.707106781187, y: 0.707106781187 }]"
    );

    assert.deepStrictEqual(rules(corner), []);
  });

  it("rejects a typed MathVisual list with advice that fits the component", () => {
    const found = findings(lesson(scene(typedObjects(9))));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
    assert.include(found[0]?.message, "MathVisual evaluates no code");
    assert.include(found[0]?.message, "LineEquation");
  });

  it("skips the observations of a data chart", () => {
    const observations = Array.from(
      { length: 12 },
      (_, index) => `{ x: ${index}.123456, y: ${index * 3}.654321 }`
    ).join(", ");
    const chart = `<ScatterDiagram
  title="Study time"
  description="Twelve observations."
  datasets={[{ name: "Students", color: "var(--chart-1)", points: [${observations}] }]}
/>`;

    assert.deepStrictEqual(rules(chart), []);
    assert.deepStrictEqual(
      [...new Set(rules(curveWith(`[${observations}]`)))],
      ["literal-points", "long-decimal"]
    );
  });
});

describe("expressions outside a plain attribute", () => {
  it("scans a series inside a flow expression", () => {
    const wrapped = `{<LineEquation title="Series" description="A wrapped series." data={[{ points: ${typedObjects(9)} }]} />}`;

    assert.deepStrictEqual(rules(wrapped), ["literal-points"]);
  });

  it("scans a spread attribute and ignores empty or text expressions", () => {
    const spread = `<LineEquation title="Series" description="A spread." {...{ data: [{ points: ${typedObjects(9)} }] }} />`;

    assert.deepStrictEqual(rules(spread), ["literal-points"]);
    assert.deepStrictEqual(rules('<>{" "}</>'), []);
    assert.deepStrictEqual(
      rules("Plain text with {/* a comment */} inside."),
      []
    );
  });
});
