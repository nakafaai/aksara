import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The reactions of the law of combining volumes. */
const COMBINING_MODES = [
  "water-vapor",
  "ammonia-synthesis",
  "ammonia-decomposition",
] as const;

/** The mixtures of the law of constant composition. */
const CONSTANT_MODES = ["exact", "hydrogen-excess", "oxygen-excess"] as const;

/** The systems of the law of conservation of mass. */
const CONSERVATION_MODES = ["closed", "open"] as const;

/** The compound pairs of the law of multiple proportions. */
const MULTIPLE_MODES = [
  "water-peroxide",
  "carbon-oxides",
  "nitrogen-oxides",
] as const;

/** Props of `CombiningVolumesLab`: gas volumes that react in whole ratios. */
function combiningVolumesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMode: TextSchema,
        exampleLabel: TextSchema,
        modes: byIds(
          COMBINING_MODES,
          Schema.Struct({
            example: rich,
            helperCaption: rich,
            ratio: rich,
            tab: rich,
            tabLabel: TextSchema,
          })
        ),
        products: TextSchema,
        ratioLabel: TextSchema,
        reactants: TextSchema,
        reactionView: TextSchema,
        volumeUnit: TextSchema,
      }),
    }),
    answerAt(["labels", "modes", "*", "ratio"])
  );
}

/** Props of `ConstantCompositionLab`: one compound, one mass ratio. */
function constantCompositionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        after: TextSchema,
        before: TextSchema,
        chooseMode: TextSchema,
        leftoverLabel: TextSchema,
        modes: byIds(
          CONSTANT_MODES,
          Schema.Struct({
            helperCaption: rich,
            leftover: rich,
            ratio: rich,
            readoutAfter: rich,
            readoutBefore: rich,
            tab: rich,
            tabLabel: TextSchema,
          })
        ),
        ratioLabel: TextSchema,
        reactionView: TextSchema,
      }),
    }),
    answerAt(
      ["labels", "modes", "*", "leftover"],
      ["labels", "modes", "*", "ratio"]
    )
  );
}

/** Props of `MassConservationLab`: the mass of a closed and an open system. */
function massConservationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        after: TextSchema,
        before: TextSchema,
        calculationLabel: TextSchema,
        chooseMode: TextSchema,
        modes: byIds(
          CONSERVATION_MODES,
          Schema.Struct({
            calculation: rich,
            helperCaption: rich,
            readoutAfter: rich,
            readoutBefore: rich,
            system: rich,
            tab: TextSchema,
          })
        ),
        reactionView: TextSchema,
        systemLabel: TextSchema,
      }),
    }),
    answerAt(["labels", "modes", "*", "calculation"])
  );
}

/** Props of `MultipleProportionsLab`: one element fixed, the other in small ratios. */
function multipleProportionsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        changingLabel: TextSchema,
        chooseMode: TextSchema,
        comparisonView: TextSchema,
        fixedLabel: TextSchema,
        modes: byIds(
          MULTIPLE_MODES,
          Schema.Struct({
            changing: rich,
            fixed: rich,
            helperCaption: rich,
            tab: rich,
            tabLabel: TextSchema,
          })
        ),
      }),
    }),
    answerAt(["labels", "modes", "*", "changing"])
  );
}

/**
 * The labs of the basic chemical laws. A ratio, a leftover, and a calculation
 * state the result each law predicts, so they are answer state.
 */
export function lawVisuals<E>(rich: RichSlot<E>) {
  return {
    CombiningVolumesLab: combiningVolumesLab(rich),
    ConstantCompositionLab: constantCompositionLab(rich),
    MassConservationLab: massConservationLab(rich),
    MultipleProportionsLab: multipleProportionsLab(rich),
  };
}
