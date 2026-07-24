import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
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

const QuestionIdentityFields = {
  contentKey: ContentKeySchema,
  locale: ContentLocaleSchema,
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

/** Exact stable identity carried by one localized question prompt. */
export const QuestionPromptIdentitySchema = Schema.Struct({
  ...QuestionIdentityFields,
  bodyKind: Schema.Literal("question"),
}).pipe(
  Schema.filter(hasCoherentQuestionIdentity, {
    message: () =>
      "Expected question body, peer, set, and number identities to agree.",
  })
);
export type QuestionPromptIdentity = typeof QuestionPromptIdentitySchema.Type;

/** Exact stable identity carried by one localized entitled answer. */
export const QuestionAnswerIdentitySchema = Schema.Struct({
  ...QuestionIdentityFields,
  bodyKind: Schema.Literal("answer"),
}).pipe(
  Schema.filter(hasCoherentQuestionIdentity, {
    message: () =>
      "Expected answer body, peer, set, and number identities to agree.",
  })
);
export type QuestionAnswerIdentity = typeof QuestionAnswerIdentitySchema.Type;

/** Complete prompt and answer identity vocabulary for question bodies. */
export const QuestionBodyIdentitySchema = Schema.Union(
  QuestionPromptIdentitySchema,
  QuestionAnswerIdentitySchema
);
export type QuestionBodyIdentity = typeof QuestionBodyIdentitySchema.Type;
