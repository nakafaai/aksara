import { enforceViolations, trackedFiles } from "#scripts/files";

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
const MATERIAL_LESSON_PREFIX = ["packages", "corpus", "material", "lesson"];
const QUESTION_BANK_PREFIX = ["packages", "corpus", "question-bank", "tryout"];

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

/** Checks whether a path starts with one exact repository-owned prefix. */
function hasPrefix(segments: readonly string[], prefix: readonly string[]) {
  return prefix.every(
    (segment, prefixIndex) => segments[prefixIndex] === segment
  );
}

/** Allows only source-owned lesson and question-group folder identities. */
function isEducationalFolder(segments: readonly string[], index: number) {
  if (
    hasPrefix(segments, MATERIAL_LESSON_PREFIX) &&
    index >= MATERIAL_LESSON_PREFIX.length &&
    index < segments.length - 1
  ) {
    return true;
  }

  return (
    hasPrefix(segments, QUESTION_BANK_PREFIX) &&
    index === QUESTION_BANK_PREFIX.length + 2 &&
    index < segments.length - 1
  );
}

/** Collects forbidden toolchains, JavaScript, and overlong semantic path names. */
export function pathViolations(files: readonly string[]): readonly string[] {
  return files.flatMap((file) => {
    const basename = file.split("/").at(-1);
    const toolchainViolation =
      basename && FORBIDDEN_FILE_NAMES.has(basename)
        ? [`${file}: pnpm and package.json own the toolchain contract`]
        : [];
    const sourceViolation = JAVASCRIPT_PATTERN.test(file)
      ? [`${file}: hand-written JavaScript source is not allowed`]
      : [];
    const segments = file.split("/");
    const nameViolations = segments.flatMap((segment, index) => {
      if (isEducationalFolder(segments, index) || words(segment).length <= 2) {
        return [];
      }
      return [`${file}: ${segment}`];
    });

    return [...toolchainViolation, ...sourceViolation, ...nameViolations];
  });
}

enforceViolations(
  "Repository path policy violations",
  pathViolations(trackedFiles())
);
