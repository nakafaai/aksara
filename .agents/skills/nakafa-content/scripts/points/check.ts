#!/usr/bin/env node

import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem } from "effect";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  changedFiles,
  readBase,
  resolveBase,
} from "#nakafa-content/points/base";
import { inspectDocument } from "#nakafa-content/points/document";
import { PointsCheckError, unreadable } from "#nakafa-content/points/error";
import { collectFiles } from "#nakafa-content/points/files";
import type { PointsFinding } from "#nakafa-content/points/finding";
import { findLiteralPoints } from "#nakafa-content/points/literal";
import {
  type CheckOptions,
  parseOptions,
} from "#nakafa-content/points/options";
import {
  type FileFinding,
  type PointsReport,
  printReport,
  shortRevision,
} from "#nakafa-content/points/report";
import { findVisualLoss } from "#nakafa-content/points/visual";

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
      try: () => inspectDocument(parseLessonMdx(source, label)),
    })
);

/** Reads and parses one document from the working tree. */
const loadDocument = Effect.fn("PointsCheck.loadDocument")(function* (
  root: string,
  file: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(join(root, file))
    .pipe(Effect.mapError(unreadable(file)));
  const document = yield* parseDocument(file, source);
  return { document, source };
});

/** Checks every document below the targets against the rules and its base. */
const checkPoints = Effect.fn("PointsCheck.checkPoints")(function* (
  root: string,
  options: CheckOptions
) {
  const files = yield* collectFiles(root, options.targets);
  const base = yield* resolveBase(root, options.base);
  const changed = yield* changedFiles(
    root,
    base,
    options.targets.map(
      (target) => relative(root, resolve(root, target)) || "."
    )
  );
  const findings: FileFinding[] = [];
  let compared = 0;
  for (const file of files) {
    const { document, source } = yield* loadDocument(root, file);
    const found = findLiteralPoints(source, document);
    const baseFile = changed.get(file);
    if (baseFile !== undefined) {
      compared += 1;
      const baseSource = yield* readBase(root, base, baseFile);
      const baseDocument = yield* parseDocument(
        `${baseFile} at ${shortRevision(base)}`,
        baseSource
      );
      const loss = findVisualLoss(baseDocument, document);
      if (loss) {
        found.push(loss);
      }
    }
    findings.push(
      ...found.sort(byPosition).map((entry) => ({ ...entry, file }))
    );
  }
  return {
    base,
    compared,
    files: files.length,
    findings,
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
        Effect.sync(() =>
          console.error(`${error._tag} [${error.reason}]: ${error.detail}`)
        ).pipe(Effect.as(2))
      )
    ),
    NodeServices.layer
  );
});

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runMain(process.argv.slice(2), process.cwd()).pipe(
    Effect.andThen((code) =>
      Effect.sync(() => {
        process.exitCode = code;
      })
    ),
    NodeRuntime.runMain
  );
}
