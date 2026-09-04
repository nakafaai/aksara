import { BigDecimal } from "effect";

import {
  arcCurvatureUnresolved,
  arcEndpointsUnresolved,
} from "#contracts/math/arc-precision";
import {
  clippedPathCoordinates,
  sceneCoordinate as coordinate,
  frameCoordinates,
  pointCoordinates,
  type SceneCoordinate,
  type SceneFrame,
  type ScenePath,
} from "#contracts/math/coordinate";
import {
  cuboidExtents,
  quadraticExtrema,
  radialOffsets,
} from "#contracts/math/extent";
import type {
  PlaneLabelAnchor,
  PlaneMathFrame,
  PlaneMathObject,
} from "#contracts/math/plane";
import {
  axisSpan,
  measureUnresolved,
  quadraticCurvatureUnresolved,
  type RenderThreshold,
  spanUnresolved,
} from "#contracts/math/precision";
import { decimal, decimalRatio } from "#contracts/math/rational";
import type {
  SpaceLabelAnchor,
  SpaceMathFrame,
  SpaceMathObject,
  SpaceMathView,
} from "#contracts/math/space";

/** Projects exact cardinal extrema from one circle or directed arc. */
function radialCoordinates(
  object: Extract<PlaneMathObject, { readonly kind: "arc" | "circle" }>,
  path: ScenePath,
  threshold: RenderThreshold
): SceneCoordinate[] {
  if (measureUnresolved(object.radius, threshold)) {
    return [];
  }
  if (
    object.kind === "arc" &&
    (arcEndpointsUnresolved(object.radius, object.sweepDegrees, threshold) ||
      arcCurvatureUnresolved(object.radius, object.sweepDegrees, threshold))
  ) {
    return [];
  }
  return radialOffsets(object).flatMap((offset) => [
    coordinate(
      "x",
      path,
      decimalRatio(BigDecimal.sum(decimal(object.center.x), offset.x)),
      true,
      offset.error
    ),
    coordinate(
      "y",
      path,
      decimalRatio(BigDecimal.sum(decimal(object.center.y), offset.y)),
      true,
      offset.error
    ),
  ]);
}

/** Owns one stable path for radial geometry-resolution failures. */
export function radialGeometryPath(
  kind: "arc" | "circle",
  index: number
): ScenePath {
  return kind === "arc" ? ["objects", index] : ["objects", index, "radius"];
}

/** Projects the exact endpoints and in-domain vertex of one quadratic. */
function quadraticCoordinates(
  object: Extract<PlaneMathObject, { readonly kind: "quadratic" }>,
  path: ScenePath,
  threshold: RenderThreshold
): SceneCoordinate[] {
  const domainSpan = axisSpan(object.domain);
  if (
    spanUnresolved(object.domain, threshold) ||
    quadraticCurvatureUnresolved(object.coefficients.a, domainSpan, threshold)
  ) {
    return [];
  }
  const { inputAxis } = object;
  const outputAxis = inputAxis === "x" ? "y" : "x";
  return quadraticExtrema(object).flatMap(({ input, output }) => [
    coordinate(inputAxis, path, input),
    coordinate(outputAxis, path, output),
  ]);
}

/** Projects the center and exact face coordinates of one cuboid. */
function cuboidCoordinates(
  object: Extract<SpaceMathObject, { readonly kind: "cuboid" }>,
  path: ScenePath
): SceneCoordinate[] {
  return [
    ...pointCoordinates(object.center, [...path, "center"]),
    ...cuboidExtents(object).flatMap(({ axis, center, dimension, extent }) => [
      coordinate(
        axis,
        [...path, "size", dimension],
        decimalRatio(BigDecimal.subtract(decimal(center), extent))
      ),
      coordinate(
        axis,
        [...path, "size", dimension],
        decimalRatio(BigDecimal.sum(decimal(center), extent))
      ),
    ]),
  ];
}

/** Projects every finite or frame-clipped coordinate of one scene object. */
function objectCoordinates(
  frame: SceneFrame,
  object: PlaneMathObject | SpaceMathObject,
  index: number,
  threshold: RenderThreshold
): SceneCoordinate[] {
  const root: ScenePath = ["objects", index];
  if (object.kind === "point") {
    return pointCoordinates(object.at, [...root, "at"]);
  }
  if (object.kind === "line") {
    const [from, through] = object.through;
    return clippedPathCoordinates(
      frame,
      "line",
      from,
      through,
      root,
      threshold
    );
  }
  if (object.kind === "ray") {
    return clippedPathCoordinates(
      frame,
      "ray",
      object.from,
      object.through,
      root,
      threshold
    );
  }
  if (object.kind === "segment") {
    return [
      ...pointCoordinates(object.from, [...root, "from"]),
      ...pointCoordinates(object.to, [...root, "to"]),
    ];
  }
  if (object.kind === "polyline" || object.kind === "polygon") {
    return object.vertices.flatMap((point, pointIndex) =>
      pointCoordinates(point, [...root, "vertices", pointIndex])
    );
  }
  if (object.kind === "circle" || object.kind === "arc") {
    return [
      ...pointCoordinates(object.center, [...root, "center"]),
      ...radialCoordinates(
        object,
        radialGeometryPath(object.kind, index),
        threshold
      ),
    ];
  }
  if (object.kind === "quadratic") {
    return quadraticCoordinates(object, root, threshold);
  }
  return cuboidCoordinates(object, root);
}

/** Projects all label anchors after the objects they annotate. */
function labelCoordinates(
  labels: readonly (PlaneLabelAnchor | SpaceLabelAnchor)[]
) {
  return labels.flatMap((label, index) =>
    pointCoordinates(label.at, ["labels", index, "at"])
  );
}

/** Projects semantic camera or isometric coordinates before space objects. */
function viewCoordinates(view: SpaceMathView) {
  if (view.kind === "camera") {
    return [
      ...pointCoordinates(view.position, ["view", "position"]),
      ...pointCoordinates(view.target, ["view", "target"]),
    ];
  }
  return view.kind === "isometric" && view.target
    ? pointCoordinates(view.target, ["view", "target"])
    : [];
}

/** Projects one plane scene into a single ordered exact coordinate stream. */
export function planeSceneCoordinates(
  frame: PlaneMathFrame,
  objects: readonly PlaneMathObject[],
  labels: readonly PlaneLabelAnchor[],
  threshold: RenderThreshold
) {
  return [
    ...frameCoordinates(frame),
    ...objects.flatMap((object, index) =>
      objectCoordinates(frame, object, index, threshold)
    ),
    ...labelCoordinates(labels),
  ];
}

/** Projects one space scene into a single ordered exact coordinate stream. */
export function spaceSceneCoordinates(
  frame: SpaceMathFrame,
  objects: readonly SpaceMathObject[],
  labels: readonly SpaceLabelAnchor[],
  view: SpaceMathView,
  threshold: RenderThreshold
) {
  return [
    ...frameCoordinates(frame),
    ...viewCoordinates(view),
    ...objects.flatMap((object, index) =>
      objectCoordinates(frame, object, index, threshold)
    ),
    ...labelCoordinates(labels),
  ];
}
