import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/**
 * Props of `ImplantationLab`: the first week after fertilisation, from the
 * zygote in the ampulla of the oviduct to the blastocyst sinking into the
 * uterus lining. The learner moves through the days; the readouts name the
 * stage and, when `labels.cells` and `labels.share` name them, the number of
 * cells and the share of the zygote each cell holds, so a question can ask for
 * them.
 */
function implantationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        cells: Schema.optionalKey(rich),
        day: rich,
        parts: byIds(
          [
            "ovary",
            "ampulla",
            "tube",
            "uterus",
            "endometrium",
            "sperm",
            "zona",
            "innerCellMass",
            "trophoblast",
            "cavity",
            "hcg",
          ],
          TextSchema
        ),
        share: Schema.optionalKey(rich),
        stage: rich,
        stages: byIds(
          ["zygote", "twoCell", "morula", "blastocyst", "implanting"],
          TextSchema
        ),
        view: TextSchema,
      }),
    }),
    answerAt(["labels", "cells"], ["labels", "share"])
  );
}

/**
 * The implantation lab. How many cells the embryo has and how much of the
 * zygote each holds are what a question asks for, so they are answer state.
 */
export function implantationVisuals<E>(rich: RichSlot<E>) {
  return { ImplantationLab: implantationLab(rich) };
}
