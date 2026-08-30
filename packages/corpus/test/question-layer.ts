import { globSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Effect, FileSystem, Layer, Path, PlatformError } from "effect";
import {
  indexQuestionBanks,
  questionSourceFiles,
} from "#corpus/question-bank/path";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

export const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

export const questionTestSourceRoot = "packages/corpus/question-bank/tryout";
export const absoluteQuestionTestSourceRoot = resolve(
  corpusRoot,
  questionTestSourceRoot
);
const QUESTION_DIRECTORY_PATTERN = /\/question-[1-9]\d*$/u;
export const realQuestionEntries = globSync("**/*", {
  cwd: absoluteQuestionTestSourceRoot,
});
const sources = new Map<string, string>();
for (const sourcePath of globSync("packages/corpus/**/*.ts", {
  cwd: corpusRoot,
})) {
  const absolutePath = resolve(corpusRoot, sourcePath);
  sources.set(absolutePath, readFileSync(absolutePath, "utf8"));
}
export const realQuestionItems = new Map(
  [...sources].filter(([sourcePath]) => sourcePath.endsWith("/item.ts"))
);
export const realTryoutSources = await Effect.runPromise(
  decodeTryoutRegistry()
);
export const realQuestionBanks = await Effect.runPromise(
  indexQuestionBanks(realTryoutSources)
);

/** Discovers synthetic question sources through the controlled test layer. */
export function discoverSyntheticQuestionSources(
  directoryEntries: readonly string[],
  sourceFiles: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return Effect.provide(
    discoverQuestionSources(corpusRoot, realQuestionBanks),
    makeQuestionSourceLayer(directoryEntries, sourceFiles, failDirectory)
  );
}

/** Flips one typed synthetic discovery failure into the success channel. */
export function rejectSyntheticQuestionSources(
  ...arguments_: Parameters<typeof discoverSyntheticQuestionSources>
) {
  return Effect.flip(discoverSyntheticQuestionSources(...arguments_));
}

/** One observed directory read made through the controlled corpus test layer. */
export interface QuestionDirectoryRead {
  readonly path: string;
  readonly recursive: boolean;
}

/** Optional virtual question files layered over the real corpus test tree. */
export interface QuestionLayerOverrides {
  readonly directories?: ReadonlyMap<string, readonly string[]>;
  readonly sources?: ReadonlyMap<string, string>;
}

export const validQuestionItemSource = `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
    en: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
    id: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
  },
};

export default item;`;
export const generalQuestionSourceFiles = questionSourceFiles({
  kind: "app-locale",
});
export const invalidQuestionItemSources = [
  "export default item;",
  "const item = { broken: };",
  `const item = {
    responses: {
      en: { kind: "single-choice", options: [{ isCorrect: false, label: "A" }] },
      id: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }] },
    },
  };`,
];
export const questionRendererCounts = [
  { count: 300, rendererDomain: "snbt-general" },
  { count: 200, rendererDomain: "snbt-math" },
  { count: 1050, rendererDomain: "snbt-plain" },
  { count: 200, rendererDomain: "snbt-quant" },
  { count: 120, rendererDomain: "tka-math" },
];

/** Creates recursive directory output for one synthetic question directory. */
export function questionEntries(root: string, files: readonly string[]) {
  return [root, ...files.map((file) => `${root}/${file}`)];
}

/** Maps a physical synthetic question root to its absolute item source. */
export function itemForQuestion(
  root: string,
  source = validQuestionItemSource
) {
  return new Map([
    [resolve(absoluteQuestionTestSourceRoot, root, "item.ts"), source],
  ]);
}

/** Creates a deterministic synthetic question filesystem for source tests. */
export function makeQuestionSourceLayer(
  directoryEntries: readonly string[],
  sourceFiles: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return FileSystem.layerNoop({
    readDirectory: (path) => {
      if (failDirectory) {
        return Effect.fail(missing("readDirectory", path));
      }
      return Effect.succeed([...directoryEntries]);
    },
    readFileString: (path) => {
      const source = sourceFiles.get(path);
      if (source === undefined) {
        return Effect.fail(missing("readFileString", path));
      }
      return Effect.succeed(source);
    },
  });
}

/** Creates a path-faithful question filesystem with optional read evidence. */
export function makeQuestionLayer(
  directoryReads: QuestionDirectoryRead[] = [],
  overrides: QuestionLayerOverrides = {}
) {
  return FileSystem.layerNoop({
    readDirectory: (path, options) => {
      const recursive = options?.recursive === true;
      directoryReads.push({ path, recursive });
      const directory = overrides.directories?.get(path);
      if (directory !== undefined) {
        return Effect.succeed([...directory]);
      }
      if (path === absoluteQuestionTestSourceRoot && recursive) {
        return Effect.succeed(realQuestionEntries);
      }
      if (
        path.startsWith(`${absoluteQuestionTestSourceRoot}/`) &&
        !recursive &&
        QUESTION_DIRECTORY_PATTERN.test(path)
      ) {
        return Effect.succeed(readdirSync(path).sort());
      }
      return Effect.fail(missing("readDirectory", path));
    },
    readFileString: (path) => {
      const source = overrides.sources?.get(path) ?? sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(missing("readFileString", path));
    },
  });
}

/** Creates one stable missing-path error for the controlled filesystem. */
function missing(method: "readDirectory" | "readFileString", path: string) {
  return PlatformError.systemError({
    _tag: "NotFound",
    method,
    module: "FileSystem",
    pathOrDescriptor: path,
  });
}

const fileLayer = makeQuestionLayer();

export const questionLayer = Layer.merge(fileLayer, Path.layer);
