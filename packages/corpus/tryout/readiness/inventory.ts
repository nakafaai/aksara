import {
  Array as Arr,
  Effect,
  HashSet,
  MutableHashMap,
  Option,
  Schema,
  Struct,
} from "effect";

import type { QuestionSource } from "#corpus/question-bank/source";
import type { AssessmentReadiness } from "#corpus/tryout/readiness/schema";
import {
  requireReadinessSection,
  requireReadinessTrack,
  validateAssessmentSourceReadiness,
  validateReadinessField,
} from "#corpus/tryout/readiness/validation";
import type { TryoutExamSource } from "#corpus/tryout/schema";

type ReadinessSection = AssessmentReadiness["sections"][number];
type ReadinessBlueprint = NonNullable<ReadinessSection["blueprint"]>;
type TryoutTrack = TryoutExamSource["tracks"][number];
type TryoutSection = TryoutTrack["sets"][number]["sections"][number];

/** Counts each observed readiness key without losing unknown values. */
function countBy(values: readonly string[]) {
  const counts = MutableHashMap.empty<string, number>();
  for (const value of values) {
    MutableHashMap.set(
      counts,
      value,
      Option.getOrElse(MutableHashMap.get(counts, value), () => 0) + 1
    );
  }
  return counts;
}

const CoverageRequirementSchema = Schema.Struct({
  editorialMinimum: Schema.Finite,
  key: Schema.String,
});
type CoverageRequirement = typeof CoverageRequirementSchema.Type;

/** Validates allowed keys and editorial minimums for one blueprint dimension. */
const validateCoverage = Effect.fn("AksaraCorpus.validateReadinessCoverage")(
  function* (
    actualCounts: MutableHashMap.MutableHashMap<string, number>,
    requirements: readonly CoverageRequirement[],
    field: string,
    scope: string
  ) {
    const allowed = HashSet.fromIterable(
      Arr.map(requirements, ({ key }) => key)
    );
    for (const actual of MutableHashMap.keys(actualCounts)) {
      yield* validateReadinessField(
        HashSet.has(allowed, actual) ? "allowed" : actual,
        "allowed",
        field,
        scope
      );
    }
    for (const { editorialMinimum, key } of requirements) {
      yield* validateReadinessField(
        Option.getOrElse(MutableHashMap.get(actualCounts, key), () => 0) >=
          editorialMinimum
          ? "covered"
          : "missing",
        "covered",
        `${field}:${key}`,
        scope
      );
    }
  }
);

/** Validates every topic against its source-owned domain and cognitive levels. */
const validateTopicBlueprints = Effect.fn(
  "AksaraCorpus.validateReadinessTopicBlueprints"
)(function* (
  blueprints: readonly NonNullable<QuestionSource["item"]["blueprint"]>[],
  readiness: ReadinessBlueprint,
  scope: string
) {
  for (const topic of readiness.topics) {
    for (const blueprint of Arr.filter(
      blueprints,
      ({ topic: actual }) => actual === topic.key
    )) {
      yield* validateReadinessField(
        Arr.contains(topic.contentDomains, blueprint.contentDomain)
          ? "allowed"
          : blueprint.contentDomain,
        "allowed",
        `topicDomain:${topic.key}`,
        scope
      );
      yield* validateReadinessField(
        Arr.contains(topic.cognitiveLevels, blueprint.cognitiveLevel)
          ? "allowed"
          : blueprint.cognitiveLevel,
        "allowed",
        `topicCognitiveLevel:${topic.key}`,
        scope
      );
    }
  }
});

/** Validates all physical items selected by one active blueprint section. */
const validateSectionQuestionReadiness = Effect.fn(
  "AksaraCorpus.validateSectionQuestionReadiness"
)(function* (
  section: TryoutSection,
  readiness: ReadinessBlueprint,
  questions: readonly QuestionSource[],
  scope: string
) {
  const selected = Arr.filter(
    questions,
    ({ questionNumber, setKey }) =>
      setKey === section.questionSourcePath &&
      questionNumber <= section.questionCount
  );
  yield* validateReadinessField(
    selected.length,
    section.questionCount,
    "questionInventory",
    scope
  );
  const blueprints = Arr.flatMap(selected, ({ item }) =>
    item.blueprint === undefined ? [] : [item.blueprint]
  );
  yield* validateReadinessField(
    blueprints.length,
    selected.length,
    "blueprintCoverage",
    scope
  );
  yield* validateCoverage(
    countBy(Arr.map(blueprints, ({ contentDomain }) => contentDomain)),
    readiness.contentDomains,
    "contentDomain",
    scope
  );
  yield* validateCoverage(
    countBy(Arr.map(blueprints, ({ cognitiveLevel }) => cognitiveLevel)),
    readiness.cognitiveLevels,
    "cognitiveLevel",
    scope
  );
  yield* validateCoverage(
    countBy(Arr.map(blueprints, ({ topic }) => topic)),
    readiness.topics,
    "topic",
    scope
  );
  const responseKinds = Arr.flatMap(readiness.responseMinimums, ({ kind }) =>
    Arr.flatMap(selected, ({ item }) =>
      Arr.some(
        Struct.keys(item.responses),
        (key) => item.responses[key]?.kind === kind
      )
        ? [kind]
        : []
    )
  );
  yield* validateReadinessField(
    responseKinds.length,
    selected.length,
    "responseKindCoverage",
    scope
  );
  yield* validateCoverage(
    countBy(responseKinds),
    Arr.map(readiness.responseMinimums, ({ editorialMinimum, kind }) => ({
      editorialMinimum,
      key: kind,
    })),
    "responseKind",
    scope
  );
  yield* validateTopicBlueprints(blueprints, readiness, scope);
  const grouped = HashSet.fromIterable(
    Arr.flatMap(selected, ({ item }) =>
      item.stimulusKey === undefined ? [] : [item.stimulusKey]
    )
  );
  yield* validateReadinessField(
    HashSet.size(grouped) >= readiness.groupedStimulusEditorialMinimum
      ? "covered"
      : "missing",
    "covered",
    "groupedStimulus",
    scope
  );
});

/** Validates item coverage, response mix, and grouped stimuli for every set. */
export const validateAssessmentQuestionReadiness = Effect.fn(
  "AksaraCorpus.validateAssessmentQuestionReadiness"
)(function* (
  source: TryoutExamSource,
  readiness: AssessmentReadiness,
  questions: readonly QuestionSource[]
) {
  yield* validateAssessmentSourceReadiness(source, readiness);
  const track = yield* requireReadinessTrack(source, readiness);
  for (const set of track.sets) {
    const setScope = `${source.examKey}:${track.key}:${set.key}`;
    yield* Effect.forEach(
      readiness.sections,
      (expected, index) =>
        Effect.gen(function* () {
          const section = yield* requireReadinessSection(
            set.sections,
            expected,
            index,
            setScope
          );
          if (expected.blueprint === undefined) {
            return;
          }
          const scope = `${source.examKey}:${track.key}:${set.key}:${section.key}`;
          yield* validateSectionQuestionReadiness(
            section,
            expected.blueprint,
            questions,
            scope
          );
        }),
      { discard: true }
    );
  }
  return source;
});
