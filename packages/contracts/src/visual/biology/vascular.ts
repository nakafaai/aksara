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
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

const SliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: NonNegativeSchema,
  value: NonNegativeSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const LIFT_FORCES = ["rootPressure", "capillary", "transpirationPull"] as const;
const RING_MODES = ["intact", "ringed"] as const;
const REMEDIATION_PLANTS = ["mustard", "hyacinth", "vetiver"] as const;

/**
 * Props of `XylemCohesionLab`: a 3D hollow lignified xylem vessel column
 * comparing root pressure, capillary adhesion-cohesion, and transpiration
 * pull against tree height. Dominant force and reach readouts are optional
 * answer state.
 */
function xylemCohesionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      forces: Schema.NonEmptyArray(Schema.Literals(LIFT_FORCES)).check(
        Schema.isUnique()
      ),
      height: SliderSchema,
      labels: Schema.Struct({
        force: TextSchema,
        forces: byPickedIds(
          LIFT_FORCES,
          Schema.Struct({
            mechanism: rich,
            name: TextSchema,
          })
        ),
        height: TextSchema,
        mechanism: Schema.optionalKey(rich),
        parts: byIds(
          ["ligninWall", "waterColumn", "cohesionBond", "stoma", "rootCell"],
          TextSchema
        ),
        pressureNeeded: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ forces, labels }) => namesEach(forces, labels.forces),
        {
          message:
            "Expected a name and mechanism note for every water-lifting force shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "mechanism"], ["labels", "pressureNeeded"])
  );
}

/**
 * Props of `PhloemTranslocationLab`: a 3D sieve-tube and companion-cell
 * column showing ATP sucrose loading at the leaf source, osmotic pressure
 * flow toward the root sink, and bark ringing accumulation above the ring.
 * Pressure gradient and bark outcome readouts are optional answer state.
 */
function phloemTranslocationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        barkState: Schema.optionalKey(rich),
        mode: TextSchema,
        modes: byPickedIds(
          RING_MODES,
          Schema.Struct({
            name: TextSchema,
            outcome: rich,
          })
        ),
        parts: byIds(
          ["sieveTube", "sievePlate", "companionCell", "xylem", "sucrose"],
          TextSchema
        ),
        pressureDiff: Schema.optionalKey(rich),
        sourceSucrose: TextSchema,
        view: TextSchema,
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(RING_MODES)).check(
        Schema.isUnique()
      ),
      sourceSucrose: SliderSchema,
    }).check(
      Schema.makeFilter(({ labels, modes }) => namesEach(modes, labels.modes), {
        message:
          "Expected a name and outcome note for every phloem stem mode shown, and no other.",
      })
    ),
    answerAt(["labels", "barkState"], ["labels", "pressureDiff"])
  );
}

/**
 * Props of `PhytoremediationLab`: a 3D polluted soil or water bed where
 * hyperaccumulator roots absorb heavy-metal ions into harvestable shoots
 * across repeated harvest cycles. Remaining pollutant and target medium
 * readouts are optional answer state.
 */
function phytoremediationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      harvests: SliderSchema,
      labels: Schema.Struct({
        harvests: TextSchema,
        medium: Schema.optionalKey(rich),
        parts: byIds(
          ["shoot", "rootZone", "metalIon", "soilBed", "waterChannel"],
          TextSchema
        ),
        plant: TextSchema,
        plants: byPickedIds(
          REMEDIATION_PLANTS,
          Schema.Struct({
            medium: rich,
            name: TextSchema,
          })
        ),
        remaining: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      plants: Schema.NonEmptyArray(Schema.Literals(REMEDIATION_PLANTS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, plants }) => namesEach(plants, labels.plants),
        {
          message:
            "Expected a name and medium note for every phytoremediation plant shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "medium"], ["labels", "remaining"])
  );
}

/**
 * Vascular plant transport labs covering xylem water lift, phloem pressure
 * flow and ringing, and heavy-metal phytoremediation.
 */
export function vascularVisuals<E>(rich: RichSlot<E>) {
  return {
    PhloemTranslocationLab: phloemTranslocationLab(rich),
    PhytoremediationLab: phytoremediationLab(rich),
    XylemCohesionLab: xylemCohesionLab(rich),
  };
}
