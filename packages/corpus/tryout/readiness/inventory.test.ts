import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option } from "effect";
import {
  type QuestionSet,
  type QuestionSource,
  readQuestionSets,
} from "#corpus/question-bank/source";
import { corpusRoot } from "#corpus/test/root";
import { tkaCompulsoryMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/compulsory";
import { tkaTryoutSource } from "#corpus/tryout/indonesia/tka/source";
import { examSetPaths } from "#corpus/tryout/projection";
import { validateAssessmentQuestionReadiness } from "#corpus/tryout/readiness/inventory";

type Blueprint = NonNullable<QuestionSource["item"]["blueprint"]>;

/** Loads the actual TKA source, its mathematics gate, and its bank sets. */
const loadTkaReadiness = Effect.gen(function* () {
  const source = yield* tkaTryoutSource;
  const readiness = yield* tkaCompulsoryMathematicsReadiness;
  const sets = yield* readQuestionSets(
    yield* corpusRoot,
    Arr.filter(examSetPaths([source]), (set) =>
      set.includes("/compulsory-mathematics/")
    )
  );
  return { readiness, sets, source };
}).pipe(Effect.provide(NodeServices.layer));

/** Rewrites every question of the sets. */
function mapQuestions(
  sets: readonly QuestionSet[],
  transform: (question: QuestionSource) => QuestionSource
) {
  return Arr.map(sets, (set) => ({
    ...set,
    questions: Arr.map(set.questions, transform),
  }));
}

/** Rewrites each authored blueprint of the sets. */
function mapBlueprints(
  sets: readonly QuestionSet[],
  transform: (blueprint: Blueprint, question: QuestionSource) => Blueprint
) {
  return mapQuestions(sets, (question) => {
    const { blueprint } = question.item;
    return blueprint === undefined
      ? question
      : {
          ...question,
          item: { ...question.item, blueprint: transform(blueprint, question) },
        };
  });
}

/** Returns the readiness field a changed inventory fails on. */
function rejectField(
  { readiness, source }: Effect.Success<typeof loadTkaReadiness>,
  sets: readonly QuestionSet[]
) {
  return validateAssessmentQuestionReadiness(source, readiness, sets).pipe(
    Effect.flip,
    Effect.map(({ field }) => field)
  );
}

describe("validateAssessmentQuestionReadiness", () => {
  it.effect(
    "accepts every actual TKA mathematics set against its official vocabulary",
    () =>
      Effect.gen(function* () {
        const { readiness, sets, source } = yield* loadTkaReadiness;

        expect(Arr.flatMap(sets, ({ questions }) => questions)).toHaveLength(
          100
        );
        expect(
          yield* validateAssessmentQuestionReadiness(source, readiness, sets)
        ).toBe(source);
        expect(
          yield* validateAssessmentQuestionReadiness(
            source,
            readiness,
            mapQuestions(sets, (question) => ({
              ...question,
              item: {
                ...question.item,
                versions: { id: question.item.versions.id },
              },
            }))
          )
        ).toBe(source);
      }),
    60_000
  );

  it.effect("rejects a missing set, a short set, and a missing blueprint", () =>
    Effect.gen(function* () {
      const loaded = yield* loadTkaReadiness;
      const [first, ...rest] = loaded.sets;
      const [question, ...others] = first?.questions ?? [];
      if (first === undefined || question === undefined) {
        return yield* Effect.die("Expected the TKA mathematics sets.");
      }
      const { blueprint: _blueprint, ...unprinted } = question.item;
      const fields = yield* Effect.all([
        rejectField(loaded, rest),
        rejectField(loaded, [{ ...first, questions: [question] }, ...rest]),
        rejectField(loaded, [
          {
            ...first,
            questions: [{ ...question, item: unprinted }, ...others],
          },
          ...rest,
        ]),
      ]);

      expect(fields).toEqual([
        "questionInventory",
        "questionInventory",
        "blueprintCoverage",
      ]);
    })
  );

  it.effect("rejects unknown and underrepresented official dimensions", () =>
    Effect.gen(function* () {
      const loaded = yield* loadTkaReadiness;
      const { sets } = loaded;
      const first = sets[0]?.questions[0];
      const fields = yield* Effect.all([
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint, question) =>
            question === first
              ? {
                  cognitiveLevel: "reasoning",
                  contentDomain: "calculus",
                  topic: "real-numbers",
                }
              : blueprint
          )
        ),
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint) =>
            blueprint.contentDomain === "numbers"
              ? { ...blueprint, contentDomain: "algebra" }
              : blueprint
          )
        ),
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint, question) =>
            question === first
              ? { ...blueprint, cognitiveLevel: "evaluation" }
              : blueprint
          )
        ),
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint) =>
            blueprint.cognitiveLevel === "reasoning"
              ? { ...blueprint, cognitiveLevel: "application" }
              : blueprint
          )
        ),
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint, question) =>
            question === first ? { ...blueprint, topic: "calculus" } : blueprint
          )
        ),
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint) =>
            blueprint.topic === "real-numbers"
              ? { ...blueprint, topic: "functions" }
              : blueprint
          )
        ),
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
      const loaded = yield* loadTkaReadiness;
      const { sets } = loaded;
      const questions = Arr.flatMap(sets, (set) => set.questions);
      const numbers = Arr.findFirst(
        questions,
        ({ item }) => item.blueprint?.contentDomain === "numbers"
      );
      const algebra = Arr.findFirst(
        questions,
        ({ item }) => item.blueprint?.contentDomain === "algebra"
      );
      const single = yield* Effect.fromOption(
        Arr.findFirst(
          questions,
          ({ item }) =>
            item.versions.id?.kind === "choice" &&
            Arr.filter(item.versions.id.options, ({ correct }) => correct)
              .length === 1
        )
      );
      const fields = yield* Effect.all([
        rejectField(
          loaded,
          mapBlueprints(sets, (blueprint, question) => {
            if (Option.isSome(numbers) && question === numbers.value) {
              return { ...blueprint, contentDomain: "algebra" };
            }
            return Option.isSome(algebra) && question === algebra.value
              ? { ...blueprint, contentDomain: "numbers" }
              : blueprint;
          })
        ),
        rejectField(
          loaded,
          mapQuestions(sets, (question) => ({
            ...question,
            item: { ...question.item, versions: single.item.versions },
          }))
        ),
        rejectField(
          loaded,
          mapQuestions(sets, (question) => {
            const { stimulus: _stimulus, ...item } = question.item;
            return { ...question, item };
          })
        ),
      ]);

      expect(fields).toEqual([
        "topicDomain:real-numbers",
        "responseKind:multiple-choice",
        "groupedStimulus",
      ]);
    })
  );
});
