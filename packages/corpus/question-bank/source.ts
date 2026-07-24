import { FileSystem, Path } from "@effect/platform";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type QuestionChoices,
  QuestionChoicesSchema,
} from "@nakafa/aksara-contracts/projection/question";
import { QuestionSetKeySchema } from "@nakafa/aksara-contracts/question/identity";
import { Effect, Schema } from "effect";

import { decodeQuestionChoiceSource } from "#corpus/question-bank/choice-source";
import type { QuestionEntry } from "#corpus/question-bank/content";
import {
  decodeQuestionPath,
  QUESTION_BANK_ROOT,
  QUESTION_SOURCE_FILES,
  type QuestionLocation,
  QuestionLocationSchema,
  QuestionPathError,
} from "#corpus/question-bank/path";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const QUESTION_ANCESTOR_PATTERN =
  /^(?:snbt|tka)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*){0,1}(?:\/set-[1-9]\d*)?$/;

/** One complete authored question directory discovered from the checkout. */
export const QuestionSourceSchema = Schema.Struct({
  ...QuestionLocationSchema.fields,
  choices: QuestionChoicesSchema,
});
export type QuestionSource = typeof QuestionSourceSchema.Type;

/** Indexes canonical choices once by their physical question directory. */
export function indexQuestionChoices(sources: readonly QuestionSource[]) {
  return new Map(
    sources.map(({ choices, sourceRoot }) => [sourceRoot, choices])
  );
}

/** Reading a question-bank directory or source file failed. */
export class QuestionReadError extends Schema.TaggedError<QuestionReadError>()(
  "QuestionReadError",
  { cause: Schema.Unknown, path: CorpusSourcePathSchema }
) {}
/** A question directory does not contain exactly its five required files. */
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
    questionNumbers: Schema.Array(Schema.Number),
    setPath: QuestionSetKeySchema,
  }
) {}

/** Complete authored question or answer body joined with canonical choices. */
export type QuestionDocumentSource = Omit<QuestionEntry, "sourceRoot"> & {
  readonly choices: QuestionChoices;
  readonly rawMdx: string;
};

/** Finds the owning question directory and its direct relative file path. */
function locateQuestionEntry(entry: string, separator: string) {
  const segments = entry.split(separator);
  const questionIndex = segments.findIndex((segment) =>
    segment.startsWith("question-")
  );
  if (questionIndex === -1) {
    return;
  }

  return {
    file: segments.slice(questionIndex + 1).join("/"),
    root: segments.slice(0, questionIndex + 1).join("/"),
  };
}

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
    left.localeCompare(right)
  );
}

/** Reads and validates the localized choices for one question directory. */
export const readQuestionChoices = Effect.fn(
  "AksaraCorpus.readQuestionChoices"
)(function* (corpusRoot: string, sourceRoot: QuestionSource["sourceRoot"]) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourcePath = CorpusSourcePathSchema.make(`${sourceRoot}/choices.ts`);
  const source = yield* fileSystem
    .readFileString(path.join(corpusRoot, sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: sourcePath })
      )
    );
  return yield* decodeQuestionChoiceSource(source, sourcePath);
});

/** Requires one authored question directory to contain its exact file set. */
const validateQuestionFiles = Effect.fn("AksaraCorpus.validateQuestionFiles")(
  function* (
    sourcePath: typeof CorpusSourcePathSchema.Type,
    discoveredFiles: readonly string[]
  ) {
    const files = [...discoveredFiles].sort();
    if (
      files.length !== QUESTION_SOURCE_FILES.length ||
      files.some((file, index) => file !== QUESTION_SOURCE_FILES[index])
    ) {
      return yield* new QuestionFileSetError({ files, sourcePath });
    }
  }
);

/** Reads and validates exactly one selected authored question directory. */
export const readQuestionSource = Effect.fn("AksaraCorpus.readQuestionSource")(
  function* (corpusRoot: string, location: QuestionLocation) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const absoluteRoot = path.join(corpusRoot, location.sourceRoot);
    const files = yield* fileSystem
      .readDirectory(absoluteRoot)
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
    yield* validateQuestionFiles(location.sourceRoot, discoveredFiles);
    const choices = yield* readQuestionChoices(corpusRoot, location.sourceRoot);
    return { ...location, choices } satisfies QuestionSource;
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
)(function* (corpusRoot: string, tryoutSources: readonly TryoutExamSource[]) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
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
      !QUESTION_ANCESTOR_PATTERN.test(normalized)
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
        const location = yield* decodeQuestionPath(tryoutSources, physicalRoot);
        return yield* loadQuestionSource(corpusRoot, location, [
          ...discoveredFiles,
        ]);
      }),
    { concurrency: 32 }
  );

  return yield* validateSequences(sources);
});

/** Reads one registry-owned question body from its exact reviewed source path. */
export const readQuestionDocument = Effect.fn(
  "AksaraCorpus.readQuestionDocument"
)(function* (
  corpusRoot: string,
  entry: QuestionEntry,
  choices: QuestionChoices
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const rawMdx = yield* fileSystem
    .readFileString(path.join(corpusRoot, entry.sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: entry.sourcePath })
      )
    );

  const { sourceRoot: _sourceRoot, ...document } = entry;
  return {
    ...document,
    choices,
    rawMdx,
  } satisfies QuestionDocumentSource;
});
