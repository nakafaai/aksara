import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  Option,
  Path,
  Result,
  Schema,
} from "effect";
import {
  type BankEntry,
  QUESTION_BANK_ROOT,
  readBankEntry,
  type SetPath,
} from "#corpus/question-bank/path";

/** Reading the question bank or one of its files failed. */
export class QuestionReadError extends Schema.TaggedError<
  QuestionReadError,
  { readonly brand: unique symbol }
>()("QuestionReadError", {
  cause: Schema.Unknown,
  path: CorpusSourcePathSchema,
}) {}

/** A path in the question bank belongs to no set of an active exam. */
export class QuestionBankPathError extends Schema.TaggedError<
  QuestionBankPathError,
  { readonly brand: unique symbol }
>()("QuestionBankPathError", { path: Schema.String }) {}

/** Lists every file below one folder, as paths relative to the bank root. */
const listBank = Effect.fn("AksaraCorpus.listBank")(function* (
  corpusRoot: string,
  below: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const folder = Arr.join(
    Arr.filter([QUESTION_BANK_ROOT, below], (part) => part !== ""),
    "/"
  );
  const listed = yield* fileSystem
    .readDirectory(path.join(corpusRoot, folder), { recursive: true })
    .pipe(
      Effect.mapError(
        (cause) =>
          new QuestionReadError({
            cause,
            path: CorpusSourcePathSchema.make(folder),
          })
      )
    );
  return Arr.map(listed, (entry) =>
    Arr.join(
      Arr.filter([below, ...entry.split(path.sep)], (part) => part !== ""),
      "/"
    )
  );
});

/** The folders that hold the files of the bank, so they are not stray entries. */
function foldersOf(files: readonly string[]) {
  return HashSet.fromIterable(
    Arr.flatMap(files, (file) => {
      const segments = file.split("/");
      return Arr.map(Arr.range(1, segments.length - 1), (length) =>
        Arr.join(Arr.take(segments, length), "/")
      );
    })
  );
}

/**
 * Reads the entries below one folder of the bank. A path that is neither a
 * bank file nor a folder holding one fails, and so does a bank file that does
 * not belong.
 */
export const readEntries = Effect.fn("AksaraCorpus.readEntries")(function* (
  corpusRoot: string,
  below: string,
  belongs: (entry: BankEntry) => boolean
) {
  const listed = yield* listBank(corpusRoot, below);
  const entries = Arr.map(listed, (path) => ({
    entry: readBankEntry(path),
    path,
  }));
  const folders = foldersOf(
    Arr.filterMap(entries, ({ entry, path }) =>
      Option.isSome(entry) ? Result.succeed(path) : Result.failVoid
    )
  );
  const stray = Arr.findFirst(entries, ({ entry, path }) =>
    Option.match(entry, {
      onNone: () => !HashSet.has(folders, path),
      onSome: (found) => !belongs(found),
    })
  );
  if (Option.isSome(stray)) {
    return yield* new QuestionBankPathError({ path: stray.value.path });
  }
  return Arr.getSomes(Arr.map(entries, ({ entry }) => entry));
});

/**
 * Requires every file of the question bank to belong to one of the given
 * sets, so no question or reading is left outside an active exam.
 */
export const requireCompleteBank = Effect.fn(
  "AksaraCorpus.requireCompleteBank"
)(function* (corpusRoot: string, sets: readonly SetPath[]) {
  const active = HashSet.fromIterable(sets);
  yield* readEntries(corpusRoot, "", ({ set }) => HashSet.has(active, set));
});
