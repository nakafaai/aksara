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

const HALOGEN_PAIRS = [
  "cl2WithKbr",
  "cl2WithKi",
  "br2WithKi",
  "i2WithKcl",
] as const;

const PERIOD_THREE_OXIDES = [
  "na2o",
  "mgo",
  "al2o3",
  "sio2",
  "p4o10",
  "so2",
] as const;

/**
 * Props of `HalogenDisplacementLab`: a 3D test-tube rack with aqueous and
 * organic cyclohexane layers demonstrating Group 17 reactivity order as
 * chlorine, bromine, and iodine react with halide solutions. Observation and
 * redox outcome readouts are optional answer state.
 */
function halogenDisplacementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        observation: Schema.optionalKey(rich),
        pair: TextSchema,
        pairs: byPickedIds(
          HALOGEN_PAIRS,
          Schema.Struct({
            name: TextSchema,
            observation: rich,
            redoxOutcome: rich,
          })
        ),
        parts: byIds(
          [
            "testTube",
            "aqueousLayer",
            "organicLayer",
            "halogenDrop",
            "halideIon",
          ],
          TextSchema
        ),
        redoxOutcome: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      pairs: Schema.NonEmptyArray(Schema.Literals(HALOGEN_PAIRS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, pairs }) => namesEach(pairs, labels.pairs), {
        message:
          "Expected a name, observation, and redox outcome for every halogen displacement pair shown, and no other.",
      })
    ),
    answerAt(["labels", "observation"], ["labels", "redoxOutcome"])
  );
}

/**
 * Props of `PeriodThreeOxideLab`: a 3D bench comparing Period 3 oxides from
 * basic ionic Na2O and MgO through amphoteric Al2O3 to giant covalent SiO2 and
 * acidic covalent P4O10 and SO2. Acid-base nature and bonding readouts are
 * optional answer state.
 */
function periodThreeOxideLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        acidBaseNature: Schema.optionalKey(rich),
        bonding: Schema.optionalKey(rich),
        oxide: TextSchema,
        oxides: byPickedIds(
          PERIOD_THREE_OXIDES,
          Schema.Struct({
            acidBaseNature: rich,
            bonding: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          ["oxideSample", "waterBeaker", "phMeter", "latticeModel"],
          TextSchema
        ),
        view: TextSchema,
      }),
      oxides: Schema.NonEmptyArray(Schema.Literals(PERIOD_THREE_OXIDES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, oxides }) => namesEach(oxides, labels.oxides),
        {
          message:
            "Expected a name, acid-base nature, and bonding note for every Period 3 oxide shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "acidBaseNature"], ["labels", "bonding"])
  );
}

/**
 * Periodic group and period trend labs covering Group 17 halogen displacement
 * and Period 3 oxide acid-base and bonding transitions.
 */
export function groupVisuals<E>(rich: RichSlot<E>) {
  return {
    HalogenDisplacementLab: halogenDisplacementLab(rich),
    PeriodThreeOxideLab: periodThreeOxideLab(rich),
  };
}
