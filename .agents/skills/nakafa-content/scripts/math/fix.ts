#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, FileSystem } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import { findPlainNumbers } from "#nakafa-content/math/number";
import { wrapNumbers } from "#nakafa-content/math/wrap";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import {
  collectLocaleFiles,
  type LessonFile,
  localeFromFile,
} from "#nakafa-content/voice/check";
import { LessonVoiceCheckError } from "#nakafa-content/voice/error";
import { documentProfile } from "#nakafa-content/voice/profile";
import { isLessonVoiceLocale } from "#nakafa-content/voice/types";

const USAGE =
  "Usage: math/fix.ts <directory or .mdx file>... wraps every plain quantity with <InlineMath />";

/** Counts the `<InlineMath />` elements that MDX parsed as their own block. */
function blockMathCount(tree: MdxNode): number {
  let count = 0;
  visitMdxNodes(tree, (node) => {
    if (node.type === "mdxJsxFlowElement" && node.name === "InlineMath") {
      count += 1;
    }
  });
  return count;
}

/** Parses one source, mapping a syntax error to the typed CLI failure. */
const parse = Effect.fn("MathFix.parse")(function* (
  source: string,
  file: string
) {
  return yield* Effect.try({
    catch: (cause) =>
      new LessonVoiceCheckError({
        detail: `Cannot parse ${file}: ${String(cause)}`,
        reason: "unparseable-document",
      }),
    try: () => parseLessonMdx(source, file),
  });
});

/**
 * Rewrites one file and returns the numbers it wrapped and the findings it
 * left. The rewrite is written only when it parses, adds no block-level math,
 * and leaves exactly the numbers it reported as left; otherwise the file is
 * refused unchanged.
 */
const fixFile = Effect.fn("MathFix.fixFile")(function* ({
  file,
  locale,
}: LessonFile) {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* Effect.mapError(
    fileSystem.readFileString(file),
    (cause) =>
      new LessonVoiceCheckError({
        detail: `Cannot read ${file}: ${String(cause)}`,
        reason: "unreadable-entry",
      })
  );
  const tree = yield* parse(source, file);
  const result = wrapNumbers(source, tree, locale);
  const left = result.left.map((offset) => {
    const { column, excerpt, line } = issueAtOffset(source, offset, "");
    return `${file}:${line}:${column} ${excerpt}`;
  });
  if (result.wrapped === 0) {
    return { file, left, refused: false, wrapped: 0 };
  }
  const rewritten = yield* parse(result.source, file);
  if (
    findPlainNumbers(result.source, rewritten).length !== result.left.length ||
    blockMathCount(rewritten) !== blockMathCount(tree)
  ) {
    return { file, left, refused: true, wrapped: 0 };
  }
  yield* Effect.mapError(
    fileSystem.writeFileString(file, result.source),
    (cause) =>
      new LessonVoiceCheckError({
        detail: `Cannot write ${file}: ${String(cause)}`,
        reason: "unreadable-entry",
      })
  );
  return { file, left, refused: false, wrapped: result.wrapped };
});

/** Lists the locale files of one argument: a directory or one MDX file. */
const filesOf = Effect.fn("MathFix.filesOf")(function* (path: string) {
  const locale = localeFromFile(path);
  if (!path.endsWith(".mdx")) {
    const files = yield* collectLocaleFiles(path);
    return files.filter(({ file }) => documentProfile(file) !== "page");
  }
  return isLessonVoiceLocale(locale) && documentProfile(path) !== "page"
    ? [{ file: path, locale }]
    : [];
});

/** Rewrites every argument and prints what it wrapped and what it left. */
export const runCli = Effect.fn("MathFix.runCli")(function* (
  arguments_: readonly string[]
) {
  if (arguments_.length === 0) {
    return yield* new LessonVoiceCheckError({
      detail: USAGE,
      reason: "invalid-arguments",
    });
  }
  const files = (yield* Effect.forEach(arguments_, filesOf)).flat();
  const results = yield* Effect.forEach(files, fixFile);
  const wrapped = results.reduce((sum, result) => sum + result.wrapped, 0);
  const changed = results.filter((result) => result.wrapped > 0).length;
  const left = results.flatMap((result) => result.left);
  const refused = results.filter((result) => result.refused);
  yield* Console.log(
    `math/fix wrapped ${wrapped} numbers in ${changed} of ${files.length} files; ${left.length} left for a person (ambiguous separators, a string prop, or a number alone on its line):`
  );
  for (const line of left) {
    yield* Console.log(line);
  }
  for (const { file } of refused) {
    yield* Console.error(
      `${file}: refused, the rewrite would not read back as written; wrap its numbers by hand`
    );
  }
  return refused.length === 0 ? 0 : 1;
});

/** Runs the CLI with typed failures mapped to exit code 2. */
export const runMain = Effect.fn("MathFix.runMain")(function* (
  arguments_: readonly string[]
) {
  return yield* Effect.provide(
    runCli(arguments_).pipe(
      Effect.catchTag("LessonVoiceCheckError", (error) =>
        Console.error(error.detail).pipe(Effect.as(2))
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
