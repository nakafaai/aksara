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

/** A strictly positive finite bound for integral sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A positive slider whose minimum sits below its maximum. */
const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

/** An integer partition slider for Riemann sums. */
const PartitionSliderSchema = Schema.Struct({
  max: Schema.Int.check(Schema.isGreaterThan(1)),
  min: Schema.Int.check(Schema.isGreaterThanOrEqualTo(1)),
  value: Schema.Int.check(Schema.isGreaterThanOrEqualTo(1)),
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a partition range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const RIEMANN_METHODS = ["left", "right", "midpoint", "trapezoid"] as const;
const RIEMANN_CURVES = ["parabola", "sineArch", "exponential"] as const;
const REVOLUTION_PROFILES = [
  "paraboloid",
  "trumpetHorn",
  "washerBowl",
  "frustumCone",
] as const;
const CURVE_PAIRS = [
  "lineAndParabola",
  "twoParabolas",
  "sineAndCosine",
] as const;

/**
 * Props of `RiemannSumConvergenceLab`: a 3D prism stage comparing left, right,
 * midpoint, and trapezoid Riemann sums converging toward the exact definite
 * integral as partition count grows. Approximate area and exact integral
 * readouts are optional answer state.
 */
function riemannSumConvergenceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      curves: Schema.NonEmptyArray(Schema.Literals(RIEMANN_CURVES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        approxArea: Schema.optionalKey(rich),
        curve: TextSchema,
        curves: byPickedIds(
          RIEMANN_CURVES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        exactIntegral: Schema.optionalKey(rich),
        method: TextSchema,
        methods: byPickedIds(RIEMANN_METHODS, TextSchema),
        partitions: TextSchema,
        parts: byIds(
          [
            "curveSurface",
            "riemannPrisms",
            "samplePoints",
            "exactArea",
            "baseAxis",
          ],
          TextSchema
        ),
        view: TextSchema,
      }),
      methods: Schema.NonEmptyArray(Schema.Literals(RIEMANN_METHODS)).check(
        Schema.isUnique()
      ),
      partitions: PartitionSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ curves, labels, methods }) =>
          namesEach(curves, labels.curves) &&
          namesEach(methods, labels.methods),
        {
          message:
            "Expected a name for every Riemann method and curve shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "approxArea"], ["labels", "exactIntegral"])
  );
}

/**
 * Props of `SolidOfRevolutionLab`: a 3D lathe solid swept around the x-axis
 * from 0 to 360 degrees with a highlighted disk or washer cross-section. Slice
 * area and total volume readouts are optional answer state.
 */
function solidOfRevolutionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        parts: byIds(
          [
            "profileCurve",
            "revolvedShell",
            "crossSectionDisk",
            "rotationAxis",
            "radiusArrow",
          ],
          TextSchema
        ),
        profile: TextSchema,
        profiles: byPickedIds(
          REVOLUTION_PROFILES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        sliceArea: Schema.optionalKey(rich),
        sweepAngle: TextSchema,
        totalVolume: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      profiles: Schema.NonEmptyArray(
        Schema.Literals(REVOLUTION_PROFILES)
      ).check(Schema.isUnique()),
      sweepAngle: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, profiles }) => namesEach(profiles, labels.profiles),
        {
          message:
            "Expected a name and formula for every solid-of-revolution profile shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "sliceArea"], ["labels", "totalVolume"])
  );
}

/**
 * Props of `AreaBetweenCurvesLab`: a 3D ribbon bounded between an upper curve
 * f(x) and lower curve g(x) with intersection pins and a sliding vertical
 * strip. Enclosed area and height gap readouts are optional answer state.
 */
function areaBetweenCurvesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        enclosedArea: Schema.optionalKey(rich),
        heightGap: Schema.optionalKey(rich),
        pair: TextSchema,
        pairs: byPickedIds(
          CURVE_PAIRS,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          [
            "upperCurve",
            "lowerCurve",
            "shadedRibbon",
            "verticalStrip",
            "intersectionPins",
          ],
          TextSchema
        ),
        upperBound: TextSchema,
        view: TextSchema,
      }),
      pairs: Schema.NonEmptyArray(Schema.Literals(CURVE_PAIRS)).check(
        Schema.isUnique()
      ),
      upperBound: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(({ labels, pairs }) => namesEach(pairs, labels.pairs), {
        message:
          "Expected a name and formula for every curve pair shown, and no other.",
      })
    ),
    answerAt(["labels", "enclosedArea"], ["labels", "heightGap"])
  );
}

/**
 * Integral calculus 3D labs covering Riemann sum convergence, solids of
 * revolution, and enclosed areas between curves.
 */
export function integralVisuals<E>(rich: RichSlot<E>) {
  return {
    AreaBetweenCurvesLab: areaBetweenCurvesLab(rich),
    RiemannSumConvergenceLab: riemannSumConvergenceLab(rich),
    SolidOfRevolutionLab: solidOfRevolutionLab(rich),
  };
}
