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

const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const MICELLE_STAGES = [
  "greaseOnFabric",
  "tailInsertion",
  "micelleLift",
  "rinseAway",
] as const;

const WATER_TYPES = ["soft", "hard"] as const;

const SAPONIFICATION_STEPS = [
  "hydrolysis",
  "saltingOut",
  "filtration",
  "molding",
] as const;

/**
 * Props of `SoapMicelleEmulsionLab`: a 3D fabric surface and oil droplet
 * showing hydrophobic soap tails anchoring into grease, hydrophilic heads
 * facing water to lift an emulsified micelle, and hard-water scum formation.
 * Cleaning mechanism and water-type outcome readouts are optional answer state.
 */
function soapMicelleEmulsionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        mechanism: Schema.optionalKey(rich),
        outcome: Schema.optionalKey(rich),
        parts: byIds(
          [
            "fabric",
            "greaseDrop",
            "hydrophilicHead",
            "hydrophobicTail",
            "waterFlow",
          ],
          TextSchema
        ),
        stage: TextSchema,
        stages: byPickedIds(
          MICELLE_STAGES,
          Schema.Struct({
            mechanism: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
        waterType: TextSchema,
        waterTypes: byPickedIds(
          WATER_TYPES,
          Schema.Struct({
            name: TextSchema,
            outcome: rich,
          })
        ),
      }),
      stages: Schema.NonEmptyArray(Schema.Literals(MICELLE_STAGES)).check(
        Schema.isUnique()
      ),
      waterTypes: Schema.NonEmptyArray(Schema.Literals(WATER_TYPES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, stages, waterTypes }) =>
          namesEach(stages, labels.stages) &&
          namesEach(waterTypes, labels.waterTypes),
        {
          message:
            "Expected a name and note for every micelle cleaning stage and water type shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "mechanism"], ["labels", "outcome"])
  );
}

/**
 * Props of `HaberAmmoniaConverterLab`: a 3D industrial Haber-Bosch converter
 * loop with gas compressor, iron catalyst trays, condenser, and recycle pipe
 * showing the temperature-pressure compromise between equilibrium yield and
 * reaction rate. Yield and rate readouts are optional answer state.
 */
function haberAmmoniaConverterLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        equilibriumYield: Schema.optionalKey(rich),
        parts: byIds(
          [
            "compressor",
            "ironCatalystBed",
            "coolingCondenser",
            "liquidAmmonia",
            "recyclePipe",
          ],
          TextSchema
        ),
        pressure: TextSchema,
        rateNote: Schema.optionalKey(rich),
        temperature: TextSchema,
        view: TextSchema,
      }),
      pressure: PositiveSliderSchema,
      temperature: PositiveSliderSchema,
    }),
    answerAt(["labels", "equilibriumYield"], ["labels", "rateNote"])
  );
}

/**
 * Props of `SaponificationKettleLab`: a 3D industrial soap-boiling kettle
 * illustrating alkaline hydrolysis of vegetable oil with NaOH, salting out
 * with NaCl brine, filtration, and bar molding. Chemical change and stage
 * purpose readouts are optional answer state.
 */
function saponificationKettleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chemicalChange: Schema.optionalKey(rich),
        parts: byIds(
          ["kettle", "triglyceride", "alkaliStream", "saltLayer", "soapCurd"],
          TextSchema
        ),
        purpose: Schema.optionalKey(rich),
        step: TextSchema,
        steps: byPickedIds(
          SAPONIFICATION_STEPS,
          Schema.Struct({
            chemicalChange: rich,
            name: TextSchema,
            purpose: rich,
          })
        ),
        view: TextSchema,
      }),
      steps: Schema.NonEmptyArray(Schema.Literals(SAPONIFICATION_STEPS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, steps }) => namesEach(steps, labels.steps), {
        message:
          "Expected a name, chemical change, and purpose note for every saponification step shown, and no other.",
      })
    ),
    answerAt(["labels", "chemicalChange"], ["labels", "purpose"])
  );
}

/**
 * Consumer and industrial chemistry labs covering soap micelle emulsification,
 * the Haber-Bosch ammonia converter, and kettle saponification.
 */
export function industryVisuals<E>(rich: RichSlot<E>) {
  return {
    HaberAmmoniaConverterLab: haberAmmoniaConverterLab(rich),
    SaponificationKettleLab: saponificationKettleLab(rich),
    SoapMicelleEmulsionLab: soapMicelleEmulsionLab(rich),
  };
}
