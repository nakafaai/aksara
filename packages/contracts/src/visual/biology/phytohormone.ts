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

const HORMONES = [
  "auxin",
  "gibberellin",
  "cytokinin",
  "abscisicAcid",
  "ethylene",
] as const;

/**
 * Props of `AuxinAgarBendLab`: a 3D decapitated coleoptile shoot carrying an
 * off-centre auxin-infused agar block whose auxin concentration slider varies
 * cell elongation across the two sides and bends the shoot in the dark.
 * Bending angle and elongation readout are optional answer state.
 */
function auxinAgarBendLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      auxinLevel: SliderSchema,
      labels: Schema.Struct({
        angle: Schema.optionalKey(rich),
        auxinLevel: TextSchema,
        elongation: Schema.optionalKey(rich),
        parts: byIds(
          ["agarBlock", "coleoptile", "shadedSide", "litSide", "auxinDot"],
          TextSchema
        ),
        view: TextSchema,
      }),
    }),
    answerAt(["labels", "angle"], ["labels", "elongation"])
  );
}

/**
 * Props of `PhytohormoneActionLab`: a 3D whole-plant model showing how the
 * five major phytohormones (auxin, gibberellin, cytokinin, abscisic acid,
 * ethylene) regulate stem elongation, fruit ripening, bud growth, and stress
 * dormancy, alongside farming applications. Natural effect and farming use
 * readouts are optional answer state.
 */
function phytohormoneActionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      hormones: Schema.NonEmptyArray(Schema.Literals(HORMONES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        effect: Schema.optionalKey(rich),
        farmUse: Schema.optionalKey(rich),
        hormone: TextSchema,
        hormones: byPickedIds(
          HORMONES,
          Schema.Struct({
            effect: rich,
            farmUse: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          ["shootTip", "lateralBud", "stemNode", "leaf", "fruit"],
          TextSchema
        ),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ hormones, labels }) => namesEach(hormones, labels.hormones),
        {
          message:
            "Expected a name, effect, and farm-use note for every phytohormone shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "effect"], ["labels", "farmUse"])
  );
}

/**
 * Plant response and phytohormone labs covering asymmetric auxin agar-block
 * bending and the five core phytohormones in plant development and farming.
 */
export function phytohormoneVisuals<E>(rich: RichSlot<E>) {
  return {
    AuxinAgarBendLab: auxinAgarBendLab(rich),
    PhytohormoneActionLab: phytohormoneActionLab(rich),
  };
}
