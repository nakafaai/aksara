import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The marble glazes the jar can hold. */
const MARBLE_COLORS = ["red", "blue", "green", "yellow", "white"] as const;

/** How a marble drawn first is handled before the second draw. */
const DRAW_RULES = ["replace", "keep"] as const;

/** The most marbles the jar holds below its shoulder. */
const JAR_CAPACITY = 24;

/** One colour of marble in the jar and how many of it. */
const MarbleGroupSchema = Schema.Struct({
  color: Schema.Literals(MARBLE_COLORS),
  count: Schema.Int.check(Schema.isGreaterThan(0)),
});

/** Whether each colour appears once and the jar holds them all. */
function fitsJar(groups: readonly (typeof MarbleGroupSchema.Type)[]) {
  const colors = Arr.map(groups, (group) => group.color);
  const total = Arr.reduce(groups, 0, (sum, group) => sum + group.count);
  return Arr.dedupe(colors).length === colors.length && total <= JAR_CAPACITY;
}

/**
 * Props of `MarbleDrawLab`: a jar of mixed marbles from which two are drawn
 * one after the other, a thousand times over, with or without putting the
 * first back. A tally board keeps the colours of the last trials. With
 * `event`, the footer reads the probability of each draw, their product, and
 * the share of trials that matched, so it is answer state.
 */
function marbleDrawLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      event: Schema.optionalKey(
        Schema.Struct({
          first: Schema.Literals(MARBLE_COLORS),
          second: Schema.Literals(MARBLE_COLORS),
        })
      ),
      labels: Schema.Struct({
        both: rich,
        first: rich,
        frequency: rich,
        rule: TextSchema,
        rules: byIds(DRAW_RULES, TextSchema),
        second: rich,
        trials: rich,
        viewLabel: TextSchema,
      }),
      marbles: Schema.NonEmptyArray(MarbleGroupSchema).check(
        Schema.makeFilter(fitsJar, {
          message: `Expected each colour once and ${JAR_CAPACITY} marbles at most.`,
        })
      ),
      rule: Schema.optionalKey(Schema.Literals(DRAW_RULES)),
    }),
    answerAt(["event"])
  );
}

/** How many dice the tray rolls at once. */
const DICE_COUNTS = [1, 2] as const;

/** The dice a dice lab rolls and the outcome it counts. */
const DiceTargetSchema = Schema.Struct({
  dice: Schema.Literals(DICE_COUNTS),
  target: Schema.optionalKey(Schema.Int),
});

/** Whether the target can show: a face 1 to 6 of one die, or a sum 2 to 12 of two. */
function canShow({ dice, target }: typeof DiceTargetSchema.Type) {
  return target === undefined || (target >= dice && target <= 6 * dice);
}

/**
 * Props of `DiceRollLab`: one or two dice rolled three hundred times in a
 * felt tray, each roll adding a chip to its outcome's stack behind it. With
 * `target`, that outcome's stack is highlighted and the footer reads how
 * many rolls showed it, their share, and its probability, so it is answer
 * state.
 */
function diceRollLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...DiceTargetSchema.fields,
      labels: Schema.Struct({
        frequency: rich,
        hits: rich,
        probability: rich,
        trials: rich,
        viewLabel: TextSchema,
      }),
    }).check(
      Schema.makeFilter(canShow, {
        message:
          "Expected a target the dice can show: 1 to 6 for one die, 2 to 12 for two.",
      })
    ),
    answerAt(["target"])
  );
}

/** The chances a Galton board's pins send a ball right: leaning left, upright, leaning right. */
const GALTON_BIASES = [0.3, 0.5, 0.7] as const;

/**
 * Props of `GaltonBoardLab`: a walnut Galton board through whose `rows` rows
 * of pins three hundred balls drop, each pin sending a ball right with
 * `probability`. With `showExpected`, marks on the glass show the counts the
 * binomial formula expects, and the footer reads the mean, the standard
 * deviation and the chance of the most likely bin, so it is answer state.
 */
function galtonBoardLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        balls: rich,
        expected: rich,
        mean: rich,
        rows: TextSchema,
        spread: rich,
        tilt: TextSchema,
        viewLabel: TextSchema,
      }),
      probability: Schema.Literals(GALTON_BIASES),
      rows: Schema.Int.check(Schema.isBetween({ maximum: 12, minimum: 4 })),
      showExpected: Schema.optionalKey(Schema.Boolean),
    }),
    answerAt(["showExpected"])
  );
}

/** The probability labs, where a random experiment runs many times. */
export function chanceVisuals<E>(rich: RichSlot<E>) {
  return {
    DiceRollLab: diceRollLab(rich),
    GaltonBoardLab: galtonBoardLab(rich),
    MarbleDrawLab: marbleDrawLab(rich),
  };
}
