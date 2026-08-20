import { globSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, FileSystem, Layer, Path, PlatformError } from "effect";
import { questionChoiceOverlayLocale } from "#corpus/question-bank/choice-locale";
import {
  indexQuestionBanks,
  type QuestionBankIndex,
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
export const realQuestionChoices = new Map(
  [...sources].filter(([sourcePath]) => {
    const file = sourcePath.slice(sourcePath.lastIndexOf("/") + 1);
    return (
      file === "choices.ts" || questionChoiceOverlayLocale(file) !== undefined
    );
  })
);
export const realTryoutSources = await Effect.runPromise(
  decodeTryoutRegistry()
);
export const realQuestionBanks = await Effect.runPromise(
  indexQuestionBanks(realTryoutSources)
);

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

export const validQuestionChoicesSource = `import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [{ label: "A", value: true }, { label: "B", value: false }],
  id: [{ label: "A", value: false }, { label: "B", value: true }],
};

export default choices;`;
export const generalQuestionSourceFiles = questionSourceFiles(
  TryoutKeySchema.make("general-reasoning")
);
export const germanQuestionChoicesSource = validQuestionChoicesSource
  .replace(
    '  en: [{ label: "A", value: true }, { label: "B", value: false }],\n',
    ""
  )
  .replace(
    '  id: [{ label: "A", value: false }, { label: "B", value: true }],',
    '  de: [{ label: "A", value: true }, { label: "B", value: false }],'
  );
export const indonesianChoiceFixture =
  /\n {2}id: \[\{ label: "A", value: false \}, \{ label: "B", value: true \}\],/u;
export const invalidQuestionChoiceSources = [
  "export default choices;",
  "const choices = { broken: };",
  `const choices = {
    en: [{ label: "A", value: false }],
    id: [{ label: "A", value: true }],
  };`,
];
export const questionRendererCounts = [
  { count: 200, rendererDomain: "snbt-general" },
  { count: 140, rendererDomain: "snbt-math" },
  { count: 180, rendererDomain: "snbt-plain" },
  { count: 200, rendererDomain: "snbt-quant" },
  { count: 120, rendererDomain: "tka-math" },
];

/** Creates recursive directory output for one synthetic question directory. */
export function questionEntries(root: string, files: readonly string[]) {
  return [root, ...files.map((file) => `${root}/${file}`)];
}

/** Maps a physical synthetic question root to its absolute choices source. */
export function choicesForQuestion(
  root: string,
  source = validQuestionChoicesSource
) {
  return new Map([
    [resolve(absoluteQuestionTestSourceRoot, root, "choices.ts"), source],
    [
      resolve(absoluteQuestionTestSourceRoot, root, "choices.de.ts"),
      germanQuestionChoicesSource,
    ],
  ]);
}

/** Discovers synthetic sources through the controlled platform layer. */
export function runQuestionSources(
  questionBanks: QuestionBankIndex,
  directoryEntries: readonly string[],
  sourceFiles: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    discoverQuestionSources(corpusRoot, questionBanks).pipe(
      Effect.provide([
        makeQuestionSourceLayer(directoryEntries, sourceFiles),
        Path.layer,
      ])
    )
  );
}

/** Returns one typed synthetic discovery failure at the Vitest boundary. */
export function rejectQuestionSources(
  questionBanks: QuestionBankIndex,
  directoryEntries: readonly string[],
  sourceFiles: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return Effect.runPromise(
    discoverQuestionSources(corpusRoot, questionBanks).pipe(
      Effect.provide([
        makeQuestionSourceLayer(directoryEntries, sourceFiles, failDirectory),
        Path.layer,
      ]),
      Effect.flip
    )
  );
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
