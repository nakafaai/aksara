import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A non-negative finite number for angle and elevation sliders. */
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** A strictly positive finite upper bound for angle sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A non-negative slider whose minimum sits below its maximum. */
const AngleSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: NonNegativeSchema,
  value: NonNegativeSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a non-negative angle range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const CROSS_ORDERS = ["uCrossV", "vCrossU"] as const;
const DOT_PRESETS = ["acute", "orthogonal", "obtuse"] as const;
const PARALLELEPIPED_CONFIGS = [
  "orthogonalBox",
  "shearedPrism",
  "coplanarFlat",
] as const;

/**
 * Props of `Vector3DCrossProductLab`: a 3D vector stage displaying vectors u
 * and v, their spanned parallelogram area, and the orthogonal normal vector
 * u x v obeying the right-hand rule and anti-commutativity. Cross magnitude
 * and direction rule readouts are optional answer state.
 */
function vector3DCrossProductLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: AngleSliderSchema,
      labels: Schema.Struct({
        angle: TextSchema,
        crossMagnitude: Schema.optionalKey(rich),
        directionRule: Schema.optionalKey(rich),
        order: TextSchema,
        orders: byPickedIds(CROSS_ORDERS, TextSchema),
        parts: byIds(
          [
            "vectorU",
            "vectorV",
            "crossVector",
            "parallelogram",
            "curlArc",
            "coordinateAxes",
          ],
          TextSchema
        ),
        view: TextSchema,
      }),
      orders: Schema.NonEmptyArray(Schema.Literals(CROSS_ORDERS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, orders }) => namesEach(orders, labels.orders),
        {
          message:
            "Expected a name for every cross-product order shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "crossMagnitude"], ["labels", "directionRule"])
  );
}

/**
 * Props of `DotProductProjection3DLab`: a 3D vector projection bench showing
 * orthogonal drop-lines from u onto v and sweeping between acute, orthogonal,
 * and obtuse dot products. Dot value and projection length readouts are
 * optional answer state.
 */
function dotProductProjection3DLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: AngleSliderSchema,
      labels: Schema.Struct({
        angle: TextSchema,
        dotValue: Schema.optionalKey(rich),
        parts: byIds(
          [
            "vectorU",
            "vectorV",
            "projectionVector",
            "dropLine",
            "angleArc",
            "coordinateAxes",
          ],
          TextSchema
        ),
        preset: TextSchema,
        presets: byPickedIds(DOT_PRESETS, TextSchema),
        projectionLength: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      presets: Schema.NonEmptyArray(Schema.Literals(DOT_PRESETS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, presets }) => namesEach(presets, labels.presets),
        {
          message:
            "Expected a name for every dot-product angle preset shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "dotValue"], ["labels", "projectionLength"])
  );
}

/**
 * Props of `VectorParallelepipedLab`: a 3D translucent parallelepiped spanned
 * by three vectors (u, v, w) illustrating the scalar triple product volume and
 * collapse to zero when coplanar. Triple volume and coplanarity note readouts
 * are optional answer state.
 */
function vectorParallelepipedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      configurations: Schema.NonEmptyArray(
        Schema.Literals(PARALLELEPIPED_CONFIGS)
      ).check(Schema.isUnique()),
      elevation: AngleSliderSchema,
      labels: Schema.Struct({
        configuration: TextSchema,
        configurations: byPickedIds(
          PARALLELEPIPED_CONFIGS,
          Schema.Struct({
            name: TextSchema,
            summary: rich,
          })
        ),
        coplanarityNote: Schema.optionalKey(rich),
        elevation: TextSchema,
        parts: byIds(
          [
            "vectorU",
            "vectorV",
            "vectorW",
            "baseParallelogram",
            "parallelepipedMesh",
            "altitudeLine",
          ],
          TextSchema
        ),
        tripleVolume: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ configurations, labels }) =>
          namesEach(configurations, labels.configurations),
        {
          message:
            "Expected a name and summary for every parallelepiped configuration shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "tripleVolume"], ["labels", "coplanarityNote"])
  );
}

/**
 * 3D vector operations labs covering cross products, orthogonal dot-product
 * projections, and scalar triple product parallelepipeds.
 */
export function vectorVisuals<E>(rich: RichSlot<E>) {
  return {
    DotProductProjection3DLab: dotProductProjection3DLab(rich),
    Vector3DCrossProductLab: vector3DCrossProductLab(rich),
    VectorParallelepipedLab: vectorParallelepipedLab(rich),
  };
}
