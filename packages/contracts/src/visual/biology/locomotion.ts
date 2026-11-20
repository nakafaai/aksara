import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * The animals the lab can show, one per way of moving: an earthworm with a
 * hydrostatic skeleton crawling through soil, a fish swimming with its
 * myotomes, a grasshopper jumping with an exoskeleton, and a bird flying.
 */
const ANIMALS = ["earthworm", "fish", "grasshopper", "bird"] as const;

/**
 * Props of `AnimalLocomotionLab`: one of `animals` at a time (each once, in
 * the order the toggle lists them) moving through its medium. The learner
 * plays the movement; the readouts give the kind of skeleton, what the body
 * pushes against and the muscle contracting at that moment, words from
 * `labels.animals` (one entry for each animal shown and no other) and
 * `labels.muscles`. The scene labels the parts that matter for each animal.
 */
function animalLocomotionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      animals: Schema.NonEmptyArray(Schema.Literals(ANIMALS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        against: rich,
        animal: TextSchema,
        animals: byPickedIds(
          ANIMALS,
          Schema.Struct({ against: rich, name: TextSchema, skeleton: rich })
        ),
        contracting: rich,
        muscles: byIds(
          [
            "circular",
            "longitudinal",
            "left",
            "right",
            "extensor",
            "flexor",
            "pectoralis",
            "supracoracoideus",
          ],
          TextSchema
        ),
        parts: byIds(
          ["chaetae", "fluid", "myotome", "fin", "femur", "tibia", "keel"],
          TextSchema
        ),
        skeleton: rich,
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ animals, labels }) => namesEach(animals, labels.animals),
        {
          message:
            "Expected words for every animal the lab shows, and no other.",
        }
      )
    )
  );
}

/** The locomotion lab. Every prop names what the learner explores; none is answer state. */
export function locomotionVisuals<E>(rich: RichSlot<E>) {
  return { AnimalLocomotionLab: animalLocomotionLab(rich) };
}
