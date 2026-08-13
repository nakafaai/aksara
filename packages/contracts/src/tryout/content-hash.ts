import { createHash } from "node:crypto";
import { Schema } from "effect";
import { DateOnlySchema } from "#contracts/date";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
  DeliveryLanguageSchema,
} from "#contracts/locale";
import { QuestionChoiceListSchema } from "#contracts/projection/question";
import { QuestionKeySchema } from "#contracts/question/identity";
import {
  TryoutContentHashSchema,
  TryoutSourceRevisionSchema,
} from "#contracts/tryout/spec";

const MULTIPLE_NEWLINES = /\n{3,}/gu;

/** Exact authored facts that define one app and delivery-language question. */
export const TryoutContentInputSchema = Schema.Struct({
  answerArtifactLocale: ArtifactLocaleSchema,
  answerBody: Schema.String,
  appLocale: AppLocaleSchema,
  choices: QuestionChoiceListSchema,
  date: DateOnlySchema,
  deliveryLanguage: DeliveryLanguageSchema,
  questionArtifactLocale: ArtifactLocaleSchema,
  questionBody: Schema.String,
  sourcePath: QuestionKeySchema,
  sourceRevision: TryoutSourceRevisionSchema,
}).pipe(
  Schema.filter(
    ({
      answerArtifactLocale,
      appLocale,
      deliveryLanguage,
      questionArtifactLocale,
    }) =>
      String(answerArtifactLocale) === String(appLocale) &&
      String(questionArtifactLocale) === String(deliveryLanguage),
    {
      message: () =>
        "Expected answer locale to match app locale and question locale to match delivery language.",
    }
  )
);
export type TryoutContentInput = typeof TryoutContentInputSchema.Type;

/** Normalizes authored body spacing without changing MDX markup. */
function normalizeBody(body: string) {
  return body.replace(MULTIPLE_NEWLINES, "\n\n").trim();
}

/** Converts one validated date-only value to its UTC midnight epoch. */
function dateEpoch(date: TryoutContentInput["date"]) {
  const year = Number.parseInt(date.slice(0, 4), 10);
  const month = Number.parseInt(date.slice(5, 7), 10);
  const day = Number.parseInt(date.slice(8, 10), 10);
  return Date.UTC(year, month - 1, day);
}

/** Serializes every current question-pair identity field in stable order. */
export function canonicalizeTryoutContent(input: TryoutContentInput) {
  return JSON.stringify({
    answerArtifactLocale: input.answerArtifactLocale,
    answerBody: normalizeBody(input.answerBody),
    appLocale: input.appLocale,
    choices: input.choices.map(({ label, value }) => ({ label, value })),
    date: dateEpoch(input.date),
    deliveryLanguage: input.deliveryLanguage,
    questionArtifactLocale: input.questionArtifactLocale,
    questionBody: normalizeBody(input.questionBody),
    sourcePath: input.sourcePath,
    sourceRevision: input.sourceRevision,
  });
}

/** Hashes one complete current question pair through its canonical identity. */
export function hashTryoutContent(input: TryoutContentInput) {
  const digest = createHash("sha256")
    .update(canonicalizeTryoutContent(input), "utf8")
    .digest("hex");
  return TryoutContentHashSchema.make(digest);
}
