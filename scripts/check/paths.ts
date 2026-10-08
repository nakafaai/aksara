import { Array as Arr, Effect, HashSet } from "effect";

import { enforceViolations, trackedFiles } from "#scripts/check/files";
import { runEntry } from "#scripts/entry";

const WORD_SEPARATOR_PATTERN = /[-_.\s]+/u;
const CAMEL_WORD_PATTERN = /([\p{Ll}\d])(\p{Lu})/gu;
const ACRONYM_WORD_PATTERN = /(\p{Lu}+)(\p{Lu}\p{Ll})/gu;
const NUMBER_PATTERN = /^\d+$/u;
const EXTENSION_PATTERN = /(?<=[^.])\.[^.]+$/u;
const DOCUMENT_PATTERN = /^[A-Z][A-Z\d]*(?:_[A-Z\d]+)+(?:\.md)?$/u;
const JAVASCRIPT_PATTERN = /\.[cm]?jsx?$/u;
const RUNNABLE_TEST_FILE_PATTERN = /\.(?:spec|test)\.[cm]?[jt]sx?$/u;
const FINAL_TEST_FILE_PATTERN = /\.test\.ts$/u;
const FORBIDDEN_FILE_NAMES = HashSet.make(
  ".node-version",
  ".npmrc",
  ".nvmrc",
  "bun.lock",
  "bun.lockb",
  "deno.lock",
  "npm-shrinkwrap.json",
  "package-lock.json",
  "yarn.lock"
);
/** Repository files whose exact names the toolchain mandates. */
const TOOLCHAIN_FILES = HashSet.make("pnpm-lock.yaml", "pnpm-workspace.yaml");
const ROLE_SUFFIXES = HashSet.make("build", "config", "d", "spec", "test");
/** Roots whose folders are content identities, such as lesson and article slugs. */
const CONTENT_ROOTS = [
  ["packages", "corpus", "articles"],
  ["packages", "corpus", "curriculum"],
  ["packages", "corpus", "material", "lesson"],
  ["packages", "corpus", "pages"],
];
/** Roots whose direct entries are skill identities that agents invoke by name. */
const SKILL_ROOTS = [
  [".agents", "skills"],
  [".claude", "skills"],
];
const QUESTION_BANK_ROOT = ["packages", "corpus", "question-bank"];
const QUESTION_BANK_PREFIX = [...QUESTION_BANK_ROOT, "tryout"];
const QUESTION_SEGMENT_PATTERN = /^question-[1-9]\d*$/u;
const QUESTION_SOURCE_PATTERN =
  /^(?:item\.ts|(?:answer|question)\.[a-z]{2,3}(?:-[a-z0-9]+)*\.mdx)$/u;
const SOURCE_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

/** Returns the semantic words in one folder name or extensionless file name. */
function words(segment: string, isFile: boolean): string[] {
  const name = isFile ? segment.replace(EXTENSION_PATTERN, "") : segment;
  const tokens = Arr.filter(
    name
      .replace(ACRONYM_WORD_PATTERN, "$1 $2")
      .replace(CAMEL_WORD_PATTERN, "$1 $2")
      .split(WORD_SEPARATOR_PATTERN),
    (word) => word.length > 0
  );
  const semantic = Arr.reverse(
    Arr.dropWhile(Arr.reverse(tokens), (word) =>
      HashSet.has(ROLE_SUFFIXES, word)
    )
  );
  return Arr.filter(semantic, (word) => !NUMBER_PATTERN.test(word));
}

/** Checks whether a path starts with one exact repository-owned prefix. */
function hasPrefix(segments: readonly string[], prefix: readonly string[]) {
  return Arr.every(
    prefix,
    (segment, prefixIndex) => segments[prefixIndex] === segment
  );
}

/** Recognizes a complete generic question source without owning exam inventory. */
function isQuestionSource(segments: readonly string[]) {
  if (!hasPrefix(segments, QUESTION_BANK_PREFIX)) {
    return false;
  }

  const questionIndex = segments.length - 2;
  const hierarchy = segments.slice(QUESTION_BANK_PREFIX.length, questionIndex);
  const question = segments.at(questionIndex);
  const source = segments.at(-1);

  return (
    hierarchy.length >= 4 &&
    Arr.every(hierarchy, (segment) => SOURCE_KEY_PATTERN.test(segment)) &&
    question !== undefined &&
    QUESTION_SEGMENT_PATTERN.test(question) &&
    source !== undefined &&
    QUESTION_SOURCE_PATTERN.test(source)
  );
}

/** Allows content and skill identities that contracts and agents own by name. */
function isIdentity(segments: readonly string[], index: number) {
  const isFolder = index < segments.length - 1;
  if (
    Arr.some(
      CONTENT_ROOTS,
      (root) => isFolder && hasPrefix(segments, root) && index >= root.length
    )
  ) {
    return true;
  }
  if (
    Arr.some(
      SKILL_ROOTS,
      (root) => hasPrefix(segments, root) && index === root.length
    )
  ) {
    return true;
  }
  if (
    hasPrefix(segments, QUESTION_BANK_ROOT) &&
    index === QUESTION_BANK_ROOT.length - 1
  ) {
    return true;
  }
  return isQuestionSource(segments) && index >= QUESTION_BANK_PREFIX.length;
}

/** Allows toolchain files and uppercase repository documents by convention. */
function isConventionalFile(file: string, basename: string) {
  if (HashSet.has(TOOLCHAIN_FILES, file)) {
    return true;
  }
  const isDocumentPath = file === basename || file === `.github/${basename}`;
  return isDocumentPath && DOCUMENT_PATTERN.test(basename);
}

/** Collects forbidden toolchains, JavaScript, and multi-word path names. */
export function pathViolations(files: readonly string[]): readonly string[] {
  const tracked = HashSet.fromIterable(files);
  return Arr.flatMap(files, (file) => {
    const basename = file.split("/").at(-1);
    const toolchainViolation =
      basename && HashSet.has(FORBIDDEN_FILE_NAMES, basename)
        ? [`${file}: pnpm and package.json own the toolchain contract`]
        : [];
    const sourceViolation = JAVASCRIPT_PATTERN.test(file)
      ? [`${file}: hand-written JavaScript source is not allowed`]
      : [];
    const ownerPath = file.replace(FINAL_TEST_FILE_PATTERN, ".ts");
    const ownerViolation =
      FINAL_TEST_FILE_PATTERN.test(file) && !HashSet.has(tracked, ownerPath)
        ? [`${file}: final test has no colocated ${ownerPath} owner`]
        : [];
    const testSourceViolation =
      RUNNABLE_TEST_FILE_PATTERN.test(file) &&
      !FINAL_TEST_FILE_PATTERN.test(file)
        ? [`${file}: final tests must use .test.ts`]
        : [];
    const segments = file.split("/");
    const nameViolations = Arr.flatMap(segments, (segment, index) => {
      const isFile = index === segments.length - 1;
      if (
        isIdentity(segments, index) ||
        (isFile && isConventionalFile(file, segment)) ||
        words(segment, isFile).length <= 1
      ) {
        return [];
      }
      return [`${file}: ${segment} must be one word`];
    });

    return [
      ...toolchainViolation,
      ...sourceViolation,
      ...ownerViolation,
      ...testSourceViolation,
      ...nameViolations,
    ];
  });
}

/** Reports every repository path that breaks the path policy. */
export const pathReport = Effect.fn("AksaraPolicy.pathReport")(
  (files: readonly string[]) =>
    Effect.sync(() => {
      enforceViolations(
        "Repository path policy violations",
        pathViolations(files)
      );
    })
);

runEntry(import.meta.main, trackedFiles().pipe(Effect.flatMap(pathReport)));
