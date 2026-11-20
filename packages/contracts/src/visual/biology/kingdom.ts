import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/**
 * Specimens that each match exactly one of the six kingdoms on four features
 * (nucleus, number of cells, cell wall, how it gets food); which one is a fact
 * the renderer's model holds.
 */
const SPECIMENS = [
  "sulfolobus",
  "thermus",
  "paramecium",
  "spirogyra",
  "slimeMould",
  "yeast",
  "mushroom",
  "fern",
  "padi",
  "hydra",
] as const;

/**
 * Props of `KingdomSortLab`: a lab bench with a microscope, `specimens`
 * (each once) and six kingdom trays. The learner looks at a specimen's four
 * features, words from `labels.checks` and `labels.values`, and places it in
 * a tray. Whether the placement is right, and the correct kingdom, show only
 * when `labels.right`, `labels.wrong` and `labels.kingdom` are all given, so a
 * question can leave all three out.
 */
function kingdomSortLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        checks: byIds(["nucleus", "cells", "wall", "food"], TextSchema),
        kingdom: Schema.optionalKey(rich),
        kingdoms: byIds(
          [
            "archaebacteria",
            "eubacteria",
            "protista",
            "fungi",
            "plantae",
            "animalia",
          ],
          TextSchema
        ),
        place: TextSchema,
        right: Schema.optionalKey(rich),
        specimen: TextSchema,
        specimens: byPickedIds(SPECIMENS, rich),
        values: byIds(
          [
            "yes",
            "no",
            "one",
            "many",
            "tissue",
            "none",
            "peptidoglycan",
            "noPeptidoglycan",
            "chitin",
            "cellulose",
            "photosynthesis",
            "absorbs",
            "ingests",
            "either",
          ],
          TextSchema
        ),
        view: TextSchema,
        wrong: Schema.optionalKey(rich),
      }),
      specimens: Schema.NonEmptyArray(Schema.Literals(SPECIMENS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, specimens }) => {
          const feedback = [labels.kingdom, labels.right, labels.wrong];
          return (
            namesEach(specimens, labels.specimens) &&
            (Arr.every(feedback, (word) => word === undefined) ||
              Arr.every(feedback, (word) => word !== undefined))
          );
        },
        {
          message:
            "Expected a name for every specimen shown, and the right, wrong and kingdom feedback all given or all left out.",
        }
      )
    ),
    answerAt(["labels", "right"], ["labels", "wrong"], ["labels", "kingdom"])
  );
}

/**
 * The kingdom lab. The feedback after a placement tells the learner the
 * answer, so it is answer state.
 */
export function kingdomVisuals<E>(rich: RichSlot<E>) {
  return { KingdomSortLab: kingdomSortLab(rich) };
}
