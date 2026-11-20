import { Array as Arr, Effect } from "effect";
import { itemPoints } from "#corpus/question-bank/item";
import type { QuestionSet } from "#corpus/question-bank/source";
import type { ReadinessSection } from "#corpus/tryout/readiness/section";
import { validateReadinessField } from "#corpus/tryout/readiness/validation";

/** Writes the points of each question as one comparable fact, such as `21/21/21`, or `none`. */
function pointsFact(points: readonly number[]) {
  return Arr.isReadonlyArrayNonEmpty(points)
    ? Arr.join(
        Arr.map(points, (each) => String(each)),
        "/"
      )
    : "none";
}

/**
 * Validates the points of one set's section against its readiness: the
 * points of each question in order, and their total. A section whose
 * readiness records no points is not checked.
 */
export const validateSectionPoints = Effect.fn(
  "AksaraCorpus.validateSectionPoints"
)(function* (
  expected: ReadinessSection,
  set: QuestionSet | undefined,
  scope: string
) {
  const points = Arr.map(set?.questions ?? [], ({ item }) => itemPoints(item));
  if (expected.questionPoints !== undefined) {
    yield* validateReadinessField(
      pointsFact(points),
      pointsFact(expected.questionPoints.value),
      "questionPoints",
      scope
    );
  }
  if (expected.totalPoints !== undefined) {
    yield* validateReadinessField(
      Arr.reduce(points, 0, (total, each) => total + each),
      expected.totalPoints.value,
      "totalPoints",
      scope
    );
  }
});
