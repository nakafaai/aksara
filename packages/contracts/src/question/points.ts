import { Schema } from "effect";

import type { QuestionResponse } from "#contracts/question/response";
import { questionRubricPoints } from "#contracts/question/rubric";

/** Whole points one scored question is worth. */
export const QuestionPointsSchema = Schema.Int.check(Schema.isGreaterThan(0));

/**
 * Points written only when a question is worth more than the default single
 * point, so every placement keeps one canonical encoding of its worth.
 */
export const AuthoredQuestionPointsSchema = QuestionPointsSchema.check(
  Schema.isGreaterThan(1, {
    message: "Omit points to use the default of one point.",
  })
);

/**
 * Returns the points one placed question is worth. Every scoring strategy
 * reads worth through this function: a rubric is worth its derived total, and
 * any other response is worth its authored points or the default single point.
 */
export function questionPoints(question: {
  readonly points?: number;
  readonly response: QuestionResponse;
}) {
  if (question.response.kind === "rubric") {
    return questionRubricPoints(question.response);
  }
  return question.points ?? 1;
}
