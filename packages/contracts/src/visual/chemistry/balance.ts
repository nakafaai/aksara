import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `FizzBalanceLab`: baking soda drops into vinegar in a flask that
 * stands on a balance with everything else.
 */
function fizzBalanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSeal: TextSchema,
        gasEscaped: rich,
        gasFormed: rich,
        readingAfter: rich,
        readingBefore: rich,
        seals: byIds(["open", "closed"], TextSchema),
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `LavoisierCalxLab`: Lavoisier's experiment of 1776 as he describes
 * it in "Elements of Chemistry".
 */
function lavoisierCalxLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        air: rich,
        airUnit: TextSchema,
        calx: rich,
        calxUnit: TextSchema,
        day: TextSchema,
        reverse: rich,
        reverseLabel: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `PrecipitateLab`: two clear solutions stand side by side on a
 * balance.
 */
function precipitateLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        precipitate: rich,
        readingAfter: rich,
        readingBefore: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `SteelWoolLab`: a tuft of steel wool on a heatproof tile on a
 * balance.
 */
function steelWoolLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSeal: TextSchema,
        oxygenJoined: rich,
        readingAfter: rich,
        readingBefore: rich,
        seals: byIds(["open", "closed"], TextSchema),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `ReactionBalanceLab`: a reaction lab. */
function reactionBalanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atoms: rich,
        choose: TextSchema,
        economy: Schema.optionalKey(rich),
        equation: rich,
        mass: rich,
        molecules: Schema.optionalKey(rich),
        products: rich,
        progress: TextSchema,
        reactants: rich,
        view: TextSchema,
      }),
      reactions: Schema.Array(
        Schema.Struct({
          id: Schema.Literals([
            "water-synthesis",
            "hydrogen-chloride-synthesis",
            "ammonia-synthesis",
            "methane-combustion",
            "propane-combustion",
            "ethanol-combustion",
            "peroxide-decomposition",
            "water-electrolysis",
            "carbon-monoxide-oxidation",
            "nitrogen-monoxide-oxidation",
            "nitrogen-fixation",
            "sulfur-dioxide-oxidation",
            "ethene-hydrogenation",
            "ethene-hydration",
            "ethanol-dehydration",
            "ozone-formation",
            "methanol-synthesis",
            "carbon-monoxide-methanol",
          ]),
          name: TextSchema,
          tab: rich,
        })
      ),
      reading: Schema.Literals(["economy", "molecules"]),
    })
  );
}

/**
 * The props of the mass conservation and equation balancing labs. No prop
 * states the conclusion a lab leads to, so none holds answer state.
 */
export function balanceVisuals<E>(rich: RichSlot<E>) {
  return {
    FizzBalanceLab: fizzBalanceLab(rich),
    LavoisierCalxLab: lavoisierCalxLab(rich),
    PrecipitateLab: precipitateLab(rich),
    SteelWoolLab: steelWoolLab(rich),
    ReactionBalanceLab: reactionBalanceLab(rich),
  };
}
