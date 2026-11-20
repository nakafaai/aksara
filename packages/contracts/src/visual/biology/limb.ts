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

const LIMBS = ["arm", "leg"] as const;

/**
 * Props of `MusclePairLab`: antagonistic muscles in a human arm, a human leg,
 * or both (`limbs`, each once, in the order the toggle lists them). In the arm
 * the learner sets the elbow angle (`labels.angle`) and the biceps and triceps
 * take turns; in the leg the learner picks a movement of the knee or ankle
 * (`labels.movements`) and the quadriceps, hamstrings, gastrocnemius and
 * tibialis anterior take turns. The readouts name the muscle that contracts and
 * the one that relaxes; the scene labels the bones and a tendon.
 */
function musclePairLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        angle: TextSchema,
        contracting: rich,
        limb: TextSchema,
        limbs: byPickedIds(LIMBS, TextSchema),
        movement: TextSchema,
        movements: byIds(["heel", "toes", "bend", "straighten"], TextSchema),
        muscles: byIds(
          [
            "biceps",
            "triceps",
            "quadriceps",
            "hamstrings",
            "gastrocnemius",
            "tibialis",
          ],
          TextSchema
        ),
        parts: byIds(
          ["humerus", "radius", "ulna", "femur", "tibia", "tendon"],
          TextSchema
        ),
        relaxing: rich,
        view: TextSchema,
      }),
      limbs: Schema.NonEmptyArray(Schema.Literals(LIMBS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, limbs }) => namesEach(limbs, labels.limbs), {
        message: "Expected a name for every limb the lab shows, and no other.",
      })
    )
  );
}

/** The muscle pair lab. Which muscle contracts is shown as the learner moves; no prop is answer state. */
export function limbVisuals<E>(rich: RichSlot<E>) {
  return { MusclePairLab: musclePairLab(rich) };
}
