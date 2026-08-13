import { Effect, Schema } from "effect";
import { ContentAuthorSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";
import type { ContentKeySchema } from "#contracts/ids";
import {
  AppLocaleCodeSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
} from "#contracts/locale";
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

/** Checks that authored choices cover at least one exact artifact locale. */
function hasChoiceSet(choices: {
  readonly de?: QuestionChoiceList | undefined;
  readonly en?: QuestionChoiceList | undefined;
  readonly id?: QuestionChoiceList | undefined;
}) {
  return Object.values(choices).some((choiceSet) => choiceSet !== undefined);
}

/** Localized single-answer choices available to authored prompts. */
export const QuestionChoicesSchema = Schema.partial(
  Schema.Record({
    key: AppLocaleCodeSchema,
    value: QuestionChoiceListSchema,
  })
).pipe(
  Schema.filter(hasChoiceSet, {
    message: () => "Expected choices for at least one artifact locale.",
  })
);
export type QuestionChoices = typeof QuestionChoicesSchema.Type;

/** Resolves one required choice set for an exact artifact locale. */
function choicesFor(choices: QuestionChoices, artifactLocale: ArtifactLocale) {
  if (artifactLocale === ArtifactLocaleSchema.make("en")) {
    return choices.en;
  }
  if (artifactLocale === ArtifactLocaleSchema.make("id")) {
    return choices.id;
  }
  return choices.de;
}

/** A question prompt has no reviewed choices for its exact artifact locale. */
export class QuestionChoiceLocaleMissingError extends Schema.TaggedError<QuestionChoiceLocaleMissingError>()(
  "QuestionChoiceLocaleMissingError",
  { artifactLocale: ArtifactLocaleSchema }
) {}

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

interface QuestionProjectionInput {
  readonly artifactLocale: typeof ArtifactLocaleSchema.Type;
  readonly bodyKind: QuestionBodyKind;
  readonly choices: QuestionChoices;
  readonly contentKey: typeof ContentKeySchema.Type;
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
  };
}

/** Builds one prompt projection with its required exact-locale choices. */
export const makeQuestionPromptProjection = Effect.fn(
  "AksaraContracts.makeQuestionPromptProjection"
)(function* (
  input: QuestionProjectionInput & { readonly bodyKind: "question" }
) {
  const choices = choicesFor(input.choices, input.artifactLocale);
  if (choices === undefined) {
    return yield* new QuestionChoiceLocaleMissingError({
      artifactLocale: input.artifactLocale,
    });
  }
  return {
    ...questionProjectionFields(input),
    bodyKind: "question",
    choices,
    kind: "question-body",
  } satisfies QuestionPromptProjection;
});

/** Builds one answer projection without duplicating prompt choices. */
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
          choices: projection.choices.map(({ label, value }) => ({
            label,
            value,
          })),
        }
      : {}),
    artifactLocale: projection.artifactLocale,
    contentKey: projection.contentKey,
    kind: projection.kind,
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
