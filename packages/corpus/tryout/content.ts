import { Array as Arr, Effect, HashSet } from "effect";
import { requireCompleteBank } from "#corpus/question-bank/entries";
import { readQuestionSets } from "#corpus/question-bank/source";
import { validateQuestionUniqueness } from "#corpus/question-bank/uniqueness";
import { servedExams, servedPaperIds } from "#corpus/tryout/held";
import { examSetPaths, planTryoutPapers } from "#corpus/tryout/projection";
import { validateAssessmentReadinessRegistry } from "#corpus/tryout/readiness/registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/**
 * Loads every active try-out exam, the question-bank sets they sit, and the
 * plan of each set's paper, from one scan of the checkout. Every question is
 * read once, and the bank, its uniqueness, and each exam's readiness are
 * checked before anything is planned. Held tracks are read, checked, and
 * planned like any other, and then left out with their sets and papers, so
 * nothing that is held reaches a release.
 */
export const loadTryoutContent = Effect.fn("AksaraCorpus.loadTryoutContent")(
  function* (corpusRoot: string) {
    const exams = yield* decodeTryoutRegistry();
    const paths = examSetPaths(exams);
    yield* requireCompleteBank(corpusRoot, paths);
    const sets = yield* readQuestionSets(corpusRoot, paths);
    yield* validateQuestionUniqueness(corpusRoot, sets);
    yield* validateAssessmentReadinessRegistry(exams, sets);
    const papers = yield* planTryoutPapers(exams, sets);
    const served = servedExams(exams);
    const servedPaths = HashSet.fromIterable(examSetPaths(served));
    const paperIds = servedPaperIds(served);
    return {
      exams: served,
      papers: Arr.filter(papers, ({ id }) => HashSet.has(paperIds, id)),
      sets: Arr.filter(sets, ({ path }) => HashSet.has(servedPaths, path)),
    };
  }
);
