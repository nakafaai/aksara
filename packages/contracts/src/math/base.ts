import { Schema } from "effect";

const KEY_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/u;

/** Relative floating-point tolerance used by normalized geometry predicates. */
export const GEOMETRY_TOLERANCE = Number.EPSILON * 128;

/** Stable source identity shared by visual objects and rich-label anchors. */
export const MathVisualKeySchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter((key) => KEY_PATTERN.test(key), {
      message: "Expected a lower-kebab mathematical visual key.",
    })
  )
);

/** Finite point in one Cartesian plane. */
export const PlanePointSchema = Schema.Struct({
  x: Schema.Finite,
  y: Schema.Finite,
});
export type PlanePoint = typeof PlanePointSchema.Type;

/** Finite point in one three-dimensional Cartesian space. */
export const SpacePointSchema = Schema.Struct({
  x: Schema.Finite,
  y: Schema.Finite,
  z: Schema.Finite,
});
export type SpacePoint = typeof SpacePointSchema.Type;

/** Ordered visible interval for one Cartesian axis. */
export const MathAxisRangeSchema = Schema.Struct({
  max: Schema.Finite,
  min: Schema.Finite,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ max, min }) => min < max, {
      message: "Expected an axis range whose minimum is below its maximum.",
    })
  )
);

/** Semantic visibility of one mathematical frame feature. */
export const MathFeatureVisibilitySchema = Schema.Literals([
  "hidden",
  "visible",
]);

/** Stable visual roles that Nakafa maps to its current design system. */
export const MathAppearanceSchema = Schema.Literals([
  "answer",
  "construction",
  "highlight",
  "primary",
  "reference",
  "secondary",
  "warning",
]);

/** Screen-relative placement of one rich label around its exact anchor. */
export const MathLabelPlacementSchema = Schema.Literals([
  "above",
  "above-left",
  "above-right",
  "below",
  "below-left",
  "below-right",
  "center",
  "left",
  "right",
]);

/** Optional non-negative padding used by a semantic fit view. */
export const MathViewPaddingSchema = Schema.Finite.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

/** Strictly positive finite measurement. */
export const PositiveMeasureSchema = Schema.Finite.pipe(
  Schema.check(Schema.isGreaterThan(0))
);

/** Canonical start angle for one plane arc, measured in degrees. */
export const ArcStartDegreesSchema = Schema.Finite.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0)),
  Schema.check(Schema.isLessThan(360))
);

/** Non-zero directed sweep shorter than one full circle. */
export const ArcSweepDegreesSchema = Schema.Finite.pipe(
  Schema.check(
    Schema.makeFilter((sweep) => sweep !== 0 && Math.abs(sweep) < 360, {
      message: "Expected a non-zero arc sweep shorter than one full circle.",
    })
  )
);

/** Returns whether two plane positions are exactly the same authored point. */
export function samePlanePoint(left: PlanePoint, right: PlanePoint) {
  return left.x === right.x && left.y === right.y;
}

/** Returns whether two space positions are exactly the same authored point. */
export function sameSpacePoint(left: SpacePoint, right: SpacePoint) {
  return left.x === right.x && left.y === right.y && left.z === right.z;
}

/** Checks uniqueness using one stable key selector. */
export function hasUniqueKeys<T>(
  values: readonly T[],
  keyOf: (value: T) => string
) {
  const keys = new Set(values.map(keyOf));
  return keys.size === values.length;
}

/** Checks that an authored coordinate sequence contains no repeated position. */
export function hasUniquePositions<T>(
  values: readonly T[],
  same: (left: T, right: T) => boolean
) {
  return values.every(
    (value, index) =>
      values.findIndex((candidate) => same(value, candidate)) === index
  );
}
