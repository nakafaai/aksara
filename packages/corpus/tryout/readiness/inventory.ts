import { Effect } from "effect";

import type { QuestionSource } from "#corpus/question-bank/source";
import {
  type AssessmentReadiness,
  requireReadinessSection,
  requireReadinessTrack,
  validateAssessmentSourceReadiness,
  validateReadinessField,
} from "#corpus/tryout/readiness/schema";
import type { TryoutExamSource } from "#corpus/tryout/schema";

type ReadinessSection = AssessmentReadiness["sections"][number];
type ReadinessBlueprint = NonNullable<ReadinessSection["blueprint"]>;
type TryoutTrack = TryoutExamSource["tracks"][number];
type TryoutSection = TryoutTrack["sets"][number]["sections"][number];

/** Counts each observed readiness key without losing unknown values. */
function countBy(values: readonly string[]) {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

interface CoverageRequirement {
  readonly editorialMinimum: number;
  readonly key: string;
}

/** Validates allowed keys and editorial minimums for one blueprint dimension. */
const validateCoverage = Effect.fn("AksaraCorpus.validateReadinessCoverage")(
  function* (
    actualCounts: ReadonlyMap<string, number>,
    requirements: readonly CoverageRequirement[],
    field: string,
    scope: string
  ) {
    const allowed = new Set(requirements.map(({ key }) => key));
    for (const actual of actualCounts.keys()) {
      yield* validateReadinessField(
        allowed.has(actual) ? "allowed" : actual,
        "allowed",
        field,
        scope
      );
    }
    for (const { editorialMinimum, key } of requirements) {
      yield* validateReadinessField(
        (actualCounts.get(key) ?? 0) >= editorialMinimum
          ? "covered"
          : "missing",
        "covered",
        `${field}:${key}`,
        scope
      );
    }
  }
);

/** Validates that every topic remains inside its allowed content domains. */
const validateTopicDomains = Effect.fn(
  "AksaraCorpus.validateReadinessTopicDomains"
)(function* (
  blueprints: readonly NonNullable<QuestionSource["item"]["blueprint"]>[],
  readiness: ReadinessBlueprint,
  scope: string
) {
  for (const topic of readiness.topics) {
    for (const blueprint of blueprints.filter(
      ({ topic: actual }) => actual === topic.key
    )) {
      yield* validateReadinessField(
        topic.contentDomains.includes(blueprint.contentDomain)
          ? "allowed"
          : blueprint.contentDomain,
        "allowed",
        `topicDomain:${topic.key}`,
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
  const selected = questions.filter(
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
  const blueprints = selected.flatMap(({ item }) =>
    item.blueprint === undefined ? [] : [item.blueprint]
  );
  yield* validateReadinessField(
    blueprints.length,
    selected.length,
    "blueprintCoverage",
    scope
  );
  yield* validateCoverage(
    countBy(blueprints.map(({ contentDomain }) => contentDomain)),
    readiness.contentDomains,
    "contentDomain",
    scope
  );
  yield* validateCoverage(
    countBy(blueprints.map(({ cognitiveLevel }) => cognitiveLevel)),
    readiness.cognitiveLevels,
    "cognitiveLevel",
    scope
  );
  yield* validateCoverage(
    countBy(blueprints.map(({ topic }) => topic)),
    readiness.topics,
    "topic",
    scope
  );
  const responseKinds = readiness.responseMinimums.flatMap(({ kind }) =>
    selected.flatMap(({ item }) =>
      Object.values(item.responses).some((response) => response?.kind === kind)
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
    readiness.responseMinimums.map(({ editorialMinimum, kind }) => ({
      editorialMinimum,
      key: kind,
    })),
    "responseKind",
    scope
  );
  yield* validateTopicDomains(blueprints, readiness, scope);
  const grouped = new Set(
    selected.flatMap(({ item }) =>
      item.stimulusKey === undefined ? [] : [item.stimulusKey]
    )
  );
  yield* validateReadinessField(
    grouped.size >= readiness.groupedStimulusEditorialMinimum
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
    for (const [index, expected] of readiness.sections.entries()) {
      const section = yield* requireReadinessSection(
        set.sections,
        expected,
        index,
        setScope
      );
      if (expected.blueprint === undefined) {
        continue;
      }
      const scope = `${source.examKey}:${track.key}:${set.key}:${section.key}`;
      yield* validateSectionQuestionReadiness(
        section,
        expected.blueprint,
        questions,
        scope
      );
    }
  }
  return source;
});
