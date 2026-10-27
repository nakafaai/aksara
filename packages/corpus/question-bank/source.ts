import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALE_CODES,
  AppLocaleCodeSchema,
} from "@nakafa/aksara-contracts/locale";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, FileSystem, Order, Path, Schema } from "effect";
import { QuestionReadError, readEntries } from "#corpus/question-bank/entries";
import { ItemSourceSchema, itemVersions } from "#corpus/question-bank/item";
import {
  type BankEntry,
  type SetPath,
  SetPathSchema,
  setSourcePath,
} from "#corpus/question-bank/path";
import { decodeItemSource } from "#corpus/question-bank/reader";

/** One authored question: its set, its number, its folder, and its item. */
export const QuestionSourceSchema = Schema.Struct({
  item: ItemSourceSchema,
  number: Schema.Int.check(Schema.isGreaterThan(0)),
  set: SetPathSchema,
  sourceRoot: CorpusSourcePathSchema,
});
export type QuestionSource = typeof QuestionSourceSchema.Type;

/** One authored shared reading of a set and the languages it is written in. */
export const StimulusSourceSchema = Schema.Struct({
  key: KebabKeySchema,
  languages: Schema.Array(AppLocaleCodeSchema),
  set: SetPathSchema,
  sourceRoot: CorpusSourcePathSchema,
});
export type StimulusSource = typeof StimulusSourceSchema.Type;

/** One authored set: its questions in order and the readings they share. */
export const QuestionSetSchema = Schema.Struct({
  path: SetPathSchema,
  questions: Schema.Array(QuestionSourceSchema),
  stimuli: Schema.Array(StimulusSourceSchema),
});
export type QuestionSet = typeof QuestionSetSchema.Type;

/** A question or a reading does not hold exactly the files its item names. */
export class QuestionFileSetError extends Schema.TaggedError<
  QuestionFileSetError,
  { readonly brand: unique symbol }
>()("QuestionFileSetError", {
  files: Schema.Array(Schema.String),
  sourcePath: CorpusSourcePathSchema,
}) {}

/** A set does not number its questions from one without a gap. */
export class QuestionSequenceError extends Schema.TaggedError<
  QuestionSequenceError,
  { readonly brand: unique symbol }
>()("QuestionSequenceError", {
  numbers: Schema.Array(Schema.Int),
  set: SetPathSchema,
}) {}

/** A question names a reading its set does not hold, or a reading has no question. */
export class StimulusReferenceError extends Schema.TaggedError<
  StimulusReferenceError,
  { readonly brand: unique symbol }
>()("StimulusReferenceError", {
  key: KebabKeySchema,
  reason: Schema.Literals(["missing", "unused"]),
  set: SetPathSchema,
}) {}

/** The files a question must hold: its item, a prompt for each language, and an explanation for each locale. */
function questionFiles(item: typeof ItemSourceSchema.Type) {
  return Arr.sort(
    [
      "item.ts",
      ...Arr.map(ACTIVE_APP_LOCALE_CODES, (locale) => `answer.${locale}.mdx`),
      ...Arr.map(
        itemVersions(item.versions),
        ({ language }) => `question.${language}.mdx`
      ),
    ],
    Order.String
  );
}

/** Fails unless a folder holds exactly the expected files. */
function requireFiles(
  sourcePath: typeof CorpusSourcePathSchema.Type,
  actual: readonly string[],
  expected: readonly string[]
) {
  const files = Arr.sort(actual, Order.String);
  return Arr.makeEquivalence<string>((left, right) => left === right)(
    files,
    expected
  )
    ? Effect.void
    : Effect.fail(new QuestionFileSetError({ files, sourcePath }));
}

/** Reads one question: its item, checked against the files of its folder. */
const readQuestion = Effect.fn("AksaraCorpus.readQuestion")(function* (
  corpusRoot: string,
  set: SetPath,
  number: number,
  files: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourceRoot = setSourcePath(set, `question-${number}`);
  const itemPath = CorpusSourcePathSchema.make(`${sourceRoot}/item.ts`);
  const text = yield* fileSystem
    .readFileString(path.join(corpusRoot, itemPath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: itemPath })
      )
    );
  const item = yield* decodeItemSource(text, itemPath);
  yield* requireFiles(sourceRoot, files, questionFiles(item));
  return QuestionSourceSchema.make({ item, number, set, sourceRoot });
});

/**
 * Reads the readings of one set and checks them against its questions: every
 * reading a question names exists in each language that question is asked
 * in, and every reading has a question.
 */
const readStimuli = Effect.fn("AksaraCorpus.readStimuli")(function* (
  set: SetPath,
  questions: readonly QuestionSource[],
  entries: readonly Extract<BankEntry, { kind: "stimulus" }>[]
) {
  const keys = Arr.dedupe(Arr.map(entries, ({ key }) => key));
  for (const { item } of questions) {
    if (item.stimulus !== undefined && !Arr.contains(keys, item.stimulus)) {
      return yield* new StimulusReferenceError({
        key: item.stimulus,
        reason: "missing",
        set,
      });
    }
  }
  return yield* Effect.forEach(Arr.sort(keys, Order.String), (key) =>
    Effect.gen(function* () {
      const users = Arr.filter(questions, ({ item }) => item.stimulus === key);
      if (!Arr.isReadonlyArrayNonEmpty(users)) {
        return yield* new StimulusReferenceError({
          key,
          reason: "unused",
          set,
        });
      }
      const languages = Arr.sort(
        Arr.dedupe(
          Arr.flatMap(users, ({ item }) =>
            Arr.map(itemVersions(item.versions), ({ language }) => language)
          )
        ),
        Order.String
      );
      const sourceRoot = setSourcePath(set, key);
      yield* requireFiles(
        sourceRoot,
        Arr.map(
          Arr.filter(entries, (entry) => entry.key === key),
          ({ file }) => file
        ),
        Arr.map(languages, (language) => `stimulus.${language}.mdx`)
      );
      return StimulusSourceSchema.make({ key, languages, set, sourceRoot });
    })
  );
});

/** Reads one set from its entries: its questions in order and its readings. */
const readSet = Effect.fn("AksaraCorpus.readSet")(function* (
  corpusRoot: string,
  set: SetPath,
  entries: readonly BankEntry[]
) {
  const questionEntries = Arr.filter(
    entries,
    (entry): entry is Extract<BankEntry, { kind: "question" }> =>
      entry.kind === "question"
  );
  const numbers = Arr.sort(
    Arr.dedupe(Arr.map(questionEntries, ({ number }) => number)),
    Order.Number
  );
  if (
    numbers.length === 0 ||
    Arr.some(numbers, (number, index) => number !== index + 1)
  ) {
    return yield* new QuestionSequenceError({ numbers, set });
  }
  const questions = yield* Effect.forEach(numbers, (number) =>
    readQuestion(
      corpusRoot,
      set,
      number,
      Arr.map(
        Arr.filter(questionEntries, (entry) => entry.number === number),
        ({ file }) => file
      )
    )
  );
  const stimuli = yield* readStimuli(
    set,
    questions,
    Arr.filter(
      entries,
      (entry): entry is Extract<BankEntry, { kind: "stimulus" }> =>
        entry.kind === "stimulus"
    )
  );
  return { path: set, questions, stimuli };
});

/**
 * Reads the given sets of the question bank: each set's questions in order
 * and its readings. A file in a set folder that is neither a question file nor
 * a reading fails.
 */
export const readQuestionSets = Effect.fn("AksaraCorpus.readQuestionSets")(
  function* (corpusRoot: string, sets: readonly SetPath[]) {
    return yield* Effect.forEach(
      sets,
      (set) =>
        Effect.flatMap(
          readEntries(corpusRoot, set, () => true),
          (entries) => readSet(corpusRoot, set, entries)
        ),
      { concurrency: 16 }
    );
  },
  Effect.provide(TypeScriptParser.layer)
);
