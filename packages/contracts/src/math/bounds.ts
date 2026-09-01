import type { Schema } from "effect";
import {
  arcContained,
  axisContains,
  circleContained,
  cuboidContained,
  quadraticContained,
} from "#contracts/math/extent";
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

/** Checks whether one plane object has complete visible geometry in its frame. */
function planeObjectContained(
  frame: PlaneMathFrame,
  object: PlaneMathObject
): boolean {
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
    return [object.from, object.to].every((point) =>
      planeContains(frame, point)
    );
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return object.vertices.every((point) => planeContains(frame, point));
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
  object: SpaceMathObject
): boolean {
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
    return [object.from, object.to].every((point) =>
      spaceContains(frame, point)
    );
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return object.vertices.every((point) => spaceContains(frame, point));
  }
  return cuboidContained(frame, object);
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
              issue: "Expected plane geometry visible inside its frame.",
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

/** Reports every finite space object, label, or view target outside its frame. */
export function spaceBoundsIssues(
  frame: SpaceMathFrame,
  objects: readonly SpaceMathObject[],
  labels: readonly SpaceLabelAnchor[],
  view: SpaceMathView
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
    ...objects.flatMap((object, index): Schema.FilterIssue[] =>
      spaceObjectContained(frame, object)
        ? []
        : [
            {
              issue: "Expected space geometry visible inside its frame.",
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
    ...viewIssues,
  ];
}
