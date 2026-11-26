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

/** A strictly positive finite bound for respiratory sliders. */
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
        "Expected a positive range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const ACTIVITY_STATES = ["rest", "exercise", "highAltitude"] as const;
const BREATHING_PHASES = [
  "inhalation",
  "exhalation",
  "forcedExhalation",
] as const;

/**
 * Props of `AlveolusGasExchangeLab`: a 3D alveolar sac wrapped in a capillary
 * network showing oxygen and carbon dioxide diffusion across the respiratory
 * membrane under rest, exercise, and high altitude. Oxygen uptake and
 * diffusion rate readouts are optional answer state.
 */
function alveolusGasExchangeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        diffusionRate: Schema.optionalKey(rich),
        oxygenUptake: Schema.optionalKey(rich),
        parts: byIds(
          [
            "alveolus",
            "capillary",
            "redBloodCell",
            "oxygen",
            "carbonDioxide",
            "surfactantFilm",
          ],
          TextSchema
        ),
        state: TextSchema,
        states: byPickedIds(
          ACTIVITY_STATES,
          Schema.Struct({
            name: TextSchema,
            summary: rich,
          })
        ),
        ventilation: TextSchema,
        view: TextSchema,
      }),
      states: Schema.NonEmptyArray(Schema.Literals(ACTIVITY_STATES)).check(
        Schema.isUnique()
      ),
      ventilation: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, states }) => namesEach(states, labels.states),
        {
          message:
            "Expected a name and summary for every physiological activity state shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "oxygenUptake"], ["labels", "diffusionRate"])
  );
}

/**
 * Props of `ThoraxDiaphragmLab`: a 3D thoracic cage, intercostal muscles,
 * paired lungs, and dome-shaped diaphragm demonstrating Boyle's law during
 * inhalation, exhalation, and forced exhalation. Thoracic volume and alveolar
 * pressure readouts are optional answer state.
 */
function thoraxDiaphragmLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      depth: PositiveSliderSchema,
      labels: Schema.Struct({
        alveolarPressure: Schema.optionalKey(rich),
        depth: TextSchema,
        parts: byIds(
          [
            "trachea",
            "lungs",
            "ribcage",
            "intercostal",
            "diaphragm",
            "pleuralCavity",
          ],
          TextSchema
        ),
        phase: TextSchema,
        phases: byPickedIds(
          BREATHING_PHASES,
          Schema.Struct({
            name: TextSchema,
            summary: rich,
          })
        ),
        thoracicVolume: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      phases: Schema.NonEmptyArray(Schema.Literals(BREATHING_PHASES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, phases }) => namesEach(phases, labels.phases),
        {
          message:
            "Expected a name and summary for every breathing phase shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "thoracicVolume"], ["labels", "alveolarPressure"])
  );
}

/**
 * Human respiratory system labs covering alveolar gas diffusion and thoracic
 * breathing mechanics.
 */
export function respirationVisuals<E>(rich: RichSlot<E>) {
  return {
    AlveolusGasExchangeLab: alveolusGasExchangeLab(rich),
    ThoraxDiaphragmLab: thoraxDiaphragmLab(rich),
  };
}
