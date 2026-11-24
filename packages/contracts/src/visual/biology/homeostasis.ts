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

/** A strictly positive finite measure for physiological sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A finite slider whose minimum sits below its maximum. */
const RangeSliderSchema = Schema.Struct({
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

/** A strictly positive slider whose minimum sits below its maximum. */
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

const THERMAL_CONDITIONS = ["cold", "normal", "hot"] as const;
const GLUCOSE_STATES = ["afterMeal", "normal", "fasting", "diabetes"] as const;

/**
 * Props of `ThermoregulationSkinLab`: a 3D mammalian skin cross-section
 * contrasting cold, normal, and hot conditions across arteriolar diameter,
 * sweat gland activity, erector pili muscles, and hair shaft tilt. Blood flow
 * and heat-loss readouts are optional answer state.
 */
function thermoregulationSkinLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ambient: RangeSliderSchema,
      conditions: Schema.NonEmptyArray(
        Schema.Literals(THERMAL_CONDITIONS)
      ).check(Schema.isUnique()),
      labels: Schema.Struct({
        ambient: TextSchema,
        bloodFlow: Schema.optionalKey(rich),
        condition: TextSchema,
        conditions: byPickedIds(THERMAL_CONDITIONS, TextSchema),
        heatLoss: Schema.optionalKey(rich),
        parts: byIds(
          [
            "epidermis",
            "sweatGland",
            "arteriole",
            "capillary",
            "erectorMuscle",
            "hairShaft",
            "fatLayer",
          ],
          TextSchema
        ),
        response: rich,
        responses: byPickedIds(THERMAL_CONDITIONS, rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ conditions, labels }) =>
          namesEach(conditions, labels.conditions) &&
          namesEach(conditions, labels.responses),
        {
          message:
            "Expected a name and response note for every thermal condition shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "bloodFlow"], ["labels", "heatLoss"])
  );
}

/**
 * Props of `BloodGlucoseFeedbackLab`: a 3D negative-feedback circuit linking
 * pancreatic islets, insulin and glucagon secretion, liver glycogen storage,
 * and blood glucose concentration across meal, fasting, and diabetes states.
 * Active hormone and liver-action readouts are optional answer state.
 */
function bloodGlucoseFeedbackLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      glucose: PositiveSliderSchema,
      labels: Schema.Struct({
        actions: byPickedIds(GLUCOSE_STATES, rich),
        glucose: TextSchema,
        hormone: Schema.optionalKey(rich),
        hormones: byIds(
          ["insulin", "glucagon", "balanced", "deficient"],
          TextSchema
        ),
        liverAction: Schema.optionalKey(rich),
        parts: byIds(
          [
            "pancreas",
            "alphaCell",
            "betaCell",
            "liver",
            "glycogen",
            "bloodVessel",
          ],
          TextSchema
        ),
        state: TextSchema,
        states: byPickedIds(GLUCOSE_STATES, TextSchema),
        view: TextSchema,
      }),
      states: Schema.NonEmptyArray(Schema.Literals(GLUCOSE_STATES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, states }) =>
          namesEach(states, labels.states) && namesEach(states, labels.actions),
        {
          message:
            "Expected a name and liver action note for every glucose state shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "hormone"], ["labels", "liverAction"])
  );
}

/**
 * Homeostasis labs covering mammalian skin thermoregulation and pancreatic
 * blood-glucose negative feedback.
 */
export function homeostasisVisuals<E>(rich: RichSlot<E>) {
  return {
    BloodGlucoseFeedbackLab: bloodGlucoseFeedbackLab(rich),
    ThermoregulationSkinLab: thermoregulationSkinLab(rich),
  };
}
