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

const PH_SAMPLES = [
  "hydrochloricAcid",
  "vinegar",
  "pureWater",
  "bakingSoda",
  "sodiumHydroxide",
] as const;

const INDICATORS = [
  "universal",
  "litmus",
  "phenolphthalein",
  "methylOrange",
] as const;

const GALVANIC_CELLS = ["daniell", "copperSilver", "magnesiumCopper"] as const;

/**
 * Props of `PhIndicatorScaleLab`: a 3D pH testing bench comparing strong and
 * weak acids, neutral water, and alkalis against universal indicator, litmus,
 * phenolphthalein, and methyl orange. Classification and pH value readouts are
 * optional answer state.
 */
function phIndicatorScaleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      indicators: Schema.NonEmptyArray(Schema.Literals(INDICATORS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        classification: Schema.optionalKey(rich),
        indicator: TextSchema,
        indicators: byPickedIds(INDICATORS, TextSchema),
        parts: byIds(
          ["beaker", "solution", "dropper", "phStrip", "ionCloud"],
          TextSchema
        ),
        phValue: Schema.optionalKey(rich),
        sample: TextSchema,
        samples: byPickedIds(
          PH_SAMPLES,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      samples: Schema.NonEmptyArray(Schema.Literals(PH_SAMPLES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ indicators, labels, samples }) =>
          namesEach(samples, labels.samples) &&
          namesEach(indicators, labels.indicators),
        {
          message:
            "Expected a name and formula for every pH sample and a name for every indicator shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "classification"], ["labels", "phValue"])
  );
}

/**
 * Props of `SaltBridgeIonFlowLab`: a 3D galvanic cell with two half-cell
 * beakers, a salt bridge balancing cation and anion migration, an external
 * electron wire, and a voltmeter. Cell EMF and overall redox equation readouts
 * are optional answer state.
 */
function saltBridgeIonFlowLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cells: Schema.NonEmptyArray(Schema.Literals(GALVANIC_CELLS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        cell: TextSchema,
        cells: byPickedIds(
          GALVANIC_CELLS,
          Schema.Struct({
            emf: rich,
            name: TextSchema,
            redoxEquation: rich,
          })
        ),
        emf: Schema.optionalKey(rich),
        parts: byIds(
          [
            "anode",
            "cathode",
            "saltBridge",
            "voltmeter",
            "electronWire",
            "electrolyte",
          ],
          TextSchema
        ),
        redoxEquation: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(({ cells, labels }) => namesEach(cells, labels.cells), {
        message:
          "Expected a name, EMF, and redox equation for every galvanic cell shown, and no other.",
      })
    ),
    answerAt(["labels", "emf"], ["labels", "redoxEquation"])
  );
}

/**
 * Aqueous solution chemistry labs covering pH indicator scales and salt-bridge
 * ion migration in galvanic cells.
 */
export function solutionVisuals<E>(rich: RichSlot<E>) {
  return {
    PhIndicatorScaleLab: phIndicatorScaleLab(rich),
    SaltBridgeIonFlowLab: saltBridgeIonFlowLab(rich),
  };
}
