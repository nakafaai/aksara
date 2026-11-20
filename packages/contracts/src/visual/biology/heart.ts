import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A volume of blood: a finite number of millilitres above zero. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/**
 * A heart rate the lab's slider reaches, in beats a minute: from the slow
 * resting rate of a trained athlete up to the 200 a young adult reaches at
 * most (OpenStax Anatomy and Physiology 2e, 19.4).
 */
const RateSchema = Schema.Finite.check(
  Schema.isBetween({ maximum: 200, minimum: 40 })
);

/**
 * The left ventricle's volumes: it fills to `endDiastolic` and keeps
 * `endSystolic`, so it must keep less than it filled with.
 */
const VolumesSchema = Schema.Struct({
  endDiastolic: PositiveSchema,
  endSystolic: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ endDiastolic, endSystolic }) => endSystolic < endDiastolic,
    {
      message:
        "Expected an end-systolic volume below the end-diastolic volume.",
    }
  )
);

/**
 * Props of `HeartCycleLab`: a human heart cut open from the front, beating
 * through the cardiac cycle at `rate` beats a minute (the learner moves it
 * with a slider labelled `labels.rate`). The left ventricle
 * fills to `volumes.endDiastolic` and empties to `volumes.endSystolic`
 * millilitres, so its stroke volume is their difference. The stroke volume
 * and the cardiac output the lab reads out are results a question may ask
 * for, so their labels are answer state.
 */
function heartCycleLab<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...cardFields(rich),
    labels: Schema.Struct({
      aorta: rich,
      output: Schema.optionalKey(rich),
      phase: rich,
      phases: byIds(["atrial", "ventricular", "diastole"], rich),
      pressure: rich,
      rate: TextSchema,
      stroke: Schema.optionalKey(rich),
      view: TextSchema,
      volume: rich,
    }),
    rate: RateSchema,
    volumes: VolumesSchema,
  });
}

/** The heart labs. Only the read-out results hold answer state. */
export function heartVisuals<E>(rich: RichSlot<E>) {
  return {
    HeartCycleLab: figure(
      heartCycleLab(rich),
      answerAt(["labels", "stroke"], ["labels", "output"])
    ),
  };
}
