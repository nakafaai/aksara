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

const NonNegativeSliderSchema = Schema.Struct({
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

const ADDITION_MONOMERS = [
  "ethene",
  "propene",
  "chloroethene",
  "tetrafluoroethene",
] as const;

const CONDENSATION_POLYMERS = ["nylon66", "terylene"] as const;

const RUBBER_STATES = ["naturalLatex", "vulcanisedRubber"] as const;

/**
 * Props of `AdditionPolymerChainLab`: a 3D chain-growth visual showing alkene
 * monomers opening their C=C double bonds to link end-to-end into polyethene,
 * polypropene, PVC, or PTFE with adjustable repeating-unit count. Polymer name
 * and repeat-unit readouts are optional answer state.
 */
function additionPolymerChainLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      chainLength: PositiveSliderSchema,
      labels: Schema.Struct({
        chainLength: TextSchema,
        monomer: TextSchema,
        monomers: byPickedIds(
          ADDITION_MONOMERS,
          Schema.Struct({
            name: TextSchema,
            polymerName: rich,
            repeatUnit: rich,
          })
        ),
        parts: byIds(
          ["monomerUnit", "doubleBond", "singleBackbone", "sideGroup"],
          TextSchema
        ),
        polymerName: Schema.optionalKey(rich),
        repeatUnit: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      monomers: Schema.NonEmptyArray(Schema.Literals(ADDITION_MONOMERS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, monomers }) => namesEach(monomers, labels.monomers),
        {
          message:
            "Expected a name, polymer name, and repeat unit for every addition monomer shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "polymerName"], ["labels", "repeatUnit"])
  );
}

/**
 * Props of `CondensationNylonLab`: a 3D step-growth polymerisation model
 * joining two bifunctional monomers into alternating polyamide (nylon-6,6) or
 * polyester (terylene) chains while eliminating small water molecules.
 * Byproduct and linkage readouts are optional answer state.
 */
function condensationNylonLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        byproduct: Schema.optionalKey(rich),
        linkage: Schema.optionalKey(rich),
        parts: byIds(
          [
            "monomerA",
            "monomerB",
            "esterOrAmideLink",
            "waterByproduct",
            "polymerChain",
          ],
          TextSchema
        ),
        polymer: TextSchema,
        polymers: byPickedIds(
          CONDENSATION_POLYMERS,
          Schema.Struct({
            byproduct: rich,
            linkage: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      polymers: Schema.NonEmptyArray(
        Schema.Literals(CONDENSATION_POLYMERS)
      ).check(Schema.isUnique()),
    }).check(
      Schema.makeFilter(
        ({ labels, polymers }) => namesEach(polymers, labels.polymers),
        {
          message:
            "Expected a name, linkage, and byproduct note for every condensation polymer shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "byproduct"], ["labels", "linkage"])
  );
}

/**
 * Props of `RubberVulcanizationLab`: a 3D polyisoprene chain bundle comparing
 * uncrosslinked natural latex that slips permanently under stretch against
 * sulfur-crosslinked vulcanised rubber that snaps back elastically. Elasticity
 * and heat-resistance readouts are optional answer state.
 */
function rubberVulcanizationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        elasticityNote: Schema.optionalKey(rich),
        heatNote: Schema.optionalKey(rich),
        parts: byIds(
          ["isopreneChain", "sulfurCrosslink", "doubleBond", "tensionArrow"],
          TextSchema
        ),
        state: TextSchema,
        states: byPickedIds(
          RUBBER_STATES,
          Schema.Struct({
            elasticityNote: rich,
            heatNote: rich,
            name: TextSchema,
          })
        ),
        stretch: TextSchema,
        view: TextSchema,
      }),
      states: Schema.NonEmptyArray(Schema.Literals(RUBBER_STATES)).check(
        Schema.isUnique()
      ),
      stretch: NonNegativeSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, states }) => namesEach(states, labels.states),
        {
          message:
            "Expected a name, elasticity note, and heat note for every rubber state shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "elasticityNote"], ["labels", "heatNote"])
  );
}

/**
 * Polymer chemistry labs covering addition chain growth, condensation
 * polyamide/polyester synthesis, and sulfur vulcanisation of rubber.
 */
export function polymerVisuals<E>(rich: RichSlot<E>) {
  return {
    AdditionPolymerChainLab: additionPolymerChainLab(rich),
    CondensationNylonLab: condensationNylonLab(rich),
    RubberVulcanizationLab: rubberVulcanizationLab(rich),
  };
}
