#!/usr/bin/env node

import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem } from "effect";
import type { PlatformError } from "effect/PlatformError";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  changedFiles,
  readBase,
  resolveBase,
} from "#nakafa-content/points/base";
import { PointsCheckError } from "#nakafa-content/points/error";
import type { PointsFinding } from "#nakafa-content/points/finding";
import { findLiteralPoints } from "#nakafa-content/points/literal";
import { findVisualLoss } from "#nakafa-content/points/visual";

const DEFAULT_BASE = "origin/main";
const USAGE = "Usage: points/check.ts <directory or file>... [--base <ref>]";
const SHORT_REVISION_LENGTH = 7;

interface CheckOptions {
  readonly base: string;
  readonly targets: readonly string[];
}

interface FileFinding extends PointsFinding {
  readonly file: string;
}

interface PointsReport {
  readonly base: string;
  readonly compared: number;
  readonly files: number;
  readonly findings: readonly FileFinding[];
}

/** Maps a platform failure on one path to the typed unreadable-entry failure. */
function unreadable(path: string) {
  return (error: PlatformError) =>
    new PointsCheckError({
      detail: `Cannot read ${path}: ${error.message}`,
      reason: "unreadable-entry",
    });
}

/** Orders findings by their position in one document. */
function byPosition(left: PointsFinding, right: PointsFinding): number {
  return left.line - right.line || left.column - right.column;
}

/** Reads the target paths and the revision that visuals are compared with. */
const parseOptions = Effect.fn("PointsCheck.parseOptions")(function* (
  arguments_: readonly string[]
) {
  const parsed = yield* Effect.try({
    catch: (cause) =>
      new PointsCheckError({
        detail: `${USAGE}\n${String(cause)}`,
        reason: "invalid-arguments",
      }),
    try: () =>
      parseArgs({
        allowPositionals: true,
        args: [...arguments_],
        options: { base: { type: "string" } },
        strict: true,
      }),
  });
  if (parsed.positionals.length === 0) {
    return yield* new PointsCheckError({
      detail: USAGE,
      reason: "invalid-arguments",
    });
  }
  return {
    base: parsed.values.base ?? DEFAULT_BASE,
    targets: parsed.positionals,
  } satisfies CheckOptions;
});

/** Lists every MDX file below the targets, relative to the repository root. */
const collectFiles = Effect.fn("PointsCheck.collectFiles")(function* (
  root: string,
  targets: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const files = new Set<string>();
  for (const target of targets) {
    const absolute = resolve(root, target);
    const info = yield* fileSystem
      .stat(absolute)
      .pipe(Effect.mapError(unreadable(target)));
    if (info.type !== "Directory") {
      files.add(relative(root, absolute));
      continue;
    }
    const entries = yield* fileSystem
      .readDirectory(absolute, { recursive: true })
      .pipe(Effect.mapError(unreadable(target)));
    for (const entry of entries.filter((name) => name.endsWith(".mdx"))) {
      files.add(relative(root, join(absolute, entry)));
    }
  }
  if (files.size === 0) {
    return yield* new PointsCheckError({
      detail: `No MDX files found under ${targets.join(", ")}`,
      reason: "empty-targets",
    });
  }
  return [...files].sort();
});

/** Parses one authored document, naming the revision it was read from. */
const parseDocument = Effect.fn("PointsCheck.parseDocument")(
  (label: string, source: string) =>
    Effect.try({
      catch: (cause) =>
        new PointsCheckError({
          detail: `Cannot parse ${label}: ${String(cause)}`,
          reason: "unparseable-document",
        }),
      try: () => parseLessonMdx(source, label),
    })
);

/** Reads and parses one document from the working tree. */
const readDocument = Effect.fn("PointsCheck.readDocument")(function* (
  root: string,
  file: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(join(root, file))
    .pipe(Effect.mapError(unreadable(file)));
  const tree = yield* parseDocument(file, source);
  return { source, tree };
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
    const { source, tree } = yield* readDocument(root, file);
    const found = findLiteralPoints(source, tree);
    if (changed.has(file)) {
      compared += 1;
      const baseSource = yield* readBase(root, base, file);
      const baseTree = yield* parseDocument(
        `${file} at ${base.slice(0, SHORT_REVISION_LENGTH)}`,
        baseSource
      );
      const loss = findVisualLoss(baseTree, tree);
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

/** Prints one report and returns the stable process exit code. */
const printReport = Effect.fn("PointsCheck.printReport")(function* (
  report: PointsReport
) {
  // Output stays on the console globals so tests can capture it.
  for (const { column, file, line, message, rule } of report.findings) {
    yield* Effect.sync(() =>
      console.error(`${file}:${line}:${column} [${rule}] ${message}`)
    );
  }
  const revision = report.base.slice(0, SHORT_REVISION_LENGTH);
  if (report.findings.length === 0) {
    yield* Effect.sync(() =>
      console.log(
        `Points check passed for ${report.files} files and compared ${report.compared} changed files with ${revision}.`
      )
    );
    return 0;
  }
  const affected = new Set(report.findings.map(({ file }) => file)).size;
  yield* Effect.sync(() =>
    console.error(
      `Points check found ${report.findings.length} finding(s) in ${affected} of ${report.files} files, compared with ${revision}.`
    )
  );
  return 1;
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
