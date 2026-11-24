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

/** A strictly positive finite setting for kinetics sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A strictly positive slider whose minimum sits below its maximum. */
const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive kinetics slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

/** How finely a solid reactant is divided in the gas-rate lab. */
const SOLIDS = ["chips", "granules", "powder"] as const;

/** Surface-area presets in the collision-theory energy lab. */
const SURFACES = ["lump", "granules", "powder"] as const;

/** Enthalpy sign presets in the catalyst energy-profile lab. */
const REACTION_TYPES = ["exothermic", "endothermic"] as const;

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

/**
 * Props of `CollisionTheoryEnergyLab`: a 3D reaction vessel and synchronized
 * Maxwell-Boltzmann kinetic energy distribution showing effective collisions
 * above activation energy as temperature, concentration, and surface area
 * change. Collision frequency and effective rate readouts are optional answer
 * state.
 */
function collisionTheoryEnergyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      concentration: PositiveSliderSchema,
      labels: Schema.Struct({
        activationEnergy: rich,
        collisionFreq: Schema.optionalKey(rich),
        concentration: TextSchema,
        effectiveRate: Schema.optionalKey(rich),
        parts: byIds(
          ["reactants", "products", "activationLine", "shadedArea", "vessel"],
          TextSchema
        ),
        surface: TextSchema,
        surfaces: byPickedIds(SURFACES, TextSchema),
        temperature: TextSchema,
        view: TextSchema,
      }),
      surfaces: Schema.NonEmptyArray(Schema.Literals(SURFACES)).check(
        Schema.isUnique()
      ),
      temperature: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, surfaces }) => namesEach(surfaces, labels.surfaces),
        {
          message:
            "Expected a name for every solid surface-area preset shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "collisionFreq"], ["labels", "effectiveRate"])
  );
}

/**
 * Props of `CatalystPathwayLab`: a 3D reaction-coordinate energy profile and
 * catalyst surface contrasting uncatalysed and catalysed alternative pathways
 * for exothermic and endothermic reactions without shifting enthalpy change.
 * Activation energy and enthalpy change readouts are optional answer state.
 */
function catalystPathwayLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        activationEnergy: Schema.optionalKey(rich),
        catalyst: TextSchema,
        catalystStates: byIds(["absent", "present"], TextSchema),
        enthalpyChange: Schema.optionalKey(rich),
        parts: byIds(
          [
            "reactantLevel",
            "productLevel",
            "uncatalysedPeak",
            "catalysedPeak",
            "catalystSurface",
          ],
          TextSchema
        ),
        pathway: rich,
        reaction: TextSchema,
        reactions: byPickedIds(REACTION_TYPES, TextSchema),
        view: TextSchema,
      }),
      reactions: Schema.NonEmptyArray(Schema.Literals(REACTION_TYPES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, reactions }) => namesEach(reactions, labels.reactions),
        {
          message:
            "Expected a name for every reaction type shown in the catalyst lab, and no other.",
        }
      )
    ),
    answerAt(["labels", "activationEnergy"], ["labels", "enthalpyChange"])
  );
}

/**
 * The rate of reaction labs covering gas-syringe kinetics, collision theory,
 * and catalytic energy pathways.
 */
export function rateVisuals<E>(rich: RichSlot<E>) {
  return {
    CatalystPathwayLab: catalystPathwayLab(rich),
    CollisionTheoryEnergyLab: collisionTheoryEnergyLab(rich),
    GasRateLab: gasRateLab(rich),
  };
}
