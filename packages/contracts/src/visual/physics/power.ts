import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `HydroDamLab`: a hydropower dam in cross-section. */
function hydroDamLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      head: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        electric: rich,
        head: rich,
        headControl: TextSchema,
        kinetic: rich,
        potential: rich,
        shaft: rich,
        speed: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `MicrohydroLab`: a microhydro plant on a hillside at dusk. */
function microhydroLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      flow: Schema.optionalKey(Schema.Finite),
      head: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        flowControl: TextSchema,
        headControl: TextSchema,
        homes: rich,
        power: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `WaveBuoyPowerLab`: a wave-energy buoy riding deep-water waves,
 * drawn in cross-section with the height stretched four times.
 */
function waveBuoyPowerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSea: TextSchema,
        height: rich,
        length: rich,
        period: rich,
        power: rich,
        seas: byIds(["calm", "moderate", "rough"], rich),
        viewLabel: TextSchema,
      }),
      sea: Schema.optionalKey(Schema.Literals(["calm", "moderate", "rough"])),
    })
  );
}

/**
 * Props of `WindRotorLab`: the same wind turbine, rotor 40 m long, at a valley,
 * a hill top and a coast.
 */
function windRotorLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSite: TextSchema,
        daily: rich,
        electric: rich,
        sites: byIds(["valley", "hill", "coast"], rich),
        speed: rich,
        viewLabel: TextSchema,
        wind: rich,
      }),
      site: Schema.optionalKey(Schema.Literals(["valley", "hill", "coast"])),
    })
  );
}

/** Props of `GeothermalLoopLab`: a geothermal plant in cross-section. */
function geothermalLoopLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        electric: rich,
        heat: rich,
        ideal: rich,
        real: rich,
        reservoirControl: TextSchema,
        viewLabel: TextSchema,
      }),
      reservoir: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * Props of `BiogasDigesterLab`: a household biogas digester in cross-section.
 */
function biogasDigesterLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      dung: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        cooking: rich,
        dungControl: TextSchema,
        energy: rich,
        gas: rich,
        methane: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `SteamPlantCycleLab`: a steam power plant fed 1000 MW of heat by
 * coal, gas or uranium.
 */
function steamPlantCycleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fuel: Schema.optionalKey(Schema.Literals(["coal", "gas", "uranium"])),
      labels: Schema.Struct({
        chooseFuel: TextSchema,
        electric: rich,
        fuelUse: rich,
        fuels: byIds(["coal", "gas", "uranium"], rich),
        heat: rich,
        ideal: rich,
        steam: rich,
        viewLabel: TextSchema,
        waste: rich,
      }),
    })
  );
}

/**
 * Props of `FuelCombustionCarbonLab`: 1 kg of coal, diesel or methane burns
 * under a hood, and a balloon collects the carbon dioxide.
 */
function fuelCombustionCarbonLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fuel: Schema.optionalKey(Schema.Literals(["coal", "diesel", "methane"])),
      labels: Schema.Struct({
        carbon: rich,
        chooseFuel: TextSchema,
        dioxide: rich,
        fuels: byIds(["coal", "diesel", "methane"], rich),
        oxygen: rich,
        perEnergy: rich,
        viewLabel: TextSchema,
        volume: rich,
      }),
    })
  );
}

/**
 * The props of the power plant labs. No prop states the conclusion a lab leads
 * to, so none holds answer state.
 */
export function powerVisuals<E>(rich: RichSlot<E>) {
  return {
    HydroDamLab: hydroDamLab(rich),
    MicrohydroLab: microhydroLab(rich),
    WaveBuoyPowerLab: waveBuoyPowerLab(rich),
    WindRotorLab: windRotorLab(rich),
    GeothermalLoopLab: geothermalLoopLab(rich),
    BiogasDigesterLab: biogasDigesterLab(rich),
    SteamPlantCycleLab: steamPlantCycleLab(rich),
    FuelCombustionCarbonLab: fuelCombustionCarbonLab(rich),
  };
}
