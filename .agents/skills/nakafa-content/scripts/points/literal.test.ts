import { assert, describe, it } from "@effect/vitest";
import {
  curveWith,
  lesson,
  literalFindings,
  literalRules,
  typedObjects,
} from "#nakafa-content/points/test/lesson";

describe("expressions that a component owns", () => {
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

  it("rejects the rounded coordinates of a MathVisual corner", () => {
    const rounded = scene(
      "[{ x: 0, y: 0 }, { x: 1.7320508075688772, y: 1 }, { x: 0.707106781187, y: -0.707106781187 }]"
    );
    const found = literalFindings(lesson(rounded));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["long-decimal", "long-decimal", "long-decimal"]
    );
    assert.include(found[0]?.message, "x: 1.7320508075688772");
    assert.include(found[0]?.message, "Math.sqrt(3)");
  });

  it("accepts the exact expression of a MathVisual corner", () => {
    const exact = scene(
      "[{ x: 0, y: 0 }, { x: Math.sqrt(3), y: 1 }, { x: Math.SQRT1_2, y: -Math.SQRT1_2 }]"
    );

    assert.deepStrictEqual(literalRules(exact), []);
  });

  it("rejects a typed MathVisual list with advice that fits the component", () => {
    const found = literalFindings(lesson(scene(typedObjects(9))));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
    assert.include(found[0]?.message, "MathVisual folds only constant");
    assert.include(found[0]?.message, "LineEquation");
  });

  it("gives a MathVisual nested in another component its own advice", () => {
    const nested = `<ContentBlock title={${scene(typedObjects(9))}} />`;
    const found = literalFindings(lesson(nested));

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["literal-points"]
    );
    assert.include(found[0]?.message, "MathVisual folds only constant");
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

    assert.deepStrictEqual(literalRules(chart), []);
    assert.deepStrictEqual(literalRules(`{${chart}}`), []);
    assert.deepStrictEqual(
      [...new Set(literalRules(curveWith(`[${observations}]`)))],
      ["literal-points", "long-decimal"]
    );
  });
});

describe("expressions outside a plain attribute", () => {
  it("scans a series inside a flow expression", () => {
    const wrapped = `{<LineEquation title="Series" description="A wrapped series." data={[{ points: ${typedObjects(9)} }]} />}`;

    assert.deepStrictEqual(literalRules(wrapped), ["literal-points"]);
  });

  it("scans a spread attribute and ignores empty or text expressions", () => {
    const spread = `<LineEquation title="Series" description="A spread." {...{ data: [{ points: ${typedObjects(9)} }] }} />`;

    assert.deepStrictEqual(literalRules(spread), ["literal-points"]);
    assert.deepStrictEqual(literalRules('<>{" "}</>'), []);
    assert.deepStrictEqual(
      literalRules("Plain text with {/* a comment */} inside."),
      []
    );
  });

  it("scans an element whose name is not a plain identifier", () => {
    const member = `{<Charts.Line data={[{ points: ${typedObjects(9)} }]} />}`;

    assert.deepStrictEqual(literalRules(member), ["literal-points"]);
  });
});
