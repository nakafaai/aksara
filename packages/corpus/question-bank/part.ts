import {
  DecimalSchema,
  TextKeySchema,
} from "@nakafa/aksara-contracts/assessment/answer";
import { hasDistinctIds } from "@nakafa/aksara-contracts/assessment/identity";
import { Array as Arr, Schema, String as Str, Struct } from "effect";

/** Lowercase letters and digits, with a dot between levels. */
const PART_LABEL_PATTERN = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/u;

/**
 * The label of one part as its exam prints it, such as `a`, `b`, `1a`, or
 * `1.1`, and the number of a C-Test gap, such as `12`. It names the part's
 * interaction and its heading in the worked solution, so it is the same in
 * every language.
 */
export const PartLabelSchema = Schema.String.check(
  Schema.isPattern(PART_LABEL_PATTERN, {
    message:
      "Expected a part label of lowercase letters and digits, with a dot between levels.",
  }),
  Schema.isMaxLength(16)
);

/** One authored text of a part, trimmed and never empty. */
const TextSchema = Schema.Trimmed.check(Schema.isNonEmpty());

/** Whole points above zero. */
const PointsSchema = Schema.Int.check(Schema.isGreaterThan(0));

/** What every part has: its label and the points it is worth. */
const PartFields = { label: PartLabelSchema, points: PointsSchema };

/**
 * A typed expression, such as a derivative or a simplified term: the LaTeX
 * that the answer must be equivalent to, the same in every language.
 */
const MathEntryPartSchema = Schema.Struct({
  ...PartFields,
  expression: TextSchema,
  kind: Schema.Literal("mathEntry"),
}).mapFields(Struct.map(Schema.mutableKey));

/**
 * A typed number: its exact value as a canonical decimal, the same in every
 * language, and the unit shown beside the field, written in each.
 */
const NumericEntryPartSchema = Schema.Struct({
  ...PartFields,
  kind: Schema.Literal("numericEntry"),
  unit: Schema.optionalKey(TextSchema),
  value: DecimalSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/**
 * The key of a typed text: the accepted texts, matched exactly. Case, umlauts,
 * and accents count, as a C-Test scores them; only a run of spaces folds into
 * one.
 */
export function exactTextKey(accepted: readonly string[]) {
  return {
    acceptedAnswers: accepted,
    collapseWhitespace: true,
    ignoreCase: false,
    kind: "text" as const,
  };
}

/**
 * A typed word or one gap of a C-Test: every text that earns its points, in
 * the language of its version. A learner types each on one line, and no two
 * match the same answer.
 */
const TextEntryPartSchema = Schema.Struct({
  ...PartFields,
  accepted: Schema.Array(TextSchema).pipe(Schema.mutable),
  kind: Schema.Literal("textEntry"),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .check(
    Schema.makeFilter(
      ({ accepted }) => Schema.is(TextKeySchema)(exactTextKey(accepted)),
      {
        message:
          "Expected at least one accepted text, each typed on one line and distinct from the others.",
      }
    )
  );

/**
 * One criterion of a rubric, met or missed. Its `label` is what a learner
 * sees before answering, so it names the step and never its result; `met` is
 * what the work must show to earn the `points`, which only a grader reads and
 * which may state the result.
 */
const CriterionSourceSchema = Schema.Struct({
  label: TextSchema,
  met: TextSchema,
  points: PointsSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/** Anything worth points: a part, or a criterion of its rubric. */
const ScoredSchema = Schema.Struct({ points: PointsSchema });

/** Adds up the points of rubric criteria or of parts. */
export function sumPoints(scored: readonly (typeof ScoredSchema.Type)[]) {
  return Arr.reduce(scored, 0, (total, { points }) => total + points);
}

/**
 * A written answer, such as a reason or a proof, that a rubric scores: its
 * criteria in order, whose points add up to the points of the part.
 */
const ExtendedTextPartSchema = Schema.Struct({
  ...PartFields,
  kind: Schema.Literal("extendedText"),
  rubric: Schema.Array(CriterionSourceSchema).pipe(Schema.mutable),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .check(
    Schema.makeFilter(
      ({ points, rubric }) => rubric.length > 0 && sumPoints(rubric) === points,
      {
        message:
          "Expected rubric criteria whose points add up to the points of the part.",
      }
    )
  );

/** One part of an item in one language. */
export const PartSourceSchema = Schema.Union([
  MathEntryPartSchema,
  NumericEntryPartSchema,
  TextEntryPartSchema,
  ExtendedTextPartSchema,
]);
export type PartSource = typeof PartSourceSchema.Type;

/**
 * An item of several parts in one language, such as an Aufgabe with its
 * Teilaufgaben or a C-Test text with its gaps: its parts in the order the
 * prompt asks them, each with a label of its own. The prompt places the field
 * of each part with `<Field part="a" />`, exactly once.
 */
export const PartsSourceSchema = Schema.Struct({
  kind: Schema.Literal("parts"),
  parts: Schema.Array(PartSourceSchema).pipe(Schema.mutable),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .check(
    Schema.makeFilter(
      ({ parts }) =>
        parts.length > 0 &&
        hasDistinctIds(Arr.map(parts, ({ label }) => label)),
      { message: "Expected at least one part, each with a label of its own." }
    )
  );
export type PartsSource = typeof PartsSourceSchema.Type;

/**
 * The task of one part without its words, which every language of its item
 * shares: its label, kind, and points, the expression or value it is matched
 * against, and the points of each rubric criterion. A unit, an accepted text,
 * and a criterion's words belong to one language.
 */
export const PartStructureSchema = Schema.Union([
  Schema.Struct({
    expression: Schema.String,
    kind: Schema.Literal("mathEntry"),
    label: Schema.String,
    points: Schema.Int,
  }),
  Schema.Struct({
    kind: Schema.Literal("numericEntry"),
    label: Schema.String,
    points: Schema.Int,
    value: DecimalSchema,
  }),
  Schema.Struct({
    kind: Schema.Literal("textEntry"),
    label: Schema.String,
    points: Schema.Int,
  }),
  Schema.Struct({
    kind: Schema.Literal("extendedText"),
    label: Schema.String,
    points: Schema.Int,
    rubric: Schema.Array(Schema.Int),
  }),
]);

/** Returns the task of one part without its words. */
export function partStructure(
  part: PartSource
): typeof PartStructureSchema.Type {
  const { label, points } = part;
  if (part.kind === "mathEntry") {
    return { expression: part.expression, kind: part.kind, label, points };
  }
  if (part.kind === "numericEntry") {
    return { kind: part.kind, label, points, value: part.value };
  }
  if (part.kind === "textEntry") {
    return { kind: part.kind, label, points };
  }
  return {
    kind: part.kind,
    label,
    points,
    rubric: Arr.map(part.rubric, (criterion) => criterion.points),
  };
}

/**
 * The interaction of one part, named after its label, so it is the same in
 * every language: part `a` is `part-a`, and part `1.1` is `part-1-1`.
 */
export function partInteraction(label: string) {
  return `part-${Str.replaceAll(".", "-")(label)}`;
}
