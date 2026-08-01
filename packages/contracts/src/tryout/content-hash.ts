import { createHash } from "node:crypto";
import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";
import {
  QuestionChoiceListSchema,
  QuestionMetadataSchema,
} from "#contracts/projection/question";
import { QuestionKeySchema } from "#contracts/question/identity";
import {
  TryoutContentHashSchema,
  TryoutSourceRevisionSchema,
} from "#contracts/tryout/spec";

const MULTIPLE_NEWLINES = /\n{3,}/gu;

/** Exact authored facts that define one locale-specific question pair. */
export const TryoutContentInputSchema = Schema.Struct({
  answerBody: Schema.String,
  choices: QuestionChoiceListSchema,
  date: DateOnlySchema,
  locale: ContentLocaleSchema,
  questionBody: Schema.String,
  sourcePath: QuestionKeySchema,
  sourceRevision: TryoutSourceRevisionSchema,
  title: QuestionMetadataSchema.fields.title,
});
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

/** Serializes one question pair exactly like its original durable identity. */
export function canonicalizeTryoutContent(input: TryoutContentInput) {
  return JSON.stringify({
    answerBody: normalizeBody(input.answerBody),
    choices: input.choices.map(({ label, value }) => ({ label, value })),
    date: dateEpoch(input.date),
    locale: input.locale,
    questionBody: normalizeBody(input.questionBody),
    sourcePath: input.sourcePath,
    sourceRevision: input.sourceRevision,
    title: input.title,
  });
}

/** Hashes one complete question pair using its existing durable identity. */
export function hashTryoutContent(input: TryoutContentInput) {
  const digest = createHash("sha256")
    .update(canonicalizeTryoutContent(input), "utf8")
    .digest("hex");
  return TryoutContentHashSchema.make(digest);
}
