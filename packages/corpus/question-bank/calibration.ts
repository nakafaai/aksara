import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  Array as Arr,
  Effect,
  HashMap,
  Option,
  Order,
  Record as Rec,
  Result,
  Schema,
  Struct,
} from "effect";

import { readConstantModule } from "#corpus/module/constant";
import type { ItemSource } from "#corpus/question-bank/item";
import { itemVersions } from "#corpus/question-bank/item";

/**
 * The file beside an item that holds expert-marked answers to its written
 * parts, which a grader is calibrated against. It is checked with its item
 * and never published.
 */
export const CALIBRATION_FILE = "calibration.ts";

/** The shape of every calibration module: `const calibration: Calibration = { ... }`, default-exported. */
const CALIBRATION_MODULE = {
  binding: "calibration",
  typeModule: "#corpus/question-bank/calibration",
  typeName: "Calibration",
} as const;

/** A trimmed note that says something: a sample's text or a mark's reason. */
const NoteSchema = Schema.Trimmed.check(Schema.isNonEmpty());

/** How an expert marked one criterion of a sample: met or not, and why. */
const MarkSchema = Schema.Struct({
  criterion: Schema.Int.check(Schema.isGreaterThan(0)),
  met: Schema.Boolean,
  reason: NoteSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/** One expert-marked answer to a written part: good, partial, or wrong. */
const SampleSchema = Schema.Struct({
  grade: Schema.Literals(["good", "partial", "wrong"]),
  id: KebabKeySchema,
  marks: Schema.NonEmptyArray(MarkSchema),
  text: NoteSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/** The samples of an item's written parts, by part label. */
export const CalibrationSchema = Schema.Record(
  Schema.String,
  Schema.NonEmptyArray(SampleSchema)
);
export type Calibration = typeof CalibrationSchema.Type;

/** A calibration file does not decode, or does not fit the written parts of its item. */
export class CalibrationError extends Schema.TaggedError<
  CalibrationError,
  { readonly brand: unique symbol }
>()("CalibrationError", {
  path: CorpusSourcePathSchema,
  problems: Schema.NonEmptyArray(Schema.String),
}) {}

/** The number of rubric criteria of each written part of an item, by label. */
function writtenParts(item: ItemSource) {
  return HashMap.fromIterable(
    Arr.flatMap(Arr.take(itemVersions(item.versions), 1), ({ task }) =>
      task.kind === "parts"
        ? Arr.filterMap(task.parts, (part) =>
            part.kind === "extendedText"
              ? Result.succeed([part.label, part.rubric.length] as const)
              : Result.failVoid
          )
        : []
    )
  );
}

/** Whether a sample marks each criterion from 1 to `criteria` exactly once. */
function marksEvery(
  marks: readonly (typeof MarkSchema.Type)[],
  criteria: number
) {
  return Arr.makeEquivalence<number>((left, right) => left === right)(
    Arr.sort(
      Arr.map(marks, ({ criterion }) => criterion),
      Order.Number
    ),
    Arr.range(1, criteria)
  );
}

/** Lists what does not fit: a label of no written part, a repeated sample id, or a sample that does not mark every criterion once. */
export function calibrationProblems(
  calibration: Calibration,
  item: ItemSource
) {
  const parts = writtenParts(item);
  const entries = Rec.toEntries(calibration);
  const ids = Arr.flatMap(entries, ([, samples]) =>
    Arr.map(samples, ({ id }) => id)
  );
  const repeated = Arr.dedupe(
    Arr.filter(ids, (id, index) => Arr.contains(Arr.take(ids, index), id))
  );
  return [
    ...Arr.map(repeated, (id) => `sample ${id} is named twice`),
    ...Arr.flatMap(entries, ([label, samples]) =>
      Option.match(HashMap.get(parts, label), {
        onNone: () => [`${label} is not a written part of the item`],
        onSome: (criteria) =>
          Arr.filterMap(samples, ({ id, marks }) =>
            marksEvery(marks, criteria)
              ? Result.failVoid
              : Result.succeed(
                  `sample ${id} must mark criteria 1 to ${criteria} once each`
                )
          ),
      })
    ),
  ];
}

/** Decodes the calibration module of an item without executing code and checks it against the item's written parts. */
export const decodeCalibration = Effect.fn("AksaraCorpus.decodeCalibration")(
  function* (
    source: string,
    path: typeof CorpusSourcePathSchema.Type,
    item: ItemSource
  ) {
    const input = yield* readConstantModule(CALIBRATION_MODULE, {
      fileName: path,
      source,
    });
    if (input === undefined) {
      return yield* new CalibrationError({
        path,
        problems: [
          "Expected a typed constant module exporting default calibration of type Calibration.",
        ],
      });
    }
    const calibration = yield* Schema.decodeUnknownEffect(CalibrationSchema)(
      input,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) => new CalibrationError({ path, problems: [String(cause)] })
      )
    );
    const problems = calibrationProblems(calibration, item);
    return Arr.isReadonlyArrayNonEmpty(problems)
      ? yield* new CalibrationError({ path, problems })
      : calibration;
  }
);
