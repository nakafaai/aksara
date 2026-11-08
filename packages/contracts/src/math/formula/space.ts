import { Array as Arr, Result } from "effect";

import type { FormulaScope } from "#contracts/math/formula/compile";
import { sampleGrid } from "#contracts/math/formula/mesh";
import {
  compileText,
  evaluateWith,
  type FormulaGeometry,
} from "#contracts/math/formula/plane";
import {
  type SampleBox,
  type SamplePoint,
  sampleCurve,
} from "#contracts/math/formula/sample";
import type { SpaceSolidObjectSchemas } from "#contracts/math/solid";

type Face = readonly [SamplePoint, SamplePoint, SamplePoint, ...SamplePoint[]];

/** The space objects a formula or a face defines. */
export type SpaceFormulaObject =
  (typeof SpaceSolidObjectSchemas)[number]["Type"];

const FULL_TURN = { max: 2 * Math.PI, min: 0 };

/** Moves one point by an offset. */
function shifted(point: SamplePoint, offset: SamplePoint): SamplePoint {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
    z: point.z + offset.z,
  };
}

/** Pairs each corner of a face with the next one, wrapping to the first. */
function edges(face: Face) {
  return Arr.zip(face, Arr.append(Arr.drop(face, 1), Arr.headNonEmpty(face)));
}

/** The faces of a prism: both bases and one quadrilateral per base edge. */
function prismFaces(base: Face, offset: SamplePoint): readonly SamplePoint[][] {
  const top = Arr.map(base, (corner) => shifted(corner, offset));
  return [
    [...base],
    [...top],
    ...Arr.map(edges(base), ([from, to]) => [
      from,
      to,
      shifted(to, offset),
      shifted(from, offset),
    ]),
  ];
}

/** The faces of a pyramid: its base and one triangle per base edge. */
function pyramidFaces(base: Face, apex: SamplePoint): readonly SamplePoint[][] {
  return [[...base], ...Arr.map(edges(base), ([from, to]) => [from, to, apex])];
}

/** A point at a radius from an axis, at a coordinate along it and an angle around it. */
function revolve(
  axis: "x" | "y" | "z",
  along: number,
  radius: number,
  angle: number
) {
  const across = radius * Math.cos(angle);
  const depth = radius * Math.sin(angle);
  if (axis === "x") {
    return { x: along, y: across, z: depth };
  }
  return axis === "y"
    ? { x: depth, y: along, z: across }
    : { x: across, y: depth, z: along };
}

/** Samples one space formula object, or builds the faces of a solid. */
export function spaceFormulaGeometry(
  object: SpaceFormulaObject,
  box: SampleBox,
  scope: FormulaScope
): Result.Result<FormulaGeometry, { readonly message: string }> {
  return Result.gen(function* () {
    if (object.kind === "prism") {
      return {
        faces: prismFaces(object.base, object.offset),
        kind: "faces" as const,
      };
    }
    if (object.kind === "pyramid") {
      return {
        faces: pyramidFaces(object.base, object.apex),
        kind: "faces" as const,
      };
    }
    if (object.kind === "parametric") {
      const fx = yield* compileText(object.x);
      const fy = yield* compileText(object.y);
      const fz = yield* compileText(object.z);
      const branches = sampleCurve(
        (t) => ({
          x: evaluateWith(fx, scope, "t", t),
          y: evaluateWith(fy, scope, "t", t),
          z: evaluateWith(fz, scope, "t", t),
        }),
        box,
        object.parameter
      );
      return { branches, kind: "curves" as const };
    }
    if (object.kind === "function") {
      const f = yield* compileText(object.formula);
      const domain = object.domain ?? { x: box.x, y: box.y };
      const grid = sampleGrid(
        (x, y) => ({ x, y, z: f({ ...scope, x, y }) }),
        domain.x,
        domain.y
      );
      return { grid, kind: "grid" as const };
    }
    if (object.kind === "surface") {
      const fx = yield* compileText(object.x);
      const fy = yield* compileText(object.y);
      const fz = yield* compileText(object.z);
      const grid = sampleGrid(
        (u, v) => {
          const point = { ...scope, u, v };
          return { x: fx(point), y: fy(point), z: fz(point) };
        },
        object.u,
        object.v
      );
      return { grid, kind: "grid" as const };
    }
    const radius = yield* compileText(object.formula);
    const { axis } = object;
    const grid = sampleGrid(
      (along, angle) =>
        revolve(axis, along, evaluateWith(radius, scope, axis, along), angle),
      object.domain,
      FULL_TURN
    );
    return { grid, kind: "grid" as const };
  });
}
