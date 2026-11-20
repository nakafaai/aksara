import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** A rate of oxygen uptake, in litres a minute: a finite number above zero. */
const RateSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/**
 * The range of the demand slider and where it opens, in litres a minute
 * above the resting rate: the minimum below the maximum, and the value
 * between them.
 */
const DemandSchema = Schema.Struct({
  max: RateSchema,
  min: RateSchema,
  value: RateSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a demand range whose minimum is below its maximum, with the value between them.",
    }
  )
);

/**
 * Props of `OxygenDebtLab`: a working skeletal muscle at tissue scale that
 * runs short of oxygen, builds lactic acid, and repays the oxygen debt.
 * `rest` is the resting oxygen uptake and `demand` the extra oxygen the
 * exercise needs, both in litres a minute; the lab exercises from minute 2 to
 * minute 8 and records until minute 16, on the lesson's oxygen-debt curves.
 * `labels.demand` names the slider of the extra demand. `labels.parts` names
 * the fibre, the capillary and the red blood cell. Optional: `labels.need`
 * adds a readout of the whole demand at the moment shown, `labels.force` a
 * readout of the force the fatigued fibres still give, and
 * `labels.parts.liver` a callout on the arrow that carries lactic acid away
 * to the liver.
 */
function oxygenDebtLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      demand: DemandSchema,
      labels: Schema.Struct({
        debt: rich,
        demand: TextSchema,
        force: Schema.optionalKey(rich),
        lactic: rich,
        need: Schema.optionalKey(rich),
        parts: Schema.Struct({
          capillary: TextSchema,
          cell: TextSchema,
          fibre: TextSchema,
          liver: Schema.optionalKey(TextSchema),
        }),
        shortfall: rich,
        time: TextSchema,
        uptake: rich,
        view: TextSchema,
      }),
      rest: RateSchema,
    })
  );
}

/**
 * The visuals of the working muscle. Its props set up the run and name its
 * words; none states a conclusion the lab leads to, so none holds answer
 * state.
 */
export function muscleVisuals<E>(rich: RichSlot<E>) {
  return { OxygenDebtLab: oxygenDebtLab(rich) };
}
