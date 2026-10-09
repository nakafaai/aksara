import { Array as Arr, type BigDecimal, Schema } from "effect";

import {
  type PlanePoint,
  type SceneAxis,
  SceneAxisSchema,
  type SpacePoint,
} from "#contracts/math/base";
import type { AxisRange } from "#contracts/math/extent";
import {
  AxisTraversalSchema,
  type InfinitePathKind,
  infinitePathInterval,
} from "#contracts/math/intersection";
import type { PlaneMathFrame } from "#contracts/math/plane";
import {
  type RenderThreshold,
  visiblePathResolvable,
} from "#contracts/math/precision";
import {
  affineRatio,
  type ExactRatio,
  ExactRatioSchema,
  numberRatio,
} from "#contracts/math/rational";
import type { SpaceMathFrame } from "#contracts/math/space";

export const ScenePathSchema = Schema.mutable(
  Schema.Array(Schema.Union([Schema.Finite, Schema.String]))
);
export type ScenePath = typeof ScenePathSchema.Type;

/** One ordered exact coordinate projected from a complete visual scene. */
const SceneCoordinateSchema = Schema.Struct({
  axis: SceneAxisSchema,
  error: Schema.optionalKey(Schema.BigDecimal),
  path: ScenePathSchema,
  reportable: Schema.Boolean,
  value: ExactRatioSchema,
});
export type SceneCoordinate = typeof SceneCoordinateSchema.Type;

export type SceneFrame = PlaneMathFrame | SpaceMathFrame;

const SceneAxisTraversalSchema = Schema.Struct({
  ...AxisTraversalSchema.fields,
  axis: SceneAxisSchema,
});
type SceneAxisTraversal = typeof SceneAxisTraversalSchema.Type;

/** Creates one reportable exact scene coordinate. */
export function sceneCoordinate(
  axis: SceneAxis,
  path: ScenePath,
  value: ExactRatio,
  reportable = true,
  error?: BigDecimal.BigDecimal
): SceneCoordinate {
  return error === undefined
    ? { axis, path, reportable, value }
    : { axis, error, path, reportable, value };
}

/** Projects every axis of one finite point in authored order. */
export function pointCoordinates(
  point: PlanePoint | SpacePoint,
  path: ScenePath
): SceneCoordinate[] {
  return [
    sceneCoordinate("x", [...path, "x"], numberRatio(point.x)),
    sceneCoordinate("y", [...path, "y"], numberRatio(point.y)),
    ...("z" in point
      ? [sceneCoordinate("z", [...path, "z"], numberRatio(point.z))]
      : []),
  ];
}

/** Seeds every frame edge before reportable scene coordinates. */
export function frameCoordinates(frame: SceneFrame): SceneCoordinate[] {
  const axes: ReadonlyArray<readonly [SceneAxis, AxisRange]> = [
    ["x", frame.x],
    ["y", frame.y],
    ...("z" in frame ? ([["z", frame.z]] as const) : []),
  ];
  return Arr.flatMap(axes, ([axis, range]) => [
    sceneCoordinate(axis, ["frame", axis], numberRatio(range.min), false),
    sceneCoordinate(axis, ["frame", axis], numberRatio(range.max), false),
  ]);
}

/** Maps one directed path onto every axis of its authored frame. */
export function pathAxes(
  frame: SceneFrame,
  from: PlanePoint | SpacePoint,
  through: PlanePoint | SpacePoint
): SceneAxisTraversal[] {
  const axes: SceneAxisTraversal[] = [
    { axis: "x", range: frame.x, start: from.x, through: through.x },
    { axis: "y", range: frame.y, start: from.y, through: through.y },
  ];
  return "z" in frame && "z" in from && "z" in through
    ? [
        ...axes,
        {
          axis: "z",
          range: frame.z,
          start: from.z,
          through: through.z,
        },
      ]
    : axes;
}

/** Projects the canonical exact endpoints of one frame-clipped line or ray. */
export function clippedPathCoordinates(
  frame: SceneFrame,
  kind: InfinitePathKind,
  from: PlanePoint | SpacePoint,
  through: PlanePoint | SpacePoint,
  path: ScenePath,
  threshold: RenderThreshold
): SceneCoordinate[] {
  const axes = pathAxes(frame, from, through);
  const interval = infinitePathInterval(kind, axes);
  if (!(interval?.entry && interval.exit)) {
    return [];
  }
  if (!visiblePathResolvable(kind, axes, threshold)) {
    return [];
  }
  return Arr.flatMap([interval.entry, interval.exit], (parameter) =>
    Arr.map(axes, (axis) =>
      sceneCoordinate(
        axis.axis,
        path,
        affineRatio(axis.start, axis.through, parameter)
      )
    )
  );
}
