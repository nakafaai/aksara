import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ArtifactLocale } from "@nakafa/aksara-contracts/locale";
import { questionArtifactLocalesForPolicy } from "@nakafa/aksara-contracts/tryout/language";
import { Effect, FileSystem, Path } from "effect";
import {
  QuestionReadError,
  type QuestionSource,
} from "#corpus/question-bank/source";

/** One authored prompt body with the question and locale that own it. */
export interface QuestionPrompt {
  readonly locale: ArtifactLocale;
  readonly path: CorpusSourcePath;
  readonly rawMdx: string;
  readonly source: QuestionSource;
}

/** Reads every prompt body of the given questions in each assessed locale. */
export const readQuestionPrompts = Effect.fn(
  "AksaraCorpus.readQuestionPrompts"
)(function* (corpusRoot: string, sources: readonly QuestionSource[]) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const prompts = sources.flatMap((source) =>
    questionArtifactLocalesForPolicy(source.languagePolicy).map((locale) => ({
      locale,
      path: CorpusSourcePathSchema.make(
        `${source.sourceRoot}/question.${locale}.mdx`
      ),
      source,
    }))
  );
  return yield* Effect.forEach(
    prompts,
    (prompt) =>
      fileSystem
        .readFileString(path.join(corpusRoot, prompt.path), "utf8")
        .pipe(
          Effect.mapError(
            (cause) => new QuestionReadError({ cause, path: prompt.path })
          ),
          Effect.map((rawMdx): QuestionPrompt => ({ ...prompt, rawMdx }))
        ),
    { concurrency: 16 }
  );
});
