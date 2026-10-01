import { Schema } from "effect";

const DECIMAL_PATTERN = /^(?:0|-?[1-9]\d*|-?(?:0|[1-9]\d*)\.\d*[1-9])$/u;
const CONTROL_CHARACTER_PATTERN = /\p{Cc}/u;
const WHITESPACE_RUN_PATTERN = /\s+/gu;

/**
 * One exact decimal in its only canonical spelling: an optional minus sign, an
 * integer part without leading zeros, and a dot-separated fraction without
 * trailing zeros. Zero is always `0`, so equal values share one encoding.
 * Graders parse it exactly, for example with Effect `BigDecimal.fromString`,
 * and never through binary floating point.
 */
export const QuestionDecimalSchema = Schema.String.check(
  Schema.isPattern(DECIMAL_PATTERN, {
    description: "Exact decimal written in its canonical dot-separated form.",
    identifier: "QuestionDecimal",
    message: "Invalid canonical decimal.",
  })
);
export type QuestionDecimal = typeof QuestionDecimalSchema.Type;

/** Checks that one canonical decimal is strictly greater than zero. */
function isPositiveDecimal(value: string) {
  return value !== "0" && !value.startsWith("-");
}

/**
 * Largest accepted distance from the exact value, inclusive. An absolute
 * tolerance `t` accepts `|answer - value| <= t`. A relative tolerance `r`
 * accepts `|answer - value| <= r * |value|`, is below one, and needs a nonzero
 * value.
 */
export const QuestionToleranceSchema = Schema.Struct({
  kind: Schema.Literals(["absolute", "relative"]),
  value: QuestionDecimalSchema.check(
    Schema.makeFilter(isPositiveDecimal, {
      message: "Expected a positive tolerance.",
    })
  ),
}).check(
  Schema.makeFilter(
    ({ kind, value }) => kind === "absolute" || value.startsWith("0."),
    { message: "Expected a relative tolerance below one." }
  )
);
export type QuestionTolerance = typeof QuestionToleranceSchema.Type;

/**
 * Deterministic numeric answer key. The runtime reads the learner's number
 * with the decimal separator of the delivery language, a comma for `id` and
 * `de` and a dot for `en`, then compares its exact value with `value`, within
 * `tolerance` when present. When `acceptsFractions` is true, the learner may
 * also answer with an integer fraction `p/q`, such as `6/8`, whose exact
 * rational value is compared the same way. Without the flag, a fraction is a
 * wrong answer.
 */
export const QuestionNumberAnswerSchema = Schema.Struct({
  acceptsFractions: Schema.Boolean,
  kind: Schema.Literal("number"),
  tolerance: Schema.optionalKey(QuestionToleranceSchema),
  value: QuestionDecimalSchema,
}).check(
  Schema.makeFilter(
    ({ tolerance, value }) => tolerance?.kind !== "relative" || value !== "0",
    { message: "A relative tolerance cannot measure distance from zero." }
  )
);
export type QuestionNumberAnswer = typeof QuestionNumberAnswerSchema.Type;

/** One accepted single-line answer written without surrounding whitespace. */
const QuestionAcceptedTextSchema = Schema.Trimmed.check(
  Schema.isNonEmpty(),
  Schema.makeFilter((text) => !CONTROL_CHARACTER_PATTERN.test(text), {
    message: "Expected single-line accepted text without control characters.",
  })
);

/** Text grading rules that every learner and accepted answer passes through. */
interface TextAnswerRules {
  readonly collapseWhitespace: boolean;
  readonly ignoreCase: boolean;
}

/**
 * Normalizes one learner or accepted text answer exactly as graders compare
 * it. `ignoreCase` first applies the locale-independent Unicode lowercase
 * mapping. Every answer is then normalized to Unicode NFC and trimmed, because
 * canonically equivalent spellings and surrounding whitespace never change a
 * short answer. Finally `collapseWhitespace` turns each inner whitespace run
 * into one space.
 */
export function normalizeTextAnswer(text: string, rules: TextAnswerRules) {
  const cased = rules.ignoreCase ? text.toLowerCase() : text;
  const trimmed = cased.normalize("NFC").trim();
  return rules.collapseWhitespace
    ? trimmed.replace(WHITESPACE_RUN_PATTERN, " ")
    : trimmed;
}

/** Checks that no two accepted answers grade as the same normalized text. */
function hasDistinctAcceptedAnswers(
  answer: TextAnswerRules & { readonly acceptedAnswers: readonly string[] }
) {
  const normalized = answer.acceptedAnswers.map((text) =>
    normalizeTextAnswer(text, answer)
  );
  return new Set(normalized).size === normalized.length;
}

/**
 * Deterministic text answer key written in the delivery language. A learner
 * answer is correct when `normalizeTextAnswer` maps it to the same text as one
 * accepted answer. Accepted answers are plain text, never Markdown, so show
 * them without rich rendering.
 */
export const QuestionTextAnswerSchema = Schema.Struct({
  acceptedAnswers: Schema.NonEmptyArray(QuestionAcceptedTextSchema),
  collapseWhitespace: Schema.Boolean,
  ignoreCase: Schema.Boolean,
  kind: Schema.Literal("text"),
}).check(
  Schema.makeFilter(hasDistinctAcceptedAnswers, {
    message: "Accepted answers must stay distinct after normalization.",
  })
);
export type QuestionTextAnswer = typeof QuestionTextAnswerSchema.Type;

/** Deterministic key shared by short answers and rubric final results. */
export const QuestionAnswerSchema = Schema.Union([
  QuestionNumberAnswerSchema,
  QuestionTextAnswerSchema,
]);
export type QuestionAnswer = typeof QuestionAnswerSchema.Type;

/** Returns one answer key in stable field order for signed canonicalizers. */
export function canonicalQuestionAnswer(answer: QuestionAnswer) {
  if (answer.kind === "text") {
    return {
      acceptedAnswers: [...answer.acceptedAnswers],
      collapseWhitespace: answer.collapseWhitespace,
      ignoreCase: answer.ignoreCase,
      kind: answer.kind,
    };
  }
  return {
    acceptsFractions: answer.acceptsFractions,
    kind: answer.kind,
    ...(answer.tolerance === undefined
      ? {}
      : {
          tolerance: {
            kind: answer.tolerance.kind,
            value: answer.tolerance.value,
          },
        }),
    value: answer.value,
  };
}

/**
 * Returns the grading rules shared by every delivery language. A numeric key is
 * language-neutral and stays whole; text keeps its rules but drops accepted
 * answers, which each delivery language writes in its own words.
 */
export function canonicalQuestionAnswerStructure(answer: QuestionAnswer) {
  if (answer.kind === "text") {
    return {
      collapseWhitespace: answer.collapseWhitespace,
      ignoreCase: answer.ignoreCase,
      kind: answer.kind,
    };
  }
  return canonicalQuestionAnswer(answer);
}
