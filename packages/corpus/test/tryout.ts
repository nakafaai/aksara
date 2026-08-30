import type { QuestionResponse } from "@nakafa/aksara-contracts/question/response";
import { Effect } from "effect";

import {
  decodeQuestionPath,
  indexQuestionBanks,
  type QuestionBankIndex,
} from "#corpus/question-bank/path";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { loadTryoutContent } from "#corpus/tryout/content";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import { defineTryoutExamSource } from "#corpus/tryout/schema";

/** Loads exact active content and projection through one corpus scan. */
export const loadTryoutProjectionContent = Effect.fn(
  "AksaraCorpus.test.loadTryoutProjectionContent"
)(function* () {
  return yield* loadTryoutContent(corpusRoot).pipe(
    Effect.provide(questionLayer)
  );
});

/** Loads reviewed hierarchy and question sources for typed failure tests. */
export const loadTryoutProjectionSources = Effect.fn(
  "AksaraCorpus.test.loadTryoutProjectionSources"
)(function* () {
  const sources = yield* decodeTryoutRegistry();
  const questionBanks = yield* indexQuestionBanks(sources);
  const questions = yield* discoverQuestionSources(
    corpusRoot,
    questionBanks
  ).pipe(Effect.provide(questionLayer));
  return [sources, questions] satisfies readonly [
    typeof sources,
    typeof questions,
  ];
});

/** Confirms one projected response retains its response-kind invariant. */
export function hasValidQuestionResponse(response: QuestionResponse) {
  if (response.kind === "single-choice") {
    return response.options.filter(({ isCorrect }) => isCorrect).length === 1;
  }
  if (response.kind === "multiple-choice") {
    const correct = response.options.filter(
      ({ isCorrect }) => isCorrect
    ).length;
    return correct >= 2 && correct < response.options.length;
  }
  const categoryKeys = new Set(
    response.categories.map(({ categoryKey }) => categoryKey)
  );
  return response.statements.every(({ correctCategoryKey }) =>
    categoryKeys.has(correctCategoryKey)
  );
}

/** Loads current banks plus one registered future assessment hierarchy. */
export const questionPathFixtures = Effect.gen(function* () {
  const [tryoutSources, futureSource] = yield* Effect.all([
    decodeTryoutRegistry(),
    defineTryoutExamSource({
      countryCode: "DE",
      countryKey: "germany",
      countryOrder: 2,
      countryRevision: "test",
      countryRouteSlugs: { en: "germany", id: "jerman" },
      countryTranslations: {
        en: { title: "Germany" },
        id: { title: "Jerman" },
      },
      examKey: "abitur",
      examOrder: 1,
      examRouteSlugs: { en: "abitur", id: "abitur" },
      examTranslations: {
        en: { title: "Abitur" },
        id: { title: "Abitur" },
      },
      scoringStrategy: "raw",
      sourceRevision: "test",
      tracks: [
        {
          key: "mathematics",
          kind: "subject",
          order: 1,
          routeSlugs: { en: "mathematics", id: "matematika" },
          sets: [
            {
              key: "foundation-set",
              order: 1,
              routeSlugs: { en: "foundation", id: "dasar" },
              sections: [
                {
                  key: "mathematics",
                  languagePolicy: { kind: "app-locale" },
                  order: 1,
                  questionCount: 1,
                  questionSourcePath:
                    "question-bank/tryout/germany/abitur/mathematics/foundation-set",
                  rendererDomain: "mathematics",
                  routeSlugs: { en: "mathematics", id: "matematika" },
                  timeLimitSeconds: 60,
                  translations: {
                    en: { title: "Mathematics" },
                    id: { title: "Matematika" },
                  },
                },
              ],
              translations: {
                en: { title: "Foundation" },
                id: { title: "Dasar" },
              },
            },
          ],
          translations: {
            en: { title: "Mathematics" },
            id: { title: "Matematika" },
          },
        },
      ],
    }),
  ]);
  const [questionBanks, futureBanks] = yield* Effect.all([
    indexQuestionBanks(tryoutSources),
    indexQuestionBanks([futureSource]),
  ]);
  return { futureBanks, questionBanks, tryoutSources };
});

/** Returns one typed path rejection for the selected question-bank index. */
export function rejectQuestionPath(
  questionBanks: QuestionBankIndex,
  path: string
) {
  return decodeQuestionPath(questionBanks, path).pipe(Effect.flip);
}
