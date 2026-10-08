import { Array as Arr, Effect, MutableHashMap, Option, Schema } from "effect";

import type { QuestionSource } from "#corpus/question-bank/source";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { tkaCompulsoryMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/compulsory";
import { tkaEnglishReadiness } from "#corpus/tryout/indonesia/tka/readiness/english";
import { tkaIndonesianReadiness } from "#corpus/tryout/indonesia/tka/readiness/indonesian";
import { validateAssessmentQuestionReadiness } from "#corpus/tryout/readiness/inventory";
import type { AssessmentReadiness } from "#corpus/tryout/readiness/schema";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const readinessPrograms = [
  snbtReadiness,
  tkaCompulsoryMathematicsReadiness,
  tkaIndonesianReadiness,
  tkaEnglishReadiness,
];

/** Returns the country and exam identity owned by one readiness gate. */
function readinessIdentity(
  readiness: Pick<AssessmentReadiness, "countryKey" | "examKey" | "trackKey">
) {
  return `${readiness.countryKey}\0${readiness.examKey}\0${readiness.trackKey}`;
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
  const indexed = MutableHashMap.empty<string, AssessmentReadiness>();
  for (const entry of readiness) {
    const identity = readinessIdentity(entry);
    if (MutableHashMap.has(indexed, identity)) {
      return yield* new AssessmentReadinessRegistryError({
        count: 2,
        identity,
      });
    }
    MutableHashMap.set(indexed, identity, entry);
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
    for (const track of source.tracks) {
      const identity = readinessIdentity({ ...source, trackKey: track.key });
      const selected = Option.getOrUndefined(
        MutableHashMap.get(available, identity)
      );
      if (selected === undefined) {
        return yield* new AssessmentReadinessRegistryError({
          count: 0,
          identity,
        });
      }
      yield* validateAssessmentQuestionReadiness(source, selected, questions);
      MutableHashMap.remove(available, identity);
    }
  }
  const orphan = Option.getOrUndefined(
    Arr.head(Arr.fromIterable(MutableHashMap.values(available)))
  );
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
