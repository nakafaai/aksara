import { FileSystem, Path } from "@effect/platform";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  APP_LOCALE_CODES,
  AppLocaleCodeSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type QuestionChoices,
  QuestionChoicesSchema,
} from "@nakafa/aksara-contracts/projection/question";
import {
  QUESTION_BANK_KEY_ROOT,
  QuestionSetKeySchema,
  questionKeyParts,
} from "@nakafa/aksara-contracts/question/identity";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { questionArtifactLocalesForSection } from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Schema } from "effect";

import { decodeQuestionChoiceSource } from "#corpus/question-bank/choice-source";
import type { QuestionEntry } from "#corpus/question-bank/content";
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
/** Authored choices do not exactly match the section's delivery languages. */
export class QuestionChoiceLocaleError extends Schema.TaggedError<QuestionChoiceLocaleError>()(
  "QuestionChoiceLocaleError",
  {
    actualLocales: Schema.Array(AppLocaleCodeSchema),
    expectedLocales: Schema.Array(ArtifactLocaleSchema),
    sourcePath: CorpusSourcePathSchema,
  }
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
    questionNumbers: Schema.Array(Schema.Number),
    setPath: QuestionSetKeySchema,
  }
) {}
/** Complete authored question or answer body joined with canonical choices. */
export type QuestionDocumentSource = Omit<QuestionEntry, "sourceRoot"> & {
  readonly choices: QuestionChoices;
  readonly rawMdx: string;
};
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

/** Reads and validates the localized choices for one question directory. */
export const readQuestionChoices = Effect.fn(
  "AksaraCorpus.readQuestionChoices"
)(function* (
  corpusRoot: string,
  location: Pick<QuestionLocation, "questionKey" | "sourceRoot">
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourcePath = CorpusSourcePathSchema.make(
    `${location.sourceRoot}/choices.ts`
  );
  const source = yield* fileSystem
    .readFileString(path.join(corpusRoot, sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: sourcePath })
      )
    );
  const choices = yield* decodeQuestionChoiceSource(source, sourcePath);
  const { sectionKey } = questionKeyParts(location.questionKey);
  const expectedLocales = questionArtifactLocalesForSection(sectionKey);
  const actualLocales = APP_LOCALE_CODES.filter(
    (locale) => choices[locale] !== undefined
  );
  if (
    actualLocales.length !== expectedLocales.length ||
    actualLocales.some((locale, index) => locale !== expectedLocales[index])
  ) {
    return yield* new QuestionChoiceLocaleError({
      actualLocales,
      expectedLocales,
      sourcePath,
    });
  }
  return choices;
});

/** Requires one authored question directory to contain its exact file set. */
const validateQuestionFiles = Effect.fn("AksaraCorpus.validateQuestionFiles")(
  function* (location: QuestionLocation, discoveredFiles: readonly string[]) {
    const { sectionKey } = questionKeyParts(location.questionKey);
    const expectedFiles = questionSourceFiles(sectionKey);
    const files = [...discoveredFiles].sort();
    if (
      files.length !== expectedFiles.length ||
      files.some((file, index) => file !== expectedFiles[index])
    ) {
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
    yield* validateQuestionFiles(location, discoveredFiles);
    const choices = yield* readQuestionChoices(corpusRoot, location);
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

/** Reads one registry-owned question body from its exact reviewed source path. */
export const readQuestionDocument = Effect.fn(
  "AksaraCorpus.readQuestionDocument"
)(function* <Entry extends QuestionEntry>(
  corpusRoot: string,
  entry: Entry,
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
