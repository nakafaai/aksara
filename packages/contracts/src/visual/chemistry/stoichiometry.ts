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

const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const ENTHALPY_REACTIONS = [
  "neutralisation",
  "displacement",
  "combustion",
  "dissolution",
] as const;

const GAS_CONDITIONS = ["stp", "rtp"] as const;

/**
 * Props of `CalorimeterEnthalpyLab`: a 3D polystyrene coffee-cup calorimeter
 * measuring temperature rise or drop for exothermic and endothermic reactions
 * as reacting moles vary. Enthalpy change and temperature change readouts are
 * optional answer state.
 */
function calorimeterEnthalpyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        deltaH: Schema.optionalKey(rich),
        moles: TextSchema,
        parts: byIds(
          ["cup", "thermometer", "stirrer", "solution", "heatArrow"],
          TextSchema
        ),
        reaction: TextSchema,
        reactions: byPickedIds(
          ENTHALPY_REACTIONS,
          Schema.Struct({
            enthalpySign: rich,
            name: TextSchema,
            thermalNote: rich,
          })
        ),
        tempChange: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      moles: PositiveSliderSchema,
      reactions: Schema.NonEmptyArray(
        Schema.Literals(ENTHALPY_REACTIONS)
      ).check(Schema.isUnique()),
    }).check(
      Schema.makeFilter(
        ({ labels, reactions }) => namesEach(reactions, labels.reactions),
        {
          message:
            "Expected a name, enthalpy sign, and thermal note for every calorimeter reaction shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "deltaH"], ["labels", "tempChange"])
  );
}

/**
 * Props of `AvogadroGasVolumeLab`: a 3D graduated gas cylinder with moving
 * piston illustrating Avogadro's molar volume at STP (22.4 dm3/mol) and RTP
 * (24.0 dm3/mol) as moles vary. Gas volume and particle count readouts are
 * optional answer state.
 */
function avogadroGasVolumeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      conditions: Schema.NonEmptyArray(Schema.Literals(GAS_CONDITIONS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        condition: TextSchema,
        conditions: byPickedIds(
          GAS_CONDITIONS,
          Schema.Struct({
            molarVolume: rich,
            name: TextSchema,
          })
        ),
        gasVolume: Schema.optionalKey(rich),
        moles: TextSchema,
        particleCount: Schema.optionalKey(rich),
        parts: byIds(
          ["piston", "cylinder", "gasParticles", "volumeScale", "thermometer"],
          TextSchema
        ),
        view: TextSchema,
      }),
      moles: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ conditions, labels }) => namesEach(conditions, labels.conditions),
        {
          message:
            "Expected a name and molar volume note for every gas condition shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "gasVolume"], ["labels", "particleCount"])
  );
}

/**
 * Quantitative thermochemistry and mole-concept labs covering calorimetry
 * enthalpy measurement and Avogadro molar gas volume.
 */
export function stoichiometryVisuals<E>(rich: RichSlot<E>) {
  return {
    AvogadroGasVolumeLab: avogadroGasVolumeLab(rich),
    CalorimeterEnthalpyLab: calorimeterEnthalpyLab(rich),
  };
}
