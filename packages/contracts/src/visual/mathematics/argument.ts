import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The textbook's three valid forms of argument, and the fallacies that look like them. */
const ARGUMENT_FORMS = ["I", "II", "III"] as const;
const ARGUMENT_FALLACIES = ["consequent", "antecedent", "middle"] as const;

/** The most cards the hand holds, the longest card text, and the longest slot name. */
const HAND_LIMIT = 3;
const CARD_TEXT_LIMIT = 100;
const SLOT_NAME_LIMIT = 12;

/**
 * What one card says, in the shapes the three forms are built from: "All A
 * are B" (`all`), "c is A" (`member`), "If p, then q" (`conditional`), and
 * "p is true" or "Not p is true" (`claim`). The names are the lesson's own
 * ids for its sets and statements, never shown: two cards that speak of one
 * set or one statement use one name.
 */
const StatementSchema = Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("all"),
    predicate: TextSchema,
    subject: TextSchema,
  }),
  Schema.Struct({
    kind: Schema.Literal("member"),
    member: TextSchema,
    set: TextSchema,
  }),
  Schema.Struct({
    antecedent: TextSchema,
    consequent: TextSchema,
    kind: Schema.Literal("conditional"),
  }),
  Schema.Struct({
    kind: Schema.Literal("claim"),
    negated: Schema.Boolean,
    statement: TextSchema,
  }),
]);

type Statement = typeof StatementSchema.Type;

/** One card: the words the learner reads, what they say, and whether that is true. */
const ArgumentCardSchema = Schema.Struct({
  statement: StatementSchema,
  text: TextSchema.check(Schema.isMaxLength(CARD_TEXT_LIMIT)),
  truth: Schema.Boolean,
});

type ArgumentCard = typeof ArgumentCardSchema.Type;

/** A slot of the chain: a card the lesson places, or `open` for the learner to fill from the hand. */
const ArgumentSlotSchema = Schema.Union([
  ArgumentCardSchema,
  Schema.Literal("open"),
]);

type ArgumentSlot = typeof ArgumentSlotSchema.Type;

/** The chain's three slots and the hand the learner fills the open ones from. */
const ArgumentChainSchema = Schema.Struct({
  conclusion: ArgumentSlotSchema,
  hand: Schema.NonEmptyArray(ArgumentCardSchema).check(
    Schema.isMaxLength(HAND_LIMIT)
  ),
  premises: Schema.Tuple([ArgumentSlotSchema, ArgumentSlotSchema]),
});

/** A slot's name on its brass plate. */
const SlotNameSchema = TextSchema.check(Schema.isMaxLength(SLOT_NAME_LIMIT));

const sameStatement = Schema.toEquivalence(StatementSchema);

/** Every way the hand fills the open slots, one card to a slot and no card twice, with the placed cards kept. */
function dealsOf(
  slots: readonly ArgumentSlot[],
  hand: readonly ArgumentCard[]
): readonly (readonly ArgumentCard[])[] {
  return Arr.match(slots, {
    onEmpty: () => [[]],
    onNonEmpty: ([slot, ...rest]) =>
      slot === "open"
        ? Arr.flatMap(hand, (card, index) =>
            Arr.map(dealsOf(rest, Arr.remove(hand, index)), (tail) => [
              card,
              ...tail,
            ])
          )
        : Arr.map(dealsOf(rest, hand), (tail) => [slot, ...tail]),
  });
}

/** Whether a statement is general: a rule about every member or every case. */
function isGeneral(statement: Statement) {
  return statement.kind === "all" || statement.kind === "conditional";
}

/** Whether two statements say one thing and its opposite. */
function contradicts(left: Statement, right: Statement) {
  return (
    left.kind === "claim" &&
    right.kind === "claim" &&
    left.statement === right.statement &&
    left.negated !== right.negated
  );
}

/**
 * Whether a full chain is one the lab can judge: valid only through form I,
 * II or III, or invalid. Two general premises chain into a valid argument the
 * lab does not teach, premises that contradict each other prove anything, and
 * a conclusion that repeats a premise follows trivially; none of these may
 * be dealt.
 */
function isJudgeable([first, second, conclusion]: readonly ArgumentCard[]) {
  if (first === undefined || second === undefined || conclusion === undefined) {
    return false;
  }
  return !(
    (isGeneral(first.statement) && isGeneral(second.statement)) ||
    contradicts(first.statement, second.statement) ||
    sameStatement(conclusion.statement, first.statement) ||
    sameStatement(conclusion.statement, second.statement)
  );
}

/**
 * Whether the learner has a slot to fill and a card for each open slot, the
 * hand's cards read differently, and every chain the hand can deal is one
 * the lab can judge.
 */
function isDealable({
  conclusion,
  hand,
  premises,
}: typeof ArgumentChainSchema.Type) {
  const slots = [...premises, conclusion];
  const open = Arr.filter(slots, (slot) => slot === "open").length;
  const texts = Arr.map(hand, ({ text }) => text);
  return (
    open > 0 &&
    hand.length >= open &&
    Arr.dedupe(texts).length === texts.length &&
    Arr.every(dealsOf(slots, hand), isJudgeable)
  );
}

/**
 * Props of `ArgumentChainLab`: an argument built from cards on a rail, two
 * `premises` and a `conclusion` joined by two chain links. Each slot holds a
 * card the lesson places, or is `open` for the learner to fill from the
 * `hand`, whose cards the toolbar deals in. With `showVerdict`, each link
 * locks when the step holds and breaks where the argument fails, a seal marks
 * each false card, and the footer names the form or the fallacy and reads
 * whether the argument is valid, its premises true and the argument sound,
 * so it is answer state.
 */
function argumentChainLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...ArgumentChainSchema.fields,
      labels: Schema.Struct({
        conclusion: SlotNameSchema,
        fallacies: byIds(ARGUMENT_FALLACIES, rich),
        form: rich,
        forms: byIds(ARGUMENT_FORMS, rich),
        hand: TextSchema,
        no: rich,
        premises: Schema.Tuple([SlotNameSchema, SlotNameSchema]),
        sound: rich,
        truth: rich,
        unfollowed: rich,
        unlinked: rich,
        valid: rich,
        viewLabel: TextSchema,
        yes: rich,
      }),
      showVerdict: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(isDealable, {
        message:
          "Expected an open slot, a hand with a different card for each open slot, and no deal the lab cannot judge: two general premises, contradicting premises, or a conclusion that repeats a premise.",
      })
    ),
    answerAt(["showVerdict"])
  );
}

/** The argument labs, where an argument is checked for its form. */
export function argumentVisuals<E>(rich: RichSlot<E>) {
  return { ArgumentChainLab: argumentChainLab(rich) };
}
