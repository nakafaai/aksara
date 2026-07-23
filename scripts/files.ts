import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const GIT_OUTPUT_LIMIT = 16 * 1024 * 1024;
const TYPESCRIPT_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;

/** Parses Git output while excluding deleted paths and the trailing empty line. */
export function parseTrackedFiles(
  output: string,
  pathExists: (path: string) => boolean
): readonly string[] {
  return output
    .split("\n")
    .filter((file) => file.length > 0 && pathExists(file));
}

/** Lists Git-known repository files that still exist on disk. */
export function trackedFiles(): readonly string[] {
  const output = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    {
      encoding: "utf8",
      maxBuffer: GIT_OUTPUT_LIMIT,
    }
  );
  return parseTrackedFiles(output, existsSync);
}

/** Lists authored TypeScript files while excluding generated directories. */
export function typescriptFiles(
  files: readonly string[] = trackedFiles()
): readonly string[] {
  return files.filter(
    (file) =>
      TYPESCRIPT_PATTERN.test(file) && !GENERATED_PATH_PATTERN.test(file)
  );
}

/** Reports stable policy diagnostics and marks the current script as failed. */
export function enforceViolations(
  heading: string,
  violations: readonly string[]
): void {
  if (violations.length === 0) {
    return;
  }
  process.stderr.write(`${heading}:\n${violations.join("\n")}\n`);
  process.exitCode = 1;
}
