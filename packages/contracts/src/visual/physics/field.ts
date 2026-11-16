import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `CurrentBalanceLab`: a straight wire lies east to west across the gap of a magnet whose field points north. */
function currentBalanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      field: Schema.Finite,
      labels: Schema.Struct({
        current: rich,
        currentName: TextSchema,
        force: rich,
        needed: rich,
        viewLabel: TextSchema,
        weight: rich,
      }),
      length: Schema.Finite,
      mass: Schema.Finite,
    })
  );
}

/** Props of `MagnetPipeLab`: the same strong magnet dropped at the same moment through three pipes of the same size: plastic, copper, and copper with a slit along its length. */
function magnetPipeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        copper: rich,
        plastic: rich,
        slit: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `TransformerLab`: a transformer on a laminated iron core lights a bulb from its secondary coil. */
function transformerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      efficiency: Schema.Finite,
      labels: Schema.Struct({
        input: rich,
        lost: rich,
        primaryCurrent: rich,
        ratio: rich,
        viewLabel: TextSchema,
      }),
      outputPower: Schema.Finite,
      primaryVoltage: Schema.Finite,
      secondaryVoltage: Schema.Finite,
    })
  );
}

/**
 * The props of the electromagnetism labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function fieldVisuals<E>(rich: RichSlot<E>) {
  return {
    CurrentBalanceLab: currentBalanceLab(rich),
    MagnetPipeLab: magnetPipeLab(rich),
    TransformerLab: transformerLab(rich),
  };
}
