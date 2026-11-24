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

const POLLINATION_TYPES = ["insect", "wind"] as const;
const FRUIT_TYPES = ["simple", "aggregate", "multiple"] as const;

/**
 * Props of `FlowerAnatomyLab`: a 3D cutaway complete flower comparing
 * insect-pollinated and wind-pollinated adaptations across sepal, petal,
 * anther, filament, stigma, style, ovary, and ovule. Pollinator match and
 * pollen-trait readouts are optional answer state.
 */
function flowerAnatomyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        adaptation: Schema.optionalKey(rich),
        mode: TextSchema,
        modes: byPickedIds(
          POLLINATION_TYPES,
          Schema.Struct({
            adaptation: rich,
            name: TextSchema,
            pollen: rich,
          })
        ),
        parts: byIds(
          [
            "sepal",
            "petal",
            "anther",
            "filament",
            "stigma",
            "style",
            "ovary",
            "ovule",
          ],
          TextSchema
        ),
        pollen: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(POLLINATION_TYPES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, modes }) => namesEach(modes, labels.modes), {
        message:
          "Expected a name, pollen, and adaptation note for every pollination mode shown, and no other.",
      })
    ),
    answerAt(["labels", "adaptation"], ["labels", "pollen"])
  );
}

/**
 * Props of `FruitSeedDispersalLab`: a 3D post-fertilisation cutaway showing
 * how ovules become seeds (testa, cotyledon, embryo) while ovary walls form
 * simple, aggregate, or multiple fruits. Origin and seed structure readouts
 * are optional answer state.
 */
function fruitSeedDispersalLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fruits: Schema.NonEmptyArray(Schema.Literals(FRUIT_TYPES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        fruit: TextSchema,
        fruits: byPickedIds(
          FRUIT_TYPES,
          Schema.Struct({
            name: TextSchema,
            origin: rich,
            structure: rich,
          })
        ),
        origin: Schema.optionalKey(rich),
        parts: byIds(
          ["pericarp", "testa", "cotyledon", "embryo", "endosperm"],
          TextSchema
        ),
        structure: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ fruits, labels }) => namesEach(fruits, labels.fruits),
        {
          message:
            "Expected a name, origin, and structure note for every fruit type shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "origin"], ["labels", "structure"])
  );
}

/**
 * Flowering-plant reproduction labs covering flower anatomy and pollination
 * contrast plus post-fertilisation seed and fruit development.
 */
export function flowerVisuals<E>(rich: RichSlot<E>) {
  return {
    FlowerAnatomyLab: flowerAnatomyLab(rich),
    FruitSeedDispersalLab: fruitSeedDispersalLab(rich),
  };
}
