import {
  Array as Arr,
  Effect,
  HashSet,
  MutableHashMap,
  Option,
  Schema,
} from "effect";
import type { TaskSource } from "#corpus/question-bank/item";
import { itemVersions } from "#corpus/question-bank/item";
import { setPath } from "#corpus/question-bank/path";
import type { QuestionSet, QuestionSource } from "#corpus/question-bank/source";
import { validateSectionPoints } from "#corpus/tryout/readiness/points";
import type { AssessmentReadiness } from "#corpus/tryout/readiness/schema";
import type { ResponseFormat } from "#corpus/tryout/readiness/section";
import {
  requireReadinessSection,
  requireReadinessTrack,
  validateAssessmentSourceReadiness,
  validateReadinessField,
} from "#corpus/tryout/readiness/validation";
import type { ExamSource } from "#corpus/tryout/schema";

type ReadinessSection = AssessmentReadiness["sections"][number];
type ReadinessBlueprint = NonNullable<ReadinessSection["blueprint"]>;

/**
 * The official response formats of one task: a choice with one correct option
 * is a single choice, with several a multiple choice, a matrix a category
 * table, and a typed number a short answer. Each part of an item has its own
 * format: a written answer is an extended response, and every other part a
 * short answer.
 */
function taskFormats(task: TaskSource): readonly ResponseFormat[] {
  if (task.kind === "parts") {
    return Arr.map(task.parts, ({ kind }) =>
      kind === "extendedText" ? "extended-response" : "short-answer"
    );
  }
  if (task.kind === "matrix") {
    return ["category"];
  }
  if (task.kind === "numericEntry") {
    return ["short-answer"];
  }
  return Arr.filter(task.options, ({ correct }) => correct).length > 1
    ? ["multiple-choice"]
    : ["single-choice"];
}

/**
 * The official response formats of one item, each once. Every language of an
 * item asks the same task, so every version tells the same.
 */
function responseFormats(question: QuestionSource): readonly ResponseFormat[] {
  return Arr.dedupe(
    Arr.flatMap(itemVersions(question.item.versions), ({ task }) =>
      taskFormats(task)
    )
  );
}

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
  items: number,
  readiness: ReadinessBlueprint,
  set: QuestionSet | undefined,
  scope: string
) {
  const selected = set?.questions ?? [];
  yield* validateReadinessField(
    selected.length,
    items,
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
  const listed = Arr.map(readiness.responseMinimums, ({ kind }) => kind);
  const formats = Arr.map(selected, responseFormats);
  const responseKinds = Arr.filter(Arr.flatten(formats), (format) =>
    Arr.contains(listed, format)
  );
  yield* validateReadinessField(
    Arr.filter(formats, (own) =>
      Arr.every(own, (format) => Arr.contains(listed, format))
    ).length,
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
      item.stimulus === undefined ? [] : [item.stimulus]
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

/** Validates item coverage, response mix, points, and grouped stimuli for every set. */
export const validateAssessmentQuestionReadiness = Effect.fn(
  "AksaraCorpus.validateAssessmentQuestionReadiness"
)(function* (
  source: ExamSource,
  readiness: AssessmentReadiness,
  sets: readonly QuestionSet[]
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
            track.profile.sections,
            expected,
            index,
            setScope
          );
          const path = setPath({
            countryKey: source.countryKey,
            examKey: source.examKey,
            sectionKey: section.key,
            setKey: set.key,
          });
          const sectionSet = Arr.findFirst(
            sets,
            (candidate) => candidate.path === path
          ).pipe(Option.getOrUndefined);
          const scope = `${setScope}:${section.key}`;
          yield* validateSectionPoints(expected, sectionSet, scope);
          if (expected.blueprint === undefined) {
            return;
          }
          yield* validateSectionQuestionReadiness(
            section.items,
            expected.blueprint,
            sectionSet,
            scope
          );
        }),
      { discard: true }
    );
  }
  return source;
});
