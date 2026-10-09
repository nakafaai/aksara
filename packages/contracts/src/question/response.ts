import { Array as Arr, HashSet, Schema } from "effect";

import {
  canonicalQuestionAnswerKey,
  canonicalQuestionAnswerKeyStructure,
  QuestionAnswerKeySchema,
} from "#contracts/question/answer";
import { QuestionResponseLabelSchema } from "#contracts/question/label";
import {
  canonicalQuestionRubric,
  canonicalQuestionRubricStructure,
  QuestionRubricResponseSchema,
} from "#contracts/question/rubric";

const OPTION_KEY_PATTERN = /^option-[1-9]\d*$/u;
const CATEGORY_KEY_PATTERN = /^category-[1-9]\d*$/u;
const STATEMENT_KEY_PATTERN = /^statement-[1-9]\d*$/u;
const PositiveOrderSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);

/**
 * Response formats supported by one assessment item. `short-answer` grades one
 * typed number or text deterministically, and `rubric` scores an open response
 * per criterion.
 */
export const QuestionResponseKindSchema = Schema.Literals([
  "category",
  "multiple-choice",
  "rubric",
  "short-answer",
  "single-choice",
]);
export type QuestionResponseKind = typeof QuestionResponseKindSchema.Type;

/** One option of a single or multiple choice response, keyed by its identity. */
export const QuestionOptionSchema = Schema.Struct({
  isCorrect: Schema.Boolean,
  label: QuestionResponseLabelSchema,
  optionKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(OPTION_KEY_PATTERN))
  ),
  order: PositiveOrderSchema,
});
type QuestionOption = typeof QuestionOptionSchema.Type;

/** Checks stable option identities, order, and format-specific correctness. */
function hasCanonicalOptions(
  options: readonly QuestionOption[],
  kind: "multiple-choice" | "single-choice"
) {
  const correct = Arr.filter(options, ({ isCorrect }) => isCorrect).length;
  return (
    options.length >= 2 &&
    Arr.every(
      options,
      ({ optionKey, order }, index) =>
        order === index + 1 && optionKey === `option-${order}`
    ) &&
    (kind === "single-choice"
      ? correct === 1
      : correct >= 2 && correct < options.length)
  );
}

const SingleChoiceResponseSchema = Schema.Struct({
  kind: Schema.Literal("single-choice"),
  options: Schema.Array(QuestionOptionSchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ options }) => hasCanonicalOptions(options, "single-choice"),
      {
        message:
          "Single-choice responses require canonical options and one correct answer.",
      }
    )
  )
);

const MultipleChoiceResponseSchema = Schema.Struct({
  kind: Schema.Literal("multiple-choice"),
  options: Schema.Array(QuestionOptionSchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ options }) => hasCanonicalOptions(options, "multiple-choice"),
      {
        message:
          "Multiple-choice responses require canonical options, several correct answers, and one distractor.",
      }
    )
  )
);

/** One named category of a category response, keyed by its identity. */
export const QuestionCategorySchema = Schema.Struct({
  categoryKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(CATEGORY_KEY_PATTERN))
  ),
  label: QuestionResponseLabelSchema,
  order: PositiveOrderSchema,
});

/** One statement classified into one category, keyed by its identity. */
export const QuestionCategoryStatementSchema = Schema.Struct({
  correctCategoryKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(CATEGORY_KEY_PATTERN))
  ),
  label: QuestionResponseLabelSchema,
  order: PositiveOrderSchema,
  statementKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(STATEMENT_KEY_PATTERN))
  ),
});

/** Checks stable category and statement identities plus valid references. */
function hasCanonicalCategories(input: {
  readonly categories: readonly Pick<
    typeof QuestionCategorySchema.Type,
    "categoryKey" | "order"
  >[];
  readonly statements: readonly Pick<
    typeof QuestionCategoryStatementSchema.Type,
    "correctCategoryKey" | "order" | "statementKey"
  >[];
}) {
  const categoryKeys = HashSet.fromIterable(
    Arr.map(input.categories, ({ categoryKey }) => categoryKey)
  );
  return (
    input.categories.length >= 2 &&
    input.statements.length > 0 &&
    Arr.every(
      input.categories,
      ({ categoryKey, order }, index) =>
        order === index + 1 && categoryKey === `category-${order}`
    ) &&
    Arr.every(
      input.statements,
      ({ correctCategoryKey, order, statementKey }, index) =>
        order === index + 1 &&
        statementKey === `statement-${order}` &&
        HashSet.has(categoryKeys, correctCategoryKey)
    )
  );
}

const CategoryResponseSchema = Schema.Struct({
  categories: Schema.Array(QuestionCategorySchema),
  kind: Schema.Literal("category"),
  statements: Schema.Array(QuestionCategoryStatementSchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalCategories, {
      message:
        "Category responses require canonical categories and classified statements.",
    })
  )
);

/** One typed number or text graded with `matchesAnswerKey` against its key. */
const ShortAnswerResponseSchema = Schema.Struct({
  key: QuestionAnswerKeySchema,
  kind: Schema.Literal("short-answer"),
});

/** Frozen locale-specific response used from publication through review. */
export const QuestionResponseSchema = Schema.Union([
  CategoryResponseSchema,
  MultipleChoiceResponseSchema,
  QuestionRubricResponseSchema,
  ShortAnswerResponseSchema,
  SingleChoiceResponseSchema,
]);
export type QuestionResponse = typeof QuestionResponseSchema.Type;

/**
 * Returns the response identity shared by every delivery language: keys,
 * order, and answer keys without labels or accepted text written in one
 * delivery language. A rubric keeps its labels because each copy carries them
 * in every active app locale.
 */
export function canonicalQuestionResponseStructure(response: QuestionResponse) {
  if (response.kind === "rubric") {
    return canonicalQuestionRubricStructure(response);
  }
  if (response.kind === "short-answer") {
    return {
      key: canonicalQuestionAnswerKeyStructure(response.key),
      kind: response.kind,
    };
  }
  if (response.kind === "category") {
    return {
      categories: Arr.map(response.categories, ({ categoryKey, order }) => ({
        categoryKey,
        order,
      })),
      kind: response.kind,
      statements: Arr.map(
        response.statements,
        ({ correctCategoryKey, order, statementKey }) => ({
          correctCategoryKey,
          order,
          statementKey,
        })
      ),
    };
  }
  return {
    kind: response.kind,
    options: Arr.map(response.options, ({ isCorrect, optionKey, order }) => ({
      isCorrect,
      optionKey,
      order,
    })),
  };
}

/** Returns response facts in stable field order for signed canonicalizers. */
export function canonicalQuestionResponse(response: QuestionResponse) {
  if (response.kind === "rubric") {
    return canonicalQuestionRubric(response);
  }
  if (response.kind === "short-answer") {
    return {
      key: canonicalQuestionAnswerKey(response.key),
      kind: response.kind,
    };
  }
  if (response.kind === "category") {
    return {
      categories: Arr.map(
        response.categories,
        ({ categoryKey, label, order }) => ({
          categoryKey,
          label,
          order,
        })
      ),
      kind: response.kind,
      statements: Arr.map(
        response.statements,
        ({ correctCategoryKey, label, order, statementKey }) => ({
          correctCategoryKey,
          label,
          order,
          statementKey,
        })
      ),
    };
  }
  return {
    kind: response.kind,
    options: Arr.map(
      response.options,
      ({ isCorrect, label, optionKey, order }) => ({
        isCorrect,
        label,
        optionKey,
        order,
      })
    ),
  };
}
