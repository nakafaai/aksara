import { Effect, Schema } from "effect";

import type { QuestionSource } from "#corpus/question-bank/source";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { tkaReadiness } from "#corpus/tryout/indonesia/tka/readiness";
import { validateAssessmentQuestionReadiness } from "#corpus/tryout/readiness/inventory";
import type { AssessmentReadiness } from "#corpus/tryout/readiness/schema";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const readinessPrograms = [snbtReadiness, tkaReadiness];

/** Returns the country and exam identity owned by one readiness gate. */
function readinessIdentity(
  readiness: Pick<AssessmentReadiness, "countryKey" | "examKey">
) {
  return `${readiness.countryKey}\0${readiness.examKey}`;
}

/** An active exam lacks one unique source-backed readiness gate. */
export class AssessmentReadinessRegistryError extends Schema.TaggedError<AssessmentReadinessRegistryError>()(
  "AssessmentReadinessRegistryError",
  {
    count: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
    identity: Schema.String,
  }
) {}

/** Indexes one unique readiness owner for every declared assessment. */
const indexAssessmentReadiness = Effect.fn(
  "AksaraCorpus.indexAssessmentReadiness"
)(function* (readiness: readonly AssessmentReadiness[]) {
  const indexed = new Map<string, AssessmentReadiness>();
  for (const entry of readiness) {
    const identity = readinessIdentity(entry);
    if (indexed.has(identity)) {
      return yield* new AssessmentReadinessRegistryError({
        count: 2,
        identity,
      });
    }
    indexed.set(identity, entry);
  }
  return indexed;
});

/** Validates explicit readiness entries against active source and item facts. */
export const validateAssessmentReadinessEntries = Effect.fn(
  "AksaraCorpus.validateAssessmentReadinessEntries"
)(function* (
  readiness: readonly AssessmentReadiness[],
  sources: readonly TryoutExamSource[],
  questions: readonly QuestionSource[]
) {
  const available = yield* indexAssessmentReadiness(readiness);
  for (const source of sources) {
    const identity = readinessIdentity(source);
    const selected = available.get(identity);
    if (selected === undefined) {
      return yield* new AssessmentReadinessRegistryError({
        count: 0,
        identity,
      });
    }
    yield* validateAssessmentQuestionReadiness(source, selected, questions);
    available.delete(identity);
  }
  const orphan = available.values().next().value;
  if (orphan !== undefined) {
    return yield* new AssessmentReadinessRegistryError({
      count: 0,
      identity: readinessIdentity(orphan),
    });
  }
  return readiness satisfies readonly AssessmentReadiness[];
});

/** Validates every active exam and item inventory against one readiness gate. */
export const validateAssessmentReadinessRegistry = Effect.fn(
  "AksaraCorpus.validateAssessmentReadinessRegistry"
)(function* (
  sources: readonly TryoutExamSource[],
  questions: readonly QuestionSource[]
) {
  const readiness = yield* Effect.all(readinessPrograms);
  return yield* validateAssessmentReadinessEntries(
    readiness,
    sources,
    questions
  );
});
