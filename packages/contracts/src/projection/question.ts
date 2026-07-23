import { Schema } from "effect";
import { ContentAuthorSchema, ContentLocaleSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";
import { ContentKeySchema } from "#contracts/ids";

const QUESTION_KEY_PATTERN =
  /^question-bank\/tryout\/indonesia\/(?:snbt|tka)\/[a-z0-9]+(?:-[a-z0-9]+)*\/set-[1-9]\d*\/question-[1-9]\d*$/u;
const QUESTION_SET_PATTERN =
  /^question-bank\/tryout\/indonesia\/(?:snbt|tka)\/[a-z0-9]+(?:-[a-z0-9]+)*\/set-[1-9]\d*$/u;

/** Stable logical identity shared by every locale and body of one question. */
export const QuestionKeySchema = Schema.String.pipe(
  Schema.maxLength(512),
  Schema.pattern(QUESTION_KEY_PATTERN),
  Schema.brand("@NakafaAI/AksaraQuestionKey")
);
export type QuestionKey = typeof QuestionKeySchema.Type;

/** Stable logical identity shared by every question within one authored set. */
export const QuestionSetKeySchema = Schema.String.pipe(
  Schema.maxLength(512),
  Schema.pattern(QUESTION_SET_PATTERN),
  Schema.brand("@NakafaAI/AksaraQuestionSetKey")
);
export type QuestionSetKey = typeof QuestionSetKeySchema.Type;

/** Authored MDX body roles carried by each localized question. */
export const QuestionBodyKindSchema = Schema.Literal("question", "answer");
export type QuestionBodyKind = typeof QuestionBodyKindSchema.Type;

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
  contentKey: ContentKeySchema,
  kind: Schema.Literal("question-body"),
  locale: ContentLocaleSchema,
  metadata: QuestionMetadataSchema,
  peerContentKey: ContentKeySchema,
  questionKey: QuestionKeySchema,
  questionNumber: Schema.Number.pipe(Schema.int(), Schema.positive()),
  setKey: QuestionSetKeySchema,
};

/** Checks logical question, body, peer, set, and numeric identities together. */
function hasCoherentQuestionIdentity(input: {
  readonly bodyKind: QuestionBodyKind;
  readonly contentKey: string;
  readonly peerContentKey: string;
  readonly questionKey: string;
  readonly questionNumber: number;
  readonly setKey: string;
}) {
  const expectedQuestionKey = `${input.setKey}/question-${input.questionNumber}`;
  const peerKind = input.bodyKind === "question" ? "answer" : "question";
  return (
    input.questionKey === expectedQuestionKey &&
    input.contentKey === `${input.questionKey}/${input.bodyKind}` &&
    input.peerContentKey === `${input.questionKey}/${peerKind}`
  );
}

/** Published body and localized choices for one authored question prompt. */
export const QuestionPromptProjectionSchema = Schema.Struct({
  ...QuestionProjectionFields,
  bodyKind: Schema.Literal("question"),
  choices: QuestionChoiceListSchema,
}).pipe(
  Schema.filter(hasCoherentQuestionIdentity, {
    message: () =>
      "Expected question body, peer, set, and number identities to agree.",
  })
);
export type QuestionPromptProjection =
  typeof QuestionPromptProjectionSchema.Type;

/** Published body for one entitled answer without duplicated choices. */
export const QuestionAnswerProjectionSchema = Schema.Struct({
  ...QuestionProjectionFields,
  bodyKind: Schema.Literal("answer"),
}).pipe(
  Schema.filter(hasCoherentQuestionIdentity, {
    message: () =>
      "Expected answer body, peer, set, and number identities to agree.",
  })
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
    kind: "question-body" as const,
    locale: input.locale,
    metadata: input.metadata,
    peerContentKey: input.peerContentKey,
    questionKey: input.questionKey,
    questionNumber: input.questionNumber,
    setKey: input.setKey,
  };
  if (input.bodyKind === "question") {
    return QuestionPromptProjectionSchema.make({
      ...common,
      bodyKind: "question",
      choices: input.choices[input.locale],
    });
  }
  return QuestionAnswerProjectionSchema.make({
    ...common,
    bodyKind: "answer",
  });
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
