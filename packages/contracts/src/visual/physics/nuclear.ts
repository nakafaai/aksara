import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `HalfLifeCounterLab`: a Geiger-Muller counter in front of a radioactive sample records its rate over time. */
function halfLifeCounterLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      background: Schema.Finite,
      first: Schema.Finite,
      labels: Schema.Struct({
        end: rich,
        halfLife: rich,
        start: rich,
        viewLabel: TextSchema,
      }),
      later: Schema.Finite,
      time: Schema.Finite,
    })
  );
}

/** Props of `FissionLab`: a slow neutron splits a uranium nucleus into two fragments and a few fast neutrons. */
function fissionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fragments: Schema.Tuple([Schema.Finite, Schema.Finite]),
      labels: Schema.Struct({
        defect: rich,
        energy: rich,
        kilograms: rich,
        viewLabel: TextSchema,
      }),
      lightSpeed: Schema.Finite,
      neutron: Schema.Finite,
      parent: Schema.Finite,
      released: Schema.Finite,
      unit: Schema.Finite,
    })
  );
}

/** Props of `PhotoelectricLab`: light falls on a metal plate in an evacuated tube. */
function photoelectricLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      charge: Schema.Finite,
      labels: Schema.Struct({
        energy: rich,
        intensity: rich,
        intensityName: TextSchema,
        kinetic: rich,
        none: rich,
        viewLabel: TextSchema,
        wavelength: rich,
        wavelengthName: TextSchema,
      }),
      lightSpeed: Schema.Finite,
      planck: Schema.Finite,
      wavelength: Schema.Finite,
      workFunction: Schema.Finite,
    })
  );
}

/**
 * The props of the nuclear and quantum physics labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function nuclearVisuals<E>(rich: RichSlot<E>) {
  return {
    HalfLifeCounterLab: halfLifeCounterLab(rich),
    FissionLab: fissionLab(rich),
    PhotoelectricLab: photoelectricLab(rich),
  };
}
