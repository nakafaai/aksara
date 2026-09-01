import { Effect, Schema, Struct } from "effect";
import { ContentAuthorSchema } from "#contracts/content";
import { DateOnlySchema, withPublicationDates } from "#contracts/date";
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

/** One predecessor choice retained only while authenticated rollback needs it. */
const HistoricalQuestionChoiceSchema = Schema.Struct({
  label: Schema.String,
  value: Schema.Boolean,
}).mapFields(Struct.map(Schema.mutableKey));

/** Checks that one predecessor prompt preserves exactly one correct choice. */
function hasExactlyOneCorrectChoice(
  choices: readonly (typeof HistoricalQuestionChoiceSchema.Type)[]
) {
  return choices.filter(({ value }) => value).length === 1;
}

const HistoricalQuestionChoiceListSchema = Schema.Array(
  HistoricalQuestionChoiceSchema
).pipe(
  Schema.mutable,
  Schema.check(
    Schema.makeFilter(hasExactlyOneCorrectChoice, {
      identifier: "HistoricalQuestionChoiceList",
      message: "Expected exactly one correct historical choice.",
    })
  )
);

const HistoricalQuestionMetadataSchema = Schema.Struct({
  authors: Schema.Array(ContentAuthorSchema),
  date: DateOnlySchema,
  title: Schema.String,
});

const HistoricalQuestionProjectionFields = {
  kind: Schema.Literal("question-body"),
  metadata: HistoricalQuestionMetadataSchema,
};

const HistoricalQuestionPromptProjectionSchema =
  QuestionPromptIdentitySchema.mapFields(
    (fields) => ({
      ...fields,
      ...HistoricalQuestionProjectionFields,
      choices: HistoricalQuestionChoiceListSchema,
    }),
    { unsafePreserveChecks: true }
  );

const HistoricalQuestionAnswerProjectionSchema =
  QuestionAnswerIdentitySchema.mapFields(
    (fields) => ({ ...fields, ...HistoricalQuestionProjectionFields }),
    { unsafePreserveChecks: true }
  );

/**
 * Exact predecessor Question bytes retained for authenticated rollback reads.
 * Delete only after two accepted scoped rebuilds and an authoritative
 * current/prior audit reports zero `choices` and `date` projections.
 */
export const HistoricalQuestionBodyProjectionSchema = Schema.Union([
  HistoricalQuestionPromptProjectionSchema,
  HistoricalQuestionAnswerProjectionSchema,
]);
export type HistoricalQuestionBodyProjection =
  typeof HistoricalQuestionBodyProjectionSchema.Type;

/** Current Question values plus exact predecessor rollback bytes. */
export const ReadableQuestionBodyProjectionSchema = Schema.Union([
  QuestionBodyProjectionSchema,
  HistoricalQuestionBodyProjectionSchema,
]);
export type ReadableQuestionBodyProjection =
  typeof ReadableQuestionBodyProjectionSchema.Type;

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

/** Preserves the exact response fields owned by each readable prompt format. */
function canonicalQuestionBody(projection: ReadableQuestionBodyProjection) {
  if (projection.bodyKind === "answer") {
    return {};
  }
  if ("response" in projection) {
    return { response: canonicalQuestionResponse(projection.response) };
  }
  return {
    choices: projection.choices.map(({ label, value }) => ({ label, value })),
  };
}

/** Serializes one question projection with stable signed field order. */
export function canonicalizeQuestionProjection(
  projection: ReadableQuestionBodyProjection
) {
  const body = canonicalQuestionBody(projection);
  const metadata =
    "date" in projection.metadata
      ? {
          authors: projection.metadata.authors.map(({ name }) => ({ name })),
          date: projection.metadata.date,
          title: projection.metadata.title,
        }
      : {
          authors: projection.metadata.authors.map(({ name }) => ({ name })),
          ...(projection.metadata.dateModified === undefined
            ? {}
            : { dateModified: projection.metadata.dateModified }),
          datePublished: projection.metadata.datePublished,
          title: projection.metadata.title,
        };
  return JSON.stringify({
    bodyKind: projection.bodyKind,
    ...body,
    artifactLocale: projection.artifactLocale,
    ...(!("blueprint" in projection) || projection.blueprint === undefined
      ? {}
      : { blueprint: canonicalQuestionBlueprint(projection.blueprint) }),
    contentKey: projection.contentKey,
    kind: projection.kind,
    metadata,
    peerContentKey: projection.peerContentKey,
    questionKey: projection.questionKey,
    questionNumber: projection.questionNumber,
    setKey: projection.setKey,
    ...(!("stimulusKey" in projection) || projection.stimulusKey === undefined
      ? {}
      : { stimulusKey: projection.stimulusKey }),
  });
}
