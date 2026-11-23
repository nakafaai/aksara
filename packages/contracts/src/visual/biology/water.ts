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

/** An amount the lab measures: a finite number above zero. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A slider: its range and its starting value, all above zero. */
const SliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const PROPERTIES = ["cohesion", "adhesion", "heat"] as const;

/**
 * Props of `WaterBondLab`: water molecules held together by hydrogen bonds,
 * showing one of `properties` at a time (each once, in the order the toggle
 * lists them). Cohesion pulls a column of water up a xylem vessel whose
 * radius the learner sets (`radius`, micrometres); adhesion makes water
 * climb a glass wall; heat warms `mass` grams of water and of ethanol with
 * the same energy (`heat`, joules) so their temperature rises compare. The
 * readouts show the water's rise, the ethanol's rise and the capillary rise
 * only when `labels.water`, `labels.ethanol` and `labels.rise` name them,
 * so a question that asks for one leaves its name out.
 */
function waterBondLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      heat: SliderSchema,
      labels: Schema.Struct({
        ethanol: Schema.optionalKey(rich),
        heat: TextSchema,
        parts: byIds(["oxygen", "hydrogen", "bond", "wall"], TextSchema),
        properties: byPickedIds(PROPERTIES, TextSchema),
        property: TextSchema,
        radius: TextSchema,
        rise: Schema.optionalKey(rich),
        view: TextSchema,
        water: Schema.optionalKey(rich),
      }),
      mass: PositiveSchema,
      properties: Schema.NonEmptyArray(Schema.Literals(PROPERTIES)).check(
        Schema.isUnique()
      ),
      radius: SliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, properties }) => namesEach(properties, labels.properties),
        {
          message:
            "Expected a name for every property the lab shows, and no other.",
        }
      )
    ),
    answerAt(["labels", "water"], ["labels", "ethanol"], ["labels", "rise"])
  );
}

/**
 * The water lab. The temperature rises and the capillary rise are what a
 * question asks a learner to work out, so their readouts are answer state.
 */
export function waterVisuals<E>(rich: RichSlot<E>) {
  return { WaterBondLab: waterBondLab(rich) };
}
