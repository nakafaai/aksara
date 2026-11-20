import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `SatelliteOrbitCircularLab`: three real satellites in circular
 * orbits drawn to scale around the Earth.
 */
function satelliteOrbitCircularLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        acceleration: rich,
        chooseOrbit: TextSchema,
        orbits: byIds(["station", "gps", "geostationary"], rich),
        period: rich,
        radius: rich,
        speed: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `StringWhirlReleaseLab`: a ball whirled on a string, seen from
 * above, let go at a point the learner picks.
 */
function stringWhirlReleaseLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        acceleration: rich,
        chooseRelease: TextSchema,
        period: rich,
        radius: rich,
        releases: byIds(["east", "north", "west", "south"], rich),
        speed: rich,
        viewLabel: TextSchema,
      }),
      period: Schema.Finite,
      radius: Schema.Finite,
    })
  );
}

/**
 * The props of the circular motion labs. No prop states the conclusion a lab
 * leads to, so none holds answer state.
 */
export function circularVisuals<E>(rich: RichSlot<E>) {
  return {
    SatelliteOrbitCircularLab: satelliteOrbitCircularLab(rich),
    StringWhirlReleaseLab: stringWhirlReleaseLab(rich),
  };
}
