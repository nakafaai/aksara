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

const ISOMER_COMPOUNDS = [
  "butane",
  "methylpropane",
  "but1ene",
  "but2ene",
] as const;

const ESTERS = ["ethylEthanoate", "propylEthanoate", "butylEthanoate"] as const;

const PETROLEUM_FRACTIONS = [
  "refineryGas",
  "petrol",
  "kerosene",
  "diesel",
  "bitumen",
] as const;

/**
 * Props of `AlkaneAlkeneIsomerLab`: a 3D ball-and-stick hydrocarbon explorer
 * comparing C4 structural isomers (butane, methylpropane, but-1-ene, but-2-ene)
 * and the bromine-water unsaturation test. Formula and bromine-test readouts
 * are optional answer state.
 */
function alkaneAlkeneIsomerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      compounds: Schema.NonEmptyArray(Schema.Literals(ISOMER_COMPOUNDS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        bromineTest: Schema.optionalKey(rich),
        compound: TextSchema,
        compounds: byPickedIds(
          ISOMER_COMPOUNDS,
          Schema.Struct({
            bromineTest: rich,
            formula: rich,
            name: TextSchema,
          })
        ),
        formula: Schema.optionalKey(rich),
        parts: byIds(
          [
            "carbonAtom",
            "hydrogenAtom",
            "singleBond",
            "doubleBond",
            "bromineDrop",
          ],
          TextSchema
        ),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ compounds, labels }) => namesEach(compounds, labels.compounds),
        {
          message:
            "Expected a name, formula, and bromine-test note for every hydrocarbon isomer shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "bromineTest"], ["labels", "formula"])
  );
}

/**
 * Props of `EsterificationRefluxLab`: a 3D reflux apparatus heating an alcohol
 * and carboxylic acid with concentrated sulfuric acid catalyst to synthesise
 * sweet-smelling esters. Aroma and reaction equation readouts are optional
 * answer state.
 */
function esterificationRefluxLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      esters: Schema.NonEmptyArray(Schema.Literals(ESTERS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        aroma: Schema.optionalKey(rich),
        equation: Schema.optionalKey(rich),
        ester: TextSchema,
        esters: byPickedIds(
          ESTERS,
          Schema.Struct({
            aroma: rich,
            equation: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          [
            "roundFlask",
            "condenser",
            "waterBath",
            "esterLayer",
            "catalystDrop",
          ],
          TextSchema
        ),
        temperature: TextSchema,
        view: TextSchema,
      }),
      temperature: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ esters, labels }) => namesEach(esters, labels.esters),
        {
          message:
            "Expected a name, aroma, and equation for every ester synthesis shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "aroma"], ["labels", "equation"])
  );
}

/**
 * Props of `FractionalDistillationLab`: a 3D crude-oil fractionating column
 * with vertical temperature gradient separating refinery gas, petrol,
 * kerosene, diesel, and bitumen by boiling point and carbon-chain length.
 * Boiling range and fuel-use readouts are optional answer state.
 */
function fractionalDistillationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fractions: Schema.NonEmptyArray(
        Schema.Literals(PETROLEUM_FRACTIONS)
      ).check(Schema.isUnique()),
      labels: Schema.Struct({
        boilingRange: Schema.optionalKey(rich),
        fraction: TextSchema,
        fractions: byPickedIds(
          PETROLEUM_FRACTIONS,
          Schema.Struct({
            boilingRange: rich,
            name: TextSchema,
            useNote: rich,
          })
        ),
        parts: byIds(
          ["furnace", "column", "bubbleCap", "vaporStream", "outletPipe"],
          TextSchema
        ),
        useNote: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ fractions, labels }) => namesEach(fractions, labels.fractions),
        {
          message:
            "Expected a name, boiling range, and use note for every petroleum fraction shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "boilingRange"], ["labels", "useNote"])
  );
}

/**
 * Organic carbon-compound labs covering alkane/alkene isomerism, reflux
 * esterification, and crude-oil fractional distillation.
 */
export function organicVisuals<E>(rich: RichSlot<E>) {
  return {
    AlkaneAlkeneIsomerLab: alkaneAlkeneIsomerLab(rich),
    EsterificationRefluxLab: esterificationRefluxLab(rich),
    FractionalDistillationLab: fractionalDistillationLab(rich),
  };
}
