import { compile } from "@mdx-js/mdx";
import { createMathVisualPolicy } from "@nakafa/aksara-compiler/policy/math";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect, FileSystem, Result, Schema } from "effect";

import { trackedFiles } from "#scripts/check/files";
import { runEntry } from "#scripts/entry";

/** The corpus sources, every MDX file that publication compiles. */
const CORPUS_SOURCE_PATTERN = /^packages\/corpus\/.+\.mdx$/u;

/** The key the policy reports under; the report names each file itself. */
const CHECK_KEY = ContentKeySchema.make("check:visuals");

/** One MathVisual finding, where it sits in its source file. */
const VisualFindingSchema = Schema.Struct({
  file: Schema.String,
  finding: Schema.String,
});

/** The corpus sources whose MathVisual scenes publication would reject. */
export class VisualPolicyError extends Schema.TaggedError<
  VisualPolicyError,
  { readonly brand: unique symbol }
>()("VisualPolicyError", {
  findings: Schema.Array(VisualFindingSchema),
}) {}

/** Keeps the corpus sources among the tracked files. */
export function corpusSources(files: readonly string[]) {
  return Arr.filter(files, (file) => CORPUS_SOURCE_PATTERN.test(file));
}

/**
 * Applies the compiler's MathVisual policy to one source, exactly as
 * publication does, and lists every finding as its line, column, scene path
 * and message. A source the policy accepts lists none.
 */
export const visualFindings = Effect.fn("AksaraPolicy.visualFindings")(
  function* (file: string, source: string) {
    const policy = createMathVisualPolicy(CHECK_KEY);
    yield* Effect.promise(() =>
      compile(source, { remarkPlugins: [policy.remarkPlugin] })
    );
    const outcome = yield* Effect.result(policy.validate());
    if (Result.isSuccess(outcome)) {
      return [];
    }
    return Arr.map(outcome.failure.violations, (violation) => ({
      file,
      finding:
        "path" in violation
          ? `${violation.line}:${violation.column} ${Arr.join(violation.path, ".")} ${violation.message}`
          : `${violation.line}:${violation.column} ${violation.reason}`,
    }));
  }
);

/**
 * Checks every corpus source's MathVisual scenes against the compiler's
 * policy, so a scene that publication would reject fails the gate instead of
 * a release.
 */
export const visualReport = Effect.fn("AksaraPolicy.visualReport")(function* (
  files: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const findings = Arr.flatten(
    yield* Effect.forEach(
      corpusSources(files),
      (file) =>
        fileSystem
          .readFileString(file)
          .pipe(Effect.flatMap((source) => visualFindings(file, source))),
      { concurrency: 8 }
    )
  );
  if (findings.length > 0) {
    for (const { file, finding } of findings) {
      yield* Effect.logError(`${file}:${finding}`);
    }
    return yield* new VisualPolicyError({ findings });
  }
  yield* Effect.logInfo(
    `MathVisual policy: ${corpusSources(files).length} corpus sources accepted.`
  );
});

runEntry(import.meta.main, trackedFiles().pipe(Effect.flatMap(visualReport)));
