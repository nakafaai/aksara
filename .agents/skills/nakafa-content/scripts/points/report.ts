import { Effect } from "effect";
import type { PointsFinding } from "#nakafa-content/points/finding";

const SHORT_REVISION_LENGTH = 7;

/** One finding together with the file it was found in. */
export interface FileFinding extends PointsFinding {
  readonly file: string;
}

/** Everything one run learned: what it read, compared, and found. */
export interface PointsReport {
  readonly base: string;
  readonly compared: number;
  readonly files: number;
  readonly findings: readonly FileFinding[];
}

/** Shortens a revision to the length that messages and labels show. */
export function shortRevision(revision: string): string {
  return revision.slice(0, SHORT_REVISION_LENGTH);
}

/** Prints one report and returns the stable process exit code. */
export const printReport = Effect.fn("PointsCheck.printReport")(function* (
  report: PointsReport
) {
  // Output stays on the console globals so tests can capture it.
  for (const { column, file, line, message, rule } of report.findings) {
    yield* Effect.sync(() =>
      console.error(`${file}:${line}:${column} [${rule}] ${message}`)
    );
  }
  const revision = shortRevision(report.base);
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
