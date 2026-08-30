import { Effect, Schema, Struct } from "effect";

import {
  AppLocaleCodeSchema,
  ArtifactLocaleSchema,
  artifactLocaleCode,
} from "#contracts/locale";
import {
  type QuestionResponseContent,
  QuestionResponseContentSchema,
  QuestionResponseSchema,
} from "#contracts/question/response";
import { TryoutKeySchema } from "#contracts/tryout/key";

const PositiveOrderSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);

/** One source-authored option before stable runtime identities are derived. */
const QuestionOptionSourceSchema = Schema.Struct({
  isCorrect: Schema.Boolean,
  label: QuestionResponseContentSchema,
}).mapFields(Struct.map(Schema.mutableKey));

type QuestionOptionSource = typeof QuestionOptionSourceSchema.Type;

/** Requires enough options to present one meaningful choice interaction. */
function hasAtLeastTwoOptions(options: readonly QuestionOptionSource[]) {
  return options.length >= 2;
}

/** Requires exactly one authored option to carry correctness. */
function hasOneCorrectOption(options: readonly QuestionOptionSource[]) {
  return options.filter(({ isCorrect }) => isCorrect).length === 1;
}

/** Requires several correct options while retaining at least one distractor. */
function hasSeveralCorrectOptions(options: readonly QuestionOptionSource[]) {
  const correct = options.filter(({ isCorrect }) => isCorrect).length;
  return correct >= 2 && correct < options.length;
}

const QuestionOptionSourceListSchema = Schema.Array(
  QuestionOptionSourceSchema
).pipe(
  Schema.mutable,
  Schema.check(
    Schema.makeFilter(hasAtLeastTwoOptions, {
      message: "Expected at least two response options.",
    })
  )
);

const SingleChoiceResponseSourceSchema = Schema.Struct({
  kind: Schema.Literal("single-choice"),
  options: QuestionOptionSourceListSchema.pipe(
    Schema.check(
      Schema.makeFilter(hasOneCorrectOption, {
        message: "Single-choice responses require one correct option.",
      })
    )
  ),
}).mapFields(Struct.map(Schema.mutableKey));

const MultipleChoiceResponseSourceSchema = Schema.Struct({
  kind: Schema.Literal("multiple-choice"),
  options: QuestionOptionSourceListSchema.pipe(
    Schema.check(
      Schema.makeFilter(hasSeveralCorrectOptions, {
        message:
          "Multiple-choice responses require several correct options and one distractor.",
      })
    )
  ),
}).mapFields(Struct.map(Schema.mutableKey));

const CategoryStatementSourceSchema = Schema.Struct({
  correctCategoryOrder: PositiveOrderSchema,
  label: QuestionResponseContentSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/** Checks category cardinality and every statement's category reference. */
function hasCoherentCategoryResponse(input: {
  readonly categories: readonly QuestionResponseContent[];
  readonly statements: readonly { readonly correctCategoryOrder: number }[];
}) {
  return (
    input.categories.length >= 2 &&
    input.statements.length > 0 &&
    input.statements.every(
      ({ correctCategoryOrder }) =>
        correctCategoryOrder <= input.categories.length
    )
  );
}

const CategoryResponseSourceSchema = Schema.Struct({
  categories: Schema.Array(QuestionResponseContentSchema).pipe(Schema.mutable),
  kind: Schema.Literal("category"),
  statements: Schema.Array(CategoryStatementSourceSchema).pipe(Schema.mutable),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .pipe(
    Schema.check(
      Schema.makeFilter(hasCoherentCategoryResponse, {
        message:
          "Category responses require at least two categories and classified statements.",
      })
    )
  );

/** One locale-specific response authored without duplicated runtime keys. */
export const QuestionResponseSourceSchema = Schema.Union([
  CategoryResponseSourceSchema,
  MultipleChoiceResponseSourceSchema,
  SingleChoiceResponseSourceSchema,
]);
export type QuestionResponseSource = typeof QuestionResponseSourceSchema.Type;

const QuestionResponseSourceMapSchema = Schema.Record(
  AppLocaleCodeSchema,
  Schema.optional(QuestionResponseSourceSchema)
);

/** Editorial blueprint coordinates used to prove assessment coverage. */
export const QuestionBlueprintSchema = Schema.Struct({
  cognitiveLevel: TryoutKeySchema,
  contentDomain: TryoutKeySchema,
  topic: TryoutKeySchema,
});
export type QuestionBlueprint = typeof QuestionBlueprintSchema.Type;

/** Serializes response shape and answer-key positions for locale comparison. */
function responseStructure(response: QuestionResponseSource) {
  if (response.kind === "category") {
    return JSON.stringify({
      categories: response.categories.length,
      kind: response.kind,
      statements: response.statements.map(
        ({ correctCategoryOrder }) => correctCategoryOrder
      ),
    });
  }
  return JSON.stringify({
    correctness: response.options.map(({ isCorrect }) => isCorrect),
    kind: response.kind,
  });
}

/** Requires locale siblings to preserve one response format and answer key. */
function hasCoherentLocalizedResponses(input: {
  readonly responses: {
    readonly de?: QuestionResponseSource | undefined;
    readonly en?: QuestionResponseSource | undefined;
    readonly id?: QuestionResponseSource | undefined;
  };
}) {
  const responses = Object.values(input.responses).filter(
    (response) => response !== undefined
  );
  const [first] = responses;
  return (
    first !== undefined &&
    responses.every(
      (response) => responseStructure(response) === responseStructure(first)
    )
  );
}

/** Complete source-owned item, including optional shared-stimulus identity. */
export const QuestionItemSchema = Schema.Struct({
  blueprint: Schema.optionalKey(QuestionBlueprintSchema),
  responses: QuestionResponseSourceMapSchema,
  stimulusKey: Schema.optionalKey(TryoutKeySchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentLocalizedResponses, {
      message:
        "Localized responses must preserve one format, structure, and answer key.",
    })
  )
);
export type QuestionItem = typeof QuestionItemSchema.Type;

/** Returns blueprint facts in stable field order for signed canonicalizers. */
export function canonicalQuestionBlueprint(blueprint: QuestionBlueprint) {
  return {
    cognitiveLevel: blueprint.cognitiveLevel,
    contentDomain: blueprint.contentDomain,
    topic: blueprint.topic,
  };
}

/** One item does not contain the exact artifact locale it must assess. */
export class QuestionResponseLocaleMissingError extends Schema.TaggedError<QuestionResponseLocaleMissingError>()(
  "QuestionResponseLocaleMissingError",
  { artifactLocale: ArtifactLocaleSchema }
) {}

/** Derives stable option keys and orders from source-authored array order. */
function freezeOptions(options: readonly QuestionOptionSource[]) {
  return options.map(({ isCorrect, label }, index) => ({
    isCorrect,
    label,
    optionKey: `option-${index + 1}`,
    order: index + 1,
  }));
}

/** Resolves and freezes one exact-locale response from an authored item. */
export const questionResponseFor = Effect.fn(
  "AksaraContracts.questionResponseFor"
)(function* (
  item: QuestionItem,
  artifactLocale: typeof ArtifactLocaleSchema.Type
) {
  const response = item.responses[artifactLocaleCode(artifactLocale)];
  if (response === undefined) {
    return yield* new QuestionResponseLocaleMissingError({ artifactLocale });
  }
  if (response.kind !== "category") {
    return QuestionResponseSchema.make({
      kind: response.kind,
      options: freezeOptions(response.options),
    });
  }
  return QuestionResponseSchema.make({
    categories: response.categories.map((label, index) => ({
      categoryKey: `category-${index + 1}`,
      label,
      order: index + 1,
    })),
    kind: response.kind,
    statements: response.statements.map(
      ({ correctCategoryOrder, label }, index) => ({
        correctCategoryKey: `category-${correctCategoryOrder}`,
        label,
        order: index + 1,
        statementKey: `statement-${index + 1}`,
      })
    ),
  });
});
