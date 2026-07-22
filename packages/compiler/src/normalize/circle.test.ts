import { describe, expect, it } from "vitest";
import {
  type CircleMacroName,
  resolveCircle,
} from "#compiler/normalize/circle";
import { isStaticObject, type StaticValue } from "#compiler/normalize/value";

/** Expands one circle macro with one statically evaluated argument. */
function resolve(name: CircleMacroName, value: StaticValue) {
  return resolveCircle(name, [value]);
}

/** Narrows a resolved macro result to its expected array form. */
function expectArray(
  value: StaticValue | undefined
): asserts value is readonly StaticValue[] {
  expect(Array.isArray(value)).toBe(true);
  if (!Array.isArray(value)) {
    throw new Error("Expected one static array result.");
  }
}

/** Narrows a resolved macro result to its expected object form. */
function expectObject(
  value: StaticValue | undefined
): asserts value is { readonly [key: string]: StaticValue } {
  expect(value === undefined ? false : isStaticObject(value)).toBe(true);
  if (value === undefined || !isStaticObject(value)) {
    throw new Error("Expected one static object result.");
  }
}

describe("circle migration macros", () => {
  it("mirrors exact outline, radius, and chord point algorithms", () => {
    const outline = resolve("createCircleOutlinePoints", 1);
    const radius = resolve("createCircleRadiusPoints", {
      degrees: -90,
      radius: 2,
    });
    const chord = resolve("createCircleChordPoints", {
      radius: 2,
      startDegrees: 0,
      sweepDegrees: 90,
    });
    expectArray(outline);
    expectArray(radius);
    expectArray(chord);
    expect(outline).toHaveLength(97);
    expect(outline[0]).toEqual({ x: 1, y: 0, z: 0 });
    expect(outline.at(-1)).toMatchObject({ x: 1, z: 0 });
    expect(radius).toEqual([
      { x: 0, y: 0, z: 0 },
      { x: expect.closeTo(0), y: -2, z: 0 },
    ]);
    expect(chord).toEqual([
      { x: 2, y: 0, z: 0 },
      { x: expect.closeTo(0), y: 2, z: 0 },
    ]);
  });

  it("builds labeled and plain arc lines with exact defaults", () => {
    const labeled = resolve("createCircleArcLine", {
      color: "#ea580c",
      label: { offset: [1, 0.5, 0], progress: 7 / 8, text: "Arc" },
      lineWidth: 2,
      radius: 3,
      segments: 2,
      startDegrees: 0,
      sweepDegrees: 90,
    });
    const plain = resolve("createCircleArcLine", {
      color: "#0891b2",
      label: { text: "Default" },
      radius: 3,
      startDegrees: 0,
      sweepDegrees: 90,
    });
    expectObject(labeled);
    expectObject(plain);
    expect(labeled).toMatchObject({
      color: "#ea580c",
      labels: [{ at: 2, offset: [1, 0.5, 0], text: "Arc" }],
      lineWidth: 2,
      showPoints: false,
      smooth: true,
    });
    expect(labeled.points).toHaveLength(3);
    expect(plain.points).toHaveLength(49);
    expect(plain.labels).toEqual([{ at: 24, text: "Default" }]);
    expect(plain).not.toHaveProperty("lineWidth");
  });

  it("builds segment boundaries with default and explicit line widths", () => {
    const base = {
      color: "#65a30d",
      radius: 4,
      segments: -2,
      startDegrees: 30,
      sweepDegrees: 120,
    } as const;
    const defaultWidth = resolve("createCircleSegmentBoundaryLines", base);
    const explicitWidth = resolve("createCircleSegmentBoundaryLines", {
      ...base,
      label: { text: "Segment" },
      lineWidth: 2,
    });
    expectArray(defaultWidth);
    expectArray(explicitWidth);
    expect(defaultWidth).toHaveLength(2);
    expect(defaultWidth[0]).toMatchObject({ lineWidth: 4 });
    expect(defaultWidth[1]).toMatchObject({
      lineWidth: 4,
      showPoints: false,
      smooth: false,
    });
    expect(explicitWidth[0]).toMatchObject({
      labels: [{ at: 1, text: "Segment" }],
      lineWidth: 2,
    });
  });

  it.each([
    ["createCircleOutlinePoints", []],
    ["createCircleOutlinePoints", ["4"]],
    ["createCircleRadiusPoints", [{ degrees: 30 }]],
    ["createCircleRadiusPoints", [{ degrees: 30, extra: 1, radius: 4 }]],
    ["createCircleChordPoints", [null]],
    ["createCircleChordPoints", [{ radius: 4, startDegrees: 0 }]],
    [
      "createCircleChordPoints",
      [{ extra: 1, radius: 4, startDegrees: 0, sweepDegrees: 90 }],
    ],
    [
      "createCircleArcLine",
      [{ color: 1, radius: 4, startDegrees: 0, sweepDegrees: 90 }],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          extra: 1,
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          radius: 4,
          segments: 1.5,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          lineWidth: "2",
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          label: "Arc",
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          label: { extra: 1, text: "Arc" },
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          label: { text: 1 },
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          label: { progress: "half", text: "Arc" },
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
    [
      "createCircleArcLine",
      [
        {
          color: "#fff",
          label: { offset: [1, 2], text: "Arc" },
          radius: 4,
          startDegrees: 0,
          sweepDegrees: 90,
        },
      ],
    ],
  ] satisfies readonly [CircleMacroName, readonly StaticValue[]][])(
    "rejects invalid %s input",
    (name, arguments_) => {
      expect(resolveCircle(name, arguments_)).toBeUndefined();
    }
  );
});
