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

/** A strictly positive finite number for step-size and cutout sliders. */
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

/** A signed slider whose minimum sits below its maximum. */
const SignedSliderSchema = Schema.Struct({
  max: Schema.Finite,
  min: Schema.Finite,
  value: Schema.Finite,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const SECANT_CURVES = ["quadratic", "cubic", "sineWave"] as const;
const SLOPE_CURVES = ["cubicWave", "quarticWell", "dampedSine"] as const;
const BOX_SHEETS = ["squareSheet", "wideSheet", "tallSheet"] as const;

/**
 * Props of `SecantToTangentLab`: a 3D curve ribbon showing a secant beam
 * between x = a and x = a + h converging onto the tangent line as h approaches
 * zero. Secant slope and tangent slope readouts are optional answer state.
 */
function secantToTangentLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      curves: Schema.NonEmptyArray(Schema.Literals(SECANT_CURVES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        curve: TextSchema,
        curves: byPickedIds(
          SECANT_CURVES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          [
            "curveRibbon",
            "anchorPoint",
            "movingPoint",
            "secantLine",
            "tangentLine",
            "slopeTriangle",
          ],
          TextSchema
        ),
        secantSlope: Schema.optionalKey(rich),
        stepH: TextSchema,
        tangentSlope: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      stepH: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ curves, labels }) => namesEach(curves, labels.curves),
        {
          message:
            "Expected a name and formula for every secant curve shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "secantSlope"], ["labels", "tangentSlope"])
  );
}

/**
 * Props of `DerivativeSlopeFieldLab`: a 3D dual-ribbon stage pairing f(x) with
 * its derivative curve f'(x), local tangent slope needles, and critical point
 * beacons. Slope value and monotonicity readouts are optional answer state.
 */
function derivativeSlopeFieldLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      curves: Schema.NonEmptyArray(Schema.Literals(SLOPE_CURVES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        curve: TextSchema,
        curves: byPickedIds(
          SLOPE_CURVES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        monotonicity: Schema.optionalKey(rich),
        parts: byIds(
          [
            "functionCurve",
            "derivativeCurve",
            "slopeNeedles",
            "probeMarker",
            "criticalPoints",
          ],
          TextSchema
        ),
        probeX: TextSchema,
        slopeValue: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      probeX: SignedSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ curves, labels }) => namesEach(curves, labels.curves),
        {
          message:
            "Expected a name and formula for every derivative curve shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "slopeValue"], ["labels", "monotonicity"])
  );
}

/**
 * Props of `OptimizationBox3DLab`: a 3D foldable open-top box cut from a flat
 * sheet alongside a live volume curve V(x) highlighting the stationary optimum
 * V'(x) = 0. Box volume and derivative note readouts are optional answer state.
 */
function optimizationBox3DLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cutout: PositiveSliderSchema,
      labels: Schema.Struct({
        boxVolume: Schema.optionalKey(rich),
        cutout: TextSchema,
        derivativeNote: Schema.optionalKey(rich),
        parts: byIds(
          [
            "basePlate",
            "sideFlaps",
            "cornerCutouts",
            "volumeCurve",
            "optimalMarker",
          ],
          TextSchema
        ),
        sheet: TextSchema,
        sheets: byPickedIds(
          BOX_SHEETS,
          Schema.Struct({
            dimensions: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      sheets: Schema.NonEmptyArray(Schema.Literals(BOX_SHEETS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, sheets }) => namesEach(sheets, labels.sheets),
        {
          message:
            "Expected a name and dimensions note for every sheet preset shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "boxVolume"], ["labels", "derivativeNote"])
  );
}

/**
 * Derivative calculus 3D labs covering secant-to-tangent limits, derivative
 * slope fields, and 3D box volume optimization.
 */
export function derivativeVisuals<E>(rich: RichSlot<E>) {
  return {
    DerivativeSlopeFieldLab: derivativeSlopeFieldLab(rich),
    OptimizationBox3DLab: optimizationBox3DLab(rich),
    SecantToTangentLab: secantToTangentLab(rich),
  };
}
