import type { Schema } from "effect";
import { Array as Arr, BigDecimal, Option } from "effect";

import type { PlanePoint } from "#contracts/math/base";
import type { PlaneMathFrame, PlaneMathObject } from "#contracts/math/plane";
import { decimal } from "#contracts/math/rational";
import { straightPoints } from "#contracts/math/straight";

/** A straight line of the scene, named by two of its points. */
type Carrier = readonly [PlanePoint, PlanePoint];

/** The x axis and the y axis, which every plane scene draws. */
const AXES: readonly Carrier[] = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ],
];

/**
 * Whether a point stands exactly on a line, by the cross product of decimal
 * coordinates: a corner at an authored approximation such as 3.33 is not on
 * the line it approximates, so the rule never guesses.
 */
function onCarrier([from, through]: Carrier, point: PlanePoint) {
  const cross = BigDecimal.subtract(
    BigDecimal.multiply(
      BigDecimal.subtract(decimal(through.x), decimal(from.x)),
      BigDecimal.subtract(decimal(point.y), decimal(from.y))
    ),
    BigDecimal.multiply(
      BigDecimal.subtract(decimal(through.y), decimal(from.y)),
      BigDecimal.subtract(decimal(point.x), decimal(from.x))
    )
  );
  return BigDecimal.isZero(cross);
}

/** The edges of a polygon, the last one closing it back to its first corner. */
function edges(vertices: readonly PlanePoint[]) {
  return Arr.zip(vertices, [
    ...Arr.drop(vertices, 1),
    ...Arr.take(vertices, 1),
  ]);
}

/**
 * How close to a side of the frame, as a share of the frame's width or
 * height, an edge stands when it closes a shape where the frame happens to
 * end: authors cut an open region at the frame or just inside its padding.
 */
const SIDE_BAND = 0.1;

/** Whether an edge runs along a side of the frame, within its band. */
function alongSide({ x, y }: PlaneMathFrame, [from, to]: Carrier) {
  const width = (x.max - x.min) * SIDE_BAND;
  const height = (y.max - y.min) * SIDE_BAND;
  return (
    (from.x <= x.min + width && to.x <= x.min + width) ||
    (from.x >= x.max - width && to.x >= x.max - width) ||
    (from.y <= y.min + height && to.y <= y.min + height) ||
    (from.y >= y.max - height && to.y >= y.max - height)
  );
}

/**
 * Guardrail G2: a polygon cut out by the scene's lines, with an edge along a
 * line or a straight graph, may not close along the frame. The frame only says
 * where the reader looks first and the plane continues past it, so an edge
 * near a side of the frame that lies on no line, ray, segment, graph or axis
 * is invented: it turns an open region into a closed one. Such a part of the
 * plane is a `region` of inequalities, which continues past the frame.
 */
export function inventedEdgeIssues(
  frame: PlaneMathFrame,
  objects: readonly PlaneMathObject[]
): readonly Schema.FilterIssue[] {
  const carriers = [...Arr.getSomes(Arr.map(objects, straightPoints)), ...AXES];
  // The lines that cut the plane without end: lines and straight graphs.
  const cuts = Arr.getSomes(
    Arr.map(objects, (object) =>
      object.kind === "line" || object.kind === "function"
        ? straightPoints(object)
        : Option.none()
    )
  );
  /** Whether an edge lies along one of some lines. */
  const along = (lines: readonly Carrier[], [from, to]: Carrier) =>
    Arr.some(lines, (line) => onCarrier(line, from) && onCarrier(line, to));
  return Arr.flatMap(objects, (object, index): Schema.FilterIssue[] =>
    object.kind === "polygon" &&
    Arr.some(edges(object.vertices), (edge) => along(cuts, edge))
      ? Arr.findFirst(
          edges(object.vertices),
          (edge) => alongSide(frame, edge) && !along(carriers, edge)
        ).pipe(
          Option.match({
            onNone: () => [],
            onSome: ([from, to]) => [
              {
                issue: `Expected the polygon "${object.id}" to close only along lines of the scene; its edge from (${from.x}, ${from.y}) to (${to.x}, ${to.y}) runs along the frame's edge and lies on no line, ray, segment, graph or axis, so it closes an open region with an invented edge. Draw it as { kind: "region", inequalities: [...] }, which continues past the frame, and bound it only where the mathematics does, such as x <= 7 for an area up to 7.`,
                path: ["objects", index],
              },
            ],
          })
        )
      : []
  );
}
