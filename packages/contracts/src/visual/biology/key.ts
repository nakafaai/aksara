import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Small animals a school key sorts, each with the features the couplets ask about. */
const ANIMALS = [
  "ant",
  "dragonfly",
  "spider",
  "centipede",
  "earthworm",
  "snail",
] as const;

/**
 * Couplets a learner can use to build a key: good ones ask about a feature
 * that is plainly there or not (legs, pairs of legs, wings, segments, shell);
 * poor ones ask about size, colour or two features that overlap.
 */
const COUPLETS = [
  "legs",
  "pairs",
  "wings",
  "segments",
  "shell",
  "size",
  "colour",
  "overlap",
] as const;

/**
 * Props of `KeyBuilderLab`: a tray of `animals` (each once) beside a
 * dichotomous key the learner builds from `couplets` (each once). Running the
 * key sends each animal down it step by step; the readouts give how many reach
 * their own name, the step where an animal jams, or that the key works for
 * every animal. `labels.couplets` gives both statements of each couplet.
 */
function keyBuilderLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      animals: Schema.NonEmptyArray(Schema.Literals(ANIMALS)).check(
        Schema.isUnique()
      ),
      couplets: Schema.NonEmptyArray(Schema.Literals(COUPLETS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        animals: byPickedIds(ANIMALS, TextSchema),
        couplets: byPickedIds(
          COUPLETS,
          Schema.Struct({ a: TextSchema, b: TextSchema })
        ),
        failed: rich,
        reached: rich,
        run: TextSchema,
        sorted: rich,
        step: TextSchema,
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ animals, couplets, labels }) =>
          namesEach(animals, labels.animals) &&
          namesEach(couplets, labels.couplets),
        {
          message:
            "Expected a name for every animal and both statements of every couplet the lab shows, and no other.",
        }
      )
    )
  );
}

/** The key builder lab. The key's result is shown as the learner runs it; no prop is answer state. */
export function keyVisuals<E>(rich: RichSlot<E>) {
  return { KeyBuilderLab: keyBuilderLab(rich) };
}
