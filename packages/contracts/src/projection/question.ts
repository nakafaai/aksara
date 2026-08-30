import { Effect, Schema } from "effect";
import { ContentAuthorSchema } from "#contracts/content";
import { withPublicationDates } from "#contracts/date";
import type { ContentKeySchema } from "#contracts/ids";
import type { ArtifactLocaleSchema } from "#contracts/locale";
import {
  QuestionAnswerIdentitySchema,
  type QuestionBodyKind,
  type QuestionKey,
  QuestionPromptIdentitySchema,
  type QuestionSetKey,
} from "#contracts/question/identity";
import {
  canonicalQuestionBlueprint,
  QuestionBlueprintSchema,
  type QuestionItem,
  questionResponseFor,
} from "#contracts/question/item";
import {
  canonicalQuestionResponse,
  QuestionResponseSchema,
} from "#contracts/question/response";
import { TryoutKeySchema } from "#contracts/tryout/key";

/** Exact metadata authored by every current question and answer body. */
export const QuestionMetadataSchema = withPublicationDates({
  authors: Schema.Array(ContentAuthorSchema),
  title: Schema.String,
});
export type QuestionMetadata = typeof QuestionMetadataSchema.Type;

const QuestionProjectionFields = {
  blueprint: Schema.optionalKey(QuestionBlueprintSchema),
  kind: Schema.Literal("question-body"),
  metadata: QuestionMetadataSchema,
  stimulusKey: Schema.optionalKey(TryoutKeySchema),
};

/** Published body and localized response for one authored question prompt. */
export const QuestionPromptProjectionSchema =
  QuestionPromptIdentitySchema.mapFields(
    (fields) => ({
      ...fields,
      ...QuestionProjectionFields,
      response: QuestionResponseSchema,
    }),
    { unsafePreserveChecks: true }
  );
export type QuestionPromptProjection =
  typeof QuestionPromptProjectionSchema.Type;

/** Published body for one entitled answer without a duplicated response. */
export const QuestionAnswerProjectionSchema =
  QuestionAnswerIdentitySchema.mapFields(
    (fields) => ({ ...fields, ...QuestionProjectionFields }),
    { unsafePreserveChecks: true }
  );
export type QuestionAnswerProjection =
  typeof QuestionAnswerProjectionSchema.Type;

/** Complete non-route projection vocabulary for question-bank MDX bodies. */
export const QuestionBodyProjectionSchema = Schema.Union([
  QuestionPromptProjectionSchema,
  QuestionAnswerProjectionSchema,
]);
export type QuestionBodyProjection = typeof QuestionBodyProjectionSchema.Type;

interface QuestionProjectionInput {
  readonly artifactLocale: typeof ArtifactLocaleSchema.Type;
  readonly bodyKind: QuestionBodyKind;
  readonly contentKey: typeof ContentKeySchema.Type;
  readonly item: QuestionItem;
  readonly metadata: QuestionMetadata;
  readonly peerContentKey: typeof ContentKeySchema.Type;
  readonly questionKey: QuestionKey;
  readonly questionNumber: number;
  readonly setKey: QuestionSetKey;
}

/** Shared identity and metadata carried by both question body projections. */
function questionProjectionFields(input: QuestionProjectionInput) {
  return {
    artifactLocale: input.artifactLocale,
    contentKey: input.contentKey,
    metadata: input.metadata,
    peerContentKey: input.peerContentKey,
    questionKey: input.questionKey,
    questionNumber: input.questionNumber,
    setKey: input.setKey,
    ...(input.item.blueprint === undefined
      ? {}
      : { blueprint: input.item.blueprint }),
    ...(input.item.stimulusKey === undefined
      ? {}
      : { stimulusKey: input.item.stimulusKey }),
  };
}

/** Builds one prompt projection with its exact-locale frozen response. */
export const makeQuestionPromptProjection = Effect.fn(
  "AksaraContracts.makeQuestionPromptProjection"
)(function* (
  input: QuestionProjectionInput & { readonly bodyKind: "question" }
) {
  const response = yield* questionResponseFor(input.item, input.artifactLocale);
  return {
    ...questionProjectionFields(input),
    bodyKind: "question",
    kind: "question-body",
    response,
  } satisfies QuestionPromptProjection;
});

/** Builds one answer projection without duplicating the prompt response. */
export function makeQuestionAnswerProjection(
  input: QuestionProjectionInput & { readonly bodyKind: "answer" }
) {
  return {
    ...questionProjectionFields(input),
    bodyKind: "answer",
    kind: "question-body",
  } satisfies QuestionAnswerProjection;
}

/** Builds one strictly bound question or answer projection from authored facts. */
export const makeQuestionBodyProjection = Effect.fn(
  "AksaraContracts.makeQuestionBodyProjection"
)(function* (input: QuestionProjectionInput) {
  if (input.bodyKind === "question") {
    return yield* makeQuestionPromptProjection({
      ...input,
      bodyKind: "question",
    });
  }
  return makeQuestionAnswerProjection({ ...input, bodyKind: "answer" });
});

/** Serializes one question projection with stable signed field order. */
export function canonicalizeQuestionProjection(
  projection: QuestionBodyProjection
) {
  return JSON.stringify({
    bodyKind: projection.bodyKind,
    ...(projection.bodyKind === "question"
      ? {
          response: canonicalQuestionResponse(projection.response),
        }
      : {}),
    artifactLocale: projection.artifactLocale,
    ...(projection.blueprint === undefined
      ? {}
      : { blueprint: canonicalQuestionBlueprint(projection.blueprint) }),
    contentKey: projection.contentKey,
    kind: projection.kind,
    metadata: {
      authors: projection.metadata.authors.map(({ name }) => ({ name })),
      ...(projection.metadata.dateModified === undefined
        ? {}
        : { dateModified: projection.metadata.dateModified }),
      datePublished: projection.metadata.datePublished,
      title: projection.metadata.title,
    },
    peerContentKey: projection.peerContentKey,
    questionKey: projection.questionKey,
    questionNumber: projection.questionNumber,
    setKey: projection.setKey,
    ...(projection.stimulusKey === undefined
      ? {}
      : { stimulusKey: projection.stimulusKey }),
  });
}
