import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import {
  CONTENT_KEY_MAX_LENGTH,
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "#contracts/ids";
import { TryoutKeySchema } from "#contracts/tryout/key";

/** Stable namespace shared by every try-out question-bank identity. */
export const QUESTION_BANK_KEY_ROOT = "question-bank/tryout";

const QUESTION_NUMBER_PATTERN = /^question-[1-9]\d*$/u;
const QUESTION_SEGMENT_PREFIX = "question-";
const MAX_QUESTION_KEY_LENGTH = CONTENT_KEY_MAX_LENGTH - "/question".length;
const MAX_QUESTION_SET_KEY_LENGTH =
  MAX_QUESTION_KEY_LENGTH - "/question-1".length;
const isTryoutKey = Schema.is(TryoutKeySchema);

/** Checks that one canonical question number stays a safe integer. */
function hasSafeQuestionNumber(segment: string) {
  return Number.isSafeInteger(
    Number(segment.slice(QUESTION_SEGMENT_PREFIX.length))
  );
}

/** Canonical terminal directory identity for one numbered question. */
export const QuestionSegmentSchema = Schema.String.pipe(
  Schema.pattern(QUESTION_NUMBER_PATTERN),
  Schema.filter(hasSafeQuestionNumber)
);
const isQuestionSegment = Schema.is(QuestionSegmentSchema);

/** Authored MDX body roles carried by each localized question. */
export const QuestionBodyKindSchema = Schema.Literal("question", "answer");
export type QuestionBodyKind = typeof QuestionBodyKindSchema.Type;

/** Generic hierarchy derived from one canonical try-out question set. */
export const QuestionSetPartsSchema = Schema.Struct({
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
  intermediateBankKeys: Schema.Array(TryoutKeySchema),
  sectionKey: TryoutKeySchema,
  setKey: TryoutKeySchema,
});
export type QuestionSetParts = typeof QuestionSetPartsSchema.Type;

/** Generic hierarchy and authored order derived from one question key. */
export const QuestionKeyPartsSchema = Schema.Struct({
  ...QuestionSetPartsSchema.fields,
  questionNumber: Schema.Number.pipe(Schema.int(), Schema.positive()),
});
export type QuestionKeyParts = typeof QuestionKeyPartsSchema.Type;

/** Parses the protocol root plus generic country, exam, and set hierarchy. */
function parseQuestionSetParts(input: string): QuestionSetParts | undefined {
  const prefix = `${QUESTION_BANK_KEY_ROOT}/`;
  if (!input.startsWith(prefix)) {
    return;
  }
  const keys = input.slice(prefix.length).split("/");
  if (
    keys.length < 4 ||
    keys.some((key) => !isTryoutKey(key) || isQuestionSegment(key))
  ) {
    return;
  }
  return Schema.decodeUnknownSync(QuestionSetPartsSchema)({
    countryKey: keys.at(0),
    examKey: keys.at(1),
    intermediateBankKeys: keys.slice(2, -2),
    sectionKey: keys.at(-2),
    setKey: keys.at(-1),
  });
}

/** Parses one numbered question beneath a structurally valid set identity. */
function parseQuestionKeyParts(input: string): QuestionKeyParts | undefined {
  const separator = input.lastIndexOf("/");
  if (separator === -1) {
    return;
  }
  const question = input.slice(separator + 1);
  const setParts = parseQuestionSetParts(input.slice(0, separator));
  if (!isQuestionSegment(question) || setParts === undefined) {
    return;
  }
  return {
    ...setParts,
    questionNumber: Number(question.slice(QUESTION_SEGMENT_PREFIX.length)),
  };
}

/** Stable logical identity shared by every locale and body of one question. */
export const QuestionKeySchema = Schema.String.pipe(
  Schema.maxLength(MAX_QUESTION_KEY_LENGTH),
  Schema.filter((input) => parseQuestionKeyParts(input) !== undefined, {
    identifier: "QuestionKey",
    message: () => "Invalid try-out question key.",
  }),
  Schema.brand("@NakafaAI/AksaraQuestionKey")
);
export type QuestionKey = typeof QuestionKeySchema.Type;

/** Stable logical identity shared by every question within one authored set. */
export const QuestionSetKeySchema = Schema.String.pipe(
  Schema.maxLength(MAX_QUESTION_SET_KEY_LENGTH),
  Schema.filter((input) => parseQuestionSetParts(input) !== undefined, {
    identifier: "QuestionSetKey",
    message: () => "Invalid try-out question-set key.",
  }),
  Schema.brand("@NakafaAI/AksaraQuestionSetKey")
);
export type QuestionSetKey = typeof QuestionSetKeySchema.Type;

/** Derives the renderer-owned bank identity above one authored set. */
export function questionBankKey(questionSetKey: QuestionSetKey) {
  return questionSetKey.slice(0, questionSetKey.lastIndexOf("/"));
}

/** Derives generic country, exam, bank, section, and set identities. */
export function questionSetKeyParts(questionSetKey: QuestionSetKey) {
  return Schema.decodeUnknownSync(QuestionSetPartsSchema)(
    parseQuestionSetParts(questionSetKey)
  );
}

/** Derives the parent hierarchy and safe authored order from one question. */
export function questionKeyParts(questionKey: QuestionKey) {
  const parts = Schema.decodeUnknownSync(QuestionKeyPartsSchema)(
    parseQuestionKeyParts(questionKey)
  );
  const separator = questionKey.lastIndexOf("/");
  return {
    ...parts,
    questionSetKey: QuestionSetKeySchema.make(questionKey.slice(0, separator)),
  };
}

const QuestionSourceFields = {
  ...QuestionKeyPartsSchema.fields,
  questionKey: QuestionKeySchema,
  sourcePath: CorpusSourcePathSchema,
};

/** Complete physical MDX source identity derived from one question body. */
export const QuestionBodySourcePartsSchema = Schema.Struct({
  ...QuestionSourceFields,
  bodyKind: QuestionBodyKindSchema,
  contentKey: ContentKeySchema,
  kind: Schema.Literal("body"),
  locale: ContentLocaleSchema,
});

/** Complete physical TypeScript source identity for one choice registry. */
export const QuestionChoiceSourcePartsSchema = Schema.Struct({
  ...QuestionSourceFields,
  kind: Schema.Literal("choices"),
});

/** Every direct authored source accepted inside one question directory. */
export const QuestionSourcePartsSchema = Schema.Union(
  QuestionBodySourcePartsSchema,
  QuestionChoiceSourcePartsSchema
);
export type QuestionSourceParts = typeof QuestionSourcePartsSchema.Type;

/** Parses one exact body or choice source below the question corpus. */
function parseQuestionSourceParts(
  input: string
): QuestionSourceParts | undefined {
  const corpusPrefix = "packages/corpus/";
  const fileSeparator = input.lastIndexOf("/");
  const questionKey = input.slice(corpusPrefix.length, fileSeparator);
  const questionParts = parseQuestionKeyParts(questionKey);
  if (
    questionParts === undefined ||
    !Schema.is(QuestionKeySchema)(questionKey)
  ) {
    return;
  }
  const sourceFile = input.slice(fileSeparator + 1);
  if (sourceFile === "choices.ts") {
    return Schema.decodeUnknownSync(QuestionChoiceSourcePartsSchema)({
      ...questionParts,
      kind: "choices",
      questionKey,
      sourcePath: input,
    });
  }
  const extension = ".mdx";
  if (!sourceFile.endsWith(extension)) {
    return;
  }
  const fileStem = sourceFile.slice(0, -extension.length);
  const localeSeparator = fileStem.lastIndexOf(".");
  if (localeSeparator === -1) {
    return;
  }
  const bodyKind = fileStem.slice(0, localeSeparator);
  const locale = fileStem.slice(localeSeparator + 1);
  if (
    !(
      Schema.is(QuestionBodyKindSchema)(bodyKind) &&
      Schema.is(ContentLocaleSchema)(locale)
    )
  ) {
    return;
  }
  return Schema.decodeUnknownSync(QuestionBodySourcePartsSchema)({
    ...questionParts,
    bodyKind,
    contentKey: `${questionKey}/${bodyKind}`,
    kind: "body",
    locale,
    questionKey,
    sourcePath: input,
  });
}

/** Exact direct authored source path below one Aksara question directory. */
export const QuestionSourcePathSchema = CorpusSourcePathSchema.pipe(
  Schema.filter((input) => parseQuestionSourceParts(input) !== undefined, {
    message: () => "Invalid try-out question source path.",
  }),
  Schema.brand("@NakafaAI/AksaraQuestionSourcePath")
);
export type QuestionSourcePath = typeof QuestionSourcePathSchema.Type;

/** Derives every logical identity from one validated physical source path. */
export function questionSourcePathParts(sourcePath: QuestionSourcePath) {
  return Schema.decodeUnknownSync(QuestionSourcePartsSchema)(
    parseQuestionSourceParts(sourcePath)
  );
}

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
