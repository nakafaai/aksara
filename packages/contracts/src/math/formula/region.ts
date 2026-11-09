import {
  Array as Arr,
  MutableList,
  Option,
  Order,
  Result,
  Schema,
} from "effect";
import {
  type SampleBox,
  type SamplePoint,
  SamplePointSchema,
} from "#contracts/math/formula/box";
import {
  compileFormula,
  type FormulaScope,
} from "#contracts/math/formula/compile";
import {
  contourFill,
  contourLines,
  type SampleField,
} from "#contracts/math/formula/contour";
import { readRelation } from "#contracts/math/formula/parse";
import type { FormulaGeometry } from "#contracts/math/formula/plane";

/** How far a boundary piece lies from one inequality's edge, and whether that edge is strict. */
const ConstraintGapSchema = Schema.Struct({
  gap: Schema.Finite,
  strict: Schema.Boolean,
});
type ConstraintGap = typeof ConstraintGapSchema.Type;

/** One piece of a region's outline, between two consecutive samples. */
const EdgePieceSchema = Schema.Struct({
  next: SamplePointSchema,
  point: SamplePointSchema,
  strict: Schema.Boolean,
});
type EdgePiece = typeof EdgePieceSchema.Type;

/** One run of an outline that is all strict or all inclusive. */
const EdgeRunSchema = Schema.Struct({
  points: Schema.Array(SamplePointSchema),
  strict: Schema.Boolean,
});
type EdgeRun = typeof EdgeRunSchema.Type;

/**
 * Joins consecutive outline pieces of the same kind into one line, so a
 * renderer draws a few dashed and solid edges instead of every short piece.
 */
function edgeRuns(pieces: readonly EdgePiece[]) {
  const runs = MutableList.make<EdgeRun>();
  let points = MutableList.make<SamplePoint>();
  let strict = false;
  Arr.forEach(pieces, (piece, index) => {
    if (index === 0 || piece.strict !== strict) {
      if (index > 0) {
        MutableList.append(runs, {
          points: MutableList.toArray(points),
          strict,
        });
      }
      points = MutableList.make<SamplePoint>();
      MutableList.append(points, piece.point);
      ({ strict } = piece);
    }
    MutableList.append(points, piece.next);
  });
  MutableList.append(runs, { points: MutableList.toArray(points), strict });
  return MutableList.toArray(runs);
}

/** The signed room an inequality leaves at a point: positive where it holds. */
function margin(text: string) {
  return Result.map(readRelation(text), ({ comparison, left, right }) => {
    const leftValue = compileFormula(left);
    const rightValue = compileFormula(right);
    const below = comparison === "<" || comparison === "<=";
    return {
      field:
        (scope: FormulaScope): SampleField =>
        (x, y) => {
          const point = { ...scope, x, y };
          const gap = rightValue(point) - leftValue(point);
          return below ? gap : -gap;
        },
      strict: comparison === "<" || comparison === ">",
    };
  });
}

/** The region where every inequality holds, with each edge marked strict or not. */
export function regionGeometry(
  inequalities: readonly [string, ...string[]],
  box: SampleBox,
  scope: FormulaScope
) {
  return Result.map(Result.all(Arr.map(inequalities, margin)), (margins) => {
    const constraints = Arr.map(margins, (each) => ({
      field: each.field(scope),
      strict: each.strict,
    }));
    /** The tightest margin at a point: where it is not negative, every inequality holds. */
    const field: SampleField = (x, y) =>
      Math.min(...Arr.map(constraints, (each) => each.field(x, y)));
    const byGap = Order.mapInput(
      Order.Number,
      (piece: ConstraintGap) => piece.gap
    );
    /** Whether the inequality nearest a boundary piece is strict, so it draws dashed. */
    const strictAt = (from: SamplePoint, to: SamplePoint) => {
      const x = (from.x + to.x) / 2;
      const y = (from.y + to.y) / 2;
      const gaps = Arr.map(constraints, (each) => ({
        gap: Math.abs(each.field(x, y)),
        strict: each.strict,
      }));
      return Option.exists(
        Arr.head(Arr.sort(gaps, byGap)),
        ({ strict }) => strict
      );
    };
    const boundary = Arr.flatMap(contourLines(field, box), (line) =>
      edgeRuns(
        Arr.zipWith(line, Arr.drop(line, 1), (point, next) => ({
          next,
          point,
          strict: strictAt(point, next),
        }))
      )
    );
    return {
      boundary,
      fill: contourFill(field, box),
      kind: "region" as const,
    } satisfies FormulaGeometry;
  });
}
