#!/usr/bin/env node

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Console,
  Effect,
  FileSystem,
  HashSet,
  Option,
  Path,
} from "effect";
import { correctsFiguresOnly } from "#nakafa-content/mdx/figure";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  changedFiles,
  readBase,
  resolveBase,
  touchedFiles,
} from "#nakafa-content/points/base";
import type { DocumentParts } from "#nakafa-content/points/document";
import { inspectDocument } from "#nakafa-content/points/document";
import { PointsCheckError, unreadable } from "#nakafa-content/points/error";
import { figureCorrections, keptScenes } from "#nakafa-content/points/figure";
import { collectFiles } from "#nakafa-content/points/files";
import type { PointsFinding } from "#nakafa-content/points/finding";
import { findMissingFooters } from "#nakafa-content/points/footer";
import { findLiteralPoints } from "#nakafa-content/points/literal";
import type { CheckOptions } from "#nakafa-content/points/options";
import { parseOptions } from "#nakafa-content/points/options";
import type { FileFinding, PointsReport } from "#nakafa-content/points/report";
import { printReport, shortRevision } from "#nakafa-content/points/report";
import {
  lessonOf,
  lessonScenes,
  sceneShortfalls,
} from "#nakafa-content/points/scene";
import { sceneUniquenessFindings } from "#nakafa-content/points/unique";
import { findVisualLoss } from "#nakafa-content/points/visual";

const LESSON_CORPUS_ROOT = "packages/corpus/material/lesson";

/** Orders findings by their position in one document. */
function byPosition(left: PointsFinding, right: PointsFinding): number {
  return left.line - right.line || left.column - right.column;
}

/** Parses one authored document, naming the revision it was read from. */
const parseDocument = Effect.fn("PointsCheck.parseDocument")(
  (label: string, source: string) =>
    Effect.try({
      catch: (cause) =>
        new PointsCheckError({
          detail: `Cannot parse ${label}: ${String(cause)}`,
          reason: "unparseable-document",
        }),
      try: () => {
        const tree: MdxNode = parseLessonMdx(source, label);
        return { document: inspectDocument(tree), tree };
      },
    })
);

/** Reads and parses one document from the working tree. */
const loadDocument = Effect.fn("PointsCheck.loadDocument")(function* (
  root: string,
  file: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const source = yield* fileSystem
    .readFileString(path.join(root, file))
    .pipe(Effect.mapError(unreadable(file)));
  const { document, tree } = yield* parseDocument(file, source);
  return { document, source, tree };
});

/** The lesson folders that the touched files belong to. */
function lessonsOf(touched: readonly string[]) {
  return HashSet.fromIterable(
    Arr.flatMap(touched, (file) =>
      Option.toArray(Option.map(lessonOf(file), ({ lesson }) => lesson))
    )
  );
}

/**
 * Adds every section file of the corpus lessons that the targets left out,
 * because a lesson's scene count spans all of its sections and cross-lesson
 * visual uniqueness compares against every other lesson in the corpus.
 */
const corpusLessonDocuments = Effect.fn("PointsCheck.corpusLessonDocuments")(
  function* (
    root: string,
    lessons: HashSet.HashSet<string>,
    documents: readonly (readonly [string, DocumentParts])[]
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const loaded = HashSet.fromIterable(Arr.map(documents, ([file]) => file));
    const hasCorpusRoot = yield* fileSystem
      .exists(path.join(root, LESSON_CORPUS_ROOT))
      .pipe(Effect.mapError(unreadable(LESSON_CORPUS_ROOT)));
    const roots = hasCorpusRoot
      ? [LESSON_CORPUS_ROOT]
      : yield* Effect.filter(Arr.fromIterable(lessons), (lesson) =>
          fileSystem
            .exists(path.join(root, lesson))
            .pipe(Effect.mapError(unreadable(lesson)))
        );
    if (roots.length === 0) {
      return documents;
    }
    const missing = Arr.filter(
      yield* collectFiles(root, roots),
      (file) => !HashSet.has(loaded, file)
    );
    const added = yield* Effect.forEach(missing, (file) =>
      Effect.map(
        loadDocument(root, file),
        ({ document }) => [file, document] as const
      )
    );
    return Arr.appendAll(documents, added);
  }
);

/** Checks every document below the targets against the rules and its base. */
const checkPoints = Effect.fn("PointsCheck.checkPoints")(function* (
  root: string,
  options: CheckOptions
) {
  const path = yield* Path.Path;
  const files = yield* collectFiles(root, options.targets);
  const base = yield* resolveBase(root, options.base);
  const targets = options.targets.map(
    (target) => path.relative(root, path.resolve(root, target)) || "."
  );
  const changed = yield* changedFiles(root, base, targets);
  const touched = yield* touchedFiles(root, base, targets);
  const touchedSet = HashSet.fromIterable(touched);
  const findings: FileFinding[] = [];
  const documents: [string, DocumentParts][] = [];
  let compared = 0;
  for (const file of files) {
    const { document, source, tree } = yield* loadDocument(root, file);
    documents.push([file, document]);
    const found = findLiteralPoints(source, document);
    const baseFile = changed.get(file);
    let figureOnly = false;
    if (baseFile !== undefined) {
      compared += 1;
      const baseSource = yield* readBase(root, base, baseFile);
      const { document: baseDocument, tree: baseTree } = yield* parseDocument(
        `${baseFile} at ${shortRevision(base)}`,
        baseSource
      );
      figureOnly =
        baseFile === file &&
        correctsFiguresOnly(
          { source: baseSource, tree: baseTree },
          { source, tree }
        );
      const loss = findVisualLoss(baseDocument, document);
      if (loss) {
        found.push(loss);
      }
    }
    if (options.all || (HashSet.has(touchedSet, file) && !figureOnly)) {
      found.push(...findMissingFooters(tree));
    }
    findings.push(
      ...found.sort(byPosition).map((entry) => ({ ...entry, file }))
    );
  }
  const lessons = lessonsOf(touched);
  const scenes = yield* corpusLessonDocuments(root, lessons, documents);
  // A lesson whose change only corrects its figures keeps its count (D26).
  const corrections = yield* figureCorrections(root, base, touched, changed);
  const now = lessonScenes(scenes);
  const before = lessonScenes(
    Arr.map(
      scenes,
      ([file, document]) =>
        [file, corrections.baseParts.get(file) ?? document] as const
    )
  );
  const checked = options.all
    ? HashSet.fromIterable(Arr.map(now, ({ lesson }) => lesson))
    : HashSet.difference(lessons, keptScenes(corrections.lessons, now, before));
  return {
    base,
    compared,
    files: files.length,
    findings,
    scenes: sceneShortfalls(now, checked),
    uniqueness: sceneUniquenessFindings(scenes, checked),
  } satisfies PointsReport;
});

/** Runs the gate with every typed failure reported as exit code 2. */
export const runMain = Effect.fn("PointsCheck.runMain")(function* (
  arguments_: readonly string[],
  root: string
) {
  return yield* Effect.provide(
    Effect.gen(function* () {
      const options = yield* parseOptions(arguments_);
      return yield* printReport(yield* checkPoints(root, options));
    }).pipe(
      Effect.catchTag("PointsCheckError", (error) =>
        Console.error(`${error._tag} [${error.reason}]: ${error.detail}`).pipe(
          Effect.as(2)
        )
      )
    ),
    NodeServices.layer
  );
});

if (process.argv[1] === import.meta.filename) {
  runMain(process.argv.slice(2), process.cwd()).pipe(
    Effect.andThen((code) =>
      Effect.sync(() => {
        process.exitCode = code;
      })
    ),
    NodeRuntime.runMain
  );
}
