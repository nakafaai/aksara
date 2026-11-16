import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `SolarPanelAngleLab`: a solar panel on a stand under parallel rays
 * of sunlight.
 */
function solarPanelAngleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        incidence: rich,
        irradiance: rich,
        power: rich,
        sunControl: TextSchema,
        tiltControl: TextSchema,
        viewLabel: TextSchema,
      }),
      sun: Schema.optionalKey(Schema.Finite),
      tilt: Schema.optionalKey(Schema.Finite),
    })
  );
}

/** Props of `SolarPanelHeatLab`: a 1.6 m² solar panel on a roof. */
function solarPanelHeatLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      irradiance: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        efficiency: rich,
        electric: rich,
        heat: rich,
        input: rich,
        irradianceControl: TextSchema,
        reflected: rich,
        temperature: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `SolarRoofPaybackLab`: a 3 kWp solar roof starts in energy debt:
 * making it took 3900 kWh.
 */
function solarRoofPaybackLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        invested: rich,
        lifetime: rich,
        payback: rich,
        viewLabel: TextSchema,
        yearly: rich,
        yieldControl: TextSchema,
      }),
      yieldPerPeak: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * Props of `SolarBatteryStorageLab`: a village health post on a 3 kWp solar
 * roof with a battery, through one day.
 */
function solarBatteryStorageLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSize: TextSchema,
        demand: rich,
        size: rich,
        solar: rich,
        unmet: rich,
        viewLabel: TextSchema,
      }),
      size: Schema.optionalKey(Schema.Literals([5, 10, 15])),
    })
  );
}

/**
 * Props of `GreenhouseLayerLab`: Earth's surface under one layer of atmosphere.
 */
function greenhouseLayerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      absorptance: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        absorptanceControl: TextSchema,
        back: rich,
        celsius: rich,
        emitted: rich,
        kelvin: rich,
        sunlight: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `GridLoadCurveLab`: a village of 100 homes through one day on a 50
 * kW mini-grid, above its hourly demand curve.
 */
function gridLoadCurveLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        capacity: rich,
        chooseSchedule: TextSchema,
        energy: rich,
        hours: rich,
        peak: rich,
        schedules: byIds(["together", "spread"], rich),
        viewLabel: TextSchema,
      }),
      schedule: Schema.optionalKey(Schema.Literals(["together", "spread"])),
    })
  );
}

/**
 * The props of the solar energy labs. No prop states the conclusion a lab leads
 * to, so none holds answer state.
 */
export function solarVisuals<E>(rich: RichSlot<E>) {
  return {
    SolarPanelAngleLab: solarPanelAngleLab(rich),
    SolarPanelHeatLab: solarPanelHeatLab(rich),
    SolarRoofPaybackLab: solarRoofPaybackLab(rich),
    SolarBatteryStorageLab: solarBatteryStorageLab(rich),
    GreenhouseLayerLab: greenhouseLayerLab(rich),
    GridLoadCurveLab: gridLoadCurveLab(rich),
  };
}
