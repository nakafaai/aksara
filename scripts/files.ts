import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const GIT_OUTPUT_LIMIT = 16 * 1024 * 1024;
const TYPESCRIPT_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;

/** Lists Git-known repository files that still exist on disk. */
export function trackedFiles(): readonly string[] {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    {
      encoding: "utf8",
      maxBuffer: GIT_OUTPUT_LIMIT,
    }
  )
    .split("\n")
    .filter((file) => file.length > 0 && existsSync(file));
}

/** Lists authored TypeScript files while excluding generated directories. */
export function typescriptFiles(): readonly string[] {
  return trackedFiles().filter(
    (file) =>
      TYPESCRIPT_PATTERN.test(file) && !GENERATED_PATH_PATTERN.test(file)
  );
}
