import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `HeatingCurveLab`: an immersion heater of constant power melts a solid in a beaker and then warms the liquid. */
function heatingCurveLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      finalTemperature: Schema.Finite,
      labels: Schema.Struct({
        latent: rich,
        power: rich,
        viewLabel: TextSchema,
      }),
      liquidHeat: Schema.Finite,
      mass: Schema.Finite,
      meltingPoint: Schema.Finite,
      meltMinutes: Schema.Finite,
      warmMinutes: Schema.Finite,
    })
  );
}

/** Props of `GasPistonLab`: a fixed mass of gas in a cylinder, taken through its change one step at a time: first squeezed to its new volume at the starting temperature, then heated at that volume. */
function gasPistonLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      finalTemperature: Schema.Finite,
      labels: Schema.Struct({
        pressure: rich,
        stage: TextSchema,
        stages: byIds(["start", "compressed", "heated"], rich),
        temperature: rich,
        viewLabel: TextSchema,
        volume: rich,
      }),
      pressure: Schema.Finite,
      temperature: Schema.Finite,
      volumeRatio: Schema.Finite,
    })
  );
}

/** Props of `IceMeltingLab`: an ice cube at 0 °C dropped into warm water in an insulated cup. */
function iceMeltingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      iceMass: Schema.Finite,
      labels: Schema.Struct({
        final: rich,
        given: rich,
        melt: rich,
        viewLabel: TextSchema,
      }),
      latentHeat: Schema.Finite,
      specificHeat: Schema.Finite,
      waterMass: Schema.Finite,
      waterTemperature: Schema.Finite,
    })
  );
}

/**
 * The props of the heat labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function heatVisuals<E>(rich: RichSlot<E>) {
  return {
    HeatingCurveLab: heatingCurveLab(rich),
    GasPistonLab: gasPistonLab(rich),
    IceMeltingLab: iceMeltingLab(rich),
  };
}
