import { Schema } from "effect";
import { sliderOf } from "#contracts/visual/biology/control";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** How many enzyme molecules the scene draws: one up to forty. */
const EnzymeCountSchema = Schema.Int.check(
  Schema.isBetween({ maximum: 40, minimum: 1 })
);

/** How many substrate molecules the scene draws: none up to four hundred. */
const SubstrateCountSchema = Schema.Int.check(
  Schema.isBetween({ maximum: 400, minimum: 0 })
);

/**
 * Props of `EnzymeSaturationLab`: enzyme and substrate molecules in solution,
 * seen close up and slowed down. The learner sets how many of each there are
 * with the `enzymes` and `substrates` sliders; one busy active site finishes
 * `turnover` substrates per second. The readouts give the busy active sites,
 * the rate, which factor limits it, and the rate curve against substrate
 * concentration.
 */
function enzymeSaturationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      enzymes: sliderOf(EnzymeCountSchema),
      labels: Schema.Struct({
        busy: rich,
        curve: rich,
        enzymes: TextSchema,
        limiting: rich,
        limits: byIds(["substrate", "enzyme"], rich),
        parts: byIds(["enzyme", "substrate", "product"], TextSchema),
        rate: rich,
        substrates: TextSchema,
        time: TextSchema,
        view: TextSchema,
      }),
      substrates: sliderOf(SubstrateCountSchema),
      turnover: Schema.Finite.check(Schema.isGreaterThan(0)),
    })
  );
}

/** The saturation lab. The learner reads the limiting factor by trying, so none is answer state. */
export function saturationVisuals<E>(rich: RichSlot<E>) {
  return { EnzymeSaturationLab: enzymeSaturationLab(rich) };
}
