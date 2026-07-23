import { FileSystem, Path } from "@effect/platform";
import type { ContentDeliveryClass } from "@nakafa/aksara-contracts/delivery";
import {
  type QuestionChoices,
  QuestionChoicesSchema,
  QuestionSetKeySchema,
} from "@nakafa/aksara-contracts/projection/question";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import { decodeQuestionChoiceSource } from "#corpus/question-bank/choice-source";
import {
  decodeQuestionPath,
  QUESTION_BANK_ROOT,
  QuestionLocationSchema,
  QuestionPathError,
} from "#corpus/question-bank/path";
import type { QuestionEntry } from "#corpus/question-bank/registry";

const EXPECTED_FILES = [
  "answer.en.mdx",
  "answer.id.mdx",
  "choices.ts",
  "question.en.mdx",
  "question.id.mdx",
];
const QUESTION_ANCESTOR_PATTERN =
  /^(?:snbt|tka)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*){0,2}(?:\/set-[1-9]\d*)?$/;

/** One complete authored question directory discovered from the checkout. */
export const QuestionSourceSchema = Schema.Struct({
  ...QuestionLocationSchema.fields,
  choices: QuestionChoicesSchema,
});
export type QuestionSource = typeof QuestionSourceSchema.Type;
/** Reading a question-bank directory or source file failed. */
export class QuestionReadError extends Schema.TaggedError<QuestionReadError>()(
  "QuestionReadError",
  { cause: Schema.Unknown, path: Schema.String }
) {}
/** A question directory does not contain exactly its five required files. */
export class QuestionFileSetError extends Schema.TaggedError<QuestionFileSetError>()(
  "QuestionFileSetError",
  {
    files: Schema.Array(Schema.String),
    sourcePath: Schema.String,
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

/** Complete authored question or answer body passed to release preparation. */
export interface QuestionDocumentSource {
  readonly bodyKind: QuestionEntry["bodyKind"];
  readonly choices: QuestionChoices;
  readonly contentKey: QuestionEntry["contentKey"];
  readonly delivery: ContentDeliveryClass;
  readonly locale: QuestionEntry["locale"];
  readonly peerContentKey: QuestionEntry["peerContentKey"];
  readonly questionKey: QuestionEntry["questionKey"];
  readonly questionNumber: QuestionEntry["questionNumber"];
  readonly rawMdx: string;
  readonly rendererDomain: RendererDomain;
  readonly setKey: QuestionEntry["setKey"];
  readonly sourcePath: QuestionEntry["sourcePath"];
}

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
const readChoices = Effect.fn("AksaraCorpus.readQuestionChoices")(function* (
  corpusRoot: string,
  sourceRoot: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourcePath = `${sourceRoot}/choices.ts`;
  const source = yield* fileSystem
    .readFileString(path.join(corpusRoot, sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: sourcePath })
      )
    );
  return yield* decodeQuestionChoiceSource(source, sourcePath);
});

/** Validates contiguous numbering while leaving aliases to registry identity. */
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
)(function* (corpusRoot: string) {
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
        const files = [...discoveredFiles].sort();
        if (
          files.length !== EXPECTED_FILES.length ||
          files.some((file, index) => file !== EXPECTED_FILES[index])
        ) {
          return yield* new QuestionFileSetError({
            files,
            sourcePath: `${QUESTION_BANK_ROOT}/${physicalRoot}`,
          });
        }

        const source = yield* decodeQuestionPath(physicalRoot);
        const choices = yield* readChoices(corpusRoot, source.sourceRoot);
        return { ...source, choices } satisfies QuestionSource;
      }),
    { concurrency: 32 }
  );

  return yield* validateSequences(sources);
});

/** Reads one registry-owned question body from its exact reviewed source path. */
export const readQuestionDocument = Effect.fn(
  "AksaraCorpus.readQuestionDocument"
)(function* (corpusRoot: string, entry: QuestionEntry) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const rawMdx = yield* fileSystem
    .readFileString(path.join(corpusRoot, entry.sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: entry.sourcePath })
      )
    );

  return {
    bodyKind: entry.bodyKind,
    choices: entry.choices,
    contentKey: entry.contentKey,
    delivery: entry.delivery,
    locale: entry.locale,
    peerContentKey: entry.peerContentKey,
    questionKey: entry.questionKey,
    questionNumber: entry.questionNumber,
    rawMdx,
    rendererDomain: entry.rendererDomain,
    setKey: entry.setKey,
    sourcePath: entry.sourcePath,
  } satisfies QuestionDocumentSource;
});
