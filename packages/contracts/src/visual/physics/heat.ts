import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A strictly positive finite setting for thermal lab sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A strictly positive slider whose minimum sits below its maximum. */
const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive thermal slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const CALORIMETER_MATERIALS = [
  "water",
  "aluminium",
  "copper",
  "iron",
  "oil",
] as const;

const GAS_LAWS = ["boyle", "charles", "gayLussac"] as const;

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
 * Props of `SpecificHeatCalorimeterLab`: a 3D insulated electrical calorimeter
 * comparing specific heat capacity across materials with adjustable mass,
 * heater power, and heating time. Specific heat and temperature-rise readouts
 * are optional answer state.
 */
function specificHeatCalorimeterLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        energy: rich,
        mass: TextSchema,
        material: TextSchema,
        materials: byPickedIds(CALORIMETER_MATERIALS, TextSchema),
        parts: byIds(
          ["heater", "thermometer", "stirrer", "insulation", "sample"],
          TextSchema
        ),
        power: TextSchema,
        specificHeat: Schema.optionalKey(rich),
        temperatureRise: Schema.optionalKey(rich),
        time: TextSchema,
        view: TextSchema,
      }),
      mass: PositiveSliderSchema,
      materials: Schema.NonEmptyArray(
        Schema.Literals(CALORIMETER_MATERIALS)
      ).check(Schema.isUnique()),
      minutes: PositiveSliderSchema,
      power: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, materials }) => namesEach(materials, labels.materials),
        {
          message:
            "Expected a name for every calorimeter material shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "specificHeat"], ["labels", "temperatureRise"])
  );
}

/**
 * Props of `GasLawThermalLab`: a 3D piston-cylinder gas chamber exploring
 * Boyle's, Charles's, and Gay-Lussac's laws with live particle collisions
 * across temperature and volume controls. Collision rate and pressure readouts
 * are optional answer state.
 */
function gasLawThermalLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        collisions: Schema.optionalKey(rich),
        constant: rich,
        law: TextSchema,
        laws: byPickedIds(
          GAS_LAWS,
          Schema.Struct({
            name: TextSchema,
            relation: rich,
          })
        ),
        parts: byIds(
          ["piston", "cylinder", "gauge", "heater", "molecules"],
          TextSchema
        ),
        pressure: Schema.optionalKey(rich),
        temperature: TextSchema,
        view: TextSchema,
        volume: TextSchema,
      }),
      laws: Schema.NonEmptyArray(Schema.Literals(GAS_LAWS)).check(
        Schema.isUnique()
      ),
      temperature: PositiveSliderSchema,
      volume: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(({ labels, laws }) => namesEach(laws, labels.laws), {
        message:
          "Expected a name and relation note for every gas law shown, and no other.",
      })
    ),
    answerAt(["labels", "collisions"], ["labels", "pressure"])
  );
}

/**
 * The props of the heat labs covering heating curves, calorimetry, ice
 * melting, and thermal gas laws.
 */
export function heatVisuals<E>(rich: RichSlot<E>) {
  return {
    GasLawThermalLab: gasLawThermalLab(rich),
    GasPistonLab: gasPistonLab(rich),
    HeatingCurveLab: heatingCurveLab(rich),
    IceMeltingLab: iceMeltingLab(rich),
    SpecificHeatCalorimeterLab: specificHeatCalorimeterLab(rich),
  };
}
