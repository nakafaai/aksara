import type { Schema } from "effect";

import type { PlanePoint, SpacePoint } from "#contracts/math/base";
import type { AxisTraversal } from "#contracts/math/intersection";
import type {
  PlaneMathFrame,
  PlaneMathObject,
  PlaneMathView,
} from "#contracts/math/plane";
import {
  arcEndpointsUnresolved,
  axisSpan,
  deltaUnresolved,
  measureUnresolved,
  quadraticCurvatureUnresolved,
  type RenderThreshold,
  renderThreshold,
  spanUnresolved,
  visiblePathResolvable,
} from "#contracts/math/precision";
import type {
  SpaceMathFrame,
  SpaceMathObject,
  SpaceMathView,
} from "#contracts/math/space";

/** One stable authoring failure for geometry below renderer resolution. */
export const MATH_VISUAL_RESOLUTION_MESSAGE =
  "Expected every non-zero mathematical visual delta to be at least 2^-23 of its combined render envelope.";

type IssuePath = Array<number | string>;
interface PointEntry {
  readonly path: IssuePath;
  readonly point: SpacePoint;
}

/** Places the shared resolution failure at one authored schema path. */
function issue(path: IssuePath): Schema.FilterIssue {
  return { issue: MATH_VISUAL_RESOLUTION_MESSAGE, path };
}

/** Lifts plane coordinates onto the zero-z space used by shared checks. */
function coordinate(point: PlanePoint | SpacePoint): SpacePoint {
  return { x: point.x, y: point.y, z: "z" in point ? point.z : 0 };
}

/** Reports non-zero coordinate components that collapse within one object. */
function pointIssues(
  entries: readonly PointEntry[],
  threshold: RenderThreshold
) {
  const issues: Schema.FilterIssue[] = [];
  for (const [rightIndex, right] of entries.entries()) {
    for (const axis of ["x", "y", "z"] as const) {
      const rightValue = right.point[axis];
      if (
        entries
          .slice(0, rightIndex)
          .some((left) =>
            deltaUnresolved(left.point[axis], rightValue, threshold)
          )
      ) {
        issues.push(issue([...right.path, axis]));
      }
    }
  }
  return issues;
}

/** Maps one directed path onto every axis of its authored frame. */
function pathAxes(
  frame: PlaneMathFrame | SpaceMathFrame,
  from: SpacePoint,
  through: SpacePoint
): AxisTraversal[] {
  const axes = [
    { range: frame.x, start: from.x, through: through.x },
    { range: frame.y, start: from.y, through: through.y },
  ];
  return "z" in frame
    ? [
        ...axes,
        {
          range: frame.z,
          start: from.z,
          through: through.z,
        },
      ]
    : axes;
}

/** Reports one non-zero authored measure below the scene threshold. */
function measureIssue(
  value: number,
  threshold: RenderThreshold,
  path: IssuePath
): Schema.FilterIssue[] {
  return measureUnresolved(value, threshold) ? [issue(path)] : [];
}

/** Checks finite point separation and infinite-path visible extent. */
function pathObjectIssues(
  frame: PlaneMathFrame | SpaceMathFrame,
  object: PlaneMathObject | SpaceMathObject,
  index: number,
  threshold: RenderThreshold
) {
  const root: IssuePath = ["objects", index];
  let entries: PointEntry[] = [];
  if (object.kind === "line") {
    entries = object.through.map((point, pointIndex) => ({
      path: [...root, "through", pointIndex],
      point: coordinate(point),
    }));
  } else if (object.kind === "ray") {
    entries = [
      { path: [...root, "from"], point: coordinate(object.from) },
      { path: [...root, "through"], point: coordinate(object.through) },
    ];
  } else if (object.kind === "segment") {
    entries = [
      { path: [...root, "from"], point: coordinate(object.from) },
      { path: [...root, "to"], point: coordinate(object.to) },
    ];
  } else if (object.kind === "polyline" || object.kind === "polygon") {
    entries = object.vertices.map((point, pointIndex) => ({
      path: [...root, "vertices", pointIndex],
      point: coordinate(point),
    }));
  }
  const issues = pointIssues(entries, threshold);
  if (object.kind !== "line" && object.kind !== "ray") {
    return issues;
  }
  const [from, through] =
    object.kind === "line" ? object.through : [object.from, object.through];
  return visiblePathResolvable(
    object.kind,
    pathAxes(frame, coordinate(from), coordinate(through)),
    threshold
  )
    ? issues
    : [...issues, issue(root)];
}

/** Applies plane-specific measure and exact curve-resolution checks. */
function planeObjectIssues(
  frame: PlaneMathFrame,
  object: PlaneMathObject,
  index: number,
  threshold: RenderThreshold
) {
  const root: IssuePath = ["objects", index];
  if (object.kind === "circle") {
    return measureIssue(object.radius, threshold, [...root, "radius"]);
  }
  if (object.kind === "arc") {
    const radiusIssues = measureIssue(object.radius, threshold, [
      ...root,
      "radius",
    ]);
    return arcEndpointsUnresolved(object.radius, object.sweepDegrees, threshold)
      ? [...radiusIssues, issue([...root, "sweepDegrees"])]
      : radiusIssues;
  }
  if (object.kind === "quadratic") {
    const domainSpan = axisSpan(object.domain);
    const domainIssues = spanUnresolved(object.domain, threshold)
      ? [issue([...root, "domain"])]
      : [];
    return quadraticCurvatureUnresolved(
      object.coefficients.a,
      domainSpan,
      threshold
    )
      ? [...domainIssues, issue([...root, "coefficients", "a"])]
      : domainIssues;
  }
  return pathObjectIssues(frame, object, index, threshold);
}

/** Reports every frame axis whose non-zero span collapses in the envelope. */
function frameIssues(
  entries: readonly {
    readonly axis: "x" | "y" | "z";
    readonly range: PlaneMathFrame["x"];
  }[],
  threshold: RenderThreshold
) {
  return entries.flatMap(({ axis, range }) =>
    spanUnresolved(range, threshold) ? [issue(["frame", axis])] : []
  );
}

/** Reports every plane delta that a normalized renderer cannot preserve. */
export function planeResolutionIssues(
  frame: PlaneMathFrame,
  objects: readonly PlaneMathObject[],
  view: PlaneMathView
): readonly Schema.FilterIssue[] {
  const threshold = renderThreshold([frame.x, frame.y], view.padding ?? 0);
  return [
    ...frameIssues(
      [
        { axis: "x", range: frame.x },
        { axis: "y", range: frame.y },
      ],
      threshold
    ),
    ...measureIssue(view.padding ?? 0, threshold, ["view", "padding"]),
    ...objects.flatMap((object, index) =>
      planeObjectIssues(frame, object, index, threshold)
    ),
  ];
}

/** Reports every space delta that a normalized renderer cannot preserve. */
export function spaceResolutionIssues(
  frame: SpaceMathFrame,
  objects: readonly SpaceMathObject[],
  view: SpaceMathView
): readonly Schema.FilterIssue[] {
  const cameraPairs: ReadonlyArray<readonly [number, number]> =
    view.kind === "camera"
      ? [
          [view.position.x, view.target.x],
          [view.position.y, view.target.y],
          [view.position.z, view.target.z],
        ]
      : [];
  const threshold = renderThreshold(
    [frame.x, frame.y, frame.z],
    view.kind === "fit" ? (view.padding ?? 0) : 0,
    cameraPairs
  );
  const cameraIssues =
    view.kind === "camera"
      ? pointIssues(
          [
            { path: ["view", "position"], point: view.position },
            { path: ["view", "target"], point: view.target },
          ],
          threshold
        )
      : [];
  return [
    ...frameIssues(
      [
        { axis: "x", range: frame.x },
        { axis: "y", range: frame.y },
        { axis: "z", range: frame.z },
      ],
      threshold
    ),
    ...measureIssue(view.kind === "fit" ? (view.padding ?? 0) : 0, threshold, [
      "view",
      "padding",
    ]),
    ...cameraIssues,
    ...objects.flatMap((object, index) => {
      if (object.kind !== "cuboid") {
        return pathObjectIssues(frame, object, index, threshold);
      }
      return (["height", "length", "width"] as const).flatMap((dimension) =>
        measureIssue(object.size[dimension], threshold, [
          "objects",
          index,
          "size",
          dimension,
        ])
      );
    }),
  ];
}
