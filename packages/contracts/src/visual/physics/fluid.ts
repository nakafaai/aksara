import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `FloatingBlockLab`: a wooden block floats in a tank of water, then in a lighter liquid. */
function floatingBlockLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      density: Schema.Finite,
      labels: Schema.Struct({
        above: rich,
        liquid: TextSchema,
        liquids: byIds(["water", "other"], rich),
        under: rich,
        viewLabel: TextSchema,
      }),
      underWater: Schema.Finite,
      volume: Schema.Finite,
    })
  );
}

/** Props of `HydraulicJackLab`: a hydraulic jack in section, each cylinder drawn as wide as its piston. */
function hydraulicJackLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      force: Schema.Finite,
      labels: Schema.Struct({
        force: rich,
        forceName: TextSchema,
        lifted: rich,
        mass: rich,
        pressure: rich,
        rise: rich,
        viewLabel: TextSchema,
      }),
      largeArea: Schema.Finite,
      smallArea: Schema.Finite,
      stroke: Schema.Finite,
    })
  );
}

/** Props of `ManometerLab`: a U-tube manometer with one arm on a gas supply and the other open to the air. */
function manometerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      atmosphere: Schema.Finite,
      difference: Schema.Finite,
      labels: Schema.Struct({
        difference: rich,
        differenceName: TextSchema,
        excess: rich,
        gas: rich,
        viewLabel: TextSchema,
      }),
      liquidDensity: Schema.Finite,
      referenceDensity: Schema.Finite,
    })
  );
}

/** Props of `VenturiTubeLab`: water flows steadily through a horizontal pipe that narrows halfway, with an open tube above each section. */
function venturiTubeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        drop: rich,
        faster: rich,
        speed: rich,
        speedName: TextSchema,
        viewLabel: TextSchema,
      }),
      narrow: Schema.Finite,
      speed: Schema.Finite,
      wide: Schema.Finite,
    })
  );
}

/**
 * The props of the fluid pressure labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function fluidVisuals<E>(rich: RichSlot<E>) {
  return {
    FloatingBlockLab: floatingBlockLab(rich),
    HydraulicJackLab: hydraulicJackLab(rich),
    ManometerLab: manometerLab(rich),
    VenturiTubeLab: venturiTubeLab(rich),
  };
}
