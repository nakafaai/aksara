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

/** A strictly positive finite bound for tolerance and window sliders. */
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

const EPSILON_FUNCTIONS = [
  "removableHole",
  "quadraticSmooth",
  "steepLinear",
] as const;
const ASYMPTOTE_CURVES = [
  "reciprocalPole",
  "rationalHorizontal",
  "obliqueSlant",
] as const;
const SQUEEZE_ENVELOPES = [
  "quadraticSine",
  "linearDamped",
  "sincEnvelope",
] as const;

/**
 * Props of `EpsilonDeltaBandLab`: a 3D coordinate frame illustrating the
 * epsilon-delta limit definition with translucent horizontal epsilon and
 * vertical delta corridors around a target point. Delta bound and limit
 * verdict readouts are optional answer state.
 */
function epsilonDeltaBandLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      epsilon: PositiveSliderSchema,
      functions: Schema.NonEmptyArray(Schema.Literals(EPSILON_FUNCTIONS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        deltaBound: Schema.optionalKey(rich),
        epsilon: TextSchema,
        functionLabel: TextSchema,
        functions: byPickedIds(
          EPSILON_FUNCTIONS,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        limitVerdict: Schema.optionalKey(rich),
        parts: byIds(
          ["curvePath", "epsilonBand", "deltaBand", "holePoint", "limitTarget"],
          TextSchema
        ),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ functions, labels }) => namesEach(functions, labels.functions),
        {
          message:
            "Expected a name and formula for every epsilon-delta function shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "deltaBound"], ["labels", "limitVerdict"])
  );
}

/**
 * Props of `AsymptoteBehaviorLab`: a 3D rational curve stage with vertical,
 * horizontal, and oblique asymptote planes and left/right approach probes.
 * Asymptote summary and approach value readouts are optional answer state.
 */
function asymptoteBehaviorLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      curves: Schema.NonEmptyArray(Schema.Literals(ASYMPTOTE_CURVES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        approachValue: Schema.optionalKey(rich),
        asymptoteSummary: Schema.optionalKey(rich),
        curve: TextSchema,
        curves: byPickedIds(
          ASYMPTOTE_CURVES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          [
            "curveBranches",
            "verticalAsymptote",
            "horizontalAsymptote",
            "leftProbe",
            "rightProbe",
          ],
          TextSchema
        ),
        probeX: TextSchema,
        view: TextSchema,
      }),
      probeX: SignedSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ curves, labels }) => namesEach(curves, labels.curves),
        {
          message:
            "Expected a name and formula for every asymptote curve shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "asymptoteSummary"], ["labels", "approachValue"])
  );
}

/**
 * Props of `SqueezeTheoremWaveLab`: a 3D oscillating wave trapped between an
 * upper and lower envelope pinching cleanly to a single limit point as the
 * window radius shrinks. Bound spread and squeezed limit readouts are optional
 * answer state.
 */
function squeezeTheoremWaveLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      envelopes: Schema.NonEmptyArray(Schema.Literals(SQUEEZE_ENVELOPES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        boundSpread: Schema.optionalKey(rich),
        envelope: TextSchema,
        envelopes: byPickedIds(
          SQUEEZE_ENVELOPES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          [
            "upperBound",
            "lowerBound",
            "squeezedWave",
            "pinchPoint",
            "windowFrame",
          ],
          TextSchema
        ),
        radius: TextSchema,
        squeezedLimit: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      radius: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ envelopes, labels }) => namesEach(envelopes, labels.envelopes),
        {
          message:
            "Expected a name and formula for every squeeze theorem envelope shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "boundSpread"], ["labels", "squeezedLimit"])
  );
}

/**
 * Limit calculus 3D labs covering epsilon-delta corridors, asymptote
 * behavior, and the squeeze theorem.
 */
export function limitVisuals<E>(rich: RichSlot<E>) {
  return {
    AsymptoteBehaviorLab: asymptoteBehaviorLab(rich),
    EpsilonDeltaBandLab: epsilonDeltaBandLab(rich),
    SqueezeTheoremWaveLab: squeezeTheoremWaveLab(rich),
  };
}
