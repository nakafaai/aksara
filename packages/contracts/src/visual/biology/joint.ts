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
 * The joints the lab can show, from the least to the most movable: a skull
 * suture, the cartilage joint between two vertebrae, a hinge joint (the elbow)
 * and a ball-and-socket joint (the shoulder).
 */
const JOINTS = ["suture", "disc", "hinge", "ballSocket"] as const;

/**
 * Props of `JointMovementLab`: one human joint at a time, picked from
 * `joints` (each once, in the order the toggle lists them). The learner moves
 * the bone with a slider labelled `labels.move` as far as the joint allows;
 * the readouts give an example of the joint and how it moves, words from
 * `labels.joints`, one entry for each joint shown and no other. The scene
 * labels the bone, cartilage, synovial membrane and fluid, ligament, tendon
 * and muscle.
 */
function jointMovementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      joints: Schema.NonEmptyArray(Schema.Literals(JOINTS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        example: rich,
        joint: TextSchema,
        joints: byPickedIds(
          JOINTS,
          Schema.Struct({ example: rich, movement: rich, name: TextSchema })
        ),
        move: TextSchema,
        movement: rich,
        parts: byIds(
          [
            "bone",
            "cartilage",
            "membrane",
            "fluid",
            "ligament",
            "tendon",
            "muscle",
          ],
          TextSchema
        ),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ joints, labels }) => namesEach(joints, labels.joints),
        {
          message:
            "Expected words for every joint the lab shows, and no other.",
        }
      )
    )
  );
}

/** The joint lab. Every prop names what the learner explores; none is answer state. */
export function jointVisuals<E>(rich: RichSlot<E>) {
  return { JointMovementLab: jointMovementLab(rich) };
}
