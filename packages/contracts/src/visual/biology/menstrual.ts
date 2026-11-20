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

const OUTCOMES = ["cycle", "pregnancy", "miscarriage"] as const;

/** A whole number of days above zero. */
const DaysSchema = Schema.Int.check(Schema.isGreaterThan(0));

/** The cycle length slider, in days: its range and its starting value. */
const LengthSchema = Schema.Struct({
  max: DaysSchema,
  min: DaysSchema,
  value: DaysSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a cycle length range whose minimum is below its maximum, with the starting length between them.",
    }
  )
);

/**
 * Props of `MenstrualCycleLab`: one menstrual cycle drawn as an ovary, the
 * uterus lining and the four hormone curves (plus HCG in pregnancy) over the
 * days. The learner sets the cycle length (`length`, days) and picks one of
 * `outcomes` (each once); ovulation falls `luteal` days before the next
 * period, so `luteal` is below the shortest length. The ovulation day shows
 * only when `labels.ovulation` names it, so a question can ask for it.
 */
function menstrualCycleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        day: rich,
        hormones: byIds(
          ["fsh", "lh", "oestrogen", "progesterone", "hcg"],
          TextSchema
        ),
        length: TextSchema,
        outcome: TextSchema,
        outcomes: byPickedIds(OUTCOMES, TextSchema),
        ovulation: Schema.optionalKey(rich),
        parts: byIds(
          [
            "ovary",
            "follicle",
            "oocyte",
            "corpusLuteum",
            "endometrium",
            "artery",
          ],
          TextSchema
        ),
        phase: rich,
        phases: byIds(
          [
            "menstruation",
            "follicle",
            "ovulation",
            "luteal",
            "pregnancy",
            "miscarriage",
          ],
          TextSchema
        ),
        view: TextSchema,
      }),
      length: LengthSchema,
      luteal: DaysSchema,
      outcomes: Schema.NonEmptyArray(Schema.Literals(OUTCOMES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, length, luteal, outcomes }) =>
          luteal < length.min && namesEach(outcomes, labels.outcomes),
        {
          message:
            "Expected a luteal phase shorter than the shortest cycle, and a name for every outcome shown and no other.",
        }
      )
    ),
    answerAt(["labels", "ovulation"])
  );
}

/**
 * The menstrual cycle lab. The ovulation day is what a question asks a
 * learner to work out, so that readout is answer state.
 */
export function menstrualVisuals<E>(rich: RichSlot<E>) {
  return { MenstrualCycleLab: menstrualCycleLab(rich) };
}
