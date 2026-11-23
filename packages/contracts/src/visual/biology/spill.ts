import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

const INCIDENTS = ["eye", "mercury", "culture", "glass", "fire"] as const;

/**
 * The stages of each response, in the order the scene plays them:
 * - `eye`: `alert` the teacher and reach the eyewash, hold the lids `open`,
 *   `rinse` for at least 15 minutes, get medical `help` with the chemical's name.
 * - `mercury`: `clear` the area, let in `air`, `gather` the beads with a card
 *   and dropper, cover the rest with `sulfur`, `seal` the waste in a labelled jar.
 * - `culture`: `alert` and keep people away, `cover` with paper towels, `soak`
 *   them in disinfectant for its contact time, `collect` into a biohazard bag.
 * - `glass`: `alert` and never pick it up by hand, `sweep` it up, put it in the `box`.
 * - `fire`: shut off the `gas`, `smother` with the fire blanket, `extinguish`
 *   with carbon dioxide and never water, `leave` and raise the alarm if it grows.
 */
function responseSteps<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    culture: Schema.optionalKey(
      Schema.Struct({ alert: rich, collect: rich, cover: rich, soak: rich })
    ),
    eye: Schema.optionalKey(
      Schema.Struct({ alert: rich, help: rich, open: rich, rinse: rich })
    ),
    fire: Schema.optionalKey(
      Schema.Struct({ extinguish: rich, gas: rich, leave: rich, smother: rich })
    ),
    glass: Schema.optionalKey(
      Schema.Struct({ alert: rich, box: rich, sweep: rich })
    ),
    mercury: Schema.optionalKey(
      Schema.Struct({
        air: rich,
        clear: rich,
        gather: rich,
        seal: rich,
        sulfur: rich,
      })
    ),
  });
}

/**
 * Props of `SpillResponseLab`: a lab bench where one of `incidents` has just
 * happened, each listed once in the order the toggle shows them. The learner
 * plays the response one stage at a time; the scene acts each stage out and
 * the readout gives its words from `labels.steps`, one ordered response for
 * each incident and no other.
 */
function spillResponseLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      incidents: Schema.NonEmptyArray(Schema.Literals(INCIDENTS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        incident: TextSchema,
        incidents: byPickedIds(INCIDENTS, TextSchema),
        step: rich,
        steps: responseSteps(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ incidents, labels }) =>
          namesEach(incidents, labels.incidents) &&
          namesEach(incidents, labels.steps),
        {
          message:
            "Expected a name and a response for every incident the lab shows, and for no other.",
        }
      )
    )
  );
}

/** The accident lab. Each response is taught step by step, so none is answer state. */
export function spillVisuals<E>(rich: RichSlot<E>) {
  return { SpillResponseLab: spillResponseLab(rich) };
}
