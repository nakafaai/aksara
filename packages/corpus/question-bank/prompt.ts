import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { questionArtifactLocalesForPolicy } from "@nakafa/aksara-contracts/tryout/language";
import { Array as Arr, Effect, FileSystem, Path, Schema } from "effect";
import {
  QuestionReadError,
  type QuestionSource,
  QuestionSourceSchema,
} from "#corpus/question-bank/source";

/** One authored prompt body with the question and locale that own it. */
const QuestionPromptSchema = Schema.Struct({
  locale: ArtifactLocaleSchema,
  path: CorpusSourcePathSchema,
  rawMdx: Schema.String,
  source: QuestionSourceSchema,
});
export type QuestionPrompt = typeof QuestionPromptSchema.Type;

/** Reads every prompt body of the given questions in each assessed locale. */
export const readQuestionPrompts = Effect.fn(
  "AksaraCorpus.readQuestionPrompts"
)(function* (corpusRoot: string, sources: readonly QuestionSource[]) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const prompts = Arr.flatMap(sources, (source) =>
    Arr.map(
      questionArtifactLocalesForPolicy(source.languagePolicy),
      (locale) => ({
        locale,
        path: CorpusSourcePathSchema.make(
          `${source.sourceRoot}/question.${locale}.mdx`
        ),
        source,
      })
    )
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
