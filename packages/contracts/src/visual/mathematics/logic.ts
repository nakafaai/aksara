import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The circuits the board wires: switches in a row, side by side, or across the lamp. */
const LOGIC_MODES = ["and", "or", "not"] as const;

/** One circuit, named by the compound statement its lamp shows. */
const LogicModeSchema = Schema.Literals(LOGIC_MODES);

/** The circuits a lab offers and the one it opens on, the first when unset. */
const ModeChoiceSchema = Schema.Struct({
  modes: Schema.NonEmptyArray(LogicModeSchema),
  startMode: Schema.optionalKey(LogicModeSchema),
});

/** Whether each circuit is offered once and the opening circuit is one of them. */
function isModeChoice({ modes, startMode }: typeof ModeChoiceSchema.Type) {
  return (
    Arr.dedupe(modes).length === modes.length &&
    (startMode === undefined || Arr.contains(modes, startMode))
  );
}

/**
 * Props of `SwitchLogicLab`: a battery, a lamp and switches P and Q on a
 * pegboard, wired in a row for `p ∧ q`, side by side for `p ∨ q`, or across
 * the lamp for `~p`. The learner closes and opens the switches, a lit lamp
 * means the compound statement is true, and each case fills its row of the
 * truth table as it is tried. With `showTable`, every row's compound value
 * shows from the start, so it is answer state.
 */
function switchLogicLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        compounds: byIds(LOGIC_MODES, rich),
        false: TextSchema,
        mode: TextSchema,
        modes: byIds(LOGIC_MODES, TextSchema),
        p: rich,
        q: rich,
        switches: TextSchema,
        true: TextSchema,
        viewLabel: TextSchema,
      }),
      ...ModeChoiceSchema.fields,
      showTable: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(isModeChoice, {
        message:
          "Expected each circuit once, and an opening circuit that is one of them.",
      })
    ),
    answerAt(["showTable"])
  );
}

/** The logic labs, where the truth of a compound statement is read. */
export function logicVisuals<E>(rich: RichSlot<E>) {
  return { SwitchLogicLab: switchLogicLab(rich) };
}
