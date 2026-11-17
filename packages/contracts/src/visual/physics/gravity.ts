import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `OrbitRadiusLab`: two satellites in circular orbits round the Earth, drawn to scale. */
function orbitRadiusLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      knownHeight: Schema.Finite,
      knownPeriod: Schema.Finite,
      labels: Schema.Struct({
        knownName: TextSchema,
        knownRadius: rich,
        otherName: TextSchema,
        otherPeriod: rich,
        otherRadius: rich,
        viewLabel: TextSchema,
      }),
      otherHeight: Schema.Finite,
    })
  );
}

/** Props of `PlanetCompareLab`: the Earth and another planet side by side at the same scale, each with a satellite skimming its surface. */
function planetCompareLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        earthName: TextSchema,
        escape: rich,
        gravity: rich,
        orbit: rich,
        period: rich,
        planetName: TextSchema,
        viewLabel: TextSchema,
      }),
      mass: Schema.Finite,
      radius: Schema.Finite,
    })
  );
}

/**
 * The props of the gravitation labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function gravityVisuals<E>(rich: RichSlot<E>) {
  return {
    OrbitRadiusLab: orbitRadiusLab(rich),
    PlanetCompareLab: planetCompareLab(rich),
  };
}
