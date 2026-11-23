import { Schema } from "effect";
import { pickedFrom, sliderOf } from "#contracts/visual/biology/control";
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
 * The two ways to make lactose-reduced milk: lactase held in alginate beads
 * in a column the milk flows through, or lactase stirred straight into the
 * milk, which then leaves with it.
 */
const METHODS = ["immobilised", "free"] as const;

/** A milk flow rate through the column in millilitres per minute, up to twenty. */
const FlowSchema = Schema.Finite.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(20)
);

/**
 * Props of `LactaseColumnLab`: a glass column of alginate beads with milk
 * flowing through it, or a beaker of milk with lactase stirred in, picked
 * from `methods` (each once, in toggle order). The learner sets the milk
 * `flow`; the readouts give the lactose left, the glucose test strip result,
 * whether lactase leaves in the milk, and how many batches the same lactase
 * treats.
 */
function lactaseColumnLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      flow: sliderOf(FlowSchema),
      labels: Schema.Struct({
        batches: rich,
        enzyme: rich,
        flow: TextSchema,
        glucose: rich,
        lactose: rich,
        method: TextSchema,
        methods: byPickedIds(METHODS, TextSchema),
        negative: rich,
        none: rich,
        parts: byIds(["column", "beads", "milk", "strip"], TextSchema),
        positive: rich,
        present: rich,
        view: TextSchema,
      }),
      methods: pickedFrom(METHODS),
    }).check(
      Schema.makeFilter(
        ({ labels, methods }) => namesEach(methods, labels.methods),
        {
          message:
            "Expected a name for every method the lab shows, and no other.",
        }
      )
    )
  );
}

/** The immobilised lactase lab. The learner compares the methods by trying, so none is answer state. */
export function lactaseVisuals<E>(rich: RichSlot<E>) {
  return { LactaseColumnLab: lactaseColumnLab(rich) };
}
