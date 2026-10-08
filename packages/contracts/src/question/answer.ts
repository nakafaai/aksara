import { BigDecimal, HashSet, Option, Schema, String as Str } from "effect";

import type { AppLocaleCode } from "#contracts/locale";

const DECIMAL_PATTERN = /^(?:0|-?[1-9]\d*|-?(?:0|[1-9]\d*)\.\d*[1-9])$/u;
const UNTYPABLE_CHARACTER_PATTERN = /[\p{Cc}\p{Cf}]|[^\S ]/u;
const FORMAT_CHARACTER_PATTERN = /\p{Cf}/gu;
const WHITESPACE_PATTERN = /\s/gu;
const SPACE_RUN_PATTERN = / {2,}/gu;
const COMMA_NUMBER_PATTERN = /^[+\u2212-]?(?:\d+(?:,\d*)?|,\d+)$/u;
const DOT_NUMBER_PATTERN = /^[+\u2212-]?(?:\d+(?:\.\d*)?|\.\d+)$/u;
const FRACTION_PATTERN = /^[+\u2212-]?\d+ *\/ *\d+$/u;
const ONE = BigDecimal.fromBigInt(1n);

/** Typed decimal notation of each delivery language. */
const NUMBER_PATTERNS = {
  de: COMMA_NUMBER_PATTERN,
  en: DOT_NUMBER_PATTERN,
  id: COMMA_NUMBER_PATTERN,
} satisfies Record<AppLocaleCode, RegExp>;

/**
 * One exact decimal in its only canonical spelling: an optional minus sign, an
 * integer part without leading zeros, and a dot-separated fraction without
 * trailing zeros. Zero is always `0`, so equal values share one encoding.
 * Graders compare it exactly through `matchesAnswerKey`, never through binary
 * floating point.
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
 * Deterministic numeric answer key. A learner number, read by
 * `readNumberAnswer` in the delivery language, matches when its exact value
 * equals `value`, or lies within `tolerance` when present. A fraction such as
 * `6/8` matches only when `acceptsFractions` is true.
 */
export const QuestionNumberKeySchema = Schema.Struct({
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
export type QuestionNumberKey = typeof QuestionNumberKeySchema.Type;

/**
 * One accepted answer as a learner types it on one line: trimmed, non-empty,
 * in Unicode NFC, with the ordinary space as its only whitespace and no
 * control or invisible format character. Each key therefore has one signed
 * spelling and can be typed into a single-line answer field.
 */
const QuestionAcceptedTextSchema = Schema.Trimmed.check(
  Schema.isNonEmpty(),
  Schema.makeFilter((text) => !UNTYPABLE_CHARACTER_PATTERN.test(text), {
    message:
      "Expected one typed line whose only whitespace is the ordinary space.",
  }),
  Schema.makeFilter((text) => text === text.normalize("NFC"), {
    message: "Expected NFC text.",
  })
);

/**
 * Returns one typed answer as a learner sees it: Unicode NFC, without
 * invisible format characters, trimmed, and with every whitespace character
 * written as the ordinary space.
 */
function visibleText(text: string) {
  return text
    .normalize("NFC")
    .replace(FORMAT_CHARACTER_PATTERN, "")
    .trim()
    .replace(WHITESPACE_PATTERN, " ");
}

/** Text grading rules that every learner and accepted answer passes through. */
const TextKeyRulesSchema = Schema.Struct({
  collapseWhitespace: Schema.Boolean,
  ignoreCase: Schema.Boolean,
});
type TextKeyRules = typeof TextKeyRulesSchema.Type;

/**
 * Normalizes one learner or accepted text answer exactly as graders compare
 * it. `ignoreCase` first applies the locale-independent Unicode lowercase
 * mapping. The answer is then read as visible text, because canonically
 * equivalent spellings, invisible characters, surrounding whitespace, and the
 * kind of space never change a short answer. Finally `collapseWhitespace`
 * merges each run of spaces into one.
 */
function normalizeTextAnswer(text: string, rules: TextKeyRules) {
  const visible = visibleText(rules.ignoreCase ? text.toLowerCase() : text);
  return rules.collapseWhitespace
    ? visible.replace(SPACE_RUN_PATTERN, " ")
    : visible;
}

/** Checks that no two accepted answers grade as the same normalized text. */
function hasDistinctAcceptedAnswers(
  key: TextKeyRules & { readonly acceptedAnswers: readonly string[] }
) {
  const normalized = key.acceptedAnswers.map((text) =>
    normalizeTextAnswer(text, key)
  );
  return HashSet.size(HashSet.fromIterable(normalized)) === normalized.length;
}

/**
 * Deterministic text answer key written in the delivery language. A learner
 * answer matches when it normalizes, under `ignoreCase` and
 * `collapseWhitespace`, to the same text as one accepted answer. Accepted
 * answers are plain text, never Markdown, so show them without rich rendering.
 */
export const QuestionTextKeySchema = Schema.Struct({
  acceptedAnswers: Schema.NonEmptyArray(QuestionAcceptedTextSchema),
  collapseWhitespace: Schema.Boolean,
  ignoreCase: Schema.Boolean,
  kind: Schema.Literal("text"),
}).check(
  Schema.makeFilter(hasDistinctAcceptedAnswers, {
    message: "Accepted answers must stay distinct after normalization.",
  })
);
export type QuestionTextKey = typeof QuestionTextKeySchema.Type;

/** Deterministic key shared by short answers and rubric final results. */
export const QuestionAnswerKeySchema = Schema.Union([
  QuestionNumberKeySchema,
  QuestionTextKeySchema,
]);
export type QuestionAnswerKey = typeof QuestionAnswerKeySchema.Type;

/**
 * One learner number read exactly as `numerator / denominator`, with a
 * positive integer denominator that is one for a typed decimal. `fraction`
 * records that the learner wrote `p/q`.
 */
const QuestionNumberAnswerSchema = Schema.Struct({
  denominator: Schema.BigDecimal,
  fraction: Schema.Boolean,
  numerator: Schema.BigDecimal,
});
export type QuestionNumberAnswer = typeof QuestionNumberAnswerSchema.Type;

/** Reads one signed ASCII number, where U+2212 is a minus sign. */
function readSigned(text: string) {
  return BigDecimal.fromString(text.trim().replace("\u2212", "-"));
}

/** Reads one typed decimal in the notation of its delivery language. */
function readDecimal(
  typed: string,
  language: AppLocaleCode
): Option.Option<QuestionNumberAnswer> {
  if (!NUMBER_PATTERNS[language].test(typed)) {
    return Option.none();
  }
  return Option.map(readSigned(typed.replace(",", ".")), (numerator) => ({
    denominator: ONE,
    fraction: false,
    numerator,
  }));
}

/** Reads one typed integer fraction whose denominator is not zero. */
function readFraction(typed: string): Option.Option<QuestionNumberAnswer> {
  if (!FRACTION_PATTERN.test(typed)) {
    return Option.none();
  }
  const slash = typed.indexOf("/");
  const parts = Option.all({
    denominator: readSigned(typed.slice(slash + 1)),
    numerator: readSigned(typed.slice(0, slash)),
  });
  return Option.flatMap(parts, ({ denominator, numerator }) =>
    BigDecimal.isZero(denominator)
      ? Option.none()
      : Option.some({ denominator, fraction: true, numerator })
  );
}

/**
 * Checks whether one typed learner answer is blank: nothing remains once it is
 * read as visible text, so whitespace and invisible format characters alone
 * are no answer. Every runtime decides whether a typed answer exists only
 * through this check. A blank answer is unanswered, matches no key, and earns
 * zero on every rubric criterion.
 */
export function isBlankAnswer(answer: string) {
  return Str.isEmpty(visibleText(answer));
}

/**
 * Reads one typed learner number exactly, under the single grammar every
 * runtime grades with. The input is first read as visible text, as for text
 * answers. A decimal is an optional sign (`+`, `-`, or the minus sign U+2212)
 * and ASCII digits with at most one decimal separator, a comma for `id` and
 * `de` and a dot for `en`, and at least one digit, so `.5` and `5.` read in
 * English. A fraction is an optionally signed integer numerator, a slash with
 * optional spaces on each side, and a nonzero integer denominator. Grouping
 * separators, exponents, mixed numbers such as `1 1/2`, and empty input are
 * not numbers.
 */
export function readNumberAnswer(input: string, language: AppLocaleCode) {
  const typed = visibleText(input);
  return Option.orElse(readDecimal(typed, language), () => readFraction(typed));
}

/**
 * Compares one exact learner number with a numeric key. For an answer
 * `n / d`, the distance `|n - value * d|` is compared with the tolerance
 * scaled by `d`, so fractions are graded exactly without division.
 */
function matchesNumberKey(
  key: QuestionNumberKey,
  answer: QuestionNumberAnswer
) {
  if (answer.fraction && !key.acceptsFractions) {
    return false;
  }
  const value = BigDecimal.fromStringUnsafe(key.value);
  const distance = BigDecimal.abs(
    BigDecimal.subtract(
      answer.numerator,
      BigDecimal.multiply(value, answer.denominator)
    )
  );
  if (key.tolerance === undefined) {
    return BigDecimal.isZero(distance);
  }
  const reach =
    key.tolerance.kind === "absolute"
      ? answer.denominator
      : BigDecimal.multiply(BigDecimal.abs(value), answer.denominator);
  return BigDecimal.isLessThanOrEqualTo(
    distance,
    BigDecimal.multiply(BigDecimal.fromStringUnsafe(key.tolerance.value), reach)
  );
}

/**
 * Grades one typed learner answer against its key, as every runtime must. A
 * text key matches when the answer normalizes to one accepted answer. A
 * numeric key reads the answer with `readNumberAnswer` in the delivery
 * language and compares its exact value, so an unreadable or empty answer
 * never matches.
 */
export function matchesAnswerKey(
  key: QuestionAnswerKey,
  answer: string,
  language: AppLocaleCode
) {
  if (key.kind === "text") {
    const typed = normalizeTextAnswer(answer, key);
    return key.acceptedAnswers.some(
      (accepted) => normalizeTextAnswer(accepted, key) === typed
    );
  }
  return Option.exists(readNumberAnswer(answer, language), (number) =>
    matchesNumberKey(key, number)
  );
}

/** Copies accepted answers while keeping their non-empty tuple type. */
function canonicalAcceptedAnswers(
  answers: readonly [string, ...string[]]
): [string, ...string[]] {
  const [first, ...rest] = answers;
  return [first, ...rest];
}

/** Returns one answer key in stable field order for signed canonicalizers. */
export function canonicalQuestionAnswerKey(key: QuestionAnswerKey) {
  if (key.kind === "text") {
    return {
      acceptedAnswers: canonicalAcceptedAnswers(key.acceptedAnswers),
      collapseWhitespace: key.collapseWhitespace,
      ignoreCase: key.ignoreCase,
      kind: key.kind,
    };
  }
  return {
    acceptsFractions: key.acceptsFractions,
    kind: key.kind,
    ...(key.tolerance === undefined
      ? {}
      : {
          tolerance: {
            kind: key.tolerance.kind,
            value: key.tolerance.value,
          },
        }),
    value: key.value,
  };
}

/**
 * Returns the grading rules shared by every delivery language. A numeric key is
 * language-neutral and stays whole; text keeps its rules but drops accepted
 * answers, which each delivery language writes in its own words.
 */
export function canonicalQuestionAnswerKeyStructure(key: QuestionAnswerKey) {
  if (key.kind === "text") {
    return {
      collapseWhitespace: key.collapseWhitespace,
      ignoreCase: key.ignoreCase,
      kind: key.kind,
    };
  }
  return canonicalQuestionAnswerKey(key);
}
