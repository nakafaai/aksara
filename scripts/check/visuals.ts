import { compile } from "@mdx-js/mdx";
import { createMathVisualPolicy } from "@nakafa/aksara-compiler/policy/math";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Result,
  Schema,
  String as Str,
} from "effect";

import { trackedFiles } from "#scripts/check/files";
import { redundantDescriptions } from "#scripts/check/titles";
import { runEntry } from "#scripts/entry";
import { runGit } from "#scripts/git";

/** The corpus sources, every MDX file that publication compiles. */
const CORPUS_SOURCE_PATTERN = /^packages\/corpus\/.+\.mdx$/u;

/** The corpus root: a change below it leaves the policy as main ran it. */
const CORPUS_PREFIX = "packages/corpus/";

/** The ref a change is measured from, as the points check measures it. */
const BASE_REF = "origin/main";

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

/** Git could not name where this change left main, or what it changed since. */
export class ChangedFilesError extends Schema.TaggedError<
  ChangedFilesError,
  { readonly brand: unique symbol }
>()("ChangedFilesError", { message: Schema.String }) {}

/** Keeps the corpus sources among the tracked files. */
export function corpusSources(files: readonly string[]) {
  return Arr.filter(files, (file) => CORPUS_SOURCE_PATTERN.test(file));
}

/**
 * Applies the compiler's MathVisual policy to one source, exactly as
 * publication does, and lists every finding as its line, column, scene path
 * and message, then every element whose description only repeats its title.
 * A source that both accept lists none.
 */
export const visualFindings = Effect.fn("AksaraPolicy.visualFindings")(
  function* (file: string, source: string) {
    const policy = createMathVisualPolicy(CHECK_KEY);
    yield* Effect.promise(() =>
      compile(source, { remarkPlugins: [policy.remarkPlugin] })
    );
    const outcome = yield* Effect.result(policy.validate());
    const copy = Arr.map(redundantDescriptions(source), (finding) => ({
      file,
      finding,
    }));
    if (Result.isSuccess(outcome)) {
      return copy;
    }
    const scenes = Arr.map(outcome.failure.violations, (violation) => ({
      file,
      finding:
        "path" in violation
          ? `${violation.line}:${violation.column} ${Arr.join(Arr.map(violation.path, String), ".")} ${violation.message}`
          : `${violation.line}:${violation.column} ${violation.reason}`,
    }));
    return Arr.appendAll(scenes, copy);
  }
);

/**
 * Checks every corpus source's MathVisual scenes against the compiler's
 * policy, so a scene that publication would reject fails the gate instead of
 * a release, and rejects a card whose description only repeats its title.
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

/** Runs one Git command for the change's files and returns its output. */
const changedGit = Effect.fn("AksaraPolicy.changedGit")(function* (
  args: readonly string[]
) {
  const result = yield* runGit(args);
  if (result.exitCode !== 0) {
    return yield* new ChangedFilesError({
      message: `git ${Arr.join(args, " ")} failed: ${result.stderr.trim()}`,
    });
  }
  return result.stdout;
});

/** The paths of a Git listing, one a line. */
const lines = (text: string) =>
  Arr.filter(Str.split(text, "\n"), Str.isNonEmpty);

/** The revision where this change left `ref`: their merge base. */
export const mergeBase = Effect.fn("AksaraPolicy.mergeBase")(function* (
  ref: string
) {
  return Str.trim(yield* changedGit(["merge-base", ref, "HEAD"]));
});

/**
 * The files this change touched since it left `ref`: committed, staged,
 * unstaged and untracked, measured from the merge base as the points check
 * measures, so work that landed on `ref` later never reads as this change's.
 */
export const changedFiles = Effect.fn("AksaraPolicy.changedFiles")(function* (
  ref: string
) {
  const base = yield* mergeBase(ref);
  const edited = lines(
    yield* changedGit(["diff", "--name-only", "--no-renames", base])
  );
  const untracked = lines(
    yield* changedGit(["ls-files", "--others", "--exclude-standard"])
  );
  return Arr.dedupe(Arr.appendAll(edited, untracked));
});

/**
 * The corpus sources the policy reads. Each source's findings depend on that
 * source and the policy alone, so a change below the corpus alone leaves every
 * other source as main accepted it and reads only its own; a change anywhere
 * else, such as to the compiler's policy, reads them all.
 */
export function sourcesToCheck(
  files: readonly string[],
  changed: readonly string[]
) {
  const sources = corpusSources(files);
  if (!Arr.every(changed, Str.startsWith(CORPUS_PREFIX))) {
    return sources;
  }
  return Arr.filter(sources, (source) => Arr.contains(changed, source));
}

/**
 * The gate's check: applies the policy to the corpus sources that this change,
 * measured from `ref`, makes it read.
 */
export const checkVisuals = Effect.fn("AksaraPolicy.checkVisuals")(function* (
  ref: string
) {
  const files = yield* trackedFiles();
  const changed = yield* changedFiles(ref);
  return yield* visualReport(sourcesToCheck(files, changed));
});

runEntry(import.meta.main, checkVisuals(BASE_REF));
