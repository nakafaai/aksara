import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The cues that show a reaction happened. */
const REACTION_CUES = ["gas", "precipitate", "color", "energy"] as const;

/** The reaction types the types lab shows. */
const REACTION_TYPES = ["combustion", "rust", "precipitate", "gas"] as const;

/** Props of `ChemicalReactionCharacteristicsLab`: what a reaction looks like. */
function reactionCharacteristicsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        after: TextSchema,
        before: TextSchema,
        chooseCue: TextSchema,
        cues: byIds(
          REACTION_CUES,
          Schema.Struct({
            helperCaption: rich,
            limit: rich,
            meaning: rich,
            observation: rich,
            tab: TextSchema,
          })
        ),
        limitLabel: TextSchema,
        meaningLabel: TextSchema,
        observationLabel: TextSchema,
        transition: TextSchema,
      }),
    }),
    answerAt(["labels", "cues", "*", "meaning"])
  );
}

/** Props of `ChemicalReactionTypesLab`: four everyday reactions and their equations. */
function reactionTypesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        after: TextSchema,
        before: TextSchema,
        checkLabel: TextSchema,
        chooseType: TextSchema,
        equationLabel: TextSchema,
        reactionView: TextSchema,
        readingLabel: TextSchema,
        types: byIds(
          REACTION_TYPES,
          Schema.Struct({
            check: rich,
            equation: rich,
            helperCaption: rich,
            reading: rich,
            tab: TextSchema,
            visibleCue: rich,
          })
        ),
        visibleCueLabel: TextSchema,
      }),
    }),
    answerAt(
      ["labels", "types", "*", "check"],
      ["labels", "types", "*", "equation"]
    )
  );
}

/** Props of `MethaneCombustionEquationLab`: methane burning, molecule by molecule. */
function methaneCombustionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        equation: rich,
        moleculeView: TextSchema,
        products: TextSchema,
        reactants: TextSchema,
      }),
    }),
    answerAt(["labels", "equation"])
  );
}

/**
 * The reaction labs. A meaning says what a cue tells, an equation and its
 * check balance a reaction, so they are answer state.
 */
export function reactionVisuals<E>(rich: RichSlot<E>) {
  return {
    ChemicalReactionCharacteristicsLab: reactionCharacteristicsLab(rich),
    ChemicalReactionTypesLab: reactionTypesLab(rich),
    MethaneCombustionEquationLab: methaneCombustionLab(rich),
  };
}
