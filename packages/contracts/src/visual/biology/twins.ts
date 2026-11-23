import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

const KINDS = ["identical", "fraternal"] as const;

/** A whole number of days, zero or more. */
const DaySchema = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));

/**
 * The day after fertilisation an identical twin embryo splits: a slider over
 * whole days, its range and its starting day.
 */
const SplitSchema = Schema.Struct({
  max: DaySchema,
  min: DaySchema,
  value: DaySchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a split day range whose minimum is below its maximum, with the starting day between them.",
    }
  )
);

/**
 * Props of `TwinsLab`: how twins form, picked from `kinds` (each once).
 * Fraternal twins come from two eggs and two sperm; identical twins from one
 * embryo that splits on the day the learner sets with `split`, and that day
 * decides whether they share a placenta and an amniotic sac. The readouts
 * give the placentas, the sacs, whether the genes and the sex match.
 */
function twinsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      kinds: Schema.NonEmptyArray(Schema.Literals(KINDS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        genes: rich,
        kind: TextSchema,
        kinds: byPickedIds(KINDS, TextSchema),
        parts: byIds(
          [
            "ovary",
            "oocyte",
            "sperm",
            "blastocyst",
            "innerCellMass",
            "disc",
            "placenta",
            "amnion",
            "chorion",
            "foetus",
          ],
          TextSchema
        ),
        placentas: rich,
        results: byIds(["same", "different", "either", "joined"], TextSchema),
        sacs: rich,
        sex: rich,
        split: TextSchema,
        view: TextSchema,
      }),
      split: SplitSchema,
    }).check(
      Schema.makeFilter(({ kinds, labels }) => namesEach(kinds, labels.kinds), {
        message: "Expected a name for every kind of twin shown, and no other.",
      })
    )
  );
}

/** The twins lab. Every prop names what the learner explores; none is answer state. */
export function twinsVisuals<E>(rich: RichSlot<E>) {
  return { TwinsLab: twinsLab(rich) };
}
