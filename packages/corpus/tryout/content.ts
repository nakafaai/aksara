import { Effect } from "effect";
import { loadQuestionContent } from "#corpus/question-bank/content";
import { projectTryoutSources } from "#corpus/tryout/projection";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Loads the canonical question registry and try-out projection from one scan. */
export const loadTryoutContent = Effect.fn("AksaraCorpus.loadTryoutContent")(
  function* (corpusRoot: string) {
    const tryoutSources = yield* decodeTryoutRegistry();
    const questions = yield* loadQuestionContent(corpusRoot, tryoutSources);
    const projection = yield* projectTryoutSources(
      tryoutSources,
      questions.sources
    );
    return { ...questions, projection };
  }
);
