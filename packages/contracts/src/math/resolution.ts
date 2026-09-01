import type { Schema } from "effect";

import type { PlanePoint, SpacePoint } from "#contracts/math/base";
import {
  type CollisionPath,
  type CollisionPointEntry,
  concentricRadiusCollisionPaths,
  coordinateCollisionPaths,
  cuboidCollisionEntries,
  radialBoundaryCollisionPaths,
} from "#contracts/math/collision";
import type { AxisTraversal } from "#contracts/math/intersection";
import type {
  PlaneLabelAnchor,
  PlaneMathFrame,
  PlaneMathObject,
  PlaneMathView,
} from "#contracts/math/plane";
import {
  arcCurvatureUnresolved,
  arcEndpointsUnresolved,
  axisEnvelopePairs,
  axisSpan,
  measureUnresolved,
  polygonAltitudeUnresolved,
  quadraticCurvatureUnresolved,
  type RenderThreshold,
  renderThreshold,
  spanUnresolved,
  visiblePathResolvable,
} from "#contracts/math/precision";
import type {
  SpaceLabelAnchor,
  SpaceMathFrame,
  SpaceMathObject,
  SpaceMathView,
} from "#contracts/math/space";

/** One stable authoring failure for geometry below renderer resolution. */
export const MATH_VISUAL_RESOLUTION_MESSAGE =
  "Expected every non-zero mathematical visual delta to be at least 2^-23 of its combined render envelope.";

type IssuePath = CollisionPath;

/** Places the shared resolution failure at one authored schema path. */
function issue(path: IssuePath): Schema.FilterIssue {
  return { issue: MATH_VISUAL_RESOLUTION_MESSAGE, path };
}

/** Lifts plane coordinates onto the zero-z space used by shared checks. */
function coordinate(point: PlanePoint | SpacePoint): SpacePoint {
  return { x: point.x, y: point.y, z: "z" in point ? point.z : 0 };
}

/** Collects rich-label anchors as collision-aware scene points. */
function labelPointEntries(
  labels: readonly (PlaneLabelAnchor | SpaceLabelAnchor)[]
): CollisionPointEntry[] {
  return labels.map((label, index) => ({
    path: ["labels", index, "at"],
    point: coordinate(label.at),
  }));
}

/** Collects semantic camera or isometric targets as scene points. */
function viewPointEntries(view: SpaceMathView): CollisionPointEntry[] {
  if (view.kind === "camera") {
    return [
      { path: ["view", "position"], point: view.position },
      { path: ["view", "target"], point: view.target },
    ];
  }
  return view.kind === "isometric" && view.target
    ? [{ path: ["view", "target"], point: view.target }]
    : [];
}

/** Collects every finite position authored by one mathematical object. */
function objectPointEntries(
  object: PlaneMathObject | SpaceMathObject,
  index: number
): CollisionPointEntry[] {
  const root: IssuePath = ["objects", index];
  if (object.kind === "point") {
    return [{ path: [...root, "at"], point: coordinate(object.at) }];
  }
  if (object.kind === "ray") {
    return [{ path: [...root, "from"], point: coordinate(object.from) }];
  }
  if (object.kind === "segment") {
    return [
      { path: [...root, "from"], point: coordinate(object.from) },
      { path: [...root, "to"], point: coordinate(object.to) },
    ];
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return object.vertices.map((point, pointIndex) => ({
      path: [...root, "vertices", pointIndex],
      point: coordinate(point),
    }));
  }
  if (object.kind === "circle" || object.kind === "arc") {
    return [{ path: [...root, "center"], point: coordinate(object.center) }];
  }
  if (object.kind === "cuboid") {
    return [{ path: [...root, "center"], point: object.center }];
  }
  return [];
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

/** Checks polygon altitude and infinite-path visible extent. */
function objectResolutionIssues(
  frame: PlaneMathFrame | SpaceMathFrame,
  object: PlaneMathObject | SpaceMathObject,
  index: number,
  threshold: RenderThreshold
) {
  const root: IssuePath = ["objects", index];
  if (object.kind === "polygon") {
    return polygonAltitudeUnresolved(object.vertices, threshold)
      ? [issue(root)]
      : [];
  }
  if (object.kind !== "line" && object.kind !== "ray") {
    return [];
  }
  const [from, through] =
    object.kind === "line" ? object.through : [object.from, object.through];
  return visiblePathResolvable(
    object.kind,
    pathAxes(frame, coordinate(from), coordinate(through)),
    threshold
  )
    ? []
    : [issue(root)];
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
    return arcEndpointsUnresolved(
      object.radius,
      object.sweepDegrees,
      threshold
    ) || arcCurvatureUnresolved(object.radius, object.sweepDegrees, threshold)
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
  return objectResolutionIssues(frame, object, index, threshold);
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
  labels: readonly PlaneLabelAnchor[],
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
    ...coordinateCollisionPaths(
      frame,
      [
        ...objects.flatMap((object, index) =>
          objectPointEntries(object, index)
        ),
        ...labelPointEntries(labels),
      ],
      [],
      threshold
    ).map(issue),
    ...radialBoundaryCollisionPaths(frame, objects, threshold).map(issue),
    ...concentricRadiusCollisionPaths(objects, threshold).map(issue),
    ...objects.flatMap((object, index) =>
      planeObjectIssues(frame, object, index, threshold)
    ),
  ];
}

/** Reports every space delta that a normalized renderer cannot preserve. */
export function spaceResolutionIssues(
  frame: SpaceMathFrame,
  objects: readonly SpaceMathObject[],
  labels: readonly SpaceLabelAnchor[],
  view: SpaceMathView
): readonly Schema.FilterIssue[] {
  const envelopePairs: ReadonlyArray<readonly [number, number]> =
    view.kind === "camera"
      ? [
          ...axisEnvelopePairs(frame.x, view.position.x, view.target.x),
          ...axisEnvelopePairs(frame.y, view.position.y, view.target.y),
          ...axisEnvelopePairs(frame.z, view.position.z, view.target.z),
        ]
      : [];
  const threshold = renderThreshold(
    [frame.x, frame.y, frame.z],
    view.kind === "fit" ? (view.padding ?? 0) : 0,
    envelopePairs
  );
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
    ...coordinateCollisionPaths(
      frame,
      [
        ...viewPointEntries(view),
        ...objects.flatMap((object, index) =>
          objectPointEntries(object, index)
        ),
        ...labelPointEntries(labels),
      ],
      cuboidCollisionEntries(objects),
      threshold
    ).map(issue),
    ...objects.flatMap((object, index) =>
      objectResolutionIssues(frame, object, index, threshold)
    ),
  ];
}
