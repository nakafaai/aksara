import { DecimalSchema } from "@nakafa/aksara-contracts/assessment/answer";
import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import type { InteractionKind } from "@nakafa/aksara-contracts/assessment/interaction";
import { ItemBlueprintSchema } from "@nakafa/aksara-contracts/assessment/item";
import {
  APP_LOCALE_CODES,
  AppLocaleCodeSchema,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Result, Schema, Struct } from "effect";
import {
  PartStructureSchema,
  PartsSourceSchema,
  partStructure,
  sumPoints,
} from "#corpus/question-bank/part";

/**
 * One authored label: one rich Markdown string that becomes a document, with
 * inline math written `$$x$$`.
 */
const LabelSchema = Schema.Trimmed.check(Schema.isNonEmpty());

/** One option of a choice: its label and whether it is a correct answer. */
const OptionSourceSchema = Schema.Struct({
  correct: Schema.Boolean,
  label: LabelSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/**
 * A choice: at least two options, at least one correct, and at least one that
 * is not. One correct option makes a single choice; several make a choice of
 * several, as the official multiple-answer format asks.
 */
const ChoiceSourceSchema = Schema.Struct({
  kind: Schema.Literal("choice"),
  options: Schema.Array(OptionSourceSchema).pipe(Schema.mutable),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .check(
    Schema.makeFilter(
      ({ options }) =>
        options.length >= 2 &&
        Arr.some(options, ({ correct }) => correct) &&
        Arr.some(options, ({ correct }) => !correct),
      {
        message:
          "Expected at least two options, at least one correct and one not.",
      }
    )
  );

/** One statement of a matrix, and the one-based number of its correct column. */
const StatementSourceSchema = Schema.Struct({
  column: Schema.Int.check(Schema.isGreaterThan(0)),
  label: LabelSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/**
 * A matrix: statements that each belong in one of at least two columns, such
 * as true and false.
 */
const MatrixSourceSchema = Schema.Struct({
  columns: Schema.Array(LabelSchema).pipe(Schema.mutable),
  kind: Schema.Literal("matrix"),
  statements: Schema.Array(StatementSourceSchema).pipe(Schema.mutable),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .check(
    Schema.makeFilter(
      ({ columns, statements }) =>
        columns.length >= 2 &&
        statements.length > 0 &&
        Arr.every(statements, ({ column }) => column <= columns.length),
      {
        message:
          "Expected at least two columns and statements that each name one of them.",
      }
    )
  );

/**
 * A typed number: its exact value as a canonical decimal, such as `12`,
 * `0.75`, or `-3`, and the unit shown beside the field, so the learner types
 * the number only. The value is the same in every language; the unit is
 * written in each.
 */
const NumericEntrySourceSchema = Schema.Struct({
  kind: Schema.Literal("numericEntry"),
  unit: Schema.optionalKey(LabelSchema),
  value: DecimalSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/** The one interaction of an item that asks a single thing, in one language. */
export const InteractionSourceSchema = Schema.Union([
  ChoiceSourceSchema,
  MatrixSourceSchema,
  NumericEntrySourceSchema,
]);
export type InteractionSource = typeof InteractionSourceSchema.Type;

/**
 * The task of an authored item in one language: one interaction, or parts
 * that each have their own interaction, points, and key.
 */
export const TaskSourceSchema = Schema.Union([
  ChoiceSourceSchema,
  MatrixSourceSchema,
  NumericEntrySourceSchema,
  PartsSourceSchema,
]);
export type TaskSource = typeof TaskSourceSchema.Type;

/**
 * A task without its words: its kind, its counts, which parts are correct,
 * and the label, points, and key of each part. Every language of an item asks
 * the same task.
 */
const StructureSchema = Schema.Union([
  Schema.Struct({
    correct: Schema.Array(Schema.Boolean),
    kind: Schema.Literal("choice"),
  }),
  Schema.Struct({
    columns: Schema.Int,
    kind: Schema.Literal("matrix"),
    statements: Schema.Array(Schema.Int),
  }),
  Schema.Struct({
    kind: Schema.Literal("numericEntry"),
    value: DecimalSchema,
  }),
  Schema.Struct({
    kind: Schema.Literal("parts"),
    parts: Schema.Array(PartStructureSchema),
  }),
]);
const sameStructure = Schema.toEquivalence(StructureSchema);

/** Returns one task without its words. */
function structureOf(task: TaskSource): typeof StructureSchema.Type {
  if (task.kind === "choice") {
    return {
      correct: Arr.map(task.options, ({ correct }) => correct),
      kind: task.kind,
    };
  }
  if (task.kind === "numericEntry") {
    return { kind: task.kind, value: task.value };
  }
  if (task.kind === "parts") {
    return { kind: task.kind, parts: Arr.map(task.parts, partStructure) };
  }
  return {
    columns: task.columns.length,
    kind: task.kind,
    statements: Arr.map(task.statements, ({ column }) => column),
  };
}

/** An item's task in each language it is asked in. */
const VersionsSchema = Schema.Record(
  AppLocaleCodeSchema,
  Schema.optional(TaskSourceSchema)
);
type Versions = typeof VersionsSchema.Type;

/** The authored languages of an item, each with its task, in locale order. */
export function itemVersions(versions: Versions) {
  return Arr.filterMap(APP_LOCALE_CODES, (language) => {
    const task = versions[language];
    return task === undefined
      ? Result.failVoid
      : Result.succeed({ language, task });
  });
}

/** Checks that an item is asked in at least one language, each asking the same task. */
function hasOneStructure(versions: Versions) {
  const [first, ...rest] = Arr.map(itemVersions(versions), ({ task }) =>
    structureOf(task)
  );
  return (
    first !== undefined &&
    Arr.every(rest, (structure) => sameStructure(first, structure))
  );
}

/**
 * One authored item: its blueprint facts, the shared reading of its set that
 * it belongs to, and its task in each language it is asked in. The prompt of
 * each language is `question.<language>.mdx` beside it, and its explanations
 * are `answer.<locale>.mdx`. Publication derives every identifier, hash, key,
 * and document from this once.
 */
export const ItemSourceSchema = Schema.Struct({
  blueprint: Schema.optionalKey(ItemBlueprintSchema),
  stimulus: Schema.optionalKey(KebabKeySchema),
  versions: VersionsSchema.check(
    Schema.makeFilter(hasOneStructure, {
      message:
        "Expected at least one language, each asking the same task with its own words.",
    })
  ),
});
export type ItemSource = typeof ItemSourceSchema.Type;

/** The interaction kinds a task asks: its one kind, or the kinds of its parts. */
export function taskKinds(task: TaskSource): readonly InteractionKind[] {
  return task.kind === "parts"
    ? Arr.dedupe(Arr.map(task.parts, ({ kind }) => kind))
    : [task.kind];
}

/**
 * The points a task is worth: the points of its parts added up, or one for a
 * single interaction, which every try-out scores all or nothing
 * (`tryout/profile`).
 */
export function taskPoints(task: TaskSource) {
  return task.kind === "parts" ? sumPoints(task.parts) : 1;
}

/**
 * The first task of an item, which tells what every language asks, since each
 * asks the same; an item is asked in at least one language.
 */
function firstTasks(item: ItemSource) {
  return Arr.map(Arr.take(itemVersions(item.versions), 1), ({ task }) => task);
}

/** The points an item is worth, the same in every language it is asked in. */
export function itemPoints(item: ItemSource) {
  return Arr.reduce(
    firstTasks(item),
    0,
    (total, task) => total + taskPoints(task)
  );
}

/**
 * The labels of an item's parts in order, the same in every language, or
 * none for an item that asks a single thing.
 */
export function partLabels(item: ItemSource): readonly string[] {
  return Arr.flatMap(firstTasks(item), (task) =>
    task.kind === "parts" ? Arr.map(task.parts, ({ label }) => label) : []
  );
}
