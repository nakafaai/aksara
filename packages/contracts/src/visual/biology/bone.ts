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
 * The conditions of the skeleton the lab can show: osteoporosis,
 * osteomalacia, rickets, arthritis and scoliosis. Where each one shows on the
 * skeleton is a fact the renderer knows.
 */
const CONDITIONS = [
  "osteoporosis",
  "osteomalacia",
  "rickets",
  "arthritis",
  "scoliosis",
] as const;

/**
 * Props of `BoneHealthLab`: a human skeleton with a lens over the part one of
 * `conditions` affects (each once, in the order the toggle lists them). The
 * learner switches between the healthy and the affected state; the readouts
 * give what changes and who is most at risk, words from `labels.conditions`,
 * one entry for each condition shown and no other. The lens labels spongy
 * bone, bone mineral, joint cartilage, the synovial membrane, the spine and a
 * growth plate.
 */
function boneHealthLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      conditions: Schema.NonEmptyArray(Schema.Literals(CONDITIONS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        change: rich,
        condition: TextSchema,
        conditions: byPickedIds(
          CONDITIONS,
          Schema.Struct({ change: rich, name: TextSchema, who: rich })
        ),
        parts: byIds(
          ["spongy", "mineral", "cartilage", "membrane", "spine", "growth"],
          TextSchema
        ),
        state: TextSchema,
        states: byIds(["healthy", "affected"], TextSchema),
        view: TextSchema,
        who: rich,
      }),
    }).check(
      Schema.makeFilter(
        ({ conditions, labels }) => namesEach(conditions, labels.conditions),
        {
          message:
            "Expected words for every condition the lab shows, and no other.",
        }
      )
    )
  );
}

/** The bone health lab. Every prop names what the learner explores; none is answer state. */
export function boneVisuals<E>(rich: RichSlot<E>) {
  return { BoneHealthLab: boneHealthLab(rich) };
}
