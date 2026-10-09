import {
  Array as Arr,
  HashSet,
  MutableHashSet,
  MutableList,
  Option,
  Schema,
} from "effect";

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

/** Cartesian axis names shared by scene coordinates, frames, and resolution. */
export const SceneAxisSchema = Schema.Literals(["x", "y", "z"]);
export type SceneAxis = typeof SceneAxisSchema.Type;

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

/** Returns every repeated-key index after its first authored occurrence. */
function duplicateKeyIndexes<T>(
  values: readonly T[],
  keyOf: (value: T) => string
) {
  const seen = MutableHashSet.empty<string>();
  const duplicates = MutableList.make<number>();
  Arr.forEach(values, (value, index) => {
    const key = keyOf(value);
    if (MutableHashSet.has(seen, key)) {
      MutableList.append(duplicates, index);
    } else {
      MutableHashSet.add(seen, key);
    }
  });
  return MutableList.toArray(duplicates);
}

/** Reports every repeated scene identity at its exact authored key path. */
export function mathVisualIdentityIssues(
  objects: readonly { readonly id: string }[],
  labels: readonly { readonly key: string; readonly objectId: string }[]
): readonly Schema.FilterIssue[] {
  const objectIds = HashSet.fromIterable(Arr.map(objects, ({ id }) => id));
  return [
    ...Arr.map(
      duplicateKeyIndexes(objects, ({ id }) => id),
      (index) => ({
        issue: "Expected a unique mathematical object id.",
        path: ["objects", index, "id"],
      })
    ),
    ...Arr.map(
      duplicateKeyIndexes(labels, ({ key }) => key),
      (index) => ({
        issue: "Expected a unique mathematical label key.",
        path: ["labels", index, "key"],
      })
    ),
    ...Arr.flatMap(labels, (label, index) =>
      HashSet.has(objectIds, label.objectId)
        ? []
        : [
            {
              issue:
                "Expected a label to reference an existing mathematical object.",
              path: ["labels", index, "objectId"],
            },
          ]
    ),
  ];
}

/** Checks that an authored coordinate sequence contains no repeated position. */
export function hasUniquePositions<T>(
  values: readonly T[],
  same: (left: T, right: T) => boolean
) {
  return Arr.every(values, (value, index) =>
    Option.contains(
      Arr.findFirstIndex(values, (candidate) => same(value, candidate)),
      index
    )
  );
}
