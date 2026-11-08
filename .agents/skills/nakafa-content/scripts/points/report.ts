import { Console, Effect } from "effect";
import type { PointsFinding } from "#nakafa-content/points/finding";

const SHORT_REVISION_LENGTH = 7;

/** One finding together with the file it was found in. */
export interface FileFinding extends PointsFinding {
  readonly file: string;
}

/** Everything one run learned: what it read, compared, and found. */
export interface PointsReport {
  readonly bare: readonly string[];
  readonly base: string;
  readonly compared: number;
  readonly files: number;
  readonly findings: readonly FileFinding[];
}

/** Shortens a revision to the length that messages and labels show. */
export function shortRevision(revision: string): string {
  return revision.slice(0, SHORT_REVISION_LENGTH);
}

/**
 * Lists the lessons that still miss an interactive visual, with their count.
 * The list reports and does not fail, until the change that adds the last
 * missing visual turns it into a finding.
 */
const printBare = Effect.fn("PointsCheck.printBare")(function* (
  bare: readonly string[]
) {
  if (bare.length === 0) {
    return;
  }
  yield* Console.log(
    `${bare.length} lesson(s) without an interactive visual, which every lesson needs:`
  );
  for (const folder of bare) {
    yield* Console.log(`  ${folder}`);
  }
});

/** Prints one report and returns the stable process exit code. */
export const printReport = Effect.fn("PointsCheck.printReport")(function* (
  report: PointsReport
) {
  for (const { column, file, line, message, rule } of report.findings) {
    yield* Console.error(`${file}:${line}:${column} [${rule}] ${message}`);
  }
  yield* printBare(report.bare);
  const revision = shortRevision(report.base);
  if (report.findings.length === 0) {
    yield* Console.log(
      `Points check passed for ${report.files} files and compared ${report.compared} changed files with ${revision}.`
    );
    return 0;
  }
  const affected = new Set(report.findings.map(({ file }) => file)).size;
  yield* Console.error(
    `Points check found ${report.findings.length} finding(s) in ${affected} of ${report.files} files, compared with ${revision}.`
  );
  return 1;
});
