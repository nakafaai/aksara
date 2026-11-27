import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  MutableHashMap,
  Option,
  Result,
} from "effect";
import { itemVersions } from "#corpus/question-bank/item";
import type { QuestionSet } from "#corpus/question-bank/source";
import { readQuestionSets } from "#corpus/question-bank/source";
import { corpusRoot } from "#corpus/test/root";
import { tuDarmstadtEntranceReadiness } from "#corpus/tryout/germany/entrance/readiness/darmstadt";
import { kaiserslauternEntranceReadiness } from "#corpus/tryout/germany/entrance/readiness/kaiserslautern";
import { tuDarmstadtFspReadiness } from "#corpus/tryout/germany/feststellungspruefung/readiness/darmstadt";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { tkaAdvancedMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/advanced";
import { tkaCompulsoryMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/compulsory";
import { tkaEnglishReadiness } from "#corpus/tryout/indonesia/tka/readiness/english";
import { tkaIndonesianReadiness } from "#corpus/tryout/indonesia/tka/readiness/indonesian";
import { spmBiologyReadiness } from "#corpus/tryout/malaysia/spm/readiness/biology";
import { spmChemistryReadiness } from "#corpus/tryout/malaysia/spm/readiness/chemistry";
import { spmPhysicsReadiness } from "#corpus/tryout/malaysia/spm/readiness/physics";
import { examSetPaths } from "#corpus/tryout/projection";
import {
  validateAssessmentReadinessEntries,
  validateAssessmentReadinessRegistry,
} from "#corpus/tryout/readiness/registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Loads every readiness gate, exam source, and bank set of this checkout once. */
const loadReadinessRegistry = Effect.gen(function* () {
  const sources = yield* decodeTryoutRegistry();
  const sets = yield* readQuestionSets(
    yield* corpusRoot,
    examSetPaths(sources)
  );
  const readiness = yield* Effect.all([
    snbtReadiness,
    tkaCompulsoryMathematicsReadiness,
    tkaIndonesianReadiness,
    tkaEnglishReadiness,
    tkaAdvancedMathematicsReadiness,
    tuDarmstadtEntranceReadiness,
    kaiserslauternEntranceReadiness,
    tuDarmstadtFspReadiness,
    spmPhysicsReadiness,
    spmChemistryReadiness,
    spmBiologyReadiness,
  ]);
  return { readiness, sets, sources };
});

/** The real readiness registry and bank, read once for the suite. */
class RealRegistry extends Context.Service<
  RealRegistry,
  Effect.Success<typeof loadReadinessRegistry>
>()("@nakafa/aksara-corpus/tryout/readiness/registry.test/RealRegistry") {}

const realRegistry = Layer.effect(RealRegistry, loadReadinessRegistry).pipe(
  Layer.provide(NodeServices.layer)
);

/** Rewrites every question of the sets. */
function mapQuestions(
  sets: readonly QuestionSet[],
  transform: (
    question: QuestionSet["questions"][number]
  ) => QuestionSet["questions"][number]
) {
  return Arr.map(sets, (set) => ({
    ...set,
    questions: Arr.map(set.questions, transform),
  }));
}

layer(realRegistry, { timeout: 120_000 })(
  "assessment readiness registry",
  (it) => {
    it.effect("owns one complete gate for every active assessment", () =>
      Effect.gen(function* () {
        const { readiness, sets, sources } = yield* RealRegistry;

        expect(
          yield* validateAssessmentReadinessEntries(readiness, sources, sets)
        ).toEqual(readiness);
        expect(
          yield* validateAssessmentReadinessRegistry(sources, sets)
        ).toEqual(readiness);
      })
    );

    it.effect("rejects duplicate, missing, and orphaned readiness owners", () =>
      Effect.gen(function* () {
        const { readiness, sets, sources } = yield* RealRegistry;
        const [snbt, ...tka] = readiness;
        const snbtSource = yield* Effect.fromOption(
          Arr.findFirst(sources, ({ examKey }) => examKey === "snbt")
        );
        const failures = yield* Effect.all([
          validateAssessmentReadinessEntries(
            [snbt, snbt, ...tka],
            sources,
            sets
          ).pipe(Effect.flip),
          validateAssessmentReadinessEntries([snbt], sources, sets).pipe(
            Effect.flip
          ),
          validateAssessmentReadinessEntries(
            [snbt, ...tka],
            [snbtSource],
            sets
          ).pipe(Effect.flip),
        ]);

        expect(failures).toEqual([
          expect.objectContaining({
            _tag: "AssessmentReadinessRegistryError",
            count: 2,
            identity: "indonesia\u0000snbt\u00002027",
          }),
          expect.objectContaining({
            _tag: "AssessmentReadinessRegistryError",
            count: 0,
            identity: "indonesia\u0000tka\u0000compulsory-mathematics",
          }),
          expect.objectContaining({
            _tag: "AssessmentReadinessRegistryError",
            count: 0,
            identity: "indonesia\u0000tka\u0000compulsory-mathematics",
          }),
        ]);
      })
    );

    it.effect(
      "rejects a topic assigned to the wrong official cognitive level",
      () =>
        Effect.gen(function* () {
          const { readiness, sets, sources } = yield* RealRegistry;
          const english = "indonesia/tka/english-language/set-1";
          const questions = Arr.flatMap(sets, (set) =>
            set.path === english ? set.questions : []
          );
          const textual = Arr.findFirst(
            questions,
            ({ item }) => item.blueprint?.topic === "explicit-information"
          );
          const inferential = Arr.findFirst(
            questions,
            ({ item }) => item.blueprint?.topic === "supporting-detail"
          );
          const swapped = mapQuestions(sets, (question) => {
            const { blueprint } = question.item;
            if (blueprint === undefined) {
              return question;
            }
            if (Option.isSome(textual) && question === textual.value) {
              return {
                ...question,
                item: {
                  ...question.item,
                  blueprint: { ...blueprint, cognitiveLevel: "inferential" },
                },
              };
            }
            return Option.isSome(inferential) && question === inferential.value
              ? {
                  ...question,
                  item: {
                    ...question.item,
                    blueprint: { ...blueprint, cognitiveLevel: "textual" },
                  },
                }
              : question;
          });
          const failure = yield* validateAssessmentReadinessEntries(
            readiness,
            sources,
            swapped
          ).pipe(Effect.flip);

          expect(failure).toMatchObject({
            _tag: "AssessmentReadinessMismatchError",
            field: "topicCognitiveLevel:explicit-information",
          });
        })
    );

    it.effect(
      "balances single-choice answer positions in every set and language",
      () =>
        Effect.gen(function* () {
          const { sets } = yield* RealRegistry;

          for (const set of sets) {
            const positions = MutableHashMap.empty<string, number[]>();
            for (const { item } of set.questions) {
              for (const { language, task } of itemVersions(item.versions)) {
                if (task.kind !== "choice") {
                  continue;
                }
                const correct = Arr.filterMap(
                  task.options,
                  ({ correct: is }, index) =>
                    is ? Result.succeed(index) : Result.failVoid
                );
                if (correct.length !== 1) {
                  continue;
                }
                const key = `${language}:${task.options.length}`;
                const counts = Option.getOrElse(
                  MutableHashMap.get(positions, key),
                  () => Arr.makeBy(task.options.length, () => 0)
                );
                MutableHashMap.set(
                  positions,
                  key,
                  Arr.map(counts, (count, index) =>
                    index === correct[0] ? count + 1 : count
                  )
                );
              }
            }
            for (const [key, counts] of positions) {
              expect(
                Math.max(...counts) - Math.min(...counts),
                `${set.path}:${key}:${Arr.join(Arr.map(counts, String), ",")}`
              ).toBeLessThanOrEqual(1);
            }
          }
        })
    );
  }
);
