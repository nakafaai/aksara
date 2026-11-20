import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `HoistWorkLab`: a motor hoist lifts a 20 kg crate 5 m onto a
 * platform.
 */
function hoistWorkLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMotor: TextSchema,
        energy: rich,
        height: rich,
        speed: rich,
        time: rich,
        viewLabel: TextSchema,
        weight: rich,
      }),
      motor: Schema.optionalKey(Schema.Literals(["small", "medium", "large"])),
    })
  );
}

/**
 * Props of `KettleHeatingLab`: an electric kettle boils 0.5 kg, 1 kg or 1.5 kg
 * of water from 25 °C.
 */
function kettleHeatingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fill: Schema.optionalKey(Schema.Literals(["half", "full", "brim"])),
      labels: Schema.Struct({
        chooseFill: TextSchema,
        energy: rich,
        power: rich,
        rise: rich,
        time: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `FlashlightEfficiencyLab`: a flashlight in a dark room, its cells
 * drawn in cutaway.
 */
function flashlightEfficiencyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      bulb: Schema.optionalKey(Schema.Literals(["filament", "led"])),
      labels: Schema.Struct({
        battery: rich,
        bulbs: byIds(["filament", "led"], rich),
        chooseBulb: TextSchema,
        efficiency: rich,
        heat: rich,
        input: rich,
        light: rich,
        runTime: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `PendulumEnergyLab`: a 1 kg bob on a 2 m string, let go from 40°,
 * with its energy stores read 10 s after the release.
 */
function pendulumEnergyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      drag: Schema.optionalKey(Schema.Literals(["none", "light", "strong"])),
      labels: Schema.Struct({
        chooseDrag: TextSchema,
        drags: byIds(["none", "light", "strong"], rich),
        heat: rich,
        kinetic: rich,
        potential: rich,
        start: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `WeightLampEnergyLab`: a gravity lamp in a dark room. */
function weightLampEnergyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      descent: Schema.optionalKey(Schema.Literals(["fast", "steady", "slow"])),
      labels: Schema.Struct({
        chooseDescent: TextSchema,
        drop: rich,
        energy: rich,
        mass: rich,
        power: rich,
        time: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `EnergyFlowLossLab`: 100 J entering five kinds of power plant, drawn
 * as a band of light that every machine thins out.
 */
function energyFlowLossLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        choosePlant: TextSchema,
        efficiency: rich,
        input: rich,
        lost: rich,
        plants: byIds(["solar", "wind", "hydro", "geothermal", "biogas"], rich),
        useful: rich,
        viewLabel: TextSchema,
      }),
      plant: Schema.optionalKey(
        Schema.Literals(["solar", "wind", "hydro", "geothermal", "biogas"])
      ),
    })
  );
}

/**
 * The props of the energy conversion and efficiency labs. No prop states the
 * conclusion a lab leads to, so none holds answer state.
 */
export function efficiencyVisuals<E>(rich: RichSlot<E>) {
  return {
    HoistWorkLab: hoistWorkLab(rich),
    KettleHeatingLab: kettleHeatingLab(rich),
    FlashlightEfficiencyLab: flashlightEfficiencyLab(rich),
    PendulumEnergyLab: pendulumEnergyLab(rich),
    WeightLampEnergyLab: weightLampEnergyLab(rich),
    EnergyFlowLossLab: energyFlowLossLab(rich),
  };
}
