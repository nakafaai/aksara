import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { indexQuestionBanks } from "#corpus/question-bank/path";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import {
  corpusRoot,
  physicalQuestionBankTestTimeout,
  questionLayer,
} from "#corpus/test/question-layer";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { tkaEnglishReadiness } from "#corpus/tryout/indonesia/tka/readiness/english";
import { tkaIndonesianReadiness } from "#corpus/tryout/indonesia/tka/readiness/indonesian";
import { tkaMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/mathematics";
import {
  validateAssessmentReadinessEntries,
  validateAssessmentReadinessRegistry,
} from "#corpus/tryout/readiness/registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Loads all explicit readiness, hierarchy, and physical item facts once. */
const loadReadinessRegistry = Effect.fn(
  "AksaraCorpus.test.loadReadinessRegistry"
)(function* () {
  const sources = yield* decodeTryoutRegistry();
  const banks = yield* indexQuestionBanks(sources);
  const questions = yield* discoverQuestionSources(corpusRoot, banks).pipe(
    Effect.provide(questionLayer)
  );
  const readiness = yield* Effect.all([
    snbtReadiness,
    tkaMathematicsReadiness,
    tkaIndonesianReadiness,
    tkaEnglishReadiness,
  ]);
  return { questions, readiness, sources };
});

describe("assessment readiness registry", () => {
  it.effect(
    "owns one complete gate for every active assessment",
    () =>
      Effect.gen(function* () {
        const { questions, readiness, sources } =
          yield* loadReadinessRegistry();

        expect(
          yield* validateAssessmentReadinessEntries(
            readiness,
            sources,
            questions
          )
        ).toEqual(readiness);
        expect(
          yield* validateAssessmentReadinessRegistry(sources, questions)
        ).toEqual(readiness);
      }),
    physicalQuestionBankTestTimeout
  );

  it.effect(
    "rejects duplicate, missing, and orphaned readiness owners",
    () =>
      Effect.gen(function* () {
        const { questions, readiness, sources } =
          yield* loadReadinessRegistry();
        const [snbt, ...tka] = readiness;
        const snbtSource = yield* Effect.fromNullishOr(
          sources.find(({ examKey }) => examKey === "snbt")
        );
        const failures = yield* Effect.all([
          validateAssessmentReadinessEntries(
            [snbt, snbt, ...tka],
            sources,
            questions
          ).pipe(Effect.flip),
          validateAssessmentReadinessEntries([snbt], sources, questions).pipe(
            Effect.flip
          ),
          validateAssessmentReadinessEntries(
            [snbt, ...tka],
            [snbtSource],
            questions
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
            identity: "indonesia\u0000tka\u0000mathematics",
          }),
          expect.objectContaining({
            _tag: "AssessmentReadinessRegistryError",
            count: 0,
            identity: "indonesia\u0000tka\u0000mathematics",
          }),
        ]);
      }),
    physicalQuestionBankTestTimeout
  );

  it.effect(
    "balances active single-choice answer positions in every set",
    () =>
      Effect.gen(function* () {
        const { questions, sources } = yield* loadReadinessRegistry();

        for (const source of sources) {
          for (const track of source.tracks) {
            for (const set of track.sets) {
              for (const section of set.sections) {
                const activeQuestions = questions.filter(
                  ({ questionNumber, setKey }) =>
                    setKey === section.questionSourcePath &&
                    questionNumber <= section.questionCount
                );
                for (const responseLocale of ["de", "en", "id"] as const) {
                  const positionsByOptionCount = new Map<number, number[]>();
                  for (const { item } of activeQuestions) {
                    const response = item.responses[responseLocale];
                    if (response?.kind !== "single-choice") {
                      continue;
                    }
                    const positions =
                      positionsByOptionCount.get(response.options.length) ??
                      Array.from({ length: response.options.length }, () => 0);
                    const correctIndex = response.options.findIndex(
                      ({ isCorrect }) => isCorrect
                    );
                    positions[correctIndex] =
                      (positions[correctIndex] ?? 0) + 1;
                    positionsByOptionCount.set(
                      response.options.length,
                      positions
                    );
                  }

                  for (const positions of positionsByOptionCount.values()) {
                    expect(
                      Math.max(...positions) - Math.min(...positions)
                    ).toBeLessThanOrEqual(1);
                  }
                }
              }
            }
          }
        }
      }),
    physicalQuestionBankTestTimeout
  );
});
