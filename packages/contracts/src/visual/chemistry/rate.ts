import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** How finely a solid reactant is divided. */
const SOLIDS = ["chips", "granules", "powder"] as const;

/**
 * Props of `GasRateLab`: up to two runs of a reaction that gives off a gas,
 * each a conical flask stoppered to a gas syringe, with the solid's form and
 * the final amount of gas in mol. With `showCurves`, the plungers move with
 * time and a board plots each run's amount against time, so it is answer
 * state.
 */
function gasRateLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        final: rich,
        runs: Schema.NonEmptyArray(rich),
        solids: byIds(SOLIDS, rich),
        time: TextSchema,
        view: TextSchema,
      }),
      runs: Schema.NonEmptyArray(
        Schema.Struct({
          amount: Schema.Finite,
          solid: Schema.Literals(SOLIDS),
        })
      ),
      showCurves: Schema.optionalKey(Schema.Boolean),
    }),
    answerAt(["showCurves"])
  );
}

/** The rate of reaction labs. */
export function rateVisuals<E>(rich: RichSlot<E>) {
  return {
    GasRateLab: gasRateLab(rich),
  };
}
