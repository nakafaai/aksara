import { Array as Arr, type Schema } from "effect";

import type {
  PlaneMathFrame,
  PlaneMathObject,
  PlaneMathView,
} from "#contracts/math/plane";

/**
 * The plane objects whose meaning is their shape: a circle is round, an arc's
 * angle is true, a polygon's sides keep their proportion, and a vector or a
 * ray points the way it is drawn. A parametric curve counts, because circles
 * and angle marks are drawn with it. A scene that draws one keeps one scale on
 * both axes; any other plane scene is a graph, which may scale each axis on
 * its own.
 */
export const PLANE_FIGURE_KINDS = [
  "arc",
  "circle",
  "implicit",
  "parametric",
  "polar",
  "polygon",
  "ray",
  "vector",
] as const satisfies readonly PlaneMathObject["kind"][];

/** Whether a plane scene keeps one scale on both axes, because it draws a figure. */
export function keepsShape(objects: readonly PlaneMathObject[]) {
  return Arr.some(objects, ({ kind }) =>
    Arr.contains<string>(PLANE_FIGURE_KINDS, kind)
  );
}

/**
 * The aspects, wide over tall and padding included, between which a frame
 * kept at one scale fills a card on a phone and on a desk: a wider frame
 * shrinks the figure to a strip, a taller one to a column.
 */
const FIGURE_ASPECT = { max: 2, min: 0.7 };

/** A number of a frame's message, to two decimals at most. */
function short(value: number) {
  return String(Math.round(value * 100) / 100);
}

/**
 * Guardrail G1: the frame of a plane scene that keeps one scale is between
 * 0.7 and 2 times as wide as it is tall, padding included. The frame is only
 * the region the figure teaches, and the world continues past it, so a frame
 * stretched to reach a far point only shrinks the figure.
 */
export function figureAspectIssues(
  frame: PlaneMathFrame,
  objects: readonly PlaneMathObject[],
  view: PlaneMathView
): readonly Schema.FilterIssue[] {
  if (!keepsShape(objects)) {
    return [];
  }
  const padding = view.padding ?? 0;
  // Halves keep a frame as wide as the largest finite numbers from overflowing.
  const halfWidth = frame.x.max / 2 - frame.x.min / 2 + padding;
  const halfHeight = frame.y.max / 2 - frame.y.min / 2 + padding;
  const aspect = halfWidth / halfHeight;
  const width = 2 * halfWidth;
  const height = 2 * halfHeight;
  return aspect >= FIGURE_ASPECT.min && aspect <= FIGURE_ASPECT.max
    ? []
    : [
        {
          issue: `Expected the frame of a scene that keeps one scale (it draws one of: ${Arr.join(PLANE_FIGURE_KINDS, ", ")}) to be between ${FIGURE_ASPECT.min} and ${FIGURE_ASPECT.max} times as wide as it is tall, padding included; this frame is ${short(width)} by ${short(height)} (${short(aspect)}). Frame the region the figure teaches: the grid, the axes and every unbounded object continue past it.`,
          path: ["frame"],
        },
      ];
}
