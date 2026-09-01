#!/usr/bin/env node

import { readdirSync, readFileSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { findExactLineSmoothingIssues } from "#nakafa-content/line-equation/check";
import { findMathBlockFragmentIssues } from "#nakafa-content/voice-fragment";
import { findExternalLinkLabelIssues } from "#nakafa-content/voice-links";
import { parseLessonMdx } from "#nakafa-content/voice-mdx";
import {
  findSiblingRepresentationIssues,
  lessonSiblingDocument,
} from "#nakafa-content/voice-parity";
import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice-policy";
import { findLearnerFacingSemicolonIssues } from "#nakafa-content/voice-punctuation";
import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";
import {
  isLessonVoiceLocale,
  type LessonVoiceReport,
} from "#nakafa-content/voice-types";

interface CliOptions {
  format: "json" | "text";
  root: string;
  strictReview: boolean;
}

/** Collects every English, Indonesian, and German lesson source below a root. */
export function collectLessonFiles(root: string): string[] {
  const files: string[] = [];

  /** Traverses one lesson directory without following non-directory entries. */
  function visit(directory: string): void {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(path);
      } else if (
        entry.isFile() &&
        isLessonVoiceLocale(basename(path, ".mdx"))
      ) {
        files.push(path);
      }
    }
  }

  visit(root);
  return files.sort();
}

/** Scans every lesson file and attaches its locale and repository path. */
export function checkLessonRoot(root: string): LessonVoiceReport {
  const files = collectLessonFiles(root);
  if (files.length === 0) {
    throw new Error(`No lesson locale files found under ${root}`);
  }

  const documents = files.flatMap((file) => {
    const locale = basename(file, ".mdx");
    if (!isLessonVoiceLocale(locale)) {
      return [];
    }
    const source = readFileSync(file, "utf8");
    const repositoryPath = relative(root, file);
    const tree = parseLessonMdx(source, repositoryPath);
    return [{ file, locale, repositoryPath, source, tree }];
  });
  const issues = documents.flatMap(({ locale, repositoryPath, source, tree }) =>
    [
      ...findLessonVoiceIssues(locale, source, tree),
      ...findMathBlockFragmentIssues(source, tree),
      ...findLearnerFacingSemicolonIssues(source, tree),
      ...findExternalLinkLabelIssues(locale, source, tree),
      ...findExactLineSmoothingIssues(source, tree),
    ].map((issue) => ({
      file: repositoryPath,
      locale,
      ...issue,
    }))
  );
  const siblingDocuments = documents.flatMap(({ file, source, tree }) => {
    const document = lessonSiblingDocument(file, source, tree);
    return document ? [document] : [];
  });
  issues.push(...findSiblingRepresentationIssues(root, siblingDocuments));
  return { fileCount: files.length, issues };
}

/** Parses the optional output format and lesson root arguments. */
function parseArguments(arguments_: readonly string[]): CliOptions {
  let format = "text";
  let root = "packages/corpus/material/lesson";
  let strictReview = false;

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--format") {
      const value = arguments_[index + 1];
      if (value === undefined) {
        throw new Error("--format requires text or json");
      }
      format = value;
      index += 1;
    } else if (argument === "--root") {
      const value = arguments_[index + 1];
      if (value === undefined) {
        throw new Error("--root requires a directory");
      }
      root = value;
      index += 1;
    } else if (argument === "--strict-review") {
      strictReview = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (format !== "text" && format !== "json") {
    throw new Error(`Unsupported format: ${format}`);
  }
  return { format, root: resolve(root), strictReview };
}

/** Runs the standalone checker and returns a stable process exit code. */
export function runCli(arguments_: readonly string[]): number {
  let options: ReturnType<typeof parseArguments>;
  try {
    options = parseArguments(arguments_);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }

  let report: ReturnType<typeof checkLessonRoot>;
  try {
    report = checkLessonRoot(options.root);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }

  const blockingIssues = options.strictReview
    ? report.issues
    : report.issues.filter(isBlockingLessonVoiceIssue);
  const reviewIssueCount = report.issues.length - blockingIssues.length;

  if (options.format === "json") {
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
    );
  } else if (report.issues.length === 0) {
    console.log(`Lesson voice check passed for ${report.fileCount} files.`);
  } else {
    const summary = options.strictReview
      ? `Lesson voice strict review found ${blockingIssues.length} issue(s) in ${report.fileCount} files:`
      : `Lesson voice check found ${blockingIssues.length} blocking issue(s) and ${reviewIssueCount} review item(s) in ${report.fileCount} files:`;
    console.error(summary);
    for (const issue of report.issues) {
      const severity =
        options.strictReview || isBlockingLessonVoiceIssue(issue)
          ? "error"
          : "review";
      console.error(
        `${issue.file}:${issue.line}:${issue.column} [${severity}] [${issue.rule}] ${issue.excerpt}`
      );
    }
  }
  return blockingIssues.length === 0 ? 0 : 1;
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  process.exitCode = runCli(process.argv.slice(2));
}
