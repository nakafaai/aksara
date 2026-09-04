import type { Schema } from "effect";

import {
  arcCurvatureUnresolved,
  arcEndpointAxesUnresolved,
  arcEndpointsUnresolved,
} from "#contracts/math/arc-precision";
import {
  concentricRadiusCollisionPaths,
  coordinateCollisionPaths,
} from "#contracts/math/collision";
import { pathAxes, type ScenePath } from "#contracts/math/coordinate";
import type {
  PlaneLabelAnchor,
  PlaneMathFrame,
  PlaneMathObject,
  PlaneMathView,
} from "#contracts/math/plane";
import {
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
import {
  planeSceneCoordinates,
  spaceSceneCoordinates,
} from "#contracts/math/scene";
import type {
  SpaceLabelAnchor,
  SpaceMathFrame,
  SpaceMathObject,
  SpaceMathView,
} from "#contracts/math/space";

/** One stable authoring failure for geometry below renderer resolution. */
export const MATH_VISUAL_RESOLUTION_MESSAGE =
  "Expected every non-zero mathematical visual delta to be at least 2^-23 of its combined render envelope.";

type IssuePath = ScenePath;

interface ResolutionIssue {
  readonly issue: typeof MATH_VISUAL_RESOLUTION_MESSAGE;
  readonly path: IssuePath;
}

/** Places the shared resolution failure at one authored schema path. */
function issue(path: IssuePath): ResolutionIssue {
  return { issue: MATH_VISUAL_RESOLUTION_MESSAGE, path };
}

/** Removes repeated issue paths while preserving first-cause order. */
function uniqueIssues(issues: readonly ResolutionIssue[]) {
  return [
    ...new Map(
      issues.map((candidate) => [JSON.stringify(candidate.path), candidate])
    ).values(),
  ];
}

/** Reports one non-zero authored measure below the scene threshold. */
function measureIssue(
  value: number,
  threshold: RenderThreshold,
  path: IssuePath
): ResolutionIssue[] {
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
    pathAxes(frame, from, through),
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
    const shapeUnresolved =
      arcEndpointsUnresolved(object.radius, object.sweepDegrees, threshold) ||
      arcCurvatureUnresolved(object.radius, object.sweepDegrees, threshold);
    if (shapeUnresolved) {
      return [...radiusIssues, issue([...root, "sweepDegrees"])];
    }
    return arcEndpointAxesUnresolved(
      object.radius,
      object.startDegrees,
      object.sweepDegrees,
      threshold
    )
      ? [...radiusIssues, issue(root)]
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
  return uniqueIssues([
    ...frameIssues(
      [
        { axis: "x", range: frame.x },
        { axis: "y", range: frame.y },
      ],
      threshold
    ),
    ...measureIssue(view.padding ?? 0, threshold, ["view", "padding"]),
    ...coordinateCollisionPaths(
      planeSceneCoordinates(frame, objects, labels, threshold),
      threshold
    ).map(issue),
    ...concentricRadiusCollisionPaths(objects, threshold).map(issue),
    ...objects.flatMap((object, index) =>
      planeObjectIssues(frame, object, index, threshold)
    ),
  ]);
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
  return uniqueIssues([
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
      spaceSceneCoordinates(frame, objects, labels, view, threshold),
      threshold
    ).map(issue),
    ...objects.flatMap((object, index) =>
      objectResolutionIssues(frame, object, index, threshold)
    ),
  ]);
}
