import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const WORD_SEPARATOR_PATTERN = /[-_.]+/u;
const NUMBER_PATTERN = /^\d+$/u;
const ROLE_SUFFIXES = new Set(["build", "config", "d", "test"]);
const EXTENSION_SUFFIXES = new Set([
  "cjs",
  "cts",
  "js",
  "json",
  "jsonc",
  "lock",
  "md",
  "mdx",
  "mjs",
  "mts",
  "ts",
  "tsx",
  "yaml",
  "yml",
]);

function trackedFiles() {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  )
    .split("\n")
    .filter((file) => file.length > 0 && existsSync(file));
}

function words(segment) {
  if (segment.startsWith(".")) {
    return [];
  }
  const tokens = segment
    .split(WORD_SEPARATOR_PATTERN)
    .filter((word) => word.length > 0);
  while (
    tokens.length > 0 &&
    (EXTENSION_SUFFIXES.has(tokens.at(-1)) || ROLE_SUFFIXES.has(tokens.at(-1)))
  ) {
    tokens.pop();
  }
  return tokens.filter((word) => !NUMBER_PATTERN.test(word));
}

const violations = trackedFiles().flatMap((file) =>
  file
    .split("/")
    .filter((segment) => words(segment).length > 2)
    .map((segment) => `${file}: ${segment}`)
);

if (violations.length > 0) {
  process.stderr.write(
    `File and folder names may contain at most two words:\n${violations.join("\n")}\n`
  );
  process.exitCode = 1;
}
