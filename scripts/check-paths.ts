import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const WORD_SEPARATOR_PATTERN = /[-_.\s]+/u;
const CAMEL_WORD_PATTERN = /([\p{Ll}\d])(\p{Lu})/gu;
const ACRONYM_WORD_PATTERN = /(\p{Lu}+)(\p{Lu}\p{Ll})/gu;
const NUMBER_PATTERN = /^\d+$/u;
const JAVASCRIPT_PATTERN = /\.(?:[cm]?js|jsx)$/u;
const FORBIDDEN_FILE_NAMES = new Set([
  ".node-version",
  ".npmrc",
  ".nvmrc",
  "bun.lock",
  "bun.lockb",
  "deno.lock",
  "npm-shrinkwrap.json",
  "package-lock.json",
  "yarn.lock",
]);
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

/** Lists tracked and untracked repository files that exist on disk. */
function trackedFiles(): string[] {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  )
    .split("\n")
    .filter((file) => file.length > 0 && existsSync(file));
}

/** Returns the semantic words in one file or folder name. */
function words(segment: string): string[] {
  const tokens = segment
    .replace(ACRONYM_WORD_PATTERN, "$1 $2")
    .replace(CAMEL_WORD_PATTERN, "$1 $2")
    .split(WORD_SEPARATOR_PATTERN)
    .filter((word) => word.length > 0);
  while (tokens.length > 0) {
    const lastToken = tokens.at(-1);
    if (
      lastToken === undefined ||
      !(EXTENSION_SUFFIXES.has(lastToken) || ROLE_SUFFIXES.has(lastToken))
    ) {
      break;
    }
    tokens.pop();
  }
  return tokens.filter((word) => !NUMBER_PATTERN.test(word));
}

const violations = trackedFiles().flatMap((file) => {
  const basename = file.split("/").at(-1);
  const toolchainViolation =
    basename && FORBIDDEN_FILE_NAMES.has(basename)
      ? [`${file}: pnpm and package.json own the toolchain contract`]
      : [];
  const sourceViolation = JAVASCRIPT_PATTERN.test(file)
    ? [`${file}: hand-written JavaScript source is not allowed`]
    : [];
  const nameViolations = file
    .split("/")
    .filter((segment) => words(segment).length > 2)
    .map((segment) => `${file}: ${segment}`);

  return [...toolchainViolation, ...sourceViolation, ...nameViolations];
});

if (violations.length > 0) {
  process.stderr.write(
    `Repository path policy violations:\n${violations.join("\n")}\n`
  );
  process.exitCode = 1;
}
