#!/usr/bin/env node

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import type { SimilarityMatch } from "@nakafa/aksara-corpus/question-bank/similarity";
import { scanQuestionSimilarity } from "@nakafa/aksara-corpus/question-bank/similarity";
import type { FormulaMatch } from "@nakafa/aksara-corpus/question-bank/similarity/formula";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Array as Arr, Console, Effect, Path, Schema } from "effect";

const DEFAULT_THRESHOLD = 0.5;
const USAGE =
  "Usage: similar/check.ts <question-bank directory> [--threshold 0.5]";
/** Two-space indented JSON text, the bytes JSON.stringify(value, null, 2) writes. */
const encodePrettyJson = Schema.encodeSync(
  Schema.fromJsonString(Schema.Unknown, { space: 2 })
);

/** The similarity check was called with arguments it cannot use. */
export class SimilarityCheckError extends Schema.TaggedError<
  SimilarityCheckError,
  { readonly brand: unique symbol }
>()("SimilarityCheckError", { detail: Schema.String }) {}

const THRESHOLD_OPTION = "--threshold";
const THRESHOLD_PREFIX = `${THRESHOLD_OPTION}=`;

/** One target directory and the score a pair must reach. */
const SimilarityOptionsSchema = Schema.Struct({
  target: Schema.String,
  threshold: Schema.Finite.pipe(
    Schema.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(1))
  ),
});

/** The usage failure, with the reason the arguments were refused when there is one. */
function invalidArguments(reason?: string) {
  return new SimilarityCheckError({
    detail: reason === undefined ? USAGE : `${USAGE}\n${reason}`,
  });
}

/** Reads one target directory and a threshold between zero and one. */
const parseOptions = Effect.fn("SimilarityCheck.parseOptions")(function* (
  arguments_: readonly string[]
) {
  let threshold: string | undefined;
  const targets: string[] = [];
  let rest = arguments_;
  while (Arr.isReadonlyArrayNonEmpty(rest)) {
    const [argument, ...tail] = rest;
    rest = tail;
    if (argument === THRESHOLD_OPTION) {
      const [value, ...after] = tail;
      if (value === undefined) {
        return yield* invalidArguments(`${THRESHOLD_OPTION} requires a score`);
      }
      threshold = value;
      rest = after;
    } else if (argument.startsWith(THRESHOLD_PREFIX)) {
      threshold = argument.slice(THRESHOLD_PREFIX.length);
    } else if (argument.startsWith("-")) {
      return yield* invalidArguments(`Unknown option: ${argument}`);
    } else {
      targets.push(argument);
    }
  }
  const [target, ...extra] = targets;
  if (extra.length > 0) {
    return yield* invalidArguments();
  }
  return yield* Schema.decodeUnknownEffect(SimilarityOptionsSchema)({
    target,
    threshold: Number(threshold ?? DEFAULT_THRESHOLD),
  }).pipe(Effect.mapError(() => invalidArguments()));
});

/** Formats one pair with its combined, written, and number-masked scores. */
function line({ exact, first, masked, score, second }: SimilarityMatch) {
  return `${score.toFixed(2)} (text ${exact.toFixed(2)}, masked ${masked.toFixed(2)}) ${first} <> ${second}`;
}

/** Formats one formula pair with the shapes it shares and the fix it needs. */
export function formulaLine({ first, score, second, shared }: FormulaMatch) {
  return `FORMULA ${score.toFixed(2)} ${first} <> ${second} shares ${shared.join(" ; ")}: rewrite one as a different task, not new numbers`;
}

/** Scans one question-bank directory against the whole bank. */
const runCli = Effect.fn("SimilarityCheck.runCli")(function* (
  arguments_: readonly string[]
) {
  const options = yield* parseOptions(arguments_);
  const path = yield* Path.Path;
  const root = yield* Effect.sync(() => process.cwd());
  const target = path.relative(root, path.resolve(root, options.target));
  const { sets } = yield* loadTryoutContent(root);
  const report = yield* scanQuestionSimilarity(
    root,
    sets,
    target,
    options.threshold
  );
  const findings = [
    ...Arr.map(report.items, (match) => `ITEM ${line(match)}`),
    ...Arr.map(report.passages, (match) => `PASSAGE ${line(match)}`),
    ...Arr.map(report.formulas, formulaLine),
  ];
  for (const finding of findings) {
    yield* Console.error(finding);
  }
  yield* Console.log(
    `${report.items.length} item pairs, ${report.formulas.length} formula pairs and ${report.passages.length} passages under ${target} reach ${options.threshold}.`
  );
  return report.items.length +
    report.passages.length +
    report.formulas.length ===
    0
    ? 0
    : 1;
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

if (process.argv[1] === import.meta.filename) {
  runMain(process.argv.slice(2)).pipe(
    Effect.andThen((code) =>
      Effect.sync(() => {
        process.exitCode = code;
      })
    ),
    NodeRuntime.runMain
  );
}
