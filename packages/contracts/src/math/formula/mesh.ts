import { Array as Arr, Option, Schema } from "effect";

import {
  type SamplePoint,
  SamplePointSchema,
} from "#contracts/math/formula/sample";

/** Cells along each side of a sampled surface. */
export const MESH_CELLS = 96;

/**
 * A surface sampled on a grid: (rows + 1) by (columns + 1) points, row by row,
 * with nothing where the surface is undefined so a renderer leaves a hole.
 */
export const SampleGridSchema = Schema.Struct({
  columns: Schema.Int,
  points: Schema.Array(Schema.Option(SamplePointSchema)),
  rows: Schema.Int,
});
export type SampleGrid = typeof SampleGridSchema.Type;

/** Where a surface stands for one pair of parameter values. */
export type SampleSurface = (u: number, v: number) => SamplePoint;

/** Samples a surface over two parameter ranges on an even grid. */
export function sampleGrid(
  surface: SampleSurface,
  u: { readonly max: number; readonly min: number },
  v: { readonly max: number; readonly min: number },
  cells: { readonly columns: number; readonly rows: number } = {
    columns: MESH_CELLS,
    rows: MESH_CELLS,
  }
): SampleGrid {
  const points = Arr.flatMap(
    Arr.makeBy(cells.rows + 1, (row) => row),
    (row) =>
      Arr.makeBy(cells.columns + 1, (column) => {
        const point = surface(
          u.min + ((u.max - u.min) * column) / cells.columns,
          v.min + ((v.max - v.min) * row) / cells.rows
        );
        return Number.isFinite(point.x) &&
          Number.isFinite(point.y) &&
          Number.isFinite(point.z)
          ? Option.some(point)
          : Option.none<SamplePoint>();
      })
  );
  return { columns: cells.columns, points, rows: cells.rows };
}
