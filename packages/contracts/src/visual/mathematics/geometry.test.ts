import { describe, expect, it } from "@effect/vitest";

import { failsStrict, math, text } from "#contracts/test/assessment/document";
import { fixedPointsLine, lineProps } from "#contracts/test/assessment/figure";
import { assessmentVisuals } from "#contracts/visual/catalog";

const LineEquationSchema = assessmentVisuals.LineEquation.props;

describe("LineEquation props", () => {
  const [first, second] = lineProps.data;
  const {
    cameraPosition: _position,
    cameraTarget: _target,
    ...withoutCamera
  } = lineProps;

  /** Tells whether the props fail when the given fields replace those of a base. */
  const fails = (fields: object, base: object = lineProps) =>
    failsStrict(LineEquationSchema, { ...base, ...fields });

  it("needs every point index and label place to name a point", () => {
    expect(fails({})).toBe(false);
    for (const line of [
      { ...second, pointIndices: [0, 4] },
      { ...first, labels: [{ at: 4, text: [text("D")] }] },
    ]) {
      expect(fails({ data: [line] })).toBe(true);
    }
    for (const line of [
      { ...first, labels: [{ text: [text("D")] }] },
      { color: "#9333ea", points: [{ x: 0, y: 0, z: 0 }] },
    ]) {
      expect(fails({ data: [line] })).toBe(false);
    }
  });

  it("draws a series of width zero as its points alone, and never a negative width", () => {
    for (const lineWidth of [0, 1, 4]) {
      expect(fails({ data: [{ ...fixedPointsLine, lineWidth }] })).toBe(false);
    }
    expect(fails({ data: [{ ...fixedPointsLine, lineWidth: -1 }] })).toBe(true);
  });

  it("keeps the camera away from its target, whether or not the pose is written out", () => {
    // The scene looks at the origin when no target is given, and the card puts
    // the camera at (10, 6, 10) when no position is given.
    for (const camera of [
      { cameraPosition: [0.5, 3, 0], cameraTarget: [0.5, 3, 0] },
      { cameraPosition: [0, 0, 0] },
      { cameraTarget: [10, 6, 10] },
    ]) {
      expect(fails(camera, withoutCamera)).toBe(true);
    }
    for (const camera of [
      {},
      { cameraPosition: [0, 0, 20] },
      { cameraTarget: [0, 2, 5] },
      { cameraPosition: [1, 2, 20], cameraTarget: [1, 2, 0] },
    ]) {
      expect(fails(camera, withoutCamera)).toBe(false);
    }
  });

  it("draws the curves, cuboids, and circle parts that lessons draw", () => {
    const arc = {
      color: "#9333ea",
      kind: "circle-arc",
      label: { progress: 0.5, text: [math("\\theta")] },
      radius: 1,
      startDegrees: 0,
      sweepDegrees: 90,
    };
    const curve = {
      curve: {
        amplitude: 1,
        domain: [0, 6],
        frequency: 1,
        kind: "sin",
        phase: 0,
        shift: 0,
      },
    };
    for (const line of [
      arc,
      { ...arc, kind: "circle-segment" },
      curve,
      { height: 1, kind: "cuboid", length: 2, width: 3 },
      { kind: "circle-outline", radius: 2 },
      { kind: "circle-chord", radius: 2, startDegrees: 0, sweepDegrees: 60 },
      { degrees: 30, kind: "circle-radius", radius: 2 },
    ]) {
      expect(fails({ data: [line] })).toBe(false);
    }
    for (const line of [
      { ...arc, label: { at: 1, text: [text("A")] } },
      { curve: { ...curve.curve, amplitude: 0 } },
      { curve: { ...curve.curve, domain: [6, 0] } },
      { curve: { ...curve.curve, samples: 100 } },
    ]) {
      expect(fails({ data: [line] })).toBe(true);
    }
  });
});
