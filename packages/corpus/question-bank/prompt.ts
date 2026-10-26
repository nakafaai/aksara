import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, FileSystem, Option, Path, Schema } from "effect";
import { QuestionReadError } from "#corpus/question-bank/entries";
import { itemVersions } from "#corpus/question-bank/item";
import { setSourcePath } from "#corpus/question-bank/path";
import {
  type QuestionSet,
  QuestionSourceSchema,
} from "#corpus/question-bank/source";

/**
 * One task as a learner reads it in one language: the shared reading of its
 * question, if any, then its prompt. Checks that compare tasks read this, so
 * two questions on two readings are two tasks even when their prompts match.
 */
const QuestionPromptSchema = Schema.Struct({
  language: AppLocaleCodeSchema,
  path: CorpusSourcePathSchema,
  rawMdx: Schema.String,
  source: QuestionSourceSchema,
});
export type QuestionPrompt = typeof QuestionPromptSchema.Type;

/** Reads every task of the given sets in each language it is asked in. */
export const readQuestionPrompts = Effect.fn(
  "AksaraCorpus.readQuestionPrompts"
)(function* (corpusRoot: string, sets: readonly QuestionSet[]) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const tasks = Arr.flatMap(sets, (set) =>
    Arr.flatMap(set.questions, (source) =>
      Arr.map(itemVersions(source.item.versions), ({ language }) => ({
        language,
        path: CorpusSourcePathSchema.make(
          `${source.sourceRoot}/question.${language}.mdx`
        ),
        reading: Option.map(
          Option.fromUndefinedOr(source.item.stimulus),
          (key) => setSourcePath(set.path, key, `stimulus.${language}.mdx`)
        ),
        source,
      }))
    )
  );
  /** Reads one file of a task. */
  const read = (file: typeof CorpusSourcePathSchema.Type) =>
    fileSystem
      .readFileString(path.join(corpusRoot, file), "utf8")
      .pipe(
        Effect.mapError((cause) => new QuestionReadError({ cause, path: file }))
      );
  return yield* Effect.forEach(
    tasks,
    ({ language, path: prompt, reading, source }) =>
      Effect.gen(function* () {
        const stem = yield* read(prompt);
        const shared = yield* Effect.forEach(Option.toArray(reading), read);
        return QuestionPromptSchema.make({
          language,
          path: prompt,
          rawMdx: Arr.join(Arr.append(shared, stem), "\n\n"),
          source,
        });
      }),
    { concurrency: 16 }
  );
});
