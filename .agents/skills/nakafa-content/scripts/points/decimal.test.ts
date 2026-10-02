import { assert, describe, it } from "@effect/vitest";
import {
  curveWith,
  lesson,
  literalFindings,
  literalRules,
} from "#nakafa-content/points/test/lesson";

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
      assert.deepStrictEqual(literalRules(point(coordinates)), [
        "long-decimal",
      ]);
    }
  });

  it("reports the written literal at its exact position", () => {
    const source = lesson(point("x: 1, y: -0.123456"));
    const found = literalFindings(source);
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
      assert.deepStrictEqual(literalRules(point(coordinates)), []);
    }
  });

  it("ignores long decimals that no x, y, or z coordinate carries", () => {
    for (const source of [
      '<LineEquation title="Label" description="A label." data={[{ points: [{ x: 1, y: 1, z: 0 }], labels: [{ text: "A", at: 0, offset: [3.464101615, -0.8, 0] }] }]} />',
      curveWith("[{ x: 1, y: 1, z: 0, radius: 0.123456 }]"),
      curveWith("[{ [x]: 0.123456, y: 1 }]"),
      curveWith("[{ 1: 0.12345, y: 1 }]"),
      curveWith("[{ x: 1, y: 1 }].map(({ x = 0.123456 }) => x)"),
      '<LineEquation title="Camera" description="A view." cameraPosition={[3.5355339, 3.5355339, 5]} cameraTarget={[0.123456, 0, 0]} data={[]} />',
    ]) {
      assert.deepStrictEqual(literalRules(source), []);
    }
  });
});

describe("long decimals in a list of point tuples", () => {
  it("rejects each rounded number of a tuple that an array lists", () => {
    const source = lesson(
      curveWith("[[0.707107, 0.707107, 0], [1, 2, 3], [-1.23456, 2]]")
    );
    const found = literalFindings(source);

    assert.deepStrictEqual(
      found.map(({ rule }) => rule),
      ["long-decimal", "long-decimal", "long-decimal"]
    );
    assert.include(found[0]?.message, "0.707107 in a point tuple");
    assert.include(found[2]?.message, "1.23456 in a point tuple");
    const line = source.split("\n").find((entry) => entry.includes("0.707107"));
    assert.strictEqual(found[0]?.column, (line ?? "").indexOf("0.707107") + 1);
  });

  it("accepts exact numbers, computed numbers, and tuples that are not points", () => {
    for (const points of [
      "[[0.125, 2.5], [1 / 3, Math.sqrt(3), 0]]",
      "[[0.123456, 1, 2, 3]]",
      "[[0.123456]]",
      "[[x, 0.123456]]",
    ]) {
      assert.deepStrictEqual(literalRules(curveWith(points)), [], points);
    }
  });

  it("reaches a list of tuples that another list holds", () => {
    assert.deepStrictEqual(literalRules(curveWith("[[[0.123456, 1]]]")), [
      "long-decimal",
    ]);
  });

  it("reports the tuples of every chunk of one pasted series", () => {
    const chunk = "[[0.123456, 1], [0.234567, 2]]";
    const found = literalFindings(
      lesson(curveWith(`[...${chunk}, ...${chunk}, ...${chunk}]`))
    );

    assert.strictEqual(found.length, 6);
    assert.isTrue(found.every(({ rule }) => rule === "long-decimal"));
  });
});
