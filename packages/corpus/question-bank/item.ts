import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { ItemBlueprintSchema } from "@nakafa/aksara-contracts/assessment/item";
import {
  APP_LOCALE_CODES,
  AppLocaleCodeSchema,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Result, Schema, Struct } from "effect";

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

/** The one interaction of an authored item, in one language. */
export const InteractionSourceSchema = Schema.Union([
  ChoiceSourceSchema,
  MatrixSourceSchema,
]);
export type InteractionSource = typeof InteractionSourceSchema.Type;

/**
 * The task of an interaction without its words: its kind, its counts, and
 * which parts are correct. Every language of an item asks the same task.
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
]);
const sameStructure = Schema.toEquivalence(StructureSchema);

/** Returns the task of one interaction without its words. */
function structureOf(
  interaction: InteractionSource
): typeof StructureSchema.Type {
  if (interaction.kind === "choice") {
    return {
      correct: Arr.map(interaction.options, ({ correct }) => correct),
      kind: interaction.kind,
    };
  }
  return {
    columns: interaction.columns.length,
    kind: interaction.kind,
    statements: Arr.map(interaction.statements, ({ column }) => column),
  };
}

/** An item's interaction in each language it is asked in. */
const VersionsSchema = Schema.Record(
  AppLocaleCodeSchema,
  Schema.optional(InteractionSourceSchema)
);
type Versions = typeof VersionsSchema.Type;

/** The authored languages of an item, each with its interaction, in locale order. */
export function itemVersions(versions: Versions) {
  return Arr.filterMap(APP_LOCALE_CODES, (language) => {
    const interaction = versions[language];
    return interaction === undefined
      ? Result.failVoid
      : Result.succeed({ interaction, language });
  });
}

/** Checks that an item is asked in at least one language, each asking the same task. */
function hasOneStructure(versions: Versions) {
  const [first, ...rest] = Arr.map(itemVersions(versions), ({ interaction }) =>
    structureOf(interaction)
  );
  return (
    first !== undefined &&
    Arr.every(rest, (structure) => sameStructure(first, structure))
  );
}

/**
 * One authored item: its blueprint facts, the shared reading of its set that
 * it belongs to, and its interaction in each language it is asked in. The
 * prompt of each language is `question.<language>.mdx` beside it, and its
 * explanations are `answer.<locale>.mdx`. Publication derives every
 * identifier, hash, key, and document from this once.
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
