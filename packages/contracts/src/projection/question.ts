import { Schema } from "effect";
import { ContentAuthorSchema, ContentLocaleSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";
import type { ContentKeySchema } from "#contracts/ids";
import {
  QuestionAnswerIdentitySchema,
  type QuestionBodyKind,
  type QuestionKey,
  QuestionPromptIdentitySchema,
  type QuestionSetKey,
} from "#contracts/question/identity";

/** One literal answer choice preserved from a reviewed authoring module. */
export const QuestionChoiceSchema = Schema.Struct({
  label: Schema.String,
  value: Schema.Boolean,
}).pipe(Schema.mutable);
export type QuestionChoice = typeof QuestionChoiceSchema.Type;

/** Reports whether a localized choice list has exactly one correct answer. */
function hasExactlyOneCorrectChoice(choices: readonly QuestionChoice[]) {
  return choices.filter(({ value }) => value).length === 1;
}

/** Canonical choices for one projected question locale. */
export const QuestionChoiceListSchema = Schema.Array(QuestionChoiceSchema).pipe(
  Schema.mutable,
  Schema.filter(hasExactlyOneCorrectChoice, {
    identifier: "QuestionChoiceList",
    message: () => "Expected exactly one correct choice.",
  })
);
export type QuestionChoiceList = typeof QuestionChoiceListSchema.Type;

/** Localized single-answer choices required for every supported locale. */
export const QuestionChoicesSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: QuestionChoiceListSchema,
}).pipe(Schema.mutable);
export type QuestionChoices = typeof QuestionChoicesSchema.Type;

/** Exact metadata authored by every current question and answer body. */
export const QuestionMetadataSchema = Schema.Struct({
  authors: Schema.Array(ContentAuthorSchema),
  date: DateOnlySchema,
  title: Schema.String,
});
export type QuestionMetadata = typeof QuestionMetadataSchema.Type;

const QuestionProjectionFields = {
  kind: Schema.Literal("question-body"),
  metadata: QuestionMetadataSchema,
};

/** Published body and localized choices for one authored question prompt. */
export const QuestionPromptProjectionSchema = Schema.extend(
  QuestionPromptIdentitySchema,
  Schema.Struct({
    ...QuestionProjectionFields,
    choices: QuestionChoiceListSchema,
  })
);
export type QuestionPromptProjection =
  typeof QuestionPromptProjectionSchema.Type;

/** Published body for one entitled answer without duplicated choices. */
export const QuestionAnswerProjectionSchema = Schema.extend(
  QuestionAnswerIdentitySchema,
  Schema.Struct(QuestionProjectionFields)
);
export type QuestionAnswerProjection =
  typeof QuestionAnswerProjectionSchema.Type;

/** Complete non-route projection vocabulary for question-bank MDX bodies. */
export const QuestionBodyProjectionSchema = Schema.Union(
  QuestionPromptProjectionSchema,
  QuestionAnswerProjectionSchema
);
export type QuestionBodyProjection = typeof QuestionBodyProjectionSchema.Type;

/** Builds one strictly bound question or answer projection from authored facts. */
export function makeQuestionBodyProjection(input: {
  readonly bodyKind: QuestionBodyKind;
  readonly choices: QuestionChoices;
  readonly contentKey: typeof ContentKeySchema.Type;
  readonly locale: typeof ContentLocaleSchema.Type;
  readonly metadata: QuestionMetadata;
  readonly peerContentKey: typeof ContentKeySchema.Type;
  readonly questionKey: QuestionKey;
  readonly questionNumber: number;
  readonly setKey: QuestionSetKey;
}) {
  const common = {
    bodyKind: input.bodyKind,
    contentKey: input.contentKey,
    locale: input.locale,
    metadata: input.metadata,
    peerContentKey: input.peerContentKey,
    questionKey: input.questionKey,
    questionNumber: input.questionNumber,
    setKey: input.setKey,
  };
  if (input.bodyKind === "question") {
    return {
      ...common,
      bodyKind: "question",
      choices: input.choices[input.locale],
      kind: "question-body",
    } satisfies QuestionPromptProjection;
  }
  return {
    ...common,
    bodyKind: "answer",
    kind: "question-body",
  } satisfies QuestionAnswerProjection;
}

/** Serializes one question projection with stable signed field order. */
export function canonicalizeQuestionProjection(
  projection: QuestionBodyProjection
) {
  return JSON.stringify({
    bodyKind: projection.bodyKind,
    ...(projection.bodyKind === "question"
      ? {
          choices: projection.choices.map(({ label, value }) => ({
            label,
            value,
          })),
        }
      : {}),
    contentKey: projection.contentKey,
    kind: projection.kind,
    locale: projection.locale,
    metadata: {
      authors: projection.metadata.authors.map(({ name }) => ({ name })),
      date: projection.metadata.date,
      title: projection.metadata.title,
    },
    peerContentKey: projection.peerContentKey,
    questionKey: projection.questionKey,
    questionNumber: projection.questionNumber,
    setKey: projection.setKey,
  });
}
