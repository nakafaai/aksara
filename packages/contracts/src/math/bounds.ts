import type { Schema } from "effect";

import type {
  PlaneLabelAnchor,
  PlaneMathFrame,
  PlaneMathObject,
} from "#contracts/math/plane";
import type {
  SpaceLabelAnchor,
  SpaceMathFrame,
  SpaceMathObject,
} from "#contracts/math/space";

type AxisRange = PlaneMathFrame["x"];

/** Checks one finite coordinate against its inclusive authored frame range. */
function axisContains(range: AxisRange, coordinate: number) {
  return coordinate >= range.min && coordinate <= range.max;
}

/** Checks one plane point against both inclusive frame ranges. */
function planeContains(frame: PlaneMathFrame, point: { x: number; y: number }) {
  return [
    { coordinate: point.x, range: frame.x },
    { coordinate: point.y, range: frame.y },
  ].every(({ coordinate, range }) => axisContains(range, coordinate));
}

/** Checks one space point against all three inclusive frame ranges. */
function spaceContains(
  frame: SpaceMathFrame,
  point: { x: number; y: number; z: number }
) {
  return [
    { coordinate: point.x, range: frame.x },
    { coordinate: point.y, range: frame.y },
    { coordinate: point.z, range: frame.z },
  ].every(({ coordinate, range }) => axisContains(range, coordinate));
}

/** Normalizes one angle to the canonical half-open degree interval. */
function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

/** Returns whether one cardinal angle lies on the authored directed arc. */
function arcContainsAngle(start: number, sweep: number, angle: number) {
  return sweep > 0
    ? normalizeDegrees(angle - start) <= sweep
    : normalizeDegrees(start - angle) <= -sweep;
}

/** Resolves every endpoint or cardinal extremum needed to bound one arc. */
function arcExtrema(
  object: Extract<PlaneMathObject, { readonly kind: "arc" }>
) {
  const angles = [
    object.startDegrees,
    object.startDegrees + object.sweepDegrees,
  ];
  for (const angle of [0, 90, 180, 270]) {
    if (arcContainsAngle(object.startDegrees, object.sweepDegrees, angle)) {
      angles.push(angle);
    }
  }
  return angles.map((angle) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: object.center.x + object.radius * Math.cos(radians),
      y: object.center.y + object.radius * Math.sin(radians),
    };
  });
}

/** Evaluates the exact quadratic output for one authored input coordinate. */
function quadraticValue(
  object: Extract<PlaneMathObject, { readonly kind: "quadratic" }>,
  input: number
) {
  const { a, b, c } = object.coefficients;
  return a * input * input + b * input + c;
}

/** Checks the complete finite quadratic domain and range against its frame. */
function quadraticContained(
  frame: PlaneMathFrame,
  object: Extract<PlaneMathObject, { readonly kind: "quadratic" }>
) {
  const inputRange = object.inputAxis === "x" ? frame.x : frame.y;
  const outputRange = object.inputAxis === "x" ? frame.y : frame.x;
  if (
    ![object.domain.min, object.domain.max].every((input) =>
      axisContains(inputRange, input)
    )
  ) {
    return false;
  }
  const inputs = [object.domain.min, object.domain.max];
  const vertex = -object.coefficients.b / (2 * object.coefficients.a);
  if (axisContains(object.domain, vertex)) {
    inputs.push(vertex);
  }
  return inputs.every((input) =>
    axisContains(outputRange, quadraticValue(object, input))
  );
}

/** Checks one finite plane object while leaving infinite line and ray clipping to consumers. */
function planeObjectContained(
  frame: PlaneMathFrame,
  object: PlaneMathObject
): boolean {
  if (object.kind === "line" || object.kind === "ray") {
    return true;
  }
  if (object.kind === "point") {
    return planeContains(frame, object.at);
  }
  if (object.kind === "segment") {
    return [object.from, object.to].every((point) =>
      planeContains(frame, point)
    );
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return object.vertices.every((point) => planeContains(frame, point));
  }
  if (object.kind === "circle") {
    return [
      { x: object.center.x - object.radius, y: object.center.y },
      { x: object.center.x + object.radius, y: object.center.y },
      { x: object.center.x, y: object.center.y - object.radius },
      { x: object.center.x, y: object.center.y + object.radius },
    ].every((point) => planeContains(frame, point));
  }
  if (object.kind === "arc") {
    return arcExtrema(object).every((point) => planeContains(frame, point));
  }
  return quadraticContained(frame, object);
}

/** Checks one finite space object while leaving infinite line and ray clipping to consumers. */
function spaceObjectContained(
  frame: SpaceMathFrame,
  object: SpaceMathObject
): boolean {
  if (object.kind === "line" || object.kind === "ray") {
    return true;
  }
  if (object.kind === "point") {
    return spaceContains(frame, object.at);
  }
  if (object.kind === "segment") {
    return [object.from, object.to].every((point) =>
      spaceContains(frame, point)
    );
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return object.vertices.every((point) => spaceContains(frame, point));
  }
  const halfLength = object.size.length / 2;
  const halfHeight = object.size.height / 2;
  const halfWidth = object.size.width / 2;
  return [
    {
      x: object.center.x - halfLength,
      y: object.center.y - halfHeight,
      z: object.center.z - halfWidth,
    },
    {
      x: object.center.x + halfLength,
      y: object.center.y + halfHeight,
      z: object.center.z + halfWidth,
    },
  ].every((point) => spaceContains(frame, point));
}

/** Reports every finite plane object or label that escapes its authored frame. */
export function planeBoundsIssues(
  frame: PlaneMathFrame,
  objects: readonly PlaneMathObject[],
  labels: readonly PlaneLabelAnchor[]
): readonly Schema.FilterIssue[] {
  return [
    ...objects.flatMap((object, index): Schema.FilterIssue[] =>
      planeObjectContained(frame, object)
        ? []
        : [
            {
              issue:
                "Expected finite plane geometry inside the Cartesian frame.",
              path: ["objects", index],
            },
          ]
    ),
    ...labels.flatMap((label, index): Schema.FilterIssue[] =>
      planeContains(frame, label.at)
        ? []
        : [
            {
              issue:
                "Expected a plane label anchor inside the Cartesian frame.",
              path: ["labels", index, "at"],
            },
          ]
    ),
  ];
}

/** Reports every finite space object or label that escapes its authored frame. */
export function spaceBoundsIssues(
  frame: SpaceMathFrame,
  objects: readonly SpaceMathObject[],
  labels: readonly SpaceLabelAnchor[]
): readonly Schema.FilterIssue[] {
  return [
    ...objects.flatMap((object, index): Schema.FilterIssue[] =>
      spaceObjectContained(frame, object)
        ? []
        : [
            {
              issue:
                "Expected finite space geometry inside the Cartesian frame.",
              path: ["objects", index],
            },
          ]
    ),
    ...labels.flatMap((label, index): Schema.FilterIssue[] =>
      spaceContains(frame, label.at)
        ? []
        : [
            {
              issue:
                "Expected a space label anchor inside the Cartesian frame.",
              path: ["labels", index, "at"],
            },
          ]
    ),
  ];
}
