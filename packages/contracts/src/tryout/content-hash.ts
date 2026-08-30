import { createHash } from "node:crypto";
import { Schema } from "effect";
import { type DateOnly, withPublicationDates } from "#contracts/date";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
  DeliveryLanguageSchema,
} from "#contracts/locale";
import { QuestionKeySchema } from "#contracts/question/identity";
import {
  canonicalQuestionBlueprint,
  QuestionBlueprintSchema,
} from "#contracts/question/item";
import {
  canonicalQuestionResponse,
  QuestionResponseSchema,
} from "#contracts/question/response";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
  AssessmentLanguagePolicySchema,
  canonicalAssessmentLanguagePolicy,
} from "#contracts/tryout/language";
import {
  TryoutContentHashSchema,
  TryoutSourceRevisionSchema,
} from "#contracts/tryout/spec";

const MULTIPLE_NEWLINES = /\n{3,}/gu;

/** Exact authored facts that define one app and delivery-language question. */
export const TryoutContentInputSchema = withPublicationDates({
  answerArtifactLocale: ArtifactLocaleSchema,
  answerBody: Schema.String,
  appLocale: AppLocaleSchema,
  blueprint: Schema.optionalKey(QuestionBlueprintSchema),
  deliveryLanguage: DeliveryLanguageSchema,
  languagePolicy: AssessmentLanguagePolicySchema,
  questionArtifactLocale: ArtifactLocaleSchema,
  questionBody: Schema.String,
  response: QuestionResponseSchema,
  sourcePath: QuestionKeySchema,
  sourceRevision: TryoutSourceRevisionSchema,
  stimulusKey: Schema.optionalKey(TryoutKeySchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({
        answerArtifactLocale,
        appLocale,
        deliveryLanguage,
        questionArtifactLocale,
      }) =>
        String(answerArtifactLocale) === String(appLocale) &&
        String(questionArtifactLocale) === String(deliveryLanguage),
      {
        message:
          "Expected answer locale to match app locale and question locale to match delivery language.",
      }
    )
  )
);
export type TryoutContentInput = typeof TryoutContentInputSchema.Type;

/** Normalizes authored body spacing without changing MDX markup. */
function normalizeBody(body: string) {
  return body.replace(MULTIPLE_NEWLINES, "\n\n").trim();
}

/** Converts one validated date-only value to its UTC midnight epoch. */
function dateEpoch(date: DateOnly) {
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
    ...(input.blueprint === undefined
      ? {}
      : { blueprint: canonicalQuestionBlueprint(input.blueprint) }),
    ...(input.dateModified === undefined
      ? {}
      : { dateModified: dateEpoch(input.dateModified) }),
    datePublished: dateEpoch(input.datePublished),
    deliveryLanguage: input.deliveryLanguage,
    languagePolicy: canonicalAssessmentLanguagePolicy(input.languagePolicy),
    questionArtifactLocale: input.questionArtifactLocale,
    questionBody: normalizeBody(input.questionBody),
    response: canonicalQuestionResponse(input.response),
    sourcePath: input.sourcePath,
    sourceRevision: input.sourceRevision,
    ...(input.stimulusKey === undefined
      ? {}
      : { stimulusKey: input.stimulusKey }),
  });
}

/** Hashes one complete current question pair through its canonical identity. */
export function hashTryoutContent(input: TryoutContentInput) {
  const digest = createHash("sha256")
    .update(canonicalizeTryoutContent(input), "utf8")
    .digest("hex");
  return TryoutContentHashSchema.make(digest);
}
