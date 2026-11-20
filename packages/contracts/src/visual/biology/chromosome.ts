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

const LEVELS = [
  "nucleotide",
  "helix",
  "nucleosome",
  "fibre",
  "chromosome",
] as const;

/**
 * Props of `ChromosomePackingLab`: one DNA molecule of `basePairs` base pairs
 * zoomed from a single nucleotide to a whole chromosome, through the levels
 * the learner picks from `levels` (each once, smallest first). The readouts
 * give the width at each level and, only when `labels.length` names it, how
 * long the stretched-out DNA would be, so a question that asks for the length
 * leaves its name out.
 */
function chromosomePackingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      basePairs: Schema.Int.check(Schema.isGreaterThan(0)),
      labels: Schema.Struct({
        length: Schema.optionalKey(rich),
        level: TextSchema,
        levels: byPickedIds(LEVELS, TextSchema),
        parts: byIds(
          ["phosphate", "sugar", "base", "histone", "chromatid", "centromere"],
          TextSchema
        ),
        view: TextSchema,
        width: rich,
      }),
      levels: Schema.NonEmptyArray(Schema.Literals(LEVELS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, levels }) => namesEach(levels, labels.levels),
        {
          message:
            "Expected a name for every level the lab shows, and no other.",
        }
      )
    ),
    answerAt(["labels", "length"])
  );
}

/**
 * The chromosome lab. How long the DNA would be is what a question asks a
 * learner to work out, so that readout is answer state.
 */
export function chromosomeVisuals<E>(rich: RichSlot<E>) {
  return { ChromosomePackingLab: chromosomePackingLab(rich) };
}
