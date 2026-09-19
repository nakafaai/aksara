#!/usr/bin/env node

import { basename, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect, FileSystem } from "effect";
import { reviewTeachingSections } from "#nakafa-content/body/review";
import { findLessonHighlightIssues } from "#nakafa-content/highlight/presence";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findDocumentIssues,
  questionBodyKind,
} from "#nakafa-content/voice/document";
import { LessonVoiceCheckError } from "#nakafa-content/voice/error";
import { type CliOptions, parseArguments } from "#nakafa-content/voice/options";
import { findSiblingRepresentationIssues } from "#nakafa-content/voice/parity";
import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice/policy";
import {
  isLessonVoiceLocale,
  type LessonVoiceLocale,
  type LessonVoiceReport,
} from "#nakafa-content/voice/types";

interface LessonFile {
  file: string;
  locale: LessonVoiceLocale;
}

/**
 * Reads the locale from a locale-qualified file name.
 *
 * Lessons and articles are named `<locale>.mdx`; question-bank files carry a
 * role prefix such as `answer.id.mdx`. Both shapes end in the locale segment.
 */
function localeFromFile(file: string): string {
  const stem = basename(file, ".mdx");
  const separator = stem.lastIndexOf(".");
  return separator === -1 ? stem : stem.slice(separator + 1);
}

/** Returns true for symbolic links, which the checker never follows. */
const isSymbolicLink = Effect.fn("LessonVoiceCheck.isSymbolicLink")(function* (
  fileSystem: FileSystem.FileSystem,
  file: string
) {
  return yield* Effect.match(fileSystem.readLink(file), {
    onFailure: () => false,
    onSuccess: () => true,
  });
});

/** Returns true for directories; files and missing entries read as files. */
const isDirectory = Effect.fn("LessonVoiceCheck.isDirectory")(function* (
  fileSystem: FileSystem.FileSystem,
  file: string
) {
  return yield* Effect.match(fileSystem.readDirectory(file), {
    onFailure: () => false,
    onSuccess: () => true,
  });
});

/** Collects locale-qualified lesson files without validating them twice. */
const collectLocaleFiles = Effect.fn("LessonVoiceCheck.collectLocaleFiles")(
  function* (root: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const files: LessonFile[] = [];

    /** Traverses one lesson directory without following non-directory entries. */
    const visit = (
      directory: string
    ): Effect.Effect<void, LessonVoiceCheckError, FileSystem.FileSystem> =>
      Effect.gen(function* () {
        const entries = yield* Effect.mapError(
          fileSystem.readDirectory(directory),
          (cause) =>
            new LessonVoiceCheckError({
              detail: `Cannot list ${directory}: ${String(cause)}`,
              reason: "unreadable-entry",
            })
        );
        for (const entry of entries) {
          const file = join(directory, entry);
          if (yield* isSymbolicLink(fileSystem, file)) {
            continue;
          }
          if (yield* isDirectory(fileSystem, file)) {
            yield* visit(file);
            continue;
          }
          const locale = localeFromFile(file);
          if (isLessonVoiceLocale(locale)) {
            files.push({ file, locale });
          }
        }
      });

    yield* visit(root);
    return files.sort((left, right) => left.file.localeCompare(right.file));
  }
);

/** Collects every English, Indonesian, and German lesson source below a root. */
export const collectLessonFiles = Effect.fn(
  "LessonVoiceCheck.collectLessonFiles"
)(function* (root: string) {
  const files = yield* collectLocaleFiles(root);
  return files.map(({ file }) => file);
});

/** Scans every lesson file and attaches its locale and repository path. */
export const checkLessonRoot = Effect.fn("LessonVoiceCheck.checkLessonRoot")(
  function* (root: string, pedagogyReview = false) {
    const fileSystem = yield* FileSystem.FileSystem;
    const files = yield* collectLocaleFiles(root);
    if (files.length === 0) {
      return yield* new LessonVoiceCheckError({
        detail: `No lesson locale files found under ${root}`,
        reason: "empty-root",
      });
    }

    const documents = yield* Effect.forEach(files, ({ file, locale }) =>
      Effect.gen(function* () {
        const source = yield* Effect.mapError(
          fileSystem.readFileString(file),
          (cause) =>
            new LessonVoiceCheckError({
              detail: `Cannot read ${file}: ${String(cause)}`,
              reason: "unreadable-entry",
            })
        );
        const repositoryPath = relative(root, file);
        const tree = yield* Effect.try({
          catch: (cause) =>
            new LessonVoiceCheckError({
              detail: `Cannot parse ${repositoryPath}: ${String(cause)}`,
              reason: "unparseable-document",
            }),
          try: () => parseLessonMdx(source, repositoryPath),
        });
        return { file, locale, repositoryPath, source, tree };
      })
    );
    const issues = documents.flatMap(
      ({ file, locale, repositoryPath, source, tree }) =>
        findDocumentIssues(file, locale, source, tree).map((issue) => ({
          file: repositoryPath,
          locale,
          ...issue,
        }))
    );
    const siblingDocuments = documents.map(
      ({ file, locale, source, tree }) => ({
        file,
        locale,
        source,
        tree,
      })
    );
    issues.push(...findSiblingRepresentationIssues(root, siblingDocuments));
    issues.push(
      ...findLessonHighlightIssues(
        root,
        siblingDocuments.filter(
          ({ file }) => questionBodyKind(file) === undefined
        )
      )
    );
    const report: LessonVoiceReport = {
      fileCount: files.length,
      issues,
      ...(pedagogyReview
        ? {
            pedagogy: documents
              .filter(({ file }) => questionBodyKind(file) !== "question")
              .flatMap(({ repositoryPath, locale, tree }) =>
                reviewTeachingSections(tree).map((section) => ({
                  ...section,
                  file: repositoryPath,
                  locale,
                }))
              ),
          }
        : {}),
    };
    return report;
  }
);

/** Prints one report and returns the stable process exit code. */
const printReport = Effect.fn("LessonVoiceCheck.printReport")(function* (
  options: CliOptions,
  report: LessonVoiceReport
) {
  // Dynamic global dispatch stays on the globals (not the Console service,
  // which the Effect test runtime routes to TestConsole): the suite captures
  // output by reassigning console.log/console.error per test.
  const blockingIssues = options.strictReview
    ? report.issues
    : report.issues.filter(isBlockingLessonVoiceIssue);
  const reviewIssueCount = report.issues.length - blockingIssues.length;

  if (options.format === "json") {
    yield* Effect.sync(() =>
      console.log(
        JSON.stringify(
          {
            ...report,
            blockingIssueCount: blockingIssues.length,
            reviewIssueCount,
          },
          null,
          2
        )
      )
    );
  } else if (report.issues.length === 0) {
    yield* Effect.sync(() =>
      console.log(`Lesson voice check passed for ${report.fileCount} files.`)
    );
  } else {
    const summary = options.strictReview
      ? `Lesson voice strict review found ${blockingIssues.length} issue(s) in ${report.fileCount} files:`
      : `Lesson voice check found ${blockingIssues.length} blocking issue(s) and ${reviewIssueCount} review item(s) in ${report.fileCount} files:`;
    yield* Effect.sync(() => console.error(summary));
    for (const issue of report.issues) {
      const severity =
        options.strictReview || isBlockingLessonVoiceIssue(issue)
          ? "error"
          : "review";
      const line = `${issue.file}:${issue.line}:${issue.column} [${severity}] [${issue.rule}] ${issue.excerpt}`;
      yield* Effect.sync(() => console.error(line));
    }
  }
  const { pedagogy } = report;
  if (options.format === "text" && pedagogy) {
    for (const section of pedagogy) {
      if (section.signals.length > 0) {
        yield* Effect.sync(() =>
          console.log(
            `${section.file}:${section.line} [manual] ${section.signals.join(", ")}: ${section.heading}`
          )
        );
      }
    }
    yield* Effect.sync(() =>
      console.log(
        `Inventoried ${pedagogy.length} sections. These signals require contextual review, not automatic edits; exit status covers deterministic findings only.`
      )
    );
  }
  return blockingIssues.length === 0 ? 0 : 1;
});

/** Runs the standalone checker and returns a stable process exit code. */
export const runCli = Effect.fn("LessonVoiceCheck.runCli")(function* (
  arguments_: readonly string[]
) {
  const options = yield* parseArguments(arguments_);
  const report = yield* checkLessonRoot(options.root, options.pedagogyReview);
  return yield* printReport(options, report);
});

/** Runs the CLI pipeline with typed failures mapped to exit code 2. */
export const runMain = Effect.fn("LessonVoiceCheck.runMain")(function* (
  arguments_: readonly string[]
) {
  return yield* Effect.provide(
    runCli(arguments_).pipe(
      Effect.catchTag("LessonVoiceCheckError", (error) =>
        Effect.sync(() => console.error(error.detail)).pipe(Effect.as(2))
      )
    ),
    NodeFileSystem.layer
  );
});

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runMain(process.argv.slice(2)).pipe(
    Effect.andThen((code) =>
      Effect.sync(() => {
        process.exitCode = code;
      })
    ),
    NodeRuntime.runMain
  );
}
