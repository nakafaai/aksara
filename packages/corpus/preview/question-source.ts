import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { questionKeyParts } from "@nakafa/aksara-contracts/question/identity";
import { Effect } from "effect";
import type { QuestionPreviewSource } from "#corpus/preview/source";
import { PreviewSelectionError } from "#corpus/preview/source";
import {
  makeRestartDependencyLookup,
  type RestartDependencyLookup,
} from "#corpus/preview/topology";
import type { QuestionEntry } from "#corpus/question-bank/content";
import type { QuestionSource } from "#corpus/question-bank/source";

const QUESTION_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/tryout/registry.ts"
);
/** One already decoded question with its exact shell locale. */
export interface QuestionPreviewInput {
  readonly appLocale: AppLocale;
  readonly entry: QuestionEntry;
}

/** Builds one trusted compile source without inventing a publication target. */
export const makeQuestionPreviewSource = Effect.fn(
  "AksaraCorpus.makeQuestionPreviewSource"
)(function* (
  source: QuestionSource,
  entry: QuestionEntry,
  appLocale: AppLocale,
  dependenciesFor: RestartDependencyLookup
) {
  const { countryKey, examKey } = questionKeyParts(entry.questionKey);
  const sourceModule = CorpusSourcePathSchema.make(
    `packages/corpus/tryout/${countryKey}/${examKey}/source.ts`
  );
  const dependencies = [
    {
      mode: "reload",
      sourcePath: CorpusSourcePathSchema.make(`${entry.sourceRoot}/choices.ts`),
    },
    { mode: "restart", sourcePath: QUESTION_OWNER },
    ...(yield* dependenciesFor(sourceModule)),
  ] satisfies QuestionPreviewSource["dependencies"];
  return {
    appLocale,
    dependencies,
    directories: [{ files: source.files, sourcePath: entry.sourceRoot }],
    entry,
    family: "question",
  } satisfies QuestionPreviewSource;
});

/** Selects compile sources for authored bodies in one dependency-index pass. */
export const selectQuestionPreviewSources = Effect.fn(
  "AksaraCorpus.selectQuestionPreviewSources"
)(function* (
  corpusRoot: string,
  inputs: readonly QuestionPreviewInput[],
  questionSources: readonly QuestionSource[]
) {
  const sourcesByQuestion = new Map(
    questionSources.map((source) => [source.questionKey, source])
  );
  const dependenciesFor = yield* makeRestartDependencyLookup(corpusRoot);
  return yield* Effect.forEach(
    inputs,
    ({ appLocale, entry }) =>
      Effect.gen(function* () {
        const source = sourcesByQuestion.get(entry.questionKey);
        if (source === undefined) {
          return yield* new PreviewSelectionError({
            reason: "missing",
            sourcePath: entry.sourcePath,
          });
        }
        return yield* makeQuestionPreviewSource(
          source,
          entry,
          appLocale,
          dependenciesFor
        );
      }),
    { concurrency: 8 }
  );
});
