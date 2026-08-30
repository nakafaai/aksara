import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { indexQuestionBanks } from "#corpus/question-bank/path";
import {
  discoverQuestionSources,
  type QuestionSource,
} from "#corpus/question-bank/source";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { tkaMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/mathematics";
import { tkaTryoutSource } from "#corpus/tryout/indonesia/tka/source";
import { validateAssessmentQuestionReadiness } from "#corpus/tryout/readiness/inventory";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Loads the actual TKA source, readiness gate, and physical question bank. */
const loadTkaReadiness = Effect.fn("AksaraCorpus.test.loadTkaReadiness")(
  function* () {
    const source = yield* tkaTryoutSource;
    const readiness = yield* tkaMathematicsReadiness;
    const registry = yield* decodeTryoutRegistry();
    const banks = yield* indexQuestionBanks(registry);
    const discovered = yield* discoverQuestionSources(corpusRoot, banks).pipe(
      Effect.provide(questionLayer)
    );
    const questions = discovered.filter(({ setKey }) =>
      setKey.startsWith("question-bank/tryout/indonesia/tka/mathematics/")
    );
    return { questions, readiness, source };
  }
);

/** Rewrites each available blueprint while preserving the physical source. */
function mapBlueprints(
  questions: readonly QuestionSource[],
  transform: (
    blueprint: NonNullable<QuestionSource["item"]["blueprint"]>
  ) => NonNullable<QuestionSource["item"]["blueprint"]>
) {
  return questions.map((question) => {
    const { blueprint } = question.item;
    return blueprint === undefined
      ? question
      : {
          ...question,
          item: { ...question.item, blueprint: transform(blueprint) },
        };
  });
}

/** Returns one exact readiness failure field for a mutated item inventory. */
const rejectField = Effect.fn("AksaraCorpus.test.rejectReadinessField")(
  (
    source: Effect.Success<typeof tkaTryoutSource>,
    readiness: Effect.Success<typeof tkaMathematicsReadiness>,
    questions: readonly QuestionSource[]
  ) =>
    validateAssessmentQuestionReadiness(source, readiness, questions).pipe(
      Effect.flip,
      Effect.map(({ field }) => field)
    )
);

describe("assessment question readiness", () => {
  it.effect(
    "accepts every actual TKA set against its official vocabulary",
    () =>
      Effect.gen(function* () {
        const { questions, readiness, source } = yield* loadTkaReadiness();

        expect(questions).toHaveLength(120);
        expect(
          yield* validateAssessmentQuestionReadiness(
            source,
            readiness,
            questions
          )
        ).toBe(source);
      })
  );

  it.effect("rejects incomplete inventory and blueprint coverage", () =>
    Effect.gen(function* () {
      const { questions, readiness, source } = yield* loadTkaReadiness();
      const [first, ...rest] = questions;
      const missingBlueprint = questions.map((question) => {
        if (question !== first) {
          return question;
        }
        const { blueprint: _blueprint, ...item } = question.item;
        return { ...question, item };
      });
      const fields = yield* Effect.all([
        rejectField(source, readiness, rest),
        rejectField(source, readiness, missingBlueprint),
      ]);

      expect(fields).toEqual(["questionInventory", "blueprintCoverage"]);
    })
  );

  it.effect(
    "counts each item once when only one response locale is authored",
    () =>
      Effect.gen(function* () {
        const { questions, readiness, source } = yield* loadTkaReadiness();
        const indonesianOnly = yield* Effect.forEach(questions, (question) =>
          Effect.gen(function* () {
            const response = yield* Effect.fromNullishOr(
              question.item.responses.id
            );
            return {
              ...question,
              item: { ...question.item, responses: { id: response } },
            };
          })
        );

        expect(
          yield* validateAssessmentQuestionReadiness(
            source,
            readiness,
            indonesianOnly
          )
        ).toBe(source);
      })
  );

  it.effect("rejects unknown and underrepresented official dimensions", () =>
    Effect.gen(function* () {
      const { questions, readiness, source } = yield* loadTkaReadiness();
      const [first] = questions;
      const unknownDomain = questions.map((question) =>
        question === first
          ? {
              ...question,
              item: {
                ...question.item,
                blueprint: {
                  cognitiveLevel: "reasoning",
                  contentDomain: "calculus",
                  topic: "real-numbers",
                },
              },
            }
          : question
      );
      const missingDomain = mapBlueprints(questions, (blueprint) =>
        blueprint.contentDomain === "numbers"
          ? { ...blueprint, contentDomain: "algebra" }
          : blueprint
      );
      const unknownCognitive = mapBlueprints(questions, (blueprint) =>
        blueprint === first?.item.blueprint
          ? { ...blueprint, cognitiveLevel: "evaluation" }
          : blueprint
      );
      const missingCognitive = mapBlueprints(questions, (blueprint) =>
        blueprint.cognitiveLevel === "reasoning"
          ? { ...blueprint, cognitiveLevel: "application" }
          : blueprint
      );
      const unknownTopic = mapBlueprints(questions, (blueprint) =>
        blueprint === first?.item.blueprint
          ? { ...blueprint, topic: "calculus" }
          : blueprint
      );
      const missingTopic = mapBlueprints(questions, (blueprint) =>
        blueprint.topic === "real-numbers"
          ? { ...blueprint, topic: "functions" }
          : blueprint
      );
      const fields = yield* Effect.all([
        rejectField(source, readiness, unknownDomain),
        rejectField(source, readiness, missingDomain),
        rejectField(source, readiness, unknownCognitive),
        rejectField(source, readiness, missingCognitive),
        rejectField(source, readiness, unknownTopic),
        rejectField(source, readiness, missingTopic),
      ]);

      expect(fields).toEqual([
        "contentDomain",
        "contentDomain:numbers",
        "cognitiveLevel",
        "cognitiveLevel:reasoning",
        "topic",
        "topic:real-numbers",
      ]);
    })
  );

  it.effect("rejects a false topic owner, response mix, or group count", () =>
    Effect.gen(function* () {
      const { questions, readiness, source } = yield* loadTkaReadiness();
      const numberQuestion = yield* Effect.fromNullishOr(
        questions.find(
          ({ item, questionNumber }) =>
            questionNumber <= 25 && item.blueprint?.contentDomain === "numbers"
        )
      );
      const algebraQuestion = yield* Effect.fromNullishOr(
        questions.find(
          ({ item, questionNumber }) =>
            questionNumber <= 25 && item.blueprint?.contentDomain === "algebra"
        )
      );
      const swappedOwners = questions.map((question) => {
        const { blueprint } = question.item;
        if (blueprint === undefined) {
          return question;
        }
        if (question === numberQuestion) {
          return {
            ...question,
            item: {
              ...question.item,
              blueprint: { ...blueprint, contentDomain: "algebra" },
            },
          };
        }
        return question === algebraQuestion
          ? {
              ...question,
              item: {
                ...question.item,
                blueprint: { ...blueprint, contentDomain: "numbers" },
              },
            }
          : question;
      });
      const single = yield* Effect.fromNullishOr(
        questions.find(({ item }) =>
          Object.values(item.responses).some(
            (response) => response?.kind === "single-choice"
          )
        )
      );
      const singleOnly = questions.map((question) => ({
        ...question,
        item: { ...question.item, responses: single.item.responses },
      }));
      const withoutGroups = questions.map((question) => {
        const { stimulusKey: _stimulusKey, ...item } = question.item;
        return { ...question, item };
      });
      const fields = yield* Effect.all([
        rejectField(source, readiness, swappedOwners),
        rejectField(source, readiness, singleOnly),
        rejectField(source, readiness, withoutGroups),
      ]);

      expect(fields).toEqual([
        "topicDomain:real-numbers",
        "responseKind:multiple-choice",
        "groupedStimulus",
      ]);
    })
  );
});
