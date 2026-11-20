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

const SEXES = ["male", "female"] as const;
const LEVELS = ["system", "gonad", "meiosis", "gamete"] as const;

/**
 * Props of `GametogenesisLab`: how sperm form in a testis and eggs in an
 * ovary, from the whole reproductive system down to one gamete. The learner
 * picks one of `sexes` and steps through `levels` (each once, in the order
 * the toggles list them); a body cell holds `chromosomes` chromosomes, an
 * even number, and every gamete half of them. The readouts name the cell, its
 * chromosome count and how many gametes one starting cell makes, and the
 * latter two show only when `labels.chromosomes` and `labels.made` name them,
 * so a question can ask for them.
 */
function gametogenesisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      chromosomes: Schema.Int.check(
        Schema.isGreaterThan(0),
        Schema.makeFilter((count: number) => count % 2 === 0, {
          message:
            "Expected an even chromosome count, so a gamete holds half of it.",
        })
      ),
      labels: Schema.Struct({
        cell: rich,
        cells: byIds(
          [
            "spermatogonium",
            "primarySpermatocyte",
            "secondarySpermatocyte",
            "spermatid",
            "sperm",
            "oogonium",
            "primaryOocyte",
            "secondaryOocyte",
            "polarBody",
            "ovum",
          ],
          TextSchema
        ),
        chromosomes: Schema.optionalKey(rich),
        level: TextSchema,
        levels: byPickedIds(LEVELS, TextSchema),
        made: Schema.optionalKey(rich),
        parts: byIds(
          [
            "testis",
            "scrotum",
            "epididymis",
            "spermDuct",
            "seminalVesicle",
            "prostate",
            "cowper",
            "urethra",
            "penis",
            "ovary",
            "oviduct",
            "uterus",
            "cervix",
            "vagina",
            "tubule",
            "interstitial",
            "follicle",
            "corpusLuteum",
            "head",
            "acrosome",
            "middle",
            "tail",
            "follicular",
            "antrum",
          ],
          TextSchema
        ),
        polar: rich,
        sex: TextSchema,
        sexes: byPickedIds(SEXES, TextSchema),
        view: TextSchema,
      }),
      levels: Schema.NonEmptyArray(Schema.Literals(LEVELS)).check(
        Schema.isUnique()
      ),
      sexes: Schema.NonEmptyArray(Schema.Literals(SEXES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, levels, sexes }) =>
          namesEach(sexes, labels.sexes) && namesEach(levels, labels.levels),
        {
          message:
            "Expected a name for every sex and level the lab shows, and no other.",
        }
      )
    ),
    answerAt(["labels", "chromosomes"], ["labels", "made"])
  );
}

/**
 * The gametogenesis lab. A gamete's chromosome count and how many gametes one
 * cell makes are what a question asks for, so those readouts are answer state.
 */
export function gametogenesisVisuals<E>(rich: RichSlot<E>) {
  return { GametogenesisLab: gametogenesisLab(rich) };
}
