import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `DoorHingeTorqueLab`: a door seen from the ceiling, pushed open by a
 * hand.
 */
function doorHingeTorqueLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      arm: Schema.Finite,
      force: Schema.Finite,
      labels: Schema.Struct({
        angle: rich,
        angleName: TextSchema,
        arm: rich,
        armName: TextSchema,
        square: rich,
        torque: rich,
        viewLabel: TextSchema,
      }),
      mass: Schema.Finite,
      width: Schema.Finite,
    })
  );
}

/** Props of `WrenchTorqueLab`: a wheel brace on a car wheel's nut. */
function wrenchTorqueLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      arm: Schema.Finite,
      force: Schema.Finite,
      labels: Schema.Struct({
        angle: rich,
        angleName: TextSchema,
        square: rich,
        torque: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `SledPullWorkLab`: a sled of firewood pulled across snow by a rope.
 */
function sledPullWorkLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      distance: Schema.Finite,
      force: Schema.Finite,
      labels: Schema.Struct({
        along: rich,
        angle: rich,
        angleName: TextSchema,
        normal: rich,
        up: rich,
        viewLabel: TextSchema,
        work: rich,
      }),
      mass: Schema.Finite,
    })
  );
}

/**
 * Props of `SolarPanelFluxLab`: a solar panel on a frame in a field, with the
 * sun in the sky it faces.
 */
function solarPanelFluxLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      area: Schema.Finite,
      elevation: Schema.Finite,
      labels: Schema.Struct({
        between: rich,
        cosine: rich,
        power: rich,
        tilt: rich,
        tiltName: TextSchema,
        viewLabel: TextSchema,
      }),
      sunlight: Schema.Finite,
      tilt: Schema.Finite,
    })
  );
}

/**
 * The props of the labs of vector products: torque, work, and flux. No prop
 * states the conclusion a lab leads to, so none holds answer state.
 */
export function productVisuals<E>(rich: RichSlot<E>) {
  return {
    DoorHingeTorqueLab: doorHingeTorqueLab(rich),
    WrenchTorqueLab: wrenchTorqueLab(rich),
    SledPullWorkLab: sledPullWorkLab(rich),
    SolarPanelFluxLab: solarPanelFluxLab(rich),
  };
}
