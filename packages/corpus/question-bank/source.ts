import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  APP_LOCALE_CODES,
  AppLocaleCodeSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
  artifactLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  QUESTION_BANK_KEY_ROOT,
  QuestionSetKeySchema,
} from "@nakafa/aksara-contracts/question/identity";
import { QuestionItemSchema } from "@nakafa/aksara-contracts/question/item";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { questionArtifactLocalesForPolicy } from "@nakafa/aksara-contracts/tryout/language";
import { Effect, FileSystem, Path, Schema } from "effect";
import { decodeQuestionItemSource } from "#corpus/question-bank/item-source";
import {
  decodeQuestionPath,
  locateQuestionEntry,
  QUESTION_BANK_ROOT,
  type QuestionBankIndex,
  type QuestionLocation,
  QuestionLocationSchema,
  QuestionPathError,
  questionSourceFiles,
} from "#corpus/question-bank/path";

const isTryoutKey = Schema.is(TryoutKeySchema);
/** One complete authored question directory discovered from the checkout. */
export const QuestionSourceSchema = Schema.Struct({
  ...QuestionLocationSchema.fields,
  files: Schema.Array(Schema.String),
  item: QuestionItemSchema,
});
export type QuestionSource = typeof QuestionSourceSchema.Type;

/** Indexes canonical items once by their physical question directory. */
export function indexQuestionItems(sources: readonly QuestionSource[]) {
  return new Map(sources.map(({ item, sourceRoot }) => [sourceRoot, item]));
}
/** Reading a question-bank directory or source file failed. */
export class QuestionReadError extends Schema.TaggedError<QuestionReadError>()(
  "QuestionReadError",
  { cause: Schema.Unknown, path: CorpusSourcePathSchema }
) {}
/** A question directory does not contain its exact section-owned file set. */
export class QuestionFileSetError extends Schema.TaggedError<QuestionFileSetError>()(
  "QuestionFileSetError",
  {
    files: Schema.Array(Schema.String),
    sourcePath: CorpusSourcePathSchema,
  }
) {}
/** A set does not contain a contiguous question sequence beginning at one. */
export class QuestionSequenceError extends Schema.TaggedError<QuestionSequenceError>()(
  "QuestionSequenceError",
  {
    questionNumbers: Schema.Array(Schema.Finite),
    setPath: QuestionSetKeySchema,
  }
) {}

/** An authored item does not exactly match its section-owned locales. */
export class QuestionItemLocaleError extends Schema.TaggedError<QuestionItemLocaleError>()(
  "QuestionItemLocaleError",
  {
    actualLocales: Schema.Array(AppLocaleCodeSchema),
    expectedLocales: Schema.Array(ArtifactLocaleSchema),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Returns canonical locale keys present in one decoded item. */
function actualItemLocales(item: typeof QuestionItemSchema.Type) {
  return APP_LOCALE_CODES.filter(
    (appLocale) => item.responses[appLocale] !== undefined
  );
}

/** Requires one owner source to contain exactly its assessed item locales. */
const validateQuestionItemLocales = Effect.fn(
  "AksaraCorpus.validateQuestionItemLocales"
)(function* (
  item: typeof QuestionItemSchema.Type,
  expectedLocales: readonly ArtifactLocale[],
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  const actualLocales = actualItemLocales(item);
  const matches =
    actualLocales.length === expectedLocales.length &&
    expectedLocales.every(
      (expected, index) => actualLocales[index] === artifactLocaleCode(expected)
    );
  if (!matches) {
    return yield* new QuestionItemLocaleError({
      actualLocales,
      expectedLocales: [...expectedLocales],
      sourcePath,
    });
  }
  return item;
});
/** Groups every recursive directory entry beneath its question directory. */
function groupQuestionFiles(entries: readonly string[], separator: string) {
  const filesByRoot = new Map<string, Set<string>>();

  for (const entry of entries) {
    const located = locateQuestionEntry(entry, separator);
    if (located === undefined) {
      continue;
    }

    const files = filesByRoot.get(located.root) ?? new Set<string>();
    if (located.file.length > 0) {
      files.add(located.file);
    }
    filesByRoot.set(located.root, files);
  }

  return [...filesByRoot.entries()].sort(([left], [right]) =>
    compareCodeUnits(left, right)
  );
}

/** Derives every reviewed physical ancestor from the renderer bank index. */
function questionAncestors(questionBanks: QuestionBankIndex) {
  const ancestors = new Set<string>();
  const prefix = `${QUESTION_BANK_KEY_ROOT}/`;
  for (const bankKey of questionBanks.keys()) {
    const segments = bankKey.slice(prefix.length).split("/");
    for (let length = 1; length <= segments.length; length += 1) {
      ancestors.add(segments.slice(0, length).join("/"));
    }
  }
  return ancestors;
}

/** Accepts a reviewed bank ancestor or one generic set beneath that bank. */
function isQuestionAncestor(
  sourcePath: string,
  questionBanks: QuestionBankIndex,
  ancestors: ReadonlySet<string>
) {
  if (ancestors.has(sourcePath)) {
    return true;
  }
  const separator = sourcePath.lastIndexOf("/");
  if (separator === -1) {
    return false;
  }
  const bankKey = `${QUESTION_BANK_KEY_ROOT}/${sourcePath.slice(0, separator)}`;
  return (
    questionBanks.has(bankKey) && isTryoutKey(sourcePath.slice(separator + 1))
  );
}

/** Reads and validates the localized response item for one question directory. */
export const readQuestionItem = Effect.fn("AksaraCorpus.readQuestionItem")(
  function* (
    corpusRoot: string,
    location: Pick<QuestionLocation, "languagePolicy" | "sourceRoot">
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const sourcePath = CorpusSourcePathSchema.make(
      `${location.sourceRoot}/item.ts`
    );
    const source = yield* fileSystem
      .readFileString(path.join(corpusRoot, sourcePath), "utf8")
      .pipe(
        Effect.mapError(
          (cause) => new QuestionReadError({ cause, path: sourcePath })
        )
      );
    const item = yield* decodeQuestionItemSource(source, sourcePath);
    return yield* validateQuestionItemLocales(
      item,
      questionArtifactLocalesForPolicy(location.languagePolicy),
      sourcePath
    );
  }
);

/** Requires one authored question directory to contain its exact file set. */
const validateQuestionFiles = Effect.fn("AksaraCorpus.validateQuestionFiles")(
  function* (location: QuestionLocation, discoveredFiles: readonly string[]) {
    const requiredFiles = questionSourceFiles(location.languagePolicy);
    const files = [...discoveredFiles].sort();
    const missingRequired = requiredFiles.some((file) => !files.includes(file));
    const unsupported = files.some((file) => !requiredFiles.includes(file));
    if (missingRequired || unsupported) {
      return yield* new QuestionFileSetError({
        files,
        sourcePath: location.sourceRoot,
      });
    }
  }
);

/** Reads and validates exactly one selected authored question directory. */
export const readQuestionSource = Effect.fn("AksaraCorpus.readQuestionSource")(
  function* (corpusRoot: string, location: QuestionLocation) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const files = yield* fileSystem
      .readDirectory(path.join(corpusRoot, location.sourceRoot))
      .pipe(
        Effect.mapError(
          (cause) => new QuestionReadError({ cause, path: location.sourceRoot })
        )
      );
    return yield* loadQuestionSource(corpusRoot, location, files);
  }
);

/** Builds one complete question source from already-discovered direct files. */
const loadQuestionSource = Effect.fn("AksaraCorpus.loadQuestionSource")(
  function* (
    corpusRoot: string,
    location: QuestionLocation,
    discoveredFiles: readonly string[]
  ) {
    const files = [...discoveredFiles].sort();
    yield* validateQuestionFiles(location, files);
    const item = yield* readQuestionItem(corpusRoot, location);
    return { ...location, files, item };
  }
);

/** Validates contiguous numbering within each exact source-owned set. */
const validateSequences = Effect.fn("AksaraCorpus.validateQuestionSequences")(
  function* (sources: readonly QuestionSource[]) {
    const numbersBySet = new Map<QuestionSource["setKey"], Set<number>>();
    for (const source of sources) {
      const numbers = numbersBySet.get(source.setKey) ?? new Set<number>();
      numbers.add(source.questionNumber);
      numbersBySet.set(source.setKey, numbers);
    }

    for (const [setPath, numbers] of numbersBySet) {
      const ordered = [...numbers].sort((left, right) => left - right);
      if (ordered.some((number, index) => number !== index + 1)) {
        return yield* new QuestionSequenceError({
          questionNumbers: ordered,
          setPath,
        });
      }
    }
    return sources;
  }
);

/** Discovers every complete question directory without a document import map. */
export const discoverQuestionSources = Effect.fn(
  "AksaraCorpus.discoverQuestionSources"
)(function* (corpusRoot: string, questionBanks: QuestionBankIndex) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const ancestors = questionAncestors(questionBanks);
  const absoluteRoot = path.join(corpusRoot, QUESTION_BANK_ROOT);
  const entries = yield* fileSystem
    .readDirectory(absoluteRoot, { recursive: true })
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: QUESTION_BANK_ROOT })
      )
    );
  const invalidEntry = entries.find((entry) => {
    const normalized = entry.split(path.sep).join("/");
    return (
      locateQuestionEntry(entry, path.sep) === undefined &&
      !isQuestionAncestor(normalized, questionBanks, ancestors)
    );
  });
  if (invalidEntry !== undefined) {
    return yield* new QuestionPathError({
      reason: "grammar",
      sourcePath: `${QUESTION_BANK_ROOT}/${invalidEntry
        .split(path.sep)
        .join("/")}`,
    });
  }

  const directories = groupQuestionFiles(entries, path.sep);
  const sources = yield* Effect.forEach(
    directories,
    ([physicalRoot, discoveredFiles]) =>
      Effect.gen(function* () {
        const location = yield* decodeQuestionPath(questionBanks, physicalRoot);
        return yield* loadQuestionSource(corpusRoot, location, [
          ...discoveredFiles,
        ]);
      }),
    { concurrency: 32 }
  );

  return yield* validateSequences(sources);
});
