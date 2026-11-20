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

const SUGARS = ["maltose", "sucrose", "lactose"] as const;
const POLYSACCHARIDES = ["starch", "glycogen", "cellulose"] as const;

/**
 * How many monosaccharide units the chain has: a slider over whole numbers
 * from two, up to the longest chain the scene draws unit by unit.
 */
const UnitsSchema = Schema.Struct({
  max: Schema.Int.check(Schema.isLessThanOrEqualTo(24)),
  min: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  value: Schema.Int,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a unit range whose minimum is below its maximum, with the starting count between them.",
    }
  )
);

/**
 * Props of `GlycosidicBondLab`: monosaccharides joining by condensation and
 * splitting by hydrolysis. At the pair scale the learner builds one of
 * `sugars` (each once) from its two monosaccharides; at the chain scale one of
 * `polysaccharides` (each once) grows to `units` glucose units. The readouts
 * show the glycosidic bonds and the water molecules released or used only
 * when `labels.bonds` and `labels.water` name them, so a question that asks
 * for a count leaves its name out.
 */
function glycosidicBondLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        bond: TextSchema,
        bonds: Schema.optionalKey(rich),
        monomers: byIds(["glucose", "fructose", "galactose"], TextSchema),
        polysaccharide: TextSchema,
        polysaccharides: byPickedIds(POLYSACCHARIDES, TextSchema),
        reaction: TextSchema,
        reactions: byIds(["condensation", "hydrolysis"], TextSchema),
        scale: TextSchema,
        scales: byIds(["pair", "chain"], TextSchema),
        sugar: TextSchema,
        sugars: byPickedIds(SUGARS, TextSchema),
        units: TextSchema,
        view: TextSchema,
        water: Schema.optionalKey(rich),
      }),
      polysaccharides: Schema.NonEmptyArray(
        Schema.Literals(POLYSACCHARIDES)
      ).check(Schema.isUnique()),
      sugars: Schema.NonEmptyArray(Schema.Literals(SUGARS)).check(
        Schema.isUnique()
      ),
      units: UnitsSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, polysaccharides, sugars }) =>
          namesEach(sugars, labels.sugars) &&
          namesEach(polysaccharides, labels.polysaccharides),
        {
          message:
            "Expected a name for every sugar and polysaccharide the lab shows, and no other.",
        }
      )
    ),
    answerAt(["labels", "bonds"], ["labels", "water"])
  );
}

/**
 * The sugar lab. How many bonds a chain has and how much water it releases
 * are what a question asks for, so their readouts are answer state.
 */
export function sugarVisuals<E>(rich: RichSlot<E>) {
  return { GlycosidicBondLab: glycosidicBondLab(rich) };
}
