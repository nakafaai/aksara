import { Schema } from "effect";

const OPTION_KEY_PATTERN = /^option-[1-9]\d*$/u;
const CATEGORY_KEY_PATTERN = /^category-[1-9]\d*$/u;
const STATEMENT_KEY_PATTERN = /^statement-[1-9]\d*$/u;
const PositiveOrderSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);

/** Response formats supported by one assessment item. */
export const QuestionResponseKindSchema = Schema.Literals([
  "category",
  "multiple-choice",
  "single-choice",
]);
export type QuestionResponseKind = typeof QuestionResponseKindSchema.Type;

const QuestionOptionSchema = Schema.Struct({
  isCorrect: Schema.Boolean,
  label: Schema.String,
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
  const correct = options.filter(({ isCorrect }) => isCorrect).length;
  return (
    options.length >= 2 &&
    options.every(
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

const QuestionCategorySchema = Schema.Struct({
  categoryKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(CATEGORY_KEY_PATTERN))
  ),
  label: Schema.String,
  order: PositiveOrderSchema,
});

const QuestionCategoryStatementSchema = Schema.Struct({
  correctCategoryKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(CATEGORY_KEY_PATTERN))
  ),
  label: Schema.String,
  order: PositiveOrderSchema,
  statementKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(STATEMENT_KEY_PATTERN))
  ),
});

/** Checks stable category and statement identities plus valid references. */
function hasCanonicalCategories(input: {
  readonly categories: readonly {
    readonly categoryKey: string;
    readonly order: number;
  }[];
  readonly statements: readonly {
    readonly correctCategoryKey: string;
    readonly order: number;
    readonly statementKey: string;
  }[];
}) {
  const categoryKeys = new Set(
    input.categories.map(({ categoryKey }) => categoryKey)
  );
  return (
    input.categories.length >= 2 &&
    input.statements.length > 0 &&
    input.categories.every(
      ({ categoryKey, order }, index) =>
        order === index + 1 && categoryKey === `category-${order}`
    ) &&
    input.statements.every(
      ({ correctCategoryKey, order, statementKey }, index) =>
        order === index + 1 &&
        statementKey === `statement-${order}` &&
        categoryKeys.has(correctCategoryKey)
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

/** Frozen locale-specific response used from publication through review. */
export const QuestionResponseSchema = Schema.Union([
  CategoryResponseSchema,
  MultipleChoiceResponseSchema,
  SingleChoiceResponseSchema,
]);
export type QuestionResponse = typeof QuestionResponseSchema.Type;

/** Returns response facts in stable field order for signed canonicalizers. */
export function canonicalQuestionResponse(response: QuestionResponse) {
  if (response.kind === "category") {
    return {
      categories: response.categories.map(({ categoryKey, label, order }) => ({
        categoryKey,
        label,
        order,
      })),
      kind: response.kind,
      statements: response.statements.map(
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
    options: response.options.map(({ isCorrect, label, optionKey, order }) => ({
      isCorrect,
      label,
      optionKey,
      order,
    })),
  };
}
