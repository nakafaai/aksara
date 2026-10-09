#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { loadQuestionContent } from "@nakafa/aksara-corpus/question-bank/content";
import {
  type SimilarityMatch,
  scanQuestionSimilarity,
} from "@nakafa/aksara-corpus/question-bank/similarity";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Console, Effect, Path, Schema } from "effect";

const DEFAULT_THRESHOLD = 0.5;
const USAGE =
  "Usage: similar/check.ts <question-bank directory> [--threshold 0.5]";
/** Two-space indented JSON text, the bytes JSON.stringify(value, null, 2) writes. */
const encodePrettyJson = Schema.encodeSync(
  Schema.fromJsonString(Schema.Unknown, { space: 2 })
);

/** The similarity check was called with arguments it cannot use. */
export class SimilarityCheckError extends Schema.TaggedError<SimilarityCheckError>()(
  "SimilarityCheckError",
  { detail: Schema.String }
) {}

/** Reads one target directory and a threshold between zero and one. */
const parseOptions = Effect.fn("SimilarityCheck.parseOptions")(function* (
  arguments_: readonly string[]
) {
  const parsed = yield* Effect.try({
    catch: (cause) =>
      new SimilarityCheckError({ detail: `${USAGE}\n${String(cause)}` }),
    try: () =>
      parseArgs({
        allowPositionals: true,
        args: [...arguments_],
        options: { threshold: { type: "string" } },
        strict: true,
      }),
  });
  const [target, ...extra] = parsed.positionals;
  const threshold = Number(parsed.values.threshold ?? DEFAULT_THRESHOLD);
  if (
    target === undefined ||
    extra.length > 0 ||
    !(threshold > 0 && threshold <= 1)
  ) {
    return yield* new SimilarityCheckError({ detail: USAGE });
  }
  return { target, threshold };
});

/** Formats one pair with its combined, written, and number-masked scores. */
function line({ exact, first, masked, score, second }: SimilarityMatch) {
  return `${score.toFixed(2)} (text ${exact.toFixed(2)}, masked ${masked.toFixed(2)}) ${first} <> ${second}`;
}

/** Scans one question-bank directory against the whole bank. */
const runCli = Effect.fn("SimilarityCheck.runCli")(function* (
  arguments_: readonly string[]
) {
  const options = yield* parseOptions(arguments_);
  const path = yield* Path.Path;
  const root = yield* Effect.sync(() => process.cwd());
  const target = path.relative(root, path.resolve(root, options.target));
  const tryoutSources = yield* decodeTryoutRegistry();
  const { sources } = yield* loadQuestionContent(root, tryoutSources);
  const report = yield* scanQuestionSimilarity(
    root,
    sources,
    target,
    options.threshold
  );
  for (const match of report.items) {
    yield* Console.error(`ITEM ${line(match)}`);
  }
  for (const match of report.passages) {
    yield* Console.error(`PASSAGE ${line(match)}`);
  }
  yield* Console.log(
    `${report.items.length} item pairs and ${report.passages.length} passages under ${target} reach ${options.threshold}.`
  );
  return report.items.length + report.passages.length === 0 ? 0 : 1;
});

/** Runs the check with every typed failure reported as exit code 2. */
export const runMain = Effect.fn("SimilarityCheck.runMain")(function* (
  arguments_: readonly string[]
) {
  return yield* Effect.provide(
    runCli(arguments_).pipe(
      Effect.catch((error) =>
        Console.error(`${error._tag}: ${encodePrettyJson(error)}`).pipe(
          Effect.as(2)
        )
      )
    ),
    NodeServices.layer
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
