import { Array as Arr, Result, type Schema } from "effect";
import {
  arcContained,
  axisContains,
  circleContained,
  cuboidContained,
  quadraticContained,
} from "#contracts/math/extent";
import type { FormulaScope } from "#contracts/math/formula/compile";
import {
  type FormulaGeometry,
  planeFormulaGeometry,
} from "#contracts/math/formula/plane";
import { geometryVisible } from "#contracts/math/formula/scope";
import { spaceFormulaGeometry } from "#contracts/math/formula/space";
import { infinitePathIntersectsBox } from "#contracts/math/intersection";
import type {
  PlaneLabelAnchor,
  PlaneMathFrame,
  PlaneMathObject,
} from "#contracts/math/plane";
import type {
  SpaceLabelAnchor,
  SpaceMathFrame,
  SpaceMathObject,
  SpaceMathView,
} from "#contracts/math/space";

/** Checks one plane point against both inclusive frame ranges. */
function planeContains(frame: PlaneMathFrame, point: { x: number; y: number }) {
  return Arr.every(
    [
      { coordinate: point.x, range: frame.x },
      { coordinate: point.y, range: frame.y },
    ],
    ({ coordinate, range }) => axisContains(range, coordinate)
  );
}

/** Checks one space point against all three inclusive frame ranges. */
function spaceContains(
  frame: SpaceMathFrame,
  point: { x: number; y: number; z: number }
) {
  return Arr.every(
    [
      { coordinate: point.x, range: frame.x },
      { coordinate: point.y, range: frame.y },
      { coordinate: point.z, range: frame.z },
    ],
    ({ coordinate, range }) => axisContains(range, coordinate)
  );
}

/** Maps one plane path onto the Cartesian frame slabs it traverses. */
function planeAxes(
  frame: PlaneMathFrame,
  start: { readonly x: number; readonly y: number },
  through: { readonly x: number; readonly y: number }
) {
  return [
    { range: frame.x, start: start.x, through: through.x },
    { range: frame.y, start: start.y, through: through.y },
  ];
}

/** Maps one space path onto the Cartesian frame slabs it traverses. */
function spaceAxes(
  frame: SpaceMathFrame,
  start: { readonly x: number; readonly y: number; readonly z: number },
  through: { readonly x: number; readonly y: number; readonly z: number }
) {
  return [
    { range: frame.x, start: start.x, through: through.x },
    { range: frame.y, start: start.y, through: through.y },
    { range: frame.z, start: start.z, through: through.z },
  ];
}

/**
 * Whether a formula's samples show anything inside the frame. A formula that
 * does not read is reported by its own field, so it is not reported again.
 */
function sampledVisible(
  geometry: Result.Result<FormulaGeometry, unknown>,
  frame: PlaneMathFrame | SpaceMathFrame
) {
  return Result.match(geometry, {
    onFailure: () => true,
    onSuccess: (sampled) => geometryVisible(sampled, frame),
  });
}

/** Checks whether one plane object shows visible geometry in its frame. */
function planeObjectContained(
  frame: PlaneMathFrame,
  object: PlaneMathObject,
  scope: FormulaScope,
  labels: readonly PlaneLabelAnchor[]
): boolean {
  if (object.kind === "function") {
    const axis = object.inputAxis ?? "x";
    const named = Arr.flatMap(labels, ({ at, objectId }) =>
      objectId === object.id ? [at[axis]] : []
    );
    return sampledVisible(
      planeFormulaGeometry(object, frame, scope, named),
      frame
    );
  }
  if (
    object.kind === "implicit" ||
    object.kind === "parametric" ||
    object.kind === "polar" ||
    object.kind === "region"
  ) {
    return sampledVisible(planeFormulaGeometry(object, frame, scope), frame);
  }
  if (object.kind === "line") {
    const [start, through] = object.through;
    return infinitePathIntersectsBox(
      object.kind,
      planeAxes(frame, start, through)
    );
  }
  if (object.kind === "ray") {
    return infinitePathIntersectsBox(
      object.kind,
      planeAxes(frame, object.from, object.through)
    );
  }
  if (object.kind === "point") {
    return planeContains(frame, object.at);
  }
  if (object.kind === "segment") {
    return Arr.every([object.from, object.to], (point) =>
      planeContains(frame, point)
    );
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return Arr.every(object.vertices, (point) => planeContains(frame, point));
  }
  if (object.kind === "circle") {
    return circleContained(frame, object);
  }
  if (object.kind === "arc") {
    return arcContained(frame, object);
  }
  return quadraticContained(frame, object);
}

/** Checks whether one space object has complete visible geometry in its frame. */
function spaceObjectContained(
  frame: SpaceMathFrame,
  object: SpaceMathObject,
  scope: FormulaScope
): boolean {
  if (
    object.kind === "function" ||
    object.kind === "parametric" ||
    object.kind === "prism" ||
    object.kind === "pyramid" ||
    object.kind === "revolution" ||
    object.kind === "surface"
  ) {
    return sampledVisible(spaceFormulaGeometry(object, frame, scope), frame);
  }
  if (object.kind === "line") {
    const [start, through] = object.through;
    return infinitePathIntersectsBox(
      object.kind,
      spaceAxes(frame, start, through)
    );
  }
  if (object.kind === "ray") {
    return infinitePathIntersectsBox(
      object.kind,
      spaceAxes(frame, object.from, object.through)
    );
  }
  if (object.kind === "point") {
    return spaceContains(frame, object.at);
  }
  if (object.kind === "segment") {
    return Arr.every([object.from, object.to], (point) =>
      spaceContains(frame, point)
    );
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return Arr.every(object.vertices, (point) => spaceContains(frame, point));
  }
  return cuboidContained(frame, object);
}

/** Reports every finite plane object or label that escapes its authored frame. */
export function planeBoundsIssues(
  frame: PlaneMathFrame,
  objects: readonly PlaneMathObject[],
  labels: readonly PlaneLabelAnchor[],
  scope: FormulaScope = {}
): readonly Schema.FilterIssue[] {
  return [
    ...Arr.flatMap(objects, (object, index): Schema.FilterIssue[] =>
      planeObjectContained(frame, object, scope, labels)
        ? []
        : [
            {
              issue: "Expected plane geometry visible inside its frame.",
              path: ["objects", index],
            },
          ]
    ),
    ...Arr.flatMap(labels, (label, index): Schema.FilterIssue[] =>
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

/** Reports every finite space object, label, or view target outside its frame. */
export function spaceBoundsIssues(
  frame: SpaceMathFrame,
  objects: readonly SpaceMathObject[],
  labels: readonly SpaceLabelAnchor[],
  view: SpaceMathView,
  scope: FormulaScope = {}
): readonly Schema.FilterIssue[] {
  const viewIssues: readonly Schema.FilterIssue[] =
    view.kind === "isometric" &&
    view.target !== undefined &&
    !spaceContains(frame, view.target)
      ? [
          {
            issue: "Expected an isometric target inside the Cartesian frame.",
            path: ["view", "target"],
          },
        ]
      : [];
  return [
    ...Arr.flatMap(objects, (object, index): Schema.FilterIssue[] =>
      spaceObjectContained(frame, object, scope)
        ? []
        : [
            {
              issue: "Expected space geometry visible inside its frame.",
              path: ["objects", index],
            },
          ]
    ),
    ...Arr.flatMap(labels, (label, index): Schema.FilterIssue[] =>
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
    ...viewIssues,
  ];
}
