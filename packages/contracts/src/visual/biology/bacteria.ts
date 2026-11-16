import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `BinaryFissionLab`: one cell of Escherichia coli on agar becomes a
 * colony by binary fission.
 */
function binaryFissionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        cells: rich,
        generations: rich,
        minutes: TextSchema,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `ChemotaxisLab`: two Escherichia coli cells swim in a dish whose
 * sugar comes from a crystal on the right.
 */
function chemotaxisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        elapsed: rich,
        mutant: rich,
        sensing: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `GramStainLab`: a Gram stain under the microscope, step by step, on
 * a slide that carries three shapes of bacteria at 1000×.
 */
function gramStainLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseStep: TextSchema,
        hues: byIds(["clear", "purple", "pink"], rich),
        negative: rich,
        positive: rich,
        steps: byIds(
          ["smear", "violet", "iodine", "alcohol", "safranin"],
          TextSchema
        ),
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `YogurtLab`: milk with a spoonful of yoghurt culture sits in a
 * yoghurt maker at 43 °C.
 */
function yogurtLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        hours: TextSchema,
        ph: rich,
        state: rich,
        states: Schema.Struct({ liquid: rich, set: rich }),
        tilt: TextSchema,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The props of the bacteria labs. No prop states the conclusion a lab leads to,
 * so none holds answer state.
 */
export function bacteriaVisuals<E>(rich: RichSlot<E>) {
  return {
    BinaryFissionLab: binaryFissionLab(rich),
    ChemotaxisLab: chemotaxisLab(rich),
    GramStainLab: gramStainLab(rich),
    YogurtLab: yogurtLab(rich),
  };
}
