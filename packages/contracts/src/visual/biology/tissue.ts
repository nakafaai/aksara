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

const TISSUES = [
  "meristem",
  "epidermis",
  "parenchyma",
  "collenchyma",
  "sclerenchyma",
  "xylem",
  "phloem",
] as const;

const GROWTH_MODES = ["primary", "secondary"] as const;
const ORGANS = ["root", "shoot"] as const;
const PLANT_TYPES = ["annual", "biennial", "perennial"] as const;

/** Stem age range in whole years for secondary growth annual rings. */
const YearsSchema = Schema.Struct({
  max: Schema.Int.check(Schema.isLessThanOrEqualTo(10)),
  min: Schema.Int.check(Schema.isGreaterThanOrEqualTo(1)),
  value: Schema.Int,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a year range whose minimum is below its maximum, with the starting year between them.",
    }
  )
);

/**
 * Props of `PlantTissueAnatomyLab`: a 3D tissue block cutaway contrasting
 * meristematic tissue with permanent tissues (epidermis, parenchyma,
 * collenchyma, sclerenchyma, xylem, and phloem), showing cell wall thickness,
 * lignification, and living or dead status. Function and status readouts are
 * optional answer state.
 */
function plantTissueAnatomyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        function: Schema.optionalKey(rich),
        parts: byIds(
          [
            "wall",
            "lignin",
            "vacuole",
            "nucleus",
            "lumen",
            "sievePlate",
            "companion",
          ],
          TextSchema
        ),
        status: Schema.optionalKey(rich),
        statuses: byIds(["living", "dead"], TextSchema),
        tissue: TextSchema,
        tissues: byPickedIds(
          TISSUES,
          Schema.Struct({
            name: TextSchema,
            role: rich,
            wall: rich,
          })
        ),
        view: TextSchema,
        wall: rich,
      }),
      tissues: Schema.NonEmptyArray(Schema.Literals(TISSUES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, tissues }) => namesEach(tissues, labels.tissues),
        {
          message:
            "Expected a name, wall note, and role for every plant tissue shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "function"], ["labels", "status"])
  );
}

/**
 * Props of `RootShootGrowthZoneLab`: an interactive 3D root tip and shoot apex
 * showing primary growth zones (cell division, elongation, differentiation) and
 * secondary radial thickening driven by vascular and cork cambium with annual
 * rings. Zone activity and ring count readouts are optional answer state.
 */
function rootShootGrowthZoneLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        activity: Schema.optionalKey(rich),
        mode: TextSchema,
        modes: byPickedIds(GROWTH_MODES, TextSchema),
        organ: TextSchema,
        organs: byPickedIds(ORGANS, TextSchema),
        parts: byIds(
          [
            "rootCap",
            "apicalMeristem",
            "vacuole",
            "rootHair",
            "vascularCambium",
            "corkCambium",
            "secondaryXylem",
            "secondaryPhloem",
            "annualRing",
          ],
          TextSchema
        ),
        position: TextSchema,
        rings: Schema.optionalKey(rich),
        view: TextSchema,
        year: TextSchema,
        zone: rich,
        zones: byIds(
          ["division", "elongation", "differentiation"],
          Schema.Struct({
            activity: rich,
            name: TextSchema,
          })
        ),
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(GROWTH_MODES)).check(
        Schema.isUnique()
      ),
      organs: Schema.NonEmptyArray(Schema.Literals(ORGANS)).check(
        Schema.isUnique()
      ),
      years: YearsSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, modes, organs }) =>
          namesEach(modes, labels.modes) && namesEach(organs, labels.organs),
        {
          message:
            "Expected a name for every growth mode and plant organ shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "activity"], ["labels", "rings"])
  );
}

/**
 * Props of `PlantGrowthCurveLab`: a 3D specimen of an annual, biennial, or
 * perennial plant synchronized with its sigmoid dry-mass growth curve and
 * growth phase explorer. The active phase readout is optional answer state.
 */
function plantGrowthCurveLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        dryMass: rich,
        phase: Schema.optionalKey(rich),
        phases: byIds(
          ["lag", "exponential", "slowing", "stationary", "senescence"],
          Schema.Struct({
            detail: rich,
            name: TextSchema,
          })
        ),
        rate: rich,
        time: TextSchema,
        type: TextSchema,
        types: byPickedIds(PLANT_TYPES, TextSchema),
        view: TextSchema,
      }),
      types: Schema.NonEmptyArray(Schema.Literals(PLANT_TYPES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, types }) => namesEach(types, labels.types), {
        message:
          "Expected a name for every plant life-cycle type shown, and no other.",
      })
    ),
    answerAt(["labels", "phase"])
  );
}

/**
 * Plant tissue organisation and growth labs covering meristematic vs permanent
 * anatomy, primary and secondary growth zones, and sigmoid dry-mass curves.
 */
export function tissueVisuals<E>(rich: RichSlot<E>) {
  return {
    PlantGrowthCurveLab: plantGrowthCurveLab(rich),
    PlantTissueAnatomyLab: plantTissueAnatomyLab(rich),
    RootShootGrowthZoneLab: rootShootGrowthZoneLab(rich),
  };
}
