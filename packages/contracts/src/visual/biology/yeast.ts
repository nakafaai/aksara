import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * The water bath's temperatures in °C: the slider's range and where it
 * starts. Water stays liquid from 0 to 100 °C, and the start lies in range.
 */
const BathSchema = Schema.Struct({
  max: Schema.Finite.check(Schema.isLessThanOrEqualTo(100)),
  min: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
  value: Schema.Finite,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && value >= min && value <= max,
    {
      message:
        "Expected a bath range whose minimum is below its maximum and holds its starting value.",
    }
  )
);

/**
 * Props of `YeastFermentationLab`: the KSSM experiment on fermentation in
 * yeast and its control, in one water bath. `glucose` is the strength of the
 * boiled and cooled glucose solution, in per cent (w/v); `temperature` is the
 * bath's range and starting value, in °C. The labels name the slider and the
 * run's clock, the readings (bubbles a minute, carbon dioxide into the
 * limewater, the limewater's state, the temperature in each tube, and the
 * smell of the yeast tube), the two tubes, and the parts written in the
 * scene.
 */
function yeastFermentationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      glucose: Schema.Finite.check(
        Schema.isGreaterThan(0),
        Schema.isLessThanOrEqualTo(100)
      ),
      labels: Schema.Struct({
        clear: rich,
        collected: rich,
        control: TextSchema,
        ethanol: rich,
        limewater: rich,
        milky: rich,
        none: rich,
        parts: Schema.Struct({
          bath: TextSchema,
          limewater: TextSchema,
          paraffin: TextSchema,
          thermometer: TextSchema,
        }),
        rate: rich,
        smell: rich,
        temperature: TextSchema,
        time: TextSchema,
        view: TextSchema,
        warmth: rich,
        yeast: TextSchema,
      }),
      temperature: BathSchema,
    })
  );
}

/**
 * The visuals of this lab. Each prop sets up the experiment or names its
 * words; none states what the learner should conclude, so none holds answer
 * state.
 */
export function yeastVisuals<E>(rich: RichSlot<E>) {
  return { YeastFermentationLab: yeastFermentationLab(rich) };
}
