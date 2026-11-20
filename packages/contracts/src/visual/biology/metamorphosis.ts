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

/** A grasshopper grows by incomplete metamorphosis, a butterfly by complete metamorphosis. */
const INSECTS = ["grasshopper", "butterfly"] as const;

/**
 * Props of `MetamorphosisLab`: an insect growing on its food plant, picked
 * from `insects` (each once). The learner moves through time; the insect
 * moults and grows in steps, and the readouts give its stage, instar, number
 * of moults, length and mass.
 */
function metamorphosisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      insects: Schema.NonEmptyArray(Schema.Literals(INSECTS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        insect: TextSchema,
        insects: byPickedIds(INSECTS, TextSchema),
        instar: rich,
        length: rich,
        mass: rich,
        moults: rich,
        parts: byIds(
          ["exoskeleton", "exuvia", "wingBud", "wing", "headCapsule", "leaf"],
          TextSchema
        ),
        stage: rich,
        stages: byIds(["egg", "nymph", "larva", "pupa", "adult"], TextSchema),
        time: TextSchema,
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ insects, labels }) => namesEach(insects, labels.insects),
        { message: "Expected a name for every insect shown, and no other." }
      )
    )
  );
}

/** The metamorphosis lab. Every prop names what the learner explores; none is answer state. */
export function metamorphosisVisuals<E>(rich: RichSlot<E>) {
  return { MetamorphosisLab: metamorphosisLab(rich) };
}
