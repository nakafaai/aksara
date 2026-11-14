import { Console, Effect } from "effect";
import type { PointsFinding } from "#nakafa-content/points/finding";

const SHORT_REVISION_LENGTH = 7;

/** One finding together with the file it was found in. */
export interface FileFinding extends PointsFinding {
  readonly file: string;
}

/** Everything one run learned: what it read, compared, and found. */
export interface PointsReport {
  readonly base: string;
  readonly belowBar: readonly string[];
  readonly compared: number;
  readonly files: number;
  readonly findings: readonly FileFinding[];
}

/** Shortens a revision to the length that messages and labels show. */
export function shortRevision(revision: string): string {
  return revision.slice(0, SHORT_REVISION_LENGTH);
}

/**
 * Lists the lessons below the visual bar, with their count. Every lesson is at
 * the bar, so one that falls below it fails the check.
 */
const printBelowBar = Effect.fn("PointsCheck.printBelowBar")(function* (
  belowBar: readonly string[]
) {
  if (belowBar.length === 0) {
    return;
  }
  yield* Console.error(
    `${belowBar.length} lesson(s) below the visual bar, which needs at least 3 interactive visual cards:`
  );
  for (const folder of belowBar) {
    yield* Console.error(`  ${folder}`);
  }
});

/** Prints one report and returns the stable process exit code. */
export const printReport = Effect.fn("PointsCheck.printReport")(function* (
  report: PointsReport
) {
  for (const { column, file, line, message, rule } of report.findings) {
    yield* Console.error(`${file}:${line}:${column} [${rule}] ${message}`);
  }
  yield* printBelowBar(report.belowBar);
  const revision = shortRevision(report.base);
  if (report.findings.length === 0 && report.belowBar.length === 0) {
    yield* Console.log(
      `Points check passed for ${report.files} files and compared ${report.compared} changed files with ${revision}.`
    );
    return 0;
  }
  const affected = new Set(report.findings.map(({ file }) => file)).size;
  const found = [
    ...(report.findings.length === 0
      ? []
      : [
          `${report.findings.length} finding(s) in ${affected} of ${report.files} files`,
        ]),
    ...(report.belowBar.length === 0
      ? []
      : [`${report.belowBar.length} lesson(s) below the visual bar`]),
  ];
  yield* Console.error(
    `Points check found ${found.join(" and ")}, compared with ${revision}.`
  );
  return 1;
});
