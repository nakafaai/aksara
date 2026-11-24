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

const SOLUTIONS = [
  "complete",
  "noNitrogen",
  "noPhosphorus",
  "noPotassium",
  "noMagnesium",
] as const;

const SPECIAL_MODES = ["carnivorous", "parasitic", "epiphytic"] as const;

/**
 * Props of `MineralDeficiencyLab`: a 3D seedling grown in Knop's culture
 * solution contrasting complete nutrients against single-element omissions
 * (nitrogen, phosphorus, potassium, magnesium), showing leaf colour, root
 * length, and stem vigour. Symptom and missing-role readouts are optional
 * answer state.
 */
function mineralDeficiencyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        parts: byIds(
          ["leaf", "stem", "root", "solution", "airTube"],
          TextSchema
        ),
        role: Schema.optionalKey(rich),
        solution: TextSchema,
        solutions: byPickedIds(
          SOLUTIONS,
          Schema.Struct({
            name: TextSchema,
            role: rich,
            symptom: rich,
          })
        ),
        symptom: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      solutions: Schema.NonEmptyArray(Schema.Literals(SOLUTIONS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, solutions }) => namesEach(solutions, labels.solutions),
        {
          message:
            "Expected a name, role, and symptom note for every culture solution shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "role"], ["labels", "symptom"])
  );
}

/**
 * Props of `RootHairUptakeLab`: a 3D cross-section of a young dicot root
 * showing epidermal root hair extensions, soil concentration slider, osmotic
 * water entry across cortex and endodermis, and ATP-assisted mineral ion
 * uptake into the xylem. Water direction and uptake mode readouts are
 * optional answer state.
 */
function rootHairUptakeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        directions: byIds(["intoRoot", "balanced", "outOfRoot"], TextSchema),
        ionUptake: Schema.optionalKey(rich),
        parts: byIds(
          [
            "rootHair",
            "epidermis",
            "cortex",
            "endodermis",
            "xylem",
            "soilWater",
          ],
          TextSchema
        ),
        soilConcentration: TextSchema,
        view: TextSchema,
        waterDirection: Schema.optionalKey(rich),
      }),
      soilConcentration: SliderSchema,
    }),
    answerAt(["labels", "ionUptake"], ["labels", "waterDirection"])
  );
}

/**
 * Props of `CarnivorousPlantLab`: a 3D gallery of special plant nutrition
 * strategies (carnivorous pitcher or flytrap, parasitic dodder, epiphytic
 * orchid) comparing how each obtains organic food, water, and mineral ions.
 * Nutrient source and adaptation readouts are optional answer state.
 */
function carnivorousPlantLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        adaptation: Schema.optionalKey(rich),
        mode: TextSchema,
        modes: byPickedIds(
          SPECIAL_MODES,
          Schema.Struct({
            adaptation: rich,
            name: TextSchema,
            source: rich,
          })
        ),
        parts: byIds(
          ["trapLeaf", "haustorium", "aerialRoot", "hostStem", "insect"],
          TextSchema
        ),
        source: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(SPECIAL_MODES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, modes }) => namesEach(modes, labels.modes), {
        message:
          "Expected a name, source, and adaptation note for every special nutrition mode shown, and no other.",
      })
    ),
    answerAt(["labels", "adaptation"], ["labels", "source"])
  );
}

/**
 * Plant nutrition labs covering mineral deficiency culture trials, root-hair
 * water and ion uptake, and carnivorous, parasitic, and epiphytic nutrition.
 */
export function nutritionVisuals<E>(rich: RichSlot<E>) {
  return {
    CarnivorousPlantLab: carnivorousPlantLab(rich),
    MineralDeficiencyLab: mineralDeficiencyLab(rich),
    RootHairUptakeLab: rootHairUptakeLab(rich),
  };
}
